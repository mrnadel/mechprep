import { NextRequest, NextResponse } from 'next/server';
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

// PATCH: Update a user's subscription tier
export async function PATCH(req: NextRequest) {
  const adminId = await getAuthUserId();
  if (!adminId || adminId !== ADMIN_USER_ID) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { userId, tier } = await req.json();
  if (!userId || !['free', 'pro'].includes(tier)) {
    return NextResponse.json({ error: 'Invalid userId or tier' }, { status: 400 });
  }

  // If setting to free, delete the subscription row
  if (tier === 'free') {
    await db.delete(subscriptions).where(eq(subscriptions.userId, userId));
    return NextResponse.json({ success: true, tier: 'free' });
  }

  // Upsert: check if subscription exists
  const [existing] = await db
    .select({ id: subscriptions.id })
    .from(subscriptions)
    .where(eq(subscriptions.userId, userId))
    .limit(1);

  if (existing) {
    await db
      .update(subscriptions)
      .set({ tier, status: 'active', updatedAt: new Date() })
      .where(eq(subscriptions.userId, userId));
  } else {
    await db.insert(subscriptions).values({
      userId,
      tier,
      status: 'active',
    });
  }

  return NextResponse.json({ success: true, tier });
}

// DELETE: Remove a user and all related data
export async function DELETE(req: NextRequest) {
  const adminId = await getAuthUserId();
  if (!adminId || adminId !== ADMIN_USER_ID) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { userId } = await req.json();
  if (!userId || typeof userId !== 'string') {
    return NextResponse.json({ error: 'Invalid userId' }, { status: 400 });
  }

  // Prevent deleting yourself
  if (userId === adminId) {
    return NextResponse.json({ error: 'Cannot delete your own account' }, { status: 400 });
  }

  // All related tables have onDelete: 'cascade'
  await db.delete(users).where(eq(users.id, userId));

  return NextResponse.json({ success: true });
}
