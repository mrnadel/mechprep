'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useSWR from 'swr';
import { UserAvatar } from '@/components/ui/UserAvatar';

interface Activity {
  id: string;
  userId: string;
  displayName: string | null;
  image: string | null;
  type: string;
  data: Record<string, unknown> | null;
  createdAt: string | null;
  reactionCount: number;
  userReacted: boolean;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const TYPE_CONFIG: Record<string, { icon: string; format: (data: Record<string, unknown> | null) => string }> = {
  streak_milestone: {
    icon: '🔥',
    format: (d) => `hit a ${d?.streakDays ?? 0}-day streak!`,
  },
  lesson_complete: {
    icon: '📖',
    format: () => 'completed a lesson!',
  },
  course_complete: {
    icon: '🎓',
    format: () => 'completed the entire course!',
  },
  level_up: {
    icon: '⬆️',
    format: (d) => `reached level ${d?.level ?? '?'}!`,
  },
  quest_complete: {
    icon: '⭐',
    format: () => 'completed a quest!',
  },
};

function timeAgo(dateStr: string | null): string {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return `${Math.floor(days / 7)}w ago`;
}

export function ActivityFeed() {
  const { data, mutate } = useSWR<{ activities: Activity[] }>('/api/friends/activity', fetcher, {
    refreshInterval: 60_000,
  });
  const [reacting, setReacting] = useState<Set<string>>(new Set());

  const handleReact = useCallback(async (activityId: string) => {
    setReacting((prev) => new Set(prev).add(activityId));
    try {
      await fetch('/api/friends/activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ activityId }),
      });
      mutate();
    } finally {
      setReacting((prev) => {
        const next = new Set(prev);
        next.delete(activityId);
        return next;
      });
    }
  }, [mutate]);

  const activities = data?.activities ?? [];

  if (activities.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-xs font-bold text-surface-500 uppercase tracking-wider px-1">
        Friend Activity
      </h3>
      <AnimatePresence>
        {activities.map((a, i) => {
          const cfg = TYPE_CONFIG[a.type] ?? { icon: '📌', format: () => 'did something' };
          return (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-center gap-3 rounded-xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 px-3 py-2.5"
            >
              <UserAvatar image={a.image} name={a.displayName || 'Friend'} size={32} />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-surface-800 dark:text-surface-200">
                  <span className="font-bold">{a.displayName || 'Friend'}</span>{' '}
                  <span className="mr-1">{cfg.icon}</span>
                  {cfg.format(a.data)}
                </p>
                <span className="text-[10px] text-surface-400">{timeAgo(a.createdAt)}</span>
              </div>
              <button
                onClick={() => handleReact(a.id)}
                disabled={a.userReacted || reacting.has(a.id)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                  a.userReacted
                    ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600'
                    : 'bg-surface-100 dark:bg-surface-800 text-surface-500 hover:bg-amber-50 hover:text-amber-500'
                }`}
              >
                <span>{a.userReacted ? '🙌' : '👋'}</span>
                {a.reactionCount > 0 && <span>{a.reactionCount}</span>}
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
