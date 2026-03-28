'use client';

/**
 * AvatarFrame — renders a decorative SVG frame around an avatar.
 * Each frame style has a unique shape, gradient, and optional animation.
 *
 * Usage:
 *   <AvatarFrame frameStyle="gold" size={96}>
 *     <Image src={...} alt="..." width={96} height={96} className="w-full h-full rounded-full object-cover" />
 *   </AvatarFrame>
 */

import { type ReactNode } from 'react';

export type FrameStyleId =
  | 'gold'
  | 'diamond'
  | 'emerald'
  | 'ruby'
  | 'sapphire'
  | 'sunset'
  | 'aurora'
  | 'neon'
  // League frames (earned by reaching leagues)
  | 'league-bronze'
  | 'league-silver'
  | 'league-gold'
  | 'league-platinum'
  | 'league-masters'
  // Streak milestone frames
  | 'streak-iron'
  | 'streak-diamond'
  | 'streak-centurion'
  // Common frames
  | 'steel'
  | 'copper'
  | 'bolt'
  | 'blueprint'
  | 'titanium'
  | 'rivet'
  | 'cast-iron'
  | 'spring'
  | 'gear'
  | 'gasket'
  | 'wire'
  | 'concrete'
  // Rare frames
  | 'wrench'
  | 'piston'
  | 'circuit'
  | 'thermal'
  | 'weld'
  // Epic frames
  | 'turbine'
  | 'plasma'
  | 'star-drive'
  // Legendary frames
  | 'singularity'
  | 'fusion-reactor'
  | 'supernova'
  | 'all-gold'
  // Reward frames
  | 'first-gold'
  | 'marathon'
  | 'early-bird'
  | 'perfect-unit'
  | 'speed-demon'
  | 'perfectionist'
  | null
  | undefined;

interface AvatarFrameProps {
  frameStyle: FrameStyleId;
  size: number;         // outer size in px
  children: ReactNode;  // the avatar element
  className?: string;
}

// The avatar circle is inset by this much to leave room for the frame
const FRAME_INSET = 6;

export function AvatarFrame({ frameStyle, size, children, className = '' }: AvatarFrameProps) {
  const innerSize = size - FRAME_INSET * 2;

  if (!frameStyle) {
    // No frame — just render avatar with a subtle border
    return (
      <div className={`relative ${className}`} style={{ width: size, height: size }}>
        <div
          className="absolute rounded-full overflow-hidden"
          style={{
            inset: FRAME_INSET,
            width: innerSize,
            height: innerSize,
            border: '3px solid rgba(255,255,255,0.2)',
          }}
        >
          {children}
        </div>
      </div>
    );
  }

  const def = FRAME_DEFS[frameStyle];
  if (!def) {
    return (
      <div className={`relative ${className}`} style={{ width: size, height: size }}>
        <div className="absolute rounded-full overflow-hidden" style={{ inset: FRAME_INSET, width: innerSize, height: innerSize }}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* SVG frame overlay */}
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 2 }}
      >
        <defs>{def.defs(size)}</defs>
        {def.render(size)}
      </svg>

      {/* Glow layer behind */}
      {def.glowColor && (
        <div
          className={`absolute rounded-full ${def.animated ? 'animate-pulse' : ''}`}
          style={{
            inset: -2,
            background: def.glowColor,
            filter: `blur(${def.glowBlur || 8}px)`,
            opacity: def.glowOpacity || 0.5,
            zIndex: 0,
          }}
        />
      )}

      {/* Avatar content */}
      <div
        className={`absolute overflow-hidden${def.avatarClipPath ? '' : ' rounded-full'}`}
        style={{
          top: FRAME_INSET,
          left: FRAME_INSET,
          width: innerSize,
          height: innerSize,
          zIndex: 1,
          ...(def.avatarClipPath && { clipPath: def.avatarClipPath }),
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ─── Frame Definitions ─────────────────────────────────────

interface FrameDef {
  defs: (s: number) => ReactNode;
  render: (s: number) => ReactNode;
  glowColor?: string;
  glowBlur?: number;
  glowOpacity?: number;
  animated?: boolean;
  avatarClipPath?: string;
}

// Helpers for generating CSS clip-path polygons (percentage-based)
function polyClip(sides: number, offsetDeg: number, r = 48): string {
  const pts = Array.from({ length: sides }, (_, i) => {
    const a = ((360 / sides) * i + offsetDeg) * (Math.PI / 180);
    return `${(50 + r * Math.cos(a)).toFixed(1)}% ${(50 + r * Math.sin(a)).toFixed(1)}%`;
  });
  return `polygon(${pts.join(', ')})`;
}

function starClip(spikes: number, outerR: number, innerR: number, offsetDeg = -90): string {
  const pts = Array.from({ length: spikes * 2 }, (_, i) => {
    const a = ((i * 360) / (spikes * 2) + offsetDeg) * (Math.PI / 180);
    const r = i % 2 === 0 ? outerR : innerR;
    return `${(50 + r * Math.cos(a)).toFixed(1)}% ${(50 + r * Math.sin(a)).toFixed(1)}%`;
  });
  return `polygon(${pts.join(', ')})`;
}

const FRAME_DEFS: Record<string, FrameDef> = {
  // ── Gold: classic thick ring with inner shine ──
  gold: {
    defs: (s) => (
      <linearGradient id="gold-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="30%" stopColor="#F59E0B" />
        <stop offset="70%" stopColor="#D97706" />
        <stop offset="100%" stopColor="#FDE68A" />
      </linearGradient>
    ),
    render: (s) => {
      const c = s / 2;
      const r = c - 3;
      return (
        <circle
          cx={c} cy={c} r={r}
          fill="none"
          stroke="url(#gold-grad)"
          strokeWidth={5}
        />
      );
    },
    glowColor: 'rgba(245,158,11,0.25)',
    glowBlur: 10,
  },

  // ── Diamond: double ring with sparkle marks ──
  diamond: {
    defs: (s) => (
      <linearGradient id="diamond-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#C7D2FE" />
        <stop offset="50%" stopColor="#818CF8" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
    ),
    render: (s) => {
      const c = s / 2;
      const r1 = c - 2.5;
      const r2 = c - 5.5;
      return (
        <>
          <circle cx={c} cy={c} r={r1} fill="none" stroke="url(#diamond-grad)" strokeWidth={2} />
          <circle cx={c} cy={c} r={r2} fill="none" stroke="url(#diamond-grad)" strokeWidth={1.5} strokeDasharray="3 6" />
          {/* Sparkle dots at cardinal points */}
          {[0, 90, 180, 270].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            return (
              <circle
                key={angle}
                cx={c + (r1 - 0.5) * Math.cos(rad)}
                cy={c + (r1 - 0.5) * Math.sin(rad)}
                r={2}
                fill="#A5B4FC"
              />
            );
          })}
        </>
      );
    },
    glowColor: 'rgba(129,140,248,0.3)',
    glowBlur: 10,
  },

  // ── Emerald: hexagonal shape ──
  emerald: {
    defs: (s) => (
      <linearGradient id="emerald-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#6EE7B7" />
        <stop offset="50%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
    ),
    render: (s) => {
      const c = s / 2;
      const r = c - 2;
      // Hexagon points
      const pts = Array.from({ length: 6 }, (_, i) => {
        const angle = (60 * i - 30) * (Math.PI / 180);
        return `${c + r * Math.cos(angle)},${c + r * Math.sin(angle)}`;
      }).join(' ');
      return (
        <polygon
          points={pts}
          fill="none"
          stroke="url(#emerald-grad)"
          strokeWidth={4}
          strokeLinejoin="round"
        />
      );
    },
    glowColor: 'rgba(16,185,129,0.3)',
    glowBlur: 10,
    avatarClipPath: polyClip(6, -30),
  },

  // ── Ruby: starburst / spiked ring ──
  ruby: {
    defs: (s) => (
      <linearGradient id="ruby-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FCA5A5" />
        <stop offset="50%" stopColor="#EF4444" />
        <stop offset="100%" stopColor="#B91C1C" />
      </linearGradient>
    ),
    render: (s) => {
      const c = s / 2;
      const outer = c - 1;
      const inner = c - 6;
      const spikes = 12;
      const pts = Array.from({ length: spikes * 2 }, (_, i) => {
        const angle = (i * 360) / (spikes * 2) - 90;
        const rad = (angle * Math.PI) / 180;
        const r = i % 2 === 0 ? outer : inner;
        return `${c + r * Math.cos(rad)},${c + r * Math.sin(rad)}`;
      }).join(' ');
      return (
        <polygon
          points={pts}
          fill="none"
          stroke="url(#ruby-grad)"
          strokeWidth={2}
          strokeLinejoin="round"
        />
      );
    },
    glowColor: 'rgba(239,68,68,0.3)',
    glowBlur: 10,
    avatarClipPath: starClip(12, 48, 43, -90),
  },

  // ── Sapphire: scalloped / wave edge ──
  sapphire: {
    defs: (s) => (
      <linearGradient id="sapphire-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#93C5FD" />
        <stop offset="50%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
    ),
    render: (s) => {
      const c = s / 2;
      const r = c - 3;
      // Scalloped circle using arcs
      const bumps = 16;
      const bumpDepth = 3;
      let d = '';
      for (let i = 0; i < bumps; i++) {
        const a1 = (360 / bumps) * i - 90;
        const a2 = (360 / bumps) * (i + 0.5) - 90;
        const a3 = (360 / bumps) * (i + 1) - 90;
        const r1 = (a1 * Math.PI) / 180;
        const r2 = (a2 * Math.PI) / 180;
        const r3 = (a3 * Math.PI) / 180;
        const x1 = c + r * Math.cos(r1);
        const y1 = c + r * Math.sin(r1);
        const cx2 = c + (r + bumpDepth) * Math.cos(r2);
        const cy2 = c + (r + bumpDepth) * Math.sin(r2);
        const x3 = c + r * Math.cos(r3);
        const y3 = c + r * Math.sin(r3);
        if (i === 0) d += `M ${x1} ${y1} `;
        d += `Q ${cx2} ${cy2} ${x3} ${y3} `;
      }
      d += 'Z';
      return (
        <path d={d} fill="none" stroke="url(#sapphire-grad)" strokeWidth={3} />
      );
    },
    glowColor: 'rgba(59,130,246,0.3)',
    glowBlur: 10,
  },

  // ── Sunset: thick gradient ring with warm glow ──
  sunset: {
    defs: (s) => (
      <linearGradient id="sunset-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FCD34D" />
        <stop offset="33%" stopColor="#F97316" />
        <stop offset="66%" stopColor="#EC4899" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
    ),
    render: (s) => {
      const c = s / 2;
      const r = c - 3.5;
      return (
        <circle
          cx={c} cy={c} r={r}
          fill="none"
          stroke="url(#sunset-grad)"
          strokeWidth={6}
        />
      );
    },
    glowColor: 'rgba(249,115,22,0.25)',
    glowBlur: 12,
    glowOpacity: 0.6,
  },

  // ── Aurora: rotating dashed ring with gradient ──
  aurora: {
    defs: (s) => (
      <>
        <linearGradient id="aurora-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2DD4BF" />
          <stop offset="50%" stopColor="#818CF8" />
          <stop offset="100%" stopColor="#C084FC" />
        </linearGradient>
        <linearGradient id="aurora-grad2" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C084FC" />
          <stop offset="50%" stopColor="#F472B6" />
          <stop offset="100%" stopColor="#2DD4BF" />
        </linearGradient>
      </>
    ),
    render: (s) => {
      const c = s / 2;
      const r1 = c - 2;
      const r2 = c - 5;
      return (
        <>
          <circle cx={c} cy={c} r={r1} fill="none" stroke="url(#aurora-grad)" strokeWidth={3} opacity={0.8}>
            <animateTransform attributeName="transform" type="rotate" from={`0 ${c} ${c}`} to={`360 ${c} ${c}`} dur="8s" repeatCount="indefinite" />
          </circle>
          <circle cx={c} cy={c} r={r2} fill="none" stroke="url(#aurora-grad2)" strokeWidth={2} strokeDasharray="4 8" opacity={0.6}>
            <animateTransform attributeName="transform" type="rotate" from={`360 ${c} ${c}`} to={`0 ${c} ${c}`} dur="12s" repeatCount="indefinite" />
          </circle>
        </>
      );
    },
    glowColor: 'rgba(139,92,246,0.3)',
    glowBlur: 14,
    glowOpacity: 0.6,
    animated: true,
  },

  // ── Neon: pulsing electric ring ──
  neon: {
    defs: (s) => (
      <linearGradient id="neon-grad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#22D3EE" />
        <stop offset="50%" stopColor="#06B6D4" />
        <stop offset="100%" stopColor="#22D3EE" />
      </linearGradient>
    ),
    render: (s) => {
      const c = s / 2;
      const r = c - 3;
      return (
        <>
          {/* Outer neon ring */}
          <circle cx={c} cy={c} r={r} fill="none" stroke="url(#neon-grad)" strokeWidth={3}>
            <animate attributeName="stroke-width" values="3;4;3" dur="2s" repeatCount="indefinite" />
          </circle>
          {/* Inner accent */}
          <circle cx={c} cy={c} r={r - 3} fill="none" stroke="#22D3EE" strokeWidth={1} opacity={0.3} />
        </>
      );
    },
    glowColor: 'rgba(34,211,238,0.4)',
    glowBlur: 12,
    glowOpacity: 0.7,
    animated: true,
  },

  // ══════════════════════════════════════════════════════════
  // LEAGUE FRAMES — earned by reaching each league tier
  // ══════════════════════════════════════════════════════════

  // ── Bronze League: simple shield outline ──
  'league-bronze': {
    defs: (s) => (
      <linearGradient id="lb-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#D4A574" />
        <stop offset="50%" stopColor="#CD7F32" />
        <stop offset="100%" stopColor="#A0522D" />
      </linearGradient>
    ),
    render: (s) => {
      const c = s / 2;
      const r = c - 3;
      return (
        <circle cx={c} cy={c} r={r} fill="none" stroke="url(#lb-grad)" strokeWidth={4} />
      );
    },
    glowColor: 'rgba(205,127,50,0.2)',
    glowBlur: 8,
  },

  // ── Silver League: beveled ring with notches ──
  'league-silver': {
    defs: (s) => (
      <linearGradient id="ls-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#E8E8E8" />
        <stop offset="30%" stopColor="#C0C0C0" />
        <stop offset="70%" stopColor="#A8A8A8" />
        <stop offset="100%" stopColor="#E0E0E0" />
      </linearGradient>
    ),
    render: (s) => {
      const c = s / 2;
      const r = c - 3;
      return (
        <>
          <circle cx={c} cy={c} r={r} fill="none" stroke="url(#ls-grad)" strokeWidth={4} />
          {[0, 60, 120, 180, 240, 300].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            return (
              <circle key={angle} cx={c + r * Math.cos(rad)} cy={c + r * Math.sin(rad)} r={2.5} fill="#C0C0C0" stroke="white" strokeWidth={1} />
            );
          })}
        </>
      );
    },
    glowColor: 'rgba(192,192,192,0.25)',
    glowBlur: 8,
  },

  // ── Gold League: thick ornate double ring ──
  'league-gold': {
    defs: (s) => (
      <linearGradient id="lg-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="25%" stopColor="#FFD700" />
        <stop offset="50%" stopColor="#DAA520" />
        <stop offset="75%" stopColor="#FFD700" />
        <stop offset="100%" stopColor="#FDE68A" />
      </linearGradient>
    ),
    render: (s) => {
      const c = s / 2;
      const r1 = c - 2;
      const r2 = c - 5.5;
      return (
        <>
          <circle cx={c} cy={c} r={r1} fill="none" stroke="url(#lg-grad)" strokeWidth={3} />
          <circle cx={c} cy={c} r={r2} fill="none" stroke="url(#lg-grad)" strokeWidth={1.5} />
          {[0, 90, 180, 270].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            return <circle key={angle} cx={c + (r1 + r2) / 2 * Math.cos(rad)} cy={c + (r1 + r2) / 2 * Math.sin(rad)} r={2} fill="#FFD700" />;
          })}
        </>
      );
    },
    glowColor: 'rgba(255,215,0,0.3)',
    glowBlur: 10,
  },

  // ── Platinum League: octagonal gem cut + rotating inner ──
  'league-platinum': {
    defs: (s) => (
      <linearGradient id="lp-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#67E8F9" />
        <stop offset="50%" stopColor="#00BCD4" />
        <stop offset="100%" stopColor="#0891B2" />
      </linearGradient>
    ),
    render: (s) => {
      const c = s / 2;
      const r = c - 2;
      const pts = Array.from({ length: 8 }, (_, i) => {
        const angle = (45 * i - 22.5) * (Math.PI / 180);
        return `${c + r * Math.cos(angle)},${c + r * Math.sin(angle)}`;
      }).join(' ');
      return (
        <>
          <polygon points={pts} fill="none" stroke="url(#lp-grad)" strokeWidth={3.5} strokeLinejoin="round" />
          <circle cx={c} cy={c} r={c - 6} fill="none" stroke="url(#lp-grad)" strokeWidth={1} strokeDasharray="3 5" opacity={0.5}>
            <animateTransform attributeName="transform" type="rotate" from={`0 ${c} ${c}`} to={`360 ${c} ${c}`} dur="15s" repeatCount="indefinite" />
          </circle>
        </>
      );
    },
    glowColor: 'rgba(0,188,212,0.3)',
    glowBlur: 12,
    animated: true,
    avatarClipPath: polyClip(8, -22.5),
  },

  // ── Masters League: crown-shaped frame with animated glow ──
  'league-masters': {
    defs: (s) => (
      <>
        <linearGradient id="lm-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E879F9" />
          <stop offset="50%" stopColor="#9C27B0" />
          <stop offset="100%" stopColor="#7B1FA2" />
        </linearGradient>
        <linearGradient id="lm-grad2" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F0ABFC" />
          <stop offset="100%" stopColor="#C084FC" />
        </linearGradient>
      </>
    ),
    render: (s) => {
      const c = s / 2;
      const outer = c - 1;
      const inner = c - 5;
      const spikes = 5;
      // Crown-like star points
      const pts = Array.from({ length: spikes * 2 }, (_, i) => {
        const angle = (i * 360) / (spikes * 2) - 90;
        const rad = (angle * Math.PI) / 180;
        const r = i % 2 === 0 ? outer : inner;
        return `${c + r * Math.cos(rad)},${c + r * Math.sin(rad)}`;
      }).join(' ');
      return (
        <>
          <polygon points={pts} fill="none" stroke="url(#lm-grad)" strokeWidth={2.5} strokeLinejoin="round">
            <animateTransform attributeName="transform" type="rotate" from={`0 ${c} ${c}`} to={`360 ${c} ${c}`} dur="20s" repeatCount="indefinite" />
          </polygon>
          <circle cx={c} cy={c} r={c - 3} fill="none" stroke="url(#lm-grad2)" strokeWidth={2} opacity={0.4} />
        </>
      );
    },
    glowColor: 'rgba(156,39,176,0.35)',
    glowBlur: 14,
    glowOpacity: 0.7,
    animated: true,
    avatarClipPath: starClip(5, 48, 44, -90),
  },

  // ══════════════════════════════════════════════════════════
  // STREAK MILESTONE FRAMES — earned at 30, 60, 100 day streaks
  // ══════════════════════════════════════════════════════════

  // ── Iron Will (30-day): sturdy square-ish rounded frame ──
  'streak-iron': {
    defs: (s) => (
      <linearGradient id="si-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#94A3B8" />
        <stop offset="50%" stopColor="#64748B" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>
    ),
    render: (s) => {
      const inset = 3;
      const sz = s - inset * 2;
      const radius = sz * 0.3;
      return (
        <rect x={inset} y={inset} width={sz} height={sz} rx={radius} fill="none" stroke="url(#si-grad)" strokeWidth={4} />
      );
    },
    glowColor: 'rgba(100,116,139,0.25)',
    glowBlur: 8,
    avatarClipPath: 'inset(0 round 30%)',
  },

  // ── Diamond Mind (60-day): faceted diamond cut ──
  'streak-diamond': {
    defs: (s) => (
      <linearGradient id="sd-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#93C5FD" />
        <stop offset="33%" stopColor="#60A5FA" />
        <stop offset="66%" stopColor="#818CF8" />
        <stop offset="100%" stopColor="#C084FC" />
      </linearGradient>
    ),
    render: (s) => {
      const c = s / 2;
      const r = c - 2;
      // Diamond with 4 points + 4 flat sides
      const pts = [
        `${c},${c - r}`,          // top
        `${c + r * 0.7},${c - r * 0.7}`,
        `${c + r},${c}`,          // right
        `${c + r * 0.7},${c + r * 0.7}`,
        `${c},${c + r}`,          // bottom
        `${c - r * 0.7},${c + r * 0.7}`,
        `${c - r},${c}`,          // left
        `${c - r * 0.7},${c - r * 0.7}`,
      ].join(' ');
      return (
        <>
          <polygon points={pts} fill="none" stroke="url(#sd-grad)" strokeWidth={3} strokeLinejoin="round" />
          <circle cx={c} cy={c} r={c - 5} fill="none" stroke="url(#sd-grad)" strokeWidth={1} opacity={0.3} />
        </>
      );
    },
    glowColor: 'rgba(96,165,250,0.3)',
    glowBlur: 10,
    avatarClipPath: starClip(4, 48, 34, -90),
  },

  // ── Centurion (100-day): rotating laurel wreath ──
  'streak-centurion': {
    defs: (s) => (
      <>
        <linearGradient id="sc-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="50%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <linearGradient id="sc-grad2" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </>
    ),
    render: (s) => {
      const c = s / 2;
      const r = c - 2;
      // Double wreath: 10 leaf marks on outer ring
      return (
        <>
          <circle cx={c} cy={c} r={r} fill="none" stroke="url(#sc-grad)" strokeWidth={3} />
          {Array.from({ length: 10 }, (_, i) => {
            const angle = (36 * i) * (Math.PI / 180);
            const x = c + (r - 1) * Math.cos(angle);
            const y = c + (r - 1) * Math.sin(angle);
            return (
              <ellipse
                key={i}
                cx={x} cy={y}
                rx={3.5} ry={1.5}
                fill="url(#sc-grad2)"
                transform={`rotate(${36 * i} ${x} ${y})`}
              />
            );
          })}
          <circle cx={c} cy={c} r={c - 6} fill="none" stroke="url(#sc-grad)" strokeWidth={1} opacity={0.3}>
            <animateTransform attributeName="transform" type="rotate" from={`0 ${c} ${c}`} to={`-360 ${c} ${c}`} dur="30s" repeatCount="indefinite" />
          </circle>
        </>
      );
    },
    glowColor: 'rgba(251,191,36,0.35)',
    glowBlur: 12,
    glowOpacity: 0.6,
    animated: true,
  },

  // ══════════════════════════════════════════════════════════
  // COMMON FRAMES — simple, no animation
  // ══════════════════════════════════════════════════════════

  // ── Steel: solid circle, light gray gradient ──
  steel: {
    defs: (s) => (
      <linearGradient id="steel-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#D1D5DB" />
        <stop offset="50%" stopColor="#6B7280" />
        <stop offset="100%" stopColor="#4B5563" />
      </linearGradient>
    ),
    render: (s) => {
      const c = s / 2;
      const r = c - 3;
      return (
        <circle cx={c} cy={c} r={r} fill="none" stroke="url(#steel-grad)" strokeWidth={4} />
      );
    },
    glowColor: 'rgba(107,114,128,0.2)',
    glowBlur: 8,
  },

  // ── Copper: bright copper to patina green gradient ──
  copper: {
    defs: (s) => (
      <linearGradient id="copper-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#F0A050" />
        <stop offset="50%" stopColor="#B45309" />
        <stop offset="100%" stopColor="#0D9488" />
      </linearGradient>
    ),
    render: (s) => {
      const c = s / 2;
      const r = c - 3;
      return (
        <circle cx={c} cy={c} r={r} fill="none" stroke="url(#copper-grad)" strokeWidth={5} />
      );
    },
    glowColor: 'rgba(180,83,9,0.25)',
    glowBlur: 8,
  },

  // ── Bolt: hexagonal frame with vertex dots ──
  bolt: {
    defs: (s) => (
      <linearGradient id="bolt-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#D4D4D8" />
        <stop offset="50%" stopColor="#A1A1AA" />
        <stop offset="100%" stopColor="#71717A" />
      </linearGradient>
    ),
    render: (s) => {
      const c = s / 2;
      const r = c - 2;
      const vertices = Array.from({ length: 6 }, (_, i) => {
        const angle = (60 * i - 30) * (Math.PI / 180);
        return { x: c + r * Math.cos(angle), y: c + r * Math.sin(angle) };
      });
      const pts = vertices.map((v) => `${v.x},${v.y}`).join(' ');
      return (
        <>
          <polygon points={pts} fill="none" stroke="url(#bolt-grad)" strokeWidth={4} strokeLinejoin="round" />
          {vertices.map((v, i) => (
            <circle key={i} cx={v.x} cy={v.y} r={2} fill="#A1A1AA" />
          ))}
        </>
      );
    },
    glowColor: 'rgba(161,161,170,0.2)',
    glowBlur: 8,
    avatarClipPath: polyClip(6, -30),
  },

  // ── Blueprint: double circles with cross-hair lines ──
  blueprint: {
    defs: (s) => (
      <linearGradient id="blueprint-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="100%" stopColor="#93C5FD" />
      </linearGradient>
    ),
    render: (s) => {
      const c = s / 2;
      const r1 = c - 2;
      const r2 = c - 5;
      const tickLen = 4;
      return (
        <>
          <circle cx={c} cy={c} r={r1} fill="none" stroke="#60A5FA" strokeWidth={2} />
          <circle cx={c} cy={c} r={r2} fill="none" stroke="#93C5FD" strokeWidth={1.5} strokeDasharray="3 4" />
          {/* Cross-hair lines at cardinal points */}
          <line x1={c} y1={c - r1 - 1} x2={c} y2={c - r1 + tickLen} stroke="#60A5FA" strokeWidth={1.5} />
          <line x1={c} y1={c + r1 + 1} x2={c} y2={c + r1 - tickLen} stroke="#60A5FA" strokeWidth={1.5} />
          <line x1={c - r1 - 1} y1={c} x2={c - r1 + tickLen} y2={c} stroke="#60A5FA" strokeWidth={1.5} />
          <line x1={c + r1 + 1} y1={c} x2={c + r1 - tickLen} y2={c} stroke="#60A5FA" strokeWidth={1.5} />
        </>
      );
    },
    glowColor: 'rgba(96,165,250,0.2)',
    glowBlur: 8,
  },

  // ── Titanium: thick near-white to dark gradient ──
  titanium: {
    defs: (s) => (
      <linearGradient id="titanium-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#E4E4E7" />
        <stop offset="50%" stopColor="#A1A1AA" />
        <stop offset="100%" stopColor="#52525B" />
      </linearGradient>
    ),
    render: (s) => {
      const c = s / 2;
      const r = c - 3;
      return (
        <circle cx={c} cy={c} r={r} fill="none" stroke="url(#titanium-grad)" strokeWidth={6} />
      );
    },
    glowColor: 'rgba(161,161,170,0.2)',
    glowBlur: 8,
  },

  // ── Rivet: circle with 8 rivet dots at 45-degree intervals ──
  rivet: {
    defs: (s) => (
      <linearGradient id="rivet-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#57534E" />
        <stop offset="100%" stopColor="#44403C" />
      </linearGradient>
    ),
    render: (s) => {
      const c = s / 2;
      const r = c - 3;
      return (
        <>
          <circle cx={c} cy={c} r={r} fill="none" stroke="url(#rivet-grad)" strokeWidth={3} />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            return (
              <circle key={angle} cx={c + r * Math.cos(rad)} cy={c + r * Math.sin(rad)} r={2.5} fill="#44403C" />
            );
          })}
        </>
      );
    },
    glowColor: 'rgba(68,64,60,0.2)',
    glowBlur: 8,
  },

  // ── Cast Iron: rounded rectangle frame ──
  'cast-iron': {
    defs: (s) => (
      <linearGradient id="castiron-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#78716C" />
        <stop offset="50%" stopColor="#44403C" />
        <stop offset="100%" stopColor="#292524" />
      </linearGradient>
    ),
    render: (s) => {
      const inset = 3;
      const sz = s - inset * 2;
      const radius = sz * 0.35;
      return (
        <rect x={inset} y={inset} width={sz} height={sz} rx={radius} fill="none" stroke="url(#castiron-grad)" strokeWidth={4.5} />
      );
    },
    glowColor: 'rgba(68,64,60,0.2)',
    glowBlur: 8,
    avatarClipPath: 'inset(0 round 35%)',
  },

  // ── Spring: scalloped circle in green ──
  spring: {
    defs: (s) => (
      <linearGradient id="spring-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#6EE7B7" />
        <stop offset="50%" stopColor="#34D399" />
        <stop offset="100%" stopColor="#10B981" />
      </linearGradient>
    ),
    render: (s) => {
      const c = s / 2;
      const r = c - 3;
      const bumps = 16;
      const bumpDepth = 3;
      let d = '';
      for (let i = 0; i < bumps; i++) {
        const a1 = (360 / bumps) * i - 90;
        const a2 = (360 / bumps) * (i + 0.5) - 90;
        const a3 = (360 / bumps) * (i + 1) - 90;
        const r1 = (a1 * Math.PI) / 180;
        const r2 = (a2 * Math.PI) / 180;
        const r3 = (a3 * Math.PI) / 180;
        const x1 = c + r * Math.cos(r1);
        const y1 = c + r * Math.sin(r1);
        const cx2 = c + (r + bumpDepth) * Math.cos(r2);
        const cy2 = c + (r + bumpDepth) * Math.sin(r2);
        const x3 = c + r * Math.cos(r3);
        const y3 = c + r * Math.sin(r3);
        if (i === 0) d += `M ${x1} ${y1} `;
        d += `Q ${cx2} ${cy2} ${x3} ${y3} `;
      }
      d += 'Z';
      return (
        <path d={d} fill="none" stroke="url(#spring-grad)" strokeWidth={3} />
      );
    },
    glowColor: 'rgba(52,211,153,0.25)',
    glowBlur: 8,
  },

  // ── Gear: 12-tooth gear polygon ──
  gear: {
    defs: (s) => (
      <linearGradient id="gear-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#D6D3D1" />
        <stop offset="50%" stopColor="#A8A29E" />
        <stop offset="100%" stopColor="#57534E" />
      </linearGradient>
    ),
    render: (s) => {
      const c = s / 2;
      const outerR = c - 2;
      const innerR = c - 7;
      const teeth = 12;
      const pts = Array.from({ length: teeth * 2 }, (_, i) => {
        const angle = (i * 360) / (teeth * 2) - 90;
        const rad = (angle * Math.PI) / 180;
        const r = i % 2 === 0 ? outerR : innerR;
        return `${c + r * Math.cos(rad)},${c + r * Math.sin(rad)}`;
      }).join(' ');
      return (
        <polygon points={pts} fill="none" stroke="url(#gear-grad)" strokeWidth={2} strokeLinejoin="round" />
      );
    },
    glowColor: 'rgba(168,162,158,0.2)',
    glowBlur: 8,
    avatarClipPath: starClip(12, 48, 43, -90),
  },

  // ── Gasket: flat red thick circle ──
  gasket: {
    defs: () => <></>,
    render: (s) => {
      const c = s / 2;
      const r = c - 3;
      return (
        <circle cx={c} cy={c} r={r} fill="none" stroke="#DC2626" strokeWidth={5} />
      );
    },
    glowColor: 'rgba(220,38,38,0.2)',
    glowBlur: 8,
  },

  // ── Wire: thin amber circle ──
  wire: {
    defs: () => <></>,
    render: (s) => {
      const c = s / 2;
      const r = c - 3;
      return (
        <circle cx={c} cy={c} r={r} fill="none" stroke="#F59E0B" strokeWidth={3} />
      );
    },
    glowColor: 'rgba(245,158,11,0.2)',
    glowBlur: 8,
  },

  // ── Concrete: thick gray circle with texture ──
  concrete: {
    defs: () => <></>,
    render: (s) => {
      const c = s / 2;
      const r = c - 3;
      return (
        <circle cx={c} cy={c} r={r} fill="none" stroke="#A3A3A3" strokeWidth={6} strokeDasharray="1 0.5" />
      );
    },
    glowColor: 'rgba(163,163,163,0.2)',
    glowBlur: 8,
  },

  // ══════════════════════════════════════════════════════════
  // RARE FRAMES — more complex, gradients
  // ══════════════════════════════════════════════════════════

  // ── Wrench: double ring with rectangular notches ──
  wrench: {
    defs: (s) => (
      <linearGradient id="wrench-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#93C5FD" />
        <stop offset="50%" stopColor="#64748B" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>
    ),
    render: (s) => {
      const c = s / 2;
      const r1 = c - 2;
      const r2 = c - 5.5;
      return (
        <>
          <circle cx={c} cy={c} r={r1} fill="none" stroke="url(#wrench-grad)" strokeWidth={3} />
          <circle cx={c} cy={c} r={r2} fill="none" stroke="url(#wrench-grad)" strokeWidth={1.5} strokeDasharray="3 5" />
          {/* Rectangular notches at cardinal points */}
          {[0, 90, 180, 270].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const nx = c + ((r1 + r2) / 2) * Math.cos(rad);
            const ny = c + ((r1 + r2) / 2) * Math.sin(rad);
            return (
              <rect
                key={angle}
                x={nx - 2}
                y={ny - 1}
                width={4}
                height={2}
                fill="#475569"
                transform={`rotate(${angle} ${nx} ${ny})`}
              />
            );
          })}
        </>
      );
    },
    glowColor: 'rgba(100,116,139,0.25)',
    glowBlur: 10,
  },

  // ── Piston: two concentric circles with connecting lines ──
  piston: {
    defs: (s) => (
      <linearGradient id="piston-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#EF4444" />
        <stop offset="50%" stopColor="#F97316" />
        <stop offset="100%" stopColor="#EF4444" />
      </linearGradient>
    ),
    render: (s) => {
      const c = s / 2;
      const r1 = c - 2;
      const r2 = c - 6;
      return (
        <>
          <circle cx={c} cy={c} r={r1} fill="none" stroke="url(#piston-grad)" strokeWidth={3} />
          <circle cx={c} cy={c} r={r2} fill="none" stroke="url(#piston-grad)" strokeWidth={2} />
          {/* Connecting lines at 45, 135, 225, 315 degrees */}
          {[45, 135, 225, 315].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            return (
              <line
                key={angle}
                x1={c + r2 * Math.cos(rad)}
                y1={c + r2 * Math.sin(rad)}
                x2={c + r1 * Math.cos(rad)}
                y2={c + r1 * Math.sin(rad)}
                stroke="url(#piston-grad)"
                strokeWidth={1.5}
              />
            );
          })}
        </>
      );
    },
    glowColor: 'rgba(239,68,68,0.25)',
    glowBlur: 10,
  },

  // ── Circuit: PCB green circle with trace lines and solder pads ──
  circuit: {
    defs: () => <></>,
    render: (s) => {
      const c = s / 2;
      const r = c - 3;
      const traceLen = 3;
      return (
        <>
          <circle cx={c} cy={c} r={r} fill="none" stroke="#16A34A" strokeWidth={3} />
          {/* 8 perpendicular trace lines with solder pad circles */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = c + r * Math.cos(rad);
            const y1 = c + r * Math.sin(rad);
            const x2 = c + (r + traceLen) * Math.cos(rad);
            const y2 = c + (r + traceLen) * Math.sin(rad);
            return (
              <g key={angle}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#4ADE80" strokeWidth={1.5} />
                <circle cx={x2} cy={y2} r={1.5} fill="#4ADE80" />
              </g>
            );
          })}
        </>
      );
    },
    glowColor: 'rgba(22,163,74,0.25)',
    glowBlur: 10,
  },

  // ── Thermal: 5-stop blue→cyan→green→yellow→red gradient circle ──
  thermal: {
    defs: (s) => (
      <linearGradient id="thermal-grad" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0%" stopColor="#1E3A8A" />
        <stop offset="25%" stopColor="#06B6D4" />
        <stop offset="50%" stopColor="#22C55E" />
        <stop offset="75%" stopColor="#EAB308" />
        <stop offset="100%" stopColor="#EF4444" />
      </linearGradient>
    ),
    render: (s) => {
      const c = s / 2;
      const r = c - 3;
      return (
        <circle cx={c} cy={c} r={r} fill="none" stroke="url(#thermal-grad)" strokeWidth={5} />
      );
    },
    glowColor: 'rgba(234,179,8,0.25)',
    glowBlur: 10,
  },

  // ── Weld: zigzag chevron texture circle with inner glow ──
  weld: {
    defs: (s) => (
      <linearGradient id="weld-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FB923C" />
        <stop offset="50%" stopColor="#D97706" />
        <stop offset="100%" stopColor="#92400E" />
      </linearGradient>
    ),
    render: (s) => {
      const c = s / 2;
      const r = c - 3;
      const notches = 24;
      const notchDepth = 2;
      let d = '';
      for (let i = 0; i < notches; i++) {
        const a1 = (360 / notches) * i - 90;
        const aMid = (360 / notches) * (i + 0.5) - 90;
        const a2 = (360 / notches) * (i + 1) - 90;
        const rad1 = (a1 * Math.PI) / 180;
        const radMid = (aMid * Math.PI) / 180;
        const rad2 = (a2 * Math.PI) / 180;
        const x1 = c + r * Math.cos(rad1);
        const y1 = c + r * Math.sin(rad1);
        const xMid = c + (r + notchDepth) * Math.cos(radMid);
        const yMid = c + (r + notchDepth) * Math.sin(radMid);
        const x2 = c + r * Math.cos(rad2);
        const y2 = c + r * Math.sin(rad2);
        if (i === 0) d += `M ${x1} ${y1} `;
        d += `L ${xMid} ${yMid} L ${x2} ${y2} `;
      }
      d += 'Z';
      return (
        <>
          <path d={d} fill="none" stroke="url(#weld-grad)" strokeWidth={2} strokeLinejoin="round" />
          {/* Inner thin glow circle */}
          <circle cx={c} cy={c} r={c - 6} fill="none" stroke="#FB923C" strokeWidth={1} opacity={0.3} />
        </>
      );
    },
    glowColor: 'rgba(251,146,60,0.3)',
    glowBlur: 10,
  },

  // ══════════════════════════════════════════════════════════
  // EPIC FRAMES — unique shapes
  // ══════════════════════════════════════════════════════════

  // ── Turbine: outer circle with 8 curved blade ellipses and inner hub ──
  turbine: {
    defs: (s) => (
      <linearGradient id="turbine-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="100%" stopColor="#0284C7" />
      </linearGradient>
    ),
    render: (s) => {
      const c = s / 2;
      const r = c - 2;
      return (
        <>
          <circle cx={c} cy={c} r={r} fill="none" stroke="url(#turbine-grad)" strokeWidth={2} />
          {/* 8 curved blade ellipses arranged radially */}
          {Array.from({ length: 8 }, (_, i) => {
            const angle = 45 * i;
            const rad = (angle * Math.PI) / 180;
            const bx = c + (r - 6) * Math.cos(rad);
            const by = c + (r - 6) * Math.sin(rad);
            return (
              <ellipse
                key={i}
                cx={bx}
                cy={by}
                rx={8}
                ry={2}
                fill="none"
                stroke="url(#turbine-grad)"
                strokeWidth={1.5}
                transform={`rotate(${angle} ${bx} ${by})`}
              />
            );
          })}
          {/* Inner hub circle */}
          <circle cx={c} cy={c} r={c - 8} fill="none" stroke="url(#turbine-grad)" strokeWidth={1.5} opacity={0.5} />
        </>
      );
    },
    glowColor: 'rgba(56,189,248,0.3)',
    glowBlur: 10,
  },

  // ── Plasma: 3 concentric circles with purple→magenta→pink gradient ──
  plasma: {
    defs: (s) => (
      <linearGradient id="plasma-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="50%" stopColor="#D946EF" />
        <stop offset="100%" stopColor="#F472B6" />
      </linearGradient>
    ),
    render: (s) => {
      const c = s / 2;
      const r1 = c - 2;
      const r2 = c - 5;
      const r3 = c - 8;
      return (
        <>
          <circle cx={c} cy={c} r={r1} fill="none" stroke="url(#plasma-grad)" strokeWidth={3} opacity={0.9} />
          <circle cx={c} cy={c} r={r2} fill="none" stroke="url(#plasma-grad)" strokeWidth={2} opacity={0.6} />
          <circle cx={c} cy={c} r={r3} fill="none" stroke="url(#plasma-grad)" strokeWidth={1} opacity={0.3} />
        </>
      );
    },
    glowColor: 'rgba(139,92,246,0.3)',
    glowBlur: 12,
  },

  // ── Star-Drive: 8-pointed star with gold gradient and inner dotted circle ──
  'star-drive': {
    defs: (s) => (
      <linearGradient id="stardrive-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="50%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
    ),
    render: (s) => {
      const c = s / 2;
      const outer = c - 1;
      const inner = c - 5;
      const spikes = 8;
      const pts = Array.from({ length: spikes * 2 }, (_, i) => {
        const angle = (i * 360) / (spikes * 2) - 90;
        const rad = (angle * Math.PI) / 180;
        const r = i % 2 === 0 ? outer : inner;
        return `${c + r * Math.cos(rad)},${c + r * Math.sin(rad)}`;
      }).join(' ');
      return (
        <>
          <polygon points={pts} fill="none" stroke="url(#stardrive-grad)" strokeWidth={2} strokeLinejoin="round" />
          <circle cx={c} cy={c} r={c - 7} fill="none" stroke="url(#stardrive-grad)" strokeWidth={1} strokeDasharray="2 3" opacity={0.5} />
        </>
      );
    },
    glowColor: 'rgba(245,158,11,0.3)',
    glowBlur: 10,
    avatarClipPath: starClip(8, 48, 44, -90),
  },

  // ══════════════════════════════════════════════════════════
  // LEGENDARY FRAMES — animated
  // ══════════════════════════════════════════════════════════

  // ── Singularity: 3 concentric rings rotating independently ──
  singularity: {
    defs: (s) => (
      <linearGradient id="singularity-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="50%" stopColor="#7C3AED" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
    ),
    render: (s) => {
      const c = s / 2;
      const r1 = c - 2;
      const r2 = c - 5;
      const r3 = c - 8;
      return (
        <>
          {/* Outer solid ring — rotates CW 10s */}
          <circle cx={c} cy={c} r={r1} fill="none" stroke="url(#singularity-grad)" strokeWidth={3}>
            <animateTransform attributeName="transform" type="rotate" from={`0 ${c} ${c}`} to={`360 ${c} ${c}`} dur="10s" repeatCount="indefinite" />
          </circle>
          {/* Middle dashed ring — rotates CCW 15s */}
          <circle cx={c} cy={c} r={r2} fill="none" stroke="url(#singularity-grad)" strokeWidth={2} strokeDasharray="4 6">
            <animateTransform attributeName="transform" type="rotate" from={`360 ${c} ${c}`} to={`0 ${c} ${c}`} dur="15s" repeatCount="indefinite" />
          </circle>
          {/* Inner dotted ring — rotates CW 20s */}
          <circle cx={c} cy={c} r={r3} fill="none" stroke="url(#singularity-grad)" strokeWidth={1} strokeDasharray="1 3">
            <animateTransform attributeName="transform" type="rotate" from={`0 ${c} ${c}`} to={`360 ${c} ${c}`} dur="20s" repeatCount="indefinite" />
          </circle>
        </>
      );
    },
    glowColor: 'rgba(59,130,246,0.35)',
    glowBlur: 14,
    glowOpacity: 0.6,
    animated: true,
  },

  // ── Fusion Reactor: octagon, inner circle, 3 elliptical orbits with electron dots ──
  'fusion-reactor': {
    defs: (s) => (
      <linearGradient id="fusion-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#22D3EE" />
        <stop offset="100%" stopColor="#06B6D4" />
      </linearGradient>
    ),
    render: (s) => {
      const c = s / 2;
      const r = c - 2;
      // Octagon points
      const octPts = Array.from({ length: 8 }, (_, i) => {
        const angle = (45 * i - 22.5) * (Math.PI / 180);
        return `${c + r * Math.cos(angle)},${c + r * Math.sin(angle)}`;
      }).join(' ');
      const orbitRx = c - 6;
      const orbitRy = (c - 6) * 0.35;
      return (
        <>
          <polygon points={octPts} fill="none" stroke="url(#fusion-grad)" strokeWidth={3} strokeLinejoin="round" />
          <circle cx={c} cy={c} r={c - 8} fill="none" stroke="url(#fusion-grad)" strokeWidth={1} opacity={0.3} />
          {/* 3 elliptical orbit paths at 60 degrees apart */}
          {[0, 60, 120].map((rotation, idx) => {
            const dur = [12, 18, 24][idx];
            return (
              <g key={idx} transform={`rotate(${rotation} ${c} ${c})`}>
                <ellipse cx={c} cy={c} rx={orbitRx} ry={orbitRy} fill="none" stroke="#22D3EE" strokeWidth={0.75} opacity={0.4} />
                {/* Electron dot orbiting */}
                <circle r={2} fill="#22D3EE">
                  <animateMotion dur={`${dur}s`} repeatCount="indefinite">
                    <mpath xlinkHref={`#fusion-orbit-${idx}`} />
                  </animateMotion>
                </circle>
                {/* Hidden path for animateMotion — defined inline */}
                <ellipse id={`fusion-orbit-${idx}`} cx={c} cy={c} rx={orbitRx} ry={orbitRy} fill="none" stroke="none" />
              </g>
            );
          })}
        </>
      );
    },
    glowColor: 'rgba(34,211,238,0.35)',
    glowBlur: 14,
    glowOpacity: 0.6,
    animated: true,
    avatarClipPath: polyClip(8, -22.5),
  },

  // ── Supernova: rotating 12-pointed starburst with stroke-width animation and debris ──
  supernova: {
    defs: (s) => (
      <linearGradient id="supernova-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FEF3C7" />
        <stop offset="33%" stopColor="#F59E0B" />
        <stop offset="66%" stopColor="#F97316" />
        <stop offset="100%" stopColor="#DC2626" />
      </linearGradient>
    ),
    render: (s) => {
      const c = s / 2;
      const outer = c - 1;
      const inner = c - 5;
      const spikes = 12;
      const pts = Array.from({ length: spikes * 2 }, (_, i) => {
        const angle = (i * 360) / (spikes * 2) - 90;
        const rad = (angle * Math.PI) / 180;
        const r = i % 2 === 0 ? outer : inner;
        return `${c + r * Math.cos(rad)},${c + r * Math.sin(rad)}`;
      }).join(' ');
      return (
        <>
          {/* Rotating starburst */}
          <polygon points={pts} fill="none" stroke="url(#supernova-grad)" strokeLinejoin="round">
            <animate attributeName="stroke-width" values="2;3.5;2" dur="3s" repeatCount="indefinite" />
            <animateTransform attributeName="transform" type="rotate" from={`0 ${c} ${c}`} to={`360 ${c} ${c}`} dur="25s" repeatCount="indefinite" />
          </polygon>
          {/* 6 debris circles with opacity animation */}
          {[0, 60, 120, 180, 240, 300].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const dx = c + (outer + 1) * Math.cos(rad);
            const dy = c + (outer + 1) * Math.sin(rad);
            return (
              <circle key={angle} cx={dx} cy={dy} r={1.5} fill="#F97316">
                <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" begin={`${angle / 360}s`} repeatCount="indefinite" />
              </circle>
            );
          })}
        </>
      );
    },
    glowColor: 'rgba(249,115,22,0.4)',
    glowBlur: 14,
    glowOpacity: 0.7,
    animated: true,
    avatarClipPath: starClip(12, 48, 44, -90),
  },

  // ── All-Gold: thick 5-stop gold gradient circle with laurel leaves and rotating inner ring ──
  'all-gold': {
    defs: (s) => (
      <>
        <linearGradient id="allgold-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="25%" stopColor="#FDE68A" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="75%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#FDE68A" />
        </linearGradient>
        <linearGradient id="allgold-leaf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </>
    ),
    render: (s) => {
      const c = s / 2;
      const r = c - 3;
      return (
        <>
          <circle cx={c} cy={c} r={r} fill="none" stroke="url(#allgold-grad)" strokeWidth={5} />
          {/* 10 laurel leaf ellipses */}
          {Array.from({ length: 10 }, (_, i) => {
            const angle = 36 * i;
            const rad = (angle * Math.PI) / 180;
            const lx = c + (r - 1) * Math.cos(rad);
            const ly = c + (r - 1) * Math.sin(rad);
            return (
              <ellipse
                key={i}
                cx={lx}
                cy={ly}
                rx={3.5}
                ry={1.5}
                fill="url(#allgold-leaf)"
                transform={`rotate(${angle} ${lx} ${ly})`}
              />
            );
          })}
          {/* Inner dashed ring rotating at 30s */}
          <circle cx={c} cy={c} r={c - 7} fill="none" stroke="url(#allgold-grad)" strokeWidth={1} strokeDasharray="3 5" opacity={0.4}>
            <animateTransform attributeName="transform" type="rotate" from={`0 ${c} ${c}`} to={`360 ${c} ${c}`} dur="30s" repeatCount="indefinite" />
          </circle>
        </>
      );
    },
    glowColor: 'rgba(245,158,11,0.35)',
    glowBlur: 14,
    glowOpacity: 0.7,
    animated: true,
  },

  // ══════════════════════════════════════════════════════════
  // REWARD FRAMES — earned through achievements
  // ══════════════════════════════════════════════════════════

  // ── First Gold: matte gold circle with single laurel leaf at top ──
  'first-gold': {
    defs: (s) => (
      <linearGradient id="firstgold-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#EAB308" />
        <stop offset="100%" stopColor="#A16207" />
      </linearGradient>
    ),
    render: (s) => {
      const c = s / 2;
      const r = c - 3;
      const topX = c;
      const topY = c - r + 1;
      return (
        <>
          <circle cx={c} cy={c} r={r} fill="none" stroke="url(#firstgold-grad)" strokeWidth={4} />
          {/* Single laurel leaf at top */}
          <ellipse
            cx={topX}
            cy={topY}
            rx={3.5}
            ry={1.5}
            fill="#EAB308"
            transform={`rotate(-90 ${topX} ${topY})`}
          />
        </>
      );
    },
    glowColor: 'rgba(234,179,8,0.25)',
    glowBlur: 8,
  },

  // ── Marathon: double royal blue circles with runner dot and fading trail ──
  marathon: {
    defs: (s) => (
      <linearGradient id="marathon-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
    ),
    render: (s) => {
      const c = s / 2;
      const r1 = c - 2;
      const r2 = c - 5;
      return (
        <>
          <circle cx={c} cy={c} r={r1} fill="none" stroke="url(#marathon-grad)" strokeWidth={3} />
          <circle cx={c} cy={c} r={r2} fill="none" stroke="url(#marathon-grad)" strokeWidth={2} opacity={0.5} />
          {/* Runner dot with fading trail (3 dots along outer ring) */}
          {[0, -12, -24].map((offset, idx) => {
            const angle = (offset - 90) * (Math.PI / 180);
            return (
              <circle
                key={idx}
                cx={c + r1 * Math.cos(angle)}
                cy={c + r1 * Math.sin(angle)}
                r={2 - idx * 0.5}
                fill="#3B82F6"
                opacity={1 - idx * 0.3}
              />
            );
          })}
        </>
      );
    },
    glowColor: 'rgba(59,130,246,0.25)',
    glowBlur: 10,
  },

  // ── Early Bird: sunrise gradient circle with ray lines at top ──
  'early-bird': {
    defs: (s) => (
      <linearGradient id="earlybird-grad" x1="0.5" y1="1" x2="0.5" y2="0">
        <stop offset="0%" stopColor="#F97316" />
        <stop offset="40%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#F472B6" />
      </linearGradient>
    ),
    render: (s) => {
      const c = s / 2;
      const r = c - 3;
      const rayLen = 4;
      return (
        <>
          <circle cx={c} cy={c} r={r} fill="none" stroke="url(#earlybird-grad)" strokeWidth={4} />
          {/* 3 ray lines at top (-90, -60, -120 degrees) */}
          {[-90, -60, -120].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            return (
              <line
                key={angle}
                x1={c + r * Math.cos(rad)}
                y1={c + r * Math.sin(rad)}
                x2={c + (r + rayLen) * Math.cos(rad)}
                y2={c + (r + rayLen) * Math.sin(rad)}
                stroke="#FBBF24"
                strokeWidth={2}
                strokeLinecap="round"
              />
            );
          })}
        </>
      );
    },
    glowColor: 'rgba(249,115,22,0.25)',
    glowBlur: 10,
  },

  // ── Perfect Unit: emerald→teal gradient circle with 5 checkmarks at top ──
  'perfect-unit': {
    defs: (s) => (
      <linearGradient id="perfectunit-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#14B8A6" />
      </linearGradient>
    ),
    render: (s) => {
      const c = s / 2;
      const r = c - 3;
      return (
        <>
          <circle cx={c} cy={c} r={r} fill="none" stroke="url(#perfectunit-grad)" strokeWidth={3.5} />
          {/* 5 small checkmark paths at top */}
          {[-72, -54, -36, -18, 0].map((offsetDeg, idx) => {
            const angle = (-90 + offsetDeg * 0.5) * (Math.PI / 180);
            const tx = c + (r - 1) * Math.cos(angle + (idx - 2) * 0.12);
            const ty = c + (r - 1) * Math.sin(angle + (idx - 2) * 0.12);
            return (
              <path
                key={idx}
                d={`M ${tx - 1.5} ${ty} L ${tx - 0.5} ${ty + 1.5} L ${tx + 1.5} ${ty - 1}`}
                fill="none"
                stroke="#10B981"
                strokeWidth={1}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            );
          })}
        </>
      );
    },
    glowColor: 'rgba(16,185,129,0.25)',
    glowBlur: 10,
  },

  // ── Speed Demon: yellow→orange→red gradient circle with 3 lightning bolts ──
  'speed-demon': {
    defs: (s) => (
      <linearGradient id="speeddemon-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="50%" stopColor="#F97316" />
        <stop offset="100%" stopColor="#EF4444" />
      </linearGradient>
    ),
    render: (s) => {
      const c = s / 2;
      const r = c - 3;
      return (
        <>
          <circle cx={c} cy={c} r={r} fill="none" stroke="url(#speeddemon-grad)" strokeWidth={3} />
          {/* 3 lightning bolt paths at 120 degree intervals */}
          {[0, 120, 240].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const bx = c + (r - 1) * Math.cos(rad);
            const by = c + (r - 1) * Math.sin(rad);
            return (
              <path
                key={angle}
                d={`M ${bx - 1.5} ${by - 2.5} L ${bx + 0.5} ${by - 0.5} L ${bx - 0.5} ${by + 0.5} L ${bx + 1.5} ${by + 2.5}`}
                fill="none"
                stroke="#FBBF24"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            );
          })}
        </>
      );
    },
    glowColor: 'rgba(251,191,36,0.25)',
    glowBlur: 10,
  },

  // ── Perfectionist: bullseye 3 concentric circles with crosshair lines ──
  perfectionist: {
    defs: () => <></>,
    render: (s) => {
      const c = s / 2;
      const r1 = c - 2;
      const r2 = c - 5;
      const r3 = c - 8;
      return (
        <>
          <circle cx={c} cy={c} r={r1} fill="none" stroke="#FCA5A5" strokeWidth={2} />
          <circle cx={c} cy={c} r={r2} fill="none" stroke="#EF4444" strokeWidth={2} />
          <circle cx={c} cy={c} r={r3} fill="none" stroke="#991B1B" strokeWidth={2} />
          {/* Crosshair lines */}
          <line x1={c} y1={c - r1} x2={c} y2={c - r3} stroke="#FCA5A5" strokeWidth={1} opacity={0.5} />
          <line x1={c} y1={c + r3} x2={c} y2={c + r1} stroke="#FCA5A5" strokeWidth={1} opacity={0.5} />
          <line x1={c - r1} y1={c} x2={c - r3} y2={c} stroke="#FCA5A5" strokeWidth={1} opacity={0.5} />
          <line x1={c + r3} y1={c} x2={c + r1} y2={c} stroke="#FCA5A5" strokeWidth={1} opacity={0.5} />
        </>
      );
    },
    glowColor: 'rgba(239,68,68,0.25)',
    glowBlur: 10,
  },
};
