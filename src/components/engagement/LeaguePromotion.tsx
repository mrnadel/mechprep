'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { useLeague, useEngagementStore } from '@/store/useEngagementStore';
import { leagueTiers } from '@/data/league';
import { LEAGUE_GEM_REWARD_PROMOTION } from '@/data/league';
import { GameButton, type GameButtonVariant } from '@/components/ui/GameButton';
import { FullScreenModal } from '@/components/ui/FullScreenModal';
import { LeagueImage } from '@/components/icons/LeagueImage';
import type { FXName } from '@/components/ui/ScreenFX';

export function LeaguePromotion() {
  const league = useLeague();
  const setResultSeen = useCallback(() => {
    useEngagementStore.setState((state) => ({ league: { ...state.league, resultSeen: true } }));
  }, []);

  const shouldShow = league.lastWeekResult !== null && !league.resultSeen;
  if (!shouldShow || !league.lastWeekResult) return null;

  const result = league.lastWeekResult;
  const currentTier = leagueTiers.find((t) => t.tier === league.currentTier) ?? leagueTiers[0];
  const isPromoted = result.promoted;
  const isDemoted = result.demoted;

  const content = isPromoted ? {
    headline: `Promoted to ${currentTier.name}!`, subtext: `You earned +${LEAGUE_GEM_REWARD_PROMOTION} gems for finishing in the top ranks.`,
    bg: '#58A700', buttonVariant: 'green' as GameButtonVariant, fx: 'confetti' as FXName,
  } : isDemoted ? {
    headline: `Moved to ${currentTier.name}`, subtext: "Keep practicing and you'll climb back.",
    bg: '#CE3030', buttonVariant: 'indigo' as GameButtonVariant, fx: 'hearts' as FXName,
  } : {
    headline: `Stayed in ${currentTier.name}`, subtext: 'Keep it up to reach the promotion zone.',
    bg: '#1899D6', buttonVariant: 'indigo' as GameButtonVariant, fx: 'bubbles' as FXName,
  };

  return (
    <FullScreenModal
      show={shouldShow}
      bg={content.bg}
      fx={content.fx}
      footer={
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
          <GameButton variant={content.buttonVariant} onClick={setResultSeen}>Continue</GameButton>
        </motion.div>
      }
    >
      <motion.div className="relative mb-4" initial={{ scale: 0.3, rotate: -15 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 280, damping: 14, delay: 0.15 }}>
        <LeagueImage tier={currentTier} size={140} className="relative" />
      </motion.div>

      <motion.h2 className="text-[26px] font-extrabold mb-2 text-white" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>{content.headline}</motion.h2>

      <motion.div className="flex items-center justify-center gap-6 mt-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
        <div className="text-center"><p className="text-2xl font-extrabold text-white">#{result.rank}</p><p className="text-xs text-white/50 font-semibold">Final Rank</p></div>
        {isPromoted && (<><div className="w-px h-8 bg-white/20" /><div className="text-center"><p className="text-2xl font-extrabold text-white">+{LEAGUE_GEM_REWARD_PROMOTION}</p><p className="text-xs text-white/50 font-semibold">Gems Earned</p></div></>)}
      </motion.div>
    </FullScreenModal>
  );
}
