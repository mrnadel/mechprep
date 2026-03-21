'use client';

import { useSession } from 'next-auth/react';
import { useDbSync } from '@/hooks/useDbSync';
import { DebugTierToggle } from '@/components/dev/DebugTierToggle';

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
      <div className="text-center">
        <p className="text-lg font-black text-surface-800 mb-3">MechReady</p>
        <div className="flex justify-center gap-1">
          <div className="w-2 h-2 bg-surface-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-surface-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-surface-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const { isHydrated } = useDbSync();

  const isAuthenticated = status === 'authenticated';

  // Only show loading skeleton for authenticated users hydrating their data
  if (isAuthenticated && !isHydrated) {
    return <LoadingSkeleton />;
  }

  // Unauthenticated users (landing page) get full-width layout
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="max-w-[480px] mx-auto min-h-screen">
        {children}
      </div>
      <DebugTierToggle />
    </div>
  );
}
