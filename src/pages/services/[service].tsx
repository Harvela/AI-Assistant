'use client';

import { useRouter } from 'next/router';
import QuickAccessLinks from '../../components/QuickAccessLinks';

const serviceDetails = {
  education: {
    title: 'Education Services',
    description: 'Get help with your studies, homework, and learning goals.',
    icon: '📚',
  },
  fashion: {
    title: 'Fashion Services',
    description: 'Get style advice, outfit recommendations, and fashion tips.',
    icon: '👗',
  },
  business: {
    title: 'Business Services',
    description: 'Get business advice, strategy planning, and market insights.',
    icon: '💼',
  },
  'hair-style': {
    title: 'Hair Style Services',
    description: 'Get hairstyle recommendations and hair care advice.',
    icon: '💇',
  },
  shop: {
    title: 'Shopping Services',
    description: 'Get product recommendations and shopping assistance.',
    icon: '🛍️',
  },
};

export default function ServicePage() {
  const router = useRouter();
  const { service } = router.query;
  const serviceKey = service as keyof typeof serviceDetails;
  const serviceInfo = serviceDetails[serviceKey];

  if (!serviceInfo) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <header className="p-4 flex justify-end">
          <QuickAccessLinks />
        </header>
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Service Not Found
            </h1>
            <button
              onClick={() => router.push('/')}
              className="text-blue-500 hover:text-blue-600"
            >
              Return to Home
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <header className="p-4 flex justify-end">
        <QuickAccessLinks />
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <span className="text-6xl mb-4 block">{serviceInfo.icon}</span>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {serviceInfo.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              {serviceInfo.description}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Start Chatting
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Click the button below to start a chat about {serviceInfo.title.toLowerCase()}.
            </p>
            <button
              onClick={() => router.push('/chat')}
              className="w-full p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
            >
              Start Chat
            </button>
          </div>
        </div>
      </main>
    </div>
  );
} 