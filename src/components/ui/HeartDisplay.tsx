'use client';

import { useHeartsStore } from '@/store/useHeartsStore';
import { useEffect, useState } from 'react';

export function HeartDisplay() {
  const current = useHeartsStore((s) => s.current);
  const max = useHeartsStore((s) => s.max);
  const isUnlimited = useHeartsStore((s) => s.isUnlimited);
  const rechargeHearts = useHeartsStore((s) => s.rechargeHearts);
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);
  const [prevCurrent, setPrevCurrent] = useState(current);

  // Recharge hearts on mount
  useEffect(() => {
    rechargeHearts();
  }, [rechargeHearts]);

  // Detect heart loss for animation
  useEffect(() => {
    if (current < prevCurrent) {
      setAnimatingIndex(current); // Animate the heart that just went empty
      const timer = setTimeout(() => setAnimatingIndex(null), 600);
      setPrevCurrent(current);
      return () => clearTimeout(timer);
    }
    setPrevCurrent(current);
  }, [current, prevCurrent]);

  if (isUnlimited()) {
    return (
      <div className="flex items-center gap-1" aria-label="Unlimited hearts">
        <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        <span className="text-xs font-bold text-red-500">&infin;</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1" aria-label={`${current} hearts remaining`}>
      <svg
        aria-hidden="true"
        className={`w-5 h-5 transition-all duration-300 ${
          current > 0 ? 'text-red-500' : 'text-gray-300'
        }`}
        viewBox="0 0 24 24"
        fill="currentColor"
        style={animatingIndex !== null ? {
          transform: 'scale(1.3)',
          opacity: 0.5,
          transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
        } : undefined}
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
      <span className={`text-sm font-bold ${current > 0 ? 'text-red-500' : 'text-gray-300'}`}>
        {current}
      </span>
    </div>
  );
}
