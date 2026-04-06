'use client';

import { motion } from 'framer-motion';
import { UserAvatar } from '@/components/ui/UserAvatar';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { GameButton } from '@/components/ui/GameButton';

export interface FriendQuestData {
  id: string;
  type: string;
  title: string;
  description: string;
  icon: string;
  target: number;
  myProgress: number;
  partnerProgress: number;
  completed: boolean;
  rewardClaimed: boolean;
  rewardXp: number;
  rewardGems: number;
  partner: {
    id: string;
    displayName: string | null;
    image: string | null;
    level: number | null;
  };
}

interface FriendQuestCardProps {
  quest: FriendQuestData;
  onClaim?: (questId: string) => void;
  index?: number;
}

export function FriendQuestCard({ quest, onClaim, index = 0 }: FriendQuestCardProps) {
  const combinedProgress = quest.type === 'combined_accuracy'
    ? Math.min(quest.myProgress, quest.partnerProgress) // both must meet threshold
    : quest.myProgress + quest.partnerProgress;
  const progressPct = Math.min(100, Math.round((combinedProgress / quest.target) * 100));

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="rounded-2xl border-2 border-[#E5E5E5] dark:border-surface-700 bg-white dark:bg-surface-900 p-4 space-y-3"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <span className="text-2xl">{quest.icon}</span>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-surface-900 dark:text-surface-100 truncate">
            {quest.title}
          </h3>
          <p className="text-xs text-surface-500 truncate">{quest.description}</p>
        </div>
        {quest.completed && !quest.rewardClaimed && onClaim && (
          <GameButton
            variant="gold"
            onClick={() => onClaim(quest.id)}
            className="text-xs px-3 py-1.5"
          >
            Claim
          </GameButton>
        )}
        {quest.rewardClaimed && (
          <span className="text-xs font-bold text-green-500">Claimed</span>
        )}
      </div>

      {/* Progress */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-semibold text-surface-500">
            {combinedProgress} / {quest.target}
          </span>
          <span className="text-xs font-bold text-surface-400">{progressPct}%</span>
        </div>
        <ProgressBar percent={progressPct} />
      </div>

      {/* Both users' contributions */}
      <div className="flex items-center gap-4">
        {/* You */}
        <div className="flex items-center gap-2 flex-1">
          <div className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
            <span className="text-[10px] font-bold text-primary-600">You</span>
          </div>
          <div className="flex-1 h-1.5 rounded-full bg-surface-100 dark:bg-surface-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-primary-500 transition-all duration-500"
              style={{ width: `${Math.min(100, (quest.myProgress / Math.max(1, quest.target)) * 100)}%` }}
            />
          </div>
          <span className="text-[10px] font-bold text-surface-500 tabular-nums w-8 text-right">
            {quest.myProgress}
          </span>
        </div>

        {/* Partner */}
        <div className="flex items-center gap-2 flex-1">
          <UserAvatar
            image={quest.partner.image}
            name={quest.partner.displayName || 'Friend'}
            size={24}
          />
          <div className="flex-1 h-1.5 rounded-full bg-surface-100 dark:bg-surface-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-amber-400 transition-all duration-500"
              style={{ width: `${Math.min(100, (quest.partnerProgress / Math.max(1, quest.target)) * 100)}%` }}
            />
          </div>
          <span className="text-[10px] font-bold text-surface-500 tabular-nums w-8 text-right">
            {quest.partnerProgress}
          </span>
        </div>
      </div>

      {/* Reward preview */}
      <div className="flex items-center gap-3 text-[10px] font-bold text-surface-400">
        <span>Reward: {quest.rewardXp} XP</span>
        <span>+{quest.rewardGems} gems</span>
      </div>
    </motion.div>
  );
}
