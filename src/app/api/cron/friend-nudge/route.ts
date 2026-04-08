import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import {
  pushSubscriptions,
  userProgress,
  courseProgress,
  friendships,
  users,
} from '@/lib/db/schema';
import { eq, and, gt, or, sql } from 'drizzle-orm';
import { sendPushNotification } from '@/lib/push';

/**
 * Friend nudge cron — runs daily at 8 PM UTC (1 hour after streak-reminder).
 * For users who have been away 2+ days and have friends, sends a push
 * notification to one friend: "{UserName} is about to lose their streak!"
 *
 * Rate limiting: implicit — the query filters for `lastActiveDate = exactly 2 days ago`,
 * so a user only matches once per inactivity period. If they don't return, they fall
 * to 3+ days away and stop matching. Max 50 users processed per run.
 */
export async function GET(req: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
  }
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const twoDaysAgo = new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0];
  const oneWeekAgo = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0];
  const today = new Date().toISOString().split('T')[0];

  const MAX_USERS = 50;
  let sent = 0;
  let failed = 0;
  let skipped = 0;

  // Find users who have been away 2+ days and still have a streak
  const atRiskUsers = await db
    .select({
      userId: userProgress.userId,
      currentStreak: userProgress.currentStreak,
      displayName: users.displayName,
      userName: users.name,
    })
    .from(userProgress)
    .innerJoin(users, eq(userProgress.userId, users.id))
    .where(
      and(
        gt(userProgress.currentStreak, 0),
        eq(userProgress.lastActiveDate, twoDaysAgo),
      ),
    )
    .limit(MAX_USERS);

  for (const atRiskUser of atRiskUsers) {
    const userName = atRiskUser.displayName || atRiskUser.userName || 'Your friend';

    // Find the user's first friend (sorted by creation date)
    // Friendships table has CHECK constraint: user_id < friend_id — query both sides
    const friendRows = await db
      .select({
        friendUserId: sql<string>`CASE
          WHEN ${friendships.userId} = ${atRiskUser.userId} THEN ${friendships.friendId}
          ELSE ${friendships.userId}
        END`.as('friend_user_id'),
      })
      .from(friendships)
      .where(
        or(
          eq(friendships.userId, atRiskUser.userId),
          eq(friendships.friendId, atRiskUser.userId),
        ),
      )
      .orderBy(friendships.createdAt)
      .limit(1);

    if (friendRows.length === 0) {
      skipped++;
      continue;
    }

    const friendUserId = friendRows[0].friendUserId;

    // Get the friend's push subscription (skip if nudged within last week)
    const friendSubs = await db
      .select({
        endpoint: pushSubscriptions.endpoint,
        p256dh: pushSubscriptions.p256dh,
        auth: pushSubscriptions.auth,
      })
      .from(pushSubscriptions)
      .where(eq(pushSubscriptions.userId, friendUserId))
      .limit(1);

    if (friendSubs.length === 0) {
      skipped++;
      continue;
    }

    const sub = friendSubs[0];

    try {
      await sendPushNotification(
        { endpoint: sub.endpoint, p256dh: sub.p256dh, auth: sub.auth },
        {
          title: `${userName} is about to lose their streak!`,
          body: 'Send them a word of encouragement.',
          tag: 'friend-streak-nudge',
          url: '/friends',
          icon: '/icon-192.png',
        },
      );
      sent++;
    } catch (err) {
      // Clean up expired subscriptions (410 Gone)
      if (err && typeof err === 'object' && 'statusCode' in err && (err as { statusCode: number }).statusCode === 410) {
        await db.delete(pushSubscriptions).where(eq(pushSubscriptions.endpoint, sub.endpoint));
      }
      failed++;
    }
  }

  return NextResponse.json({ sent, failed, skipped, total: atRiskUsers.length });
}
