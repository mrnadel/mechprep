import { NextResponse } from 'next/server';
import { getAuthUserId } from '@/lib/auth-utils';
import { getPublicProfile, getPublicProgress, getRelationship } from '@/lib/db/friends';
import { db } from '@/lib/db';
import { leagueState, masteryEvents } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { topics } from '@/data/topics';
import { computeAllMastery } from '@/data/mastery';
import type { AnswerEvent } from '@/data/mastery';
import type { TopicId } from '@/data/types';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const viewerId = await getAuthUserId();
  if (!viewerId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id: targetId } = await params;

  // Get user profile
  const user = await getPublicProfile(targetId);
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Get progress
  const progress = await getPublicProgress(targetId);

  // Get league tier
  const [league] = await db
    .select({ tier: leagueState.tier })
    .from(leagueState)
    .where(eq(leagueState.userId, targetId))
    .limit(1);

  // Get mastery events to compute topic mastery levels
  const events = await db
    .select({
      id: masteryEvents.id,
      questionId: masteryEvents.questionId,
      topicId: masteryEvents.topicId,
      subtopic: masteryEvents.subtopic,
      difficulty: masteryEvents.difficulty,
      correct: masteryEvents.correct,
      source: masteryEvents.source,
      answeredAt: masteryEvents.answeredAt,
    })
    .from(masteryEvents)
    .where(eq(masteryEvents.userId, targetId));

  const topicIds = topics.map((t) => t.id) as TopicId[];
  const masteryScores = computeAllMastery(events as AnswerEvent[], topicIds);
  const topicMastery = masteryScores.map((m) => ({
    topicId: m.topicId,
    masteryLevel: m.level,
  }));

  // Get relationship (returns both type and requestId if applicable)
  const { relationship, requestId } = await getRelationship(viewerId, targetId);

  return NextResponse.json({
    id: user.id,
    displayName: user.displayName,
    image: user.image,
    joinedDate: user.joinedDate,
    level: progress?.currentLevel ?? 1,
    totalXp: progress?.totalXp ?? 0,
    currentStreak: progress?.currentStreak ?? 0,
    longestStreak: progress?.longestStreak ?? 0,
    leagueTier: league?.tier ?? 1,
    achievements: progress?.achievementsUnlocked ?? [],
    topicMastery,
    relationship,
    requestId,
  });
}
