'use client';

import { motion } from 'framer-motion';
import type { Unit } from '@/data/course/types';
import type { UnitTheme } from '@/lib/unitThemes';
import { UnitIllustration } from './UnitIllustrations';

interface UnitHeaderProps {
  unit: Unit;
  unitIndex: number;
  completedInUnit: number;
  totalInUnit: number;
  isExpanded: boolean;
  isLocked?: boolean;
  lockMessage?: string;
  isAllGolden?: boolean;
  onToggle: () => void;
  theme: UnitTheme;
}

const GOLD_BG = '#FFF8E1';
const GOLD_COLOR = '#FFB800';
const GOLD_DARK = '#B8860B';
const GOLD_MID = '#D4A017';

export function UnitHeader({
  unit,
  unitIndex,
  completedInUnit,
  totalInUnit,
  isExpanded,
  isLocked,
  lockMessage,
  isAllGolden,
  onToggle,
  theme,
}: UnitHeaderProps) {
  const progressPercent =
    totalInUnit > 0 ? (completedInUnit / totalInUnit) * 100 : 0;

  // Override colors when all lessons are golden
  const displayColor = isAllGolden ? GOLD_COLOR : theme.color;
  const displayDark = isAllGolden ? GOLD_DARK : theme.dark;
  const displayMid = isAllGolden ? GOLD_MID : theme.mid;
  const displayBg = isAllGolden ? GOLD_BG : theme.bg;

  return (
    <div>
      {/* Header row */}
      <div
        className="flex items-center select-none"
        style={{
          padding: '20px 20px 16px',
          cursor: 'pointer',
          WebkitTapHighlightColor: 'transparent',
        }}
        onClick={onToggle}
        role="button"
        tabIndex={0}
        aria-expanded={!isLocked ? isExpanded : undefined}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle();
          }
        }}
      >
        {/* Text */}
        <div className="flex-1 min-w-0">
          <div
            style={{
              fontSize: 11,
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: 1.2,
              marginBottom: 4,
              color: displayDark,
              opacity: 0.7,
            }}
          >
            {isAllGolden ? '\uD83D\uDC51 ' : ''}Unit {unitIndex + 1}
          </div>
          <div
            style={{
              fontSize: 19,
              fontWeight: 800,
              lineHeight: 1.2,
              color: displayDark,
            }}
          >
            {unit.title}
          </div>
          {isLocked ? (
            <div
              className="inline-flex items-center"
              style={{
                gap: 5,
                fontSize: 11,
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: 0.8,
                padding: '4px 10px',
                borderRadius: 8,
                background: 'rgba(0,0,0,0.06)',
                marginTop: 6,
                color: displayDark,
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <rect x="5" y="11" width="14" height="10" rx="2" fill={displayDark} />
                <path
                  d="M8 11V7a4 4 0 118 0v4"
                  stroke={displayDark}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
              {lockMessage || 'Complete previous unit to unlock'}
            </div>
          ) : (
            <div
              style={{
                fontSize: 12.5,
                fontWeight: 700,
                color: displayMid,
                opacity: 0.6,
                marginTop: 3,
              }}
            >
              {isAllGolden
                ? 'All lessons mastered!'
                : `${completedInUnit} of ${totalInUnit} lessons complete`}
            </div>
          )}
        </div>

        {/* Illustration */}
        <div
          className="flex-shrink-0"
          style={{ width: 80, height: 80, marginLeft: 12 }}
        >
          <UnitIllustration
            unitIndex={unitIndex}
            color={displayColor}
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Chevron */}
      <div
        className="flex justify-end"
        style={{ padding: '0 20px', marginTop: -12, marginBottom: 4 }}
      >
        <motion.div
          className="flex items-center justify-center"
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.6)',
          }}
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M4 6l4 4 4-4"
              stroke={displayDark}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>

      {/* Progress bar */}
      <div
        className="flex items-center"
        style={{ padding: '0 20px 16px', gap: 10 }}
      >
        <div
          className="flex-1 overflow-hidden"
          style={{
            height: 10,
            borderRadius: 5,
            background: 'rgba(255,255,255,0.5)',
          }}
        >
          <motion.div
            style={{
              height: '100%',
              borderRadius: 5,
              backgroundColor: displayColor,
            }}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          />
        </div>
        <div
          style={{
            fontSize: 12,
            fontWeight: 800,
            color: displayDark,
            opacity: 0.7,
            whiteSpace: 'nowrap',
          }}
        >
          {completedInUnit}/{totalInUnit}
        </div>
      </div>
    </div>
  );
}
