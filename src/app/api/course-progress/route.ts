import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { users, courseProgress } from '@/lib/db/schema';
import { getAuthUserId } from '@/lib/auth-utils';
import { canAccessUnit } from '@/lib/access-control';
import { LIMITS } from '@/lib/pricing';
import { getLessonById } from '@/data/course';
import { courseProgressSyncSchema } from '@/lib/validation';
import type { CourseProgress } from '@/data/course/types';

export async function GET() {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const [progress] = await db
    .select()
    .from(courseProgress)
    .where(eq(courseProgress.userId, userId))
    .limit(1);

  const assembled: CourseProgress = {
    displayName: user.displayName || user.name || 'Engineer',
    totalXp: progress?.totalXp ?? 0,
    currentStreak: progress?.currentStreak ?? 0,
    longestStreak: progress?.longestStreak ?? 0,
    lastActiveDate: progress?.lastActiveDate ?? '',
    activeDays: [],  // Client-only field — tracked in localStorage, not DB
    completedLessons:
      (progress?.completedLessons as CourseProgress['completedLessons']) ?? {},
    courseIntros:
      (progress?.courseIntros as CourseProgress['courseIntros']) ?? undefined,
  };

  return NextResponse.json({
    progress: assembled,
    activeProfession: progress?.activeProfession ?? 'mechanical-engineering',
  });
}

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
  const parsed = courseProgressSyncSchema.safeParse(body);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    console.error('course-progress validation failed:', JSON.stringify({ path: issue?.path, message: issue?.message, code: issue?.code }));
    return NextResponse.json(
      { error: 'Invalid input', details: issue?.message, path: issue?.path },
      { status: 400 }
    );
  }
  const { progress, activeProfession } = parsed.data as unknown as {
    progress: CourseProgress;
    activeProfession?: string;
  };

  // ── Server-side unit access enforcement ──
  // Single subscription lookup instead of per-lesson DB queries
  const { tier } = await canAccessUnit(userId, 0);
  const unlockedUnits = LIMITS[tier].unlockedUnits;
  const isUnitAccessible = (unitIndex: number) =>
    unlockedUnits === 'all' || (unlockedUnits as number[]).includes(unitIndex);

  const filteredLessons: CourseProgress['completedLessons'] = {};
  for (const [lessonId, lessonData] of Object.entries(progress.completedLessons)) {
    const info = getLessonById(lessonId);
    if (!info) continue;
    if (isUnitAccessible(info.unitIndex)) {
      filteredLessons[lessonId] = lessonData;
    }
  }

  const existing = await db
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
    completedLessons: filteredLessons,
    activeProfession: activeProfession ?? 'mechanical-engineering',
    courseIntros: (progress.courseIntros ?? {}) as Record<string, unknown>,
    updatedAt: new Date(),
  };

  if (existing.length > 0) {
    await db
      .update(courseProgress)
      .set(data)
      .where(eq(courseProgress.userId, userId));
  } else {
    await db.insert(courseProgress).values(data);
  }

  // Also update display name
  await db
    .update(users)
    .set({ displayName: progress.displayName, updatedAt: new Date() })
    .where(eq(users.id, userId));

  return NextResponse.json({ ok: true });
}
