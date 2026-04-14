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

const courses = [
  {
    name: 'Personal Finance',
    emoji: '\ud83d\udcb0',
    color: COLORS.finance,
    badge: 'course-personal-finance.png',
    desc: 'Budgets, investing & more',
  },
  {
    name: 'Psychology',
    emoji: '\ud83e\udde0',
    color: COLORS.psychology,
    badge: 'course-psychology.png',
    desc: 'Mind, behavior & cognition',
  },
  {
    name: 'Space & Astronomy',
    emoji: '\ud83d\ude80',
    color: COLORS.space,
    badge: 'course-space-astronomy.png',
    desc: 'Stars, planets & galaxies',
  },
  {
    name: 'Mechanical Engineering',
    emoji: '\u2699\ufe0f',
    color: COLORS.engineering,
    badge: 'course-mechanical-engineering.png',
    desc: 'Forces, machines & design',
  },
];

const CourseCard: React.FC<{
  course: (typeof courses)[number];
  index: number;
  frame: number;
  fps: number;
}> = ({ course, index, frame, fps }) => {
  const delay = index * 8; // Stagger each card
  const slideX = interpolate(frame - delay, [0, 15], [400, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = interpolate(frame - delay, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, mass: 0.6 },
  });

  return (
    <div
      style={{
        transform: `translateX(${slideX}px) scale(${Math.max(0, scale)})`,
        opacity,
        background: COLORS.white,
        borderRadius: 24,
        padding: '32px 28px',
        width: 320,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
        boxShadow: `0 12px 40px ${course.color}25`,
        borderTop: `4px solid ${course.color}`,
      }}
    >
      <Img
        src={staticFile(`badges/${course.badge}`)}
        style={{ width: 90, height: 90, objectFit: 'contain' }}
      />
      <div
        style={{
          fontSize: 26,
          fontWeight: 800,
          color: COLORS.text,
          textAlign: 'center',
        }}
      >
        {course.emoji} {course.name}
      </div>
      <div
        style={{
          fontSize: 18,
          fontWeight: 500,
          color: COLORS.textLight,
          textAlign: 'center',
        }}
      >
        {course.desc}
      </div>
    </div>
  );
};

export const Courses: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleOpacity = interpolate(frame, [0, fps * 0.4], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const titleY = interpolate(frame, [0, fps * 0.5], [-40, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.background} 0%, #F0F9FF 50%, ${COLORS.background} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Nunito, sans-serif',
        gap: 48,
      }}
    >
      {/* Section title */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          fontSize: 48,
          fontWeight: 900,
          color: COLORS.text,
        }}
      >
        Explore{' '}
        <span style={{ color: COLORS.primary }}>multiple courses</span>
      </div>

      {/* Course cards row */}
      <div style={{ display: 'flex', gap: 32 }}>
        {courses.map((course, i) => (
          <CourseCard
            key={course.name}
            course={course}
            index={i}
            frame={frame}
            fps={fps}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};
