'use client';

import { useState, useCallback, useEffect, useImperativeHandle, forwardRef, useMemo } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import type { CourseQuestion } from '@/data/course/types';
import type { QuestionCardHandle } from './QuestionCard';
import { MoneyText } from '@/components/ui/MoneyText';

interface OrderStepsCardProps {
  question: CourseQuestion;
  onAnswer: (correct: boolean) => void;
  onSelectionChange: (hasSelection: boolean) => void;
  answered: boolean;
  unitColor: string;
}

const OrderStepsCard = forwardRef<QuestionCardHandle, OrderStepsCardProps>(
  function OrderStepsCard({ question, onAnswer, onSelectionChange, answered, unitColor }, ref) {
    const steps = question.steps ?? [];
    const correctOrder = question.correctOrder ?? steps.map((_, i) => i);

    // Shuffle initial order
    const initialOrder = useMemo(() => {
      const indices = steps.map((_, i) => i);
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      // Ensure shuffled order isn't already correct
      if (indices.every((v, i) => v === correctOrder[i])) {
        // Swap first two to break the correct order
        if (indices.length >= 2) {
          [indices[0], indices[1]] = [indices[1], indices[0]];
        }
      }
      return indices;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [question.id]);

    const [order, setOrder] = useState<number[]>(initialOrder);
    const [results, setResults] = useState<boolean[] | null>(null);

    useEffect(() => {
      setOrder(initialOrder);
      setResults(null);
    }, [question.id, initialOrder]);

    // Always has a "selection" since all items are always placed
    useEffect(() => {
      onSelectionChange(true);
    }, [onSelectionChange]);

    const moveItem = useCallback((fromIdx: number, direction: -1 | 1) => {
      if (answered) return;
      const toIdx = fromIdx + direction;
      if (toIdx < 0 || toIdx >= order.length) return;
      setOrder(prev => {
        const next = [...prev];
        [next[fromIdx], next[toIdx]] = [next[toIdx], next[fromIdx]];
        return next;
      });
    }, [answered, order.length]);

    const handleCheck = useCallback(() => {
      if (answered) return;
      const itemResults = order.map((v, i) => v === correctOrder[i]);
      const allCorrect = itemResults.every(Boolean);
      setResults(itemResults);
      onAnswer(allCorrect);
    }, [answered, order, correctOrder, onAnswer]);

    useImperativeHandle(ref, () => ({
      check: handleCheck,
      hasSelection: true,
      selectOption: () => {},
      selectBool: () => {},
      selectWord: () => {},
      questionType: 'order-steps',
      availableWordCount: 0,
    }), [handleCheck]);

    return (
      <div className="flex flex-col flex-1" style={{ minHeight: '100%' }}>
        <h2 style={{ fontSize: 17, fontWeight: 800, color: '#3C3C3C', lineHeight: 1.35, margin: '0 0 12px' }}>
          <MoneyText text={question.question} />
        </h2>

        {question.hint && !answered && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            style={{
              padding: '8px 12px', borderRadius: 10, background: '#FFF9E8',
              border: '1.5px solid #FFE4B8', fontSize: 13, fontWeight: 600,
              color: '#B56E00', lineHeight: 1.4, marginBottom: 8,
            }}
          >
            <MoneyText text={question.hint} />
          </motion.div>
        )}

        <div style={{ flex: 1, minHeight: 8 }} />

        {/* Step list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <AnimatePresence>
            {order.map((stepIdx, position) => {
              const isCorrect = results ? results[position] : null;

              let bg = 'white';
              let border = '2px solid #E5E5E5';
              let textColor = '#3C3C3C';
              let numberBg = '#F0F0F0';
              let numberColor = '#AFAFAF';
              let shadow = 'none';

              if (isCorrect !== null) {
                if (isCorrect) {
                  bg = '#D7FFB8'; border = '2px solid #58CC02'; textColor = '#58A700';
                  numberBg = '#58CC02'; numberColor = 'white';
                  shadow = '0 0 12px rgba(88, 204, 2, 0.25)';
                } else {
                  bg = '#FFDFE0'; border = '2px solid #FF4B4B'; textColor = '#EA2B2B';
                  numberBg = '#FF4B4B'; numberColor = 'white';
                }
              }

              const revealAnimation = isCorrect !== null
                ? isCorrect
                  ? { opacity: 1, scale: [1, 1.04, 1] }
                  : { opacity: 1, x: [0, -6, 6, -4, 4, 0] }
                : { opacity: 1 };

              return (
                <motion.div
                  key={`step-${stepIdx}`}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={revealAnimation}
                  transition={{ type: 'spring', stiffness: 400, damping: 25, delay: position * 0.05 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 12px', borderRadius: 14, background: bg, border,
                    boxShadow: shadow, transition: 'background 0.2s, border 0.2s, box-shadow 0.2s',
                  }}
                >
                  {/* Step number */}
                  <span style={{
                    width: 28, height: 28, borderRadius: 8, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    fontSize: 12, fontWeight: 800, background: numberBg, color: numberColor,
                    transition: 'background 0.2s, color 0.2s',
                  }}>
                    {position + 1}
                  </span>

                  {/* Step text */}
                  <span style={{ flex: 1, fontSize: 14, fontWeight: 700, color: textColor, lineHeight: 1.3 }}>
                    <MoneyText text={steps[stepIdx]} />
                  </span>

                  {/* Move buttons */}
                  {!answered && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flexShrink: 0 }}>
                      <motion.button
                        whileTap={{ scale: 0.85 }}
                        onClick={() => moveItem(position, -1)}
                        disabled={position === 0}
                        style={{
                          width: 28, height: 24, borderRadius: 6, border: 'none',
                          background: position === 0 ? '#F0F0F0' : `${unitColor}15`,
                          color: position === 0 ? '#CFCFCF' : unitColor,
                          fontSize: 14, fontWeight: 800, cursor: position === 0 ? 'default' : 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                      >
                        ▲
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.85 }}
                        onClick={() => moveItem(position, 1)}
                        disabled={position === order.length - 1}
                        style={{
                          width: 28, height: 24, borderRadius: 6, border: 'none',
                          background: position === order.length - 1 ? '#F0F0F0' : `${unitColor}15`,
                          color: position === order.length - 1 ? '#CFCFCF' : unitColor,
                          fontSize: 14, fontWeight: 800, cursor: position === order.length - 1 ? 'default' : 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                      >
                        ▼
                      </motion.button>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    );
  }
);

export default OrderStepsCard;
