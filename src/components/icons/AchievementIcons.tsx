'use client';

import React from 'react';

// ─── Category Color Palettes ───────────────────────────────────────────────
const COLORS = {
  knowledge: { base: '#3B82F6', dark: '#1D4ED8', light: '#DBEAFE' },
  consistency: { base: '#10B981', dark: '#047857', light: '#D1FAE5' },
  challenge: { base: '#F59E0B', dark: '#B45309', light: '#FEF3C7' },
  exploration: { base: '#06B6D4', dark: '#0E7490', light: '#CFFAFE' },
  mastery: { base: '#FFB800', dark: '#996E00', light: '#FFF5D4' },
  hidden: { base: '#8B5CF6', dark: '#6D28D9', light: '#EDE9FE' },
};

type IconProps = { size?: number; className?: string };

// ─── Shared Medal Base ─────────────────────────────────────────────────────
function MedalBase({
  id,
  colors,
  children,
  size = 64,
  className,
}: {
  id: string;
  colors: { base: string; dark: string; light: string };
  children: React.ReactNode;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        {/* Outer ring gradient */}
        <linearGradient id={`${id}-ring`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={colors.base} />
          <stop offset="100%" stopColor={colors.dark} />
        </linearGradient>
        {/* Inner fill gradient */}
        <linearGradient id={`${id}-inner`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor={colors.light} />
        </linearGradient>
        {/* Metallic shine */}
        <linearGradient id={`${id}-shine`} x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.15" />
        </linearGradient>
        {/* Ribbon gradient */}
        <linearGradient id={`${id}-ribbon`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={colors.base} />
          <stop offset="100%" stopColor={colors.dark} />
        </linearGradient>
      </defs>

      {/* Ribbon tails behind medal */}
      <path
        d="M22 48 L18 60 L24 56 L28 62 L28 48"
        fill={`url(#${id}-ribbon)`}
        stroke={colors.dark}
        strokeWidth="1"
      />
      <path
        d="M42 48 L46 60 L40 56 L36 62 L36 48"
        fill={`url(#${id}-ribbon)`}
        stroke={colors.dark}
        strokeWidth="1"
      />

      {/* Outer ring */}
      <circle
        cx="32"
        cy="30"
        r="26"
        fill={`url(#${id}-ring)`}
        stroke={colors.dark}
        strokeWidth="2"
      />

      {/* Inner ring border */}
      <circle
        cx="32"
        cy="30"
        r="22"
        fill="none"
        stroke={colors.light}
        strokeWidth="1"
        opacity="0.7"
      />

      {/* Inner fill */}
      <circle cx="32" cy="30" r="20" fill={`url(#${id}-inner)`} />

      {/* Metallic shine overlay */}
      <circle cx="32" cy="30" r="20" fill={`url(#${id}-shine)`} />

      {/* Notch details on rim */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 32 + 23 * Math.cos(rad);
        const y1 = 30 + 23 * Math.sin(rad);
        const x2 = 32 + 25.5 * Math.cos(rad);
        const y2 = 30 + 25.5 * Math.sin(rad);
        return (
          <line
            key={angle}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={colors.light}
            strokeWidth="1.5"
            opacity="0.5"
          />
        );
      })}

      {/* Emblem content */}
      {children}
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// KNOWLEDGE (7) - Indigo
// ════════════════════════════════════════════════════════════════════════════

/** 1. First Principles - Target/bullseye with arrow */
export function FirstPrinciplesIcon({ size = 64, className }: IconProps) {
  const id = 'ach-first-principles';
  const c = COLORS.knowledge;
  return (
    <MedalBase id={id} colors={c} size={size} className={className}>
      <defs>
        <linearGradient id={`${id}-arrow`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#B91C1C" />
        </linearGradient>
      </defs>
      {/* Outer ring */}
      <circle cx="32" cy="30" r="12" fill="none" stroke={c.dark} strokeWidth="2" />
      {/* Middle ring */}
      <circle cx="32" cy="30" r="8" fill="none" stroke="#EF4444" strokeWidth="2" />
      {/* Inner ring */}
      <circle cx="32" cy="30" r="4" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.5" />
      {/* Bullseye center */}
      <circle cx="32" cy="30" r="1.5" fill="#FFFFFF" />
      {/* Arrow shaft */}
      <line x1="22" y1="20" x2="31" y2="29" stroke={`url(#${id}-arrow)`} strokeWidth="2" />
      {/* Arrow head */}
      <polygon points="20,17 25,19 22,22" fill="#B91C1C" />
      {/* Arrow fletching */}
      <line x1="20" y1="17" x2="18" y2="20" stroke="#B91C1C" strokeWidth="1.5" />
      <line x1="20" y1="17" x2="23" y2="15" stroke="#B91C1C" strokeWidth="1.5" />
    </MedalBase>
  );
}

/** 2. Building Momentum - Rising bar chart / stairs */
export function BuildingMomentumIcon({ size = 64, className }: IconProps) {
  const id = 'ach-building-momentum';
  const c = COLORS.knowledge;
  return (
    <MedalBase id={id} colors={c} size={size} className={className}>
      <defs>
        <linearGradient id={`${id}-bar`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor={c.dark} />
          <stop offset="100%" stopColor={c.base} />
        </linearGradient>
      </defs>
      {/* Base line */}
      <line x1="20" y1="40" x2="44" y2="40" stroke={c.dark} strokeWidth="2" />
      {/* Bar 1 */}
      <rect x="21" y="35" width="4" height="5" rx="0.5" fill={`url(#${id}-bar)`} stroke={c.dark} strokeWidth="1" />
      {/* Bar 2 */}
      <rect x="27" y="31" width="4" height="9" rx="0.5" fill={`url(#${id}-bar)`} stroke={c.dark} strokeWidth="1" />
      {/* Bar 3 */}
      <rect x="33" y="26" width="4" height="14" rx="0.5" fill={`url(#${id}-bar)`} stroke={c.dark} strokeWidth="1" />
      {/* Bar 4 */}
      <rect x="39" y="20" width="4" height="20" rx="0.5" fill={`url(#${id}-bar)`} stroke={c.dark} strokeWidth="1" />
      {/* Trend arrow */}
      <polyline points="23,34 29,30 35,25 41,19" fill="none" stroke="#F59E0B" strokeWidth="1.5" />
      <polygon points="41,19 43,22 39,21" fill="#F59E0B" />
    </MedalBase>
  );
}

/** 3. Solid Foundation - Brick wall / foundation blocks */
export function SolidFoundationIcon({ size = 64, className }: IconProps) {
  const id = 'ach-solid-foundation';
  const c = COLORS.knowledge;
  return (
    <MedalBase id={id} colors={c} size={size} className={className}>
      <defs>
        <linearGradient id={`${id}-brick`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F87171" />
          <stop offset="100%" stopColor="#DC2626" />
        </linearGradient>
      </defs>
      {/* Row 1 (bottom) - 3 bricks */}
      <rect x="18" y="35" width="9" height="5" rx="0.5" fill={`url(#${id}-brick)`} stroke="#991B1B" strokeWidth="1" />
      <rect x="28" y="35" width="9" height="5" rx="0.5" fill={`url(#${id}-brick)`} stroke="#991B1B" strokeWidth="1" />
      <rect x="38" y="35" width="9" height="5" rx="0.5" fill={`url(#${id}-brick)`} stroke="#991B1B" strokeWidth="1" />
      {/* Row 2 - offset 2.5 bricks */}
      <rect x="22" y="29" width="9" height="5" rx="0.5" fill={`url(#${id}-brick)`} stroke="#991B1B" strokeWidth="1" />
      <rect x="32" y="29" width="9" height="5" rx="0.5" fill={`url(#${id}-brick)`} stroke="#991B1B" strokeWidth="1" />
      {/* Row 3 - 2 bricks */}
      <rect x="18" y="23" width="9" height="5" rx="0.5" fill={`url(#${id}-brick)`} stroke="#991B1B" strokeWidth="1" />
      <rect x="28" y="23" width="9" height="5" rx="0.5" fill={`url(#${id}-brick)`} stroke="#991B1B" strokeWidth="1" />
      <rect x="38" y="23" width="9" height="5" rx="0.5" fill={`url(#${id}-brick)`} stroke="#991B1B" strokeWidth="1" />
      {/* Mortar highlight */}
      <line x1="18" y1="34.5" x2="47" y2="34.5" stroke="#FCA5A5" strokeWidth="0.5" opacity="0.5" />
      <line x1="18" y1="28.5" x2="47" y2="28.5" stroke="#FCA5A5" strokeWidth="0.5" opacity="0.5" />
      {/* Foundation base */}
      <rect x="16" y="40" width="33" height="2" rx="1" fill={c.dark} />
    </MedalBase>
  );
}

/** 4. Centurion - Number "100" with laurels */
export function CenturionIcon({ size = 64, className }: IconProps) {
  const id = 'ach-centurion';
  const c = COLORS.knowledge;
  return (
    <MedalBase id={id} colors={c} size={size} className={className}>
      <defs>
        <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
      </defs>
      {/* Left laurel */}
      <path d="M19,36 Q21,32 20,28 Q22,30 21,34" fill="#10B981" stroke="#047857" strokeWidth="0.8" />
      <path d="M18,33 Q20,29 19,25 Q21,27 20,31" fill="#10B981" stroke="#047857" strokeWidth="0.8" />
      <path d="M18,30 Q20,26 19,22 Q21,24 20,28" fill="#10B981" stroke="#047857" strokeWidth="0.8" />
      {/* Right laurel */}
      <path d="M45,36 Q43,32 44,28 Q42,30 43,34" fill="#10B981" stroke="#047857" strokeWidth="0.8" />
      <path d="M46,33 Q44,29 45,25 Q43,27 44,31" fill="#10B981" stroke="#047857" strokeWidth="0.8" />
      <path d="M46,30 Q44,26 45,22 Q43,24 44,28" fill="#10B981" stroke="#047857" strokeWidth="0.8" />
      {/* "100" text */}
      <text
        x="32"
        y="33"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontWeight="900"
        fontSize="13"
        fill={`url(#${id}-gold)`}
        stroke="#B8860B"
        strokeWidth="0.5"
      >
        100
      </text>
      {/* Small star above */}
      <polygon points="32,18 33,20.5 35.5,20.5 33.5,22 34.3,24.5 32,23 29.7,24.5 30.5,22 28.5,20.5 31,20.5" fill="#FFD700" />
    </MedalBase>
  );
}

/** 5. Flawless Execution - Diamond/gem sparkle */
export function FlawlessExecutionIcon({ size = 64, className }: IconProps) {
  const id = 'ach-flawless-execution';
  const c = COLORS.knowledge;
  return (
    <MedalBase id={id} colors={c} size={size} className={className}>
      <defs>
        <linearGradient id={`${id}-gem`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#93C5FD" />
          <stop offset="40%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
        <linearGradient id={`${id}-gem2`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#BFDBFE" />
          <stop offset="100%" stopColor="#60A5FA" />
        </linearGradient>
      </defs>
      {/* Diamond shape - top facets */}
      <polygon points="32,19 25,27 32,24 39,27" fill={`url(#${id}-gem2)`} stroke="#1E3A8A" strokeWidth="1" />
      {/* Diamond shape - bottom */}
      <polygon points="25,27 32,40 39,27" fill={`url(#${id}-gem)`} stroke="#1E3A8A" strokeWidth="1" />
      {/* Center facet line */}
      <line x1="32" y1="24" x2="32" y2="40" stroke="#93C5FD" strokeWidth="0.5" opacity="0.6" />
      {/* Left facet */}
      <line x1="25" y1="27" x2="32" y2="24" stroke="#1E3A8A" strokeWidth="0.8" />
      {/* Right facet */}
      <line x1="39" y1="27" x2="32" y2="24" stroke="#1E3A8A" strokeWidth="0.8" />
      {/* Sparkles */}
      <line x1="42" y1="20" x2="42" y2="16" stroke="#FFD700" strokeWidth="1.5" />
      <line x1="40" y1="18" x2="44" y2="18" stroke="#FFD700" strokeWidth="1.5" />
      <line x1="20" y1="22" x2="20" y2="19" stroke="#FFD700" strokeWidth="1" />
      <line x1="18.5" y1="20.5" x2="21.5" y2="20.5" stroke="#FFD700" strokeWidth="1" />
      <circle cx="44" cy="25" r="0.8" fill="#FFD700" />
      <circle cx="19" cy="33" r="0.8" fill="#FFD700" />
    </MedalBase>
  );
}

/** 6. No Easy Mode - Flame/fire with "hard" badge */
export function NoEasyModeIcon({ size = 64, className }: IconProps) {
  const id = 'ach-no-easy-mode';
  const c = COLORS.knowledge;
  return (
    <MedalBase id={id} colors={c} size={size} className={className}>
      <defs>
        <linearGradient id={`${id}-flame`} x1="0.5" y1="1" x2="0.5" y2="0">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="50%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#DC2626" />
        </linearGradient>
        <linearGradient id={`${id}-inner-flame`} x1="0.5" y1="1" x2="0.5" y2="0">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      {/* Main flame */}
      <path
        d="M32,16 Q38,22 40,28 Q40,36 32,40 Q24,36 24,28 Q26,22 32,16Z"
        fill={`url(#${id}-flame)`}
        stroke="#B91C1C"
        strokeWidth="1.5"
      />
      {/* Inner flame */}
      <path
        d="M32,24 Q35,28 36,32 Q36,37 32,39 Q28,37 28,32 Q29,28 32,24Z"
        fill={`url(#${id}-inner-flame)`}
        stroke="#D97706"
        strokeWidth="0.8"
      />
      {/* Core bright spot */}
      <ellipse cx="32" cy="34" rx="2" ry="3" fill="#FEF3C7" opacity="0.8" />
      {/* "HARD" badge */}
      <rect x="24" y="36" width="16" height="6" rx="3" fill={c.dark} stroke={c.base} strokeWidth="0.8" />
      <text
        x="32"
        y="41"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontWeight="800"
        fontSize="5"
        fill="#FFFFFF"
      >
        HARD
      </text>
    </MedalBase>
  );
}

/** 7. Back of the Envelope - Pencil with quick sketch/calculation */
export function BackOfEnvelopeIcon({ size = 64, className }: IconProps) {
  const id = 'ach-back-envelope';
  const c = COLORS.knowledge;
  return (
    <MedalBase id={id} colors={c} size={size} className={className}>
      <defs>
        <linearGradient id={`${id}-pencil`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      {/* Envelope/paper */}
      <rect x="20" y="21" width="24" height="18" rx="1.5" fill="#FFFBEB" stroke="#D1D5DB" strokeWidth="1.5" />
      {/* Scribbled calculation lines */}
      <line x1="23" y1="25" x2="35" y2="25" stroke="#9CA3AF" strokeWidth="0.8" />
      <line x1="23" y1="28" x2="31" y2="28" stroke="#9CA3AF" strokeWidth="0.8" />
      <line x1="23" y1="31" x2="38" y2="31" stroke="#9CA3AF" strokeWidth="0.8" />
      {/* Equals sign */}
      <line x1="23" y1="34" x2="26" y2="34" stroke={c.dark} strokeWidth="1" />
      <line x1="23" y1="35.5" x2="26" y2="35.5" stroke={c.dark} strokeWidth="1" />
      {/* Answer */}
      <text x="28" y="36" fontFamily="Arial, sans-serif" fontSize="4" fontWeight="700" fill={c.dark}>42</text>
      {/* Pencil */}
      <rect x="36" y="15" width="3.5" height="16" rx="0.5" fill={`url(#${id}-pencil)`} stroke="#B45309" strokeWidth="0.8" transform="rotate(20 38 23)" />
      {/* Pencil tip */}
      <polygon points="39.5,31.5 37.5,31.5 38.5,34.5" fill="#F4A460" stroke="#B45309" strokeWidth="0.5" transform="rotate(20 38 33)" />
      {/* Eraser */}
      <rect x="36" y="14" width="3.5" height="3" rx="0.5" fill="#F472B6" stroke="#DB2777" strokeWidth="0.5" transform="rotate(20 38 15.5)" />
    </MedalBase>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// CONSISTENCY (6) - Green
// ════════════════════════════════════════════════════════════════════════════

/** 8. Getting Warmed Up - Small flame (3-day) */
export function GettingWarmedUpIcon({ size = 64, className }: IconProps) {
  const id = 'ach-getting-warmed';
  const c = COLORS.consistency;
  return (
    <MedalBase id={id} colors={c} size={size} className={className}>
      <defs>
        <linearGradient id={`${id}-flame`} x1="0.5" y1="1" x2="0.5" y2="0">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="60%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#EF4444" />
        </linearGradient>
      </defs>
      {/* Flame */}
      <path
        d="M32,18 Q37,24 38,29 Q38,36 32,38 Q26,36 26,29 Q27,24 32,18Z"
        fill={`url(#${id}-flame)`}
        stroke="#DC2626"
        strokeWidth="1.5"
      />
      {/* Inner flame */}
      <path
        d="M32,26 Q34,29 34.5,32 Q34.5,36 32,37 Q29.5,36 29.5,32 Q30,29 32,26Z"
        fill="#FDE68A"
        stroke="#F59E0B"
        strokeWidth="0.8"
      />
      {/* Core */}
      <ellipse cx="32" cy="34" rx="1.5" ry="2" fill="#FFFBEB" opacity="0.9" />
      {/* "3" badge */}
      <circle cx="40" cy="21" r="4" fill={c.dark} stroke={c.base} strokeWidth="1" />
      <text x="40" y="23.5" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="6" fill="#FFFFFF">3</text>
    </MedalBase>
  );
}

/** 9. Seven-Day Streak - Calendar with checkmarks */
export function SevenDayStreakIcon({ size = 64, className }: IconProps) {
  const id = 'ach-seven-day';
  const c = COLORS.consistency;
  return (
    <MedalBase id={id} colors={c} size={size} className={className}>
      <defs>
        <linearGradient id={`${id}-cal`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F3F4F6" />
        </linearGradient>
      </defs>
      {/* Calendar body */}
      <rect x="19" y="20" width="26" height="22" rx="2" fill={`url(#${id}-cal)`} stroke="#6B7280" strokeWidth="1.5" />
      {/* Calendar header */}
      <rect x="19" y="20" width="26" height="6" rx="2" fill={c.base} />
      {/* Calendar binding rings */}
      <rect x="25" y="18" width="2" height="4" rx="1" fill="#6B7280" />
      <rect x="37" y="18" width="2" height="4" rx="1" fill="#6B7280" />
      {/* Grid lines */}
      <line x1="19" y1="32" x2="45" y2="32" stroke="#E5E7EB" strokeWidth="0.5" />
      {/* Checkmarks - 7 checks in a row */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const cx = 23 + col * 6;
        const cy = 30 + row * 6;
        return (
          <polyline
            key={i}
            points={`${cx - 2},${cy} ${cx},${cy + 2} ${cx + 3},${cy - 2}`}
            fill="none"
            stroke={c.dark}
            strokeWidth="1.5"
          />
        );
      })}
      {/* "7" overlay */}
      <text x="32" y="25" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="5" fill="#FFFFFF">7 DAYS</text>
    </MedalBase>
  );
}

/** 10. Fortnight of Focus - Two-week calendar badge */
export function FortnightOfFocusIcon({ size = 64, className }: IconProps) {
  const id = 'ach-fortnight';
  const c = COLORS.consistency;
  return (
    <MedalBase id={id} colors={c} size={size} className={className}>
      <defs>
        <linearGradient id={`${id}-badge`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c.base} />
          <stop offset="100%" stopColor={c.dark} />
        </linearGradient>
      </defs>
      {/* Shield shape */}
      <path
        d="M22,20 L42,20 L42,34 Q42,42 32,44 Q22,42 22,34Z"
        fill={`url(#${id}-badge)`}
        stroke={c.dark}
        strokeWidth="2"
      />
      {/* Inner shield */}
      <path
        d="M25,23 L39,23 L39,33 Q39,39 32,41 Q25,39 25,33Z"
        fill={c.light}
        stroke={c.dark}
        strokeWidth="0.8"
      />
      {/* "14" text */}
      <text
        x="32"
        y="33"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontWeight="900"
        fontSize="11"
        fill={c.dark}
      >
        14
      </text>
      {/* Lightning bolt accent */}
      <polygon points="35,18 32,24 34,24 31,30 37,22 35,22" fill="#FCD34D" stroke="#F59E0B" strokeWidth="0.5" />
    </MedalBase>
  );
}

/** 11. Iron Will - Iron anvil */
export function IronWillIcon({ size = 64, className }: IconProps) {
  const id = 'ach-iron-will';
  const c = COLORS.consistency;
  return (
    <MedalBase id={id} colors={c} size={size} className={className}>
      <defs>
        <linearGradient id={`${id}-anvil`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9CA3AF" />
          <stop offset="50%" stopColor="#6B7280" />
          <stop offset="100%" stopColor="#374151" />
        </linearGradient>
      </defs>
      {/* Anvil top surface */}
      <path
        d="M20,28 L24,25 L40,25 L44,28 L20,28Z"
        fill={`url(#${id}-anvil)`}
        stroke="#1F2937"
        strokeWidth="1.5"
      />
      {/* Anvil horn (left) */}
      <path d="M20,28 L16,27 Q14,27 15,29 L20,30" fill="#6B7280" stroke="#1F2937" strokeWidth="1" />
      {/* Anvil body */}
      <rect x="24" y="28" width="16" height="8" fill="#6B7280" stroke="#1F2937" strokeWidth="1" />
      {/* Anvil base */}
      <path
        d="M22,36 L42,36 L44,40 L20,40Z"
        fill="#4B5563"
        stroke="#1F2937"
        strokeWidth="1.5"
      />
      {/* Shine on top */}
      <line x1="26" y1="26" x2="38" y2="26" stroke="#D1D5DB" strokeWidth="0.8" opacity="0.6" />
      {/* Sparks */}
      <circle cx="30" cy="22" r="1" fill="#FCD34D" />
      <circle cx="34" cy="20" r="0.8" fill="#FBBF24" />
      <circle cx="28" cy="20" r="0.6" fill="#F59E0B" />
      {/* "30" text */}
      <text x="32" y="25" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="4" fill="#FFFFFF" opacity="0.9">30</text>
    </MedalBase>
  );
}

/** 12. Challenger - Sword/challenge flag */
export function ChallengerIcon({ size = 64, className }: IconProps) {
  const id = 'ach-challenger';
  const c = COLORS.consistency;
  return (
    <MedalBase id={id} colors={c} size={size} className={className}>
      <defs>
        <linearGradient id={`${id}-blade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E5E7EB" />
          <stop offset="100%" stopColor="#9CA3AF" />
        </linearGradient>
        <linearGradient id={`${id}-flag`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={c.base} />
          <stop offset="100%" stopColor={c.dark} />
        </linearGradient>
      </defs>
      {/* Flag pole */}
      <line x1="27" y1="18" x2="27" y2="42" stroke="#8B5E34" strokeWidth="2" />
      {/* Flag */}
      <path
        d="M28,18 L42,22 L28,28Z"
        fill={`url(#${id}-flag)`}
        stroke={c.dark}
        strokeWidth="1.5"
      />
      {/* Flag detail stripe */}
      <line x1="28" y1="23" x2="38" y2="23" stroke={c.light} strokeWidth="1" opacity="0.5" />
      {/* Pole cap */}
      <circle cx="27" cy="17" r="2" fill="#FFD700" stroke="#B8860B" strokeWidth="1" />
      {/* Crossed sword behind */}
      <line x1="33" y1="22" x2="42" y2="40" stroke={`url(#${id}-blade)`} strokeWidth="2" />
      {/* Sword guard */}
      <line x1="36" y1="28" x2="40" y2="26" stroke="#B8860B" strokeWidth="2" />
      {/* Sword handle */}
      <line x1="40" y1="37" x2="43" y2="42" stroke="#8B5E34" strokeWidth="2" />
    </MedalBase>
  );
}

/** 13. Weekend Warrior - Shield with weekend badge */
export function WeekendWarriorIcon({ size = 64, className }: IconProps) {
  const id = 'ach-weekend-warrior';
  const c = COLORS.consistency;
  return (
    <MedalBase id={id} colors={c} size={size} className={className}>
      <defs>
        <linearGradient id={`${id}-shield`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c.base} />
          <stop offset="100%" stopColor={c.dark} />
        </linearGradient>
        <linearGradient id={`${id}-inner`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor={c.light} />
        </linearGradient>
      </defs>
      {/* Shield */}
      <path
        d="M20,18 L44,18 L44,33 Q44,42 32,46 Q20,42 20,33Z"
        fill={`url(#${id}-shield)`}
        stroke={c.dark}
        strokeWidth="2"
      />
      {/* Inner shield area */}
      <path
        d="M23,21 L41,21 L41,32 Q41,39 32,42 Q23,39 23,32Z"
        fill={`url(#${id}-inner)`}
        stroke={c.dark}
        strokeWidth="0.8"
      />
      {/* "S S" for Sat/Sun */}
      <text x="28" y="30" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="8" fill={c.dark}>S</text>
      <text x="34" y="38" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="8" fill={c.dark}>S</text>
      {/* Connecting slash */}
      <line x1="34" y1="23" x2="29" y2="39" stroke={c.base} strokeWidth="1" opacity="0.5" />
      {/* Star at top */}
      <polygon points="32,15 33,17 35,17 33.5,18.5 34,20.5 32,19.5 30,20.5 30.5,18.5 29,17 31,17" fill="#FFD700" stroke="#B8860B" strokeWidth="0.5" />
    </MedalBase>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// CHALLENGE (5) - Amber
// ════════════════════════════════════════════════════════════════════════════

/** 14. Quick Draw - Stopwatch/timer */
export function QuickDrawIcon({ size = 64, className }: IconProps) {
  const id = 'ach-quick-draw';
  const c = COLORS.challenge;
  return (
    <MedalBase id={id} colors={c} size={size} className={className}>
      <defs>
        <linearGradient id={`${id}-watch`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F9FAFB" />
          <stop offset="100%" stopColor="#E5E7EB" />
        </linearGradient>
      </defs>
      {/* Stopwatch body */}
      <circle cx="32" cy="32" r="12" fill={`url(#${id}-watch)`} stroke="#374151" strokeWidth="2" />
      {/* Inner rim */}
      <circle cx="32" cy="32" r="10" fill="none" stroke="#D1D5DB" strokeWidth="0.8" />
      {/* Top button */}
      <rect x="30" y="18" width="4" height="3" rx="1" fill="#6B7280" stroke="#374151" strokeWidth="1" />
      {/* Side button */}
      <rect x="43" y="27" width="3" height="3" rx="0.5" fill="#6B7280" stroke="#374151" strokeWidth="0.8" />
      {/* Clock hand - minute */}
      <line x1="32" y1="32" x2="32" y2="24" stroke={c.dark} strokeWidth="1.5" />
      {/* Clock hand - second */}
      <line x1="32" y1="32" x2="38" y2="29" stroke="#EF4444" strokeWidth="1" />
      {/* Center dot */}
      <circle cx="32" cy="32" r="1.5" fill="#374151" />
      {/* Tick marks */}
      {[0, 90, 180, 270].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 32 + 9 * Math.cos(rad);
        const y1 = 32 + 9 * Math.sin(rad);
        const x2 = 32 + 10 * Math.cos(rad);
        const y2 = 32 + 10 * Math.sin(rad);
        return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#374151" strokeWidth="1.5" />;
      })}
      {/* Speed lines */}
      <line x1="18" y1="26" x2="15" y2="25" stroke={c.base} strokeWidth="1.5" />
      <line x1="18" y1="32" x2="14" y2="32" stroke={c.base} strokeWidth="1.5" />
      <line x1="18" y1="38" x2="15" y2="39" stroke={c.base} strokeWidth="1.5" />
    </MedalBase>
  );
}

/** 15. Confidence Calibrated - Calibration dial/gauge */
export function ConfidenceCalibratedIcon({ size = 64, className }: IconProps) {
  const id = 'ach-confidence';
  const c = COLORS.challenge;
  return (
    <MedalBase id={id} colors={c} size={size} className={className}>
      <defs>
        <linearGradient id={`${id}-gauge`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
      </defs>
      {/* Gauge background */}
      <path
        d="M20,37 A14,14 0 0,1 44,37"
        fill="none"
        stroke="#E5E7EB"
        strokeWidth="4"
      />
      {/* Gauge colored arc */}
      <path
        d="M20,37 A14,14 0 0,1 44,37"
        fill="none"
        stroke={`url(#${id}-gauge)`}
        strokeWidth="3"
      />
      {/* Tick marks on gauge */}
      {[-135, -112.5, -90, -67.5, -45].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 32 + 11 * Math.cos(rad);
        const y1 = 37 + 11 * Math.sin(rad);
        const x2 = 32 + 13 * Math.cos(rad);
        const y2 = 37 + 13 * Math.sin(rad);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#6B7280" strokeWidth="1" />;
      })}
      {/* Needle pointing to green (right) */}
      <line x1="32" y1="37" x2="42" y2="28" stroke="#1F2937" strokeWidth="2" />
      {/* Needle base */}
      <circle cx="32" cy="37" r="2.5" fill="#374151" stroke="#1F2937" strokeWidth="1" />
      <circle cx="32" cy="37" r="1" fill="#D1D5DB" />
      {/* Checkmark at the green end */}
      <polyline points="41,22 43,24.5 47,19" fill="none" stroke="#10B981" strokeWidth="2" />
    </MedalBase>
  );
}

/** 16. Eagle Eye - Eye with magnifying detail */
export function EagleEyeIcon({ size = 64, className }: IconProps) {
  const id = 'ach-eagle-eye';
  const c = COLORS.challenge;
  return (
    <MedalBase id={id} colors={c} size={size} className={className}>
      <defs>
        <radialGradient id={`${id}-iris`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="60%" stopColor="#B45309" />
          <stop offset="100%" stopColor="#78350F" />
        </radialGradient>
      </defs>
      {/* Eye shape outer */}
      <path
        d="M18,30 Q25,20 32,20 Q39,20 46,30 Q39,40 32,40 Q25,40 18,30Z"
        fill="#FFFFFF"
        stroke="#374151"
        strokeWidth="2"
      />
      {/* Iris */}
      <circle cx="32" cy="30" r="6" fill={`url(#${id}-iris)`} stroke="#78350F" strokeWidth="1" />
      {/* Pupil */}
      <circle cx="32" cy="30" r="2.5" fill="#1F2937" />
      {/* Pupil highlight */}
      <circle cx="33.5" cy="28.5" r="1" fill="#FFFFFF" opacity="0.8" />
      <circle cx="31" cy="31" r="0.5" fill="#FFFFFF" opacity="0.5" />
      {/* Magnifying glass overlay (bottom-right) */}
      <circle cx="40" cy="36" r="5" fill="none" stroke={c.dark} strokeWidth="2" />
      <line x1="43.5" y1="39.5" x2="47" y2="43" stroke={c.dark} strokeWidth="2.5" />
      {/* Magnifying glass shine */}
      <path d="M37,34 Q38,33 39,34" fill="none" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.6" />
    </MedalBase>
  );
}

/** 17. Scenario Commander - Map with strategy pins */
export function ScenarioCommanderIcon({ size = 64, className }: IconProps) {
  const id = 'ach-scenario';
  const c = COLORS.challenge;
  return (
    <MedalBase id={id} colors={c} size={size} className={className}>
      <defs>
        <linearGradient id={`${id}-map`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="100%" stopColor="#FDE68A" />
        </linearGradient>
      </defs>
      {/* Map/parchment background */}
      <path
        d="M19,20 Q20,18 22,20 L42,20 Q44,18 45,20 L45,40 Q44,42 42,40 L22,40 Q20,42 19,40Z"
        fill={`url(#${id}-map)`}
        stroke="#D97706"
        strokeWidth="1.5"
      />
      {/* Map fold lines */}
      <line x1="28" y1="20" x2="28" y2="40" stroke="#D97706" strokeWidth="0.5" opacity="0.3" />
      <line x1="36" y1="20" x2="36" y2="40" stroke="#D97706" strokeWidth="0.5" opacity="0.3" />
      {/* Route path */}
      <path d="M23,35 L28,28 L35,32 L40,25" fill="none" stroke={c.dark} strokeWidth="1.5" strokeDasharray="2,1" />
      {/* Pin 1 - start */}
      <circle cx="23" cy="35" r="2" fill="#EF4444" stroke="#991B1B" strokeWidth="0.8" />
      <circle cx="23" cy="35" r="0.8" fill="#FFFFFF" />
      {/* Pin 2 - mid */}
      <circle cx="28" cy="28" r="1.5" fill={c.base} stroke={c.dark} strokeWidth="0.8" />
      {/* Pin 3 - mid */}
      <circle cx="35" cy="32" r="1.5" fill={c.base} stroke={c.dark} strokeWidth="0.8" />
      {/* Pin 4 - end (star) */}
      <polygon points="40,23 41,24.5 42.8,24.5 41.5,25.8 42,27.5 40,26.5 38,27.5 38.5,25.8 37.2,24.5 39,24.5" fill="#FFD700" stroke="#B8860B" strokeWidth="0.5" />
      {/* Compass rose */}
      <circle cx="41" cy="36" r="3" fill="none" stroke="#8B7355" strokeWidth="0.5" />
      <line x1="41" y1="33.5" x2="41" y2="38.5" stroke="#8B7355" strokeWidth="0.5" />
      <line x1="38.5" y1="36" x2="43.5" y2="36" stroke="#8B7355" strokeWidth="0.5" />
      <text x="41" y="34.5" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="2" fill="#8B7355">N</text>
    </MedalBase>
  );
}

/** 18. Gauntlet Runner - Running figure with obstacles */
export function GauntletRunnerIcon({ size = 64, className }: IconProps) {
  const id = 'ach-gauntlet';
  const c = COLORS.challenge;
  return (
    <MedalBase id={id} colors={c} size={size} className={className}>
      <defs>
        <linearGradient id={`${id}-runner`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c.base} />
          <stop offset="100%" stopColor={c.dark} />
        </linearGradient>
      </defs>
      {/* Ground line */}
      <line x1="18" y1="42" x2="46" y2="42" stroke="#D1D5DB" strokeWidth="1" />
      {/* Running figure */}
      {/* Head */}
      <circle cx="30" cy="22" r="3" fill={`url(#${id}-runner)`} stroke={c.dark} strokeWidth="1.5" />
      {/* Body */}
      <line x1="30" y1="25" x2="30" y2="33" stroke={c.dark} strokeWidth="2" />
      {/* Arms */}
      <polyline points="25,27 30,29 35,26" fill="none" stroke={c.dark} strokeWidth="2" />
      {/* Legs */}
      <line x1="30" y1="33" x2="25" y2="40" stroke={c.dark} strokeWidth="2" />
      <line x1="30" y1="33" x2="35" y2="40" stroke={c.dark} strokeWidth="2" />
      {/* Hurdle 1 */}
      <rect x="38" y="35" width="1.5" height="7" fill="#6B7280" />
      <rect x="37" y="35" width="6" height="1.5" rx="0.5" fill="#EF4444" stroke="#B91C1C" strokeWidth="0.5" />
      {/* Hurdle 2 (already passed) */}
      <rect x="19" y="37" width="1.5" height="5" fill="#6B7280" />
      <rect x="18" y="37" width="6" height="1.5" rx="0.5" fill="#10B981" stroke="#047857" strokeWidth="0.5" />
      {/* Speed lines behind runner */}
      <line x1="22" y1="25" x2="18" y2="25" stroke={c.base} strokeWidth="1" opacity="0.6" />
      <line x1="23" y1="28" x2="18" y2="28" stroke={c.base} strokeWidth="1" opacity="0.4" />
      <line x1="22" y1="31" x2="19" y2="31" stroke={c.base} strokeWidth="1" opacity="0.3" />
      {/* Fire trail */}
      <path d="M24,39 Q22,37 23,35 Q24,37 25,36 Q24,38 24,39Z" fill="#F97316" opacity="0.6" />
    </MedalBase>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// EXPLORATION (5) - Cyan
// ════════════════════════════════════════════════════════════════════════════

/** 19. First Steps - Footprints / boot prints */
export function FirstStepsIcon({ size = 64, className }: IconProps) {
  const id = 'ach-first-steps';
  const c = COLORS.exploration;
  return (
    <MedalBase id={id} colors={c} size={size} className={className}>
      <defs>
        <linearGradient id={`${id}-foot`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c.base} />
          <stop offset="100%" stopColor={c.dark} />
        </linearGradient>
      </defs>
      {/* Left footprint */}
      <ellipse cx="27" cy="33" rx="4" ry="6" fill={`url(#${id}-foot)`} stroke={c.dark} strokeWidth="1" />
      <circle cx="25" cy="25" r="1.8" fill={c.base} stroke={c.dark} strokeWidth="0.8" />
      <circle cx="28" cy="24" r="1.5" fill={c.base} stroke={c.dark} strokeWidth="0.8" />
      <circle cx="30.5" cy="25" r="1.3" fill={c.base} stroke={c.dark} strokeWidth="0.8" />
      <circle cx="32" cy="27" r="1.2" fill={c.base} stroke={c.dark} strokeWidth="0.8" />
      {/* Right footprint (higher, walking) */}
      <ellipse cx="37" cy="26" rx="4" ry="6" fill={`url(#${id}-foot)`} stroke={c.dark} strokeWidth="1" opacity="0.7" />
      <circle cx="35" cy="18" r="1.8" fill={c.base} stroke={c.dark} strokeWidth="0.8" opacity="0.7" />
      <circle cx="38" cy="17" r="1.5" fill={c.base} stroke={c.dark} strokeWidth="0.8" opacity="0.7" />
      <circle cx="40.5" cy="18" r="1.3" fill={c.base} stroke={c.dark} strokeWidth="0.8" opacity="0.7" />
      <circle cx="42" cy="20" r="1.2" fill={c.base} stroke={c.dark} strokeWidth="0.8" opacity="0.7" />
      {/* Path dots leading forward */}
      <circle cx="22" cy="40" r="1" fill={c.base} opacity="0.3" />
      <circle cx="20" cy="38" r="0.7" fill={c.base} opacity="0.2" />
    </MedalBase>
  );
}

/** 20. Renaissance Engineer - Da Vinci style compass + gear */
export function RenaissanceEngineerIcon({ size = 64, className }: IconProps) {
  const id = 'ach-renaissance';
  const c = COLORS.exploration;
  return (
    <MedalBase id={id} colors={c} size={size} className={className}>
      <defs>
        <linearGradient id={`${id}-brass`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D4A574" />
          <stop offset="100%" stopColor="#8B6914" />
        </linearGradient>
      </defs>
      {/* Gear (behind) */}
      <circle cx="36" cy="33" r="6" fill="none" stroke={c.dark} strokeWidth="1.5" />
      <circle cx="36" cy="33" r="3.5" fill="none" stroke={c.dark} strokeWidth="1" />
      {/* Gear teeth */}
      {[0, 60, 120, 180, 240, 300].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 36 + 6 * Math.cos(rad);
        const y1 = 33 + 6 * Math.sin(rad);
        const x2 = 36 + 8 * Math.cos(rad);
        const y2 = 33 + 8 * Math.sin(rad);
        return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke={c.dark} strokeWidth="2" />;
      })}
      {/* Dividers/Compass (Da Vinci style) */}
      {/* Hinge */}
      <circle cx="28" cy="18" r="2" fill={`url(#${id}-brass)`} stroke="#8B6914" strokeWidth="1" />
      {/* Left leg */}
      <line x1="28" y1="19" x2="22" y2="38" stroke={`url(#${id}-brass)`} strokeWidth="2" />
      {/* Right leg */}
      <line x1="28" y1="19" x2="34" y2="38" stroke={`url(#${id}-brass)`} strokeWidth="2" />
      {/* Leg points */}
      <circle cx="22" cy="38" r="1" fill="#8B6914" />
      <circle cx="34" cy="38" r="1" fill="#8B6914" />
      {/* Arc drawn by compass */}
      <path d="M24,36 Q28,30 32,36" fill="none" stroke={c.base} strokeWidth="0.8" strokeDasharray="1.5,1" />
    </MedalBase>
  );
}

/** 21. Polymath - Multiple domain symbols (book + gear + flask) */
export function PolymathIcon({ size = 64, className }: IconProps) {
  const id = 'ach-polymath';
  const c = COLORS.exploration;
  return (
    <MedalBase id={id} colors={c} size={size} className={className}>
      <defs>
        <linearGradient id={`${id}-book`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1E40AF" />
        </linearGradient>
      </defs>
      {/* Book (left) */}
      <path d="M18,28 L18,40 Q22,38 26,40 L26,28 Q22,26 18,28Z" fill={`url(#${id}-book)`} stroke="#1E3A8A" strokeWidth="1" />
      <path d="M26,28 L26,40 Q30,38 34,40 L34,28 Q30,26 26,28Z" fill="#60A5FA" stroke="#1E3A8A" strokeWidth="1" />
      <line x1="26" y1="28" x2="26" y2="40" stroke="#1E3A8A" strokeWidth="1" />
      {/* Book lines */}
      <line x1="20" y1="31" x2="24" y2="30" stroke="#BFDBFE" strokeWidth="0.5" />
      <line x1="20" y1="33" x2="24" y2="32" stroke="#BFDBFE" strokeWidth="0.5" />
      {/* Gear (top right) */}
      <circle cx="39" cy="23" r="4" fill="none" stroke={c.dark} strokeWidth="1.5" />
      <circle cx="39" cy="23" r="2" fill={c.light} stroke={c.dark} strokeWidth="0.8" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
        const r = (a * Math.PI) / 180;
        return (
          <line
            key={a}
            x1={39 + 4 * Math.cos(r)}
            y1={23 + 4 * Math.sin(r)}
            x2={39 + 5.5 * Math.cos(r)}
            y2={23 + 5.5 * Math.sin(r)}
            stroke={c.dark}
            strokeWidth="1.5"
          />
        );
      })}
      {/* Flask (bottom right) */}
      <path d="M37,32 L37,36 L34,42 L44,42 L41,36 L41,32Z" fill="#CFFAFE" stroke={c.dark} strokeWidth="1" />
      <rect x="37" y="30" width="4" height="3" rx="0.5" fill="none" stroke={c.dark} strokeWidth="1" />
      {/* Liquid in flask */}
      <path d="M35,39 L43,39 L44,42 L34,42Z" fill={c.base} opacity="0.5" />
      {/* Bubbles */}
      <circle cx="38" cy="38" r="0.7" fill="#FFFFFF" opacity="0.7" />
      <circle cx="40" cy="37" r="0.5" fill="#FFFFFF" opacity="0.5" />
    </MedalBase>
  );
}

/** 22. Format Master - Multiple card types / formats */
export function FormatMasterIcon({ size = 64, className }: IconProps) {
  const id = 'ach-format-master';
  const c = COLORS.exploration;
  return (
    <MedalBase id={id} colors={c} size={size} className={className}>
      <defs>
        <linearGradient id={`${id}-card1`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#DBEAFE" />
        </linearGradient>
        <linearGradient id={`${id}-card2`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#CFFAFE" />
        </linearGradient>
        <linearGradient id={`${id}-card3`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#FEF3C7" />
        </linearGradient>
      </defs>
      {/* Card 1 (back, rotated left) */}
      <rect x="17" y="20" width="16" height="22" rx="2" fill={`url(#${id}-card1)`} stroke="#3B82F6" strokeWidth="1.5" transform="rotate(-10 25 31)" />
      <line x1="19" y1="26" x2="31" y2="24" stroke="#3B82F6" strokeWidth="1" opacity="0.5" transform="rotate(-10 25 25)" />
      {/* Card 2 (middle) */}
      <rect x="24" y="19" width="16" height="22" rx="2" fill={`url(#${id}-card2)`} stroke={c.dark} strokeWidth="1.5" />
      <line x1="27" y1="24" x2="37" y2="24" stroke={c.dark} strokeWidth="1" opacity="0.5" />
      <circle cx="32" cy="31" r="3" fill="none" stroke={c.base} strokeWidth="1" />
      <text x="32" y="33" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="4" fontWeight="700" fill={c.dark}>?</text>
      {/* Card 3 (front, rotated right) */}
      <rect x="31" y="20" width="16" height="22" rx="2" fill={`url(#${id}-card3)`} stroke="#F59E0B" strokeWidth="1.5" transform="rotate(10 39 31)" />
      <line x1="34" y1="26" x2="44" y2="28" stroke="#F59E0B" strokeWidth="1" opacity="0.5" transform="rotate(10 39 27)" />
      {/* Checkmarks on cards */}
      <polyline points="34,34 35.5,36 39,31" fill="none" stroke="#10B981" strokeWidth="1.5" transform="rotate(10 36.5 33.5)" />
    </MedalBase>
  );
}

/** 23. Bookmarked for Later - Bookmark ribbon with star */
export function BookmarkedIcon({ size = 64, className }: IconProps) {
  const id = 'ach-bookmarked';
  const c = COLORS.exploration;
  return (
    <MedalBase id={id} colors={c} size={size} className={className}>
      <defs>
        <linearGradient id={`${id}-ribbon`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c.base} />
          <stop offset="100%" stopColor={c.dark} />
        </linearGradient>
        <linearGradient id={`${id}-page`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F3F4F6" />
        </linearGradient>
      </defs>
      {/* Page/book background */}
      <rect x="21" y="18" width="22" height="26" rx="1.5" fill={`url(#${id}-page)`} stroke="#D1D5DB" strokeWidth="1.5" />
      {/* Page lines */}
      <line x1="24" y1="23" x2="40" y2="23" stroke="#E5E7EB" strokeWidth="0.8" />
      <line x1="24" y1="26" x2="38" y2="26" stroke="#E5E7EB" strokeWidth="0.8" />
      <line x1="24" y1="29" x2="40" y2="29" stroke="#E5E7EB" strokeWidth="0.8" />
      <line x1="24" y1="32" x2="36" y2="32" stroke="#E5E7EB" strokeWidth="0.8" />
      <line x1="24" y1="35" x2="40" y2="35" stroke="#E5E7EB" strokeWidth="0.8" />
      <line x1="24" y1="38" x2="34" y2="38" stroke="#E5E7EB" strokeWidth="0.8" />
      {/* Bookmark ribbon */}
      <path
        d="M36,16 L36,34 L40,30 L44,34 L44,16Z"
        fill={`url(#${id}-ribbon)`}
        stroke={c.dark}
        strokeWidth="1.5"
      />
      {/* Star on ribbon */}
      <polygon
        points="40,20 41.2,22.5 44,22.8 42,24.8 42.5,27.5 40,26 37.5,27.5 38,24.8 36,22.8 38.8,22.5"
        fill="#FFD700"
        stroke="#B8860B"
        strokeWidth="0.5"
      />
    </MedalBase>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// MASTERY (4) - Gold
// ════════════════════════════════════════════════════════════════════════════

/** 24. Topic Master - Crown on a book / golden wreath */
export function TopicMasterIcon({ size = 64, className }: IconProps) {
  const id = 'ach-topic-master';
  const c = COLORS.mastery;
  return (
    <MedalBase id={id} colors={c} size={size} className={className}>
      <defs>
        <linearGradient id={`${id}-crown`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
        <linearGradient id={`${id}-book`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>
      {/* Laurel wreath left */}
      <path d="M19,38 Q21,34 20,30" fill="none" stroke="#10B981" strokeWidth="1.5" />
      <path d="M19,34 Q22,32 20,28" fill="none" stroke="#10B981" strokeWidth="1.2" />
      <path d="M20,30 Q23,28 21,25" fill="none" stroke="#10B981" strokeWidth="1" />
      {/* Laurel wreath right */}
      <path d="M45,38 Q43,34 44,30" fill="none" stroke="#10B981" strokeWidth="1.5" />
      <path d="M45,34 Q42,32 44,28" fill="none" stroke="#10B981" strokeWidth="1.2" />
      <path d="M44,30 Q41,28 43,25" fill="none" stroke="#10B981" strokeWidth="1" />
      {/* Book */}
      <path d="M24,32 L24,42 Q28,40 32,42 L32,32 Q28,30 24,32Z" fill={`url(#${id}-book)`} stroke="#1E3A8A" strokeWidth="1" />
      <path d="M32,32 L32,42 Q36,40 40,42 L40,32 Q36,30 32,32Z" fill="#818CF8" stroke="#1E3A8A" strokeWidth="1" />
      <line x1="32" y1="32" x2="32" y2="42" stroke="#1E3A8A" strokeWidth="1" />
      {/* Crown above book */}
      <path
        d="M24,28 L27,22 L30,26 L33,20 L36,26 L39,22 L40,28Z"
        fill={`url(#${id}-crown)`}
        stroke="#8B6914"
        strokeWidth="1.5"
      />
      {/* Crown gems */}
      <circle cx="27" cy="25" r="1" fill="#EF4444" />
      <circle cx="33" cy="23" r="1" fill="#3B82F6" />
      <circle cx="39" cy="25" r="1" fill="#10B981" />
      {/* Crown base */}
      <rect x="24" y="27" width="16" height="2" rx="0.5" fill="#B8860B" />
    </MedalBase>
  );
}

/** 25. Multi-Domain Expert - Connected nodes / web */
export function MultiDomainExpertIcon({ size = 64, className }: IconProps) {
  const id = 'ach-multi-domain';
  const c = COLORS.mastery;
  return (
    <MedalBase id={id} colors={c} size={size} className={className}>
      <defs>
        <radialGradient id={`${id}-node`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#B8860B" />
        </radialGradient>
      </defs>
      {/* Connection lines first (behind nodes) */}
      <line x1="32" y1="22" x2="22" y2="30" stroke={c.base} strokeWidth="1.5" opacity="0.6" />
      <line x1="32" y1="22" x2="42" y2="30" stroke={c.base} strokeWidth="1.5" opacity="0.6" />
      <line x1="32" y1="22" x2="32" y2="38" stroke={c.base} strokeWidth="1.5" opacity="0.6" />
      <line x1="22" y1="30" x2="26" y2="38" stroke={c.base} strokeWidth="1.5" opacity="0.6" />
      <line x1="42" y1="30" x2="38" y2="38" stroke={c.base} strokeWidth="1.5" opacity="0.6" />
      <line x1="26" y1="38" x2="38" y2="38" stroke={c.base} strokeWidth="1.5" opacity="0.6" />
      <line x1="22" y1="30" x2="42" y2="30" stroke={c.base} strokeWidth="1" opacity="0.3" />
      {/* Center node (largest) */}
      <circle cx="32" cy="30" r="4" fill={`url(#${id}-node)`} stroke={c.dark} strokeWidth="1.5" />
      <text x="32" y="32" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="4" fill="#FFFFFF">5</text>
      {/* Top node */}
      <circle cx="32" cy="22" r="3" fill={`url(#${id}-node)`} stroke={c.dark} strokeWidth="1" />
      {/* Left node */}
      <circle cx="22" cy="30" r="3" fill={`url(#${id}-node)`} stroke={c.dark} strokeWidth="1" />
      {/* Right node */}
      <circle cx="42" cy="30" r="3" fill={`url(#${id}-node)`} stroke={c.dark} strokeWidth="1" />
      {/* Bottom-left node */}
      <circle cx="26" cy="38" r="3" fill={`url(#${id}-node)`} stroke={c.dark} strokeWidth="1" />
      {/* Bottom-right node */}
      <circle cx="38" cy="38" r="3" fill={`url(#${id}-node)`} stroke={c.dark} strokeWidth="1" />
      {/* Checkmarks on outer nodes */}
      {[
        [32, 22],
        [22, 30],
        [42, 30],
        [26, 38],
        [38, 38],
      ].map(([x, y], i) => (
        <polyline
          key={i}
          points={`${x - 1.5},${y} ${x - 0.3},${y + 1.5} ${x + 2},${y - 1.5}`}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1"
        />
      ))}
    </MedalBase>
  );
}

/** 26. Weakness Conquered - Broken chain / rising arrow */
export function WeaknessConqueredIcon({ size = 64, className }: IconProps) {
  const id = 'ach-weakness-conquered';
  const c = COLORS.mastery;
  return (
    <MedalBase id={id} colors={c} size={size} className={className}>
      <defs>
        <linearGradient id={`${id}-arrow`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor={c.dark} />
          <stop offset="100%" stopColor={c.base} />
        </linearGradient>
      </defs>
      {/* Broken chain - left half */}
      <ellipse cx="24" cy="32" rx="5" ry="4" fill="none" stroke="#6B7280" strokeWidth="2.5" />
      <line x1="29" y1="32" x2="30" y2="30" stroke="#6B7280" strokeWidth="2.5" />
      {/* Broken chain - right half */}
      <ellipse cx="40" cy="32" rx="5" ry="4" fill="none" stroke="#6B7280" strokeWidth="2.5" />
      <line x1="35" y1="32" x2="34" y2="34" stroke="#6B7280" strokeWidth="2.5" />
      {/* Break gap - spark lines */}
      <line x1="30" y1="29" x2="32" y2="27" stroke="#FFD700" strokeWidth="1" />
      <line x1="34" y1="35" x2="32" y2="37" stroke="#FFD700" strokeWidth="1" />
      <circle cx="32" cy="32" r="1" fill="#FFD700" />
      {/* Rising arrow */}
      <line x1="32" y1="40" x2="32" y2="18" stroke={`url(#${id}-arrow)`} strokeWidth="2.5" />
      <polygon points="32,16 28,22 36,22" fill={c.base} stroke={c.dark} strokeWidth="0.8" />
      {/* Sparkle at arrow tip */}
      <line x1="32" y1="14" x2="32" y2="16" stroke="#FFD700" strokeWidth="1" />
      <line x1="29" y1="16" x2="31" y2="17" stroke="#FFD700" strokeWidth="1" />
      <line x1="35" y1="16" x2="33" y2="17" stroke="#FFD700" strokeWidth="1" />
    </MedalBase>
  );
}

/** 27. Interview Ready - Briefcase with checkmark / star */
export function InterviewReadyIcon({ size = 64, className }: IconProps) {
  const id = 'ach-interview-ready';
  const c = COLORS.mastery;
  return (
    <MedalBase id={id} colors={c} size={size} className={className}>
      <defs>
        <linearGradient id={`${id}-case`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8B5E34" />
          <stop offset="100%" stopColor="#5C3D1E" />
        </linearGradient>
        <linearGradient id={`${id}-star`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
      </defs>
      {/* Briefcase handle */}
      <path d="M27,22 L27,19 Q27,17 29,17 L35,17 Q37,17 37,19 L37,22" fill="none" stroke="#5C3D1E" strokeWidth="2" />
      {/* Briefcase body */}
      <rect x="19" y="22" width="26" height="17" rx="2" fill={`url(#${id}-case)`} stroke="#3D2010" strokeWidth="1.5" />
      {/* Briefcase latch */}
      <rect x="29" y="22" width="6" height="3" rx="1" fill="#D4A574" stroke="#8B6914" strokeWidth="0.8" />
      {/* Briefcase divider */}
      <line x1="19" y1="28" x2="45" y2="28" stroke="#3D2010" strokeWidth="0.8" opacity="0.5" />
      {/* Star badge */}
      <polygon
        points="32,26 34,30 38.5,30.5 35,33.5 36,38 32,35.5 28,38 29,33.5 25.5,30.5 30,30"
        fill={`url(#${id}-star)`}
        stroke="#8B6914"
        strokeWidth="1"
      />
      {/* Checkmark inside star */}
      <polyline points="29.5,32 31.5,34.5 35,29" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
    </MedalBase>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// HIDDEN (3) - Purple
// ════════════════════════════════════════════════════════════════════════════

/** 28. Night Owl - Owl with moon */
export function NightOwlIcon({ size = 64, className }: IconProps) {
  const id = 'ach-night-owl';
  const c = COLORS.hidden;
  return (
    <MedalBase id={id} colors={c} size={size} className={className}>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1E1B4B" />
          <stop offset="100%" stopColor="#312E81" />
        </linearGradient>
        <radialGradient id={`${id}-moon`} cx="0.4" cy="0.4" r="0.5">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="100%" stopColor="#FCD34D" />
        </radialGradient>
      </defs>
      {/* Night sky circle */}
      <circle cx="32" cy="30" r="16" fill={`url(#${id}-sky)`} />
      {/* Moon */}
      <circle cx="42" cy="20" r="5" fill={`url(#${id}-moon)`} />
      <circle cx="43.5" cy="19" r="4" fill="#1E1B4B" /> {/* Crescent cutout */}
      {/* Stars */}
      <circle cx="20" cy="20" r="0.8" fill="#FCD34D" />
      <circle cx="24" cy="17" r="0.5" fill="#FCD34D" />
      <circle cx="36" cy="17" r="0.6" fill="#FCD34D" />
      {/* Owl body */}
      <ellipse cx="32" cy="35" rx="8" ry="7" fill="#7C3AED" stroke="#5B21B6" strokeWidth="1.5" />
      {/* Owl head */}
      <ellipse cx="32" cy="27" rx="7" ry="5" fill="#8B5CF6" stroke="#5B21B6" strokeWidth="1.5" />
      {/* Ear tufts */}
      <polygon points="26,23 28,26 25,25" fill="#7C3AED" stroke="#5B21B6" strokeWidth="0.8" />
      <polygon points="38,23 36,26 39,25" fill="#7C3AED" stroke="#5B21B6" strokeWidth="0.8" />
      {/* Eyes */}
      <circle cx="29" cy="27" r="3" fill="#FCD34D" stroke="#B45309" strokeWidth="0.8" />
      <circle cx="35" cy="27" r="3" fill="#FCD34D" stroke="#B45309" strokeWidth="0.8" />
      <circle cx="29" cy="27" r="1.5" fill="#1F2937" />
      <circle cx="35" cy="27" r="1.5" fill="#1F2937" />
      {/* Eye highlights */}
      <circle cx="30" cy="26.5" r="0.5" fill="#FFFFFF" />
      <circle cx="36" cy="26.5" r="0.5" fill="#FFFFFF" />
      {/* Beak */}
      <polygon points="32,29 31,31 33,31" fill="#F59E0B" stroke="#B45309" strokeWidth="0.5" />
      {/* Wing detail */}
      <path d="M24,34 Q28,32 30,36" fill="none" stroke="#6D28D9" strokeWidth="1" />
      <path d="M40,34 Q36,32 34,36" fill="none" stroke="#6D28D9" strokeWidth="1" />
    </MedalBase>
  );
}

/** 29. Early Bird - Bird with sunrise */
export function EarlyBirdIcon({ size = 64, className }: IconProps) {
  const id = 'ach-early-bird';
  const c = COLORS.hidden;
  return (
    <MedalBase id={id} colors={c} size={size} className={className}>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="50%" stopColor="#FDBA74" />
          <stop offset="100%" stopColor="#FB923C" />
        </linearGradient>
        <radialGradient id={`${id}-sun`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="70%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#F59E0B" />
        </radialGradient>
      </defs>
      {/* Sky background */}
      <circle cx="32" cy="30" r="16" fill={`url(#${id}-sky)`} />
      {/* Horizon line */}
      <line x1="16" y1="36" x2="48" y2="36" stroke="#F97316" strokeWidth="0.8" />
      {/* Sun (half) */}
      <circle cx="32" cy="36" r="6" fill={`url(#${id}-sun)`} />
      <rect x="16" y="36" width="32" height="14" fill={`url(#${id}-sky)`} opacity="0.3" />
      {/* Sun rays */}
      {[-30, -60, -90, -120, -150].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 32 + 7 * Math.cos(rad);
        const y1 = 36 + 7 * Math.sin(rad);
        const x2 = 32 + 10 * Math.cos(rad);
        const y2 = 36 + 10 * Math.sin(rad);
        return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FCD34D" strokeWidth="1.5" />;
      })}
      {/* Bird body */}
      <ellipse cx="30" cy="26" rx="5" ry="3.5" fill={c.base} stroke={c.dark} strokeWidth="1.5" />
      {/* Bird head */}
      <circle cx="35" cy="24" r="3" fill={c.base} stroke={c.dark} strokeWidth="1.5" />
      {/* Beak */}
      <polygon points="38,23 42,24 38,25" fill="#F59E0B" stroke="#B45309" strokeWidth="0.8" />
      {/* Eye */}
      <circle cx="36" cy="23" r="1" fill="#1F2937" />
      <circle cx="36.3" cy="22.7" r="0.4" fill="#FFFFFF" />
      {/* Wing */}
      <path d="M28,24 Q25,20 20,22 Q24,24 26,28" fill={c.dark} stroke={c.dark} strokeWidth="0.8" />
      {/* Tail */}
      <path d="M25,27 L20,28 L22,25" fill={c.dark} stroke={c.dark} strokeWidth="0.5" />
      {/* Musical notes (singing) */}
      <text x="41" y="20" fontFamily="serif" fontSize="5" fill={c.dark} opacity="0.7">&#9835;</text>
      <text x="44" y="17" fontFamily="serif" fontSize="4" fill={c.dark} opacity="0.5">&#9834;</text>
    </MedalBase>
  );
}

/** 30. Learning from Failure - Broken piece being repaired / gold kintsugi */
export function LearningFromFailureIcon({ size = 64, className }: IconProps) {
  const id = 'ach-learning-failure';
  const c = COLORS.hidden;
  return (
    <MedalBase id={id} colors={c} size={size} className={className}>
      <defs>
        <linearGradient id={`${id}-pot`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D1D5DB" />
          <stop offset="100%" stopColor="#9CA3AF" />
        </linearGradient>
        <linearGradient id={`${id}-gold-fill`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      {/* Bowl/vessel left half */}
      <path
        d="M20,22 L22,22 Q23,22 24,24 L26,32 Q27,38 28,40 L20,40 Q18,38 18,34 L17,28 Q17,24 20,22Z"
        fill={`url(#${id}-pot)`}
        stroke="#6B7280"
        strokeWidth="1.5"
      />
      {/* Bowl/vessel right half */}
      <path
        d="M36,22 L44,22 Q47,24 47,28 L46,34 Q46,38 44,40 L36,40 Q37,38 38,32 L40,24 Q41,22 42,22"
        fill={`url(#${id}-pot)`}
        stroke="#6B7280"
        strokeWidth="1.5"
      />
      {/* Kintsugi gold repair lines - the crack in between */}
      <path
        d="M28,22 Q30,26 29,30 Q31,34 30,38 L32,40 L34,38 Q33,34 35,30 Q34,26 36,22"
        fill={`url(#${id}-gold-fill)`}
        stroke="#B8860B"
        strokeWidth="0.8"
      />
      {/* Additional gold vein cracks */}
      <path d="M23,25 Q25,27 24,30" fill="none" stroke="#FFD700" strokeWidth="1.5" />
      <path d="M41,25 Q39,27 40,30" fill="none" stroke="#FFD700" strokeWidth="1.5" />
      <path d="M25,35 Q27,36 26,38" fill="none" stroke="#FFD700" strokeWidth="1.5" />
      <path d="M39,35 Q37,36 38,38" fill="none" stroke="#FFD700" strokeWidth="1.5" />
      {/* Glow particles around the gold */}
      <circle cx="30" cy="24" r="1" fill="#FFD700" opacity="0.6" />
      <circle cx="34" cy="28" r="0.8" fill="#FFD700" opacity="0.5" />
      <circle cx="31" cy="36" r="0.7" fill="#FFD700" opacity="0.4" />
      {/* Light burst at top */}
      <line x1="32" y1="17" x2="32" y2="19" stroke="#FFD700" strokeWidth="1" />
      <line x1="29" y1="18" x2="30" y2="20" stroke="#FFD700" strokeWidth="0.8" />
      <line x1="35" y1="18" x2="34" y2="20" stroke="#FFD700" strokeWidth="0.8" />
    </MedalBase>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// Achievement Icon Map
// ════════════════════════════════════════════════════════════════════════════

export const achievementIconMap: Record<
  string,
  ({ size, className }: IconProps) => React.ReactElement
> = {
  // Knowledge
  'ach-first-correct': FirstPrinciplesIcon,
  'ach-ten-correct': BuildingMomentumIcon,
  'ach-fifty-correct': SolidFoundationIcon,
  'ach-hundred-correct': CenturionIcon,
  'ach-perfect-session': FlawlessExecutionIcon,
  'ach-all-advanced': NoEasyModeIcon,
  'ach-estimation-ace': BackOfEnvelopeIcon,
  // Consistency
  'ach-streak-3': GettingWarmedUpIcon,
  'ach-streak-7': SevenDayStreakIcon,
  'ach-streak-14': FortnightOfFocusIcon,
  'ach-streak-30': IronWillIcon,
  'ach-daily-challenge-5': ChallengerIcon,
  'ach-weekend-warrior': WeekendWarriorIcon,
  // Challenge
  'ach-speed-round': QuickDrawIcon,
  'ach-confidence-calibrated': ConfidenceCalibratedIcon,
  'ach-flaw-finder': EagleEyeIcon,
  'ach-scenario-master': ScenarioCommanderIcon,
  'ach-hard-streak': GauntletRunnerIcon,
  // Exploration
  'ach-first-topic': FirstStepsIcon,
  'ach-five-topics': RenaissanceEngineerIcon,
  'ach-all-topics': PolymathIcon,
  'ach-all-types': FormatMasterIcon,
  'ach-bookworm': BookmarkedIcon,
  // Mastery
  'ach-topic-master': TopicMasterIcon,
  'ach-multi-master': MultiDomainExpertIcon,
  'ach-weakness-conquered': WeaknessConqueredIcon,
  'ach-interview-ready': InterviewReadyIcon,
  // Hidden
  'ach-night-owl': NightOwlIcon,
  'ach-early-bird': EarlyBirdIcon,
  'ach-wrong-five': LearningFromFailureIcon,
};
