'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { course } from '@/data/course';
import { useCourseStore } from '@/store/useCourseStore';
import { UnitHeader } from './UnitHeader';
import { LessonNode } from './LessonNode';

export function CourseMap() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const currentUnitRef = useRef<HTMLDivElement>(null);
  const { progress, startLesson, isLessonUnlocked } = useCourseStore();
  const { status } = useSession();
  const router = useRouter();
  const isGuest = status !== 'authenticated';
  const [jumpConfirm, setJumpConfirm] = useState<{
    unitIndex: number;
    lessonIndex: number;
  } | null>(null);

  // Determine lesson state
  const getLessonState = useCallback(
    (
      unitIndex: number,
      lessonIndex: number
    ): 'completed' | 'current' | 'locked' => {
      const lessonId = course[unitIndex]?.lessons[lessonIndex]?.id;
      if (!lessonId) return 'locked';

      if (isGuest && unitIndex > 0) return 'locked';

      if (progress.completedLessons[lessonId]) return 'completed';
      if (isLessonUnlocked(unitIndex, lessonIndex)) return 'current';
      return 'locked';
    },
    [progress.completedLessons, isLessonUnlocked, isGuest]
  );

  // Find the unit containing the first current lesson
  const findActiveUnitIndex = useCallback((): number => {
    for (let ui = 0; ui < course.length; ui++) {
      for (let li = 0; li < course[ui].lessons.length; li++) {
        if (getLessonState(ui, li) === 'current') return ui;
      }
    }
    return 0;
  }, [getLessonState]);

  const activeUnitIndex = findActiveUnitIndex();

  // Track expanded units — auto-expand the active unit
  const [expandedUnits, setExpandedUnits] = useState<Set<number>>(
    new Set([activeUnitIndex])
  );

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

  // Auto-scroll to the active unit on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentUnitRef.current && scrollRef.current) {
        const container = scrollRef.current;
        const element = currentUnitRef.current;
        const containerRect = container.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();

        const offset =
          container.scrollTop +
          (elementRect.top - containerRect.top) -
          containerRect.height * 0.15;

        container.scrollTo({
          top: Math.max(0, offset),
          behavior: 'smooth',
        });
      }
    }, 350);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto"
      style={{
        paddingTop: 12,
        paddingBottom: 120,
        scrollBehavior: 'smooth',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      <div className="max-w-lg mx-auto space-y-3">
        {course.map((unit, unitIndex) => {
          const completedInUnit = unit.lessons.filter(
            (l) => progress.completedLessons[l.id]
          ).length;
          const isExpanded = expandedUnits.has(unitIndex);
          const isActive = unitIndex === activeUnitIndex;
          const isGuestLocked = isGuest && unitIndex > 0;

          return (
            <div
              key={unit.id}
              ref={isActive ? currentUnitRef : undefined}
            >
              <UnitHeader
                unit={unit}
                unitIndex={unitIndex}
                completedInUnit={completedInUnit}
                totalInUnit={unit.lessons.length}
                isExpanded={isExpanded}
                onToggle={() => toggleUnit(unitIndex)}
              />

              {/* Expandable lesson list */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    key={`lessons-${unitIndex}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="mx-4 mt-1 mb-2 px-1 space-y-1">
                      {unit.lessons.map((lesson, lessonIndex) => {
                        const state = getLessonState(unitIndex, lessonIndex);
                        const lessonProgress =
                          progress.completedLessons[lesson.id];

                        return (
                          <LessonNode
                            key={lesson.id}
                            lesson={lesson}
                            unitColor={unit.color}
                            state={state}
                            stars={lessonProgress?.stars}
                            index={lessonIndex}
                            onClick={() => {
                              if (state === 'locked') {
                                setJumpConfirm({ unitIndex, lessonIndex });
                              } else {
                                startLesson(unitIndex, lessonIndex);
                              }
                            }}
                          />
                        );
                      })}

                      {/* Guest lock banner for units 2+ */}
                      {isGuestLocked && (
                        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 mt-2">
                          <span className="text-lg">&#x1F512;</span>
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-gray-700">
                              Sign up to unlock this unit
                            </p>
                            <p className="text-[11px] text-gray-400">
                              Free account &middot; saves your progress
                            </p>
                          </div>
                          <button
                            onClick={() => router.push('/register')}
                            className="px-3 py-1.5 rounded-lg bg-[#58CC02] text-white text-xs font-bold"
                          >
                            Sign Up
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {/* Course completion */}
        <div className="flex flex-col items-center py-8 px-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-xl mb-3">
            &#x1F3C6;
          </div>
          <p className="text-sm font-semibold text-gray-700">
            Course Complete!
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
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
            return (
              <motion.div
                key="jump-overlay"
                className="fixed inset-0 z-50 flex items-end justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setJumpConfirm(null)}
              >
                <div className="absolute inset-0 bg-black/40" />
                <motion.div
                  className="relative w-full max-w-lg bg-white rounded-t-2xl p-5 pb-8"
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
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="flex items-center justify-center rounded-xl text-white text-xl"
                      style={{
                        width: 48,
                        height: 48,
                        backgroundColor: unit.color,
                      }}
                    >
                      {lesson.icon}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-400">
                        {unit.title}
                      </p>
                      <p className="text-base font-bold text-gray-900">
                        {lesson.title}
                      </p>
                    </div>
                  </div>

                  {isGuest && jumpConfirm.unitIndex > 0 ? (
                    <>
                      <p className="text-sm text-gray-500 mb-5">
                        Create a free account to unlock all units and save
                        your progress across devices!
                      </p>
                      <div className="flex gap-3">
                        <button
                          className="flex-1 py-3 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100 active:bg-gray-200 transition-colors"
                          onClick={() => setJumpConfirm(null)}
                        >
                          Maybe later
                        </button>
                        <button
                          className="flex-1 py-3 rounded-xl text-sm font-semibold text-white bg-[#58CC02] active:bg-[#4CAD02] transition-colors"
                          onClick={() => {
                            setJumpConfirm(null);
                            router.push('/register');
                          }}
                        >
                          Sign Up Free
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-gray-500 mb-5">
                        Jump ahead to this lesson? You can always go back
                        and complete earlier ones later.
                      </p>
                      <div className="flex gap-3">
                        <button
                          className="flex-1 py-3 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100 active:bg-gray-200 transition-colors"
                          onClick={() => setJumpConfirm(null)}
                        >
                          Cancel
                        </button>
                        <button
                          className="flex-1 py-3 rounded-xl text-sm font-semibold text-white active:opacity-90 transition-opacity"
                          style={{ backgroundColor: unit.color }}
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
                  )}
                </motion.div>
              </motion.div>
            );
          })()}
      </AnimatePresence>
    </div>
  );
}
