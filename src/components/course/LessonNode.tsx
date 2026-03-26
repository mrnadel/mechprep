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

// Isometric transform from reference SVG
const ISO = '0.822752 0.5684 -0.822752 0.5684';
const SQ = 149.543;
const RX = 31;
const TX = 123.037;

const VW = 247;
const VH = 170;

// Rendered sizes — large
const BTN_W = 140;
const BTN_H = Math.round(BTN_W * VH / VW); // ~96px
const PRESS = 6;
const ICON_SIZE = 34;

function LessonIcon({ type, size = ICON_SIZE }: { type: LessonType; size?: number }) {
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

function CheckIcon({ size = ICON_SIZE }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M5.5 12.5L10 17L18.5 7" stroke="#FFF" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CrownIcon({ size = ICON_SIZE }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 16.5h16L18 7.5l-3.5 4.5L12 5l-2.5 7L6 7.5 4 16.5Z" fill="#FFF" />
      <rect x="4" y="16.5" width="16" height="3" rx="1" fill="#FFF" />
    </svg>
  );
}

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

/** 4-segment progress bar — fills based on stars (1-3) + golden (4th) */
function ProgressBars({ stars, golden, color }: { stars: number; golden?: boolean; color: string }) {
  const filled = golden ? 4 : stars;
  const barColor = golden ? GOLD : color;

  return (
    <div className="flex items-center justify-center" style={{ gap: 3 }}>
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            width: 20,
            height: 5,
            borderRadius: 3,
            background: i <= filled ? barColor : '#E0E0E0',
            transition: 'background 0.3s ease',
          }}
        />
      ))}
    </div>
  );
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
    <div className="flex flex-col items-center" style={{ gap: 6 }}>
      {/* Isometric tile container */}
      <div style={{
        position: 'relative',
        width: BTN_W,
        height: BTN_H + PRESS,
      }}>
        {/* Shadow layer */}
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

        {/* Face layer */}
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
          whileHover={state !== 'locked' ? { scale: 1.06, y: -2 } : undefined}
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

      {/* Progress bars — replaces stars */}
      {state === 'completed' && stars !== undefined && stars > 0 && (
        <ProgressBars stars={stars} golden={golden} color={theme.color} />
      )}

      {/* Lesson title */}
      <div style={{
        fontSize: 13,
        fontWeight: 700,
        color: state === 'locked' ? '#AFAFAF' : '#3C3C3C',
        textAlign: 'center',
        maxWidth: BTN_W + 30,
        lineHeight: 1.25,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical' as const,
      }}>
        {lesson.title}
      </div>
    </div>
  );
});

export { LessonNode as LessonRow };
