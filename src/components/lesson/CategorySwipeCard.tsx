'use client';

import { useState, useCallback, useEffect, useImperativeHandle, forwardRef, useMemo } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import type { CourseQuestion } from '@/data/course/types';
import type { QuestionCardHandle } from './QuestionCard';
import { GlossaryText } from '@/components/ui/GlossaryText';
import { useLessonColors } from '@/lib/lessonColors';

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
    const c = useLessonColors();
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

    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-15, 15]);
    const leftOpacity = useTransform(x, [-150, -50, 0], [1, 0.5, 0]);
    const rightOpacity = useTransform(x, [0, 50, 150], [0, 0.5, 1]);

    useEffect(() => {
      setAssignments(items.map(() => -1));
      setCurrentCardIndex(0);
      setResults(null);
      x.jump(0);
    }, [question.id, items.length, x]);

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
      x.jump(0);
      setCurrentCardIndex(prev => prev + 1);
    }, [answered, x]);

    const handleDragEnd = useCallback((originalIdx: number, _: unknown, info: { offset: { x: number } }) => {
      if (answered) return;
      if (info.offset.x < -SWIPE_THRESHOLD) {
        handleSwipe(originalIdx, 0);
      } else if (info.offset.x > SWIPE_THRESHOLD) {
        handleSwipe(originalIdx, 1);
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
    const swipedCount = assignments.filter(a => a !== -1).length;

    // Items assigned to each category (in swipe order)
    const leftItems = shuffledOrder.filter(i => assignments[i] === 0);
    const rightItems = shuffledOrder.filter(i => assignments[i] === 1);

    return (
      <div className="flex flex-col flex-1" style={{ minHeight: '100%' }}>
        {/* Action title */}
        <div style={{ fontSize: 12, fontWeight: 800, color: c.subtitle, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 }}>
          Sort into categories
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: c.title, lineHeight: 1.35, margin: '0 0 10px' }}>
          <GlossaryText text={question.question} />
        </h2>

        {/* Category columns with swiped items */}
        <div className="grid grid-cols-2" style={{ gap: 10, marginBottom: 12 }}>
          {[0, 1].map(catIdx => {
            const catItems = catIdx === 0 ? leftItems : rightItems;
            return (
              <div key={catIdx} style={{
                borderRadius: 14,
                border: '2px dashed #E0E0E0',
                background: `${unitColor}06`,
                padding: '8px 8px',
                minHeight: 60,
                transition: 'all 0.15s ease',
              }}>
                {/* Category label */}
                <motion.div style={{
                  opacity: catIdx === 0 ? leftOpacity : rightOpacity,
                  fontSize: 12, fontWeight: 800, color: unitColor,
                  textAlign: 'center', marginBottom: 6,
                  padding: '4px 8px', borderRadius: 8,
                  background: `${unitColor}12`,
                }}>
                  {catIdx === 0 ? '←' : '→'} {categories[catIdx]}
                </motion.div>
                <div style={{
                  fontSize: 11, fontWeight: 700, color: c.subtitle,
                  textAlign: 'center', marginBottom: 4,
                  opacity: catItems.length > 0 ? 0 : 1,
                  height: catItems.length > 0 ? 0 : 'auto',
                  overflow: 'hidden',
                }}>
                  {categories[catIdx]}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <AnimatePresence>
                    {catItems.map(originalIdx => {
                      const isCorrect = results ? results[originalIdx] : null;
                      return (
                        <motion.div
                          key={`sorted-${originalIdx}`}
                          layout
                          aria-label={`${items[originalIdx]} in ${categories[catIdx]}${isCorrect !== null ? (isCorrect ? ' — correct' : ' — incorrect') : ''}`}
                          initial={{ opacity: 0, scale: 0.7, y: -6 }}
                          animate={
                            isCorrect !== null
                              ? isCorrect
                                ? { opacity: 1, scale: [1, 1.06, 1], y: 0 }
                                : { opacity: 1, scale: 1, y: 0, x: [0, -4, 4, -2, 2, 0] }
                              : { opacity: 1, scale: 1, y: 0 }
                          }
                          transition={
                            isCorrect !== null
                              ? { duration: 0.35 }
                              : { type: 'spring', stiffness: 500, damping: 25 }
                          }
                          style={{
                            padding: '7px 10px', borderRadius: 10, textAlign: 'center',
                            fontSize: 12, fontWeight: 700,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
                            background: isCorrect === null ? c.cardBg : isCorrect ? '#D7FFB8' : '#FFDFE0',
                            border: isCorrect === null ? `1.5px solid ${c.border}` : isCorrect ? '1.5px solid #58CC02' : '1.5px solid #FF4B4B',
                            color: isCorrect === null ? c.title : isCorrect ? '#58A700' : '#EA2B2B',
                            boxShadow: isCorrect === true ? '0 0 8px rgba(88,204,2,0.2)' : 'none',
                          }}
                        >
                          {items[originalIdx]}
                          {isCorrect === true && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
                          {isCorrect === false && <X className="w-3.5 h-3.5" strokeWidth={3} />}
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>

        <div className="sr-only">Use left and right arrow keys to categorize</div>

        {/* Swipe card area */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 180, position: 'relative', flex: 1 }}>
          {!allSwiped && currentOriginalIdx !== -1 && !answered && (
            <AnimatePresence mode="popLayout">
              <motion.div
                key={`swipe-${currentOriginalIdx}`}
                tabIndex={0}
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    handleSwipe(currentOriginalIdx, 0);
                  } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    handleSwipe(currentOriginalIdx, 1);
                  }
                }}
                aria-label={`${items[currentOriginalIdx]}. Press left arrow for ${categories[0]}, right arrow for ${categories[1]}`}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.8}
                style={{ x, rotate, touchAction: 'none', cursor: 'grab', zIndex: 10, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 0' }}
                onDragEnd={(_, info) => handleDragEnd(currentOriginalIdx, _, info)}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                whileDrag={{ scale: 1.05 }}
              >
                <div style={{
                  padding: '28px 36px', borderRadius: 18, background: c.cardBg,
                  border: `2.5px solid ${c.border}`, boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  fontSize: 18, fontWeight: 800, color: c.title, textAlign: 'center',
                  width: '85%', maxWidth: 320, userSelect: 'none',
                }}>
                  {items[currentOriginalIdx]}
                </div>
              </motion.div>
            </AnimatePresence>
          )}

          {allSwiped && !answered && (
            <div style={{ fontSize: 14, fontWeight: 700, color: c.subtitle, textAlign: 'center', padding: 12 }}>
              All sorted! Hit Check.
            </div>
          )}
        </div>

        {/* Tap buttons for non-drag interaction */}
        {!allSwiped && currentOriginalIdx !== -1 && !answered && (
          <div className="grid grid-cols-2" style={{ gap: 10, marginTop: 8 }}>
            <motion.button
              whileTap={{ y: 3, boxShadow: '0 0 0 transparent', transition: { duration: 0.06 } }}
              onClick={() => handleSwipe(currentOriginalIdx, 0)}
              aria-label={`Sort "${items[currentOriginalIdx]}" into ${categories[0]}`}
              style={{
                padding: '10px 14px', borderRadius: 12, border: `2px solid ${unitColor}40`,
                background: `${unitColor}08`, fontSize: 13, fontWeight: 700, color: unitColor,
                cursor: 'pointer',
                boxShadow: `0 3px 0 color-mix(in srgb, ${unitColor} 65%, black)`,
              }}
            >
              ← {categories[0]}
            </motion.button>
            <motion.button
              whileTap={{ y: 3, boxShadow: '0 0 0 transparent', transition: { duration: 0.06 } }}
              onClick={() => handleSwipe(currentOriginalIdx, 1)}
              aria-label={`Sort "${items[currentOriginalIdx]}" into ${categories[1]}`}
              style={{
                padding: '10px 14px', borderRadius: 12, border: `2px solid ${unitColor}40`,
                background: `${unitColor}08`, fontSize: 13, fontWeight: 700, color: unitColor,
                cursor: 'pointer',
                boxShadow: `0 3px 0 color-mix(in srgb, ${unitColor} 65%, black)`,
              }}
            >
              {categories[1]} →
            </motion.button>
          </div>
        )}

        {/* Progress counter */}
        <div style={{ textAlign: 'center', fontSize: 12, fontWeight: 700, color: c.muted, marginTop: 8 }}>
          {swipedCount}/{items.length} sorted
        </div>
      </div>
    );
  }
);

export default CategorySwipeCard;
