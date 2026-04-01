import { NextRequest, NextResponse } from 'next/server';
import { eq, asc } from 'drizzle-orm';
import { db } from '@/lib/db';
import { courseQuestions } from '@/lib/db/schema';
import { requireAdmin } from '@/lib/auth-utils';

export async function GET(req: NextRequest) {
  const adminId = await requireAdmin();
  if (!adminId) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const lessonId = req.nextUrl.searchParams.get('lessonId');

  if (!lessonId) {
    return NextResponse.json(
      { error: 'lessonId query parameter is required' },
      { status: 400 }
    );
  }

  const questions = await db
    .select()
    .from(courseQuestions)
    .where(eq(courseQuestions.lessonId, lessonId))
    .orderBy(asc(courseQuestions.orderIndex));

  return NextResponse.json({ questions });
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
  const {
    lessonId,
    type,
    question,
    options,
    correctIndex,
    correctAnswer,
    acceptedAnswers,
    blanks,
    wordBank,
    explanation,
    hint,
    diagram,
    orderIndex,
  } = body;

  const [created] = await db
    .insert(courseQuestions)
    .values({
      lessonId,
      type,
      question,
      options,
      correctIndex,
      correctAnswer,
      acceptedAnswers,
      blanks,
      wordBank,
      explanation,
      hint,
      diagram,
      orderIndex,
    })
    .returning();

  return NextResponse.json({ question: created }, { status: 201 });
}
