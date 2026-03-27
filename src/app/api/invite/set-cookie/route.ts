import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';

export async function POST(request: Request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }

  const { code } = body;
  if (!code || typeof code !== 'string') {
    return NextResponse.json({ error: 'Code required' }, { status: 400 });
  }

  const [inviter] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.inviteCode, code))
    .limit(1);

  if (!inviter) {
    return NextResponse.json({ error: 'Invalid code' }, { status: 404 });
  }

  const cookieStore = await cookies();
  cookieStore.set('invite_ref', inviter.id, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });

  return NextResponse.json({ success: true });
}
