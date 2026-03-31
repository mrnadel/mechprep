import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { getAuthUserId } from '@/lib/auth-utils';

export async function DELETE(request: NextRequest) {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { confirmation } = body as { confirmation?: string };
  if (confirmation !== 'DELETE MY ACCOUNT') {
    return NextResponse.json(
      { error: 'Invalid confirmation phrase' },
      { status: 400 }
    );
  }

  // Delete user row. All related tables have onDelete: 'cascade',
  // so progress, subscriptions, sessions, friendships, etc. are wiped automatically.
  await db.delete(users).where(eq(users.id, userId));

  return NextResponse.json({ ok: true });
}
