import { NextResponse } from 'next/server';
import { getAuthUserId } from '@/lib/auth-utils';
import { db } from '@/lib/db';
import { friendships, users, userProgress, leagueState } from '@/lib/db/schema';
import { eq, or, inArray, desc } from 'drizzle-orm';

export async function GET() {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const rows = await db
    .select({ usrId: friendships.userId, frnId: friendships.friendId })
    .from(friendships)
    .where(or(eq(friendships.userId, userId), eq(friendships.friendId, userId)));

  const friendIds = rows.map((r) => (r.usrId === userId ? r.frnId : r.usrId));

  if (friendIds.length === 0) {
    return NextResponse.json({ friends: [] });
  }

  const friends = await db
    .select({
      id: users.id,
      displayName: users.displayName,
      image: users.image,
      level: userProgress.currentLevel,
      currentStreak: userProgress.currentStreak,
      totalXp: userProgress.totalXp,
      leagueTier: leagueState.tier,
    })
    .from(users)
    .leftJoin(userProgress, eq(users.id, userProgress.userId))
    .leftJoin(leagueState, eq(users.id, leagueState.userId))
    .where(inArray(users.id, friendIds))
    .orderBy(desc(userProgress.totalXp));

  const result = friends.map((f) => ({
    id: f.id,
    displayName: f.displayName ?? 'Unknown',
    image: f.image ?? null,
    level: f.level ?? 1,
    currentStreak: f.currentStreak ?? 0,
    totalXp: f.totalXp ?? 0,
    leagueTier: f.leagueTier ?? 1,
  }));

  return NextResponse.json({ friends: result });
}
