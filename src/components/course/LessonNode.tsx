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

// Isometric transform matrix from the reference SVG
const ISO = '0.822752 0.5684 -0.822752 0.5684';
const SQ = 149.543;  // source square size
const RX = 31;       // corner radius
const TX = 123.037;  // horizontal translation to center

// ViewBox: diamond spans 0→247 wide, 0→170 tall
const VW = 247;
const VH = 170;

// Rendered sizes
const BTN_W = 110;
const BTN_H = Math.round(BTN_W * VH / VW); // ~76px
const PRESS = 5;

function LessonIcon({ type, size = 26 }: { type: LessonType; size?: number }) {
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

function CheckIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M5.5 12.5L10 17L18.5 7" stroke="#FFF" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CrownIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 16.5h16L18 7.5l-3.5 4.5L12 5l-2.5 7L6 7.5 4 16.5Z" fill="#FFF" />
      <rect x="4" y="16.5" width="16" height="3" rx="1" fill="#FFF" />
    </svg>
  );
}

/** Isometric diamond shape — matching reference SVG exactly */
function IsoShape({ fill, clipId, withShine }: { fill: string; clipId?: string; withShine?: boolean }) {
  const inner = (
    <>
      <rect width={SQ} height={SQ} rx={RX}
        transform={`matrix(${ISO} ${TX} 0)`}
        fill={fill} />
      {withShine && (
        <>
          <rect width="217" height="42" transform="translate(18 34)" fill="white" fillOpacity="0.09" />
          <rect width="217" height="10" transform="translate(18 99)" fill="white" fillOpacity="0.09" />
        </>
      )}
    </>
  );

  if (clipId && withShine) {
    return (
      <>
        <defs>
          <clipPath id={clipId}>
            <rect width={SQ} height={SQ} rx={RX}
              transform={`matrix(${ISO} ${TX} 0)`} />
          </clipPath>
        </defs>
        <g clipPath={`url(#${clipId})`}>
          {inner}
        </g>
      </>
    );
  }

  return inner;
}

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
  const rim = state === 'locked'
    ? '#505050'
    : isGold ? GOLD_DARK : theme.dark;

  const icon = isGold
    ? <CrownIcon />
    : state === 'completed'
      ? <CheckIcon />
      : <LessonIcon type={lesson.type ?? 'standard'} />;

  const clipId = `lc-${lesson.id}`;

  return (
    <div className="flex flex-col items-center" style={{ gap: 4 }}>
      {/* Isometric tile container */}
      <div style={{
        position: 'relative',
        width: BTN_W,
        height: BTN_H + PRESS,
      }}>
        {/* Shadow layer — static, offset down */}
        <svg
          width={BTN_W} height={BTN_H}
          viewBox={`0 0 ${VW} ${VH}`}
          fill="none"
          style={{
            position: 'absolute',
            top: PRESS,
            left: 0,
            pointerEvents: 'none',
            opacity: state === 'locked' ? 0.4 : 1,
          }}
        >
          <IsoShape fill={rim} />
        </svg>

        {/* Face layer — animated */}
        <motion.button
          className={state === 'current' ? 'lesson-btn-pulse' : ''}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: BTN_W,
            height: BTN_H,
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: state === 'locked' ? 'default' : 'pointer',
            opacity: state === 'locked' ? 0.5 : 1,
            zIndex: 1,
            overflow: 'visible',
            WebkitTapHighlightColor: 'transparent',
            '--go-glow-color': `${theme.color}40`,
          } as React.CSSProperties}
          onClick={onClick}
          whileHover={state !== 'locked' ? { scale: 1.08, y: -2 } : undefined}
          whileTap={state !== 'locked' ? { scale: 1, y: PRESS - 1 } : undefined}
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
          <svg
            width={BTN_W} height={BTN_H}
            viewBox={`0 0 ${VW} ${VH}`}
            fill="none"
            style={{ display: 'block' }}
          >
            <IsoShape fill={bg} clipId={clipId} withShine />
          </svg>

          {/* Icon centered on diamond */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}>
            {icon}
          </div>
        </motion.button>
      </div>

      {/* Mini stars for completed */}
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
