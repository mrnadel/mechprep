import { NextRequest, NextResponse } from 'next/server';
import { getAuthUserId } from '@/lib/auth-utils';
import { canAccessPracticeMode, canStartPracticeSession } from '@/lib/access-control';

/**
 * POST /api/session/validate
 * Validates that the current user can start a session of the given type.
 * Called by the client-side store before creating a session.
 */
export async function POST(request: NextRequest) {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ allowed: false, reason: 'unauthenticated' }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ allowed: false, reason: 'invalid_json' }, { status: 400 });
  }
  const sessionType = body.sessionType as string;
  if (!sessionType) {
    return NextResponse.json({ allowed: false, reason: 'missing_session_type' }, { status: 400 });
  }

  // Check practice mode access (Pro-only modes)
  const modeCheck = await canAccessPracticeMode(userId, sessionType);
  if (!modeCheck.allowed) {
    return NextResponse.json({
      allowed: false,
      reason: 'pro_required',
      tier: modeCheck.tier,
    });
  }

  // Check daily question limit
  const limitCheck = await canStartPracticeSession(userId);
  if (!limitCheck.allowed) {
    return NextResponse.json({
      allowed: false,
      reason: 'daily_limit_reached',
      tier: limitCheck.tier,
      remaining: limitCheck.remaining,
      limit: limitCheck.limit,
    });
  }

  return NextResponse.json({
    allowed: true,
    tier: modeCheck.tier,
    remaining: limitCheck.remaining,
    limit: limitCheck.limit,
  });
}
