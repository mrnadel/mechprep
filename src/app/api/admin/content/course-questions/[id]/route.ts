import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { courseQuestions } from '@/lib/db/schema';
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

  // Allowlist fields to prevent mass assignment
  const allowedFields: Record<string, unknown> = {};
  if (body.lessonId !== undefined) allowedFields.lessonId = body.lessonId;
  if (body.type !== undefined) allowedFields.type = body.type;
  if (body.question !== undefined) allowedFields.question = body.question;
  if (body.options !== undefined) allowedFields.options = body.options;
  if (body.correctIndex !== undefined) allowedFields.correctIndex = body.correctIndex;
  if (body.correctAnswer !== undefined) allowedFields.correctAnswer = body.correctAnswer;
  if (body.acceptedAnswers !== undefined) allowedFields.acceptedAnswers = body.acceptedAnswers;
  if (body.explanation !== undefined) allowedFields.explanation = body.explanation;
  if (body.hint !== undefined) allowedFields.hint = body.hint;
  if (body.diagram !== undefined) allowedFields.diagram = body.diagram;
  if (body.orderIndex !== undefined) allowedFields.orderIndex = body.orderIndex;

  if (Object.keys(allowedFields).length === 0) {
    return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
  }

  const [updated] = await db
    .update(courseQuestions)
    .set({ ...allowedFields, updatedAt: new Date() })
    .where(eq(courseQuestions.id, id))
    .returning();

  if (!updated) {
    return NextResponse.json({ error: 'Question not found' }, { status: 404 });
  }

  return NextResponse.json({ question: updated });
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

  const [deleted] = await db
    .delete(courseQuestions)
    .where(eq(courseQuestions.id, id))
    .returning();

  if (!deleted) {
    return NextResponse.json({ error: 'Question not found' }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
