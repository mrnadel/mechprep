'use client';

import Link from 'next/link';
import { Flame, Zap } from 'lucide-react';

interface FriendCardProps {
  id: string;
  displayName: string;
  image: string | null;
  level: number;
  currentStreak: number;
  totalXp: number;
}

export default function FriendCard({
  id,
  displayName,
  image,
  level,
  currentStreak,
  totalXp,
}: FriendCardProps) {
  const initials = (displayName || '?').charAt(0).toUpperCase();

  return (
    <Link
      href={`/user/${id}`}
      className="card-hover flex items-center gap-3 p-4 rounded-xl border border-surface-200 bg-white"
    >
      <div
        className="rounded-full flex items-center justify-center overflow-hidden shrink-0"
        style={{ width: 44, height: 44, background: '#E0E7FF' }}
      >
        {image ? (
          <img src={image} alt="" className="w-full h-full object-cover" />
        ) : (
          <span className="text-primary-700 font-bold text-sm">{initials}</span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-surface-900 truncate">{displayName}</p>
        <p className="text-xs text-surface-400 font-semibold">Level {level}</p>
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
  );
}
