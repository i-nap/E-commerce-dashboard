'use client'; // Error boundaries MUST be client components

import Button from '@/components/button';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("User encountered an error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h2 className="text-xl font-bold text-red-700">Something went wrong!</h2>
      <p className="text-red-600 mt-2">
        {error.message || "We couldn't load the products right now."}
      </p>
      <Button
        onClick={() => reset()}
        variant='danger'>
        Try again
      </Button>
    </div>
  );
}