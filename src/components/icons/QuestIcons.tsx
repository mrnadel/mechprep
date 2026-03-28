'use client';

import type { ComponentType } from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

// ─────────────────────────────────────────────────────────
// DAILY QUESTS
// ─────────────────────────────────────────────────────────

/** dq-complete-lessons — Two upward chevrons */
export const DoubleUpIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="quest-doubleup-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
      <linearGradient id="quest-doubleup-arrow" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#DBEAFE" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#quest-doubleup-bg)" />
    <rect x="4" y="4" width="56" height="56" rx="14" fill="white" fillOpacity="0.08" />
    {/* Top chevron */}
    <polyline
      points="20,28 32,16 44,28"
      stroke="url(#quest-doubleup-arrow)"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Bottom chevron */}
    <polyline
      points="20,42 32,30 44,42"
      stroke="url(#quest-doubleup-arrow)"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Sparkle dot */}
    <circle cx="48" cy="14" r="3" fill="#FFB800" />
    <circle cx="50" cy="12" r="1.5" fill="white" fillOpacity="0.8" />
  </svg>
);

/** dq-accuracy-80 — Crosshair with precision marks */
export const SharpShooterIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="quest-sharp-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
      <linearGradient id="quest-sharp-ring" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#BFDBFE" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#quest-sharp-bg)" />
    {/* Outer ring */}
    <circle cx="32" cy="32" r="16" stroke="url(#quest-sharp-ring)" strokeWidth="2.5" fill="none" />
    {/* Inner ring */}
    <circle cx="32" cy="32" r="9" stroke="url(#quest-sharp-ring)" strokeWidth="2" fill="none" />
    {/* Bullseye */}
    <circle cx="32" cy="32" r="3" fill="#FFB800" />
    {/* Crosshair lines */}
    <line x1="32" y1="10" x2="32" y2="18" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <line x1="32" y1="46" x2="32" y2="54" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <line x1="10" y1="32" x2="18" y2="32" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <line x1="46" y1="32" x2="54" y2="32" stroke="white" strokeWidth="2" strokeLinecap="round" />
    {/* Precision tick marks */}
    <line x1="32" y1="19" x2="32" y2="22" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <line x1="32" y1="42" x2="32" y2="45" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <line x1="19" y1="32" x2="22" y2="32" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <line x1="42" y1="32" x2="45" y2="32" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
  </svg>
);

/** dq-stale-topic — Broom sweeping with dust particles */
export const DustOffIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="quest-dust-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#34D399" />
        <stop offset="100%" stopColor="#10B981" />
      </linearGradient>
      <linearGradient id="quest-dust-broom" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#quest-dust-bg)" />
    {/* Broom handle */}
    <line x1="22" y1="14" x2="38" y2="38" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
    {/* Broom head */}
    <path
      d="M34,36 L42,48 Q38,52 30,52 Q22,52 24,48 L34,36Z"
      fill="url(#quest-dust-broom)"
      stroke="white"
      strokeWidth="1.5"
    />
    {/* Bristle lines */}
    <line x1="29" y1="42" x2="27" y2="50" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    <line x1="33" y1="42" x2="33" y2="51" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    <line x1="37" y1="42" x2="38" y2="50" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    {/* Dust particles */}
    <circle cx="16" cy="38" r="2" fill="white" fillOpacity="0.7" />
    <circle cx="12" cy="44" r="1.5" fill="white" fillOpacity="0.5" />
    <circle cx="18" cy="48" r="1.8" fill="white" fillOpacity="0.6" />
    <circle cx="14" cy="32" r="1.2" fill="white" fillOpacity="0.4" />
    <circle cx="20" cy="28" r="1" fill="white" fillOpacity="0.3" />
    {/* Sparkle */}
    <path d="M48,14 L49,17 L52,18 L49,19 L48,22 L47,19 L44,18 L47,17Z" fill="#FFB800" />
  </svg>
);

/** dq-daily-challenge — Calendar with lightning bolt */
export const DailyChallengerIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="quest-daily-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
      <linearGradient id="quest-daily-cal" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#DBEAFE" />
      </linearGradient>
      <linearGradient id="quest-daily-bolt" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#quest-daily-bg)" />
    {/* Calendar body */}
    <rect x="12" y="16" width="40" height="36" rx="6" fill="url(#quest-daily-cal)" />
    {/* Calendar header bar */}
    <rect x="12" y="16" width="40" height="12" rx="6" fill="white" fillOpacity="0.3" />
    <rect x="12" y="22" width="40" height="6" fill="white" fillOpacity="0.3" />
    {/* Calendar hooks */}
    <line x1="24" y1="12" x2="24" y2="20" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="40" y1="12" x2="40" y2="20" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    {/* Lightning bolt */}
    <polygon points="35,30 28,40 33,40 29,52 40,38 34,38 38,30" fill="url(#quest-daily-bolt)" />
    <polygon points="35,30 28,40 33,40 29,52 40,38 34,38 38,30" fill="white" fillOpacity="0.15" />
  </svg>
);

/** dq-correct-answers-15 — Robot head with checkmark */
export const AnswerMachineIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="quest-machine-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
      <linearGradient id="quest-machine-body" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#DBEAFE" />
        <stop offset="100%" stopColor="#BFDBFE" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#quest-machine-bg)" />
    {/* Antenna */}
    <line x1="32" y1="10" x2="32" y2="18" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <circle cx="32" cy="10" r="3" fill="#FFB800" />
    {/* Robot head */}
    <rect x="16" y="18" width="32" height="26" rx="8" fill="url(#quest-machine-body)" />
    {/* Eyes */}
    <circle cx="24" cy="28" r="4" fill="#3B82F6" />
    <circle cx="40" cy="28" r="4" fill="#3B82F6" />
    <circle cx="25" cy="27" r="1.5" fill="white" fillOpacity="0.8" />
    <circle cx="41" cy="27" r="1.5" fill="white" fillOpacity="0.8" />
    {/* Mouth - checkmark */}
    <polyline
      points="24,38 29,42 40,34"
      stroke="#10B981"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Ear bolts */}
    <circle cx="14" cy="30" r="3" fill="#BFDBFE" stroke="white" strokeWidth="1.5" />
    <circle cx="50" cy="30" r="3" fill="#BFDBFE" stroke="white" strokeWidth="1.5" />
    {/* Neck */}
    <rect x="28" y="44" width="8" height="6" rx="2" fill="#BFDBFE" />
    {/* Shoulder line */}
    <line x1="20" y1="52" x2="44" y2="52" stroke="#BFDBFE" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

/** dq-earn-xp-100 — XP text with sparkle and rising bars */
export const XPGrindIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="quest-xpgrind-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#34D399" />
        <stop offset="100%" stopColor="#10B981" />
      </linearGradient>
      <linearGradient id="quest-xpgrind-bar" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#FFB800" />
        <stop offset="100%" stopColor="#FBBF24" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#quest-xpgrind-bg)" />
    {/* Rising bars */}
    <rect x="12" y="40" width="7" height="12" rx="2" fill="url(#quest-xpgrind-bar)" opacity="0.6" />
    <rect x="22" y="34" width="7" height="18" rx="2" fill="url(#quest-xpgrind-bar)" opacity="0.8" />
    <rect x="32" y="28" width="7" height="24" rx="2" fill="url(#quest-xpgrind-bar)" />
    <rect x="42" y="22" width="7" height="30" rx="2" fill="url(#quest-xpgrind-bar)" />
    {/* XP text */}
    <text
      x="32"
      y="22"
      textAnchor="middle"
      fill="white"
      fontFamily="system-ui, sans-serif"
      fontWeight="800"
      fontSize="14"
    >
      XP
    </text>
    {/* Sparkles */}
    <path d="M52,12 L53,15 L56,16 L53,17 L52,20 L51,17 L48,16 L51,15Z" fill="white" />
    <path d="M14,16 L14.8,18 L17,18.5 L14.8,19 L14,21 L13.2,19 L11,18.5 L13.2,18Z" fill="white" fillOpacity="0.7" />
  </svg>
);

/** dq-stars-3 — Hand catching stars */
export const StarCollectorIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="quest-starcol-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
      <linearGradient id="quest-starcol-star" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#FEF3C7" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#quest-starcol-bg)" />
    {/* Open hand shape */}
    <path
      d="M22,48 C22,48 18,40 20,36 C22,32 26,34 26,34 L26,30 C26,28 30,28 30,30 L30,26 C30,24 34,24 34,26 L34,28 C34,26 38,26 38,28 L38,32 C38,30 42,30 42,32 L42,42 C42,48 36,52 30,52 C24,52 22,48 22,48Z"
      fill="white"
      fillOpacity="0.9"
      stroke="white"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Stars floating above hand */}
    <polygon
      points="22,18 23.5,22 28,22 24.5,24.5 26,28.5 22,26 18,28.5 19.5,24.5 16,22 20.5,22"
      fill="url(#quest-starcol-star)"
    />
    <polygon
      points="36,12 37.2,15.5 41,15.5 38,17.5 39,21 36,19 33,21 34,17.5 31,15.5 34.8,15.5"
      fill="url(#quest-starcol-star)"
    />
    <polygon
      points="48,20 49,22.5 52,22.5 49.8,24 50.5,26.5 48,25 45.5,26.5 46.2,24 44,22.5 47,22.5"
      fill="url(#quest-starcol-star)"
      fillOpacity="0.8"
    />
    {/* Tiny sparkle */}
    <circle cx="42" cy="14" r="1.5" fill="white" fillOpacity="0.7" />
  </svg>
);

/** dq-unit-lesson — Railroad track with forward arrow */
export const OnTrackIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="quest-ontrack-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#quest-ontrack-bg)" />
    {/* Railroad rails */}
    <line x1="18" y1="52" x2="28" y2="12" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="30" y1="52" x2="40" y2="12" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    {/* Railroad ties */}
    <line x1="19" y1="48" x2="30" y2="48" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
    <line x1="20" y1="42" x2="31" y2="42" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
    <line x1="22" y1="36" x2="33" y2="36" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
    <line x1="23" y1="30" x2="35" y2="30" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
    <line x1="25" y1="24" x2="36" y2="24" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
    <line x1="26" y1="18" x2="38" y2="18" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
    {/* Arrow pointing forward */}
    <polygon points="50,26 50,40 56,33" fill="#FFB800" />
    <polygon points="50,26 50,40 56,33" fill="white" fillOpacity="0.2" />
    {/* Speed lines */}
    <line x1="42" y1="28" x2="48" y2="28" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    <line x1="44" y1="33" x2="49" y2="33" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    <line x1="42" y1="38" x2="48" y2="38" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
  </svg>
);

/** dq-fast-answers-5 — Stopwatch with lightning bolt */
export const SpeedRoundIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="quest-speed-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#F472B6" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
      <linearGradient id="quest-speed-face" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#FCE7F3" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#quest-speed-bg)" />
    {/* Stopwatch body */}
    <circle cx="32" cy="35" r="18" fill="url(#quest-speed-face)" />
    <circle cx="32" cy="35" r="18" stroke="white" strokeWidth="2" fill="none" />
    {/* Top button */}
    <rect x="29" y="12" width="6" height="6" rx="2" fill="white" />
    {/* Side button */}
    <rect x="47" y="24" width="5" height="4" rx="1.5" fill="white" opacity="0.8" />
    {/* Lightning bolt in center */}
    <polygon points="34,24 28,36 32,36 29,46 38,33 34,33 37,24" fill="#F59E0B" />
    {/* Tick marks */}
    <line x1="32" y1="19" x2="32" y2="22" stroke="#EC4899" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="32" y1="48" x2="32" y2="51" stroke="#EC4899" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="16" y1="35" x2="19" y2="35" stroke="#EC4899" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="45" y1="35" x2="48" y2="35" stroke="#EC4899" strokeWidth="1.5" strokeLinecap="round" />
    {/* Sparkle */}
    <path d="M52,14 L53,16.5 L56,17 L53,17.5 L52,20 L51,17.5 L48,17 L51,16.5Z" fill="white" />
  </svg>
);

/** dq-perfect-session — Sparkling diamond / flawless gem */
export const FlawlessIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="quest-flawless-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
      <linearGradient id="quest-flawless-gem" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#FDE68A" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#quest-flawless-bg)" />
    {/* Diamond shape */}
    <polygon points="32,12 48,28 32,52 16,28" fill="url(#quest-flawless-gem)" />
    {/* Facet lines */}
    <line x1="32" y1="12" x2="32" y2="52" stroke="#F59E0B" strokeWidth="1" opacity="0.3" />
    <line x1="16" y1="28" x2="48" y2="28" stroke="#F59E0B" strokeWidth="1" opacity="0.3" />
    <line x1="32" y1="12" x2="16" y2="28" stroke="#F59E0B" strokeWidth="1" opacity="0.2" />
    <line x1="32" y1="12" x2="48" y2="28" stroke="#F59E0B" strokeWidth="1" opacity="0.2" />
    <line x1="32" y1="52" x2="16" y2="28" stroke="#F59E0B" strokeWidth="1" opacity="0.2" />
    <line x1="32" y1="52" x2="48" y2="28" stroke="#F59E0B" strokeWidth="1" opacity="0.2" />
    {/* Highlight */}
    <polygon points="32,12 24,28 32,28" fill="white" fillOpacity="0.4" />
    {/* Sparkles */}
    <path d="M12,16 L13,18.5 L16,19 L13,19.5 L12,22 L11,19.5 L8,19 L11,18.5Z" fill="white" />
    <path d="M52,14 L53,16 L55,16.5 L53,17 L52,19 L51,17 L49,16.5 L51,16Z" fill="white" />
    <path d="M50,44 L51,46 L53,46.5 L51,47 L50,49 L49,47 L47,46.5 L49,46Z" fill="white" opacity="0.7" />
    <circle cx="14" cy="46" r="1.5" fill="white" fillOpacity="0.5" />
  </svg>
);

// ─────────────────────────────────────────────────────────
// WEEKLY QUESTS
// ─────────────────────────────────────────────────────────

/** wq-lessons-5 — Open book with bookmark ribbon */
export const CommittedLearnerIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="quest-committed-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
      <linearGradient id="quest-committed-book" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#DBEAFE" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#quest-committed-bg)" />
    {/* Book spine */}
    <path
      d="M32,14 C24,14 14,16 14,20 L14,48 C14,48 22,46 32,46 C42,46 50,48 50,48 L50,20 C50,16 40,14 32,14Z"
      fill="url(#quest-committed-book)"
    />
    {/* Center crease */}
    <line x1="32" y1="16" x2="32" y2="46" stroke="#BFDBFE" strokeWidth="1.5" />
    {/* Page lines left */}
    <line x1="18" y1="24" x2="29" y2="24" stroke="#93C5FD" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    <line x1="18" y1="28" x2="29" y2="28" stroke="#93C5FD" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    <line x1="18" y1="32" x2="29" y2="32" stroke="#93C5FD" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    <line x1="18" y1="36" x2="29" y2="36" stroke="#93C5FD" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    {/* Page lines right */}
    <line x1="35" y1="24" x2="46" y2="24" stroke="#93C5FD" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    <line x1="35" y1="28" x2="46" y2="28" stroke="#93C5FD" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    <line x1="35" y1="32" x2="46" y2="32" stroke="#93C5FD" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    <line x1="35" y1="36" x2="46" y2="36" stroke="#93C5FD" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    {/* Bookmark ribbon */}
    <path d="M40,14 L40,26 L43,23 L46,26 L46,14" fill="#FFB800" />
    {/* Sparkle */}
    <circle cx="50" cy="14" r="2" fill="#FFB800" />
  </svg>
);

/** wq-xp-500 — XP explosion / star burst */
export const XPHunterIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="quest-xphunter-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#F472B6" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
      <linearGradient id="quest-xphunter-burst" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#quest-xphunter-bg)" />
    {/* Starburst background */}
    <polygon
      points="32,10 36,24 50,18 40,28 54,32 40,36 50,46 36,40 32,54 28,40 14,46 24,36 10,32 24,28 14,18 28,24"
      fill="url(#quest-xphunter-burst)"
      opacity="0.5"
    />
    {/* Center circle */}
    <circle cx="32" cy="32" r="12" fill="url(#quest-xphunter-burst)" />
    {/* XP text */}
    <text
      x="32"
      y="37"
      textAnchor="middle"
      fill="white"
      fontFamily="system-ui, sans-serif"
      fontWeight="900"
      fontSize="13"
    >
      XP
    </text>
    {/* Sparkles */}
    <circle cx="12" cy="12" r="2" fill="white" fillOpacity="0.7" />
    <circle cx="52" cy="12" r="1.5" fill="white" fillOpacity="0.6" />
    <circle cx="52" cy="52" r="2" fill="white" fillOpacity="0.5" />
  </svg>
);

/** wq-stars-3x3 — Triple star formation */
export const TripleStarIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="quest-tristar-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
      <linearGradient id="quest-tristar-s" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#FEF3C7" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#quest-tristar-bg)" />
    {/* Star 1 (top center, larger) */}
    <polygon
      points="32,10 35,21 46,21 37,27 40,38 32,32 24,38 27,27 18,21 29,21"
      fill="url(#quest-tristar-s)"
    />
    {/* Star 2 (bottom left) */}
    <polygon
      points="18,36 20,42 26,42 21,45 23,51 18,48 13,51 15,45 10,42 16,42"
      fill="url(#quest-tristar-s)"
      opacity="0.85"
    />
    {/* Star 3 (bottom right) */}
    <polygon
      points="46,36 48,42 54,42 49,45 51,51 46,48 41,51 43,45 38,42 44,42"
      fill="url(#quest-tristar-s)"
      opacity="0.85"
    />
    {/* Tiny sparkles */}
    <circle cx="10" cy="14" r="1.5" fill="white" fillOpacity="0.6" />
    <circle cx="54" cy="14" r="1.5" fill="white" fillOpacity="0.6" />
  </svg>
);

/** wq-topics-4 — Globe with gear/engineering symbols */
export const BroadMindIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="quest-broad-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#34D399" />
        <stop offset="100%" stopColor="#10B981" />
      </linearGradient>
      <linearGradient id="quest-broad-globe" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#D1FAE5" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#quest-broad-bg)" />
    {/* Globe */}
    <circle cx="30" cy="32" r="18" fill="url(#quest-broad-globe)" />
    {/* Meridian lines */}
    <ellipse cx="30" cy="32" rx="8" ry="18" stroke="#10B981" strokeWidth="1" fill="none" opacity="0.3" />
    <line x1="12" y1="32" x2="48" y2="32" stroke="#10B981" strokeWidth="1" opacity="0.3" />
    <ellipse cx="30" cy="32" rx="18" ry="8" stroke="#10B981" strokeWidth="1" fill="none" opacity="0.2" />
    {/* Continents (abstract shapes) */}
    <ellipse cx="25" cy="26" rx="6" ry="4" fill="#10B981" opacity="0.25" />
    <ellipse cx="34" cy="36" rx="5" ry="6" fill="#10B981" opacity="0.25" />
    {/* Small gear overlay */}
    <circle cx="46" cy="46" r="8" fill="#10B981" stroke="white" strokeWidth="1.5" />
    <circle cx="46" cy="46" r="4" fill="white" fillOpacity="0.3" />
    {/* Gear teeth */}
    <rect x="44" y="37" width="4" height="4" rx="1" fill="#10B981" stroke="white" strokeWidth="0.8" />
    <rect x="44" y="51" width="4" height="4" rx="1" fill="#10B981" stroke="white" strokeWidth="0.8" />
    <rect x="37" y="44" width="4" height="4" rx="1" fill="#10B981" stroke="white" strokeWidth="0.8" />
    <rect x="51" y="44" width="4" height="4" rx="1" fill="#10B981" stroke="white" strokeWidth="0.8" />
  </svg>
);

/** wq-all-daily-challenges — Trophy with lightning crown */
export const ChallengeChampionIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="quest-champ-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
      <linearGradient id="quest-champ-cup" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#FEF3C7" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#quest-champ-bg)" />
    {/* Trophy cup */}
    <path
      d="M20,18 L20,34 C20,40 25,44 32,44 C39,44 44,40 44,34 L44,18Z"
      fill="url(#quest-champ-cup)"
    />
    {/* Left handle */}
    <path d="M20,22 C14,22 12,28 16,32 L20,32" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    {/* Right handle */}
    <path d="M44,22 C50,22 52,28 48,32 L44,32" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    {/* Trophy stem and base */}
    <rect x="29" y="44" width="6" height="6" rx="1" fill="white" />
    <rect x="24" y="50" width="16" height="4" rx="2" fill="white" />
    {/* Lightning crown inside cup */}
    <polygon points="32,20 27,30 31,30 28,38 38,27 33,27 36,20" fill="#F59E0B" />
    {/* Sparkles */}
    <path d="M12,12 L13,14.5 L16,15 L13,15.5 L12,18 L11,15.5 L8,15 L11,14.5Z" fill="white" />
    <path d="M52,12 L53,14 L55,14.5 L53,15 L52,17 L51,15 L49,14.5 L51,14Z" fill="white" />
  </svg>
);

/** wq-streak-7 — Flame streak / fire week */
export const StreakWeekIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="quest-streakwk-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#F97316" />
        <stop offset="100%" stopColor="#EF4444" />
      </linearGradient>
      <linearGradient id="quest-streakwk-flame" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="50%" stopColor="#F97316" />
        <stop offset="100%" stopColor="#EF4444" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#quest-streakwk-bg)" />
    {/* Main flame */}
    <path
      d="M32,8 C38,18 48,22 46,36 C46,46 40,54 32,54 C24,54 18,46 18,36 C16,22 26,18 32,8Z"
      fill="url(#quest-streakwk-flame)"
    />
    {/* Inner flame */}
    <path
      d="M32,24 C36,30 40,33 39,40 C39,46 36,50 32,50 C28,50 25,46 25,40 C24,33 28,30 32,24Z"
      fill="#FBBF24"
    />
    {/* Core */}
    <ellipse cx="32" cy="44" rx="5" ry="4" fill="white" fillOpacity="0.5" />
    {/* "7" text overlay */}
    <text
      x="32"
      y="45"
      textAnchor="middle"
      fill="#EF4444"
      fontFamily="system-ui, sans-serif"
      fontWeight="900"
      fontSize="14"
    >
      7
    </text>
  </svg>
);

/** wq-unit-lessons-3 — Building blocks / stacked layers */
export const UnitProgressIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="quest-unitprog-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
      <linearGradient id="quest-unitprog-block" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#DBEAFE" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#quest-unitprog-bg)" />
    {/* Block 1 (bottom, widest) */}
    <rect x="12" y="42" width="40" height="10" rx="4" fill="url(#quest-unitprog-block)" />
    {/* Block 2 (middle) */}
    <rect x="16" y="30" width="32" height="10" rx="4" fill="url(#quest-unitprog-block)" opacity="0.9" />
    {/* Block 3 (top, narrowest) */}
    <rect x="20" y="18" width="24" height="10" rx="4" fill="url(#quest-unitprog-block)" opacity="0.8" />
    {/* Progress checkmarks */}
    <polyline points="28,47 30,49 36,45" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <polyline points="28,35 30,37 36,33" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    {/* Empty circle on top block (in progress) */}
    <circle cx="32" cy="23" r="3" stroke="#FFB800" strokeWidth="2" fill="none" />
    {/* Arrow pointing up */}
    <polyline points="50,22 54,16 58,22" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <line x1="54" y1="16" x2="54" y2="28" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/** wq-correct-50 — Bold "50" with checkmark badge */
export const TheFiftyIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="quest-fifty-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#34D399" />
        <stop offset="100%" stopColor="#10B981" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#quest-fifty-bg)" />
    {/* "50" number */}
    <text
      x="30"
      y="42"
      textAnchor="middle"
      fill="white"
      fontFamily="system-ui, sans-serif"
      fontWeight="900"
      fontSize="28"
    >
      50
    </text>
    {/* Check badge */}
    <circle cx="50" cy="16" r="8" fill="#FFB800" />
    <polyline points="46,16 49,19 55,13" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    {/* Sparkle */}
    <path d="M12,14 L13,16 L15,16.5 L13,17 L12,19 L11,17 L9,16.5 L11,16Z" fill="white" fillOpacity="0.7" />
  </svg>
);

/** wq-finish-unit — Graduation cap with sparkle */
export const UnitCompleteIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="quest-unitcomp-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#A78BFA" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
      <linearGradient id="quest-unitcomp-cap" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#EDE9FE" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#quest-unitcomp-bg)" />
    {/* Cap top */}
    <polygon points="32,14 8,28 32,38 56,28" fill="url(#quest-unitcomp-cap)" />
    {/* Cap shadow */}
    <polygon points="32,38 8,28 8,30 32,40 56,30 56,28" fill="white" fillOpacity="0.3" />
    {/* Tassel */}
    <line x1="50" y1="28" x2="50" y2="44" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" />
    <circle cx="50" cy="44" r="3" fill="#FFB800" />
    {/* Drape */}
    <path
      d="M20,30 L20,42 C20,42 26,46 32,46 C38,46 44,42 44,42 L44,30"
      stroke="white"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      opacity="0.6"
    />
    {/* Sparkles */}
    <path d="M14,14 L15,16.5 L18,17 L15,17.5 L14,20 L13,17.5 L10,17 L13,16.5Z" fill="#FFB800" />
    <path d="M48,10 L49,12 L51,12.5 L49,13 L48,15 L47,13 L45,12.5 L47,12Z" fill="white" fillOpacity="0.8" />
  </svg>
);

/** wq-accuracy-90-x3 — Precision target with "3x" */
export const PrecisionExpertIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="quest-precex-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#F472B6" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#quest-precex-bg)" />
    {/* Target rings */}
    <circle cx="28" cy="32" r="18" stroke="white" strokeWidth="2" fill="none" />
    <circle cx="28" cy="32" r="12" stroke="white" strokeWidth="2" fill="none" opacity="0.7" />
    <circle cx="28" cy="32" r="6" stroke="white" strokeWidth="2" fill="none" opacity="0.5" />
    <circle cx="28" cy="32" r="2" fill="#FFB800" />
    {/* Arrow embedded in target */}
    <line x1="28" y1="32" x2="42" y2="20" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" />
    <polygon points="42,20 38,21 41,24" fill="#FFB800" />
    {/* 3x badge */}
    <circle cx="50" cy="46" r="9" fill="white" />
    <text
      x="50"
      y="50"
      textAnchor="middle"
      fill="#EC4899"
      fontFamily="system-ui, sans-serif"
      fontWeight="900"
      fontSize="11"
    >
      3x
    </text>
    {/* Sparkle */}
    <path d="M52,12 L53,14.5 L56,15 L53,15.5 L52,18 L51,15.5 L48,15 L51,14.5Z" fill="white" />
  </svg>
);

// ─────────────────────────────────────────────────────────
// COMEBACK QUESTS
// ─────────────────────────────────────────────────────────

/** cq-answer-questions — Waving hand / welcome back */
export const BackInTheGameIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="quest-back-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
      <linearGradient id="quest-back-hand" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#FEF3C7" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#quest-back-bg)" />
    {/* Hand waving */}
    <path
      d="M28,48 C24,46 20,42 22,36 L24,30 C24,28 28,28 28,30 L26,24 C26,22 30,21 30,24 L32,18 C32,16 36,16 36,18 L36,24 C36,22 40,21 40,24 L40,30 C40,28 44,28 44,30 L44,40 C44,48 38,52 32,52 C28,52 28,48 28,48Z"
      fill="url(#quest-back-hand)"
      stroke="white"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Wave motion lines */}
    <path d="M14,22 C16,20 18,22 16,24" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M10,28 C12,26 14,28 12,30" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7" />
    <path d="M16,16 C18,14 20,16 18,18" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />
    {/* Sparkle */}
    <path d="M50,14 L51,16.5 L54,17 L51,17.5 L50,20 L49,17.5 L46,17 L49,16.5Z" fill="white" />
  </svg>
);

/** cq-complete-lesson — Single footstep / one step forward */
export const OneStepIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="quest-onestep-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#quest-onestep-bg)" />
    {/* Step/stair */}
    <path
      d="M12,52 L12,38 L28,38 L28,24 L44,24 L44,14"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Footprint on the current step */}
    <ellipse cx="36" cy="20" rx="4" ry="6" fill="white" fillOpacity="0.4" />
    {/* Arrow pointing up-right */}
    <polyline points="40,12 48,12 48,20" stroke="#FFB800" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <line x1="48" y1="12" x2="40" y2="20" stroke="#FFB800" strokeWidth="2.5" strokeLinecap="round" />
    {/* Step highlights */}
    <rect x="14" y="40" width="12" height="2" rx="1" fill="white" fillOpacity="0.3" />
    <rect x="30" y="26" width="12" height="2" rx="1" fill="white" fillOpacity="0.3" />
    {/* Sparkle */}
    <circle cx="52" cy="8" r="2" fill="#FFB800" />
  </svg>
);

/** cq-accuracy-70 — Chart trending up / recovery arrow */
export const GettingBackIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="quest-getback-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#34D399" />
        <stop offset="100%" stopColor="#10B981" />
      </linearGradient>
      <linearGradient id="quest-getback-line" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="100%" stopColor="#FFB800" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#quest-getback-bg)" />
    {/* Chart axes */}
    <line x1="12" y1="50" x2="54" y2="50" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <line x1="12" y1="14" x2="12" y2="50" stroke="white" strokeWidth="2" strokeLinecap="round" />
    {/* Trend line going down then up */}
    <polyline
      points="14,22 22,28 28,40 36,38 44,26 52,16"
      stroke="url(#quest-getback-line)"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Arrow head at end */}
    <polygon points="52,16 48,14 50,20" fill="#FFB800" />
    {/* Data dots */}
    <circle cx="14" cy="22" r="2.5" fill="white" />
    <circle cx="22" cy="28" r="2.5" fill="white" />
    <circle cx="28" cy="40" r="2.5" fill="white" />
    <circle cx="36" cy="38" r="2.5" fill="white" />
    <circle cx="44" cy="26" r="2.5" fill="white" />
    <circle cx="52" cy="16" r="2.5" fill="#FFB800" />
    {/* Sparkle */}
    <path d="M54,10 L55,12 L57,12.5 L55,13 L54,15 L53,13 L51,12.5 L53,12Z" fill="white" />
  </svg>
);

// ─────────────────────────────────────────────────────────
// QUEST ICON MAP
// ─────────────────────────────────────────────────────────

export const questIconMap: Record<string, ComponentType<IconProps>> = {
  // Daily quests
  'dq-complete-lessons': DoubleUpIcon,
  'dq-accuracy-80': SharpShooterIcon,
  'dq-stale-topic': DustOffIcon,
  'dq-daily-challenge': DailyChallengerIcon,
  'dq-correct-answers-15': AnswerMachineIcon,
  'dq-earn-xp-100': XPGrindIcon,
  'dq-stars-3': StarCollectorIcon,
  'dq-unit-lesson': OnTrackIcon,
  'dq-fast-answers-5': SpeedRoundIcon,
  'dq-perfect-session': FlawlessIcon,
  // Weekly quests
  'wq-lessons-5': CommittedLearnerIcon,
  'wq-xp-500': XPHunterIcon,
  'wq-stars-3x3': TripleStarIcon,
  'wq-topics-4': BroadMindIcon,
  'wq-all-daily-challenges': ChallengeChampionIcon,
  'wq-streak-7': StreakWeekIcon,
  'wq-unit-lessons-3': UnitProgressIcon,
  'wq-correct-50': TheFiftyIcon,
  'wq-finish-unit': UnitCompleteIcon,
  'wq-accuracy-90-x3': PrecisionExpertIcon,
  // Comeback quests
  'cq-answer-questions': BackInTheGameIcon,
  'cq-complete-lesson': OneStepIcon,
  'cq-accuracy-70': GettingBackIcon,
};
