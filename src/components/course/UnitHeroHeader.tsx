'use client';

import { memo, forwardRef } from 'react';
import type { Unit } from '@/data/course/types';
import type { UnitTheme } from '@/lib/unitThemes';

/** Compact floating header height (px) */
export const HERO_COMPACT_HEIGHT = 62;

export interface UnitHeroHeaderProps {
  unit: Unit;
  unitIndex: number;
  completedInUnit: number;
  totalInUnit: number;
  isAllGolden: boolean;
  theme: UnitTheme;
  hasSections: boolean;
  sectionIndex?: number;
  displayNumber?: number;
  positionStyle: { top: number; left: number; width: number };
  onBrowseClick: () => void;
}

export const UnitHeroHeader = memo(
  forwardRef<HTMLDivElement, UnitHeroHeaderProps>(function UnitHeroHeader(
    {
      unit,
      unitIndex,
      completedInUnit,
      totalInUnit,
      isAllGolden,
      theme,
      hasSections,
      sectionIndex,
      displayNumber,
      positionStyle,
      onBrowseClick,
    },
    ref,
  ) {
    const unitNum = displayNumber ?? (unitIndex + 1);
    const bg = isAllGolden ? '#FFB800' : theme.color;
    const progressPercent = totalInUnit > 0 ? (completedInUnit / totalInUnit) * 100 : 0;

    return (
      <div
        ref={ref}
        style={{
          position: 'fixed',
          top: positionStyle.top,
          left: positionStyle.left,
          width: positionStyle.width,
          zIndex: 30,
          paddingBottom: 6,
          transition: 'top 0.15s ease',
          pointerEvents: 'none',
        }}
      >
        <div
          className="mx-auto px-3 sm:px-4"
          style={{ maxWidth: 520, pointerEvents: 'auto' }}
        >
          <button
            onClick={onBrowseClick}
            className="active:scale-[0.99] transition-transform duration-75"
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              position: 'relative',
              overflow: 'hidden',
              background: bg,
              borderRadius: 18,
              height: HERO_COMPACT_HEIGHT,
              padding: '0 16px',
              gap: 12,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              WebkitTapHighlightColor: 'transparent',
            }}
            aria-label={`Unit ${unitNum}: ${unit.title}. Tap to browse.`}
          >
            {/* Left: unit label + title */}
            <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
              <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.1, color: 'rgba(255,255,255,0.55)' }}>
                {hasSections ? `Section ${sectionIndex ?? 1}, Unit ${unitNum}` : `Unit ${unitNum}`}
              </div>
              <div className="truncate" style={{ fontSize: 16, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.25, marginTop: 1 }}>
                {unit.title}
              </div>
            </div>

            {/* Right: progress pill */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
              <div style={{ width: 48, height: 6, borderRadius: 3, background: 'rgba(0,0,0,0.15)', overflow: 'hidden' }}>
                <div style={{ width: `${progressPercent}%`, height: '100%', borderRadius: 3, backgroundColor: '#FFFFFF' }} />
              </div>
              <span style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.75)', whiteSpace: 'nowrap' }}>
                {isAllGolden ? '\u2728' : `${completedInUnit}/${totalInUnit}`}
              </span>
            </div>
          </button>
        </div>
      </div>
    );
  }),
);
