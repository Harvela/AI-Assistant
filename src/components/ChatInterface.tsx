'use client';

import { useState, useRef, useEffect } from 'react';
import Sidebar from './Sidebar';
import ChatMessage from './ChatMessage';
import ServiceLinks from './ServiceLinks';
import { useRouter } from 'next/router';

interface Message {
  role: 'user' | 'assistant';
  content: string;
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
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [scriptureIndex, setScriptureIndex] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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
  }, [messages]);

  const checkTrialAttempts = () => {
    const trialAttempts = parseInt(localStorage.getItem('trialAttempts') || '0');
    if (trialAttempts >= 3) {
      setShowLoginPrompt(true);
      return false;
    }
    return true;
  };

  const incrementTrialAttempts = () => {
    const currentAttempts = parseInt(localStorage.getItem('trialAttempts') || '0');
    localStorage.setItem('trialAttempts', (currentAttempts + 1).toString());
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

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    incrementTrialAttempts();

    // Simulate API call
    setTimeout(() => {
      const assistantMessage: Message = {
        role: 'assistant',
        content: 'This is a simulated response. In a real application, this would be connected to an AI API.',
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleServiceClick = (service: { name: string }) => {
    if (isLoading) return;

    if (!checkTrialAttempts()) {
      return;
    }

    const userMessage: Message = {
      role: 'user',
      content: `I want to chat about ${service.name}.`,
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setInput('');
    incrementTrialAttempts();
    
    setTimeout(() => {
      const assistantMessage: Message = {
        role: 'assistant',
        content: `Great! Let's talk about ${service.name}. How can I help you with ${service.name.toLowerCase()}?`,
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleLogin = () => {
    router.push('/login');
  };

  const hasMessages = messages.length > 0;

  // Combine scripture and quote for the current card
  const scriptureToShow = SCRIPTURES[scriptureIndex] || { text: '', reference: '' };
  const quoteToShow = QUOTES[quoteIndex] || { text: '', author: '' };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Sidebar Toggle - Only show when authenticated */}
      {isAuthenticated && (
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md md:hidden"
        >
          <svg
            className="w-6 h-6 text-gray-600 dark:text-gray-300"
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
          className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <Sidebar />
        </div>
      )}

      {/* Overlay for mobile - Only show when authenticated */}
      {isAuthenticated && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      <div className="flex-1 flex flex-col h-full">
        {/* App Name Header with Cross Icon */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4 flex flex-col items-center">
          <div className="flex items-center justify-center gap-2">
            <svg xmlns='http://www.w3.org/2000/svg' className='h-7 w-7 text-blue-600' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
              <path strokeLinecap='round' strokeLinejoin='round' d='M12 3v18m0 0h6m-6 0H6' />
            </svg>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">AI Assistant</h1>
          </div>
          {/* Single Carousel: Scripture then Wisdom */}
          <div className="mt-6 w-full max-w-2xl mx-auto flex items-center justify-center gap-2">
            {carouselIndex === 0 ? (
              <div className="bg-blue-50 dark:bg-blue-900/40 rounded-md p-2 text-center shadow mx-2 min-w-[250px] max-w-[400px]">
                <span className="text-blue-900 dark:text-blue-100 font-semibold">Scripture of the Day:</span>
                <span className="block text-gray-800 dark:text-gray-100 mt-1 italic">"{scriptureToShow.text}"</span>
                <span className="block text-sm text-blue-700 dark:text-blue-200 mt-1">{scriptureToShow.reference}</span>
              </div>
            ) : (
              <div className="bg-yellow-50 dark:bg-yellow-900/40 rounded-md p-2 text-center shadow mx-2 min-w-[250px] max-w-[400px]">
                <span className="text-yellow-900 dark:text-yellow-100 font-semibold">Christian Wisdom:</span>
                <span className="block text-gray-800 dark:text-gray-100 mt-1 italic">"{quoteToShow.text}"</span>
                <span className="block text-sm text-yellow-700 dark:text-yellow-200 mt-1">- {quoteToShow.author}</span>
              </div>
            )}
          </div>
        </div>

        {/* Login Prompt */}
        {showLoginPrompt && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Trial Limit Reached</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                You've used all 3 trial messages. Please sign up to continue using the chat.
              </p>
              <button
                onClick={handleLogin}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Sign Up Now
              </button>
            </div>
          </div>
        )}

        {/* Chat Messages or Centered ServiceLinks */}
        <div className={`flex-1 overflow-y-auto p-4 md:pt-4 max-w-3xl w-full mx-auto ${!hasMessages ? 'flex items-center justify-center' : ''}`}>
          {hasMessages ? (
            <>
              {messages.map((message, index) => (
                <ChatMessage
                  key={index}
                  role={message.role}
                  content={message.content}
                />
              ))}
              {isLoading && (
                <div className="flex justify-start mb-4">
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          ) : (
            <div className="w-full flex items-center justify-center">
              <div className="max-w-4xl w-full">
                <ServiceLinks onServiceClick={handleServiceClick} />
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <div className="border-t border-gray-400 dark:border-gray-700 bg-gray-300 dark:bg-gray-900 px-2 py-2 md:px-4 md:py-3">
          <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me about any Bible verse, story, or submit a prayer request…"
                className="w-full p-4 pr-12 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading || showLoginPrompt}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim() || showLoginPrompt}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-500 hover:text-blue-600 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                <svg
                  className="w-6 h-6"
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