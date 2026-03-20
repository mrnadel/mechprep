'use client';

import Link from 'next/link';
import type { SessionSummary as SessionSummaryType } from '@/store/useStore';
import { Trophy, Target, Clock, Zap, Star, ArrowRight, Home, RotateCcw } from 'lucide-react';
import { cn, formatDuration } from '@/lib/utils';
import { useSessionActions } from '@/store/useStore';
import { achievements } from '@/data/achievements';

interface Props {
  summary: SessionSummaryType;
}

export default function SessionSummary({ summary }: Props) {
  const { startSession } = useSessionActions();

  const getGrade = (accuracy: number) => {
    if (accuracy >= 90) return { label: 'Outstanding', color: 'text-emerald-600', bg: 'bg-emerald-50' };
    if (accuracy >= 75) return { label: 'Strong', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (accuracy >= 60) return { label: 'Good Progress', color: 'text-amber-600', bg: 'bg-amber-50' };
    return { label: 'Keep Practicing', color: 'text-orange-600', bg: 'bg-orange-50' };
  };

  const grade = getGrade(summary.accuracy);

  return (
    <div className="max-w-2xl mx-auto animate-scale-in">
      {/* Header */}
      <div className="text-center mb-8">
        <div className={cn('inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4', grade.bg)}>
          <Trophy className={cn('w-10 h-10', grade.color)} />
        </div>
        <h1 className="text-2xl font-bold text-surface-900 mb-1">Session Complete!</h1>
        <p className={cn('text-lg font-semibold', grade.color)}>{grade.label}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="stat-card items-center text-center">
          <Target className="w-5 h-5 text-primary-500 mb-1" />
          <span className="stat-value">{summary.accuracy}%</span>
          <span className="stat-label">Accuracy</span>
        </div>
        <div className="stat-card items-center text-center">
          <Zap className="w-5 h-5 text-amber-500 mb-1" />
          <span className="stat-value">{summary.questionsCorrect}/{summary.questionsAttempted}</span>
          <span className="stat-label">Correct</span>
        </div>
        <div className="stat-card items-center text-center">
          <Star className="w-5 h-5 text-yellow-500 mb-1" />
          <span className="stat-value">+{summary.xpEarned}</span>
          <span className="stat-label">XP Earned</span>
        </div>
        <div className="stat-card items-center text-center">
          <Clock className="w-5 h-5 text-surface-400 mb-1" />
          <span className="stat-value">{formatDuration(summary.duration)}</span>
          <span className="stat-label">Duration</span>
        </div>
      </div>

      {/* New Achievements */}
      {summary.newAchievements.length > 0 && (
        <div className="card p-5 mb-6 border-amber-200 bg-amber-50">
          <h3 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
            <Trophy className="w-4 h-4" /> {summary.newAchievements.length > 1 ? 'New Achievements!' : 'New Achievement!'}
          </h3>
          <div className="space-y-2">
            {summary.newAchievements.map(id => {
              const achievement = achievements.find(a => a.id === id);
              return (
                <div key={id} className="flex items-center gap-2 text-sm text-amber-700">
                  <span className="text-lg">{achievement?.icon ?? '⭐'}</span>
                  <span className="font-medium">{achievement?.name ?? id}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Level Up */}
      {summary.newLevel && (
        <div className="card p-5 mb-6 border-primary-200 bg-primary-50 text-center animate-pulse-once">
          <Zap className="w-8 h-8 text-primary-500 mx-auto mb-2" />
          <h3 className="font-bold text-primary-800 text-lg">Level Up!</h3>
          <p className="text-sm text-primary-600">You&apos;re making real progress.</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <Link href="/" className="btn-secondary flex-1">
          <Home className="w-4 h-4" /> Dashboard
        </Link>
        <button
          onClick={() => startSession(summary.type)}
          className="btn-primary flex-1"
        >
          <RotateCcw className="w-4 h-4" /> Practice Again
        </button>
      </div>
    </div>
  );
}
