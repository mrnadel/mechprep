import { eq, or, and, sql } from 'drizzle-orm';
import { db } from '@/lib/db';
import { friendships, friendRequests, users, userProgress } from '@/lib/db/schema';

const MAX_FRIENDS = 50;

/** Sort two IDs so userId < friendId (for friendship invariant) */
export function sortFriendPair(a: string, b: string): [string, string] {
  return a < b ? [a, b] : [b, a];
}

/** Check if two users are already friends */
export async function areFriends(userA: string, userB: string): Promise<boolean> {
  const [low, high] = sortFriendPair(userA, userB);
  const rows = await db
    .select({ id: friendships.id })
    .from(friendships)
    .where(and(eq(friendships.userId, low), eq(friendships.friendId, high)))
    .limit(1);
  return rows.length > 0;
}

/** Check if a pending or declined request exists between two users (either direction) */
export async function getExistingRequest(userA: string, userB: string) {
  const rows = await db
    .select()
    .from(friendRequests)
    .where(
      or(
        and(eq(friendRequests.senderId, userA), eq(friendRequests.receiverId, userB)),
        and(eq(friendRequests.senderId, userB), eq(friendRequests.receiverId, userA))
      )
    )
    .limit(1);
  return rows[0] ?? null;
}

/** Count current friends for a user */
export async function countFriends(userId: string): Promise<number> {
  const rows = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(friendships)
    .where(or(eq(friendships.userId, userId), eq(friendships.friendId, userId)));
  return rows[0]?.count ?? 0;
}

/** Check if user has reached the friend cap */
export async function isFriendCapReached(userId: string): Promise<boolean> {
  const count = await countFriends(userId);
  return count >= MAX_FRIENDS;
}

/** Get the relationship between viewer and target user, plus request ID if applicable */
export async function getRelationship(
  viewerId: string,
  targetId: string
): Promise<{ relationship: 'self' | 'friends' | 'request_sent' | 'request_received' | 'none'; requestId?: string }> {
  if (viewerId === targetId) return { relationship: 'self' };
  if (await areFriends(viewerId, targetId)) return { relationship: 'friends' };

  const request = await getExistingRequest(viewerId, targetId);
  if (request && request.status === 'pending') {
    const rel = request.senderId === viewerId ? 'request_sent' : 'request_received';
    return { relationship: rel, requestId: request.id };
  }
  return { relationship: 'none' };
}

/** Get public profile data for a user (safe fields only) */
export async function getPublicProfile(userId: string) {
  const [user] = await db
    .select({
      id: users.id,
      displayName: users.displayName,
      image: users.image,
      joinedDate: users.joinedDate,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  return user ?? null;
}

/** Get progress data for public profile */
export async function getPublicProgress(userId: string) {
  const [progress] = await db
    .select({
      currentLevel: userProgress.currentLevel,
      totalXp: userProgress.totalXp,
      currentStreak: userProgress.currentStreak,
      longestStreak: userProgress.longestStreak,
      achievementsUnlocked: userProgress.achievementsUnlocked,
    })
    .from(userProgress)
    .where(eq(userProgress.userId, userId))
    .limit(1);

  return progress ?? null;
}
