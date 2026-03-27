'use client';

import { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLeague, useEngagementStore } from '@/store/useEngagementStore';
import { leagueTiers } from '@/data/league';
import { GameButton } from '@/components/ui/GameButton';
import { FloatingParticles } from '@/components/ui/FloatingParticles';
import { Mascot } from '@/components/ui/Mascot';

/**
 * Shown when user finishes #1 in their league.
 * Renders BEFORE LeaguePromotion — caller should check rank === 1.
 */
export function LeagueWinner() {
  const league = useLeague();
  const [winnerSeen, setWinnerSeen] = useEngagementStore((s) => [
    s.league.winnerSeen ?? true,
    () => useEngagementStore.setState((st) => ({
      league: { ...st.league, winnerSeen: true },
    })),
  ]);

  const result = league.lastWeekResult;
  const shouldShow = result !== null && result.rank === 1 && !league.resultSeen && !winnerSeen;

  const handleContinue = useCallback(() => {
    setWinnerSeen();
  }, [setWinnerSeen]);

  if (!shouldShow || !result) return null;

  const currentTier = leagueTiers.find((t) => t.tier === league.currentTier) ?? leagueTiers[0];

  return (
    <AnimatePresence>
      {shouldShow && (
        <>
          <motion.div
            key="winner-backdrop"
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            key="winner-panel"
            className="fixed inset-0 z-50 flex items-center justify-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full h-full sm:h-auto sm:max-w-sm sm:rounded-3xl sm:shadow-2xl overflow-y-auto flex flex-col"
              style={{ background: '#E8850C' }}
              initial={{ scale: 0.75, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.75, y: 50 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <FloatingParticles color="rgba(255,255,255,0.06)" intensity="celebration" />

              {/* Content — upper area */}
              <div className="flex-1 flex flex-col items-center sm:flex-initial relative z-[1] px-8 pt-[15vh] sm:pt-10 text-center text-white">
                <motion.div
                  initial={{ scale: 0.3, rotate: -15 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 14, delay: 0.15 }}
                >
                  <Mascot pose="champion" size={200} />
                </motion.div>

                <motion.h2
                  className="text-[28px] font-extrabold mb-2 text-white mt-4"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  1st Place!
                </motion.h2>

                <motion.p
                  className="text-base text-white/70 font-semibold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45 }}
                >
                  You won the {currentTier.name} League!
                </motion.p>
              </div>

              {/* Footer — pinned bottom */}
              <div className="shrink-0 px-8 pb-8 sm:pb-6 relative z-[1]">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <GameButton variant="gold" onClick={handleContinue}>
                    Continue
                  </GameButton>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
