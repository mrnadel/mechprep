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

export const ProblemHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "Studying is boring" text fades in
  const textOpacity = interpolate(frame, [0, fps * 0.5], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Thinking mascot appears
  const mascotScale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12 },
  });

  // Cross out "boring" and replace with "fun"
  const strikeWidth = interpolate(frame, [fps * 1.2, fps * 1.8], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const funOpacity = interpolate(frame, [fps * 1.8, fps * 2.2], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const funScale = spring({
    frame: frame - Math.floor(fps * 1.8),
    fps,
    config: { damping: 10, mass: 0.5 },
  });

  // Swap mascot from thinking to excited
  const swapFrame = fps * 2;
  const showExcited = frame >= swapFrame;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.background} 0%, #FEF3C7 50%, ${COLORS.background} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Nunito, sans-serif',
        gap: 40,
      }}
    >
      {/* Mascot */}
      <div style={{ transform: `scale(${Math.max(0, mascotScale)})` }}>
        <Img
          src={staticFile(
            showExcited ? 'mascot/excited.png' : 'mascot/thinking.png'
          )}
          style={{ width: 200, height: 200, objectFit: 'contain' }}
        />
      </div>

      {/* Text */}
      <div
        style={{
          opacity: textOpacity,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          fontSize: 56,
          fontWeight: 800,
          color: COLORS.text,
        }}
      >
        <span>Studying is</span>
        <span style={{ position: 'relative', display: 'inline-block' }}>
          <span
            style={{
              opacity: funOpacity > 0.5 ? 0.3 : 1,
              color: COLORS.textLight,
            }}
          >
            boring
          </span>
          {/* Strike-through line */}
          <div
            style={{
              position: 'absolute',
              top: '55%',
              left: -4,
              width: `${strikeWidth}%`,
              height: 4,
              background: COLORS.primaryDark,
              borderRadius: 2,
            }}
          />
          {/* "fun" replacement */}
          {funOpacity > 0 && (
            <span
              style={{
                position: 'absolute',
                top: -60,
                left: '50%',
                transform: `translateX(-50%) scale(${Math.max(0, funScale)}) rotate(-5deg)`,
                opacity: funOpacity,
                color: COLORS.primary,
                fontSize: 64,
                fontWeight: 900,
                whiteSpace: 'nowrap',
              }}
            >
              a game!
            </span>
          )}
        </span>
      </div>
    </AbsoluteFill>
  );
};
