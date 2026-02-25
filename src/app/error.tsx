'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#F7F8FA] dark:bg-[#0D0D14] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 bg-orange-50 dark:bg-orange-900/20 rounded-3xl flex items-center justify-center mb-8 shadow-xl shadow-orange-500/10">
        <AlertTriangle className="w-10 h-10 text-orange-500" />
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Application Error</h1>
      <p className="text-gray-500 dark:text-gray-400 max-w-md mb-10 leading-relaxed font-medium">
        Something unexpected happened. We've been notified and are working on it.
      </p>
      
      <button
        onClick={() => reset()}
        className="flex items-center justify-center gap-3 px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/20 transition-all active:scale-[0.98]"
      >
        <RefreshCw className="w-5 h-5" />
        Attempt Recovery
      </button>
    </div>
  );
}
