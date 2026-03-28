'use client';

import React from 'react';

type IconProps = { size?: number; className?: string };

// ─── Level 1: Apprentice — Simple bolt/nut ─────────────────────────────
export const ApprenticeIcon = ({ size = 64, className }: IconProps) => (
  <svg viewBox="0 0 64 64" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lvl-1-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#94A3B8" />
        <stop offset="100%" stopColor="#64748B" />
      </linearGradient>
      <linearGradient id="lvl-1-bolt" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#CBD5E1" />
        <stop offset="100%" stopColor="#94A3B8" />
      </linearGradient>
    </defs>
    {/* Badge background */}
    <circle cx="32" cy="32" r="28" fill="url(#lvl-1-bg)" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="32" cy="32" r="24" fill="#1E293B" opacity="0.15" stroke="none" />
    {/* Hex nut */}
    <polygon points="32,14 44,21 44,35 32,42 20,35 20,21" fill="url(#lvl-1-bolt)" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Inner hole */}
    <circle cx="32" cy="28" r="6" fill="#64748B" stroke="#475569" strokeWidth="1.5" />
    {/* Level number */}
    <text x="32" y="56" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#CBD5E1" fontFamily="system-ui">1</text>
  </svg>
);

// ─── Level 2: Shop Hand — Wrench ────────────────────────────────────────
export const ShopHandIcon = ({ size = 64, className }: IconProps) => (
  <svg viewBox="0 0 64 64" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lvl-2-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#94A3B8" />
        <stop offset="100%" stopColor="#64748B" />
      </linearGradient>
      <linearGradient id="lvl-2-wrench" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#E2E8F0" />
        <stop offset="100%" stopColor="#94A3B8" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="28" fill="url(#lvl-2-bg)" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="32" cy="32" r="24" fill="#1E293B" opacity="0.12" stroke="none" />
    {/* Wrench body */}
    <path d="M22 18 C18 22, 18 28, 22 32 L36 46 C38 48, 42 48, 44 46 C46 44, 46 40, 44 38 L30 24 C34 20, 34 14, 30 10 Z" fill="url(#lvl-2-wrench)" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Wrench jaw detail */}
    <path d="M22 18 L18 14 L14 18 L18 22" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Shine */}
    <path d="M26 22 L34 30" stroke="#E2E8F0" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
    <text x="32" y="56" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#CBD5E1" fontFamily="system-ui">2</text>
  </svg>
);

// ─── Level 3: Drafter — Ruler/straightedge ──────────────────────────────
export const DrafterIcon = ({ size = 64, className }: IconProps) => (
  <svg viewBox="0 0 64 64" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lvl-3-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#94A3B8" />
        <stop offset="100%" stopColor="#64748B" />
      </linearGradient>
      <linearGradient id="lvl-3-ruler" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#BFDBFE" />
        <stop offset="100%" stopColor="#93C5FD" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="28" fill="url(#lvl-3-bg)" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="32" cy="32" r="24" fill="#1E293B" opacity="0.12" stroke="none" />
    {/* Ruler body (diagonal) */}
    <rect x="10" y="26" width="44" height="12" rx="2" fill="url(#lvl-3-ruler)" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform="rotate(-30 32 32)" />
    {/* Ruler tick marks */}
    <line x1="18" y1="28" x2="18" y2="32" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" transform="rotate(-30 32 32)" />
    <line x1="24" y1="28" x2="24" y2="34" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" transform="rotate(-30 32 32)" />
    <line x1="30" y1="28" x2="30" y2="32" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" transform="rotate(-30 32 32)" />
    <line x1="36" y1="28" x2="36" y2="34" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" transform="rotate(-30 32 32)" />
    <line x1="42" y1="28" x2="42" y2="32" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" transform="rotate(-30 32 32)" />
    <line x1="48" y1="28" x2="48" y2="34" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" transform="rotate(-30 32 32)" />
    {/* Pencil beside ruler */}
    <line x1="44" y1="14" x2="24" y2="48" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="24" y1="48" x2="22" y2="50" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
    <text x="32" y="56" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#CBD5E1" fontFamily="system-ui">3</text>
  </svg>
);

// ─── Level 4: Junior Technician — Crossed wrench & screwdriver ──────────
export const JuniorTechIcon = ({ size = 64, className }: IconProps) => (
  <svg viewBox="0 0 64 64" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lvl-4-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#94A3B8" />
        <stop offset="100%" stopColor="#64748B" />
      </linearGradient>
      <linearGradient id="lvl-4-tool" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#E2E8F0" />
        <stop offset="100%" stopColor="#94A3B8" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="28" fill="url(#lvl-4-bg)" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="32" cy="32" r="24" fill="#1E293B" opacity="0.12" stroke="none" />
    {/* Wrench (left to right diagonal) */}
    <path d="M18 46 L40 18" stroke="url(#lvl-4-tool)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="42" cy="16" r="4" fill="none" stroke="#CBD5E1" strokeWidth="2" />
    {/* Screwdriver (right to left diagonal) */}
    <path d="M46 46 L24 18" stroke="url(#lvl-4-tool)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="20" y="12" width="4" height="8" rx="1" fill="#CBD5E1" stroke="#475569" strokeWidth="1.5" transform="rotate(35 22 16)" />
    {/* Center rivet */}
    <circle cx="32" cy="32" r="3" fill="#475569" stroke="#CBD5E1" strokeWidth="1.5" />
    <text x="32" y="56" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#CBD5E1" fontFamily="system-ui">4</text>
  </svg>
);

// ─── Level 5: Lab Assistant — Flask ─────────────────────────────────────
export const LabAssistantIcon = ({ size = 64, className }: IconProps) => (
  <svg viewBox="0 0 64 64" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lvl-5-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#94A3B8" />
        <stop offset="100%" stopColor="#64748B" />
      </linearGradient>
      <linearGradient id="lvl-5-liquid" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="28" fill="url(#lvl-5-bg)" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="32" cy="32" r="24" fill="#1E293B" opacity="0.12" stroke="none" />
    {/* Flask neck */}
    <rect x="28" y="12" width="8" height="14" rx="1" fill="none" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Flask body */}
    <path d="M28 26 L18 44 C17 46, 18 48, 20 48 L44 48 C46 48, 47 46, 46 44 L36 26" fill="none" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Liquid fill */}
    <path d="M22 40 L42 40 L46 44 C47 46, 46 48, 44 48 L20 48 C18 48, 17 46, 18 44 Z" fill="url(#lvl-5-liquid)" opacity="0.6" />
    {/* Bubbles */}
    <circle cx="28" cy="42" r="1.5" fill="#93C5FD" opacity="0.8" />
    <circle cx="34" cy="38" r="1" fill="#93C5FD" opacity="0.6" />
    <circle cx="38" cy="44" r="1.5" fill="#93C5FD" opacity="0.7" />
    {/* Stopper */}
    <rect x="29" y="10" width="6" height="3" rx="1" fill="#94A3B8" stroke="#475569" strokeWidth="1" />
    <text x="32" y="56" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#CBD5E1" fontFamily="system-ui">5</text>
  </svg>
);

// ─── Level 6: Design Intern — Compass/protractor ────────────────────────
export const DesignInternIcon = ({ size = 64, className }: IconProps) => (
  <svg viewBox="0 0 64 64" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lvl-6-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
      <linearGradient id="lvl-6-tool" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#DBEAFE" />
        <stop offset="100%" stopColor="#93C5FD" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="28" fill="url(#lvl-6-bg)" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="32" cy="32" r="24" fill="#1E3A8A" opacity="0.15" stroke="none" />
    {/* Protractor arc */}
    <path d="M16 38 A18 18 0 0 1 48 38" fill="none" stroke="url(#lvl-6-tool)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="16" y1="38" x2="48" y2="38" stroke="url(#lvl-6-tool)" strokeWidth="2" strokeLinecap="round" />
    {/* Tick marks on protractor */}
    <line x1="32" y1="20" x2="32" y2="24" stroke="#BFDBFE" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="22" y1="24" x2="24" y2="27" stroke="#BFDBFE" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="42" y1="24" x2="40" y2="27" stroke="#BFDBFE" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="18" y1="32" x2="21" y2="33" stroke="#BFDBFE" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="46" y1="32" x2="43" y2="33" stroke="#BFDBFE" strokeWidth="1.5" strokeLinecap="round" />
    {/* Compass needle */}
    <line x1="32" y1="38" x2="42" y2="24" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
    <circle cx="32" cy="38" r="2" fill="#1D4ED8" stroke="#BFDBFE" strokeWidth="1.5" />
    <text x="32" y="54" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#DBEAFE" fontFamily="system-ui">6</text>
  </svg>
);

// ─── Level 7: Associate Engineer — Single gear ──────────────────────────
export const AssociateEngIcon = ({ size = 64, className }: IconProps) => (
  <svg viewBox="0 0 64 64" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lvl-7-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
      <linearGradient id="lvl-7-gear" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#DBEAFE" />
        <stop offset="100%" stopColor="#93C5FD" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="30" r="28" fill="url(#lvl-7-bg)" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="32" cy="30" r="24" fill="#1E3A8A" opacity="0.15" stroke="none" />
    {/* Gear teeth - 8 teeth */}
    <path d="
      M32 12 L34 12 L35 16 L37 17 L40 14 L42 15 L40 19 L42 21 L46 20 L47 22 L43 25 L44 27 L48 28 L48 30
      L48 32 L44 33 L43 35 L47 38 L46 40 L42 39 L40 41 L42 45 L40 46 L37 43 L35 44 L34 48 L32 48
      L30 48 L29 44 L27 43 L24 46 L22 45 L24 41 L22 39 L18 40 L17 38 L21 35 L20 33 L16 32 L16 30
      L16 28 L20 27 L21 25 L17 22 L18 20 L22 21 L24 19 L22 15 L24 14 L27 17 L29 16 L30 12 Z
    " fill="url(#lvl-7-gear)" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Inner circle */}
    <circle cx="32" cy="30" r="8" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
    {/* Center axle */}
    <circle cx="32" cy="30" r="3" fill="#1E3A8A" stroke="#60A5FA" strokeWidth="1.5" />
    {/* Shine highlight */}
    <path d="M26 24 Q32 20 38 24" fill="none" stroke="#DBEAFE" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
    <text x="32" y="56" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#DBEAFE" fontFamily="system-ui">7</text>
  </svg>
);

// ─── Level 8: Project Engineer — Blueprint roll ─────────────────────────
export const ProjectEngIcon = ({ size = 64, className }: IconProps) => (
  <svg viewBox="0 0 64 64" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lvl-8-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
      <linearGradient id="lvl-8-paper" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#DBEAFE" />
        <stop offset="100%" stopColor="#BFDBFE" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="28" fill="url(#lvl-8-bg)" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="32" cy="32" r="24" fill="#1E3A8A" opacity="0.15" stroke="none" />
    {/* Unrolled blueprint */}
    <rect x="14" y="18" width="28" height="30" rx="2" fill="url(#lvl-8-paper)" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Blueprint grid lines */}
    <line x1="18" y1="24" x2="38" y2="24" stroke="#60A5FA" strokeWidth="0.8" opacity="0.5" />
    <line x1="18" y1="30" x2="38" y2="30" stroke="#60A5FA" strokeWidth="0.8" opacity="0.5" />
    <line x1="18" y1="36" x2="38" y2="36" stroke="#60A5FA" strokeWidth="0.8" opacity="0.5" />
    <line x1="18" y1="42" x2="38" y2="42" stroke="#60A5FA" strokeWidth="0.8" opacity="0.5" />
    {/* Blueprint drawing — simple box with dimension */}
    <rect x="20" y="26" width="14" height="10" fill="none" stroke="#1D4ED8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="20" y1="38" x2="34" y2="38" stroke="#1D4ED8" strokeWidth="1" strokeLinecap="round" />
    <line x1="20" y1="37" x2="20" y2="39" stroke="#1D4ED8" strokeWidth="1" strokeLinecap="round" />
    <line x1="34" y1="37" x2="34" y2="39" stroke="#1D4ED8" strokeWidth="1" strokeLinecap="round" />
    {/* Rolled portion */}
    <ellipse cx="44" cy="33" rx="4" ry="15" fill="#BFDBFE" stroke="#1D4ED8" strokeWidth="2" />
    <ellipse cx="44" cy="33" rx="2" ry="15" fill="#DBEAFE" stroke="none" opacity="0.5" />
    <text x="32" y="56" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#DBEAFE" fontFamily="system-ui">8</text>
  </svg>
);

// ─── Level 9: Stress Analyst — Stress diagram ──────────────────────────
export const StressAnalystIcon = ({ size = 64, className }: IconProps) => (
  <svg viewBox="0 0 64 64" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lvl-9-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
      <linearGradient id="lvl-9-bar" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#34D399" />
        <stop offset="50%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#EF4444" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="28" fill="url(#lvl-9-bg)" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="32" cy="32" r="24" fill="#1E3A8A" opacity="0.15" stroke="none" />
    {/* I-beam cross section */}
    <rect x="22" y="14" width="20" height="4" rx="1" fill="#BFDBFE" stroke="#1D4ED8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="30" y="18" width="4" height="18" fill="#BFDBFE" stroke="#1D4ED8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="22" y="36" width="20" height="4" rx="1" fill="#BFDBFE" stroke="#1D4ED8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Stress color gradient overlay on beam */}
    <rect x="30" y="18" width="4" height="18" fill="url(#lvl-9-bar)" opacity="0.4" />
    {/* Force arrows */}
    <line x1="32" y1="10" x2="32" y2="14" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
    <polyline points="30,12 32,14 34,12" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="32" y1="44" x2="32" y2="40" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
    <polyline points="30,42 32,40 34,42" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Small sigma label */}
    <text x="47" y="30" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#DBEAFE" fontFamily="serif" opacity="0.7">σ</text>
    <text x="32" y="56" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#DBEAFE" fontFamily="system-ui">9</text>
  </svg>
);

// ─── Level 10: Thermal Specialist — Thermometer ─────────────────────────
export const ThermalSpecIcon = ({ size = 64, className }: IconProps) => (
  <svg viewBox="0 0 64 64" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lvl-10-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
      <linearGradient id="lvl-10-temp" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#EF4444" />
        <stop offset="50%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#14B8A6" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="28" fill="url(#lvl-10-bg)" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="32" cy="32" r="24" fill="#1E3A8A" opacity="0.15" stroke="none" />
    {/* Thermometer body */}
    <rect x="28" y="12" width="8" height="28" rx="4" fill="#1E293B" stroke="#BFDBFE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Bulb */}
    <circle cx="32" cy="42" r="7" fill="#1E293B" stroke="#BFDBFE" strokeWidth="2" />
    {/* Mercury fill */}
    <rect x="30" y="20" width="4" height="20" rx="2" fill="url(#lvl-10-temp)" />
    <circle cx="32" cy="42" r="5" fill="#EF4444" />
    {/* Temperature lines */}
    <line x1="37" y1="18" x2="40" y2="18" stroke="#BFDBFE" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="37" y1="24" x2="40" y2="24" stroke="#BFDBFE" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="37" y1="30" x2="40" y2="30" stroke="#BFDBFE" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="37" y1="36" x2="40" y2="36" stroke="#BFDBFE" strokeWidth="1.5" strokeLinecap="round" />
    {/* Heat waves */}
    <path d="M20 20 Q18 24, 20 28" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <path d="M16 22 Q14 26, 16 30" fill="none" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    <text x="32" y="56" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#DBEAFE" fontFamily="system-ui">10</text>
  </svg>
);

// ─── Level 11: Design Lead — Pencil with gear ──────────────────────────
export const DesignLeadIcon = ({ size = 64, className }: IconProps) => (
  <svg viewBox="0 0 64 64" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lvl-11-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#34D399" />
        <stop offset="100%" stopColor="#10B981" />
      </linearGradient>
      <linearGradient id="lvl-11-pencil" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="28" fill="url(#lvl-11-bg)" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="32" cy="32" r="24" fill="#064E3B" opacity="0.15" stroke="none" />
    {/* Pencil */}
    <rect x="16" y="16" width="6" height="30" rx="1" fill="url(#lvl-11-pencil)" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform="rotate(-20 19 31)" />
    <polygon points="16,46 19,52 22,46" fill="#F8E8C8" stroke="#92400E" strokeWidth="1" transform="rotate(-20 19 49)" />
    {/* Small gear */}
    <path d="
      M42 28 L43 26 L45 26 L46 28 L48 28 L48 30 L46 31 L46 33 L48 34 L48 36 L46 36 L45 38 L43 38 L42 36 L40 36 L40 34 L42 33 L42 31 L40 30 L40 28 Z
    " fill="#A7F3D0" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="44" cy="32" r="3" fill="#10B981" stroke="#059669" strokeWidth="1.5" />
    <text x="32" y="56" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#D1FAE5" fontFamily="system-ui">11</text>
  </svg>
);

// ─── Level 12: Manufacturing Engineer — Factory/CNC ─────────────────────
export const ManufEngIcon = ({ size = 64, className }: IconProps) => (
  <svg viewBox="0 0 64 64" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lvl-12-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#34D399" />
        <stop offset="100%" stopColor="#10B981" />
      </linearGradient>
      <linearGradient id="lvl-12-bldg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#D1FAE5" />
        <stop offset="100%" stopColor="#6EE7B7" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="28" fill="url(#lvl-12-bg)" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="32" cy="32" r="24" fill="#064E3B" opacity="0.15" stroke="none" />
    {/* Factory building */}
    <rect x="14" y="28" width="36" height="18" rx="1" fill="url(#lvl-12-bldg)" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Sawtooth roof */}
    <polygon points="14,28 14,18 26,28" fill="#A7F3D0" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <polygon points="26,28 26,18 38,28" fill="#A7F3D0" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Smokestack */}
    <rect x="40" y="14" width="6" height="14" fill="#6EE7B7" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Smoke */}
    <circle cx="43" cy="12" r="2" fill="#D1FAE5" opacity="0.6" />
    <circle cx="45" cy="9" r="2.5" fill="#D1FAE5" opacity="0.4" />
    {/* Windows */}
    <rect x="18" y="32" width="4" height="4" rx="0.5" fill="#064E3B" opacity="0.3" />
    <rect x="26" y="32" width="4" height="4" rx="0.5" fill="#064E3B" opacity="0.3" />
    <rect x="34" y="32" width="4" height="4" rx="0.5" fill="#064E3B" opacity="0.3" />
    {/* Door */}
    <rect x="29" y="38" width="6" height="8" rx="1" fill="#064E3B" opacity="0.3" />
    <text x="32" y="56" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#D1FAE5" fontFamily="system-ui">12</text>
  </svg>
);

// ─── Level 13: Reliability Engineer — Chain links ───────────────────────
export const ReliabilityEngIcon = ({ size = 64, className }: IconProps) => (
  <svg viewBox="0 0 64 64" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lvl-13-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#34D399" />
        <stop offset="100%" stopColor="#10B981" />
      </linearGradient>
      <linearGradient id="lvl-13-chain" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#D1FAE5" />
        <stop offset="100%" stopColor="#6EE7B7" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="28" fill="url(#lvl-13-bg)" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="32" cy="32" r="24" fill="#064E3B" opacity="0.15" stroke="none" />
    {/* Chain link 1 */}
    <rect x="12" y="24" width="14" height="16" rx="8" fill="none" stroke="url(#lvl-13-chain)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    {/* Chain link 2 (interlocked) */}
    <rect x="22" y="24" width="14" height="16" rx="8" fill="none" stroke="url(#lvl-13-chain)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    {/* Chain link 3 (interlocked) */}
    <rect x="32" y="24" width="14" height="16" rx="8" fill="none" stroke="url(#lvl-13-chain)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    {/* Metallic shine on links */}
    <line x1="16" y1="27" x2="16" y2="30" stroke="#ECFDF5" strokeWidth="1" opacity="0.6" strokeLinecap="round" />
    <line x1="29" y1="27" x2="29" y2="30" stroke="#ECFDF5" strokeWidth="1" opacity="0.6" strokeLinecap="round" />
    <line x1="42" y1="27" x2="42" y2="30" stroke="#ECFDF5" strokeWidth="1" opacity="0.6" strokeLinecap="round" />
    {/* Checkmark above */}
    <polyline points="26,16 30,20 38,12" fill="none" stroke="#D1FAE5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <text x="32" y="54" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#D1FAE5" fontFamily="system-ui">13</text>
  </svg>
);

// ─── Level 14: Systems Engineer — Connected nodes ───────────────────────
export const SystemsEngIcon = ({ size = 64, className }: IconProps) => (
  <svg viewBox="0 0 64 64" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lvl-14-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#34D399" />
        <stop offset="100%" stopColor="#10B981" />
      </linearGradient>
      <linearGradient id="lvl-14-node" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ECFDF5" />
        <stop offset="100%" stopColor="#6EE7B7" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="28" fill="url(#lvl-14-bg)" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="32" cy="32" r="24" fill="#064E3B" opacity="0.15" stroke="none" />
    {/* Connection lines */}
    <line x1="32" y1="18" x2="20" y2="30" stroke="#A7F3D0" strokeWidth="2" strokeLinecap="round" />
    <line x1="32" y1="18" x2="44" y2="30" stroke="#A7F3D0" strokeWidth="2" strokeLinecap="round" />
    <line x1="20" y1="30" x2="26" y2="42" stroke="#A7F3D0" strokeWidth="2" strokeLinecap="round" />
    <line x1="44" y1="30" x2="38" y2="42" stroke="#A7F3D0" strokeWidth="2" strokeLinecap="round" />
    <line x1="20" y1="30" x2="44" y2="30" stroke="#A7F3D0" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    <line x1="26" y1="42" x2="38" y2="42" stroke="#A7F3D0" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    {/* Nodes */}
    <circle cx="32" cy="18" r="4" fill="url(#lvl-14-node)" stroke="#059669" strokeWidth="2" />
    <circle cx="20" cy="30" r="4" fill="url(#lvl-14-node)" stroke="#059669" strokeWidth="2" />
    <circle cx="44" cy="30" r="4" fill="url(#lvl-14-node)" stroke="#059669" strokeWidth="2" />
    <circle cx="26" cy="42" r="4" fill="url(#lvl-14-node)" stroke="#059669" strokeWidth="2" />
    <circle cx="38" cy="42" r="4" fill="url(#lvl-14-node)" stroke="#059669" strokeWidth="2" />
    {/* Center hub */}
    <circle cx="32" cy="30" r="3" fill="#10B981" stroke="#D1FAE5" strokeWidth="1.5" />
    <text x="32" y="56" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#D1FAE5" fontFamily="system-ui">14</text>
  </svg>
);

// ─── Level 15: Senior Engineer — Medal with star ────────────────────────
export const SeniorEngIcon = ({ size = 64, className }: IconProps) => (
  <svg viewBox="0 0 64 64" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lvl-15-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#34D399" />
        <stop offset="100%" stopColor="#10B981" />
      </linearGradient>
      <linearGradient id="lvl-15-medal" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
      <linearGradient id="lvl-15-ribbon" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#6EE7B7" />
        <stop offset="100%" stopColor="#10B981" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="28" fill="url(#lvl-15-bg)" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="32" cy="32" r="24" fill="#064E3B" opacity="0.15" stroke="none" />
    {/* Ribbon */}
    <polygon points="22,12 32,22 42,12 42,30 32,36 22,30" fill="url(#lvl-15-ribbon)" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Medal circle */}
    <circle cx="32" cy="34" r="12" fill="url(#lvl-15-medal)" stroke="#92400E" strokeWidth="2" />
    <circle cx="32" cy="34" r="9" fill="none" stroke="#FDE68A" strokeWidth="1" opacity="0.6" />
    {/* Star on medal */}
    <polygon points="32,26 34,31 39,31 35,35 36,40 32,37 28,40 29,35 25,31 30,31" fill="#FDE68A" stroke="#92400E" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    <text x="32" y="56" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#D1FAE5" fontFamily="system-ui">15</text>
  </svg>
);

// ─── Level 16: Materials Specialist — Crystal/diamond ───────────────────
export const MaterialsSpecIcon = ({ size = 64, className }: IconProps) => (
  <svg viewBox="0 0 64 64" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lvl-16-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
      <linearGradient id="lvl-16-gem" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FEF3C7" />
        <stop offset="40%" stopColor="#FDE68A" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="28" fill="url(#lvl-16-bg)" stroke="#92400E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="32" cy="32" r="24" fill="#78350F" opacity="0.12" stroke="none" />
    {/* Diamond shape */}
    <polygon points="32,12 46,26 32,48 18,26" fill="url(#lvl-16-gem)" stroke="#92400E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Crown facets */}
    <line x1="32" y1="12" x2="25" y2="26" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="32" y1="12" x2="39" y2="26" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="18" y1="26" x2="46" y2="26" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round" />
    {/* Pavilion facets */}
    <line x1="25" y1="26" x2="32" y2="48" stroke="#92400E" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    <line x1="39" y1="26" x2="32" y2="48" stroke="#92400E" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    {/* Sparkle */}
    <line x1="42" y1="16" x2="46" y2="12" stroke="#FEF3C7" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="44" y1="12" x2="44" y2="16" stroke="#FEF3C7" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="42" y1="14" x2="46" y2="14" stroke="#FEF3C7" strokeWidth="1.5" strokeLinecap="round" />
    <text x="32" y="56" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#FEF3C7" fontFamily="system-ui">16</text>
  </svg>
);

// ─── Level 17: Technical Lead — Clipboard with gear ─────────────────────
export const TechLeadIcon = ({ size = 64, className }: IconProps) => (
  <svg viewBox="0 0 64 64" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lvl-17-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
      <linearGradient id="lvl-17-board" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FEF3C7" />
        <stop offset="100%" stopColor="#FDE68A" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="28" fill="url(#lvl-17-bg)" stroke="#92400E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="32" cy="32" r="24" fill="#78350F" opacity="0.12" stroke="none" />
    {/* Clipboard body */}
    <rect x="18" y="16" width="28" height="32" rx="3" fill="url(#lvl-17-board)" stroke="#92400E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Clipboard clip */}
    <rect x="26" y="12" width="12" height="6" rx="2" fill="#D97706" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="28" y="10" width="8" height="4" rx="2" fill="none" stroke="#92400E" strokeWidth="1.5" />
    {/* Checklist lines */}
    <line x1="24" y1="26" x2="40" y2="26" stroke="#92400E" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
    <line x1="24" y1="31" x2="40" y2="31" stroke="#92400E" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
    <line x1="24" y1="36" x2="34" y2="36" stroke="#92400E" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
    {/* Small gear bottom-right */}
    <circle cx="40" cy="40" r="5" fill="#F59E0B" stroke="#92400E" strokeWidth="1.5" />
    <circle cx="40" cy="40" r="2" fill="#FDE68A" stroke="#92400E" strokeWidth="1" />
    {/* Gear teeth */}
    <line x1="40" y1="34" x2="40" y2="36" stroke="#92400E" strokeWidth="2" strokeLinecap="round" />
    <line x1="40" y1="44" x2="40" y2="46" stroke="#92400E" strokeWidth="2" strokeLinecap="round" />
    <line x1="34" y1="40" x2="36" y2="40" stroke="#92400E" strokeWidth="2" strokeLinecap="round" />
    <line x1="44" y1="40" x2="46" y2="40" stroke="#92400E" strokeWidth="2" strokeLinecap="round" />
    <text x="32" y="56" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#FEF3C7" fontFamily="system-ui">17</text>
  </svg>
);

// ─── Level 18: Principal Engineer — Classical pillar ────────────────────
export const PrincipalEngIcon = ({ size = 64, className }: IconProps) => (
  <svg viewBox="0 0 64 64" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lvl-18-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
      <linearGradient id="lvl-18-pillar" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="50%" stopColor="#FEF3C7" />
        <stop offset="100%" stopColor="#FDE68A" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="28" fill="url(#lvl-18-bg)" stroke="#92400E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="32" cy="32" r="24" fill="#78350F" opacity="0.12" stroke="none" />
    {/* Capital (top) */}
    <rect x="20" y="14" width="24" height="4" rx="1" fill="#FDE68A" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M24 18 Q32 22 40 18" fill="none" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round" />
    {/* Column shaft with fluting */}
    <rect x="24" y="18" width="16" height="24" fill="url(#lvl-18-pillar)" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Fluting lines */}
    <line x1="28" y1="18" x2="28" y2="42" stroke="#D97706" strokeWidth="0.8" opacity="0.3" />
    <line x1="32" y1="18" x2="32" y2="42" stroke="#D97706" strokeWidth="0.8" opacity="0.3" />
    <line x1="36" y1="18" x2="36" y2="42" stroke="#D97706" strokeWidth="0.8" opacity="0.3" />
    {/* Base */}
    <rect x="20" y="42" width="24" height="4" rx="1" fill="#FDE68A" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="18" y="46" width="28" height="3" rx="1" fill="#D97706" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Laurel sprigs on sides */}
    <path d="M16 30 Q12 28, 14 24 Q16 26, 16 30" fill="#34D399" stroke="#059669" strokeWidth="1" opacity="0.6" />
    <path d="M16 34 Q12 32, 14 28 Q16 30, 16 34" fill="#34D399" stroke="#059669" strokeWidth="1" opacity="0.6" />
    <path d="M48 30 Q52 28, 50 24 Q48 26, 48 30" fill="#34D399" stroke="#059669" strokeWidth="1" opacity="0.6" />
    <path d="M48 34 Q52 32, 50 28 Q48 30, 48 34" fill="#34D399" stroke="#059669" strokeWidth="1" opacity="0.6" />
    <text x="32" y="56" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#FEF3C7" fontFamily="system-ui">18</text>
  </svg>
);

// ─── Level 19: R&D Innovator — Lightbulb with gear inside ──────────────
export const RnDInnovatorIcon = ({ size = 64, className }: IconProps) => (
  <svg viewBox="0 0 64 64" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lvl-19-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
      <linearGradient id="lvl-19-bulb" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FEF9C3" />
        <stop offset="100%" stopColor="#FDE68A" />
      </linearGradient>
      <linearGradient id="lvl-19-glow" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#FBBF24" stopOpacity="0" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="28" fill="url(#lvl-19-bg)" stroke="#92400E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="32" cy="32" r="24" fill="#78350F" opacity="0.12" stroke="none" />
    {/* Glow effect */}
    <circle cx="32" cy="24" r="16" fill="url(#lvl-19-glow)" />
    {/* Bulb shape */}
    <path d="M24 28 Q24 14 32 12 Q40 14 40 28 Q40 34 36 38 L28 38 Q24 34 24 28 Z" fill="url(#lvl-19-bulb)" stroke="#92400E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Base threads */}
    <rect x="27" y="38" width="10" height="3" rx="1" fill="#D97706" stroke="#92400E" strokeWidth="1" />
    <rect x="28" y="41" width="8" height="2" rx="1" fill="#D97706" stroke="#92400E" strokeWidth="1" />
    <rect x="29" y="43" width="6" height="2" rx="1" fill="#D97706" stroke="#92400E" strokeWidth="1" />
    {/* Gear inside bulb */}
    <circle cx="32" cy="26" r="6" fill="none" stroke="#D97706" strokeWidth="1.5" />
    <circle cx="32" cy="26" r="2.5" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
    {/* Gear teeth inside */}
    <line x1="32" y1="19" x2="32" y2="21" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
    <line x1="32" y1="31" x2="32" y2="33" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
    <line x1="25" y1="26" x2="27" y2="26" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
    <line x1="37" y1="26" x2="39" y2="26" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
    {/* Rays */}
    <line x1="18" y1="14" x2="22" y2="18" stroke="#FEF3C7" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <line x1="46" y1="14" x2="42" y2="18" stroke="#FEF3C7" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <line x1="14" y1="26" x2="19" y2="26" stroke="#FEF3C7" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <line x1="50" y1="26" x2="45" y2="26" stroke="#FEF3C7" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <text x="32" y="56" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#FEF3C7" fontFamily="system-ui">19</text>
  </svg>
);

// ─── Level 20: Engineering Manager — Clipboard with team dots ───────────
export const EngManagerIcon = ({ size = 64, className }: IconProps) => (
  <svg viewBox="0 0 64 64" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lvl-20-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
      <linearGradient id="lvl-20-board" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FEF3C7" />
        <stop offset="100%" stopColor="#FDE68A" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="28" fill="url(#lvl-20-bg)" stroke="#92400E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="32" cy="32" r="24" fill="#78350F" opacity="0.15" stroke="none" />
    {/* Clipboard */}
    <rect x="18" y="14" width="28" height="34" rx="3" fill="url(#lvl-20-board)" stroke="#92400E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="26" y="10" width="12" height="6" rx="2" fill="#D97706" stroke="#92400E" strokeWidth="1.5" />
    {/* Team hierarchy - leader */}
    <circle cx="32" cy="24" r="3" fill="#D97706" stroke="#92400E" strokeWidth="1.5" />
    {/* Team members */}
    <circle cx="24" cy="34" r="2.5" fill="#F59E0B" stroke="#92400E" strokeWidth="1" />
    <circle cx="32" cy="34" r="2.5" fill="#F59E0B" stroke="#92400E" strokeWidth="1" />
    <circle cx="40" cy="34" r="2.5" fill="#F59E0B" stroke="#92400E" strokeWidth="1" />
    {/* Connection lines */}
    <line x1="32" y1="27" x2="24" y2="31" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="32" y1="27" x2="32" y2="31" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="32" y1="27" x2="40" y2="31" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round" />
    {/* Sub-team dots */}
    <circle cx="22" cy="42" r="1.5" fill="#FBBF24" stroke="#92400E" strokeWidth="0.8" />
    <circle cx="27" cy="42" r="1.5" fill="#FBBF24" stroke="#92400E" strokeWidth="0.8" />
    <circle cx="37" cy="42" r="1.5" fill="#FBBF24" stroke="#92400E" strokeWidth="0.8" />
    <circle cx="42" cy="42" r="1.5" fill="#FBBF24" stroke="#92400E" strokeWidth="0.8" />
    <line x1="24" y1="37" x2="22" y2="40" stroke="#92400E" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    <line x1="24" y1="37" x2="27" y2="40" stroke="#92400E" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    <line x1="40" y1="37" x2="37" y2="40" stroke="#92400E" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    <line x1="40" y1="37" x2="42" y2="40" stroke="#92400E" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    <text x="32" y="56" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#FEF3C7" fontFamily="system-ui">20</text>
  </svg>
);

// ─── Level 21: Staff Engineer — Star badge ──────────────────────────────
export const StaffEngIcon = ({ size = 64, className }: IconProps) => (
  <svg viewBox="0 0 64 64" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lvl-21-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F87171" />
        <stop offset="100%" stopColor="#EF4444" />
      </linearGradient>
      <linearGradient id="lvl-21-star" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FEF2F2" />
        <stop offset="100%" stopColor="#FECACA" />
      </linearGradient>
      <linearGradient id="lvl-21-badge" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FCA5A5" />
        <stop offset="100%" stopColor="#DC2626" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="28" fill="url(#lvl-21-bg)" stroke="#991B1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="32" cy="32" r="24" fill="#7F1D1D" opacity="0.15" stroke="none" />
    {/* Shield shape */}
    <path d="M32 10 L48 18 L48 34 Q48 46 32 52 Q16 46 16 34 L16 18 Z" fill="url(#lvl-21-badge)" stroke="#991B1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M32 14 L44 20 L44 33 Q44 43 32 48 Q20 43 20 33 L20 20 Z" fill="none" stroke="#FECACA" strokeWidth="1" opacity="0.4" />
    {/* Star */}
    <polygon points="32,18 35,27 44,27 37,33 39,42 32,37 25,42 27,33 20,27 29,27" fill="url(#lvl-21-star)" stroke="#991B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <text x="32" y="56" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#FEE2E2" fontFamily="system-ui">21</text>
  </svg>
);

// ─── Level 22: Domain Expert — Brain with circuits ──────────────────────
export const DomainExpertIcon = ({ size = 64, className }: IconProps) => (
  <svg viewBox="0 0 64 64" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lvl-22-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#A78BFA" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
      <linearGradient id="lvl-22-brain" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#EDE9FE" />
        <stop offset="100%" stopColor="#C4B5FD" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="28" fill="url(#lvl-22-bg)" stroke="#5B21B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="32" cy="32" r="24" fill="#4C1D95" opacity="0.15" stroke="none" />
    {/* Brain left hemisphere */}
    <path d="M32 16 Q22 16 20 24 Q18 30 22 34 Q20 38 24 42 Q28 46 32 44" fill="url(#lvl-22-brain)" stroke="#5B21B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Brain right hemisphere */}
    <path d="M32 16 Q42 16 44 24 Q46 30 42 34 Q44 38 40 42 Q36 46 32 44" fill="url(#lvl-22-brain)" stroke="#5B21B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Brain folds */}
    <path d="M32 16 L32 44" stroke="#5B21B6" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M24 24 Q28 26 32 24" stroke="#5B21B6" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    <path d="M32 24 Q36 26 40 24" stroke="#5B21B6" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    <path d="M22 32 Q27 34 32 32" stroke="#5B21B6" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    <path d="M32 32 Q37 34 42 32" stroke="#5B21B6" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    {/* Circuit nodes */}
    <circle cx="20" cy="28" r="2" fill="#A78BFA" stroke="#EDE9FE" strokeWidth="1" />
    <circle cx="44" cy="28" r="2" fill="#A78BFA" stroke="#EDE9FE" strokeWidth="1" />
    <circle cx="24" cy="40" r="2" fill="#A78BFA" stroke="#EDE9FE" strokeWidth="1" />
    <circle cx="40" cy="40" r="2" fill="#A78BFA" stroke="#EDE9FE" strokeWidth="1" />
    {/* Circuit lines */}
    <line x1="18" y1="28" x2="14" y2="28" stroke="#C4B5FD" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="46" y1="28" x2="50" y2="28" stroke="#C4B5FD" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="14" y1="28" x2="14" y2="34" stroke="#C4B5FD" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="50" y1="28" x2="50" y2="34" stroke="#C4B5FD" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="14" cy="34" r="1.5" fill="#C4B5FD" />
    <circle cx="50" cy="34" r="1.5" fill="#C4B5FD" />
    <text x="32" y="56" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#EDE9FE" fontFamily="system-ui">22</text>
  </svg>
);

// ─── Level 23: Distinguished Engineer — Trophy with laurels ─────────────
export const DistinguishedEngIcon = ({ size = 64, className }: IconProps) => (
  <svg viewBox="0 0 64 64" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lvl-23-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#A78BFA" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
      <linearGradient id="lvl-23-trophy" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="28" fill="url(#lvl-23-bg)" stroke="#5B21B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="32" cy="32" r="24" fill="#4C1D95" opacity="0.15" stroke="none" />
    {/* Trophy cup */}
    <path d="M22 14 L42 14 L40 32 Q40 38 32 38 Q24 38 24 32 Z" fill="url(#lvl-23-trophy)" stroke="#92400E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Trophy handles */}
    <path d="M22 18 Q14 18 14 24 Q14 30 22 30" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M42 18 Q50 18 50 24 Q50 30 42 30" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Trophy stem */}
    <rect x="30" y="38" width="4" height="6" fill="#D97706" stroke="#92400E" strokeWidth="1" />
    {/* Trophy base */}
    <rect x="24" y="44" width="16" height="3" rx="1" fill="#D97706" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Star on trophy */}
    <polygon points="32,18 33.5,22 38,22 34.5,25 36,29 32,26 28,29 29.5,25 26,22 30.5,22" fill="#FEF3C7" stroke="#92400E" strokeWidth="0.8" />
    {/* Laurel left */}
    <path d="M16 36 Q12 32, 14 28" fill="none" stroke="#34D399" strokeWidth="2" strokeLinecap="round" />
    <path d="M14 28 Q10 24, 12 20" fill="none" stroke="#34D399" strokeWidth="2" strokeLinecap="round" />
    <path d="M12 20 Q10 16, 14 14" fill="none" stroke="#34D399" strokeWidth="2" strokeLinecap="round" />
    {/* Laurel leaves left */}
    <ellipse cx="14" cy="30" rx="2" ry="4" fill="#34D399" opacity="0.5" transform="rotate(-20 14 30)" />
    <ellipse cx="12" cy="24" rx="2" ry="4" fill="#34D399" opacity="0.5" transform="rotate(-10 12 24)" />
    {/* Laurel right */}
    <path d="M48 36 Q52 32, 50 28" fill="none" stroke="#34D399" strokeWidth="2" strokeLinecap="round" />
    <path d="M50 28 Q54 24, 52 20" fill="none" stroke="#34D399" strokeWidth="2" strokeLinecap="round" />
    <path d="M52 20 Q54 16, 50 14" fill="none" stroke="#34D399" strokeWidth="2" strokeLinecap="round" />
    {/* Laurel leaves right */}
    <ellipse cx="50" cy="30" rx="2" ry="4" fill="#34D399" opacity="0.5" transform="rotate(20 50 30)" />
    <ellipse cx="52" cy="24" rx="2" ry="4" fill="#34D399" opacity="0.5" transform="rotate(10 52 24)" />
    <text x="32" y="56" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#EDE9FE" fontFamily="system-ui">23</text>
  </svg>
);

// ─── Level 24: Chief Engineer — Professional badge with tie ─────────────
export const ChiefEngIcon = ({ size = 64, className }: IconProps) => (
  <svg viewBox="0 0 64 64" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lvl-24-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#C084FC" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
      <linearGradient id="lvl-24-badge" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
      <linearGradient id="lvl-24-tie" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#5B21B6" />
        <stop offset="100%" stopColor="#4C1D95" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="28" fill="url(#lvl-24-bg)" stroke="#5B21B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="32" cy="32" r="24" fill="#4C1D95" opacity="0.15" stroke="none" />
    {/* Shield badge background */}
    <path d="M32 10 L46 18 L46 34 Q46 48 32 52 Q18 48 18 34 L18 18 Z" fill="url(#lvl-24-badge)" stroke="#92400E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Inner shield border */}
    <path d="M32 14 L42 20 L42 33 Q42 44 32 48 Q22 44 22 33 L22 20 Z" fill="none" stroke="#FEF3C7" strokeWidth="1" opacity="0.5" />
    {/* Tie */}
    <polygon points="32,18 36,22 34,36 32,38 30,36 28,22" fill="url(#lvl-24-tie)" stroke="#5B21B6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Tie knot */}
    <circle cx="32" cy="20" r="2.5" fill="#7C3AED" stroke="#5B21B6" strokeWidth="1" />
    {/* Collar */}
    <path d="M26 18 L32 16 L38 18" fill="none" stroke="#FEF3C7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Stars */}
    <polygon points="26,28 27,30 29,30 27.5,31.5 28,33.5 26,32.5 24,33.5 24.5,31.5 23,30 25,30" fill="#FEF3C7" stroke="none" />
    <polygon points="38,28 39,30 41,30 39.5,31.5 40,33.5 38,32.5 36,33.5 36.5,31.5 35,30 37,30" fill="#FEF3C7" stroke="none" />
    <text x="32" y="56" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#EDE9FE" fontFamily="system-ui">24</text>
  </svg>
);

// ─── Level 25: Engineering Fellow — Graduation cap with gear ────────────
export const EngFellowIcon = ({ size = 64, className }: IconProps) => (
  <svg viewBox="0 0 64 64" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lvl-25-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
      <linearGradient id="lvl-25-cap" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1E293B" />
        <stop offset="100%" stopColor="#0F172A" />
      </linearGradient>
      <linearGradient id="lvl-25-gold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="50%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="28" fill="url(#lvl-25-bg)" stroke="#92400E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="32" cy="32" r="24" fill="#78350F" opacity="0.15" stroke="none" />
    {/* Mortarboard top */}
    <polygon points="32,12 52,22 32,28 12,22" fill="url(#lvl-25-cap)" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Cap bottom part */}
    <path d="M20 24 L20 34 Q20 38 32 40 Q44 38 44 34 L44 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Tassel string */}
    <line x1="32" y1="22" x2="46" y2="22" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="46" y1="22" x2="46" y2="34" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" />
    {/* Tassel end */}
    <rect x="44" y="34" width="4" height="4" rx="1" fill="#FBBF24" stroke="#92400E" strokeWidth="1" />
    <line x1="44" y1="38" x2="44" y2="42" stroke="#FBBF24" strokeWidth="1" strokeLinecap="round" />
    <line x1="46" y1="38" x2="46" y2="43" stroke="#FBBF24" strokeWidth="1" strokeLinecap="round" />
    <line x1="48" y1="38" x2="48" y2="41" stroke="#FBBF24" strokeWidth="1" strokeLinecap="round" />
    {/* Gear below cap */}
    <circle cx="32" cy="44" r="6" fill="url(#lvl-25-gold)" stroke="#92400E" strokeWidth="1.5" />
    <circle cx="32" cy="44" r="3" fill="#D97706" stroke="#92400E" strokeWidth="1" />
    {/* Gear teeth indicators */}
    <line x1="32" y1="37" x2="32" y2="39" stroke="#92400E" strokeWidth="2" strokeLinecap="round" />
    <line x1="32" y1="49" x2="32" y2="51" stroke="#92400E" strokeWidth="2" strokeLinecap="round" />
    <line x1="25" y1="44" x2="27" y2="44" stroke="#92400E" strokeWidth="2" strokeLinecap="round" />
    <line x1="37" y1="44" x2="39" y2="44" stroke="#92400E" strokeWidth="2" strokeLinecap="round" />
    <text x="32" y="58" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#FEF3C7" fontFamily="system-ui">25</text>
  </svg>
);

// ─── Level 26: Technical Director — Key with gear head ──────────────────
export const TechDirectorIcon = ({ size = 64, className }: IconProps) => (
  <svg viewBox="0 0 64 64" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lvl-26-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFD54F" />
        <stop offset="100%" stopColor="#FFB800" />
      </linearGradient>
      <linearGradient id="lvl-26-key" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFF8E1" />
        <stop offset="30%" stopColor="#FFD54F" />
        <stop offset="100%" stopColor="#C68A00" />
      </linearGradient>
      <linearGradient id="lvl-26-shine" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="28" fill="url(#lvl-26-bg)" stroke="#92400E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="32" cy="32" r="25" fill="url(#lvl-26-shine)" />
    <circle cx="32" cy="32" r="24" fill="#78350F" opacity="0.1" stroke="none" />
    {/* Gear head of key */}
    <circle cx="24" cy="22" r="10" fill="url(#lvl-26-key)" stroke="#92400E" strokeWidth="2" />
    <circle cx="24" cy="22" r="5" fill="#FFB800" stroke="#92400E" strokeWidth="1.5" />
    {/* Gear teeth on key head */}
    <line x1="24" y1="11" x2="24" y2="13" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="24" y1="31" x2="24" y2="33" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="13" y1="22" x2="15" y2="22" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="33" y1="22" x2="35" y2="22" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="17" y1="15" x2="18.5" y2="16.5" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="29.5" y1="27.5" x2="31" y2="29" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="17" y1="29" x2="18.5" y2="27.5" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="29.5" y1="16.5" x2="31" y2="15" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" />
    {/* Key shaft */}
    <rect x="32" y="20" width="18" height="4" rx="1" fill="url(#lvl-26-key)" stroke="#92400E" strokeWidth="1.5" />
    {/* Key teeth */}
    <rect x="44" y="24" width="3" height="5" rx="0.5" fill="url(#lvl-26-key)" stroke="#92400E" strokeWidth="1" />
    <rect x="48" y="24" width="3" height="8" rx="0.5" fill="url(#lvl-26-key)" stroke="#92400E" strokeWidth="1" />
    {/* Metallic shine */}
    <line x1="34" y1="21" x2="42" y2="21" stroke="#FFF8E1" strokeWidth="1" opacity="0.6" strokeLinecap="round" />
    <text x="32" y="56" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#78350F" fontFamily="system-ui">26</text>
  </svg>
);

// ─── Level 27: VP of Engineering — Tower with star ──────────────────────
export const VPEngIcon = ({ size = 64, className }: IconProps) => (
  <svg viewBox="0 0 64 64" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lvl-27-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFD54F" />
        <stop offset="100%" stopColor="#FFB800" />
      </linearGradient>
      <linearGradient id="lvl-27-bldg" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#FFF8E1" />
        <stop offset="50%" stopColor="#FFD54F" />
        <stop offset="100%" stopColor="#C68A00" />
      </linearGradient>
      <linearGradient id="lvl-27-shine" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="28" fill="url(#lvl-27-bg)" stroke="#92400E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="32" cy="32" r="25" fill="url(#lvl-27-shine)" />
    <circle cx="32" cy="32" r="24" fill="#78350F" opacity="0.1" stroke="none" />
    {/* Main tower */}
    <rect x="26" y="18" width="12" height="30" rx="1" fill="url(#lvl-27-bldg)" stroke="#92400E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Tower spire */}
    <polygon points="29,18 32,10 35,18" fill="#FFD54F" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Windows */}
    <rect x="29" y="22" width="3" height="3" rx="0.5" fill="#92400E" opacity="0.3" />
    <rect x="33" y="22" width="3" height="3" rx="0.5" fill="#92400E" opacity="0.3" />
    <rect x="29" y="28" width="3" height="3" rx="0.5" fill="#92400E" opacity="0.3" />
    <rect x="33" y="28" width="3" height="3" rx="0.5" fill="#92400E" opacity="0.3" />
    <rect x="29" y="34" width="3" height="3" rx="0.5" fill="#92400E" opacity="0.3" />
    <rect x="33" y="34" width="3" height="3" rx="0.5" fill="#92400E" opacity="0.3" />
    {/* Side wings */}
    <rect x="16" y="28" width="10" height="20" rx="1" fill="#FFD54F" stroke="#92400E" strokeWidth="1.5" />
    <rect x="38" y="28" width="10" height="20" rx="1" fill="#FFD54F" stroke="#92400E" strokeWidth="1.5" />
    {/* Side windows */}
    <rect x="19" y="32" width="3" height="3" rx="0.5" fill="#92400E" opacity="0.3" />
    <rect x="42" y="32" width="3" height="3" rx="0.5" fill="#92400E" opacity="0.3" />
    <rect x="19" y="38" width="3" height="3" rx="0.5" fill="#92400E" opacity="0.3" />
    <rect x="42" y="38" width="3" height="3" rx="0.5" fill="#92400E" opacity="0.3" />
    {/* Door */}
    <rect x="30" y="42" width="4" height="6" rx="1" fill="#92400E" opacity="0.4" />
    {/* Star at top */}
    <polygon points="32,8 33,10 35,10 33.5,11.5 34,13.5 32,12.5 30,13.5 30.5,11.5 29,10 31,10" fill="#FFF8E1" stroke="#92400E" strokeWidth="0.5" />
    {/* Ground line */}
    <line x1="12" y1="48" x2="52" y2="48" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round" />
    <text x="32" y="56" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#78350F" fontFamily="system-ui">27</text>
  </svg>
);

// ─── Level 28: CTO — Briefcase with circuit board ──────────────────────
export const CTOIcon = ({ size = 64, className }: IconProps) => (
  <svg viewBox="0 0 64 64" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lvl-28-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFD54F" />
        <stop offset="100%" stopColor="#FFB800" />
      </linearGradient>
      <linearGradient id="lvl-28-case" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFF8E1" />
        <stop offset="50%" stopColor="#FFD54F" />
        <stop offset="100%" stopColor="#C68A00" />
      </linearGradient>
      <linearGradient id="lvl-28-shine" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="28" fill="url(#lvl-28-bg)" stroke="#92400E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="32" cy="32" r="25" fill="url(#lvl-28-shine)" />
    <circle cx="32" cy="32" r="24" fill="#78350F" opacity="0.1" stroke="none" />
    {/* Briefcase handle */}
    <path d="M26 18 L26 14 Q26 12 28 12 L36 12 Q38 12 38 14 L38 18" fill="none" stroke="#92400E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Briefcase body */}
    <rect x="14" y="18" width="36" height="26" rx="3" fill="url(#lvl-28-case)" stroke="#92400E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Briefcase clasp */}
    <rect x="29" y="16" width="6" height="4" rx="1" fill="#C68A00" stroke="#92400E" strokeWidth="1" />
    {/* Center divider */}
    <line x1="14" y1="30" x2="50" y2="30" stroke="#C68A00" strokeWidth="1.5" strokeLinecap="round" />
    {/* Circuit traces on briefcase */}
    <line x1="20" y1="24" x2="28" y2="24" stroke="#92400E" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    <line x1="28" y1="24" x2="28" y2="28" stroke="#92400E" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    <line x1="36" y1="22" x2="36" y2="28" stroke="#92400E" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    <line x1="36" y1="22" x2="44" y2="22" stroke="#92400E" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    {/* Circuit nodes */}
    <circle cx="28" cy="24" r="1.5" fill="#C68A00" opacity="0.6" />
    <circle cx="36" cy="22" r="1.5" fill="#C68A00" opacity="0.6" />
    <circle cx="28" cy="28" r="1.5" fill="#C68A00" opacity="0.6" />
    {/* Lower circuit traces */}
    <line x1="20" y1="34" x2="24" y2="34" stroke="#92400E" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    <line x1="24" y1="34" x2="24" y2="40" stroke="#92400E" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    <line x1="32" y1="34" x2="32" y2="38" stroke="#92400E" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    <line x1="32" y1="38" x2="44" y2="38" stroke="#92400E" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    <circle cx="24" cy="34" r="1.5" fill="#C68A00" opacity="0.6" />
    <circle cx="32" cy="38" r="1.5" fill="#C68A00" opacity="0.6" />
    {/* Chip in center */}
    <rect x="28" y="32" width="8" height="8" rx="1" fill="#C68A00" stroke="#92400E" strokeWidth="1" opacity="0.6" />
    <text x="32" y="56" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#78350F" fontFamily="system-ui">28</text>
  </svg>
);

// ─── Level 29: Engineering Legend — Blazing star with aura ──────────────
export const EngLegendIcon = ({ size = 64, className }: IconProps) => (
  <svg viewBox="0 0 64 64" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lvl-29-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFD54F" />
        <stop offset="100%" stopColor="#FFB800" />
      </linearGradient>
      <linearGradient id="lvl-29-star" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="40%" stopColor="#FFF8E1" />
        <stop offset="100%" stopColor="#FFD54F" />
      </linearGradient>
      <radialGradient id="lvl-29-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
        <stop offset="40%" stopColor="#FFD54F" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#FFB800" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="lvl-29-shine" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="28" fill="url(#lvl-29-bg)" stroke="#92400E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="32" cy="32" r="25" fill="url(#lvl-29-shine)" />
    <circle cx="32" cy="32" r="24" fill="#78350F" opacity="0.08" stroke="none" />
    {/* Outer glow aura */}
    <circle cx="32" cy="30" r="20" fill="url(#lvl-29-glow)" />
    {/* Aura rays */}
    <line x1="32" y1="6" x2="32" y2="12" stroke="#FFF8E1" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
    <line x1="32" y1="48" x2="32" y2="54" stroke="#FFF8E1" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    <line x1="8" y1="30" x2="14" y2="30" stroke="#FFF8E1" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    <line x1="50" y1="30" x2="56" y2="30" stroke="#FFF8E1" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    <line x1="14" y1="14" x2="18" y2="18" stroke="#FFF8E1" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    <line x1="46" y1="18" x2="50" y2="14" stroke="#FFF8E1" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    <line x1="14" y1="46" x2="18" y2="42" stroke="#FFF8E1" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
    <line x1="46" y1="42" x2="50" y2="46" stroke="#FFF8E1" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
    {/* Main star - large 8-pointed */}
    <polygon points="32,10 35,24 46,16 38,27 52,30 38,33 46,44 35,36 32,50 29,36 18,44 26,33 12,30 26,27 18,16 29,24" fill="url(#lvl-29-star)" stroke="#C68A00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Inner star glow */}
    <circle cx="32" cy="30" r="6" fill="#FFFFFF" opacity="0.4" />
    <circle cx="32" cy="30" r="3" fill="#FFFFFF" opacity="0.7" />
    {/* Sparkles */}
    <circle cx="22" cy="18" r="1" fill="#FFF8E1" />
    <circle cx="44" cy="22" r="1" fill="#FFF8E1" />
    <circle cx="20" cy="40" r="1" fill="#FFF8E1" opacity="0.6" />
    <circle cx="46" cy="38" r="1" fill="#FFF8E1" opacity="0.6" />
    <text x="32" y="56" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#78350F" fontFamily="system-ui">29</text>
  </svg>
);

// ─── Level 30: Mechanical Grandmaster — Crown with gears, laurels ──────
export const GrandmasterIcon = ({ size = 64, className }: IconProps) => (
  <svg viewBox="0 0 64 64" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lvl-30-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFD54F" />
        <stop offset="100%" stopColor="#FFB800" />
      </linearGradient>
      <linearGradient id="lvl-30-crown" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="30%" stopColor="#FFF8E1" />
        <stop offset="70%" stopColor="#FFD54F" />
        <stop offset="100%" stopColor="#C68A00" />
      </linearGradient>
      <linearGradient id="lvl-30-metallic" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#C68A00" />
        <stop offset="30%" stopColor="#FFD54F" />
        <stop offset="50%" stopColor="#FFF8E1" />
        <stop offset="70%" stopColor="#FFD54F" />
        <stop offset="100%" stopColor="#C68A00" />
      </linearGradient>
      <radialGradient id="lvl-30-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
        <stop offset="50%" stopColor="#FFD54F" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#FFB800" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="lvl-30-shine" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
    </defs>
    {/* Outer ring glow */}
    <circle cx="32" cy="32" r="30" fill="url(#lvl-30-glow)" />
    <circle cx="32" cy="32" r="28" fill="url(#lvl-30-bg)" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="32" cy="32" r="26" fill="url(#lvl-30-shine)" />
    <circle cx="32" cy="32" r="24" fill="#78350F" opacity="0.08" stroke="none" />
    {/* Decorative border ring */}
    <circle cx="32" cy="32" r="24" fill="none" stroke="#C68A00" strokeWidth="1" strokeDasharray="3 2" opacity="0.4" />
    {/* Left laurel branch */}
    <path d="M14 44 Q8 38, 10 32" fill="none" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M10 32 Q8 26, 12 22" fill="none" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 22 Q10 16, 16 14" fill="none" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" />
    <ellipse cx="12" cy="35" rx="3" ry="5" fill="#34D399" opacity="0.4" transform="rotate(-15 12 35)" />
    <ellipse cx="10" cy="28" rx="3" ry="5" fill="#34D399" opacity="0.4" transform="rotate(-5 10 28)" />
    <ellipse cx="12" cy="20" rx="2.5" ry="4" fill="#34D399" opacity="0.4" transform="rotate(10 12 20)" />
    {/* Right laurel branch */}
    <path d="M50 44 Q56 38, 54 32" fill="none" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M54 32 Q56 26, 52 22" fill="none" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M52 22 Q54 16, 48 14" fill="none" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" />
    <ellipse cx="52" cy="35" rx="3" ry="5" fill="#34D399" opacity="0.4" transform="rotate(15 52 35)" />
    <ellipse cx="54" cy="28" rx="3" ry="5" fill="#34D399" opacity="0.4" transform="rotate(5 54 28)" />
    <ellipse cx="52" cy="20" rx="2.5" ry="4" fill="#34D399" opacity="0.4" transform="rotate(-10 52 20)" />
    {/* Crown body */}
    <path d="M18 38 L18 24 L24 30 L28 18 L32 28 L36 18 L40 30 L46 24 L46 38 Z" fill="url(#lvl-30-crown)" stroke="#92400E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Crown base band */}
    <rect x="18" y="36" width="28" height="6" rx="1" fill="url(#lvl-30-metallic)" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Jewels on crown points */}
    <circle cx="18" cy="24" r="2.5" fill="#EF4444" stroke="#92400E" strokeWidth="1" />
    <circle cx="28" cy="18" r="2.5" fill="#3B82F6" stroke="#92400E" strokeWidth="1" />
    <circle cx="32" cy="28" r="2.5" fill="#FFFFFF" stroke="#92400E" strokeWidth="1" />
    <circle cx="36" cy="18" r="2.5" fill="#10B981" stroke="#92400E" strokeWidth="1" />
    <circle cx="46" cy="24" r="2.5" fill="#EF4444" stroke="#92400E" strokeWidth="1" />
    {/* Crown band jewels */}
    <circle cx="26" cy="39" r="1.5" fill="#8B5CF6" stroke="#92400E" strokeWidth="0.5" />
    <circle cx="32" cy="39" r="2" fill="#EF4444" stroke="#92400E" strokeWidth="0.5" />
    <circle cx="38" cy="39" r="1.5" fill="#8B5CF6" stroke="#92400E" strokeWidth="0.5" />
    {/* Gears at base */}
    <circle cx="24" cy="48" r="4" fill="#FFD54F" stroke="#92400E" strokeWidth="1.5" />
    <circle cx="24" cy="48" r="1.5" fill="#C68A00" stroke="#92400E" strokeWidth="0.8" />
    <line x1="24" y1="43" x2="24" y2="45" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="24" y1="51" x2="24" y2="53" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="19" y1="48" x2="21" y2="48" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="27" y1="48" x2="29" y2="48" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="40" cy="48" r="4" fill="#FFD54F" stroke="#92400E" strokeWidth="1.5" />
    <circle cx="40" cy="48" r="1.5" fill="#C68A00" stroke="#92400E" strokeWidth="0.8" />
    <line x1="40" y1="43" x2="40" y2="45" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="40" y1="51" x2="40" y2="53" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="35" y1="48" x2="37" y2="48" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="43" y1="48" x2="45" y2="48" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round" />
    {/* Sparkle effects */}
    <line x1="14" y1="10" x2="16" y2="12" stroke="#FFF8E1" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <line x1="13" y1="11" x2="17" y2="11" stroke="#FFF8E1" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <line x1="48" y1="10" x2="50" y2="12" stroke="#FFF8E1" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <line x1="47" y1="11" x2="51" y2="11" stroke="#FFF8E1" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <text x="32" y="58" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#78350F" fontFamily="system-ui">30</text>
  </svg>
);

// ─── Level Icon Map ─────────────────────────────────────────────────────
export const levelIconMap: Record<number, React.FC<IconProps>> = {
  1: ApprenticeIcon,
  2: ShopHandIcon,
  3: DrafterIcon,
  4: JuniorTechIcon,
  5: LabAssistantIcon,
  6: DesignInternIcon,
  7: AssociateEngIcon,
  8: ProjectEngIcon,
  9: StressAnalystIcon,
  10: ThermalSpecIcon,
  11: DesignLeadIcon,
  12: ManufEngIcon,
  13: ReliabilityEngIcon,
  14: SystemsEngIcon,
  15: SeniorEngIcon,
  16: MaterialsSpecIcon,
  17: TechLeadIcon,
  18: PrincipalEngIcon,
  19: RnDInnovatorIcon,
  20: EngManagerIcon,
  21: StaffEngIcon,
  22: DomainExpertIcon,
  23: DistinguishedEngIcon,
  24: ChiefEngIcon,
  25: EngFellowIcon,
  26: TechDirectorIcon,
  27: VPEngIcon,
  28: CTOIcon,
  29: EngLegendIcon,
  30: GrandmasterIcon,
};
