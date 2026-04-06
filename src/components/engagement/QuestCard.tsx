'use client';

import { memo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Quest, QuestRarity } from '@/data/engagement-types';
import { playSound } from '@/lib/sounds';
import { useIsDark } from '@/store/useThemeStore';
import { CurrencyIcon } from '@/components/ui/CurrencyIcon';

interface Props {
  quest: Quest;
  onClaim: (questId: string) => void;
  onOpenChest?: (quest: Quest) => void;
  compact?: boolean;
}

// ---- Rarity theme system ----

interface RarityTheme {
  label: string;
  // Icon container
  iconBg: string;
  iconBgDark: string;
  // Card surface
  cardBg: string;
  cardBgDark: string;
  cardBorder: string;
  cardBorderDark: string;
  // 3D shadow under card
  shadow: string;
  shadowDark: string;
  // Text
  titleColor: string;
  titleColorDark: string;
  descColor: string;
  descColorDark: string;
  counterColor: string;
  counterColorDark: string;
  // Badge
  badgeBg: string;
  badgeBgDark: string;
  badgeBorder: string;
  badgeBorderDark: string;
  badgeText: string;
  badgeTextDark: string;
  // Progress bar
  barTrack: string;
  barTrackDark: string;
  barFill: string;
  // Rewards
  gemColor: string;
  gemColorDark: string;
  xpColor: string;
  xpColorDark: string;
  // Compact mode (home widget)
  compactIconBg: string;
  compactIconBgDark: string;
  compactBadgeBg: string;
  compactBadgeBgDark: string;
  compactBadgeText: string;
}

const RARITY: Record<QuestRarity, RarityTheme> = {
  common: {
    label: 'Common',
    iconBg: '#E2E8F0',
    iconBgDark: 'rgba(100,116,139,0.2)',
    cardBg: '#FFFFFF',
    cardBgDark: 'rgba(30,41,59,0.85)',
    cardBorder: '1.5px solid rgba(203,213,225,0.7)',
    cardBorderDark: '1.5px solid rgba(71,85,105,0.4)',
    shadow: 'rgba(148,163,184,0.35)',
    shadowDark: 'rgba(0,0,0,0.35)',
    titleColor: '#1E293B',
    titleColorDark: '#F1F5F9',
    descColor: '#64748B',
    descColorDark: '#94A3B8',
    counterColor: '#64748B',
    counterColorDark: '#94A3B8',
    badgeBg: '#F1F5F9',
    badgeBgDark: 'rgba(100,116,139,0.25)',
    badgeBorder: 'rgba(203,213,225,0.8)',
    badgeBorderDark: 'rgba(100,116,139,0.3)',
    badgeText: '#64748B',
    badgeTextDark: '#94A3B8',
    barTrack: 'rgba(203,213,225,0.6)',
    barTrackDark: 'rgba(71,85,105,0.5)',
    barFill: 'linear-gradient(90deg, #94A3B8, #64748B)',
    gemColor: '#059669',
    gemColorDark: '#34D399',
    xpColor: '#D97706',
    xpColorDark: '#FBBF24',
    compactIconBg: '#F1F5F9',
    compactIconBgDark: 'rgba(148,163,184,0.15)',
    compactBadgeBg: '#F1F5F9',
    compactBadgeBgDark: 'rgba(148,163,184,0.2)',
    compactBadgeText: '#64748B',
  },
  rare: {
    label: 'Rare',
    iconBg: '#93C5FD',
    iconBgDark: 'rgba(59,130,246,0.3)',
    cardBg: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
    cardBgDark: 'linear-gradient(135deg, rgba(23,37,84,0.6) 0%, rgba(30,58,138,0.5) 100%)',
    cardBorder: '1.5px solid rgba(147,197,253,0.7)',
    cardBorderDark: '1.5px solid rgba(59,130,246,0.35)',
    shadow: 'rgba(59,130,246,0.3)',
    shadowDark: 'rgba(29,78,216,0.35)',
    titleColor: '#1E3A5F',
    titleColorDark: '#BFDBFE',
    descColor: '#3B6EA5',
    descColorDark: '#93C5FD',
    counterColor: '#2563EB',
    counterColorDark: '#60A5FA',
    badgeBg: 'rgba(191,219,254,0.6)',
    badgeBgDark: 'rgba(59,130,246,0.2)',
    badgeBorder: 'rgba(147,197,253,0.8)',
    badgeBorderDark: 'rgba(96,165,250,0.3)',
    badgeText: '#2563EB',
    badgeTextDark: '#60A5FA',
    barTrack: 'rgba(191,219,254,0.6)',
    barTrackDark: 'rgba(30,58,138,0.5)',
    barFill: 'linear-gradient(90deg, #3B82F6, #60A5FA)',
    gemColor: '#059669',
    gemColorDark: '#34D399',
    xpColor: '#2563EB',
    xpColorDark: '#60A5FA',
    compactIconBg: '#DBEAFE',
    compactIconBgDark: 'rgba(59,130,246,0.15)',
    compactBadgeBg: '#DBEAFE',
    compactBadgeBgDark: 'rgba(59,130,246,0.2)',
    compactBadgeText: '#2563EB',
  },
  epic: {
    label: 'Epic',
    iconBg: 'rgba(109,40,217,0.35)',
    iconBgDark: 'rgba(139,92,246,0.3)',
    cardBg: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 40%, #8B5CF6 100%)',
    cardBgDark: 'linear-gradient(135deg, #4C1D95 0%, #5B21B6 40%, #6D28D9 100%)',
    cardBorder: '2px solid rgba(167,139,250,0.5)',
    cardBorderDark: '2px solid rgba(139,92,246,0.5)',
    shadow: 'rgba(91,33,182,0.45)',
    shadowDark: 'rgba(76,29,149,0.5)',
    titleColor: '#FFFFFF',
    titleColorDark: '#FFFFFF',
    descColor: 'rgba(237,233,254,0.85)',
    descColorDark: 'rgba(221,214,254,0.8)',
    counterColor: 'rgba(255,255,255,0.9)',
    counterColorDark: 'rgba(255,255,255,0.85)',
    badgeBg: 'rgba(91,33,182,0.5)',
    badgeBgDark: 'rgba(76,29,149,0.5)',
    badgeBorder: 'rgba(167,139,250,0.4)',
    badgeBorderDark: 'rgba(139,92,246,0.4)',
    badgeText: '#EDE9FE',
    badgeTextDark: '#DDD6FE',
    barTrack: 'rgba(91,33,182,0.4)',
    barTrackDark: 'rgba(76,29,149,0.5)',
    barFill: 'linear-gradient(90deg, #FBBF24, #F59E0B)',
    gemColor: '#FFFFFF',
    gemColorDark: '#FFFFFF',
    xpColor: '#DDD6FE',
    xpColorDark: '#C4B5FD',
    compactIconBg: '#EDE9FE',
    compactIconBgDark: 'rgba(139,92,246,0.15)',
    compactBadgeBg: '#EDE9FE',
    compactBadgeBgDark: 'rgba(139,92,246,0.2)',
    compactBadgeText: '#7C3AED',
  },
  legendary: {
    label: 'Legendary',
    iconBg: 'rgba(180,83,9,0.3)',
    iconBgDark: 'rgba(245,158,11,0.3)',
    cardBg: 'linear-gradient(135deg, #F59E0B 0%, #EAB308 40%, #FBBF24 100%)',
    cardBgDark: 'linear-gradient(135deg, #92400E 0%, #A16207 40%, #B45309 100%)',
    cardBorder: '2.5px solid rgba(251,191,36,0.7)',
    cardBorderDark: '2.5px solid rgba(245,158,11,0.6)',
    shadow: 'rgba(180,83,9,0.45)',
    shadowDark: 'rgba(120,53,15,0.5)',
    titleColor: '#451A03',
    titleColorDark: '#FFFFFF',
    descColor: '#78350F',
    descColorDark: 'rgba(254,243,199,0.85)',
    counterColor: '#78350F',
    counterColorDark: 'rgba(255,255,255,0.9)',
    badgeBg: 'rgba(180,83,9,0.35)',
    badgeBgDark: 'rgba(180,83,9,0.5)',
    badgeBorder: 'rgba(217,119,6,0.5)',
    badgeBorderDark: 'rgba(245,158,11,0.5)',
    badgeText: '#FEF3C7',
    badgeTextDark: '#FEF3C7',
    barTrack: 'rgba(180,83,9,0.25)',
    barTrackDark: 'rgba(120,53,15,0.5)',
    barFill: 'linear-gradient(90deg, #FEF3C7, #FDE68A)',
    gemColor: '#451A03',
    gemColorDark: '#FFFFFF',
    xpColor: '#78350F',
    xpColorDark: '#FEF3C7',
    compactIconBg: '#FEF3C7',
    compactIconBgDark: 'rgba(245,158,11,0.15)',
    compactBadgeBg: '#FEF3C7',
    compactBadgeBgDark: 'rgba(245,158,11,0.2)',
    compactBadgeText: '#D97706',
  },
};

// ---- Sparkle decorations for legendary ----
function LegendarySparkles({ isDark }: { isDark: boolean }) {
  const color = isDark ? 'rgba(254,243,199,0.6)' : 'rgba(120,53,15,0.25)';
  const sparkles = [
    { left: '88%', top: '10%', delay: 0, size: 10 },
    { left: '78%', top: '75%', delay: 1.2, size: 8 },
    { left: '18%', top: '8%', delay: 0.6, size: 7 },
    { left: '93%', top: '48%', delay: 1.8, size: 9 },
    { left: '50%', top: '5%', delay: 0.3, size: 6 },
  ];

  return (
    <>
      {sparkles.map((s, i) => (
        <motion.span
          key={i}
          className="absolute pointer-events-none select-none"
          style={{ left: s.left, top: s.top, fontSize: s.size, color, lineHeight: 1 }}
          animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.7, 1.1, 0.7] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
        >
          ✦
        </motion.span>
      ))}
    </>
  );
}

/** Render icon as <img> if it's a path, or as emoji text */
function QuestIcon({ icon, size }: { icon: string; size: number }) {
  if (icon.startsWith('/')) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={icon} alt="" width={size} height={size} style={{ objectFit: 'contain' }} />;
  }
  return <span style={{ fontSize: size * 0.65, lineHeight: 1 }}>{icon}</span>;
}

export const QuestCard = memo(function QuestCard({ quest, onClaim, onOpenChest, compact = false }: Props) {
  const progressPercent = Math.min((quest.progress / quest.target) * 100, 100);
  const isComplete = quest.completed;
  const isClaimed = quest.claimed;
  const [claimPhase, setClaimPhase] = useState<'idle' | 'celebrating' | 'done'>('idle');
  const isDark = useIsDark();
  const theme = RARITY[quest.rarity] ?? RARITY.common;
  const isEpic = quest.rarity === 'epic';
  const isLegendary = quest.rarity === 'legendary';
  const isElevated = isEpic || isLegendary;

  const showClaimed = isClaimed || claimPhase !== 'idle';

  const handleClaim = useCallback(
    (questId: string) => {
      playSound('claimReward');
      setClaimPhase('celebrating');
      onClaim(questId);
      setTimeout(() => setClaimPhase('done'), 1400);
    },
    [onClaim],
  );

  // ---------- Compact card (home page widget) ----------
  if (compact) {
    return (
      <motion.div
        className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-colors ${
          isDark ? 'bg-surface-800/80 hover:bg-surface-700/80' : 'bg-gray-50/80 hover:bg-gray-100/80'
        }`}
        animate={
          isComplete && !showClaimed
            ? {
                backgroundColor: isDark
                  ? ['rgba(30,41,59,0.8)', 'rgba(6,78,59,0.3)', 'rgba(30,41,59,0.8)']
                  : ['rgba(249,250,251,0.8)', 'rgba(220,252,231,0.5)', 'rgba(249,250,251,0.8)'],
              }
            : undefined
        }
        transition={isComplete && !showClaimed ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : undefined}
      >
        <div
          className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg"
          style={{
            background: isComplete
              ? isDark ? 'rgba(6,78,59,0.4)' : '#DCFCE7'
              : isDark ? theme.compactIconBgDark : theme.compactIconBg,
          }}
        >
          <QuestIcon icon={quest.icon} size={28} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-[13px] font-bold text-gray-800 dark:text-surface-100 truncate">{quest.title}</span>
              {quest.rarity !== 'common' && (
                <span
                  className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full shrink-0"
                  style={{
                    background: isDark ? theme.compactBadgeBgDark : theme.compactBadgeBg,
                    color: theme.compactBadgeText,
                  }}
                >
                  {theme.label}
                </span>
              )}
            </div>
            <span className="text-[11px] font-semibold text-gray-400 dark:text-surface-500 shrink-0">
              {quest.progress}/{quest.target}
            </span>
          </div>
          <div className="h-1.5 bg-gray-200/60 dark:bg-surface-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{
                background: showClaimed ? '#A3E635'
                  : isComplete ? 'linear-gradient(90deg, #34D399, #10B981)'
                  : theme.barFill,
              }}
            />
          </div>
        </div>
        <div className="flex-shrink-0">
          <AnimatePresence mode="wait">
            {showClaimed ? (
              claimPhase === 'celebrating' ? (
                <motion.div
                  key="celebrating"
                  className="flex items-center gap-0.5 px-2 py-1 rounded-lg text-[11px] font-extrabold text-emerald-600"
                  initial={{ scale: 0, y: 8 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.15 } }}
                  transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                >
                  <CurrencyIcon size={13} />
                  <span>+{quest.reward.gems}</span>
                </motion.div>
              ) : (
                <motion.div
                  key="claimed"
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: isDark ? 'rgba(6,78,59,0.4)' : '#DCFCE7' }}
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  <span className="text-emerald-500 text-sm font-bold">✓</span>
                </motion.div>
              )
            ) : isComplete ? (
              <motion.button
                key="claim-btn"
                onClick={() => handleClaim(quest.definitionId)}
                className="px-3 py-2 rounded-lg text-[11px] font-extrabold text-white shadow-sm min-h-[44px] min-w-[44px]"
                style={{
                  background: 'linear-gradient(135deg, #10B981, #059669)',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 2px 0 #047857',
                }}
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                whileTap={{ scale: 0.92 }}
                exit={{ scale: 1.3, opacity: 0, transition: { duration: 0.2 } }}
              >
                Claim
              </motion.button>
            ) : (
              <motion.div
                key="reward"
                className={`flex items-center gap-0.5 px-2 py-1 rounded-lg text-[11px] font-bold ${
                  isDark ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-50 text-amber-700'
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <CurrencyIcon size={14} />
                <span>{quest.reward.gems}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  }

  // ================================================================
  // Full-size card (/quests page) — 3-column: Icon | Content | Reward
  // ================================================================

  const shadowH = isElevated ? 6 : 5;

  const claimedBg = isDark ? 'rgba(6,78,59,0.2)' : '#F0FDF4';
  const claimedBorder = isDark ? '1.5px solid rgba(16,185,129,0.3)' : '1.5px solid rgba(16,185,129,0.4)';
  const claimedShadow = isDark ? 'rgba(6,78,59,0.4)' : 'rgba(16,185,129,0.25)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="group select-none"
    >
      <div className="relative" style={{ paddingBottom: shadowH }}>
        {/* 3D shadow */}
        <div
          className="absolute left-0 right-0 bottom-0 rounded-2xl"
          style={{
            height: `calc(100% - ${shadowH}px)`,
            top: shadowH,
            background: showClaimed ? claimedShadow : isDark ? theme.shadowDark : theme.shadow,
          }}
        />

        {/* Card surface */}
        <div
          className="relative w-full rounded-2xl transition-transform duration-75 group-active:translate-y-[var(--sh)]"
          style={{
            '--sh': `${shadowH}px`,
            background: showClaimed ? claimedBg : isDark ? theme.cardBgDark : theme.cardBg,
            border: showClaimed ? claimedBorder : isDark ? theme.cardBorderDark : theme.cardBorder,
          } as React.CSSProperties}
        >
          {/* Effects layer — clipped so shimmer/sparkles don't overflow */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
            {isLegendary && !showClaimed && <LegendarySparkles isDark={isDark} />}
            {isElevated && !showClaimed && (
              <motion.div
                className="absolute inset-0"
                style={{
                  background: isLegendary
                    ? 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.18) 48%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.18) 52%, transparent 70%)'
                    : 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.1) 48%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.1) 52%, transparent 65%)',
                }}
                animate={{ x: ['-150%', '250%'] }}
                transition={{
                  duration: isLegendary ? 2.5 : 4,
                  repeat: Infinity,
                  ease: 'linear',
                  repeatDelay: isLegendary ? 2 : 4,
                }}
              />
            )}
          </div>

          {/* 2-column layout: Icon | Content (title, desc, progress+rewards) */}
          <div className="relative flex gap-3 px-3 py-3">
            {/* Left: Icon — no background, large */}
            <div
              className="flex-shrink-0 flex items-center justify-center self-center"
              style={{ width: 52 }}
            >
              <QuestIcon icon={quest.icon} size={48} />
            </div>

            {/* Right: Content */}
            <div className="flex-1 min-w-0">
              {/* Row 1: Title + Badge */}
              <div className="flex items-center justify-between gap-2 mb-0.5">
                <span
                  className="text-[15px] font-extrabold leading-tight truncate"
                  style={{
                    color: showClaimed
                      ? isDark ? '#6EE7B7' : '#065F46'
                      : isDark ? theme.titleColorDark : theme.titleColor,
                  }}
                >
                  {quest.title}
                </span>
                <span
                  className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0"
                  style={{
                    background: isDark ? theme.badgeBgDark : theme.badgeBg,
                    border: `1px solid ${isDark ? theme.badgeBorderDark : theme.badgeBorder}`,
                    color: isDark ? theme.badgeTextDark : theme.badgeText,
                  }}
                >
                  {theme.label}
                </span>
              </div>

              {/* Subtitle — only for quests that need extra clarification */}
              {quest.tooltip && (
                <p
                  className="text-[11px] leading-snug mb-1.5"
                  style={{
                    color: showClaimed
                      ? isDark ? 'rgba(110,231,183,0.7)' : '#047857'
                      : isDark ? theme.descColorDark : theme.descColor,
                  }}
                >
                  {quest.tooltip}
                </p>
              )}

              {/* Row 2: Progress + Rewards / Claim (same row, space-between) */}
              <div className="flex items-center justify-between gap-3">
                {/* Progress bar + counter */}
                <div className="flex items-center gap-2 min-w-0" style={{ flex: '1 1 0', maxWidth: '55%' }}>
                  <div
                    className="flex-1 overflow-hidden rounded-full"
                    style={{
                      height: 7,
                      background: showClaimed
                        ? isDark ? 'rgba(6,78,59,0.3)' : 'rgba(16,185,129,0.15)'
                        : isDark ? theme.barTrackDark : theme.barTrack,
                    }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      style={{
                        background: showClaimed || isComplete
                          ? 'linear-gradient(90deg, #34D399, #10B981)'
                          : theme.barFill,
                      }}
                    />
                  </div>
                  <span
                    className="text-[11px] font-bold flex-shrink-0 tabular-nums"
                    style={{
                      color: showClaimed
                        ? isDark ? '#6EE7B7' : '#059669'
                        : isComplete ? '#10B981'
                        : isDark ? theme.counterColorDark : theme.counterColor,
                    }}
                  >
                    {quest.progress}/{quest.target}
                  </span>
                </div>

                {/* Chest (replaces reward text) */}
                <div className="flex-shrink-0">
                  <AnimatePresence mode="wait">
                    {showClaimed ? (
                      <motion.div
                        key="claimed"
                        className="flex items-center justify-center w-11 h-11 rounded-xl"
                        style={{ background: isDark ? 'rgba(6,78,59,0.4)' : '#DCFCE7' }}
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      >
                        <span className="text-emerald-500 text-lg font-bold">✓</span>
                      </motion.div>
                    ) : isComplete ? (
                      <motion.button
                        key="chest-ready"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenChest?.(quest);
                        }}
                        className="flex items-center justify-center w-11 h-11 rounded-xl"
                        style={{
                          background: isDark
                            ? 'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(124,58,237,0.4))'
                            : 'linear-gradient(135deg, #EDE9FE, #DDD6FE)',
                          border: `1.5px solid ${isDark ? 'rgba(139,92,246,0.5)' : 'rgba(124,58,237,0.3)'}`,
                          cursor: 'pointer',
                          boxShadow: isDark
                            ? '0 2px 8px rgba(139,92,246,0.3)'
                            : '0 2px 8px rgba(124,58,237,0.15)',
                        }}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                        whileTap={{ scale: 0.92 }}
                        exit={{ scale: 1.3, opacity: 0, transition: { duration: 0.2 } }}
                      >
                        <span className="text-xl">🎁</span>
                      </motion.button>
                    ) : (
                      <motion.div
                        key="chest-locked"
                        className="flex items-center justify-center w-11 h-11 rounded-xl"
                        style={{
                          background: isDark ? 'rgba(51,65,85,0.25)' : 'rgba(203,213,225,0.25)',
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <span className="text-xl" style={{ opacity: 0.35, filter: 'grayscale(0.8)' }}>🎁</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});
