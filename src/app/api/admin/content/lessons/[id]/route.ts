import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { courseLessons } from '@/lib/db/schema';
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
  const userId = await getAuthUserId();
  if (!userId || userId !== ADMIN_USER_ID) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { id } = await params;

  // Schema has onDelete: cascade on courseQuestions.lessonId,
  // so deleting the lesson automatically cascades to its questions.
  const [deleted] = await db
    .delete(courseLessons)
    .where(eq(courseLessons.id, id))
    .returning();

  if (!deleted) {
    return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
