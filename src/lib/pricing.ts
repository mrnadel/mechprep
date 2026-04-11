// ============================================================
// Pricing & Feature Gating — Octokeen SaaS
// ============================================================

import type {
  SubscriptionTier,
} from './subscription';

// --------------- Paddle Price IDs ---------------

export const PADDLE_PRICES = {
  PRO_MONTHLY: process.env.NEXT_PUBLIC_PADDLE_PRO_MONTHLY_PRICE_ID || process.env.PADDLE_PRO_MONTHLY_PRICE_ID || '',
  PRO_YEARLY: process.env.NEXT_PUBLIC_PADDLE_PRO_YEARLY_PRICE_ID || process.env.PADDLE_PRO_YEARLY_PRICE_ID || '',
} as const;

// --------------- Features ---------------

export const FEATURES = {
  UNLIMITED_HEARTS: 'unlimited_hearts',
  STREAK_FREEZE: 'streak_freeze',
  FULL_ANALYTICS: 'full_analytics',
  DOUBLE_XP_WEEKENDS: 'double_xp_weekends',
  DETAILED_EXPLANATIONS: 'detailed_explanations',
  PREMIUM_LEAGUE_REWARDS: 'premium_league_rewards',
  NO_ADS: 'no_ads',
  PRACTICE_MISTAKES: 'practice_mistakes',
  PRACTICE_REVIEW: 'practice_review',
} as const;

export type Feature = (typeof FEATURES)[keyof typeof FEATURES];

// --------------- Pro-Only Practice Modes ---------------
// All practice modes are now free. Hearts are the sole friction lever.
export const PRO_SESSION_TYPES: ReadonlySet<string> = new Set([]);

// --------------- Daily / Usage Limits ---------------

export const LIMITS = {
  free: {
    dailyQuestions: -1,               // unlimited — hearts are the rate limiter now
    streakFreezesPerWeek: 0,
    unlockedUnits: 'all' as number[] | 'all', // all units free
  },
  pro: {
    dailyQuestions: -1,               // unlimited
    streakFreezesPerWeek: 1,
    unlockedUnits: 'all' as number[] | 'all', // all units
  },
} as const;

/** Check if a unit index is unlocked for a given set of unlocked units. */
export function isUnitUnlocked(unlockedUnits: readonly number[] | 'all', unitIndex: number): boolean {
  return unlockedUnits === 'all' || unlockedUnits.includes(unitIndex);
}

// --------------- Tier Definitions ---------------

interface TierDefinition {
  id: SubscriptionTier;
  name: string;
  tagline: string;
  priceMonthly: number;        // USD cents (0 for free)
  priceYearly: number;         // USD cents (0 for free)
  minSeats: number;            // 1 for individual tiers
  features: Feature[];
  highlighted: boolean;        // used to emphasize the "best value" tier in UI
}

export const TIERS: Record<SubscriptionTier, TierDefinition> = {
  free: {
    id: 'free',
    name: 'Free',
    tagline: 'All content, 5 hearts per session',
    priceMonthly: 0,
    priceYearly: 0,
    minSeats: 1,
    features: [],   // all content free; Pro gates convenience (hearts, streak freeze, etc.)
    highlighted: false,
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    tagline: 'Unlimited hearts & premium perks',
    priceMonthly: 799,           // $7.99/month
    priceYearly: 4999,           // $49.99/year (~$4.17/month)
    minSeats: 1,
    features: [
      FEATURES.UNLIMITED_HEARTS,
      FEATURES.STREAK_FREEZE,
      FEATURES.FULL_ANALYTICS,
      FEATURES.DOUBLE_XP_WEEKENDS,
      FEATURES.DETAILED_EXPLANATIONS,
      FEATURES.PREMIUM_LEAGUE_REWARDS,
      FEATURES.PRACTICE_MISTAKES,
      FEATURES.PRACTICE_REVIEW,
    ],
    highlighted: true,
  },
} as const;

/**
 * Format a price in cents to a display string.
 */
export function formatPrice(cents: number): string {
  if (cents === 0) return 'Free';
  return `$${(cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)}`;
}

/**
 * Calculate yearly savings as a percentage compared to monthly billing.
 */
export function getYearlySavingsPercent(tier: SubscriptionTier): number {
  const def = TIERS[tier];
  if (def.priceMonthly === 0 || def.priceYearly === 0) return 0;
  const monthlyCostPerYear = def.priceMonthly * 12;
  return Math.round(((monthlyCostPerYear - def.priceYearly) / monthlyCostPerYear) * 100);
}
