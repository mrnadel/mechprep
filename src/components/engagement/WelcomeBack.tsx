'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEngagementStore, useComeback, useStreakEnhancements } from '@/store/useEngagementStore';
import { comebackQuests } from '@/data/quests';

export function WelcomeBack() {
  const comeback = useComeback();
  const streak = useStreakEnhancements();
  const [showRepair, setShowRepair] = useState(false);

  const dismiss = () => {
    useEngagementStore.setState((s) => ({
      comeback: { ...s.comeback, isInComebackFlow: false },
    }));
  };

  // Only show when in comeback flow and no comeback quests done yet
  if (!comeback.isInComebackFlow || comeback.comebackQuestsCompleted !== 0) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.55)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm"
          initial={{ scale: 0.9, opacity: 0, y: 24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 24 }}
          transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        >
          {/* Header */}
          <div className="text-center mb-5">
            <div className="text-5xl mb-3">👋</div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-1">
              Welcome back!
            </h2>
            <p className="text-sm text-gray-500">We missed you.</p>
          </div>

          {/* Days away */}
          <div
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl mb-4"
            style={{ background: '#F0F7FF' }}
          >
            <span className="text-sm font-semibold text-gray-600">
              You&apos;ve been away for{' '}
              <span className="font-extrabold text-blue-600">{comeback.daysAway} days</span>
            </span>
          </div>

          {/* Streak repair offer */}
          {streak.repairAvailable && !showRepair && (
            <div
              className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl mb-4"
              style={{ background: '#FEF2F2', border: '1px solid #FECACA' }}
            >
              <div>
                <p className="text-sm font-bold text-red-700">Your streak broke</p>
                <p className="text-xs text-red-500">
                  But you can still repair it with gems!
                </p>
              </div>
              <button
                onClick={() => setShowRepair(true)}
                className="flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold text-white"
                style={{ background: '#EF4444', border: 'none', cursor: 'pointer' }}
              >
                Repair
              </button>
            </div>
          )}

          {/* Comeback quests preview */}
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2">
              Your comeback quests
            </p>
            <div className="space-y-2">
              {comebackQuests.map((quest) => (
                <div
                  key={quest.id}
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: '#F9FAFB', border: '1px solid #F3F4F6' }}
                >
                  <span className="text-xl">{quest.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-800 truncate">{quest.title}</p>
                    <p className="text-xs text-gray-500 truncate">{quest.description}</p>
                  </div>
                  <div
                    className="flex items-center gap-0.5 px-2 py-1 rounded-lg text-xs font-bold flex-shrink-0"
                    style={{ background: '#FEF3C7', color: '#92400E' }}
                  >
                    <span>💎</span>
                    <span>{quest.reward.gems}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Let's Go button */}
          <button
            onClick={dismiss}
            className="w-full py-3 rounded-xl text-sm font-extrabold text-white transition-opacity"
            style={{ background: '#4F46E5', border: 'none', cursor: 'pointer' }}
          >
            Let&apos;s Go! 🚀
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
