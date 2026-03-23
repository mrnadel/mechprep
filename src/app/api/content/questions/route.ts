import { NextResponse } from 'next/server';
import { asc } from 'drizzle-orm';
import { db } from '@/lib/db';
import { practiceQuestions } from '@/lib/db/schema';
import { getAuthUserId } from '@/lib/auth-utils';

export async function GET() {
  // Require authentication to prevent unauthenticated scraping of question content
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const rows = await db
    .select()
    .from(practiceQuestions)
    .orderBy(asc(practiceQuestions.orderIndex));

  const questions = rows.map((row) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { typeData, orderIndex, createdAt, updatedAt, ...base } = row;

    // Merge typeData fields into the top-level object
    return {
      ...base,
      ...(typeData && typeof typeData === 'object' ? typeData : {}),
    };
  });

  return NextResponse.json({ questions });
}
