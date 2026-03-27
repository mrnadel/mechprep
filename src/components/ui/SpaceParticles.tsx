'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface SpaceParticlesProps {
  count?: number;
  color?: string;
}

/**
 * Fast streaking particles flying outward from center — like a space warp effect.
 * Used on pro/upgrade screens for dramatic flair.
 */
export function SpaceParticles({ count = 20, color = 'rgba(255,255,255,0.6)' }: SpaceParticlesProps) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2 + ((i * 1.7) % 1);
        const speed = 1.5 + (i % 5) * 0.5;
        return {
          id: i,
          // Start near center
          startX: 50 + Math.cos(angle) * 5,
          startY: 50 + Math.sin(angle) * 5,
          // End at edges
          endX: 50 + Math.cos(angle) * 60,
          endY: 50 + Math.sin(angle) * 60,
          delay: (i * 0.15) % 3,
          dur: speed,
          width: 2 + (i % 3),
          length: 8 + (i % 4) * 4,
          rotation: (angle * 180) / Math.PI,
        };
      }),
    [count],
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.startX}%`,
            top: `${p.startY}%`,
            width: p.length,
            height: p.width,
            borderRadius: p.width,
            background: color,
            rotate: p.rotation,
            transformOrigin: 'center center',
          }}
          animate={{
            left: [`${p.startX}%`, `${p.endX}%`],
            top: [`${p.startY}%`, `${p.endY}%`],
            opacity: [0, 0.8, 0],
            scaleX: [0.3, 1.5, 0.5],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeIn',
          }}
        />
      ))}
    </div>
  );
}
