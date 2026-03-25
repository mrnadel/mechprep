'use client';

import { useState, useCallback, useEffect, useImperativeHandle, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CourseQuestion } from '@/data/course/types';
import type { QuestionCardHandle } from './QuestionCard';

interface SortBucketsCardProps {
  question: CourseQuestion;
  onAnswer: (correct: boolean) => void;
  onSelectionChange: (hasSelection: boolean) => void;
  answered: boolean;
  unitColor: string;
}

const SortBucketsCard = forwardRef<QuestionCardHandle, SortBucketsCardProps>(
  function SortBucketsCard({ question, onAnswer, onSelectionChange, answered, unitColor }, ref) {
    const items = question.options ?? [];
    const bucketLabels = question.buckets ?? ['A', 'B'];
    const correctBuckets = question.correctBuckets ?? [];

    // Track which bucket each item was sorted into (-1 = unsorted)
    const [assignments, setAssignments] = useState<number[]>(() => items.map(() => -1));
    const [currentIndex, setCurrentIndex] = useState(0);
    const [results, setResults] = useState<boolean[] | null>(null);

    // Reset on question change
    useEffect(() => {
      setAssignments(items.map(() => -1));
      setCurrentIndex(0);
      setResults(null);
    }, [question.id, items.length]);

    const allSorted = assignments.every((a) => a !== -1);

    useEffect(() => {
      onSelectionChange(allSorted);
    }, [allSorted, onSelectionChange]);

    const handleBucketTap = useCallback((bucketIdx: number) => {
      if (answered || currentIndex >= items.length) return;
      setAssignments((prev) => {
        const next = [...prev];
        next[currentIndex] = bucketIdx;
        return next;
      });
      setCurrentIndex((prev) => prev + 1);
    }, [answered, currentIndex, items.length]);

    const handleCheck = useCallback(() => {
      if (!allSorted || answered) return;
      const itemResults = assignments.map((a, i) => a === correctBuckets[i]);
      const allCorrect = itemResults.every(Boolean);
      setResults(itemResults);
      onAnswer(allCorrect);
    }, [allSorted, answered, assignments, correctBuckets, onAnswer]);

    // Undo last sort
    const handleUndo = useCallback(() => {
      if (answered || currentIndex === 0) return;
      const undoIdx = currentIndex - 1;
      setAssignments((prev) => {
        const next = [...prev];
        next[undoIdx] = -1;
        return next;
      });
      setCurrentIndex(undoIdx);
    }, [answered, currentIndex]);

    useImperativeHandle(ref, () => ({
      check: handleCheck,
      hasSelection: allSorted,
      selectOption: (index: number) => {
        if (!answered && index < bucketLabels.length) {
          handleBucketTap(index);
        }
      },
      selectBool: () => {},
      selectWord: () => {},
      questionType: 'sort-buckets',
      availableWordCount: 0,
    }), [handleCheck, allSorted, answered, bucketLabels.length, handleBucketTap]);

    // Items sorted into each bucket for display
    const bucket0Items = items.filter((_, i) => assignments[i] === 0);
    const bucket1Items = items.filter((_, i) => assignments[i] === 1);

    const currentItem = currentIndex < items.length ? items[currentIndex] : null;

    return (
      <div className="flex flex-col flex-1" style={{ minHeight: '100%' }}>
        {/* Question */}
        <h2 style={{ fontSize: 17, fontWeight: 800, color: '#3C3C3C', lineHeight: 1.35, margin: '0 0 16px' }}>
          {question.question}
        </h2>

        {/* Current item to sort */}
        <div style={{ minHeight: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
          <AnimatePresence mode="wait">
            {currentItem && !answered ? (
              <motion.div
                key={`${question.id}-${currentIndex}`}
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                style={{
                  padding: '12px 24px',
                  borderRadius: 14,
                  background: 'white',
                  border: `2.5px solid ${unitColor}`,
                  fontSize: 16,
                  fontWeight: 700,
                  color: '#3C3C3C',
                  boxShadow: `0 4px 12px ${unitColor}25`,
                }}
              >
                {currentItem}
              </motion.div>
            ) : !answered ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ fontSize: 14, fontWeight: 700, color: '#AFAFAF' }}
              >
                All sorted! Hit Check.
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* Undo button */}
        {!answered && currentIndex > 0 && (
          <button
            onClick={handleUndo}
            style={{
              alignSelf: 'center',
              marginBottom: 12,
              padding: '4px 14px',
              borderRadius: 8,
              background: '#F5F5F5',
              border: '1.5px solid #E5E5E5',
              fontSize: 12,
              fontWeight: 700,
              color: '#AFAFAF',
              cursor: 'pointer',
            }}
          >
            ↩ Undo
          </button>
        )}

        {/* Two buckets */}
        <div className="grid grid-cols-2" style={{ gap: 12, flex: 1 }}>
          {bucketLabels.map((label, bIdx) => {
            const bucketItems = items.filter((_, i) => assignments[i] === bIdx);
            const isActive = !answered && currentItem;

            return (
              <motion.button
                key={label}
                onClick={() => handleBucketTap(bIdx)}
                disabled={answered || !currentItem}
                whileTap={isActive ? { scale: 0.97 } : undefined}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 16,
                  border: isActive ? `2.5px dashed ${unitColor}` : '2px solid #E5E5E5',
                  background: isActive ? `${unitColor}08` : '#FAFAFA',
                  padding: '10px 12px',
                  cursor: isActive ? 'pointer' : 'default',
                  transition: 'all 0.15s ease',
                  minHeight: 120,
                }}
              >
                {/* Bucket label */}
                <span style={{
                  fontSize: 13,
                  fontWeight: 800,
                  color: unitColor,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  marginBottom: 8,
                  textAlign: 'center',
                }}>
                  {label}
                </span>

                {/* Sorted items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <AnimatePresence>
                    {bucketItems.map((item) => {
                      const originalIdx = items.indexOf(item);
                      const isCorrect = results ? results[originalIdx] : null;
                      return (
                        <motion.div
                          key={item}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          style={{
                            padding: '6px 10px',
                            borderRadius: 8,
                            fontSize: 12,
                            fontWeight: 700,
                            textAlign: 'center',
                            background: isCorrect === null ? 'white' : isCorrect ? '#D7FFB8' : '#FFDFE0',
                            border: isCorrect === null ? '1.5px solid #E5E5E5' : isCorrect ? '1.5px solid #58CC02' : '1.5px solid #FF4B4B',
                            color: isCorrect === null ? '#3C3C3C' : isCorrect ? '#58A700' : '#EA2B2B',
                          }}
                        >
                          {item} {isCorrect === true ? '✓' : isCorrect === false ? '✗' : ''}
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Counter */}
        <div style={{ textAlign: 'center', marginTop: 8, fontSize: 12, fontWeight: 700, color: '#CFCFCF' }}>
          {Math.min(currentIndex, items.length)}/{items.length} sorted
        </div>
      </div>
    );
  }
);

export default SortBucketsCard;
