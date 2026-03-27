'use client';

import { useSession } from 'next-auth/react';
import { useDbSync } from '@/hooks/useDbSync';
import { DebugTierToggle } from '@/components/dev/DebugTierToggle';
import { useEngagementInit } from '@/lib/engagement-init';
import { APP_NAME } from '@/lib/constants';
import Footer from '@/components/layout/Footer';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import DesktopSideNav from '@/components/layout/DesktopSideNav';
import { ToastContainer } from '@/components/ui/ToastNotification';
import { StoreToastBridge } from '@/components/ui/StoreToastBridge';
import { PushPrompt } from '@/components/engagement/PushPrompt';

function LoadingSkeleton() {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#FFB800] flex flex-col items-center justify-center">
      <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-4 animate-pulse">
        <span className="text-3xl font-black text-white select-none">M</span>
      </div>
      <p className="text-xl font-black text-white tracking-tight mb-6">{APP_NAME}</p>
      <div className="w-32 h-1 bg-white/30 rounded-full overflow-hidden">
        <div
          className="h-full bg-white rounded-full"
          style={{
            animation: 'loader-slide 1.2s ease-in-out infinite',
            width: '40%',
          }}
        />
      </div>
      <style>{`
        @keyframes loader-slide {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(180%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const { isHydrated } = useDbSync();

  // Initialize engagement systems (streak freeze, quests, league, comeback)
  // Wait for DB hydration so init doesn't run with empty/stale state
  useEngagementInit(isHydrated);

  const isAuthenticated = status === 'authenticated';
  const isLoading = status === 'loading';

  // Show branded loader while session loads or authenticated user hydrates data
  if (isLoading || (isAuthenticated && !isHydrated)) {
    return <LoadingSkeleton />;
  }

  // Unauthenticated users (landing page) get full-width layout
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <div id="main-content" className="flex-1">{children}</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="flex">
        {/* Desktop side nav */}
        <DesktopSideNav />

        <div className="flex-1 min-w-0 max-w-3xl mx-auto min-h-screen bg-[#FAFAFA] flex flex-col overflow-x-clip">
          <main id="main-content" className="flex-1 pb-16 lg:pb-0">
            {children}
          </main>
          <Footer />
        </div>
      </div>

      {/* Bottom nav for mobile navigation */}
      <MobileBottomNav />

      <DebugTierToggle />
      <ToastContainer />
      <StoreToastBridge />
      <PushPrompt />
    </div>
  );
}
