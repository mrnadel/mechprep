import { NextRequest, NextResponse } from 'next/server';
import { eq, asc } from 'drizzle-orm';
import { db } from '@/lib/db';
import { courseLessons } from '@/lib/db/schema';
import { requireAdmin } from '@/lib/auth-utils';

export async function GET(req: NextRequest) {
  const adminId = await requireAdmin();
  if (!adminId) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const unitId = req.nextUrl.searchParams.get('unitId');

  if (!unitId) {
    return NextResponse.json(
      { error: 'unitId query parameter is required' },
      { status: 400 }
    );
  }

  const lessons = await db
    .select()
    .from(courseLessons)
    .where(eq(courseLessons.unitId, unitId))
    .orderBy(asc(courseLessons.orderIndex));

  return NextResponse.json({ lessons });
}

export async function POST(req: NextRequest) {
  const adminId = await requireAdmin();
  if (!adminId) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const { unitId, title, description, icon, xpReward, orderIndex } = body;

  const [lesson] = await db
    .insert(courseLessons)
    .values({ unitId, title, description, icon, xpReward, orderIndex })
    .returning();

  return NextResponse.json({ lesson }, { status: 201 });
}
