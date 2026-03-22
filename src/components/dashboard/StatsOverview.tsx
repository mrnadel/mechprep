'use client';

import { useProgress } from '@/store/useStore';

export default function StatsOverview() {
  const progress = useProgress();

  const accuracy = progress.totalQuestionsAttempted > 0
    ? Math.round((progress.totalQuestionsCorrect / progress.totalQuestionsAttempted) * 100)
    : 0;

  const stats = [
    {
      label: 'Accuracy',
      value: `${accuracy}%`,
      emoji: '🎯',
      bg: 'bg-emerald-50',
    },
    {
      label: 'Current Streak',
      value: `${progress.currentStreak} days`,
      emoji: '⚡',
      bg: 'bg-orange-50',
    },
    {
      label: 'Total XP',
      value: progress.totalXp.toLocaleString(),
      emoji: '⭐',
      bg: 'bg-amber-50',
    },
    {
      label: 'Questions',
      value: progress.totalQuestionsAttempted.toString(),
      emoji: '✅',
      bg: 'bg-blue-50',
    },
    {
      label: 'Topics Covered',
      value: `${progress.topicProgress.filter(t => t.questionsAttempted > 0).length}/11`,
      emoji: '📚',
      bg: 'bg-purple-50',
    },
    {
      label: 'Sessions',
      value: progress.sessionHistory.length.toString(),
      emoji: '📊',
      bg: 'bg-primary-50',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {stats.map((stat) => (
        <div key={stat.label} className="card-hover p-4">
          <div className={`w-9 h-9 rounded-lg ${stat.bg} flex items-center justify-center mb-3`}>
            <span className="text-lg">{stat.emoji}</span>
          </div>
          <p className="text-2xl font-bold text-surface-900">{stat.value}</p>
          <p className="text-xs text-surface-500 mt-0.5">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
