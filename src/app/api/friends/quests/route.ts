import { NextResponse } from 'next/server';
import { getAuthUserId } from '@/lib/auth-utils';
import { db } from '@/lib/db';
import { friendQuests, friendships, users, userProgress } from '@/lib/db/schema';
import { eq, or, and, desc } from 'drizzle-orm';
import { getCurrentWeekMonday } from '@/lib/quest-engine';
import { pickFriendQuest, formatQuestDescription } from '@/lib/friend-quests';

/**
 * GET /api/friends/quests — Get current week's friend quests for this user.
 * Auto-creates quests for friend pairs that don't have one yet.
 */
export async function GET() {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const questWeek = getCurrentWeekMonday();

  // Get all friends
  const rows = await db
    .select({ usrId: friendships.userId, frnId: friendships.friendId })
    .from(friendships)
    .where(or(eq(friendships.userId, userId), eq(friendships.friendId, userId)));

  const friendIds = rows.map((r) => (r.usrId === userId ? r.frnId : r.usrId));
  if (friendIds.length === 0) {
    return NextResponse.json({ quests: [] });
  }

  // Get existing quests for this week
  const existing = await db
    .select()
    .from(friendQuests)
    .where(
      and(
        eq(friendQuests.questWeek, questWeek),
        or(eq(friendQuests.userId, userId), eq(friendQuests.partnerId, userId))
      )
    );

  // Find friends without a quest this week
  const pairedFriendIds = new Set(
    existing.map((q) => (q.userId === userId ? q.partnerId : q.userId))
  );
  const unpaired = friendIds.filter((id) => !pairedFriendIds.has(id));

  // Auto-create quests for unpaired friends (max 3 to avoid spam)
  const toCreate = unpaired.slice(0, 3);
  for (const partnerId of toCreate) {
    const def = pickFriendQuest(userId, partnerId, questWeek);
    const [sortedA, sortedB] = [userId, partnerId].sort();
    await db.insert(friendQuests).values({
      questWeek,
      userId: sortedA,
      partnerId: sortedB,
      questType: def.type,
      target: def.target,
    }).onConflictDoNothing();
  }

  // Re-fetch all quests after creation
  const allQuests = await db
    .select()
    .from(friendQuests)
    .where(
      and(
        eq(friendQuests.questWeek, questWeek),
        or(eq(friendQuests.userId, userId), eq(friendQuests.partnerId, userId))
      )
    )
    .orderBy(desc(friendQuests.createdAt));

  // Enrich with partner info and quest definition
  const partnerIds = allQuests.map((q) => (q.userId === userId ? q.partnerId : q.userId));
  const partnerInfo = partnerIds.length > 0
    ? await db
        .select({
          id: users.id,
          displayName: users.displayName,
          image: users.image,
          level: userProgress.currentLevel,
        })
        .from(users)
        .leftJoin(userProgress, eq(users.id, userProgress.userId))
        .where(or(...partnerIds.map((id) => eq(users.id, id))))
    : [];

  const partnerMap = new Map(partnerInfo.map((p) => [p.id, p]));

  const enriched = allQuests.map((q) => {
    const partnerId = q.userId === userId ? q.partnerId : q.userId;
    const partner = partnerMap.get(partnerId);
    const def = pickFriendQuest(q.userId, q.partnerId, q.questWeek);
    const isUserA = q.userId === userId;
    return {
      id: q.id,
      questWeek: q.questWeek,
      type: q.questType,
      title: def.title,
      description: formatQuestDescription(def),
      icon: def.icon,
      target: q.target,
      myProgress: isUserA ? q.progressUser : q.progressPartner,
      partnerProgress: isUserA ? q.progressPartner : q.progressUser,
      completed: q.completed,
      rewardClaimed: isUserA ? q.rewardClaimedUser : q.rewardClaimedPartner,
      rewardXp: def.rewardXp,
      rewardGems: def.rewardGems,
      partner: partner
        ? { id: partner.id, displayName: partner.displayName, image: partner.image, level: partner.level }
        : { id: partnerId, displayName: 'Friend', image: null, level: 1 },
    };
  });

  return NextResponse.json({ quests: enriched });
}
