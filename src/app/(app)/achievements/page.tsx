'use client';

import { useProgress } from '@/store/useStore';
import { achievements } from '@/data/achievements';
import { Trophy, Lock, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AchievementCategory } from '@/data/types';

export default function AchievementsPage() {
  const progress = useProgress();
  const unlockedSet = new Set(progress.achievementsUnlocked);

  const categories: { id: AchievementCategory; label: string; color: string }[] = [
    { id: 'knowledge', label: 'Knowledge', color: 'text-blue-600 bg-blue-50' },
    { id: 'consistency', label: 'Consistency', color: 'text-orange-600 bg-orange-50' },
    { id: 'challenge', label: 'Challenge', color: 'text-purple-600 bg-purple-50' },
    { id: 'exploration', label: 'Exploration', color: 'text-emerald-600 bg-emerald-50' },
    { id: 'mastery', label: 'Mastery', color: 'text-amber-600 bg-amber-50' },
    { id: 'hidden', label: 'Hidden', color: 'text-surface-600 bg-surface-100' },
  ];

  const unlockedCount = achievements.filter(a => unlockedSet.has(a.id)).length;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 flex items-center gap-3">
            <Trophy className="w-7 h-7 text-amber-500" />
            Achievements
          </h1>
          <p className="text-surface-500 mt-1">
            {`${unlockedCount} of ${achievements.length} unlocked`}
          </p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-amber-500">{unlockedCount}</p>
          <p className="text-xs text-surface-400">/ {achievements.length}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="progress-bar h-3">
        <div
          className="progress-bar-fill bg-amber-400"
          style={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
        />
      </div>

      {/* Empty State Encouragement */}
      {unlockedCount === 0 && (
        <div className="card p-6 text-center border-amber-200 bg-amber-50/50">
          <Trophy className="w-10 h-10 text-amber-300 mx-auto mb-3" />
          <p className="text-surface-600 font-medium mb-1">No achievements unlocked yet</p>
          <p className="text-sm text-surface-500">Start practicing to earn your first achievement!</p>
        </div>
      )}

      {/* By category */}
      {categories.map(cat => {
        const catAchievements = achievements.filter(a => a.category === cat.id);
        if (catAchievements.length === 0) return null;

        return (
          <div key={cat.id}>
            <h2 className={cn('font-bold text-lg mb-3 flex items-center gap-2', cat.color.split(' ')[0])}>
              <span className={cn('px-2.5 py-0.5 rounded-full text-sm', cat.color)}>{cat.label}</span>
              <span className="text-sm font-normal text-surface-400">
                {catAchievements.filter(a => unlockedSet.has(a.id)).length}/{catAchievements.length}
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
              {catAchievements.map(achievement => {
                const unlocked = unlockedSet.has(achievement.id);
                const isHidden = achievement.category === 'hidden' && !unlocked;

                return (
                  <div
                    key={achievement.id}
                    className={cn(
                      'card p-4 flex items-start gap-3 transition-all duration-200',
                      unlocked ? 'border-amber-200 bg-amber-50/50' : 'opacity-60'
                    )}
                  >
                    <div className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0',
                      unlocked ? 'bg-amber-100' : 'bg-surface-100'
                    )}>
                      {isHidden ? <Lock className="w-5 h-5 text-surface-400" /> : achievement.icon}
                    </div>
                    <div className="min-w-0">
                      <p className={cn('font-semibold text-sm', unlocked ? 'text-surface-900' : 'text-surface-500')}>
                        {isHidden ? '???' : achievement.name}
                      </p>
                      <p className="text-xs text-surface-500 mt-0.5">
                        {isHidden ? 'Keep exploring to discover this achievement' : achievement.description}
                      </p>
                      {!isHidden && (
                        <div className="flex items-center gap-2 mt-2">
                          <span className="flex items-center gap-1 text-xs text-amber-600">
                            <Star className="w-3 h-3" /> +{achievement.xpReward} XP
                          </span>
                          {unlocked && (
                            <span className="badge-success text-[10px]">Unlocked</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
