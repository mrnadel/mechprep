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

const XPCounter: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const enterScale = spring({ frame, fps, config: { damping: 12 } });
  const xpValue = Math.round(
    interpolate(frame, [fps * 0.5, fps * 3], [0, 2450], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  return (
    <div
      style={{
        transform: `scale(${enterScale})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <div
        style={{
          fontSize: 28,
          fontWeight: 700,
          color: COLORS.textLight,
          textTransform: 'uppercase',
          letterSpacing: 3,
        }}
      >
        Total XP
      </div>
      <div
        style={{
          fontSize: 96,
          fontWeight: 900,
          color: COLORS.primary,
          lineHeight: 1,
        }}
      >
        {xpValue.toLocaleString()}
      </div>
    </div>
  );
};

const StreakFire: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const delay = fps * 2.5;
  const localFrame = frame - delay;
  const enterScale = spring({
    frame: localFrame,
    fps,
    config: { damping: 10, mass: 0.6 },
  });

  const streakDays = Math.round(
    interpolate(localFrame, [0, fps * 2], [0, 42], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  // Flame wiggle
  const wiggle = Math.sin(frame * 0.3) * 3;

  return (
    <div
      style={{
        transform: `scale(${Math.max(0, enterScale)})`,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        background: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 24,
        padding: '20px 40px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
      }}
    >
      <Img
        src={staticFile('mascot/on-fire.png')}
        style={{
          width: 80,
          height: 80,
          objectFit: 'contain',
          transform: `rotate(${wiggle}deg)`,
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            fontSize: 48,
            fontWeight: 900,
            color: COLORS.accent,
            lineHeight: 1,
          }}
        >
          {streakDays} days
        </div>
        <div
          style={{ fontSize: 22, fontWeight: 600, color: COLORS.textLight }}
        >
          streak
        </div>
      </div>
    </div>
  );
};

const LevelUpBadge: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const delay = fps * 5;
  const localFrame = frame - delay;
  const enterScale = spring({
    frame: localFrame,
    fps,
    config: { damping: 8, mass: 0.5, stiffness: 200 },
  });

  // Glow pulse
  const glowIntensity = interpolate(
    Math.sin((localFrame / fps) * Math.PI * 2),
    [-1, 1],
    [20, 40]
  );

  return (
    <div
      style={{
        transform: `scale(${Math.max(0, enterScale)})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: 140,
            height: 140,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${COLORS.accent}40 0%, transparent 70%)`,
            filter: `blur(${glowIntensity}px)`,
          }}
        />
        <Img
          src={staticFile('mascot/level-up.png')}
          style={{ width: 120, height: 120, objectFit: 'contain' }}
        />
      </div>
      <div
        style={{
          fontSize: 28,
          fontWeight: 800,
          color: COLORS.accent,
          textTransform: 'uppercase',
          letterSpacing: 2,
        }}
      >
        Level Up!
      </div>
    </div>
  );
};

export const Gamification: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.background} 0%, #ECFDF5 50%, ${COLORS.background} 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Nunito, sans-serif',
        gap: 80,
      }}
    >
      {/* Left: XP counter */}
      <XPCounter frame={frame} fps={fps} />

      {/* Center column: Streak + Level Up */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 40,
        }}
      >
        <StreakFire frame={frame} fps={fps} />
        <LevelUpBadge frame={frame} fps={fps} />
      </div>

      {/* Right: Progress bar + badges */}
      <ProgressBadges frame={frame} fps={fps} />
    </AbsoluteFill>
  );
};

const ProgressBadges: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const delay = fps * 4;
  const localFrame = frame - delay;
  const enterScale = spring({
    frame: localFrame,
    fps,
    config: { damping: 12 },
  });

  const progressWidth = interpolate(localFrame, [0, fps * 2], [0, 75], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const badges = ['level-5.png', 'level-10.png', 'level-20.png'];

  return (
    <div
      style={{
        transform: `scale(${Math.max(0, enterScale)})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 24,
      }}
    >
      {/* Progress bar */}
      <div
        style={{
          width: 300,
          height: 20,
          background: '#E2E8F0',
          borderRadius: 10,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${progressWidth}%`,
            height: '100%',
            background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.emerald})`,
            borderRadius: 10,
          }}
        />
      </div>
      <div
        style={{ fontSize: 18, fontWeight: 600, color: COLORS.textLight }}
      >
        75% mastered
      </div>

      {/* Badge row */}
      <div style={{ display: 'flex', gap: 16 }}>
        {badges.map((badge, i) => {
          const badgeDelay = delay + fps * 0.5 * (i + 1);
          const badgeScale = spring({
            frame: frame - badgeDelay,
            fps,
            config: { damping: 8, mass: 0.4, stiffness: 200 },
          });
          return (
            <Img
              key={badge}
              src={staticFile(`badges/${badge}`)}
              style={{
                width: 72,
                height: 72,
                objectFit: 'contain',
                transform: `scale(${Math.max(0, badgeScale)})`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
