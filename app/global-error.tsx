"use client";

import { useEffect } from "react";

export default function GlobalError({
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
    <html>
      <body>
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-purple-950 to-black flex items-center justify-center px-4">
          <div className="text-center space-y-6 max-w-md">
            <div className="text-8xl">👻</div>
            
            <h1 className="text-4xl font-bold text-purple-400">
              Something Spooky Happened
            </h1>
            
            <p className="text-gray-300 text-lg">
              The spirits have caused a disturbance...
            </p>
            
            <button
              onClick={reset}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
