'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='w-full h-screen flex flex-col gap-2 items-center bg-teal-700 justify-center p-5'>
      <h1 className="w-full font-bold text-white text-center align-center text-4xl mb-9">Error</h1>
      <h2>Something went wrong in this route!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}