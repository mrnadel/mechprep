'use client';

import Link from 'next/link';
import { Zap } from 'lucide-react';
import { StreakFlame } from '@/components/icons/StreakFlame';
import { motion } from 'framer-motion';
import { UserAvatar } from '@/components/ui/UserAvatar';

interface FriendCardProps {
  id: string;
  displayName: string;
  image: string | null;
  level: number;
  currentStreak: number;
  totalXp: number;
  todayXp?: number;
  index: number;
}

function getActivitySnippet(streak: number, todayXp: number, level: number): string {
  if (streak >= 3) return `On a ${streak}-day streak`;
  if (todayXp > 0) return `Earned ${todayXp} XP today`;
  return `Level ${level}`;
}

export default function FriendCard({
  id,
  displayName,
  image,
  level,
  currentStreak,
  totalXp,
  todayXp = 0,
  index,
}: FriendCardProps) {
  const subtitle = getActivitySnippet(currentStreak, todayXp, level);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        href={`/user/${id}`}
        className="card-hover flex items-center gap-3 p-3 sm:p-4"
      >
        <UserAvatar image={image} name={displayName} size={44} />

        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-surface-900 dark:text-surface-50 truncate">{displayName}</p>
          <p className="text-xs text-surface-400 font-semibold">{subtitle}</p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="flex items-center gap-1">
            <StreakFlame state={currentStreak > 0 ? 'active' : 'none'} size={16} />
            <span className="text-sm font-bold text-surface-700">{currentStreak}</span>
          </div>
          <div className="hidden sm:flex items-center gap-1">
            <Zap className="w-4 h-4 text-primary-500" />
            <span className="text-sm font-bold text-surface-700">{totalXp.toLocaleString()}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
