'use client';

import { useState, useCallback, useEffect, useImperativeHandle, forwardRef, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CourseQuestion } from '@/data/course/types';
import type { QuestionCardHandle } from './QuestionCard';
import { MoneyText } from '@/components/ui/MoneyText';

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
    // Track the last known pointer position during drag (more reliable than onDragEnd info)
    const lastDragPoint = useRef<{ x: number; y: number } | null>(null);
    // Tap-to-assign: selected item waiting to be placed
    const [selectedItem, setSelectedItem] = useState<number | null>(null);

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
      setSelectedItem(null);
    }, [question.id, items.length]);

    const allSorted = assignments.every((a) => a !== -1);
    const unsortedIndices = shuffledOrder.filter((i) => assignments[i] === -1);

    useEffect(() => {
      onSelectionChange(allSorted);
    }, [allSorted, onSelectionChange]);

    // Check which bucket a point is over (with generous padding for easier drops)
    const getBucketAtPoint = useCallback((x: number, y: number): number | null => {
      const refs = [bucket0Ref, bucket1Ref];
      const PAD = 18; // extra hit area
      for (let i = 0; i < refs.length; i++) {
        const el = refs[i].current;
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (
          x >= rect.left - PAD &&
          x <= rect.right + PAD &&
          y >= rect.top - PAD &&
          y <= rect.bottom + PAD
        ) {
          return i;
        }
      }
      return null;
    }, []);

    const handleDrag = useCallback((_: unknown, info: { point: { x: number; y: number } }) => {
      if (answered) return;
      lastDragPoint.current = { x: info.point.x, y: info.point.y };
      const bucket = getBucketAtPoint(info.point.x, info.point.y);
      setHighlightBucket(bucket);
    }, [answered, getBucketAtPoint]);

    const handleDragEnd = useCallback((originalIdx: number) => {
      const point = lastDragPoint.current;
      setHighlightBucket(null);
      lastDragPoint.current = null;
      if (answered || !point) return;
      const bucket = getBucketAtPoint(point.x, point.y);
      if (bucket !== null) {
        setAssignments((prev) => {
          const next = [...prev];
          next[originalIdx] = bucket;
          return next;
        });
        setSelectedItem(null);
      }
    }, [answered, getBucketAtPoint]);

    // Tap item to select it (tap-to-assign fallback)
    const handleItemTap = useCallback((originalIdx: number) => {
      if (answered) return;
      setSelectedItem((prev) => prev === originalIdx ? null : originalIdx);
    }, [answered]);

    // Tap bucket to assign the selected item
    const handleBucketTap = useCallback((bucketIdx: number) => {
      if (answered || selectedItem === null) return;
      setAssignments((prev) => {
        const next = [...prev];
        next[selectedItem] = bucketIdx;
        return next;
      });
      setSelectedItem(null);
    }, [answered, selectedItem]);

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
          <MoneyText text={question.question} />
        </h2>

        {/* Spacer pushes buckets + items toward the bottom */}
        <div style={{ flex: 1, minHeight: 8 }} />

        {/* Two bucket drop zones */}
        <div className="grid grid-cols-2" style={{ gap: 10 }}>
          {bucketLabels.map((label, bIdx) => {
            const bucketRef = bIdx === 0 ? bucket0Ref : bucket1Ref;
            const bucketItemIndices = shuffledOrder.filter((i) => assignments[i] === bIdx);
            const isHighlighted = highlightBucket === bIdx;
            const isTargetable = selectedItem !== null;

            return (
              <div
                key={label}
                ref={bucketRef}
                onClick={() => handleBucketTap(bIdx)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 16,
                  border: isHighlighted || isTargetable
                    ? `2.5px solid ${unitColor}`
                    : '2px dashed #D5D5D5',
                  background: isHighlighted
                    ? `${unitColor}15`
                    : isTargetable
                      ? `${unitColor}08`
                      : `${unitColor}06`,
                  padding: '10px 10px',
                  minHeight: 100,
                  transition: 'all 0.15s ease',
                  transform: isHighlighted ? 'scale(1.02)' : 'scale(1)',
                  cursor: isTargetable ? 'pointer' : 'default',
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
                          initial={{ opacity: 0, scale: 0.7, y: -8 }}
                          animate={
                            isCorrect !== null
                              ? isCorrect
                                ? { opacity: 1, scale: [1, 1.08, 1], y: 0 }
                                : { opacity: 1, scale: 1, y: 0, x: [0, -4, 4, -2, 2, 0] }
                              : { opacity: 1, scale: 1, y: 0 }
                          }
                          exit={{ opacity: 0, scale: 0.7, y: -8 }}
                          transition={
                            isCorrect !== null
                              ? { duration: 0.35 }
                              : { type: 'spring', stiffness: 500, damping: 25 }
                          }
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReturnToPool(originalIdx);
                          }}
                          disabled={answered}
                          whileTap={!answered ? { scale: 0.9, transition: { duration: 0.1 } } : undefined}
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
                            boxShadow: isCorrect === null ? '0 1px 3px rgba(0,0,0,0.08)'
                              : isCorrect ? '0 0 10px rgba(88, 204, 2, 0.25)' : 'none',
                            color: isCorrect === null ? '#3C3C3C'
                              : isCorrect ? '#58A700' : '#EA2B2B',
                            transition: 'background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease',
                          }}
                        >
                          <MoneyText text={items[originalIdx]} /> {isCorrect === true ? '✓' : isCorrect === false ? '✗' : '×'}
                        </motion.button>
                      );
                    })}
                  </AnimatePresence>
                  {bucketItemIndices.length === 0 && (
                    <div style={{
                      padding: '14px 8px',
                      borderRadius: 10,
                      border: isTargetable ? `1.5px dashed ${unitColor}` : '1.5px dashed #D5D5D5',
                      fontSize: 12,
                      fontWeight: 600,
                      color: isTargetable ? unitColor : '#CFCFCF',
                      textAlign: 'center',
                      transition: 'all 0.15s ease',
                    }}>
                      {isTargetable ? 'Tap here' : 'Drop here'}
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

        {/* Unsorted items pool - at bottom */}
        <div style={{ minHeight: 48, paddingTop: 10 }}>
          {unsortedIndices.length > 0 && (
            <div style={{ fontSize: 11, fontWeight: 700, color: '#AFAFAF', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Drag or tap to sort
            </div>
          )}
          <div className="flex flex-wrap" style={{ gap: 8 }}>
            <AnimatePresence>
              {unsortedIndices.map((originalIdx) => {
                const isSelected = selectedItem === originalIdx;
                return (
                  <motion.div
                    key={`item-${originalIdx}`}
                    drag
                    dragSnapToOrigin
                    dragMomentum={false}
                    onDrag={handleDrag}
                    onDragEnd={() => handleDragEnd(originalIdx)}
                    onTap={() => handleItemTap(originalIdx)}
                    whileDrag={{ scale: 1.08, zIndex: 50, boxShadow: '0 8px 24px rgba(0,0,0,0.18)' }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    style={{
                      padding: '10px 18px',
                      borderRadius: 12,
                      background: isSelected ? `${unitColor}10` : 'white',
                      border: isSelected ? `2.5px solid ${unitColor}` : '2px solid #E5E5E5',
                      fontSize: 14,
                      fontWeight: 700,
                      color: '#3C3C3C',
                      cursor: 'grab',
                      boxShadow: isSelected ? `0 2px 0 ${unitColor}` : '0 2px 0 #E5E5E5',
                      touchAction: 'none',
                      userSelect: 'none',
                      position: 'relative',
                      zIndex: 10,
                    }}
                  >
                    <MoneyText text={items[originalIdx]} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          {unsortedIndices.length === 0 && !answered && (
            <div style={{ fontSize: 13, fontWeight: 700, color: '#AFAFAF', textAlign: 'center', padding: 8 }}>
              All sorted! Hit Check.
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default SortBucketsCard;
