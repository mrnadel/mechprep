'use client';

import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCourseStore } from '@/store/useCourseStore';
import { getUnitTheme } from '@/lib/unitThemes';
import { useBackHandler } from '@/hooks/useBackHandler';
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
import ResultScreen from './ResultScreen';
import FlagButton from '@/components/feedback/FlagButton';
import { useMasteryStore } from '@/store/useMasteryStore';
import { useDoubleXpActive } from '@/store/useEngagementStore';
import { useHeartsStore } from '@/store/useHeartsStore';
import { HeartDisplay } from '@/components/ui/HeartDisplay';
import { OutOfHeartsModal } from '@/components/ui/OutOfHeartsModal';
import EngineeringCalculator from '@/components/calculator/EngineeringCalculator';
import { GameButton } from '@/components/ui/GameButton';
import type { CourseQuestion } from '@/data/course/types';
import type { ContentFeedbackType } from '@/data/types';
import { MoneyText } from '@/components/ui/MoneyText';

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

  // === SHARED LOCAL STATE ===
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showDebugMenu, setShowDebugMenu] = useState(false);
  const [hasSelection, setHasSelection] = useState(false);
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [xpGain, setXpGain] = useState(0);
  const [showOutOfHearts, setShowOutOfHearts] = useState(false);
  const questionRef = useRef<QuestionCardHandle>(null);
  const isDoubleXp = useDoubleXpActive();
  const addMasteryEvent = useMasteryStore((s) => s.addEvent);
  const syncMastery = useMasteryStore((s) => s.syncToServer);
  const loseHeart = useHeartsStore((s) => s.loseHeart);
  const hasHearts = useHeartsStore((s) => s.hasHearts);

  // Sync mastery when lesson completes (lesson mode only; practice handles its own)
  useEffect(() => {
    if (!adapter && lessonResult) syncMastery();
  }, [adapter, lessonResult, syncMastery]);

  // Lock body scroll while view is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  // === LESSON-MODE DERIVED DATA ===
  const lessonData = useMemo(() => {
    if (adapter || !activeLesson) return null;
    const unit = courseData[activeLesson.unitIndex];
    if (!unit) return null;
    const lesson = unit.lessons[activeLesson.lessonIndex];
    if (!lesson) return null;
    return { unit, lesson };
  }, [adapter, activeLesson, courseData]);

  const lessonTheme = useMemo(() => {
    if (adapter || !activeLesson) return getUnitTheme(0);
    return getUnitTheme(activeLesson.unitIndex);
  }, [adapter, activeLesson]);

  const lessonSessionQuestions = useMemo(() => {
    if (adapter || !activeLesson || !lessonData) return [];
    const questionMap = new Map(lessonData.lesson.questions.map((q) => [q.id, q]));
    return activeLesson.sessionQuestionIds
      .map((id) => questionMap.get(id))
      .filter(Boolean) as typeof lessonData.lesson.questions;
  }, [adapter, activeLesson, lessonData]);

  const lessonCurrentQuestion = useMemo(() => {
    if (adapter || !activeLesson) return null;
    return lessonSessionQuestions[activeLesson.currentQuestionIndex] ?? null;
  }, [adapter, activeLesson, lessonSessionQuestions]);

  const lessonIsCurrentAnswered = useMemo(() => {
    if (adapter || !activeLesson || !lessonCurrentQuestion) return false;
    return activeLesson.answers.some((a) => a.questionId === lessonCurrentQuestion.id);
  }, [adapter, activeLesson, lessonCurrentQuestion]);

  const lessonIsLastQuestion = useMemo(() => {
    if (adapter || !activeLesson) return false;
    return activeLesson.currentQuestionIndex >= lessonSessionQuestions.length - 1;
  }, [adapter, activeLesson, lessonSessionQuestions]);

  // === RESOLVED STATE — adapter wins, else lesson-mode ===
  const currentQuestion = adapter ? adapter.currentQuestion : lessonCurrentQuestion;
  const answeredCount = adapter ? adapter.answeredCount : (activeLesson?.answers.length ?? 0);
  const totalQuestions = adapter ? adapter.totalQuestions : lessonSessionQuestions.length;
  const isCurrentAnswered = adapter ? adapter.isCurrentAnswered : lessonIsCurrentAnswered;
  const isLastQuestion = adapter ? adapter.isLastQuestion : lessonIsLastQuestion;
  const unitColor = adapter ? adapter.unitColor : lessonTheme.color;
  const theme = adapter ? adapter.theme : lessonTheme;
  const isGolden = adapter ? adapter.isGolden : (activeLesson?.isGolden ?? false);
  const flagContentType = adapter ? adapter.flagContentType : 'lesson-question';
  const exitLabel = adapter ? adapter.exitLabel : 'Close lesson';
  const exitConfirmTitle = adapter ? adapter.exitConfirmTitle : 'Quit lesson?';
  const exitConfirmMessage = adapter ? adapter.exitConfirmMessage : 'Your progress on this lesson will be lost.';
  const isTeaching = currentQuestion?.type === 'teaching';

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
      if (correct) {
        setXpGain((prev) => prev + (isDoubleXp ? 20 : 10));
      } else {
        loseHeart();
      }
    },
    [_submitAnswer, lessonData, addMasteryEvent, isDoubleXp, loseHeart],
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
    (correct: boolean) => {
      if (!currentQuestion) return;
      if (adapter) {
        adapter.submitAnswer(currentQuestion.id, correct);
      } else {
        _submitAnswer(currentQuestion.id, correct);
        const topicId = lessonData?.unit.topicId;
        if (topicId) {
          addMasteryEvent({
            questionId: currentQuestion.id,
            topicId,
            difficulty: 'intermediate',
            correct,
            source: 'course',
          });
        }
      }
      setLastAnswerCorrect(correct);
      if (correct) {
        setXpGain((prev) => prev + (isDoubleXp ? 20 : 10));
      } else {
        // Lose a heart on wrong answer
        loseHeart();
      }
    },
    [adapter, currentQuestion, _submitAnswer, lessonData, addMasteryEvent, isDoubleXp, loseHeart]
  );

  const handleSelectionChange = useCallback((value: boolean) => {
    setHasSelection(value);
  }, []);

  const handleCheck = useCallback(() => {
    questionRef.current?.check();
  }, []);

  const handleContinue = useCallback(() => {
    setLastAnswerCorrect(null);
    setHasSelection(false);
    if (isLastQuestion) {
      adapter ? adapter.complete() : _completeLesson();
    } else {
      // Check if user has hearts before showing next question
      if (!hasHearts()) {
        setShowOutOfHearts(true);
        return;
      }
      adapter ? adapter.nextQuestion() : _nextQuestion();
    }
  }, [adapter, isLastQuestion, _completeLesson, _nextQuestion, hasHearts]);

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

  // Keep a frozen snapshot of the last question so the lesson view stays visible
  // behind the result screen (instead of fading out immediately).
  const lastQuestionRef = useRef<CourseQuestion | null>(null);
  if (currentQuestion) lastQuestionRef.current = currentQuestion;
  const displayQuestion = currentQuestion ?? lastQuestionRef.current;

  // === EARLY RETURNS ===
  // Show result screen after lesson completion (course mode only)
  if (!adapter && lessonResult) return <ResultScreen />;
  if (!displayQuestion && !isNonStandard) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="lesson-view"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
        role="main"
        aria-label={adapter ? 'Practice view' : 'Lesson view'}
        style={{
          backgroundColor: '#FAFAFA',
          paddingTop: 'env(safe-area-inset-top, 0px)',
        }}
      >
        <div className="w-full h-full max-w-3xl flex flex-col bg-[#FAFAFA] lg:shadow-lg lg:border-x lg:border-gray-200">
        {/* Top bar */}
        <div
          className="flex items-center flex-shrink-0 z-20"
          style={{
            padding: '10px 16px',
            gap: 12,
            borderBottom: '2px solid #E5E5E5',
            background: 'white',
          }}
        >
          <button
            onClick={handleExitClick}
            className="flex-shrink-0 flex items-center justify-center transition-transform active:scale-90"
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: '#F5F5F5',
              border: 'none',
              cursor: 'pointer',
            }}
            aria-label={exitLabel}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 4l8 8M12 4l-8 8" stroke="#AFAFAF" strokeWidth="2.5" strokeLinecap="round" />
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
          />

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
                  background: '#FEE2E2',
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
                    background: '#FEE2E2',
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
                      background: '#FFFFFF',
                      borderRadius: 12,
                      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                      border: '1px solid #E5E7EB',
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
            <HeartDisplay />
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
            <motion.div
              className="flex items-center"
              style={{
                gap: 4,
                padding: '4px 10px',
                borderRadius: 10,
                background: isDoubleXp ? 'linear-gradient(135deg, #FEF3C7, #FDE68A)' : theme.bg,
                color: isDoubleXp ? '#B45309' : theme.dark,
                fontWeight: 800,
                fontSize: 13,
              }}
              key={xpGain}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 0.25 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8Z" fill={isDoubleXp ? '#B45309' : theme.dark} />
              </svg>
              <span aria-live="polite">+{xpGain} XP</span>
            </motion.div>
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
          className="flex-1 overflow-y-auto overflow-x-hidden"
          style={{ padding: '16px 20px 20px' }}
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
                    color: '#CFCFCF',
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
              borderTop: '2px solid #E5E5E5',
              background: 'white',
            }}
          >
            <div className="flex items-center gap-2.5">
              {/* Calculator toggle — only for ME course */}
              {activeProfession === 'mechanical-engineering' && <button
                onClick={() => setIsCalcOpen(c => !c)}
                className="flex-shrink-0 flex items-center justify-center transition-transform active:scale-90"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: isCalcOpen ? theme.bg : '#F5F5F5',
                  border: isCalcOpen ? `2px solid ${unitColor}` : '2px solid #E5E5E5',
                  boxShadow: isCalcOpen ? 'none' : '0 3px 0 #CCCCCC',
                  cursor: 'pointer',
                }}
                aria-label={isCalcOpen ? 'Close calculator' : 'Open calculator'}
                title="Calculator (`)"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="4" y="2" width="16" height="20" rx="2" stroke={isCalcOpen ? unitColor : '#AFAFAF'} strokeWidth="2" />
                  <rect x="7" y="5" width="10" height="4" rx="1" fill={isCalcOpen ? unitColor : '#AFAFAF'} />
                  <circle cx="8.5" cy="13" r="1.1" fill={isCalcOpen ? unitColor : '#AFAFAF'} />
                  <circle cx="12" cy="13" r="1.1" fill={isCalcOpen ? unitColor : '#AFAFAF'} />
                  <circle cx="15.5" cy="13" r="1.1" fill={isCalcOpen ? unitColor : '#AFAFAF'} />
                  <circle cx="8.5" cy="17" r="1.1" fill={isCalcOpen ? unitColor : '#AFAFAF'} />
                  <circle cx="12" cy="17" r="1.1" fill={isCalcOpen ? unitColor : '#AFAFAF'} />
                  <circle cx="15.5" cy="17" r="1.1" fill={isCalcOpen ? unitColor : '#AFAFAF'} />
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
                  Answer: <MoneyText text={getCorrectAnswerDisplay()} />
                </p>
              )}
              {displayQuestion.explanation && (
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: lastAnswerCorrect ? '#58A700' : '#EA2B2B',
                    opacity: 0.75,
                    margin: '4px 0 0',
                    lineHeight: 1.4,
                  }}
                >
                  <MoneyText text={displayQuestion.explanation} />
                </p>
              )}
              <FlagButton contentType={flagContentType} contentId={displayQuestion.id} hasGraphic={!!displayQuestion.diagram} />
            </div>

            <GameButton
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


        {/* Calculator panel — ME course only */}
        <AnimatePresence>
          {isCalcOpen && activeProfession === 'mechanical-engineering' && (
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
                className="relative w-full sm:w-auto bg-white"
                role="dialog"
                aria-modal="true"
                aria-labelledby="exit-confirm-title"
                style={{
                  maxWidth: 480,
                  borderRadius: 24,
                  padding: '20px 20px 32px',
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
                    color: '#3C3C3C',
                    marginBottom: 4,
                  }}
                >
                  {exitConfirmTitle}
                </p>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#AFAFAF',
                    marginBottom: 20,
                  }}
                >
                  {exitConfirmMessage}
                </p>
                <div className="flex" style={{ gap: 12 }}>
                  <motion.button
                    onClick={handleCancelExit}
                    whileTap={{ y: 3, boxShadow: '0 0 0 transparent', transition: { duration: 0.06 } }}
                    className="flex-1"
                    style={{
                      padding: '14px 0',
                      borderRadius: 16,
                      fontSize: 14,
                      fontWeight: 800,
                      color: '#AFAFAF',
                      background: '#F5F5F5',
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

      {/* Result screen overlay — lesson view stays visible underneath */}
      {!adapter && lessonResult && <ResultScreen />}
    </AnimatePresence>
  );
}
