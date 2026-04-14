import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate } from 'remotion';
import { SCENES, FPS } from './constants';
import { LogoReveal } from './scenes/LogoReveal';
import { ProblemHook } from './scenes/ProblemHook';
import { Gamification } from './scenes/Gamification';
import { Courses } from './scenes/Courses';
import { Competition } from './scenes/Competition';
import { CTA } from './scenes/CTA';

const SceneTransition: React.FC<{
  children: React.ReactNode;
  durationInFrames: number;
}> = ({ children, durationInFrames }) => {
  const frame = useCurrentFrame();

  // Fade in first 8 frames, fade out last 8 frames
  const fadeIn = interpolate(frame, [0, 8], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 8, durationInFrames],
    [1, 0],
    { extrapolateLeft: 'clamp' }
  );
  const opacity = Math.min(fadeIn, fadeOut);

  return (
    <AbsoluteFill style={{ opacity }}>
      {children}
    </AbsoluteFill>
  );
};

export const PromoVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#F8FAFC' }}>
      {/* Scene 1: Logo Reveal (0-3s) */}
      <Sequence
        from={SCENES.logoReveal.start}
        durationInFrames={SCENES.logoReveal.duration}
      >
        <SceneTransition durationInFrames={SCENES.logoReveal.duration}>
          <LogoReveal />
        </SceneTransition>
      </Sequence>

      {/* Scene 2: Problem Hook (3-6s) */}
      <Sequence
        from={SCENES.problemHook.start}
        durationInFrames={SCENES.problemHook.duration}
      >
        <SceneTransition durationInFrames={SCENES.problemHook.duration}>
          <ProblemHook />
        </SceneTransition>
      </Sequence>

      {/* Scene 3: Gamification (6-14s) */}
      <Sequence
        from={SCENES.gamification.start}
        durationInFrames={SCENES.gamification.duration}
      >
        <SceneTransition durationInFrames={SCENES.gamification.duration}>
          <Gamification />
        </SceneTransition>
      </Sequence>

      {/* Scene 4: Courses (14-19s) */}
      <Sequence
        from={SCENES.courses.start}
        durationInFrames={SCENES.courses.duration}
      >
        <SceneTransition durationInFrames={SCENES.courses.duration}>
          <Courses />
        </SceneTransition>
      </Sequence>

      {/* Scene 5: Competition (19-24s) */}
      <Sequence
        from={SCENES.competition.start}
        durationInFrames={SCENES.competition.duration}
      >
        <SceneTransition durationInFrames={SCENES.competition.duration}>
          <Competition />
        </SceneTransition>
      </Sequence>

      {/* Scene 6: CTA (24-30s) */}
      <Sequence
        from={SCENES.cta.start}
        durationInFrames={SCENES.cta.duration}
      >
        <SceneTransition durationInFrames={SCENES.cta.duration}>
          <CTA />
        </SceneTransition>
      </Sequence>
    </AbsoluteFill>
  );
};
