import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sessionHistory, userProgress, courseProgress } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/auth-utils';

/**
 * Compute streak from session_history dates.
 * Walk backwards from today: count consecutive days with activity.
 */
function computeStreakFromDates(dates: string[], today: string): { currentStreak: number; longestStreak: number } {
  if (dates.length === 0) return { currentStreak: 0, longestStreak: 0 };

  const dateSet = new Set(dates);

  // Walk backwards from today
  let currentStreak = 0;
  const d = new Date(today + 'T12:00:00Z');

  // If today isn't active, check yesterday (streak is "at-risk" but not broken until end of day)
  if (!dateSet.has(today)) {
    d.setDate(d.getDate() - 1);
    const yesterday = d.toISOString().split('T')[0];
    if (!dateSet.has(yesterday)) {
      return { currentStreak: 0, longestStreak: computeLongestStreak(dates) };
    }
  }

  // Count consecutive days backwards
  while (true) {
    const dateStr = d.toISOString().split('T')[0];
    if (dateSet.has(dateStr)) {
      currentStreak++;
      d.setDate(d.getDate() - 1);
    } else {
      break;
    }
  }

  return { currentStreak, longestStreak: Math.max(currentStreak, computeLongestStreak(dates)) };
}

function computeLongestStreak(sortedDates: string[]): number {
  if (sortedDates.length === 0) return 0;
  let longest = 1;
  let current = 1;
  for (let i = 1; i < sortedDates.length; i++) {
    const prev = new Date(sortedDates[i - 1] + 'T12:00:00Z');
    const curr = new Date(sortedDates[i] + 'T12:00:00Z');
    const diffDays = Math.round((curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {
      current++;
      longest = Math.max(longest, current);
    } else if (diffDays > 1) {
      current = 1;
    }
  }
  return longest;
}

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
    db.select({ lastActiveDate: userProgress.lastActiveDate }).from(userProgress).where(eq(userProgress.userId, userId)).limit(1),
    db.select({ lastActiveDate: courseProgress.lastActiveDate }).from(courseProgress).where(eq(courseProgress.userId, userId)).limit(1),
  ]);

  const extraDates = [
    progressRows[0]?.lastActiveDate,
    courseRows[0]?.lastActiveDate,
  ].filter((d): d is string => !!d && d.length > 0);

  const allDates = [...new Set([...dates, ...extraDates])].sort();

  const today = new Date().toISOString().split('T')[0];
  const { currentStreak, longestStreak } = computeStreakFromDates(allDates, today);

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
