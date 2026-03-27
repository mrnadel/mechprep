'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface FloatingParticlesProps {
  /** CSS color string, e.g. "rgba(239,68,68,0.4)" */
  color: string;
  count?: number;
  /** drift = gentle wander, rise = float upward */
  drift?: boolean;
}

export function FloatingParticles({ color, count = 5, drift }: FloatingParticlesProps) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: ((i * 37 + 13) % 90) + 5,
        y: drift ? ((i * 29 + 11) % 70) + 10 : (i * 23 + 7) % 15,
        size: 3 + (i % 3) * 1.5,
        delay: (i * 1.7) % 5,
        dur: 6 + (i % 4) * 1.5,
        dx: ((i * 23 + 5) % 50) - 25,
      })),
    [count, drift],
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) =>
        drift ? (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{ width: p.size, height: p.size, background: color, left: `${p.x}%`, top: `${p.y}%` }}
            animate={{ x: [0, p.dx, p.dx * 1.5], y: [0, -40, -90], opacity: [0, 0.35, 0], scale: [0.4, 0.7, 0.3] }}
            transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ) : (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{ width: p.size, height: p.size, background: color, left: `${p.x}%`, bottom: `${p.y}%` }}
            animate={{ y: [0, -250, -550], opacity: [0, 0.4, 0], scale: [0.5, 0.8, 0.5] }}
            transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ),
      )}
    </div>
  );
}
