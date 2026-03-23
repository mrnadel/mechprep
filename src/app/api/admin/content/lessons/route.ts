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

  let query = db.select().from(courseLessons);

  if (unitId) {
    query = query.where(eq(courseLessons.unitId, unitId)) as typeof query;
  }

  const lessons = await query.orderBy(asc(courseLessons.orderIndex));

  return NextResponse.json({ lessons });
}

export async function POST(req: NextRequest) {
  const adminId = await requireAdmin();
  if (!adminId) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await req.json();
  const { unitId, title, description, icon, xpReward, orderIndex } = body;

  const [lesson] = await db
    .insert(courseLessons)
    .values({ unitId, title, description, icon, xpReward, orderIndex })
    .returning();

  return NextResponse.json({ lesson }, { status: 201 });
}
