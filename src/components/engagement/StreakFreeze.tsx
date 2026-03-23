'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import {
  useEngagementStore,
  useStreakEnhancements,
  useGems,
  useEngagementActions,
} from '@/store/useEngagementStore';

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
      if (success) {
        // repairStreak() already restores the streak and lastActiveDate in useStore
        dismissRepairModal();
      }
    };

    return (
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.5)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          >
            {/* Streak break icon */}
            <div className="flex justify-center mb-4">
              <div
                className="flex items-center justify-center w-16 h-16 rounded-full text-4xl"
                style={{ background: '#FEF2F2' }}
              >
                💔
              </div>
            </div>

            <h2 className="text-xl font-extrabold text-center text-gray-900 mb-1">
              Your streak broke!
            </h2>
            <p className="text-sm text-center text-gray-500 mb-5">
              You had a{' '}
              <span className="font-bold text-gray-700">
                {streak.lastStreakValueBeforeBreak}-day streak
              </span>
            </p>

            {/* Cost display */}
            <div
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl mb-5"
              style={{ background: '#F3E8FF' }}
            >
              <span className="text-lg">💎</span>
              <span className="text-xl font-extrabold" style={{ color: '#7C3AED' }}>
                {REPAIR_COST}
              </span>
              <span className="text-sm font-semibold text-gray-500">to repair</span>
            </div>

            {/* Repair button */}
            <button
              onClick={handleRepair}
              disabled={!canAfford}
              className="w-full py-3 rounded-xl text-sm font-bold text-white mb-2 transition-opacity"
              style={{
                background: canAfford ? '#7C3AED' : '#D1D5DB',
                border: 'none',
                cursor: canAfford ? 'pointer' : 'not-allowed',
                opacity: canAfford ? 1 : 0.7,
              }}
            >
              {canAfford ? 'Repair Streak' : `Need ${gemsNeeded} more 💎`}
            </button>

            {/* Skip button */}
            <button
              onClick={dismissRepairModal}
              className="w-full py-2.5 rounded-xl text-sm font-semibold text-gray-500 transition-colors"
              style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
            >
              Skip
            </button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return null;
}
