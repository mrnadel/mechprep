'use client';

import { useProgress } from '@/store/useStore';
import { achievements } from '@/data/achievements';
import { Trophy, Lock, Star, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AchievementCategory } from '@/data/types';
import Link from 'next/link';

const categoryConfig: Record<AchievementCategory, { label: string; icon: string; gradient: string; badgeBg: string; badgeText: string; cardBorder: string; iconBg: string }> = {
  knowledge: {
    label: 'Knowledge',
    icon: '📘',
    gradient: 'from-blue-500 to-blue-600',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-700',
    cardBorder: 'border-blue-200',
    iconBg: 'bg-blue-50',
  },
  consistency: {
    label: 'Consistency',
    icon: '🔥',
    gradient: 'from-orange-500 to-orange-600',
    badgeBg: 'bg-orange-100',
    badgeText: 'text-orange-700',
    cardBorder: 'border-orange-200',
    iconBg: 'bg-orange-50',
  },
  challenge: {
    label: 'Challenge',
    icon: '⚔️',
    gradient: 'from-purple-500 to-purple-600',
    badgeBg: 'bg-purple-100',
    badgeText: 'text-purple-700',
    cardBorder: 'border-purple-200',
    iconBg: 'bg-purple-50',
  },
  exploration: {
    label: 'Exploration',
    icon: '🧭',
    gradient: 'from-emerald-500 to-emerald-600',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-700',
    cardBorder: 'border-emerald-200',
    iconBg: 'bg-emerald-50',
  },
  mastery: {
    label: 'Mastery',
    icon: '👑',
    gradient: 'from-amber-500 to-amber-600',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-700',
    cardBorder: 'border-amber-200',
    iconBg: 'bg-amber-50',
  },
  hidden: {
    label: 'Hidden',
    icon: '🔮',
    gradient: 'from-surface-500 to-surface-600',
    badgeBg: 'bg-surface-100',
    badgeText: 'text-surface-600',
    cardBorder: 'border-surface-200',
    iconBg: 'bg-surface-100',
  },
};

const categoryOrder: AchievementCategory[] = ['knowledge', 'consistency', 'challenge', 'exploration', 'mastery', 'hidden'];

function ProgressRing({ percent, size = 80, stroke = 6 }: { percent: number; size?: number; stroke?: number }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#E2E8F0"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#F59E0B"
        strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-700 ease-out"
      />
    </svg>
  );
}

export default function AchievementsPage() {
  const progress = useProgress();
  const unlockedSet = new Set(progress.achievementsUnlocked);

  const unlockedCount = achievements.filter(a => unlockedSet.has(a.id)).length;
  const totalCount = achievements.length;
  const percent = totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;

  // Total XP from unlocked achievements
  const totalAchievementXp = achievements
    .filter(a => unlockedSet.has(a.id))
    .reduce((sum, a) => sum + a.xpReward, 0);

  return (
    <div className="max-w-3xl mx-auto pb-12 animate-fade-in">
      {/* Sticky top bar */}
      <div className="sticky top-0 z-30 bg-white px-4 sm:px-5 py-3" style={{ borderBottom: '2px solid #E5E5E5' }}>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/" className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#F5F5F5] active:scale-90 transition-transform" aria-label="Back">
            <ChevronLeft className="w-5 h-5 text-[#AFAFAF]" />
          </Link>
          <h1 className="text-base sm:text-lg font-extrabold text-[#3C3C3C] flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            Achievements
          </h1>
        </div>
      </div>

      {/* Stats card */}
      <div className="px-4 mt-4">
      <div className="card p-5 sm:p-6 mb-6">
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Progress Ring */}
          <div className="relative shrink-0">
            <ProgressRing percent={percent} size={72} stroke={5} />
            <div className="absolute inset-0 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-amber-500" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-surface-900">Achievement Progress</p>
            <p className="text-sm text-surface-500 mt-0.5">
              {unlockedCount} of {totalCount} unlocked
            </p>
            {/* Progress bar */}
            <div className="progress-bar h-2 mt-2.5">
              <div
                className="progress-bar-fill bg-amber-400"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          <div className="text-right shrink-0">
            <p className="text-2xl font-bold text-amber-500">{percent}%</p>
            <p className="text-xs text-surface-400 mt-0.5 flex items-center justify-end gap-1">
              <Star className="w-3 h-3" /> {totalAchievementXp.toLocaleString()} XP
            </p>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {unlockedCount === 0 && (
        <div className="card p-6 text-center mb-6" style={{ borderColor: '#FDE68A', background: 'rgba(254, 243, 199, 0.3)' }}>
          <Trophy className="w-10 h-10 text-amber-300 mx-auto mb-3" />
          <p className="text-surface-700 font-medium mb-1">No achievements yet</p>
          <p className="text-sm text-surface-500 mb-3">Start practicing to earn your first achievement!</p>
          <Link href="/" className="btn-primary text-sm">
            Start Practicing <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Categories */}
      <div className="space-y-6">
        {categoryOrder.map(catId => {
          const config = categoryConfig[catId];
          const catAchievements = achievements.filter(a => a.category === catId);
          if (catAchievements.length === 0) return null;

          const catUnlocked = catAchievements.filter(a => unlockedSet.has(a.id)).length;
          const catComplete = catUnlocked === catAchievements.length;

          return (
            <div key={catId}>
              {/* Category Header */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-base">{config.icon}</span>
                <span className={cn('text-sm font-bold px-2 py-0.5 rounded-full', config.badgeBg, config.badgeText)}>
                  {config.label}
                </span>
                <span className="text-xs text-surface-400 font-medium">
                  {catUnlocked}/{catAchievements.length}
                </span>
                {catComplete && (
                  <span className="badge-success text-[10px] ml-auto">Complete!</span>
                )}
              </div>

              {/* Achievement Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {catAchievements.map(achievement => {
                  const unlocked = unlockedSet.has(achievement.id);
                  const isHidden = achievement.category === 'hidden' && !unlocked;

                  return (
                    <div
                      key={achievement.id}
                      className={cn(
                        'card p-3.5 flex items-center gap-3 transition-all duration-200',
                        unlocked
                          ? cn(config.cardBorder, 'ring-1', config.cardBorder.replace('border-', 'ring-').replace('-200', '-100'))
                          : 'opacity-50 grayscale'
                      )}
                    >
                      {/* Icon */}
                      <div className={cn(
                        'w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0',
                        unlocked ? config.iconBg : 'bg-surface-100'
                      )}>
                        {isHidden ? (
                          <Lock className="w-4.5 h-4.5 text-surface-400" />
                        ) : (
                          <span>{achievement.icon}</span>
                        )}
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <p className={cn(
                          'font-semibold text-sm leading-tight',
                          unlocked ? 'text-surface-900' : 'text-surface-500'
                        )}>
                          {isHidden ? '???' : achievement.name}
                        </p>
                        <p className="text-xs text-surface-400 mt-0.5 leading-snug line-clamp-2">
                          {isHidden ? 'Keep exploring to discover this' : achievement.description}
                        </p>
                      </div>

                      {/* Right side: XP or status */}
                      <div className="shrink-0 text-right">
                        {unlocked ? (
                          <span className="text-xs font-semibold text-amber-600 flex items-center gap-0.5">
                            <Star className="w-3 h-3" />
                            +{achievement.xpReward}
                          </span>
                        ) : !isHidden ? (
                          <span className="text-[10px] text-surface-400 font-medium">
                            +{achievement.xpReward} XP
                          </span>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      </div>{/* end px-4 wrapper */}
    </div>
  );
}
