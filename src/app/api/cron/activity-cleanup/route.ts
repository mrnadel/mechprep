import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { activityFeed } from '@/lib/db/schema';
import { lt } from 'drizzle-orm';

/**
 * GET /api/cron/activity-cleanup
 * Deletes activity feed entries older than 14 days.
 * Protected by CRON_SECRET header check.
 * Activity reactions are cascade-deleted via FK constraint.
 */
export async function GET(req: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
  }
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const cutoff = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);

  // Reactions cascade-delete with activities (ON DELETE CASCADE on activityReactions FK)
  await db
    .delete(activityFeed)
    .where(lt(activityFeed.createdAt, cutoff));

  return NextResponse.json({
    ok: true,
    deletedBefore: cutoff.toISOString(),
  });
}
