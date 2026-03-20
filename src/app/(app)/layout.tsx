'use client';

import { useDbSync } from '@/hooks/useDbSync';

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4 animate-pulse">
          <span className="text-3xl">&#x2699;&#xFE0F;</span>
        </div>
        <p className="text-gray-500 font-medium">Loading your progress...</p>
        <div className="mt-3 flex justify-center gap-1">
          <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { isHydrated } = useDbSync();

  if (!isHydrated) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      <div className="max-w-lg mx-auto min-h-screen">
        {children}
      </div>
    </div>
  );
}
