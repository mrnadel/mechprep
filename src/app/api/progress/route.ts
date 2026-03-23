import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import {
  users,
  userProgress,
  topicProgress as topicProgressTable,
  sessionHistory,
  gemTransactions,
  leagueState,
} from '@/lib/db/schema';
import { getAuthUserId } from '@/lib/auth-utils';
import { progressSyncSchema } from '@/lib/validation';
import type { UserProgress, TopicProgress, SessionRecord, TopicId } from '@/data/types';

export async function GET() {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Fetch user info
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Fetch user progress
  const [progress] = await db
    .select()
    .from(userProgress)
    .where(eq(userProgress.userId, userId))
    .limit(1);

  // Fetch topic progress rows
  const topics = await db
    .select()
    .from(topicProgressTable)
    .where(eq(topicProgressTable.userId, userId));

  // Fetch session history
  const sessions = await db
    .select()
    .from(sessionHistory)
    .where(eq(sessionHistory.userId, userId));

  // Assemble into UserProgress shape
  const topicProgressData: TopicProgress[] = topics.map((t) => ({
    topicId: t.topicId as TopicProgress['topicId'],
    questionsAttempted: t.questionsAttempted,
    questionsCorrect: t.questionsCorrect,
    averageConfidence: t.averageConfidence,
    lastAttempted: t.lastAttempted ?? '',
    subtopicBreakdown:
      (t.subtopicBreakdown as Record<string, { attempted: number; correct: number }>) ?? {},
  }));

  const sessionRecords: SessionRecord[] = sessions.map((s) => ({
    id: s.sessionId,
    date: s.date,
    durationMinutes: s.durationMinutes,
    questionsAttempted: s.questionsAttempted,
    questionsCorrect: s.questionsCorrect,
    topicsCovered: (s.topicsCovered as TopicId[]) ?? [],
    xpEarned: s.xpEarned,
  }));

  const assembled: UserProgress = {
    userId,
    displayName: user.displayName || user.name || 'Engineer',
    joinedDate: user.joinedDate || '',
    currentLevel: progress?.currentLevel ?? 1,
    totalXp: progress?.totalXp ?? 0,
    currentStreak: progress?.currentStreak ?? 0,
    longestStreak: progress?.longestStreak ?? 0,
    lastActiveDate: progress?.lastActiveDate ?? '',
    achievementsUnlocked: (progress?.achievementsUnlocked as string[]) ?? [],
    topicProgress: topicProgressData,
    sessionHistory: sessionRecords,
    dailyChallengesCompleted: progress?.dailyChallengesCompleted ?? 0,
    totalQuestionsAttempted: progress?.totalQuestionsAttempted ?? 0,
    totalQuestionsCorrect: progress?.totalQuestionsCorrect ?? 0,
    bookmarkedQuestions: (progress?.bookmarkedQuestions as string[]) ?? [],
    weakAreas: (progress?.weakAreas as string[]) ?? [],
    strongAreas: (progress?.strongAreas as string[]) ?? [],
  };

  return NextResponse.json({ progress: assembled });
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
  const parsed = progressSyncSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid input', details: parsed.error.issues[0]?.message },
      { status: 400 }
    );
  }
  const { progress } = parsed.data as { progress: UserProgress };

  // Upsert user_progress row
  const existing = await db
    .select({ id: userProgress.id })
    .from(userProgress)
    .where(eq(userProgress.userId, userId))
    .limit(1);

  const progressData = {
    userId,
    currentLevel: progress.currentLevel,
    totalXp: progress.totalXp,
    currentStreak: progress.currentStreak,
    longestStreak: progress.longestStreak,
    lastActiveDate: progress.lastActiveDate,
    achievementsUnlocked: progress.achievementsUnlocked,
    dailyChallengesCompleted: progress.dailyChallengesCompleted,
    totalQuestionsAttempted: progress.totalQuestionsAttempted,
    totalQuestionsCorrect: progress.totalQuestionsCorrect,
    bookmarkedQuestions: progress.bookmarkedQuestions,
    weakAreas: progress.weakAreas,
    strongAreas: progress.strongAreas,
    updatedAt: new Date(),
  };

  if (existing.length > 0) {
    await db
      .update(userProgress)
      .set(progressData)
      .where(eq(userProgress.userId, userId));
  } else {
    await db.insert(userProgress).values(progressData);
  }

  // Update display name on user row
  await db
    .update(users)
    .set({ displayName: progress.displayName, updatedAt: new Date() })
    .where(eq(users.id, userId));

  // Delete and re-insert topic progress
  await db
    .delete(topicProgressTable)
    .where(eq(topicProgressTable.userId, userId));

  if (progress.topicProgress.length > 0) {
    await db.insert(topicProgressTable).values(
      progress.topicProgress.map((tp) => ({
        userId,
        topicId: tp.topicId,
        questionsAttempted: tp.questionsAttempted,
        questionsCorrect: tp.questionsCorrect,
        averageConfidence: tp.averageConfidence,
        lastAttempted: tp.lastAttempted,
        subtopicBreakdown: tp.subtopicBreakdown,
      }))
    );
  }

  // Append-only session history: only insert new sessions
  const existingSessions = await db
    .select({ sessionId: sessionHistory.sessionId })
    .from(sessionHistory)
    .where(eq(sessionHistory.userId, userId));

  const existingIds = new Set(existingSessions.map((s) => s.sessionId));
  const newSessions = progress.sessionHistory.filter(
    (s) => !existingIds.has(s.id)
  );

  if (newSessions.length > 0) {
    await db.insert(sessionHistory).values(
      newSessions.map((s) => ({
        userId,
        sessionId: s.id,
        date: s.date,
        durationMinutes: s.durationMinutes,
        questionsAttempted: s.questionsAttempted,
        questionsCorrect: s.questionsCorrect,
        topicsCovered: s.topicsCovered,
        xpEarned: s.xpEarned,
      }))
    );
  }

  // Sync engagement data if provided (now validated by Zod schema)
  const engagement = parsed.data.engagement;
  if (engagement) {
    const { gems, leagueTier, streakFreezes, streakMilestones, newGemTransactions } = engagement;

    // Update userProgress engagement columns
    await db.update(userProgress).set({
      gemsBalance: gems?.balance,
      gemsTotalEarned: gems?.totalEarned,
      streakFreezes: streakFreezes,
      streakMilestones: streakMilestones,
    }).where(eq(userProgress.userId, userId));

    // Batch insert new gem transactions
    if (newGemTransactions?.length) {
      await db.insert(gemTransactions).values(
        newGemTransactions.map((t: { amount: number; source: string }) => ({
          userId,
          amount: t.amount,
          source: t.source,
        }))
      );
    }

    // Upsert league state
    if (leagueTier !== undefined && engagement.weekStart !== undefined) {
      const existingLeague = await db
        .select({ id: leagueState.id })
        .from(leagueState)
        .where(eq(leagueState.userId, userId))
        .limit(1);

      const leagueData = {
        userId,
        tier: leagueTier,
        weeklyXp: engagement.weeklyXp ?? 0,
        weekStart: engagement.weekStart,
        competitors: engagement.competitors ?? [],
        updatedAt: new Date(),
      };

      if (existingLeague.length > 0) {
        await db
          .update(leagueState)
          .set(leagueData)
          .where(eq(leagueState.userId, userId));
      } else {
        await db.insert(leagueState).values(leagueData);
      }
    }
  }

  return NextResponse.json({ ok: true });
}
