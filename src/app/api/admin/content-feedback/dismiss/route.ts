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

  const { contentType, contentId } = await req.json();

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
