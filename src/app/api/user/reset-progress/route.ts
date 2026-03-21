import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import {
  userProgress,
  courseProgress,
  topicProgress,
  sessionHistory,
  dailyUsage,
} from '@/lib/db/schema';
import { getAuthUserId } from '@/lib/auth-utils';

export async function DELETE(request: NextRequest) {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Require the confirmation phrase in the body
  const { confirmation } = await request.json();
  if (confirmation !== 'RESET MY PROGRESS') {
    return NextResponse.json(
      { error: 'Invalid confirmation phrase' },
      { status: 400 }
    );
  }

  // Wipe all progress tables for this user
  await Promise.all([
    db.delete(sessionHistory).where(eq(sessionHistory.userId, userId)),
    db.delete(topicProgress).where(eq(topicProgress.userId, userId)),
    db.delete(dailyUsage).where(eq(dailyUsage.userId, userId)),
    db.delete(userProgress).where(eq(userProgress.userId, userId)),
    db.delete(courseProgress).where(eq(courseProgress.userId, userId)),
  ]);

  return NextResponse.json({ ok: true });
}
