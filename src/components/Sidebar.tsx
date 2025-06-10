'use client';

// import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ChatSession {
  id: string;
  title: string;
  createdAt: number;
}

interface SidebarProps {
  chats: ChatSession[];
  activeChatId: string | null;
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
}

export default function Sidebar({
  chats,
  activeChatId,
  onSelectChat,
  onNewChat,
}: SidebarProps) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { t } = useTranslation();

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
    <div className="flex h-full flex-col border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      {/* Logo and New Chat */}
      <div className="flex gap-2 border-b border-gray-200 p-4 pl-20 dark:border-gray-700">
        <Image src="/images/bishop.svg" alt="Logo" width={40} height={40} />
        <div className="flex flex-col-reverse justify-center">
          <h1 className="ml-2 mt-[-2px] text-xl font-bold text-black dark:text-white md:ml-0">
            {t('chat.title')}
          </h1>
          <p className="ml-2 mt-px text-xs text-gray-800 dark:text-gray-400 md:ml-0">
            {t('chat.subtitle')}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col items-start gap-4 p-4">
        <button
          onClick={onNewChat}
          className="text-semibold w-full rounded-md bg-black px-4 py-2 text-[16px] text-white"
          title={t('sidebar.newChat')}
        >
          {t('sidebar.newChat')}
        </button>

        {/* Feature Links */}
        {/* <div className="mt-2 flex flex-col gap-2 w-full">
          <Link href="/services/prayer-request" className="text-left w-full px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">Prayer Request</Link>
          <Link href="/services/ask-bible" className="text-left w-full px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">Ask About the Bible</Link>
          <Link href="/services/calendar" className="text-left w-full px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">Christian Calendar</Link>
          <Link href="/services/faith-tracker" className="text-left w-full px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">Faith Journey Tracker</Link>
          <Link href="/services/music" className="text-left w-full px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">Christian Music</Link>
          <Link href="/services/church-finder" className="text-left w-full px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">Church Finder</Link>
          <Link href="/kids-corner" className="text-left w-full px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">Christian Kids' Corner</Link>
        </div> */}
      </nav>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto px-4 pb-2">
        <h2 className="my-2 px-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
          {t('sidebar.chatHistory')}
        </h2>
        {chats.length === 0 && (
          <div className="px-2 text-xs text-gray-400">
            {t('sidebar.noChats')}
          </div>
        )}
        <ul className="space-y-1">
          {chats.map((chat) => (
            <li key={chat.id}>
              <button
                onClick={() => onSelectChat(chat.id)}
                className={`flex w-full items-center rounded-lg px-2 py-1 text-left transition-colors
                  ${
                    activeChatId === chat.id
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                      : 'text-black hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
                  }
                `}
              >
                <span className="flex-1 truncate text-[14px]">
                  {chat.title}
                </span>
                <span className="ml-2 text-xs text-gray-400 dark:text-gray-500">
                  {new Date(chat.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Theme Toggle and Logout */}
      <div className="space-y-2 border-t border-gray-200 p-4 dark:border-gray-700">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="flex w-full items-center justify-between rounded-lg px-4 py-2 text-black transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <span>{t('sidebar.theme.label')}</span>
          <span className="text-sm">
            {theme === 'dark'
              ? t('sidebar.theme.dark')
              : t('sidebar.theme.light')}
          </span>
        </button>
        <button
          onClick={handleLogout}
          className="w-full rounded-lg px-4 py-2 text-left text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          {t('sidebar.logout')}
        </button>
      </div>
    </div>
  );
}
