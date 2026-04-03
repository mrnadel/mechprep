'use client';

import { memo, forwardRef } from 'react';
import type { Unit } from '@/data/course/types';
import type { UnitTheme } from '@/lib/unitThemes';
import { getUnitBackground } from '@/lib/unitBackgrounds';
import { UnitIllustration } from './UnitIllustrations';

/** Expanded hero height (px) */
export const HERO_EXPANDED_HEIGHT = 184;
/** Compact floating header height (px) */
export const HERO_COMPACT_HEIGHT = 62;
/** Scroll distance = height delta → 1 px shrink per 1 px scroll, zero overlap */
export const HERO_MORPH_DISTANCE = HERO_EXPANDED_HEIGHT - HERO_COMPACT_HEIGHT;

// ── CSS calc helpers ──────────────────────────────────────────
// All visual interpolation is driven by the --mp custom property
// (0 = expanded, 1 = compact). The scroll handler sets it directly
// on the DOM via .style.setProperty — no React state involved.
const mp = 'var(--mp, 0)';
/** Interpolate px value: `from` at mp=0, `to` at mp=1 */
const px = (from: number, to: number) =>
  `calc(${from}px - ${mp} * ${from - to}px)`;
/** Opacity that fades to 0 at mp = 1/speed */
const fade = (speed: number) => `calc(1 - ${mp} * ${speed})`;

interface UnitHeroHeaderProps {
  unit: Unit;
  unitIndex: number;
  completedInUnit: number;
  totalInUnit: number;
  isAllGolden: boolean;
  theme: UnitTheme;
  professionId?: string;
  hasSections: boolean;
  sectionIndex?: number;
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
      professionId,
      hasSections,
      sectionIndex,
      positionStyle,
      onBrowseClick,
    },
    ref,
  ) {
    const bg = isAllGolden ? '#FFB800' : theme.color;
    const background = getUnitBackground(unitIndex);
    const progressPercent =
      totalInUnit > 0 ? (completedInUnit / totalInUnit) * 100 : 0;

    return (
      <div
        ref={ref}
        style={
          {
            '--mp': '0',
            position: 'fixed',
            top: positionStyle.top,
            left: positionStyle.left,
            width: positionStyle.width,
            zIndex: 30,
            paddingBottom: 6,
            transition: 'top 0.15s ease',
            pointerEvents: 'none',
          } as React.CSSProperties
        }
      >
        <div
          className="mx-auto"
          style={{ maxWidth: 544, padding: '0 12px', pointerEvents: 'auto' }}
        >
          <button
            onClick={onBrowseClick}
            className="active:scale-[0.99] transition-transform duration-75"
            style={{
              display: 'block',
              width: '100%',
              position: 'relative',
              overflow: 'hidden',
              background: bg,
              borderRadius: px(24, 16),
              height: px(HERO_EXPANDED_HEIGHT, HERO_COMPACT_HEIGHT),
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              transition: 'background-color 0.3s ease',
              WebkitTapHighlightColor: 'transparent',
            }}
            aria-label={`Unit ${unitIndex + 1}: ${unit.title}. Tap to browse.`}
          >
            {/* Background pattern */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                background: background.css,
                backgroundSize: background.size,
                opacity: fade(1.8),
                pointerEvents: 'none',
              }}
            />

            {/* Bottom readability gradient */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                height: '50%',
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.1) 0%, transparent 100%)',
                opacity: fade(2.5),
                pointerEvents: 'none',
              }}
            />

            {/* Content */}
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'flex-start',
                padding: `${px(20, 10)} ${px(20, 16)} ${px(16, 12)}`,
                height: '100%',
                gap: 12,
              }}
            >
              {/* Left text */}
              <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: 1.2,
                    color: 'rgba(255,255,255,0.6)',
                  }}
                >
                  {hasSections
                    ? `Section ${sectionIndex}, Unit ${unitIndex + 1}`
                    : `Unit ${unitIndex + 1}`}
                </div>

                <div
                  className="truncate"
                  style={{
                    fontSize: px(22, 17),
                    fontWeight: 800,
                    color: '#FFFFFF',
                    lineHeight: 1.25,
                  }}
                >
                  {unit.title}
                </div>

                {/* Description — always rendered, CSS opacity fades it */}
                <div
                  className="line-clamp-2"
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.7)',
                    marginTop: 4,
                    opacity: fade(2.5),
                    lineHeight: 1.35,
                  }}
                >
                  {unit.description}
                </div>

                {/* Progress bar */}
                <div
                  style={{
                    marginTop: 12,
                    opacity: fade(2.5),
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      height: 8,
                      borderRadius: 4,
                      background: 'rgba(0,0,0,0.15)',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${progressPercent}%`,
                        height: '100%',
                        borderRadius: 4,
                        backgroundColor: '#FFFFFF',
                        transition: 'width 0.4s ease',
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 800,
                      color: 'rgba(255,255,255,0.75)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {isAllGolden
                      ? '\u2728 Mastered!'
                      : `${completedInUnit}/${totalInUnit}`}
                  </span>
                </div>
              </div>

              {/* Right: illustration ↔ browse icon crossfade */}
              <div
                style={{
                  position: 'relative',
                  width: px(72, 34),
                  height: px(72, 34),
                  flexShrink: 0,
                  alignSelf: 'center',
                }}
              >
                {/* Unit illustration (fades out by mp≈0.6) */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: fade(1.667),
                  }}
                >
                  <UnitIllustration
                    unitIndex={unitIndex}
                    color="#FFFFFF"
                    className="w-full h-full"
                    professionId={professionId}
                  />
                </div>

                {/* Browse book icon (fades in from mp≈0.4) */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: `calc(${mp} * 1.667 - 0.667)`,
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: 10,
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 19.5v-15A2.5 2.5 0 016.5 2H20v20H6.5A2.5 2.5 0 014 19.5z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4 19.5A2.5 2.5 0 016.5 17H20"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 7h6"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    );
  }),
);
