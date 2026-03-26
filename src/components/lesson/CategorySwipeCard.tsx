'use client';

import { useState, useCallback, useEffect, useImperativeHandle, forwardRef, useMemo } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import type { CourseQuestion } from '@/data/course/types';
import type { QuestionCardHandle } from './QuestionCard';
import { MoneyText } from '@/components/ui/MoneyText';

interface CategorySwipeCardProps {
  question: CourseQuestion;
  onAnswer: (correct: boolean) => void;
  onSelectionChange: (hasSelection: boolean) => void;
  answered: boolean;
  unitColor: string;
}

const SWIPE_THRESHOLD = 80;

const CategorySwipeCard = forwardRef<QuestionCardHandle, CategorySwipeCardProps>(
  function CategorySwipeCard({ question, onAnswer, onSelectionChange, answered, unitColor }, ref) {
    const items = question.options ?? [];
    const categories = question.buckets ?? ['Left', 'Right'];
    const correctBuckets = question.correctBuckets ?? [];

    // Shuffle items
    const shuffledOrder = useMemo(() => {
      const indices = items.map((_, i) => i);
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      return indices;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [question.id]);

    // assignments[originalIdx] = 0 (left), 1 (right), or -1 (unswiped)
    const [assignments, setAssignments] = useState<number[]>(() => items.map(() => -1));
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [results, setResults] = useState<boolean[] | null>(null);
    const [lastSwipe, setLastSwipe] = useState<{ dir: 'left' | 'right'; idx: number } | null>(null);

    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-15, 15]);
    const leftOpacity = useTransform(x, [-150, -50, 0], [1, 0.5, 0]);
    const rightOpacity = useTransform(x, [0, 50, 150], [0, 0.5, 1]);

    useEffect(() => {
      setAssignments(items.map(() => -1));
      setCurrentCardIndex(0);
      setResults(null);
      setLastSwipe(null);
    }, [question.id, items.length]);

    const allSwiped = assignments.every(a => a !== -1);

    useEffect(() => {
      onSelectionChange(allSwiped);
    }, [allSwiped, onSelectionChange]);

    const handleSwipe = useCallback((originalIdx: number, direction: 0 | 1) => {
      if (answered) return;
      setAssignments(prev => {
        const next = [...prev];
        next[originalIdx] = direction;
        return next;
      });
      setLastSwipe({ dir: direction === 0 ? 'left' : 'right', idx: originalIdx });
      setCurrentCardIndex(prev => prev + 1);
    }, [answered]);

    const handleDragEnd = useCallback((originalIdx: number, _: unknown, info: { offset: { x: number } }) => {
      if (answered) return;
      if (info.offset.x < -SWIPE_THRESHOLD) {
        handleSwipe(originalIdx, 0); // left category
      } else if (info.offset.x > SWIPE_THRESHOLD) {
        handleSwipe(originalIdx, 1); // right category
      }
    }, [answered, handleSwipe]);

    const handleCheck = useCallback(() => {
      if (!allSwiped || answered) return;
      const itemResults = assignments.map((a, i) => a === correctBuckets[i]);
      const allCorrect = itemResults.every(Boolean);
      setResults(itemResults);
      onAnswer(allCorrect);
    }, [allSwiped, answered, assignments, correctBuckets, onAnswer]);

    useImperativeHandle(ref, () => ({
      check: handleCheck,
      hasSelection: allSwiped,
      selectOption: () => {},
      selectBool: () => {},
      selectWord: () => {},
      questionType: 'category-swipe',
      availableWordCount: 0,
    }), [handleCheck, allSwiped]);

    const currentOriginalIdx = currentCardIndex < shuffledOrder.length ? shuffledOrder[currentCardIndex] : -1;
    const remainingCount = shuffledOrder.length - currentCardIndex;

    return (
      <div className="flex flex-col flex-1" style={{ minHeight: '100%' }}>
        <h2 style={{ fontSize: 17, fontWeight: 800, color: '#3C3C3C', lineHeight: 1.35, margin: '0 0 8px' }}>
          <MoneyText text={question.question} />
        </h2>

        {/* Category labels */}
        <div className="grid grid-cols-2" style={{ gap: 10, marginBottom: 8 }}>
          <motion.div
            style={{
              opacity: leftOpacity,
              padding: '8px 12px', borderRadius: 12, textAlign: 'center',
              background: `${unitColor}15`, border: `2px solid ${unitColor}`,
              fontSize: 13, fontWeight: 800, color: unitColor,
            }}
          >
            ← {categories[0]}
          </motion.div>
          <motion.div
            style={{
              opacity: rightOpacity,
              padding: '8px 12px', borderRadius: 12, textAlign: 'center',
              background: `${unitColor}15`, border: `2px solid ${unitColor}`,
              fontSize: 13, fontWeight: 800, color: unitColor,
            }}
          >
            {categories[1]} →
          </motion.div>
        </div>

        {/* Static category labels (always visible) */}
        <div className="grid grid-cols-2" style={{ gap: 10, marginBottom: 4 }}>
          <div style={{
            padding: '6px 10px', borderRadius: 10, textAlign: 'center',
            background: '#F5F5F5', fontSize: 12, fontWeight: 700, color: '#AFAFAF',
          }}>
            ← {categories[0]}
          </div>
          <div style={{
            padding: '6px 10px', borderRadius: 10, textAlign: 'center',
            background: '#F5F5F5', fontSize: 12, fontWeight: 700, color: '#AFAFAF',
          }}>
            {categories[1]} →
          </div>
        </div>

        {/* Card area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 160, position: 'relative' }}>
          {!allSwiped && currentOriginalIdx !== -1 && !answered && (
            <AnimatePresence mode="popLayout">
              <motion.div
                key={`swipe-${currentOriginalIdx}`}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.8}
                style={{ x, rotate, touchAction: 'none', cursor: 'grab', zIndex: 10 }}
                onDragEnd={(_, info) => handleDragEnd(currentOriginalIdx, _, info)}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                whileDrag={{ scale: 1.05 }}
              >
                <div style={{
                  padding: '24px 32px', borderRadius: 18, background: 'white',
                  border: '2.5px solid #E5E5E5', boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  fontSize: 18, fontWeight: 800, color: '#3C3C3C', textAlign: 'center',
                  minWidth: 200, maxWidth: 280, userSelect: 'none',
                }}>
                  <MoneyText text={items[currentOriginalIdx]} />
                </div>
              </motion.div>
            </AnimatePresence>
          )}

          {/* Tap buttons for non-drag interaction */}
          {!allSwiped && currentOriginalIdx !== -1 && !answered && (
            <div className="grid grid-cols-2" style={{ gap: 10, marginTop: 16, width: '100%' }}>
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => handleSwipe(currentOriginalIdx, 0)}
                style={{
                  padding: '10px 14px', borderRadius: 12, border: `2px solid ${unitColor}40`,
                  background: `${unitColor}08`, fontSize: 13, fontWeight: 700, color: unitColor,
                  cursor: 'pointer',
                }}
              >
                ← {categories[0]}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => handleSwipe(currentOriginalIdx, 1)}
                style={{
                  padding: '10px 14px', borderRadius: 12, border: `2px solid ${unitColor}40`,
                  background: `${unitColor}08`, fontSize: 13, fontWeight: 700, color: unitColor,
                  cursor: 'pointer',
                }}
              >
                {categories[1]} →
              </motion.button>
            </div>
          )}

          {/* All swiped — show results */}
          {allSwiped && (
            <div style={{ width: '100%' }}>
              <div className="grid grid-cols-2" style={{ gap: 8 }}>
                {[0, 1].map(catIdx => (
                  <div key={catIdx} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <div style={{
                      fontSize: 12, fontWeight: 800, color: unitColor,
                      textTransform: 'uppercase', letterSpacing: 0.5, textAlign: 'center', marginBottom: 4,
                    }}>
                      {categories[catIdx]}
                    </div>
                    {shuffledOrder.filter(i => assignments[i] === catIdx).map(originalIdx => {
                      const isCorrect = results ? results[originalIdx] : null;
                      return (
                        <motion.div
                          key={`result-${originalIdx}`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={
                            isCorrect !== null
                              ? isCorrect
                                ? { opacity: 1, scale: [1, 1.06, 1] }
                                : { opacity: 1, scale: 1, x: [0, -4, 4, -2, 2, 0] }
                              : { opacity: 1, scale: 1 }
                          }
                          transition={
                            isCorrect === false
                              ? { duration: 0.35 }
                              : { type: 'spring', stiffness: 400, damping: 25 }
                          }
                          style={{
                            padding: '8px 10px', borderRadius: 10, textAlign: 'center',
                            fontSize: 13, fontWeight: 700,
                            background: isCorrect === null ? 'white' : isCorrect ? '#D7FFB8' : '#FFDFE0',
                            border: isCorrect === null ? '2px solid #E5E5E5' : isCorrect ? '2px solid #58CC02' : '2px solid #FF4B4B',
                            color: isCorrect === null ? '#3C3C3C' : isCorrect ? '#58A700' : '#EA2B2B',
                            boxShadow: isCorrect ? '0 0 10px rgba(88,204,2,0.2)' : 'none',
                          }}
                        >
                          <MoneyText text={items[originalIdx]} />
                          {isCorrect !== null && (isCorrect ? ' ✓' : ' ✗')}
                        </motion.div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Progress counter */}
        <div style={{ textAlign: 'center', fontSize: 12, fontWeight: 700, color: '#CFCFCF', marginTop: 8 }}>
          {allSwiped ? `${items.length}/${items.length} sorted` : `${items.length - remainingCount}/${items.length} sorted`}
        </div>
      </div>
    );
  }
);

export default CategorySwipeCard;
