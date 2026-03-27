'use client';

import { memo } from 'react';
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

const GOLD = '#FFB800';

function LevelDots({ current, max, color, isGolden }: { current: number; max: number; color: string; isGolden?: boolean }) {
  if (max <= 1) return null;
  return (
    <div className="flex items-center" style={{ gap: 3, marginTop: 4 }}>
      {Array.from({ length: max }, (_, i) => (
        <div
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: i < current
              ? (isGolden ? GOLD : color)
              : 'rgba(0,0,0,0.08)',
            transition: 'background 0.2s',
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
  const maxLevels = lesson.levels ?? 1;
  const questionCount = lesson.questions?.length || 0;
  const isGolden = state === 'completed' && golden;
  const isLocked = state === 'locked';
  const isCurrent = state === 'current';
  const isCompleted = state === 'completed';

  const shadowH = isLocked ? 0 : isCurrent ? 4 : 3;
  const shadowColor = isGolden ? '#C8960B' : `${theme.dark}35`;

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: isLocked ? 0.5 : 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.25 }}
    >
      <button
        className="w-full text-left select-none group"
        style={{
          padding: 0,
          background: 'none',
          border: 'none',
          cursor: isLocked ? 'default' : 'pointer',
          WebkitTapHighlightColor: 'transparent',
        }}
        onClick={onClick}
        aria-label={
          isCompleted ? `Replay: ${lesson.title}`
            : isCurrent ? `Start: ${lesson.title}`
            : `Upcoming: ${lesson.title}`
        }
      >
        {/* Fixed-size container — height = card + shadow. Never moves. */}
        <div className="relative" style={{ paddingBottom: shadowH }}>

          {/* Shadow layer — sits at the bottom, never moves */}
          {shadowH > 0 && !isGolden && (
            <div
              className="absolute left-0 right-0 bottom-0 rounded-2xl"
              style={{
                height: `calc(100% - ${shadowH}px)`,
                top: shadowH,
                background: shadowColor,
              }}
            />
          )}

          {/* Surface — the white card. On press, translates down to cover the shadow. */}
          <div
            className={`
              relative w-full flex items-center rounded-2xl transition-transform duration-75
              ${!isLocked ? 'group-active:translate-y-[var(--sh)]' : ''}
              ${isGolden ? 'golden-node' : ''}
            `}
            style={{
              '--sh': `${shadowH}px`,
              padding: '12px 14px',
              gap: 12,
              background:
                isLocked ? 'rgba(255,255,255,0.4)'
                : isGolden ? undefined
                : 'rgba(255,255,255,0.9)',
              border:
                isLocked ? '1.5px solid rgba(0,0,0,0.04)'
                : isGolden ? undefined
                : isCurrent ? `2px solid ${theme.color}25`
                : '1.5px solid rgba(255,255,255,0.9)',
            } as React.CSSProperties}
          >
            {/* Icon */}
            <div
              className={`flex items-center justify-center flex-shrink-0 ${isGolden ? 'golden-icon-box' : ''}`}
              style={{
                width: 42,
                height: 42,
                borderRadius: 13,
                background:
                  isLocked ? 'rgba(0,0,0,0.04)'
                  : isGolden ? undefined
                  : `${theme.color}18`,
                fontSize: 18,
                position: 'relative',
              }}
            >
              {isGolden ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 16h14l-2-8-3.5 4L12 6l-1.5 6L7 8l-2 8z" fill={GOLD} />
                  <path d="M5 16h14v2a1 1 0 01-1 1H6a1 1 0 01-1-1v-2z" fill={GOLD} />
                  <circle cx="7.5" cy="16" r="1.2" fill="#FFF8E1" />
                  <circle cx="12" cy="16" r="1.2" fill="#FFF8E1" />
                  <circle cx="16.5" cy="16" r="1.2" fill="#FFF8E1" />
                </svg>
              ) : (
                <span style={{ opacity: isLocked ? 0.35 : 1 }}>{lesson.icon}</span>
              )}

              {isCompleted && !isGolden && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: -3,
                    right: -3,
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    background: theme.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid white',
                  }}
                >
                  <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6.5L5 9L9.5 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <div
                style={{
                  fontSize: 14.5,
                  fontWeight: 700,
                  color: isLocked ? '#B0B0B0' : isGolden ? '#7A6200' : '#3C3C3C',
                  lineHeight: 1.2,
                }}
              >
                {lesson.title}
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: isLocked ? '#C8C8C8'
                    : isGolden ? '#A08520'
                    : isCompleted ? '#999'
                    : theme.color,
                  marginTop: 3,
                  lineHeight: 1,
                }}
              >
                {isCompleted
                  ? `+${lesson.xpReward} XP earned`
                  : `+${lesson.xpReward} XP${questionCount > 0 ? ` · ${questionCount} Q` : ''}`
                }
              </div>

              {isCompleted && (
                <LevelDots current={stars ?? 0} max={Math.min(maxLevels, 4)} color={theme.color} isGolden={isGolden} />
              )}
            </div>

            {/* Right side */}
            <div className="flex-shrink-0">
              {isCurrent ? (
                <div
                  className="go-btn-pulse"
                  style={
                    {
                      background: theme.color,
                      color: '#FFFFFF',
                      fontSize: 13,
                      fontWeight: 800,
                      padding: '8px 22px',
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
              ) : isCompleted ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.25 }}>
                  <path d="M9 6l6 6-6 6" stroke="#888" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : null}
            </div>
          </div>
        </div>
      </button>
    </motion.div>
  );
});

export { LessonNode as LessonRow };
