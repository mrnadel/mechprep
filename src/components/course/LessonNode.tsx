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
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="13" rx="4" fill="#FFF" />
          <path d="M8 16v4.5l5-4.5H8Z" fill="#FFF" />
        </svg>
      );
    case 'speed-round':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M14.5 2L7 13h5.5L11 22L19 10h-5.5L14.5 2Z" fill="#FFF" />
        </svg>
      );
    case 'timeline':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <rect x="5" y="4.5" width="14" height="3.5" rx="1.75" fill="#FFF" />
          <rect x="5" y="10.25" width="14" height="3.5" rx="1.75" fill="#FFF" />
          <rect x="5" y="16" width="14" height="3.5" rx="1.75" fill="#FFF" />
        </svg>
      );
    case 'case-study':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <circle cx="10.5" cy="10.5" r="7" stroke="#FFF" strokeWidth="3.2" />
          <path d="M16 16L21 21" stroke="#FFF" strokeWidth="3.2" strokeLinecap="round" />
        </svg>
      );
    case 'standard':
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="5" width="7.8" height="14" rx="2" fill="#FFF" />
          <rect x="13.2" y="5" width="7.8" height="14" rx="2" fill="#FFF" />
        </svg>
      );
  }
}

function CheckIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M5.5 12.5L10 17L18.5 7" stroke="#FFF" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CrownIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 16.5h16L18 7.5l-3.5 4.5L12 5l-2.5 7L6 7.5 4 16.5Z" fill="#FFF" />
      <rect x="4" y="16.5" width="16" height="3" rx="1" fill="#FFF" />
    </svg>
  );
}

const CIRCLE = 70;
const BASE_H = 16;    // squashed ellipse height
const BASE_PEEK = 8;  // how much base shows below circle at rest
const PRESS = 6;      // how far down circle moves on press

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

  const icon = isGold
    ? <CrownIcon size={30} />
    : state === 'completed'
      ? <CheckIcon size={30} />
      : <LessonIcon type={lesson.type ?? 'standard'} size={28} />;

  return (
    <div className="flex flex-col items-center" style={{ gap: 4 }}>
      {/* Button with squashed 3D base */}
      <div style={{
        position: 'relative',
        width: CIRCLE,
        height: CIRCLE + BASE_PEEK,
      }}>
        {/* 3D base — squashed ellipse behind circle */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: CIRCLE,
          height: BASE_H,
          borderRadius: '50%',
          background: shadow,
          opacity: state === 'locked' ? 0.5 : 1,
        }} />

        {/* Circle face */}
        <motion.button
          className={state === 'current' ? 'lesson-btn-pulse' : ''}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: CIRCLE,
            height: CIRCLE,
            borderRadius: '50%',
            background: bg,
            border: 'none',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: state === 'locked' ? 'default' : 'pointer',
            opacity: state === 'locked' ? 0.5 : 1,
            overflow: 'hidden',
            zIndex: 1,
            WebkitTapHighlightColor: 'transparent',
            '--go-glow-color': `${theme.color}35`,
          } as React.CSSProperties}
          onClick={onClick}
          whileHover={state !== 'locked' ? { scale: 1.08, y: -3 } : undefined}
          whileTap={state !== 'locked' ? { scale: 1, y: PRESS } : undefined}
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
          }}
          aria-label={
            state === 'completed'
              ? `Replay: ${lesson.title}`
              : state === 'current'
                ? `Start: ${lesson.title}`
                : `Locked: ${lesson.title}`
          }
        >
          {/* Top highlight gradient */}
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.22) 30%, transparent 55%)',
            pointerEvents: 'none',
          }} />

          {/* Flat shine lines — glossy light reflection */}
          <svg
            viewBox="0 0 70 70"
            fill="none"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
            }}
          >
            <path d="M14 21 Q35 15 56 21" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M19 28 Q35 23 51 28" stroke="rgba(255,255,255,0.25)" strokeWidth="1.8" strokeLinecap="round" />
          </svg>

          {/* Centered white icon */}
          <div style={{ position: 'relative' }}>
            {icon}
          </div>
        </motion.button>
      </div>

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
