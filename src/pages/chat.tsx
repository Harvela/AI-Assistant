'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ChatInterface = dynamic(() => import('../components/ChatInterface'), {
  loading: () => (
    <div className="flex min-h-screen items-center justify-center">
      <div className="size-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
    </div>
  ),
});

export default function ChatPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated and verified
    const phoneNumber = localStorage.getItem('phoneNumber');
    const isVerified = localStorage.getItem('isVerified');
    const trialAttempts = parseInt(
      localStorage.getItem('trialAttempts') || '0',
      10,
    );

    // If user has used all trial attempts and is not authenticated, redirect to login
    if (trialAttempts >= 3 && (!phoneNumber || !isVerified)) {
      router.push('/');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  return <ChatInterface />;
}
