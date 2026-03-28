import { NextRequest, NextResponse } from 'next/server';
import { eq, and } from 'drizzle-orm';
import { db } from '@/lib/db';
import { courseAccess } from '@/lib/db/schema';
import { requireAdmin } from '@/lib/auth-utils';

// POST: Grant course access to a user
// DELETE: Revoke course access from a user
// Both expect { userId: string, professionId: string }

export async function POST(req: NextRequest) {
  const adminId = await requireAdmin();
  if (!adminId) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { userId, professionId } = body as { userId?: string; professionId?: string };
  if (!userId || !professionId) {
    return NextResponse.json({ error: 'Missing userId or professionId' }, { status: 400 });
  }

  // Upsert: insert if not exists
  await db
    .insert(courseAccess)
    .values({ userId, professionId })
    .onConflictDoNothing();

  return NextResponse.json({ success: true, granted: true });
}

export async function DELETE(req: NextRequest) {
  const adminId = await requireAdmin();
  if (!adminId) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { userId, professionId } = body as { userId?: string; professionId?: string };
  if (!userId || !professionId) {
    return NextResponse.json({ error: 'Missing userId or professionId' }, { status: 400 });
  }

  await db
    .delete(courseAccess)
    .where(and(eq(courseAccess.userId, userId), eq(courseAccess.professionId, professionId)));

  return NextResponse.json({ success: true, granted: false });
}
