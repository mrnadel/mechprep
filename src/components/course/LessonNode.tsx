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
const GOLD_DARK = '#C8960B';

/** SVG icon per lesson type — bold white silhouette for colored backgrounds */
function LessonTypeIcon({ type, color, size = 24 }: { type: LessonType; color: string; size?: number }) {
  switch (type) {
    case 'conversation':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <rect x="2" y="3" width="14" height="11" rx="3" fill={color} />
          <path d="M6 14v3l3-3H6Z" fill={color} />
          <rect x="10" y="9" width="12" height="9" rx="3" fill={color} opacity="0.5" />
          <path d="M18 18v2.5l2.5-2.5H18Z" fill={color} opacity="0.5" />
        </svg>
      );
    case 'speed-round':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M13.5 4L8 14h4.5l-1 7L18 11h-4.5l1-7Z" fill={color} />
        </svg>
      );
    case 'timeline':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M7 4v16" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
          <circle cx="7" cy="6" r="2.5" fill={color} />
          <circle cx="7" cy="12" r="2.5" fill={color} />
          <circle cx="7" cy="18" r="2.5" fill={color} />
          <rect x="12" y="4" width="8" height="4" rx="2" fill={color} opacity="0.7" />
          <rect x="12" y="10" width="10" height="4" rx="2" fill={color} />
          <rect x="12" y="16" width="6" height="4" rx="2" fill={color} opacity="0.7" />
        </svg>
      );
    case 'case-study':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="2" width="13" height="18" rx="2.5" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.15" />
          <rect x="6" y="6" width="7" height="1.5" rx="0.75" fill={color} />
          <rect x="6" y="9" width="5" height="1.5" rx="0.75" fill={color} opacity="0.6" />
          <circle cx="17.5" cy="16.5" r="3.5" fill={color} />
          <path d="M20 19.5L22 21.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'standard':
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M12 6C10.5 4.5 7 3.5 4 4v14c3 0 6.5 1 8 2.5C13.5 19 17 18 20 18V4c-3-.5-6.5.5-8 2Z" fill={color} opacity="0.25" />
          <path d="M12 6C10.5 4.5 7 3.5 4 4v14c3 0 6.5 1 8 2.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 6c1.5-1.5 5-2.5 8-2v14c-3 0-6.5 1-8 2.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}

const ICON_SIZE = 56;
const DEPTH = 5;

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
    ? '#E5E5E5'
    : isGold ? GOLD : theme.color;
  const shadow = state === 'locked'
    ? '#CACACA'
    : isGold ? GOLD_DARK : theme.dark;

  return (
    <div className="flex flex-col items-center" style={{ gap: 4, width: ICON_SIZE }}>
      <motion.button
        className={state === 'current' ? 'go-btn-pulse' : ''}
        style={{
          width: ICON_SIZE,
          height: ICON_SIZE,
          borderRadius: 16,
          background: bg,
          boxShadow: `0 ${DEPTH}px 0 ${shadow}`,
          border: 'none',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: state === 'locked' ? 'default' : 'pointer',
          opacity: state === 'locked' ? 0.55 : 1,
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
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: state === 'locked' ? 0.55 : 1, scale: 1 }}
        transition={{
          delay: index * 0.04,
          duration: 0.3,
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
        {/* Top highlight for convex 3D look */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '50%',
          borderRadius: '16px 16px 0 0',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.22), transparent)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative' }}>
          {isGold ? (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M5 16h14l-2-8-3.5 4L12 6l-1.5 6L7 8l-2 8z" fill="#FFF" />
              <path d="M5 16h14v2a1 1 0 01-1 1H6a1 1 0 01-1-1v-2z" fill="#FFF" />
            </svg>
          ) : (
            <LessonTypeIcon
              type={lesson.type ?? 'standard'}
              color="#FFFFFF"
              size={26}
            />
          )}
        </div>
      </motion.button>

      {/* Mini stars for completed lessons */}
      {state === 'completed' && stars !== undefined && stars > 0 && (
        <div className="flex items-center" style={{ gap: 1.5 }}>
          {[1, 2, 3].map((i) => (
            <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill="none">
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
