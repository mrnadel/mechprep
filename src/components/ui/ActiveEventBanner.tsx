'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSubscription } from '@/hooks/useSubscription';
import { getActiveXpEvents, formatEventTimeLeft, type ActiveXpEvent } from '@/lib/xp-events';

/**
 * Shows active XP event banners (weekend double XP, power hour, league sprint).
 * Auto-refreshes every 30 seconds to update countdown timers and detect new events.
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

  return (
    <div className="space-y-2 mb-4">
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
    const interval = setInterval(() => {
      setTimeLeft(formatEventTimeLeft(event.endsAt));
    }, 30_000);
    return () => clearInterval(interval);
  }, [event.endsAt]);

  const gradients: Record<string, string> = {
    'weekend-double-xp': 'from-purple-500/20 to-indigo-500/20 border-purple-400/30',
    'power-hour': 'from-amber-500/20 to-orange-500/20 border-amber-400/30',
    'league-sprint': 'from-emerald-500/20 to-teal-500/20 border-emerald-400/30',
  };

  const textColors: Record<string, string> = {
    'weekend-double-xp': 'text-purple-300',
    'power-hour': 'text-amber-300',
    'league-sprint': 'text-emerald-300',
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
          <div className="text-xs text-surface-400">
            {event.multiplier}x XP on all questions
          </div>
        </div>
      </div>
      <div className="text-xs font-semibold text-surface-400 tabular-nums">
        {timeLeft}
      </div>
    </motion.div>
  );
}
