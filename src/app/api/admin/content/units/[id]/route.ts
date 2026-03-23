import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { courseUnits } from '@/lib/db/schema';
import { getAuthUserId } from '@/lib/auth-utils';

const ADMIN_USER_ID = process.env.ADMIN_USER_ID;

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await getAuthUserId();
  if (!userId || userId !== ADMIN_USER_ID) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { id } = await params;
  const body = await req.json();

  const [updated] = await db
    .update(courseUnits)
    .set({ ...body, updatedAt: new Date() })
    .where(eq(courseUnits.id, id))
    .returning();

  if (!updated) {
    return NextResponse.json({ error: 'Unit not found' }, { status: 404 });
  }

  return NextResponse.json({ unit: updated });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await getAuthUserId();
  if (!userId || userId !== ADMIN_USER_ID) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { id } = await params;

  // Schema has onDelete: cascade on courseLessons.unitId and courseQuestions.lessonId,
  // so deleting the unit automatically cascades to lessons and questions.
  const [deleted] = await db
    .delete(courseUnits)
    .where(eq(courseUnits.id, id))
    .returning();

  if (!deleted) {
    return NextResponse.json({ error: 'Unit not found' }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
