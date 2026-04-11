'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSubscription } from '@/hooks/useSubscription';
import { getActiveXpEvents, formatEventTimeLeft, type ActiveXpEvent } from '@/lib/xp-events';

/**
 * Shows active XP event banners (weekend double XP, power hour, league sprint).
 * Auto-refreshes every 30 seconds to detect new events.
 * Per-event countdown updates every second when < 10 min remaining.
 */
export function ActiveEventBanner() {
  const { isProUser } = useSubscription();
  const [events, setEvents] = useState<ActiveXpEvent[]>([]);

  useEffect(() => {
    const refresh = () => setEvents(getActiveXpEvents(isProUser));
    refresh();
    const interval = setInterval(refresh, 30_000);
    return () => clearInterval(interval);
  }, [isProUser]);

  if (events.length === 0) return null;

  const totalMultiplier = events.reduce((sum, e) => sum + (e.multiplier - 1), 1);

  return (
    <div className="space-y-2 mb-4" role="region" aria-label="Active XP events">
      {events.length > 1 && (
        <div className="text-center text-xs font-bold text-surface-500 dark:text-surface-400">
          Combined: {totalMultiplier.toFixed(1)}x XP
        </div>
      )}
      <AnimatePresence>
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function EventCard({ event }: { event: ActiveXpEvent }) {
  const [timeLeft, setTimeLeft] = useState(formatEventTimeLeft(event.endsAt));

  useEffect(() => {
    const updateTime = () => setTimeLeft(formatEventTimeLeft(event.endsAt));
    // Use 1-second updates when <10 min remaining, else 30s
    const msRemaining = new Date(event.endsAt).getTime() - Date.now();
    const intervalMs = msRemaining < 10 * 60 * 1000 ? 1000 : 30_000;
    const interval = setInterval(updateTime, intervalMs);
    return () => clearInterval(interval);
  }, [event.endsAt]);

  const gradients: Record<string, string> = {
    'weekend-double-xp': 'from-purple-100 to-indigo-100 border-purple-300 dark:from-purple-500/20 dark:to-indigo-500/20 dark:border-purple-400/30',
    'power-hour': 'from-amber-100 to-orange-100 border-amber-300 dark:from-amber-500/20 dark:to-orange-500/20 dark:border-amber-400/30',
    'league-sprint': 'from-emerald-100 to-teal-100 border-emerald-300 dark:from-emerald-500/20 dark:to-teal-500/20 dark:border-emerald-400/30',
  };

  const textColors: Record<string, string> = {
    'weekend-double-xp': 'text-purple-700 dark:text-purple-300',
    'power-hour': 'text-amber-700 dark:text-amber-300',
    'league-sprint': 'text-emerald-700 dark:text-emerald-300',
  };

  const gradient = gradients[event.id] ?? gradients['power-hour'];
  const textColor = textColors[event.id] ?? textColors['power-hour'];

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`rounded-xl bg-gradient-to-r ${gradient} border px-4 py-3 flex items-center justify-between`}
    >
      <div className="flex items-center gap-3">
        <motion.span
          className="text-xl"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          {event.icon}
        </motion.span>
        <div>
          <div className={`text-sm font-bold ${textColor}`}>
            {event.name}
          </div>
          <div className="text-xs text-surface-500 dark:text-surface-400">
            <span aria-live="polite" aria-atomic="true">{timeLeft}</span>
          </div>
        </div>
      </div>
      <div
        className="flex items-center gap-1.5 rounded-full bg-white/80 dark:bg-white/10 px-2.5 py-1"
        aria-label={`${event.multiplier}x XP multiplier`}
      >
        <span className="text-xs font-black tabular-nums">{event.multiplier}x</span>
        <span className="text-[10px] font-semibold text-surface-500">XP</span>
      </div>
    </motion.div>
  );
}
