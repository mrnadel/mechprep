'use client';

import { motion } from 'framer-motion';
import type { Lesson } from '@/data/course/types';
import type { UnitTheme } from '@/lib/unitThemes';

interface LessonRowProps {
  lesson: Lesson;
  unitColor: string;
  state: 'completed' | 'current' | 'locked';
  stars?: number;
  golden?: boolean;
  index: number;
  onClick: () => void;
  theme: UnitTheme;
}

function CompletedDots({ count, color, isGolden }: { count: number; color: string; isGolden?: boolean }) {
  return (
    <div className="flex items-center" style={{ gap: 4 }}>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className={i <= count && isGolden ? 'golden-dot' : ''}
          style={{
            width: 9,
            height: 9,
            borderRadius: '50%',
            backgroundColor: i <= count ? (isGolden ? undefined : color) : '#D4D4D4',
          }}
        />
      ))}
    </div>
  );
}

const GOLD = '#FFB800';
const GOLD_DARK = '#C8960B';

function GoldenStar({ filled }: { filled: boolean }) {
  if (!filled) {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"
          fill="none"
          stroke={GOLD}
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="golden-star-pulse">
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"
        fill={GOLD}
        stroke={GOLD_DARK}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LessonNode({
  lesson,
  state,
  stars,
  golden,
  index,
  onClick,
  theme,
}: LessonRowProps) {
  return (
    <motion.button
      className={`w-full flex items-center text-left ${state === 'completed' && golden ? 'golden-node' : ''}`}
      style={{
        padding: '12px 14px',
        background:
          state === 'locked' ? 'transparent'
          : (state === 'completed' && golden) ? undefined  /* handled by .golden-node */
          : 'rgba(255,255,255,0.85)',
        borderRadius: 16,
        gap: 12,
        opacity: state === 'locked' ? 0.45 : 1,
        cursor: state === 'locked' ? 'default' : 'pointer',
        boxShadow:
          state === 'locked'
            ? 'none'
            : (state === 'completed' && golden) ? undefined /* handled by .golden-node */
            : `0 3px 0 ${theme.dark}22, 0 1px 3px rgba(0,0,0,0.06)`,
        border:
          state === 'locked'
            ? 'none'
            : (state === 'completed' && golden) ? undefined /* handled by .golden-node */
            : '1.5px solid rgba(255,255,255,0.9)',
        position: 'relative',
        WebkitTapHighlightColor: 'transparent',
      }}
      onClick={onClick}
      whileHover={state !== 'locked' ? { scale: 1.015, ...((state === 'completed' && golden) ? {} : { backgroundColor: 'rgba(255,255,255,0.95)' }) } : undefined}
      whileTap={state !== 'locked' ? { scale: 0.97, y: 2, boxShadow: (state === 'completed' && golden) ? '0 1px 0 #996E00' : `0 1px 0 ${theme.dark}22, 0 0px 2px rgba(0,0,0,0.04)` } : undefined}
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: state === 'locked' ? 0.45 : 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.25, scale: { duration: 0.1 }, y: { duration: 0.1 }, boxShadow: { duration: 0.1 } }}
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
        className={`flex items-center justify-center flex-shrink-0 ${state === 'completed' && golden ? 'golden-icon-box' : ''}`}
        style={{
          width: 38,
          height: 38,
          borderRadius: 12,
          background:
            state === 'locked' ? '#F0F0F0'
            : (state === 'completed' && golden) ? undefined /* handled by .golden-icon-box */
            : `${theme.color}20`,
          fontSize: 16,
        }}
      >
        {state === 'completed' && golden ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M5 16h14l-2-8-3.5 4L12 6l-1.5 6L7 8l-2 8z" fill={GOLD} />
            <path d="M5 16h14v2a1 1 0 01-1 1H6a1 1 0 01-1-1v-2z" fill={GOLD} />
            <circle cx="7.5" cy="16" r="1.2" fill="#FFF8E1" />
            <circle cx="12" cy="16" r="1.2" fill="#FFF8E1" />
            <circle cx="16.5" cy="16" r="1.2" fill="#FFF8E1" />
          </svg>
        ) : state === 'completed' ? (
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
          <div className="flex items-center" style={{ gap: 8 }}>
            <CompletedDots count={stars} color={golden ? GOLD : theme.color} isGolden={golden} />
            <GoldenStar filled={!!golden} />
          </div>
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
