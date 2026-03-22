'use client';

import { useEffect, useRef, useCallback, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import { course } from '@/data/course';
import { useCourseStore } from '@/store/useCourseStore';
import { useSubscription } from '@/hooks/useSubscription';
import { getUnitTheme } from '@/lib/unitThemes';
import { UpgradeModal } from '@/components/ui/UpgradeModal';
import { UnitHeader } from './UnitHeader';
import { LessonNode } from './LessonNode';

export function CourseMap() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const currentUnitRef = useRef<HTMLDivElement>(null);
  const currentLessonRef = useRef<HTMLDivElement>(null);
  const { progress, startLesson, isLessonUnlocked } = useCourseStore();
  const { status } = useSession();
  const router = useRouter();
  const isGuest = status !== 'authenticated';
  const { isProUser } = useSubscription();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [jumpConfirm, setJumpConfirm] = useState<{
    unitIndex: number;
    lessonIndex: number;
  } | null>(null);

  const isFreeLocked = (unitIndex: number) =>
    !isGuest && !isProUser && unitIndex > 0;

  const getLessonState = useCallback(
    (
      unitIndex: number,
      lessonIndex: number
    ): 'completed' | 'current' | 'locked' => {
      const lessonId = course[unitIndex]?.lessons[lessonIndex]?.id;
      if (!lessonId) return 'locked';

      if (isGuest && unitIndex > 0) return 'locked';
      if (isFreeLocked(unitIndex)) return 'locked';

      if (progress.completedLessons[lessonId]) return 'completed';
      if (isLessonUnlocked(unitIndex, lessonIndex)) return 'current';
      return 'locked';
    },
    [progress.completedLessons, isLessonUnlocked, isGuest, isProUser] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const findActiveUnitIndex = useCallback((): number => {
    for (let ui = 0; ui < course.length; ui++) {
      for (let li = 0; li < course[ui].lessons.length; li++) {
        if (getLessonState(ui, li) === 'current') return ui;
      }
    }
    return 0;
  }, [getLessonState]);

  const activeUnitIndex = findActiveUnitIndex();

  // Find the exact first "current" lesson to scroll to
  const currentLessonId = useMemo(() => {
    for (let ui = 0; ui < course.length; ui++) {
      for (let li = 0; li < course[ui].lessons.length; li++) {
        if (getLessonState(ui, li) === 'current') {
          return course[ui].lessons[li].id;
        }
      }
    }
    return null;
  }, [getLessonState]);

  // Only the active unit is expanded; everything else collapsed
  const [expandedUnits, setExpandedUnits] = useState<Set<number>>(
    () => new Set([activeUnitIndex])
  );

  // When the active unit changes (e.g. user completes a unit), re-focus
  useEffect(() => {
    setExpandedUnits(new Set([activeUnitIndex]));
  }, [activeUnitIndex]);

  const toggleUnit = (index: number) => {
    setExpandedUnits((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

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
        className="flex flex-col"
        style={{ padding: '12px 16px', gap: 16 }}
      >
        {course.map((unit, unitIndex) => {
          const theme = getUnitTheme(unitIndex);
          const completedInUnit = unit.lessons.filter(
            (l) => progress.completedLessons[l.id]
          ).length;
          const isExpanded = expandedUnits.has(unitIndex);
          const isActive = unitIndex === activeUnitIndex;
          const isGuestLocked = isGuest && unitIndex > 0;
          const isProLocked = isFreeLocked(unitIndex);
          const isUnitLocked = isGuestLocked || isProLocked;

          return (
            <div
              key={unit.id}
              ref={isActive ? currentUnitRef : undefined}
              style={{
                borderRadius: 24,
                overflow: 'hidden',
                backgroundColor: theme.bg,
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
                isExpanded={isExpanded}
                isLocked={isUnitLocked}
                lockMessage={
                  isGuestLocked
                    ? 'Sign up to unlock'
                    : isProLocked
                      ? 'Upgrade to Pro to unlock'
                      : undefined
                }
                onToggle={() => {
                  if (isGuestLocked) {
                    router.push('/register');
                    return;
                  }
                  toggleUnit(unitIndex);
                }}
                theme={theme}
              />

              {/* Expandable lesson list */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    key={`lessons-${unitIndex}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div
                      className="flex flex-col"
                      style={{ padding: '4px 16px 20px', gap: 8 }}
                    >
                      {unit.lessons.map((lesson, lessonIndex) => {
                        const state = getLessonState(unitIndex, lessonIndex);
                        const lessonProgress =
                          progress.completedLessons[lesson.id];

                        return (
                          <div
                            key={lesson.id}
                            ref={lesson.id === currentLessonId ? currentLessonRef : undefined}
                          >
                            <LessonNode
                              lesson={lesson}
                              unitColor={theme.color}
                              state={state}
                              stars={lessonProgress?.stars}
                              golden={lessonProgress?.golden}
                              index={lessonIndex}
                              onClick={() => {
                                if (isProLocked) {
                                  setShowUpgradeModal(true);
                                } else if (state === 'locked') {
                                  setJumpConfirm({ unitIndex, lessonIndex });
                                } else if (state === 'completed' && !lessonProgress?.golden) {
                                  // Completed but not golden: start golden challenge
                                  startLesson(unitIndex, lessonIndex, true);
                                } else {
                                  startLesson(unitIndex, lessonIndex);
                                }
                              }}
                              theme={theme}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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

      {/* Jump / sign-up modal */}
      <AnimatePresence>
        {jumpConfirm &&
          (() => {
            const unit = course[jumpConfirm.unitIndex];
            const lesson = unit.lessons[jumpConfirm.lessonIndex];
            const theme = getUnitTheme(jumpConfirm.unitIndex);
            return (
              <motion.div
                key="jump-overlay"
                className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setJumpConfirm(null)}
              >
                <div className="absolute inset-0 bg-black/40" />
                <motion.div
                  className="relative w-full sm:w-auto bg-white sm:mx-4"
                  style={{
                    maxWidth: 480,
                    borderRadius: 24,
                    padding: '20px 20px 32px',
                  }}
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{
                    type: 'spring' as const,
                    damping: 25,
                    stiffness: 300,
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div
                    className="flex items-center"
                    style={{ gap: 12, marginBottom: 12 }}
                  >
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
                      {lesson.icon}
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: '#AFAFAF',
                        }}
                      >
                        {unit.title}
                      </p>
                      <p
                        style={{
                          fontSize: 16,
                          fontWeight: 800,
                          color: '#3C3C3C',
                        }}
                      >
                        {lesson.title}
                      </p>
                    </div>
                  </div>

                  {isGuest && jumpConfirm.unitIndex > 0 ? (
                    <>
                      <p
                        style={{
                          fontSize: 14,
                          color: '#AFAFAF',
                          fontWeight: 600,
                          marginBottom: 20,
                        }}
                      >
                        Create a free account to unlock all units and save your
                        progress across devices!
                      </p>
                      <div className="flex" style={{ gap: 12 }}>
                        <button
                          className="flex-1 active:scale-[0.98] transition-transform"
                          style={{
                            padding: '14px 0',
                            borderRadius: 16,
                            fontSize: 14,
                            fontWeight: 800,
                            color: '#AFAFAF',
                            background: '#F5F5F5',
                            border: 'none',
                            cursor: 'pointer',
                          }}
                          onClick={() => setJumpConfirm(null)}
                        >
                          Maybe later
                        </button>
                        <button
                          className="flex-1 active:scale-[0.98] transition-transform"
                          style={{
                            padding: '14px 0',
                            borderRadius: 16,
                            fontSize: 14,
                            fontWeight: 800,
                            color: '#FFFFFF',
                            background: '#58CC02',
                            boxShadow: '0 4px 0 #46A302',
                            border: 'none',
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            setJumpConfirm(null);
                            router.push('/register');
                          }}
                        >
                          Sign Up Free
                        </button>
                      </div>
                    </>
                  ) : isFreeLocked(jumpConfirm.unitIndex) ? (
                    <>
                      <p
                        style={{
                          fontSize: 14,
                          color: '#AFAFAF',
                          fontWeight: 600,
                          marginBottom: 20,
                        }}
                      >
                        This unit requires a Pro subscription. Upgrade to unlock
                        all 10 units and unlimited practice.
                      </p>
                      <div className="flex" style={{ gap: 12 }}>
                        <button
                          className="flex-1 active:scale-[0.98] transition-transform"
                          style={{
                            padding: '14px 0',
                            borderRadius: 16,
                            fontSize: 14,
                            fontWeight: 800,
                            color: '#AFAFAF',
                            background: '#F5F5F5',
                            border: 'none',
                            cursor: 'pointer',
                          }}
                          onClick={() => setJumpConfirm(null)}
                        >
                          Maybe later
                        </button>
                        <button
                          className="flex-1 flex items-center justify-center active:scale-[0.98] transition-transform"
                          style={{
                            gap: 6,
                            padding: '14px 0',
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
                            setJumpConfirm(null);
                            setShowUpgradeModal(true);
                          }}
                        >
                          <Sparkles style={{ width: 16, height: 16 }} />
                          Upgrade to Pro
                        </button>
                      </div>
                    </>
                  ) : isProUser ? (
                    <>
                      <p
                        style={{
                          fontSize: 14,
                          color: '#AFAFAF',
                          fontWeight: 600,
                          marginBottom: 20,
                        }}
                      >
                        Jump ahead to this lesson? You can always go back and
                        complete earlier ones later.
                      </p>
                      <div className="flex" style={{ gap: 12 }}>
                        <button
                          className="flex-1 active:scale-[0.98] transition-transform"
                          style={{
                            padding: '14px 0',
                            borderRadius: 16,
                            fontSize: 14,
                            fontWeight: 800,
                            color: '#AFAFAF',
                            background: '#F5F5F5',
                            border: 'none',
                            cursor: 'pointer',
                          }}
                          onClick={() => setJumpConfirm(null)}
                        >
                          Cancel
                        </button>
                        <button
                          className="flex-1 active:scale-[0.98] transition-transform"
                          style={{
                            padding: '14px 0',
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
                            startLesson(
                              jumpConfirm.unitIndex,
                              jumpConfirm.lessonIndex
                            );
                            setJumpConfirm(null);
                          }}
                        >
                          Jump to Lesson
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p
                        style={{
                          fontSize: 14,
                          color: '#AFAFAF',
                          fontWeight: 600,
                          marginBottom: 20,
                        }}
                      >
                        Complete lessons in order to progress, or upgrade to Pro
                        to jump ahead to any lesson.
                      </p>
                      <div className="flex" style={{ gap: 12 }}>
                        <button
                          className="flex-1 active:scale-[0.98] transition-transform"
                          style={{
                            padding: '14px 0',
                            borderRadius: 16,
                            fontSize: 14,
                            fontWeight: 800,
                            color: '#AFAFAF',
                            background: '#F5F5F5',
                            border: 'none',
                            cursor: 'pointer',
                          }}
                          onClick={() => setJumpConfirm(null)}
                        >
                          OK
                        </button>
                        <button
                          className="flex-1 flex items-center justify-center active:scale-[0.98] transition-transform"
                          style={{
                            gap: 6,
                            padding: '14px 0',
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
                            setJumpConfirm(null);
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
    </div>
  );
}
