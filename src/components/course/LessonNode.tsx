'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import type { Lesson, LessonType } from '@/data/course/types';
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

const GOLD = '#FFB800';
const GOLD_DARK = '#B38600';

/** Simple bold white icons — Duolingo style */
function LessonIcon({ type, size = 28 }: { type: LessonType; size?: number }) {
  switch (type) {
    case 'conversation':
      // Speech bubble
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="13" rx="4" fill="#FFF" />
          <path d="M8 16v4.5l5-4.5H8Z" fill="#FFF" />
        </svg>
      );
    case 'speed-round':
      // Lightning bolt
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M14.5 2L7 13h5.5L11 22L19 10h-5.5L14.5 2Z" fill="#FFF" />
        </svg>
      );
    case 'timeline':
      // Scroll / list
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <rect x="5" y="4.5" width="14" height="3.5" rx="1.75" fill="#FFF" />
          <rect x="5" y="10.25" width="14" height="3.5" rx="1.75" fill="#FFF" />
          <rect x="5" y="16" width="14" height="3.5" rx="1.75" fill="#FFF" />
        </svg>
      );
    case 'case-study':
      // Magnifying glass
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <circle cx="10.5" cy="10.5" r="7" stroke="#FFF" strokeWidth="3.2" />
          <path d="M16 16L21 21" stroke="#FFF" strokeWidth="3.2" strokeLinecap="round" />
        </svg>
      );
    case 'standard':
    default:
      // Open book (two pages)
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="5" width="7.8" height="14" rx="2" fill="#FFF" />
          <rect x="13.2" y="5" width="7.8" height="14" rx="2" fill="#FFF" />
        </svg>
      );
  }
}

/** White checkmark for completed lessons */
function CheckIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M5.5 12.5L10 17L18.5 7"
        stroke="#FFF"
        strokeWidth="3.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** White crown for golden lessons */
function CrownIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 16.5h16L18 7.5l-3.5 4.5L12 5l-2.5 7L6 7.5 4 16.5Z" fill="#FFF" />
      <rect x="4" y="16.5" width="16" height="3" rx="1" fill="#FFF" />
    </svg>
  );
}

const CIRCLE = 70;
const DEPTH = 7;

export const LessonNode = memo(function LessonNode({
  lesson,
  state,
  stars,
  golden,
  index,
  onClick,
  theme,
}: LessonRowProps) {
  const isGold = state === 'completed' && golden;

  const bg = state === 'locked'
    ? '#D8D8D8'
    : isGold ? GOLD : theme.color;
  const shadow = state === 'locked'
    ? '#B0B0B0'
    : isGold ? GOLD_DARK : theme.dark;

  // Which icon to show inside the circle
  const icon = isGold
    ? <CrownIcon size={30} />
    : state === 'completed'
      ? <CheckIcon size={30} />
      : <LessonIcon type={lesson.type ?? 'standard'} size={28} />;

  return (
    <div className="flex flex-col items-center" style={{ gap: 6 }}>
      <motion.button
        className={state === 'current' ? 'lesson-btn-pulse' : ''}
        style={{
          width: CIRCLE,
          height: CIRCLE,
          borderRadius: '50%',
          background: bg,
          boxShadow: `0 ${DEPTH}px 0 ${shadow}`,
          border: 'none',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: state === 'locked' ? 'default' : 'pointer',
          opacity: state === 'locked' ? 0.5 : 1,
          position: 'relative',
          overflow: 'hidden',
          WebkitTapHighlightColor: 'transparent',
          '--go-shadow-color': shadow,
          '--go-glow-color': `${theme.color}30`,
        } as React.CSSProperties}
        onClick={onClick}
        whileHover={state !== 'locked' ? { scale: 1.08, y: -2 } : undefined}
        whileTap={state !== 'locked' ? {
          scale: 1,
          y: DEPTH - 1,
          boxShadow: `0 1px 0 ${shadow}`,
        } : undefined}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: state === 'locked' ? 0.5 : 1, scale: 1 }}
        transition={{
          delay: index * 0.05,
          duration: 0.3,
          type: 'spring',
          stiffness: 350,
          damping: 22,
          scale: { duration: 0.1 },
          y: { duration: 0.1 },
          boxShadow: { duration: 0.1 },
        }}
        aria-label={
          state === 'completed'
            ? `Replay: ${lesson.title}`
            : state === 'current'
              ? `Start: ${lesson.title}`
              : `Locked: ${lesson.title}`
        }
      >
        {/* Top highlight — convex 3D shine like Duolingo */}
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.22) 30%, transparent 55%)',
          pointerEvents: 'none',
        }} />

        {/* Centered white icon */}
        <div style={{ position: 'relative' }}>
          {icon}
        </div>
      </motion.button>

      {/* Mini stars for completed lessons */}
      {state === 'completed' && stars !== undefined && stars > 0 && (
        <div className="flex items-center" style={{ gap: 2 }}>
          {[1, 2, 3].map((i) => (
            <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"
                fill={i <= stars ? (isGold ? GOLD : theme.color) : '#E0E0E0'}
              />
            </svg>
          ))}
        </div>
      )}
    </div>
  );
});

export { LessonNode as LessonRow };
