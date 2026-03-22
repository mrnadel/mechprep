import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import {
  Environment,
  EventName,
  Paddle,
  type EventEntity,
  type SubscriptionNotification,
  type TransactionNotification,
} from '@paddle/paddle-node-sdk';
import { db } from '@/lib/db';
import { subscriptions, paymentHistory } from '@/lib/db/schema';
import { rateLimit, RATE_LIMITS } from '@/lib/rate-limit';

export const runtime = 'nodejs';

const isSandbox = process.env.PADDLE_API_KEY?.startsWith('pdl_sdbx_') ?? false;
const paddle = new Paddle(process.env.PADDLE_API_KEY!, {
  environment: isSandbox ? Environment.sandbox : Environment.production,
});

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
  const rl = rateLimit(`webhook:${ip}`, RATE_LIMITS.webhook);
  if (!rl.success) {
    return NextResponse.json(
      { error: 'Too many requests' },
      {
        status: 429,
        headers: {
          'Retry-After': Math.ceil(
            (rl.resetAt.getTime() - Date.now()) / 1000,
          ).toString(),
        },
      },
    );
  }

  const signature = request.headers.get('paddle-signature');
  if (!signature) {
    return NextResponse.json(
      { error: 'Missing signature' },
      { status: 400 },
    );
  }

  const body = await request.text();

  let event: EventEntity;
  try {
    event = await paddle.webhooks.unmarshal(
      body,
      process.env.PADDLE_WEBHOOK_SECRET!,
      signature,
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Webhook signature verification failed:', message);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 },
    );
  }

  try {
    switch (event.eventType) {
      case EventName.SubscriptionCreated:
      case EventName.SubscriptionUpdated:
        await handleSubscriptionUpsert(event.data as SubscriptionNotification);
        break;

      case EventName.SubscriptionCanceled:
        await handleSubscriptionCanceled(event.data as SubscriptionNotification);
        break;

      case EventName.SubscriptionPaused:
        await handleSubscriptionPaused(event.data as SubscriptionNotification);
        break;

      case EventName.TransactionCompleted:
        await handleTransactionCompleted(event.data as TransactionNotification);
        break;
    }
  } catch (err) {
    console.error(`Webhook handler error for ${event.eventType}:`, err);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 },
    );
  }

  return NextResponse.json({ received: true });
}

// ─── Helpers ────────────────────────────────────────────────────

function tierFromPriceId(priceId: string | null): 'free' | 'pro' {
  const proMonthly = process.env.PADDLE_PRO_MONTHLY_PRICE_ID;
  const proYearly = process.env.PADDLE_PRO_YEARLY_PRICE_ID;

  if (priceId === proMonthly || priceId === proYearly) return 'pro';
  return 'free';
}

function mapPaddleStatus(
  status: string,
): string {
  const map: Record<string, string> = {
    active: 'active',
    trialing: 'trialing',
    past_due: 'past_due',
    canceled: 'canceled',
    paused: 'canceled',
  };
  return map[status] ?? 'active';
}

// ─── Event handlers ─────────────────────────────────────────────

async function handleSubscriptionUpsert(sub: SubscriptionNotification) {
  const customerId = sub.customerId;
  if (!customerId) return;

  // Look up the user by paddleCustomerId
  const userId = await getUserIdByCustomer(customerId);
  if (!userId) return;

  const priceId = sub.items?.[0]?.price?.id ?? null;
  const interval = sub.items?.[0]?.price?.billingCycle?.interval ?? null;

  await upsertSubscription(userId, {
    tier: tierFromPriceId(priceId),
    status: mapPaddleStatus(sub.status ?? 'active'),
    paddleCustomerId: customerId,
    paddleSubscriptionId: sub.id,
    paddlePriceId: priceId,
    billingInterval: interval === 'year' ? 'year' : 'month',
    currentPeriodStart: sub.currentBillingPeriod?.startsAt ?? null,
    currentPeriodEnd: sub.currentBillingPeriod?.endsAt ?? null,
    trialStart: sub.items?.[0]?.trialDates?.startsAt ?? null,
    trialEnd: sub.items?.[0]?.trialDates?.endsAt ?? null,
    cancelAtPeriodEnd: sub.scheduledChange?.action === 'cancel',
  });
}

async function handleSubscriptionCanceled(sub: SubscriptionNotification) {
  const customerId = sub.customerId;
  if (!customerId) return;

  const userId = await getUserIdByCustomer(customerId);
  if (!userId) return;

  await upsertSubscription(userId, {
    tier: 'free',
    status: 'canceled',
    cancelAtPeriodEnd: false,
  });
}

async function handleSubscriptionPaused(sub: SubscriptionNotification) {
  const customerId = sub.customerId;
  if (!customerId) return;

  const userId = await getUserIdByCustomer(customerId);
  if (!userId) return;

  await upsertSubscription(userId, {
    status: 'canceled',
  });
}

async function handleTransactionCompleted(txn: TransactionNotification) {
  const customerId = txn.customerId;
  if (!customerId) return;

  const userId = await getUserIdByCustomer(customerId);
  if (!userId) return;

  // Idempotent: skip if already recorded
  if (txn.id) {
    const [existing] = await db
      .select({ id: paymentHistory.id })
      .from(paymentHistory)
      .where(eq(paymentHistory.paddleTransactionId, txn.id))
      .limit(1);
    if (existing) return;
  }

  const amountStr = txn.details?.totals?.total ?? '0';
  const amountCents = Math.round(parseFloat(amountStr));

  await db.insert(paymentHistory).values({
    userId,
    paddleTransactionId: txn.id ?? null,
    amountCents,
    currency: txn.currencyCode ?? 'USD',
    status: 'succeeded',
    description: `Paddle transaction ${txn.id ?? ''}`,
  });
}

// ─── DB utilities ───────────────────────────────────────────────

async function getUserIdByCustomer(
  paddleCustomerId: string,
): Promise<string | null> {
  const [row] = await db
    .select({ userId: subscriptions.userId })
    .from(subscriptions)
    .where(eq(subscriptions.paddleCustomerId, paddleCustomerId))
    .limit(1);
  return row?.userId ?? null;
}

async function upsertSubscription(
  userId: string,
  data: Partial<{
    tier: string;
    status: string;
    paddleCustomerId: string | null;
    paddleSubscriptionId: string;
    paddlePriceId: string | null;
    billingInterval: string | null;
    currentPeriodStart: string | null;
    currentPeriodEnd: string | null;
    trialStart: string | null;
    trialEnd: string | null;
    cancelAtPeriodEnd: boolean;
  }>,
) {
  const [existing] = await db
    .select({ id: subscriptions.id })
    .from(subscriptions)
    .where(eq(subscriptions.userId, userId))
    .limit(1);

  if (existing) {
    await db
      .update(subscriptions)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(subscriptions.userId, userId));
  } else {
    await db.insert(subscriptions).values({
      userId,
      tier: data.tier ?? 'free',
      status: data.status ?? 'active',
      ...data,
    });
  }
}
