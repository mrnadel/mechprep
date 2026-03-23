import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import paddle from '@/lib/paddle';
import { db } from '@/lib/db';
import { users, subscriptions } from '@/lib/db/schema';
import { getAuthUserId } from '@/lib/auth-utils';
import { PADDLE_PRICES } from '@/lib/pricing';
import { rateLimit, RATE_LIMITS } from '@/lib/rate-limit';
import { serverEnv } from '@/lib/env';

export async function POST(request: NextRequest) {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const rl = rateLimit(`checkout:${userId}`, RATE_LIMITS.api);
  if (!rl.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
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

  const body = (await request.json()) as { priceId?: string };
  const priceId = body.priceId?.trim();

  // Validate the priceId is one we recognise
  const env = serverEnv();
  const validPrices = [
    env.PADDLE_PRO_MONTHLY_PRICE_ID || '',
    env.PADDLE_PRO_YEARLY_PRICE_ID || '',
  ].filter(Boolean);

  if (!priceId || !validPrices.includes(priceId)) {
    console.error('Checkout price validation failed', {
      priceId,
      validPrices,
      envMonthly: env.PADDLE_PRO_MONTHLY_PRICE_ID ?? 'MISSING',
      envYearly: env.PADDLE_PRO_YEARLY_PRICE_ID ?? 'MISSING',
    });
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

  // Create a transaction server-side and return its ID
  // This avoids client-side transaction creation issues
  try {
    // Look up existing Paddle customer ID for this user
    const [sub] = await db
      .select({ paddleCustomerId: subscriptions.paddleCustomerId })
      .from(subscriptions)
      .where(eq(subscriptions.userId, userId))
      .limit(1);

    const transaction = sub?.paddleCustomerId
      ? await paddle.transactions.create({
          items: [{ priceId, quantity: 1 }],
          customerId: sub.paddleCustomerId,
        })
      : await paddle.transactions.create({
          items: [{ priceId, quantity: 1 }],
          customer: { email: user.email },
        } as never);
    return NextResponse.json({ transactionId: transaction.id });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    const details = err && typeof err === 'object' && 'code' in err ? (err as Record<string, unknown>).code : undefined;
    console.error('Paddle transaction create failed:', message, details);
    // Do not leak internal error details to the client
    return NextResponse.json({ error: 'Failed to create checkout' }, { status: 500 });
  }
}
