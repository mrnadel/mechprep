'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface SpaceParticlesProps {
  count?: number;
  color?: string;
}

/**
 * Fast vertical streaks falling top-to-bottom like flying through a wormhole.
 * Long thin lines at various speeds/positions for depth.
 */
export function SpaceParticles({ count = 25, color = 'rgba(255,255,255,0.5)' }: SpaceParticlesProps) {
  const streaks = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const x = ((i * 37 + 13) % 96) + 2; // 2-98% horizontal spread
        const speed = 0.8 + (i % 6) * 0.3; // 0.8-2.3s
        const length = 30 + (i % 5) * 20; // 30-110px tall
        const width = 1 + (i % 3); // 1-3px wide
        const opacity = 0.3 + (i % 4) * 0.15; // 0.3-0.75
        return { id: i, x, speed, length, width, opacity, delay: (i * 0.12) % 3 };
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
            top: -s.length,
            width: s.width,
            height: s.length,
            borderRadius: s.width,
            background: color,
          }}
          animate={{
            top: ['calc(-10%)', 'calc(110%)'],
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
