'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useDbSync } from '@/hooks/useDbSync';
import { useCourseStore } from '@/store/useCourseStore';
import { PROFESSIONS } from '@/data/professions';
import { APP_NAME } from '@/lib/constants';

import { useEngagementInit } from '@/lib/engagement-init';
import { useFlagStore } from '@/hooks/useFeatureFlags';
import Footer from '@/components/layout/Footer';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import DesktopSideNav from '@/components/layout/DesktopSideNav';
import { ToastContainer } from '@/components/ui/ToastNotification';
import { StoreToastBridge } from '@/components/ui/StoreToastBridge';
import { PushPrompt } from '@/components/engagement/PushPrompt';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const { isHydrated } = useDbSync();
  const activeProfession = useCourseStore((s) => s.activeProfession);

  // Build dynamic page title based on active course
  const courseTitle = (() => {
    if (status !== 'authenticated') return null;
    const profession = PROFESSIONS.find((p) => p.id === activeProfession);
    return profession ? `${profession.name} | ${APP_NAME}` : null;
  })();

  // Load feature flags from DB
  const loadFlags = useFlagStore((s) => s.load);
  const flagsLoaded = useFlagStore((s) => s.loaded);
  useEffect(() => { if (!flagsLoaded) loadFlags(); }, [loadFlags, flagsLoaded]);

  // Initialize engagement systems (streak freeze, quests, league, comeback)
  // Wait for DB hydration so init doesn't run with empty/stale state
  // Only run for authenticated users — league/engagement APIs require auth
  useEngagementInit(isHydrated && status === 'authenticated');

  const isAuthenticated = status === 'authenticated';

  // Unauthenticated users (landing page) get full-width layout
  if (status !== 'loading' && !isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <div id="main-content" className="flex-1">{children}</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-surface-950">
      {courseTitle && <title>{courseTitle}</title>}
      <div className="flex">
        {/* Desktop side nav */}
        <DesktopSideNav />

        <div className="flex-1 min-w-0 max-w-3xl mx-auto min-h-screen bg-[#FAFAFA] dark:bg-surface-950 flex flex-col overflow-x-clip">
          <main id="main-content" className="flex-1 pb-16 lg:pb-0">
            {children}
          </main>
          <Footer />
        </div>
      </div>

      {/* Bottom nav for mobile navigation */}
      <MobileBottomNav />

      <ToastContainer />
      <StoreToastBridge />
      <PushPrompt />
    </div>
  );
}
