'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  className?: string;
  style?: React.CSSProperties;
  format?: (n: number) => string;
  /** Show a floating +/- delta badge on change */
  showDelta?: boolean;
  /** Color for the delta badge (defaults to green for + and red for -) */
  deltaColor?: string;
}

/**
 * Smoothly animates between number values with ease-out interpolation,
 * a scale bounce on change, and an optional floating delta indicator.
 */
export function AnimatedCounter({
  value,
  className,
  style,
  format,
  showDelta = false,
  deltaColor,
}: AnimatedCounterProps) {
  const [display, setDisplay] = useState(value);
  const [bouncing, setBouncing] = useState(false);
  const [delta, setDelta] = useState<number | null>(null);
  const prevRef = useRef(value);
  const rafRef = useRef<number>(0);
  const deltaTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const mountedRef = useRef(false);

  useEffect(() => {
    // Skip animation on initial mount
    if (!mountedRef.current) {
      mountedRef.current = true;
      setDisplay(value);
      prevRef.current = value;
      return;
    }

    const prev = prevRef.current;
    if (prev === value) return;

    const diff = value - prev;
    prevRef.current = value;

    // Trigger bounce
    setBouncing(true);
    const bounceTimer = setTimeout(() => setBouncing(false), 400);

    // Show delta badge
    if (showDelta && diff !== 0) {
      setDelta(diff);
      deltaTimerRef.current = setTimeout(() => setDelta(null), 1800);
    }

    // Animate the number
    const startTime = performance.now();
    const duration = Math.min(600, Math.max(250, Math.abs(diff) * 15));

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(prev + diff * eased));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(bounceTimer);
      if (deltaTimerRef.current) clearTimeout(deltaTimerRef.current);
    };
  }, [value, showDelta]);

  const formatted = format ? format(display) : display.toLocaleString();

  return (
    <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
      <motion.span
        className={className}
        style={style}
        animate={bouncing ? { scale: [1, 1.18, 1] } : { scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {formatted}
      </motion.span>

      <AnimatePresence>
        {showDelta && delta !== null && (
          <motion.span
            key={`delta-${delta}-${Date.now()}`}
            initial={{ opacity: 0, y: 4, scale: 0.7 }}
            animate={{ opacity: 1, y: -14, scale: 1 }}
            exit={{ opacity: 0, y: -22 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: -2,
              right: -6,
              fontSize: '0.65em',
              fontWeight: 900,
              color: deltaColor ?? (delta > 0 ? '#10B981' : '#EF4444'),
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
              textShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            {delta > 0 ? `+${delta}` : delta}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
