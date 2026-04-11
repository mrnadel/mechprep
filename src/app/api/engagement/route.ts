import { NextRequest, NextResponse } from 'next/server';
import { eq, sql } from 'drizzle-orm';
import { db } from '@/lib/db';
import { userProgress, gemTransactions, questProgress, subscriptions } from '@/lib/db/schema';
import { getAuthUserId } from '@/lib/auth-utils';
import { engagementSyncSchema } from '@/lib/validation';
import { insertActivity } from '@/lib/activity-feed';

// Hearts constants (must match client)
const FREE_MAX_HEARTS = 5;
const RECHARGE_INTERVAL_MS = 14400000; // 4 hours

// Streak freeze cap (must match client gem-shop config)
const MAX_STREAK_FREEZES = 2;

/** Check if user is on a paid/trial tier (pro users have unlimited hearts). */
async function isProUser(userId: string): Promise<boolean> {
  const [sub] = await db
    .select({ tier: subscriptions.tier, status: subscriptions.status, trialEnd: subscriptions.trialEnd })
    .from(subscriptions)
    .where(eq(subscriptions.userId, userId))
    .limit(1);
  if (!sub) return false;
  if (sub.status === 'trialing') {
    const trialEnd = sub.trialEnd ? new Date(sub.trialEnd) : null;
    return !!trialEnd && !isNaN(trialEnd.getTime()) && trialEnd > new Date();
  }
  return sub.status === 'active' || sub.status === 'past_due';
}

/**
 * Compute the server-authoritative heart count.
 * Uses the stored lastRechargeAt + elapsed time to calculate recharges,
 * then clamps to max. Pro users always get max.
 */
function computeHearts(
  storedCurrent: number,
  storedLastRechargeAt: number,
  isPro: boolean,
): { current: number; lastRechargeAt: number } {
  if (isPro) return { current: FREE_MAX_HEARTS, lastRechargeAt: Date.now() };

  const max = FREE_MAX_HEARTS;
  let current = Math.min(storedCurrent, max); // clamp: never above max
  let lastRechargeAt = storedLastRechargeAt;

  if (current < max && lastRechargeAt > 0) {
    const elapsed = Date.now() - lastRechargeAt;
    const heartsToRecharge = Math.floor(elapsed / RECHARGE_INTERVAL_MS);
    if (heartsToRecharge > 0) {
      current = Math.min(current + heartsToRecharge, max);
      lastRechargeAt = current >= max
        ? Date.now()
        : lastRechargeAt + heartsToRecharge * RECHARGE_INTERVAL_MS;
    }
  }

  return { current, lastRechargeAt };
}

/**
 * Allowlist of legitimate gem transaction sources and their max absolute amounts.
 * Any transaction with an unrecognized source or exceeding the cap is silently dropped.
 */
const VALID_GEM_SOURCES: Record<string, { maxEarn: number; maxSpend: number }> = {
  // Earning
  quest_reward:       { maxEarn: 15,  maxSpend: 0 },
  daily_chest:        { maxEarn: 10,  maxSpend: 0 },
  weekly_chest:       { maxEarn: 40,  maxSpend: 0 },
  league_promotion:   { maxEarn: 25,  maxSpend: 0 },
  '3_star_first_time':{ maxEarn: 10,  maxSpend: 0 },
  // Gap 5: Friend quests
  friend_quest_reward:         { maxEarn: 30,  maxSpend: 0 },
  // Gap 10: Daily rewards
  daily_reward_calendar:       { maxEarn: 25,  maxSpend: 0 },
  daily_reward_bonus_overflow: { maxEarn: 15,  maxSpend: 0 },
  mystery_reward:              { maxEarn: 50,  maxSpend: 0 },
  // Gap 11: Story narrative
  story_unlock:                { maxEarn: 15,  maxSpend: 0 },
  // Spending
  shop_purchase:      { maxEarn: 0,   maxSpend: 350 },
  streak_repair:      { maxEarn: 0,   maxSpend: 75 },
  heart_purchase:     { maxEarn: 0,   maxSpend: 100 },
  heart_refill:       { maxEarn: 0,   maxSpend: 500 },
};

// Dynamic sources: level_up_N (max 100) and streak_milestone_N (max 500)
function getSourceLimits(source: string): { maxEarn: number; maxSpend: number } | null {
  if (VALID_GEM_SOURCES[source]) return VALID_GEM_SOURCES[source];
  if (source.startsWith('level_up_'))          return { maxEarn: 100, maxSpend: 0 };
  if (source.startsWith('streak_milestone_'))  return { maxEarn: 500, maxSpend: 0 };
  return null; // Unknown source — reject
}

/** Filter and validate gem transactions. Only known sources with valid amounts pass through. */
function validateTransactions(txs: Array<{ amount: number; source: string }>): Array<{ amount: number; source: string }> {
  return txs.filter((t) => {
    const limits = getSourceLimits(t.source);
    if (!limits) return false;
    if (t.amount > 0 && t.amount > limits.maxEarn) return false;
    if (t.amount < 0 && Math.abs(t.amount) > limits.maxSpend) return false;
    return true;
  });
}

/**
 * Compute authoritative gem balance + totalEarned from the gem_transactions ledger.
 * This is the ONLY way balance is determined - never trust client-sent balance.
 */
async function computeGemBalanceFromLedger(userId: string) {
  const result = await db
    .select({
      balance: sql<number>`COALESCE(SUM(${gemTransactions.amount}), 0)`.as('balance'),
      totalEarned: sql<number>`COALESCE(SUM(CASE WHEN ${gemTransactions.amount} > 0 THEN ${gemTransactions.amount} ELSE 0 END), 0)`.as('total_earned'),
    })
    .from(gemTransactions)
    .where(eq(gemTransactions.userId, userId));

  return {
    balance: Math.max(0, Number(result[0]?.balance ?? 0)),
    totalEarned: Number(result[0]?.totalEarned ?? 0),
  };
}

/**
 * GET /api/engagement
 * Returns the user's engagement state from the DB.
 * Gem balance is computed from the transaction ledger (server-authoritative).
 */
export async function GET() {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const [progressRows, questRows, gemTotals, pro] = await Promise.all([
    db.select().from(userProgress).where(eq(userProgress.userId, userId)).limit(1),
    db.select().from(questProgress).where(eq(questProgress.userId, userId)),
    computeGemBalanceFromLedger(userId),
    isProUser(userId),
  ]);

  const progress = progressRows[0];

  // Server-authoritative hearts: clamp to max and apply recharge based on elapsed time
  const storedHearts = progress?.heartsCurrent ?? FREE_MAX_HEARTS;
  const storedRechargeAt = progress?.heartsLastRechargeAt
    ? parseInt(progress.heartsLastRechargeAt, 10)
    : Date.now();
  const hearts = computeHearts(storedHearts, storedRechargeAt, pro);

  const engagement = {
    gems: {
      balance: gemTotals.balance,
      totalEarned: gemTotals.totalEarned,
      inventory: progress?.gemsInventory ?? { activeTitles: [], activeFrames: [] },
      selectedTitle: progress?.selectedTitle ?? null,
      selectedFrame: progress?.selectedFrame ?? null,
    },
    streak: {
      freezesOwned: progress?.streakFreezes ?? 0,
      milestonesReached: (progress?.streakMilestones as number[]) ?? [],
    },
    hearts,
    doubleXpExpiry: progress?.doubleXpExpiry ?? null,
    quests: {
      daily: questRows.find((q) => q.questType === 'daily') ?? null,
      weekly: questRows.find((q) => q.questType === 'weekly') ?? null,
    },
    dailyRewardCalendar: progress?.dailyRewardCalendar ?? null,
  };

  return NextResponse.json(engagement);
}

/**
 * POST /api/engagement
 * Syncs engagement state from client to DB.
 * Server is authoritative: validates and caps all values.
 */
export async function POST(request: NextRequest) {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = engagementSyncSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid input', details: parsed.error.issues[0]?.message },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // 1. Validate and insert new gem transactions FIRST (before computing balance).
  //    Only transactions with known sources and valid amounts are accepted.
  if (data.newGemTransactions?.length) {
    const validTxs = validateTransactions(data.newGemTransactions);
    if (validTxs.length > 0) {
      await db.insert(gemTransactions).values(
        validTxs.map((t) => ({
          userId,
          amount: t.amount,
          source: t.source,
        })),
      );
    }
  }

  // 2. Compute authoritative balance from the transaction ledger.
  //    NEVER trust client-sent balance - it can be tampered with.
  const [gemTotals, pro] = await Promise.all([
    computeGemBalanceFromLedger(userId),
    isProUser(userId),
  ]);

  // 3. Server-authoritative hearts: clamp client value to free-tier max.
  //    Pro users always have full hearts. Free users cannot exceed 5.
  const validatedHearts = computeHearts(
    data.hearts.current,
    data.hearts.lastRechargeAt,
    pro,
  );

  // 4. Upsert engagement columns on userProgress
  const existing = await db
    .select({ id: userProgress.id, streakMilestones: userProgress.streakMilestones, streakFreezes: userProgress.streakFreezes })
    .from(userProgress)
    .where(eq(userProgress.userId, userId))
    .limit(1);

  // Validate streak freezes: increases must be backed by a shop_purchase in this sync.
  const dbFreezes = existing[0]?.streakFreezes ?? 0;
  let validatedFreezes: number;
  if (data.streak.freezesOwned <= dbFreezes) {
    // Client used a freeze — accept decrease
    validatedFreezes = data.streak.freezesOwned;
  } else {
    // Client claims more freezes — only allow if backed by shop_purchase tx in this batch
    const freezePurchaseCount = (data.newGemTransactions ?? [])
      .filter((t: { amount: number; source: string }) => t.source === 'shop_purchase' && t.amount < 0)
      .length;
    const maxAllowed = Math.min(dbFreezes + freezePurchaseCount, MAX_STREAK_FREEZES);
    validatedFreezes = Math.min(data.streak.freezesOwned, maxAllowed);
  }

  // Validate doubleXpExpiry: reject if too far in future or in the past
  let validatedDoubleXpExpiry = data.doubleXpExpiry;
  if (validatedDoubleXpExpiry) {
    const expiry = new Date(validatedDoubleXpExpiry).getTime();
    const now = Date.now();
    const DOUBLE_XP_DURATION_MS = 30 * 60 * 1000; // 30 minutes
    const BUFFER_MS = 60 * 1000; // 1 minute buffer

    if (isNaN(expiry) || expiry <= now || expiry > now + DOUBLE_XP_DURATION_MS + BUFFER_MS) {
      validatedDoubleXpExpiry = null;
    }
  }

  const engagementData = {
    gemsBalance: gemTotals.balance,
    gemsTotalEarned: gemTotals.totalEarned,
    gemsInventory: data.gems.inventory,
    selectedTitle: data.gems.selectedTitle,
    selectedFrame: data.gems.selectedFrame,
    streakFreezes: validatedFreezes,
    streakMilestones: data.streak.milestonesReached,
    heartsCurrent: validatedHearts.current,
    heartsLastRechargeAt: String(validatedHearts.lastRechargeAt),
    doubleXpExpiry: validatedDoubleXpExpiry,
    ...(data.dailyRewardCalendar ? {
      dailyRewardCalendar: {
        currentDay: data.dailyRewardCalendar.day,
        lastClaimDate: data.dailyRewardCalendar.lastClaimDate,
        todayClaimed: data.dailyRewardCalendar.claimedDays.includes(data.dailyRewardCalendar.day),
        cycleStartDate: data.dailyRewardCalendar.weekStartDate,
        cyclesCompleted: 0, // tracked client-side; server just stores latest snapshot
      },
    } : {}),
    updatedAt: new Date(),
  };

  if (existing.length > 0) {
    await db
      .update(userProgress)
      .set(engagementData)
      .where(eq(userProgress.userId, userId));
  } else {
    await db.insert(userProgress).values({ userId, ...engagementData });
  }

  // Check for new streak milestones and insert activities
  if (data.streak.milestonesReached.length > 0) {
    const existingMilestones = (existing[0]?.streakMilestones as number[]) ?? [];
    const newMilestones = data.streak.milestonesReached.filter(
      (m: number) => !existingMilestones.includes(m),
    );
    for (const days of newMilestones) {
      await insertActivity(userId, 'streak_milestone', { streakDays: days });
    }
  }

  // Upsert quest progress (delete + re-insert; quest data changes frequently)
  if (data.quests) {
    const { dailyQuests, weeklyQuests, dailyQuestDate, weeklyQuestDate, dailyChestClaimed, weeklyChestClaimed } = data.quests;

    await db.delete(questProgress).where(eq(questProgress.userId, userId));

    const questRows = [];
    if (dailyQuestDate && dailyQuests.length > 0) {
      questRows.push({
        userId,
        questDate: dailyQuestDate,
        questType: 'daily' as const,
        quests: dailyQuests,
        chestClaimed: dailyChestClaimed,
      });
    }
    if (weeklyQuestDate && weeklyQuests.length > 0) {
      questRows.push({
        userId,
        questDate: weeklyQuestDate,
        questType: 'weekly' as const,
        quests: weeklyQuests,
        chestClaimed: weeklyChestClaimed,
      });
    }
    if (questRows.length > 0) {
      await db.insert(questProgress).values(questRows);
    }
  }

  return NextResponse.json({ ok: true });
}
