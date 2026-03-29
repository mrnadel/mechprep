'use client';

import { memo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Quest } from '@/data/engagement-types';
import { playSound } from '@/lib/sounds';

interface Props {
  quest: Quest;
  onClaim: (questId: string) => void;
  compact?: boolean;
}

export const QuestCard = memo(function QuestCard({ quest, onClaim, compact = false }: Props) {
  const progressPercent = Math.min((quest.progress / quest.target) * 100, 100);
  const isComplete = quest.completed;
  const isClaimed = quest.claimed;
  const [justClaimed, setJustClaimed] = useState(false);

  const handleClaim = useCallback((questId: string) => {
    playSound('claimReward');
    setJustClaimed(true);
    onClaim(questId);
  }, [onClaim]);

  if (compact) {
    return (
      <motion.div
        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-gray-50/80 hover:bg-gray-100/80 transition-colors"
        animate={isComplete && !isClaimed && !justClaimed ? { backgroundColor: ['rgba(249,250,251,0.8)', 'rgba(220,252,231,0.5)', 'rgba(249,250,251,0.8)'] } : undefined}
        transition={isComplete && !isClaimed && !justClaimed ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : undefined}
      >
        {/* Icon */}
        <div
          className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg text-base"
          style={{ background: isComplete ? '#DCFCE7' : '#EFF6FF' }}
        >
          {quest.icon}
        </div>

        {/* Center */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[13px] font-bold text-gray-800 truncate">{quest.title}</span>
            <span className="text-[11px] font-semibold text-gray-400 shrink-0">
              {quest.progress}/{quest.target}
            </span>
          </div>
          {/* Progress bar */}
          <div className="h-1.5 bg-gray-200/60 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{
                background: isClaimed
                  ? '#A3E635'
                  : isComplete
                    ? 'linear-gradient(90deg, #34D399, #10B981)'
                    : 'linear-gradient(90deg, #818CF8, #3B82F6)',
              }}
            />
          </div>
        </div>

        {/* Right action */}
        <div className="flex-shrink-0">
          <AnimatePresence mode="wait">
            {isClaimed || justClaimed ? (
              <motion.div
                key="claimed"
                className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                <span className="text-emerald-500 text-sm font-bold">✓</span>
              </motion.div>
            ) : isComplete ? (
              <motion.button
                key="claim-btn"
                onClick={() => handleClaim(quest.definitionId)}
                className="px-3 py-2 rounded-lg text-[11px] font-extrabold text-white bg-emerald-500 hover:bg-emerald-600 shadow-sm shadow-emerald-200 min-h-[44px] min-w-[44px]"
                style={{ border: 'none', cursor: 'pointer' }}
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                whileTap={{ scale: 0.92 }}
                exit={{ scale: 1.3, opacity: 0 }}
              >
                Claim
              </motion.button>
            ) : (
              <motion.div
                key="reward"
                className="flex items-center gap-0.5 px-2 py-1 rounded-lg text-[11px] font-bold bg-amber-50 text-amber-700"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <span className="text-xs">💎</span>
                <span>{quest.reward.gems}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  }

  // Full-size card (used on /quests page)
  return (
    <div
      className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-gray-100 shadow-sm"
      style={{ minHeight: 72 }}
    >
      {/* Icon */}
      <div
        className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl text-xl"
        style={{ background: isComplete ? '#DCFCE7' : '#F0F7FF' }}
      >
        {quest.icon}
      </div>

      {/* Center: title + description + progress bar */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="text-sm font-bold text-gray-800 truncate">{quest.title}</span>
        </div>
        <p className="text-xs text-gray-500 mb-1.5 truncate">{quest.description}</p>

        {/* Progress bar */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{
                background: isComplete
                  ? 'linear-gradient(90deg, #34D399, #10B981)'
                  : 'linear-gradient(90deg, #818CF8, #3B82F6)',
              }}
            />
          </div>
          <span className="text-xs font-semibold text-gray-400 flex-shrink-0">
            {quest.progress}/{quest.target}
          </span>
        </div>
      </div>

      {/* Right: reward badge or claim button or checkmark */}
      <div className="flex-shrink-0 flex items-center">
        <AnimatePresence mode="wait">
          {isClaimed || justClaimed ? (
            <motion.div
              key="claimed"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              <span className="text-emerald-600 text-base">✓</span>
            </motion.div>
          ) : isComplete ? (
            <motion.button
              key="claim-btn"
              onClick={() => handleClaim(quest.definitionId)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 shadow-sm shadow-emerald-200 min-h-[44px]"
              style={{ border: 'none', cursor: 'pointer' }}
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              whileTap={{ scale: 0.95 }}
              exit={{ scale: 1.3, opacity: 0 }}
            >
              Claim
            </motion.button>
          ) : (
            <motion.div
              key="reward"
              className="flex items-center gap-0.5 px-2 py-1 rounded-lg text-xs font-bold bg-amber-50 text-amber-700"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <span>💎</span>
              <span>{quest.reward.gems}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
});
