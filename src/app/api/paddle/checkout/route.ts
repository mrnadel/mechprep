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
    PADDLE_PRICES.PRO_MONTHLY,
    PADDLE_PRICES.PRO_YEARLY,
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

  // Reuse existing Paddle customer or create one
  const [existingSub] = await db
    .select({ paddleCustomerId: subscriptions.paddleCustomerId })
    .from(subscriptions)
    .where(eq(subscriptions.userId, userId))
    .limit(1);

  let customerId = existingSub?.paddleCustomerId ?? undefined;

  if (!customerId) {
    const customer = await paddle.customers.create({
      email: user.email,
    });
    customerId = customer.id;
  }

  // Return customer ID so the client can open the Paddle checkout overlay
  return NextResponse.json({ customerId });
}
