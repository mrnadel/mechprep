import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { courseUnits, courseLessons, courseQuestions } from '@/lib/db/schema';
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

  // Allowlist fields to prevent mass assignment
  const allowedFields: Record<string, unknown> = {};
  if (body.title !== undefined) allowedFields.title = body.title;
  if (body.description !== undefined) allowedFields.description = body.description;
  if (body.color !== undefined) allowedFields.color = body.color;
  if (body.icon !== undefined) allowedFields.icon = body.icon;
  if (body.orderIndex !== undefined) allowedFields.orderIndex = body.orderIndex;

  if (Object.keys(allowedFields).length === 0) {
    return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
  }

  const [updated] = await db
    .update(courseUnits)
    .set({ ...allowedFields, updatedAt: new Date() })
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
