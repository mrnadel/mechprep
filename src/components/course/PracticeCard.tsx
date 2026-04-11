'use client';

import Link from 'next/link';
import { useStore } from '@/store/useStore';
import { useCourseStore } from '@/store/useCourseStore';

const THEME = {
  bg: 'var(--color-primary-50)',
  color: 'var(--color-primary-500)',
  dark: 'var(--color-primary-700)',
  mid: 'var(--color-primary-400)',
};

const GOAL_CONFIG: Record<string, { title: string; subtitle: string; icon: string }> = {
  interview: { title: 'Interview Prep', subtitle: 'Simulate interview-style questions', icon: '\uD83D\uDCBC' },
  exam: { title: 'Exam Drills', subtitle: 'Timed practice for exam readiness', icon: '\uD83D\uDCDD' },
  refresh: { title: 'Quick Review', subtitle: 'Refresh what you\'ve forgotten', icon: '\uD83D\uDD04' },
  curiosity: { title: 'Explore Topics', subtitle: 'Discover something new', icon: '\uD83D\uDCA1' },
};

const DEFAULT_CONFIG = { title: 'Practice Your Weak Areas', subtitle: 'Personalized questions for you', icon: '\uD83E\uDDE0' };

export function PracticeCard() {
  const progress = useStore((s) => s.progress);
  const activeProfession = useCourseStore((s) => s.activeProfession);
  const courseIntro = useCourseStore((s) => s.progress.courseIntros?.[activeProfession]);

  const goalConfig = (courseIntro?.goal && GOAL_CONFIG[courseIntro.goal]) || DEFAULT_CONFIG;

  const weakCount = progress.weakAreas.length;
  const topicsAttempted = progress.topicProgress.filter(
    (t) => t.questionsAttempted > 0
  ).length;

  const subtitle =
    weakCount > 0
      ? `${weakCount} weak ${weakCount === 1 ? 'area' : 'areas'} to improve`
      : topicsAttempted > 0
        ? 'Reinforce what you know'
        : goalConfig.subtitle;

  return (
    <div className="px-3 sm:px-4" style={{ paddingTop: 12 }}>
      <Link
        href="/practice"
        replace
        className="block transition-transform active:scale-[0.98]"
        style={{
          borderRadius: 24,
          overflow: 'hidden',
          background: `linear-gradient(180deg, #F5F7FF 0%, ${THEME.bg} 100%)`,
          textDecoration: 'none',
          boxShadow: `0 4px 0 0 #C7D0F4, 0 6px 16px -2px rgba(99,102,241,0.15)`,
          border: '2px solid rgba(199,208,244,0.6)',
          borderBottom: '2px solid transparent',
        }}
      >
        {/* Header row — matches UnitHeader layout */}
        <div
          className="flex items-center"
          style={{ padding: '20px 20px 16px' }}
        >
          {/* Text */}
          <div className="flex-1 min-w-0">
            <div
              style={{
                fontSize: 11,
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: 1.2,
                marginBottom: 4,
                color: THEME.dark,
                opacity: 0.7,
              }}
            >
              Smart Practice
            </div>
            <div
              style={{
                fontSize: 19,
                fontWeight: 800,
                lineHeight: 1.2,
                color: THEME.dark,
              }}
            >
              {goalConfig.title}
            </div>
            <div
              style={{
                fontSize: 12.5,
                fontWeight: 700,
                color: THEME.mid,
                opacity: 0.6,
                marginTop: 3,
              }}
            >
              {subtitle}
            </div>
          </div>

          {/* Icon — matches unit illustration size */}
          <div
            className="flex-shrink-0 flex items-center justify-center"
            style={{
              width: 80,
              height: 80,
              marginLeft: 12,
              borderRadius: 20,
              background: 'rgba(255,255,255,0.7)',
              boxShadow: 'inset 0 -2px 4px rgba(99,102,241,0.08), 0 2px 8px rgba(99,102,241,0.1)',
            }}
          >
            <span style={{ fontSize: 42 }}>{goalConfig.icon}</span>
          </div>
        </div>

        {/* Bottom bar with GO button — matches unit progress bar area */}
        <div
          className="flex items-center justify-between"
          style={{ padding: '0 20px 16px' }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: THEME.dark,
              opacity: 0.5,
            }}
          >
            10 personalized questions
          </div>
          <div
            className="go-btn-pulse"
            style={{
              background: THEME.color,
              color: '#FFFFFF',
              fontSize: 13,
              fontWeight: 800,
              padding: '8px 20px',
              borderRadius: 12,
              textTransform: 'uppercase',
              letterSpacing: 0.8,
              boxShadow: `0 4px 0 ${THEME.dark}`,
              '--go-shadow-color': THEME.dark,
              '--go-glow-color': `${THEME.color}25`,
            } as React.CSSProperties}
          >
            Go
          </div>
        </div>
      </Link>
    </div>
  );
}
