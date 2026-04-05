'use client';

import { memo, forwardRef } from 'react';
import type { Unit } from '@/data/course/types';
import type { UnitTheme } from '@/lib/unitThemes';
import { getUnitBackground } from '@/lib/unitBackgrounds';
import { useDevImageStore } from '@/store/useDevImageStore';
import { DebugHeaderImage } from '@/components/dev/DebugHeaderImage';

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

// ── Shared banner content props ──────────────────────────────
export interface UnitBannerContentProps {
  unit: Unit;
  unitIndex: number;
  completedInUnit: number;
  totalInUnit: number;
  isAllGolden: boolean;
  theme: UnitTheme;
  professionId?: string;
  hasSections: boolean;
  sectionIndex?: number;
  /** 1-based unit number within the current section (falls back to unitIndex+1) */
  displayNumber?: number;
}

/**
 * Shared banner interior used by both the floating header and the inline
 * banners in the course map. Keeps visuals identical so the handoff is seamless.
 *
 * When `morphable` is true (floating header), sizes/opacities use CSS calc()
 * driven by --mp. When false (inline banner), everything is at expanded size.
 */
export function UnitBannerContent({
  unit, unitIndex, completedInUnit, totalInUnit, isAllGolden, theme,
  professionId, hasSections, sectionIndex, displayNumber, morphable = false,
}: UnitBannerContentProps & { morphable?: boolean }) {
  const unitNum = displayNumber ?? (unitIndex + 1);
  const background = getUnitBackground(unitIndex);
  const progressPercent = totalInUnit > 0 ? (completedInUnit / totalInUnit) * 100 : 0;

  const imageOverride = process.env.NODE_ENV === 'development'
    // eslint-disable-next-line react-hooks/rules-of-hooks
    ? useDevImageStore((s) => s.overrides[unit.id])
    : undefined;
  const effectiveHeaderBg = imageOverride ?? unit.headerBg;

  // When morphable, use CSS-var-driven calc; otherwise static expanded values
  const sz = morphable ? px : (from: number, _to: number) => `${from}px`;
  const op = morphable ? fade : () => '1';

  return (
    <>
      {/* Background pattern / image */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          ...(effectiveHeaderBg
            ? { backgroundImage: `url(${effectiveHeaderBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }
            : { backgroundImage: background.css, backgroundSize: background.size ?? 'auto' }),
          opacity: effectiveHeaderBg ? 1 : (morphable ? fade(1.8) : 1),
          pointerEvents: 'none',
        }}
      />

      {/* Dev: header image upload button */}
      {process.env.NODE_ENV === 'development' && (
        <div
          onClick={(e) => { e.stopPropagation(); e.preventDefault(); }}
          style={{ opacity: op(2.5), pointerEvents: 'auto' }}
        >
          <DebugHeaderImage unitId={unit.id} />
        </div>
      )}

      {/* Readability gradient */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: effectiveHeaderBg
            ? 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.4) 100%)'
            : 'linear-gradient(to top, rgba(0,0,0,0.1) 0%, transparent 100%)',
          opacity: effectiveHeaderBg ? 1 : op(2.5),
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-start',
          padding: `${sz(20, 10)} ${sz(20, 16)} ${sz(16, 12)}`,
          height: '100%',
          gap: 12,
        }}
      >
        <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
          <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.2, color: 'rgba(255,255,255,0.6)' }}>
            {hasSections ? `Section ${sectionIndex ?? 1}, Unit ${unitNum}` : `Unit ${unitNum}`}
          </div>
          <div className="truncate" style={{ fontSize: sz(22, 17), fontWeight: 800, color: '#FFFFFF', lineHeight: 1.25 }}>
            {unit.title}
          </div>
          <div className="line-clamp-2" style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginTop: 4, opacity: op(2.5), lineHeight: 1.35 }}>
            {unit.description}
          </div>
          <div style={{ marginTop: 12, opacity: op(2.5), display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ flex: 1, height: 8, borderRadius: 4, background: 'rgba(0,0,0,0.15)', overflow: 'hidden' }}>
              <div style={{ width: `${progressPercent}%`, height: '100%', borderRadius: 4, backgroundColor: '#FFFFFF', transition: morphable ? 'none' : 'width 0.4s ease' }} />
            </div>
            <span style={{ fontSize: 12, fontWeight: 800, color: 'rgba(255,255,255,0.75)', whiteSpace: 'nowrap' }}>
              {isAllGolden ? '\u2728 Mastered!' : `${completedInUnit}/${totalInUnit}`}
            </span>
          </div>
        </div>

      </div>
    </>
  );
}

interface UnitHeroHeaderProps extends UnitBannerContentProps {
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
      displayNumber,
      positionStyle,
      onBrowseClick,
    },
    ref,
  ) {
    const unitNum = displayNumber ?? (unitIndex + 1);
    const bg = isAllGolden ? '#FFB800' : theme.color;

    return (
      <div
        ref={ref}
        style={
          {
            // --mp is managed exclusively via DOM API (scroll handler + useLayoutEffect)
            // to prevent React re-renders from resetting it mid-frame.
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
          className="mx-auto px-3 sm:px-4"
          style={{ maxWidth: 520, pointerEvents: 'auto' }}
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
              borderRadius: 24,
              height: `max(0px, ${px(HERO_EXPANDED_HEIGHT, HERO_COMPACT_HEIGHT)})`,
              opacity: `clamp(0, calc((${(HERO_EXPANDED_HEIGHT / HERO_MORPH_DISTANCE).toFixed(3)} - ${mp}) * 20), 1)`,
              border: 'none',
              cursor: 'pointer',
              boxShadow: `0 4px 12px rgba(0,0,0,calc(0.15 * clamp(0, (1.05 - ${mp}) * 20, 1)))`,

              WebkitTapHighlightColor: 'transparent',
            }}
            aria-label={`Unit ${unitNum}: ${unit.title}. Tap to browse.`}
          >
            <UnitBannerContent
              unit={unit}
              unitIndex={unitIndex}
              completedInUnit={completedInUnit}
              totalInUnit={totalInUnit}
              isAllGolden={isAllGolden}
              theme={theme}
              professionId={professionId}
              hasSections={hasSections}
              sectionIndex={sectionIndex}
              displayNumber={displayNumber}
              morphable
            />
          </button>
        </div>
      </div>
    );
  }),
);
