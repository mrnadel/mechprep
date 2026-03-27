'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEngagementStore, useComeback, useStreakEnhancements } from '@/store/useEngagementStore';
import { comebackQuests } from '@/data/quests';
import { GameButton } from '@/components/ui/GameButton';
import { FloatingParticles } from '@/components/ui/FloatingParticles';

export function WelcomeBack() {
  const comeback = useComeback();
  const streak = useStreakEnhancements();
  const [showRepair, setShowRepair] = useState(false);

  const dismiss = () => {
    useEngagementStore.setState((s) => ({
      comeback: { ...s.comeback, isInComebackFlow: false },
    }));
  };

  if (!comeback.isInComebackFlow || comeback.comebackQuestsCompleted !== 0) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center sm:p-4"
        style={{ background: 'rgba(0,0,0,0.55)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-[#EFF6FF] w-full h-full sm:h-auto sm:max-w-sm sm:rounded-2xl sm:shadow-2xl overflow-y-auto flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-labelledby="welcome-back-title"
          initial={{ scale: 0.9, opacity: 0, y: 24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 24 }}
          transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        >
          <FloatingParticles color="rgba(59,130,246,0.3)" count={5} drift />

          {/* Content — centered */}
          <div className="flex-1 flex flex-col justify-center sm:flex-initial relative z-[1] p-6">
            <div className="text-center mb-5">
              <div className="text-5xl mb-3" aria-hidden="true">👋</div>
              <h2 id="welcome-back-title" className="text-2xl font-extrabold text-gray-900 mb-1">
                Welcome back!
              </h2>
              <p className="text-sm text-gray-500">We missed you.</p>
            </div>

            <div
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl mb-4"
              style={{ background: 'rgba(255,255,255,0.8)' }}
            >
              <span className="text-sm font-semibold text-gray-600">
                You&apos;ve been away for{' '}
                <span className="font-extrabold text-blue-600">{comeback.daysAway} days</span>
              </span>
            </div>

            {streak.repairAvailable && !showRepair && (
              <div
                className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl mb-4"
                style={{ background: '#FEF2F2', border: '1px solid #FECACA' }}
              >
                <div>
                  <p className="text-sm font-bold text-red-700">Your streak broke</p>
                  <p className="text-xs text-red-500">Repair it with gems!</p>
                </div>
                <button
                  onClick={() => setShowRepair(true)}
                  className="flex-shrink-0 px-4 py-2 rounded-xl text-xs font-extrabold text-white min-h-[44px]"
                  style={{ background: '#EF4444', boxShadow: '0 3px 0 #B91C1C', border: 'none', cursor: 'pointer' }}
                >
                  Repair
                </button>
              </div>
            )}

            <div className="mb-4">
              <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2">
                Comeback quests
              </p>
              <div className="space-y-2">
                {comebackQuests.map((quest) => (
                  <div
                    key={quest.id}
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.8)' }}
                  >
                    <span className="text-xl">{quest.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-800 truncate">{quest.title}</p>
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
          </div>

          {/* Footer — pinned bottom */}
          <div className="shrink-0 px-6 pb-8 sm:pb-5 relative z-[1]">
            <GameButton variant="indigo" onClick={dismiss}>
              Let&apos;s Go! 🚀
            </GameButton>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
