'use client';

import { motion } from 'framer-motion';
import { Mascot, type MascotPose } from './Mascot';

interface MascotWithGlowProps {
  pose: MascotPose;
  size?: number;
  /** Flat color for a pulsing glow behind the mascot */
  glowColor?: string;
  /** Show animated blue flame spritesheet behind the mascot */
  flame?: boolean;
  className?: string;
}

/**
 * CSS spritesheet flame animation.
 * Uses mix-blend-mode: screen to hide the white background naturally.
 * Spritesheet: 6 cols x 2 rows = 12 frames, each 256x512px.
 */
function FlameSprite({ size }: { size: number }) {
  // Sprite is 1536x1024, frame is 256x512 (6 cols x 2 rows)
  // Display height = size * 2 (flame is taller than wide)
  const displayW = size;
  const displayH = size * 2;
  // The full sprite scales: 6 frames wide = displayW * 6
  const sheetW = displayW * 6;
  const sheetH = displayH * 2;

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        bottom: '-10%',
        marginLeft: -displayW / 2,
        width: displayW,
        height: displayH,
        overflow: 'hidden',
        mixBlendMode: 'screen',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <div
        style={{
          width: sheetW,
          height: sheetH,
          backgroundImage: 'url(/effects/flame-sprite.png)',
          backgroundSize: `${sheetW}px ${sheetH}px`,
          animation: 'flame-sprite 0.8s steps(6) infinite',
        }}
      />
      <style>{`
        @keyframes flame-sprite {
          0% { transform: translateX(0); }
          50% { transform: translateX(-${sheetW}px); }
          50.01% { transform: translateX(0); background-position-y: -${displayH}px; }
          100% { transform: translateX(-${sheetW}px); background-position-y: -${displayH}px; }
        }
      `}</style>
    </div>
  );
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

  return (
    <div className={className} style={{ position: 'relative', width: size, height: flame ? size * 1.4 : size }}>
      {/* Flame spritesheet */}
      {flame && <FlameSprite size={size * 1.8} />}

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
      <div style={{ position: 'absolute', bottom: 0, left: '50%', marginLeft: -size / 2, zIndex: 1 }}>
        <Mascot pose={pose} size={size} />
      </div>
    </div>
  );
}
