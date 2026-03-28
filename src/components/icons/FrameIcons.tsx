'use client';

import React from 'react';

type FrameIconProps = { size?: number; className?: string };

// ============================================================================
// Helper: avatar placeholder circle (gray circle representing user avatar)
// ============================================================================
const AvatarPlaceholder = () => (
  <circle cx="32" cy="32" r="16" fill="#D1D5DB" />
);

// ============================================================================
// SHOP FRAMES — Common
// ============================================================================

/** Gold Ring — common, metallic gold ring */
export const FrameGoldRing: React.FC<FrameIconProps> = ({ size = 64, className }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="frame-gold-ring-grad" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="50%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="28" stroke="url(#frame-gold-ring-grad)" strokeWidth="4" fill="none" />
    <circle cx="32" cy="32" r="24" stroke="#F59E0B" strokeWidth="1" fill="none" opacity="0.3" />
    <AvatarPlaceholder />
  </svg>
);

/** Emerald Halo — common, soft green glow */
export const FrameEmeraldHalo: React.FC<FrameIconProps> = ({ size = 64, className }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="frame-emerald-halo-glow" cx="50%" cy="50%" r="50%">
        <stop offset="60%" stopColor="transparent" />
        <stop offset="80%" stopColor="rgba(16,185,129,0.3)" />
        <stop offset="100%" stopColor="rgba(16,185,129,0)" />
      </radialGradient>
      <linearGradient id="frame-emerald-halo-ring" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#6EE7B7" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#frame-emerald-halo-glow)" />
    <circle cx="32" cy="32" r="26" stroke="url(#frame-emerald-halo-ring)" strokeWidth="3" fill="none" />
    <circle cx="32" cy="32" r="28.5" stroke="#10B981" strokeWidth="0.5" fill="none" opacity="0.4" />
    <AvatarPlaceholder />
  </svg>
);

/** Ruby Blaze — common, fiery red energy */
export const FrameRubyBlaze: React.FC<FrameIconProps> = ({ size = 64, className }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="frame-ruby-blaze-grad" x1="32" y1="0" x2="32" y2="64">
        <stop offset="0%" stopColor="#FCA5A5" />
        <stop offset="50%" stopColor="#EF4444" />
        <stop offset="100%" stopColor="#991B1B" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="27" stroke="url(#frame-ruby-blaze-grad)" strokeWidth="3.5" fill="none" />
    {/* flame tips */}
    <path d="M32 3 L34 8 L32 6 L30 8 Z" fill="#EF4444" opacity="0.8" />
    <path d="M32 61 L34 56 L32 58 L30 56 Z" fill="#EF4444" opacity="0.8" />
    <path d="M3 32 L8 30 L6 32 L8 34 Z" fill="#EF4444" opacity="0.8" />
    <path d="M61 32 L56 30 L58 32 L56 34 Z" fill="#EF4444" opacity="0.8" />
    <path d="M10 10 L14 12 L12 14 Z" fill="#EF4444" opacity="0.5" />
    <path d="M54 10 L50 12 L52 14 Z" fill="#EF4444" opacity="0.5" />
    <path d="M10 54 L14 52 L12 50 Z" fill="#EF4444" opacity="0.5" />
    <path d="M54 54 L50 52 L52 50 Z" fill="#EF4444" opacity="0.5" />
    <AvatarPlaceholder />
  </svg>
);

/** Sapphire Wave — common, deep blue */
export const FrameSapphireWave: React.FC<FrameIconProps> = ({ size = 64, className }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="frame-sapphire-wave-grad" x1="0" y1="32" x2="64" y2="32">
        <stop offset="0%" stopColor="#93C5FD" />
        <stop offset="50%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="27" stroke="url(#frame-sapphire-wave-grad)" strokeWidth="3" fill="none" />
    {/* wave pattern */}
    <path d="M7 28 Q12 24 17 28 Q22 32 27 28" stroke="#3B82F6" strokeWidth="1.5" fill="none" opacity="0.4" />
    <path d="M37 36 Q42 32 47 36 Q52 40 57 36" stroke="#3B82F6" strokeWidth="1.5" fill="none" opacity="0.4" />
    <AvatarPlaceholder />
  </svg>
);

/** Brushed Steel — common, simple gray metallic */
export const FrameBrushedSteel: React.FC<FrameIconProps> = ({ size = 64, className }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="frame-steel-grad" x1="0" y1="0" x2="64" y2="0">
        <stop offset="0%" stopColor="#D4D4D8" />
        <stop offset="25%" stopColor="#A1A1AA" />
        <stop offset="50%" stopColor="#D4D4D8" />
        <stop offset="75%" stopColor="#9CA3AF" />
        <stop offset="100%" stopColor="#D4D4D8" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="27" stroke="url(#frame-steel-grad)" strokeWidth="4" fill="none" />
    <AvatarPlaceholder />
  </svg>
);

/** Copper Pipe — common, warm copper tones */
export const FrameCopperPipe: React.FC<FrameIconProps> = ({ size = 64, className }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="frame-copper-grad" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="30%" stopColor="#D97706" />
        <stop offset="60%" stopColor="#B45309" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="27" stroke="url(#frame-copper-grad)" strokeWidth="4" fill="none" />
    {/* patina spots */}
    <circle cx="14" cy="18" r="1.5" fill="#059669" opacity="0.3" />
    <circle cx="50" cy="46" r="1" fill="#059669" opacity="0.25" />
    <AvatarPlaceholder />
  </svg>
);

/** Hex Bolt — common, hexagonal mechanical frame */
export const FrameHexBolt: React.FC<FrameIconProps> = ({ size = 64, className }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="frame-bolt-grad" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#A1A1AA" />
        <stop offset="50%" stopColor="#71717A" />
        <stop offset="100%" stopColor="#52525B" />
      </linearGradient>
    </defs>
    {/* hexagonal shape */}
    <polygon
      points="32,4 56,18 56,46 32,60 8,46 8,18"
      stroke="url(#frame-bolt-grad)" strokeWidth="3" fill="none"
    />
    {/* bolt head details at vertices */}
    <circle cx="32" cy="4" r="2" fill="#71717A" />
    <circle cx="56" cy="18" r="2" fill="#71717A" />
    <circle cx="56" cy="46" r="2" fill="#71717A" />
    <circle cx="32" cy="60" r="2" fill="#71717A" />
    <circle cx="8" cy="46" r="2" fill="#71717A" />
    <circle cx="8" cy="18" r="2" fill="#71717A" />
    <AvatarPlaceholder />
  </svg>
);

/** Blueprint Border — common, white lines on blue */
export const FrameBlueprintBorder: React.FC<FrameIconProps> = ({ size = 64, className }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="frame-blueprint-bg" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#1E40AF" />
        <stop offset="100%" stopColor="#2563EB" />
      </linearGradient>
    </defs>
    {/* blue background ring */}
    <circle cx="32" cy="32" r="28" stroke="url(#frame-blueprint-bg)" strokeWidth="6" fill="none" />
    {/* grid lines on the ring */}
    <circle cx="32" cy="32" r="28" stroke="white" strokeWidth="0.5" fill="none" opacity="0.6" />
    <circle cx="32" cy="32" r="25" stroke="white" strokeWidth="0.3" fill="none" opacity="0.4" />
    <circle cx="32" cy="32" r="31" stroke="white" strokeWidth="0.3" fill="none" opacity="0.4" />
    {/* crosshair marks */}
    <line x1="32" y1="2" x2="32" y2="8" stroke="white" strokeWidth="0.5" opacity="0.5" />
    <line x1="32" y1="56" x2="32" y2="62" stroke="white" strokeWidth="0.5" opacity="0.5" />
    <line x1="2" y1="32" x2="8" y2="32" stroke="white" strokeWidth="0.5" opacity="0.5" />
    <line x1="56" y1="32" x2="62" y2="32" stroke="white" strokeWidth="0.5" opacity="0.5" />
    {/* dimension ticks */}
    <line x1="18" y1="3" x2="18" y2="6" stroke="white" strokeWidth="0.3" opacity="0.3" />
    <line x1="46" y1="3" x2="46" y2="6" stroke="white" strokeWidth="0.3" opacity="0.3" />
    <line x1="18" y1="58" x2="18" y2="61" stroke="white" strokeWidth="0.3" opacity="0.3" />
    <line x1="46" y1="58" x2="46" y2="61" stroke="white" strokeWidth="0.3" opacity="0.3" />
    <AvatarPlaceholder />
  </svg>
);

/** Titanium Band — common, light metallic gray */
export const FrameTitaniumBand: React.FC<FrameIconProps> = ({ size = 64, className }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="frame-titanium-grad" x1="0" y1="0" x2="0" y2="64">
        <stop offset="0%" stopColor="#E4E4E7" />
        <stop offset="30%" stopColor="#A1A1AA" />
        <stop offset="50%" stopColor="#D4D4D8" />
        <stop offset="70%" stopColor="#A1A1AA" />
        <stop offset="100%" stopColor="#E4E4E7" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="27" stroke="url(#frame-titanium-grad)" strokeWidth="4.5" fill="none" />
    <circle cx="32" cy="32" r="29.5" stroke="#A1A1AA" strokeWidth="0.5" fill="none" opacity="0.3" />
    <circle cx="32" cy="32" r="24.5" stroke="#A1A1AA" strokeWidth="0.5" fill="none" opacity="0.3" />
    <AvatarPlaceholder />
  </svg>
);

/** Rivet Ring — common, ring with rivet dots */
export const FrameRivetRing: React.FC<FrameIconProps> = ({ size = 64, className }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="frame-rivet-grad" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#A8A29E" />
        <stop offset="50%" stopColor="#78716C" />
        <stop offset="100%" stopColor="#57534E" />
      </linearGradient>
      <radialGradient id="frame-rivet-dot">
        <stop offset="0%" stopColor="#A8A29E" />
        <stop offset="100%" stopColor="#57534E" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="27" stroke="url(#frame-rivet-grad)" strokeWidth="3.5" fill="none" />
    {/* rivets around the ring (12 positions) */}
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => {
      const rad = (angle * Math.PI) / 180;
      const x = 32 + 27 * Math.cos(rad);
      const y = 32 + 27 * Math.sin(rad);
      return <circle key={angle} cx={x} cy={y} r="2" fill="url(#frame-rivet-dot)" stroke="#57534E" strokeWidth="0.5" />;
    })}
    <AvatarPlaceholder />
  </svg>
);

/** Cast Iron — common, heavy dark frame */
export const FrameCastIron: React.FC<FrameIconProps> = ({ size = 64, className }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="frame-castiron-grad" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#78716C" />
        <stop offset="40%" stopColor="#57534E" />
        <stop offset="100%" stopColor="#44403C" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="27" stroke="url(#frame-castiron-grad)" strokeWidth="5" fill="none" />
    {/* texture lines */}
    <circle cx="32" cy="32" r="29" stroke="#44403C" strokeWidth="0.5" fill="none" opacity="0.5" strokeDasharray="2 3" />
    <circle cx="32" cy="32" r="25" stroke="#44403C" strokeWidth="0.5" fill="none" opacity="0.5" strokeDasharray="2 3" />
    <AvatarPlaceholder />
  </svg>
);

/** Coil Spring — common, spring coil pattern */
export const FrameCoilSpring: React.FC<FrameIconProps> = ({ size = 64, className }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="frame-spring-grad" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#6EE7B7" />
        <stop offset="50%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#047857" />
      </linearGradient>
    </defs>
    {/* coil spring effect using dashed circles */}
    <circle cx="32" cy="32" r="27" stroke="url(#frame-spring-grad)" strokeWidth="3" fill="none" strokeDasharray="6 3" />
    <circle cx="32" cy="32" r="24" stroke="#10B981" strokeWidth="1.5" fill="none" opacity="0.4" strokeDasharray="6 3" strokeDashoffset="4" />
    <circle cx="32" cy="32" r="30" stroke="#10B981" strokeWidth="1.5" fill="none" opacity="0.3" strokeDasharray="6 3" strokeDashoffset="8" />
    <AvatarPlaceholder />
  </svg>
);

/** Gear Teeth — common, gear-toothed ring */
export const FrameGearTeeth: React.FC<FrameIconProps> = ({ size = 64, className }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="frame-gear-grad" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#A8A29E" />
        <stop offset="50%" stopColor="#78716C" />
        <stop offset="100%" stopColor="#57534E" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="24" stroke="url(#frame-gear-grad)" strokeWidth="3" fill="none" />
    {/* gear teeth */}
    {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((angle) => {
      const rad = (angle * Math.PI) / 180;
      const ix = 32 + 24 * Math.cos(rad);
      const iy = 32 + 24 * Math.sin(rad);
      const ox = 32 + 30 * Math.cos(rad);
      const oy = 32 + 30 * Math.sin(rad);
      const perpRad = rad + Math.PI / 2;
      const tw = 2.5;
      return (
        <polygon
          key={angle}
          points={`${ix + tw * Math.cos(perpRad)},${iy + tw * Math.sin(perpRad)} ${ox + tw * Math.cos(perpRad)},${oy + tw * Math.sin(perpRad)} ${ox - tw * Math.cos(perpRad)},${oy - tw * Math.sin(perpRad)} ${ix - tw * Math.cos(perpRad)},${iy - tw * Math.sin(perpRad)}`}
          fill="#78716C"
        />
      );
    })}
    <AvatarPlaceholder />
  </svg>
);

/** Gasket Seal — common, red rubber gasket ring */
export const FrameGasketSeal: React.FC<FrameIconProps> = ({ size = 64, className }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="frame-gasket-grad" x1="0" y1="0" x2="0" y2="64">
        <stop offset="0%" stopColor="#FCA5A5" />
        <stop offset="50%" stopColor="#DC2626" />
        <stop offset="100%" stopColor="#991B1B" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="27" stroke="url(#frame-gasket-grad)" strokeWidth="4" fill="none" />
    <circle cx="32" cy="32" r="29.5" stroke="#DC2626" strokeWidth="0.8" fill="none" opacity="0.4" />
    <circle cx="32" cy="32" r="24.5" stroke="#DC2626" strokeWidth="0.8" fill="none" opacity="0.4" />
    {/* compression marks */}
    <circle cx="32" cy="32" r="27" stroke="#7F1D1D" strokeWidth="0.4" fill="none" strokeDasharray="1 5" opacity="0.5" />
    <AvatarPlaceholder />
  </svg>
);

/** Bare Wire — common, thin gold wire */
export const FrameBareWire: React.FC<FrameIconProps> = ({ size = 64, className }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="frame-wire-grad" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="50%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
    </defs>
    {/* twisted wire pattern */}
    <circle cx="32" cy="32" r="27" stroke="url(#frame-wire-grad)" strokeWidth="1.5" fill="none" />
    <circle cx="32" cy="32" r="25.5" stroke="#F59E0B" strokeWidth="1" fill="none" opacity="0.5" strokeDasharray="4 4" />
    <circle cx="32" cy="32" r="28.5" stroke="#F59E0B" strokeWidth="1" fill="none" opacity="0.3" strokeDasharray="4 4" strokeDashoffset="4" />
    {/* exposed wire ends */}
    <line x1="5" y1="30" x2="3" y2="28" stroke="#F59E0B" strokeWidth="1" opacity="0.6" />
    <line x1="5" y1="34" x2="3" y2="36" stroke="#F59E0B" strokeWidth="1" opacity="0.6" />
    <AvatarPlaceholder />
  </svg>
);

/** Concrete Ring — common, solid gray ring */
export const FrameConcreteRing: React.FC<FrameIconProps> = ({ size = 64, className }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="frame-concrete-grad" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#D4D4D4" />
        <stop offset="50%" stopColor="#A3A3A3" />
        <stop offset="100%" stopColor="#737373" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="27" stroke="url(#frame-concrete-grad)" strokeWidth="5" fill="none" />
    {/* aggregate/speckle texture */}
    <circle cx="15" cy="12" r="0.8" fill="#737373" opacity="0.4" />
    <circle cx="50" cy="16" r="0.6" fill="#737373" opacity="0.3" />
    <circle cx="52" cy="48" r="0.7" fill="#737373" opacity="0.4" />
    <circle cx="12" cy="50" r="0.9" fill="#737373" opacity="0.3" />
    <circle cx="32" cy="4" r="0.5" fill="#737373" opacity="0.3" />
    <circle cx="32" cy="60" r="0.6" fill="#737373" opacity="0.3" />
    <AvatarPlaceholder />
  </svg>
);

// ============================================================================
// SHOP FRAMES — Rare
// ============================================================================

/** Diamond Aura — rare, prismatic indigo glow */
export const FrameDiamondAura: React.FC<FrameIconProps> = ({ size = 64, className }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="frame-diamond-aura-glow" cx="50%" cy="50%" r="50%">
        <stop offset="50%" stopColor="transparent" />
        <stop offset="75%" stopColor="rgba(129,140,248,0.25)" />
        <stop offset="100%" stopColor="rgba(129,140,248,0)" />
      </radialGradient>
      <linearGradient id="frame-diamond-aura-ring" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#C7D2FE" />
        <stop offset="25%" stopColor="#818CF8" />
        <stop offset="50%" stopColor="#A5B4FC" />
        <stop offset="75%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#C7D2FE" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="31" fill="url(#frame-diamond-aura-glow)" />
    <circle cx="32" cy="32" r="26" stroke="url(#frame-diamond-aura-ring)" strokeWidth="3" fill="none" />
    <circle cx="32" cy="32" r="29" stroke="#818CF8" strokeWidth="0.5" fill="none" opacity="0.4" />
    {/* sparkle points */}
    <circle cx="32" cy="3" r="1" fill="#818CF8" opacity="0.7" />
    <circle cx="61" cy="32" r="1" fill="#818CF8" opacity="0.7" />
    <circle cx="32" cy="61" r="1" fill="#818CF8" opacity="0.7" />
    <circle cx="3" cy="32" r="1" fill="#818CF8" opacity="0.7" />
    <AvatarPlaceholder />
  </svg>
);

/** Sunset Gradient — rare, warm orange-to-pink */
export const FrameSunsetGradient: React.FC<FrameIconProps> = ({ size = 64, className }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="frame-sunset-grad" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="30%" stopColor="#F97316" />
        <stop offset="60%" stopColor="#EC4899" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
      <radialGradient id="frame-sunset-glow" cx="50%" cy="50%" r="50%">
        <stop offset="55%" stopColor="transparent" />
        <stop offset="80%" stopColor="rgba(249,115,22,0.2)" />
        <stop offset="100%" stopColor="rgba(249,115,22,0)" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="31" fill="url(#frame-sunset-glow)" />
    <circle cx="32" cy="32" r="26" stroke="url(#frame-sunset-grad)" strokeWidth="3.5" fill="none" />
    <AvatarPlaceholder />
  </svg>
);

/** Torque Wrench — rare, wrench-shaped mechanical frame */
export const FrameTorqueWrench: React.FC<FrameIconProps> = ({ size = 64, className }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="frame-wrench-grad" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#94A3B8" />
        <stop offset="50%" stopColor="#64748B" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="26" stroke="url(#frame-wrench-grad)" strokeWidth="3" fill="none" />
    {/* wrench jaw details at top */}
    <rect x="27" y="2" width="10" height="6" rx="1" fill="#64748B" />
    <rect x="29" y="3" width="6" height="4" rx="0.5" fill="#94A3B8" />
    {/* wrench jaw details at bottom */}
    <rect x="27" y="56" width="10" height="6" rx="1" fill="#64748B" />
    <rect x="29" y="57" width="6" height="4" rx="0.5" fill="#94A3B8" />
    {/* torque indicator marks */}
    {[45, 90, 135, 225, 270, 315].map((angle) => {
      const rad = (angle * Math.PI) / 180;
      const x1 = 32 + 23 * Math.cos(rad);
      const y1 = 32 + 23 * Math.sin(rad);
      const x2 = 32 + 26 * Math.cos(rad);
      const y2 = 32 + 26 * Math.sin(rad);
      return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#64748B" strokeWidth="1" opacity="0.5" />;
    })}
    <AvatarPlaceholder />
  </svg>
);

/** Piston Ring — rare, engine piston style */
export const FramePistonRing: React.FC<FrameIconProps> = ({ size = 64, className }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="frame-piston-grad" x1="0" y1="0" x2="0" y2="64">
        <stop offset="0%" stopColor="#FCA5A5" />
        <stop offset="50%" stopColor="#DC2626" />
        <stop offset="100%" stopColor="#7F1D1D" />
      </linearGradient>
    </defs>
    {/* piston ring segments */}
    <circle cx="32" cy="32" r="27" stroke="url(#frame-piston-grad)" strokeWidth="3.5" fill="none" />
    {/* ring gap */}
    <line x1="59" y1="31" x2="59" y2="33" stroke="#FAFAFA" strokeWidth="2" />
    {/* compression ring grooves */}
    <circle cx="32" cy="32" r="24.5" stroke="#DC2626" strokeWidth="0.5" fill="none" opacity="0.4" />
    <circle cx="32" cy="32" r="29.5" stroke="#DC2626" strokeWidth="0.5" fill="none" opacity="0.4" />
    {/* cylinder wall marks */}
    <line x1="4" y1="20" x2="4" y2="44" stroke="#DC2626" strokeWidth="0.5" opacity="0.2" />
    <line x1="60" y1="20" x2="60" y2="44" stroke="#DC2626" strokeWidth="0.5" opacity="0.2" />
    <AvatarPlaceholder />
  </svg>
);

/** Circuit Board — rare, PCB traces */
export const FrameCircuitBoard: React.FC<FrameIconProps> = ({ size = 64, className }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="frame-circuit-grad" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#4ADE80" />
        <stop offset="50%" stopColor="#22C55E" />
        <stop offset="100%" stopColor="#15803D" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="26" stroke="url(#frame-circuit-grad)" strokeWidth="2.5" fill="none" />
    {/* circuit traces radiating outward */}
    <line x1="32" y1="6" x2="32" y2="2" stroke="#22C55E" strokeWidth="1" />
    <line x1="32" y1="2" x2="40" y2="2" stroke="#22C55E" strokeWidth="1" />
    <line x1="32" y1="62" x2="32" y2="58" stroke="#22C55E" strokeWidth="1" />
    <line x1="32" y1="62" x2="24" y2="62" stroke="#22C55E" strokeWidth="1" />
    <line x1="6" y1="32" x2="2" y2="32" stroke="#22C55E" strokeWidth="1" />
    <line x1="2" y1="32" x2="2" y2="24" stroke="#22C55E" strokeWidth="1" />
    <line x1="58" y1="32" x2="62" y2="32" stroke="#22C55E" strokeWidth="1" />
    <line x1="62" y1="32" x2="62" y2="40" stroke="#22C55E" strokeWidth="1" />
    {/* node dots */}
    <circle cx="40" cy="2" r="1.5" fill="#22C55E" />
    <circle cx="24" cy="62" r="1.5" fill="#22C55E" />
    <circle cx="2" cy="24" r="1.5" fill="#22C55E" />
    <circle cx="62" cy="40" r="1.5" fill="#22C55E" />
    {/* diagonal traces */}
    <line x1="49" y1="9" x2="54" y2="4" stroke="#22C55E" strokeWidth="0.8" opacity="0.6" />
    <line x1="15" y1="55" x2="10" y2="60" stroke="#22C55E" strokeWidth="0.8" opacity="0.6" />
    <circle cx="54" cy="4" r="1" fill="#22C55E" opacity="0.6" />
    <circle cx="10" cy="60" r="1" fill="#22C55E" opacity="0.6" />
    <AvatarPlaceholder />
  </svg>
);

/** Thermal Gradient — rare, hot-to-cold heat map */
export const FrameThermalGradient: React.FC<FrameIconProps> = ({ size = 64, className }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="frame-thermal-grad" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#EF4444" />
        <stop offset="25%" stopColor="#F97316" />
        <stop offset="50%" stopColor="#EAB308" />
        <stop offset="75%" stopColor="#22C55E" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
      <radialGradient id="frame-thermal-glow" cx="50%" cy="50%" r="50%">
        <stop offset="55%" stopColor="transparent" />
        <stop offset="80%" stopColor="rgba(239,68,68,0.15)" />
        <stop offset="100%" stopColor="rgba(59,130,246,0.1)" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="31" fill="url(#frame-thermal-glow)" />
    <circle cx="32" cy="32" r="26" stroke="url(#frame-thermal-grad)" strokeWidth="3.5" fill="none" />
    {/* temperature scale marks */}
    <line x1="8" y1="8" x2="10" y2="10" stroke="#EF4444" strokeWidth="1" opacity="0.5" />
    <line x1="56" y1="56" x2="54" y2="54" stroke="#3B82F6" strokeWidth="1" opacity="0.5" />
    <AvatarPlaceholder />
  </svg>
);

/** Weld Bead — rare, welded golden seam */
export const FrameWeldBead: React.FC<FrameIconProps> = ({ size = 64, className }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="frame-weld-grad" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="30%" stopColor="#F59E0B" />
        <stop offset="70%" stopColor="#D97706" />
        <stop offset="100%" stopColor="#FDE68A" />
      </linearGradient>
      <radialGradient id="frame-weld-glow" cx="50%" cy="50%" r="50%">
        <stop offset="55%" stopColor="transparent" />
        <stop offset="80%" stopColor="rgba(245,158,11,0.2)" />
        <stop offset="100%" stopColor="rgba(245,158,11,0)" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="31" fill="url(#frame-weld-glow)" />
    {/* weld bead (zigzag pattern along ring) */}
    <circle cx="32" cy="32" r="27" stroke="url(#frame-weld-grad)" strokeWidth="3" fill="none" />
    <circle cx="32" cy="32" r="27" stroke="#FDE68A" strokeWidth="1" fill="none" opacity="0.6" strokeDasharray="2 2" />
    {/* spark spots */}
    <circle cx="12" cy="15" r="0.8" fill="#FDE68A" opacity="0.7" />
    <circle cx="52" cy="49" r="0.8" fill="#FDE68A" opacity="0.7" />
    <circle cx="48" cy="12" r="0.6" fill="#FDE68A" opacity="0.5" />
    <circle cx="16" cy="52" r="0.6" fill="#FDE68A" opacity="0.5" />
    <AvatarPlaceholder />
  </svg>
);

// ============================================================================
// SHOP FRAMES — Epic
// ============================================================================

/** Aurora Borealis — epic, shifting teal-to-violet glow */
export const FrameAuroraBorealis: React.FC<FrameIconProps> = ({ size = 64, className }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="frame-aurora-grad" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#2DD4BF" />
        <stop offset="30%" stopColor="#22D3EE" />
        <stop offset="50%" stopColor="#818CF8" />
        <stop offset="70%" stopColor="#A78BFA" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
      <radialGradient id="frame-aurora-glow" cx="50%" cy="50%" r="50%">
        <stop offset="45%" stopColor="transparent" />
        <stop offset="70%" stopColor="rgba(139,92,246,0.2)" />
        <stop offset="85%" stopColor="rgba(34,211,238,0.15)" />
        <stop offset="100%" stopColor="rgba(139,92,246,0)" />
      </radialGradient>
      <linearGradient id="frame-aurora-outer" x1="0" y1="0" x2="64" y2="0">
        <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.3" />
        <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0.3" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="31" fill="url(#frame-aurora-glow)" />
    <circle cx="32" cy="32" r="26" stroke="url(#frame-aurora-grad)" strokeWidth="3" fill="none" />
    <circle cx="32" cy="32" r="30" stroke="url(#frame-aurora-outer)" strokeWidth="1.5" fill="none" />
    {/* aurora shimmer particles */}
    <circle cx="10" cy="20" r="1" fill="#2DD4BF" opacity="0.5" />
    <circle cx="54" cy="44" r="1" fill="#8B5CF6" opacity="0.5" />
    <circle cx="20" cy="54" r="0.8" fill="#22D3EE" opacity="0.4" />
    <circle cx="44" cy="10" r="0.8" fill="#A78BFA" opacity="0.4" />
    <circle cx="8" cy="38" r="0.6" fill="#2DD4BF" opacity="0.3" />
    <circle cx="56" cy="26" r="0.6" fill="#8B5CF6" opacity="0.3" />
    <AvatarPlaceholder />
  </svg>
);

/** Neon Pulse — epic, electric cyan glow */
export const FrameNeonPulse: React.FC<FrameIconProps> = ({ size = 64, className }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="frame-neon-grad" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#67E8F9" />
        <stop offset="50%" stopColor="#22D3EE" />
        <stop offset="100%" stopColor="#0891B2" />
      </linearGradient>
      <radialGradient id="frame-neon-glow" cx="50%" cy="50%" r="50%">
        <stop offset="40%" stopColor="transparent" />
        <stop offset="65%" stopColor="rgba(34,211,238,0.3)" />
        <stop offset="85%" stopColor="rgba(34,211,238,0.15)" />
        <stop offset="100%" stopColor="rgba(34,211,238,0)" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="31" fill="url(#frame-neon-glow)" />
    <circle cx="32" cy="32" r="26" stroke="url(#frame-neon-grad)" strokeWidth="2.5" fill="none" />
    <circle cx="32" cy="32" r="26" stroke="#67E8F9" strokeWidth="1" fill="none" opacity="0.6" />
    <circle cx="32" cy="32" r="29" stroke="#22D3EE" strokeWidth="0.5" fill="none" opacity="0.4" />
    {/* electric pulse dots */}
    <circle cx="32" cy="2" r="1.5" fill="#67E8F9" opacity="0.8" />
    <circle cx="62" cy="32" r="1.5" fill="#67E8F9" opacity="0.8" />
    <circle cx="32" cy="62" r="1.5" fill="#67E8F9" opacity="0.8" />
    <circle cx="2" cy="32" r="1.5" fill="#67E8F9" opacity="0.8" />
    {/* pulse lines */}
    <line x1="32" y1="2" x2="32" y2="5.5" stroke="#22D3EE" strokeWidth="0.8" opacity="0.5" />
    <line x1="62" y1="32" x2="58.5" y2="32" stroke="#22D3EE" strokeWidth="0.8" opacity="0.5" />
    <line x1="32" y1="62" x2="32" y2="58.5" stroke="#22D3EE" strokeWidth="0.8" opacity="0.5" />
    <line x1="2" y1="32" x2="5.5" y2="32" stroke="#22D3EE" strokeWidth="0.8" opacity="0.5" />
    <AvatarPlaceholder />
  </svg>
);

/** Turbine Blade — epic, spinning turbine blades */
export const FrameTurbineBlade: React.FC<FrameIconProps> = ({ size = 64, className }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="frame-turbine-grad" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#7DD3FC" />
        <stop offset="50%" stopColor="#0EA5E9" />
        <stop offset="100%" stopColor="#0369A1" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="25" stroke="url(#frame-turbine-grad)" strokeWidth="2.5" fill="none" />
    {/* turbine blades */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
      const rad = (angle * Math.PI) / 180;
      const curveRad = ((angle + 20) * Math.PI) / 180;
      const ix = 32 + 25 * Math.cos(rad);
      const iy = 32 + 25 * Math.sin(rad);
      const ox = 32 + 31 * Math.cos(curveRad);
      const oy = 32 + 31 * Math.sin(curveRad);
      return (
        <path
          key={angle}
          d={`M${ix},${iy} Q${32 + 28 * Math.cos(rad)},${32 + 28 * Math.sin(rad)} ${ox},${oy}`}
          stroke="#0EA5E9"
          strokeWidth="2"
          fill="none"
          opacity="0.7"
        />
      );
    })}
    {/* center hub */}
    <circle cx="32" cy="32" r="2" fill="#0EA5E9" opacity="0.5" />
    <AvatarPlaceholder />
  </svg>
);

/** Plasma Arc — epic, purple ionized glow */
export const FramePlasmaArc: React.FC<FrameIconProps> = ({ size = 64, className }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="frame-plasma-grad" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#E9D5FF" />
        <stop offset="30%" stopColor="#A855F7" />
        <stop offset="70%" stopColor="#7C3AED" />
        <stop offset="100%" stopColor="#E9D5FF" />
      </linearGradient>
      <radialGradient id="frame-plasma-glow" cx="50%" cy="50%" r="50%">
        <stop offset="40%" stopColor="transparent" />
        <stop offset="65%" stopColor="rgba(168,85,247,0.25)" />
        <stop offset="100%" stopColor="rgba(168,85,247,0)" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="31" fill="url(#frame-plasma-glow)" />
    <circle cx="32" cy="32" r="26" stroke="url(#frame-plasma-grad)" strokeWidth="2.5" fill="none" />
    {/* plasma arcs */}
    <path d="M12 12 Q16 18 14 24" stroke="#A855F7" strokeWidth="1" fill="none" opacity="0.6" />
    <path d="M52 12 Q48 18 50 24" stroke="#A855F7" strokeWidth="1" fill="none" opacity="0.6" />
    <path d="M12 52 Q16 46 14 40" stroke="#A855F7" strokeWidth="1" fill="none" opacity="0.6" />
    <path d="M52 52 Q48 46 50 40" stroke="#A855F7" strokeWidth="1" fill="none" opacity="0.6" />
    {/* ionized particles */}
    <circle cx="8" cy="16" r="1" fill="#E9D5FF" opacity="0.6" />
    <circle cx="56" cy="16" r="1" fill="#E9D5FF" opacity="0.6" />
    <circle cx="8" cy="48" r="0.8" fill="#E9D5FF" opacity="0.5" />
    <circle cx="56" cy="48" r="0.8" fill="#E9D5FF" opacity="0.5" />
    <circle cx="32" cy="2" r="0.8" fill="#E9D5FF" opacity="0.5" />
    <circle cx="32" cy="62" r="0.8" fill="#E9D5FF" opacity="0.5" />
    <AvatarPlaceholder />
  </svg>
);

/** Star Drive — epic, golden star burst */
export const FrameStarDrive: React.FC<FrameIconProps> = ({ size = 64, className }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="frame-stardrive-grad" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#FEF3C7" />
        <stop offset="40%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
      <radialGradient id="frame-stardrive-glow" cx="50%" cy="50%" r="50%">
        <stop offset="45%" stopColor="transparent" />
        <stop offset="70%" stopColor="rgba(251,191,36,0.2)" />
        <stop offset="100%" stopColor="rgba(251,191,36,0)" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="31" fill="url(#frame-stardrive-glow)" />
    <circle cx="32" cy="32" r="25" stroke="url(#frame-stardrive-grad)" strokeWidth="2.5" fill="none" />
    {/* star burst rays */}
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => {
      const rad = (angle * Math.PI) / 180;
      const x1 = 32 + 26 * Math.cos(rad);
      const y1 = 32 + 26 * Math.sin(rad);
      const x2 = 32 + 31 * Math.cos(rad);
      const y2 = 32 + 31 * Math.sin(rad);
      return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FBBF24" strokeWidth="1.5" opacity="0.6" />;
    })}
    {/* star points */}
    {[0, 72, 144, 216, 288].map((angle) => {
      const rad = (angle * Math.PI) / 180;
      const x = 32 + 31 * Math.cos(rad);
      const y = 32 + 31 * Math.sin(rad);
      return <circle key={angle} cx={x} cy={y} r="1.2" fill="#FBBF24" opacity="0.8" />;
    })}
    <AvatarPlaceholder />
  </svg>
);

// ============================================================================
// SHOP FRAMES — Legendary
// ============================================================================

/** Singularity — legendary, dark void with indigo glow */
export const FrameSingularity: React.FC<FrameIconProps> = ({ size = 64, className }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="frame-singularity-void" cx="50%" cy="50%" r="50%">
        <stop offset="30%" stopColor="#1E1B4B" />
        <stop offset="50%" stopColor="#312E81" />
        <stop offset="70%" stopColor="rgba(99,102,241,0.3)" />
        <stop offset="100%" stopColor="rgba(99,102,241,0)" />
      </radialGradient>
      <linearGradient id="frame-singularity-ring" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#C7D2FE" />
        <stop offset="25%" stopColor="#3B82F6" />
        <stop offset="50%" stopColor="#A5B4FC" />
        <stop offset="75%" stopColor="#2563EB" />
        <stop offset="100%" stopColor="#C7D2FE" />
      </linearGradient>
      <radialGradient id="frame-singularity-glow" cx="50%" cy="50%" r="50%">
        <stop offset="35%" stopColor="transparent" />
        <stop offset="60%" stopColor="rgba(99,102,241,0.35)" />
        <stop offset="80%" stopColor="rgba(99,102,241,0.15)" />
        <stop offset="100%" stopColor="rgba(99,102,241,0)" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="31" fill="url(#frame-singularity-glow)" />
    <circle cx="32" cy="32" r="20" fill="url(#frame-singularity-void)" />
    <circle cx="32" cy="32" r="26" stroke="url(#frame-singularity-ring)" strokeWidth="2" fill="none" />
    <circle cx="32" cy="32" r="29" stroke="#3B82F6" strokeWidth="0.5" fill="none" opacity="0.5" />
    <circle cx="32" cy="32" r="23" stroke="#3B82F6" strokeWidth="0.5" fill="none" opacity="0.3" />
    {/* event horizon particles being pulled in */}
    <circle cx="6" cy="20" r="0.8" fill="#A5B4FC" opacity="0.6" />
    <circle cx="58" cy="44" r="0.8" fill="#A5B4FC" opacity="0.6" />
    <circle cx="20" cy="58" r="0.6" fill="#C7D2FE" opacity="0.5" />
    <circle cx="44" cy="6" r="0.6" fill="#C7D2FE" opacity="0.5" />
    <circle cx="10" cy="48" r="0.5" fill="#818CF8" opacity="0.4" />
    <circle cx="54" cy="16" r="0.5" fill="#818CF8" opacity="0.4" />
    <AvatarPlaceholder />
  </svg>
);

/** Fusion Reactor — legendary, cyan energy core */
export const FrameFusionReactor: React.FC<FrameIconProps> = ({ size = 64, className }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="frame-fusion-grad" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#A5F3FC" />
        <stop offset="30%" stopColor="#06B6D4" />
        <stop offset="60%" stopColor="#0891B2" />
        <stop offset="100%" stopColor="#A5F3FC" />
      </linearGradient>
      <radialGradient id="frame-fusion-core" cx="50%" cy="50%" r="50%">
        <stop offset="30%" stopColor="rgba(6,182,212,0.15)" />
        <stop offset="55%" stopColor="rgba(6,182,212,0.3)" />
        <stop offset="75%" stopColor="rgba(6,182,212,0.15)" />
        <stop offset="100%" stopColor="rgba(6,182,212,0)" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="31" fill="url(#frame-fusion-core)" />
    {/* containment rings */}
    <circle cx="32" cy="32" r="26" stroke="url(#frame-fusion-grad)" strokeWidth="2.5" fill="none" />
    <circle cx="32" cy="32" r="29" stroke="#06B6D4" strokeWidth="0.8" fill="none" opacity="0.5" />
    <circle cx="32" cy="32" r="23" stroke="#06B6D4" strokeWidth="0.8" fill="none" opacity="0.4" />
    {/* magnetic field lines (ellipses) */}
    <ellipse cx="32" cy="32" rx="30" ry="14" stroke="#22D3EE" strokeWidth="0.6" fill="none" opacity="0.3" />
    <ellipse cx="32" cy="32" rx="14" ry="30" stroke="#22D3EE" strokeWidth="0.6" fill="none" opacity="0.3" />
    {/* energy particles */}
    <circle cx="32" cy="2" r="1.2" fill="#A5F3FC" opacity="0.7" />
    <circle cx="62" cy="32" r="1.2" fill="#A5F3FC" opacity="0.7" />
    <circle cx="32" cy="62" r="1.2" fill="#A5F3FC" opacity="0.7" />
    <circle cx="2" cy="32" r="1.2" fill="#A5F3FC" opacity="0.7" />
    <circle cx="10" cy="10" r="0.8" fill="#67E8F9" opacity="0.5" />
    <circle cx="54" cy="10" r="0.8" fill="#67E8F9" opacity="0.5" />
    <circle cx="10" cy="54" r="0.8" fill="#67E8F9" opacity="0.5" />
    <circle cx="54" cy="54" r="0.8" fill="#67E8F9" opacity="0.5" />
    <AvatarPlaceholder />
  </svg>
);

/** Supernova — legendary, golden explosion of brilliance */
export const FrameSupernova: React.FC<FrameIconProps> = ({ size = 64, className }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="frame-supernova-grad" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#FEF3C7" />
        <stop offset="25%" stopColor="#F59E0B" />
        <stop offset="50%" stopColor="#FDE68A" />
        <stop offset="75%" stopColor="#D97706" />
        <stop offset="100%" stopColor="#FEF3C7" />
      </linearGradient>
      <radialGradient id="frame-supernova-glow" cx="50%" cy="50%" r="50%">
        <stop offset="30%" stopColor="rgba(245,158,11,0.15)" />
        <stop offset="55%" stopColor="rgba(245,158,11,0.35)" />
        <stop offset="75%" stopColor="rgba(245,158,11,0.15)" />
        <stop offset="100%" stopColor="rgba(245,158,11,0)" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="31" fill="url(#frame-supernova-glow)" />
    <circle cx="32" cy="32" r="25" stroke="url(#frame-supernova-grad)" strokeWidth="2.5" fill="none" />
    <circle cx="32" cy="32" r="28" stroke="#F59E0B" strokeWidth="0.5" fill="none" opacity="0.5" />
    {/* explosion rays - long and short alternating */}
    {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      const isLong = i % 2 === 0;
      const innerR = 26;
      const outerR = isLong ? 32 : 29;
      const x1 = 32 + innerR * Math.cos(rad);
      const y1 = 32 + innerR * Math.sin(rad);
      const x2 = 32 + outerR * Math.cos(rad);
      const y2 = 32 + outerR * Math.sin(rad);
      return (
        <line
          key={angle}
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="#F59E0B"
          strokeWidth={isLong ? '1.5' : '0.8'}
          opacity={isLong ? 0.7 : 0.4}
        />
      );
    })}
    {/* bright particles */}
    <circle cx="32" cy="1" r="1.5" fill="#FDE68A" opacity="0.8" />
    <circle cx="63" cy="32" r="1.5" fill="#FDE68A" opacity="0.8" />
    <circle cx="32" cy="63" r="1.5" fill="#FDE68A" opacity="0.8" />
    <circle cx="1" cy="32" r="1.5" fill="#FDE68A" opacity="0.8" />
    <circle cx="9" cy="9" r="1" fill="#FEF3C7" opacity="0.6" />
    <circle cx="55" cy="9" r="1" fill="#FEF3C7" opacity="0.6" />
    <circle cx="9" cy="55" r="1" fill="#FEF3C7" opacity="0.6" />
    <circle cx="55" cy="55" r="1" fill="#FEF3C7" opacity="0.6" />
    <AvatarPlaceholder />
  </svg>
);

// ============================================================================
// REWARD FRAMES — League
// ============================================================================

/** Bronze League — warm bronze ring with shield */
export const FrameBronzeLeague: React.FC<FrameIconProps> = ({ size = 64, className }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="frame-league-bronze-grad" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#DEB887" />
        <stop offset="40%" stopColor="#CD7F32" />
        <stop offset="100%" stopColor="#8B5E3C" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="27" stroke="url(#frame-league-bronze-grad)" strokeWidth="3.5" fill="none" />
    {/* shield emblem at top */}
    <path d="M32 2 L36 6 L36 10 L32 12 L28 10 L28 6 Z" fill="#CD7F32" opacity="0.8" />
    <AvatarPlaceholder />
  </svg>
);

/** Silver League — polished silver ring */
export const FrameSilverLeague: React.FC<FrameIconProps> = ({ size = 64, className }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="frame-league-silver-grad" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#E8E8E8" />
        <stop offset="30%" stopColor="#C0C0C0" />
        <stop offset="60%" stopColor="#E0E0E0" />
        <stop offset="100%" stopColor="#A0A0A0" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="27" stroke="url(#frame-league-silver-grad)" strokeWidth="3.5" fill="none" />
    <circle cx="32" cy="32" r="29.5" stroke="#C0C0C0" strokeWidth="0.5" fill="none" opacity="0.4" />
    {/* shield emblem */}
    <path d="M32 2 L36 6 L36 10 L32 12 L28 10 L28 6 Z" fill="#C0C0C0" opacity="0.8" />
    <AvatarPlaceholder />
  </svg>
);

/** Gold League — shiny gold with laurels */
export const FrameGoldLeague: React.FC<FrameIconProps> = ({ size = 64, className }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="frame-league-gold-grad" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#FFF8DC" />
        <stop offset="30%" stopColor="#FFD700" />
        <stop offset="60%" stopColor="#FFF8DC" />
        <stop offset="100%" stopColor="#DAA520" />
      </linearGradient>
      <radialGradient id="frame-league-gold-glow" cx="50%" cy="50%" r="50%">
        <stop offset="55%" stopColor="transparent" />
        <stop offset="80%" stopColor="rgba(255,215,0,0.15)" />
        <stop offset="100%" stopColor="rgba(255,215,0,0)" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="31" fill="url(#frame-league-gold-glow)" />
    <circle cx="32" cy="32" r="27" stroke="url(#frame-league-gold-grad)" strokeWidth="3.5" fill="none" />
    {/* laurel leaves */}
    <path d="M12 50 Q8 44 10 38" stroke="#DAA520" strokeWidth="1" fill="none" opacity="0.5" />
    <path d="M52 50 Q56 44 54 38" stroke="#DAA520" strokeWidth="1" fill="none" opacity="0.5" />
    {/* crown at top */}
    <path d="M28 4 L30 1 L32 4 L34 1 L36 4 L34 6 L30 6 Z" fill="#FFD700" opacity="0.8" />
    <AvatarPlaceholder />
  </svg>
);

/** Platinum League — cyan-tinted platinum */
export const FramePlatinumLeague: React.FC<FrameIconProps> = ({ size = 64, className }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="frame-league-platinum-grad" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#E0F7FA" />
        <stop offset="30%" stopColor="#00BCD4" />
        <stop offset="60%" stopColor="#B2EBF2" />
        <stop offset="100%" stopColor="#00838F" />
      </linearGradient>
      <radialGradient id="frame-league-platinum-glow" cx="50%" cy="50%" r="50%">
        <stop offset="50%" stopColor="transparent" />
        <stop offset="78%" stopColor="rgba(0,188,212,0.2)" />
        <stop offset="100%" stopColor="rgba(0,188,212,0)" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="31" fill="url(#frame-league-platinum-glow)" />
    <circle cx="32" cy="32" r="27" stroke="url(#frame-league-platinum-grad)" strokeWidth="3.5" fill="none" />
    <circle cx="32" cy="32" r="29.5" stroke="#00BCD4" strokeWidth="0.5" fill="none" opacity="0.4" />
    {/* diamond emblem top */}
    <polygon points="32,1 35,5 32,9 29,5" fill="#00BCD4" opacity="0.8" />
    <AvatarPlaceholder />
  </svg>
);

/** Masters League — royal purple with crown */
export const FrameMastersLeague: React.FC<FrameIconProps> = ({ size = 64, className }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="frame-league-masters-grad" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#E1BEE7" />
        <stop offset="30%" stopColor="#9C27B0" />
        <stop offset="60%" stopColor="#CE93D8" />
        <stop offset="100%" stopColor="#6A1B9A" />
      </linearGradient>
      <radialGradient id="frame-league-masters-glow" cx="50%" cy="50%" r="50%">
        <stop offset="45%" stopColor="transparent" />
        <stop offset="75%" stopColor="rgba(156,39,176,0.25)" />
        <stop offset="100%" stopColor="rgba(156,39,176,0)" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="31" fill="url(#frame-league-masters-glow)" />
    <circle cx="32" cy="32" r="27" stroke="url(#frame-league-masters-grad)" strokeWidth="3.5" fill="none" />
    <circle cx="32" cy="32" r="30" stroke="#9C27B0" strokeWidth="0.5" fill="none" opacity="0.4" />
    {/* ornate crown */}
    <path d="M26 5 L28 0 L30 4 L32 0 L34 4 L36 0 L38 5 L36 7 L28 7 Z" fill="#9C27B0" opacity="0.85" />
    <circle cx="32" cy="2" r="1" fill="#E1BEE7" opacity="0.7" />
    <AvatarPlaceholder />
  </svg>
);

// ============================================================================
// REWARD FRAMES — Streak milestones
// ============================================================================

/** Iron Will — 30 day streak, slate gray with fire */
export const FrameIronWill: React.FC<FrameIconProps> = ({ size = 64, className }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="frame-streak-iron-grad" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#94A3B8" />
        <stop offset="50%" stopColor="#64748B" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="27" stroke="url(#frame-streak-iron-grad)" strokeWidth="3.5" fill="none" />
    {/* small flame at top */}
    <path d="M32 3 Q34 6 33 8 Q32 10 31 8 Q30 6 32 3" fill="#F97316" opacity="0.7" />
    {/* streak hash marks */}
    <line x1="18" y1="5" x2="18" y2="8" stroke="#64748B" strokeWidth="1" opacity="0.4" />
    <line x1="46" y1="5" x2="46" y2="8" stroke="#64748B" strokeWidth="1" opacity="0.4" />
    <AvatarPlaceholder />
  </svg>
);

/** Diamond Mind — 60 day streak, blue diamond */
export const FrameDiamondMind: React.FC<FrameIconProps> = ({ size = 64, className }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="frame-streak-diamond-grad" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#BFDBFE" />
        <stop offset="30%" stopColor="#60A5FA" />
        <stop offset="70%" stopColor="#BFDBFE" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
      <radialGradient id="frame-streak-diamond-glow" cx="50%" cy="50%" r="50%">
        <stop offset="55%" stopColor="transparent" />
        <stop offset="80%" stopColor="rgba(96,165,250,0.2)" />
        <stop offset="100%" stopColor="rgba(96,165,250,0)" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="31" fill="url(#frame-streak-diamond-glow)" />
    <circle cx="32" cy="32" r="27" stroke="url(#frame-streak-diamond-grad)" strokeWidth="3" fill="none" />
    {/* diamond shape at top */}
    <polygon points="32,1 36,5 32,9 28,5" fill="#60A5FA" opacity="0.8" />
    <polygon points="32,2 34,5 32,8 30,5" fill="#BFDBFE" opacity="0.5" />
    <AvatarPlaceholder />
  </svg>
);

/** Centurion — 100 day streak, golden crown */
export const FrameCenturion: React.FC<FrameIconProps> = ({ size = 64, className }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="frame-streak-centurion-grad" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#FEF3C7" />
        <stop offset="30%" stopColor="#FBBF24" />
        <stop offset="60%" stopColor="#FEF3C7" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
      <radialGradient id="frame-streak-centurion-glow" cx="50%" cy="50%" r="50%">
        <stop offset="55%" stopColor="transparent" />
        <stop offset="78%" stopColor="rgba(251,191,36,0.2)" />
        <stop offset="100%" stopColor="rgba(251,191,36,0)" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="31" fill="url(#frame-streak-centurion-glow)" />
    <circle cx="32" cy="32" r="27" stroke="url(#frame-streak-centurion-grad)" strokeWidth="3.5" fill="none" />
    {/* centurion crown */}
    <path d="M26 5 L28 0 L30 4 L32 0 L34 4 L36 0 L38 5 L36 7 L28 7 Z" fill="#FBBF24" opacity="0.85" />
    {/* 100 text */}
    <text x="32" y="62" textAnchor="middle" fontSize="5" fill="#FBBF24" fontWeight="bold" opacity="0.6">100</text>
    <AvatarPlaceholder />
  </svg>
);

// ============================================================================
// REWARD FRAMES — Achievement milestones
// ============================================================================

/** First Gold — first golden lesson complete */
export const FrameFirstGold: React.FC<FrameIconProps> = ({ size = 64, className }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="frame-first-gold-grad" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="50%" stopColor="#CA8A04" />
        <stop offset="100%" stopColor="#854D0E" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="27" stroke="url(#frame-first-gold-grad)" strokeWidth="3" fill="none" />
    {/* medal ribbon at top */}
    <path d="M28 3 L26 8 L32 6 L38 8 L36 3" stroke="#CA8A04" strokeWidth="1" fill="none" opacity="0.6" />
    <circle cx="32" cy="5" r="2" fill="#CA8A04" opacity="0.7" />
    <AvatarPlaceholder />
  </svg>
);

/** Marathon Runner — 1000 correct answers */
export const FrameMarathonRunner: React.FC<FrameIconProps> = ({ size = 64, className }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="frame-marathon-grad" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#93C5FD" />
        <stop offset="50%" stopColor="#2563EB" />
        <stop offset="100%" stopColor="#1E3A8A" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="27" stroke="url(#frame-marathon-grad)" strokeWidth="3" fill="none" />
    {/* finish line pattern at top */}
    <rect x="28" y="3" width="2" height="2" fill="#2563EB" opacity="0.6" />
    <rect x="30" y="5" width="2" height="2" fill="#2563EB" opacity="0.6" />
    <rect x="32" y="3" width="2" height="2" fill="#2563EB" opacity="0.6" />
    <rect x="34" y="5" width="2" height="2" fill="#2563EB" opacity="0.6" />
    {/* motion lines */}
    <line x1="4" y1="28" x2="8" y2="28" stroke="#2563EB" strokeWidth="0.8" opacity="0.3" />
    <line x1="4" y1="32" x2="6" y2="32" stroke="#2563EB" strokeWidth="0.8" opacity="0.3" />
    <line x1="4" y1="36" x2="8" y2="36" stroke="#2563EB" strokeWidth="0.8" opacity="0.3" />
    <AvatarPlaceholder />
  </svg>
);

/** Early Adopter — first 100 users */
export const FrameEarlyAdopter: React.FC<FrameIconProps> = ({ size = 64, className }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="frame-early-bird-grad" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#FDBA74" />
        <stop offset="50%" stopColor="#F97316" />
        <stop offset="100%" stopColor="#C2410C" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="27" stroke="url(#frame-early-bird-grad)" strokeWidth="3" fill="none" />
    {/* sunrise motif at top */}
    <circle cx="32" cy="4" r="3" fill="#F97316" opacity="0.6" />
    <line x1="26" y1="4" x2="22" y2="2" stroke="#F97316" strokeWidth="0.8" opacity="0.4" />
    <line x1="38" y1="4" x2="42" y2="2" stroke="#F97316" strokeWidth="0.8" opacity="0.4" />
    <line x1="32" y1="1" x2="32" y2="-1" stroke="#F97316" strokeWidth="0.8" opacity="0.4" />
    <AvatarPlaceholder />
  </svg>
);

/** Flawless — 100% accuracy on entire unit */
export const FrameFlawless: React.FC<FrameIconProps> = ({ size = 64, className }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="frame-perfect-unit-grad" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#6EE7B7" />
        <stop offset="50%" stopColor="#059669" />
        <stop offset="100%" stopColor="#064E3B" />
      </linearGradient>
      <radialGradient id="frame-perfect-unit-glow" cx="50%" cy="50%" r="50%">
        <stop offset="55%" stopColor="transparent" />
        <stop offset="80%" stopColor="rgba(5,150,105,0.2)" />
        <stop offset="100%" stopColor="rgba(5,150,105,0)" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="31" fill="url(#frame-perfect-unit-glow)" />
    <circle cx="32" cy="32" r="27" stroke="url(#frame-perfect-unit-grad)" strokeWidth="3" fill="none" />
    {/* checkmark at top */}
    <path d="M28 4 L31 7 L36 2" stroke="#059669" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <AvatarPlaceholder />
  </svg>
);

/** Speed Demon — 10 lessons in a day */
export const FrameSpeedDemon: React.FC<FrameIconProps> = ({ size = 64, className }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="frame-speed-demon-grad" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#FEF08A" />
        <stop offset="50%" stopColor="#EAB308" />
        <stop offset="100%" stopColor="#A16207" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="27" stroke="url(#frame-speed-demon-grad)" strokeWidth="3" fill="none" />
    {/* lightning bolt at top */}
    <path d="M30 1 L28 5 L31 5 L29 9 L34 4 L31 4 L33 1 Z" fill="#EAB308" opacity="0.8" />
    {/* speed lines */}
    <line x1="3" y1="26" x2="7" y2="28" stroke="#EAB308" strokeWidth="0.8" opacity="0.3" />
    <line x1="2" y1="32" x2="6" y2="32" stroke="#EAB308" strokeWidth="0.8" opacity="0.4" />
    <line x1="3" y1="38" x2="7" y2="36" stroke="#EAB308" strokeWidth="0.8" opacity="0.3" />
    <AvatarPlaceholder />
  </svg>
);

/** Perfectionist — 100% accuracy on 25 lessons */
export const FramePerfectionist: React.FC<FrameIconProps> = ({ size = 64, className }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="frame-perfectionist-grad" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#FCA5A5" />
        <stop offset="50%" stopColor="#DC2626" />
        <stop offset="100%" stopColor="#7F1D1D" />
      </linearGradient>
      <radialGradient id="frame-perfectionist-glow" cx="50%" cy="50%" r="50%">
        <stop offset="55%" stopColor="transparent" />
        <stop offset="80%" stopColor="rgba(220,38,38,0.2)" />
        <stop offset="100%" stopColor="rgba(220,38,38,0)" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="31" fill="url(#frame-perfectionist-glow)" />
    <circle cx="32" cy="32" r="27" stroke="url(#frame-perfectionist-grad)" strokeWidth="3" fill="none" />
    {/* target/bullseye at top */}
    <circle cx="32" cy="4" r="3" stroke="#DC2626" strokeWidth="0.8" fill="none" opacity="0.6" />
    <circle cx="32" cy="4" r="1.5" fill="#DC2626" opacity="0.7" />
    <AvatarPlaceholder />
  </svg>
);

/** Golden Engineer — all golden lessons complete */
export const FrameGoldenEngineer: React.FC<FrameIconProps> = ({ size = 64, className }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="frame-all-gold-grad" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#FEF3C7" />
        <stop offset="25%" stopColor="#EAB308" />
        <stop offset="50%" stopColor="#FEF3C7" />
        <stop offset="75%" stopColor="#D97706" />
        <stop offset="100%" stopColor="#FEF3C7" />
      </linearGradient>
      <radialGradient id="frame-all-gold-glow" cx="50%" cy="50%" r="50%">
        <stop offset="45%" stopColor="transparent" />
        <stop offset="70%" stopColor="rgba(234,179,8,0.3)" />
        <stop offset="100%" stopColor="rgba(234,179,8,0)" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="31" fill="url(#frame-all-gold-glow)" />
    <circle cx="32" cy="32" r="26" stroke="url(#frame-all-gold-grad)" strokeWidth="3" fill="none" />
    <circle cx="32" cy="32" r="29" stroke="#EAB308" strokeWidth="0.5" fill="none" opacity="0.5" />
    {/* crown at top */}
    <path d="M26 5 L28 0 L30 4 L32 0 L34 4 L36 0 L38 5 L36 7 L28 7 Z" fill="#EAB308" opacity="0.85" />
    {/* star particles */}
    <circle cx="8" cy="32" r="1" fill="#FEF3C7" opacity="0.5" />
    <circle cx="56" cy="32" r="1" fill="#FEF3C7" opacity="0.5" />
    <circle cx="32" cy="60" r="1" fill="#FEF3C7" opacity="0.5" />
    <AvatarPlaceholder />
  </svg>
);

// ============================================================================
// REWARD FRAMES — Level milestones
// ============================================================================

/** Engineer's Crest — Level 15 */
export const FrameEngineersCrest: React.FC<FrameIconProps> = ({ size = 64, className }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="frame-level15-grad" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#C7D2FE" />
        <stop offset="50%" stopColor="#2563EB" />
        <stop offset="100%" stopColor="#312E81" />
      </linearGradient>
      <radialGradient id="frame-level15-glow" cx="50%" cy="50%" r="50%">
        <stop offset="55%" stopColor="transparent" />
        <stop offset="80%" stopColor="rgba(79,70,229,0.2)" />
        <stop offset="100%" stopColor="rgba(79,70,229,0)" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="31" fill="url(#frame-level15-glow)" />
    <circle cx="32" cy="32" r="27" stroke="url(#frame-level15-grad)" strokeWidth="3" fill="none" />
    {/* crest shield at top */}
    <path d="M28 2 L36 2 L36 8 L32 11 L28 8 Z" fill="#2563EB" opacity="0.7" />
    <path d="M30 4 L34 4 L34 7 L32 9 L30 7 Z" fill="#C7D2FE" opacity="0.4" />
    <AvatarPlaceholder />
  </svg>
);

/** Master's Mark — Level 20 */
export const FrameMastersMark: React.FC<FrameIconProps> = ({ size = 64, className }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="frame-level20-grad" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#DDD6FE" />
        <stop offset="30%" stopColor="#7C3AED" />
        <stop offset="70%" stopColor="#DDD6FE" />
        <stop offset="100%" stopColor="#5B21B6" />
      </linearGradient>
      <radialGradient id="frame-level20-glow" cx="50%" cy="50%" r="50%">
        <stop offset="50%" stopColor="transparent" />
        <stop offset="78%" stopColor="rgba(124,58,237,0.25)" />
        <stop offset="100%" stopColor="rgba(124,58,237,0)" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="31" fill="url(#frame-level20-glow)" />
    <circle cx="32" cy="32" r="27" stroke="url(#frame-level20-grad)" strokeWidth="3" fill="none" />
    <circle cx="32" cy="32" r="29.5" stroke="#7C3AED" strokeWidth="0.5" fill="none" opacity="0.4" />
    {/* pillar emblem at top */}
    <rect x="29" y="2" width="6" height="7" rx="1" fill="#7C3AED" opacity="0.7" />
    <rect x="28" y="2" width="8" height="2" rx="0.5" fill="#7C3AED" opacity="0.8" />
    <rect x="28" y="8" width="8" height="1.5" rx="0.5" fill="#7C3AED" opacity="0.8" />
    <AvatarPlaceholder />
  </svg>
);

/** Elite Badge — Level 25 */
export const FrameEliteBadge: React.FC<FrameIconProps> = ({ size = 64, className }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="frame-level25-grad" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#A7F3D0" />
        <stop offset="30%" stopColor="#059669" />
        <stop offset="70%" stopColor="#A7F3D0" />
        <stop offset="100%" stopColor="#047857" />
      </linearGradient>
      <radialGradient id="frame-level25-glow" cx="50%" cy="50%" r="50%">
        <stop offset="50%" stopColor="transparent" />
        <stop offset="78%" stopColor="rgba(5,150,105,0.25)" />
        <stop offset="100%" stopColor="rgba(5,150,105,0)" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="31" fill="url(#frame-level25-glow)" />
    <circle cx="32" cy="32" r="27" stroke="url(#frame-level25-grad)" strokeWidth="3" fill="none" />
    <circle cx="32" cy="32" r="29.5" stroke="#059669" strokeWidth="0.5" fill="none" opacity="0.4" />
    {/* badge/star emblem at top */}
    <polygon points="32,1 34,5 38,5 35,8 36,12 32,10 28,12 29,8 26,5 30,5" fill="#059669" opacity="0.7" />
    <AvatarPlaceholder />
  </svg>
);

/** Grandmaster Crown — Level 30 (MAX) */
export const FrameGrandmasterCrown: React.FC<FrameIconProps> = ({ size = 64, className }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="frame-level30-grad" x1="0" y1="0" x2="64" y2="64">
        <stop offset="0%" stopColor="#FCA5A5" />
        <stop offset="25%" stopColor="#DC2626" />
        <stop offset="50%" stopColor="#FCA5A5" />
        <stop offset="75%" stopColor="#991B1B" />
        <stop offset="100%" stopColor="#FCA5A5" />
      </linearGradient>
      <radialGradient id="frame-level30-glow" cx="50%" cy="50%" r="50%">
        <stop offset="40%" stopColor="transparent" />
        <stop offset="65%" stopColor="rgba(220,38,38,0.3)" />
        <stop offset="85%" stopColor="rgba(220,38,38,0.15)" />
        <stop offset="100%" stopColor="rgba(220,38,38,0)" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="31" fill="url(#frame-level30-glow)" />
    <circle cx="32" cy="32" r="26" stroke="url(#frame-level30-grad)" strokeWidth="3" fill="none" />
    <circle cx="32" cy="32" r="29" stroke="#DC2626" strokeWidth="0.5" fill="none" opacity="0.5" />
    <circle cx="32" cy="32" r="23.5" stroke="#DC2626" strokeWidth="0.5" fill="none" opacity="0.3" />
    {/* grand crown with jewels */}
    <path d="M24 6 L26 0 L29 5 L32 -1 L35 5 L38 0 L40 6 L38 8 L26 8 Z" fill="#DC2626" opacity="0.85" />
    <circle cx="32" cy="2" r="1" fill="#FCA5A5" opacity="0.8" />
    <circle cx="27" cy="3" r="0.7" fill="#FEF3C7" opacity="0.7" />
    <circle cx="37" cy="3" r="0.7" fill="#FEF3C7" opacity="0.7" />
    {/* sparkle particles */}
    <circle cx="6" cy="32" r="1" fill="#FCA5A5" opacity="0.5" />
    <circle cx="58" cy="32" r="1" fill="#FCA5A5" opacity="0.5" />
    <circle cx="32" cy="62" r="1" fill="#FCA5A5" opacity="0.5" />
    <AvatarPlaceholder />
  </svg>
);

// ============================================================================
// MAPS: frame ID -> component
// ============================================================================

/** Map of shop frame IDs to their icon components */
export const frameIconMap: Record<string, React.FC<FrameIconProps>> = {
  'shop-frame-gold': FrameGoldRing,
  'shop-frame-emerald': FrameEmeraldHalo,
  'shop-frame-ruby': FrameRubyBlaze,
  'shop-frame-sapphire': FrameSapphireWave,
  'shop-frame-steel': FrameBrushedSteel,
  'shop-frame-copper': FrameCopperPipe,
  'shop-frame-bolt': FrameHexBolt,
  'shop-frame-blueprint': FrameBlueprintBorder,
  'shop-frame-titanium': FrameTitaniumBand,
  'shop-frame-rivet': FrameRivetRing,
  'shop-frame-cast-iron': FrameCastIron,
  'shop-frame-spring': FrameCoilSpring,
  'shop-frame-gear': FrameGearTeeth,
  'shop-frame-gasket': FrameGasketSeal,
  'shop-frame-wire': FrameBareWire,
  'shop-frame-concrete': FrameConcreteRing,
  'shop-frame-diamond': FrameDiamondAura,
  'shop-frame-sunset': FrameSunsetGradient,
  'shop-frame-wrench': FrameTorqueWrench,
  'shop-frame-piston': FramePistonRing,
  'shop-frame-circuit': FrameCircuitBoard,
  'shop-frame-thermal': FrameThermalGradient,
  'shop-frame-weld': FrameWeldBead,
  'shop-frame-aurora': FrameAuroraBorealis,
  'shop-frame-neon': FrameNeonPulse,
  'shop-frame-turbine': FrameTurbineBlade,
  'shop-frame-plasma': FramePlasmaArc,
  'shop-frame-star-drive': FrameStarDrive,
  'shop-frame-singularity': FrameSingularity,
  'shop-frame-fusion-reactor': FrameFusionReactor,
  'shop-frame-supernova': FrameSupernova,
};

/** Map of reward frame IDs to their icon components */
export const rewardFrameIconMap: Record<string, React.FC<FrameIconProps>> = {
  'reward-frame-league-bronze': FrameBronzeLeague,
  'reward-frame-league-silver': FrameSilverLeague,
  'reward-frame-league-gold': FrameGoldLeague,
  'reward-frame-league-platinum': FramePlatinumLeague,
  'reward-frame-league-masters': FrameMastersLeague,
  'reward-frame-streak-iron': FrameIronWill,
  'reward-frame-streak-diamond': FrameDiamondMind,
  'reward-frame-streak-centurion': FrameCenturion,
  'reward-frame-first-gold': FrameFirstGold,
  'reward-frame-marathon': FrameMarathonRunner,
  'reward-frame-early-bird': FrameEarlyAdopter,
  'reward-frame-perfect-unit': FrameFlawless,
  'reward-frame-speed-demon': FrameSpeedDemon,
  'reward-frame-perfectionist': FramePerfectionist,
  'reward-frame-all-gold': FrameGoldenEngineer,
  'reward-frame-level-15': FrameEngineersCrest,
  'reward-frame-level-20': FrameMastersMark,
  'reward-frame-level-25': FrameEliteBadge,
  'reward-frame-level-30': FrameGrandmasterCrown,
};
