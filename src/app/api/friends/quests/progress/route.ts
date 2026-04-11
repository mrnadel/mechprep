import { NextRequest, NextResponse } from 'next/server';
import { getAuthUserId } from '@/lib/auth-utils';
import { db } from '@/lib/db';
import { friendQuests } from '@/lib/db/schema';
import { eq, or, and, sql } from 'drizzle-orm';
import { getCurrentWeekMonday } from '@/lib/quest-engine';
import { friendQuestProgressSchema } from '@/lib/validation';
import { pickFriendQuest } from '@/lib/friend-quests';
import { sendPushToUser } from '@/lib/push';
import { insertActivity } from '@/lib/activity-feed';

/**
 * POST /api/friends/quests/progress
 * Reports lesson/session events to update friend quest progress.
 * Uses ATOMIC SQL updates to prevent race conditions.
 */
export async function POST(req: NextRequest) {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = friendQuestProgressSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid input', details: parsed.error.issues[0]?.message },
      { status: 400 },
    );
  }

  const { events } = parsed.data;
  const questWeek = getCurrentWeekMonday();

  // Get all active (uncompleted) friend quests for this user this week
  const quests = await db
    .select()
    .from(friendQuests)
    .where(
      and(
        eq(friendQuests.questWeek, questWeek),
        eq(friendQuests.completed, false),
        or(eq(friendQuests.userId, userId), eq(friendQuests.partnerId, userId)),
      ),
    );

  if (quests.length === 0) {
    return NextResponse.json({ updated: [] });
  }

  const updated: Array<{ questId: string; myProgress: number; completed: boolean }> = [];

  for (const quest of quests) {
    const isUserA = quest.userId === userId;

    // Accumulate increments from all events for this quest
    let totalIncrement = 0;
    for (const { event, value } of events) {
      switch (quest.questType) {
        case 'combined_xp':
          if (event === 'xp_earned') totalIncrement += value;
          break;
        case 'combined_lessons':
          if (event === 'lesson_completed') totalIncrement += value;
          break;
        case 'combined_accuracy':
          // For accuracy quests: count sessions where accuracy >= 80%
          // Target is session count (e.g. 3), not a percentage threshold
          if (event === 'accuracy_report' && value >= 80) totalIncrement += 1;
          break;
      }
    }

    if (totalIncrement === 0) continue;

    // ATOMIC SQL update: SET progress = LEAST(progress + increment, target)
    // The WHERE completed = false prevents race conditions on completion
    await db
      .update(friendQuests)
      .set(
        isUserA
          ? { progressUser: sql`LEAST(${friendQuests.progressUser} + ${totalIncrement}, ${quest.target})` }
          : { progressPartner: sql`LEAST(${friendQuests.progressPartner} + ${totalIncrement}, ${quest.target})` },
      )
      .where(and(eq(friendQuests.id, quest.id), eq(friendQuests.completed, false)));

    // Re-read updated row to determine if completed
    const [updatedQuest] = await db
      .select()
      .from(friendQuests)
      .where(eq(friendQuests.id, quest.id))
      .limit(1);

    if (!updatedQuest) continue;

    const myProgress = isUserA ? updatedQuest.progressUser : updatedQuest.progressPartner;

    // Check completion: for accuracy quests both must reach target, for additive quests sum >= target
    let completed = false;
    if (quest.questType === 'combined_accuracy') {
      // Both users must individually reach the target number of qualifying sessions
      completed = updatedQuest.progressUser >= quest.target && updatedQuest.progressPartner >= quest.target;
    } else {
      completed = updatedQuest.progressUser + updatedQuest.progressPartner >= quest.target;
    }

    // Mark completed if not already
    if (completed && !updatedQuest.completed) {
      await db
        .update(friendQuests)
        .set({ completed: true })
        .where(and(eq(friendQuests.id, quest.id), eq(friendQuests.completed, false)));

      // Notify partner about quest completion
      const partnerId = isUserA ? quest.partnerId : quest.userId;
      const def = pickFriendQuest(quest.userId, quest.partnerId, quest.questWeek);
      sendPushToUser(partnerId, {
        title: 'Friend Quest Complete!',
        body: `You and your friend completed "${def.title}"! Claim your reward.`,
        url: '/friends',
      }).catch(() => {});

      // Insert activity for the completing user
      await insertActivity(userId, 'friend_quest_complete', {
        questType: quest.questType,
        questTitle: def.title,
        partnerId,
      });
    }

    updated.push({
      questId: quest.id,
      myProgress,
      completed: completed || updatedQuest.completed,
    });
  }

  return NextResponse.json({ updated });
}
