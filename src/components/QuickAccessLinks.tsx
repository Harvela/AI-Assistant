import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface Service {
  name: string;
  icon: string;
  path: string;
}

const services: Service[] = [
  { name: 'Education', icon: '📚', path: '/services/education' },
  { name: 'Fashion', icon: '👗', path: '/services/fashion' },
  { name: 'Business', icon: '💼', path: '/services/business' },
  { name: 'Hair Style', icon: '💇', path: '/services/hair-style' },
  { name: 'Shop', icon: '🛍️', path: '/services/shop' },
];

export default function QuickAccessLinks() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status on client side
    const userPhone = localStorage.getItem('userPhone');
    setIsAuthenticated(!!userPhone);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userPhone');
    localStorage.removeItem('isVerified');
    setIsAuthenticated(false);
    router.push('/');
  };

  return (
    <div className="flex items-center gap-4">
      {/* Service Categories */}
      <nav className="hidden items-center gap-4 md:flex">
        {services.map((service) => (
          <button
            key={service.name}
            onClick={() => router.push(service.path)}
            className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <span className="text-lg">{service.icon}</span>
            <span>{service.name}</span>
          </button>
        ))}
      </nav>

      {/* Mobile Service Menu */}
      <div className="group relative md:hidden">
        <button className="rounded-lg bg-gray-200 p-2 text-gray-800 dark:bg-gray-700 dark:text-white">
          <span className="text-lg">📋</span>
        </button>
        <div className="absolute right-0 mt-2 hidden w-48 rounded-lg bg-white py-2 shadow-xl group-hover:block dark:bg-gray-800">
          {services.map((service) => (
            <button
              key={service.name}
              onClick={() => router.push(service.path)}
              className="flex w-full items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <span className="text-lg">{service.icon}</span>
              <span>{service.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Theme Toggle */}
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="rounded-lg bg-gray-200 p-2 text-gray-800 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? '🌞' : '🌙'}
      </button>

      {/* Logout Button - Only show when authenticated */}
      {isAuthenticated && (
        <button
          onClick={handleLogout}
          className="text-gray-600 transition-colors hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400"
        >
          Logout
        </button>
      )}
    </div>
  );
}
