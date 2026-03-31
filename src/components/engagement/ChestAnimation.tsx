'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollLock } from '@/hooks/useScrollLock';
import { playSound } from '@/lib/sounds';

interface Props {
  type: 'daily' | 'weekly';
  reward: { xp: number; gems: number };
  onClose: () => void;
  isOpen: boolean;
}

export function ChestAnimation({ type, reward, onClose, isOpen }: Props) {
  useScrollLock(isOpen);
  useEffect(() => { if (isOpen) playSound('chestOpen'); }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="chest-backdrop"
            className="fixed inset-0 z-50"
            style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="chest-modal"
            className="fixed inset-0 z-[60] flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-surface-900 rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center"
              role="dialog"
              aria-modal="true"
              aria-label={`${type === 'daily' ? 'Daily' : 'Weekly'} chest reward`}
              initial={{ scale: 0.7, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.7, y: 40 }}
              transition={{ type: 'spring', stiffness: 280, damping: 20 }}
            >
              {/* Title */}
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-surface-500 mb-2">
                {type === 'daily' ? 'Daily' : 'Weekly'} Chest
              </p>

              {/* Chest emoji */}
              <motion.div
                className="text-7xl mb-6"
                initial={{ scale: 0.4, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 14, delay: 0.15 }}
              >
                🎁
              </motion.div>

              {/* Rewards fly in */}
              <div className="flex items-center justify-center gap-6 mb-8">
                <motion.div
                  className="flex flex-col items-center gap-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <span className="text-2xl font-extrabold text-amber-500">+{reward.xp}</span>
                  <span className="text-xs font-semibold text-gray-400 dark:text-surface-500">XP</span>
                </motion.div>

                <div className="w-px h-8 bg-gray-100 dark:bg-surface-700" />

                <motion.div
                  className="flex flex-col items-center gap-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="text-2xl font-extrabold text-violet-600">
                    💎 +{reward.gems}
                  </span>
                  <span className="text-xs font-semibold text-gray-400 dark:text-surface-500">Gems</span>
                </motion.div>
              </div>

              {/* Collect button */}
              <motion.button
                onClick={onClose}
                className="w-full py-3.5 rounded-2xl text-sm font-bold text-white"
                style={{
                  background: '#7C3AED',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 0 #5B21B6',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65 }}
                whileTap={{ scale: 0.97 }}
              >
                Collect
              </motion.button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
