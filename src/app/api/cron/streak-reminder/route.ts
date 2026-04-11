import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { pushSubscriptions, userProgress, courseProgress } from '@/lib/db/schema';
import { eq, and, gt, sql } from 'drizzle-orm';
import { sendPushNotification } from '@/lib/push';

// Secured by CRON_SECRET — only callable from Vercel Cron Jobs
export async function GET(req: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
  }
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  const twoDaysAgo = new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0];

  const BATCH_SIZE = 500;
  const CONCURRENCY = 10;
  const stats = { day1Sent: 0, day1Failed: 0, day2Sent: 0, day2Failed: 0, total: 0 };

  // Helper: send a batch of push notifications
  async function processBatch(
    conditions: ReturnType<typeof gt>[],
    getMessage: (streak: number) => { title: string; body: string; tag: string },
    statKey: 'day1' | 'day2',
  ) {
    let lastUserId: string | null = null;

    while (true) {
      const where = [...conditions];
      if (lastUserId) {
        where.push(gt(userProgress.userId, lastUserId));
      }

      // Join with courseProgress to get the true last active date
      // (user may only do course lessons, not practice)
      const batch = await db
        .select({
          userId: userProgress.userId,
          currentStreak: userProgress.currentStreak,
          endpoint: pushSubscriptions.endpoint,
          p256dh: pushSubscriptions.p256dh,
          auth: pushSubscriptions.auth,
          courseLastActive: courseProgress.lastActiveDate,
          practiceLastActive: userProgress.lastActiveDate,
        })
        .from(userProgress)
        .innerJoin(pushSubscriptions, eq(userProgress.userId, pushSubscriptions.userId))
        .leftJoin(courseProgress, eq(userProgress.userId, courseProgress.userId))
        .where(and(...where))
        .orderBy(userProgress.userId)
        .limit(BATCH_SIZE);

      if (batch.length === 0) break;

      stats.total += batch.length;
      lastUserId = batch[batch.length - 1].userId;

      for (let i = 0; i < batch.length; i += CONCURRENCY) {
        const chunk = batch.slice(i, i + CONCURRENCY);
        const results = await Promise.allSettled(
          chunk.map((user) => {
            // Skip if course activity is more recent (user is actually active)
            const courseDate = user.courseLastActive || '';
            if (courseDate === today) return Promise.resolve();

            const msg = getMessage(user.currentStreak);
            return sendPushNotification(
              { endpoint: user.endpoint, p256dh: user.p256dh, auth: user.auth },
              { ...msg, url: '/', icon: '/icon-192.png' },
            );
          })
        );

        for (let j = 0; j < results.length; j++) {
          if (results[j].status === 'fulfilled') {
            (stats as Record<string, number>)[`${statKey}Sent`]++;
          } else {
            const err = (results[j] as PromiseRejectedResult).reason;
            if (err && typeof err === 'object' && 'statusCode' in err && (err as { statusCode: number }).statusCode === 410) {
              await db.delete(pushSubscriptions).where(eq(pushSubscriptions.endpoint, chunk[j].endpoint));
            }
            (stats as Record<string, number>)[`${statKey}Failed`]++;
          }
        }
      }

      if (batch.length < BATCH_SIZE) break;
    }
  }

  // Batch 1: Day-1 users (last active = yesterday, still have a streak)
  await processBatch(
    [
      gt(userProgress.currentStreak, 0),
      eq(userProgress.lastActiveDate, yesterday),
    ],
    (streak) => ({
      title: 'Quick 3-min lesson?',
      body: `Keep your ${streak}-day streak alive!`,
      tag: 'streak-nudge-day1',
    }),
    'day1',
  );

  // Batch 2: Day-2 users (last active = two days ago, streak at risk)
  await processBatch(
    [
      gt(userProgress.currentStreak, 0),
      eq(userProgress.lastActiveDate, twoDaysAgo),
    ],
    (streak) => ({
      title: `Your ${streak}-day streak breaks tomorrow!`,
      body: "One lesson is all it takes. Don't lose your progress.",
      tag: 'streak-nudge-day2',
    }),
    'day2',
  );

  return NextResponse.json(stats);
}
