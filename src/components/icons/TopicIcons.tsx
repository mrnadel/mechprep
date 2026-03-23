'use client';

interface IconProps {
  size?: number;
  className?: string;
}

/* ─────────────────────────────────────────────
   1. STATICS  — Balance scale with force arrows
   ───────────────────────────────────────────── */
export const StaticsIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="topic-statics-bg" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#E8F8D4" />
        <stop offset="100%" stopColor="#D0F0B0" />
      </linearGradient>
      <linearGradient id="topic-statics-main" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#6BDD1B" />
        <stop offset="100%" stopColor="#3B8700" />
      </linearGradient>
      <linearGradient id="topic-statics-beam" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#58CC02" />
        <stop offset="50%" stopColor="#6BDD1B" />
        <stop offset="100%" stopColor="#58CC02" />
      </linearGradient>
    </defs>
    {/* Background circle */}
    <circle cx="32" cy="32" r="30" fill="url(#topic-statics-bg)" stroke="#58CC02" strokeWidth="2" />
    {/* Fulcrum / support triangle */}
    <polygon points="32,42 26,52 38,52" fill="url(#topic-statics-main)" stroke="#3B8700" strokeWidth="2" strokeLinejoin="round" />
    {/* Ground line */}
    <line x1="20" y1="52" x2="44" y2="52" stroke="#3B8700" strokeWidth="2" strokeLinecap="round" />
    {/* Ground hatching */}
    <line x1="22" y1="52" x2="20" y2="55" stroke="#3B8700" strokeWidth="1" strokeLinecap="round" />
    <line x1="26" y1="52" x2="24" y2="55" stroke="#3B8700" strokeWidth="1" strokeLinecap="round" />
    <line x1="30" y1="52" x2="28" y2="55" stroke="#3B8700" strokeWidth="1" strokeLinecap="round" />
    <line x1="34" y1="52" x2="32" y2="55" stroke="#3B8700" strokeWidth="1" strokeLinecap="round" />
    <line x1="38" y1="52" x2="36" y2="55" stroke="#3B8700" strokeWidth="1" strokeLinecap="round" />
    <line x1="42" y1="52" x2="40" y2="55" stroke="#3B8700" strokeWidth="1" strokeLinecap="round" />
    {/* Pivot bolt */}
    <circle cx="32" cy="42" r="2.5" fill="#3B8700" stroke="#2A6200" strokeWidth="1" />
    <circle cx="32" cy="42" r="1" fill="#5DB800" />
    {/* Balance beam */}
    <rect x="10" y="29" width="44" height="4" rx="2" fill="url(#topic-statics-beam)" stroke="#3B8700" strokeWidth="2" strokeLinejoin="round" />
    {/* Left pan chain */}
    <line x1="15" y1="33" x2="15" y2="24" stroke="#3B8700" strokeWidth="1.5" strokeLinecap="round" />
    {/* Left pan */}
    <path d="M9,24 Q12,26 15,24 Q18,26 21,24" fill="none" stroke="#3B8700" strokeWidth="2" strokeLinecap="round" />
    <ellipse cx="15" cy="24" rx="6" ry="1.5" fill="#58CC02" opacity="0.4" />
    {/* Right pan chain */}
    <line x1="49" y1="33" x2="49" y2="24" stroke="#3B8700" strokeWidth="1.5" strokeLinecap="round" />
    {/* Right pan */}
    <path d="M43,24 Q46,26 49,24 Q52,26 55,24" fill="none" stroke="#3B8700" strokeWidth="2" strokeLinecap="round" />
    <ellipse cx="49" cy="24" rx="6" ry="1.5" fill="#58CC02" opacity="0.4" />
    {/* Left force arrow (downward) */}
    <line x1="15" y1="11" x2="15" y2="20" stroke="#FF4B4B" strokeWidth="2" strokeLinecap="round" />
    <polygon points="15,22 12,18 18,18" fill="#FF4B4B" />
    {/* Right force arrow (downward) */}
    <line x1="49" y1="11" x2="49" y2="20" stroke="#FF4B4B" strokeWidth="2" strokeLinecap="round" />
    <polygon points="49,22 46,18 52,18" fill="#FF4B4B" />
    {/* F labels */}
    <text x="10" y="12" fontSize="7" fontWeight="bold" fill="#FF4B4B" fontFamily="sans-serif">F</text>
    <text x="44" y="12" fontSize="7" fontWeight="bold" fill="#FF4B4B" fontFamily="sans-serif">F</text>
    {/* Rivet details on beam */}
    <circle cx="22" cy="31" r="1" fill="#2A6200" />
    <circle cx="42" cy="31" r="1" fill="#2A6200" />
  </svg>
);

/* ─────────────────────────────────────────────
   2. DYNAMICS — Spring-mass-damper system
   ───────────────────────────────────────────── */
export const DynamicsIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="topic-dynamics-bg" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#F3E6FF" />
        <stop offset="100%" stopColor="#E4D0FF" />
      </linearGradient>
      <linearGradient id="topic-dynamics-mass" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#DA9AFF" />
        <stop offset="100%" stopColor="#7B2FBE" />
      </linearGradient>
      <linearGradient id="topic-dynamics-spring" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#CE82FF" />
        <stop offset="100%" stopColor="#9B4DDB" />
      </linearGradient>
    </defs>
    {/* Background circle */}
    <circle cx="32" cy="32" r="30" fill="url(#topic-dynamics-bg)" stroke="#CE82FF" strokeWidth="2" />
    {/* Wall (left side) */}
    <rect x="8" y="14" width="4" height="36" rx="1" fill="#7B2FBE" stroke="#5A1F8E" strokeWidth="1.5" />
    {/* Wall hatching */}
    <line x1="8" y1="18" x2="6" y2="20" stroke="#7B2FBE" strokeWidth="1" strokeLinecap="round" />
    <line x1="8" y1="24" x2="6" y2="26" stroke="#7B2FBE" strokeWidth="1" strokeLinecap="round" />
    <line x1="8" y1="30" x2="6" y2="32" stroke="#7B2FBE" strokeWidth="1" strokeLinecap="round" />
    <line x1="8" y1="36" x2="6" y2="38" stroke="#7B2FBE" strokeWidth="1" strokeLinecap="round" />
    <line x1="8" y1="42" x2="6" y2="44" stroke="#7B2FBE" strokeWidth="1" strokeLinecap="round" />
    {/* Spring (zig-zag) — upper connection */}
    <polyline
      points="12,24 16,22 20,26 24,22 28,26 32,22 36,26 38,24"
      fill="none"
      stroke="url(#topic-dynamics-spring)"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Damper (lower connection) */}
    <line x1="12" y1="40" x2="22" y2="40" stroke="#9B4DDB" strokeWidth="2" strokeLinecap="round" />
    {/* Damper piston body */}
    <rect x="22" y="36" width="10" height="8" rx="1" fill="none" stroke="#9B4DDB" strokeWidth="2" strokeLinejoin="round" />
    {/* Damper piston rod */}
    <line x1="32" y1="40" x2="38" y2="40" stroke="#9B4DDB" strokeWidth="2" strokeLinecap="round" />
    {/* Damper fluid lines */}
    <line x1="24" y1="38" x2="24" y2="42" stroke="#CE82FF" strokeWidth="0.8" opacity="0.6" />
    <line x1="26" y1="37" x2="26" y2="43" stroke="#CE82FF" strokeWidth="0.8" opacity="0.6" />
    <line x1="28" y1="38" x2="28" y2="42" stroke="#CE82FF" strokeWidth="0.8" opacity="0.6" />
    {/* Mass block */}
    <rect x="38" y="20" width="14" height="24" rx="3" fill="url(#topic-dynamics-mass)" stroke="#5A1F8E" strokeWidth="2" strokeLinejoin="round" />
    {/* Mass label */}
    <text x="42" y="36" fontSize="10" fontWeight="bold" fill="white" fontFamily="sans-serif">m</text>
    {/* Mass bolts */}
    <circle cx="41" cy="24" r="1.2" fill="#5A1F8E" />
    <circle cx="49" cy="24" r="1.2" fill="#5A1F8E" />
    {/* Motion arrows (right) */}
    <line x1="55" y1="32" x2="59" y2="32" stroke="#FF4B4B" strokeWidth="2" strokeLinecap="round" />
    <polygon points="60,32 57,29 57,35" fill="#FF4B4B" />
    <line x1="55" y1="32" x2="51" y2="32" stroke="#FF4B4B" strokeWidth="0" />
    {/* Double-headed arrow for oscillation */}
    <line x1="55" y1="28" x2="55" y2="36" stroke="#CE82FF" strokeWidth="1" strokeDasharray="1.5 1.5" />
    {/* Floor */}
    <line x1="8" y1="50" x2="56" y2="50" stroke="#7B2FBE" strokeWidth="1.5" strokeLinecap="round" />
    {/* k and c labels */}
    <text x="20" y="19" fontSize="6" fontWeight="bold" fill="#7B2FBE" fontFamily="sans-serif">k</text>
    <text x="24" y="49" fontSize="6" fontWeight="bold" fill="#7B2FBE" fontFamily="sans-serif">c</text>
  </svg>
);

/* ─────────────────────────────────────────────
   3. STRENGTH — I-beam with stress distribution
   ───────────────────────────────────────────── */
export const StrengthIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="topic-strength-bg" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#FFF0DB" />
        <stop offset="100%" stopColor="#FFE4BC" />
      </linearGradient>
      <linearGradient id="topic-strength-beam" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFB740" />
        <stop offset="50%" stopColor="#FF9600" />
        <stop offset="100%" stopColor="#B56E00" />
      </linearGradient>
      <linearGradient id="topic-strength-stress" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FF4B4B" />
        <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#1CB0F6" />
      </linearGradient>
    </defs>
    {/* Background circle */}
    <circle cx="32" cy="32" r="30" fill="url(#topic-strength-bg)" stroke="#FF9600" strokeWidth="2" />
    {/* I-beam — top flange */}
    <rect x="12" y="16" width="40" height="5" rx="1" fill="url(#topic-strength-beam)" stroke="#B56E00" strokeWidth="2" strokeLinejoin="round" />
    {/* I-beam — web */}
    <rect x="27" y="21" width="10" height="22" fill="url(#topic-strength-beam)" stroke="#B56E00" strokeWidth="2" strokeLinejoin="round" />
    {/* I-beam — bottom flange */}
    <rect x="12" y="43" width="40" height="5" rx="1" fill="url(#topic-strength-beam)" stroke="#B56E00" strokeWidth="2" strokeLinejoin="round" />
    {/* Stress distribution — right side gradient overlay */}
    <path d="M54,18.5 L60,18.5 L56,32 L60,45.5 L54,45.5" fill="url(#topic-strength-stress)" opacity="0.5" stroke="none" />
    {/* Stress arrows — top (compression, red) */}
    <line x1="55" y1="18.5" x2="60" y2="18.5" stroke="#FF4B4B" strokeWidth="1.5" strokeLinecap="round" />
    <polygon points="61,18.5 58,16.5 58,20.5" fill="#FF4B4B" />
    {/* Stress arrows — bottom (tension, blue) */}
    <line x1="55" y1="45.5" x2="60" y2="45.5" stroke="#1CB0F6" strokeWidth="1.5" strokeLinecap="round" />
    <polygon points="61,45.5 58,43.5 58,47.5" fill="#1CB0F6" />
    {/* Neutral axis dashed line */}
    <line x1="12" y1="32" x2="52" y2="32" stroke="#B56E00" strokeWidth="1" strokeDasharray="3 2" strokeLinecap="round" />
    {/* N.A. label */}
    <text x="5" y="34" fontSize="5" fill="#B56E00" fontWeight="bold" fontFamily="sans-serif">NA</text>
    {/* Load arrow (top, center downward) */}
    <line x1="32" y1="6" x2="32" y2="14" stroke="#FF4B4B" strokeWidth="2.5" strokeLinecap="round" />
    <polygon points="32,16 28.5,12 35.5,12" fill="#FF4B4B" />
    <text x="35" y="10" fontSize="6" fontWeight="bold" fill="#FF4B4B" fontFamily="sans-serif">P</text>
    {/* Rivet details on flanges */}
    <circle cx="16" cy="18.5" r="1" fill="#B56E00" />
    <circle cx="48" cy="18.5" r="1" fill="#B56E00" />
    <circle cx="16" cy="45.5" r="1" fill="#B56E00" />
    <circle cx="48" cy="45.5" r="1" fill="#B56E00" />
    {/* Sigma symbol */}
    <text x="55" y="34" fontSize="8" fontWeight="bold" fill="#B56E00" fontFamily="serif" opacity="0.7">σ</text>
  </svg>
);

/* ─────────────────────────────────────────────
   4. THERMO — Piston-cylinder with heat flow
   ───────────────────────────────────────────── */
export const ThermoIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="topic-thermo-bg" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#DDF4FF" />
        <stop offset="100%" stopColor="#C0ECFF" />
      </linearGradient>
      <linearGradient id="topic-thermo-cyl" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#A0A0A0" />
        <stop offset="30%" stopColor="#D0D0D0" />
        <stop offset="70%" stopColor="#E8E8E8" />
        <stop offset="100%" stopColor="#A0A0A0" />
      </linearGradient>
      <linearGradient id="topic-thermo-piston" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#808080" />
        <stop offset="50%" stopColor="#C0C0C0" />
        <stop offset="100%" stopColor="#808080" />
      </linearGradient>
      <radialGradient id="topic-thermo-heat" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor="#FF6B6B" />
        <stop offset="100%" stopColor="#FF4B4B" stopOpacity="0" />
      </radialGradient>
    </defs>
    {/* Background circle */}
    <circle cx="32" cy="32" r="30" fill="url(#topic-thermo-bg)" stroke="#1CB0F6" strokeWidth="2" />
    {/* Cylinder body */}
    <rect x="16" y="22" width="32" height="30" rx="2" fill="url(#topic-thermo-cyl)" stroke="#555" strokeWidth="2" strokeLinejoin="round" />
    {/* Cylinder inner cavity */}
    <rect x="19" y="30" width="26" height="19" fill="#FFF0DB" stroke="#888" strokeWidth="1" />
    {/* Gas molecules */}
    <circle cx="24" cy="36" r="1.5" fill="#FF6B6B" opacity="0.7" />
    <circle cx="30" cy="40" r="1.5" fill="#FF6B6B" opacity="0.7" />
    <circle cx="36" cy="35" r="1.5" fill="#FF6B6B" opacity="0.7" />
    <circle cx="40" cy="42" r="1.5" fill="#FF6B6B" opacity="0.7" />
    <circle cx="27" cy="44" r="1.5" fill="#FF6B6B" opacity="0.7" />
    <circle cx="34" cy="46" r="1.5" fill="#FF6B6B" opacity="0.7" />
    {/* Piston head */}
    <rect x="19" y="26" width="26" height="5" rx="1" fill="url(#topic-thermo-piston)" stroke="#555" strokeWidth="1.5" strokeLinejoin="round" />
    {/* Piston rod */}
    <rect x="29" y="14" width="6" height="13" rx="1" fill="url(#topic-thermo-piston)" stroke="#555" strokeWidth="1.5" strokeLinejoin="round" />
    {/* Piston bolt */}
    <circle cx="32" cy="28.5" r="1.5" fill="#555" />
    <circle cx="32" cy="28.5" r="0.6" fill="#999" />
    {/* Motion arrow (up) */}
    <line x1="32" y1="12" x2="32" y2="6" stroke="#1CB0F6" strokeWidth="2" strokeLinecap="round" />
    <polygon points="32,4 29,8 35,8" fill="#1CB0F6" />
    {/* Heat flow arrow — hot (left, red) */}
    <path d="M8,40 Q10,38 12,40 Q10,42 8,40" fill="#FF4B4B" opacity="0.8" />
    <line x1="8" y1="40" x2="15" y2="40" stroke="#FF4B4B" strokeWidth="2" strokeLinecap="round" />
    <polygon points="16,40 13,37.5 13,42.5" fill="#FF4B4B" />
    <text x="4" y="37" fontSize="5" fill="#FF4B4B" fontWeight="bold" fontFamily="sans-serif">Q</text>
    {/* Cold arrow — right, blue (heat rejection) */}
    <line x1="49" y1="40" x2="56" y2="40" stroke="#1CB0F6" strokeWidth="2" strokeLinecap="round" />
    <polygon points="57,40 54,37.5 54,42.5" fill="#1CB0F6" />
    <text x="54" y="37" fontSize="5" fill="#1CB0F6" fontWeight="bold" fontFamily="sans-serif">Q</text>
    {/* Work arrow label */}
    <text x="36" y="8" fontSize="5" fill="#1CB0F6" fontWeight="bold" fontFamily="sans-serif">W</text>
    {/* Cylinder bolts */}
    <circle cx="18" cy="24" r="1.2" fill="#444" />
    <circle cx="46" cy="24" r="1.2" fill="#444" />
    <circle cx="18" cy="50" r="1.2" fill="#444" />
    <circle cx="46" cy="50" r="1.2" fill="#444" />
  </svg>
);

/* ─────────────────────────────────────────────
   5. HEAT TRANSFER — Conduction/Convection/Radiation
   ───────────────────────────────────────────── */
export const HeatTransferIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="topic-heat-bg" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#FFE5E5" />
        <stop offset="100%" stopColor="#FFD0D0" />
      </linearGradient>
      <linearGradient id="topic-heat-hot" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#FF4B4B" />
        <stop offset="100%" stopColor="#FF8080" />
      </linearGradient>
      <linearGradient id="topic-heat-cold" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#80C0FF" />
        <stop offset="100%" stopColor="#1CB0F6" />
      </linearGradient>
      <linearGradient id="topic-heat-wall" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#FF8080" />
        <stop offset="50%" stopColor="#CC88CC" />
        <stop offset="100%" stopColor="#80C0FF" />
      </linearGradient>
    </defs>
    {/* Background circle */}
    <circle cx="32" cy="32" r="30" fill="url(#topic-heat-bg)" stroke="#FF4B4B" strokeWidth="2" />
    {/* Hot surface (left) */}
    <rect x="8" y="14" width="8" height="36" rx="2" fill="url(#topic-heat-hot)" stroke="#EA3535" strokeWidth="2" strokeLinejoin="round" />
    <text x="9.5" y="34" fontSize="6" fill="white" fontWeight="bold" fontFamily="sans-serif">T₁</text>
    {/* Cold surface (right) */}
    <rect x="48" y="14" width="8" height="36" rx="2" fill="url(#topic-heat-cold)" stroke="#1899D6" strokeWidth="2" strokeLinejoin="round" />
    <text x="49" y="34" fontSize="6" fill="white" fontWeight="bold" fontFamily="sans-serif">T₂</text>
    {/* Wall / conduction medium */}
    <rect x="24" y="14" width="16" height="36" rx="1" fill="url(#topic-heat-wall)" stroke="#999" strokeWidth="1.5" strokeLinejoin="round" />
    {/* Conduction arrows (straight through wall) */}
    <line x1="16" y1="22" x2="24" y2="22" stroke="#EA3535" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="40" y1="22" x2="48" y2="22" stroke="#1899D6" strokeWidth="1.5" strokeLinecap="round" />
    <polygon points="24,22 21,20 21,24" fill="#EA3535" />
    <polygon points="48,22 45,20 45,24" fill="#1899D6" />
    {/* Convection waves (wavy lines left side) */}
    <path d="M17,30 Q19,28 17,26" fill="none" stroke="#FF6B6B" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M19,30 Q21,28 19,26" fill="none" stroke="#FF6B6B" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M21,30 Q23,28 21,26" fill="none" stroke="#FF6B6B" strokeWidth="1.5" strokeLinecap="round" />
    {/* Convection waves (right side) */}
    <path d="M41,30 Q43,28 41,26" fill="none" stroke="#80C0FF" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M43,30 Q45,28 43,26" fill="none" stroke="#80C0FF" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M45,30 Q47,28 45,26" fill="none" stroke="#80C0FF" strokeWidth="1.5" strokeLinecap="round" />
    {/* Radiation waves (sinusoidal, bottom area) */}
    <path d="M17,38 Q21,36 25,38 Q29,40 33,38 Q37,36 41,38 Q45,40 48,38" fill="none" stroke="#FF4B4B" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 2" />
    <path d="M17,42 Q21,40 25,42 Q29,44 33,42 Q37,40 41,42 Q45,44 48,42" fill="none" stroke="#FF6B6B" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 2" />
    {/* Radiation symbol ~ */}
    <text x="30" y="48" fontSize="6" fill="#EA3535" fontWeight="bold" fontFamily="serif" opacity="0.8">~</text>
    {/* Temperature gradient indicators */}
    <circle cx="11" cy="18" r="1.5" fill="#FFD700" opacity="0.8" />
    <circle cx="11" cy="46" r="1.5" fill="#FFD700" opacity="0.8" />
    {/* Wall hatching */}
    <line x1="26" y1="16" x2="28" y2="20" stroke="#777" strokeWidth="0.5" opacity="0.4" />
    <line x1="30" y1="16" x2="32" y2="20" stroke="#777" strokeWidth="0.5" opacity="0.4" />
    <line x1="34" y1="16" x2="36" y2="20" stroke="#777" strokeWidth="0.5" opacity="0.4" />
    <line x1="26" y1="44" x2="28" y2="48" stroke="#777" strokeWidth="0.5" opacity="0.4" />
    <line x1="30" y1="44" x2="32" y2="48" stroke="#777" strokeWidth="0.5" opacity="0.4" />
    <line x1="34" y1="44" x2="36" y2="48" stroke="#777" strokeWidth="0.5" opacity="0.4" />
  </svg>
);

/* ─────────────────────────────────────────────
   6. FLUIDS — Venturi pipe with streamlines
   ───────────────────────────────────────────── */
export const FluidsIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="topic-fluids-bg" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#E0F8F3" />
        <stop offset="100%" stopColor="#C0F0E8" />
      </linearGradient>
      <linearGradient id="topic-fluids-pipe" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#B0B0B0" />
        <stop offset="50%" stopColor="#D8D8D8" />
        <stop offset="100%" stopColor="#A0A0A0" />
      </linearGradient>
      <linearGradient id="topic-fluids-water" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#2EC4B6" />
        <stop offset="50%" stopColor="#3DD8CA" />
        <stop offset="100%" stopColor="#2EC4B6" />
      </linearGradient>
    </defs>
    {/* Background circle */}
    <circle cx="32" cy="32" r="30" fill="url(#topic-fluids-bg)" stroke="#2EC4B6" strokeWidth="2" />
    {/* Pipe — top wall (venturi shape) */}
    <path d="M6,20 L20,20 Q28,20 32,24 Q36,20 44,20 L58,20" fill="none" stroke="url(#topic-fluids-pipe)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    {/* Pipe — bottom wall (venturi shape) */}
    <path d="M6,44 L20,44 Q28,44 32,40 Q36,44 44,44 L58,44" fill="none" stroke="url(#topic-fluids-pipe)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    {/* Fluid fill inside pipe */}
    <path d="M6,20 L20,20 Q28,20 32,24 Q36,20 44,20 L58,20 L58,44 L44,44 Q36,44 32,40 Q28,44 20,44 L6,44 Z" fill="url(#topic-fluids-water)" opacity="0.25" />
    {/* Flow streamlines */}
    <path d="M8,28 Q20,28 32,32 Q44,28 56,28" fill="none" stroke="#2EC4B6" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8,32 Q20,32 32,32 Q44,32 56,32" fill="none" stroke="#1A8A7E" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8,36 Q20,36 32,32 Q44,36 56,36" fill="none" stroke="#2EC4B6" strokeWidth="1.5" strokeLinecap="round" />
    {/* Velocity arrows at throat (faster = longer) */}
    <line x1="28" y1="32" x2="36" y2="32" stroke="#1A8A7E" strokeWidth="2" strokeLinecap="round" />
    <polygon points="37,32 34,29.5 34,34.5" fill="#1A8A7E" />
    {/* Velocity arrows at inlet (slower = shorter) */}
    <line x1="8" y1="32" x2="12" y2="32" stroke="#2EC4B6" strokeWidth="1.5" strokeLinecap="round" />
    <polygon points="13,32 10.5,30 10.5,34" fill="#2EC4B6" />
    {/* Pressure arrows — high (inlet, downward) */}
    <line x1="14" y1="10" x2="14" y2="18" stroke="#FF4B4B" strokeWidth="1.5" strokeLinecap="round" />
    <polygon points="14,19 11.5,16 16.5,16" fill="#FF4B4B" />
    <text x="10" y="10" fontSize="5" fill="#FF4B4B" fontWeight="bold" fontFamily="sans-serif">P₁</text>
    {/* Pressure arrows — low (throat, shorter) */}
    <line x1="32" y1="14" x2="32" y2="22" stroke="#FF8080" strokeWidth="1.5" strokeLinecap="round" />
    <polygon points="32,23 29.5,20 34.5,20" fill="#FF8080" />
    <text x="34" y="14" fontSize="5" fill="#FF8080" fontWeight="bold" fontFamily="sans-serif">P₂</text>
    {/* Pipe wall rivets */}
    <circle cx="10" cy="20" r="1" fill="#888" />
    <circle cx="54" cy="20" r="1" fill="#888" />
    <circle cx="10" cy="44" r="1" fill="#888" />
    <circle cx="54" cy="44" r="1" fill="#888" />
    {/* Pipe wall thickness indicators */}
    <line x1="6" y1="18" x2="6" y2="20" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="6" y1="44" x2="6" y2="46" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="58" y1="18" x2="58" y2="20" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="58" y1="44" x2="58" y2="46" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/* ─────────────────────────────────────────────
   7. MATERIALS — Crystal lattice with atomic bonds
   ───────────────────────────────────────────── */
export const MaterialsIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="topic-materials-bg" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#FFE8F5" />
        <stop offset="100%" stopColor="#FFD4EC" />
      </linearGradient>
      <radialGradient id="topic-materials-atom" cx="0.35" cy="0.35" r="0.65">
        <stop offset="0%" stopColor="#FFB0E0" />
        <stop offset="60%" stopColor="#FF86D0" />
        <stop offset="100%" stopColor="#CC5FA0" />
      </radialGradient>
      <radialGradient id="topic-materials-atom2" cx="0.35" cy="0.35" r="0.65">
        <stop offset="0%" stopColor="#FFD0F0" />
        <stop offset="60%" stopColor="#FF86D0" />
        <stop offset="100%" stopColor="#AA4080" />
      </radialGradient>
    </defs>
    {/* Background circle */}
    <circle cx="32" cy="32" r="30" fill="url(#topic-materials-bg)" stroke="#FF86D0" strokeWidth="2" />
    {/* Grain boundary (subtle line) */}
    <path d="M10,48 Q20,36 28,40 Q38,46 50,30 Q56,22 58,16" fill="none" stroke="#CC5FA0" strokeWidth="1" strokeDasharray="3 2" opacity="0.5" />
    {/* Crystal lattice bonds — front face */}
    <line x1="20" y1="18" x2="44" y2="18" stroke="#CC5FA0" strokeWidth="2" strokeLinecap="round" />
    <line x1="20" y1="42" x2="44" y2="42" stroke="#CC5FA0" strokeWidth="2" strokeLinecap="round" />
    <line x1="20" y1="18" x2="20" y2="42" stroke="#CC5FA0" strokeWidth="2" strokeLinecap="round" />
    <line x1="44" y1="18" x2="44" y2="42" stroke="#CC5FA0" strokeWidth="2" strokeLinecap="round" />
    {/* Cross bonds */}
    <line x1="20" y1="18" x2="44" y2="42" stroke="#CC5FA0" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    <line x1="44" y1="18" x2="20" y2="42" stroke="#CC5FA0" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    {/* Depth bonds (3D effect) */}
    <line x1="20" y1="18" x2="12" y2="12" stroke="#CC5FA0" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <line x1="44" y1="18" x2="52" y2="12" stroke="#CC5FA0" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <line x1="20" y1="42" x2="12" y2="48" stroke="#CC5FA0" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <line x1="44" y1="42" x2="52" y2="48" stroke="#CC5FA0" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    {/* Back face bonds */}
    <line x1="12" y1="12" x2="52" y2="12" stroke="#CC5FA0" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
    <line x1="12" y1="48" x2="52" y2="48" stroke="#CC5FA0" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
    <line x1="12" y1="12" x2="12" y2="48" stroke="#CC5FA0" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
    <line x1="52" y1="12" x2="52" y2="48" stroke="#CC5FA0" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
    {/* Center atom (body center) */}
    <circle cx="32" cy="30" r="5" fill="url(#topic-materials-atom)" stroke="#CC5FA0" strokeWidth="1.5" />
    <circle cx="30" cy="28" r="1.5" fill="white" opacity="0.5" />
    {/* Corner atoms — front face */}
    <circle cx="20" cy="18" r="4" fill="url(#topic-materials-atom2)" stroke="#CC5FA0" strokeWidth="1.5" />
    <circle cx="44" cy="18" r="4" fill="url(#topic-materials-atom2)" stroke="#CC5FA0" strokeWidth="1.5" />
    <circle cx="20" cy="42" r="4" fill="url(#topic-materials-atom2)" stroke="#CC5FA0" strokeWidth="1.5" />
    <circle cx="44" cy="42" r="4" fill="url(#topic-materials-atom2)" stroke="#CC5FA0" strokeWidth="1.5" />
    {/* Corner atoms — back face (smaller, receding) */}
    <circle cx="12" cy="12" r="2.5" fill="url(#topic-materials-atom2)" stroke="#CC5FA0" strokeWidth="1" opacity="0.5" />
    <circle cx="52" cy="12" r="2.5" fill="url(#topic-materials-atom2)" stroke="#CC5FA0" strokeWidth="1" opacity="0.5" />
    <circle cx="12" cy="48" r="2.5" fill="url(#topic-materials-atom2)" stroke="#CC5FA0" strokeWidth="1" opacity="0.5" />
    <circle cx="52" cy="48" r="2.5" fill="url(#topic-materials-atom2)" stroke="#CC5FA0" strokeWidth="1" opacity="0.5" />
    {/* Highlight reflections on front atoms */}
    <circle cx="18.5" cy="16.5" r="1.2" fill="white" opacity="0.4" />
    <circle cx="42.5" cy="16.5" r="1.2" fill="white" opacity="0.4" />
  </svg>
);

/* ─────────────────────────────────────────────
   8. MACHINE ELEMENTS — Meshing gears
   ───────────────────────────────────────────── */
export const MachineElementsIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="topic-machine-bg" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#FFF5D4" />
        <stop offset="100%" stopColor="#FFE9A0" />
      </linearGradient>
      <linearGradient id="topic-machine-gear1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFD840" />
        <stop offset="100%" stopColor="#CC9F00" />
      </linearGradient>
      <linearGradient id="topic-machine-gear2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFE680" />
        <stop offset="100%" stopColor="#CCA800" />
      </linearGradient>
    </defs>
    {/* Background circle */}
    <circle cx="32" cy="32" r="30" fill="url(#topic-machine-bg)" stroke="#FFC800" strokeWidth="2" />
    {/* Large gear (left) — 10 teeth */}
    <path
      d="M24,8 L26,12 L29,11 L30,7 L26,6 Z
         M14,12 L16,16 L19,14 L18,10 L14,11 Z
         M8,20 L12,22 L13,19 L9,17 L8,19 Z
         M6,30 L10,30 L10,27 L6,26 L6,29 Z
         M8,40 L12,38 L11,35 L7,36 L8,39 Z
         M14,48 L17,44 L14,43 L12,46 L13,48 Z
         M24,52 L24,48 L21,48 L20,52 L23,53 Z
         M34,50 L31,47 L29,49 L31,53 L34,52 Z
         M38,42 L35,40 L33,42 L36,45 L38,44 Z
         M40,34 L36,33 L36,36 L40,36 L40,35 Z"
      fill="url(#topic-machine-gear1)"
      stroke="#CC9F00"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Large gear body */}
    <circle cx="23" cy="30" r="13" fill="url(#topic-machine-gear1)" stroke="#CC9F00" strokeWidth="2" />
    {/* Large gear inner ring */}
    <circle cx="23" cy="30" r="9" fill="#FFF5D4" stroke="#CC9F00" strokeWidth="1.5" />
    {/* Large gear spokes */}
    <line x1="23" y1="21" x2="23" y2="39" stroke="#CC9F00" strokeWidth="2" strokeLinecap="round" />
    <line x1="14" y1="30" x2="32" y2="30" stroke="#CC9F00" strokeWidth="2" strokeLinecap="round" />
    <line x1="16.5" y1="23.5" x2="29.5" y2="36.5" stroke="#CC9F00" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="29.5" y1="23.5" x2="16.5" y2="36.5" stroke="#CC9F00" strokeWidth="1.5" strokeLinecap="round" />
    {/* Large gear hub */}
    <circle cx="23" cy="30" r="4" fill="url(#topic-machine-gear1)" stroke="#CC9F00" strokeWidth="1.5" />
    <circle cx="23" cy="30" r="2" fill="#CC9F00" />
    <circle cx="23" cy="30" r="0.8" fill="#FFD840" />
    {/* Small gear (right) — 7 teeth */}
    <path
      d="M47,16 L48,19 L51,18 L50,15 L48,15 Z
         M53,20 L52,23 L55,24 L56,21 L54,20 Z
         M55,28 L53,30 L55,32 L57,31 L57,29 Z
         M53,36 L52,34 L49,36 L51,38 L53,37 Z
         M47,40 L48,37 L45,37 L44,40 L46,40 Z
         M41,36 L43,34 L41,32 L39,33 L39,35 Z
         M41,22 L42,25 L44,23 L43,20 L41,21 Z"
      fill="url(#topic-machine-gear2)"
      stroke="#CCA800"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Small gear body */}
    <circle cx="47" cy="28" r="9" fill="url(#topic-machine-gear2)" stroke="#CCA800" strokeWidth="2" />
    {/* Small gear inner ring */}
    <circle cx="47" cy="28" r="6" fill="#FFF5D4" stroke="#CCA800" strokeWidth="1.5" />
    {/* Small gear spokes */}
    <line x1="47" y1="22" x2="47" y2="34" stroke="#CCA800" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="41" y1="28" x2="53" y2="28" stroke="#CCA800" strokeWidth="1.5" strokeLinecap="round" />
    {/* Small gear hub */}
    <circle cx="47" cy="28" r="2.5" fill="url(#topic-machine-gear2)" stroke="#CCA800" strokeWidth="1.5" />
    <circle cx="47" cy="28" r="1.2" fill="#CCA800" />
    {/* Rotation arrows */}
    <path d="M8,14 A15,15 0 0,1 20,8" fill="none" stroke="#CC9F00" strokeWidth="1.5" strokeLinecap="round" />
    <polygon points="20,8 16,7 17,11" fill="#CC9F00" />
    <path d="M56,18 A8,8 0 0,0 50,14" fill="none" stroke="#CCA800" strokeWidth="1.5" strokeLinecap="round" />
    <polygon points="50,14 53,12 54,16" fill="#CCA800" />
    {/* Meshing point indicator */}
    <circle cx="36" cy="30" r="1.5" fill="#CC9F00" opacity="0.6" />
    {/* Oil drop */}
    <path d="M36,46 Q38,42 40,46 Q38,49 36,46" fill="#FFC800" stroke="#CC9F00" strokeWidth="1" opacity="0.6" />
  </svg>
);

/* ─────────────────────────────────────────────
   9. GDT — Feature control frame
   ───────────────────────────────────────────── */
export const GDTIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="topic-gdt-bg" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#EDEAFF" />
        <stop offset="100%" stopColor="#DAD4FF" />
      </linearGradient>
      <linearGradient id="topic-gdt-frame" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#8E7CF8" />
        <stop offset="100%" stopColor="#5C49CE" />
      </linearGradient>
    </defs>
    {/* Background circle */}
    <circle cx="32" cy="32" r="30" fill="url(#topic-gdt-bg)" stroke="#7B68EE" strokeWidth="2" />
    {/* Feature control frame — outer box */}
    <rect x="6" y="22" width="52" height="12" rx="1" fill="white" stroke="url(#topic-gdt-frame)" strokeWidth="2" strokeLinejoin="round" />
    {/* Dividers */}
    <line x1="20" y1="22" x2="20" y2="34" stroke="#7B68EE" strokeWidth="2" />
    <line x1="36" y1="22" x2="36" y2="34" stroke="#7B68EE" strokeWidth="2" />
    <line x1="46" y1="22" x2="46" y2="34" stroke="#7B68EE" strokeWidth="2" />
    {/* Position symbol (crosshairs in circle) */}
    <circle cx="13" cy="28" r="4" fill="none" stroke="#5C49CE" strokeWidth="1.5" />
    <line x1="13" y1="24" x2="13" y2="32" stroke="#5C49CE" strokeWidth="1" strokeLinecap="round" />
    <line x1="9" y1="28" x2="17" y2="28" stroke="#5C49CE" strokeWidth="1" strokeLinecap="round" />
    {/* Tolerance value */}
    <text x="22" y="30.5" fontSize="7" fontWeight="bold" fill="#5C49CE" fontFamily="sans-serif">0.05</text>
    {/* Datum A */}
    <text x="38.5" y="30.5" fontSize="8" fontWeight="bold" fill="#5C49CE" fontFamily="sans-serif">A</text>
    {/* Datum B */}
    <text x="48.5" y="30.5" fontSize="8" fontWeight="bold" fill="#5C49CE" fontFamily="sans-serif">B</text>
    {/* Dimension lines (above) */}
    <line x1="14" y1="14" x2="50" y2="14" stroke="#7B68EE" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="14" y1="12" x2="14" y2="16" stroke="#7B68EE" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="50" y1="12" x2="50" y2="16" stroke="#7B68EE" strokeWidth="1.5" strokeLinecap="round" />
    {/* Dimension arrows */}
    <polygon points="14,14 18,12.5 18,15.5" fill="#7B68EE" />
    <polygon points="50,14 46,12.5 46,15.5" fill="#7B68EE" />
    {/* Dimension text */}
    <text x="26" y="13" fontSize="6" fill="#5C49CE" fontWeight="bold" fontFamily="sans-serif">25.00</text>
    {/* Datum triangle A */}
    <polygon points="14,38 11,44 17,44" fill="url(#topic-gdt-frame)" stroke="#5C49CE" strokeWidth="1.5" strokeLinejoin="round" />
    <line x1="14" y1="34" x2="14" y2="38" stroke="#7B68EE" strokeWidth="1.5" strokeLinecap="round" />
    <text x="12" y="49" fontSize="6" fontWeight="bold" fill="#5C49CE" fontFamily="sans-serif">A</text>
    {/* Datum triangle B */}
    <polygon points="42,38 39,44 45,44" fill="url(#topic-gdt-frame)" stroke="#5C49CE" strokeWidth="1.5" strokeLinejoin="round" />
    <line x1="42" y1="34" x2="42" y2="38" stroke="#7B68EE" strokeWidth="1.5" strokeLinecap="round" />
    <text x="40" y="49" fontSize="6" fontWeight="bold" fill="#5C49CE" fontFamily="sans-serif">B</text>
    {/* Extension lines below */}
    <line x1="14" y1="44" x2="14" y2="56" stroke="#7B68EE" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
    <line x1="42" y1="44" x2="42" y2="56" stroke="#7B68EE" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
    {/* Diameter symbol */}
    <text x="21.5" y="30.5" fontSize="7" fill="#5C49CE" fontFamily="sans-serif">⌀</text>
    {/* Small bolt details */}
    <circle cx="8" cy="18" r="1" fill="#5C49CE" opacity="0.4" />
    <circle cx="56" cy="18" r="1" fill="#5C49CE" opacity="0.4" />
  </svg>
);

/* ─────────────────────────────────────────────
   10. VIBRATIONS — Sine wave with damped oscillation
   ───────────────────────────────────────────── */
export const VibrationsIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="topic-vib-bg" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#E8F8D4" />
        <stop offset="100%" stopColor="#D4F0C0" />
      </linearGradient>
      <linearGradient id="topic-vib-wave" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#58CC02" />
        <stop offset="100%" stopColor="#3B8700" stopOpacity="0.3" />
      </linearGradient>
    </defs>
    {/* Background circle */}
    <circle cx="32" cy="32" r="30" fill="url(#topic-vib-bg)" stroke="#58CC02" strokeWidth="2" />
    {/* Axes */}
    <line x1="8" y1="32" x2="58" y2="32" stroke="#3B8700" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="10" y1="10" x2="10" y2="54" stroke="#3B8700" strokeWidth="1.5" strokeLinecap="round" />
    {/* Axis arrows */}
    <polygon points="58,32 55,30 55,34" fill="#3B8700" />
    <polygon points="10,10 8,13 12,13" fill="#3B8700" />
    {/* Axis labels */}
    <text x="55" y="40" fontSize="5" fill="#3B8700" fontWeight="bold" fontFamily="sans-serif">t</text>
    <text x="4" y="14" fontSize="5" fill="#3B8700" fontWeight="bold" fontFamily="sans-serif">x</text>
    {/* Damped sine wave — large amplitude decaying */}
    <path
      d="M10,32 Q14,12 18,32 Q22,52 26,32 Q29,18 32,32 Q35,44 38,32 Q40,24 42,32 Q44,38 46,32 Q47,28 48,32 Q49,34 50,32 Q51,31 52,32"
      fill="none"
      stroke="url(#topic-vib-wave)"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Envelope (decay curves) */}
    <path d="M10,12 Q30,20 52,32" fill="none" stroke="#58CC02" strokeWidth="1" strokeDasharray="3 2" opacity="0.5" />
    <path d="M10,52 Q30,44 52,32" fill="none" stroke="#58CC02" strokeWidth="1" strokeDasharray="3 2" opacity="0.5" />
    {/* Amplitude markers */}
    <line x1="14" y1="14" x2="14" y2="32" stroke="#FF4B4B" strokeWidth="1" strokeDasharray="2 1" />
    <text x="15" y="18" fontSize="5" fill="#FF4B4B" fontWeight="bold" fontFamily="sans-serif">A</text>
    {/* Period marker */}
    <line x1="10" y1="50" x2="26" y2="50" stroke="#3B8700" strokeWidth="1" strokeLinecap="round" />
    <line x1="10" y1="48" x2="10" y2="52" stroke="#3B8700" strokeWidth="1" strokeLinecap="round" />
    <line x1="26" y1="48" x2="26" y2="52" stroke="#3B8700" strokeWidth="1" strokeLinecap="round" />
    <polygon points="10,50 13,48.5 13,51.5" fill="#3B8700" />
    <polygon points="26,50 23,48.5 23,51.5" fill="#3B8700" />
    <text x="14" y="56" fontSize="5" fill="#3B8700" fontWeight="bold" fontFamily="sans-serif">T</text>
    {/* Frequency notation */}
    <text x="38" y="22" fontSize="5" fill="#3B8700" fontWeight="bold" fontFamily="serif" opacity="0.6">ζ&lt;1</text>
    {/* Grid dots for reference */}
    <circle cx="18" cy="32" r="1.5" fill="#58CC02" />
    <circle cx="26" cy="32" r="1.5" fill="#58CC02" />
    <circle cx="32" cy="32" r="1.5" fill="#58CC02" />
  </svg>
);

/* ─────────────────────────────────────────────
   11. MECHANISMS — Four-bar linkage
   ───────────────────────────────────────────── */
export const MechanismsIcon = ({ size = 64, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="topic-mech-bg" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#D8F5EC" />
        <stop offset="100%" stopColor="#C0EEE0" />
      </linearGradient>
      <linearGradient id="topic-mech-link" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#00E8AE" />
        <stop offset="100%" stopColor="#009A74" />
      </linearGradient>
    </defs>
    {/* Background circle */}
    <circle cx="32" cy="32" r="30" fill="url(#topic-mech-bg)" stroke="#00CD9C" strokeWidth="2" />
    {/* Ground link (fixed frame) */}
    <line x1="14" y1="44" x2="50" y2="44" stroke="#009A74" strokeWidth="2.5" strokeLinecap="round" />
    {/* Ground hatching */}
    <line x1="16" y1="44" x2="13" y2="48" stroke="#009A74" strokeWidth="1" strokeLinecap="round" />
    <line x1="22" y1="44" x2="19" y2="48" stroke="#009A74" strokeWidth="1" strokeLinecap="round" />
    <line x1="28" y1="44" x2="25" y2="48" stroke="#009A74" strokeWidth="1" strokeLinecap="round" />
    <line x1="34" y1="44" x2="31" y2="48" stroke="#009A74" strokeWidth="1" strokeLinecap="round" />
    <line x1="40" y1="44" x2="37" y2="48" stroke="#009A74" strokeWidth="1" strokeLinecap="round" />
    <line x1="46" y1="44" x2="43" y2="48" stroke="#009A74" strokeWidth="1" strokeLinecap="round" />
    {/* Link 1 — crank (input, shorter) */}
    <line x1="18" y1="44" x2="22" y2="24" stroke="url(#topic-mech-link)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    {/* Link 2 — coupler (connecting link) */}
    <line x1="22" y1="24" x2="46" y2="20" stroke="url(#topic-mech-link)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    {/* Link 3 — follower (output) */}
    <line x1="46" y1="20" x2="46" y2="44" stroke="url(#topic-mech-link)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    {/* Pivot joints */}
    {/* Ground pivot A (crank) */}
    <circle cx="18" cy="44" r="4" fill="#D8F5EC" stroke="#009A74" strokeWidth="2" />
    <circle cx="18" cy="44" r="1.5" fill="#009A74" />
    {/* Ground pivot D (follower) */}
    <circle cx="46" cy="44" r="4" fill="#D8F5EC" stroke="#009A74" strokeWidth="2" />
    <circle cx="46" cy="44" r="1.5" fill="#009A74" />
    {/* Moving pivot B */}
    <circle cx="22" cy="24" r="3.5" fill="#D8F5EC" stroke="#00CD9C" strokeWidth="2" />
    <circle cx="22" cy="24" r="1.5" fill="#00CD9C" />
    {/* Moving pivot C */}
    <circle cx="46" cy="20" r="3.5" fill="#D8F5EC" stroke="#00CD9C" strokeWidth="2" />
    <circle cx="46" cy="20" r="1.5" fill="#00CD9C" />
    {/* Rotation arrow at crank */}
    <path d="M10,38 A10,10 0 0,1 14,30" fill="none" stroke="#00CD9C" strokeWidth="1.5" strokeLinecap="round" />
    <polygon points="14,30 10,30 12,34" fill="#00CD9C" />
    {/* Coupler point trace (dotted arc) */}
    <path d="M34,18 Q36,12 40,16" fill="none" stroke="#00CD9C" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
    {/* Labels */}
    <text x="14" y="38" fontSize="5" fontWeight="bold" fill="#009A74" fontFamily="sans-serif">1</text>
    <text x="31" y="22" fontSize="5" fontWeight="bold" fill="#009A74" fontFamily="sans-serif">2</text>
    <text x="49" y="34" fontSize="5" fontWeight="bold" fill="#009A74" fontFamily="sans-serif">3</text>
    {/* Angular velocity symbol */}
    <text x="6" y="34" fontSize="6" fill="#009A74" fontWeight="bold" fontFamily="serif">ω</text>
  </svg>
);
