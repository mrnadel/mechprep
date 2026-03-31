'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useSubscription } from '@/hooks/useSubscription';

// Show an interstitial every N lesson/session completions
const AD_FREQUENCY = 2;
// Minimum time between interstitial ads (2 minutes)
const AD_COOLDOWN_MS = 120_000;

interface AdState {
  completionsSinceLastAd: number;
  lastAdShownAt: number;
  recordCompletion: () => void;
  recordAdShown: () => void;
}

const useAdStore = create<AdState>()(
  persist(
    (set, get) => ({
      completionsSinceLastAd: 0,
      lastAdShownAt: 0,

      recordCompletion: () => {
        set({ completionsSinceLastAd: get().completionsSinceLastAd + 1 });
      },

      recordAdShown: () => {
        set({ completionsSinceLastAd: 0, lastAdShownAt: Date.now() });
      },
    }),
    {
      name: 'octokeen-ads',
      partialize: (state) => ({
        completionsSinceLastAd: state.completionsSinceLastAd,
        lastAdShownAt: state.lastAdShownAt,
      }),
    }
  )
);

export function useAdManager() {
  const { isProUser } = useSubscription();
  const completionsSinceLastAd = useAdStore((s) => s.completionsSinceLastAd);
  const lastAdShownAt = useAdStore((s) => s.lastAdShownAt);
  const recordCompletion = useAdStore((s) => s.recordCompletion);
  const recordAdShown = useAdStore((s) => s.recordAdShown);

  const cooldownElapsed = Date.now() - lastAdShownAt >= AD_COOLDOWN_MS;
  const frequencyMet = completionsSinceLastAd >= AD_FREQUENCY;
  const shouldShowAd = !isProUser && frequencyMet && cooldownElapsed;

  return {
    shouldShowAd,
    recordCompletion,
    recordAdShown,
    isProUser,
  };
}
