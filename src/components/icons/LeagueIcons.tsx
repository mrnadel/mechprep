'use client';

interface IconProps {
  size?: number;
  className?: string;
}

/* ─────────────────────────────────────────────
   1. BRONZE LEAGUE — Shield with crossed wrenches
   ───────────────────────────────────────────── */
export const BronzeLeagueIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="league-bronze-body" x1="0" y1="0" x2="0.3" y2="1">
        <stop offset="0%" stopColor="#DA9445" />
        <stop offset="35%" stopColor="#CD7F32" />
        <stop offset="60%" stopColor="#8B5722" />
        <stop offset="80%" stopColor="#CD7F32" />
        <stop offset="100%" stopColor="#A06828" />
      </linearGradient>
      <linearGradient id="league-bronze-shine" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="white" stopOpacity="0.4" />
        <stop offset="50%" stopColor="white" stopOpacity="0" />
        <stop offset="100%" stopColor="white" stopOpacity="0.1" />
      </linearGradient>
      <linearGradient id="league-bronze-border" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#DA9445" />
        <stop offset="100%" stopColor="#6B4015" />
      </linearGradient>
      <linearGradient id="league-bronze-ribbon" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#B06828" />
        <stop offset="100%" stopColor="#8B5722" />
      </linearGradient>
    </defs>
    {/* Shield shape */}
    <path
      d="M32,4 L56,14 L56,34 Q56,50 32,60 Q8,50 8,34 L8,14 Z"
      fill="url(#league-bronze-body)"
      stroke="url(#league-bronze-border)"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Inner shield border */}
    <path
      d="M32,8 L52,16 L52,33 Q52,47 32,56 Q12,47 12,33 L12,16 Z"
      fill="none"
      stroke="#DA9445"
      strokeWidth="1.5"
      strokeLinejoin="round"
      opacity="0.6"
    />
    {/* Metallic shine overlay */}
    <path
      d="M32,4 L56,14 L56,34 Q56,50 32,60 Q8,50 8,34 L8,14 Z"
      fill="url(#league-bronze-shine)"
    />
    {/* Crossed wrenches */}
    {/* Wrench 1 (top-left to bottom-right) */}
    <line x1="20" y1="22" x2="44" y2="42" stroke="#6B4015" strokeWidth="3.5" strokeLinecap="round" />
    <line x1="20" y1="22" x2="44" y2="42" stroke="#DA9445" strokeWidth="2.5" strokeLinecap="round" />
    {/* Wrench 1 head */}
    <circle cx="20" cy="22" r="4" fill="none" stroke="#DA9445" strokeWidth="2" />
    <circle cx="20" cy="22" r="2" fill="#6B4015" />
    {/* Wrench 1 jaw */}
    <path d="M42,40 L46,38 L48,42 L44,44 Z" fill="#DA9445" stroke="#6B4015" strokeWidth="1" strokeLinejoin="round" />
    {/* Wrench 2 (top-right to bottom-left) */}
    <line x1="44" y1="22" x2="20" y2="42" stroke="#6B4015" strokeWidth="3.5" strokeLinecap="round" />
    <line x1="44" y1="22" x2="20" y2="42" stroke="#DA9445" strokeWidth="2.5" strokeLinecap="round" />
    {/* Wrench 2 head */}
    <circle cx="44" cy="22" r="4" fill="none" stroke="#DA9445" strokeWidth="2" />
    <circle cx="44" cy="22" r="2" fill="#6B4015" />
    {/* Wrench 2 jaw */}
    <path d="M22,40 L18,38 L16,42 L20,44 Z" fill="#DA9445" stroke="#6B4015" strokeWidth="1" strokeLinejoin="round" />
    {/* Center bolt */}
    <circle cx="32" cy="32" r="3.5" fill="#CD7F32" stroke="#6B4015" strokeWidth="1.5" />
    <circle cx="32" cy="32" r="1.5" fill="#DA9445" />
    {/* Rivets along shield border */}
    <circle cx="32" cy="9" r="1.5" fill="#DA9445" stroke="#6B4015" strokeWidth="0.8" />
    <circle cx="18" cy="16" r="1.5" fill="#DA9445" stroke="#6B4015" strokeWidth="0.8" />
    <circle cx="46" cy="16" r="1.5" fill="#DA9445" stroke="#6B4015" strokeWidth="0.8" />
    <circle cx="14" cy="30" r="1.5" fill="#DA9445" stroke="#6B4015" strokeWidth="0.8" />
    <circle cx="50" cy="30" r="1.5" fill="#DA9445" stroke="#6B4015" strokeWidth="0.8" />
    {/* Bottom ribbon / banner */}
    <path
      d="M18,48 L14,52 L20,50 L32,54 L44,50 L50,52 L46,48"
      fill="url(#league-bronze-ribbon)"
      stroke="#6B4015"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

/* ─────────────────────────────────────────────
   2. SILVER LEAGUE — Shield with gear emblem
   ───────────────────────────────────────────── */
export const SilverLeagueIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="league-silver-body" x1="0" y1="0" x2="0.3" y2="1">
        <stop offset="0%" stopColor="#E8E8E8" />
        <stop offset="30%" stopColor="#C0C0C0" />
        <stop offset="55%" stopColor="#808080" />
        <stop offset="75%" stopColor="#C0C0C0" />
        <stop offset="100%" stopColor="#A0A0A0" />
      </linearGradient>
      <linearGradient id="league-silver-shine" x1="0" y1="0" x2="1" y2="0.5">
        <stop offset="0%" stopColor="white" stopOpacity="0.5" />
        <stop offset="40%" stopColor="white" stopOpacity="0.1" />
        <stop offset="100%" stopColor="white" stopOpacity="0.2" />
      </linearGradient>
      <linearGradient id="league-silver-border" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#D0D0D0" />
        <stop offset="100%" stopColor="#606060" />
      </linearGradient>
      <linearGradient id="league-silver-gear" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#E0E0E0" />
        <stop offset="50%" stopColor="#999" />
        <stop offset="100%" stopColor="#C0C0C0" />
      </linearGradient>
      <linearGradient id="league-silver-ribbon" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#B0B0B0" />
        <stop offset="100%" stopColor="#707070" />
      </linearGradient>
    </defs>
    {/* Shield shape */}
    <path
      d="M32,4 L56,14 L56,34 Q56,50 32,60 Q8,50 8,34 L8,14 Z"
      fill="url(#league-silver-body)"
      stroke="url(#league-silver-border)"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Inner shield border */}
    <path
      d="M32,8 L52,16 L52,33 Q52,47 32,56 Q12,47 12,33 L12,16 Z"
      fill="none"
      stroke="#D0D0D0"
      strokeWidth="1.5"
      strokeLinejoin="round"
      opacity="0.7"
    />
    {/* Shine overlay */}
    <path
      d="M32,4 L56,14 L56,34 Q56,50 32,60 Q8,50 8,34 L8,14 Z"
      fill="url(#league-silver-shine)"
    />
    {/* Gear emblem — 8 teeth via polygon approximation */}
    <path
      d="M32,16 L34,18 L38,17 L38,20 L41,22 L39,25 L41,28 L38,29 L38,33 L34,32 L32,34 L30,32 L26,33 L26,29 L23,28 L25,25 L23,22 L26,20 L26,17 L30,18 Z"
      fill="url(#league-silver-gear)"
      stroke="#606060"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Gear body circle */}
    <circle cx="32" cy="25" r="6" fill="url(#league-silver-gear)" stroke="#707070" strokeWidth="1.5" />
    {/* Gear inner hole */}
    <circle cx="32" cy="25" r="3" fill="#A0A0A0" stroke="#606060" strokeWidth="1" />
    {/* Gear center */}
    <circle cx="32" cy="25" r="1.2" fill="#D0D0D0" />
    {/* Gear spokes */}
    <line x1="32" y1="22" x2="32" y2="28" stroke="#707070" strokeWidth="0.8" />
    <line x1="29" y1="25" x2="35" y2="25" stroke="#707070" strokeWidth="0.8" />
    {/* Wing decorations on sides */}
    <path d="M16,28 Q14,32 16,36 Q20,34 22,36" fill="none" stroke="#A0A0A0" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M48,28 Q50,32 48,36 Q44,34 42,36" fill="none" stroke="#A0A0A0" strokeWidth="1.5" strokeLinecap="round" />
    {/* Rivets */}
    <circle cx="32" cy="9" r="1.5" fill="#D0D0D0" stroke="#707070" strokeWidth="0.8" />
    <circle cx="18" cy="16" r="1.5" fill="#D0D0D0" stroke="#707070" strokeWidth="0.8" />
    <circle cx="46" cy="16" r="1.5" fill="#D0D0D0" stroke="#707070" strokeWidth="0.8" />
    <circle cx="14" cy="30" r="1.5" fill="#D0D0D0" stroke="#707070" strokeWidth="0.8" />
    <circle cx="50" cy="30" r="1.5" fill="#D0D0D0" stroke="#707070" strokeWidth="0.8" />
    <circle cx="20" cy="42" r="1.5" fill="#D0D0D0" stroke="#707070" strokeWidth="0.8" />
    <circle cx="44" cy="42" r="1.5" fill="#D0D0D0" stroke="#707070" strokeWidth="0.8" />
    {/* Bottom ribbon */}
    <path
      d="M18,48 L14,52 L20,50 L32,54 L44,50 L50,52 L46,48"
      fill="url(#league-silver-ribbon)"
      stroke="#606060"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Ribbon text area — "II" for tier 2 */}
    <text x="29" y="43" fontSize="8" fontWeight="bold" fill="#505050" fontFamily="serif">II</text>
  </svg>
);

/* ─────────────────────────────────────────────
   3. GOLD LEAGUE — Shield with star/crown
   ───────────────────────────────────────────── */
export const GoldLeagueIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="league-gold-body" x1="0" y1="0" x2="0.3" y2="1">
        <stop offset="0%" stopColor="#FFE94E" />
        <stop offset="30%" stopColor="#FFD700" />
        <stop offset="55%" stopColor="#B8960F" />
        <stop offset="75%" stopColor="#FFD700" />
        <stop offset="100%" stopColor="#CCA800" />
      </linearGradient>
      <linearGradient id="league-gold-shine" x1="0.2" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stopColor="white" stopOpacity="0.5" />
        <stop offset="40%" stopColor="white" stopOpacity="0" />
        <stop offset="70%" stopColor="white" stopOpacity="0.15" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="league-gold-border" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFE94E" />
        <stop offset="100%" stopColor="#8A6B00" />
      </linearGradient>
      <linearGradient id="league-gold-crown" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFE94E" />
        <stop offset="100%" stopColor="#CCA800" />
      </linearGradient>
      <linearGradient id="league-gold-ribbon" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#CCA800" />
        <stop offset="100%" stopColor="#8A6B00" />
      </linearGradient>
    </defs>
    {/* Shield */}
    <path
      d="M32,4 L56,14 L56,34 Q56,50 32,60 Q8,50 8,34 L8,14 Z"
      fill="url(#league-gold-body)"
      stroke="url(#league-gold-border)"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Inner border */}
    <path
      d="M32,8 L52,16 L52,33 Q52,47 32,56 Q12,47 12,33 L12,16 Z"
      fill="none"
      stroke="#FFE94E"
      strokeWidth="1.5"
      strokeLinejoin="round"
      opacity="0.6"
    />
    {/* Shine overlay */}
    <path
      d="M32,4 L56,14 L56,34 Q56,50 32,60 Q8,50 8,34 L8,14 Z"
      fill="url(#league-gold-shine)"
    />
    {/* Crown */}
    <path
      d="M20,26 L22,18 L27,24 L32,14 L37,24 L42,18 L44,26 Z"
      fill="url(#league-gold-crown)"
      stroke="#8A6B00"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Crown base band */}
    <rect x="20" y="26" width="24" height="4" rx="1" fill="#FFD700" stroke="#8A6B00" strokeWidth="1.5" strokeLinejoin="round" />
    {/* Crown jewels */}
    <circle cx="27" cy="28" r="1.5" fill="#FF4B4B" stroke="#8A6B00" strokeWidth="0.5" />
    <circle cx="32" cy="28" r="1.5" fill="#1CB0F6" stroke="#8A6B00" strokeWidth="0.5" />
    <circle cx="37" cy="28" r="1.5" fill="#FF4B4B" stroke="#8A6B00" strokeWidth="0.5" />
    {/* Crown point jewels */}
    <circle cx="22" cy="18" r="1.2" fill="#FFE94E" stroke="#8A6B00" strokeWidth="0.5" />
    <circle cx="32" cy="14" r="1.5" fill="#FF4B4B" stroke="#8A6B00" strokeWidth="0.5" />
    <circle cx="42" cy="18" r="1.2" fill="#FFE94E" stroke="#8A6B00" strokeWidth="0.5" />
    {/* Star below crown */}
    <polygon
      points="32,34 34,38 38,38 35,41 36,45 32,42 28,45 29,41 26,38 30,38"
      fill="#FFE94E"
      stroke="#8A6B00"
      strokeWidth="1"
      strokeLinejoin="round"
    />
    {/* Rivets */}
    <circle cx="32" cy="9" r="1.5" fill="#FFE94E" stroke="#8A6B00" strokeWidth="0.8" />
    <circle cx="18" cy="16" r="1.5" fill="#FFE94E" stroke="#8A6B00" strokeWidth="0.8" />
    <circle cx="46" cy="16" r="1.5" fill="#FFE94E" stroke="#8A6B00" strokeWidth="0.8" />
    <circle cx="14" cy="30" r="1.5" fill="#FFE94E" stroke="#8A6B00" strokeWidth="0.8" />
    <circle cx="50" cy="30" r="1.5" fill="#FFE94E" stroke="#8A6B00" strokeWidth="0.8" />
    <circle cx="20" cy="42" r="1.5" fill="#FFE94E" stroke="#8A6B00" strokeWidth="0.8" />
    <circle cx="44" cy="42" r="1.5" fill="#FFE94E" stroke="#8A6B00" strokeWidth="0.8" />
    {/* Bottom ribbon */}
    <path
      d="M18,48 L14,52 L20,50 L32,54 L44,50 L50,52 L46,48"
      fill="url(#league-gold-ribbon)"
      stroke="#8A6B00"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

/* ─────────────────────────────────────────────
   4. PLATINUM LEAGUE — Shield with diamond
   ───────────────────────────────────────────── */
export const PlatinumLeagueIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="league-plat-body" x1="0" y1="0" x2="0.3" y2="1">
        <stop offset="0%" stopColor="#4DD0E1" />
        <stop offset="30%" stopColor="#00BCD4" />
        <stop offset="55%" stopColor="#006064" />
        <stop offset="75%" stopColor="#00ACC1" />
        <stop offset="100%" stopColor="#00838F" />
      </linearGradient>
      <linearGradient id="league-plat-shine" x1="0.1" y1="0" x2="0.9" y2="0.8">
        <stop offset="0%" stopColor="white" stopOpacity="0.55" />
        <stop offset="30%" stopColor="white" stopOpacity="0.1" />
        <stop offset="60%" stopColor="white" stopOpacity="0.2" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="league-plat-border" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4DD0E1" />
        <stop offset="100%" stopColor="#004D40" />
      </linearGradient>
      <linearGradient id="league-plat-diamond" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#E0F7FA" />
        <stop offset="30%" stopColor="#80DEEA" />
        <stop offset="60%" stopColor="#00BCD4" />
        <stop offset="100%" stopColor="#4DD0E1" />
      </linearGradient>
      <linearGradient id="league-plat-ribbon" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#00ACC1" />
        <stop offset="100%" stopColor="#004D40" />
      </linearGradient>
    </defs>
    {/* Shield */}
    <path
      d="M32,4 L56,14 L56,34 Q56,50 32,60 Q8,50 8,34 L8,14 Z"
      fill="url(#league-plat-body)"
      stroke="url(#league-plat-border)"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Inner border */}
    <path
      d="M32,8 L52,16 L52,33 Q52,47 32,56 Q12,47 12,33 L12,16 Z"
      fill="none"
      stroke="#4DD0E1"
      strokeWidth="1.5"
      strokeLinejoin="round"
      opacity="0.6"
    />
    {/* Shine overlay */}
    <path
      d="M32,4 L56,14 L56,34 Q56,50 32,60 Q8,50 8,34 L8,14 Z"
      fill="url(#league-plat-shine)"
    />
    {/* Diamond shape */}
    <polygon
      points="32,13 44,28 32,45 20,28"
      fill="url(#league-plat-diamond)"
      stroke="#004D40"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Diamond facets */}
    <line x1="32" y1="13" x2="32" y2="45" stroke="#00838F" strokeWidth="0.8" opacity="0.5" />
    <line x1="20" y1="28" x2="44" y2="28" stroke="#00838F" strokeWidth="0.8" opacity="0.5" />
    {/* Top facets */}
    <line x1="32" y1="13" x2="25" y2="28" stroke="#00838F" strokeWidth="0.6" opacity="0.4" />
    <line x1="32" y1="13" x2="39" y2="28" stroke="#00838F" strokeWidth="0.6" opacity="0.4" />
    {/* Bottom facets */}
    <line x1="32" y1="45" x2="25" y2="28" stroke="#00838F" strokeWidth="0.6" opacity="0.4" />
    <line x1="32" y1="45" x2="39" y2="28" stroke="#00838F" strokeWidth="0.6" opacity="0.4" />
    {/* Diamond sparkle */}
    <line x1="29" y1="21" x2="35" y2="21" stroke="white" strokeWidth="1" opacity="0.6" strokeLinecap="round" />
    <line x1="32" y1="18" x2="32" y2="24" stroke="white" strokeWidth="1" opacity="0.6" strokeLinecap="round" />
    <circle cx="32" cy="21" r="1" fill="white" opacity="0.5" />
    {/* Small sparkles around diamond */}
    <line x1="16" y1="18" x2="18" y2="20" stroke="#E0F7FA" strokeWidth="1" strokeLinecap="round" />
    <line x1="17" y1="20" x2="17" y2="18" stroke="#E0F7FA" strokeWidth="1" strokeLinecap="round" />
    <line x1="46" y1="18" x2="48" y2="20" stroke="#E0F7FA" strokeWidth="1" strokeLinecap="round" />
    <line x1="47" y1="20" x2="47" y2="18" stroke="#E0F7FA" strokeWidth="1" strokeLinecap="round" />
    {/* Rivets */}
    <circle cx="32" cy="9" r="1.5" fill="#4DD0E1" stroke="#004D40" strokeWidth="0.8" />
    <circle cx="18" cy="16" r="1.5" fill="#4DD0E1" stroke="#004D40" strokeWidth="0.8" />
    <circle cx="46" cy="16" r="1.5" fill="#4DD0E1" stroke="#004D40" strokeWidth="0.8" />
    <circle cx="14" cy="30" r="1.5" fill="#4DD0E1" stroke="#004D40" strokeWidth="0.8" />
    <circle cx="50" cy="30" r="1.5" fill="#4DD0E1" stroke="#004D40" strokeWidth="0.8" />
    <circle cx="20" cy="42" r="1.5" fill="#4DD0E1" stroke="#004D40" strokeWidth="0.8" />
    <circle cx="44" cy="42" r="1.5" fill="#4DD0E1" stroke="#004D40" strokeWidth="0.8" />
    {/* Bottom ribbon */}
    <path
      d="M18,48 L14,52 L20,50 L32,54 L44,50 L50,52 L46,48"
      fill="url(#league-plat-ribbon)"
      stroke="#004D40"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

/* ─────────────────────────────────────────────
   5. MASTERS LEAGUE — Shield with crown and laurels
   ───────────────────────────────────────────── */
export const MastersLeagueIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="league-masters-body" x1="0" y1="0" x2="0.3" y2="1">
        <stop offset="0%" stopColor="#CE93D8" />
        <stop offset="30%" stopColor="#9C27B0" />
        <stop offset="55%" stopColor="#4A148C" />
        <stop offset="75%" stopColor="#9C27B0" />
        <stop offset="100%" stopColor="#7B1FA2" />
      </linearGradient>
      <linearGradient id="league-masters-shine" x1="0.1" y1="0" x2="0.9" y2="0.8">
        <stop offset="0%" stopColor="white" stopOpacity="0.5" />
        <stop offset="30%" stopColor="white" stopOpacity="0" />
        <stop offset="60%" stopColor="white" stopOpacity="0.15" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="league-masters-border" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#CE93D8" />
        <stop offset="100%" stopColor="#311B92" />
      </linearGradient>
      <linearGradient id="league-masters-crown" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFE94E" />
        <stop offset="100%" stopColor="#CCA800" />
      </linearGradient>
      <linearGradient id="league-masters-laurel" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#CE93D8" />
        <stop offset="100%" stopColor="#7B1FA2" />
      </linearGradient>
      <linearGradient id="league-masters-ribbon" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#7B1FA2" />
        <stop offset="100%" stopColor="#311B92" />
      </linearGradient>
    </defs>
    {/* Shield */}
    <path
      d="M32,4 L56,14 L56,34 Q56,50 32,60 Q8,50 8,34 L8,14 Z"
      fill="url(#league-masters-body)"
      stroke="url(#league-masters-border)"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Inner border */}
    <path
      d="M32,8 L52,16 L52,33 Q52,47 32,56 Q12,47 12,33 L12,16 Z"
      fill="none"
      stroke="#CE93D8"
      strokeWidth="1.5"
      strokeLinejoin="round"
      opacity="0.5"
    />
    {/* Shine overlay */}
    <path
      d="M32,4 L56,14 L56,34 Q56,50 32,60 Q8,50 8,34 L8,14 Z"
      fill="url(#league-masters-shine)"
    />
    {/* Left laurel branch */}
    <path d="M20,44 Q16,40 18,36" fill="none" stroke="url(#league-masters-laurel)" strokeWidth="1.5" strokeLinecap="round" />
    <ellipse cx="16" cy="38" rx="3" ry="1.5" transform="rotate(-30 16 38)" fill="#CE93D8" opacity="0.7" />
    <ellipse cx="17" cy="42" rx="3" ry="1.5" transform="rotate(-15 17 42)" fill="#CE93D8" opacity="0.7" />
    <path d="M18,36 Q14,32 16,28" fill="none" stroke="url(#league-masters-laurel)" strokeWidth="1.5" strokeLinecap="round" />
    <ellipse cx="14" cy="30" rx="3" ry="1.5" transform="rotate(-40 14 30)" fill="#CE93D8" opacity="0.6" />
    <ellipse cx="15" cy="34" rx="3" ry="1.5" transform="rotate(-20 15 34)" fill="#CE93D8" opacity="0.6" />
    {/* Right laurel branch */}
    <path d="M44,44 Q48,40 46,36" fill="none" stroke="url(#league-masters-laurel)" strokeWidth="1.5" strokeLinecap="round" />
    <ellipse cx="48" cy="38" rx="3" ry="1.5" transform="rotate(30 48 38)" fill="#CE93D8" opacity="0.7" />
    <ellipse cx="47" cy="42" rx="3" ry="1.5" transform="rotate(15 47 42)" fill="#CE93D8" opacity="0.7" />
    <path d="M46,36 Q50,32 48,28" fill="none" stroke="url(#league-masters-laurel)" strokeWidth="1.5" strokeLinecap="round" />
    <ellipse cx="50" cy="30" rx="3" ry="1.5" transform="rotate(40 50 30)" fill="#CE93D8" opacity="0.6" />
    <ellipse cx="49" cy="34" rx="3" ry="1.5" transform="rotate(20 49 34)" fill="#CE93D8" opacity="0.6" />
    {/* Crown */}
    <path
      d="M22,28 L24,18 L28,24 L32,14 L36,24 L40,18 L42,28 Z"
      fill="url(#league-masters-crown)"
      stroke="#8A6B00"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Crown base band */}
    <rect x="22" y="28" width="20" height="3.5" rx="1" fill="#FFD700" stroke="#8A6B00" strokeWidth="1" strokeLinejoin="round" />
    {/* Crown jewels */}
    <circle cx="28" cy="29.5" r="1.2" fill="#CE93D8" stroke="#8A6B00" strokeWidth="0.5" />
    <circle cx="32" cy="29.5" r="1.2" fill="#E040FB" stroke="#8A6B00" strokeWidth="0.5" />
    <circle cx="36" cy="29.5" r="1.2" fill="#CE93D8" stroke="#8A6B00" strokeWidth="0.5" />
    {/* Crown point gems */}
    <circle cx="24" cy="18" r="1.2" fill="#FFE94E" stroke="#8A6B00" strokeWidth="0.5" />
    <circle cx="32" cy="14" r="1.5" fill="#E040FB" stroke="#8A6B00" strokeWidth="0.5" />
    <circle cx="40" cy="18" r="1.2" fill="#FFE94E" stroke="#8A6B00" strokeWidth="0.5" />
    {/* Small star below crown */}
    <polygon
      points="32,35 33.5,38 37,38 34.5,40 35.5,43 32,41 28.5,43 29.5,40 27,38 30.5,38"
      fill="#FFE94E"
      stroke="#8A6B00"
      strokeWidth="0.8"
      strokeLinejoin="round"
    />
    {/* Rivets */}
    <circle cx="32" cy="9" r="1.5" fill="#CE93D8" stroke="#4A148C" strokeWidth="0.8" />
    <circle cx="18" cy="16" r="1.5" fill="#CE93D8" stroke="#4A148C" strokeWidth="0.8" />
    <circle cx="46" cy="16" r="1.5" fill="#CE93D8" stroke="#4A148C" strokeWidth="0.8" />
    <circle cx="20" cy="42" r="1" fill="#CE93D8" stroke="#4A148C" strokeWidth="0.5" />
    <circle cx="44" cy="42" r="1" fill="#CE93D8" stroke="#4A148C" strokeWidth="0.5" />
    {/* Bottom ribbon */}
    <path
      d="M18,48 L14,52 L20,50 L32,54 L44,50 L50,52 L46,48"
      fill="url(#league-masters-ribbon)"
      stroke="#311B92"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Crown glow */}
    <circle cx="32" cy="22" r="8" fill="#FFE94E" opacity="0.08" />
  </svg>
);
