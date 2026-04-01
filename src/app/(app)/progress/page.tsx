'use client';

import { useProgress } from '@/store/useStore';
import { useSubscription } from '@/hooks/useSubscription';
import { topics } from '@/data/topics';
import { FEATURES } from '@/lib/pricing';
import { BarChart3, Target, TrendingUp, Brain, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { UpgradeGate } from '@/components/ui/UpgradeGate';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { PageHeader } from '@/components/ui/PageHeader';
import { ProgressBar } from '@/components/ui/ProgressBar';

export default function ProgressPage() {
  const progress = useProgress();
  const { canAccess } = useSubscription();
  const hasFullAnalytics = canAccess(FEATURES.FULL_ANALYTICS);

  const overallAccuracy = progress.totalQuestionsAttempted > 0
    ? Math.round((progress.totalQuestionsCorrect / progress.totalQuestionsAttempted) * 100)
    : 0;

  // Topic breakdown
  const topicBreakdown = topics.map(topic => {
    const tp = progress.topicProgress.find(t => t.topicId === topic.id);
    const attempted = tp?.questionsAttempted ?? 0;
    const correct = tp?.questionsCorrect ?? 0;
    const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
    return { topic, attempted, correct, accuracy };
  }).sort((a, b) => b.attempted - a.attempted);

  // Recent trend (last 7 sessions)
  const recentSessions = progress.sessionHistory.slice(0, 7).reverse();
  const trendData = recentSessions.map(s =>
    s.questionsAttempted > 0 ? Math.round((s.questionsCorrect / s.questionsAttempted) * 100) : 0
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <PageHeader
        title="Progress & Analytics"
        icon={<BarChart3 className="w-5 h-5 text-primary-500 shrink-0" />}
      />

      {/* Empty State */}
      {progress.totalQuestionsAttempted === 0 && (
        <div className="card p-8 text-center">
          <Brain className="w-10 h-10 text-surface-300 mx-auto mb-3" />
          <p className="text-surface-500 mb-4">
            Complete your first practice session to start tracking your progress!
          </p>
          <a href="/" className="btn-primary inline-flex items-center gap-2">
            <Zap className="w-4 h-4" /> Start Learning
          </a>
        </div>
      )}

      {/* Key Metrics — always visible */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 sm:px-5">
        {[
          { icon: <Target className="w-5 h-5 text-emerald-500 mb-2" />, value: overallAccuracy, suffix: '%', label: 'Overall Accuracy' },
          { icon: <Brain className="w-5 h-5 text-purple-500 mb-2" />, value: progress.totalQuestionsAttempted, label: 'Questions Answered' },
          { icon: <TrendingUp className="w-5 h-5 text-blue-500 mb-2" />, value: progress.sessionHistory.length, label: 'Sessions Completed' },
          { icon: <Zap className="w-5 h-5 text-amber-500 mb-2" />, value: progress.totalXp, format: (n: number) => n.toLocaleString(), label: 'Total XP' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            className="stat-card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.4, ease: 'easeOut' }}
          >
            {stat.icon}
            <span className="stat-value">
              <AnimatedCounter value={stat.value} format={stat.format} />
              {stat.suffix ?? ''}
            </span>
            <span className="stat-label">{stat.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Full Analytics — Pro only */}
      <UpgradeGate feature={FEATURES.FULL_ANALYTICS} reason="Unlock detailed analytics: accuracy trends, per-topic breakdown, and weak area identification.">
        {/* Accuracy Trend */}
        {trendData.length > 1 && (
          <div className="card p-5">
            <h2 className="font-bold text-surface-900 mb-4">Accuracy Trend (Last 7 Sessions)</h2>
            <div className="flex items-end gap-2 h-32">
              {trendData.map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs text-surface-500">{val}%</span>
                  <div className="w-full rounded-t-md transition-all duration-500" style={{
                    height: `${Math.max(val, 5)}%`,
                    backgroundColor: val >= 80 ? '#10B981' : val >= 60 ? '#F59E0B' : '#EF4444',
                  }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Topic Breakdown */}
        <div className="card p-5 mt-6">
          <h2 className="font-bold text-surface-900 mb-4">Performance by Topic</h2>
          <div className="space-y-4">
            {topicBreakdown.map(({ topic, attempted, correct, accuracy }, i) => (
              <motion.div
                key={topic.id}
                className="flex items-center gap-3 sm:gap-4"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.04, duration: 0.35 }}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0"
                  style={{ backgroundColor: `${topic.color}15` }}>
                  {topic.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-surface-800 truncate">{topic.name}</span>
                    <span className="text-sm font-mono text-surface-600 shrink-0 ml-2">
                      {attempted > 0 ? `${accuracy}%` : '—'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <ProgressBar
                        percent={attempted > 0 ? accuracy : 0}
                        color={accuracy >= 80 ? '#10B981' : accuracy >= 60 ? '#F59E0B' : accuracy > 0 ? '#EF4444' : '#E2E8F0'}
                        animate={false}
                      />
                    </div>
                    <span className="text-xs text-surface-400 shrink-0 w-20 text-right hidden sm:inline">
                      {`${correct}/${attempted} correct`}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Weak Areas Detail */}
        {progress.weakAreas.length > 0 && (
          <div className="card p-5 border-red-200 mt-6">
            <h2 className="font-bold text-red-700 mb-3">Areas That Need Attention</h2>
            <div className="flex flex-wrap gap-2">
              {progress.weakAreas.map(id => {
                const topic = topics.find(t => t.id === id);
                if (!topic) return null;
                return (
                  <span key={id} className="badge-error">
                    {topic.icon} {topic.name}
                  </span>
                );
              })}
            </div>
            <p className="text-sm text-surface-500 mt-3">
              These topics have below 65% accuracy. Use Weak Areas Practice to improve.
            </p>
          </div>
        )}
      </UpgradeGate>
    </div>
  );
}
