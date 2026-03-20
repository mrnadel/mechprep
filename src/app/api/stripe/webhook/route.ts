import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { db } from '@/lib/db';
import { subscriptions, paymentHistory } from '@/lib/db/schema';
import { rateLimit, RATE_LIMITS } from '@/lib/rate-limit';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
  const rl = rateLimit(`webhook:${ip}`, RATE_LIMITS.webhook);
  if (!rl.success) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429, headers: { 'Retry-After': Math.ceil((rl.resetAt.getTime() - Date.now()) / 1000).toString() } }
    );
  }

  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Webhook signature verification failed:', message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;

      case 'invoice.paid':
        await handleInvoicePaid(event.data.object as Stripe.Invoice);
        break;

      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
        break;
    }
  } catch (err) {
    console.error(`Webhook handler error for ${event.type}:`, err);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

// ─── Helpers ────────────────────────────────────────────────────

function toISODate(ts: number | null | undefined): string | null {
  if (!ts) return null;
  return new Date(ts * 1000).toISOString();
}

function tierFromPriceId(priceId: string | null): 'free' | 'pro' | 'team' {
  const proMonthly = process.env.STRIPE_PRO_MONTHLY_PRICE_ID;
  const proYearly = process.env.STRIPE_PRO_YEARLY_PRICE_ID;
  const teamMonthly = process.env.STRIPE_TEAM_MONTHLY_PRICE_ID;

  if (priceId === proMonthly || priceId === proYearly) return 'pro';
  if (priceId === teamMonthly) return 'team';
  return 'free';
}

function intervalFromSub(sub: Stripe.Subscription): string | null {
  const item = sub.items.data[0];
  return item?.price?.recurring?.interval ?? null;
}

function resolveCustomerId(customer: string | Stripe.Customer | Stripe.DeletedCustomer | null): string | null {
  if (!customer) return null;
  if (typeof customer === 'string') return customer;
  return customer.id;
}

// ─── Event handlers ─────────────────────────────────────────────

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId;
  if (!userId || session.mode !== 'subscription') return;

  const stripeSubscription = await stripe.subscriptions.retrieve(
    session.subscription as string,
  );

  const priceId = stripeSubscription.items.data[0]?.price?.id ?? null;

  await upsertSubscription(userId, {
    tier: tierFromPriceId(priceId),
    status: stripeSubscription.status === 'trialing' ? 'trialing' : 'active',
    stripeCustomerId: resolveCustomerId(session.customer),
    stripeSubscriptionId: stripeSubscription.id,
    stripePriceId: priceId,
    billingInterval: intervalFromSub(stripeSubscription),
    currentPeriodStart: toISODate(stripeSubscription.start_date),
    currentPeriodEnd: toISODate(stripeSubscription.cancel_at ?? stripeSubscription.billing_cycle_anchor),
    trialStart: toISODate(stripeSubscription.trial_start),
    trialEnd: toISODate(stripeSubscription.trial_end),
    cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end,
  });
}

async function handleSubscriptionUpdated(sub: Stripe.Subscription) {
  const userId = sub.metadata?.userId;
  if (!userId) return;

  const priceId = sub.items.data[0]?.price?.id ?? null;

  await upsertSubscription(userId, {
    tier: tierFromPriceId(priceId),
    status: mapStripeStatus(sub.status),
    stripePriceId: priceId,
    billingInterval: intervalFromSub(sub),
    currentPeriodStart: toISODate(sub.start_date),
    currentPeriodEnd: toISODate(sub.cancel_at ?? sub.billing_cycle_anchor),
    trialStart: toISODate(sub.trial_start),
    trialEnd: toISODate(sub.trial_end),
    cancelAtPeriodEnd: sub.cancel_at_period_end,
  });
}

async function handleSubscriptionDeleted(sub: Stripe.Subscription) {
  const userId = sub.metadata?.userId;
  if (!userId) return;

  await upsertSubscription(userId, {
    tier: 'free',
    status: 'canceled',
    cancelAtPeriodEnd: false,
  });
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  const customerId = resolveCustomerId(invoice.customer);
  if (!customerId) return;

  const userId = await getUserIdByCustomer(customerId);
  if (!userId) return;

  // Idempotent: skip if already recorded
  if (invoice.id) {
    const [existing] = await db
      .select({ id: paymentHistory.id })
      .from(paymentHistory)
      .where(eq(paymentHistory.stripeInvoiceId, invoice.id))
      .limit(1);
    if (existing) return;
  }

  await db.insert(paymentHistory).values({
    userId,
    stripeInvoiceId: invoice.id ?? null,
    stripePaymentIntentId: null,
    amountCents: invoice.amount_paid ?? 0,
    currency: invoice.currency ?? 'usd',
    status: 'succeeded',
    description: `Invoice ${invoice.number ?? ''}`,
  });
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  const customerId = resolveCustomerId(invoice.customer);
  if (!customerId) return;

  const userId = await getUserIdByCustomer(customerId);
  if (!userId) return;

  // Mark subscription as past_due
  await upsertSubscription(userId, { status: 'past_due' });

  // Record the failed payment (idempotent)
  if (invoice.id) {
    const [existing] = await db
      .select({ id: paymentHistory.id })
      .from(paymentHistory)
      .where(eq(paymentHistory.stripeInvoiceId, invoice.id))
      .limit(1);
    if (existing) return;
  }

  await db.insert(paymentHistory).values({
    userId,
    stripeInvoiceId: invoice.id ?? null,
    stripePaymentIntentId: null,
    amountCents: invoice.amount_due ?? 0,
    currency: invoice.currency ?? 'usd',
    status: 'failed',
    description: `Failed: Invoice ${invoice.number ?? ''}`,
  });
}

// ─── DB utilities ───────────────────────────────────────────────

async function getUserIdByCustomer(stripeCustomerId: string): Promise<string | null> {
  const [row] = await db
    .select({ userId: subscriptions.userId })
    .from(subscriptions)
    .where(eq(subscriptions.stripeCustomerId, stripeCustomerId))
    .limit(1);
  return row?.userId ?? null;
}

async function upsertSubscription(
  userId: string,
  data: Partial<{
    tier: string;
    status: string;
    stripeCustomerId: string | null;
    stripeSubscriptionId: string;
    stripePriceId: string | null;
    billingInterval: string | null;
    currentPeriodStart: string | null;
    currentPeriodEnd: string | null;
    trialStart: string | null;
    trialEnd: string | null;
    cancelAtPeriodEnd: boolean;
    teamId: string | null;
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

function mapStripeStatus(status: Stripe.Subscription.Status): string {
  const map: Record<string, string> = {
    active: 'active',
    trialing: 'trialing',
    past_due: 'past_due',
    canceled: 'canceled',
    unpaid: 'unpaid',
    incomplete: 'incomplete',
    incomplete_expired: 'canceled',
    paused: 'canceled',
  };
  return map[status] ?? 'active';
}
