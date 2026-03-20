'use client';

import { motion } from 'framer-motion';
import type { Lesson } from '@/data/course/types';
import type { UnitTheme } from '@/lib/unitThemes';

interface LessonRowProps {
  lesson: Lesson;
  unitColor: string;
  state: 'completed' | 'current' | 'locked';
  stars?: number;
  index: number;
  onClick: () => void;
  theme: UnitTheme;
}

function CompletedDots({ count, color }: { count: number; color: string }) {
  return (
    <div className="flex items-center" style={{ gap: 4 }}>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            width: 9,
            height: 9,
            borderRadius: '50%',
            backgroundColor: i <= count ? color : '#D4D4D4',
          }}
        />
      ))}
    </div>
  );
}

export function LessonNode({
  lesson,
  state,
  stars,
  index,
  onClick,
  theme,
}: LessonRowProps) {
  return (
    <motion.button
      className="w-full flex items-center text-left"
      style={{
        padding: '12px 14px',
        background:
          state === 'locked' ? 'transparent' : 'rgba(255,255,255,0.65)',
        borderRadius: 16,
        gap: 12,
        opacity: state === 'locked' ? 0.45 : 1,
        cursor: state === 'locked' ? 'default' : 'pointer',
      }}
      onClick={onClick}
      whileTap={state !== 'locked' ? { scale: 0.99 } : undefined}
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: state === 'locked' ? 0.45 : 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.25 }}
      aria-label={
        state === 'completed'
          ? `Replay: ${lesson.title}`
          : state === 'current'
            ? `Start: ${lesson.title}`
            : `Locked: ${lesson.title}`
      }
    >
      {/* Icon */}
      <div
        className="flex items-center justify-center flex-shrink-0"
        style={{
          width: 38,
          height: 38,
          borderRadius: 12,
          background:
            state === 'locked' ? '#F0F0F0' : `${theme.color}20`,
          fontSize: 16,
        }}
      >
        {state === 'completed' ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M5 10.5L8.5 14L15 6"
              stroke={theme.color}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : state === 'locked' ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <rect x="5" y="11" width="14" height="10" rx="2" fill="#D4D4D4" />
            <path
              d="M8 11V7a4 4 0 118 0v4"
              stroke="#D4D4D4"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="12" cy="16" r="1.5" fill="#AFAFAF" />
          </svg>
        ) : (
          <span>{lesson.icon}</span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div
          style={{
            fontSize: 14.5,
            fontWeight: 700,
            color: state === 'locked' ? '#AFAFAF' : '#3C3C3C',
            lineHeight: 1.2,
          }}
        >
          {lesson.title}
        </div>
        <div
          style={{
            fontSize: 11.5,
            fontWeight: 600,
            color: '#AFAFAF',
            marginTop: 1,
          }}
        >
          {lesson.questions.length} questions &middot; {lesson.xpReward} XP
        </div>
      </div>

      {/* Badge */}
      <div className="flex-shrink-0">
        {state === 'completed' && stars !== undefined && stars > 0 ? (
          <CompletedDots count={stars} color={theme.color} />
        ) : state === 'current' ? (
          <div
            className="go-btn-pulse"
            style={
              {
                background: theme.color,
                color: '#FFFFFF',
                fontSize: 13,
                fontWeight: 800,
                padding: '8px 20px',
                borderRadius: 12,
                textTransform: 'uppercase',
                letterSpacing: 0.8,
                boxShadow: `0 4px 0 ${theme.dark}`,
                '--go-shadow-color': theme.dark,
                '--go-glow-color': `${theme.color}25`,
              } as React.CSSProperties
            }
          >
            Go
          </div>
        ) : state === 'locked' ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            style={{ opacity: 0.35 }}
          >
            <rect x="5" y="11" width="14" height="10" rx="2" fill="#D4D4D4" />
            <path
              d="M8 11V7a4 4 0 118 0v4"
              stroke="#D4D4D4"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="12" cy="16" r="1.5" fill="#AFAFAF" />
          </svg>
        ) : null}
      </div>
    </motion.button>
  );
}

export { LessonNode as LessonRow };
