'use client';

import { useState, useRef, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCourseStore } from '@/store/useCourseStore';
import { useIsDark } from '@/store/useThemeStore';

import { StreakFlame, type StreakState } from '@/components/icons/StreakFlame';
import { getProfession, PROFESSIONS } from '@/data/professions';

import { useGems, useEngagementStore, useDoubleXpActive } from '@/store/useEngagementStore';
import { useStore } from '@/store/useStore';
import { useHeartsStore } from '@/store/useHeartsStore';
import { shopItems } from '@/data/gem-shop';
import { getXpToNextLevel, levels } from '@/data/levels';
import { getLevelReward } from '@/data/level-rewards';
import { getTodayString, getStreakStatus } from '@/lib/utils';
import { LevelBadge } from '@/components/engagement/LevelBadge';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { CourseIcon } from '@/components/course/CourseIcon';

type PopoverType = 'course' | 'streak' | 'gems' | 'hearts' | null;

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning!';
  if (hour < 17) return 'Good afternoon!';
  return 'Good evening!';
}

function DoubleXpCountdown() {
  const doubleXpExpiry = useEngagementStore((s) => s.doubleXpExpiry);
  const isActive = useDoubleXpActive();
  const [remaining, setRemaining] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (!isActive || !doubleXpExpiry) return;

    const tick = () => {
      const diff = new Date(doubleXpExpiry).getTime() - Date.now();
      if (diff <= 0) {
        setRemaining('');
        return;
      }
      const mins = Math.floor(diff / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      setRemaining(`${mins}:${secs.toString().padStart(2, '0')}`);
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [isActive, doubleXpExpiry]);

  if (!isActive || !remaining) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      style={{ position: 'absolute', right: 12, top: 0, bottom: 0, display: 'flex', alignItems: 'center' }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onTouchStart={() => setShowTooltip((v) => !v)}
    >
      {/* Fire icon with x2 overlay */}
      <motion.div
        style={{
          position: 'relative',
          width: 36,
          height: 36,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <span style={{ fontSize: 34, lineHeight: 1 }}>🔥</span>
        <span
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: 11,
            fontWeight: 900,
            color: 'white',
            textShadow: '0 1px 3px rgba(0,0,0,0.5)',
            pointerEvents: 'none',
          }}
        >
          x2
        </span>
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: 6,
              background: 'white',
              color: '#92400E',
              padding: '6px 10px',
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 700,
              whiteSpace: 'nowrap',
              fontVariantNumeric: 'tabular-nums',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            }}
          >
            2× XP — {remaining} left
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function CourseHeader() {
  useSession();
  const isDark = useIsDark();
  const progress = useCourseStore((s) => s.progress);
  const streakStatus = getStreakStatus(progress.lastActiveDate);
  const flameState: StreakState = progress.currentStreak === 0
    ? 'none'
    : streakStatus === 'active'
      ? 'active'
      : streakStatus === 'at-risk'
        ? 'weak'
        : 'lost';
  const [popover, setPopover] = useState<PopoverType>(null);
  const gems = useGems();
  const activeProfession = useCourseStore((s) => s.activeProfession);
  const setActiveProfession = useCourseStore((s) => s.setActiveProfession);
  const profession = getProfession(activeProfession);
  const router = useRouter();

  const heartsCurrent = useHeartsStore((s) => s.current);
  const heartsMax = useHeartsStore((s) => s.max);
  const heartsIsUnlimited = useHeartsStore((s) => s.isUnlimited);
  const heartsRecharge = useHeartsStore((s) => s.rechargeHearts);

  const headerRef = useRef<HTMLElement>(null);
  const courseBtnRef = useRef<HTMLButtonElement>(null);
  const streakBtnRef = useRef<HTMLButtonElement>(null);
  const gemsBtnRef = useRef<HTMLButtonElement>(null);
  const heartsBtnRef = useRef<HTMLButtonElement>(null);
  const popoverPanelRef = useRef<HTMLDivElement>(null);
  const [popoverPos, setPopoverPos] = useState<{ top: number; left: number; width: number; arrowLeft: number } | null>(null);

  const togglePopover = (type: PopoverType) => {
    if (popover === type) {
      setPopover(null);
      setPopoverPos(null);
      return;
    }
    const ref = type === 'course' ? courseBtnRef : type === 'streak' ? streakBtnRef : type === 'hearts' ? heartsBtnRef : gemsBtnRef;
    const headerEl = headerRef.current;
    if (!headerEl || !ref?.current) return;

    const headerRect = headerEl.getBoundingClientRect();
    const btnRect = ref.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const btnCenterX = btnRect.left + btnRect.width / 2;
    const maxW = type === 'course' ? 360 : type === 'hearts' ? 320 : 340;
    const popoverWidth = vw >= 640 ? Math.min(maxW, vw - 32) : Math.min(300, vw - 32);

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

  // Close popover on scroll or outside tap (backdrop is z-40 but header is z-50, so taps on header miss the backdrop)
  useEffect(() => {
    if (!popover) return;
    const onScroll = () => closePopover();
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (
        popoverPanelRef.current?.contains(target) ||
        courseBtnRef.current?.contains(target) ||
        streakBtnRef.current?.contains(target) ||
        gemsBtnRef.current?.contains(target) ||
        heartsBtnRef.current?.contains(target)
      ) return;
      closePopover();
    };
    window.addEventListener('scroll', onScroll, { passive: true, capture: true });
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      window.removeEventListener('scroll', onScroll, { capture: true });
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [popover]);

  return (
    <>
      {/* Header */}
      <header
        ref={headerRef}
        className="sticky top-0 z-50 bg-[#FAFAFA] px-4 sm:px-5 py-1.5 relative"
      >
        <div className="flex items-center justify-between w-full">
            {profession && (
              <button
                ref={courseBtnRef}
                className="flex items-center justify-center transition-all active:scale-95"
                style={{
                  width: 44,
                  height: 44,
                  background: popover === 'course' ? `${profession.color}12` : 'transparent',
                  borderRadius: 12,
                }}
                onClick={() => togglePopover('course')}
                aria-label={`Switch course — ${profession.name}`}
                aria-expanded={popover === 'course'}
              >
                <CourseIcon professionId={profession.id} color={profession.color} size={32} />
              </button>
            )}
            <button
              ref={streakBtnRef}
              className="flex items-center transition-all active:scale-95"
              style={{
                gap: 4,
                fontWeight: 800,
                fontSize: 17,
                color: streakStatus === 'at-risk'
                  ? '#DC2626'
                  : (isDark ? '#E2E8F0' : '#3C3C3C'),
                padding: '4px 8px',
                borderRadius: 10,
                background: streakStatus === 'at-risk'
                  ? (isDark ? 'rgba(220,38,38,0.15)' : '#FEF2F2')
                  : 'transparent',
                minWidth: 44,
                minHeight: 44,
                justifyContent: 'center',
              }}
              onClick={() => router.push('/streak')}
              aria-label={`${progress.currentStreak} day streak`}
            >
              <StreakFlame state={flameState} size={28} />
              <AnimatedCounter value={progress.currentStreak} showDelta deltaColor="#D97706" />
            </button>

            <button
              ref={gemsBtnRef}
              className="flex items-center transition-all active:scale-95"
              style={{
                gap: 4,
                fontWeight: 800,
                fontSize: 17,
                color: popover === 'gems' ? '#7C3AED' : (isDark ? '#E2E8F0' : '#3C3C3C'),
                padding: '4px 8px',
                borderRadius: 10,
                background: popover === 'gems' ? (isDark ? 'rgba(124,58,237,0.15)' : '#F3E8FF') : 'transparent',
                minWidth: 44,
                minHeight: 44,
                justifyContent: 'center',
              }}
              onClick={() => togglePopover('gems')}
              aria-label={`${gems.balance} gems`}
              aria-expanded={popover === 'gems'}
            >
              <span style={{ fontSize: 28 }} aria-hidden="true">💎</span>
              <AnimatedCounter value={gems.balance} showDelta deltaColor="#7C3AED" />
            </button>

            <button
              ref={heartsBtnRef}
              className="flex items-center transition-all active:scale-95"
              style={{
                gap: 4,
                fontWeight: 800,
                fontSize: 17,
                color: popover === 'hearts' ? '#E11D48' : heartsCurrent > 0 ? '#EF4444' : (isDark ? '#64748B' : '#9CA3AF'),
                padding: '4px 8px',
                borderRadius: 10,
                background: popover === 'hearts' ? (isDark ? 'rgba(225,29,72,0.15)' : '#FFF1F2') : 'transparent',
                minWidth: 44,
                minHeight: 44,
                justifyContent: 'center',
              }}
              onClick={() => { heartsRecharge(); togglePopover('hearts'); }}
              aria-label={heartsIsUnlimited() ? 'Unlimited hearts' : `${heartsCurrent} hearts`}
              aria-expanded={popover === 'hearts'}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              {heartsIsUnlimited() ? (
                <span style={{ fontSize: 15 }}>&infin;</span>
              ) : (
                <AnimatedCounter value={heartsCurrent} />
              )}
            </button>

        </div>
        <AnimatePresence>
          <DoubleXpCountdown />
        </AnimatePresence>
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
            ref={popoverPanelRef}
            key="popover-panel"
            className="fixed z-50"
            style={{
              top: popoverPos.top,
              left: popoverPos.left,
              width: popoverPos.width,
              maxWidth: popover === 'course' ? 360 : popover === 'hearts' ? 320 : 340,
              borderRadius: 16,
              background: isDark ? '#1E293B' : 'white',
              border: isDark ? '2px solid #334155' : '2px solid #E5E5E5',
              boxShadow: isDark
                ? '0 10px 40px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3)'
                : '0 10px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
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
                background: isDark ? '#1E293B' : 'white',
                borderTop: isDark ? '2px solid #334155' : '2px solid #E5E5E5',
                borderLeft: isDark ? '2px solid #334155' : '2px solid #E5E5E5',
                transform: 'rotate(45deg)',
              }}
            />

            {/* Content */}
            <div style={{ padding: popover === 'course' ? 0 : 20, position: 'relative' }}>
                {popover === 'course' ? (
                  <CoursePopoverContent
                    activeProfession={activeProfession}
                    onSelect={(id) => {
                      setActiveProfession(id);
                      closePopover();
                      if (id !== activeProfession) router.push('/');
                    }}
                  />
                ) : popover === 'gems' ? (
                  <GemsPopoverContent gems={gems} onGoToShop={closePopover} />
                ) : popover === 'hearts' ? (
                  <HeartsPopoverContent onClose={closePopover} />
                ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Course popover ───
function CoursePopoverContent({ activeProfession, onSelect }: { activeProfession: string; onSelect: (id: string) => void }) {
  const isDark = useIsDark();
  return (
    <div>
      {/* Header */}
      <div style={{ padding: '16px 20px 12px' }}>
        <h3 style={{ fontSize: 15, fontWeight: 800, color: isDark ? '#E2E8F0' : '#3C3C3C', lineHeight: 1.2 }}>
          My Courses
        </h3>
        <p style={{ fontSize: 12, fontWeight: 600, color: isDark ? '#64748B' : '#AFAFAF', marginTop: 2 }}>
          Choose what to practice
        </p>
      </div>

      {/* Course list */}
      <div style={{ padding: '0 10px 10px' }}>
        {PROFESSIONS.map((p, i) => {
          const isActive = activeProfession === p.id;
          const isDisabled = p.isComingSoon === true;

          return (
            <motion.button
              key={p.id}
              onClick={() => !isDisabled && onSelect(p.id)}
              disabled={isDisabled}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04, duration: 0.2 }}
              className="w-full text-left transition-all"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 12px',
                borderRadius: 12,
                background: isActive ? `${p.color}${isDark ? '20' : '10'}` : 'transparent',
                border: isActive ? `1.5px solid ${p.color}${isDark ? '40' : '30'}` : '1.5px solid transparent',
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                opacity: isDisabled ? 0.45 : 1,
                marginBottom: i < PROFESSIONS.length - 1 ? 4 : 0,
              }}
              whileHover={isDisabled ? undefined : { backgroundColor: isActive ? undefined : (isDark ? '#334155' : '#F7F7F7') }}
              whileTap={isDisabled ? undefined : { scale: 0.98 }}
            >
              {/* Icon */}
              <span
                style={{
                  width: 40,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <CourseIcon professionId={p.id} color={p.color} size={40} />
              </span>

              {/* Text */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: isDark ? '#E2E8F0' : '#3C3C3C', lineHeight: 1.2 }}>
                  {p.name}
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color: isDark ? '#64748B' : '#AFAFAF', marginTop: 2, display: 'flex', gap: 6, alignItems: 'center' }}>
                  <span style={{ color: p.color }}>{p.unitCount} units</span>
                  <span style={{ color: isDark ? '#475569' : '#DDD' }}>·</span>
                  <span>{p.questionCount.toLocaleString()} questions</span>
                </div>
              </div>

              {/* Active indicator / Coming Soon */}
              {isDisabled ? (
                <span style={{
                  fontSize: 9,
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  color: isDark ? '#64748B' : '#AFAFAF',
                  background: isDark ? '#334155' : '#F0F0F0',
                  padding: '3px 7px',
                  borderRadius: 6,
                  whiteSpace: 'nowrap',
                }}>
                  Soon
                </span>
              ) : isActive ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    backgroundColor: p.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </motion.div>
              ) : null}
            </motion.button>
          );
        })}
      </div>
    </div>
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
  const isDark = useIsDark();
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
              border: isDark ? '2px solid #1E293B' : '2px solid white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
            }}
          >
            {current.level}
          </div>
        </motion.div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ fontSize: 17, fontWeight: 800, color: isDark ? '#E2E8F0' : '#3C3C3C', lineHeight: 1.2 }}>
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
                  background: isDark ? 'rgba(217,119,6,0.15)' : '#FEF3C7',
                  padding: '1px 6px',
                  borderRadius: 6,
                  border: isDark ? '1px solid rgba(217,119,6,0.3)' : '1px solid #FDE68A',
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
            background: isDark
              ? 'linear-gradient(135deg, rgba(22,163,74,0.15) 0%, rgba(22,163,74,0.1) 100%)'
              : 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
            borderRadius: 12,
            padding: '10px 12px',
            textAlign: 'center',
            border: isDark ? '1.5px solid rgba(22,163,74,0.25)' : '1.5px solid #BBF7D0',
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
            background: isDark
              ? 'linear-gradient(135deg, rgba(168,85,247,0.15) 0%, rgba(168,85,247,0.1) 100%)'
              : 'linear-gradient(135deg, #F5EAFF 0%, #EDE0FF 100%)',
            borderRadius: 12,
            padding: '10px 12px',
            textAlign: 'center',
            border: isDark ? '1.5px solid rgba(168,85,247,0.25)' : '1.5px solid #E4D0FA',
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
              ? (isDark ? 'linear-gradient(135deg, rgba(249,115,22,0.12) 0%, rgba(249,115,22,0.08) 100%)' : 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)')
              : (isDark ? 'linear-gradient(135deg, rgba(168,85,247,0.12) 0%, rgba(168,85,247,0.08) 100%)' : 'linear-gradient(135deg, #FAF5FF 0%, #F3E8FF 100%)'),
            borderRadius: 14,
            padding: '14px 14px 16px',
            marginBottom: 14,
            border: isAlmostThere
              ? (isDark ? '1.5px solid rgba(249,115,22,0.3)' : '1.5px solid #FDBA74')
              : (isDark ? '1.5px solid rgba(168,85,247,0.25)' : '1.5px solid #E9D5FF'),
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
          <div style={{ position: 'relative', height: 16, background: isAlmostThere ? (isDark ? 'rgba(249,115,22,0.2)' : '#FED7AA') : (isDark ? 'rgba(168,85,247,0.2)' : '#E9D5FF'), borderRadius: 8, overflow: 'hidden' }}>
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
            background: isDark
              ? 'linear-gradient(135deg, rgba(217,119,6,0.15) 0%, rgba(217,119,6,0.1) 100%)'
              : 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
            borderRadius: 14,
            padding: '16px 14px',
            marginBottom: 14,
            border: isDark ? '1.5px solid rgba(217,119,6,0.3)' : '1.5px solid #FCD34D',
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
              ? (isDark ? 'linear-gradient(135deg, rgba(217,119,6,0.12) 0%, rgba(217,119,6,0.08) 100%)' : 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)')
              : (isDark ? '#0F172A' : '#F9FAFB'),
            borderRadius: 12,
            padding: '10px 12px',
            marginBottom: 12,
            border: nextReward.isMilestone
              ? (isDark ? '1.5px solid rgba(217,119,6,0.3)' : '1.5px solid #FDE68A')
              : (isDark ? '1px solid #334155' : '1px solid #F0F0F0'),
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
              <p style={{ fontSize: 12, fontWeight: 700, color: isDark ? '#CBD5E1' : '#374151' }}>
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
            background: isDark ? '#0F172A' : '#FAFAFA',
            borderRadius: 12,
            padding: '10px 12px',
            marginBottom: 12,
            border: isDark ? '1px solid #334155' : '1px solid #F0F0F0',
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

// ─── Hearts popover (Duolingo-style) ───
const HEART_COST = 100; // gems per single heart — balanced: ~2 lessons worth of gem earnings

function HeartsPopoverContent({ onClose }: { onClose: () => void }) {
  const current = useHeartsStore((s) => s.current);
  const max = useHeartsStore((s) => s.max);
  const isUnlimited = useHeartsStore((s) => s.isUnlimited);
  const getTimeUntilNextHeart = useHeartsStore((s) => s.getTimeUntilNextHeart);
  const rechargeHearts = useHeartsStore((s) => s.rechargeHearts);
  const gems = useGems();
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const tick = () => {
      rechargeHearts();
      const ms = getTimeUntilNextHeart();
      if (ms <= 0) { setCountdown(''); return; }
      const totalSeconds = Math.ceil(ms / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      if (hours > 0) setCountdown(`${hours}h ${minutes}m`);
      else setCountdown(`${minutes}m`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [getTimeUntilNextHeart, rechargeHearts]);

  const unlimited = isUnlimited();
  const missingHearts = max - current;
  const canBuyOne = !unlimited && current < max && gems.balance >= HEART_COST;
  const refillCost = missingHearts * HEART_COST;
  const canRefillAll = !unlimited && missingHearts > 1 && gems.balance >= refillCost;

  const buyOneHeart = () => {
    if (!canBuyOne) return;
    useHeartsStore.setState((s) => ({
      current: s.current + 1,
      lastRechargeAt: s.current + 1 >= s.max ? Date.now() : s.lastRechargeAt,
    }));
    useEngagementStore.getState().addGems(-HEART_COST, 'heart_purchase');
  };

  const refillAll = () => {
    if (!canRefillAll) return;
    useHeartsStore.setState({ current: max, lastRechargeAt: Date.now() });
    useEngagementStore.getState().addGems(-refillCost, 'heart_refill');
  };

  const heartPath = 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z';

  return (
    <div style={{ textAlign: 'center' }}>
      {/* Title */}
      <h3 style={{ fontSize: 20, fontWeight: 800, color: '#3C3C3C', marginBottom: 16 }}>
        Hearts
      </h3>

      {/* Heart icons row */}
      <div className="flex items-center justify-center" style={{ gap: 6, marginBottom: 16 }}>
        {unlimited ? (
          <>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="#EF4444"><path d={heartPath}/></svg>
            <span style={{ fontSize: 28, fontWeight: 800, color: '#EF4444', lineHeight: 1 }}>&infin;</span>
          </>
        ) : (
          Array.from({ length: max }, (_, i) => {
            const isFull = i < current;
            const isBreaking = i === current;
            return (
              <motion.svg
                key={i}
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill={isFull ? '#EF4444' : isBreaking ? '#FECDD3' : '#D4D4D8'}
                initial={false}
                animate={isBreaking ? { scale: [1, 1.12, 1] } : {}}
                transition={{ duration: 0.5 }}
                style={{ filter: isFull ? 'drop-shadow(0 1px 2px rgba(239,68,68,0.3))' : 'none' }}
              >
                <path d={heartPath}/>
              </motion.svg>
            );
          })
        )}
      </div>

      {/* Status text */}
      {unlimited ? (
        <p style={{ fontSize: 13, fontWeight: 700, color: '#16A34A', marginBottom: 4 }}>
          You have unlimited hearts!
        </p>
      ) : current < max && countdown ? (
        <p style={{ fontSize: 14, fontWeight: 700, color: '#3C3C3C', marginBottom: 4 }}>
          Next heart in <span style={{ color: '#E11D48' }}>{countdown}</span>
        </p>
      ) : null}

      <p style={{ fontSize: 12, fontWeight: 600, color: '#AFAFAF', marginBottom: 18 }}>
        {unlimited
          ? 'Pro members never run out.'
          : current === max
            ? 'Full hearts! Keep on learning.'
            : current > 0
              ? 'You have hearts left! Keep on learning.'
              : 'Wait for recharge, or spend gems below.'}
      </p>

      {/* Action cards */}
      {!unlimited && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {/* Get Pro — unlimited hearts */}
          <Link
            href="/pricing"
            onClick={onClose}
            className="flex items-center transition-all hover:brightness-105 active:scale-[0.98]"
            style={{
              gap: 10,
              padding: '10px 12px',
              borderRadius: 12,
              background: '#F9FAFB',
              border: '1.5px solid #E5E7EB',
              textDecoration: 'none',
            }}
          >
            <div style={{
              width: 32, height: 32, borderRadius: 8, flexShrink: 0,
              background: 'linear-gradient(135deg, #EC4899, #8B5CF6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 16, color: 'white', fontWeight: 900, lineHeight: 1 }}>&infin;</span>
            </div>
            <span style={{ fontSize: 12, fontWeight: 800, color: '#3C3C3C', whiteSpace: 'nowrap' }}>
              UNLIMITED HEARTS
            </span>
            <span style={{ fontSize: 12, fontWeight: 800, color: '#E11D48', marginLeft: 'auto', whiteSpace: 'nowrap' }}>
              GET PRO
            </span>
          </Link>

          {/* Buy one heart */}
          {current < max && (
            <button
              className="flex items-center transition-all hover:brightness-105 active:scale-[0.98]"
              style={{
                gap: 10,
                padding: '10px 12px',
                borderRadius: 12,
                background: '#F9FAFB',
                border: '1.5px solid #E5E7EB',
                cursor: canBuyOne ? 'pointer' : 'not-allowed',
                opacity: canBuyOne ? 1 : 0.45,
                width: '100%',
              }}
              disabled={!canBuyOne}
              onClick={buyOneHeart}
            >
              <div style={{
                width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                background: '#FEE2E2',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#EF4444"><path d={heartPath}/></svg>
              </div>
              <span style={{ fontSize: 12, fontWeight: 800, color: '#3C3C3C', whiteSpace: 'nowrap' }}>
                BUY ONE HEART
              </span>
              <div className="flex items-center" style={{ gap: 3, marginLeft: 'auto' }}>
                <span style={{ fontSize: 16 }}>💎</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#7C3AED' }}>{HEART_COST}</span>
              </div>
            </button>
          )}

          {/* Refill all hearts */}
          {missingHearts > 1 && (
            <button
              className="flex items-center transition-all hover:brightness-105 active:scale-[0.98]"
              style={{
                gap: 10,
                padding: '10px 12px',
                borderRadius: 12,
                background: '#F9FAFB',
                border: '1.5px solid #E5E7EB',
                cursor: canRefillAll ? 'pointer' : 'not-allowed',
                opacity: canRefillAll ? 1 : 0.45,
                width: '100%',
              }}
              disabled={!canRefillAll}
              onClick={refillAll}
            >
              <div style={{
                width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                background: '#FEE2E2',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                </svg>
              </div>
              <span style={{ fontSize: 12, fontWeight: 800, color: '#3C3C3C', whiteSpace: 'nowrap' }}>
                REFILL ALL ({missingHearts})
              </span>
              <div className="flex items-center" style={{ gap: 3, marginLeft: 'auto' }}>
                <span style={{ fontSize: 16 }}>💎</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#7C3AED' }}>{refillCost}</span>
              </div>
            </button>
          )}
        </div>
      )}
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
