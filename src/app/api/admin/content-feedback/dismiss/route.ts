import { NextRequest, NextResponse } from 'next/server';
import { eq, and } from 'drizzle-orm';
import { db } from '@/lib/db';
import { contentFeedbackDismissals } from '@/lib/db/schema';
import { requireAdmin } from '@/lib/auth-utils';

export async function POST(req: NextRequest) {
  const adminId = await requireAdmin();
  if (!adminId) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await req.json();
  const { contentType, contentId } = body;

  if (!contentType || typeof contentType !== 'string' || contentType.length > 50) {
    return NextResponse.json({ error: 'Invalid contentType' }, { status: 400 });
  }
  if (!contentId || typeof contentId !== 'string' || contentId.length > 100) {
    return NextResponse.json({ error: 'Invalid contentId' }, { status: 400 });
  }

  // Upsert: delete + insert
  await db.transaction(async (tx) => {
    await tx
      .delete(contentFeedbackDismissals)
      .where(
        and(
          eq(contentFeedbackDismissals.contentType, contentType),
          eq(contentFeedbackDismissals.contentId, contentId)
        )
      );
    await tx.insert(contentFeedbackDismissals).values({
      contentType,
      contentId,
    });
  });

  return NextResponse.json({ ok: true });
}
