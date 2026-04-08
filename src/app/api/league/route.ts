import { NextRequest, NextResponse } from 'next/server';
import { getAuthUserId } from '@/lib/auth-utils';
import { assignUserToLeague, getLeagueLeaderboard, updateMemberXp } from '@/lib/league-matching';

function isMonday(dateStr: string): boolean {
  const d = new Date(dateStr + 'T00:00:00Z');
  return !isNaN(d.getTime()) && d.getUTCDay() === 1;
}

/**
 * GET /api/league?weekStart=2026-03-30
 * Returns the user's league leaderboard for the given week.
 */
export async function GET(request: NextRequest) {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const weekStart = request.nextUrl.searchParams.get('weekStart');
  if (!weekStart || !/^\d{4}-\d{2}-\d{2}$/.test(weekStart) || !isMonday(weekStart)) {
    return NextResponse.json({ error: 'Invalid weekStart (must be a Monday date YYYY-MM-DD)' }, { status: 400 });
  }

  const leaderboard = await getLeagueLeaderboard(userId, weekStart);
  if (!leaderboard) {
    return NextResponse.json({ members: null });
  }

  return NextResponse.json(leaderboard);
}

/**
 * POST /api/league
 * Body: { tier: number, weekStart: string }
 * Assigns user to a league group. Returns groupId + full leaderboard.
 */
export async function POST(request: NextRequest) {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: { tier?: number; weekStart?: string; weeklyXp?: number };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { tier, weekStart } = body;

  if (!tier || tier < 1 || tier > 5 || !Number.isInteger(tier)) {
    return NextResponse.json({ error: 'Invalid tier (must be 1-5)' }, { status: 400 });
  }
  if (!weekStart || !/^\d{4}-\d{2}-\d{2}$/.test(weekStart) || !isMonday(weekStart)) {
    return NextResponse.json({ error: 'Invalid weekStart (must be a Monday)' }, { status: 400 });
  }
  const initialXp = typeof body.weeklyXp === 'number' && body.weeklyXp >= 0
    ? Math.min(Math.floor(body.weeklyXp), 5000)
    : 0;

  const groupId = await assignUserToLeague(userId, tier as 1 | 2 | 3 | 4 | 5, weekStart, initialXp);
  const leaderboard = await getLeagueLeaderboard(userId, weekStart);

  return NextResponse.json({ groupId, ...leaderboard });
}

/**
 * PATCH /api/league
 * Body: { weekStart: string, xpDelta: number }
 * Increments user's weekly XP in their league membership.
 */
export async function PATCH(request: NextRequest) {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: { weekStart?: string; xpDelta?: number };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { weekStart, xpDelta } = body;

  if (!weekStart || !/^\d{4}-\d{2}-\d{2}$/.test(weekStart) || !isMonday(weekStart)) {
    return NextResponse.json({ error: 'Invalid weekStart (must be a Monday)' }, { status: 400 });
  }
  // Cap per-request XP — covers base XP * accuracy bonus * double-XP * event multiplier
  const MAX_XP_PER_REQUEST = 500;
  if (typeof xpDelta !== 'number' || xpDelta <= 0 || xpDelta > MAX_XP_PER_REQUEST) {
    return NextResponse.json({ error: `Invalid xpDelta (must be 1-${MAX_XP_PER_REQUEST})` }, { status: 400 });
  }

  await updateMemberXp(userId, weekStart, Math.floor(xpDelta));

  return NextResponse.json({ ok: true });
}
