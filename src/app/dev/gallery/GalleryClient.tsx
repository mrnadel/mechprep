'use client';

import { useState, useEffect, useLayoutEffect, useRef, type ReactNode } from 'react';
import { MotionConfig } from 'framer-motion';
// scrollLockDisabled is mutated via require() in useEffect below

// Real components
import { OutOfHeartsModal } from '@/components/ui/OutOfHeartsModal';
import { TrialPromptModal } from '@/components/ui/TrialPromptModal';
import { UpgradeModal } from '@/components/ui/UpgradeModal';
import { ProfessionPickerModal } from '@/components/profession/ProfessionPickerModal';
import { LevelUpCelebration } from '@/components/engagement/LevelUpCelebration';
import { StreakMilestone } from '@/components/engagement/StreakMilestone';
import { WelcomeBack } from '@/components/engagement/WelcomeBack';
import { StreakFreeze } from '@/components/engagement/StreakFreeze';
import { LeagueWinner } from '@/components/engagement/LeagueWinner';
import { LeaguePromotion } from '@/components/engagement/LeaguePromotion';
import { BlueprintCelebration } from '@/components/engagement/BlueprintCelebration';
import { CourseCompleteCelebration } from '@/components/engagement/CourseCompleteCelebration';
import ResultScreen from '@/components/lesson/ResultScreen';
import PlacementTestResult from '@/components/course/PlacementTestResult';

// Stores
import { useCourseStore } from '@/store/useCourseStore';
import { useEngagementStore } from '@/store/useEngagementStore';

// ─── Types ───────────────────────────────────────────

interface ScreenDef {
  id: string;
  label: string;
  section: string;
  render: () => ReactNode;
  setup?: () => void;
  cleanup?: () => void;
}

const noop = () => {};

// ─── Store Mock Helpers ──────────────────────────────

function setLeagueMock(rank: number, promoted: boolean, demoted: boolean, tier: number) {
  useEngagementStore.setState((s) => ({
    league: {
      ...s.league,
      resultSeen: false,
      lastWeekResult: { rank, xp: 520 - rank * 30, promoted, demoted, stayed: !promoted && !demoted, tier, gemsEarned: promoted ? 15 : 0 },
    },
  }));
}

function clearLeagueMock() {
  useEngagementStore.setState((s) => ({
    league: { ...s.league, resultSeen: true, lastWeekResult: null },
  }));
}

// ─── Screen Registry ─────────────────────────────────

const SCREENS: ScreenDef[] = [
  // Utility Modals (props-based, no store mocking needed)
  {
    id: 'out-of-hearts', label: 'OutOfHeartsModal', section: 'Utility Modals',
    render: () => <OutOfHeartsModal isOpen onClose={noop} />,
  },
  {
    id: 'trial-prompt', label: 'TrialPromptModal', section: 'Utility Modals',
    setup: () => {
      // Clear the "already shown" flag so the modal will open
      if (typeof window !== 'undefined') localStorage.removeItem('mechready-trial-prompt-shown');
    },
    cleanup: () => {
      // Re-set it so it doesn't pop up elsewhere
      if (typeof window !== 'undefined') localStorage.setItem('mechready-trial-prompt-shown', '1');
    },
    render: () => <TrialPromptModal />,
  },
  {
    id: 'upgrade-modal', label: 'UpgradeModal', section: 'Utility Modals',
    render: () => <UpgradeModal isOpen onClose={noop} reason="This unit requires Pro" />,
  },
  {
    id: 'profession-picker', label: 'ProfessionPickerModal', section: 'Utility Modals',
    render: () => <ProfessionPickerModal isOpen onClose={noop} selectedId="mechanical" onSelect={noop} />,
  },

  // Celebrations (props-based)
  {
    id: 'level-up', label: 'LevelUpCelebration', section: 'Celebrations',
    render: () => <LevelUpCelebration reward={{ level: 5, gems: 15, isMilestone: false, message: 'Keep going!' }} onClose={noop} />,
  },
  {
    id: 'level-up-milestone', label: 'LevelUpCelebration (Milestone)', section: 'Celebrations',
    render: () => <LevelUpCelebration reward={{ level: 10, gems: 50, isMilestone: true, streakFreeze: true, message: 'Major milestone!' }} onClose={noop} />,
  },
  {
    id: 'streak-milestone', label: 'StreakMilestone', section: 'Celebrations',
    render: () => <StreakMilestone milestone={{ days: 7, gems: 10, badgeName: 'Week Warrior', badgeIcon: 'week-warrior' }} onClose={noop} />,
  },

  // Celebrations (store-dependent)
  {
    id: 'welcome-back', label: 'WelcomeBack', section: 'Celebrations',
    setup: () => useEngagementStore.setState((s) => ({
      comeback: { ...s.comeback, isInComebackFlow: true, daysAway: 5, comebackQuestsCompleted: 0, lastDismissedDate: null },
    })),
    cleanup: () => useEngagementStore.setState((s) => ({
      comeback: { ...s.comeback, isInComebackFlow: false },
    })),
    render: () => <WelcomeBack />,
  },
  {
    id: 'streak-freeze', label: 'StreakFreeze (Repair)', section: 'Celebrations',
    setup: () => useEngagementStore.setState((s) => ({
      streak: { ...s.streak, repairAvailable: true, repairCost: 50, currentStreak: 0, bestStreak: 12 },
      gems: { ...s.gems, balance: 100 },
    })),
    cleanup: () => useEngagementStore.setState((s) => ({
      streak: { ...s.streak, repairAvailable: false },
    })),
    render: () => <StreakFreeze />,
  },

  // League (store-dependent)
  {
    id: 'league-winner', label: 'LeagueWinner', section: 'League',
    setup: () => {
      useEngagementStore.setState((s) => ({
        league: {
          ...s.league,
          currentTier: 3 as 1|2|3|4|5,
          resultSeen: false,
          winnerSeen: false,
          lastWeekResult: { rank: 1, xp: 520, promoted: true, demoted: false, stayed: false, tier: 3, gemsEarned: 20 },
        },
      }));
    },
    cleanup: () => {
      useEngagementStore.setState((s) => ({
        league: { ...s.league, winnerSeen: true, resultSeen: true, lastWeekResult: null },
      }));
    },
    render: () => <LeagueWinner />,
  },
  {
    id: 'league-promoted', label: 'LeaguePromotion (Promoted)', section: 'League',
    setup: () => setLeagueMock(2, true, false, 3),
    cleanup: clearLeagueMock,
    render: () => <LeaguePromotion />,
  },
  {
    id: 'league-stayed', label: 'LeaguePromotion (Stayed)', section: 'League',
    setup: () => setLeagueMock(8, false, false, 2),
    cleanup: clearLeagueMock,
    render: () => <LeaguePromotion />,
  },
  {
    id: 'league-demoted', label: 'LeaguePromotion (Demoted)', section: 'League',
    setup: () => setLeagueMock(14, false, true, 1),
    cleanup: clearLeagueMock,
    render: () => <LeaguePromotion />,
  },

  // Lesson Results (store-dependent)
  {
    id: 'result-flawless', label: 'ResultScreen (Flawless)', section: 'Lesson Results',
    setup: () => useCourseStore.setState({
      lessonResult: { lessonId: 'mock-1', unitTitle: 'Unit 1', lessonTitle: 'Thermodynamics Basics', totalQuestions: 8, correctAnswers: 8, xpEarned: 45, accuracy: 100, stars: 3, passed: true, isFlawless: true, isNewBest: true, isFirstCompletion: false, isGolden: false } as never,
    }),
    cleanup: () => useCourseStore.setState({ lessonResult: null }),
    render: () => <ResultScreen />,
  },
  {
    id: 'result-passed', label: 'ResultScreen (Passed)', section: 'Lesson Results',
    setup: () => useCourseStore.setState({
      lessonResult: { lessonId: 'mock-2', unitTitle: 'Unit 2', lessonTitle: 'Heat Transfer', totalQuestions: 8, correctAnswers: 7, xpEarned: 32, accuracy: 85, stars: 2, passed: true, isFlawless: false, isNewBest: false, isFirstCompletion: false, isGolden: false } as never,
    }),
    cleanup: () => useCourseStore.setState({ lessonResult: null }),
    render: () => <ResultScreen />,
  },
  {
    id: 'result-failed', label: 'ResultScreen (Failed)', section: 'Lesson Results',
    setup: () => useCourseStore.setState({
      lessonResult: { lessonId: 'mock-3', unitTitle: 'Unit 3', lessonTitle: 'Fluid Mechanics', totalQuestions: 8, correctAnswers: 3, xpEarned: 8, accuracy: 40, stars: 0, passed: false, isFlawless: false, isNewBest: false, isFirstCompletion: false, isGolden: false } as never,
    }),
    cleanup: () => useCourseStore.setState({ lessonResult: null }),
    render: () => <ResultScreen />,
  },
  {
    id: 'result-golden', label: 'ResultScreen (Golden)', section: 'Lesson Results',
    setup: () => useCourseStore.setState({
      lessonResult: { lessonId: 'mock-4', unitTitle: 'Unit 1', lessonTitle: 'Statics Review', totalQuestions: 8, correctAnswers: 8, xpEarned: 60, accuracy: 100, stars: 3, passed: true, isFlawless: true, isNewBest: true, isFirstCompletion: false, isGolden: true } as never,
    }),
    cleanup: () => useCourseStore.setState({ lessonResult: null }),
    render: () => <ResultScreen />,
  },

  // Placement Test (store-dependent)
  {
    id: 'placement-passed', label: 'PlacementTestResult (Passed)', section: 'Placement Test',
    setup: () => useCourseStore.setState({
      placementTestResult: { passed: true, targetUnitIndex: 3, targetUnitTitle: 'Unit 4: Dynamics', totalQuestions: 10, correctAnswers: 8, mistakes: 2, maxMistakes: 4, unitsSkipped: 3 } as never,
    }),
    cleanup: () => useCourseStore.setState({ placementTestResult: null }),
    render: () => <PlacementTestResult />,
  },
  {
    id: 'placement-failed', label: 'PlacementTestResult (Failed)', section: 'Placement Test',
    setup: () => useCourseStore.setState({
      placementTestResult: { passed: false, targetUnitIndex: 0, targetUnitTitle: 'Unit 1', totalQuestions: 10, correctAnswers: 4, mistakes: 6, maxMistakes: 4, unitsSkipped: 0 } as never,
    }),
    cleanup: () => useCourseStore.setState({ placementTestResult: null }),
    render: () => <PlacementTestResult />,
  },

  // Chapter & Course (props-based)
  {
    id: 'blueprint', label: 'BlueprintCelebration', section: 'Chapter & Course',
    render: () => <BlueprintCelebration unitIndex={0} isGolden={false} onDismiss={noop} />,
  },
  {
    id: 'blueprint-mastered', label: 'BlueprintCelebration (Mastered)', section: 'Chapter & Course',
    render: () => <BlueprintCelebration unitIndex={0} isGolden onDismiss={noop} />,
  },
  {
    id: 'course-complete', label: 'CourseCompleteCelebration', section: 'Chapter & Course',
    render: () => <CourseCompleteCelebration onDismiss={noop} />,
  },
];

const SECTIONS = [...new Set(SCREENS.map((s) => s.section))];

// ─── Gallery Page ────────────────────────────────────

export default function GalleryClient() {
  const [filter, setFilter] = useState<string | null>(null);
  const [activeScreen, setActiveScreen] = useState<string | null>(null);

  // Disable scroll locking globally so modals don't lock the gallery page
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const mod = require('@/hooks/useScrollLock');
    mod.scrollLockDisabled = true;
    document.body.style.overflow = '';
    return () => { mod.scrollLockDisabled = false; };
  }, []);

  const filtered = filter ? SCREENS.filter((s) => s.section === filter) : SCREENS;
  const grouped = SECTIONS
    .filter((sec) => !filter || sec === filter)
    .map((sec) => ({ section: sec, screens: filtered.filter((s) => s.section === sec) }))
    .filter((g) => g.screens.length > 0);

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', fontFamily: "'Inter', -apple-system, sans-serif", padding: '40px 20px 80px' }}>
      <h1 style={{ textAlign: 'center', fontSize: 26, fontWeight: 900, letterSpacing: -0.5, marginBottom: 4 }}>
        MechReady Screen Gallery
      </h1>
      <p style={{ textAlign: 'center', fontSize: 12, color: '#555', marginBottom: 8 }}>
        {SCREENS.length} live screens. All render real components. Click any to view full-size.
      </p>

      {/* Section filters */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginBottom: 40, marginTop: 24 }}>
        <FilterBtn active={!filter} onClick={() => setFilter(null)}>All</FilterBtn>
        {SECTIONS.map((sec) => (
          <FilterBtn key={sec} active={filter === sec} onClick={() => setFilter(sec === filter ? null : sec)}>
            {sec}
          </FilterBtn>
        ))}
      </div>

      {/* Full-screen preview overlay */}
      {activeScreen && (
        <FullScreenPreview
          screen={SCREENS.find((s) => s.id === activeScreen)!}
          onClose={() => setActiveScreen(null)}
        />
      )}

      {grouped.map(({ section, screens }) => (
        <div key={section}>
          <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2.5, color: '#444', margin: '48px 0 24px', textAlign: 'center' }}>
            {section}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 36 }}>
            {screens.map((screen) => (
              <PhoneFrame key={screen.id} screen={screen} onClick={() => setActiveScreen(screen.id)} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Phone Frame ─────────────────────────────────────

function PhoneFrame({ screen, onClick }: { screen: ScreenDef; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { rootMargin: '200px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: 1 }}>
        {screen.label}
      </div>
      <div
        onClick={onClick}
        style={{
          width: 375, height: 812, borderRadius: 44, overflow: 'hidden',
          border: '3px solid #2a2a2a', position: 'relative', cursor: 'pointer',
          boxShadow: '0 24px 80px rgba(0,0,0,0.6)', background: '#000',
          transform: 'scale(1)',
        }}
      >
        {visible ? (
          <div style={{ pointerEvents: 'none', width: '100%', height: '100%' }} className="gallery-phone-frame">
            <ScreenRenderer screen={screen} />
          </div>
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333', fontSize: 13 }}>
            Loading...
          </div>
        )}
        {/* Force sm: responsive classes to render as mobile (full-screen) */}
        <style>{`
          .gallery-phone-frame .sm\\:h-auto { height: 100% !important; }
          .gallery-phone-frame .sm\\:max-w-sm { max-width: 100% !important; }
          .gallery-phone-frame .sm\\:rounded-2xl { border-radius: 0 !important; }
          .gallery-phone-frame .sm\\:shadow-2xl { box-shadow: none !important; }
          .gallery-phone-frame .sm\\:p-4 { padding: 0 !important; }
          .gallery-phone-frame .sm\\:pt-10 { padding-top: 15vh !important; }
          .gallery-phone-frame .sm\\:pb-5 { padding-bottom: 2rem !important; }
          .gallery-phone-frame .sm\\:flex-initial { flex: 1 !important; }
        `}</style>
      </div>
    </div>
  );
}

// ─── Screen Renderer ─────────────────────────────────

function ScreenRenderer({ screen, instant = true }: { screen: ScreenDef; instant?: boolean }) {
  const [ready, setReady] = useState(false);

  // Use layoutEffect so state is set synchronously before paint.
  // This ensures each screen renders with its own mock state even when
  // multiple screens share the same Zustand store slice.
  useLayoutEffect(() => {
    screen.setup?.();
    setReady(true);
    return () => screen.cleanup?.();
  }, [screen]);

  if (!ready && screen.setup) return null;

  const content = screen.render();

  // In thumbnail mode, skip all Framer Motion animations so modals render at full opacity instantly
  if (instant) {
    return <MotionConfig transition={{ duration: 0 }}>{content}</MotionConfig>;
  }
  return <>{content}</>;
}

// ─── Full-screen Preview ─────────────────────────────

function FullScreenPreview({ screen, onClose }: { screen: ScreenDef; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 99999, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()} style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: -32, right: 0, fontSize: 12, color: '#666' }}>
          ESC or click outside to close
        </div>
        <div style={{
          width: 375, height: 812, borderRadius: 44, overflow: 'hidden',
          border: '3px solid #444', background: '#000', transform: 'scale(1)',
          boxShadow: '0 32px 100px rgba(0,0,0,0.8)',
        }}>
          <div className="gallery-phone-frame" style={{ width: '100%', height: '100%' }}>
            <ScreenRenderer screen={screen} />
          </div>
          <style>{`
            .gallery-phone-frame .sm\\:h-auto { height: 100% !important; }
            .gallery-phone-frame .sm\\:max-w-sm { max-width: 100% !important; }
            .gallery-phone-frame .sm\\:rounded-2xl { border-radius: 0 !important; }
            .gallery-phone-frame .sm\\:shadow-2xl { box-shadow: none !important; }
            .gallery-phone-frame .sm\\:p-4 { padding: 0 !important; }
            .gallery-phone-frame .sm\\:pt-10 { padding-top: 15vh !important; }
            .gallery-phone-frame .sm\\:pb-5 { padding-bottom: 2rem !important; }
            .gallery-phone-frame .sm\\:flex-initial { flex: 1 !important; }
          `}</style>
        </div>
        <div style={{ textAlign: 'center', marginTop: 16, fontSize: 14, fontWeight: 700, color: '#888' }}>
          {screen.label}
        </div>
      </div>
    </div>
  );
}

// ─── Filter Button ───────────────────────────────────

function FilterBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '6px 14px', borderRadius: 8, border: 'none', cursor: 'pointer',
        fontSize: 12, fontWeight: 700,
        background: active ? '#fff' : '#222', color: active ? '#000' : '#666',
      }}
    >
      {children}
    </button>
  );
}
