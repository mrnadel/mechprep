'use client';

import { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLeague, useEngagementStore } from '@/store/useEngagementStore';
import { leagueTiers } from '@/data/league';
import { LEAGUE_GEM_REWARD_PROMOTION } from '@/data/league';

export function LeaguePromotion() {
  const league = useLeague();
  const setResultSeen = useCallback(() => {
    useEngagementStore.setState((state) => ({
      league: { ...state.league, resultSeen: true },
    }));
  }, []);

  const shouldShow = league.lastWeekResult !== null && !league.resultSeen;

  if (!shouldShow || !league.lastWeekResult) return null;

  const result = league.lastWeekResult;
  const currentTier = leagueTiers.find((t) => t.tier === league.currentTier) ?? leagueTiers[0];

  const isPromoted = result.promoted;
  const isDemoted = result.demoted;

  const getContent = () => {
    if (isPromoted) {
      return {
        emoji: currentTier.icon,
        headline: `Promoted to ${currentTier.name}!`,
        subtext: `You earned +${LEAGUE_GEM_REWARD_PROMOTION} 💎 gems for finishing in the top ranks.`,
        bg: '#F0FDF4',
        accentColor: '#16A34A',
        buttonBg: '#16A34A',
        buttonShadow: '#15803D',
      };
    }
    if (isDemoted) {
      return {
        emoji: currentTier.icon,
        headline: `Moved to ${currentTier.name}`,
        subtext: "Don't give up — keep practicing and you'll climb back up.",
        bg: '#FEF2F2',
        accentColor: '#DC2626',
        buttonBg: '#4F46E5',
        buttonShadow: '#3730A3',
      };
    }
    return {
      emoji: currentTier.icon,
      headline: `Stayed in ${currentTier.name}`,
      subtext: 'Nice consistency! Keep it up to reach the promotion zone.',
      bg: '#EFF6FF',
      accentColor: '#3B82F6',
      buttonBg: '#4F46E5',
      buttonShadow: '#3730A3',
    };
  };

  const content = getContent();

  return (
    <AnimatePresence>
      {shouldShow && (
        <>
          {/* Backdrop */}
          <motion.div
            key="league-backdrop"
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Panel */}
          <motion.div
            key="league-promo-panel"
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="max-w-sm w-full rounded-3xl shadow-2xl overflow-hidden"
              style={{ background: content.bg }}
              initial={{ scale: 0.75, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.75, y: 50 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              {/* Content area */}
              <div className="px-8 py-10 text-center">
                {/* Tier icon */}
                <motion.div
                  className="text-7xl mb-4"
                  initial={{ scale: 0.3, rotate: -15 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 14, delay: 0.15 }}
                >
                  {content.emoji}
                </motion.div>

                {/* Headline */}
                <motion.h2
                  className="text-2xl font-extrabold mb-2"
                  style={{ color: content.accentColor }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {content.headline}
                </motion.h2>

                {/* Subtext */}
                <motion.p
                  className="text-sm text-gray-600 mb-6 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45 }}
                >
                  {content.subtext}
                </motion.p>

                {/* Result stats */}
                <motion.div
                  className="flex items-center justify-center gap-6 mb-8"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                >
                  <div className="text-center">
                    <p className="text-2xl font-extrabold text-gray-800">#{result.rank}</p>
                    <p className="text-xs text-gray-400 font-semibold">Final Rank</p>
                  </div>
                  {isPromoted && (
                    <>
                      <div className="w-px h-8 bg-gray-200" />
                      <div className="text-center">
                        <p className="text-2xl font-extrabold text-emerald-600">
                          +{LEAGUE_GEM_REWARD_PROMOTION} 💎
                        </p>
                        <p className="text-xs text-gray-400 font-semibold">Gems Earned</p>
                      </div>
                    </>
                  )}
                </motion.div>

                {/* Continue button */}
                <motion.button
                  onClick={setResultSeen}
                  className="w-full py-3.5 rounded-2xl text-sm font-bold text-white"
                  style={{
                    background: content.buttonBg,
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: `0 4px 0 ${content.buttonShadow}`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Continue
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
