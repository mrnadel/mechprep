'use client';

import { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useCourseStore } from '@/store/useCourseStore';
import { Sparkles } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { useGems, useEngagementStore } from '@/store/useEngagementStore';
import { useStore } from '@/store/useStore';
import { shopItems } from '@/data/gem-shop';
import { getXpToNextLevel, levels } from '@/data/levels';
import { getLevelReward } from '@/data/level-rewards';
import { getTodayString } from '@/lib/utils';

type PopoverType = 'streak' | 'xp' | 'gems' | null;

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning!';
  if (hour < 17) return 'Good afternoon!';
  return 'Good evening!';
}

function getWeekDays() {
  const labels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0=Sun, 1=Mon...
  const todayIdx = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Convert to Mon=0 index
  return labels.map((label, i) => ({
    label,
    isToday: i === todayIdx,
    todayIdx,
  }));
}

export function CourseHeader() {
  const { status } = useSession();
  const progress = useCourseStore((s) => s.progress);
  const [popover, setPopover] = useState<PopoverType>(null);
  const { tier, hasFetched } = useSubscription();
  const gems = useGems();

  const headerRef = useRef<HTMLElement>(null);
  const streakBtnRef = useRef<HTMLButtonElement>(null);
  const xpBtnRef = useRef<HTMLButtonElement>(null);
  const gemsBtnRef = useRef<HTMLButtonElement>(null);
  const [popoverPos, setPopoverPos] = useState<{ top: number; left: number; width: number; arrowLeft: number } | null>(null);

  const weekDays = useMemo(() => getWeekDays(), []);

  const togglePopover = (type: PopoverType) => {
    if (popover === type) {
      setPopover(null);
      setPopoverPos(null);
      return;
    }
    const ref = type === 'streak' ? streakBtnRef : type === 'xp' ? xpBtnRef : gemsBtnRef;
    const headerEl = headerRef.current;
    if (!headerEl || !ref?.current) return;

    const headerRect = headerEl.getBoundingClientRect();
    const btnRect = ref.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const btnCenterX = btnRect.left + btnRect.width / 2;
    const popoverWidth = vw >= 640 ? Math.min(340, vw - 32) : Math.min(300, vw - 32);

    // Center popover under the clicked button, clamped to viewport edges
    let left = btnCenterX - popoverWidth / 2;
    left = Math.max(16, Math.min(left, vw - popoverWidth - 16));

    const arrowLeft = btnCenterX - left - 7;

    setPopoverPos({
      top: headerRect.bottom + 10,
      left,
      width: popoverWidth,
      arrowLeft: Math.max(24, Math.min(arrowLeft, popoverWidth - 24)),
    });
    setPopover(type);
  };

  const closePopover = () => {
    setPopover(null);
    setPopoverPos(null);
  };

  return (
    <>
      {/* Header */}
      <header
        ref={headerRef}
        className="sticky top-0 z-50 bg-[#FAFAFA] px-4 sm:px-5 py-1.5"
      >
        <div className="flex items-center justify-center gap-1 sm:gap-3">
            <button
              ref={streakBtnRef}
              className="flex items-center transition-all active:scale-95"
              style={{
                gap: 3,
                fontWeight: 800,
                fontSize: 13,
                color: popover === 'streak' ? '#D97706' : '#3C3C3C',
                padding: '5px 8px',
                borderRadius: 10,
                background: popover === 'streak' ? '#FFFBEB' : 'transparent',
                minWidth: 44,
                minHeight: 44,
                justifyContent: 'center',
              }}
              onClick={() => togglePopover('streak')}
              aria-label={`${progress.currentStreak} day streak`}
              aria-expanded={popover === 'streak'}
            >
              <span style={{ fontSize: 15 }} aria-hidden="true">⚡</span>
              <span>{progress.currentStreak}</span>
            </button>

            <button
              ref={xpBtnRef}
              className="flex items-center transition-all active:scale-95"
              style={{
                gap: 3,
                fontWeight: 800,
                fontSize: 13,
                color: popover === 'xp' ? '#7B2FBE' : '#3C3C3C',
                padding: '5px 8px',
                borderRadius: 10,
                background: popover === 'xp' ? '#F3E6FF' : 'transparent',
                minWidth: 44,
                minHeight: 44,
                justifyContent: 'center',
              }}
              onClick={() => togglePopover('xp')}
              aria-label={`${progress.totalXp.toLocaleString()} experience points`}
              aria-expanded={popover === 'xp'}
            >
              <span style={{ fontSize: 15 }} aria-hidden="true">⭐</span>
              <span>{progress.totalXp.toLocaleString()}</span>
            </button>

            <button
              ref={gemsBtnRef}
              className="flex items-center transition-all active:scale-95"
              style={{
                gap: 3,
                fontWeight: 800,
                fontSize: 13,
                color: popover === 'gems' ? '#7C3AED' : '#3C3C3C',
                padding: '5px 8px',
                borderRadius: 10,
                background: popover === 'gems' ? '#F3E8FF' : 'transparent',
                minWidth: 44,
                minHeight: 44,
                justifyContent: 'center',
              }}
              onClick={() => togglePopover('gems')}
              aria-label={`${gems.balance} gems`}
              aria-expanded={popover === 'gems'}
            >
              <span style={{ fontSize: 15 }} aria-hidden="true">💎</span>
              <span>{gems.balance}</span>
            </button>

            {/* Upgrade CTA for free registered users */}
            {hasFetched && tier === 'free' && status === 'authenticated' && (
              <Link
                href="/pricing"
                className="flex items-center transition-transform active:scale-95"
                style={{
                  gap: 4,
                  padding: '4px 10px',
                  borderRadius: 8,
                  background: '#FFF0DB',
                  color: '#B56E00',
                  fontSize: 11,
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  minHeight: 44,
                  minWidth: 44,
                  justifyContent: 'center',
                }}
              >
                <Sparkles style={{ width: 12, height: 12 }} />
                <span>Pro</span>
              </Link>
            )}
        </div>
      </header>


      {/* Backdrop — z-40, behind the z-50 header so buttons remain clickable */}
      <AnimatePresence>
        {popover && (
          <motion.div
            key="popover-backdrop"
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            onClick={closePopover}
          >
            <div className="absolute inset-0 bg-black/15" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Popover panel — z-50, sibling of header so it floats above backdrop */}
      <AnimatePresence>
        {popover && popoverPos && (
          <motion.div
            key="popover-panel"
            className="fixed z-50"
            style={{
              top: popoverPos.top,
              left: popoverPos.left,
              width: popoverPos.width,
              maxWidth: 340,
              borderRadius: 16,
              background: 'white',
              border: '2px solid #E5E5E5',
              boxShadow: '0 10px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
              overflow: 'visible',
            }}
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ type: 'spring', damping: 26, stiffness: 400 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Arrow */}
            <div
              style={{
                position: 'absolute',
                top: -8,
                left: popoverPos.arrowLeft,
                width: 14,
                height: 14,
                background: 'white',
                borderTop: '2px solid #E5E5E5',
                borderLeft: '2px solid #E5E5E5',
                transform: 'rotate(45deg)',
              }}
            />

            {/* Content */}
            <div style={{ padding: 20, position: 'relative' }}>
                {popover === 'streak' ? (
                  <div>
                    {/* Header */}
                    <div className="flex items-center" style={{ gap: 10, marginBottom: 16 }}>
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 12,
                          background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 24,
                          boxShadow: '0 4px 12px rgba(245,158,11,0.3)',
                        }}
                      >
                        ⚡
                      </div>
                      <div>
                        <h3 style={{ fontSize: 16, fontWeight: 800, color: '#3C3C3C', lineHeight: 1.2 }}>
                          Practice Streak
                        </h3>
                        <p style={{ fontSize: 12, fontWeight: 600, color: '#AFAFAF', marginTop: 1 }}>
                          {progress.currentStreak > 0 ? 'Fully charged!' : 'Start your streak today!'}
                        </p>
                      </div>
                    </div>

                    {/* Stats cards */}
                    <div className="grid grid-cols-2" style={{ gap: 10, marginBottom: 16 }}>
                      <div
                        style={{
                          background: 'linear-gradient(135deg, #FFF6E8 0%, #FFF0DB 100%)',
                          borderRadius: 14,
                          padding: '14px 12px',
                          textAlign: 'center',
                          border: '1.5px solid #FFE4B8',
                        }}
                      >
                        <p style={{ fontSize: 30, fontWeight: 800, color: '#FF9600', lineHeight: 1 }}>
                          {progress.currentStreak}
                        </p>
                        <p style={{ fontSize: 11, color: '#CC8B1F', fontWeight: 700, marginTop: 4 }}>
                          Current
                        </p>
                      </div>
                      <div
                        style={{
                          background: '#F7F7F7',
                          borderRadius: 14,
                          padding: '14px 12px',
                          textAlign: 'center',
                          border: '1.5px solid #ECECEC',
                        }}
                      >
                        <p style={{ fontSize: 30, fontWeight: 800, color: '#3C3C3C', lineHeight: 1 }}>
                          {progress.longestStreak}
                        </p>
                        <p style={{ fontSize: 11, color: '#AFAFAF', fontWeight: 700, marginTop: 4 }}>
                          Longest
                        </p>
                      </div>
                    </div>

                    {/* Week tracker */}
                    <div
                      style={{
                        background: '#FAFAFA',
                        borderRadius: 12,
                        padding: '12px 10px',
                        marginBottom: 14,
                        border: '1px solid #F0F0F0',
                      }}
                    >
                      <p style={{ fontSize: 11, fontWeight: 700, color: '#AFAFAF', marginBottom: 8, textAlign: 'center' }}>
                        This week
                      </p>
                      <div className="flex justify-between" style={{ gap: 4 }}>
                        {weekDays.map((day, i) => {
                          const { todayIdx } = day;
                          const streakStart = todayIdx - progress.currentStreak + 1;
                          const isActive = i >= Math.max(0, streakStart) && i <= todayIdx && progress.currentStreak > 0;
                          return (
                            <div key={i} className="flex flex-col items-center" style={{ gap: 4, flex: 1 }}>
                              <div
                                style={{
                                  width: 28,
                                  height: 28,
                                  borderRadius: '50%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: isActive ? 13 : 11,
                                  fontWeight: 800,
                                  background: isActive
                                    ? 'linear-gradient(135deg, #FBBF24 0%, #D97706 100%)'
                                    : day.isToday
                                      ? '#E5E5E5'
                                      : 'transparent',
                                  color: isActive ? 'white' : day.isToday ? '#3C3C3C' : '#CFCFCF',
                                  border: day.isToday && !isActive ? '2px dashed #CFCFCF' : 'none',
                                  boxShadow: isActive ? '0 2px 6px rgba(217,119,6,0.3)' : 'none',
                                }}
                              >
                                {isActive ? '⚡' : day.label}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <p style={{ fontSize: 12, color: '#AFAFAF', fontWeight: 600, textAlign: 'center' }}>
                      Complete a lesson each day to keep going!
                    </p>
                  </div>
                ) : popover === 'gems' ? (
                  <GemsPopoverContent gems={gems} onGoToShop={closePopover} />
                ) : (
                  <XpLevelPopover totalXp={progress.totalXp} />
                )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function XpLevelPopover({ totalXp }: { totalXp: number }) {
  const { current, next, xpNeeded, progress: levelProgress } = getXpToNextLevel(totalXp);
  const isMaxLevel = !next;
  const progressPercent = Math.round(levelProgress * 100);
  const nextReward = next ? getLevelReward(next.level) : null;

  return (
    <div>
      {/* Level badge + title */}
      <div className="flex items-center" style={{ gap: 12, marginBottom: 18 }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            background: 'linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 28,
            boxShadow: '0 4px 16px rgba(168,85,247,0.35)',
            position: 'relative',
          }}
        >
          {current.icon}
          {/* Level number badge */}
          <div
            style={{
              position: 'absolute',
              bottom: -4,
              right: -4,
              width: 22,
              height: 22,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #F59E0B, #D97706)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 10,
              fontWeight: 900,
              color: 'white',
              border: '2px solid white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
            }}
          >
            {current.level}
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: 17, fontWeight: 800, color: '#3C3C3C', lineHeight: 1.2 }}>
            {current.title}
          </h3>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#A855F7', marginTop: 2 }}>
            Level {current.level}{isMaxLevel ? ' — MAX' : ''}
          </p>
        </div>
      </div>

      {/* XP progress bar to next level */}
      {!isMaxLevel && next ? (
        <div
          style={{
            background: 'linear-gradient(135deg, #FAF5FF 0%, #F3E8FF 100%)',
            borderRadius: 14,
            padding: '14px 14px 16px',
            marginBottom: 14,
            border: '1.5px solid #E9D5FF',
          }}
        >
          {/* Next level label */}
          <div className="flex justify-between items-center" style={{ marginBottom: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#9333EA', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Next: Level {next.level}
            </span>
            <span style={{ fontSize: 11, fontWeight: 800, color: '#7C3AED' }}>
              {xpNeeded.toLocaleString()} XP to go
            </span>
          </div>

          {/* Progress bar */}
          <div style={{ position: 'relative', height: 14, background: '#E9D5FF', borderRadius: 7, overflow: 'hidden' }}>
            <motion.div
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #C084FC 0%, #A855F7 40%, #7C3AED 100%)',
                borderRadius: 7,
                position: 'relative',
              }}
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Shimmer effect */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '50%',
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                  borderRadius: '7px 7px 0 0',
                }}
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
              />
            </motion.div>
          </div>

          {/* Percentage + XP counts */}
          <div className="flex justify-between items-center" style={{ marginTop: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#A78BFA' }}>
              {progressPercent}%
            </span>
            <span style={{ fontSize: 10, fontWeight: 600, color: '#C4B5FD' }}>
              {(totalXp - current.xpRequired).toLocaleString()} / {(next.xpRequired - current.xpRequired).toLocaleString()} XP
            </span>
          </div>
        </div>
      ) : (
        /* Max level reached */
        <div
          style={{
            background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
            borderRadius: 14,
            padding: '16px 14px',
            marginBottom: 14,
            border: '1.5px solid #FCD34D',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: 22, marginBottom: 4 }}>👑</p>
          <p style={{ fontSize: 13, fontWeight: 800, color: '#92400E' }}>
            Maximum level reached!
          </p>
          <p style={{ fontSize: 11, fontWeight: 600, color: '#B45309', marginTop: 2 }}>
            You&apos;ve mastered it all.
          </p>
        </div>
      )}

      {/* Total XP stat */}
      <div
        style={{
          background: '#FAFAFA',
          borderRadius: 12,
          padding: '12px 14px',
          marginBottom: 14,
          border: '1px solid #F0F0F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontSize: 12, fontWeight: 700, color: '#777' }}>
          Total XP
        </span>
        <span style={{ fontSize: 18, fontWeight: 800, color: '#7B2FBE' }}>
          {totalXp.toLocaleString()}
        </span>
      </div>

      {/* Next level reward preview */}
      {nextReward && next && (
        <div
          style={{
            background: nextReward.isMilestone
              ? 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)'
              : '#F9FAFB',
            borderRadius: 12,
            padding: '10px 12px',
            marginBottom: 14,
            border: nextReward.isMilestone ? '1.5px solid #FDE68A' : '1px solid #F0F0F0',
          }}
        >
          <p style={{
            fontSize: 10,
            fontWeight: 700,
            color: nextReward.isMilestone ? '#92400E' : '#9CA3AF',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: 6,
          }}>
            {nextReward.isMilestone ? '⭐ Milestone Reward' : 'Next Reward'}
          </p>
          <div className="flex items-center" style={{ gap: 8 }}>
            <span style={{ fontSize: 18 }}>{next.icon}</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#374151' }}>
                {next.title}
              </p>
              <div className="flex items-center" style={{ gap: 6, marginTop: 2 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#7C3AED' }}>
                  +{nextReward.gems} 💎
                </span>
                {nextReward.title && (
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#D97706' }}>
                    + &quot;{nextReward.title}&quot; title
                  </span>
                )}
                {nextReward.frame && (
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#059669' }}>
                    + Frame
                  </span>
                )}
                {nextReward.streakFreeze && (
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#2563EB' }}>
                    + Streak Freeze
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <p style={{ fontSize: 11, color: '#AFAFAF', fontWeight: 600, textAlign: 'center' }}>
        Earn XP by completing lessons. 3 stars = 3× XP!
      </p>
    </div>
  );
}

function GemsPopoverContent({
  gems,
  onGoToShop,
}: {
  gems: ReturnType<typeof useGems>;
  onGoToShop: () => void;
}) {
  const recentTx = gems.transactions.slice(-5).reverse();
  const affordable = shopItems
    .filter((i) => i.cost <= gems.balance)
    .sort((a, b) => a.cost - b.cost);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
        <div className="flex items-center" style={{ gap: 10 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              boxShadow: '0 4px 12px rgba(124,58,237,0.3)',
            }}
          >
            💎
          </div>
          <div>
            <p style={{ fontSize: 28, fontWeight: 800, color: '#7C3AED', lineHeight: 1 }}>
              {gems.balance.toLocaleString()}
            </p>
            <p style={{ fontSize: 11, color: '#AFAFAF', fontWeight: 600, marginTop: 2 }}>
              {gems.totalEarned.toLocaleString()} total earned
            </p>
          </div>
        </div>
      </div>

      {/* Affordable items hint */}
      {affordable.length > 0 && (
        <div
          style={{
            background: '#F5F3FF',
            borderRadius: 12,
            padding: '10px 12px',
            marginBottom: 14,
            border: '1px solid #EDE9FE',
          }}
        >
          <p style={{ fontSize: 11, fontWeight: 700, color: '#7C3AED' }}>
            You can afford {affordable.length} item{affordable.length !== 1 ? 's' : ''} in the shop!
          </p>
          <div className="flex items-center" style={{ gap: 4, marginTop: 6 }}>
            {affordable.slice(0, 5).map((item) => (
              <span key={item.id} style={{ fontSize: 16 }} title={`${item.name} — ${item.cost} 💎`}>
                {item.icon}
              </span>
            ))}
            {affordable.length > 5 && (
              <span style={{ fontSize: 10, fontWeight: 800, color: '#A78BFA', marginLeft: 2 }}>
                +{affordable.length - 5}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Recent transactions */}
      {recentTx.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#AFAFAF', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>
            Recent
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {recentTx.map((tx) => {
              const isPositive = tx.amount > 0;
              return (
                <div
                  key={tx.id}
                  className="flex items-center justify-between"
                  style={{
                    padding: '5px 8px',
                    borderRadius: 8,
                    background: isPositive ? '#FAFFF5' : '#FFF5F5',
                  }}
                >
                  <span style={{ fontSize: 12, color: '#4B5563', fontWeight: 600, textTransform: 'capitalize', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {formatGemSource(tx.source)}
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 800, color: isPositive ? '#16A34A' : '#DC2626', flexShrink: 0, marginLeft: 8 }}>
                    {isPositive ? '+' : ''}{tx.amount} 💎
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty state */}
      {recentTx.length === 0 && (
        <div style={{ textAlign: 'center', padding: '12px 0', marginBottom: 14 }}>
          <p style={{ fontSize: 13, color: '#AFAFAF', fontWeight: 600 }}>
            Complete quests and lessons to earn gems!
          </p>
        </div>
      )}

      {/* Shop CTA */}
      <Link
        href="/shop"
        onClick={onGoToShop}
        className="flex items-center justify-center transition-all hover:brightness-110 active:scale-95"
        style={{
          gap: 6,
          padding: '10px 16px',
          borderRadius: 12,
          background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
          color: '#FFFFFF',
          fontSize: 13,
          fontWeight: 800,
          textDecoration: 'none',
          boxShadow: '0 2px 8px rgba(124,58,237,0.3)',
        }}
      >
        🛍️ Visit Gem Shop
      </Link>
    </div>
  );
}

function formatGemSource(source: string): string {
  return source
    .replace(/_/g, ' ')
    .replace(/-/g, ' ')
    .replace(/\bxp\b/gi, 'XP')
    .replace(/\bdaily\b/gi, 'Daily')
    .replace(/\bweekly\b/gi, 'Weekly')
    .replace(/\bquest\b/gi, 'Quest')
    .replace(/\blesson\b/gi, 'Lesson')
    .replace(/\bchest\b/gi, 'Chest')
    .replace(/\bpurchase\b/gi, 'Purchase');
}
