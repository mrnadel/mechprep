'use client';

/**
 * Duolingo-style SVG illustrations for the course map.
 * Each unit gets a themed illustration that appears between lesson nodes.
 */

interface IllustrationProps {
  color: string;
  className?: string;
}

/* ─── Unit 1: Statics — Truss / Bridge ─── */
function StaticsIllustration({ color, className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 140" fill="none" className={className}>
      {/* Ground */}
      <rect x="10" y="110" width="180" height="4" rx="2" fill={color} opacity={0.15} />
      {/* Bridge truss */}
      <path d="M30 110 L100 40 L170 110" stroke={color} strokeWidth="3" strokeLinecap="round" opacity={0.6} />
      <path d="M30 110 L170 110" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M65 75 L100 110" stroke={color} strokeWidth="2" strokeLinecap="round" opacity={0.4} />
      <path d="M135 75 L100 110" stroke={color} strokeWidth="2" strokeLinecap="round" opacity={0.4} />
      {/* Supports */}
      <circle cx="30" cy="110" r="5" fill={color} opacity={0.3} />
      <circle cx="170" cy="110" r="5" fill={color} opacity={0.3} />
      <polygon points="25,118 35,118 30,126" fill={color} opacity={0.3} />
      <polygon points="165,118 175,118 170,126" fill={color} opacity={0.3} />
      {/* Force arrow */}
      <line x1="100" y1="18" x2="100" y2="36" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <polygon points="94,18 106,18 100,8" fill={color} opacity={0.8} />
      {/* Cute face on the load */}
      <circle cx="100" cy="28" r="0" fill="none" />
      {/* Decorative dots */}
      <circle cx="65" cy="75" r="3" fill={color} opacity={0.5} />
      <circle cx="135" cy="75" r="3" fill={color} opacity={0.5} />
      <circle cx="100" cy="40" r="4" fill={color} opacity={0.7} />
    </svg>
  );
}

/* ─── Unit 2: Dynamics — Moving Car / Velocity ─── */
function DynamicsIllustration({ color, className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 140" fill="none" className={className}>
      {/* Road */}
      <rect x="0" y="105" width="200" height="4" rx="2" fill={color} opacity={0.15} />
      <rect x="20" y="111" width="15" height="2" rx="1" fill={color} opacity={0.1} />
      <rect x="50" y="111" width="15" height="2" rx="1" fill={color} opacity={0.1} />
      <rect x="80" y="111" width="15" height="2" rx="1" fill={color} opacity={0.1} />
      <rect x="110" y="111" width="15" height="2" rx="1" fill={color} opacity={0.1} />
      <rect x="140" y="111" width="15" height="2" rx="1" fill={color} opacity={0.1} />
      <rect x="170" y="111" width="15" height="2" rx="1" fill={color} opacity={0.1} />
      {/* Car body */}
      <rect x="70" y="75" width="70" height="30" rx="8" fill={color} opacity={0.2} />
      <rect x="80" y="58" width="45" height="22" rx="6" fill={color} opacity={0.3} />
      {/* Windows */}
      <rect x="85" y="62" width="16" height="14" rx="3" fill="white" opacity={0.6} />
      <rect x="105" y="62" width="16" height="14" rx="3" fill="white" opacity={0.6} />
      {/* Wheels */}
      <circle cx="90" cy="105" r="10" fill={color} opacity={0.4} />
      <circle cx="90" cy="105" r="5" fill="white" opacity={0.5} />
      <circle cx="130" cy="105" r="10" fill={color} opacity={0.4} />
      <circle cx="130" cy="105" r="5" fill="white" opacity={0.5} />
      {/* Speed lines */}
      <line x1="20" y1="72" x2="55" y2="72" stroke={color} strokeWidth="2" strokeLinecap="round" opacity={0.25} />
      <line x1="30" y1="82" x2="60" y2="82" stroke={color} strokeWidth="2" strokeLinecap="round" opacity={0.2} />
      <line x1="25" y1="92" x2="58" y2="92" stroke={color} strokeWidth="2" strokeLinecap="round" opacity={0.15} />
      {/* Velocity arrow */}
      <line x1="145" y1="50" x2="175" y2="50" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity={0.6} />
      <polygon points="175,44 175,56 185,50" fill={color} opacity={0.6} />
      <text x="155" y="42" fontSize="10" fill={color} fontWeight="bold" opacity={0.5} textAnchor="middle">v</text>
    </svg>
  );
}

/* ─── Unit 3: Strength of Materials — Beam Bending ─── */
function StrengthIllustration({ color, className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 140" fill="none" className={className}>
      {/* Supports */}
      <polygon points="35,95 45,95 40,105" fill={color} opacity={0.3} />
      <polygon points="155,95 165,95 160,105" fill={color} opacity={0.3} />
      <rect x="10" y="105" width="180" height="3" rx="1.5" fill={color} opacity={0.1} />
      {/* Beam - bent */}
      <path d="M40 85 Q100 100 160 85" stroke={color} strokeWidth="6" strokeLinecap="round" opacity={0.35} />
      <path d="M40 85 Q100 100 160 85" stroke={color} strokeWidth="3" strokeLinecap="round" />
      {/* Load arrow at center */}
      <line x1="100" y1="45" x2="100" y2="72" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity={0.7} />
      <polygon points="95,72 105,72 100,80" fill={color} opacity={0.7} />
      {/* Force label */}
      <text x="100" y="38" fontSize="11" fill={color} fontWeight="bold" opacity={0.5} textAnchor="middle">F</text>
      {/* Stress distribution arrows (tension at bottom) */}
      <line x1="85" y1="98" x2="85" y2="108" stroke={color} strokeWidth="1.5" opacity={0.25} />
      <line x1="100" y1="100" x2="100" y2="112" stroke={color} strokeWidth="1.5" opacity={0.25} />
      <line x1="115" y1="98" x2="115" y2="108" stroke={color} strokeWidth="1.5" opacity={0.25} />
      {/* Cute "delta" deflection indicator */}
      <path d="M100 92 L100 100" stroke={color} strokeWidth="1" strokeDasharray="2 2" opacity={0.4} />
      <text x="108" y="98" fontSize="9" fill={color} opacity={0.4}>δ</text>
    </svg>
  );
}

/* ─── Unit 4: Thermodynamics — Engine / Piston ─── */
function ThermoIllustration({ color, className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 140" fill="none" className={className}>
      {/* Cylinder */}
      <rect x="60" y="30" width="80" height="80" rx="6" stroke={color} strokeWidth="2.5" fill={color} opacity={0.08} />
      {/* Piston */}
      <rect x="68" y="70" width="64" height="12" rx="3" fill={color} opacity={0.35} />
      {/* Piston rod */}
      <rect x="95" y="82" width="10" height="24" rx="2" fill={color} opacity={0.25} />
      {/* Flame / heat */}
      <ellipse cx="100" cy="50" rx="18" ry="14" fill={color} opacity={0.15} />
      <ellipse cx="100" cy="50" rx="10" ry="9" fill={color} opacity={0.25} />
      {/* Heat waves above */}
      <path d="M82 20 Q87 14 92 20" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" opacity={0.3} />
      <path d="M96 16 Q101 10 106 16" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" opacity={0.35} />
      <path d="M110 20 Q115 14 120 20" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" opacity={0.3} />
      {/* Q_in arrow */}
      <line x1="30" y1="55" x2="52" y2="55" stroke={color} strokeWidth="2" strokeLinecap="round" opacity={0.5} />
      <polygon points="52,50 52,60 60,55" fill={color} opacity={0.5} />
      <text x="28" y="50" fontSize="9" fill={color} opacity={0.4} textAnchor="end">Q<tspan fontSize="7" dy="3">in</tspan></text>
      {/* W_out arrow */}
      <line x1="148" y1="55" x2="170" y2="55" stroke={color} strokeWidth="2" strokeLinecap="round" opacity={0.5} />
      <polygon points="170,50 170,60 178,55" fill={color} opacity={0.5} />
      <text x="180" y="50" fontSize="9" fill={color} opacity={0.4}>W</text>
    </svg>
  );
}

/* ─── Unit 5: Heat Transfer — Conduction / Radiation ─── */
function HeatTransferIllustration({ color, className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 140" fill="none" className={className}>
      {/* Hot side */}
      <rect x="20" y="35" width="50" height="70" rx="6" fill={color} opacity={0.25} />
      <text x="45" y="75" fontSize="14" fill={color} fontWeight="bold" opacity={0.5} textAnchor="middle">HOT</text>
      {/* Cold side */}
      <rect x="130" y="35" width="50" height="70" rx="6" fill={color} opacity={0.1} />
      <text x="155" y="75" fontSize="12" fill={color} opacity={0.3} textAnchor="middle">COLD</text>
      {/* Wall / material between */}
      <rect x="85" y="30" width="30" height="80" rx="3" fill={color} opacity={0.15} />
      {/* Heat flow arrows */}
      <line x1="72" y1="55" x2="84" y2="55" stroke={color} strokeWidth="2" strokeLinecap="round" opacity={0.5} />
      <line x1="72" y1="70" x2="84" y2="70" stroke={color} strokeWidth="2" strokeLinecap="round" opacity={0.4} />
      <line x1="72" y1="85" x2="84" y2="85" stroke={color} strokeWidth="2" strokeLinecap="round" opacity={0.3} />
      <line x1="116" y1="55" x2="128" y2="55" stroke={color} strokeWidth="2" strokeLinecap="round" opacity={0.35} />
      <line x1="116" y1="70" x2="128" y2="70" stroke={color} strokeWidth="2" strokeLinecap="round" opacity={0.25} />
      <line x1="116" y1="85" x2="128" y2="85" stroke={color} strokeWidth="2" strokeLinecap="round" opacity={0.15} />
      {/* Temperature wave / gradient */}
      <path d="M30 25 Q35 18 40 25 Q45 32 50 25 Q55 18 60 25" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" opacity={0.3} />
      {/* Radiation waves from hot side */}
      <circle cx="45" cy="50" r="8" stroke={color} strokeWidth="1" fill="none" opacity={0.2} />
      <circle cx="45" cy="50" r="14" stroke={color} strokeWidth="1" fill="none" opacity={0.12} />
    </svg>
  );
}

/* ─── Unit 6: Fluid Mechanics — Pipe Flow ─── */
function FluidsIllustration({ color, className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 140" fill="none" className={className}>
      {/* Pipe */}
      <rect x="10" y="50" width="180" height="40" rx="20" fill={color} opacity={0.1} />
      <rect x="10" y="50" width="180" height="40" rx="20" stroke={color} strokeWidth="2" fill="none" opacity={0.3} />
      {/* Narrowing section */}
      <path d="M100 50 L120 58 L120 82 L100 90" fill={color} opacity={0.08} />
      {/* Flow arrows */}
      <line x1="25" y1="70" x2="50" y2="70" stroke={color} strokeWidth="2" strokeLinecap="round" opacity={0.4} />
      <polygon points="50,65 50,75 58,70" fill={color} opacity={0.4} />
      <line x1="60" y1="62" x2="80" y2="62" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity={0.3} />
      <line x1="60" y1="78" x2="80" y2="78" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity={0.3} />
      {/* Faster flow in narrow section */}
      <line x1="125" y1="70" x2="160" y2="70" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity={0.5} />
      <polygon points="160,64 160,76 170,70" fill={color} opacity={0.5} />
      {/* Water drops / particles */}
      <circle cx="40" cy="70" r="3" fill={color} opacity={0.2} />
      <circle cx="75" cy="66" r="2.5" fill={color} opacity={0.2} />
      <circle cx="90" cy="73" r="2" fill={color} opacity={0.2} />
      <circle cx="145" cy="70" r="3" fill={color} opacity={0.25} />
      {/* Pressure labels */}
      <text x="45" y="42" fontSize="10" fill={color} fontWeight="bold" opacity={0.35} textAnchor="middle">P₁</text>
      <text x="150" y="42" fontSize="10" fill={color} fontWeight="bold" opacity={0.35} textAnchor="middle">P₂</text>
    </svg>
  );
}

/* ─── Unit 7: Materials — Crystal / Atom Structure ─── */
function MaterialsIllustration({ color, className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 140" fill="none" className={className}>
      {/* Crystal lattice - atoms */}
      <circle cx="60" cy="40" r="12" fill={color} opacity={0.25} />
      <circle cx="110" cy="40" r="12" fill={color} opacity={0.25} />
      <circle cx="160" cy="40" r="12" fill={color} opacity={0.25} />
      <circle cx="85" cy="80" r="12" fill={color} opacity={0.2} />
      <circle cx="135" cy="80" r="12" fill={color} opacity={0.2} />
      <circle cx="60" cy="115" r="12" fill={color} opacity={0.15} />
      <circle cx="110" cy="115" r="12" fill={color} opacity={0.15} />
      <circle cx="160" cy="115" r="12" fill={color} opacity={0.15} />
      {/* Bonds */}
      <line x1="60" y1="40" x2="110" y2="40" stroke={color} strokeWidth="2" opacity={0.2} />
      <line x1="110" y1="40" x2="160" y2="40" stroke={color} strokeWidth="2" opacity={0.2} />
      <line x1="60" y1="40" x2="85" y2="80" stroke={color} strokeWidth="2" opacity={0.15} />
      <line x1="110" y1="40" x2="85" y2="80" stroke={color} strokeWidth="2" opacity={0.15} />
      <line x1="110" y1="40" x2="135" y2="80" stroke={color} strokeWidth="2" opacity={0.15} />
      <line x1="160" y1="40" x2="135" y2="80" stroke={color} strokeWidth="2" opacity={0.15} />
      <line x1="85" y1="80" x2="60" y2="115" stroke={color} strokeWidth="2" opacity={0.1} />
      <line x1="85" y1="80" x2="110" y2="115" stroke={color} strokeWidth="2" opacity={0.1} />
      <line x1="135" y1="80" x2="110" y2="115" stroke={color} strokeWidth="2" opacity={0.1} />
      <line x1="135" y1="80" x2="160" y2="115" stroke={color} strokeWidth="2" opacity={0.1} />
      {/* Inner highlights */}
      <circle cx="60" cy="38" r="4" fill="white" opacity={0.3} />
      <circle cx="110" cy="38" r="4" fill="white" opacity={0.3} />
      <circle cx="160" cy="38" r="4" fill="white" opacity={0.3} />
    </svg>
  );
}

/* ─── Unit 8: Machine Elements — Gear ─── */
function MachineElementsIllustration({ color, className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 140" fill="none" className={className}>
      {/* Large gear */}
      <circle cx="80" cy="70" r="35" fill={color} opacity={0.1} />
      <circle cx="80" cy="70" r="35" stroke={color} strokeWidth="2" fill="none" opacity={0.25} />
      <circle cx="80" cy="70" r="12" fill={color} opacity={0.2} />
      <circle cx="80" cy="70" r="6" fill="white" opacity={0.4} />
      {/* Gear teeth (large) */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 80 + Math.cos(rad) * 33;
        const y1 = 70 + Math.sin(rad) * 33;
        const x2 = 80 + Math.cos(rad) * 42;
        const y2 = 70 + Math.sin(rad) * 42;
        return (
          <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="6" strokeLinecap="round" opacity={0.2} />
        );
      })}
      {/* Small gear */}
      <circle cx="140" cy="55" r="20" fill={color} opacity={0.08} />
      <circle cx="140" cy="55" r="20" stroke={color} strokeWidth="2" fill="none" opacity={0.2} />
      <circle cx="140" cy="55" r="7" fill={color} opacity={0.15} />
      <circle cx="140" cy="55" r="3.5" fill="white" opacity={0.3} />
      {/* Gear teeth (small) */}
      {[0, 60, 120, 180, 240, 300].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 140 + Math.cos(rad) * 18;
        const y1 = 55 + Math.sin(rad) * 18;
        const x2 = 140 + Math.cos(rad) * 25;
        const y2 = 55 + Math.sin(rad) * 25;
        return (
          <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="5" strokeLinecap="round" opacity={0.15} />
        );
      })}
      {/* Rotation arrow */}
      <path d="M80 28 A12 12 0 0 1 92 34" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" opacity={0.4} />
      <polygon points="92,30 92,38 98,34" fill={color} opacity={0.4} />
    </svg>
  );
}

/* ─── Unit 9: GD&T — Dimension Lines ─── */
function GDTIllustration({ color, className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 140" fill="none" className={className}>
      {/* Part outline */}
      <rect x="40" y="40" width="120" height="60" rx="4" stroke={color} strokeWidth="2" fill={color} opacity={0.08} />
      {/* Hole */}
      <circle cx="100" cy="70" r="15" stroke={color} strokeWidth="1.5" fill="white" opacity={0.6} />
      <circle cx="100" cy="70" r="1.5" fill={color} opacity={0.3} />
      {/* Horizontal dimension line */}
      <line x1="40" y1="115" x2="160" y2="115" stroke={color} strokeWidth="1.5" opacity={0.4} />
      <line x1="40" y1="102" x2="40" y2="120" stroke={color} strokeWidth="1" opacity={0.3} />
      <line x1="160" y1="102" x2="160" y2="120" stroke={color} strokeWidth="1" opacity={0.3} />
      <polygon points="40,112 40,118 48,115" fill={color} opacity={0.4} />
      <polygon points="160,112 160,118 152,115" fill={color} opacity={0.4} />
      <text x="100" y="127" fontSize="10" fill={color} fontWeight="bold" opacity={0.45} textAnchor="middle">120 ± 0.05</text>
      {/* Vertical dimension line */}
      <line x1="175" y1="40" x2="175" y2="100" stroke={color} strokeWidth="1.5" opacity={0.4} />
      <line x1="162" y1="40" x2="180" y2="40" stroke={color} strokeWidth="1" opacity={0.3} />
      <line x1="162" y1="100" x2="180" y2="100" stroke={color} strokeWidth="1" opacity={0.3} />
      <polygon points="172,40 178,40 175,48" fill={color} opacity={0.4} />
      <polygon points="172,100 178,100 175,92" fill={color} opacity={0.4} />
      {/* GD&T feature control frame */}
      <rect x="50" y="20" width="75" height="16" rx="2" stroke={color} strokeWidth="1.5" fill="white" opacity={0.9} />
      <line x1="72" y1="20" x2="72" y2="36" stroke={color} strokeWidth="1" opacity={0.3} />
      <line x1="97" y1="20" x2="97" y2="36" stroke={color} strokeWidth="1" opacity={0.3} />
      <circle cx="61" cy="28" r="5" stroke={color} strokeWidth="1" fill="none" opacity={0.4} />
      <text x="84" y="31" fontSize="8" fill={color} opacity={0.5} textAnchor="middle">0.05</text>
      <text x="112" y="31" fontSize="8" fill={color} fontWeight="bold" opacity={0.5} textAnchor="middle">A</text>
    </svg>
  );
}

/* ─── Unit 10: Interview Prep — Person / Briefcase ─── */
function InterviewIllustration({ color, className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 140" fill="none" className={className}>
      {/* Person - head */}
      <circle cx="100" cy="35" r="16" fill={color} opacity={0.2} />
      {/* Eyes */}
      <circle cx="94" cy="33" r="2" fill={color} opacity={0.4} />
      <circle cx="106" cy="33" r="2" fill={color} opacity={0.4} />
      {/* Smile */}
      <path d="M94 40 Q100 46 106 40" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity={0.35} />
      {/* Body / shirt */}
      <path d="M80 52 Q100 48 120 52 L125 85 L75 85 Z" fill={color} opacity={0.15} />
      {/* Tie */}
      <path d="M100 52 L103 62 L100 72 L97 62 Z" fill={color} opacity={0.3} />
      {/* Briefcase */}
      <rect x="55" y="90" width="90" height="30" rx="6" fill={color} opacity={0.2} />
      <rect x="55" y="90" width="90" height="30" rx="6" stroke={color} strokeWidth="2" fill="none" opacity={0.3} />
      <rect x="85" y="84" width="30" height="10" rx="3" stroke={color} strokeWidth="2" fill="none" opacity={0.25} />
      {/* Briefcase handle */}
      <line x1="93" y1="105" x2="107" y2="105" stroke={color} strokeWidth="2" strokeLinecap="round" opacity={0.3} />
      {/* Sparkles */}
      <path d="M140 30 L143 25 L146 30 L143 35 Z" fill={color} opacity={0.2} />
      <path d="M55 45 L57 41 L59 45 L57 49 Z" fill={color} opacity={0.15} />
      <path d="M150 60 L152 57 L154 60 L152 63 Z" fill={color} opacity={0.2} />
    </svg>
  );
}

/* ─── Illustration Map ─── */
const illustrationMap: Record<number, React.FC<IllustrationProps>> = {
  0: StaticsIllustration,
  1: DynamicsIllustration,
  2: StrengthIllustration,
  3: ThermoIllustration,
  4: HeatTransferIllustration,
  5: FluidsIllustration,
  6: MaterialsIllustration,
  7: MachineElementsIllustration,
  8: GDTIllustration,
  9: InterviewIllustration,
};

/**
 * Returns the illustration component for a given unit index.
 * Place this between lesson nodes in the CourseMap.
 */
export function UnitIllustration({ unitIndex, color, className }: { unitIndex: number; color: string; className?: string }) {
  const Component = illustrationMap[unitIndex] ?? StaticsIllustration;
  return <Component color={color} className={className} />;
}
