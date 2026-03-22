import { NextResponse } from 'next/server';
import { getAuthUserId } from '@/lib/auth-utils';
import { db } from '@/lib/db';
import { friendships, friendRequests } from '@/lib/db/schema';
import { eq, and, or } from 'drizzle-orm';
import { sortFriendPair } from '@/lib/db/friends';

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id: friendId } = await params;
  const [low, high] = sortFriendPair(userId, friendId);

  const result = await db
    .delete(friendships)
    .where(and(eq(friendships.userId, low), eq(friendships.friendId, high)))
    .returning();

  if (result.length === 0) {
    return NextResponse.json({ error: 'Friendship not found' }, { status: 404 });
  }

  await db
    .delete(friendRequests)
    .where(
      or(
        and(eq(friendRequests.senderId, userId), eq(friendRequests.receiverId, friendId)),
        and(eq(friendRequests.senderId, friendId), eq(friendRequests.receiverId, userId))
      )
    );

  return NextResponse.json({ status: 'removed' });
}
