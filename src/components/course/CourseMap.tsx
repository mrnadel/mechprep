'use client';

import { useEffect, useLayoutEffect, useRef, useCallback, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Sparkles, Lock, ChevronRight } from 'lucide-react';
import { useCourseStore } from '@/store/useCourseStore';
import { useHeartsStore } from '@/store/useHeartsStore';
import { useSubscription } from '@/hooks/useSubscription';
import { LIMITS, isUnitUnlocked } from '@/lib/pricing';
import { getUnitTheme, type UnitTheme } from '@/lib/unitThemes';
import { UpgradeModal } from '@/components/ui/UpgradeModal';
import { OutOfHeartsModal } from '@/components/ui/OutOfHeartsModal';
import { LessonNode } from './LessonNode';
import { UnitHeroHeader, HERO_EXPANDED_HEIGHT, HERO_COMPACT_HEIGHT, HERO_MORPH_DISTANCE } from './UnitHeroHeader';
import { getUnitBackground } from '@/lib/unitBackgrounds';
import { useIsDark } from '@/store/useThemeStore';

type JumpModalType =
  | { kind: 'within-unit'; unitIndex: number; lessonIndex: number }
  | { kind: 'placement-test'; unitIndex: number }
  | { kind: 'guest-signup'; unitIndex: number }
  | { kind: 'free-upgrade'; unitIndex: number };

/** 3D floating "Jump here" button — two-layer SVG so the face presses into the base on tap */
function JumpHereButton({ theme, onClick }: { theme: UnitTheme; onClick: () => void }) {
  const BTN_W = 160;
  const BTN_H = 54;
  const DEPTH = 6; // 3D extrusion depth in px

  return (
    <motion.div
      className="flex justify-center"
      style={{ margin: '-4px 0 4px', position: 'relative', zIndex: 2 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
    >
      <motion.button
        onClick={onClick}
        className="relative select-none"
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          WebkitTapHighlightColor: 'transparent',
          width: BTN_W,
          height: BTN_H,
          filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.18)) drop-shadow(0 3px 6px rgba(0,0,0,0.1))',
        }}
        initial="rest"
        whileHover="hover"
        whileTap="pressed"
        variants={{
          rest: {
            y: [0, -6, 0],
            transition: { y: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' } },
          },
          hover: {
            y: [0, -6, 0],
            transition: { y: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' } },
          },
          pressed: {
            y: 0,
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.12)) drop-shadow(0 1px 2px rgba(0,0,0,0.08))',
            transition: { y: { type: 'spring', stiffness: 500, damping: 25 }, filter: { duration: 0.1 } },
          },
        }}
        aria-label="Take placement test to jump to this unit"
      >
          {/* Static 3D base — stays in place while face moves */}
          <svg
            width={BTN_W}
            height={BTN_H}
            viewBox={`0 0 ${BTN_W} ${BTN_H}`}
            fill="none"
            style={{ position: 'absolute', top: 0, left: 0 }}
          >
            <rect x="4" y={DEPTH + 6} width="152" height="42" rx="21" fill={theme.dark} />
          </svg>

          {/* Animated button face — lifts on hover, presses into base on tap */}
          <motion.div
            style={{ position: 'relative' }}
            variants={{
              rest: { y: 0 },
              hover: { y: -2 },
              pressed: { y: DEPTH },
            }}
            transition={{ type: 'spring', stiffness: 600, damping: 20, mass: 0.6 }}
          >
            <svg
              width={BTN_W}
              height={BTN_H}
              viewBox={`0 0 ${BTN_W} ${BTN_H}`}
              fill="none"
            >
              {/* Main pill face */}
              <rect x="4" y="6" width="152" height="42" rx="21" fill={theme.color} />
              {/* Top highlight arc — gives convex curvature illusion */}
              <rect x="4" y="6" width="152" height="21" rx="21" fill="white" fillOpacity="0.2" />
              {/* Specular glow line */}
              <rect x="16" y="10" width="128" height="3" rx="1.5" fill="white" fillOpacity="0.3" />

              {/* Rocket icon */}
              <g transform="translate(28, 15)" fill="white">
                <path d="M10 0C10 0 6.5 3.5 6.5 8.5C6.5 11.5 8 14 10 16C12 14 13.5 11.5 13.5 8.5C13.5 3.5 10 0 10 0Z" fillOpacity="0.95" />
                <circle cx="10" cy="8.5" r="2.2" fill={theme.color} />
                <path d="M6.5 12L4 15L6.5 14.2" fillOpacity="0.85" />
                <path d="M13.5 12L16 15L13.5 14.2" fillOpacity="0.85" />
                <path d="M8 16L7 20H9L10 17.5L11 20H13L12 16" fillOpacity="0.7" />
              </g>

              {/* "Jump here" text */}
              <text
                x="95"
                y="30"
                textAnchor="middle"
                fill="white"
                fontFamily="inherit"
                fontWeight="800"
                fontSize="15"
                letterSpacing="0.3"
              >
                Jump here
              </text>
            </svg>
          </motion.div>
        </motion.button>
    </motion.div>
  );
}

/** Hook: returns 'up' | 'down' | null based on whether targetRef is above/below viewport */
function useScrollDirection(
  targetRef: React.RefObject<HTMLDivElement | null>,
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>,
) {
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    if (!targetRef.current) return;

    function check() {
      const el = targetRef.current;
      if (!el) { setDirection(null); return; }
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      if (center < 0) setDirection('up');
      else if (center > window.innerHeight) setDirection('down');
      else setDirection(null);
    }

    check();
    const container = scrollContainerRef?.current;
    if (container) {
      container.addEventListener('scroll', check, { passive: true });
    }
    window.addEventListener('scroll', check, { passive: true, capture: true });
    window.addEventListener('resize', check);
    return () => {
      if (container) {
        container.removeEventListener('scroll', check);
      }
      window.removeEventListener('scroll', check, { capture: true });
      window.removeEventListener('resize', check);
    };
  }, [targetRef, scrollContainerRef]);

  return direction;
}

/** Floating arrow button — rendered only when direction is non-null via AnimatePresence */
function ScrollToCurrentButton({
  direction,
  targetRef,
}: {
  direction: 'up' | 'down';
  targetRef: React.RefObject<HTMLDivElement | null>;
}) {
  const isDark = useIsDark();
  return (
    <motion.button
      key="scroll-to-current"
      initial={{ opacity: 0, y: 20, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.85 }}
      whileTap={{ y: 3, boxShadow: isDark ? '0 1px 0 #1E293B' : '0 1px 0 #D0D0D0' }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      style={{
        position: 'fixed',
        bottom: 84,
        right: 16,
        zIndex: 50,
        width: 48,
        height: 48,
        borderRadius: 14,
        border: 'none',
        cursor: 'pointer',
        background: isDark ? '#1E293B' : '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: isDark ? '0 4px 0 #0F172A' : '0 4px 0 #D0D0D0',
        WebkitTapHighlightColor: 'transparent',
      }}
      aria-label={`Scroll ${direction} to current lesson`}
      onClick={() => {
        targetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }}
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        style={{ transform: direction === 'down' ? 'rotate(180deg)' : undefined }}
      >
        <path
          d="M12 6L12 19"
          stroke="#3B82F6"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <path
          d="M5.5 12L12 5.5L18.5 12"
          stroke="#3B82F6"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.button>
  );
}

export function CourseMap() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const currentUnitRef = useRef<HTMLDivElement>(null);
  const currentLessonRef = useRef<HTMLDivElement>(null);
  const unitElsRef = useRef<(HTMLDivElement | null)[]>([]);
  const scrollDirection = useScrollDirection(currentLessonRef, scrollRef);
  const [headerStyle, setHeaderStyle] = useState({ left: 0, width: 0, top: 0 });
  const progress = useCourseStore((s) => s.progress);
  const courseData = useCourseStore((s) => s.courseData);
  const startLesson = useCourseStore((s) => s.startLesson);
  const startPlacementTest = useCourseStore((s) => s.startPlacementTest);
  const debugSkipToUnit = useCourseStore((s) => s.debugSkipToUnit);
  const debugSkipToLesson = useCourseStore((s) => s.debugSkipToLesson);
  const isLessonUnlocked = useCourseStore((s) => s.isLessonUnlocked);
  const activeProfession = useCourseStore((s) => s.activeProfession);
  const { status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDark = useIsDark();
  const isGuest = status !== 'authenticated';
  const { isProUser } = useSubscription();
  const hasHearts = useHeartsStore((s) => s.hasHearts);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showOutOfHearts, setShowOutOfHearts] = useState(false);
  const [jumpModal, setJumpModal] = useState<JumpModalType | null>(null);
  const [visibleUnitIndex, setVisibleUnitIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const morphValueRef = useRef(0);

  const isFreeLocked = useCallback((unitIndex: number) =>
    !isGuest && !isProUser && !isUnitUnlocked(LIMITS.free.unlockedUnits, unitIndex), [isGuest, isProUser]);

  // Check if a unit is jumpable via placement test (locked, but not paywall/guest blocked)
  const isUnitJumpable = useCallback((unitIndex: number) => {
    const isGuestLocked = isGuest && !isUnitUnlocked(LIMITS.free.unlockedUnits, unitIndex);
    if (isGuestLocked || isFreeLocked(unitIndex)) return false;
    // All lessons must be locked (unit not yet reached)
    const noAccessible = !courseData[unitIndex]?.lessons.some((_, li) => isLessonUnlocked(unitIndex, li));
    return noAccessible;
  }, [isGuest, isFreeLocked, courseData, isLessonUnlocked]);

  const getLessonState = useCallback(
    (
      unitIndex: number,
      lessonIndex: number
    ): 'completed' | 'current' | 'locked' => {
      const lessonId = courseData[unitIndex]?.lessons[lessonIndex]?.id;
      if (!lessonId) return 'locked';

      if (isGuest && !isUnitUnlocked(LIMITS.free.unlockedUnits, unitIndex)) return 'locked';
      if (isFreeLocked(unitIndex)) return 'locked';

      if (progress.completedLessons[lessonId]?.passed) return 'completed';
      if (isLessonUnlocked(unitIndex, lessonIndex)) return 'current';
      return 'locked';
    },
    [progress.completedLessons, isLessonUnlocked, isGuest, isProUser] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const placementUnitIndex = useCourseStore((s) => s.progress.placementUnitIndex ?? 0);

  const findActiveUnitIndex = useCallback((): number => {
    let lastCompletedUnit = placementUnitIndex;
    for (let ui = 0; ui < courseData.length; ui++) {
      for (let li = 0; li < courseData[ui].lessons.length; li++) {
        if (getLessonState(ui, li) === 'completed') {
          lastCompletedUnit = Math.max(lastCompletedUnit, ui);
        }
      }
    }
    return lastCompletedUnit;
  }, [getLessonState, placementUnitIndex]);

  const activeUnitIndex = useMemo(() => findActiveUnitIndex(), [findActiveUnitIndex]);

  // Group units into sections (courses without sectionIndex treat all units as one section)
  const sections = useMemo(() => {
    const hasSections = courseData.some((u) => u.sectionIndex != null);
    if (!hasSections) {
      return [{ sectionIndex: 0, sectionTitle: '', units: courseData.map((u, i) => ({ unit: u, globalIndex: i })) }];
    }
    const groups: { sectionIndex: number; sectionTitle: string; units: { unit: typeof courseData[0]; globalIndex: number }[] }[] = [];
    let current: typeof groups[0] | null = null;
    courseData.forEach((unit, i) => {
      const si = unit.sectionIndex ?? -1;
      if (!current || current.sectionIndex !== si) {
        current = { sectionIndex: si, sectionTitle: unit.sectionTitle ?? unit.title, units: [] };
        groups.push(current);
      }
      current.units.push({ unit, globalIndex: i });
    });
    return groups;
  }, [courseData]);

  const hasSections = sections.length > 1;

  // Determine which section the user is in based on progress
  const activeSectionPos = useMemo(() => {
    if (!hasSections) return 0;
    return sections.findIndex((s) => s.units.some((u) => u.globalIndex === activeUnitIndex)) ?? 0;
  }, [hasSections, sections, activeUnitIndex]);

  const [viewingSectionPos, setViewingSectionPos] = useState(activeSectionPos);
  useEffect(() => { setViewingSectionPos(activeSectionPos); }, [activeSectionPos]);

  const currentSection = sections[viewingSectionPos] ?? sections[0];
  const nextSection = sections[viewingSectionPos + 1] ?? null;
  const prevSection = viewingSectionPos > 0 ? sections[viewingSectionPos - 1] : null;

  // Find the first "current" (next-to-do) lesson to scroll to.
  // Start from the placement unit so the map scrolls to the right place.
  const currentLessonId = useMemo(() => {
    const startUnit = placementUnitIndex;
    // First check from placement unit onwards for the first uncompleted lesson
    for (let ui = startUnit; ui < courseData.length; ui++) {
      for (let li = 0; li < courseData[ui].lessons.length; li++) {
        if (getLessonState(ui, li) === 'current') {
          return courseData[ui].lessons[li].id;
        }
      }
    }
    // Fallback: check from beginning (user may have gone back to earlier units)
    for (let ui = 0; ui < startUnit; ui++) {
      for (let li = 0; li < courseData[ui].lessons.length; li++) {
        if (getLessonState(ui, li) === 'current') {
          return courseData[ui].lessons[li].id;
        }
      }
    }
    return null;
  }, [getLessonState, placementUnitIndex]);


  // Stable callback for lesson clicks
  const handleLessonClick = useCallback(
    (unitIndex: number, lessonIndex: number, state: 'completed' | 'current' | 'locked', lessonProgress: { attempts?: number } | undefined) => {
      if (isFreeLocked(unitIndex)) {
        // Free-tier paywall
        setJumpModal({ kind: 'free-upgrade', unitIndex });
      } else if (state === 'locked') {
        if (isGuest && !isUnitUnlocked(LIMITS.free.unlockedUnits, unitIndex)) {
          setJumpModal({ kind: 'guest-signup', unitIndex });
        } else {
          // Check if the unit itself has any accessible lessons
          const unitHasAccessible = courseData[unitIndex].lessons.some(
            (_, li) => isLessonUnlocked(unitIndex, li),
          );
          if (unitHasAccessible) {
            // Locked lesson inside the user's active unit → must progress sequentially
            setJumpModal({ kind: 'within-unit', unitIndex, lessonIndex });
          } else {
            // Unit not yet reached → offer placement test
            setJumpModal({ kind: 'placement-test', unitIndex });
          }
        }
      } else {
        // Block lesson start if out of hearts
        if (!hasHearts()) {
          setShowOutOfHearts(true);
          return;
        }
        if (state === 'completed' && lessonProgress) {
          const lesson = courseData[unitIndex].lessons[lessonIndex];
          const maxLevels = lesson.levels ?? 1;
          const isGoldenEligible = maxLevels > 1 && (lessonProgress.attempts ?? 0) >= maxLevels - 1;
          startLesson(unitIndex, lessonIndex, isGoldenEligible);
        } else {
          startLesson(unitIndex, lessonIndex);
        }
      }
    },
    [isFreeLocked, isGuest, courseData, isLessonUnlocked, startLesson, hasHearts]
  );

  // Check for ?unit= query param (navigated from /units page)
  const scrollToUnitParam = searchParams.get('unit');
  const scrollToUnitIndex = scrollToUnitParam != null ? parseInt(scrollToUnitParam, 10) : null;

  // Switch to the correct section when navigating via ?unit= param
  useEffect(() => {
    if (scrollToUnitIndex == null || isNaN(scrollToUnitIndex)) return;
    const targetSectionPos = sections.findIndex((s) =>
      s.units.some((u) => u.globalIndex === scrollToUnitIndex)
    );
    if (targetSectionPos >= 0 && targetSectionPos !== viewingSectionPos) {
      setViewingSectionPos(targetSectionPos);
    }
  }, [scrollToUnitIndex, sections, viewingSectionPos]);

  // Auto-scroll to the target unit (from ?unit= param) or current lesson after mount
  useEffect(() => {
    let cancelled = false;
    let attempts = 0;

    function tryScroll() {
      if (cancelled) return;
      attempts++;

      // If navigated from /units page, scroll to that specific unit
      if (scrollToUnitIndex != null && !isNaN(scrollToUnitIndex)) {
        const unitEl = unitElsRef.current[scrollToUnitIndex];
        if (unitEl && unitEl.getBoundingClientRect().height > 0) {
          unitEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Clean up the URL param
          router.replace('/', { scroll: false });
          return;
        }
      } else {
        const target = currentLessonRef.current || currentUnitRef.current;
        if (target && target.getBoundingClientRect().height > 0) {
          target.scrollIntoView({ behavior: 'instant', block: 'center' });
          return;
        }
      }

      if (attempts < 10) {
        requestAnimationFrame(tryScroll);
      }
    }

    // Wait for initial render + CSS animations to start
    const timer = setTimeout(tryScroll, 600);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollToUnitIndex]);

  // Track container left/width on resize (for fixed positioning alignment)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      setHeaderStyle((prev) => ({ ...prev, left: rect.left, width: rect.width }));
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Scroll handler: dynamically position header below CourseHeader + DailyGoalBar, and track visible unit
  useEffect(() => {
    let lastIndex = 0;
    let lastTop = 0;
    const handleScroll = () => {
      // Compute top offset: below the sticky CourseHeader
      const courseHeader = document.querySelector('header.sticky');
      const topOffset = courseHeader?.getBoundingClientRect().bottom ?? 0;

      if (Math.abs(topOffset - lastTop) > 0.5) {
        lastTop = topOffset;
        setHeaderStyle((prev) => ({ ...prev, top: topOffset }));
      }

      // 2. Track visible unit
      const threshold = topOffset + 66;
      let newIndex = 0;
      for (let i = 0; i < unitElsRef.current.length; i++) {
        const el = unitElsRef.current[i];
        if (!el) continue;
        if (el.getBoundingClientRect().top <= threshold) {
          newIndex = i;
        }
      }

      if (newIndex !== lastIndex) {
        lastIndex = newIndex;
        setVisibleUnitIndex(newIndex);
      }

      // 3. Hero morph — direct DOM update, no React state
      const visibleEl = unitElsRef.current[newIndex];
      const hiddenMp = HERO_EXPANDED_HEIGHT / HERO_MORPH_DISTANCE; // ≈1.508 → fully invisible
      if (visibleEl && heroRef.current) {
        let mp: number;
        if (newIndex === 0) {
          // First unit: morph from spacer, 1:1 rate
          const scrolled = (topOffset + HERO_EXPANDED_HEIGHT) - visibleEl.getBoundingClientRect().top;
          mp = Math.min(1, Math.max(0, scrolled / HERO_MORPH_DISTANCE));
        } else {
          // Other units: stay invisible until the inline banner reaches
          // the header area, then morph expanded → compact on top of it
          const scrolled = topOffset - visibleEl.getBoundingClientRect().top;
          mp = scrolled < 0 ? hiddenMp : Math.min(1, scrolled / HERO_MORPH_DISTANCE);
        }

        // 4. Squash: compress to 0 when approaching next unit's banner
        const nextUnitEl = unitElsRef.current[newIndex + 1];
        if (nextUnitEl) {
          const availableHeight = nextUnitEl.getBoundingClientRect().top - topOffset - 6;
          if (availableHeight < HERO_EXPANDED_HEIGHT) {
            const squashMp = (HERO_EXPANDED_HEIGHT - Math.max(0, availableHeight)) / HERO_MORPH_DISTANCE;
            mp = Math.max(mp, squashMp);
          }
        }

        morphValueRef.current = mp;
        heroRef.current.style.setProperty('--mp', mp.toFixed(3));
      }
    };

    // Run once on mount to set initial top
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [courseData.length]);

  // Derive floating header data from visibleUnitIndex
  const floatingUnit = courseData[visibleUnitIndex];
  const floatingTheme = getUnitTheme(visibleUnitIndex);
  const floatingCompleted = floatingUnit?.lessons.filter(
    (l) => progress.completedLessons[l.id]?.passed
  ).length ?? 0;
  const floatingAllGolden = floatingUnit && floatingCompleted === floatingUnit.lessons.length &&
    floatingUnit.lessons.every((l) => progress.completedLessons[l.id]?.golden);

  // Restore --mp after React re-renders (e.g. unit change) to avoid 1-frame flash
  useLayoutEffect(() => {
    heroRef.current?.style.setProperty('--mp', morphValueRef.current.toFixed(3));
  });

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto"
      style={{
        paddingBottom: 40,
        scrollBehavior: 'smooth',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {/* Morphing unit hero header */}
      {floatingUnit && (
        <UnitHeroHeader
          ref={heroRef}
          unit={floatingUnit}
          unitIndex={visibleUnitIndex}
          completedInUnit={floatingCompleted}
          totalInUnit={floatingUnit.lessons.length}
          isAllGolden={!!floatingAllGolden}
          theme={floatingTheme}
          professionId={activeProfession}
          hasSections={hasSections}
          sectionIndex={currentSection.sectionIndex}
          positionStyle={headerStyle}
          onBrowseClick={() => router.push('/units')}
        />
      )}

      {/* Spacer accounts for the hero header height */}
      <div style={{ height: HERO_EXPANDED_HEIGHT }} aria-hidden />

      {/* Units container */}
      <div
        className="flex flex-col px-3 sm:px-4 mx-auto"
        style={{ paddingTop: 8, paddingBottom: 0, gap: 0, maxWidth: 520 }}
      >
        {currentSection.units.map(({ unit, globalIndex: unitIndex }, localIdx) => {
          const theme = getUnitTheme(unitIndex);
          const completedInUnit = unit.lessons.filter(
            (l) => progress.completedLessons[l.id]?.passed
          ).length;
          const isActive = unitIndex === activeUnitIndex;
          const isGuestLocked = isGuest && !isUnitUnlocked(LIMITS.free.unlockedUnits, unitIndex);
          const isProLocked = isFreeLocked(unitIndex);
          const isUnitLocked = isGuestLocked || isProLocked;
          const isAllGolden = completedInUnit === unit.lessons.length &&
            unit.lessons.every((l) => progress.completedLessons[l.id]?.golden);

          return (
            <div
              key={unit.id}
              ref={(el) => {
                unitElsRef.current[unitIndex] = el;
                if (isActive && currentUnitRef) currentUnitRef.current = el;
              }}
              data-unit-index={unitIndex}
              style={{
                animation: 'unitSlideUp 0.5s ease backwards',
                animationDelay: `${Math.min(localIdx * 0.1, 0.5)}s`,
              }}
            >
              {/* Inline unit hero banner — scroll buffer for floating header re-expansion */}
              {localIdx > 0 && (() => {
                const bg = getUnitBackground(unitIndex);
                const bannerBg = isAllGolden ? '#FFB800' : theme.color;
                const pct = unit.lessons.length > 0 ? (completedInUnit / unit.lessons.length) * 100 : 0;
                return (
                  <div
                    style={{
                      borderRadius: 20,
                      backgroundColor: bannerBg,
                      padding: '18px 20px 16px',
                      marginTop: 24,
                      marginBottom: 8,
                      minHeight: HERO_EXPANDED_HEIGHT,
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: bg.css, backgroundSize: bg.size ?? 'auto', pointerEvents: 'none' }} />
                    <div aria-hidden style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '50%', background: 'linear-gradient(to top, rgba(0,0,0,0.1) 0%, transparent 100%)', pointerEvents: 'none' }} />
                    <div style={{ position: 'relative' }}>
                      <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.2, color: 'rgba(255,255,255,0.6)' }}>
                        {hasSections ? `Section ${currentSection.sectionIndex}, Unit ${unitIndex + 1}` : `Unit ${unitIndex + 1}`}
                      </div>
                      <div style={{ fontSize: 20, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.25 }}>
                        {unit.title}
                      </div>
                      <div className="line-clamp-2" style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginTop: 4, lineHeight: 1.35 }}>
                        {unit.description}
                      </div>
                      <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ flex: 1, height: 8, borderRadius: 4, background: 'rgba(0,0,0,0.15)', overflow: 'hidden' }}>
                          <div style={{ width: `${pct}%`, height: '100%', borderRadius: 4, backgroundColor: '#FFFFFF', transition: 'width 0.4s ease' }} />
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 800, color: 'rgba(255,255,255,0.75)', whiteSpace: 'nowrap' }}>
                          {isAllGolden ? '\u2728 Mastered!' : `${completedInUnit}/${unit.lessons.length}`}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* "Jump here" button for placement-test-eligible locked units */}
              {isUnitJumpable(unitIndex) && (
                <JumpHereButton
                  theme={theme}
                  onClick={() => {
                    setJumpModal({ kind: 'placement-test', unitIndex });
                  }}
                />
              )}

              {/* Lesson list */}
              <div
                className="flex flex-col"
                style={{ paddingTop: 4, gap: 6 }}
              >
                {unit.lessons.map((lesson, lessonIndex) => {
                  const state = getLessonState(unitIndex, lessonIndex);
                  const lessonProgress =
                    progress.completedLessons[lesson.id];

                  return (
                    <div
                      key={lesson.id}
                      ref={lesson.id === currentLessonId ? currentLessonRef : undefined}
                      {...(lesson.id === currentLessonId ? { 'data-current-lesson': '' } : {})}
                    >
                      <LessonNode
                        lesson={lesson}
                        unitColor={theme.color}
                        state={state}
                        stars={lessonProgress?.stars}
                        golden={lessonProgress?.golden}
                        index={lessonIndex}
                        onClick={() => handleLessonClick(unitIndex, lessonIndex, state, lessonProgress)}
                        theme={theme}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* "Up Next" section card or Course completion marker */}
        {nextSection ? (() => {
          const nextTheme = getUnitTheme(nextSection.units[0]?.globalIndex ?? 0);
          const nextFirstUnit = nextSection.units[0]?.globalIndex ?? 0;
          const nextIsLocked = !isGuest && !isProUser && !isUnitUnlocked(LIMITS.free.unlockedUnits, nextFirstUnit);
          const nextIsGuestLocked = isGuest && !isUnitUnlocked(LIMITS.free.unlockedUnits, nextFirstUnit);

          return (
            <div
              style={{
                marginTop: 32,
                border: isDark ? '2px solid rgba(255,255,255,0.1)' : '2px solid rgba(0,0,0,0.08)',
                borderRadius: 20,
                padding: '28px 20px 24px',
                textAlign: 'center',
              }}
            >
              <div style={{
                display: 'inline-block',
                fontSize: 11,
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: 1.5,
                color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.35)',
                border: isDark ? '1.5px solid rgba(255,255,255,0.15)' : '1.5px solid rgba(0,0,0,0.1)',
                borderRadius: 8,
                padding: '4px 12px',
                marginBottom: 16,
              }}>
                Up Next
              </div>
              <div className="flex items-center justify-center" style={{ gap: 8, marginBottom: 6 }}>
                {(nextIsLocked || nextIsGuestLocked) && (
                  <Lock style={{ width: 18, height: 18, color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)' }} />
                )}
                <span style={{ fontSize: 20, fontWeight: 800, color: isDark ? '#E0E0E0' : '#1A1A1A' }}>
                  Section {nextSection.sectionIndex}
                </span>
              </div>
              <p style={{ fontSize: 14, fontWeight: 600, color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)', marginBottom: 20 }}>
                {nextSection.sectionTitle}
              </p>
              <button
                className="active:scale-[0.98] transition-transform"
                style={{
                  width: '100%',
                  padding: '14px 0',
                  borderRadius: 14,
                  fontSize: 14,
                  fontWeight: 800,
                  color: nextTheme.color,
                  background: 'transparent',
                  border: `2px solid ${nextTheme.color}`,
                  cursor: 'pointer',
                  WebkitTapHighlightColor: 'transparent',
                }}
                onClick={() => {
                  if (nextIsGuestLocked) {
                    setJumpModal({ kind: 'guest-signup', unitIndex: nextFirstUnit });
                  } else if (nextIsLocked) {
                    setJumpModal({ kind: 'free-upgrade', unitIndex: nextFirstUnit });
                  } else {
                    setViewingSectionPos(viewingSectionPos + 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
              >
                {nextIsGuestLocked ? 'Sign up to continue' : nextIsLocked ? 'Upgrade to unlock' : 'Jump here?'}
              </button>
            </div>
          );
        })() : (
          <div
            className="flex flex-col items-center"
            style={{ padding: '32px 16px' }}
          >
            <div
              className="flex items-center justify-center"
              style={{
                width: 48,
                height: 48,
                borderRadius: 16,
                background: isDark ? '#3D3200' : '#FFF5D4',
                fontSize: 24,
                marginBottom: 12,
              }}
            >
              🏆
            </div>
            <p style={{ fontSize: 15, fontWeight: 800, color: isDark ? '#E0E0E0' : '#3C3C3C' }}>
              Course Complete!
            </p>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#AFAFAF', marginTop: 2 }}>
              You&apos;re ready for your interview
            </p>
          </div>
        )}
      </div>

      {/* Jump / placement-test / sign-up modal */}
      <AnimatePresence>
        {jumpModal &&
          (() => {
            const unit = courseData[jumpModal.unitIndex];
            const theme = getUnitTheme(jumpModal.unitIndex);
            return (
              <motion.div
                key="jump-overlay"
                className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setJumpModal(null)}
              >
                <div className="absolute inset-0 bg-black/40" />
                <motion.div
                  className="relative w-full sm:w-auto bg-white sm:mx-4 overflow-y-auto"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Unit action"
                  style={{
                    maxWidth: 480,
                    maxHeight: 'calc(100vh - 48px)',
                    borderRadius: 24,
                    padding: '20px 20px 32px',
                  }}
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring' as const, damping: 25, stiffness: 300 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Unit badge */}
                  <div className="flex items-center" style={{ gap: 12, marginBottom: 12 }}>
                    <div
                      className="flex items-center justify-center"
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 16,
                        backgroundColor: theme.bg,
                        color: theme.dark,
                        fontSize: 20,
                      }}
                    >
                      {unit.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate" style={{ fontSize: 12, fontWeight: 700, color: '#AFAFAF' }}>
                        Unit {jumpModal.unitIndex + 1}
                      </p>
                      <p className="truncate" style={{ fontSize: 16, fontWeight: 800, color: '#3C3C3C' }}>
                        {unit.title}
                      </p>
                    </div>
                  </div>

                  {/* ─── Within-unit lock ─── */}
                  {jumpModal.kind === 'within-unit' && (
                    <>
                      <p style={{ fontSize: 14, color: '#AFAFAF', fontWeight: 600, marginBottom: 20 }}>
                        Complete the previous lessons in this unit to unlock the next one.
                      </p>
                      <button
                        className="w-full active:scale-[0.98] transition-transform"
                        style={{
                          padding: '16px 0',
                          borderRadius: 16,
                          fontSize: 14,
                          fontWeight: 800,
                          color: '#FFFFFF',
                          background: theme.color,
                          boxShadow: `0 4px 0 ${theme.dark}`,
                          border: 'none',
                          cursor: 'pointer',
                        }}
                        onClick={() => setJumpModal(null)}
                      >
                        Got it
                      </button>
                      {process.env.NODE_ENV === 'development' && (
                        <button
                          className="w-full active:scale-[0.98] transition-transform"
                          style={{
                            marginTop: 8,
                            padding: '12px 0',
                            borderRadius: 16,
                            fontSize: 12,
                            fontWeight: 800,
                            color: '#FFFFFF',
                            background: '#EF4444',
                            border: '2px dashed #B91C1C',
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            debugSkipToLesson(jumpModal.unitIndex, jumpModal.lessonIndex);
                            setJumpModal(null);
                          }}
                        >
                          DEBUG: Skip to Lesson
                        </button>
                      )}
                    </>
                  )}

                  {/* ─── Placement test offer ─── */}
                  {jumpModal.kind === 'placement-test' && (
                    <>
                      <p style={{ fontSize: 14, color: '#AFAFAF', fontWeight: 600, marginBottom: 6 }}>
                        Take a placement test to jump to this unit. You&apos;ll answer questions from the units in between.
                      </p>
                      <p style={{ fontSize: 13, color: '#CFCFCF', fontWeight: 600, marginBottom: 20 }}>
                        You need ~75% accuracy to pass.
                      </p>
                      <div className="flex" style={{ gap: 12 }}>
                        <button
                          className="flex-1 active:scale-[0.98] transition-transform"
                          style={{
                            padding: '16px 0',
                            borderRadius: 16,
                            fontSize: 14,
                            fontWeight: 800,
                            color: '#AFAFAF',
                            background: '#F5F5F5',
                            border: 'none',
                            cursor: 'pointer',
                          }}
                          onClick={() => setJumpModal(null)}
                        >
                          Cancel
                        </button>
                        <button
                          className="flex-1 active:scale-[0.98] transition-transform"
                          style={{
                            padding: '16px 0',
                            borderRadius: 16,
                            fontSize: 14,
                            fontWeight: 800,
                            color: '#FFFFFF',
                            background: theme.color,
                            boxShadow: `0 4px 0 ${theme.dark}`,
                            border: 'none',
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            startPlacementTest(jumpModal.unitIndex);
                            setJumpModal(null);
                          }}
                        >
                          Start Test
                        </button>
                      </div>
                      {process.env.NODE_ENV === 'development' && (
                        <button
                          className="w-full active:scale-[0.98] transition-transform"
                          style={{
                            marginTop: 8,
                            padding: '12px 0',
                            borderRadius: 16,
                            fontSize: 12,
                            fontWeight: 800,
                            color: '#FFFFFF',
                            background: '#EF4444',
                            border: '2px dashed #B91C1C',
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            debugSkipToUnit(jumpModal.unitIndex);
                            setJumpModal(null);
                          }}
                        >
                          DEBUG: Skip to Unit
                        </button>
                      )}
                    </>
                  )}

                  {/* ─── Guest sign-up ─── */}
                  {jumpModal.kind === 'guest-signup' && (
                    <>
                      <p style={{ fontSize: 14, color: '#AFAFAF', fontWeight: 600, marginBottom: 20 }}>
                        Create a free account to unlock all units and save your progress across devices!
                      </p>
                      <div className="flex" style={{ gap: 12 }}>
                        <button
                          className="flex-1 active:scale-[0.98] transition-transform"
                          style={{
                            padding: '16px 0',
                            borderRadius: 16,
                            fontSize: 14,
                            fontWeight: 800,
                            color: '#AFAFAF',
                            background: '#F5F5F5',
                            border: 'none',
                            cursor: 'pointer',
                          }}
                          onClick={() => setJumpModal(null)}
                        >
                          Maybe later
                        </button>
                        <button
                          className="flex-1 active:scale-[0.98] transition-transform"
                          style={{
                            padding: '16px 0',
                            borderRadius: 16,
                            fontSize: 14,
                            fontWeight: 800,
                            color: '#FFFFFF',
                            background: '#0D9488',
                            boxShadow: '0 4px 0 #0F766E',
                            border: 'none',
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            setJumpModal(null);
                            router.push('/register');
                          }}
                        >
                          Sign Up Free
                        </button>
                      </div>
                    </>
                  )}

                  {/* ─── Free-tier upgrade ─── */}
                  {jumpModal.kind === 'free-upgrade' && (
                    <>
                      <p style={{ fontSize: 14, color: '#AFAFAF', fontWeight: 600, marginBottom: 20 }}>
                        This unit requires a Pro subscription. Upgrade to unlock all 10 units and unlimited practice.
                      </p>
                      <div className="flex" style={{ gap: 12 }}>
                        <button
                          className="flex-1 active:scale-[0.98] transition-transform"
                          style={{
                            padding: '16px 0',
                            borderRadius: 16,
                            fontSize: 14,
                            fontWeight: 800,
                            color: '#AFAFAF',
                            background: '#F5F5F5',
                            border: 'none',
                            cursor: 'pointer',
                          }}
                          onClick={() => setJumpModal(null)}
                        >
                          Maybe later
                        </button>
                        <button
                          className="flex-1 flex items-center justify-center active:scale-[0.98] transition-transform"
                          style={{
                            gap: 6,
                            padding: '16px 0',
                            borderRadius: 16,
                            fontSize: 14,
                            fontWeight: 800,
                            color: '#FFFFFF',
                            background: theme.color,
                            boxShadow: `0 4px 0 ${theme.dark}`,
                            border: 'none',
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            setJumpModal(null);
                            setShowUpgradeModal(true);
                          }}
                        >
                          <Sparkles style={{ width: 16, height: 16 }} />
                          Upgrade to Pro
                        </button>
                      </div>
                    </>
                  )}
                </motion.div>
              </motion.div>
            );
          })()}
      </AnimatePresence>

      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        reason="Unlock all 10 course units"
      />

      <OutOfHeartsModal
        isOpen={showOutOfHearts}
        onClose={() => setShowOutOfHearts(false)}
      />

      {/* Fixed scroll-to-current button — bottom-right, above mobile nav */}
      <AnimatePresence>
        {scrollDirection && (
          <ScrollToCurrentButton direction={scrollDirection} targetRef={currentLessonRef} />
        )}
      </AnimatePresence>
    </div>
  );
}
