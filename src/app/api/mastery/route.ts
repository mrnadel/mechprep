import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { masteryEvents } from '@/lib/db/schema';
import { getAuthUserId } from '@/lib/auth-utils';
import { canStartPracticeSession, canAccessPracticeMode } from '@/lib/access-control';

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

  // ── Server-side daily limit enforcement ──
  // Reject mastery events if the user has exceeded their daily question limit
  const limitCheck = await canStartPracticeSession(userId);
  if (!limitCheck.allowed) {
    return NextResponse.json(
      { error: 'Daily question limit reached', remaining: 0, limit: limitCheck.limit },
      { status: 403 }
    );
  }

  const { events } = (await request.json()) as {
    events: {
      id: string;
      questionId: string;
      topicId: string;
      subtopic?: string;
      difficulty: string;
      correct: boolean;
      source: string;
      answeredAt: string;
    }[];
  };

  if (!events || events.length === 0) {
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
