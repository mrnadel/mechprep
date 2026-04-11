import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { questProgress } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { getAuthUserId } from '@/lib/auth-utils';
import { z } from 'zod';

const claimSchema = z.object({
  questId: z.string().min(1).max(100),
  questType: z.enum(['daily', 'weekly']),
  questDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export async function POST(request: NextRequest) {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = claimSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input', details: parsed.error.issues[0]?.message }, { status: 400 });
  }

  const { questId, questType, questDate } = parsed.data;

  // Reject stale claims: daily quests expire after 2 days, weekly after 14
  const maxAgeDays = questType === 'daily' ? 2 : 14;
  const questDateMs = new Date(questDate + 'T00:00:00Z').getTime();
  const ageDays = (Date.now() - questDateMs) / (1000 * 60 * 60 * 24);
  if (ageDays > maxAgeDays) {
    return NextResponse.json({ error: 'Quest expired' }, { status: 410 });
  }

  // Use a transaction to prevent TOCTOU race conditions (double claiming)
  const result = await db.transaction(async (tx) => {
    const rows = await tx
      .select()
      .from(questProgress)
      .where(
        and(
          eq(questProgress.userId, userId),
          eq(questProgress.questType, questType),
          eq(questProgress.questDate, questDate),
        ),
      )
      .limit(1);

    if (rows.length === 0) return { error: 'Quest not found', status: 404 } as const;

    const questRow = rows[0];
    const quests = questRow.quests as Array<{
      definitionId: string;
      completed: boolean;
      claimed: boolean;
      reward: { gems: number; xp: number };
      progress: number;
      target: number;
    }>;

    const quest = quests.find((q) => q.definitionId === questId);
    if (!quest) return { error: 'Quest not found in row', status: 404 } as const;

    if (!quest.completed || quest.progress < quest.target) {
      return { error: 'Quest not completed', status: 400 } as const;
    }
    if (quest.claimed) {
      return { error: 'Already claimed', status: 409 } as const;
    }

    const gemsReward = Math.min(quest.reward.gems, 50);

    const updatedQuests = quests.map((q) =>
      q.definitionId === questId ? { ...q, claimed: true } : q,
    );

    await tx
      .update(questProgress)
      .set({ quests: updatedQuests })
      .where(
        and(
          eq(questProgress.userId, userId),
          eq(questProgress.questType, questType),
          eq(questProgress.questDate, questDate),
        ),
      );

    // NOTE: Do NOT insert gem_transactions here — the client's addGems() creates
    // a local transaction that is synced via POST /api/engagement (newGemTransactions).
    // Inserting here would double-credit the user.

    return { success: true, gems: gemsReward } as const;
  });

  if ('error' in result) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json(result);
}
