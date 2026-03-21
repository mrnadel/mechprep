import { NextRequest, NextResponse } from 'next/server';
import { eq, and, asc } from 'drizzle-orm';
import { db } from '@/lib/db';
import { practiceQuestions } from '@/lib/db/schema';
import { getAuthUserId } from '@/lib/auth-utils';

const ADMIN_USER_ID = process.env.ADMIN_USER_ID;

export async function GET(req: NextRequest) {
  const userId = await getAuthUserId();
  if (!userId || userId !== ADMIN_USER_ID) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const topic = req.nextUrl.searchParams.get('topic');
  const difficulty = req.nextUrl.searchParams.get('difficulty');
  const type = req.nextUrl.searchParams.get('type');

  const conditions = [];
  if (topic) conditions.push(eq(practiceQuestions.topic, topic));
  if (difficulty) conditions.push(eq(practiceQuestions.difficulty, difficulty));
  if (type) conditions.push(eq(practiceQuestions.type, type));

  let query = db.select().from(practiceQuestions);

  if (conditions.length > 0) {
    query = query.where(
      conditions.length === 1 ? conditions[0] : and(...conditions)
    ) as typeof query;
  }

  const questions = await query.orderBy(asc(practiceQuestions.orderIndex));

  return NextResponse.json({ questions });
}

export async function POST(req: NextRequest) {
  const userId = await getAuthUserId();
  if (!userId || userId !== ADMIN_USER_ID) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await req.json();
  const {
    type,
    topic,
    subtopic,
    difficulty,
    question,
    explanation,
    interviewInsight,
    realWorldConnection,
    commonMistake,
    tags,
    typeData,
    orderIndex,
  } = body;

  const [created] = await db
    .insert(practiceQuestions)
    .values({
      type,
      topic,
      subtopic,
      difficulty,
      question,
      explanation,
      interviewInsight,
      realWorldConnection,
      commonMistake,
      tags,
      typeData,
      orderIndex,
    })
    .returning();

  return NextResponse.json({ question: created }, { status: 201 });
}
