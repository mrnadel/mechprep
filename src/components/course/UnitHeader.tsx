'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import type { Unit } from '@/data/course/types';
import type { UnitTheme } from '@/lib/unitThemes';
import { UnitIllustration } from './UnitIllustrations';
import { CharacterAvatar } from '@/components/ui/CharacterAvatar';

interface UnitHeaderProps {
  unit: Unit;
  unitIndex: number;
  completedInUnit: number;
  totalInUnit: number;
  isLocked?: boolean;
  lockMessage?: string;
  isAllGolden?: boolean;
  theme: UnitTheme;
  professionId?: string;
  showProgress?: boolean;
  onClick?: () => void;
  characterId?: string | null;
}

const GOLD = '#FFB800';
const GOLD_DARK = '#B38600';

export const UnitHeader = memo(function UnitHeader({
  unit,
  unitIndex,
  completedInUnit,
  totalInUnit,
  isLocked,
  lockMessage,
  isAllGolden,
  theme,
  professionId,
  showProgress = false,
  onClick,
  characterId,
}: UnitHeaderProps) {
  const progressPercent =
    totalInUnit > 0 ? (completedInUnit / totalInUnit) * 100 : 0;

  const bg = isAllGolden ? GOLD : theme.color;
  const shadowColor = isAllGolden ? GOLD_DARK : theme.dark;
  const isClickable = !!onClick;
  const shadowH = isClickable ? 5 : 0;

  const content = (
    <>
      {/* Top row: text + illustration */}
      <div className="flex items-center" style={{ gap: 12 }}>
        <div className="flex-1 min-w-0">
          <div
            style={{
              fontSize: 11,
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: 1.2,
              marginBottom: 4,
              color: 'rgba(255,255,255,0.65)',
            }}
          >
            Unit {unitIndex + 1}
          </div>
          <div
            style={{
              fontSize: 19,
              fontWeight: 800,
              lineHeight: 1.2,
              color: '#FFFFFF',
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
                background: 'rgba(0,0,0,0.15)',
                marginTop: 8,
                color: 'rgba(255,255,255,0.8)',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <rect x="5" y="11" width="14" height="10" rx="2" fill="rgba(255,255,255,0.8)" />
                <path
                  d="M8 11V7a4 4 0 118 0v4"
                  stroke="rgba(255,255,255,0.8)"
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
                color: 'rgba(255,255,255,0.7)',
                marginTop: 4,
              }}
            >
              {isAllGolden
                ? '✨ All lessons mastered!'
                : `${completedInUnit} of ${totalInUnit} lessons complete`}
            </div>
          )}
        </div>

        {/* Illustration */}
        <div
          className="flex-shrink-0"
          style={{ width: 72, height: 72, position: 'relative' }}
        >
          <UnitIllustration
            unitIndex={unitIndex}
            color="#FFFFFF"
            className="w-full h-full"
            professionId={professionId}
          />
          {characterId && (
            <div
              style={{
                position: 'absolute',
                top: -4,
                right: -4,
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: 'white',
                border: `2px solid ${bg}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
                boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                overflow: 'hidden',
              }}
              aria-hidden="true"
            >
              <CharacterAvatar characterId={characterId} size={22} />
            </div>
          )}
        </div>
      </div>

      {/* Progress bar (only when showProgress is true) */}
      {showProgress && (
        <div
          className="flex items-center"
          style={{ marginTop: 14, gap: 10 }}
        >
          <div
            className="flex-1 overflow-hidden"
            role="progressbar"
            aria-valuenow={completedInUnit}
            aria-valuemin={0}
            aria-valuemax={totalInUnit}
            aria-label={`Unit progress: ${completedInUnit} of ${totalInUnit} lessons`}
            style={{
              height: 10,
              borderRadius: 5,
              background: 'rgba(0,0,0,0.15)',
            }}
          >
            <motion.div
              style={{
                height: '100%',
                borderRadius: 5,
                backgroundColor: '#FFFFFF',
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
              color: 'rgba(255,255,255,0.75)',
              whiteSpace: 'nowrap',
            }}
          >
            {completedInUnit}/{totalInUnit}
          </div>
        </div>
      )}

      {/* Chevron hint for clickable headers */}
      {isClickable && (
        <div
          className="absolute"
          style={{
            right: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            opacity: 0.5,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M9 6l6 6-6 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </>
  );

  if (isClickable) {
    return (
      <div className="relative select-none" style={{ paddingBottom: shadowH }}>
        {/* 3D shadow layer */}
        <div
          className="absolute left-0 right-0 bottom-0"
          style={{
            height: `calc(100% - ${shadowH}px)`,
            top: shadowH,
            borderRadius: 20,
            background: shadowColor,
          }}
        />

        {/* Surface card */}
        <button
          className="relative w-full text-left select-none active:translate-y-[var(--sh)] transition-transform duration-75"
          style={{
            '--sh': `${shadowH}px`,
            borderRadius: 20,
            backgroundColor: bg,
            padding: '18px 20px 16px',
            border: 'none',
            cursor: 'pointer',
            WebkitTapHighlightColor: 'transparent',
          } as React.CSSProperties}
          onClick={onClick}
          aria-label={`Browse Unit ${unitIndex + 1}: ${unit.title}`}
        >
          {content}
        </button>
      </div>
    );
  }

  return (
    <div
      className="select-none"
      style={{
        borderRadius: 20,
        backgroundColor: bg,
        padding: '18px 20px 16px',
      }}
    >
      {content}
    </div>
  );
});
