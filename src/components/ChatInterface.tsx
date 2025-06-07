'use client';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import ChatMessage from './ChatMessage';
import ServiceLinks from './ServiceLinks';
import Sidebar from './Sidebar';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

type ServiceName = 'chat' | 'devotional' | 'explain-verse';

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  service: ServiceName;
  backendSessionId?: string;
  createdAt: number;
}

interface ChatResponse {
  response: string;
  sessionId: string;
}

interface DevotionalResponse {
  devotional: string;
}

interface ExplainVerseResponse {
  explanation: string;
}

// Add scripture and quote data
const SCRIPTURES = [
  {
    text: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.',
    reference: 'John 3:16',
  },
  {
    text: 'I can do all things through Christ who strengthens me.',
    reference: 'Philippians 4:13',
  },
  {
    text: 'The Lord is my shepherd; I shall not want.',
    reference: 'Psalm 23:1',
  },
  {
    text: 'Trust in the Lord with all your heart and lean not on your own understanding.',
    reference: 'Proverbs 3:5',
  },
];

const QUOTES = [
  {
    text: 'Pray, and let God worry.',
    author: 'Martin Luther',
  },
  {
    text: 'God never said that the journey would be easy, but He did say that the arrival would be worthwhile.',
    author: 'Max Lucado',
  },
  {
    text: 'Faith does not eliminate questions. But faith knows where to take them.',
    author: 'Elisabeth Elliot',
  },
  {
    text: 'You are the only Bible some unbelievers will ever read.',
    author: 'John MacArthur',
  },
  {
    text: 'God loves each of us as if there were only one of us.',
    author: 'St. Augustine',
  },
];

export default function ChatInterface() {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [, setScriptureIndex] = useState(0);
  const [, setQuoteIndex] = useState(0);
  const [, setCarouselIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const storedSessions = localStorage.getItem('chatSessions');
    if (storedSessions) {
      setChatSessions(JSON.parse(storedSessions));
    }
  }, []);

  useEffect(() => {
    if (chatSessions.length > 0) {
      localStorage.setItem('chatSessions', JSON.stringify(chatSessions));
    }
  }, [chatSessions]);

  const activeChat = chatSessions.find(
    (session) => session.id === activeChatId,
  );
  const currentService = activeChat?.service || 'chat';

  const updateMessages = (id: string, message: Message) => {
    setChatSessions((prev) =>
      prev.map((session) =>
        session.id === id
          ? { ...session, messages: [...session.messages, message] }
          : session,
      ),
    );
  };

  const handleSuccess = (content: string, sessionId: string) => {
    const assistantMessage: Message = {
      role: 'assistant',
      content,
    };
    updateMessages(sessionId, assistantMessage);
    if (activeChat && activeChat.service !== 'chat') {
      activeChat.service = 'chat';
    }
  };

  const handleError = (error: Error, sessionId: string) => {
    console.error('Error:', error);
    const assistantMessage: Message = {
      role: 'assistant',
      content: 'Sorry, I encountered an error. Please try again.',
    };
    updateMessages(sessionId, assistantMessage);
  };

  const { mutate: sendMessage, isPending: isChatLoading } = useMutation<
    ChatResponse,
    Error,
    { message: string; sessionId: string }
  >({
    mutationFn: async ({ message, sessionId }) => {
      const backendSessionId = chatSessions.find(
        (s) => s.id === sessionId,
      )?.backendSessionId;
      const { data } = await axios.post(
        'https://sms-bot.harvely.com/api/ai/my-story',
        {
          message,
          sessionId: backendSessionId,
        },
      );
      return data;
    },
    onSuccess: (data, variables) => {
      handleSuccess(data.response, variables.sessionId);
      if (data.sessionId) {
        setChatSessions((prev) =>
          prev.map((s) =>
            s.id === variables.sessionId
              ? { ...s, backendSessionId: data.sessionId }
              : s,
          ),
        );
      }
    },
    onError: (error, variables) => handleError(error, variables.sessionId),
  });

  const { mutate: generateDevotional, isPending: isDevotionalLoading } =
    useMutation<
      DevotionalResponse,
      Error,
      { story: string; sessionId: string }
    >({
      mutationFn: async ({ story }) => {
        const { data } = await axios.post(
          'https://sms-bot.harvely.com/api/ai/daily-devotional',
          { story },
        );
        return data;
      },
      onSuccess: (data, variables) =>
        handleSuccess(data.devotional, variables.sessionId),
      onError: (error, variables) => handleError(error, variables.sessionId),
    });

  const { mutate: explainVerse, isPending: isExplainVerseLoading } =
    useMutation<
      ExplainVerseResponse,
      Error,
      { verse: string; sessionId: string }
    >({
      mutationFn: async ({ verse }) => {
        const { data } = await axios.post(
          'https://sms-bot.harvely.com/api/ai/explain-verse',
          { verse },
        );
        return data;
      },
      onSuccess: (data, variables) =>
        handleSuccess(data.explanation, variables.sessionId),
      onError: (error, variables) => handleError(error, variables.sessionId),
    });

  const isLoading =
    isChatLoading || isDevotionalLoading || isExplainVerseLoading;

  useEffect(() => {
    // Set authentication state on client side
    const phone = localStorage.getItem('phoneNumber');
    const verified = localStorage.getItem('isVerified');
    setIsAuthenticated(!!phone && !!verified);
    // Use the day to pick the initial scripture and a random quote
    const day = new Date().getDate();
    setScriptureIndex(day % SCRIPTURES.length);
    setQuoteIndex(Math.floor(Math.random() * QUOTES.length));
    setCarouselIndex(0);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % 2);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChat?.messages]);

  const checkTrialAttempts = () => {
    const trialAttempts = parseInt(
      localStorage.getItem('trialAttempts') || '0',
      10,
    );
    if (trialAttempts >= 5) {
      setShowLoginPrompt(true);
      return false;
    }
    return true;
  };

  const incrementTrialAttempts = () => {
    const currentAttempts = parseInt(
      localStorage.getItem('trialAttempts') || '0',
      10,
    );
    localStorage.setItem('trialAttempts', (currentAttempts + 1).toString());
  };

  const createNewChat = (
    service: ServiceName = 'chat',
    initialMessage?: Message,
  ) => {
    const newChat: ChatSession = {
      id: uuidv4(),
      title: initialMessage?.content.substring(0, 30) || `New Chat`,
      messages: initialMessage ? [initialMessage] : [],
      service,
      createdAt: Date.now(),
    };
    setChatSessions((prev) => [newChat, ...prev]);
    setActiveChatId(newChat.id);
    return newChat;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (!checkTrialAttempts()) {
      return;
    }

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
    };

    let currentChat = activeChat;
    if (!currentChat) {
      currentChat = createNewChat('chat', userMessage);
    } else {
      updateMessages(currentChat.id, userMessage);
    }

    const messageToSend = input.trim();
    setInput('');
    incrementTrialAttempts();

    switch (currentChat.service) {
      case 'devotional':
        generateDevotional({ story: messageToSend, sessionId: currentChat.id });
        break;
      case 'explain-verse':
        explainVerse({ verse: messageToSend, sessionId: currentChat.id });
        break;
      default:
        sendMessage({ message: messageToSend, sessionId: currentChat.id });
        break;
    }
  };

  const handleServiceClick = (service: { name: string }) => {
    if (isLoading) return;

    if (!checkTrialAttempts()) {
      return;
    }

    let serviceName: ServiceName = 'chat';
    let prompt = '';

    if (service.name === 'Daily Prayers & Devotionals') {
      serviceName = 'devotional';
      prompt =
        'I see you want a devotional. Please provide the Bible story or topic for the devotional.';
    } else if (service.name === 'Bible Study Tools (Adults & Kids)') {
      serviceName = 'explain-verse';
      prompt =
        'I can help with that. Please provide the Bible verse you would like me to explain.';
    } else {
      // Default conversational starter
      const messageContent = `I want to chat about ${service.name}.`;
      const userMessage: Message = { role: 'user', content: messageContent };
      const newChat = createNewChat('chat', userMessage);
      incrementTrialAttempts();
      sendMessage({ message: messageContent, sessionId: newChat.id });
      return;
    }

    const promptMessage: Message = {
      role: 'assistant',
      content: prompt,
    };
    createNewChat(serviceName, promptMessage);
  };

  const handleLogin = () => {
    router.push('/login');
  };

  const hasMessages = activeChat && activeChat.messages.length > 0;

  // Combine scripture and quote for the current card
  // const scriptureToShow = SCRIPTURES[scriptureIndex] || {
  //   text: '',
  //   reference: '',
  // };
  // const quoteToShow = QUOTES[quoteIndex] || { text: '', author: '' };

  const getPlaceholderText = () => {
    switch (currentService) {
      case 'devotional':
        return 'Enter a story for the devotional...';
      case 'explain-verse':
        return 'Enter a verse to explain...';
      default:
        return 'Start a new chat...';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Sidebar Toggle - Only show when authenticated */}
      {isAuthenticated && (
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed left-4 top-4 z-50 rounded-lg bg-white p-2 shadow-md dark:bg-gray-800 md:hidden"
        >
          <svg
            className="size-6 text-gray-600 dark:text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      )}

      {/* Sidebar - Only show when authenticated */}
      {isAuthenticated && (
        <div
          className={`fixed inset-y-0 left-0 z-40 w-64 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <Sidebar
            chats={chatSessions}
            activeChatId={activeChatId}
            onSelectChat={setActiveChatId}
            onNewChat={() => setActiveChatId(null)}
          />
        </div>
      )}

      {/* Overlay for mobile - Only show when authenticated */}
      {isAuthenticated && isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex h-full flex-1 flex-col">
        {/* App Name Header with Cross Icon */}
        <div className="flex flex-col items-center border-b border-gray-200 bg-white py-4 dark:border-gray-700 dark:bg-gray-800">
          <div className=" fixed top-0 z-30 flex w-full justify-center gap-2 rounded-md border-b border-gray-200 bg-gray-100 px-4 pt-4 dark:border-gray-700 dark:bg-gray-900">
            <Image src="/images/bishop.svg" alt="Logo" width={40} height={40} />
            <div className="flex flex-col-reverse justify-center">
              <h1 className="ml-2 mt-[-2px] text-xl font-bold text-black dark:text-white md:ml-0">
                Joshua
              </h1>
              <p className="ml-2 mt-[1px] text-xs text-gray-800 dark:text-gray-400 md:ml-0">
                Bishop
              </p>
            </div>
          </div>
          {/* Single Carousel: Scripture then Wisdom */}
          {/* <div className="mx-auto mt-6 flex w-full max-w-2xl items-center justify-center gap-2">
            {carouselIndex === 0 ? (
              <div className="mx-2 min-w-[250px] max-w-[400px] rounded-md bg-blue-50 p-2 text-center shadow dark:bg-blue-900/40">
                <span className="font-semibold text-blue-900 dark:text-blue-100">
                  Scripture of the Day:
                </span>
                <span className="mt-1 block italic text-gray-800 dark:text-gray-100">
                  &quot;{scriptureToShow.text}&quot;
                </span>
                <span className="mt-1 block text-sm text-blue-700 dark:text-blue-200">
                  {scriptureToShow.reference}
                </span>
              </div>
            ) : (
              <div className="mx-2 min-w-[250px] max-w-[400px] rounded-md bg-yellow-50 p-2 text-center shadow dark:bg-yellow-900/40">
                <span className="font-semibold text-yellow-900 dark:text-yellow-100">
                  Christian Wisdom:
                </span>
                <span className="mt-1 block italic text-gray-800 dark:text-gray-100">
                  &quot;{quoteToShow.text}&quot;
                </span>
                <span className="mt-1 block text-sm text-yellow-700 dark:text-yellow-200">
                  - {quoteToShow.author}
                </span>
              </div>
            )}
          </div> */}
        </div>

        {/* Login Prompt */}
        {showLoginPrompt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
              <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                Trial Limit Reached
              </h2>
              <p className="mb-6 text-gray-600 dark:text-gray-300">
                You&apos;ve used all 3 trial messages. Please sign up to
                continue using the chat.
              </p>
              <button
                onClick={handleLogin}
                className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
              >
                Sign Up Now
              </button>
            </div>
          </div>
        )}

        {/* Chat Messages or Centered ServiceLinks */}
        <div
          className={`mx-auto w-full max-w-3xl flex-1 overflow-y-auto p-4 md:pt-4 ${!hasMessages ? 'flex items-center justify-center' : ''}`}
        >
          {hasMessages ? (
            <>
              {activeChat.messages.map((message, index) => (
                <ChatMessage
                  key={index}
                  role={message.role}
                  content={message.content}
                />
              ))}
              {isLoading && (
                <div className="mb-4 flex justify-start">
                  <div className="rounded-lg bg-gray-200 p-4 dark:bg-gray-700">
                    <div className="flex items-center gap-2">
                      <div className="size-2 animate-bounce rounded-full bg-gray-400 dark:bg-gray-500" />
                      <div className="size-2 animate-bounce rounded-full bg-gray-400 delay-100 dark:bg-gray-500" />
                      <div className="size-2 animate-bounce rounded-full bg-gray-400 delay-200 dark:bg-gray-500" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          ) : (
            <div className="flex w-full items-center justify-center">
              <div className="w-full max-w-4xl">
                <ServiceLinks onServiceClick={handleServiceClick} />
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <div className="fixed bottom-0 w-full border-t border-gray-400 bg-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 md:px-4 md:py-3">
          <form onSubmit={handleSubmit} className="mx-auto w-full max-w-3xl">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={getPlaceholderText()}
                className="w-full rounded-lg border border-gray-300 bg-white p-4 pr-12 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                disabled={isLoading || showLoginPrompt}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim() || showLoginPrompt}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-500 hover:text-blue-600 disabled:cursor-not-allowed disabled:text-gray-400"
              >
                <svg
                  className="size-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
