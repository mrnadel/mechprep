'use client';

import { useSession } from 'next-auth/react';
import { useDbSync } from '@/hooks/useDbSync';
import { DebugTierToggle } from '@/components/dev/DebugTierToggle';
import { useEngagementInit } from '@/lib/engagement-init';
import Footer from '@/components/layout/Footer';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import DesktopSideNav from '@/components/layout/DesktopSideNav';

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

  // Initialize engagement systems (streak freeze, quests, league, comeback)
  useEngagementInit();

  const isAuthenticated = status === 'authenticated';

  // Only show loading skeleton for authenticated users hydrating their data
  if (isAuthenticated && !isHydrated) {
    return <LoadingSkeleton />;
  }

  // Unauthenticated users (landing page) get full-width layout
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] lg:flex lg:justify-center">
      {/* Left sidebar for desktop navigation */}
      <DesktopSideNav />

      <div className="min-h-screen bg-[#FAFAFA] flex flex-col flex-1 lg:flex-none lg:w-[768px]">
        <main className="flex-1 pb-16 lg:pb-0">
          {children}
        </main>
        <Footer />
      </div>

      {/* Bottom nav for mobile navigation */}
      <MobileBottomNav />

      <DebugTierToggle />
    </div>
  );
}
