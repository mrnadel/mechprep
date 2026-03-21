import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { contentFeedback, contentFeedbackDismissals } from '@/lib/db/schema';
import { getAuthUserId } from '@/lib/auth-utils';
import { getQuestionById } from '@/data/questions';
import { course } from '@/data/course';
import type { ContentFeedbackType, FeedbackReason } from '@/data/types';

const ADMIN_USER_ID = process.env.ADMIN_USER_ID;

function getCourseQuestionText(contentId: string): string | null {
  for (const unit of course) {
    for (const lesson of unit.lessons) {
      const q = lesson.questions.find((q) => q.id === contentId);
      if (q) return q.question;
    }
  }
  return null;
}

function getQuestionText(contentType: string, contentId: string): string {
  if (contentType === 'question') {
    const q = getQuestionById(contentId);
    return q ? q.question.slice(0, 80) : `[Unknown: ${contentId}]`;
  }
  const text = getCourseQuestionText(contentId);
  return text ? text.slice(0, 80) : `[Unknown: ${contentId}]`;
}

export async function GET(req: NextRequest) {
  const userId = await getAuthUserId();
  if (!userId || userId !== ADMIN_USER_ID) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const includeDismissed = req.nextUrl.searchParams.get('includeDismissed') === 'true';

  // Fetch all flags
  const rows = await db
    .select({
      contentType: contentFeedback.contentType,
      contentId: contentFeedback.contentId,
      reason: contentFeedback.reason,
      createdAt: contentFeedback.createdAt,
    })
    .from(contentFeedback);

  // Fetch all dismissals
  const dismissals = await db
    .select()
    .from(contentFeedbackDismissals);

  const dismissalMap = new Map(
    dismissals.map((d) => [`${d.contentType}:${d.contentId}`, d.dismissedAt])
  );

  // Aggregate by (contentType, contentId)
  const grouped = new Map<string, {
    contentType: string;
    contentId: string;
    totalFlags: number;
    reasons: Record<string, number>;
    latestFlagAt: Date | null;
  }>();

  for (const row of rows) {
    const key = `${row.contentType}:${row.contentId}`;
    if (!grouped.has(key)) {
      grouped.set(key, {
        contentType: row.contentType,
        contentId: row.contentId,
        totalFlags: 0,
        reasons: { confusing: 0, incorrect: 0, 'too-easy': 0, 'too-hard': 0 },
        latestFlagAt: null,
      });
    }
    const g = grouped.get(key)!;
    g.totalFlags++;
    g.reasons[row.reason] = (g.reasons[row.reason] || 0) + 1;
    if (!g.latestFlagAt || (row.createdAt && row.createdAt > g.latestFlagAt)) {
      g.latestFlagAt = row.createdAt;
    }
  }

  // Build result
  const items = [];
  for (const [key, g] of grouped) {
    const dismissedAt = dismissalMap.get(key) ?? null;

    // Filter dismissed if needed
    if (!includeDismissed && dismissedAt && g.latestFlagAt && dismissedAt >= g.latestFlagAt) {
      continue;
    }

    items.push({
      contentId: g.contentId,
      contentType: g.contentType as ContentFeedbackType,
      questionText: getQuestionText(g.contentType, g.contentId),
      totalFlags: g.totalFlags,
      reasons: g.reasons as Record<FeedbackReason, number>,
      dismissedAt: dismissedAt?.toISOString() ?? null,
    });
  }

  // Sort by totalFlags descending
  items.sort((a, b) => b.totalFlags - a.totalFlags);

  return NextResponse.json({ items });
}
