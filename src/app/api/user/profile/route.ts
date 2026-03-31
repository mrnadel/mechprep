import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { users, accounts } from '@/lib/db/schema';
import { getAuthUserId } from '@/lib/auth-utils';

// ─── Limits ──────────────────────────────────────────────────
const MAX_IMAGE_BYTES = 100 * 1024; // 100 KB max stored size (base64 data URL)
const ALLOWED_MIME_PREFIXES = ['data:image/jpeg', 'data:image/png', 'data:image/webp'];

export async function GET() {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const [user] = await db
    .select({ passwordHash: users.passwordHash, country: users.country })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  // Check if user has a credentials (email/password) account vs OAuth-only
  const oauthAccounts = await db
    .select({ provider: accounts.provider })
    .from(accounts)
    .where(eq(accounts.userId, userId));

  const isOAuthOnly = oauthAccounts.length > 0 && !user?.passwordHash;

  return NextResponse.json({
    hasPassword: !isOAuthOnly && !!user?.passwordHash,
    country: user?.country ?? null,
  });
}

export async function PATCH(request: NextRequest) {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // ── Handle display name update ──
  if (body.displayName !== undefined) {
    const displayName = body.displayName as string | null;
    if (!displayName || displayName.length < 2 || displayName.length > 50) {
      return NextResponse.json(
        { error: 'Display name must be 2-50 characters' },
        { status: 400 }
      );
    }
    await db
      .update(users)
      .set({ displayName, name: displayName, updatedAt: new Date() })
      .where(eq(users.id, userId));

    return NextResponse.json({ ok: true });
  }

  // ── Handle country update ──
  if (body.country !== undefined) {
    const country = body.country as string | null;
    if (country !== null && (typeof country !== 'string' || !/^[A-Z]{2,3}$/.test(country))) {
      return NextResponse.json(
        { error: 'Country must be a valid code (e.g. US, IL, GB, INT)' },
        { status: 400 }
      );
    }
    await db
      .update(users)
      .set({ country, updatedAt: new Date() })
      .where(eq(users.id, userId));

    return NextResponse.json({ ok: true });
  }

  // ── Handle profile image update ──
  if (body.image !== undefined) {
    const { image } = body;

    // Allow clearing the image
    if (image === null) {
      await db
        .update(users)
        .set({ image: null, updatedAt: new Date() })
        .where(eq(users.id, userId));
      return NextResponse.json({ ok: true, image: null });
    }

    // Validate it's a data URL with allowed MIME type
    if (typeof image !== 'string') {
      return NextResponse.json({ error: 'Invalid image data' }, { status: 400 });
    }

    const hasValidPrefix = ALLOWED_MIME_PREFIXES.some((p) => image.startsWith(p));
    if (!hasValidPrefix) {
      return NextResponse.json(
        { error: 'Only JPEG, PNG, or WebP images are allowed' },
        { status: 400 }
      );
    }

    // Check size (the full data URL string length in bytes)
    const byteSize = Buffer.byteLength(image, 'utf-8');
    if (byteSize > MAX_IMAGE_BYTES) {
      return NextResponse.json(
        { error: `Image too large (${Math.round(byteSize / 1024)}KB). Max is ${MAX_IMAGE_BYTES / 1024}KB after compression.` },
        { status: 400 }
      );
    }

    await db
      .update(users)
      .set({ image, updatedAt: new Date() })
      .where(eq(users.id, userId));

    return NextResponse.json({ ok: true, image });
  }

  return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
}
