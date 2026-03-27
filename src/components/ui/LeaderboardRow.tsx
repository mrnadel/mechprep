'use client';

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
  1: '#F59E0B',
  2: '#9CA3AF',
  3: '#CD7F32',
};

const RANK_MEDALS: Record<number, string> = {
  1: '\u{1F947}',
  2: '\u{1F948}',
  3: '\u{1F949}',
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
  const bg = bgColor ?? (isUser ? '#EEF2FF' : 'transparent');

  return (
    <div
      className={`flex items-center gap-2.5 px-4 border-b border-gray-50 last:border-0 ${
        isTop3 ? 'py-3' : 'py-2.5'
      } ${onClick && !isUser ? 'cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors' : ''}`}
      style={{ background: bg }}
      onClick={onClick}
    >
      {/* Rank */}
      <span
        className={`font-bold text-center flex-shrink-0 ${isTop3 ? 'text-base w-7' : 'text-sm w-6'}`}
        style={{ color: RANK_COLORS[rank] ?? '#D1D5DB' }}
      >
        {RANK_MEDALS[rank] ?? rank}
      </span>

      {/* Avatar */}
      {avatar}

      {/* Name + "You" pill */}
      <div className="flex-1 min-w-0 flex items-center gap-1.5">
        <span
          className="text-sm font-semibold truncate"
          style={{ color: isUser ? '#4F46E5' : '#374151' }}
        >
          {name}
        </span>
        {isUser && (
          <span className="flex-shrink-0 text-[10px] font-bold uppercase tracking-wide text-indigo-600 bg-indigo-100 px-1.5 py-0.5 rounded-full">
            You
          </span>
        )}
      </div>

      {/* XP + trailing */}
      <div className="flex items-center gap-1 flex-shrink-0">
        {trailing}
        <span className="text-sm font-bold text-gray-600 min-w-[60px] text-right">
          {xp} XP
        </span>
      </div>
    </div>
  );
}
