import { NextRequest, NextResponse } from 'next/server';
import { asc } from 'drizzle-orm';
import { db } from '@/lib/db';
import { practiceQuestions } from '@/lib/db/schema';
import { rateLimit } from '@/lib/rate-limit';

export async function GET(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const rl = rateLimit(`content-questions:${ip}`, { limit: 30, windowMs: 60_000 });
  if (!rl.success) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429 }
    );
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
