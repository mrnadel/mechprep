import { NextRequest, NextResponse } from 'next/server';
import { eq, and } from 'drizzle-orm';
import { db } from '@/lib/db';
import { contentFeedback } from '@/lib/db/schema';
import { getAuthUserId } from '@/lib/auth-utils';
import { VALID_CONTENT_TYPES, VALID_REASONS } from '@/data/types';
import type { ContentFeedbackType, FeedbackReason } from '@/data/types';

// GET /api/content-feedback — fetch all flags for the authenticated user
export async function GET() {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const rows = await db
    .select({
      contentType: contentFeedback.contentType,
      contentId: contentFeedback.contentId,
      reason: contentFeedback.reason,
      comment: contentFeedback.comment,
    })
    .from(contentFeedback)
    .where(eq(contentFeedback.userId, userId));

  return NextResponse.json({ flags: rows });
}

// POST /api/content-feedback — upsert a flag
export async function POST(req: NextRequest) {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const { contentType, contentId, reason, comment } = body;

  // Validate
  if (!VALID_CONTENT_TYPES.includes(contentType as ContentFeedbackType)) {
    return NextResponse.json({ error: 'Invalid contentType' }, { status: 400 });
  }
  if (!VALID_REASONS.includes(reason as FeedbackReason)) {
    return NextResponse.json({ error: 'Invalid reason' }, { status: 400 });
  }
  if (!contentId || typeof contentId !== 'string' || contentId.length > 50) {
    return NextResponse.json({ error: 'Invalid contentId' }, { status: 400 });
  }
  const sanitizedComment = typeof comment === 'string' ? comment.trim().slice(0, 500) || null : null;

  // Upsert: delete existing + insert
  await db.transaction(async (tx) => {
    await tx
      .delete(contentFeedback)
      .where(
        and(
          eq(contentFeedback.userId, userId),
          eq(contentFeedback.contentType, contentType),
          eq(contentFeedback.contentId, contentId)
        )
      );
    await tx.insert(contentFeedback).values({
      userId,
      contentType,
      contentId,
      reason,
      comment: sanitizedComment,
    });
  });

  return NextResponse.json({ ok: true });
}

// DELETE /api/content-feedback — remove a flag (idempotent)
export async function DELETE(req: NextRequest) {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const { contentType, contentId } = body;

  if (!contentType || !contentId) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  await db
    .delete(contentFeedback)
    .where(
      and(
        eq(contentFeedback.userId, userId),
        eq(contentFeedback.contentType, contentType),
        eq(contentFeedback.contentId, contentId)
      )
    );

  return NextResponse.json({ ok: true });
}
