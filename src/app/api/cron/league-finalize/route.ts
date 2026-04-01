import { NextResponse } from 'next/server';
import { finalizeLeagueWeek } from '@/lib/league-matching';

/**
 * GET /api/cron/league-finalize
 * Runs every Monday at 00:05 UTC. Finalizes the PREVIOUS week's league groups:
 * calculates final ranks, promotes/demotes real users, marks groups as finalized.
 *
 * Secured by CRON_SECRET.
 */
export async function GET(req: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
  }
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Calculate LAST week's Monday (the week that just ended)
  const now = new Date();
  const dayOfWeek = now.getUTCDay(); // 0=Sun, 1=Mon, ..., 6=Sat
  // Most recent past Monday: if today is Monday, go back 7 days
  const daysBack = dayOfWeek === 1 ? 7 : ((dayOfWeek + 6) % 7);
  const lastMonday = new Date(now);
  lastMonday.setUTCDate(now.getUTCDate() - daysBack);
  const weekStart = `${lastMonday.getUTCFullYear()}-${String(lastMonday.getUTCMonth() + 1).padStart(2, '0')}-${String(lastMonday.getUTCDate()).padStart(2, '0')}`;

  try {
    const processed = await finalizeLeagueWeek(weekStart);
    return NextResponse.json({
      ok: true,
      weekStart,
      groupsFinalized: processed,
    });
  } catch (err) {
    console.error('League finalization error:', err);
    return NextResponse.json({ error: 'Finalization failed' }, { status: 500 });
  }
}
