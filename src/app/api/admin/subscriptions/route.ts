import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, subscriptions, paymentHistory } from '@/lib/db/schema';
import { getAuthUserId } from '@/lib/auth-utils';
import { eq, sql, desc, and } from 'drizzle-orm';

const ADMIN_USER_ID = process.env.ADMIN_USER_ID;

export async function GET() {
  const userId = await getAuthUserId();
  if (!userId || userId !== ADMIN_USER_ID) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Tier counts
  const tierCounts = await db
    .select({
      tier: subscriptions.tier,
      count: sql<number>`count(*)::int`,
    })
    .from(subscriptions)
    .groupBy(subscriptions.tier);

  const counts: Record<string, number> = { free: 0, pro: 0, team: 0 };
  for (const row of tierCounts) {
    counts[row.tier] = row.count;
  }

  // Active subscriptions (non-free, status = 'active')
  const [activeResult] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(subscriptions)
    .where(and(eq(subscriptions.status, 'active'), sql`${subscriptions.tier} != 'free'`));
  const activeCount = activeResult?.count ?? 0;

  // Trial users (trialEnd is not null and status = 'trialing' or trialEnd in future)
  const [trialResult] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(subscriptions)
    .where(eq(subscriptions.status, 'trialing'));
  const trialCount = trialResult?.count ?? 0;

  // Revenue this month
  const now = new Date();
  const monthStart = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
  const [revenueResult] = await db
    .select({ total: sql<number>`coalesce(sum(${paymentHistory.amountCents}), 0)::int` })
    .from(paymentHistory)
    .where(
      and(
        eq(paymentHistory.status, 'succeeded'),
        sql`${paymentHistory.createdAt} >= ${monthStart}::timestamp`
      )
    );
  const revenueThisMonthCents = revenueResult?.total ?? 0;

  // Subscription list (non-free, joined with users)
  const subscriptionList = await db
    .select({
      id: subscriptions.id,
      tier: subscriptions.tier,
      status: subscriptions.status,
      billingInterval: subscriptions.billingInterval,
      currentPeriodEnd: subscriptions.currentPeriodEnd,
      cancelAtPeriodEnd: subscriptions.cancelAtPeriodEnd,
      userName: users.name,
      userEmail: users.email,
    })
    .from(subscriptions)
    .innerJoin(users, eq(subscriptions.userId, users.id))
    .where(sql`${subscriptions.tier} != 'free'`)
    .orderBy(desc(subscriptions.createdAt));

  // Recent payments (last 20, joined with users)
  const recentPayments = await db
    .select({
      id: paymentHistory.id,
      amountCents: paymentHistory.amountCents,
      currency: paymentHistory.currency,
      status: paymentHistory.status,
      createdAt: paymentHistory.createdAt,
      userName: users.name,
      userEmail: users.email,
    })
    .from(paymentHistory)
    .innerJoin(users, eq(paymentHistory.userId, users.id))
    .orderBy(desc(paymentHistory.createdAt))
    .limit(20);

  return NextResponse.json({
    overview: {
      free: counts.free,
      pro: counts.pro,
      team: counts.team,
      activeSubscriptions: activeCount,
      trialUsers: trialCount,
      revenueThisMonthCents,
    },
    subscriptions: subscriptionList,
    recentPayments,
  });
}
