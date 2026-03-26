'use client';

import { useEffect, useRef, useCallback, useState, useMemo } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import { useCourseStore } from '@/store/useCourseStore';
import { useSubscription } from '@/hooks/useSubscription';
import { LIMITS, isUnitUnlocked } from '@/lib/pricing';
import { getUnitTheme, type UnitTheme } from '@/lib/unitThemes';
import { PLACEMENT_TEST_CONFIG } from '@/lib/placement-test';
import { UpgradeModal } from '@/components/ui/UpgradeModal';
import { UnitHeader } from './UnitHeader';
import { LessonNode } from './LessonNode';

type JumpModalType =
  | { kind: 'within-unit'; unitIndex: number; lessonIndex: number }
  | { kind: 'placement-test'; unitIndex: number }
  | { kind: 'guest-signup'; unitIndex: number }
  | { kind: 'free-upgrade'; unitIndex: number };

/** 3D floating "Jump here" button — two-layer SVG so the face presses into the base on tap */
function JumpHereButton({ theme, onClick }: { theme: UnitTheme; onClick: () => void }) {
  const BTN_W = 160;
  const BTN_H = 54;
  const DEPTH = 6; // 3D extrusion depth in px

  return (
    <motion.div
      className="flex justify-center"
      style={{ margin: '-4px 0 4px', position: 'relative', zIndex: 2 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
    >
      <motion.button
        onClick={onClick}
        className="relative select-none"
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          WebkitTapHighlightColor: 'transparent',
          width: BTN_W,
          height: BTN_H,
          filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.18)) drop-shadow(0 3px 6px rgba(0,0,0,0.1))',
        }}
        initial="rest"
        whileHover="hover"
        whileTap="pressed"
        variants={{
          rest: {
            y: [0, -6, 0],
            transition: { y: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' } },
          },
          hover: {
            y: [0, -6, 0],
            transition: { y: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' } },
          },
          pressed: {
            y: 0,
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.12)) drop-shadow(0 1px 2px rgba(0,0,0,0.08))',
            transition: { y: { type: 'spring', stiffness: 500, damping: 25 }, filter: { duration: 0.1 } },
          },
        }}
        aria-label="Take placement test to jump to this unit"
      >
          {/* Static 3D base — stays in place while face moves */}
          <svg
            width={BTN_W}
            height={BTN_H}
            viewBox={`0 0 ${BTN_W} ${BTN_H}`}
            fill="none"
            style={{ position: 'absolute', top: 0, left: 0 }}
          >
            <rect x="4" y={DEPTH + 6} width="152" height="42" rx="21" fill={theme.dark} />
          </svg>

          {/* Animated button face — lifts on hover, presses into base on tap */}
          <motion.div
            style={{ position: 'relative' }}
            variants={{
              rest: { y: 0 },
              hover: { y: -2 },
              pressed: { y: DEPTH },
            }}
            transition={{ type: 'spring', stiffness: 600, damping: 20, mass: 0.6 }}
          >
            <svg
              width={BTN_W}
              height={BTN_H}
              viewBox={`0 0 ${BTN_W} ${BTN_H}`}
              fill="none"
            >
              {/* Main pill face */}
              <rect x="4" y="6" width="152" height="42" rx="21" fill={theme.color} />
              {/* Top highlight arc — gives convex curvature illusion */}
              <rect x="4" y="6" width="152" height="21" rx="21" fill="white" fillOpacity="0.2" />
              {/* Specular glow line */}
              <rect x="16" y="10" width="128" height="3" rx="1.5" fill="white" fillOpacity="0.3" />

              {/* Rocket icon */}
              <g transform="translate(28, 15)" fill="white">
                <path d="M10 0C10 0 6.5 3.5 6.5 8.5C6.5 11.5 8 14 10 16C12 14 13.5 11.5 13.5 8.5C13.5 3.5 10 0 10 0Z" fillOpacity="0.95" />
                <circle cx="10" cy="8.5" r="2.2" fill={theme.color} />
                <path d="M6.5 12L4 15L6.5 14.2" fillOpacity="0.85" />
                <path d="M13.5 12L16 15L13.5 14.2" fillOpacity="0.85" />
                <path d="M8 16L7 20H9L10 17.5L11 20H13L12 16" fillOpacity="0.7" />
              </g>

              {/* "Jump here" text */}
              <text
                x="95"
                y="30"
                textAnchor="middle"
                fill="white"
                fontFamily="inherit"
                fontWeight="800"
                fontSize="15"
                letterSpacing="0.3"
              >
                Jump here
              </text>
            </svg>
          </motion.div>
        </motion.button>
    </motion.div>
  );
}

/** Floating arrow button that scrolls to the current lesson when it's off-screen */
function ScrollToCurrentButton({
  scrollRef,
  targetRef,
}: {
  scrollRef: React.RefObject<HTMLDivElement | null>;
  targetRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    const container = scrollRef.current;
    const target = targetRef.current;
    if (!container || !target) return;

    function check() {
      const el = targetRef.current;
      const ctr = scrollRef.current;
      if (!el || !ctr) { setDirection(null); return; }
      const cRect = ctr.getBoundingClientRect();
      const tRect = el.getBoundingClientRect();
      const center = tRect.top + tRect.height / 2;
      if (center < cRect.top) setDirection('up');
      else if (center > cRect.bottom) setDirection('down');
      else setDirection(null);
    }

    check();
    container.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      container.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, [scrollRef, targetRef]);

  if (!direction) return null;

  const Icon = direction === 'up' ? ChevronUp : ChevronDown;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
      style={{
        width: 48,
        height: 48,
        borderRadius: '50%',
        border: 'none',
        cursor: 'pointer',
        background: '#3C3C3C',
        color: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
        WebkitTapHighlightColor: 'transparent',
      }}
      aria-label={`Scroll ${direction} to current lesson`}
      onClick={() => {
        targetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }}
    >
      <Icon style={{ width: 28, height: 28 }} />
    </motion.button>
  );
}

export function CourseMap() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const currentUnitRef = useRef<HTMLDivElement>(null);
  const currentLessonRef = useRef<HTMLDivElement>(null);
  const progress = useCourseStore((s) => s.progress);
  const courseData = useCourseStore((s) => s.courseData);
  const startLesson = useCourseStore((s) => s.startLesson);
  const startPlacementTest = useCourseStore((s) => s.startPlacementTest);
  const debugSkipToUnit = useCourseStore((s) => s.debugSkipToUnit);
  const debugSkipToLesson = useCourseStore((s) => s.debugSkipToLesson);
  const isLessonUnlocked = useCourseStore((s) => s.isLessonUnlocked);
  const activeProfession = useCourseStore((s) => s.activeProfession);
  const { status } = useSession();
  const router = useRouter();
  const isGuest = status !== 'authenticated';
  const { isProUser } = useSubscription();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [jumpModal, setJumpModal] = useState<JumpModalType | null>(null);

  const isFreeLocked = useCallback((unitIndex: number) =>
    !isGuest && !isProUser && !isUnitUnlocked(LIMITS.free.unlockedUnits, unitIndex), [isGuest, isProUser]);

  // Check if a unit is jumpable via placement test (locked, but not paywall/guest blocked)
  const isUnitJumpable = useCallback((unitIndex: number) => {
    const isGuestLocked = isGuest && !isUnitUnlocked(LIMITS.free.unlockedUnits, unitIndex);
    if (isGuestLocked || isFreeLocked(unitIndex)) return false;
    // All lessons must be locked (unit not yet reached)
    const noAccessible = !courseData[unitIndex]?.lessons.some((_, li) => isLessonUnlocked(unitIndex, li));
    return noAccessible;
  }, [isGuest, isFreeLocked, courseData, isLessonUnlocked]);

  const getLessonState = useCallback(
    (
      unitIndex: number,
      lessonIndex: number
    ): 'completed' | 'current' | 'locked' => {
      const lessonId = courseData[unitIndex]?.lessons[lessonIndex]?.id;
      if (!lessonId) return 'locked';

      if (isGuest && !isUnitUnlocked(LIMITS.free.unlockedUnits, unitIndex)) return 'locked';
      if (isFreeLocked(unitIndex)) return 'locked';

      if (progress.completedLessons[lessonId]?.passed) return 'completed';
      if (isLessonUnlocked(unitIndex, lessonIndex)) return 'current';
      return 'locked';
    },
    [progress.completedLessons, isLessonUnlocked, isGuest, isProUser] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const findActiveUnitIndex = useCallback((): number => {
    let lastCompletedUnit = 0;
    for (let ui = 0; ui < courseData.length; ui++) {
      for (let li = 0; li < courseData[ui].lessons.length; li++) {
        if (getLessonState(ui, li) === 'completed') {
          lastCompletedUnit = ui;
        }
      }
    }
    return lastCompletedUnit;
  }, [getLessonState]);

  const activeUnitIndex = useMemo(() => findActiveUnitIndex(), [findActiveUnitIndex]);

  // Find the first "current" (next-to-do) lesson to scroll to
  const currentLessonId = useMemo(() => {
    for (let ui = 0; ui < courseData.length; ui++) {
      for (let li = 0; li < courseData[ui].lessons.length; li++) {
        if (getLessonState(ui, li) === 'current') {
          return courseData[ui].lessons[li].id;
        }
      }
    }
    return null;
  }, [getLessonState]);


  // Stable callback for lesson clicks
  const handleLessonClick = useCallback(
    (unitIndex: number, lessonIndex: number, state: 'completed' | 'current' | 'locked', lessonProgress: { attempts?: number } | undefined) => {
      if (isFreeLocked(unitIndex)) {
        // Free-tier paywall
        setJumpModal({ kind: 'free-upgrade', unitIndex });
      } else if (state === 'locked') {
        if (isGuest && !isUnitUnlocked(LIMITS.free.unlockedUnits, unitIndex)) {
          setJumpModal({ kind: 'guest-signup', unitIndex });
        } else {
          // Check if the unit itself has any accessible lessons
          const unitHasAccessible = courseData[unitIndex].lessons.some(
            (_, li) => isLessonUnlocked(unitIndex, li),
          );
          if (unitHasAccessible) {
            // Locked lesson inside the user's active unit → must progress sequentially
            setJumpModal({ kind: 'within-unit', unitIndex, lessonIndex });
          } else {
            // Unit not yet reached → offer placement test
            setJumpModal({ kind: 'placement-test', unitIndex });
          }
        }
      } else if (state === 'completed' && lessonProgress && (lessonProgress.attempts ?? 0) < 3) {
        startLesson(unitIndex, lessonIndex, false);
      } else if (state === 'completed' && lessonProgress && (lessonProgress.attempts ?? 0) >= 3) {
        startLesson(unitIndex, lessonIndex, true);
      } else {
        startLesson(unitIndex, lessonIndex);
      }
    },
    [isFreeLocked, isGuest, courseData, isLessonUnlocked, startLesson]
  );

  // Auto-scroll to the current lesson after mount + animations settle
  useEffect(() => {
    let cancelled = false;
    let attempts = 0;

    function tryScroll() {
      if (cancelled) return;
      attempts++;
      const target = currentLessonRef.current || currentUnitRef.current;
      if (target && target.getBoundingClientRect().height > 0) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (attempts < 10) {
        // Retry — animations may still be running
        requestAnimationFrame(tryScroll);
      }
    }

    // Wait for initial render + CSS animations to start
    const timer = setTimeout(tryScroll, 600);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto"
      style={{
        paddingBottom: 40,
        scrollBehavior: 'smooth',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {/* Units container */}
      <div
        className="flex flex-col px-3 sm:px-4"
        style={{ paddingTop: 12, paddingBottom: 0, gap: 16 }}
      >
        {courseData.map((unit, unitIndex) => {
          const theme = getUnitTheme(unitIndex);
          const completedInUnit = unit.lessons.filter(
            (l) => progress.completedLessons[l.id]?.passed
          ).length;
          const isActive = unitIndex === activeUnitIndex;
          const isGuestLocked = isGuest && !isUnitUnlocked(LIMITS.free.unlockedUnits, unitIndex);
          const isProLocked = isFreeLocked(unitIndex);
          const isUnitLocked = isGuestLocked || isProLocked;
          const isAllGolden = completedInUnit === unit.lessons.length &&
            unit.lessons.every((l) => progress.completedLessons[l.id]?.golden);

          return (
            <div
              key={unit.id}
              ref={isActive ? currentUnitRef : undefined}
              className={isAllGolden ? 'golden-unit' : ''}
              style={{
                borderRadius: 24,
                overflow: 'hidden',
                backgroundColor: isAllGolden ? undefined : theme.bg,
                transition: 'box-shadow 0.3s ease',
                animation: 'unitSlideUp 0.5s ease backwards',
                animationDelay: `${Math.min(unitIndex * 0.1, 0.5)}s`,
              }}
            >
              <UnitHeader
                unit={unit}
                unitIndex={unitIndex}
                completedInUnit={completedInUnit}
                totalInUnit={unit.lessons.length}
                isLocked={isUnitLocked}
                isAllGolden={isAllGolden}
                lockMessage={
                  isGuestLocked
                    ? 'Sign up to unlock'
                    : isProLocked
                      ? 'Upgrade to Pro to unlock'
                      : undefined
                }
                theme={theme}
                professionId={activeProfession}
              />

              {/* Floating "Jump here" button for placement-test-eligible locked units */}
              {isUnitJumpable(unitIndex) && (
                <JumpHereButton
                  theme={theme}
                  onClick={() => {
                    setJumpModal({ kind: 'placement-test', unitIndex });
                  }}
                />
              )}

              {/* Lesson list — always visible */}
              <div
                className="flex flex-col px-3 sm:px-4"
                style={{ paddingTop: 4, paddingBottom: 20, gap: 8 }}
              >
                {unit.lessons.map((lesson, lessonIndex) => {
                  const state = getLessonState(unitIndex, lessonIndex);
                  const lessonProgress =
                    progress.completedLessons[lesson.id];

                  return (
                    <div
                      key={lesson.id}
                      ref={lesson.id === currentLessonId ? currentLessonRef : undefined}
                      {...(lesson.id === currentLessonId ? { 'data-current-lesson': '' } : {})}
                    >
                      <LessonNode
                        lesson={lesson}
                        unitColor={theme.color}
                        state={state}
                        stars={lessonProgress?.stars}
                        golden={lessonProgress?.golden}
                        index={lessonIndex}
                        onClick={() => handleLessonClick(unitIndex, lessonIndex, state, lessonProgress)}
                        theme={theme}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Course completion marker */}
        <div
          className="flex flex-col items-center"
          style={{ padding: '32px 16px' }}
        >
          <div
            className="flex items-center justify-center"
            style={{
              width: 48,
              height: 48,
              borderRadius: 16,
              background: '#FFF5D4',
              fontSize: 24,
              marginBottom: 12,
            }}
          >
            🏆
          </div>
          <p style={{ fontSize: 15, fontWeight: 800, color: '#3C3C3C' }}>
            Course Complete!
          </p>
          <p
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: '#AFAFAF',
              marginTop: 2,
            }}
          >
            You&apos;re ready for your interview
          </p>
        </div>
      </div>

      {/* Jump / placement-test / sign-up modal */}
      <AnimatePresence>
        {jumpModal &&
          (() => {
            const unit = courseData[jumpModal.unitIndex];
            const theme = getUnitTheme(jumpModal.unitIndex);
            return (
              <motion.div
                key="jump-overlay"
                className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setJumpModal(null)}
              >
                <div className="absolute inset-0 bg-black/40" />
                <motion.div
                  className="relative w-full sm:w-auto bg-white sm:mx-4 overflow-y-auto"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Unit action"
                  style={{
                    maxWidth: 480,
                    maxHeight: 'calc(100vh - 48px)',
                    borderRadius: 24,
                    padding: '20px 20px 32px',
                  }}
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring' as const, damping: 25, stiffness: 300 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Unit badge */}
                  <div className="flex items-center" style={{ gap: 12, marginBottom: 12 }}>
                    <div
                      className="flex items-center justify-center"
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 16,
                        backgroundColor: theme.bg,
                        color: theme.dark,
                        fontSize: 20,
                      }}
                    >
                      {unit.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate" style={{ fontSize: 12, fontWeight: 700, color: '#AFAFAF' }}>
                        Unit {jumpModal.unitIndex + 1}
                      </p>
                      <p className="truncate" style={{ fontSize: 16, fontWeight: 800, color: '#3C3C3C' }}>
                        {unit.title}
                      </p>
                    </div>
                  </div>

                  {/* ─── Within-unit lock ─── */}
                  {jumpModal.kind === 'within-unit' && (
                    <>
                      <p style={{ fontSize: 14, color: '#AFAFAF', fontWeight: 600, marginBottom: 20 }}>
                        Complete the previous lessons in this unit to unlock the next one.
                      </p>
                      <button
                        className="w-full active:scale-[0.98] transition-transform"
                        style={{
                          padding: '16px 0',
                          borderRadius: 16,
                          fontSize: 14,
                          fontWeight: 800,
                          color: '#FFFFFF',
                          background: theme.color,
                          boxShadow: `0 4px 0 ${theme.dark}`,
                          border: 'none',
                          cursor: 'pointer',
                        }}
                        onClick={() => setJumpModal(null)}
                      >
                        Got it
                      </button>
                      {process.env.NODE_ENV === 'development' && (
                        <button
                          className="w-full active:scale-[0.98] transition-transform"
                          style={{
                            marginTop: 8,
                            padding: '12px 0',
                            borderRadius: 16,
                            fontSize: 12,
                            fontWeight: 800,
                            color: '#FFFFFF',
                            background: '#EF4444',
                            border: '2px dashed #B91C1C',
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            debugSkipToLesson(jumpModal.unitIndex, jumpModal.lessonIndex);
                            setJumpModal(null);
                          }}
                        >
                          DEBUG: Skip to Lesson
                        </button>
                      )}
                    </>
                  )}

                  {/* ─── Placement test offer ─── */}
                  {jumpModal.kind === 'placement-test' && (
                    <>
                      <p style={{ fontSize: 14, color: '#AFAFAF', fontWeight: 600, marginBottom: 6 }}>
                        Take a placement test to jump to this unit. You&apos;ll answer questions from the units in between.
                      </p>
                      <p style={{ fontSize: 13, color: '#CFCFCF', fontWeight: 600, marginBottom: 20 }}>
                        Pass with fewer than {PLACEMENT_TEST_CONFIG.maxMistakes} mistakes to unlock.
                      </p>
                      <div className="flex" style={{ gap: 12 }}>
                        <button
                          className="flex-1 active:scale-[0.98] transition-transform"
                          style={{
                            padding: '16px 0',
                            borderRadius: 16,
                            fontSize: 14,
                            fontWeight: 800,
                            color: '#AFAFAF',
                            background: '#F5F5F5',
                            border: 'none',
                            cursor: 'pointer',
                          }}
                          onClick={() => setJumpModal(null)}
                        >
                          Cancel
                        </button>
                        <button
                          className="flex-1 active:scale-[0.98] transition-transform"
                          style={{
                            padding: '16px 0',
                            borderRadius: 16,
                            fontSize: 14,
                            fontWeight: 800,
                            color: '#FFFFFF',
                            background: theme.color,
                            boxShadow: `0 4px 0 ${theme.dark}`,
                            border: 'none',
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            startPlacementTest(jumpModal.unitIndex);
                            setJumpModal(null);
                          }}
                        >
                          Start Test
                        </button>
                      </div>
                      {process.env.NODE_ENV === 'development' && (
                        <button
                          className="w-full active:scale-[0.98] transition-transform"
                          style={{
                            marginTop: 8,
                            padding: '12px 0',
                            borderRadius: 16,
                            fontSize: 12,
                            fontWeight: 800,
                            color: '#FFFFFF',
                            background: '#EF4444',
                            border: '2px dashed #B91C1C',
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            debugSkipToUnit(jumpModal.unitIndex);
                            setJumpModal(null);
                          }}
                        >
                          DEBUG: Skip to Unit
                        </button>
                      )}
                    </>
                  )}

                  {/* ─── Guest sign-up ─── */}
                  {jumpModal.kind === 'guest-signup' && (
                    <>
                      <p style={{ fontSize: 14, color: '#AFAFAF', fontWeight: 600, marginBottom: 20 }}>
                        Create a free account to unlock all units and save your progress across devices!
                      </p>
                      <div className="flex" style={{ gap: 12 }}>
                        <button
                          className="flex-1 active:scale-[0.98] transition-transform"
                          style={{
                            padding: '16px 0',
                            borderRadius: 16,
                            fontSize: 14,
                            fontWeight: 800,
                            color: '#AFAFAF',
                            background: '#F5F5F5',
                            border: 'none',
                            cursor: 'pointer',
                          }}
                          onClick={() => setJumpModal(null)}
                        >
                          Maybe later
                        </button>
                        <button
                          className="flex-1 active:scale-[0.98] transition-transform"
                          style={{
                            padding: '16px 0',
                            borderRadius: 16,
                            fontSize: 14,
                            fontWeight: 800,
                            color: '#FFFFFF',
                            background: '#F5B800',
                            boxShadow: '0 4px 0 #C49200',
                            border: 'none',
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            setJumpModal(null);
                            router.push('/register');
                          }}
                        >
                          Sign Up Free
                        </button>
                      </div>
                    </>
                  )}

                  {/* ─── Free-tier upgrade ─── */}
                  {jumpModal.kind === 'free-upgrade' && (
                    <>
                      <p style={{ fontSize: 14, color: '#AFAFAF', fontWeight: 600, marginBottom: 20 }}>
                        This unit requires a Pro subscription. Upgrade to unlock all 10 units and unlimited practice.
                      </p>
                      <div className="flex" style={{ gap: 12 }}>
                        <button
                          className="flex-1 active:scale-[0.98] transition-transform"
                          style={{
                            padding: '16px 0',
                            borderRadius: 16,
                            fontSize: 14,
                            fontWeight: 800,
                            color: '#AFAFAF',
                            background: '#F5F5F5',
                            border: 'none',
                            cursor: 'pointer',
                          }}
                          onClick={() => setJumpModal(null)}
                        >
                          Maybe later
                        </button>
                        <button
                          className="flex-1 flex items-center justify-center active:scale-[0.98] transition-transform"
                          style={{
                            gap: 6,
                            padding: '16px 0',
                            borderRadius: 16,
                            fontSize: 14,
                            fontWeight: 800,
                            color: '#FFFFFF',
                            background: theme.color,
                            boxShadow: `0 4px 0 ${theme.dark}`,
                            border: 'none',
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            setJumpModal(null);
                            setShowUpgradeModal(true);
                          }}
                        >
                          <Sparkles style={{ width: 16, height: 16 }} />
                          Upgrade to Pro
                        </button>
                      </div>
                    </>
                  )}
                </motion.div>
              </motion.div>
            );
          })()}
      </AnimatePresence>

      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        reason="Unlock all 10 course units"
      />

      {/* Sticky anchor for the scroll-to-current button */}
      <div style={{
        position: 'sticky',
        bottom: 24,
        height: 0,
        pointerEvents: 'none',
        zIndex: 40,
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: 16,
      }}>
        <div style={{ pointerEvents: 'auto', marginTop: -48 }}>
          <AnimatePresence>
            {currentLessonId && (
              <ScrollToCurrentButton scrollRef={scrollRef} targetRef={currentLessonRef} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
