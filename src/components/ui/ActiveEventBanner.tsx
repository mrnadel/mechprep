'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { getActiveXpEvents, formatEventTimeLeft, type ActiveXpEvent } from '@/lib/xp-events';
import { HERO_COMPACT_HEIGHT } from '@/components/course/UnitHeroHeader';
import { useIsDark } from '@/store/useThemeStore';

/** Compact floating XP-event pill below the UnitHeroHeader. */
export function ActiveEventBanner({
  positionStyle,
}: {
  positionStyle: { top: number; left: number; width: number };
}) {
  const { isProUser } = useSubscription();
  const isDark = useIsDark();
  const [events, setEvents] = useState<ActiveXpEvent[]>([]);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const refresh = () => setEvents(getActiveXpEvents(isProUser));
    refresh();
    const interval = setInterval(refresh, 30_000);
    return () => clearInterval(interval);
  }, [isProUser]);

  if (dismissed || events.length === 0 || !positionStyle) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: positionStyle.top + HERO_COMPACT_HEIGHT + 2,
        left: positionStyle.left,
        width: positionStyle.width,
        zIndex: 29,
        pointerEvents: 'none',
        transition: 'top 0.15s ease',
      }}
    >
      <div className="mx-auto px-3 sm:px-4" style={{ maxWidth: 520, pointerEvents: 'auto' }}>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="flex items-center justify-center gap-2 rounded-full py-1 px-2.5"
            style={{
              background: isDark ? 'rgba(30,41,59,0.92)' : 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.06)',
              boxShadow: isDark ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.08)',
            }}
            role="region"
            aria-label="Active XP events"
          >
            {events.map((ev) => (
              <EventChip key={ev.id} event={ev} />
            ))}

            {/* Close */}
            <button
              onClick={() => setDismissed(true)}
              className="flex items-center justify-center rounded-full opacity-30 hover:opacity-60 transition-opacity"
              style={{ width: 18, height: 18, flexShrink: 0 }}
              aria-label="Dismiss event banner"
            >
              <X size={12} />
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function EventChip({ event }: { event: ActiveXpEvent }) {
  const [timeLeft, setTimeLeft] = useState(formatEventTimeLeft(event.endsAt));
  const isDark = useIsDark();

  useEffect(() => {
    const updateTime = () => setTimeLeft(formatEventTimeLeft(event.endsAt));
    const msRemaining = new Date(event.endsAt).getTime() - Date.now();
    const intervalMs = msRemaining < 10 * 60 * 1000 ? 1000 : 30_000;
    const interval = setInterval(updateTime, intervalMs);
    return () => clearInterval(interval);
  }, [event.endsAt]);

  const badgeColor: Record<string, string> = {
    'power-hour': isDark ? '#FCD34D' : '#92400E',
    'weekend-double-xp': isDark ? '#C084FC' : '#6D28D9',
    'league-sprint': isDark ? '#6EE7B7' : '#065F46',
  };

  const badgeBg: Record<string, string> = {
    'power-hour': isDark ? 'rgba(251,191,36,0.2)' : 'rgba(251,191,36,0.15)',
    'weekend-double-xp': isDark ? 'rgba(168,85,247,0.2)' : 'rgba(139,92,246,0.12)',
    'league-sprint': isDark ? 'rgba(52,211,153,0.2)' : 'rgba(16,185,129,0.12)',
  };

  return (
    <div
      className="flex items-center gap-1 cursor-default"
      title={`${event.name} — ${event.multiplier}x XP for ${timeLeft}`}
    >
      <span className="text-xs leading-none">{event.icon}</span>
      <span
        className="text-[11px] font-bold tabular-nums"
        style={{ color: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.45)' }}
      >
        {timeLeft}
      </span>
      <span
        className="text-[10px] font-black tabular-nums rounded-full px-1.5 py-px"
        style={{
          background: badgeBg[event.id] ?? badgeBg['power-hour'],
          color: badgeColor[event.id] ?? badgeColor['power-hour'],
        }}
      >
        {event.multiplier}x
      </span>
    </div>
  );
}
