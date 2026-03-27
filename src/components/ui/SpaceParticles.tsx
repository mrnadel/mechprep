'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface SpaceParticlesProps {
  count?: number;
  color?: string;
}

/**
 * Vertical falling streaks like flying through a wormhole.
 * Evenly distributed across the full screen width.
 */
export function SpaceParticles({ count = 30, color = 'rgba(255,255,255,0.5)' }: SpaceParticlesProps) {
  const streaks = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        // Evenly spread across width with small jitter
        const baseX = (i / count) * 100;
        const jitter = ((i * 7 + 3) % 6) - 3; // -3 to +3
        return {
          id: i,
          x: Math.max(1, Math.min(99, baseX + jitter)),
          speed: 0.6 + ((i * 13 + 7) % 10) * 0.15, // 0.6 - 2.1s
          length: 20 + ((i * 17 + 5) % 8) * 12, // 20 - 104px
          width: 1 + (i % 3), // 1-3px
          opacity: 0.2 + ((i * 11 + 3) % 5) * 0.12, // 0.2 - 0.68
          delay: ((i * 19 + 11) % 30) * 0.1, // 0 - 3s staggered
        };
      }),
    [count],
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {streaks.map((s) => (
        <motion.div
          key={s.id}
          style={{
            position: 'absolute',
            left: `${s.x}%`,
            width: s.width,
            height: s.length,
            borderRadius: s.width,
            background: color,
          }}
          initial={{ top: '-5%', opacity: 0 }}
          animate={{
            top: ['calc(-5%)', 'calc(105%)'],
            opacity: [0, s.opacity, s.opacity, 0],
          }}
          transition={{
            duration: s.speed,
            delay: s.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}
