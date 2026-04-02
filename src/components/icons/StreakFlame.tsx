/**
 * Streak flame icon with 4 visual states.
 * Each state has its own dedicated artwork PNG.
 */
import Image from 'next/image';

export type StreakState = 'active' | 'weak' | 'lost' | 'none';

const flameSrc: Record<StreakState, string> = {
  active: '/streak-flame-active.png',
  weak: '/streak-flame-weak.png',
  lost: '/streak-flame-lost.png',
  none: '/streak-flame-none.png',
};

interface StreakFlameProps {
  state?: StreakState;
  size?: number;
  className?: string;
}

export function StreakFlame({ state = 'active', size = 24, className }: StreakFlameProps) {
  return (
    <Image
      src={flameSrc[state]}
      alt=""
      width={size}
      height={size}
      className={className}
      draggable={false}
    />
  );
}
