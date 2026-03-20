'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useCourseStore } from '@/store/useCourseStore';
import { course } from '@/data/course';
import { cn } from '@/lib/utils';

type PopoverType = 'streak' | 'xp' | null;

export function CourseHeader() {
  const { data: session } = useSession();
  const progress = useCourseStore((s) => s.progress);
  const [popover, setPopover] = useState<PopoverType>(null);

  const userName = progress.displayName || session?.user?.name || 'Engineer';
  const userImage = session?.user?.image;
  const initial = userName.charAt(0).toUpperCase();

  const completedCount = Object.keys(progress.completedLessons).length;
  const totalLessons = course.reduce((s, u) => s + u.lessons.length, 0);
  const completedPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const togglePopover = (type: PopoverType) => {
    setPopover((prev) => (prev === type ? null : type));
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-surface-200">
        <div className="flex items-center justify-between h-14 px-4 max-w-lg mx-auto">
          {/* Left: Streak */}
          <button
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold min-w-[60px] justify-center transition-transform active:scale-95',
              progress.currentStreak > 0
                ? 'bg-orange-50 text-orange-600'
                : 'bg-surface-100 text-surface-400'
            )}
            aria-label={`${progress.currentStreak} day streak`}
            onClick={() => togglePopover('streak')}
          >
            <span aria-hidden="true">&#x1F525;</span>
            <span>{progress.currentStreak}</span>
          </button>

          {/* Center: App name */}
          <h1 className="text-lg font-bold text-surface-900 tracking-tight select-none">
            MechPrep
          </h1>

          {/* Profile avatar */}
          <Link
            href="/profile"
            className="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden transition-transform active:scale-95"
          >
            {userImage ? (
              <img src={userImage} alt={userName} className="w-8 h-8 rounded-full" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                {initial}
              </div>
            )}
          </Link>

          {/* Right: XP */}
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 text-purple-600 text-sm font-semibold min-w-[60px] justify-center transition-transform active:scale-95"
            aria-label={`${progress.totalXp} experience points`}
            onClick={() => togglePopover('xp')}
          >
            <span aria-hidden="true">&#x1F48E;</span>
            <span>{progress.totalXp.toLocaleString()}</span>
          </button>
        </div>
      </header>

      {/* Popover overlay */}
      <AnimatePresence>
        {popover && (
          <motion.div
            key="popover-backdrop"
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPopover(null)}
          >
            <div className="absolute inset-0 bg-black/20" />
            <div className="max-w-lg mx-auto relative">
              <motion.div
                className="absolute top-1 mx-4 left-0 right-0 bg-white rounded-2xl shadow-xl border border-surface-200 p-4"
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                onClick={(e) => e.stopPropagation()}
              >
                {popover === 'streak' ? (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">&#x1F525;</span>
                      <h3 className="text-base font-bold text-surface-900">Practice Streak</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="bg-orange-50 rounded-xl p-3 text-center">
                        <p className="text-2xl font-bold text-orange-600">{progress.currentStreak}</p>
                        <p className="text-xs text-orange-500 mt-0.5">Current streak</p>
                      </div>
                      <div className="bg-surface-50 rounded-xl p-3 text-center">
                        <p className="text-2xl font-bold text-surface-700">{progress.longestStreak}</p>
                        <p className="text-xs text-surface-400 mt-0.5">Longest streak</p>
                      </div>
                    </div>
                    <p className="text-xs text-surface-400">
                      Complete at least one lesson each day to keep your streak alive. Consistency is key to interview readiness!
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">&#x1F48E;</span>
                      <h3 className="text-base font-bold text-surface-900">Experience Points</h3>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-3 text-center mb-3">
                      <p className="text-2xl font-bold text-purple-600">{progress.totalXp.toLocaleString()} XP</p>
                      <p className="text-xs text-purple-400 mt-0.5">Total earned</p>
                    </div>
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-surface-500">Course progress</span>
                        <span className="font-semibold text-surface-700">{completedCount}/{totalLessons} lessons</span>
                      </div>
                      <div className="h-2 bg-surface-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-500 rounded-full transition-all duration-500"
                          style={{ width: `${completedPercent}%` }}
                        />
                      </div>
                    </div>
                    <p className="text-xs text-surface-400">
                      Earn XP by completing lessons. Get more stars for higher accuracy — 3 stars = 3x XP!
                    </p>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
