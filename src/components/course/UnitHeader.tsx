'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import type { Unit } from '@/data/course/types';
import type { UnitTheme } from '@/lib/unitThemes';
import { UnitIllustration } from './UnitIllustrations';

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
}

const GOLD = '#FFB800';
const GOLD_DARK = '#B38600';
const DEPTH = 7;

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
}: UnitHeaderProps) {
  const progressPercent =
    totalInUnit > 0 ? (completedInUnit / totalInUnit) * 100 : 0;

  const bg = isAllGolden ? GOLD : theme.color;
  const rim = isAllGolden ? GOLD_DARK : theme.dark;
  const illustrationColor = isAllGolden ? '#FFFFFF' : '#FFFFFF';

  const filterId = `uh-${unitIndex}`;

  return (
    <div className="select-none" style={{ position: 'relative', width: '100%' }}>
      {/* 3D bottom layer */}
      <svg
        width="100%"
        viewBox="0 0 1012 420"
        fill="none"
        style={{
          display: 'block',
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
        }}
      >
        <rect y="17" width="1012" height="400" rx="43" fill={rim} />
      </svg>

      {/* Face card */}
      <div style={{ position: 'relative' }}>
        <svg
          width="100%"
          viewBox="0 0 1012 400"
          fill="none"
          style={{ display: 'block' }}
        >
          <defs>
            <filter id={filterId} x="0" y="0" width="1012" height="404" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feMorphology radius="16" operator="erode" in="SourceAlpha" result="innerShadow"/>
              <feOffset dy="4"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.12 0"/>
              <feBlend mode="normal" in2="shape" result="innerShadow"/>
            </filter>
            <clipPath id={`clip-${filterId}`}>
              <rect width="1012" height="380" rx="43" />
            </clipPath>
          </defs>
          <g filter={`url(#${filterId})`}>
            <rect width="1012" height="380" rx="43" fill={bg} />
          </g>
          {/* Top highlight for 3D curvature */}
          <g clipPath={`url(#clip-${filterId})`}>
            <rect y="0" width="1012" height="110" fill="white" fillOpacity="0.12" rx="43" />
            <rect x="40" y="16" width="932" height="6" rx="3" fill="white" fillOpacity="0.18" />
          </g>
        </svg>

        {/* Content overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '20px 20px 18px',
          }}
        >
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
              style={{ width: 72, height: 72 }}
            >
              <UnitIllustration
                unitIndex={unitIndex}
                color={illustrationColor}
                className="w-full h-full"
                professionId={professionId}
              />
            </div>
          </div>

          {/* Progress bar */}
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
        </div>
      </div>
    </div>
  );
});
