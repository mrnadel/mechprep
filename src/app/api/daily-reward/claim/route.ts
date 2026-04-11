import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { userProgress, gemTransactions } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/auth-utils';
import { DAILY_REWARD_CYCLE } from '@/data/daily-rewards';
import { MAX_STREAK_FREEZES } from '@/data/engagement-types';

export async function POST() {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const today = new Date().toISOString().split('T')[0];

  // Use a transaction to prevent TOCTOU race conditions (double claiming)
  const result = await db.transaction(async (tx) => {
    const rows = await tx
      .select({
        dailyRewardCalendar: userProgress.dailyRewardCalendar,
        streakFreezes: userProgress.streakFreezes,
      })
      .from(userProgress)
      .where(eq(userProgress.userId, userId))
      .limit(1);

    if (rows.length === 0) return { error: 'No progress record', status: 404 } as const;

    const cal = rows[0].dailyRewardCalendar as {
      currentDay: number;
      lastClaimDate: string | null;
      todayClaimed: boolean;
      cycleStartDate: string | null;
      cyclesCompleted: number;
    };

    // Prevent double-claiming
    if (cal.todayClaimed && cal.lastClaimDate === today) {
      return { error: 'Already claimed today', status: 409 } as const;
    }

    // Get reward for current day (1-indexed)
    const dayIndex = Math.max(0, Math.min(cal.currentDay - 1, DAILY_REWARD_CYCLE.length - 1));
    const reward = DAILY_REWARD_CYCLE[dayIndex];
    if (!reward) return { error: 'Invalid reward day', status: 400 } as const;

    const gemsReward = reward.gems ?? 0;

    const updatedCal = {
      ...cal,
      lastClaimDate: today,
      todayClaimed: true,
    };

    // Handle streak freeze bonus
    let freezeAdded = false;
    const currentFreezes = rows[0].streakFreezes ?? 0;
    if (reward.bonusType === 'streak_freeze' && currentFreezes < MAX_STREAK_FREEZES) {
      await tx
        .update(userProgress)
        .set({ dailyRewardCalendar: updatedCal, streakFreezes: currentFreezes + 1 })
        .where(eq(userProgress.userId, userId));
      freezeAdded = true;
    } else {
      await tx
        .update(userProgress)
        .set({ dailyRewardCalendar: updatedCal })
        .where(eq(userProgress.userId, userId));
    }

    if (gemsReward > 0) {
      await tx.insert(gemTransactions).values({
        userId,
        amount: gemsReward,
        source: 'daily_reward_calendar',
      });
    }

    return { success: true, gems: gemsReward, day: cal.currentDay, freezeAdded } as const;
  });

  if ('error' in result) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json(result);
}
