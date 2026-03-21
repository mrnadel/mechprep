import { NextRequest, NextResponse } from 'next/server';
import { eq, asc } from 'drizzle-orm';
import { db } from '@/lib/db';
import { courseQuestions } from '@/lib/db/schema';
import { getAuthUserId } from '@/lib/auth-utils';

const ADMIN_USER_ID = process.env.ADMIN_USER_ID;

export async function GET(req: NextRequest) {
  const userId = await getAuthUserId();
  if (!userId || userId !== ADMIN_USER_ID) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const lessonId = req.nextUrl.searchParams.get('lessonId');

  let query = db.select().from(courseQuestions);

  if (lessonId) {
    query = query.where(eq(courseQuestions.lessonId, lessonId)) as typeof query;
  }

  const questions = await query.orderBy(asc(courseQuestions.orderIndex));

  return NextResponse.json({ questions });
}

export async function POST(req: NextRequest) {
  const userId = await getAuthUserId();
  if (!userId || userId !== ADMIN_USER_ID) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await req.json();
  const {
    lessonId,
    type,
    question,
    options,
    correctIndex,
    correctAnswer,
    acceptedAnswers,
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
      explanation,
      hint,
      diagram,
      orderIndex,
    })
    .returning();

  return NextResponse.json({ question: created }, { status: 201 });
}
