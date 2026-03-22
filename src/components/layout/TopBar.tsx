'use client';

import { Menu, Flame, Zap, Star } from 'lucide-react';
import { useSidebar, useProgress } from '@/store/useStore';
import { cn } from '@/lib/utils';
import { levels } from '@/data/levels';
import { GemCounter } from '@/components/engagement/GemCounter';
import { DoubleXpTimer } from '@/components/engagement/DoubleXpTimer';
import { useLeague } from '@/store/useEngagementStore';
import { leagueTiers } from '@/data/league';
import { useSubscription } from '@/hooks/useSubscription';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function TopBar() {
  const progress = useProgress();
  const { toggleSidebar } = useSidebar();
  const league = useLeague();
  const { isProUser, hasFetched } = useSubscription();
  const { data: session } = useSession();
  const image = session?.user?.image;
  const displayName = session?.user?.name || progress.displayName || 'Engineer';
  const initial = displayName.charAt(0).toUpperCase();
  const avatarColors = ['#3B82F6', '#8B5CF6', '#10B981', '#F97316', '#EC4899'];
  const avatarBg = avatarColors[initial.charCodeAt(0) % avatarColors.length];
  const leagueTier = leagueTiers.find((t) => t.tier === league.currentTier);

  const currentLevel = levels.find(l => l.level === progress.currentLevel) || levels[0];
  const nextLevel = levels.find(l => l.level === progress.currentLevel + 1);
  const xpInLevel = nextLevel ? progress.totalXp - currentLevel.xpRequired : 0;
  const xpForLevel = nextLevel ? nextLevel.xpRequired - currentLevel.xpRequired : 1;
  const levelProgress = nextLevel ? Math.min((xpInLevel / xpForLevel) * 100, 100) : 100;

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-surface-200">
      <div className="flex items-center justify-between h-14 px-4">
        {/* Left: Menu button (mobile) + breadcrumb area */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 rounded-lg hover:bg-surface-100 transition-colors"
          >
            <Menu className="w-5 h-5 text-surface-600" />
          </button>
        </div>

        {/* Right: Stats bar */}
        <div className="flex items-center gap-4" aria-label="User stats">
          {/* Streak */}
          <div
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium',
              progress.currentStreak > 0 ? 'bg-orange-50 text-orange-600' : 'bg-surface-100 text-surface-400'
            )}
            aria-label={`${progress.currentStreak} day streak`}
          >
            <Flame className="w-4 h-4" aria-hidden="true" />
            <span>{progress.currentStreak}</span>
          </div>

          {/* XP */}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-600 text-sm font-medium"
            aria-label={`${progress.totalXp} experience points`}
          >
            <Star className="w-4 h-4" aria-hidden="true" />
            <span>{progress.totalXp}</span>
          </div>

          {/* Gems */}
          <GemCounter />

          {/* League tier icon */}
          {leagueTier && (
            <div
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-sm font-medium"
              style={{ background: `${leagueTier.color}15`, color: leagueTier.color }}
              aria-label={`${leagueTier.name} league`}
            >
              <span className="text-base" aria-hidden="true">{leagueTier.icon}</span>
            </div>
          )}

          {/* Double XP Timer */}
          <DoubleXpTimer />

          {/* Level + Progress */}
          <div className="hidden sm:flex items-center gap-2">
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-50 text-primary-600 text-sm font-medium"
              aria-label={`Level ${progress.currentLevel}`}
            >
              <Zap className="w-4 h-4" aria-hidden="true" />
              <span>Lv. {progress.currentLevel}</span>
            </div>
            {nextLevel && (
              <div
                className="w-24 h-2 bg-surface-200 rounded-full overflow-hidden"
                role="progressbar"
                aria-valuenow={Math.round(levelProgress)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Level progress: ${Math.round(levelProgress)}%`}
              >
                <div
                  className="h-full bg-primary-500 rounded-full transition-all duration-500"
                  style={{ width: `${levelProgress}%` }}
                />
              </div>
            )}
          </div>

          {/* User avatar with Pro badge */}
          <Link href="/profile" className="relative shrink-0 group" aria-label="View profile">
            <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-surface-200 group-hover:ring-primary-300 transition-all">
              {image ? (
                <img src={image} alt={displayName} className="w-full h-full object-cover" />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ background: avatarBg }}
                >
                  {initial}
                </div>
              )}
            </div>
            {hasFetched && isProUser && (
              <div
                className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center border-2 border-white"
                style={{
                  background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                  boxShadow: '0 0 6px rgba(245, 158, 11, 0.4)',
                }}
                aria-label="Pro member"
              >
                <svg width="8" height="8" viewBox="0 0 24 24" fill="#FFFBEB" className="shrink-0">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              </div>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
