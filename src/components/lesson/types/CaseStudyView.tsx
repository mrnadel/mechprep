'use client';

import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { LessonTypeProps, CaseStudySection, CourseQuestion } from '@/data/course/types';
import type { QuestionCardHandle } from '@/components/lesson/QuestionCard';
import QuestionCard from '@/components/lesson/QuestionCard';
import SortBucketsCard from '@/components/lesson/SortBucketsCard';
import MatchPairsCard from '@/components/lesson/MatchPairsCard';
import OrderStepsCard from '@/components/lesson/OrderStepsCard';
import MultiSelectCard from '@/components/lesson/MultiSelectCard';
import SliderEstimateCard from '@/components/lesson/SliderEstimateCard';
import ScenarioCard from '@/components/lesson/ScenarioCard';
import CategorySwipeCard from '@/components/lesson/CategorySwipeCard';
import RankOrderCard from '@/components/lesson/RankOrderCard';
import PickTheBestCard from '@/components/lesson/PickTheBestCard';
import ImageTapCard from '@/components/lesson/ImageTapCard';
import { MoneyText } from '@/components/ui/MoneyText';
import { useLessonColors } from '@/lib/lessonColors';

function CheckpointQuestion({
  question,
  unitColor,
  onAnswer,
  answered,
  onSelectionChange,
}: {
  question: CourseQuestion;
  unitColor: string;
  onAnswer: (correct: boolean) => void;
  answered: boolean;
  onSelectionChange: (v: boolean) => void;
}) {
  const ref = useRef<QuestionCardHandle>(null);

  const props = { ref, question, onAnswer, onSelectionChange, answered, unitColor };

  switch (question.type) {
    case 'sort-buckets':
      return <SortBucketsCard {...props} />;
    case 'match-pairs':
      return <MatchPairsCard {...props} />;
    case 'order-steps':
      return <OrderStepsCard {...props} />;
    case 'multi-select':
      return <MultiSelectCard {...props} />;
    case 'slider-estimate':
      return <SliderEstimateCard {...props} />;
    case 'scenario':
      return <ScenarioCard {...props} />;
    case 'category-swipe':
      return <CategorySwipeCard {...props} />;
    case 'rank-order':
      return <RankOrderCard {...props} />;
    case 'pick-the-best':
      return <PickTheBestCard {...props} />;
    case 'image-tap':
      return <ImageTapCard {...props} />;
    default:
      return <QuestionCard {...props} />;
  }
}

export default function CaseStudyView({
  lesson,
  unitColor,
  theme,
  onAnswer,
  onProgress,
  onComplete,
  checkHearts,
}: LessonTypeProps) {
  const c = useLessonColors();
  const sections = lesson.caseStudySections ?? [];
  const totalCheckpoints = useMemo(() => sections.filter((s) => s.checkpoint).length, [sections]);

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [checkpointAnswered, setCheckpointAnswered] = useState(false);
  const [hasSelection, setHasSelection] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [checkpointsCompleted, setCheckpointsCompleted] = useState(0);
  const questionRef = useRef<QuestionCardHandle>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const initRef = useRef(false);

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;
    onProgress(0, sections.length);
    return () => { initRef.current = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll to top when section changes
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentSectionIndex]);

  const currentSection = sections[currentSectionIndex];
  const hasCheckpoint = !!currentSection?.checkpoint;
  const isLastSection = currentSectionIndex >= sections.length - 1;

  const handleCheckpointAnswer = useCallback(
    (correct: boolean) => {
      if (!currentSection?.checkpoint) return;
      onAnswer(currentSection.checkpoint.id, correct);
      setCheckpointAnswered(true);
      setLastAnswerCorrect(correct);
      const next = checkpointsCompleted + 1;
      setCheckpointsCompleted(next);
    },
    [currentSection, checkpointsCompleted, onAnswer],
  );

  const handleCheck = useCallback(() => {
    questionRef.current?.check();
  }, []);

  const handleContinue = useCallback(() => {
    if (isLastSection) {
      onProgress(sections.length, sections.length);
      onComplete();
      return;
    }

    if (!checkHearts()) return;

    setCurrentSectionIndex((prev) => prev + 1);
    setCheckpointAnswered(false);
    setHasSelection(false);
    setLastAnswerCorrect(null);
    onProgress(currentSectionIndex + 1, sections.length);
  }, [isLastSection, currentSectionIndex, sections.length, onProgress, onComplete, checkHearts]);

  if (!currentSection) return null;

  const showContinue = hasCheckpoint ? checkpointAnswered : true;
  const showCheck = hasCheckpoint && !checkpointAnswered;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      {/* Scrollable content area */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 20px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        {/* Section indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {sections.map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: 4,
                borderRadius: 2,
                background: i <= currentSectionIndex ? unitColor : c.border,
                transition: 'background 0.3s',
              }}
            />
          ))}
        </div>

        {/* Case study title */}
        {currentSectionIndex === 0 && lesson.caseStudyTitle && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 20 }}>📋</span>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: c.title, margin: 0 }}>
              {lesson.caseStudyTitle}
            </h2>
          </div>
        )}

        {/* Section content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSectionIndex}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            {/* Narrative text */}
            <div
              style={{
                background: c.cardBg,
                borderRadius: 16,
                padding: 20,
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                border: `1px solid ${c.emptyBg}`,
                marginBottom: hasCheckpoint ? 16 : 0,
              }}
            >
              <p
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: c.title,
                  lineHeight: 1.7,
                  margin: 0,
                  whiteSpace: 'pre-line',
                }}
              >
                <MoneyText text={currentSection.content} />
              </p>
            </div>

            {/* Checkpoint question */}
            {hasCheckpoint && currentSection.checkpoint && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    marginBottom: 10,
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      background: checkpointAnswered
                        ? lastAnswerCorrect
                          ? '#58CC02'
                          : '#FF4B4B'
                        : unitColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span style={{ fontSize: 10, color: '#FFF', fontWeight: 800 }}>?</span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: c.subtitle, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    Checkpoint
                  </span>
                </div>
                <CheckpointQuestion
                  question={currentSection.checkpoint}
                  unitColor={unitColor}
                  onAnswer={handleCheckpointAnswer}
                  answered={checkpointAnswered}
                  onSelectionChange={setHasSelection}
                />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom bar */}
      {showCheck ? (
        <div
          style={{
            padding: '12px 20px',
            paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 16px)',
            borderTop: `2px solid ${c.border}`,
            background: c.cardBg,
          }}
        >
          <button
            onClick={handleCheck}
            disabled={!hasSelection}
            className="w-full transition-transform active:scale-[0.98]"
            style={{
              padding: '14px 0',
              borderRadius: 16,
              fontSize: 15,
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: 0.8,
              background: hasSelection ? unitColor : c.border,
              color: hasSelection ? '#FFFFFF' : c.subtitle,
              boxShadow: hasSelection ? `0 4px 0 ${theme.dark}` : '0 4px 0 #CCCCCC',
              border: 'none',
              cursor: hasSelection ? 'pointer' : 'default',
            }}
          >
            Check
          </button>
        </div>
      ) : showContinue ? (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          style={{
            padding: '12px 20px',
            paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 16px)',
            borderTop: `2px solid ${
              lastAnswerCorrect === null
                ? c.border
                : lastAnswerCorrect
                  ? '#58CC02'
                  : '#FF4B4B'
            }`,
            background: lastAnswerCorrect === null
              ? c.cardBg
              : lastAnswerCorrect
                ? '#D7FFB8'
                : '#FFDFE0',
          }}
        >
          {lastAnswerCorrect !== null && currentSection.checkpoint && (
            <div style={{ marginBottom: 10 }}>
              <p style={{
                fontSize: 15,
                fontWeight: 800,
                color: lastAnswerCorrect ? '#58A700' : '#EA2B2B',
                margin: '0 0 2px',
              }}>
                {lastAnswerCorrect ? 'Correct!' : 'Incorrect'}
              </p>
              {currentSection.checkpoint.explanation && (
                <p style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: lastAnswerCorrect ? '#58A700' : '#EA2B2B',
                  opacity: 0.75,
                  margin: 0,
                  lineHeight: 1.4,
                }}>
                  <MoneyText text={currentSection.checkpoint.explanation} />
                </p>
              )}
            </div>
          )}
          <button
            onClick={handleContinue}
            className="w-full transition-transform active:scale-[0.98]"
            style={{
              padding: '14px 0',
              borderRadius: 16,
              fontSize: 15,
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: 0.8,
              background: lastAnswerCorrect === null
                ? unitColor
                : lastAnswerCorrect
                  ? '#58CC02'
                  : '#FF4B4B',
              color: '#FFFFFF',
              boxShadow: lastAnswerCorrect === null
                ? `0 4px 0 ${theme.dark}`
                : lastAnswerCorrect
                  ? '0 4px 0 #46A302'
                  : '0 4px 0 #CC2D2D',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {isLastSection ? 'Finish' : 'Continue Reading'}
          </button>
        </motion.div>
      ) : null}
    </div>
  );
}
