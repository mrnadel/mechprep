import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { users, courseProgress } from '@/lib/db/schema';
import { getAuthUserId } from '@/lib/auth-utils';
import { progressSyncSchema } from '@/lib/validation';
import type { CourseProgress } from '@/data/course/types';

export async function GET() {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const [userResult, progressResult] = await Promise.all([
    db
      .select({
        displayName: users.displayName,
        name: users.name,
      })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1),
    db
      .select({
        totalXp: courseProgress.totalXp,
        currentStreak: courseProgress.currentStreak,
        longestStreak: courseProgress.longestStreak,
        lastActiveDate: courseProgress.lastActiveDate,
        completedLessons: courseProgress.completedLessons,
      })
      .from(courseProgress)
      .where(eq(courseProgress.userId, userId))
      .limit(1),
  ]);

  const [user] = userResult;

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const [progress] = progressResult;

  const assembled: CourseProgress = {
    displayName: user.displayName || user.name || 'Engineer',
    totalXp: progress?.totalXp ?? 0,
    currentStreak: progress?.currentStreak ?? 0,
    longestStreak: progress?.longestStreak ?? 0,
    lastActiveDate: progress?.lastActiveDate ?? '',
    completedLessons:
      (progress?.completedLessons as CourseProgress['completedLessons']) ?? {},
  };

  return NextResponse.json({ progress: assembled });
}

export async function POST(request: NextRequest) {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = progressSyncSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid input', details: parsed.error.issues[0]?.message },
      { status: 400 }
    );
  }
  const { progress } = parsed.data as { progress: CourseProgress };

  await db.transaction(async (tx) => {
    const existing = await tx
      .select({ id: courseProgress.id })
      .from(courseProgress)
      .where(eq(courseProgress.userId, userId))
      .limit(1);

    const data = {
      userId,
      totalXp: progress.totalXp,
      currentStreak: progress.currentStreak,
      longestStreak: progress.longestStreak,
      lastActiveDate: progress.lastActiveDate,
      completedLessons: progress.completedLessons,
      updatedAt: new Date(),
    };

    if (existing.length > 0) {
      await tx
        .update(courseProgress)
        .set(data)
        .where(eq(courseProgress.userId, userId));
    } else {
      await tx.insert(courseProgress).values(data);
    }

    // Also update display name
    await tx
      .update(users)
      .set({ displayName: progress.displayName, updatedAt: new Date() })
      .where(eq(users.id, userId));
  });

  return NextResponse.json({ ok: true });
}
