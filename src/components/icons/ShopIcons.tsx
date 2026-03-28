'use client';

interface IconProps {
  size?: number;
  className?: string;
}

// ─────────────────────────────────────────────────────────
// POWER-UPS
// ─────────────────────────────────────────────────────────

/** shop-streak-freeze — Ice crystal with shield */
export const StreakFreezeIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="shop-freeze-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
      <linearGradient id="shop-freeze-shield" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#DBEAFE" />
        <stop offset="100%" stopColor="#93C5FD" />
      </linearGradient>
      <linearGradient id="shop-freeze-crystal" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#BFDBFE" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#shop-freeze-bg)" />
    {/* Shield shape */}
    <path
      d="M32,10 L50,20 L50,36 C50,46 42,54 32,56 C22,54 14,46 14,36 L14,20Z"
      fill="url(#shop-freeze-shield)"
      fillOpacity="0.6"
      stroke="white"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Ice crystal — main vertical */}
    <line x1="32" y1="16" x2="32" y2="48" stroke="url(#shop-freeze-crystal)" strokeWidth="3" strokeLinecap="round" />
    {/* Crystal cross horizontal */}
    <line x1="20" y1="32" x2="44" y2="32" stroke="url(#shop-freeze-crystal)" strokeWidth="3" strokeLinecap="round" />
    {/* Diagonal arms */}
    <line x1="22" y1="22" x2="42" y2="42" stroke="url(#shop-freeze-crystal)" strokeWidth="2" strokeLinecap="round" />
    <line x1="42" y1="22" x2="22" y2="42" stroke="url(#shop-freeze-crystal)" strokeWidth="2" strokeLinecap="round" />
    {/* Crystal branch tips */}
    <line x1="32" y1="16" x2="28" y2="20" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="32" y1="16" x2="36" y2="20" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="44" y1="32" x2="40" y2="28" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="44" y1="32" x2="40" y2="36" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="32" y1="48" x2="28" y2="44" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="32" y1="48" x2="36" y2="44" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="20" y1="32" x2="24" y2="28" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="20" y1="32" x2="24" y2="36" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    {/* Sparkles */}
    <circle cx="26" cy="20" r="1.5" fill="white" fillOpacity="0.8" />
    <circle cx="40" cy="44" r="1.5" fill="white" fillOpacity="0.6" />
    <circle cx="46" cy="24" r="1" fill="white" fillOpacity="0.5" />
  </svg>
);

/** shop-streak-repair — Wrench with flame spark */
export const StreakRepairIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="shop-repair-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
      <linearGradient id="shop-repair-wrench" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#FEF3C7" />
      </linearGradient>
      <linearGradient id="shop-repair-flame" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#EF4444" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#shop-repair-bg)" />
    {/* Wrench body */}
    <path
      d="M18,46 L36,28 C34,24 36,18 42,16 L44,22 L50,20 C48,26 44,30 38,30 L20,48Z"
      fill="url(#shop-repair-wrench)"
      stroke="white"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Wrench head detail */}
    <path
      d="M36,28 C34,24 36,18 42,16"
      stroke="white"
      strokeWidth="1"
      fill="none"
      opacity="0.5"
    />
    {/* Handle grip lines */}
    <line x1="24" y1="40" x2="26" y2="42" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    <line x1="26" y1="38" x2="28" y2="40" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    <line x1="28" y1="36" x2="30" y2="38" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    {/* Flame at top-right */}
    <path
      d="M48,14 C50,10 54,10 52,6 C56,10 54,14 52,14 C54,14 54,18 50,18 C48,18 46,16 48,14Z"
      fill="url(#shop-repair-flame)"
    />
    <ellipse cx="50" cy="16" rx="2" ry="1.5" fill="#FBBF24" opacity="0.8" />
    {/* Spark dots */}
    <circle cx="14" cy="14" r="2" fill="white" fillOpacity="0.6" />
    <circle cx="12" cy="20" r="1.2" fill="white" fillOpacity="0.4" />
    {/* Sparkle */}
    <path d="M10,36 L11,38 L13,38.5 L11,39 L10,41 L9,39 L7,38.5 L9,38Z" fill="white" fillOpacity="0.6" />
  </svg>
);

/** shop-double-xp-30 — Lightning bolt with 2x text */
export const DoubleXPIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="shop-dxp-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#A78BFA" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
      <linearGradient id="shop-dxp-bolt" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#shop-dxp-bg)" />
    {/* Large lightning bolt */}
    <polygon
      points="36,8 18,34 30,34 24,56 46,28 34,28 40,8"
      fill="url(#shop-dxp-bolt)"
    />
    {/* Bolt highlight */}
    <polygon points="36,8 26,28 34,28 40,8" fill="white" fillOpacity="0.3" />
    {/* 2x badge */}
    <circle cx="50" cy="14" r="10" fill="white" />
    <text
      x="50"
      y="18"
      textAnchor="middle"
      fill="#8B5CF6"
      fontFamily="system-ui, sans-serif"
      fontWeight="900"
      fontSize="12"
    >
      2x
    </text>
    {/* Electric sparks */}
    <line x1="10" y1="20" x2="14" y2="18" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <line x1="8" y1="26" x2="12" y2="26" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    <line x1="50" y1="46" x2="54" y2="44" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <line x1="52" y1="52" x2="56" y2="50" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    {/* Sparkle */}
    <path d="M10,46 L11,48.5 L14,49 L11,49.5 L10,52 L9,49.5 L6,49 L9,48.5Z" fill="white" fillOpacity="0.7" />
  </svg>
);

// ─────────────────────────────────────────────────────────
// COSMETIC TITLES
// ─────────────────────────────────────────────────────────

/** shop-title-thermal-king — Crown with heat waves */
export const ThermalKingIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="shop-thermal-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#F87171" />
        <stop offset="100%" stopColor="#EF4444" />
      </linearGradient>
      <linearGradient id="shop-thermal-crown" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFB800" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
      <linearGradient id="shop-thermal-heat" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#EF4444" stopOpacity="0" />
        <stop offset="100%" stopColor="#EF4444" stopOpacity="0.6" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#shop-thermal-bg)" />
    {/* Heat waves rising */}
    <path d="M18,52 C18,48 22,48 22,44 C22,40 18,40 18,36" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4" />
    <path d="M28,54 C28,50 32,50 32,46 C32,42 28,42 28,38" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.3" />
    <path d="M38,52 C38,48 42,48 42,44 C42,40 38,40 38,36" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4" />
    <path d="M48,54 C48,50 52,50 52,46 C52,42 48,42 48,38" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.3" />
    {/* Crown */}
    <path
      d="M12,36 L12,22 L20,28 L26,16 L32,24 L38,16 L44,28 L52,22 L52,36Z"
      fill="url(#shop-thermal-crown)"
    />
    {/* Crown base band */}
    <rect x="12" y="33" width="40" height="5" rx="1" fill="url(#shop-thermal-crown)" />
    <rect x="12" y="33" width="40" height="5" rx="1" fill="white" fillOpacity="0.2" />
    {/* Crown jewels */}
    <circle cx="20" cy="28" r="2.5" fill="#EF4444" />
    <circle cx="32" cy="22" r="3" fill="#EF4444" />
    <circle cx="44" cy="28" r="2.5" fill="#EF4444" />
    {/* Crown highlights */}
    <circle cx="20" cy="27" r="1" fill="white" fillOpacity="0.5" />
    <circle cx="32" cy="21" r="1.2" fill="white" fillOpacity="0.5" />
    <circle cx="44" cy="27" r="1" fill="white" fillOpacity="0.5" />
    {/* Sparkles */}
    <path d="M8,14 L9,16.5 L12,17 L9,17.5 L8,20 L7,17.5 L4,17 L7,16.5Z" fill="#FFB800" />
    <path d="M56,14 L57,16 L59,16.5 L57,17 L56,19 L55,17 L53,16.5 L55,16Z" fill="#FFB800" opacity="0.8" />
  </svg>
);

/** shop-title-stress-master — Flexed arm with stress lines */
export const StressMasterIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="shop-stress-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
      <linearGradient id="shop-stress-arm" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#DBEAFE" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#shop-stress-bg)" />
    {/* Flexed arm */}
    <path
      d="M16,48 L16,36 C16,34 18,32 20,32 L24,32 L24,20 C24,16 28,14 32,16 L34,18 C38,20 38,24 36,26 L34,28 C40,26 42,28 42,32 L42,36 C42,40 38,44 34,44 L20,44 C18,44 16,46 16,48Z"
      fill="url(#shop-stress-arm)"
      stroke="white"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Bicep bulge highlight */}
    <ellipse cx="30" cy="22" rx="4" ry="6" fill="white" fillOpacity="0.2" />
    {/* Stress/tension lines */}
    <line x1="44" y1="18" x2="50" y2="14" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" />
    <line x1="46" y1="24" x2="52" y2="22" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" />
    <line x1="44" y1="30" x2="50" y2="30" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" />
    {/* Force arrows (engineering stress) */}
    <line x1="48" y1="40" x2="56" y2="40" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <polygon points="56,40 53,38 53,42" fill="white" fillOpacity="0.6" />
    <line x1="48" y1="46" x2="56" y2="46" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    <polygon points="56,46 53,44 53,48" fill="white" fillOpacity="0.4" />
    {/* Sparkle */}
    <path d="M10,12 L11,14.5 L14,15 L11,15.5 L10,18 L9,15.5 L6,15 L9,14.5Z" fill="white" />
    <circle cx="52" cy="10" r="2" fill="#FFB800" />
  </svg>
);

/** shop-title-flow-guru — Water swirl with meditation pose */
export const FlowGuruIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="shop-flow-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#22D3EE" />
        <stop offset="100%" stopColor="#06B6D4" />
      </linearGradient>
      <linearGradient id="shop-flow-swirl" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#A5F3FC" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="56" height="56" rx="14" fill="url(#shop-flow-bg)" />
    {/* Flow swirls (water/fluid dynamics) */}
    <path
      d="M8,40 C14,34 20,38 26,32 C32,26 38,30 44,24 C50,18 56,22 60,16"
      stroke="url(#shop-flow-swirl)"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
      opacity="0.5"
    />
    <path
      d="M8,48 C14,42 20,46 26,40 C32,34 38,38 44,32 C50,26 56,30 60,24"
      stroke="url(#shop-flow-swirl)"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
      opacity="0.3"
    />
    {/* Meditation figure */}
    {/* Head */}
    <circle cx="32" cy="20" r="5" fill="white" />
    {/* Body */}
    <path
      d="M32,25 L32,36"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* Arms in meditation pose */}
    <path
      d="M22,32 C24,30 28,30 30,32 L32,34 L34,32 C36,30 40,30 42,32"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Legs crossed */}
    <path
      d="M24,44 C26,40 30,38 32,38 C34,38 38,40 40,44"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M26,42 L22,44"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M38,42 L42,44"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Aura circles */}
    <circle cx="32" cy="30" r="16" stroke="white" strokeWidth="1" fill="none" opacity="0.2" />
    <circle cx="32" cy="30" r="22" stroke="white" strokeWidth="0.8" fill="none" opacity="0.12" />
    {/* Water droplets */}
    <circle cx="12" cy="16" r="2" fill="white" fillOpacity="0.5" />
    <circle cx="52" cy="12" r="1.5" fill="white" fillOpacity="0.4" />
    <circle cx="50" cy="50" r="2" fill="white" fillOpacity="0.3" />
    {/* Sparkle */}
    <path d="M52,44 L53,46 L55,46.5 L53,47 L52,49 L51,47 L49,46.5 L51,46Z" fill="white" fillOpacity="0.7" />
  </svg>
);

// ─────────────────────────────────────────────────────────
// GEM ICON
// ─────────────────────────────────────────────────────────

/** Faceted blue gem / diamond for currency display */
export const GemIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="shop-gem-left" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#2563EB" />
      </linearGradient>
      <linearGradient id="shop-gem-right" x1="1" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
      <linearGradient id="shop-gem-top" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#93C5FD" />
        <stop offset="100%" stopColor="#60A5FA" />
      </linearGradient>
      <linearGradient id="shop-gem-highlight" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
    </defs>
    {/* Drop shadow */}
    <ellipse cx="32" cy="58" rx="14" ry="3" fill="#3B82F6" fillOpacity="0.2" />
    {/* Gem top facet (flat top) */}
    <polygon points="22,20 42,20 48,28 16,28" fill="url(#shop-gem-top)" />
    {/* Top edge highlight */}
    <polygon points="22,20 42,20 40,22 24,22" fill="white" fillOpacity="0.4" />
    {/* Left top facet */}
    <polygon points="22,20 16,28 24,22" fill="#93C5FD" />
    {/* Right top facet */}
    <polygon points="42,20 48,28 40,22" fill="#60A5FA" />
    {/* Center divider in top */}
    <polygon points="32,20 36,28 28,28" fill="white" fillOpacity="0.15" />
    {/* Left bottom facet */}
    <polygon points="16,28 32,54 32,28" fill="url(#shop-gem-left)" />
    {/* Right bottom facet */}
    <polygon points="48,28 32,54 32,28" fill="url(#shop-gem-right)" />
    {/* Left sub-facet */}
    <polygon points="16,28 24,28 28,44" fill="#2563EB" fillOpacity="0.3" />
    {/* Right sub-facet */}
    <polygon points="48,28 40,28 36,44" fill="#60A5FA" fillOpacity="0.2" />
    {/* Main highlight streak */}
    <polygon points="24,22 28,28 26,36 22,26" fill="url(#shop-gem-highlight)" />
    {/* Small bright highlight */}
    <polygon points="26,24 28,28 24,26" fill="white" fillOpacity="0.6" />
    {/* Edge outlines */}
    <polygon
      points="22,20 42,20 48,28 32,54 16,28"
      stroke="#2563EB"
      strokeWidth="2"
      strokeLinejoin="round"
      fill="none"
    />
    <line x1="16" y1="28" x2="48" y2="28" stroke="#2563EB" strokeWidth="1.5" opacity="0.5" />
    <line x1="22" y1="20" x2="28" y2="28" stroke="#2563EB" strokeWidth="1" opacity="0.3" />
    <line x1="42" y1="20" x2="36" y2="28" stroke="#2563EB" strokeWidth="1" opacity="0.3" />
    <line x1="32" y1="20" x2="32" y2="28" stroke="#2563EB" strokeWidth="1" opacity="0.2" />
    <line x1="28" y1="28" x2="32" y2="54" stroke="#2563EB" strokeWidth="1" opacity="0.2" />
    <line x1="36" y1="28" x2="32" y2="54" stroke="#2563EB" strokeWidth="1" opacity="0.2" />
    {/* Sparkles around gem */}
    <path d="M10,16 L11,18.5 L14,19 L11,19.5 L10,22 L9,19.5 L6,19 L9,18.5Z" fill="#60A5FA" />
    <path d="M54,14 L55,16 L57,16.5 L55,17 L54,19 L53,17 L51,16.5 L53,16Z" fill="#93C5FD" />
    <path d="M50,38 L51,39.5 L53,40 L51,40.5 L50,42 L49,40.5 L47,40 L49,39.5Z" fill="#60A5FA" fillOpacity="0.7" />
    <circle cx="12" cy="36" r="1.5" fill="#93C5FD" fillOpacity="0.5" />
  </svg>
);

// ─────────────────────────────────────────────────────────
// SHOP ICON MAP
// ─────────────────────────────────────────────────────────

export const shopIconMap: Record<string, typeof StreakFreezeIcon> = {
  'shop-streak-freeze': StreakFreezeIcon,
  'shop-streak-repair': StreakRepairIcon,
  'shop-double-xp-30': DoubleXPIcon,
  'shop-title-thermal-king': ThermalKingIcon,
  'shop-title-stress-master': StressMasterIcon,
  'shop-title-flow-guru': FlowGuruIcon,
};
