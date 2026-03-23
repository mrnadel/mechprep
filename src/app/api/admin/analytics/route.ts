import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, dailyUsage, sessionHistory, topicProgress } from '@/lib/db/schema';
import { requireAdmin } from '@/lib/auth-utils';
import { eq, sql, count, sum, desc } from 'drizzle-orm';

export async function GET() {
  const adminId = await requireAdmin();
  if (!adminId) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const today = new Date().toISOString().split('T')[0];

  // 1. Total users
  const [totalUsersResult] = await db
    .select({ value: count() })
    .from(users);

  // 2. Active today — distinct users with a dailyUsage row for today
  const [activeTodayResult] = await db
    .select({ value: count() })
    .from(dailyUsage)
    .where(eq(dailyUsage.date, today));

  // 3. Active this week — distinct users with dailyUsage in last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const weekStart = sevenDaysAgo.toISOString().split('T')[0];

  const [activeWeekResult] = await db
    .select({ value: sql<number>`count(distinct ${dailyUsage.userId})` })
    .from(dailyUsage)
    .where(sql`${dailyUsage.date} >= ${weekStart}`);

  // 4. Total questions answered
  const [totalQuestionsResult] = await db
    .select({ value: sum(sessionHistory.questionsAttempted) })
    .from(sessionHistory);

  // 5. Topic performance
  const topicRows = await db
    .select({
      topicId: topicProgress.topicId,
      totalAttempts: sum(topicProgress.questionsAttempted).mapWith(Number),
      totalCorrect: sum(topicProgress.questionsCorrect).mapWith(Number),
    })
    .from(topicProgress)
    .groupBy(topicProgress.topicId)
    .orderBy(desc(sum(topicProgress.questionsAttempted)));

  const topicPerformance = topicRows.map((row) => ({
    topicId: row.topicId,
    totalAttempts: row.totalAttempts || 0,
    accuracy:
      row.totalAttempts && row.totalAttempts > 0
        ? Math.round(((row.totalCorrect || 0) / row.totalAttempts) * 100)
        : 0,
  }));

  // 6. Recent activity — last 10 sessions
  const recentSessions = await db
    .select({
      date: sessionHistory.date,
      questionsAttempted: sessionHistory.questionsAttempted,
      questionsCorrect: sessionHistory.questionsCorrect,
      xpEarned: sessionHistory.xpEarned,
      userId: sessionHistory.userId,
    })
    .from(sessionHistory)
    .orderBy(desc(sessionHistory.date))
    .limit(10);

  return NextResponse.json({
    overview: {
      totalUsers: totalUsersResult.value,
      activeToday: activeTodayResult.value,
      activeThisWeek: Number(activeWeekResult.value) || 0,
      totalQuestionsAnswered: Number(totalQuestionsResult.value) || 0,
    },
    topicPerformance,
    recentActivity: recentSessions,
  });
}
