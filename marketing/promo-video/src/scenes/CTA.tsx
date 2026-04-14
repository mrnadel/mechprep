import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from 'remotion';
import { COLORS } from '../constants';

export const CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Mascot bounces in
  const mascotScale = spring({
    frame,
    fps,
    config: { damping: 8, mass: 0.6, stiffness: 150 },
  });

  // Main text
  const textOpacity = interpolate(frame, [fps * 0.3, fps * 0.8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const textY = interpolate(frame, [fps * 0.3, fps * 0.8], [40, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // CTA button
  const buttonScale = spring({
    frame: frame - fps * 1.2,
    fps,
    config: { damping: 10, mass: 0.5, stiffness: 200 },
  });

  // Subtle pulse on button
  const pulse =
    1 + Math.sin(((frame - fps * 2) / fps) * Math.PI * 2) * 0.03;
  const finalButtonScale = Math.max(0, buttonScale) * (frame > fps * 2 ? pulse : 1);

  // Logo at bottom
  const logoOpacity = interpolate(frame, [fps * 1.5, fps * 2], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Floating particles
  const particles = Array.from({ length: 12 }, (_, i) => ({
    x: Math.sin(i * 1.2) * 600 + 960,
    y: Math.cos(i * 0.8) * 300 + 540,
    size: 8 + (i % 3) * 6,
    speed: 0.5 + (i % 4) * 0.3,
    color: [COLORS.primary, COLORS.accent, COLORS.emerald, COLORS.psychology][
      i % 4
    ],
  }));

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.primaryDark} 0%, ${COLORS.primary} 40%, #2DD4BF 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Nunito, sans-serif',
        gap: 24,
      }}
    >
      {/* Floating particles */}
      {particles.map((p, i) => {
        const yOffset = Math.sin((frame * p.speed * 0.05) + i) * 40;
        const xOffset = Math.cos((frame * p.speed * 0.03) + i) * 20;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: p.x + xOffset,
              top: p.y + yOffset,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              background: p.color,
              opacity: 0.3,
            }}
          />
        );
      })}

      {/* Mascot */}
      <Img
        src={staticFile('mascot/celebrating.png')}
        style={{
          width: 180,
          height: 180,
          objectFit: 'contain',
          transform: `scale(${mascotScale})`,
        }}
      />

      {/* Main text */}
      <div
        style={{
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: COLORS.white,
            lineHeight: 1.1,
            textShadow: '0 4px 20px rgba(0,0,0,0.2)',
          }}
        >
          Start Free.
          <br />
          Level Up.
        </div>
      </div>

      {/* CTA Button */}
      <div
        style={{
          transform: `scale(${finalButtonScale})`,
          background: COLORS.white,
          color: COLORS.primaryDark,
          fontSize: 32,
          fontWeight: 800,
          padding: '20px 64px',
          borderRadius: 60,
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          cursor: 'pointer',
        }}
      >
        Download Now
      </div>

      {/* Logo + app name */}
      <div
        style={{
          opacity: logoOpacity,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginTop: 16,
        }}
      >
        <Img
          src={staticFile('icon-512.png')}
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
          }}
        />
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: 'rgba(255,255,255,0.9)',
          }}
        >
          octokeen.com
        </div>
      </div>
    </AbsoluteFill>
  );
};
