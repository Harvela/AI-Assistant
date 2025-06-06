import React, { useState } from 'react';
import { useRouter } from 'next/router';

const TABS = [
  { key: 'stories', label: 'Stories' },
  { key: 'games', label: 'Games' },
  { key: 'quizzes', label: 'Quizzes' },
  { key: 'coloring', label: 'Coloring' },
  { key: 'songs', label: 'Songs' },
  { key: 'characters', label: 'Characters' },
  { key: 'prayer', label: 'Prayer Wall' },
];

export default function KidsCorner() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('stories');

  return (
    <div className="min-h-screen bg-yellow-50 dark:bg-yellow-900/20 flex flex-col items-center py-8 px-2">
      <button onClick={() => router.back()} className="mb-4 px-4 py-2 bg-blue-200 hover:bg-blue-300 rounded text-blue-900 font-semibold">← Back</button>
      <h1 className="text-3xl font-extrabold text-yellow-800 dark:text-yellow-200 mb-6 flex items-center gap-2">
        <span role="img" aria-label="kids">🧒</span> Christian Kids' Corner
      </h1>
      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap justify-center">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-full font-semibold transition-colors text-sm shadow-sm
              ${activeTab === tab.key ? 'bg-yellow-400 text-yellow-900' : 'bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100 hover:bg-yellow-200 dark:hover:bg-yellow-700'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow p-6 min-h-[250px]">
        {activeTab === 'stories' && (
          <div>
            <h2 className="text-xl font-bold mb-2 text-yellow-700 dark:text-yellow-200">Bible Stories</h2>
            <p className="text-gray-700 dark:text-gray-200">Fun and simple Bible stories for kids will appear here!</p>
          </div>
        )}
        {activeTab === 'games' && (
          <div>
            <h2 className="text-xl font-bold mb-2 text-yellow-700 dark:text-yellow-200">Games</h2>
            <p className="text-gray-700 dark:text-gray-200">Play Christian games and puzzles here soon!</p>
          </div>
        )}
        {activeTab === 'quizzes' && (
          <div>
            <h2 className="text-xl font-bold mb-2 text-yellow-700 dark:text-yellow-200">Quizzes</h2>
            <p className="text-gray-700 dark:text-gray-200">Test your Bible knowledge with fun quizzes!</p>
          </div>
        )}
        {activeTab === 'coloring' && (
          <div>
            <h2 className="text-xl font-bold mb-2 text-yellow-700 dark:text-yellow-200">Coloring</h2>
            <p className="text-gray-700 dark:text-gray-200">Download and color Bible-themed pictures!</p>
          </div>
        )}
        {activeTab === 'songs' && (
          <div>
            <h2 className="text-xl font-bold mb-2 text-yellow-700 dark:text-yellow-200">Songs</h2>
            <p className="text-gray-700 dark:text-gray-200">Sing along to Christian kids' songs and worship music!</p>
          </div>
        )}
        {activeTab === 'characters' && (
          <div>
            <h2 className="text-xl font-bold mb-2 text-yellow-700 dark:text-yellow-200">Bible Characters</h2>
            <p className="text-gray-700 dark:text-gray-200">Meet famous Bible characters and learn about them!</p>
          </div>
        )}
        {activeTab === 'prayer' && (
          <div>
            <h2 className="text-xl font-bold mb-2 text-yellow-700 dark:text-yellow-200">Prayer Wall</h2>
            <p className="text-gray-700 dark:text-gray-200">Send a prayer or blessing, and see prayers from other kids!</p>
          </div>
        )}
      </div>
      <div className="mt-8 text-lg text-yellow-800 dark:text-yellow-200 font-semibold">Jesus loves you!</div>
    </div>
  );
} 