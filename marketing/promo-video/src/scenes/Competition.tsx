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

const leagues = [
  { name: 'Bronze', color: COLORS.bronze, badge: 'league-bronze.png' },
  { name: 'Silver', color: COLORS.silver, badge: 'league-silver.png' },
  { name: 'Gold', color: COLORS.gold, badge: 'league-gold.png' },
  { name: 'Platinum', color: COLORS.platinum, badge: 'league-platinum.png' },
  { name: 'Masters', color: COLORS.masters, badge: 'league-masters.png' },
];

const leaderboardRows = [
  { rank: 1, name: 'You', xp: 1240, highlight: true },
  { rank: 2, name: 'Alex', xp: 1180, highlight: false },
  { rank: 3, name: 'Jordan', xp: 995, highlight: false },
  { rank: 4, name: 'Maya', xp: 870, highlight: false },
  { rank: 5, name: 'Sam', xp: 750, highlight: false },
];

const LeagueTimeline: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      {leagues.map((league, i) => {
        const delay = i * 10;
        const badgeScale = spring({
          frame: frame - delay,
          fps,
          config: { damping: 10, mass: 0.5 },
        });

        // Highlight current league (Gold) with glow
        const isActive = i === 2;
        const glowSize = isActive
          ? interpolate(
              Math.sin(frame * 0.15),
              [-1, 1],
              [8, 20]
            )
          : 0;

        return (
          <React.Fragment key={league.name}>
            <div
              style={{
                transform: `scale(${Math.max(0, badgeScale)})`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
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
                {isActive && (
                  <div
                    style={{
                      position: 'absolute',
                      width: 110,
                      height: 110,
                      borderRadius: '50%',
                      background: `${league.color}30`,
                      filter: `blur(${glowSize}px)`,
                    }}
                  />
                )}
                <Img
                  src={staticFile(`badges/${league.badge}`)}
                  style={{
                    width: isActive ? 100 : 72,
                    height: isActive ? 100 : 72,
                    objectFit: 'contain',
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: isActive ? 20 : 16,
                  fontWeight: isActive ? 800 : 600,
                  color: isActive ? league.color : COLORS.textLight,
                }}
              >
                {league.name}
              </div>
            </div>
            {i < leagues.length - 1 && (
              <div
                style={{
                  width: 40,
                  height: 3,
                  background: i < 2 ? COLORS.primary : '#E2E8F0',
                  borderRadius: 2,
                  marginBottom: 28,
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

const Leaderboard: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const delay = fps * 1.5;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        background: 'rgba(255,255,255,0.95)',
        borderRadius: 20,
        padding: '24px 32px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
        width: 500,
      }}
    >
      <div
        style={{
          fontSize: 22,
          fontWeight: 800,
          color: COLORS.text,
          marginBottom: 8,
        }}
      >
        Weekly Leaderboard
      </div>
      {leaderboardRows.map((row, i) => {
        const rowDelay = delay + i * 6;
        const slideX = interpolate(frame - rowDelay, [0, 10], [200, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const opacity = interpolate(frame - rowDelay, [0, 8], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        return (
          <div
            key={row.rank}
            style={{
              transform: `translateX(${slideX}px)`,
              opacity,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: '10px 16px',
              borderRadius: 12,
              background: row.highlight ? `${COLORS.primary}12` : 'transparent',
              border: row.highlight
                ? `2px solid ${COLORS.primary}40`
                : '2px solid transparent',
            }}
          >
            <div
              style={{
                width: 32,
                fontSize: 20,
                fontWeight: 800,
                color:
                  row.rank === 1
                    ? COLORS.gold
                    : row.rank === 2
                    ? COLORS.silver
                    : row.rank === 3
                    ? COLORS.bronze
                    : COLORS.textLight,
              }}
            >
              #{row.rank}
            </div>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: row.highlight ? COLORS.primary : '#E2E8F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: row.highlight ? COLORS.white : COLORS.textLight,
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              {row.name[0]}
            </div>
            <div
              style={{
                flex: 1,
                fontSize: 20,
                fontWeight: row.highlight ? 800 : 600,
                color: row.highlight ? COLORS.primary : COLORS.text,
              }}
            >
              {row.name}
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: COLORS.accent,
              }}
            >
              {row.xp} XP
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const Competition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleOpacity = interpolate(frame, [0, fps * 0.4], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.background} 0%, #FDF4FF 50%, ${COLORS.background} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Nunito, sans-serif',
        gap: 40,
      }}
    >
      <div
        style={{
          opacity: titleOpacity,
          fontSize: 48,
          fontWeight: 900,
          color: COLORS.text,
        }}
      >
        Compete in{' '}
        <span style={{ color: COLORS.masters }}>weekly leagues</span>
      </div>

      <LeagueTimeline frame={frame} fps={fps} />
      <Leaderboard frame={frame} fps={fps} />
    </AbsoluteFill>
  );
};
