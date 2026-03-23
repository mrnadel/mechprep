'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Icons: ⚡ = double XP / energy boost (emoji convention)
import { useDoubleXpExpiry } from '@/store/useEngagementStore';

function formatMmSs(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function DoubleXpTimer() {
  const doubleXpExpiry = useDoubleXpExpiry();
  const [msRemaining, setMsRemaining] = useState<number | null>(null);
  const [showEnded, setShowEnded] = useState(false);

  useEffect(() => {
    if (!doubleXpExpiry) {
      setMsRemaining(null);
      return;
    }

    const expiryTime = new Date(doubleXpExpiry).getTime();
    let hideTimer: ReturnType<typeof setTimeout> | null = null;

    function tick() {
      const remaining = expiryTime - Date.now();
      if (remaining <= 0) {
        setMsRemaining(0);
        setShowEnded(true);
        // Hide "ended" flash after 3 seconds
        hideTimer = setTimeout(() => setShowEnded(false), 3000);
        clearInterval(interval);
        return;
      }
      setMsRemaining(remaining);
    }

    tick(); // run immediately
    const interval = setInterval(tick, 1000);
    return () => {
      clearInterval(interval);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, [doubleXpExpiry]);

  // Show "Double XP ended" flash briefly
  if (showEnded && (msRemaining === 0 || msRemaining === null)) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold"
          style={{ background: '#F3F4F6', color: '#6B7280' }}
        >
          <span className="text-base leading-none">⚡</span>
          Double XP ended
        </motion.div>
      </AnimatePresence>
    );
  }

  // Not active or expired
  if (!doubleXpExpiry || msRemaining === null || msRemaining <= 0) return null;

  const isAlmostDone = msRemaining < 2 * 60 * 1000; // < 2 minutes

  return (
    <motion.div
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold"
      style={{ background: '#FEF3C7', color: '#92400E' }}
      animate={
        isAlmostDone
          ? { scale: [1, 1.05, 1], opacity: [1, 0.85, 1] }
          : {}
      }
      transition={
        isAlmostDone
          ? { repeat: Infinity, duration: 1.2, ease: 'easeInOut' }
          : {}
      }
    >
      <span className="text-base leading-none">⚡</span>
      <span>2× XP</span>
      <span
        className="ml-1 px-2 py-0.5 rounded-full text-xs font-extrabold"
        style={{ background: '#F59E0B', color: '#FFFFFF' }}
      >
        {formatMmSs(msRemaining)}
      </span>
    </motion.div>
  );
}
