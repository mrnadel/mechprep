'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Flame, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

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
  const initials = (displayName || '?').charAt(0).toUpperCase();
  const subtitle = getActivitySnippet(currentStreak, todayXp, level);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        href={`/user/${id}`}
        className="card-hover flex items-center gap-3 p-4"
      >
        <div
          className="rounded-full flex items-center justify-center overflow-hidden shrink-0"
          style={{ width: 44, height: 44, background: '#E0E7FF' }}
        >
          {image ? (
            <Image src={image} alt={displayName} width={44} height={44} className="w-full h-full object-cover" />
          ) : (
            <span className="text-primary-700 font-bold text-sm">{initials}</span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-surface-900 truncate">{displayName}</p>
          <p className="text-xs text-surface-400 font-semibold">{subtitle}</p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-bold text-surface-700">{currentStreak}</span>
          </div>
          <div className="flex items-center gap-1">
            <Zap className="w-4 h-4 text-primary-500" />
            <span className="text-sm font-bold text-surface-700">{totalXp.toLocaleString()}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
