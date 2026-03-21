import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, userProgress, subscriptions } from '@/lib/db/schema';
import { getAuthUserId } from '@/lib/auth-utils';
import { eq, desc } from 'drizzle-orm';

const ADMIN_USER_ID = process.env.ADMIN_USER_ID;

export async function GET() {
  const userId = await getAuthUserId();
  if (!userId || userId !== ADMIN_USER_ID) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const rows = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      displayName: users.displayName,
      joinedDate: users.joinedDate,
      createdAt: users.createdAt,
      totalXp: userProgress.totalXp,
      currentStreak: userProgress.currentStreak,
      totalQuestionsAttempted: userProgress.totalQuestionsAttempted,
      lastActiveDate: userProgress.lastActiveDate,
      tier: subscriptions.tier,
    })
    .from(users)
    .leftJoin(userProgress, eq(users.id, userProgress.userId))
    .leftJoin(subscriptions, eq(users.id, subscriptions.userId))
    .orderBy(desc(users.createdAt));

  const result = rows.map((row) => ({
    id: row.id,
    name: row.displayName || row.name || null,
    email: row.email,
    joinedDate: row.joinedDate || row.createdAt?.toISOString() || null,
    totalXp: row.totalXp ?? 0,
    currentStreak: row.currentStreak ?? 0,
    totalQuestionsAttempted: row.totalQuestionsAttempted ?? 0,
    lastActiveDate: row.lastActiveDate || null,
    tier: row.tier || 'free',
  }));

  return NextResponse.json({ users: result, total: result.length });
}
