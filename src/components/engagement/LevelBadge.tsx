'use client';

import Image from 'next/image';
import type { Level } from '@/data/types';

interface LevelBadgeProps {
  level: Level;
  size?: number;
  className?: string;
}

/**
 * Renders a level's badge image if available, otherwise falls back to the emoji icon.
 */
export function LevelBadge({ level, size = 48, className }: LevelBadgeProps) {
  if (level.badge) {
    return (
      <Image
        src={level.badge}
        alt={level.title}
        width={size}
        height={size}
        className={className}
        style={{ width: size, height: 'auto', objectFit: 'contain' }}
        draggable={false}
      />
    );
  }

  // Fallback: emoji icon
  return (
    <span
      className={className}
      style={{ fontSize: size * 0.6, lineHeight: 1 }}
    >
      {level.icon}
    </span>
  );
}
