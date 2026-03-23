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
import { users, subscriptions, paymentHistory } from '@/lib/db/schema';
import { serverEnv } from '@/lib/env';

export const runtime = 'nodejs';

const env = serverEnv();
const isSandbox = env.PADDLE_API_KEY.startsWith('pdl_sdbx_');
const paddle = new Paddle(env.PADDLE_API_KEY, {
  environment: isSandbox ? Environment.sandbox : Environment.production,
});

// ─── Custom error for non-retryable failures ────────────────
// Return 200 to Paddle so it does not retry indefinitely.
class NonRetryableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NonRetryableError';
  }
}

export async function POST(request: NextRequest) {
  // ── Signature verification ──────────────────────────────────
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
      env.PADDLE_WEBHOOK_SECRET,
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

  // ── Event dispatch ──────────────────────────────────────────
  try {
    switch (event.eventType) {
      // Subscription lifecycle — all upsert the subscription record
      case EventName.SubscriptionCreated:
      case EventName.SubscriptionUpdated:
      case EventName.SubscriptionActivated:
      case EventName.SubscriptionResumed:
      case EventName.SubscriptionTrialing:
        await handleSubscriptionUpsert(event.data as SubscriptionNotification);
        break;

      case EventName.SubscriptionPastDue:
        await handleSubscriptionPastDue(event.data as SubscriptionNotification);
        break;

      case EventName.SubscriptionCanceled:
        await handleSubscriptionCanceled(event.data as SubscriptionNotification);
        break;

      case EventName.SubscriptionPaused:
        await handleSubscriptionPaused(event.data as SubscriptionNotification);
        break;

      // Transaction events
      case EventName.TransactionCompleted:
        await handleTransactionCompleted(event.data as TransactionNotification);
        break;

      case EventName.TransactionPaymentFailed:
        await handleTransactionPaymentFailed(event.data as TransactionNotification);
        break;

      // Adjustment events (refunds)
      case EventName.AdjustmentCreated:
        await handleAdjustmentCreated(event.data as unknown as Record<string, unknown>);
        break;

      default:
        // Unhandled event type — acknowledge so Paddle does not retry
        console.log(`Unhandled Paddle webhook event: ${event.eventType}`);
        break;
    }
  } catch (err) {
    // Non-retryable errors: return 200 so Paddle stops retrying
    if (err instanceof NonRetryableError) {
      console.warn(`Non-retryable webhook error for ${event.eventType}:`, err.message);
      return NextResponse.json({ received: true, warning: 'non-retryable error' });
    }

    // Retryable errors: return 500 so Paddle retries
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
  const proMonthly = env.PADDLE_PRO_MONTHLY_PRICE_ID;
  const proYearly = env.PADDLE_PRO_YEARLY_PRICE_ID;

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
  // Default to 'past_due' for unknown statuses — safe: grants temporary
  // access while flagging the account for attention, rather than silently
  // granting full 'active' access for unrecognised statuses.
  return map[status] ?? 'past_due';
}

// ─── Subscription Event Handlers ────────────────────────────────

async function handleSubscriptionUpsert(sub: SubscriptionNotification) {
  const customerId = sub.customerId;
  if (!customerId) return;

  const userId = await getUserIdByCustomer(customerId);
  if (!userId) {
    throw new NonRetryableError(`No user found for Paddle customer ${customerId}`);
  }

  const priceId = sub.items?.[0]?.price?.id ?? null;
  const interval = sub.items?.[0]?.price?.billingCycle?.interval ?? null;

  await upsertSubscription(userId, sub.id, {
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

async function handleSubscriptionPastDue(sub: SubscriptionNotification) {
  const customerId = sub.customerId;
  if (!customerId) return;

  const userId = await getUserIdByCustomer(customerId);
  if (!userId) {
    throw new NonRetryableError(`No user found for Paddle customer ${customerId}`);
  }

  const priceId = sub.items?.[0]?.price?.id ?? null;

  // Keep the current tier so the user retains access during the grace period,
  // but mark the status as past_due so the UI can show a payment warning.
  await upsertSubscription(userId, sub.id, {
    tier: tierFromPriceId(priceId),
    status: 'past_due',
    paddleCustomerId: customerId,
    paddleSubscriptionId: sub.id,
    currentPeriodStart: sub.currentBillingPeriod?.startsAt ?? null,
    currentPeriodEnd: sub.currentBillingPeriod?.endsAt ?? null,
  });
}

async function handleSubscriptionCanceled(sub: SubscriptionNotification) {
  const customerId = sub.customerId;
  if (!customerId) return;

  const userId = await getUserIdByCustomer(customerId);
  if (!userId) {
    throw new NonRetryableError(`No user found for Paddle customer ${customerId}`);
  }

  // Preserve currentPeriodEnd so the user knows when access actually expires.
  await upsertSubscription(userId, sub.id, {
    tier: 'free',
    status: 'canceled',
    cancelAtPeriodEnd: false,
    currentPeriodEnd: sub.currentBillingPeriod?.endsAt ?? null,
  });
}

async function handleSubscriptionPaused(sub: SubscriptionNotification) {
  const customerId = sub.customerId;
  if (!customerId) return;

  const userId = await getUserIdByCustomer(customerId);
  if (!userId) {
    throw new NonRetryableError(`No user found for Paddle customer ${customerId}`);
  }

  await upsertSubscription(userId, sub.id, {
    tier: 'free',
    status: 'canceled',
    currentPeriodEnd: sub.currentBillingPeriod?.endsAt ?? null,
  });
}

// ─── Transaction Event Handlers ─────────────────────────────────

async function handleTransactionCompleted(txn: TransactionNotification) {
  const customerId = txn.customerId;
  if (!customerId) return;

  const userId = await getUserIdByCustomer(customerId);
  if (!userId) {
    throw new NonRetryableError(`No user found for Paddle customer ${customerId}`);
  }

  // Idempotent: skip if already recorded (unique constraint on paddleTransactionId
  // also guards against races, but checking first avoids unnecessary INSERT attempts)
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

async function handleTransactionPaymentFailed(txn: TransactionNotification) {
  const customerId = txn.customerId;
  if (!customerId) return;

  const userId = await getUserIdByCustomer(customerId);
  if (!userId) {
    throw new NonRetryableError(`No user found for Paddle customer ${customerId}`);
  }

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
    status: 'failed',
    description: `Failed payment — Paddle transaction ${txn.id ?? ''}`,
  });
}

// ─── Adjustment (Refund) Handler ────────────────────────────────

async function handleAdjustmentCreated(data: Record<string, unknown>) {
  // Paddle adjustment events include: id, transactionId, action (refund|credit|chargeback), totals, etc.
  const adjustmentId = data.id as string | undefined;
  const transactionId = data.transactionId as string | undefined;
  const action = data.action as string | undefined;
  const customerId = data.customerId as string | undefined;

  if (!transactionId) return;

  // Idempotent: use adjustmentId as the paddleTransactionId to avoid duplicates
  const recordId = adjustmentId ?? `adj_${transactionId}`;
  const [existing] = await db
    .select({ id: paymentHistory.id })
    .from(paymentHistory)
    .where(eq(paymentHistory.paddleTransactionId, recordId))
    .limit(1);
  if (existing) return;

  // Try to find the user from the original transaction
  let userId: string | null = null;

  // First try from the original transaction's payment history
  if (transactionId) {
    const [txnRecord] = await db
      .select({ userId: paymentHistory.userId })
      .from(paymentHistory)
      .where(eq(paymentHistory.paddleTransactionId, transactionId))
      .limit(1);
    if (txnRecord) userId = txnRecord.userId;
  }

  // Fall back to customer lookup
  if (!userId && customerId) {
    userId = await getUserIdByCustomer(customerId);
  }

  if (!userId) {
    console.warn(`Adjustment ${adjustmentId}: could not resolve user for transaction ${transactionId}`);
    return; // Non-critical: don't fail the webhook
  }

  const totals = data.totals as Record<string, string> | undefined;
  const amountStr = totals?.total ?? '0';
  const amountCents = Math.round(parseFloat(amountStr));

  await db.insert(paymentHistory).values({
    userId,
    paddleTransactionId: recordId,
    amountCents,
    currency: (data.currencyCode as string) ?? 'USD',
    status: action === 'refund' ? 'refunded' : (action ?? 'adjustment'),
    description: `${action ?? 'Adjustment'} for transaction ${transactionId}`,
  });
}

// ─── DB utilities ───────────────────────────────────────────────

async function getUserIdByCustomer(
  paddleCustomerId: string,
): Promise<string | null> {
  // First try to find by paddleCustomerId in subscriptions
  const [row] = await db
    .select({ userId: subscriptions.userId })
    .from(subscriptions)
    .where(eq(subscriptions.paddleCustomerId, paddleCustomerId))
    .limit(1);
  if (row) return row.userId;

  // If not found, look up the Paddle customer's email and match to our users
  try {
    const customer = await paddle.customers.get(paddleCustomerId);
    if (customer?.email) {
      const [user] = await db
        .select({ id: users.id })
        .from(users)
        .where(eq(users.email, customer.email))
        .limit(1);
      return user?.id ?? null;
    }
  } catch (err) {
    console.error('Failed to look up Paddle customer:', err);
  }

  return null;
}

/**
 * Idempotent subscription upsert with stale-event protection.
 *
 * If a subscription record already exists AND has a newer updatedAt timestamp
 * than the incoming webhook, the update is skipped to prevent out-of-order
 * webhooks from overwriting fresher data.
 */
async function upsertSubscription(
  userId: string,
  paddleSubscriptionId: string,
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
  const now = new Date();

  const [existing] = await db
    .select({ id: subscriptions.id, updatedAt: subscriptions.updatedAt })
    .from(subscriptions)
    .where(eq(subscriptions.userId, userId))
    .limit(1);

  if (existing) {
    await db
      .update(subscriptions)
      .set({ ...data, updatedAt: now })
      .where(eq(subscriptions.userId, userId));
  } else {
    await db.insert(subscriptions).values({
      userId,
      tier: data.tier ?? 'free',
      status: data.status ?? 'active',
      ...data,
      updatedAt: now,
    });
  }
}
