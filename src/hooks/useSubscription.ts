'use client';

import { useEffect, useCallback } from 'react';
import { create } from 'zustand';
import { useSession } from 'next-auth/react';
import type { SubscriptionTier, SubscriptionStatus } from '@/lib/subscription';
import { FEATURES, type Feature } from '@/lib/pricing';

// ─── Subscription Store ─────────────────────────────────────────

interface SubscriptionState {
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  billingInterval: string | null;
  currentPeriodEnd: string | null;
  trialEnd: string | null;
  cancelAtPeriodEnd: boolean;
  isLoading: boolean;
  hasFetched: boolean;
  debugTierOverride: SubscriptionTier | null;
  fetch: () => Promise<void>;
  reset: () => void;
  setDebugTierOverride: (tier: SubscriptionTier | null) => void;
}

const defaultState = {
  tier: 'free' as SubscriptionTier,
  status: 'active' as SubscriptionStatus,
  billingInterval: null,
  currentPeriodEnd: null,
  trialEnd: null,
  cancelAtPeriodEnd: false,
  isLoading: false,
  hasFetched: false,
  debugTierOverride: null as SubscriptionTier | null,
};

export const useSubscriptionStore = create<SubscriptionState>()((set, get) => ({
  ...defaultState,

  fetch: async () => {
    if (get().isLoading) return;
    set({ isLoading: true });

    try {
      const res = await fetch('/api/paddle/subscription');
      if (res.ok) {
        const { subscription } = await res.json();
        set({
          tier: subscription.tier,
          status: subscription.status,
          billingInterval: subscription.billingInterval,
          currentPeriodEnd: subscription.currentPeriodEnd,
          trialEnd: subscription.trialEnd,
          cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
          hasFetched: true,
        });
      } else {
        // Server returned error - mark as fetched to prevent infinite retries
        set({ hasFetched: true });
      }
    } catch {
      // Silently fail — user stays on free tier
      set({ hasFetched: true });
    } finally {
      set({ isLoading: false });
    }
  },

  reset: () => set(defaultState),
  setDebugTierOverride: (tier) => set({ debugTierOverride: tier }),
}));

// ─── Hook ───────────────────────────────────────────────────────

export function useSubscription() {
  const { status: authStatus } = useSession();
  // Select only the fields we need to avoid re-renders on unrelated store changes
  const tier = useSubscriptionStore((s) => s.tier);
  const status = useSubscriptionStore((s) => s.status);
  const isLoading = useSubscriptionStore((s) => s.isLoading);
  const hasFetched = useSubscriptionStore((s) => s.hasFetched);
  const cancelAtPeriodEnd = useSubscriptionStore((s) => s.cancelAtPeriodEnd);
  const currentPeriodEnd = useSubscriptionStore((s) => s.currentPeriodEnd);
  const trialEnd = useSubscriptionStore((s) => s.trialEnd);
  const debugTierOverride = useSubscriptionStore((s) => s.debugTierOverride);
  const fetchSub = useSubscriptionStore((s) => s.fetch);
  const resetSub = useSubscriptionStore((s) => s.reset);

  // Fetch on mount when authenticated
  useEffect(() => {
    if (authStatus === 'authenticated' && !hasFetched) {
      fetchSub();
    }
    if (authStatus === 'unauthenticated') {
      resetSub();
    }
  }, [authStatus, hasFetched, fetchSub, resetSub]);

  // Refresh on window focus (throttled — at most once per 5 minutes)
  useEffect(() => {
    if (authStatus !== 'authenticated') return;

    let lastFetchTime = 0;
    const THROTTLE_MS = 5 * 60 * 1000;

    const onFocus = () => {
      const now = Date.now();
      if (now - lastFetchTime > THROTTLE_MS) {
        lastFetchTime = now;
        fetchSub();
      }
    };
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [authStatus, fetchSub]);

  // In dev mode, allow overriding the tier for testing
  const isDev = process.env.NODE_ENV === 'development';
  const activeTier = isDev && debugTierOverride ? debugTierOverride : tier;

  const isTrialing = status === 'trialing';
  const isPastDue = status === 'past_due';
  const isProUser = activeTier === 'pro' || isTrialing || isPastDue;

  const trialDaysLeft = (() => {
    if (!isTrialing || !trialEnd) return 0;
    const end = new Date(trialEnd);
    const now = new Date();
    return Math.max(0, Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
  })();

  const canAccess = useCallback(
    (feature: Feature): boolean => {
      const effectiveTier = (isTrialing || isPastDue) ? 'pro' : activeTier;
      const tierDef = { features: getTierFeatures(effectiveTier) };
      return tierDef.features.includes(feature);
    },
    [activeTier, isTrialing, isPastDue],
  );

  return {
    tier: activeTier,
    status,
    isLoading,
    hasFetched,
    isProUser,
    isTrialing,
    trialDaysLeft,
    cancelAtPeriodEnd,
    currentPeriodEnd,
    canAccess,
    refresh: fetchSub,
  };
}

// ─── Internal ───────────────────────────────────────────────────

function getTierFeatures(tier: SubscriptionTier): Feature[] {
  if (tier === 'pro') {
    return [
      FEATURES.UNLIMITED_HEARTS,
      FEATURES.STREAK_FREEZE,
      FEATURES.FULL_ANALYTICS,
      FEATURES.DOUBLE_XP_WEEKENDS,
      FEATURES.DETAILED_EXPLANATIONS,
      FEATURES.PREMIUM_LEAGUE_REWARDS,
      FEATURES.NO_ADS,
    ];
  }
  // free — all content accessible; Pro gates convenience (hearts, streak freeze, etc.)
  return [];
}
