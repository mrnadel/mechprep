import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { pushSubscriptions, userProgress } from '@/lib/db/schema';
import { eq, ne, and, gt } from 'drizzle-orm';
import { sendPushNotification } from '@/lib/push';

// Secured by CRON_SECRET — only callable from Vercel Cron Jobs
export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const today = new Date().toISOString().split('T')[0];

  // Find users with push subscriptions who have a streak > 0
  // but haven't been active today — their streak is at risk
  const atRiskUsers = await db
    .select({
      userId: userProgress.userId,
      currentStreak: userProgress.currentStreak,
      endpoint: pushSubscriptions.endpoint,
      p256dh: pushSubscriptions.p256dh,
      auth: pushSubscriptions.auth,
    })
    .from(userProgress)
    .innerJoin(pushSubscriptions, eq(userProgress.userId, pushSubscriptions.userId))
    .where(
      and(
        gt(userProgress.currentStreak, 0),
        ne(userProgress.lastActiveDate, today),
      )
    );

  let sent = 0;
  let failed = 0;

  for (const user of atRiskUsers) {
    const streakDays = user.currentStreak;
    try {
      await sendPushNotification(
        { endpoint: user.endpoint, p256dh: user.p256dh, auth: user.auth },
        {
          title: `Your ${streakDays}-day streak is at risk!`,
          body: 'Complete one lesson today to keep it alive.',
          tag: 'streak-reminder',
          url: '/',
        },
      );
      sent++;
    } catch (err: unknown) {
      // If subscription expired (410 Gone), remove it
      if (err && typeof err === 'object' && 'statusCode' in err && (err as { statusCode: number }).statusCode === 410) {
        await db.delete(pushSubscriptions).where(eq(pushSubscriptions.endpoint, user.endpoint));
      }
      failed++;
    }
  }

  return NextResponse.json({ sent, failed, total: atRiskUsers.length });
}
