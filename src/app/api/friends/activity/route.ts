import { NextResponse, type NextRequest } from 'next/server';
import { getAuthUserId } from '@/lib/auth-utils';
import { db } from '@/lib/db';
import { activityFeed, activityReactions, friendships, users } from '@/lib/db/schema';
import { eq, or, and, inArray, desc, sql } from 'drizzle-orm';

/**
 * GET /api/friends/activity — Get activity feed for the user's friends.
 * Returns last 20 activities from friends, with reaction counts.
 */
export async function GET() {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get friend IDs
  const rows = await db
    .select({ usrId: friendships.userId, frnId: friendships.friendId })
    .from(friendships)
    .where(or(eq(friendships.userId, userId), eq(friendships.friendId, userId)));

  const friendIds = rows.map((r) => (r.usrId === userId ? r.frnId : r.usrId));
  if (friendIds.length === 0) {
    return NextResponse.json({ activities: [] });
  }

  // Get recent activities from friends
  const activities = await db
    .select({
      id: activityFeed.id,
      userId: activityFeed.userId,
      type: activityFeed.type,
      data: activityFeed.data,
      createdAt: activityFeed.createdAt,
      displayName: users.displayName,
      image: users.image,
    })
    .from(activityFeed)
    .innerJoin(users, eq(activityFeed.userId, users.id))
    .where(inArray(activityFeed.userId, friendIds))
    .orderBy(desc(activityFeed.createdAt))
    .limit(20);

  if (activities.length === 0) {
    return NextResponse.json({ activities: [] });
  }

  // Get reaction counts and whether current user reacted
  const activityIds = activities.map((a) => a.id);
  const reactionCounts = await db
    .select({
      activityId: activityReactions.activityId,
      count: sql<number>`count(*)::int`,
      userReacted: sql<boolean>`bool_or(${activityReactions.userId} = ${userId})`,
    })
    .from(activityReactions)
    .where(inArray(activityReactions.activityId, activityIds))
    .groupBy(activityReactions.activityId);

  const reactionMap = new Map(reactionCounts.map((r) => [r.activityId, r]));

  const enriched = activities.map((a) => {
    const reactions = reactionMap.get(a.id);
    return {
      id: a.id,
      userId: a.userId,
      displayName: a.displayName,
      image: a.image,
      type: a.type,
      data: a.data,
      createdAt: a.createdAt?.toISOString() ?? null,
      reactionCount: reactions?.count ?? 0,
      userReacted: reactions?.userReacted ?? false,
    };
  });

  return NextResponse.json({ activities: enriched });
}

/**
 * POST /api/friends/activity/react — React (high-five) to an activity.
 * Body: { activityId: string }
 */
export async function POST(req: NextRequest) {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { activityId } = body;
  if (!activityId) {
    return NextResponse.json({ error: 'Missing activityId' }, { status: 400 });
  }

  // Verify the activity exists and belongs to a friend
  const [activity] = await db
    .select({ userId: activityFeed.userId })
    .from(activityFeed)
    .where(eq(activityFeed.id, activityId))
    .limit(1);

  if (!activity) {
    return NextResponse.json({ error: 'Activity not found' }, { status: 404 });
  }

  // Check friendship
  const [friendship] = await db
    .select()
    .from(friendships)
    .where(
      or(
        and(eq(friendships.userId, userId), eq(friendships.friendId, activity.userId)),
        and(eq(friendships.userId, activity.userId), eq(friendships.friendId, userId))
      )
    )
    .limit(1);

  if (!friendship) {
    return NextResponse.json({ error: 'Not friends' }, { status: 403 });
  }

  // Insert reaction (ignore if already exists)
  await db.insert(activityReactions).values({
    activityId,
    userId,
  }).onConflictDoNothing();

  return NextResponse.json({ ok: true });
}
