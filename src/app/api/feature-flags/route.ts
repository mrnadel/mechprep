import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { featureFlags } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { FLAG_DEFINITIONS } from '@/lib/feature-flags';
import { clientEnv } from '@/lib/env';

function isAdmin(userId: string | undefined) {
  return userId === clientEnv().NEXT_PUBLIC_ADMIN_USER_ID;
}

/** GET: return all flags (public, no auth needed) */
export async function GET() {
  try {
    // Get DB overrides
    const rows = await db.select().from(featureFlags);
    const dbMap = new Map(rows.map((r) => [r.key, r]));

    // Merge with definitions (DB values override defaults)
    const flags: Record<string, boolean> = {};
    for (const def of FLAG_DEFINITIONS) {
      const dbRow = dbMap.get(def.key);
      flags[def.key] = dbRow ? dbRow.enabled : def.enabled;
    }

    return NextResponse.json({ flags });
  } catch {
    // If DB is unavailable, return defaults
    const flags: Record<string, boolean> = {};
    for (const def of FLAG_DEFINITIONS) {
      flags[def.key] = def.enabled;
    }
    return NextResponse.json({ flags });
  }
}

/** PATCH: toggle a flag (admin only) */
export async function PATCH(req: Request) {
  const session = await auth();
  if (!isAdmin(session?.user?.id)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { key, enabled } = await req.json();
  if (typeof key !== 'string' || typeof enabled !== 'boolean') {
    return NextResponse.json({ error: 'Invalid body: need { key: string, enabled: boolean }' }, { status: 400 });
  }

  // Validate key exists in definitions
  if (!FLAG_DEFINITIONS.find((f) => f.key === key)) {
    return NextResponse.json({ error: `Unknown flag: ${key}` }, { status: 400 });
  }

  // Upsert: insert or update
  await db
    .insert(featureFlags)
    .values({ key, enabled, description: FLAG_DEFINITIONS.find((f) => f.key === key)!.description, category: FLAG_DEFINITIONS.find((f) => f.key === key)!.category, updatedAt: new Date() })
    .onConflictDoUpdate({ target: featureFlags.key, set: { enabled, updatedAt: new Date() } });

  return NextResponse.json({ key, enabled });
}
