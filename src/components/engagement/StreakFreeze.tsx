'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import {
  useEngagementStore,
  useStreakEnhancements,
  useGems,
  useEngagementActions,
} from '@/store/useEngagementStore';
import { GameButton } from '@/components/ui/GameButton';
import { FloatingParticles } from '@/components/ui/FloatingParticles';

const REPAIR_COST = 50;

export function StreakFreeze() {
  const streak = useStreakEnhancements();
  const gems = useGems();
  const { repairStreak } = useEngagementActions();

  const dismissFreezeBanner = () => {
    useEngagementStore.setState((s) => ({
      streak: { ...s.streak, freezeUsedToday: false },
    }));
  };

  const dismissRepairModal = () => {
    useEngagementStore.setState((s) => ({
      streak: { ...s.streak, repairAvailable: false },
    }));
  };

  // --- Mode 1: Freeze notification banner ---
  if (streak.freezeUsedToday) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl"
        style={{ background: '#DBEAFE', border: '1px solid #93C5FD' }}
      >
        <span className="text-sm font-semibold" style={{ color: '#1D4ED8' }}>
          🧊 Your streak freeze saved your streak yesterday!
        </span>
        <button
          onClick={dismissFreezeBanner}
          className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full transition-colors"
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#3B82F6' }}
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    );
  }

  // --- Mode 2: Repair modal ---
  if (streak.repairAvailable) {
    const canAfford = gems.balance >= REPAIR_COST;
    const gemsNeeded = REPAIR_COST - gems.balance;

    const handleRepair = () => {
      const success = repairStreak();
      if (success) dismissRepairModal();
    };

    return (
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center sm:p-4"
          style={{ background: 'rgba(0,0,0,0.5)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gradient-to-b from-violet-500 to-purple-600 w-full h-full sm:h-auto sm:max-w-sm sm:rounded-2xl sm:shadow-xl overflow-y-auto flex flex-col"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          >
            <FloatingParticles color="rgba(255,255,255,0.12)" count={5} drift />

            {/* Content — centered */}
            <div className="flex-1 flex flex-col items-center justify-center sm:flex-initial relative z-[1] p-6 text-center text-white">
              <div className="flex items-center justify-center w-16 h-16 rounded-full text-4xl mb-4 bg-white/15">
                💔
              </div>

              <h2 className="text-xl font-extrabold text-white mb-1">
                Your streak broke!
              </h2>
              <p className="text-sm text-white/60 mb-5">
                You had a{' '}
                <span className="font-bold text-white">
                  {streak.lastStreakValueBeforeBreak}-day streak
                </span>
              </p>

              <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/15 backdrop-blur-sm">
                <span className="text-lg">💎</span>
                <span className="text-xl font-extrabold text-white">{REPAIR_COST}</span>
                <span className="text-sm font-semibold text-white/60">to repair</span>
              </div>
            </div>

            {/* Footer — pinned bottom */}
            <div className="shrink-0 px-6 pb-8 sm:pb-5 relative z-[1]">
              <GameButton
                variant="purple"
                onClick={handleRepair}
                disabled={!canAfford}
              >
                {canAfford ? 'Repair Streak' : `Need ${gemsNeeded} more 💎`}
              </GameButton>
              <button
                onClick={dismissRepairModal}
                className="w-full py-2.5 mt-2 rounded-xl text-sm font-semibold text-white/60 hover:text-white/80 transition-colors"
                style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
              >
                Skip
              </button>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return null;
}
