'use client';

import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCourseStore } from '@/store/useCourseStore';
import { useLessonColors, LESSON_ACCENT } from '@/lib/lessonColors';
import { useBackHandler } from '@/hooks/useBackHandler';
import { useScrollLock } from '@/hooks/useScrollLock';
import LessonProgressBar from './LessonProgressBar';
import QuestionCard from './QuestionCard';
import type { QuestionCardHandle } from './QuestionCard';
import TeachingCard from './TeachingCard';
import SortBucketsCard from './SortBucketsCard';
import MatchPairsCard from './MatchPairsCard';
import OrderStepsCard from './OrderStepsCard';
import MultiSelectCard from './MultiSelectCard';
import SliderEstimateCard from './SliderEstimateCard';
import ScenarioCard from './ScenarioCard';
import CategorySwipeCard from './CategorySwipeCard';
import RankOrderCard from './RankOrderCard';
import PickTheBestCard from './PickTheBestCard';
import ImageTapCard from './ImageTapCard';
import ConversationView from './types/ConversationView';
import SpeedRoundView from './types/SpeedRoundView';
import TimelineView from './types/TimelineView';
import CaseStudyView from './types/CaseStudyView';
import FlagButton from '@/components/feedback/FlagButton';
import { useMasteryStore } from '@/store/useMasteryStore';
import { useDoubleXpActive } from '@/store/useEngagementStore';
import { useHeartsStore } from '@/store/useHeartsStore';
import { playSound } from '@/lib/sounds';
import { STORAGE_KEYS } from '@/lib/storage-keys';
import { PROFESSION_ID } from '@/data/professions';
import { HeartDisplay } from '@/components/ui/HeartDisplay';
import { OutOfHeartsModal } from '@/components/ui/OutOfHeartsModal';
import EngineeringCalculator from '@/components/calculator/EngineeringCalculator';
import FinanceCalculators from '@/components/calculator/FinanceCalculators';
import { GameButton } from '@/components/ui/GameButton';
import type { CourseQuestion } from '@/data/course/types';
import type { ContentFeedbackType } from '@/data/types';
import { GlossaryText } from '@/components/ui/GlossaryText';
import { GlossaryProvider } from '@/components/lesson/GlossaryContext';
import { useNarration } from '@/hooks/useNarration';
import { AudioButton } from '@/components/ui/AudioButton';
import { AdaptiveToast, type AdaptiveMode } from '@/components/lesson/AdaptiveToast';
import { MicroCelebration, type CelebrationType } from '@/components/lesson/MicroCelebration';
import {
  ADAPTIVE_ROLLING_WINDOW as ROLLING_WINDOW,
  ADAPTIVE_STRUGGLING_THRESHOLD as STRUGGLING_THRESHOLD,
  ADAPTIVE_CRUISING_THRESHOLD as CRUISING_THRESHOLD,
  ADAPTIVE_MIN_ANSWERS,
} from '@/lib/game-config';

function getAdaptiveMode(recentAnswers: boolean[]): AdaptiveMode {
  if (recentAnswers.length < ADAPTIVE_MIN_ANSWERS) return 'normal';
  const window = recentAnswers.slice(-ROLLING_WINDOW);
  const accuracy = window.filter(Boolean).length / window.length;
  if (accuracy <= STRUGGLING_THRESHOLD) return 'struggling';
  if (accuracy >= CRUISING_THRESHOLD && window.length >= ROLLING_WINDOW) return 'cruising';
  return 'normal';
}

/**
 * Adapter for driving LessonView from an external data source (e.g. practice sessions).
 * When provided, LessonView uses these values instead of its internal useCourseStore hooks.
 */
export interface SessionAdapter {
  currentQuestion: CourseQuestion;
  answeredCount: number;
  totalQuestions: number;
  isCurrentAnswered: boolean;
  isLastQuestion: boolean;
  unitColor: string;
  theme: { color: string; dark: string; bg: string };
  isGolden: boolean;
  /** Handle answer submission + mastery logging for this mode. */
  submitAnswer: (questionId: string, correct: boolean) => void;
  nextQuestion: () => void;
  complete: () => void;
  /** Direct exit (bypasses confirmation). */
  exit: () => void;
  /** Whether any answers exist — determines if exit confirmation shows. */
  hasAnswers: boolean;
  flagContentType: ContentFeedbackType;
  exitLabel: string;
  exitConfirmTitle: string;
  exitConfirmMessage: string;
  /** Skip heart deduction and out-of-hearts checks (e.g. placement tests). */
  noHearts?: boolean;
}

export { LessonView };
export default function LessonView({ adapter }: { adapter?: SessionAdapter } = {}) {
  // === LESSON-MODE HOOKS (always called — rules of hooks) ===
  const activeLesson = useCourseStore((s) => s.activeLesson);
  const lessonResult = useCourseStore((s) => s.lessonResult);
  const _submitAnswer = useCourseStore((s) => s.submitAnswer);
  const _nextQuestion = useCourseStore((s) => s.nextQuestion);
  const _completeLesson = useCourseStore((s) => s.completeLesson);
  const _exitLesson = useCourseStore((s) => s.exitLesson);
  const courseData = useCourseStore((s) => s.courseData);
  const activeProfession = useCourseStore((s) => s.activeProfession);

  // Detect debug "all question types" lesson
  const isDebugLesson = !adapter && activeLesson && courseData[activeLesson.unitIndex]?.id === 'debug-all-types';

  // === SHARED LOCAL STATE ===
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showDebugMenu, setShowDebugMenu] = useState(false);
  const [hasSelection, setHasSelection] = useState(false);
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [lastSelectedIndex, setLastSelectedIndex] = useState<number | undefined>(undefined);
  const [showOutOfHearts, setShowOutOfHearts] = useState(false);
  const [recentAnswers, setRecentAnswers] = useState<boolean[]>([]);
  const adaptiveMode = useMemo(() => getAdaptiveMode(recentAnswers), [recentAnswers]);
  const adaptiveSeed = useRef(0);
  const prevAdaptiveMode = useRef<AdaptiveMode>('normal');

  // Micro-celebration state
  const [celebration, setCelebration] = useState<{
    type: CelebrationType;
    streakCount?: number;
    key: number;
  } | null>(null);
  const celebrationKeyRef = useRef(0);
  const [correctStreak, setCorrectStreak] = useState(0);
  const [milestoneGlow, setMilestoneGlow] = useState(false);

  // Character state for section-based character integration
  const [lessonCharacter, setLessonCharacter] = useState<{ id: string; name: string } | null>(null);
  const [charLines, setCharLines] = useState<import('@/data/course/character-lines').CharacterLines[] | null>(null);

  // Play a celebratory sound when entering cruising mode
  useEffect(() => {
    if (adaptiveMode === prevAdaptiveMode.current) return;
    prevAdaptiveMode.current = adaptiveMode;
    if (adaptiveMode === 'cruising') {
      playSound('streakMilestone');
    }
  }, [adaptiveMode]);

  const questionRef = useRef<QuestionCardHandle>(null);
  const continueBtnRef = useRef<HTMLButtonElement>(null);
  const questionAreaRef = useRef<HTMLDivElement>(null);
  const exitDialogRef = useRef<HTMLDivElement>(null);
  const isDoubleXp = useDoubleXpActive();
  const addMasteryEvent = useMasteryStore((s) => s.addEvent);
  useScrollLock(true);
  const c = useLessonColors();
  const syncMastery = useMasteryStore((s) => s.syncToServer);
  const loseHeart = useHeartsStore((s) => s.loseHeart);
  const hasHearts = useHeartsStore((s) => s.hasHearts);

  // Localized variant support
  const [userCountry, setUserCountry] = useState<string | null>(null);
  useEffect(() => {
    setUserCountry(localStorage.getItem(STORAGE_KEYS.COUNTRY));
  }, []);

  // Sync mastery when lesson completes (lesson mode only; practice handles its own)
  useEffect(() => {
    if (!adapter && lessonResult) syncMastery();
  }, [adapter, lessonResult, syncMastery]);

  // Focus the continue button when an answer is submitted
  useEffect(() => {
    if (lastAnswerCorrect !== null) {
      requestAnimationFrame(() => continueBtnRef.current?.focus());
    }
  }, [lastAnswerCorrect]);

  // Focus trap for exit confirm dialog
  useEffect(() => {
    if (!showExitConfirm || !exitDialogRef.current) return;
    const dialog = exitDialogRef.current;
    const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusableEls = dialog.querySelectorAll<HTMLElement>(focusableSelector);
    if (focusableEls.length === 0) return;
    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];
    firstEl.focus();
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };
    dialog.addEventListener('keydown', handleTab);
    return () => dialog.removeEventListener('keydown', handleTab);
  }, [showExitConfirm]);

  // Scroll lock handled by useScrollLock(true) above

  // === LESSON-MODE DERIVED DATA ===
  const lessonData = useMemo(() => {
    if (adapter || !activeLesson) return null;
    const unit = courseData[activeLesson.unitIndex];
    if (!unit) return null;
    const lesson = unit.lessons[activeLesson.lessonIndex];
    if (!lesson) return null;
    return { unit, lesson };
  }, [adapter, activeLesson, courseData]);

  const currentSectionIndex = lessonData?.unit?.sectionIndex;

  // === LESSON BACKGROUND ===
  const [backgroundHtml, setBackgroundHtml] = useState<string | null>(null);
  const [backgroundCss, setBackgroundCss] = useState<string | null>(null);
  const [bgTheme, setBgTheme] = useState<'dark' | 'light' | null>(null);

  useEffect(() => {
    const bgKey = lessonData?.lesson.background;
    if (!bgKey) {
      setBackgroundHtml(null);
      setBackgroundCss(null);
      setBgTheme(null);
      return;
    }
    const loaders: Record<string, () => Promise<{ background: { html: string; css?: string; theme?: 'dark' | 'light' } }>> = {
      'space-stars': () => import('@/data/course/backgrounds/space-stars'),
    };
    const loader = loaders[bgKey];
    if (!loader) {
      console.warn('[LessonView] Unknown background:', bgKey);
      setBackgroundHtml(null); setBackgroundCss(null); setBgTheme(null);
      return;
    }
    let cancelled = false;
    loader().then((mod) => {
      if (!cancelled) {
        setBackgroundHtml(mod.background.html);
        setBackgroundCss(mod.background.css ?? null);
        setBgTheme(mod.background.theme ?? 'dark');
      }
    }).catch((err) => {
      console.warn('[LessonView] Failed to load background:', bgKey, err);
      if (!cancelled) { setBackgroundHtml(null); setBackgroundCss(null); setBgTheme(null); }
    });
    return () => { cancelled = true; };
  }, [lessonData?.lesson.background]);

  // Inject background CSS into document.head (bypasses Tailwind purging)
  useEffect(() => {
    if (!backgroundCss) return;
    const style = document.createElement('style');
    style.setAttribute('data-lesson-bg', 'true');
    style.textContent = backgroundCss;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, [backgroundCss]);

  // Persist background animation timing across lesson transitions
  const bgRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const bgKey = lessonData?.lesson.background;
    if (!bgKey || !bgRef.current) return;
    const storageKey = `lb-bg-start-${bgKey}`;
    const now = performance.now();
    const stored = sessionStorage.getItem(storageKey);
    const startTime = stored ? parseFloat(stored) : now;
    if (!stored) sessionStorage.setItem(storageKey, String(now));
    const elapsed = now - startTime;
    // Advance all animations to the elapsed time so they continue seamlessly
    const el = bgRef.current;
    requestAnimationFrame(() => {
      el.getAnimations({ subtree: true }).forEach((a) => {
        if (a instanceof CSSAnimation) {
          a.currentTime = elapsed;
        }
      });
    });
  }, [lessonData?.lesson.background, backgroundHtml]);

  // Parallax: smoothly animate --bg-step on the container (stable across DOM recreation)
  const bgStepIndex = adapter ? (adapter.answeredCount ?? 0) : (activeLesson?.currentQuestionIndex ?? 0);
  const bgStepAnimRef = useRef<number>(0);
  const bgStepTargetRef = useRef(0);
  useEffect(() => {
    const container = bgRef.current;
    if (!container) return;
    // Snap to previous target (in case we were mid-animation), then animate to new target
    const from = bgStepTargetRef.current;
    const to = bgStepIndex;
    bgStepTargetRef.current = to;
    container.style.setProperty('--bg-step', String(from));
    if (from === to) return;
    if (bgStepAnimRef.current) cancelAnimationFrame(bgStepAnimRef.current);
    const duration = 2500;
    const start = performance.now();
    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      container!.style.setProperty('--bg-step', String(from + (to - from) * eased));
      if (t < 1) bgStepAnimRef.current = requestAnimationFrame(tick);
    }
    bgStepAnimRef.current = requestAnimationFrame(tick);
    return () => { if (bgStepAnimRef.current) cancelAnimationFrame(bgStepAnimRef.current); };
  }, [bgStepIndex]);

  // Load section character + character lines when lesson starts
  useEffect(() => {
    if (!activeLesson || adapter) return;
    const sectionIdx = lessonData?.unit?.sectionIndex;
    if (sectionIdx == null) return;
    let cancelled = false;
    (async () => {
      const { loadCharacters, loadSectionCharacterMap, loadCharacterLines, getCharacterForSection } = await import('@/lib/story-utils');
      const profId = activeProfession;
      const [characters, sectionMap, lines] = await Promise.all([
        loadCharacters(profId),
        loadSectionCharacterMap(profId),
        loadCharacterLines(profId),
      ]);
      if (cancelled) return;
      const char = getCharacterForSection(sectionIdx, sectionMap, characters);
      if (char) {
        setLessonCharacter({ id: char.id, name: char.name });
        setCharLines(lines);
      }
    })();
    return () => { cancelled = true; };
  }, [activeLesson?.unitIndex, adapter, activeProfession]); // eslint-disable-line react-hooks/exhaustive-deps

  const overlayActive = showExitConfirm || showOutOfHearts;

  const lessonSessionQuestions = useMemo(() => {
    if (adapter || !activeLesson || !lessonData) return [];
    // Build lookup from current lesson's questions
    const questionMap = new Map(lessonData.lesson.questions.map((q) => [q.id, q]));
    // Include review questions from other units in the lookup
    if (activeLesson.reviewQuestionIds?.length) {
      const reviewIds = new Set(activeLesson.reviewQuestionIds);
      for (const unit of courseData) {
        if (!unit?.lessons) continue;
        for (const lesson of unit.lessons) {
          if (!lesson?.questions) continue;
          for (const q of lesson.questions) {
            if (reviewIds.has(q.id) && !questionMap.has(q.id)) {
              questionMap.set(q.id, q);
            }
          }
        }
      }
    }
    return activeLesson.sessionQuestionIds
      .map((id) => questionMap.get(id))
      .filter(Boolean) as typeof lessonData.lesson.questions;
  }, [adapter, activeLesson, lessonData, courseData]);

  const lessonCurrentQuestion = useMemo(() => {
    if (adapter || !activeLesson) return null;
    return lessonSessionQuestions[activeLesson.currentQuestionIndex] ?? null;
  }, [adapter, activeLesson, lessonSessionQuestions]);

  const lessonIsCurrentAnswered = useMemo(() => {
    if (adapter || !activeLesson) return false;
    // Index-based: each position in the queue gets one answer sequentially
    return activeLesson.answers.length > activeLesson.currentQuestionIndex;
  }, [adapter, activeLesson]);

  const lessonIsLastQuestion = useMemo(() => {
    if (adapter || !activeLesson) return false;
    return activeLesson.currentQuestionIndex >= lessonSessionQuestions.length - 1;
  }, [adapter, activeLesson, lessonSessionQuestions]);

  // Progress bar: unique questions correctly answered / unique question count
  // This keeps a fixed number of segments and only advances on correct answers.
  const lessonUniqueCorrect = useMemo(() => {
    if (adapter || !activeLesson) return 0;
    const correctIds = new Set<string>();
    for (const a of activeLesson.answers) {
      if (a.correct) correctIds.add(a.questionId);
    }
    return correctIds.size;
  }, [adapter, activeLesson]);

  const lessonUniqueTotal = useMemo(() => {
    if (adapter || !activeLesson) return 0;
    return new Set(activeLesson.sessionQuestionIds).size;
  }, [adapter, activeLesson]);

  // === RESOLVED STATE — adapter wins, else lesson-mode ===
  const currentQuestion = adapter ? adapter.currentQuestion : lessonCurrentQuestion;
  const answeredCount = adapter ? adapter.answeredCount : lessonUniqueCorrect;
  const totalQuestions = adapter ? adapter.totalQuestions : lessonUniqueTotal;
  const isCurrentAnswered = adapter ? adapter.isCurrentAnswered : lessonIsCurrentAnswered;
  const isLastQuestion = adapter ? adapter.isLastQuestion : lessonIsLastQuestion;
  const unitColor = LESSON_ACCENT.color;
  const theme = LESSON_ACCENT;
  const isGolden = adapter ? adapter.isGolden : (activeLesson?.isGolden ?? false);
  const flagContentType = adapter ? adapter.flagContentType : 'lesson-question';
  const exitLabel = adapter ? adapter.exitLabel : 'Close lesson';
  const exitConfirmTitle = adapter ? adapter.exitConfirmTitle : 'Quit lesson?';
  const exitConfirmMessage = adapter ? adapter.exitConfirmMessage : 'Your progress on this lesson will be lost.';
  const isTeaching = currentQuestion?.type === 'teaching';
  const hasBackground = backgroundHtml !== null && isTeaching;

  // === LESSON TYPE ===
  const lessonType = useMemo(() => {
    if (adapter) return 'standard' as const;
    if (!lessonData) return 'standard' as const;
    return lessonData.lesson.type ?? ('standard' as const);
  }, [adapter, lessonData]);
  const isNonStandard = lessonType !== 'standard';

  // Progress state for non-standard types
  const [typeAnsweredCount, setTypeAnsweredCount] = useState(0);
  const [typeTotalCount, setTypeTotalCount] = useState(0);

  // Override progress for non-standard types
  if (isNonStandard) {
    // These will be set by the type component via handleTypeProgress
    // We reassign the resolved values below
  }
  const resolvedAnsweredCount = isNonStandard ? typeAnsweredCount : answeredCount;
  const resolvedTotalQuestions = isNonStandard ? typeTotalCount : totalQuestions;

  // Callbacks for non-standard lesson type components
  const handleTypeAnswer = useCallback(
    (questionId: string, correct: boolean) => {
      _submitAnswer(questionId, correct);
      const topicId = lessonData?.unit.topicId;
      if (topicId) {
        addMasteryEvent({
          questionId,
          topicId,
          difficulty: 'intermediate',
          correct,
          source: 'course',
        });
      }
      if (!correct) {
        playSound('heartLost');
        loseHeart();
      }

      // Streak tracking for non-standard lesson types
      const newStreak = correct ? correctStreak + 1 : 0;
      setCorrectStreak(newStreak);
      if (correct && newStreak >= 3 && adaptiveMode !== 'cruising') {
        celebrationKeyRef.current++;
        setCelebration({
          type: 'streak',
          streakCount: newStreak,
          key: celebrationKeyRef.current,
        });
      }
    },
    [_submitAnswer, lessonData, addMasteryEvent, loseHeart, correctStreak, adaptiveMode],
  );

  const handleTypeProgress = useCallback((current: number, total: number) => {
    setTypeAnsweredCount(current);
    setTypeTotalCount(total);
  }, []);

  const handleTypeComplete = useCallback(() => {
    _completeLesson();
  }, [_completeLesson]);

  const checkHeartsForType = useCallback((): boolean => {
    if (!hasHearts()) {
      setShowOutOfHearts(true);
      return false;
    }
    return true;
  }, [hasHearts]);

  // === CALLBACKS ===
  const getCorrectAnswerDisplay = useCallback((): string => {
    if (!currentQuestion) return '';
    switch (currentQuestion.type) {
      case 'multiple-choice':
        return currentQuestion.options?.[currentQuestion.correctIndex ?? 0] ?? '';
      case 'true-false':
        return currentQuestion.correctAnswer ? 'True' : 'False';
      case 'fill-blank':
        return currentQuestion.blanks?.join(', ') ?? currentQuestion.acceptedAnswers?.[0] ?? '';
      case 'teaching':
      case 'sort-buckets':
      case 'match-pairs':
      case 'order-steps':
      case 'category-swipe':
      case 'rank-order':
      case 'image-tap':
        return '';
      case 'multi-select':
        return (currentQuestion.correctIndices ?? []).map(i => currentQuestion.options?.[i]).filter(Boolean).join(', ');
      case 'slider-estimate':
        return `${currentQuestion.unit === '$' ? '$' : ''}${currentQuestion.correctValue?.toLocaleString() ?? ''}${currentQuestion.unit === '%' ? '%' : currentQuestion.unit && currentQuestion.unit !== '$' ? ` ${currentQuestion.unit}` : ''}`;
      case 'scenario':
      case 'pick-the-best':
        return currentQuestion.options?.[currentQuestion.correctIndex ?? 0] ?? '';
      default:
        return '';
    }
  }, [currentQuestion]);

  const handleAnswer = useCallback(
    (correct: boolean, selectedOriginalIndex?: number) => {
      if (!currentQuestion) return;
      if (adapter) {
        adapter.submitAnswer(currentQuestion.id, correct);
      } else {
        _submitAnswer(currentQuestion.id, correct, adaptiveMode === 'cruising' && correct);
        const topicId = lessonData?.unit.topicId;
        if (topicId) {
          addMasteryEvent({
            questionId: currentQuestion.id,
            topicId,
            difficulty: 'intermediate',
            correct,
            source: 'course',
            selectedIndex: selectedOriginalIndex,
          });
        }
      }
      setLastAnswerCorrect(correct);
      setLastSelectedIndex(selectedOriginalIndex);
      // Track rolling accuracy for adaptive difficulty
      setRecentAnswers((prev) => {
        const next = [...prev, correct];
        const mode = getAdaptiveMode(next);
        if (mode !== adaptiveMode) adaptiveSeed.current++;
        return next;
      });
      if (!correct && !adapter?.noHearts) {
        playSound('heartLost');
        loseHeart();
      }

      // Track correct streak (skip teaching cards — they use handleTeachingGotIt)
      if (!isTeaching) {
        const newStreak = correct ? correctStreak + 1 : 0;
        setCorrectStreak(newStreak);

        // Trigger streak celebration at 3+ in a row
        // Suppress when adaptive mode is cruising (they convey similar info)
        const currentAdaptiveMode = adapter ? 'normal' : adaptiveMode;
        if (correct && newStreak >= 3 && currentAdaptiveMode !== 'cruising') {
          celebrationKeyRef.current++;
          setCelebration({
            type: 'streak',
            streakCount: newStreak,
            key: celebrationKeyRef.current,
          });
        }
      }
    },
    [adapter, currentQuestion, _submitAnswer, lessonData, addMasteryEvent, loseHeart, adaptiveMode, isTeaching, correctStreak]
  );

  const handleSelectionChange = useCallback((value: boolean) => {
    setHasSelection(value);
  }, []);

  const handleCheck = useCallback(() => {
    questionRef.current?.check();
  }, []);

  const handleContinue = useCallback(() => {
    setLastAnswerCorrect(null);
    setLastSelectedIndex(undefined);
    setHasSelection(false);

    // Milestone detection — fires BEFORE advancing to the next question
    const nextIndex = adapter
      ? adapter.answeredCount
      : (activeLesson?.currentQuestionIndex ?? 0) + 1;
    const total = resolvedTotalQuestions;

    // Halfway check: fire once when crossing the midpoint (4+ questions only)
    if (total >= 4 && nextIndex === Math.floor(total / 2)) {
      celebrationKeyRef.current++;
      setCelebration({ type: 'halfway', key: celebrationKeyRef.current });
      // Trigger milestone glow on progress bar
      setMilestoneGlow(true);
      setTimeout(() => setMilestoneGlow(false), 1200);
    }

    // Last question check: fire when advancing to the final question (3+ questions)
    if (total >= 3 && nextIndex === total - 1 && !isLastQuestion) {
      // Only trigger if we don't already have a streak celebration showing
      if (!celebration || celebration.type !== 'streak') {
        celebrationKeyRef.current++;
        setCelebration({ type: 'last-question', key: celebrationKeyRef.current });
      }
    }

    if (isLastQuestion) {
      adapter ? adapter.complete() : _completeLesson();
    } else {
      // Check if user has hearts before showing next question
      if (!adapter?.noHearts && !hasHearts()) {
        setShowOutOfHearts(true);
        return;
      }
      adapter ? adapter.nextQuestion() : _nextQuestion();
      requestAnimationFrame(() => questionAreaRef.current?.focus());
    }
  }, [adapter, activeLesson, isLastQuestion, _completeLesson, _nextQuestion, hasHearts, resolvedTotalQuestions, celebration]);

  const handleExitClick = useCallback(() => {
    if (adapter) {
      if (!adapter.hasAnswers) { adapter.exit(); return; }
    } else {
      if (!activeLesson) return;
      if (activeLesson.answers.length === 0) { _exitLesson(); return; }
    }
    setShowExitConfirm(true);
  }, [adapter, activeLesson, _exitLesson]);

  const handleConfirmExit = useCallback(() => {
    setShowExitConfirm(false);
    adapter ? adapter.exit() : _exitLesson();
  }, [adapter, _exitLesson]);

  const handleCancelExit = useCallback(() => {
    setShowExitConfirm(false);
  }, []);

  // Mobile back button
  const isActive = adapter ? !!currentQuestion : (!!activeLesson && !lessonResult);
  useBackHandler(isActive, handleExitClick);

  // Hotkey hint — only on devices with a physical keyboard
  const [showHotkeyHint, setShowHotkeyHint] = useState(false);
  useEffect(() => {
    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    if (hasPointer) setShowHotkeyHint(true);
  }, []);
  useEffect(() => {
    if (showHotkeyHint) {
      const timer = setTimeout(() => setShowHotkeyHint(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showHotkeyHint]);

  // Teaching cards auto-submit as correct but must NOT affect adaptive
  // difficulty tracking (recentAnswers). This callback deliberately
  // bypasses handleAnswer to avoid inflating the rolling accuracy window.
  const handleTeachingGotIt = useCallback(() => {
    if (!currentQuestion) return;
    // Auto-submit teaching card as correct (won't count toward accuracy)
    if (adapter) {
      adapter.submitAnswer(currentQuestion.id, true);
    } else {
      _submitAnswer(currentQuestion.id, true);
    }
    // Immediately advance
    if (isLastQuestion) {
      adapter ? adapter.complete() : _completeLesson();
    } else {
      adapter ? adapter.nextQuestion() : _nextQuestion();
    }
  }, [adapter, currentQuestion, isLastQuestion, _submitAnswer, _completeLesson, _nextQuestion]);

  // Global keyboard handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If calculator has focus, let it handle its own keys
      const activeEl = document.activeElement;
      if (activeEl && activeEl.closest('[aria-label="Engineering calculator"]')) {
        return;
      }

      const target = e.target as HTMLElement;
      const isInInput =
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') &&
        !(target as HTMLInputElement).disabled;

      if (showExitConfirm) {
        if (e.key === 'Escape') {
          e.preventDefault();
          handleCancelExit();
        }
        return;
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        handleExitClick();
        return;
      }

      // Backtick toggles calculator
      if (e.key === '`') {
        e.preventDefault();
        setIsCalcOpen(c => !c);
        return;
      }

      if (isInInput) return;

      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (isTeaching) {
          handleTeachingGotIt();
        } else if (isCurrentAnswered) {
          handleContinue();
        } else if (hasSelection) {
          handleCheck();
        }
        return;
      }

      if (!isCurrentAnswered) {
        const key = e.key.toLowerCase();
        const qType = questionRef.current?.questionType;

        if (/^[1-9]$/.test(key)) {
          const idx = parseInt(key) - 1;
          if (qType === 'fill-blank') {
            questionRef.current?.selectWord(idx);
          } else if (qType === 'true-false') {
            if (idx === 0) questionRef.current?.selectBool(true);
            else if (idx === 1) questionRef.current?.selectBool(false);
          } else {
            questionRef.current?.selectOption(idx);
          }
        } else if (['a', 'b', 'c', 'd', 'e'].includes(key)) {
          questionRef.current?.selectOption(key.charCodeAt(0) - 97);
        } else if (key === 't') {
          questionRef.current?.selectBool(true);
        } else if (key === 'f') {
          questionRef.current?.selectBool(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    showExitConfirm,
    isCurrentAnswered,
    isTeaching,
    hasSelection,
    handleCheck,
    handleContinue,
    handleTeachingGotIt,
    handleExitClick,
    handleCancelExit,
    isCalcOpen,
  ]);

  const displayQuestion = currentQuestion;

  // Compute character teaching line for the current teaching card
  const teachingLine = useMemo(() => {
    if (!lessonCharacter || !charLines || displayQuestion?.type !== 'teaching') return null;
    // Use dynamic import result cached in charLines; getTeachingLine is a sync pure function
    const { getTeachingLine } = require('@/lib/story-utils') as typeof import('@/lib/story-utils');
    return getTeachingLine(displayQuestion.question, lessonCharacter.id, charLines);
  }, [lessonCharacter, charLines, displayQuestion]);

  // Compute character celebration line
  const celebrationCharLine = useMemo(() => {
    if (!lessonCharacter || !charLines || !celebration) return null;
    const { getCelebrationLine } = require('@/lib/story-utils') as typeof import('@/lib/story-utils');
    return getCelebrationLine(celebration.type, lessonCharacter.id, charLines);
  }, [lessonCharacter, charLines, celebration]);

  // === NARRATION (client-side Kokoro TTS) ===
  const { speakWithCharacter, prefetch: prefetchAudio, stop: stopNarration, modelReady } = useNarration();
  const currentCharacterId = lessonCharacter?.id ?? null;

  // Narrate the current card when it changes (or when model finishes loading)
  useEffect(() => {
    if (!displayQuestion || !modelReady) return;

    if (displayQuestion.type === 'teaching') {
      if (displayQuestion.explanation) {
        speakWithCharacter(displayQuestion.explanation, currentCharacterId);
      }
    } else {
      if (displayQuestion.question) {
        speakWithCharacter(displayQuestion.question, currentCharacterId);
      }
    }

    // Look-ahead: pre-generate audio for next 3 cards while user reads this one
    const idx = activeLesson?.currentQuestionIndex ?? 0;
    const upcoming: { text: string; characterId?: string | null }[] = [];
    for (let i = idx + 1; i <= idx + 3 && i < lessonSessionQuestions.length; i++) {
      const q = lessonSessionQuestions[i];
      if (!q) continue;
      if (q.type === 'teaching' && q.explanation) {
        upcoming.push({ text: q.explanation, characterId: currentCharacterId });
      } else if (q.question) {
        upcoming.push({ text: q.question, characterId: currentCharacterId });
      }
      if (q.explanation) {
        upcoming.push({ text: q.explanation, characterId: currentCharacterId });
      }
    }
    if (upcoming.length) prefetchAudio(upcoming);

    return () => stopNarration();
  }, [displayQuestion?.id, modelReady]); // eslint-disable-line react-hooks/exhaustive-deps

  // Narrate the explanation when an answer is revealed
  useEffect(() => {
    if (lastAnswerCorrect === null || !displayQuestion || displayQuestion.type === 'teaching') return;
    if (!displayQuestion.explanation) return;

    speakWithCharacter(displayQuestion.explanation, currentCharacterId);
  }, [lastAnswerCorrect, displayQuestion?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!displayQuestion && !isNonStandard) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="lesson-view"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed inset-0 z-[60] flex items-center justify-center"
        role="main"
        aria-label={adapter ? 'Practice view' : 'Lesson view'}
        style={{
          backgroundColor: hasBackground ? '#05080F' : c.bg,
          paddingTop: 'env(safe-area-inset-top, 0px)',
        }}
      >
        {/* Background layer — placed on outer div so gradient fills entire viewport */}
        {hasBackground && (
          <div
            ref={bgRef}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 0,
              overflow: 'hidden',
              animationPlayState: overlayActive ? 'paused' : 'running',
            }}
            dangerouslySetInnerHTML={{ __html: backgroundHtml! }}
          />
        )}
        <GlossaryProvider sectionIndex={currentSectionIndex} accentColor={unitColor}>
        <div
          className={`w-full h-full max-w-3xl flex flex-col lg:shadow-lg lg:border-x ${hasBackground ? 'lg:border-transparent' : 'lg:border-gray-200'}`}
          style={{ position: 'relative', background: hasBackground ? 'transparent' : undefined }}
        >
        {/* Top bar */}
        <div
          className="flex items-center flex-shrink-0 z-20"
          style={{
            padding: '10px 16px',
            gap: 12,
            borderBottom: `2px solid ${c.headerBorder}`,
            background: c.cardBg,
            position: 'relative',
            zIndex: 20,
          }}
        >
          <button
            onClick={handleExitClick}
            className="flex-shrink-0 flex items-center justify-center transition-transform active:scale-90"
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: c.closeBtnBg,
              border: 'none',
              cursor: 'pointer',
            }}
            aria-label={exitLabel}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 4l8 8M12 4l-8 8" stroke={c.closeBtnStroke} strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </button>

          {isGolden && (
            <div
              className="flex-shrink-0 flex items-center golden-badge-shimmer"
              style={{
                gap: 4,
                padding: '4px 10px',
                borderRadius: 10,
                color: '#8B6914',
                fontWeight: 800,
                fontSize: 11,
                letterSpacing: 0.3,
                textTransform: 'uppercase',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="badgeCrownGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFD54F" />
                    <stop offset="50%" stopColor="#FFA000" />
                    <stop offset="100%" stopColor="#FF8F00" />
                  </linearGradient>
                </defs>
                <path d="M5 16h14l-2-8-3.5 4L12 6l-1.5 6L7 8l-2 8z" fill="url(#badgeCrownGrad)" />
                <path d="M5 16h14v2a1 1 0 01-1 1H6a1 1 0 01-1-1v-2z" fill="url(#badgeCrownGrad)" />
              </svg>
              Golden
            </div>
          )}

          <LessonProgressBar
            current={resolvedAnsweredCount}
            total={resolvedTotalQuestions}
            color={isGolden ? '#FFB800' : unitColor}
            glowing={adaptiveMode === 'cruising'}
            milestoneGlow={milestoneGlow}
          />

          {/* Debug: prev/next for dev mode */}
          {process.env.NODE_ENV === 'development' && activeLesson && (
            <div style={{ display: 'flex', gap: 4 }}>
              <button
                onClick={() => {
                  if (!activeLesson || activeLesson.currentQuestionIndex <= 0) return;
                  useCourseStore.setState({
                    activeLesson: { ...activeLesson, currentQuestionIndex: activeLesson.currentQuestionIndex - 1 },
                  });
                }}
                disabled={activeLesson.currentQuestionIndex <= 0}
                title="Previous question"
                className="flex-shrink-0 transition-transform active:scale-90 disabled:opacity-30"
                style={{
                  width: 28, height: 28, borderRadius: 8,
                  background: '#EDE9FE', border: '1px solid #C4B5FD',
                  cursor: activeLesson.currentQuestionIndex > 0 ? 'pointer' : 'default',
                  fontSize: 12, lineHeight: 1,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                ◀
              </button>
              <button
                onClick={() => {
                  if (!activeLesson) return;
                  const maxIdx = activeLesson.sessionQuestionIds.length - 1;
                  if (activeLesson.currentQuestionIndex >= maxIdx) {
                    adapter ? adapter.complete() : _completeLesson();
                    return;
                  }
                  useCourseStore.setState({
                    activeLesson: { ...activeLesson, currentQuestionIndex: activeLesson.currentQuestionIndex + 1 },
                  });
                }}
                title={activeLesson.currentQuestionIndex >= activeLesson.sessionQuestionIds.length - 1 ? "Finish lesson" : "Next question"}
                className="flex-shrink-0 transition-transform active:scale-90"
                style={{
                  width: 28, height: 28, borderRadius: 8,
                  background: activeLesson.currentQuestionIndex >= activeLesson.sessionQuestionIds.length - 1 ? '#D1FAE5' : '#EDE9FE',
                  border: `1px solid ${activeLesson.currentQuestionIndex >= activeLesson.sessionQuestionIds.length - 1 ? '#6EE7B7' : '#C4B5FD'}`,
                  cursor: 'pointer',
                  fontSize: 12, lineHeight: 1,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                {activeLesson.currentQuestionIndex >= activeLesson.sessionQuestionIds.length - 1 ? '✓' : '▶'}
              </button>
            </div>
          )}

          {/* Debug: skip to end */}
          {process.env.NODE_ENV === 'development' && (
            adapter ? (
              <button
                onClick={adapter.complete}
                title="Debug: skip session"
                className="flex-shrink-0 transition-transform active:scale-90"
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: c.dangerBg,
                  border: '1px solid #FECACA',
                  cursor: 'pointer',
                  fontSize: 12,
                  lineHeight: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ⏭
              </button>
            ) : (
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setShowDebugMenu((v) => !v)}
                  title="Debug: skip lesson"
                  className="flex-shrink-0 transition-transform active:scale-90"
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: c.dangerBg,
                    border: '1px solid #FECACA',
                    cursor: 'pointer',
                    fontSize: 12,
                    lineHeight: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  ⏭
                </button>
                {showDebugMenu && activeLesson && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 34,
                      right: 0,
                      background: c.disclaimerBg,
                      borderRadius: 12,
                      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                      border: `1px solid ${c.disclaimerBorder}`,
                      padding: 4,
                      zIndex: 100,
                      minWidth: 150,
                    }}
                  >
                    {[
                      { label: '✅ Pass (90%)', correct: 9 },
                      { label: '⚠️ Pass (70%)', correct: 7 },
                      { label: '❌ Fail (40%)', correct: 4 },
                      { label: '💎 Flawless', correct: 10 },
                    ].map(({ label, correct }) => (
                      <button
                        key={label}
                        onClick={() => {
                          const ids = activeLesson.sessionQuestionIds;
                          const total = ids.length;
                          const correctCount = Math.min(correct, total);
                          const alreadyAnswered = activeLesson.answers.length;
                          for (let i = alreadyAnswered; i < total; i++) {
                            _submitAnswer(ids[i], i < correctCount);
                          }
                          setShowDebugMenu(false);
                          setTimeout(_completeLesson, 10);
                        }}
                        style={{
                          display: 'block',
                          width: '100%',
                          padding: '8px 12px',
                          fontSize: 13,
                          fontWeight: 600,
                          textAlign: 'left',
                          background: 'transparent',
                          border: 'none',
                          borderRadius: 8,
                          cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = '#F3F4F6')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          )}

          <div className="flex-shrink-0 flex items-center gap-2">
            {!adapter?.noHearts && <HeartDisplay />}
            {isDoubleXp && (
              <div
                className="flex items-center"
                style={{
                  padding: '3px 7px',
                  borderRadius: 8,
                  background: 'linear-gradient(135deg, #F59E0B, #EF4444)',
                  color: '#FFFFFF',
                  fontWeight: 900,
                  fontSize: 11,
                  letterSpacing: 0.3,
                  lineHeight: 1,
                  boxShadow: '0 1px 4px rgba(245,158,11,0.4)',
                }}
              >
                2X
              </div>
            )}
          </div>

        </div>

        {/* Content area — type component or standard question flow */}
        {isNonStandard && lessonData ? (
          (() => {
            const typeProps = {
              lesson: lessonData.lesson,
              unitColor,
              theme,
              isGolden,
              isDoubleXp,
              onAnswer: handleTypeAnswer,
              onProgress: handleTypeProgress,
              onComplete: handleTypeComplete,
              checkHearts: checkHeartsForType,
            };
            switch (lessonType) {
              case 'conversation':
                return <ConversationView {...typeProps} />;
              case 'speed-round':
                return <SpeedRoundView {...typeProps} />;
              case 'timeline':
                return <TimelineView {...typeProps} />;
              case 'case-study':
                return <CaseStudyView {...typeProps} />;
              default:
                return null;
            }
          })()
        ) : displayQuestion ? (
        <>
        <div
          ref={questionAreaRef}
          tabIndex={-1}
          className={`flex-1 overflow-y-auto overflow-x-hidden${hasBackground ? ' lesson-has-background' : ''}`}
          style={{
            padding: '16px 20px 20px',
            position: 'relative',
            zIndex: 1,
            outline: 'none',
          }}
        >
          <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
            <AnimatePresence>
              {showHotkeyHint && !isCurrentAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: c.muted,
                    textAlign: 'center',
                    marginBottom: 10,
                    letterSpacing: 0.3,
                    flexShrink: 0,
                  }}
                >
                  {isTeaching ? 'Enter continue · Esc exit' : (
                    <>
                      {currentQuestion?.type === 'multiple-choice' && 'A\u2013D select \u00b7 '}
                      {currentQuestion?.type === 'true-false' && '1/2 or T/F select \u00b7 '}
                      {currentQuestion?.type === 'fill-blank' && '1\u20139 select word \u00b7 '}
                      Enter check · Esc exit
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Adaptive difficulty toast (encouraging when struggling, bonus when cruising) */}
            {lastAnswerCorrect === null && displayQuestion.type !== 'teaching' && (
              <AdaptiveToast mode={adaptiveMode} seed={adaptiveSeed.current} />
            )}

            {/* Mid-lesson micro-celebration toast — hidden when AdaptiveToast is showing */}
            <AnimatePresence>
              {celebration && !(lastAnswerCorrect === null && adaptiveMode !== 'normal' && displayQuestion.type !== 'teaching') && (
                <MicroCelebration
                  key={celebration.key}
                  type={celebration.type}
                  streakCount={celebration.streakCount}
                  onDismiss={() => setCelebration(null)}
                  characterId={lessonCharacter?.id}
                  characterLine={celebrationCharLine}
                />
              )}
            </AnimatePresence>

            <AnimatePresence mode="popLayout">
              <motion.div
                key={displayQuestion.id}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ type: 'spring', stiffness: 340, damping: 30 }}
                style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
              >
                {displayQuestion.type === 'teaching' ? (
                  <TeachingCard
                    question={displayQuestion}
                    unitColor={unitColor}
                    onGotIt={handleTeachingGotIt}
                    hasBackground={hasBackground}
                    bgTheme={bgTheme}
                    characterId={lessonCharacter?.id}
                    characterName={lessonCharacter?.name}
                    characterLine={teachingLine}
                  />
                ) : displayQuestion.type === 'sort-buckets' ? (
                  <SortBucketsCard
                    ref={questionRef}
                    question={displayQuestion}
                    onAnswer={handleAnswer}
                    onSelectionChange={handleSelectionChange}
                    answered={isCurrentAnswered}
                    unitColor={unitColor}
                  />
                ) : displayQuestion.type === 'match-pairs' ? (
                  <MatchPairsCard
                    ref={questionRef}
                    question={displayQuestion}
                    onAnswer={handleAnswer}
                    onSelectionChange={handleSelectionChange}
                    answered={isCurrentAnswered}
                    unitColor={unitColor}
                  />
                ) : displayQuestion.type === 'order-steps' ? (
                  <OrderStepsCard
                    ref={questionRef}
                    question={displayQuestion}
                    onAnswer={handleAnswer}
                    onSelectionChange={handleSelectionChange}
                    answered={isCurrentAnswered}
                    unitColor={unitColor}
                  />
                ) : displayQuestion.type === 'multi-select' ? (
                  <MultiSelectCard
                    ref={questionRef}
                    question={displayQuestion}
                    onAnswer={handleAnswer}
                    onSelectionChange={handleSelectionChange}
                    answered={isCurrentAnswered}
                    unitColor={unitColor}
                  />
                ) : displayQuestion.type === 'slider-estimate' ? (
                  <SliderEstimateCard
                    ref={questionRef}
                    question={displayQuestion}
                    onAnswer={handleAnswer}
                    onSelectionChange={handleSelectionChange}
                    answered={isCurrentAnswered}
                    unitColor={unitColor}
                  />
                ) : displayQuestion.type === 'scenario' ? (
                  <ScenarioCard
                    ref={questionRef}
                    question={displayQuestion}
                    onAnswer={handleAnswer}
                    onSelectionChange={handleSelectionChange}
                    answered={isCurrentAnswered}
                    unitColor={unitColor}
                  />
                ) : displayQuestion.type === 'category-swipe' ? (
                  <CategorySwipeCard
                    ref={questionRef}
                    question={displayQuestion}
                    onAnswer={handleAnswer}
                    onSelectionChange={handleSelectionChange}
                    answered={isCurrentAnswered}
                    unitColor={unitColor}
                  />
                ) : displayQuestion.type === 'rank-order' ? (
                  <RankOrderCard
                    ref={questionRef}
                    question={displayQuestion}
                    onAnswer={handleAnswer}
                    onSelectionChange={handleSelectionChange}
                    answered={isCurrentAnswered}
                    unitColor={unitColor}
                  />
                ) : displayQuestion.type === 'pick-the-best' ? (
                  <PickTheBestCard
                    ref={questionRef}
                    question={displayQuestion}
                    onAnswer={handleAnswer}
                    onSelectionChange={handleSelectionChange}
                    answered={isCurrentAnswered}
                    unitColor={unitColor}
                  />
                ) : displayQuestion.type === 'image-tap' ? (
                  <ImageTapCard
                    ref={questionRef}
                    question={displayQuestion}
                    onAnswer={handleAnswer}
                    onSelectionChange={handleSelectionChange}
                    answered={isCurrentAnswered}
                    unitColor={unitColor}
                  />
                ) : (
                  <QuestionCard
                    ref={questionRef}
                    question={displayQuestion}
                    onAnswer={handleAnswer}
                    onSelectionChange={handleSelectionChange}
                    answered={isCurrentAnswered}
                    unitColor={unitColor}
                  />
                )}
              </motion.div>
            </AnimatePresence>
            {process.env.NODE_ENV === 'development' && (
              <div
                className="text-[10px] text-gray-300 text-center py-1 select-all cursor-text font-mono"
                title="Question ID (dev only)"
              >
                {displayQuestion.id}
              </div>
            )}
          </div>
        </div>

        {/* Bottom bar — hidden for teaching cards (they have their own button) */}
        {isTeaching ? null : !isCurrentAnswered ? (
          <div
            style={{
              padding: '12px 20px',
              paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 16px)',
              borderTop: `2px solid ${c.headerBorder}`,
              background: c.cardBg,
              position: 'relative',
              zIndex: 10,
            }}
          >
            <div className="flex items-center gap-2.5">
              {/* Calculator toggle — available for courses with calculation questions */}
              {(activeProfession === PROFESSION_ID.MECHANICAL_ENGINEERING || activeProfession === PROFESSION_ID.PERSONAL_FINANCE || activeProfession === PROFESSION_ID.SPACE_ASTRONOMY) && <button
                onClick={() => setIsCalcOpen(c => !c)}
                className="flex-shrink-0 flex items-center justify-center transition-transform active:scale-90"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: isCalcOpen ? theme.bg : c.closeBtnBg,
                  border: isCalcOpen ? `2px solid ${unitColor}` : `2px solid ${c.headerBorder}`,
                  boxShadow: isCalcOpen ? 'none' : '0 3px 0 #CCCCCC',
                  cursor: 'pointer',
                }}
                aria-label={isCalcOpen ? 'Close calculator' : 'Open calculator'}
                title="Calculator (`)"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="4" y="2" width="16" height="20" rx="2" stroke={isCalcOpen ? unitColor : c.closeBtnStroke} strokeWidth="2" />
                  <rect x="7" y="5" width="10" height="4" rx="1" fill={isCalcOpen ? unitColor : c.closeBtnStroke} />
                  <circle cx="8.5" cy="13" r="1.1" fill={isCalcOpen ? unitColor : c.closeBtnStroke} />
                  <circle cx="12" cy="13" r="1.1" fill={isCalcOpen ? unitColor : c.closeBtnStroke} />
                  <circle cx="15.5" cy="13" r="1.1" fill={isCalcOpen ? unitColor : c.closeBtnStroke} />
                  <circle cx="8.5" cy="17" r="1.1" fill={isCalcOpen ? unitColor : c.closeBtnStroke} />
                  <circle cx="12" cy="17" r="1.1" fill={isCalcOpen ? unitColor : c.closeBtnStroke} />
                  <circle cx="15.5" cy="17" r="1.1" fill={isCalcOpen ? unitColor : c.closeBtnStroke} />
                </svg>
              </button>}

              {/* Check button */}
              <GameButton
                onClick={handleCheck}
                disabled={!hasSelection}
                className="flex-1"
                style={hasSelection ? {
                  background: unitColor,
                  boxShadow: `0 4px 0 ${theme.dark}`,
                } : undefined}
              >
                Check
              </GameButton>
            </div>
          </div>
        ) : (
          <motion.div
            key="feedback"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{
              padding: '14px 20px',
              paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 16px)',
              background: lastAnswerCorrect ? '#D7FFB8' : '#FFDFE0',
              borderTop: `2px solid ${lastAnswerCorrect ? '#58CC02' : '#FF4B4B'}`,
            }}
          >
            <div style={{ marginBottom: 12 }} role="status" aria-live="assertive">
              <p
                style={{
                  fontSize: 17,
                  fontWeight: 800,
                  color: lastAnswerCorrect ? '#58A700' : '#EA2B2B',
                  margin: 0,
                }}
              >
                {lastAnswerCorrect ? 'Correct!' : 'Incorrect'}
              </p>
              {!lastAnswerCorrect && (
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: '#EA2B2B',
                    margin: '2px 0 0',
                  }}
                >
                  Answer: <GlossaryText text={getCorrectAnswerDisplay()} />
                </p>
              )}
              {/* Distractor-specific explanation (why their choice was wrong) */}
              {!lastAnswerCorrect && lastSelectedIndex !== undefined && displayQuestion.distractorExplanations?.[lastSelectedIndex] && (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 0.85, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.25 }}
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#EA2B2B',
                    margin: '6px 0 0',
                    lineHeight: 1.4,
                  }}
                >
                  <GlossaryText text={displayQuestion.distractorExplanations[lastSelectedIndex]} />
                </motion.p>
              )}
              {/* General explanation (why the correct answer is right) */}
              {displayQuestion.explanation && (
                <motion.div
                  initial={!lastAnswerCorrect && displayQuestion.distractorExplanations?.[lastSelectedIndex!] ? { opacity: 0, y: 4 } : undefined}
                  animate={{ opacity: 0.75, y: 0 }}
                  transition={!lastAnswerCorrect && displayQuestion.distractorExplanations?.[lastSelectedIndex!] ? { delay: 0.35, duration: 0.25 } : undefined}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                    margin: '4px 0 0',
                  }}
                >
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: lastAnswerCorrect ? '#58A700' : '#EA2B2B',
                      opacity: 0.75,
                      margin: 0,
                      lineHeight: 1.4,
                      flex: 1,
                    }}
                  >
                    <GlossaryText text={(userCountry && displayQuestion.variants?.[userCountry]) || displayQuestion.explanation} />
                  </p>
                  {displayQuestion.explanation && (
                    <AudioButton
                      text={displayQuestion.explanation}
                      characterId={currentCharacterId}
                      color={lastAnswerCorrect ? '#58A700' : '#EA2B2B'}
                      size={16}
                    />
                  )}
                </motion.div>
              )}
              <FlagButton contentType={flagContentType} contentId={displayQuestion.id} hasGraphic={!!displayQuestion.diagram} />
            </div>

            <GameButton
              ref={continueBtnRef}
              data-testid="continue-button"
              onClick={handleContinue}
              variant={lastAnswerCorrect ? 'green' : 'red'}
            >
              {isLastQuestion ? 'Finish' : 'Continue'}
            </GameButton>
          </motion.div>
        )}
        </>
        ) : null}

        </div>{/* end centered wrapper */}
        </GlossaryProvider>


        {/* Calculator panel — shows the right calculator per course */}
        <AnimatePresence>
          {isCalcOpen && activeProfession === PROFESSION_ID.MECHANICAL_ENGINEERING && (
            <EngineeringCalculator
              isOpen={isCalcOpen}
              onClose={() => setIsCalcOpen(false)}
              accentColor={unitColor}
              accentDark={theme.dark}
            />
          )}
          {isCalcOpen && activeProfession === PROFESSION_ID.PERSONAL_FINANCE && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                maxHeight: '65vh',
                overflowY: 'auto',
                background: c.cardBg,
                borderTop: `3px solid ${unitColor}`,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                boxShadow: '0 -4px 20px rgba(0,0,0,0.15)',
                zIndex: 50,
                paddingTop: 16,
              }}
            >
              <button
                onClick={() => setIsCalcOpen(false)}
                style={{ position: 'absolute', top: 12, right: 16, background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: c.closeBtnStroke }}
                aria-label="Close calculator"
              >
                &times;
              </button>
              <FinanceCalculators />
            </motion.div>
          )}
          {isCalcOpen && activeProfession === PROFESSION_ID.SPACE_ASTRONOMY && (
            <EngineeringCalculator
              isOpen={isCalcOpen}
              onClose={() => setIsCalcOpen(false)}
              accentColor={unitColor}
              accentDark={theme.dark}
            />
          )}
        </AnimatePresence>

        {/* Out of hearts modal */}
        <OutOfHeartsModal
          isOpen={showOutOfHearts}
          onClose={() => setShowOutOfHearts(false)}
        />

        {/* Exit confirmation modal */}
        <AnimatePresence>
          {showExitConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center"
              onClick={handleCancelExit}
            >
              <div className="absolute inset-0 bg-black/40" />
              <motion.div
                ref={exitDialogRef}
                className="relative w-full sm:w-auto"
                role="dialog"
                aria-modal="true"
                aria-labelledby="exit-confirm-title"
                style={{
                  maxWidth: 480,
                  borderRadius: 24,
                  padding: '20px 20px 32px',
                  background: c.cardBg,
                }}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '100%', opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <p
                  id="exit-confirm-title"
                  style={{
                    fontSize: 19,
                    fontWeight: 800,
                    color: c.title,
                    marginBottom: 4,
                  }}
                >
                  {exitConfirmTitle}
                </p>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: c.subtitle,
                    marginBottom: 20,
                  }}
                >
                  {exitConfirmMessage}
                </p>
                <div className="flex" style={{ gap: 12 }}>
                  <motion.button
                    data-testid="keep-going-button"
                    onClick={handleCancelExit}
                    whileTap={{ y: 3, boxShadow: '0 0 0 transparent', transition: { duration: 0.06 } }}
                    className="flex-1"
                    style={{
                      padding: '14px 0',
                      borderRadius: 16,
                      fontSize: 14,
                      fontWeight: 800,
                      color: c.subtitle,
                      background: c.skipBg,
                      boxShadow: '0 3px 0 #E0E0E0',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Keep going
                  </motion.button>
                  <motion.button
                    onClick={handleConfirmExit}
                    whileTap={{ y: 4, boxShadow: '0 0 0 transparent', transition: { duration: 0.06 } }}
                    className="flex-1"
                    style={{
                      padding: '14px 0',
                      borderRadius: 16,
                      fontSize: 14,
                      fontWeight: 800,
                      color: '#FFFFFF',
                      background: '#FF4B4B',
                      boxShadow: '0 4px 0 #CC2D2D',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Quit
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

    </AnimatePresence>
  );
}
