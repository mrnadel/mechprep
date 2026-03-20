import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { stripe } from '@/lib/stripe';
import { db } from '@/lib/db';
import { users, subscriptions } from '@/lib/db/schema';
import { getAuthUserId } from '@/lib/auth-utils';
import { STRIPE_PRICES, PRO_TRIAL_DAYS } from '@/lib/pricing';

export async function POST(request: NextRequest) {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { priceId } = (await request.json()) as { priceId?: string };

  // Validate the priceId is one we recognise
  const validPrices = [
    STRIPE_PRICES.PRO_MONTHLY,
    STRIPE_PRICES.PRO_YEARLY,
    STRIPE_PRICES.TEAM_MONTHLY,
  ];
  if (!priceId || !validPrices.includes(priceId)) {
    return NextResponse.json({ error: 'Invalid price' }, { status: 400 });
  }

  // Fetch user email
  const [user] = await db
    .select({ email: users.email })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!user?.email) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Reuse existing Stripe customer if we have one
  const [existingSub] = await db
    .select({ stripeCustomerId: subscriptions.stripeCustomerId })
    .from(subscriptions)
    .where(eq(subscriptions.userId, userId))
    .limit(1);

  let customerId = existingSub?.stripeCustomerId ?? undefined;

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { userId },
    });
    customerId = customer.id;
  }

  // Determine if eligible for trial (no prior subscription)
  const isNewUser = !existingSub;
  const origin = request.headers.get('origin') ?? process.env.AUTH_URL ?? '';

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/pricing?success=true`,
    cancel_url: `${origin}/pricing?canceled=true`,
    metadata: { userId },
    ...(isNewUser
      ? { subscription_data: { trial_period_days: PRO_TRIAL_DAYS, metadata: { userId } } }
      : { subscription_data: { metadata: { userId } } }),
  });

  return NextResponse.json({ url: session.url });
}
