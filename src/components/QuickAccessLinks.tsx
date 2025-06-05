import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

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
      <nav className="hidden md:flex items-center gap-4">
        {services.map((service) => (
          <button
            key={service.name}
            onClick={() => router.push(service.path)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <span className="text-lg">{service.icon}</span>
            <span>{service.name}</span>
          </button>
        ))}
      </nav>

      {/* Mobile Service Menu */}
      <div className="md:hidden relative group">
        <button className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
          <span className="text-lg">📋</span>
        </button>
        <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl hidden group-hover:block">
          {services.map((service) => (
            <button
              key={service.name}
              onClick={() => router.push(service.path)}
              className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
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
        className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? '🌞' : '🌙'}
      </button>

      {/* Logout Button - Only show when authenticated */}
      {isAuthenticated && (
        <button
          onClick={handleLogout}
          className="text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors"
        >
          Logout
        </button>
      )}
    </div>
  );
} 