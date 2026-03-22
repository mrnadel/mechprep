// ============================================================
// Server-Side Access Control — MechReady SaaS
// ============================================================

import { eq, and, sql } from 'drizzle-orm';
import { db } from './db';
import { subscriptions, dailyUsage } from './db/schema';
import { LIMITS, PRO_SESSION_TYPES } from './pricing';
import type { SubscriptionTier } from './subscription';

function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Resolve the effective tier for a user.
 * Returns 'free' if no subscription row exists.
 * Treats 'trialing' as 'pro' for access purposes.
 */
async function getEffectiveTier(userId: string): Promise<SubscriptionTier> {
  const [sub] = await db
    .select({ tier: subscriptions.tier, status: subscriptions.status, trialEnd: subscriptions.trialEnd })
    .from(subscriptions)
    .where(eq(subscriptions.userId, userId))
    .limit(1);

  if (!sub) return 'free';

  // Active trial counts as pro
  if (sub.status === 'trialing') {
    const trialEnd = sub.trialEnd ? new Date(sub.trialEnd) : null;
    if (trialEnd && trialEnd > new Date()) return 'pro';
    return 'free';
  }

  if (sub.status === 'active') return sub.tier as SubscriptionTier;

  // past_due still grants access (grace period)
  if (sub.status === 'past_due') return sub.tier as SubscriptionTier;

  return 'free';
}

/**
 * Check if a user can access a specific course unit.
 * Free users: unit 1 only (index 0). Pro: all units.
 */
export async function canAccessUnit(
  userId: string,
  unitIndex: number,
): Promise<{ allowed: boolean; tier: SubscriptionTier }> {
  const tier = await getEffectiveTier(userId);
  const allowed = LIMITS[tier].unlockedUnits.includes(unitIndex);
  return { allowed, tier };
}

/**
 * Check if a user can start a practice session.
 * Free users: 5 questions per day. Pro: unlimited.
 */
export async function canStartPracticeSession(
  userId: string,
): Promise<{ allowed: boolean; tier: SubscriptionTier; remaining: number; limit: number }> {
  const tier = await getEffectiveTier(userId);
  const limit = LIMITS[tier].dailyQuestions;

  // Unlimited
  if (limit === -1) {
    return { allowed: true, tier, remaining: -1, limit: -1 };
  }

  const used = await getDailyQuestionsUsed(userId);
  const remaining = Math.max(0, limit - used);

  return { allowed: remaining > 0, tier, remaining, limit };
}

/**
 * Check analytics access level.
 */
export async function canAccessAnalytics(
  userId: string,
): Promise<{ fullAccess: boolean; tier: SubscriptionTier }> {
  const tier = await getEffectiveTier(userId);
  const fullAccess = tier === 'pro';
  return { fullAccess, tier };
}

/**
 * Get remaining daily questions for a user.
 */
export async function getRemainingDailyQuestions(
  userId: string,
): Promise<{ remaining: number; used: number; limit: number; tier: SubscriptionTier }> {
  const tier = await getEffectiveTier(userId);
  const limit = LIMITS[tier].dailyQuestions;

  if (limit === -1) {
    return { remaining: -1, used: 0, limit: -1, tier };
  }

  const used = await getDailyQuestionsUsed(userId);
  return { remaining: Math.max(0, limit - used), used, limit, tier };
}

/**
 * Increment the daily question counter. Call after each question answered.
 */
export async function incrementDailyUsage(userId: string): Promise<void> {
  const today = getTodayString();

  // Try atomic increment first (handles the common case without a race condition)
  const result = await db
    .update(dailyUsage)
    .set({
      questionsUsed: sql`${dailyUsage.questionsUsed} + 1`,
      updatedAt: new Date(),
    })
    .where(and(eq(dailyUsage.userId, userId), eq(dailyUsage.date, today)));

  // If no row was updated, this is the first question today — insert
  if (result.rowCount === 0) {
    await db.insert(dailyUsage).values({
      userId,
      date: today,
      questionsUsed: 1,
    }).onConflictDoNothing();

    // If insert was a no-op (concurrent insert won), do the increment
    if (result.rowCount === 0) {
      await db
        .update(dailyUsage)
        .set({
          questionsUsed: sql`${dailyUsage.questionsUsed} + 1`,
          updatedAt: new Date(),
        })
        .where(and(eq(dailyUsage.userId, userId), eq(dailyUsage.date, today)));
    }
  }
}

/**
 * Check if a user can access a specific practice mode.
 * Pro-only modes: adaptive, interview-sim, weak-areas.
 */
export async function canAccessPracticeMode(
  userId: string,
  sessionType: string,
): Promise<{ allowed: boolean; tier: SubscriptionTier }> {
  const tier = await getEffectiveTier(userId);
  if (!PRO_SESSION_TYPES.has(sessionType as any)) {
    return { allowed: true, tier };
  }
  return { allowed: tier === 'pro', tier };
}

// ─── Internal helpers ───────────────────────────────────────────

async function getDailyQuestionsUsed(userId: string): Promise<number> {
  const today = getTodayString();

  const [row] = await db
    .select({ questionsUsed: dailyUsage.questionsUsed })
    .from(dailyUsage)
    .where(and(eq(dailyUsage.userId, userId), eq(dailyUsage.date, today)))
    .limit(1);

  return row?.questionsUsed ?? 0;
}
