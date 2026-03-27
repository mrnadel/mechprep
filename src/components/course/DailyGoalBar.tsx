'use client';

import { useEffect, useRef, useState } from 'react';
import { useCourseStore } from '@/store/useCourseStore';
import { getProfession } from '@/data/professions';
import { toLocalDateString } from '@/lib/utils';
import { ProgressBar } from '@/components/ui/ProgressBar';

// ─── XP target mapping ────────────────────────────────────
const DAILY_XP_MAP: Record<number, number> = {
  5: 40,
  10: 80,
  15: 120,
  20: 200,
};

/** Returns the daily XP target for a given dailyMinutes commitment. */
export function getDailyXpTarget(dailyMinutes: number): number {
  return DAILY_XP_MAP[dailyMinutes] ?? 80;
}

// ─── localStorage helper ──────────────────────────────────
const STORAGE_KEY = 'mechready-daily-xp-start';

interface DailyXpSnapshot {
  date: string;
  xp: number;
}

function readSnapshot(): DailyXpSnapshot | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as DailyXpSnapshot;
  } catch {
    return null;
  }
}

function writeSnapshot(snapshot: DailyXpSnapshot) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    // storage full or blocked, silently ignore
  }
}

// ─── Component ────────────────────────────────────────────
export function DailyGoalBar() {
  const activeProfession = useCourseStore((s) => s.activeProfession);
  const courseIntros = useCourseStore((s) => s.progress.courseIntros);
  const totalXp = useCourseStore((s) => s.progress.totalXp);

  const [dailyXp, setDailyXp] = useState(0);
  const initializedRef = useRef(false);

  const introData = courseIntros?.[activeProfession];
  const profession = getProfession(activeProfession);

  // Snapshot today's starting XP on mount, then track delta
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const today = toLocalDateString(new Date());
    const existing = readSnapshot();

    if (existing && existing.date === today) {
      // Same day: compute delta from stored start value
      if (!initializedRef.current) {
        initializedRef.current = true;
      }
      setDailyXp(Math.max(0, totalXp - existing.xp));
    } else {
      // New day (or no snapshot): record current XP as today's baseline
      writeSnapshot({ date: today, xp: totalXp });
      initializedRef.current = true;
      setDailyXp(0);
    }
  }, [totalXp]);

  // Don't render if the user hasn't completed the course intro
  if (!introData) return null;

  const target = getDailyXpTarget(introData.dailyMinutes);
  const percent = Math.min(100, (dailyXp / target) * 100);
  const goalReached = dailyXp >= target;
  const accentColor = profession?.color ?? '#6366F1';

  return (
    <div className="px-3 sm:px-4" style={{ paddingTop: 12 }}>
      <div
        style={{
          background: '#FFFFFF',
          border: '1.5px solid #E2E8F0',
          borderRadius: 16,
          padding: '14px 16px',
        }}
      >
        {/* Label row */}
        <div
          className="flex items-center justify-between"
          style={{ marginBottom: 8 }}
        >
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: goalReached ? '#10B981' : '#475569',
            }}
          >
            {goalReached ? (
              <>
                <span style={{ marginRight: 4 }}>&#10003;</span>
                Goal reached!
              </>
            ) : (
              'Daily Goal'
            )}
          </span>
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: goalReached ? '#10B981' : '#64748B',
            }}
          >
            {dailyXp} / {target} XP
          </span>
        </div>

        {/* Progress bar */}
        <ProgressBar
          percent={percent}
          height="h-2.5"
          color={goalReached ? '#10B981' : accentColor}
          animate
        />
      </div>
    </div>
  );
}
