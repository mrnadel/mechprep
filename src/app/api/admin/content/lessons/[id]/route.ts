import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { courseLessons, courseQuestions } from '@/lib/db/schema';
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
    .update(courseLessons)
    .set({ ...body, updatedAt: new Date() })
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
  const adminId = await requireAdmin();
  if (!adminId) {
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
