'use client';

import { motion } from 'framer-motion';
import type { Lesson } from '@/data/course/types';

interface LessonRowProps {
  lesson: Lesson;
  unitColor: string;
  state: 'completed' | 'current' | 'locked';
  stars?: number;
  index: number;
  onClick: () => void;
}

function StarPips({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} of 3 stars`}>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="rounded-full"
          style={{
            width: 6,
            height: 6,
            backgroundColor: i <= count ? '#F59E0B' : '#E2E8F0',
          }}
        />
      ))}
    </div>
  );
}

export function LessonNode({ lesson, unitColor, state, stars, index, onClick }: LessonRowProps) {
  return (
    <motion.button
      className="w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-colors text-left"
      style={{
        backgroundColor:
          state === 'current'
            ? `${unitColor}10`
            : state === 'completed'
              ? 'white'
              : 'transparent',
        border:
          state === 'current'
            ? `2px solid ${unitColor}40`
            : '2px solid transparent',
        opacity: state === 'locked' ? 0.45 : 1,
        cursor: state === 'locked' ? 'default' : 'pointer',
      }}
      onClick={onClick}
      whileTap={state !== 'locked' ? { scale: 0.98 } : undefined}
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: state === 'locked' ? 0.45 : 1, x: 0 }}
      transition={{ delay: index * 0.04, duration: 0.25 }}
      aria-label={
        state === 'completed'
          ? `Replay: ${lesson.title}`
          : state === 'current'
            ? `Start: ${lesson.title}`
            : `Locked: ${lesson.title}`
      }
    >
      {/* Icon circle */}
      <div
        className="flex-shrink-0 flex items-center justify-center rounded-lg text-base"
        style={{
          width: 40,
          height: 40,
          backgroundColor:
            state === 'completed'
              ? `${unitColor}15`
              : state === 'current'
                ? unitColor
                : '#F1F5F9',
          color:
            state === 'completed'
              ? unitColor
              : state === 'current'
                ? 'white'
                : '#94A3B8',
        }}
      >
        {state === 'completed' ? (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M4 9.5L7.5 13L14 5"
              stroke={unitColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : state === 'locked' ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="3" y="7" width="10" height="7" rx="2" fill="#CBD5E1" />
            <path
              d="M5 7V5a3 3 0 1 1 6 0v2"
              stroke="#CBD5E1"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <span>{lesson.icon}</span>
        )}
      </div>

      {/* Title + XP */}
      <div className="flex-1 min-w-0">
        <p
          className="text-sm font-semibold leading-snug truncate"
          style={{
            color: state === 'locked' ? '#94A3B8' : '#1E293B',
          }}
        >
          {lesson.title}
        </p>
        <p
          className="text-xs mt-0.5"
          style={{
            color: state === 'locked' ? '#CBD5E1' : '#94A3B8',
          }}
        >
          {lesson.questions.length} questions &middot; {lesson.xpReward} XP
        </p>
      </div>

      {/* Right side: stars or action hint */}
      <div className="flex-shrink-0">
        {state === 'completed' && stars !== undefined && stars > 0 ? (
          <StarPips count={stars} />
        ) : state === 'current' ? (
          <div
            className="px-3 py-1 rounded-full text-xs font-bold text-white"
            style={{ backgroundColor: unitColor }}
          >
            START
          </div>
        ) : null}
      </div>
    </motion.button>
  );
}

// Keep the old export name for backward compat with CourseMap imports
export { LessonNode as LessonRow };
