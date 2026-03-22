'use client';

import { useEffect, useCallback } from 'react';
import { create } from 'zustand';
import { useSession } from 'next-auth/react';
import type { SubscriptionTier, SubscriptionStatus } from '@/lib/subscription';
import { FEATURES, LIMITS, type Feature } from '@/lib/pricing';

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
      }
    } catch {
      // Silently fail — user stays on free tier
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
  const store = useSubscriptionStore();

  // Fetch on mount when authenticated
  useEffect(() => {
    if (authStatus === 'authenticated' && !store.hasFetched) {
      store.fetch();
    }
    if (authStatus === 'unauthenticated') {
      store.reset();
    }
  }, [authStatus, store.hasFetched]); // eslint-disable-line react-hooks/exhaustive-deps

  // Refresh on window focus
  useEffect(() => {
    if (authStatus !== 'authenticated') return;

    const onFocus = () => store.fetch();
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [authStatus]); // eslint-disable-line react-hooks/exhaustive-deps

  // In dev mode, allow overriding the tier for testing
  const isDev = process.env.NODE_ENV === 'development';
  const activeTier = isDev && store.debugTierOverride ? store.debugTierOverride : store.tier;

  const isTrialing = store.status === 'trialing';
  const isPastDue = store.status === 'past_due';
  const isProUser = activeTier === 'pro' || isTrialing || isPastDue;

  const trialDaysLeft = (() => {
    if (!isTrialing || !store.trialEnd) return 0;
    const end = new Date(store.trialEnd);
    const now = new Date();
    return Math.max(0, Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
  })();

  const canAccess = useCallback(
    (feature: Feature): boolean => {
      // Trialing and past_due (grace period) both grant Pro access
      const effectiveTier = (isTrialing || isPastDue) ? 'pro' : activeTier;
      const tierDef = { features: getTierFeatures(effectiveTier) };
      return tierDef.features.includes(feature);
    },
    [activeTier, isTrialing, isPastDue],
  );

  return {
    tier: activeTier,
    status: store.status,
    isLoading: store.isLoading,
    hasFetched: store.hasFetched,
    isProUser,
    isTrialing,
    trialDaysLeft,
    cancelAtPeriodEnd: store.cancelAtPeriodEnd,
    currentPeriodEnd: store.currentPeriodEnd,
    canAccess,
    refresh: store.fetch,
  };
}

// ─── Internal ───────────────────────────────────────────────────

function getTierFeatures(tier: SubscriptionTier): Feature[] {
  if (tier === 'pro') {
    return [
      FEATURES.UNIT_ACCESS_ALL,
      FEATURES.UNLIMITED_PRACTICE,
      FEATURES.ALL_PRACTICE_MODES,
      FEATURES.FULL_ANALYTICS,
      FEATURES.STREAK_FREEZE,
      FEATURES.INTERVIEW_READINESS,
      FEATURES.DETAILED_EXPLANATIONS,
    ];
  }
  // free — basic topic practice only; advanced modes require Pro
  return [];
}
