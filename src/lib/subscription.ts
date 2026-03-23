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

export interface Subscription {
  id: string;
  userId: string;
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  paddleCustomerId: string | null;
  paddleSubscriptionId: string | null;
  paddlePriceId: string | null;
  billingInterval: 'month' | 'year' | null;
  currentPeriodStart: string;   // ISO date
  currentPeriodEnd: string;     // ISO date
  trialStart: string | null;    // ISO date
  trialEnd: string | null;      // ISO date
  cancelAtPeriodEnd: boolean;
  createdAt: string;
  updatedAt: string;
}
