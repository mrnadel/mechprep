'use client';

import { useState, useRef, useMemo, useEffect } from 'react';
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
import { getTodayString, getStreakStatus } from '@/lib/utils';
import { LevelBadge } from '@/components/engagement/LevelBadge';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

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

  // Calculate the date for each day of this week (Mon-Sun)
  return labels.map((label, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - todayIdx + i);
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    return {
      label,
      isToday: i === todayIdx,
      isFuture: i > todayIdx,
      todayIdx,
      dateStr,
    };
  });
}

export function CourseHeader() {
  const { status } = useSession();
  const progress = useCourseStore((s) => s.progress);
  const streakStatus = getStreakStatus(progress.lastActiveDate);
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
                color: popover === 'streak'
                  ? '#D97706'
                  : streakStatus === 'at-risk'
                    ? '#DC2626'
                    : '#3C3C3C',
                padding: '5px 8px',
                borderRadius: 10,
                background: popover === 'streak'
                  ? '#FFFBEB'
                  : streakStatus === 'at-risk'
                    ? '#FEF2F2'
                    : 'transparent',
                minWidth: 44,
                minHeight: 44,
                justifyContent: 'center',
              }}
              onClick={() => togglePopover('streak')}
              aria-label={`${progress.currentStreak} day streak`}
              aria-expanded={popover === 'streak'}
            >
              <span style={{ fontSize: 15 }} aria-hidden="true">⚡</span>
              <AnimatedCounter value={progress.currentStreak} showDelta deltaColor="#D97706" />
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
              <AnimatedCounter value={progress.totalXp} showDelta deltaColor="#7B2FBE" />
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
              <AnimatedCounter value={gems.balance} showDelta deltaColor="#7C3AED" />
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
                        <p style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: streakStatus === 'at-risk' ? '#DC2626' : '#AFAFAF',
                          marginTop: 1,
                        }}>
                          {streakStatus === 'at-risk'
                            ? 'Practice today or lose your streak!'
                            : progress.currentStreak > 0
                              ? 'Fully charged!'
                              : 'Start your streak today!'}
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
                          const activeDays = progress.activeDays ?? [];
                          const isActive = activeDays.includes(day.dateStr);
                          const isAtRisk = day.isToday && !isActive && streakStatus === 'at-risk';
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
                                    : isAtRisk
                                      ? '#FEE2E2'
                                      : day.isToday
                                        ? '#E5E5E5'
                                        : 'transparent',
                                  color: isActive
                                    ? 'white'
                                    : isAtRisk
                                      ? '#DC2626'
                                      : day.isToday
                                        ? '#3C3C3C'
                                        : day.isFuture
                                          ? '#E5E5E5'
                                          : '#CFCFCF',
                                  border: isAtRisk
                                    ? '2px dashed #DC2626'
                                    : day.isToday && !isActive
                                      ? '2px dashed #CFCFCF'
                                      : 'none',
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

// ─── Animated counter hook ───
function useAnimatedCount(target: number, duration = 800) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const start = performance.now();
    const from = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(from + (target - from) * eased));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return display;
}

// ─── Confetti particle component ───
function LevelUpConfetti() {
  const particles = useMemo(() => {
    const colors = ['#A855F7', '#F59E0B', '#EC4899', '#3B82F6', '#10B981', '#F97316'];
    return Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: colors[i % colors.length],
      delay: Math.random() * 0.3,
      size: 4 + Math.random() * 4,
      rotation: Math.random() * 360,
      drift: (Math.random() - 0.5) * 60,
    }));
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', borderRadius: 16 }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            top: '50%',
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            borderRadius: p.size > 6 ? 1 : '50%',
            background: p.color,
            rotate: p.rotation,
          }}
          initial={{ y: 0, x: 0, opacity: 1, scale: 0 }}
          animate={{
            y: [0, -80 - Math.random() * 60, 120],
            x: [0, p.drift],
            opacity: [0, 1, 1, 0],
            scale: [0, 1.2, 1, 0.5],
            rotate: p.rotation + 360 + Math.random() * 360,
          }}
          transition={{
            duration: 1.6,
            delay: p.delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}

function XpLevelPopover({ totalXp }: { totalXp: number }) {
  const { current, next, xpNeeded, progress: levelProgress } = getXpToNextLevel(totalXp);
  const isMaxLevel = !next;
  const progressPercent = Math.round(levelProgress * 100);
  const nextReward = next ? getLevelReward(next.level) : null;
  const isAlmostThere = !isMaxLevel && levelProgress >= 0.85;

  // Animated counters
  const animatedTotalXp = useAnimatedCount(totalXp);
  const animatedXpNeeded = useAnimatedCount(xpNeeded);

  // Daily XP from practice session history
  const sessionHistory = useStore((s) => s.progress.sessionHistory);
  const todayXp = useMemo(() => {
    const today = getTodayString();
    return sessionHistory
      .filter((s) => s.date === today)
      .reduce((sum, s) => sum + s.xpEarned, 0);
  }, [sessionHistory]);
  const animatedTodayXp = useAnimatedCount(todayXp);

  // Double XP boost
  const doubleXpExpiry = useEngagementStore((s) => s.doubleXpExpiry);
  const hasDoubleXp = doubleXpExpiry ? new Date(doubleXpExpiry) > new Date() : false;

  // Level-up celebration: detect if user just reached this level recently
  // Check if currentLevel changed since the popover last rendered a different level
  const [celebrateLevel, setCelebrateLevel] = useState<number | null>(null);
  const prevLevelRef = useRef(current.level);
  useEffect(() => {
    if (current.level > prevLevelRef.current) {
      setCelebrateLevel(current.level);
      const timer = setTimeout(() => setCelebrateLevel(null), 3000);
      return () => clearTimeout(timer);
    }
    prevLevelRef.current = current.level;
  }, [current.level]);

  // Level roadmap: show next 3 levels
  const currentIdx = levels.findIndex((l) => l.level === current.level);
  const upcomingLevels = levels.slice(currentIdx + 1, currentIdx + 4);

  // Social comparison (simulated percentile based on level)
  const percentile = Math.min(99, Math.round(((current.level - 1) / (levels.length - 1)) * 100));

  return (
    <div style={{ position: 'relative' }}>
      {/* Confetti overlay for level-up */}
      <AnimatePresence>
        {celebrateLevel && <LevelUpConfetti />}
      </AnimatePresence>

      {/* Level-up celebration banner */}
      <AnimatePresence>
        {celebrateLevel && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            style={{
              background: 'linear-gradient(135deg, #FDE68A 0%, #F59E0B 100%)',
              borderRadius: 12,
              padding: '12px 14px',
              marginBottom: 14,
              textAlign: 'center',
              overflow: 'hidden',
            }}
          >
            <motion.p
              style={{ fontSize: 22, marginBottom: 2 }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.6, repeat: 2 }}
            >
              🎉
            </motion.p>
            <p style={{ fontSize: 14, fontWeight: 800, color: '#78350F' }}>
              Level {celebrateLevel} Unlocked!
            </p>
            <p style={{ fontSize: 11, fontWeight: 600, color: '#92400E', marginTop: 2 }}>
              You&apos;re now a {current.title}!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Level badge + title */}
      <div className="flex items-center" style={{ gap: 12, marginBottom: 14 }}>
        <motion.div
          style={{
            width: 52,
            height: 52,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            flexShrink: 0,
          }}
          initial={{ rotate: -8, scale: 0.9 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: 'spring', damping: 12, stiffness: 200 }}
        >
          <LevelBadge level={current} size={52} />
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
        </motion.div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ fontSize: 17, fontWeight: 800, color: '#3C3C3C', lineHeight: 1.2 }}>
            {current.title}
          </h3>
          <div className="flex items-center" style={{ gap: 6, marginTop: 2 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#A855F7' }}>
              Level {current.level}{isMaxLevel ? ' — MAX' : ''}
            </span>
            {hasDoubleXp && (
              <motion.span
                style={{
                  fontSize: 9,
                  fontWeight: 800,
                  color: '#D97706',
                  background: '#FEF3C7',
                  padding: '1px 6px',
                  borderRadius: 6,
                  border: '1px solid #FDE68A',
                }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                2× XP
              </motion.span>
            )}
          </div>
        </div>
      </div>

      {/* Today's XP + Total XP stats row */}
      <div className="grid grid-cols-2" style={{ gap: 8, marginBottom: 14 }}>
        <motion.div
          style={{
            background: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
            borderRadius: 12,
            padding: '10px 12px',
            textAlign: 'center',
            border: '1.5px solid #BBF7D0',
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <p style={{ fontSize: 22, fontWeight: 800, color: '#16A34A', lineHeight: 1 }}>
            +{animatedTodayXp.toLocaleString()}
          </p>
          <p style={{ fontSize: 10, color: '#15803D', fontWeight: 700, marginTop: 3 }}>
            Today
          </p>
        </motion.div>
        <motion.div
          style={{
            background: 'linear-gradient(135deg, #F5EAFF 0%, #EDE0FF 100%)',
            borderRadius: 12,
            padding: '10px 12px',
            textAlign: 'center',
            border: '1.5px solid #E4D0FA',
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <p style={{ fontSize: 22, fontWeight: 800, color: '#7B2FBE', lineHeight: 1 }}>
            {animatedTotalXp.toLocaleString()}
          </p>
          <p style={{ fontSize: 10, color: '#9E5DD0', fontWeight: 700, marginTop: 3 }}>
            Total XP
          </p>
        </motion.div>
      </div>

      {/* XP progress bar to next level */}
      {!isMaxLevel && next ? (
        <motion.div
          style={{
            background: isAlmostThere
              ? 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)'
              : 'linear-gradient(135deg, #FAF5FF 0%, #F3E8FF 100%)',
            borderRadius: 14,
            padding: '14px 14px 16px',
            marginBottom: 14,
            border: isAlmostThere ? '1.5px solid #FDBA74' : '1.5px solid #E9D5FF',
            position: 'relative',
            overflow: 'hidden',
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Almost-there glow effect */}
          {isAlmostThere && (
            <motion.div
              style={{
                position: 'absolute',
                inset: -2,
                borderRadius: 16,
                background: 'linear-gradient(135deg, rgba(249,115,22,0.08) 0%, rgba(168,85,247,0.08) 100%)',
              }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}

          {/* Next level label */}
          <div className="flex justify-between items-center" style={{ marginBottom: 10, position: 'relative' }}>
            <span style={{
              fontSize: 11,
              fontWeight: 700,
              color: isAlmostThere ? '#C2410C' : '#9333EA',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}>
              {isAlmostThere ? 'So close!' : `Next: Level ${next.level}`}
            </span>
            <span style={{
              fontSize: 11,
              fontWeight: 800,
              color: isAlmostThere ? '#EA580C' : '#7C3AED',
            }}>
              {animatedXpNeeded.toLocaleString()} XP to go
            </span>
          </div>

          {/* Progress bar */}
          <div style={{ position: 'relative', height: 16, background: isAlmostThere ? '#FED7AA' : '#E9D5FF', borderRadius: 8, overflow: 'hidden' }}>
            <motion.div
              style={{
                height: '100%',
                background: isAlmostThere
                  ? 'linear-gradient(90deg, #F97316 0%, #EA580C 40%, #DC2626 100%)'
                  : 'linear-gradient(90deg, #C084FC 0%, #A855F7 40%, #7C3AED 100%)',
                borderRadius: 8,
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
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)',
                  borderRadius: '8px 8px 0 0',
                }}
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: isAlmostThere ? 1.5 : 2.5, repeat: Infinity, ease: 'linear', repeatDelay: isAlmostThere ? 0.3 : 1 }}
              />
            </motion.div>

            {/* "Almost there" pulse ring on the progress edge */}
            {isAlmostThere && (
              <motion.div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: `${progressPercent}%`,
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: '#F97316',
                  transform: 'translate(-50%, -50%)',
                  boxShadow: '0 0 0 0 rgba(249,115,22,0.4)',
                }}
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(249,115,22,0.4)',
                    '0 0 0 6px rgba(249,115,22,0)',
                  ],
                }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
            )}
          </div>

          {/* Percentage + XP counts */}
          <div className="flex justify-between items-center" style={{ marginTop: 6, position: 'relative' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: isAlmostThere ? '#EA580C' : '#A78BFA' }}>
              {progressPercent}%
            </span>
            <span style={{ fontSize: 10, fontWeight: 600, color: isAlmostThere ? '#FB923C' : '#C4B5FD' }}>
              {(totalXp - current.xpRequired).toLocaleString()} / {(next.xpRequired - current.xpRequired).toLocaleString()} XP
            </span>
          </div>

          {/* Urgency message */}
          {isAlmostThere && (
            <motion.p
              style={{ fontSize: 11, fontWeight: 700, color: '#C2410C', textAlign: 'center', marginTop: 8 }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Just {xpNeeded} more XP — one lesson could do it!
            </motion.p>
          )}
        </motion.div>
      ) : (
        /* Max level reached */
        <motion.div
          style={{
            background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
            borderRadius: 14,
            padding: '16px 14px',
            marginBottom: 14,
            border: '1.5px solid #FCD34D',
            textAlign: 'center',
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.p
            style={{ fontSize: 28, marginBottom: 4 }}
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            👑
          </motion.p>
          <p style={{ fontSize: 14, fontWeight: 800, color: '#92400E' }}>
            Mechanical Grandmaster
          </p>
          <p style={{ fontSize: 11, fontWeight: 600, color: '#B45309', marginTop: 2 }}>
            You&apos;ve mastered it all. Legendary!
          </p>
        </motion.div>
      )}

      {/* Next level reward preview */}
      {nextReward && next && (
        <motion.div
          style={{
            background: nextReward.isMilestone
              ? 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)'
              : '#F9FAFB',
            borderRadius: 12,
            padding: '10px 12px',
            marginBottom: 12,
            border: nextReward.isMilestone ? '1.5px solid #FDE68A' : '1px solid #F0F0F0',
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
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
            <motion.span
              style={{ fontSize: 20 }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 10, stiffness: 200, delay: 0.35 }}
            >
              <LevelBadge level={next} size={28} />
            </motion.span>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#374151' }}>
                {next.title}
              </p>
              <div className="flex items-center flex-wrap" style={{ gap: 6, marginTop: 2 }}>
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
        </motion.div>
      )}

      {/* Level roadmap — next 3 levels */}
      {upcomingLevels.length > 0 && (
        <motion.div
          style={{
            background: '#FAFAFA',
            borderRadius: 12,
            padding: '10px 12px',
            marginBottom: 12,
            border: '1px solid #F0F0F0',
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p style={{ fontSize: 10, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
            Ahead of you
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {upcomingLevels.map((level, i) => {
              const reward = getLevelReward(level.level);
              const isNext = i === 0;
              return (
                <motion.div
                  key={level.level}
                  className="flex items-center"
                  style={{
                    gap: 10,
                    padding: '6px 0',
                    borderBottom: i < upcomingLevels.length - 1 ? '1px solid #F0F0F0' : 'none',
                    opacity: 1 - i * 0.2,
                  }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1 - i * 0.2, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.08 }}
                >
                  {/* Vertical line connector */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 24 }}>
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        background: isNext
                          ? 'linear-gradient(135deg, #A855F7, #7C3AED)'
                          : '#E5E7EB',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 12,
                        boxShadow: isNext ? '0 2px 6px rgba(168,85,247,0.3)' : 'none',
                      }}
                    >
                      <LevelBadge level={level} size={20} />
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: isNext ? '#3C3C3C' : '#9CA3AF' }}>
                      Lv.{level.level} — {level.title}
                    </p>
                    <p style={{ fontSize: 10, color: '#C4B5FD', fontWeight: 600 }}>
                      {level.xpRequired.toLocaleString()} XP
                      {reward?.isMilestone && (
                        <span style={{ color: '#F59E0B', marginLeft: 4 }}>★ Milestone</span>
                      )}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Social comparison footer */}
      <motion.div
        style={{ textAlign: 'center', marginBottom: 2 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {percentile > 0 && (
          <p style={{ fontSize: 11, fontWeight: 700, color: '#7C3AED', marginBottom: 4 }}>
            Ahead of {percentile}% of engineers
          </p>
        )}
        <p style={{ fontSize: 10, color: '#AFAFAF', fontWeight: 600 }}>
          {hasDoubleXp ? '2× XP active — earn double from every lesson!' : 'Earn XP by completing lessons. 3 stars = 3× XP!'}
        </p>
      </motion.div>
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
