import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { practiceQuestions } from '@/lib/db/schema';
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
  if (body.type !== undefined) allowedFields.type = body.type;
  if (body.topic !== undefined) allowedFields.topic = body.topic;
  if (body.subtopic !== undefined) allowedFields.subtopic = body.subtopic;
  if (body.difficulty !== undefined) allowedFields.difficulty = body.difficulty;
  if (body.question !== undefined) allowedFields.question = body.question;
  if (body.explanation !== undefined) allowedFields.explanation = body.explanation;
  if (body.interviewInsight !== undefined) allowedFields.interviewInsight = body.interviewInsight;
  if (body.realWorldConnection !== undefined) allowedFields.realWorldConnection = body.realWorldConnection;
  if (body.commonMistake !== undefined) allowedFields.commonMistake = body.commonMistake;
  if (body.tags !== undefined) allowedFields.tags = body.tags;
  if (body.typeData !== undefined) allowedFields.typeData = body.typeData;
  if (body.orderIndex !== undefined) allowedFields.orderIndex = body.orderIndex;

  if (Object.keys(allowedFields).length === 0) {
    return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
  }

  const [updated] = await db
    .update(practiceQuestions)
    .set({ ...allowedFields, updatedAt: new Date() })
    .where(eq(practiceQuestions.id, id))
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
    .delete(practiceQuestions)
    .where(eq(practiceQuestions.id, id))
    .returning();

  if (!deleted) {
    return NextResponse.json({ error: 'Question not found' }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
