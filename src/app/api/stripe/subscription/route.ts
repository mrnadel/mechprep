import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { subscriptions } from '@/lib/db/schema';
import { getAuthUserId } from '@/lib/auth-utils';
import type { SubscriptionTier, SubscriptionStatus } from '@/lib/subscription';

export async function GET() {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const [sub] = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.userId, userId))
    .limit(1);

  if (!sub) {
    // User has no subscription row yet — they're on the free tier
    return NextResponse.json({
      subscription: {
        tier: 'free' as SubscriptionTier,
        status: 'active' as SubscriptionStatus,
        billingInterval: null,
        currentPeriodEnd: null,
        trialEnd: null,
        cancelAtPeriodEnd: false,
      },
    });
  }

  return NextResponse.json({
    subscription: {
      tier: sub.tier as SubscriptionTier,
      status: sub.status as SubscriptionStatus,
      billingInterval: sub.billingInterval,
      currentPeriodEnd: sub.currentPeriodEnd,
      trialEnd: sub.trialEnd,
      cancelAtPeriodEnd: sub.cancelAtPeriodEnd,
    },
  });
}
