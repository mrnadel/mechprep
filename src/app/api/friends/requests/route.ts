import { NextResponse } from 'next/server';
import { getAuthUserId } from '@/lib/auth-utils';
import { db } from '@/lib/db';
import { friendRequests, users, userProgress } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

export async function GET() {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const incoming = await db
    .select({
      id: friendRequests.id,
      senderId: friendRequests.senderId,
      createdAt: friendRequests.createdAt,
      senderName: users.displayName,
      senderImage: users.image,
      senderLevel: userProgress.currentLevel,
    })
    .from(friendRequests)
    .leftJoin(users, eq(friendRequests.senderId, users.id))
    .leftJoin(userProgress, eq(friendRequests.senderId, userProgress.userId))
    .where(and(eq(friendRequests.receiverId, userId), eq(friendRequests.status, 'pending')));

  const outgoing = await db
    .select({
      id: friendRequests.id,
      receiverId: friendRequests.receiverId,
      createdAt: friendRequests.createdAt,
      receiverName: users.displayName,
      receiverImage: users.image,
      receiverLevel: userProgress.currentLevel,
    })
    .from(friendRequests)
    .leftJoin(users, eq(friendRequests.receiverId, users.id))
    .leftJoin(userProgress, eq(friendRequests.receiverId, userProgress.userId))
    .where(and(eq(friendRequests.senderId, userId), eq(friendRequests.status, 'pending')));

  return NextResponse.json({ incoming, outgoing });
}
