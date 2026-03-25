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

/* ═══════════════════════════════════════════════════════════════════
   PERSONAL FINANCE ILLUSTRATIONS (cartoon / flat style)
   ═══════════════════════════════════════════════════════════════════ */

/* ─── PF Unit 1: Your Money Right Now — Wallet ─── */
function PFMoneyIllustration({ color, className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 140" fill="none" className={className}>
      {/* Wallet body */}
      <rect x="40" y="35" width="120" height="75" rx="10" fill={color} opacity={0.3} stroke={color} strokeWidth="2.5" />
      <rect x="40" y="35" width="120" height="25" rx="10" fill={color} opacity={0.45} />
      {/* Wallet clasp */}
      <circle cx="155" cy="60" r="8" fill={color} opacity={0.5} stroke={color} strokeWidth="2" />
      <circle cx="155" cy="60" r="3" fill="white" opacity={0.5} />
      {/* Bills peeking out */}
      <rect x="50" y="28" width="80" height="14" rx="3" fill="#22C55E" opacity={0.5} stroke="#16A34A" strokeWidth="1.5" />
      <rect x="55" y="22" width="70" height="12" rx="3" fill="#4ADE80" opacity={0.4} stroke="#16A34A" strokeWidth="1" />
      {/* Dollar signs on bills */}
      <text x="90" y="38" fontSize="9" fill="white" fontWeight="bold" opacity={0.7} textAnchor="middle">$</text>
      {/* Coins falling */}
      <circle cx="50" cy="120" r="8" fill="#FBBF24" opacity={0.6} stroke="#92400E" strokeWidth="1.5" />
      <text x="50" y="123" fontSize="6" fill="#92400E" fontWeight="bold" opacity={0.6} textAnchor="middle">¢</text>
      <circle cx="70" cy="125" r="6" fill="#FCD34D" opacity={0.5} stroke="#92400E" strokeWidth="1.2" />
      <circle cx="35" cy="128" r="5" fill="#F59E0B" opacity={0.45} stroke="#92400E" strokeWidth="1" />
    </svg>
  );
}

/* ─── PF Unit 2: Smart Saving — Piggy Bank ─── */
function PFSavingIllustration({ color, className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 140" fill="none" className={className}>
      {/* Piggy body */}
      <ellipse cx="100" cy="78" rx="50" ry="38" fill={color} opacity={0.3} stroke={color} strokeWidth="2.5" />
      {/* Snout */}
      <ellipse cx="148" cy="82" rx="12" ry="9" fill={color} opacity={0.45} stroke={color} strokeWidth="2" />
      <circle cx="145" cy="80" r="2" fill={color} opacity={0.6} />
      <circle cx="151" cy="80" r="2" fill={color} opacity={0.6} />
      {/* Ear */}
      <ellipse cx="80" cy="48" rx="12" ry="16" fill={color} opacity={0.35} stroke={color} strokeWidth="2" transform="rotate(-15 80 48)" />
      {/* Eye */}
      <circle cx="115" cy="68" r="4" fill={color} opacity={0.5} />
      <circle cx="116" cy="67" r="1.5" fill="white" opacity={0.6} />
      {/* Coin slot */}
      <rect x="88" y="38" width="20" height="4" rx="2" fill={color} opacity={0.6} stroke={color} strokeWidth="1.5" />
      {/* Legs */}
      <rect x="70" y="108" width="10" height="16" rx="4" fill={color} opacity={0.35} stroke={color} strokeWidth="1.5" />
      <rect x="120" y="108" width="10" height="16" rx="4" fill={color} opacity={0.35} stroke={color} strokeWidth="1.5" />
      {/* Coin going in */}
      <circle cx="98" cy="26" r="8" fill="#FBBF24" opacity={0.6} stroke="#92400E" strokeWidth="1.5" />
      <text x="98" y="29" fontSize="8" fill="#92400E" fontWeight="bold" opacity={0.7} textAnchor="middle">$</text>
      {/* Sparkles */}
      <path d="M45 45 L48 39 L51 45 L48 51 Z" fill={color} opacity={0.2} />
      <path d="M155 50 L157 46 L159 50 L157 54 Z" fill={color} opacity={0.2} />
    </svg>
  );
}

/* ─── PF Unit 3: Debt Decoded — Chains Breaking ─── */
function PFDebtIllustration({ color, className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 140" fill="none" className={className}>
      {/* Chain links */}
      <ellipse cx="55" cy="70" rx="16" ry="10" stroke={color} strokeWidth="4" fill="none" opacity={0.4} />
      <ellipse cx="80" cy="70" rx="16" ry="10" stroke={color} strokeWidth="4" fill="none" opacity={0.35} />
      <ellipse cx="105" cy="70" rx="16" ry="10" stroke={color} strokeWidth="4" fill="none" opacity={0.3} />
      {/* Breaking point */}
      <line x1="120" y1="60" x2="130" y2="55" stroke={color} strokeWidth="3" strokeLinecap="round" opacity={0.5} />
      <line x1="120" y1="80" x2="130" y2="85" stroke={color} strokeWidth="3" strokeLinecap="round" opacity={0.5} />
      {/* Freed chain link */}
      <ellipse cx="148" cy="65" rx="14" ry="9" stroke={color} strokeWidth="3.5" fill="none" opacity={0.25} transform="rotate(15 148 65)" />
      {/* Break spark effects */}
      <circle cx="125" cy="65" r="3" fill="#FBBF24" opacity={0.5} />
      <circle cx="128" cy="72" r="2" fill="#FBBF24" opacity={0.4} />
      <line x1="125" y1="58" x2="130" y2="50" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" opacity={0.4} />
      <line x1="125" y1="82" x2="132" y2="90" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" opacity={0.4} />
      {/* Dollar flying free */}
      <text x="165" y="55" fontSize="16" fill={color} fontWeight="bold" opacity={0.3}>$</text>
      <text x="175" y="45" fontSize="10" fill={color} fontWeight="bold" opacity={0.2}>$</text>
    </svg>
  );
}

/* ─── PF Unit 4: Credit Scores — Score Gauge ─── */
function PFCreditIllustration({ color, className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 140" fill="none" className={className}>
      {/* Gauge arc background */}
      <path d="M40 100 A60 60 0 0 1 160 100" stroke={color} strokeWidth="14" strokeLinecap="round" fill="none" opacity={0.15} />
      {/* Gauge arc filled (good score) */}
      <path d="M40 100 A60 60 0 0 1 140 48" stroke={color} strokeWidth="14" strokeLinecap="round" fill="none" opacity={0.45} />
      {/* Gauge center */}
      <circle cx="100" cy="100" r="8" fill={color} opacity={0.4} />
      {/* Needle */}
      <line x1="100" y1="100" x2="135" y2="55" stroke={color} strokeWidth="3" strokeLinecap="round" opacity={0.6} />
      {/* Score number */}
      <text x="100" y="125" fontSize="18" fill={color} fontWeight="bold" opacity={0.5} textAnchor="middle">750</text>
      {/* Zone labels */}
      <text x="50" y="90" fontSize="7" fill={color} opacity={0.25} textAnchor="middle">Poor</text>
      <text x="155" y="72" fontSize="7" fill={color} opacity={0.35} textAnchor="middle">Great</text>
      {/* Star */}
      <path d="M148 42 L151 36 L154 42 L151 48 Z" fill="#FBBF24" opacity={0.5} />
    </svg>
  );
}

/* ─── PF Unit 5: Banking & Taxes — Bank Building ─── */
function PFBankingIllustration({ color, className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 140" fill="none" className={className}>
      {/* Roof / pediment */}
      <polygon points="100,20 40,55 160,55" fill={color} opacity={0.3} stroke={color} strokeWidth="2" strokeLinejoin="round" />
      {/* Roof trim */}
      <rect x="40" y="53" width="120" height="6" rx="1" fill={color} opacity={0.4} />
      {/* Pillars */}
      <rect x="55" y="59" width="10" height="50" rx="2" fill={color} opacity={0.25} stroke={color} strokeWidth="1.5" />
      <rect x="80" y="59" width="10" height="50" rx="2" fill={color} opacity={0.25} stroke={color} strokeWidth="1.5" />
      <rect x="110" y="59" width="10" height="50" rx="2" fill={color} opacity={0.25} stroke={color} strokeWidth="1.5" />
      <rect x="135" y="59" width="10" height="50" rx="2" fill={color} opacity={0.25} stroke={color} strokeWidth="1.5" />
      {/* Base */}
      <rect x="35" y="109" width="130" height="8" rx="2" fill={color} opacity={0.35} stroke={color} strokeWidth="1.5" />
      {/* Door */}
      <rect x="90" y="82" width="20" height="27" rx="3" fill={color} opacity={0.15} stroke={color} strokeWidth="1.5" />
      {/* Dollar in pediment */}
      <text x="100" y="47" fontSize="16" fill={color} fontWeight="bold" opacity={0.4} textAnchor="middle">$</text>
    </svg>
  );
}

/* ─── PF Unit 6: Investing 101 — Growth Chart ─── */
function PFInvestingIllustration({ color, className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 140" fill="none" className={className}>
      {/* Chart background */}
      <rect x="30" y="20" width="145" height="95" rx="6" fill={color} opacity={0.06} stroke={color} strokeWidth="1.5" />
      {/* Grid lines */}
      <line x1="30" y1="45" x2="175" y2="45" stroke={color} strokeWidth="0.5" opacity={0.1} />
      <line x1="30" y1="70" x2="175" y2="70" stroke={color} strokeWidth="0.5" opacity={0.1} />
      <line x1="30" y1="95" x2="175" y2="95" stroke={color} strokeWidth="0.5" opacity={0.1} />
      {/* Growth line */}
      <path d="M40 100 L65 92 L85 88 L100 75 L120 60 L140 42 L160 30" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity={0.6} fill="none" />
      {/* Area under line */}
      <path d="M40 100 L65 92 L85 88 L100 75 L120 60 L140 42 L160 30 L160 115 L40 115 Z" fill={color} opacity={0.1} />
      {/* Data points */}
      <circle cx="40" cy="100" r="3.5" fill={color} opacity={0.4} />
      <circle cx="85" cy="88" r="3.5" fill={color} opacity={0.45} />
      <circle cx="120" cy="60" r="3.5" fill={color} opacity={0.5} />
      <circle cx="160" cy="30" r="4" fill={color} opacity={0.6} />
      {/* Arrow at end */}
      <polygon points="162,24 162,36 170,30" fill={color} opacity={0.5} />
      {/* Dollar at peak */}
      <text x="160" y="22" fontSize="10" fill={color} fontWeight="bold" opacity={0.4} textAnchor="middle">$</text>
    </svg>
  );
}

/* ─── PF Unit 7: Stock Market — Candlestick Chart ─── */
function PFStocksIllustration({ color, className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 140" fill="none" className={className}>
      {/* Candlesticks */}
      {/* Green candle 1 */}
      <line x1="40" y1="30" x2="40" y2="110" stroke={color} strokeWidth="1.5" opacity={0.3} />
      <rect x="33" y="50" width="14" height="35" rx="2" fill={color} opacity={0.4} />
      {/* Red candle 2 */}
      <line x1="65" y1="40" x2="65" y2="105" stroke={color} strokeWidth="1.5" opacity={0.3} />
      <rect x="58" y="45" width="14" height="40" rx="2" fill={color} opacity={0.2} stroke={color} strokeWidth="1" />
      {/* Green candle 3 */}
      <line x1="90" y1="25" x2="90" y2="100" stroke={color} strokeWidth="1.5" opacity={0.3} />
      <rect x="83" y="35" width="14" height="45" rx="2" fill={color} opacity={0.45} />
      {/* Red candle 4 */}
      <line x1="115" y1="35" x2="115" y2="95" stroke={color} strokeWidth="1.5" opacity={0.3} />
      <rect x="108" y="40" width="14" height="30" rx="2" fill={color} opacity={0.2} stroke={color} strokeWidth="1" />
      {/* Green candle 5 - big rally */}
      <line x1="140" y1="20" x2="140" y2="90" stroke={color} strokeWidth="1.5" opacity={0.3} />
      <rect x="133" y="25" width="14" height="50" rx="2" fill={color} opacity={0.5} />
      {/* Green candle 6 */}
      <line x1="165" y1="22" x2="165" y2="80" stroke={color} strokeWidth="1.5" opacity={0.3} />
      <rect x="158" y="30" width="14" height="35" rx="2" fill={color} opacity={0.45} />
      {/* Trend line */}
      <path d="M35 80 L170 35" stroke={color} strokeWidth="1.5" strokeDasharray="4 3" opacity={0.25} />
      {/* Bull icon */}
      <text x="180" y="28" fontSize="14" opacity={0.3}>📈</text>
    </svg>
  );
}

/* ─── PF Unit 8: Crypto — Bitcoin/Blockchain ─── */
function PFCryptoIllustration({ color, className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 140" fill="none" className={className}>
      {/* Main coin */}
      <circle cx="100" cy="65" r="40" fill={color} opacity={0.15} stroke={color} strokeWidth="2.5" />
      <circle cx="100" cy="65" r="32" stroke={color} strokeWidth="1.5" fill="none" opacity={0.2} />
      {/* Bitcoin B */}
      <text x="100" y="78" fontSize="36" fill={color} fontWeight="bold" opacity={0.4} textAnchor="middle">₿</text>
      {/* Blockchain chain pieces */}
      <rect x="15" y="55" width="22" height="18" rx="4" fill={color} opacity={0.15} stroke={color} strokeWidth="1.5" />
      <line x1="37" y1="64" x2="58" y2="64" stroke={color} strokeWidth="2" opacity={0.2} />
      <rect x="163" y="55" width="22" height="18" rx="4" fill={color} opacity={0.15} stroke={color} strokeWidth="1.5" />
      <line x1="142" y1="64" x2="163" y2="64" stroke={color} strokeWidth="2" opacity={0.2} />
      {/* Hash marks inside blocks */}
      <line x1="20" y1="61" x2="32" y2="61" stroke={color} strokeWidth="1" opacity={0.2} />
      <line x1="20" y1="66" x2="28" y2="66" stroke={color} strokeWidth="1" opacity={0.15} />
      <line x1="168" y1="61" x2="180" y2="61" stroke={color} strokeWidth="1" opacity={0.2} />
      <line x1="168" y1="66" x2="176" y2="66" stroke={color} strokeWidth="1" opacity={0.15} />
      {/* Signal waves */}
      <path d="M100 20 Q105 12 110 20" stroke={color} strokeWidth="1.5" fill="none" opacity={0.2} />
      <path d="M95 14 Q100 6 105 14" stroke={color} strokeWidth="1.5" fill="none" opacity={0.15} />
    </svg>
  );
}

/* ─── PF Unit 9: Real Estate — House ─── */
function PFRealEstateIllustration({ color, className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 140" fill="none" className={className}>
      {/* House body */}
      <rect x="50" y="60" width="100" height="55" rx="4" fill={color} opacity={0.2} stroke={color} strokeWidth="2" />
      {/* Roof */}
      <polygon points="100,18 35,62 165,62" fill={color} opacity={0.35} stroke={color} strokeWidth="2" strokeLinejoin="round" />
      {/* Door */}
      <rect x="88" y="82" width="24" height="33" rx="4" fill={color} opacity={0.3} stroke={color} strokeWidth="1.5" />
      <circle cx="107" cy="100" r="2.5" fill={color} opacity={0.5} />
      {/* Windows */}
      <rect x="58" y="72" width="20" height="18" rx="3" fill="white" opacity={0.5} stroke={color} strokeWidth="1.5" />
      <line x1="68" y1="72" x2="68" y2="90" stroke={color} strokeWidth="1" opacity={0.3} />
      <line x1="58" y1="81" x2="78" y2="81" stroke={color} strokeWidth="1" opacity={0.3} />
      <rect x="122" y="72" width="20" height="18" rx="3" fill="white" opacity={0.5} stroke={color} strokeWidth="1.5" />
      <line x1="132" y1="72" x2="132" y2="90" stroke={color} strokeWidth="1" opacity={0.3} />
      <line x1="122" y1="81" x2="142" y2="81" stroke={color} strokeWidth="1" opacity={0.3} />
      {/* Chimney */}
      <rect x="125" y="28" width="14" height="28" rx="2" fill={color} opacity={0.25} stroke={color} strokeWidth="1.5" />
      {/* Smoke */}
      <circle cx="135" cy="20" r="4" fill={color} opacity={0.1} />
      <circle cx="140" cy="14" r="5" fill={color} opacity={0.08} />
      {/* Ground */}
      <rect x="20" y="115" width="160" height="4" rx="2" fill={color} opacity={0.1} />
      {/* Key icon */}
      <circle cx="35" cy="100" r="6" stroke={color} strokeWidth="1.5" fill="none" opacity={0.25} />
      <line x1="40" y1="104" x2="48" y2="112" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity={0.25} />
    </svg>
  );
}

/* ─── PF Unit 10: Retirement — Beach Chair ─── */
function PFRetirementIllustration({ color, className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 140" fill="none" className={className}>
      {/* Sun */}
      <circle cx="155" cy="30" r="18" fill="#FBBF24" opacity={0.3} />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 155 + Math.cos(rad) * 22;
        const y1 = 30 + Math.sin(rad) * 22;
        const x2 = 155 + Math.cos(rad) * 28;
        const y2 = 30 + Math.sin(rad) * 28;
        return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" opacity={0.2} />;
      })}
      {/* Water */}
      <path d="M0 105 Q25 100 50 105 Q75 110 100 105 Q125 100 150 105 Q175 110 200 105 L200 140 L0 140 Z" fill={color} opacity={0.1} />
      {/* Sand */}
      <rect x="0" y="105" width="200" height="35" rx="0" fill={color} opacity={0.06} />
      {/* Beach chair */}
      <line x1="55" y1="65" x2="45" y2="115" stroke={color} strokeWidth="3" strokeLinecap="round" opacity={0.5} />
      <line x1="105" y1="65" x2="115" y2="115" stroke={color} strokeWidth="3" strokeLinecap="round" opacity={0.5} />
      <line x1="55" y1="65" x2="105" y2="65" stroke={color} strokeWidth="3" strokeLinecap="round" opacity={0.5} />
      <path d="M55 65 Q80 85 105 65" stroke={color} strokeWidth="2" fill={color} opacity={0.15} />
      {/* Umbrella pole */}
      <line x1="80" y1="25" x2="80" y2="65" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity={0.4} />
      {/* Umbrella */}
      <path d="M50 28 Q80 10 110 28" fill={color} opacity={0.25} stroke={color} strokeWidth="2" />
      {/* Drink */}
      <rect x="118" y="85" width="10" height="16" rx="2" fill="#FBBF24" opacity={0.3} stroke={color} strokeWidth="1" />
      <line x1="123" y1="78" x2="128" y2="85" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity={0.3} />
    </svg>
  );
}

/* ─── PF Unit 11: Insurance — Shield ─── */
function PFInsuranceIllustration({ color, className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 140" fill="none" className={className}>
      {/* Shield shape */}
      <path d="M100 15 L155 35 L155 75 Q155 110 100 130 Q45 110 45 75 L45 35 Z" fill={color} opacity={0.15} stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
      {/* Inner shield */}
      <path d="M100 30 L140 45 L140 72 Q140 100 100 115 Q60 100 60 72 L60 45 Z" fill={color} opacity={0.08} />
      {/* Checkmark */}
      <path d="M78 72 L93 88 L125 55" stroke={color} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" opacity={0.45} fill="none" />
      {/* Protection sparkles */}
      <circle cx="165" cy="30" r="3" fill={color} opacity={0.15} />
      <circle cx="35" cy="45" r="2.5" fill={color} opacity={0.12} />
      <path d="M170 55 L173 49 L176 55 L173 61 Z" fill={color} opacity={0.15} />
    </svg>
  );
}

/* ─── PF Unit 12: Big Money Moves — Rocket / Level-Up ─── */
function PFBigMovesIllustration({ color, className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 140" fill="none" className={className}>
      {/* Money bag */}
      <path d="M70 55 C50 55 35 70 35 90 C35 112 50 125 75 125 L100 125 C125 125 140 112 140 90 C140 70 125 55 105 55 Z" fill={color} opacity={0.2} stroke={color} strokeWidth="2" />
      <path d="M82 55 C78 48 80 40 88 35 L112 35 C120 40 122 48 118 55" fill={color} opacity={0.3} stroke={color} strokeWidth="2" strokeLinejoin="round" />
      {/* Dollar sign */}
      <text x="90" y="100" fontSize="28" fill={color} fontWeight="bold" opacity={0.35} textAnchor="middle">$</text>
      {/* Growth plant */}
      <line x1="100" y1="55" x2="100" y2="25" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="90" cy="38" rx="10" ry="5" fill="#22C55E" opacity={0.5} stroke="#065F46" strokeWidth="1.2" transform="rotate(-30 90 38)" />
      <ellipse cx="110" cy="28" rx="10" ry="5" fill="#16A34A" opacity={0.5} stroke="#065F46" strokeWidth="1.2" transform="rotate(30 110 28)" />
      {/* Coin on top */}
      <circle cx="100" cy="18" r="7" fill="#FBBF24" opacity={0.5} stroke="#92400E" strokeWidth="1.5" />
      <text x="100" y="21" fontSize="8" fill="#92400E" fontWeight="bold" opacity={0.6} textAnchor="middle">$</text>
      {/* Stars / sparkles */}
      <path d="M155 30 L158 22 L161 30 L158 38 Z" fill={color} opacity={0.2} />
      <path d="M160 60 L162 55 L164 60 L162 65 Z" fill={color} opacity={0.15} />
      <circle cx="45" cy="35" r="2.5" fill={color} opacity={0.15} />
      <circle cx="155" cy="90" r="2" fill={color} opacity={0.12} />
      {/* Arrow up */}
      <line x1="165" y1="100" x2="165" y2="70" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity={0.3} />
      <polygon points="158,72 172,72 165,62" fill={color} opacity={0.3} />
    </svg>
  );
}

/* ─── Illustration Maps ─── */
const meIllustrationMap: Record<number, React.FC<IllustrationProps>> = {
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

const financeIllustrationMap: Record<number, React.FC<IllustrationProps>> = {
  0: PFMoneyIllustration,
  1: PFSavingIllustration,
  2: PFDebtIllustration,
  3: PFCreditIllustration,
  4: PFBankingIllustration,
  5: PFInvestingIllustration,
  6: PFStocksIllustration,
  7: PFCryptoIllustration,
  8: PFRealEstateIllustration,
  9: PFRetirementIllustration,
  10: PFInsuranceIllustration,
  11: PFBigMovesIllustration,
};

const professionMaps: Record<string, Record<number, React.FC<IllustrationProps>>> = {
  'mechanical-engineering': meIllustrationMap,
  'personal-finance': financeIllustrationMap,
};

/**
 * Returns the illustration component for a given unit index.
 * Place this between lesson nodes in the CourseMap.
 */
export function UnitIllustration({ unitIndex, color, className, professionId }: { unitIndex: number; color: string; className?: string; professionId?: string }) {
  const map = (professionId && professionMaps[professionId]) || meIllustrationMap;
  const Component = map[unitIndex] ?? StaticsIllustration;
  return (
    <div aria-hidden="true">
      <Component color={color} className={className} />
    </div>
  );
}
