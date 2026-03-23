import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { courseUnits, courseLessons, courseQuestions } from '@/lib/db/schema';
import { requireAdmin } from '@/lib/auth-utils';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const adminId = await requireAdmin();
  if (!adminId) {
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
  const adminId = await requireAdmin();
  if (!adminId) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { id } = await params;

  // Get all lessons for this unit so we can cascade-delete their questions
  const lessons = await db
    .select({ id: courseLessons.id })
    .from(courseLessons)
    .where(eq(courseLessons.unitId, id));

  // Delete questions for each lesson
  for (const lesson of lessons) {
    await db
      .delete(courseQuestions)
      .where(eq(courseQuestions.lessonId, lesson.id));
  }

  // Delete all lessons for this unit
  await db.delete(courseLessons).where(eq(courseLessons.unitId, id));

  // Delete the unit itself
  const [deleted] = await db
    .delete(courseUnits)
    .where(eq(courseUnits.id, id))
    .returning();

  if (!deleted) {
    return NextResponse.json({ error: 'Unit not found' }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
