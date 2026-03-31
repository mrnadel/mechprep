'use client';

import Image from 'next/image';

interface LeaderboardRowProps {
  rank: number;
  name: string;
  xp: number;
  isUser?: boolean;
  /** Avatar element — use <UserAvatar> or <CompetitorAvatar> */
  avatar: React.ReactNode;
  /** Extra content after XP (e.g. promote/demote arrows) */
  trailing?: React.ReactNode;
  /** Click handler for the row */
  onClick?: () => void;
  /** Override row background. Default auto-highlights user row. */
  bgColor?: string;
}

const RANK_COLORS: Record<number, string> = {
  1: 'var(--color-brand-500)',
  2: '#9CA3AF',
  3: '#CD7F32',
};

const RANK_MEDAL_IMAGES: Record<number, string> = {
  1: '/badges/medal-gold-sm.png',
  2: '/badges/medal-silver-sm.png',
  3: '/badges/medal-bronze-sm.png',
};

export function LeaderboardRow({
  rank,
  name,
  xp,
  isUser = false,
  avatar,
  trailing,
  onClick,
  bgColor,
}: LeaderboardRowProps) {
  const isTop3 = rank <= 3;
  const bg = bgColor ?? (isUser ? 'var(--color-primary-50)' : 'transparent');

  return (
    <div
      className={`flex items-center gap-2.5 px-4 border-b border-gray-50 dark:border-surface-800 last:border-0 ${
        isTop3 ? 'py-3' : 'py-2.5'
      } ${onClick && !isUser ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-surface-800 active:bg-gray-100 dark:active:bg-surface-700 transition-colors' : ''}`}
      style={{ background: bg }}
      onClick={onClick}
    >
      {/* Rank */}
      <span
        className={`font-bold text-center flex-shrink-0 flex items-center justify-center ${isTop3 ? 'w-7' : 'text-sm w-6'}`}
        style={{ color: RANK_COLORS[rank] ?? '#D1D5DB' }}
      >
        {RANK_MEDAL_IMAGES[rank] ? (
          <Image src={RANK_MEDAL_IMAGES[rank]} alt={`Rank ${rank}`} width={24} height={24} draggable={false} />
        ) : rank}
      </span>

      {/* Avatar */}
      {avatar}

      {/* Name + "You" pill */}
      <div className="flex-1 min-w-0 flex items-center gap-1.5">
        <span
          className="text-sm font-semibold truncate"
          style={{ color: isUser ? 'var(--color-primary-600)' : 'var(--color-surface-700)' }}
        >
          {name}
        </span>
        {isUser && (
          <span className="flex-shrink-0 text-[10px] font-bold uppercase tracking-wide text-primary-600 bg-primary-100 px-1.5 py-0.5 rounded-full">
            You
          </span>
        )}
      </div>

      {/* XP + trailing */}
      <div className="flex items-center gap-1 flex-shrink-0">
        {trailing}
        <span className="text-sm font-bold text-gray-600 dark:text-surface-300 min-w-[60px] text-right">
          {xp} XP
        </span>
      </div>
    </div>
  );
}
