'use client';

interface IconProps {
  size?: number;
  className?: string;
}

/* ─────────────────────────────────────────────
   1. WEEK WARRIOR (7 days) — Small flame on shield
   ───────────────────────────────────────────── */
export const WeekWarriorIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="streak-ww-medal" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FCD34D" />
        <stop offset="100%" stopColor="#B45309" />
      </linearGradient>
      <radialGradient id="streak-ww-flame" cx="0.5" cy="0.7" r="0.5">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="40%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </radialGradient>
      <radialGradient id="streak-ww-inner" cx="0.5" cy="0.6" r="0.4">
        <stop offset="0%" stopColor="#FEF3C7" />
        <stop offset="100%" stopColor="#FBBF24" />
      </radialGradient>
    </defs>
    {/* Medal base circle */}
    <circle cx="32" cy="36" r="20" fill="url(#streak-ww-medal)" stroke="#92400E" strokeWidth="2" />
    <circle cx="32" cy="36" r="17" fill="none" stroke="#FCD34D" strokeWidth="1.5" opacity="0.6" />
    {/* Ribbon (top) */}
    <path d="M24,8 L20,18 L32,16 L44,18 L40,8" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M26,8 L22,16 L32,14.5 L42,16 L38,8" fill="#FBBF24" stroke="none" opacity="0.5" />
    {/* Flame */}
    <path
      d="M32,16 Q28,22 26,28 Q24,34 32,38 Q40,34 38,28 Q36,22 32,16"
      fill="url(#streak-ww-flame)"
      stroke="#B45309"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Inner flame */}
    <path
      d="M32,22 Q30,26 29,30 Q28,34 32,36 Q36,34 35,30 Q34,26 32,22"
      fill="url(#streak-ww-inner)"
    />
    {/* Flame highlight */}
    <path d="M30,26 Q31,24 32,26" fill="white" opacity="0.3" />
    {/* Number badge */}
    <circle cx="46" cy="48" r="9" fill="#F59E0B" stroke="#92400E" strokeWidth="2" />
    <circle cx="46" cy="48" r="6.5" fill="#FFFBEB" stroke="#B45309" strokeWidth="1" />
    <text x="43.5" y="51.5" fontSize="9" fontWeight="bold" fill="#92400E" fontFamily="sans-serif">7</text>
    {/* Sparks */}
    <circle cx="24" cy="18" r="1" fill="#FDE68A" opacity="0.8" />
    <circle cx="40" cy="20" r="0.8" fill="#FDE68A" opacity="0.7" />
    <circle cx="26" cy="14" r="0.6" fill="#FDE68A" opacity="0.6" />
    {/* Medal bolts */}
    <circle cx="32" cy="20" r="0" fill="none" />
    <circle cx="22" cy="36" r="1" fill="#92400E" opacity="0.5" />
    <circle cx="42" cy="36" r="1" fill="#92400E" opacity="0.5" />
  </svg>
);

/* ─────────────────────────────────────────────
   2. FORTNIGHT FOCUS (14 days) — Larger flame with spark
   ───────────────────────────────────────────── */
export const FortnightFocusIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="streak-ff-medal" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FCA5A5" />
        <stop offset="100%" stopColor="#991B1B" />
      </linearGradient>
      <radialGradient id="streak-ff-flame" cx="0.5" cy="0.65" r="0.5">
        <stop offset="0%" stopColor="#FECACA" />
        <stop offset="30%" stopColor="#F87171" />
        <stop offset="70%" stopColor="#EF4444" />
        <stop offset="100%" stopColor="#B91C1C" />
      </radialGradient>
      <radialGradient id="streak-ff-inner" cx="0.5" cy="0.55" r="0.4">
        <stop offset="0%" stopColor="#FEF2F2" />
        <stop offset="50%" stopColor="#FCA5A5" />
        <stop offset="100%" stopColor="#F87171" />
      </radialGradient>
      <radialGradient id="streak-ff-glow" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor="#EF4444" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
      </radialGradient>
    </defs>
    {/* Outer glow */}
    <circle cx="32" cy="34" r="28" fill="url(#streak-ff-glow)" />
    {/* Medal base */}
    <circle cx="32" cy="36" r="20" fill="url(#streak-ff-medal)" stroke="#7F1D1D" strokeWidth="2" />
    <circle cx="32" cy="36" r="17" fill="none" stroke="#FCA5A5" strokeWidth="1.5" opacity="0.5" />
    {/* Ribbon */}
    <path d="M24,8 L18,20 L32,17 L46,20 L40,8" fill="#EF4444" stroke="#991B1B" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M26,9 L21,18 L32,16 L43,18 L38,9" fill="#F87171" stroke="none" opacity="0.4" />
    {/* Main flame (larger) */}
    <path
      d="M32,12 Q26,20 23,28 Q20,36 32,40 Q44,36 41,28 Q38,20 32,12"
      fill="url(#streak-ff-flame)"
      stroke="#991B1B"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Inner flame */}
    <path
      d="M32,18 Q29,24 27,30 Q25,36 32,38 Q39,36 37,30 Q35,24 32,18"
      fill="url(#streak-ff-inner)"
    />
    {/* Core glow */}
    <path d="M32,24 Q30,28 30,32 Q30,35 32,36 Q34,35 34,32 Q34,28 32,24" fill="#FEF2F2" opacity="0.6" />
    {/* Lightning spark (the "spark" element) */}
    <path
      d="M38,14 L36,20 L40,19 L37,26"
      fill="none"
      stroke="#FDE68A"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Sparks / particles */}
    <circle cx="22" cy="16" r="1.2" fill="#FDE68A" opacity="0.9" />
    <circle cx="42" cy="14" r="1" fill="#FDE68A" opacity="0.8" />
    <circle cx="20" cy="24" r="0.8" fill="#FECACA" opacity="0.7" />
    <circle cx="44" cy="22" r="0.8" fill="#FECACA" opacity="0.7" />
    <line x1="24" y1="12" x2="22" y2="10" stroke="#FDE68A" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
    <line x1="40" y1="10" x2="42" y2="8" stroke="#FDE68A" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
    {/* Number badge */}
    <circle cx="47" cy="48" r="9" fill="#EF4444" stroke="#7F1D1D" strokeWidth="2" />
    <circle cx="47" cy="48" r="6.5" fill="#FEF2F2" stroke="#991B1B" strokeWidth="1" />
    <text x="40.5" y="51.5" fontSize="8" fontWeight="bold" fill="#7F1D1D" fontFamily="sans-serif">14</text>
    {/* Medal rivets */}
    <circle cx="22" cy="36" r="1" fill="#7F1D1D" opacity="0.4" />
    <circle cx="42" cy="36" r="1" fill="#7F1D1D" opacity="0.4" />
  </svg>
);

/* ─────────────────────────────────────────────
   3. IRON WILL (30 days) — Blazing flame with aura
   ───────────────────────────────────────────── */
export const IronWillIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="streak-iw-medal" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFE082" />
        <stop offset="50%" stopColor="#FFB800" />
        <stop offset="100%" stopColor="#8B6914" />
      </linearGradient>
      <radialGradient id="streak-iw-aura" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor="#FFB800" stopOpacity="0.4" />
        <stop offset="60%" stopColor="#FFB800" stopOpacity="0.1" />
        <stop offset="100%" stopColor="#FFB800" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="streak-iw-flame" cx="0.5" cy="0.6" r="0.5">
        <stop offset="0%" stopColor="#FFF3C4" />
        <stop offset="25%" stopColor="#FFD54F" />
        <stop offset="55%" stopColor="#FFB800" />
        <stop offset="80%" stopColor="#FF8F00" />
        <stop offset="100%" stopColor="#E65100" />
      </radialGradient>
      <radialGradient id="streak-iw-inner" cx="0.5" cy="0.5" r="0.4">
        <stop offset="0%" stopColor="white" />
        <stop offset="40%" stopColor="#FFF8E1" />
        <stop offset="100%" stopColor="#FFD54F" />
      </radialGradient>
    </defs>
    {/* Aura glow */}
    <circle cx="32" cy="30" r="30" fill="url(#streak-iw-aura)" />
    {/* Medal base */}
    <circle cx="32" cy="36" r="20" fill="url(#streak-iw-medal)" stroke="#8B6914" strokeWidth="2" />
    <circle cx="32" cy="36" r="17" fill="none" stroke="#FFE082" strokeWidth="1.5" opacity="0.6" />
    <circle cx="32" cy="36" r="14.5" fill="none" stroke="#FFE082" strokeWidth="0.8" opacity="0.3" />
    {/* Ribbon */}
    <path d="M22,6 L16,20 L32,16 L48,20 L42,6" fill="#FFB800" stroke="#8B6914" strokeWidth="1.5" strokeLinejoin="round" />
    {/* Main blaze flame */}
    <path
      d="M32,8 Q24,18 20,28 Q16,38 32,42 Q48,38 44,28 Q40,18 32,8"
      fill="url(#streak-iw-flame)"
      stroke="#E65100"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Secondary flame tongue (left) */}
    <path d="M26,14 Q22,20 24,28 Q26,32 28,30 Q24,24 26,14" fill="#FF8F00" opacity="0.6" />
    {/* Secondary flame tongue (right) */}
    <path d="M38,14 Q42,20 40,28 Q38,32 36,30 Q40,24 38,14" fill="#FF8F00" opacity="0.6" />
    {/* Inner white-hot core */}
    <path
      d="M32,18 Q28,26 27,32 Q26,38 32,40 Q38,38 37,32 Q36,26 32,18"
      fill="url(#streak-iw-inner)"
      opacity="0.8"
    />
    {/* Core glow */}
    <ellipse cx="32" cy="34" rx="3" ry="4" fill="white" opacity="0.4" />
    {/* Flying sparks */}
    <circle cx="20" cy="12" r="1.5" fill="#FFD54F" opacity="0.9" />
    <circle cx="44" cy="10" r="1.2" fill="#FFD54F" opacity="0.8" />
    <circle cx="16" cy="20" r="1" fill="#FFE082" opacity="0.7" />
    <circle cx="48" cy="18" r="0.8" fill="#FFE082" opacity="0.7" />
    <circle cx="22" cy="8" r="0.7" fill="#FFF3C4" opacity="0.8" />
    <circle cx="42" cy="6" r="0.7" fill="#FFF3C4" opacity="0.8" />
    {/* Spark lines */}
    <line x1="18" y1="14" x2="16" y2="10" stroke="#FFD54F" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
    <line x1="46" y1="12" x2="48" y2="8" stroke="#FFD54F" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
    <line x1="24" y1="10" x2="22" y2="6" stroke="#FFD54F" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    <line x1="40" y1="8" x2="42" y2="4" stroke="#FFD54F" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    {/* Number badge */}
    <circle cx="48" cy="48" r="10" fill="#FFB800" stroke="#8B6914" strokeWidth="2" />
    <circle cx="48" cy="48" r="7.5" fill="#FFFBEB" stroke="#B45309" strokeWidth="1" />
    <text x="40" y="52" fontSize="9" fontWeight="bold" fill="#8B6914" fontFamily="sans-serif">30</text>
    {/* Medal rivets */}
    <circle cx="22" cy="36" r="1.2" fill="#8B6914" opacity="0.4" />
    <circle cx="42" cy="36" r="1.2" fill="#8B6914" opacity="0.4" />
    <circle cx="32" cy="50" r="1.2" fill="#8B6914" opacity="0.4" />
  </svg>
);

/* ─────────────────────────────────────────────
   4. DIAMOND DEDICATION (60 days) — Crystalline flame
   ───────────────────────────────────────────── */
export const DiamondDedicationIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="streak-dd-medal" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#93C5FD" />
        <stop offset="50%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1E3A5F" />
      </linearGradient>
      <radialGradient id="streak-dd-aura" cx="0.5" cy="0.45" r="0.5">
        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
        <stop offset="70%" stopColor="#3B82F6" stopOpacity="0.05" />
        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="streak-dd-crystal" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#DBEAFE" />
        <stop offset="25%" stopColor="#93C5FD" />
        <stop offset="50%" stopColor="#3B82F6" />
        <stop offset="75%" stopColor="#60A5FA" />
        <stop offset="100%" stopColor="#DBEAFE" />
      </linearGradient>
      <linearGradient id="streak-dd-crystal-facet" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#BFDBFE" />
        <stop offset="100%" stopColor="#2563EB" />
      </linearGradient>
    </defs>
    {/* Aura */}
    <circle cx="32" cy="30" r="30" fill="url(#streak-dd-aura)" />
    {/* Medal base */}
    <circle cx="32" cy="36" r="20" fill="url(#streak-dd-medal)" stroke="#1E3A5F" strokeWidth="2" />
    <circle cx="32" cy="36" r="17" fill="none" stroke="#93C5FD" strokeWidth="1.5" opacity="0.5" />
    <circle cx="32" cy="36" r="14.5" fill="none" stroke="#93C5FD" strokeWidth="0.8" opacity="0.3" />
    {/* Ribbon */}
    <path d="M22,6 L16,20 L32,16 L48,20 L42,6" fill="#3B82F6" stroke="#1E3A5F" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M24,7 L19,18 L32,15 L45,18 L40,7" fill="#60A5FA" opacity="0.4" />
    {/* Crystal flame shape — faceted like a diamond */}
    <polygon
      points="32,8 24,22 20,32 26,40 32,42 38,40 44,32 40,22"
      fill="url(#streak-dd-crystal)"
      stroke="#1E40AF"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Crystal facet lines */}
    <line x1="32" y1="8" x2="32" y2="42" stroke="#2563EB" strokeWidth="0.8" opacity="0.4" />
    <line x1="32" y1="8" x2="24" y2="22" stroke="#93C5FD" strokeWidth="0.6" opacity="0.5" />
    <line x1="32" y1="8" x2="40" y2="22" stroke="#93C5FD" strokeWidth="0.6" opacity="0.5" />
    <line x1="24" y1="22" x2="44" y2="32" stroke="#93C5FD" strokeWidth="0.6" opacity="0.3" />
    <line x1="40" y1="22" x2="20" y2="32" stroke="#93C5FD" strokeWidth="0.6" opacity="0.3" />
    <line x1="26" y1="40" x2="40" y2="22" stroke="#93C5FD" strokeWidth="0.5" opacity="0.3" />
    <line x1="38" y1="40" x2="24" y2="22" stroke="#93C5FD" strokeWidth="0.5" opacity="0.3" />
    {/* Left facet highlight */}
    <polygon points="32,8 24,22 20,32 32,26" fill="url(#streak-dd-crystal-facet)" opacity="0.3" />
    {/* Inner glow */}
    <ellipse cx="32" cy="28" rx="5" ry="8" fill="white" opacity="0.2" />
    {/* Sparkle on crystal */}
    <line x1="28" y1="18" x2="34" y2="18" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <line x1="31" y1="15" x2="31" y2="21" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    {/* Floating sparkles */}
    <circle cx="18" cy="14" r="1.5" fill="#DBEAFE" opacity="0.8" />
    <circle cx="46" cy="12" r="1.2" fill="#DBEAFE" opacity="0.7" />
    <circle cx="14" cy="24" r="1" fill="#93C5FD" opacity="0.6" />
    <circle cx="50" cy="22" r="0.8" fill="#93C5FD" opacity="0.6" />
    <line x1="20" y1="10" x2="18" y2="8" stroke="#BFDBFE" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    <line x1="44" y1="8" x2="46" y2="6" stroke="#BFDBFE" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    {/* Diamond sparkle cross */}
    <line x1="16" y1="16" x2="20" y2="16" stroke="#DBEAFE" strokeWidth="0.8" strokeLinecap="round" opacity="0.5" />
    <line x1="18" y1="14" x2="18" y2="18" stroke="#DBEAFE" strokeWidth="0.8" strokeLinecap="round" opacity="0.5" />
    {/* Number badge */}
    <circle cx="48" cy="48" r="10" fill="#3B82F6" stroke="#1E3A5F" strokeWidth="2" />
    <circle cx="48" cy="48" r="7.5" fill="#EFF6FF" stroke="#2563EB" strokeWidth="1" />
    <text x="40" y="52" fontSize="9" fontWeight="bold" fill="#1E3A5F" fontFamily="sans-serif">60</text>
    {/* Medal rivets */}
    <circle cx="22" cy="36" r="1.2" fill="#1E3A5F" opacity="0.4" />
    <circle cx="42" cy="36" r="1.2" fill="#1E3A5F" opacity="0.4" />
    <circle cx="32" cy="50" r="1.2" fill="#1E3A5F" opacity="0.4" />
  </svg>
);

/* ─────────────────────────────────────────────
   5. CENTURION STREAK (100 days) — Inferno flame with crown
   ───────────────────────────────────────────── */
export const CenturionStreakIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="streak-cs-medal" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#C4B5FD" />
        <stop offset="50%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#3B0764" />
      </linearGradient>
      <radialGradient id="streak-cs-aura1" cx="0.5" cy="0.4" r="0.5">
        <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="streak-cs-aura2" cx="0.5" cy="0.45" r="0.45">
        <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#A78BFA" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="streak-cs-flame" cx="0.5" cy="0.6" r="0.5">
        <stop offset="0%" stopColor="#EDE9FE" />
        <stop offset="20%" stopColor="#C4B5FD" />
        <stop offset="45%" stopColor="#8B5CF6" />
        <stop offset="70%" stopColor="#7C3AED" />
        <stop offset="100%" stopColor="#5B21B6" />
      </radialGradient>
      <radialGradient id="streak-cs-inner" cx="0.5" cy="0.5" r="0.4">
        <stop offset="0%" stopColor="white" />
        <stop offset="30%" stopColor="#EDE9FE" />
        <stop offset="100%" stopColor="#A78BFA" />
      </radialGradient>
      <linearGradient id="streak-cs-crown" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFE94E" />
        <stop offset="100%" stopColor="#CCA800" />
      </linearGradient>
    </defs>
    {/* Double aura */}
    <circle cx="32" cy="28" r="31" fill="url(#streak-cs-aura1)" />
    <circle cx="32" cy="28" r="26" fill="url(#streak-cs-aura2)" />
    {/* Medal base */}
    <circle cx="32" cy="36" r="20" fill="url(#streak-cs-medal)" stroke="#3B0764" strokeWidth="2" />
    <circle cx="32" cy="36" r="17" fill="none" stroke="#C4B5FD" strokeWidth="1.5" opacity="0.5" />
    <circle cx="32" cy="36" r="14.5" fill="none" stroke="#C4B5FD" strokeWidth="0.8" opacity="0.3" />
    <circle cx="32" cy="36" r="12" fill="none" stroke="#C4B5FD" strokeWidth="0.5" opacity="0.2" />
    {/* Ribbon */}
    <path d="M20,4 L14,20 L32,15 L50,20 L44,4" fill="#8B5CF6" stroke="#3B0764" strokeWidth="1.5" strokeLinejoin="round" />
    {/* Inferno flame — massive */}
    <path
      d="M32,4 Q22,16 18,26 Q14,38 32,44 Q50,38 46,26 Q42,16 32,4"
      fill="url(#streak-cs-flame)"
      stroke="#5B21B6"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Left flame tongue */}
    <path d="M24,10 Q18,20 22,32 Q24,36 26,32 Q20,24 24,10" fill="#7C3AED" opacity="0.5" />
    {/* Right flame tongue */}
    <path d="M40,10 Q46,20 42,32 Q40,36 38,32 Q44,24 40,10" fill="#7C3AED" opacity="0.5" />
    {/* Inner white-hot core */}
    <path
      d="M32,14 Q26,24 24,32 Q22,40 32,42 Q42,40 40,32 Q38,24 32,14"
      fill="url(#streak-cs-inner)"
      opacity="0.7"
    />
    {/* Core glow */}
    <ellipse cx="32" cy="34" rx="4" ry="5" fill="white" opacity="0.3" />
    {/* Crown at top of flame */}
    <path
      d="M26,16 L27,10 L30,14 L32,8 L34,14 L37,10 L38,16 Z"
      fill="url(#streak-cs-crown)"
      stroke="#8A6B00"
      strokeWidth="1"
      strokeLinejoin="round"
    />
    {/* Crown jewels */}
    <circle cx="32" cy="8" r="1" fill="#8B5CF6" stroke="#8A6B00" strokeWidth="0.5" />
    <circle cx="27" cy="10" r="0.8" fill="#FFE94E" />
    <circle cx="37" cy="10" r="0.8" fill="#FFE94E" />
    {/* Massive spark shower */}
    <circle cx="16" cy="10" r="1.5" fill="#C4B5FD" opacity="0.9" />
    <circle cx="48" cy="8" r="1.5" fill="#C4B5FD" opacity="0.9" />
    <circle cx="12" cy="18" r="1.2" fill="#DDD6FE" opacity="0.8" />
    <circle cx="52" cy="16" r="1" fill="#DDD6FE" opacity="0.8" />
    <circle cx="18" cy="6" r="1" fill="#EDE9FE" opacity="0.7" />
    <circle cx="46" cy="4" r="0.8" fill="#EDE9FE" opacity="0.7" />
    <circle cx="10" cy="26" r="0.8" fill="#C4B5FD" opacity="0.6" />
    <circle cx="54" cy="24" r="0.8" fill="#C4B5FD" opacity="0.6" />
    {/* Spark lines radiating */}
    <line x1="14" y1="12" x2="10" y2="8" stroke="#C4B5FD" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
    <line x1="50" y1="10" x2="54" y2="6" stroke="#C4B5FD" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
    <line x1="20" y1="6" x2="18" y2="2" stroke="#DDD6FE" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    <line x1="44" y1="4" x2="46" y2="0" stroke="#DDD6FE" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    <line x1="10" y1="22" x2="6" y2="20" stroke="#C4B5FD" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    <line x1="54" y1="20" x2="58" y2="18" stroke="#C4B5FD" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    {/* Number badge */}
    <circle cx="48" cy="49" r="11" fill="#8B5CF6" stroke="#3B0764" strokeWidth="2" />
    <circle cx="48" cy="49" r="8" fill="#F5F3FF" stroke="#5B21B6" strokeWidth="1" />
    <text x="38" y="53" fontSize="9" fontWeight="bold" fill="#3B0764" fontFamily="sans-serif">100</text>
    {/* Medal rivets */}
    <circle cx="22" cy="36" r="1.2" fill="#3B0764" opacity="0.4" />
    <circle cx="42" cy="36" r="1.2" fill="#3B0764" opacity="0.4" />
    <circle cx="32" cy="50" r="1.2" fill="#3B0764" opacity="0.4" />
    <circle cx="26" cy="48" r="1" fill="#3B0764" opacity="0.3" />
    <circle cx="38" cy="48" r="1" fill="#3B0764" opacity="0.3" />
  </svg>
);

/* ─────────────────────────────────────────────
   CHEST — Mechanical treasure chest with gears
   ───────────────────────────────────────────── */
export const ChestIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="streak-chest-body" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFD54F" />
        <stop offset="40%" stopColor="#FFB800" />
        <stop offset="100%" stopColor="#8B6914" />
      </linearGradient>
      <linearGradient id="streak-chest-lid" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFE082" />
        <stop offset="50%" stopColor="#FFB800" />
        <stop offset="100%" stopColor="#A07B1A" />
      </linearGradient>
      <linearGradient id="streak-chest-band" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#8B8BFF" />
        <stop offset="50%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1E40AF" />
      </linearGradient>
      <radialGradient id="streak-chest-glow" cx="0.5" cy="0.3" r="0.5">
        <stop offset="0%" stopColor="#FFF8DC" stopOpacity="0.9" />
        <stop offset="40%" stopColor="#FFE082" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#FFB800" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="streak-chest-gear" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
    </defs>
    {/* Interior glow (visible through open lid) */}
    <ellipse cx="32" cy="28" rx="18" ry="12" fill="url(#streak-chest-glow)" />
    {/* Glow rays */}
    <line x1="32" y1="16" x2="32" y2="8" stroke="#FFE082" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <line x1="24" y1="18" x2="20" y2="10" stroke="#FFE082" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
    <line x1="40" y1="18" x2="44" y2="10" stroke="#FFE082" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
    <line x1="18" y1="22" x2="12" y2="16" stroke="#FFE082" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    <line x1="46" y1="22" x2="52" y2="16" stroke="#FFE082" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    {/* Sparkles from glow */}
    <circle cx="28" cy="12" r="1" fill="#FFF8DC" opacity="0.7" />
    <circle cx="36" cy="10" r="0.8" fill="#FFF8DC" opacity="0.6" />
    <circle cx="22" cy="14" r="0.6" fill="#FFF8DC" opacity="0.5" />
    <circle cx="42" cy="14" r="0.6" fill="#FFF8DC" opacity="0.5" />
    {/* Chest body (bottom) */}
    <rect x="10" y="32" width="44" height="22" rx="3" fill="url(#streak-chest-body)" stroke="#6B4F0A" strokeWidth="2" strokeLinejoin="round" />
    {/* Chest body front band */}
    <rect x="10" y="38" width="44" height="4" fill="url(#streak-chest-band)" stroke="#1E40AF" strokeWidth="1" />
    {/* Lower decorative band */}
    <rect x="10" y="48" width="44" height="3" fill="url(#streak-chest-band)" stroke="#1E40AF" strokeWidth="1" />
    {/* Chest lid (slightly open, tilted back) */}
    <path
      d="M10,32 L10,24 Q10,18 16,18 L48,18 Q54,18 54,24 L54,32 Z"
      fill="url(#streak-chest-lid)"
      stroke="#6B4F0A"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Lid curve highlight */}
    <path d="M12,28 Q12,20 18,20 L46,20 Q52,20 52,28" fill="none" stroke="#FFE082" strokeWidth="1" opacity="0.5" />
    {/* Lid band */}
    <rect x="10" y="26" width="44" height="3" fill="url(#streak-chest-band)" stroke="#1E40AF" strokeWidth="1" />
    {/* Central lock mechanism — gear */}
    <path
      d="M32,32 L34,30 L36,32 L34,34 Z M32,32 L30,30 L28,32 L30,34 Z M32,32 L32,28 L34,30 Z M32,32 L32,36 L30,34 Z"
      fill="url(#streak-chest-gear)"
      stroke="#1E40AF"
      strokeWidth="0.5"
    />
    <circle cx="32" cy="38" r="5" fill="url(#streak-chest-gear)" stroke="#1E40AF" strokeWidth="1.5" />
    {/* Gear teeth */}
    <rect x="30" y="32" width="4" height="2" fill="url(#streak-chest-gear)" stroke="#1E40AF" strokeWidth="0.5" />
    <rect x="30" y="42" width="4" height="2" fill="url(#streak-chest-gear)" stroke="#1E40AF" strokeWidth="0.5" />
    <rect x="26" y="36.5" width="2" height="3" fill="url(#streak-chest-gear)" stroke="#1E40AF" strokeWidth="0.5" />
    <rect x="36" y="36.5" width="2" height="3" fill="url(#streak-chest-gear)" stroke="#1E40AF" strokeWidth="0.5" />
    {/* Gear inner circle */}
    <circle cx="32" cy="38" r="2.5" fill="#3B82F6" stroke="#1E40AF" strokeWidth="1" />
    {/* Keyhole */}
    <circle cx="32" cy="37" r="1" fill="#1E1B4B" />
    <rect x="31.2" y="37" width="1.6" height="3" rx="0.5" fill="#1E1B4B" />
    {/* Corner bolts */}
    <circle cx="14" cy="36" r="1.5" fill="#3B82F6" stroke="#1E40AF" strokeWidth="0.8" />
    <circle cx="50" cy="36" r="1.5" fill="#3B82F6" stroke="#1E40AF" strokeWidth="0.8" />
    <circle cx="14" cy="50" r="1.5" fill="#3B82F6" stroke="#1E40AF" strokeWidth="0.8" />
    <circle cx="50" cy="50" r="1.5" fill="#3B82F6" stroke="#1E40AF" strokeWidth="0.8" />
    {/* Lid corner bolts */}
    <circle cx="14" cy="22" r="1.2" fill="#3B82F6" stroke="#1E40AF" strokeWidth="0.8" />
    <circle cx="50" cy="22" r="1.2" fill="#3B82F6" stroke="#1E40AF" strokeWidth="0.8" />
    {/* Small decorative gear (left) */}
    <circle cx="20" cy="44" r="2.5" fill="url(#streak-chest-gear)" stroke="#1E40AF" strokeWidth="0.8" />
    <circle cx="20" cy="44" r="1" fill="#1E40AF" />
    {/* Small decorative gear (right) */}
    <circle cx="44" cy="44" r="2.5" fill="url(#streak-chest-gear)" stroke="#1E40AF" strokeWidth="0.8" />
    <circle cx="44" cy="44" r="1" fill="#1E40AF" />
    {/* Metal sheen on lid */}
    <path d="M14,22 Q30,19 50,22" fill="none" stroke="white" strokeWidth="0.8" opacity="0.3" />
    {/* Chest base shadow */}
    <ellipse cx="32" cy="56" rx="22" ry="2" fill="#8B6914" opacity="0.2" />
  </svg>
);
