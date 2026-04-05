'use client';

import { memo, forwardRef } from 'react';
import type { Unit } from '@/data/course/types';
import type { UnitTheme } from '@/lib/unitThemes';
import { useIsDark } from '@/store/useThemeStore';

/** Compact floating header height (px) — face + shadow depth */
export const HERO_COMPACT_HEIGHT = 62;

const SHADOW_H = 5;

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
    const isDark = useIsDark();
    const unitNum = displayNumber ?? (unitIndex + 1);
    const accent = isAllGolden ? '#FFB800' : theme.color;
    const accentDark = isAllGolden ? '#B38600' : theme.dark;
    const progressPercent = totalInUnit > 0 ? (completedInUnit / totalInUnit) * 100 : 0;

    return (
      <div
        style={{
          position: 'fixed',
          top: positionStyle.top,
          left: positionStyle.left,
          width: positionStyle.width,
          zIndex: 30,
          paddingBottom: 4,
          transition: 'top 0.15s ease',
          pointerEvents: 'none',
        }}
      >
        <div
          ref={ref}
          className="mx-auto px-3 sm:px-4"
          style={{ maxWidth: 520, pointerEvents: 'auto', willChange: 'transform', transformOrigin: 'center top' }}
        >
          {/* 3D button wrapper — group handles active state */}
          <button
            onClick={onBrowseClick}
            className="group relative w-full text-left"
            style={{
              paddingBottom: SHADOW_H,
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              WebkitTapHighlightColor: 'transparent',
            } as React.CSSProperties}
            aria-label={`Unit ${unitNum}: ${unit.title}. Tap to browse.`}
          >
            {/* Shadow layer */}
            <div
              className="absolute left-0 right-0 bottom-0"
              style={{
                height: `calc(100% - ${SHADOW_H}px)`,
                top: SHADOW_H,
                borderRadius: 18,
                background: accentDark,
              }}
            />

            {/* Face */}
            <div
              className="relative w-full flex items-center rounded-2xl transition-transform duration-75 group-active:translate-y-[var(--sh)]"
              style={{
                '--sh': `${SHADOW_H}px`,
                padding: '0 16px',
                height: HERO_COMPACT_HEIGHT - SHADOW_H,
                gap: 12,
                background: isDark
                  ? `color-mix(in srgb, ${accent} 15%, #1E293B)`
                  : `color-mix(in srgb, ${accent} 10%, #FFFFFF 90%)`,
                border: `2px solid ${accent}25`,
              } as React.CSSProperties}
            >
              {/* Left: unit label + title */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: 10,
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: 1.1,
                  color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)',
                }}>
                  {hasSections ? `Section ${sectionIndex ?? 1}, Unit ${unitNum}` : `Unit ${unitNum}`}
                </div>
                <div className="truncate" style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: isDark ? '#E2E8F0' : '#3C3C3C',
                  lineHeight: 1.25,
                  marginTop: 1,
                }}>
                  {unit.title}
                </div>
              </div>

              {/* Right: progress + chevron */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                <div style={{ width: 48, height: 6, borderRadius: 3, background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)', overflow: 'hidden' }}>
                  <div style={{ width: `${progressPercent}%`, height: '100%', borderRadius: 3, backgroundColor: accent }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 800, color: accent, whiteSpace: 'nowrap' }}>
                  {isAllGolden ? '\u2728' : `${completedInUnit}/${totalInUnit}`}
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.35, flexShrink: 0 }}>
                  <path d="M9 6l6 6-6 6" stroke={isDark ? 'white' : 'black'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </button>
        </div>
      </div>
    );
  }),
);
