'use client';

import { useState, useCallback, useEffect, useImperativeHandle, forwardRef, useMemo, useRef } from 'react';
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

    const bucket0Ref = useRef<HTMLDivElement>(null);
    const bucket1Ref = useRef<HTMLDivElement>(null);
    const [highlightBucket, setHighlightBucket] = useState<number | null>(null);

    // Shuffle items for display
    const shuffledOrder = useMemo(() => {
      const indices = items.map((_, i) => i);
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      return indices;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [question.id]);

    // assignments[originalIdx] = bucketIdx or -1 (unsorted)
    const [assignments, setAssignments] = useState<number[]>(() => items.map(() => -1));
    const [results, setResults] = useState<boolean[] | null>(null);

    useEffect(() => {
      setAssignments(items.map(() => -1));
      setResults(null);
    }, [question.id, items.length]);

    const allSorted = assignments.every((a) => a !== -1);
    const unsortedIndices = shuffledOrder.filter((i) => assignments[i] === -1);

    useEffect(() => {
      onSelectionChange(allSorted);
    }, [allSorted, onSelectionChange]);

    // Check which bucket a point is over
    const getBucketAtPoint = useCallback((x: number, y: number): number | null => {
      const refs = [bucket0Ref, bucket1Ref];
      for (let i = 0; i < refs.length; i++) {
        const el = refs[i].current;
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
          return i;
        }
      }
      return null;
    }, []);

    const handleDragEnd = useCallback((originalIdx: number, _info: { point: { x: number; y: number } }) => {
      setHighlightBucket(null);
      if (answered) return;
      const bucket = getBucketAtPoint(_info.point.x, _info.point.y);
      if (bucket !== null) {
        setAssignments((prev) => {
          const next = [...prev];
          next[originalIdx] = bucket;
          return next;
        });
      }
    }, [answered, getBucketAtPoint]);

    const handleDrag = useCallback((_: unknown, info: { point: { x: number; y: number } }) => {
      if (answered) return;
      const bucket = getBucketAtPoint(info.point.x, info.point.y);
      setHighlightBucket(bucket);
    }, [answered, getBucketAtPoint]);

    const handleReturnToPool = useCallback((originalIdx: number) => {
      if (answered) return;
      setAssignments((prev) => {
        const next = [...prev];
        next[originalIdx] = -1;
        return next;
      });
    }, [answered]);

    const handleCheck = useCallback(() => {
      if (!allSorted || answered) return;
      const itemResults = assignments.map((a, i) => a === correctBuckets[i]);
      const allCorrect = itemResults.every(Boolean);
      setResults(itemResults);
      onAnswer(allCorrect);
    }, [allSorted, answered, assignments, correctBuckets, onAnswer]);

    useImperativeHandle(ref, () => ({
      check: handleCheck,
      hasSelection: allSorted,
      selectOption: () => {},
      selectBool: () => {},
      selectWord: () => {},
      questionType: 'sort-buckets',
      availableWordCount: 0,
    }), [handleCheck, allSorted]);

    return (
      <div className="flex flex-col flex-1" style={{ minHeight: '100%' }}>
        {/* Question */}
        <h2 style={{ fontSize: 17, fontWeight: 800, color: '#3C3C3C', lineHeight: 1.35, margin: '0 0 12px' }}>
          {question.question}
        </h2>

        {/* Unsorted items pool */}
        <div style={{ minHeight: 48, marginBottom: 14 }}>
          {unsortedIndices.length > 0 && (
            <div style={{ fontSize: 11, fontWeight: 700, color: '#AFAFAF', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Drag each item to a category
            </div>
          )}
          <div className="flex flex-wrap" style={{ gap: 8 }}>
            <AnimatePresence>
              {unsortedIndices.map((originalIdx) => (
                <motion.div
                  key={`item-${originalIdx}`}
                  drag
                  dragSnapToOrigin
                  dragElastic={0.6}
                  dragMomentum={false}
                  onDrag={handleDrag}
                  onDragEnd={(_, info) => handleDragEnd(originalIdx, info)}
                  whileDrag={{ scale: 1.08, zIndex: 50, boxShadow: '0 8px 24px rgba(0,0,0,0.18)' }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  style={{
                    padding: '10px 18px',
                    borderRadius: 12,
                    background: 'white',
                    border: '2px solid #E5E5E5',
                    fontSize: 14,
                    fontWeight: 700,
                    color: '#3C3C3C',
                    cursor: 'grab',
                    boxShadow: '0 2px 0 #E5E5E5',
                    touchAction: 'none',
                    userSelect: 'none',
                    position: 'relative',
                    zIndex: 10,
                  }}
                >
                  {items[originalIdx]}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          {unsortedIndices.length === 0 && !answered && (
            <div style={{ fontSize: 13, fontWeight: 700, color: '#AFAFAF', textAlign: 'center', padding: 8 }}>
              All sorted! Hit Check.
            </div>
          )}
        </div>

        {/* Two bucket drop zones */}
        <div className="grid grid-cols-2" style={{ gap: 10, flex: 1 }}>
          {bucketLabels.map((label, bIdx) => {
            const bucketRef = bIdx === 0 ? bucket0Ref : bucket1Ref;
            const bucketItemIndices = shuffledOrder.filter((i) => assignments[i] === bIdx);
            const isHighlighted = highlightBucket === bIdx;

            return (
              <div
                key={label}
                ref={bucketRef}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 16,
                  border: isHighlighted
                    ? `2.5px solid ${unitColor}`
                    : '2px dashed #D5D5D5',
                  background: isHighlighted
                    ? `${unitColor}15`
                    : `${unitColor}06`,
                  padding: '10px 10px',
                  minHeight: 110,
                  transition: 'all 0.15s ease',
                  transform: isHighlighted ? 'scale(1.02)' : 'scale(1)',
                }}
              >
                {/* Bucket label */}
                <span style={{
                  fontSize: 12,
                  fontWeight: 800,
                  color: unitColor,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  marginBottom: 8,
                  textAlign: 'center',
                }}>
                  {label}
                </span>

                {/* Items in this bucket */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <AnimatePresence>
                    {bucketItemIndices.map((originalIdx) => {
                      const isCorrect = results ? results[originalIdx] : null;
                      return (
                        <motion.button
                          key={`sorted-${originalIdx}`}
                          layout
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          onClick={() => handleReturnToPool(originalIdx)}
                          disabled={answered}
                          whileTap={!answered ? { scale: 0.93 } : undefined}
                          style={{
                            padding: '8px 10px',
                            borderRadius: 10,
                            fontSize: 13,
                            fontWeight: 700,
                            textAlign: 'center',
                            cursor: answered ? 'default' : 'pointer',
                            border: 'none',
                            background: isCorrect === null ? 'white'
                              : isCorrect ? '#D7FFB8' : '#FFDFE0',
                            boxShadow: isCorrect === null ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                            color: isCorrect === null ? '#3C3C3C'
                              : isCorrect ? '#58A700' : '#EA2B2B',
                          }}
                        >
                          {items[originalIdx]} {isCorrect === true ? '✓' : isCorrect === false ? '✗' : '×'}
                        </motion.button>
                      );
                    })}
                  </AnimatePresence>
                  {bucketItemIndices.length === 0 && (
                    <div style={{
                      padding: '16px 8px',
                      borderRadius: 10,
                      border: '1.5px dashed #D5D5D5',
                      fontSize: 12,
                      fontWeight: 600,
                      color: '#CFCFCF',
                      textAlign: 'center',
                    }}>
                      Drop here
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Counter */}
        <div style={{ textAlign: 'center', marginTop: 8, fontSize: 12, fontWeight: 700, color: '#CFCFCF' }}>
          {items.length - unsortedIndices.length}/{items.length} sorted
        </div>
      </div>
    );
  }
);

export default SortBucketsCard;
