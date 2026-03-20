// ============================================================
// Pricing & Feature Gating — MechPrep SaaS
// ============================================================

import type {
  SubscriptionTier,
  FeatureAccessResult,
  TierLimitsResult,
} from './subscription';

// --------------- Stripe Price IDs ---------------

export const STRIPE_PRICES = {
  PRO_MONTHLY: process.env.STRIPE_PRO_MONTHLY_PRICE_ID ?? '',
  PRO_YEARLY: process.env.STRIPE_PRO_YEARLY_PRICE_ID ?? '',
  TEAM_MONTHLY: process.env.STRIPE_TEAM_MONTHLY_PRICE_ID ?? '',
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
  TEAM_DASHBOARD: 'team_dashboard',
  TEAM_PROGRESS: 'team_progress',
  CUSTOM_QUESTION_SETS: 'custom_question_sets',
  BULK_LICENSING: 'bulk_licensing',
} as const;

export type Feature = (typeof FEATURES)[keyof typeof FEATURES];

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
  team: {
    dailyQuestions: -1,
    streakFreezesPerWeek: 1,
    unlockedUnits: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as number[],
  },
} as const;

// --------------- Tier Definitions ---------------

export interface TierDefinition {
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
    features: [
      FEATURES.ALL_PRACTICE_MODES,   // modes available, but daily cap applies
    ],
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
  team: {
    id: 'team',
    name: 'Team',
    tagline: 'Prepare your engineering team',
    priceMonthly: 2900,          // $29/month per seat
    priceYearly: 0,              // contact sales for annual
    minSeats: 5,
    features: [
      FEATURES.UNIT_ACCESS_ALL,
      FEATURES.UNLIMITED_PRACTICE,
      FEATURES.ALL_PRACTICE_MODES,
      FEATURES.FULL_ANALYTICS,
      FEATURES.STREAK_FREEZE,
      FEATURES.INTERVIEW_READINESS,
      FEATURES.DETAILED_EXPLANATIONS,
      FEATURES.TEAM_DASHBOARD,
      FEATURES.TEAM_PROGRESS,
      FEATURES.CUSTOM_QUESTION_SETS,
      FEATURES.BULK_LICENSING,
    ],
    highlighted: false,
  },
} as const;

// --------------- Pro Trial ---------------

export const PRO_TRIAL_DAYS = 7;

// --------------- Helper Functions ---------------

/**
 * Check whether a given tier has access to a specific feature.
 * During an active trial, the user has Pro-level access.
 */
export function getFeatureAccess(
  tier: SubscriptionTier,
  feature: Feature,
  options?: { isTrialing?: boolean; dailyQuestionsUsed?: number },
): FeatureAccessResult {
  const effectiveTier: SubscriptionTier =
    options?.isTrialing && tier === 'free' ? 'pro' : tier;

  const tierDef = TIERS[effectiveTier];
  const included = tierDef.features.includes(feature);

  // Special handling for daily question limits
  if (feature === FEATURES.UNLIMITED_PRACTICE && !included) {
    const limit = LIMITS[effectiveTier].dailyQuestions;
    const used = options?.dailyQuestionsUsed ?? 0;
    if (limit !== -1 && used >= limit) {
      return {
        allowed: false,
        reason: 'limit_reached',
        requiredTier: 'pro',
        currentUsage: used,
        limit,
      };
    }
    // Under the cap — allow even on free tier
    return {
      allowed: true,
      reason: effectiveTier === tier ? 'included' : 'trial_active',
      requiredTier: 'pro',
      currentUsage: used,
      limit,
    };
  }

  if (included) {
    return {
      allowed: true,
      reason: effectiveTier === tier ? 'included' : 'trial_active',
      requiredTier: tier,
    };
  }

  // Determine the cheapest tier that includes this feature
  const requiredTier: SubscriptionTier =
    TIERS.pro.features.includes(feature) ? 'pro' : 'team';

  return {
    allowed: false,
    reason: 'tier_required',
    requiredTier,
  };
}

/**
 * Return concrete limits for a tier (respecting trial state).
 */
export function getTierLimits(
  tier: SubscriptionTier,
  options?: { isTrialing?: boolean },
): TierLimitsResult {
  const effectiveTier: SubscriptionTier =
    options?.isTrialing && tier === 'free' ? 'pro' : tier;

  const limits = LIMITS[effectiveTier];
  const tierDef = TIERS[effectiveTier];

  return {
    dailyQuestions: limits.dailyQuestions,
    practiceModesUnlocked: tierDef.features.includes(FEATURES.ALL_PRACTICE_MODES),
    fullAnalytics: tierDef.features.includes(FEATURES.FULL_ANALYTICS),
    streakFreezePerWeek: limits.streakFreezesPerWeek,
    interviewReadinessScore: tierDef.features.includes(FEATURES.INTERVIEW_READINESS),
    unlockedUnits: [...limits.unlockedUnits],
    teamFeatures: tierDef.features.includes(FEATURES.TEAM_DASHBOARD),
    customQuestionSets: tierDef.features.includes(FEATURES.CUSTOM_QUESTION_SETS),
  };
}

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
