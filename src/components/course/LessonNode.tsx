'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import type { Lesson } from '@/data/course/types';
import type { UnitTheme } from '@/lib/unitThemes';
import { useIsDark } from '@/store/useThemeStore';

interface LessonRowProps {
  lesson: Lesson;
  unitColor: string;
  state: 'completed' | 'current' | 'locked';
  stars?: number;
  golden?: boolean;
  needsReview?: boolean;
  index: number;
  onClick: () => void;
  theme: UnitTheme;
}

const GOLD = '#FFB800';

function LevelDots({ current, max, color, isGolden, isDark }: { current: number; max: number; color: string; isGolden?: boolean; isDark: boolean }) {
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
              : isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)',
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
  needsReview,
}: LessonRowProps) {
  const isDark = useIsDark();
  const maxLevels = lesson.levels ?? 1;
  const isGolden = state === 'completed' && golden;
  const isLocked = state === 'locked';
  const isCurrent = state === 'current';
  const isCompleted = state === 'completed';

  const shadowH = isCurrent ? 6 : 5;
  const shadowColor = isGolden ? '#C8960B' : `${theme.dark}35`;

  // Dark-mode-aware colors
  const cardBg = isLocked
    ? (isDark ? 'rgba(30,41,59,0.35)' : 'rgba(255,255,255,0.4)')
    : isGolden ? undefined
    : (isDark ? 'rgba(30,41,59,0.9)' : 'rgba(255,255,255,0.9)');

  const cardBorder = isLocked
    ? (isDark ? '1.5px solid rgba(255,255,255,0.04)' : '1.5px solid rgba(0,0,0,0.04)')
    : isGolden ? undefined
    : isCurrent ? `2px solid ${theme.color}${isDark ? '40' : '25'}`
    : (isDark ? '1.5px solid rgba(255,255,255,0.06)' : '1.5px solid rgba(0,0,0,0.08)');

  const titleColor = isLocked
    ? (isDark ? '#64748B' : '#B0B0B0')
    : isGolden
    ? (isDark ? '#FFD54F' : '#7A6200')
    : (isDark ? '#E2E8F0' : '#3C3C3C');

  const iconLockedBg = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)';
  const iconLockedStroke = isDark ? '#64748B' : '#999';
  const checkBadgeBorder = isDark ? '#1E293B' : 'white';

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
          cursor: 'pointer',
          WebkitTapHighlightColor: 'transparent',
        }}
        onClick={onClick}
        aria-label={
          isCompleted ? `Replay: ${lesson.title}`
            : isCurrent ? `Start: ${lesson.title}`
            : `Upcoming: ${lesson.title}`
        }
      >
        {/* Fixed-size container -- height = card + shadow. Never moves. */}
        <div className="relative" style={{ paddingBottom: shadowH }}>

          {/* Shadow layer -- sits at the bottom, never moves */}
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

          {/* Surface -- the card. On press, translates down to cover the shadow. */}
          <div
            className={`
              relative w-full flex items-center rounded-2xl transition-transform duration-75
              group-active:translate-y-[var(--sh)]
              ${isGolden ? 'golden-node' : ''}
            `}
            style={{
              '--sh': `${shadowH}px`,
              padding: '12px 14px',
              gap: 12,
              background: cardBg,
              border: cardBorder,
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
                  isLocked ? iconLockedBg
                  : isGolden ? undefined
                  : 'transparent',
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
              ) : isCompleted ? (
                /* Completed: main icon is a checkmark */
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M4 12.5l5.5 5.5L20 7" stroke={theme.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                /* Current / Locked: document icon */
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ opacity: isLocked ? 0.35 : 1 }}>
                  <rect x="5" y="3" width="14" height="18" rx="2" stroke={isLocked ? iconLockedStroke : theme.color} strokeWidth="2" />
                  <line x1="9" y1="8" x2="15" y2="8" stroke={isLocked ? iconLockedStroke : theme.color} strokeWidth="2" strokeLinecap="round" />
                  <line x1="9" y1="12" x2="15" y2="12" stroke={isLocked ? iconLockedStroke : theme.color} strokeWidth="2" strokeLinecap="round" />
                  <line x1="9" y1="16" x2="13" y2="16" stroke={isLocked ? iconLockedStroke : theme.color} strokeWidth="2" strokeLinecap="round" />
                </svg>
              )}

              {/* Badge: needs-review pulse or document icon for completed */}
              {isCompleted && !isGolden && needsReview && (
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    bottom: -3,
                    right: -3,
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    background: '#F59E0B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `2px solid ${checkBadgeBorder}`,
                  }}
                >
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none">
                    <path d="M1 4v6h6M23 20v-6h-6" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>
              )}
              {isCompleted && !isGolden && !needsReview && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: -4,
                    right: -4,
                    width: 18,
                    height: 18,
                    borderRadius: 5,
                    background: isDark ? '#1E293B' : 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `1.5px solid ${theme.color}40`,
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                    <rect x="4" y="2" width="16" height="20" rx="2" stroke={theme.color} strokeWidth="2.5" />
                    <line x1="8" y1="8" x2="16" y2="8" stroke={theme.color} strokeWidth="2" strokeLinecap="round" />
                    <line x1="8" y1="12" x2="16" y2="12" stroke={theme.color} strokeWidth="2" strokeLinecap="round" />
                    <line x1="8" y1="16" x2="13" y2="16" stroke={theme.color} strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              )}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0 flex items-center">
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: titleColor,
                  lineHeight: 1.3,
                }}
              >
                {lesson.title}
              </div>

              {isCompleted && (
                <div className="ml-auto pl-2">
                  <LevelDots current={stars ?? 0} max={Math.min(maxLevels, 4)} color={theme.color} isGolden={isGolden} isDark={isDark} />
                </div>
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
                  +{lesson.xpReward} XP
                </div>
              ) : isCompleted ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.25 }}>
                  <path d="M9 6l6 6-6 6" stroke={isDark ? '#94A3B8' : '#888'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
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
