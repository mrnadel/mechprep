import { db } from '@/lib/db';
import { activityFeed } from '@/lib/db/schema';
import { eq, and, sql } from 'drizzle-orm';

export type ActivityType =
  | 'streak_milestone'
  | 'lesson_complete'
  | 'course_complete'
  | 'level_up'
  | 'quest_complete'
  | 'friend_quest_complete';

// Types that should be rate-limited to 1 per hour to prevent feed spam
const RATE_LIMITED_TYPES: Set<ActivityType> = new Set(['lesson_complete']);

/**
 * Insert an activity feed item for a user.
 * Fire-and-forget -- errors are caught and logged, never thrown.
 * Rate-limited types (e.g. lesson_complete) are de-duplicated to max 1 per hour.
 */
export async function insertActivity(
  userId: string,
  type: ActivityType,
  data?: Record<string, unknown>,
): Promise<void> {
  try {
    // Rate-limit check: skip if same type was inserted within the last hour
    if (RATE_LIMITED_TYPES.has(type)) {
      const recent = await db
        .select({ id: activityFeed.id })
        .from(activityFeed)
        .where(
          and(
            eq(activityFeed.userId, userId),
            eq(activityFeed.type, type),
            sql`${activityFeed.createdAt} > now() - interval '1 hour'`,
          ),
        )
        .limit(1);
      if (recent.length > 0) return;
    }

    await db.insert(activityFeed).values({
      userId,
      type,
      data: data ?? null,
    });
  } catch (err) {
    console.error('[activity-feed] Failed to insert:', err);
  }
}
