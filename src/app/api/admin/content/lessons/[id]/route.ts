import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { courseLessons, courseQuestions } from '@/lib/db/schema';
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
  if (body.unitId !== undefined) allowedFields.unitId = body.unitId;
  if (body.title !== undefined) allowedFields.title = body.title;
  if (body.description !== undefined) allowedFields.description = body.description;
  if (body.icon !== undefined) allowedFields.icon = body.icon;
  if (body.xpReward !== undefined) allowedFields.xpReward = body.xpReward;
  if (body.orderIndex !== undefined) allowedFields.orderIndex = body.orderIndex;

  if (Object.keys(allowedFields).length === 0) {
    return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
  }

  const [updated] = await db
    .update(courseLessons)
    .set({ ...allowedFields, updatedAt: new Date() })
    .where(eq(courseLessons.id, id))
    .returning();

  if (!updated) {
    return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
  }

  return NextResponse.json({ lesson: updated });
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

  // Delete all questions for this lesson first
  await db.delete(courseQuestions).where(eq(courseQuestions.lessonId, id));

  // Delete the lesson itself
  const [deleted] = await db
    .delete(courseLessons)
    .where(eq(courseLessons.id, id))
    .returning();

  if (!deleted) {
    return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
