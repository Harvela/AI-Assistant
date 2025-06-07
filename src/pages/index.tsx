'use client';

import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const phoneNumber = localStorage.getItem('phoneNumber');
    const isVerified = localStorage.getItem('isVerified');
    const trialAttempts = parseInt(
      localStorage.getItem('trialAttempts') || '0',
      10,
    );

    // If user is authenticated and verified, redirect to chat
    if (phoneNumber && isVerified) {
      router.push('/chat');
    } else {
      // If user has used all trial attempts, show login page
      if (trialAttempts >= 3) {
        router.push('/login');
      } else {
        // Otherwise, show chat interface for trial
        router.push('/chat');
      }
    }
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="size-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
    </div>
  );
}
