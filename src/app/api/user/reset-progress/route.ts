import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import {
  userProgress,
  courseProgress,
  topicProgress,
  sessionHistory,
  dailyUsage,
  masteryEvents,
} from '@/lib/db/schema';
import { getAuthUserId } from '@/lib/auth-utils';

export async function DELETE(request: NextRequest) {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Require the confirmation phrase in the body
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const { confirmation } = body as { confirmation?: string };
  if (confirmation !== 'RESET MY PROGRESS') {
    return NextResponse.json(
      { error: 'Invalid confirmation phrase' },
      { status: 400 }
    );
  }

  // Wipe all progress tables for this user atomically
  await db.transaction(async (tx) => {
    await Promise.all([
      tx.delete(sessionHistory).where(eq(sessionHistory.userId, userId)),
      tx.delete(topicProgress).where(eq(topicProgress.userId, userId)),
      tx.delete(dailyUsage).where(eq(dailyUsage.userId, userId)),
      tx.delete(userProgress).where(eq(userProgress.userId, userId)),
      tx.delete(courseProgress).where(eq(courseProgress.userId, userId)),
      tx.delete(masteryEvents).where(eq(masteryEvents.userId, userId)),
    ]);
  });

  return NextResponse.json({ ok: true });
}
