import { NextResponse } from 'next/server';
import { getAuthUserId } from '@/lib/auth-utils';
import { getPublicProfile, getPublicProgress, getRelationship } from '@/lib/db/friends';
import { db } from '@/lib/db';
import { leagueState, userProgress } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const viewerId = await getAuthUserId();
  if (!viewerId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id: targetId } = await params;

  // Fetch all independent data in parallel
  const [user, progress, accuracyResult, leagueResult] = await Promise.all([
    getPublicProfile(targetId),
    getPublicProgress(targetId),
    db
      .select({
        totalQuestionsAttempted: userProgress.totalQuestionsAttempted,
        totalQuestionsCorrect: userProgress.totalQuestionsCorrect,
      })
      .from(userProgress)
      .where(eq(userProgress.userId, targetId))
      .limit(1),
    db
      .select({ tier: leagueState.tier })
      .from(leagueState)
      .where(eq(leagueState.userId, targetId))
      .limit(1),
  ]);

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // If profile is private, only allow self or friends to view
  if (user.profilePublic === false && viewerId !== targetId) {
    const { relationship: rel } = await getRelationship(viewerId, targetId);
    if (rel !== 'friends') {
      return NextResponse.json({ error: 'This profile is private' }, { status: 403 });
    }
  }

  const [accuracyData] = accuracyResult;
  const attempted = accuracyData?.totalQuestionsAttempted ?? 0;
  const correct = accuracyData?.totalQuestionsCorrect ?? 0;
  const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;

  const [league] = leagueResult;

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
    accuracy,
    leagueTier: league?.tier ?? 1,
    achievements: progress?.achievementsUnlocked ?? [],
    relationship,
    requestId,
  });
}
