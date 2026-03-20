'use client';

import { useProgress } from '@/store/useStore';
import { topics } from '@/data/topics';
import { Clock, Target, Zap } from 'lucide-react';
import { getRelativeTime, cn } from '@/lib/utils';

export default function RecentActivity() {
  const progress = useProgress();
  const recentSessions = progress.sessionHistory.slice(0, 5);

  if (recentSessions.length === 0) {
    return (
      <div className="card p-5">
        <h2 className="font-bold text-surface-900 mb-4">Recent Activity</h2>
        <p className="text-sm text-surface-500 text-center py-8">
          No sessions yet. Start practicing to see your activity here!
        </p>
      </div>
    );
  }

  return (
    <div className="card p-5">
      <h2 className="font-bold text-surface-900 mb-4">Recent Activity</h2>
      <div className="space-y-3">
        {recentSessions.map((session) => {
          const accuracy = session.questionsAttempted > 0
            ? Math.round((session.questionsCorrect / session.questionsAttempted) * 100)
            : 0;
          const topicNames = session.topicsCovered
            .map(id => topics.find(t => t.id === id))
            .filter((t): t is NonNullable<typeof t> => t != null)
            .slice(0, 3);

          return (
            <div key={session.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-surface-50 transition-colors">
              <div className={cn(
                'w-10 h-10 rounded-lg flex items-center justify-center shrink-0',
                accuracy >= 80 ? 'bg-emerald-50' : accuracy >= 60 ? 'bg-amber-50' : 'bg-red-50'
              )}>
                <Target className={cn(
                  'w-5 h-5',
                  accuracy >= 80 ? 'text-emerald-500' : accuracy >= 60 ? 'text-amber-500' : 'text-red-500'
                )} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  {topicNames.map(t => (
                    <span key={t.id} className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: `${t.color}15`, color: t.color }}>
                      {t.icon} {t.name}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs text-surface-500">
                  <span>{`${accuracy}% accuracy`}</span>
                  <span>·</span>
                  <span>{`${session.questionsCorrect}/${session.questionsAttempted} correct`}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3" /> +{session.xpEarned} XP
                  </span>
                </div>
              </div>

              <span className="text-xs text-surface-400 shrink-0">
                {getRelativeTime(session.date)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
