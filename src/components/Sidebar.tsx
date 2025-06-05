'use client';

import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Sidebar() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('phoneNumber');
    router.push('/');
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-bold text-black dark:text-white ml-12 md:ml-0">AI Assistant</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => router.push('/chat')}
              className="w-full text-left px-4 py-2 rounded-lg text-black dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Chat
            </button>
          </li>
          <li>
            <button
              onClick={() => router.push('/services')}
              className="w-full text-left px-4 py-2 rounded-lg text-black dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Services
            </button>
          </li>
        </ul>
      </nav>

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