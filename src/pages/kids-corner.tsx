import { useRouter } from 'next/router';
import React, { useState } from 'react';

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
    <div className="flex min-h-screen flex-col items-center bg-yellow-50 px-2 py-8 dark:bg-yellow-900/20">
      <button
        onClick={() => router.back()}
        className="mb-4 rounded bg-blue-200 px-4 py-2 font-semibold text-blue-900 hover:bg-blue-300"
      >
        ← Back
      </button>
      <h1 className="mb-6 flex items-center gap-2 text-3xl font-extrabold text-yellow-800 dark:text-yellow-200">
        <span role="img" aria-label="kids">
          🧒
        </span>{' '}
        Christian Kids&apos; Corner
      </h1>
      {/* Tabs */}
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`rounded-full px-4 py-2 text-sm font-semibold shadow-sm transition-colors
              ${activeTab === tab.key ? 'bg-yellow-400 text-yellow-900' : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-800 dark:text-yellow-100 dark:hover:bg-yellow-700'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="min-h-[250px] w-full max-w-2xl rounded-lg bg-white p-6 shadow dark:bg-gray-800">
        {activeTab === 'stories' && (
          <div>
            <h2 className="mb-2 text-xl font-bold text-yellow-700 dark:text-yellow-200">
              Bible Stories
            </h2>
            <p className="text-gray-700 dark:text-gray-200">
              Fun and simple Bible stories for kids will appear here!
            </p>
          </div>
        )}
        {activeTab === 'games' && (
          <div>
            <h2 className="mb-2 text-xl font-bold text-yellow-700 dark:text-yellow-200">
              Games
            </h2>
            <p className="text-gray-700 dark:text-gray-200">
              Play Christian games and puzzles here soon!
            </p>
          </div>
        )}
        {activeTab === 'quizzes' && (
          <div>
            <h2 className="mb-2 text-xl font-bold text-yellow-700 dark:text-yellow-200">
              Quizzes
            </h2>
            <p className="text-gray-700 dark:text-gray-200">
              Test your Bible knowledge with fun quizzes!
            </p>
          </div>
        )}
        {activeTab === 'coloring' && (
          <div>
            <h2 className="mb-2 text-xl font-bold text-yellow-700 dark:text-yellow-200">
              Coloring
            </h2>
            <p className="text-gray-700 dark:text-gray-200">
              Download and color Bible-themed pictures!
            </p>
          </div>
        )}
        {activeTab === 'songs' && (
          <div>
            <h2 className="mb-2 text-xl font-bold text-yellow-700 dark:text-yellow-200">
              Songs
            </h2>
            <p className="text-gray-700 dark:text-gray-200">
              Sing along to Christian kids&apos; songs and worship music!
            </p>
          </div>
        )}
        {activeTab === 'characters' && (
          <div>
            <h2 className="mb-2 text-xl font-bold text-yellow-700 dark:text-yellow-200">
              Bible Characters
            </h2>
            <p className="text-gray-700 dark:text-gray-200">
              Meet famous Bible characters and learn about them!
            </p>
          </div>
        )}
        {activeTab === 'prayer' && (
          <div>
            <h2 className="mb-2 text-xl font-bold text-yellow-700 dark:text-yellow-200">
              Prayer Wall
            </h2>
            <p className="text-gray-700 dark:text-gray-200">
              Send a prayer or blessing, and see prayers from other kids!
            </p>
          </div>
        )}
      </div>
      <div className="mt-8 text-lg font-semibold text-yellow-800 dark:text-yellow-200">
        Jesus loves you!
      </div>
    </div>
  );
}
