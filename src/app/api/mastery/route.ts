import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '@/lib/db';
import { masteryEvents } from '@/lib/db/schema';
import { getAuthUserId } from '@/lib/auth-utils';

const masteryEventSchema = z.object({
  id: z.string().max(100),
  questionId: z.string().max(100),
  topicId: z.string().max(100),
  subtopic: z.string().max(200).optional(),
  difficulty: z.string().max(50),
  correct: z.boolean(),
  source: z.string().max(50),
  answeredAt: z.string().max(50),
});

const masteryPostSchema = z.object({
  events: z.array(masteryEventSchema).max(200),
});

export async function GET() {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const events = await db
    .select({
      id: masteryEvents.id,
      questionId: masteryEvents.questionId,
      topicId: masteryEvents.topicId,
      subtopic: masteryEvents.subtopic,
      difficulty: masteryEvents.difficulty,
      correct: masteryEvents.correct,
      source: masteryEvents.source,
      answeredAt: masteryEvents.answeredAt,
    })
    .from(masteryEvents)
    .where(eq(masteryEvents.userId, userId));

  return NextResponse.json({ events });
}

export async function POST(request: NextRequest) {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = masteryPostSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid input', details: parsed.error.issues[0]?.message },
      { status: 400 },
    );
  }

  const { events } = parsed.data;

  if (events.length === 0) {
    return NextResponse.json({ ok: true, inserted: 0 });
  }

  const rows = events.map((event) => ({
    id: event.id,
    userId,
    questionId: event.questionId,
    topicId: event.topicId,
    subtopic: event.subtopic ?? null,
    difficulty: event.difficulty,
    correct: event.correct,
    source: event.source,
    answeredAt: event.answeredAt,
  }));

  await db.insert(masteryEvents).values(rows).onConflictDoNothing();

  return NextResponse.json({ ok: true, inserted: rows.length });
}
