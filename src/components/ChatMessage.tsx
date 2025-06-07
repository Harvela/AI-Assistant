'use client';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatMessage({ role, content }: ChatMessageProps) {
  return (
    <div
      className={`flex pb-[150px] ${role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`max-w-[85vw] break-words rounded-lg p-4 md:max-w-[75%] ${
          role === 'user'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white'
        }`}
      >
        <div className="flex items-start gap-3">
          {role === 'assistant' && (
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-500">
              <svg
                className="size-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
          <div className="flex-1">
            <p className="mb-1 text-sm font-medium">
              {role === 'user' ? 'You' : 'Assistant'}
            </p>
            <p className="whitespace-pre-wrap break-words text-sm md:text-base">
              {content}
            </p>
          </div>
          {role === 'user' && (
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-600">
              <svg
                className="size-5 text-gray-600 dark:text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
