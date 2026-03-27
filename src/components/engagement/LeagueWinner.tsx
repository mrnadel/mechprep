'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { useLeague, useEngagementStore } from '@/store/useEngagementStore';
import { leagueTiers } from '@/data/league';
import { GameButton } from '@/components/ui/GameButton';
import { FullScreenModal } from '@/components/ui/FullScreenModal';
import { Mascot } from '@/components/ui/Mascot';

export function LeagueWinner() {
  const league = useLeague();
  const winnerSeen = useEngagementStore((s) => s.league.winnerSeen ?? true);

  const result = league.lastWeekResult;
  const shouldShow = result !== null && result.rank === 1 && !league.resultSeen && !winnerSeen;

  const handleContinue = useCallback(() => {
    useEngagementStore.setState((st) => ({
      league: { ...st.league, winnerSeen: true },
    }));
  }, []);

  if (!shouldShow || !result) return null;

  const currentTier = leagueTiers.find((t) => t.tier === league.currentTier) ?? leagueTiers[0];

  return (
    <FullScreenModal
      show={shouldShow}
      bg="#E8850C"
      fx="fireworks"
      footer={<GameButton variant="gold" onClick={handleContinue}>Continue</GameButton>}
    >
      <motion.div
        initial={{ scale: 0.3, rotate: -15 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 14, delay: 0.15 }}
      >
        <Mascot pose="champion" size={200} />
      </motion.div>

      <motion.h2
        className="text-[28px] font-extrabold text-white mt-4 mb-2"
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
    </FullScreenModal>
  );
}
