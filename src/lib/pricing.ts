// ============================================================
// Pricing & Feature Gating — MechReady SaaS
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
  UNIT_ACCESS_ALL: 'unit_access_all',
  UNLIMITED_PRACTICE: 'unlimited_practice',
  ALL_PRACTICE_MODES: 'all_practice_modes',
  FULL_ANALYTICS: 'full_analytics',
  STREAK_FREEZE: 'streak_freeze',
  INTERVIEW_READINESS: 'interview_readiness',
  DETAILED_EXPLANATIONS: 'detailed_explanations',
} as const;

export type Feature = (typeof FEATURES)[keyof typeof FEATURES];

// --------------- Pro-Only Practice Modes ---------------
// Session types that require ALL_PRACTICE_MODES (Pro tier).
// Keep in sync with SessionType from store/useStore.ts.
export const PRO_SESSION_TYPES: ReadonlySet<string> = new Set([
  'adaptive',
  'interview-sim',
  'weak-areas',
]);

// --------------- Daily / Usage Limits ---------------

export const LIMITS = {
  free: {
    dailyQuestions: 5,
    streakFreezesPerWeek: 0,
    unlockedUnits: [0] as number[],   // unit 1 only (0-indexed)
  },
  pro: {
    dailyQuestions: -1,               // unlimited
    streakFreezesPerWeek: 1,
    unlockedUnits: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as number[],
  },
} as const;

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
    tagline: 'Start your prep journey',
    priceMonthly: 0,
    priceYearly: 0,
    minSeats: 1,
    features: [],   // basic topic practice only; advanced modes require Pro
    highlighted: false,
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    tagline: 'Unlock your full potential',
    priceMonthly: 900,           // $9/month
    priceYearly: 7900,           // $79/year (~$6.58/month)
    minSeats: 1,
    features: [
      FEATURES.UNIT_ACCESS_ALL,
      FEATURES.UNLIMITED_PRACTICE,
      FEATURES.ALL_PRACTICE_MODES,
      FEATURES.FULL_ANALYTICS,
      FEATURES.STREAK_FREEZE,
      FEATURES.INTERVIEW_READINESS,
      FEATURES.DETAILED_EXPLANATIONS,
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
