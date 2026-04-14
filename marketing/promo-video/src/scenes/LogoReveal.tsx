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

export const LogoReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo scales up with spring
  const logoScale = spring({ frame, fps, config: { damping: 12, mass: 0.8 } });

  // Tagline fades in after logo
  const taglineOpacity = interpolate(frame, [fps * 1, fps * 1.8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const taglineY = interpolate(frame, [fps * 1, fps * 1.8], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Subtle glow pulse on logo
  const glowOpacity = interpolate(
    frame,
    [fps * 1.5, fps * 2.5],
    [0, 0.6],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.background} 0%, #E0F2FE 50%, ${COLORS.background} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Nunito, sans-serif',
      }}
    >
      {/* Decorative circles */}
      <div
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.primary}15 0%, transparent 70%)`,
          opacity: glowOpacity,
        }}
      />

      {/* Logo */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
        }}
      >
        <Img
          src={staticFile('icon-512.png')}
          style={{
            width: 180,
            height: 180,
            borderRadius: 40,
            boxShadow: `0 20px 60px ${COLORS.primary}40`,
          }}
        />
        <div
          style={{
            fontSize: 80,
            fontWeight: 900,
            color: COLORS.primaryDark,
            letterSpacing: -2,
          }}
        >
          Octokeen
        </div>
      </div>

      {/* Tagline */}
      <div
        style={{
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
          fontSize: 36,
          fontWeight: 600,
          color: COLORS.textLight,
          marginTop: 16,
        }}
      >
        Learn anything. Master everything.
      </div>
    </AbsoluteFill>
  );
};
