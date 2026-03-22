// ============================================================
// Subscription Types — MechReady SaaS
// ============================================================

export type SubscriptionTier = 'free' | 'pro';

export type SubscriptionStatus =
  | 'active'
  | 'trialing'
  | 'past_due'
  | 'canceled'
  | 'unpaid'
  | 'incomplete';

export type BillingInterval = 'month' | 'year';

export interface Subscription {
  id: string;
  userId: string;
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  paddleCustomerId: string | null;
  paddleSubscriptionId: string | null;
  paddlePriceId: string | null;
  billingInterval: BillingInterval | null;
  currentPeriodStart: string;   // ISO date
  currentPeriodEnd: string;     // ISO date
  trialStart: string | null;    // ISO date
  trialEnd: string | null;      // ISO date
  cancelAtPeriodEnd: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionFeature {
  id: string;
  name: string;
  description: string;
  availableIn: SubscriptionTier[];
}

export interface FeatureAccessResult {
  allowed: boolean;
  reason: 'included' | 'trial_active' | 'limit_reached' | 'tier_required';
  requiredTier: SubscriptionTier;
  currentUsage?: number;
  limit?: number;
}

export interface TierLimitsResult {
  dailyQuestions: number;           // -1 = unlimited
  practiceModesUnlocked: boolean;
  fullAnalytics: boolean;
  streakFreezePerWeek: number;
  interviewReadinessScore: boolean;
  unlockedUnits: number[];          // unit indices (0-based)
}
