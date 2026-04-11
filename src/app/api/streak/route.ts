import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sessionHistory, userProgress, courseProgress } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/auth-utils';
import { computeStreakFromDates } from '@/lib/streak-utils';

export async function GET() {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get all distinct session dates for this user (sorted ascending)
  const sessions = await db
    .selectDistinct({ date: sessionHistory.date })
    .from(sessionHistory)
    .where(eq(sessionHistory.userId, userId))
    .orderBy(sessionHistory.date);

  const dates = sessions.map((s) => s.date);

  // Also include lastActiveDate from both progress tables
  // (covers lesson completions that might not be in session_history yet due to sync delay)
  const [progressRows, courseRows] = await Promise.all([
    db.select({ lastActiveDate: userProgress.lastActiveDate, streakFreezes: userProgress.streakFreezes })
      .from(userProgress).where(eq(userProgress.userId, userId)).limit(1),
    db.select({ lastActiveDate: courseProgress.lastActiveDate })
      .from(courseProgress).where(eq(courseProgress.userId, userId)).limit(1),
  ]);

  const extraDates = [
    progressRows[0]?.lastActiveDate,
    courseRows[0]?.lastActiveDate,
  ].filter((d): d is string => !!d && d.length > 0);

  const allDates = [...new Set([...dates, ...extraDates])].sort();

  // Pass streak freeze count so the computation can bridge single-day gaps
  const freezesAvailable = progressRows[0]?.streakFreezes ?? 0;
  const today = new Date().toISOString().split('T')[0];
  const { currentStreak, longestStreak } = computeStreakFromDates(allDates, today, freezesAvailable);

  // Return last 14 days of activity
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
  const twoWeeksAgoStr = twoWeeksAgo.toISOString().split('T')[0];
  const recentActiveDays = allDates.filter((d) => d >= twoWeeksAgoStr);

  return NextResponse.json({
    currentStreak,
    longestStreak,
    activeDays: recentActiveDays,
    lastActiveDate: allDates.length > 0 ? allDates[allDates.length - 1] : '',
  });
}
