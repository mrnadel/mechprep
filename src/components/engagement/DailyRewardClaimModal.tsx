'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FullScreenModal } from '@/components/ui/FullScreenModal';
import { MascotWithGlow } from '@/components/ui/MascotWithGlow';
import { DailyRewardCalendar } from './DailyRewardCalendar';
import { DAILY_REWARD_CYCLE } from '@/data/daily-rewards';
import type { MysteryReward } from '@/data/daily-rewards';
import { useDailyRewardCalendar, useEngagementActions, useComeback } from '@/store/useEngagementStore';
import { getTodayDate } from '@/lib/quest-engine';
import { playSound } from '@/lib/sounds';
import type { FXName } from '@/components/ui/ScreenFX';

interface ClaimedResult {
  gems: number;
  xp: number;
  bonusType?: string;
  mystery?: MysteryReward;
}

export function DailyRewardClaimModal() {
  const calendar = useDailyRewardCalendar();
  const comeback = useComeback();
  const { claimDailyReward } = useEngagementActions();
  const [claimedReward, setClaimedReward] = useState<ClaimedResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  const today = getTodayDate();

  // Don't show if already claimed today
  if (calendar.todayClaimed && calendar.lastClaimDate === today) return null;
  // Don't show for first-time users (never claimed before)
  if (calendar.lastClaimDate === null) return null;
  // Don't show during comeback flow
  if (comeback.isInComebackFlow) return null;
  // If already showing result, keep showing
  const shouldShow = !calendar.todayClaimed || showResult;
  if (!shouldShow && !showResult) return null;

  const currentReward = DAILY_REWARD_CYCLE[calendar.currentDay - 1];
  if (!currentReward) return null;

  const isMilestone = currentReward.isMilestone;
  const fx: FXName = isMilestone ? 'confetti' : 'sparkle-dust';

  const handleClaim = () => {
    const result = claimDailyReward();
    if (result) {
      if (currentReward.day === 7) {
        playSound('chestOpen');
      } else {
        playSound('dailyRewardClaim');
      }
      setClaimedReward(result);
      setShowResult(true);
    }
  };

  const handleClose = () => {
    setShowResult(false);
    setClaimedReward(null);
  };

  // Phase 1: Show calendar + claim button
  if (!showResult) {
    return (
      <FullScreenModal
        show
        bg="linear-gradient(to bottom, #1E293B 0%, #0F172A 100%)"
        closable={false}
        labelId="daily-reward-modal"
      >
        <MascotWithGlow pose="chest-reward" size={100} glowColor="rgba(245,158,11,0.3)" />

        <motion.h2
          id="daily-reward-modal"
          className="text-2xl font-extrabold mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          Day {calendar.currentDay} Reward!
        </motion.h2>

        <motion.p
          className="text-white/60 text-sm mt-1 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          Claim your daily reward
        </motion.p>

        <motion.div
          className="w-full max-w-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <DailyRewardCalendar />
        </motion.div>

        <motion.div
          className="w-full max-w-xs mt-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.45, type: 'spring', stiffness: 300 }}
        >
          <button
            onClick={handleClaim}
            className="w-full py-3.5 rounded-xl text-base font-extrabold tracking-wide transition-all active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #F59E0B, #D97706)',
              color: '#FFF',
              boxShadow: '0 4px 20px rgba(245,158,11,0.4)',
            }}
          >
            Claim Reward!
          </button>
        </motion.div>
      </FullScreenModal>
    );
  }

  // Phase 2: Show reward reveal
  return (
    <FullScreenModal
      show
      bg="linear-gradient(to bottom, #1E293B 0%, #0F172A 100%)"
      fx={fx}
      closable
      onClose={handleClose}
      labelId="daily-reward-result"
      footer={
        <button
          onClick={handleClose}
          className="w-full py-3.5 rounded-xl text-base font-extrabold tracking-wide transition-all active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #10B981, #059669)',
            color: '#FFF',
            boxShadow: '0 4px 20px rgba(16,185,129,0.4)',
          }}
        >
          Continue
        </button>
      }
    >
      <AnimatePresence>
        {claimedReward && (
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <motion.div
              className="text-6xl"
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 15,
                delay: 0.1,
              }}
            >
              {currentReward.icon}
            </motion.div>

            <h2
              id="daily-reward-result"
              className="text-2xl font-extrabold"
            >
              Reward Claimed!
            </h2>

            <div className="flex items-center gap-6 mt-2">
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-3xl font-extrabold text-amber-400">
                  +{claimedReward.gems}
                </span>
                <span className="text-xs text-white/60 font-semibold mt-0.5">
                  Gems
                </span>
              </motion.div>

              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="text-3xl font-extrabold text-emerald-400">
                  +{claimedReward.xp}
                </span>
                <span className="text-xs text-white/60 font-semibold mt-0.5">
                  XP
                </span>
              </motion.div>
            </div>

            {/* Streak freeze bonus on Day 4 */}
            {claimedReward.bonusType === 'streak_freeze' && (
              <motion.div
                className="flex items-center gap-2 mt-2 px-4 py-2 rounded-lg"
                style={{
                  background: 'rgba(6,182,212,0.15)',
                  border: '1px solid rgba(6,182,212,0.3)',
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <span className="text-lg">🧊</span>
                <span className="text-sm font-bold text-cyan-300">
                  +1 Streak Freeze
                </span>
              </motion.div>
            )}

            {/* Mystery reward on Day 7 */}
            {claimedReward.mystery && (
              <motion.div
                className="flex items-center gap-2 mt-2 px-4 py-2 rounded-lg"
                style={{
                  background: 'rgba(139,92,246,0.15)',
                  border: '1px solid rgba(139,92,246,0.3)',
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <span className="text-lg">{claimedReward.mystery.icon}</span>
                <span className="text-sm font-bold text-violet-300">
                  {claimedReward.mystery.label}
                </span>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </FullScreenModal>
  );
}
