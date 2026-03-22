import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import paddle from '@/lib/paddle';
import { db } from '@/lib/db';
import { users, subscriptions } from '@/lib/db/schema';
import { getAuthUserId } from '@/lib/auth-utils';
import { PADDLE_PRICES } from '@/lib/pricing';
import { rateLimit, RATE_LIMITS } from '@/lib/rate-limit';

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

  const { priceId } = (await request.json()) as { priceId?: string };

  // Validate the priceId is one we recognise
  const validPrices = [
    process.env.PADDLE_PRO_MONTHLY_PRICE_ID || '',
    process.env.PADDLE_PRO_YEARLY_PRICE_ID || '',
  ];

  if (!priceId || !validPrices.includes(priceId)) {
    console.error('Checkout price validation failed', {
      priceId,
      validPrices,
      envMonthly: process.env.PADDLE_PRO_MONTHLY_PRICE_ID ?? 'MISSING',
      envYearly: process.env.PADDLE_PRO_YEARLY_PRICE_ID ?? 'MISSING',
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

  // Reuse existing Paddle customer or create one
  const [existingSub] = await db
    .select({ paddleCustomerId: subscriptions.paddleCustomerId })
    .from(subscriptions)
    .where(eq(subscriptions.userId, userId))
    .limit(1);

  let customerId = existingSub?.paddleCustomerId ?? undefined;

  if (!customerId) {
    // Try to find existing Paddle customer by email, or create a new one
    try {
      const customer = await paddle.customers.create({
        email: user.email,
      });
      customerId = customer.id;
    } catch (err: unknown) {
      // If customer already exists in Paddle, list and find by email
      const message = err instanceof Error ? err.message : '';
      if (message.includes('conflicts')) {
        const customers = await paddle.customers.list({ email: [user.email] });
        for await (const c of customers) {
          customerId = c.id;
          break;
        }
      }
      if (!customerId) throw err;
    }

    // Save the Paddle customer ID for future checkouts
    await db.insert(subscriptions).values({
      userId,
      tier: 'free',
      status: 'active',
      paddleCustomerId: customerId,
    }).onConflictDoUpdate({
      target: subscriptions.userId,
      set: { paddleCustomerId: customerId, updatedAt: new Date() },
    });
  }

  // Return customer ID so the client can open the Paddle checkout overlay
  return NextResponse.json({ customerId });
}
