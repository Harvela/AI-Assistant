'use client';

import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface ChatItem {
  id: string;
  title: string;
  createdAt: number;
}

export default function Sidebar() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  // Load chats from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('chatHistory');
    if (stored) {
      setChats(JSON.parse(stored));
    }
  }, []);

  // Save chats to localStorage when they change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('chatHistory', JSON.stringify(chats));
    }
  }, [chats, mounted]);

  const handleNewChat = () => {
    const newChat: ChatItem = {
      id: Date.now().toString(),
      title: `New Chat ${chats.length + 1}`,
      createdAt: Date.now(),
    };
    setChats([newChat, ...chats]);
    setActiveChatId(newChat.id);
    // Optionally, navigate to a chat route or reset chat state
  };

  const handleSelectChat = (id: string) => {
    setActiveChatId(id);
    // Optionally, load chat messages for this chat
  };

  const handleLogout = () => {
    localStorage.removeItem('phoneNumber');
    router.push('/');
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Logo and New Chat */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex gap-2">
        <h1 className="text-xl font-bold text-black dark:text-white ml-12 md:ml-0">AI Assistant</h1>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-4 items-start p-4">
        <button
          onClick={handleNewChat}
          className="text-semibold text-[16px]"
          title="New Chat"
        >
          New chat
        </button>
        <button
          onClick={handleNewChat}
          className=""
          title="New Chat"
        >
          Search chat
        </button>
        {/* Feature Links */}
        <div className="mt-2 flex flex-col gap-2 w-full">
          <Link href="/services/prayer-request" className="text-left w-full px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">Prayer Request</Link>
          <Link href="/services/ask-bible" className="text-left w-full px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">Ask About the Bible</Link>
          <Link href="/services/calendar" className="text-left w-full px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">Christian Calendar</Link>
          <Link href="/services/faith-tracker" className="text-left w-full px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">Faith Journey Tracker</Link>
          <Link href="/services/music" className="text-left w-full px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">Christian Music</Link>
          <Link href="/services/church-finder" className="text-left w-full px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">Church Finder</Link>
          <Link href="/kids-corner" className="text-left w-full px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">Christian Kids' Corner</Link>
        </div>
      </nav>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto px-4 pb-2">
        <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 px-2 mb-2 mt-2">Chat History</h2>
        {chats.length === 0 && (
          <div className="text-xs text-gray-400 px-2">No chats yet.</div>
        )}
        <ul className="space-y-1">
          {chats.map((chat) => (
            <li key={chat.id}>
              <button
                onClick={() => handleSelectChat(chat.id)}
                className={`w-full flex items-center px-2 py-1 rounded-lg text-left transition-colors
                  ${activeChatId === chat.id
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                    : 'text-black dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}
                `}
              >
                <span className="truncate flex-1 text-[14px]">{chat.title}</span>
                <span className="ml-2 text-xs text-gray-400 dark:text-gray-500">
                  {new Date(chat.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Theme Toggle and Logout */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="w-full flex items-center justify-between px-4 py-2 rounded-lg text-black dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <span>Theme</span>
          <span className="text-sm">{theme === 'dark' ? 'Dark' : 'Light'}</span>
        </button>
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
} 