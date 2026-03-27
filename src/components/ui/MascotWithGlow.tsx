'use client';

import { motion } from 'framer-motion';
import { Mascot, type MascotPose } from './Mascot';

interface MascotWithGlowProps {
  pose: MascotPose;
  size?: number;
  /** Flat color for a pulsing glow behind the mascot */
  glowColor?: string;
  /** Show animated blue flame behind the mascot */
  flame?: boolean;
  className?: string;
}

export function MascotWithGlow({ pose, size = 120, glowColor, flame, className }: MascotWithGlowProps) {
  const hasEffect = glowColor || flame;

  if (!hasEffect) {
    return (
      <div className={className}>
        <Mascot pose={pose} size={size} />
      </div>
    );
  }

  const flameSize = size * 2.2;

  return (
    <div className={className} style={{ position: 'relative', width: size, height: flame ? size * 1.3 : size }}>
      {/* Animated flame WebP — loops behind mascot */}
      {flame && (
        <img
          src="/effects/blue-flame.webp"
          alt=""
          width={flameSize}
          height={flameSize}
          draggable={false}
          style={{
            position: 'absolute',
            left: '50%',
            bottom: 0,
            marginLeft: -flameSize / 2,
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Flat color glow */}
      {glowColor && !flame && (
        <motion.div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: size * 1.1,
            height: size * 1.1,
            marginTop: -(size * 1.1) / 2,
            marginLeft: -(size * 1.1) / 2,
            borderRadius: '50%',
            background: glowColor,
          }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.75, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* Mascot on top */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, zIndex: 1 }}>
        <Mascot pose={pose} size={size} />
      </div>
    </div>
  );
}
