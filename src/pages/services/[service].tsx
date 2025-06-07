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
      <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
        <header className="flex justify-end p-4">
          <QuickAccessLinks />
        </header>
        <main className="flex flex-1 items-center justify-center p-4">
          <div className="text-center">
            <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
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
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <header className="flex justify-end p-4">
        <QuickAccessLinks />
      </header>

      <main className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="mb-8 text-center">
            <span className="mb-4 block text-6xl">{serviceInfo.icon}</span>
            <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              {serviceInfo.title}
            </h1>
            <p className="mb-8 text-gray-600 dark:text-gray-400">
              {serviceInfo.description}
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Start Chatting
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              Click the button below to start a chat about{' '}
              {serviceInfo.title.toLowerCase()}.
            </p>
            <button
              onClick={() => router.push('/chat')}
              className="w-full rounded-lg bg-blue-500 p-3 font-medium text-white transition-colors hover:bg-blue-600"
            >
              Start Chat
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
