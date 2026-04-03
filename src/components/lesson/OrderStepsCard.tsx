'use client';

import { useState, useCallback, useEffect, useImperativeHandle, forwardRef, useMemo } from 'react';
import { motion, Reorder } from 'framer-motion';
import type { CourseQuestion } from '@/data/course/types';
import type { QuestionCardHandle } from './QuestionCard';
import { GlossaryText } from '@/components/ui/GlossaryText';
import { useLessonColors } from '@/lib/lessonColors';

interface OrderStepsCardProps {
  question: CourseQuestion;
  onAnswer: (correct: boolean) => void;
  onSelectionChange: (hasSelection: boolean) => void;
  answered: boolean;
  unitColor: string;
}

function GripHandle({ color }: { color: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 3, padding: '4px 2px', cursor: 'grab', touchAction: 'none' }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{ width: 16, height: 2, borderRadius: 1, background: color, opacity: 0.5 }} />
      ))}
    </div>
  );
}

const OrderStepsCard = forwardRef<QuestionCardHandle, OrderStepsCardProps>(
  function OrderStepsCard({ question, onAnswer, onSelectionChange, answered, unitColor }, ref) {
    const c = useLessonColors();
    const steps = question.steps ?? [];
    const correctOrder = question.correctOrder ?? steps.map((_, i) => i);

    const initialOrder = useMemo(() => {
      const indices = steps.map((_, i) => i);
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      if (indices.every((v, i) => v === correctOrder[i]) && indices.length >= 2) {
        [indices[0], indices[1]] = [indices[1], indices[0]];
      }
      return indices;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [question.id]);

    const [order, setOrder] = useState<number[]>(initialOrder);
    const [results, setResults] = useState<boolean[] | null>(null);
    const [dragging, setDragging] = useState<number | null>(null);

    useEffect(() => {
      setOrder(initialOrder);
      setResults(null);
      setDragging(null);
    }, [question.id, initialOrder]);

    useEffect(() => {
      onSelectionChange(true);
    }, [onSelectionChange]);

    const handleReorder = useCallback((newOrder: number[]) => {
      if (answered) return;
      setOrder(newOrder);
    }, [answered]);

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
      <div className="flex flex-col flex-1">
        {/* Action title */}
        <div style={{ fontSize: 12, fontWeight: 800, color: c.subtitle, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 }}>
          Put in the right order
        </div>

        <h2 style={{ fontSize: 17, fontWeight: 800, color: c.title, lineHeight: 1.35, margin: '0 0 16px' }}>
          <GlossaryText text={question.question} />
        </h2>

        {question.hint && !answered && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            style={{
              padding: '8px 12px', borderRadius: 10, background: c.hintBg,
              border: '1.5px solid #FFE4B8', fontSize: 13, fontWeight: 600,
              color: c.hintColor, lineHeight: 1.4, marginBottom: 12,
            }}
          >
            <GlossaryText text={question.hint} />
          </motion.div>
        )}

        {/* Step list */}
        <Reorder.Group
          axis="y"
          values={order}
          onReorder={handleReorder}
          style={{ display: 'flex', flexDirection: 'column', gap: 8, listStyle: 'none', padding: 0, margin: 0 }}
        >
          {order.map((stepIdx, position) => {
            const isCorrect = results ? results[position] : null;
            const isDragging = dragging === stepIdx;

            let bg = c.cardBg;
            let border = `2px solid ${c.border}`;
            let textColor = c.title;
            let numberBg = c.emptyBg;
            let numberColor = c.subtitle;

            if (isCorrect !== null) {
              if (isCorrect) {
                bg = '#D7FFB8'; border = '2px solid #58CC02'; textColor = '#58A700';
                numberBg = '#58CC02'; numberColor = 'white';
              } else {
                bg = '#FFDFE0'; border = '2px solid #FF4B4B'; textColor = '#EA2B2B';
                numberBg = '#FF4B4B'; numberColor = 'white';
              }
            }

            return (
              <Reorder.Item
                key={stepIdx}
                value={stepIdx}
                dragListener={!answered}
                onDragStart={() => setDragging(stepIdx)}
                onDragEnd={() => setDragging(null)}
                initial={{ opacity: 0, y: 10 }}
                animate={
                  isCorrect !== null
                    ? isCorrect
                      ? { opacity: 1, scale: [1, 1.04, 1], y: 0 }
                      : { opacity: 1, x: [0, -6, 6, -4, 4, 0], y: 0 }
                    : { opacity: 1, y: 0 }
                }
                whileDrag={{ scale: 1.04, boxShadow: '0 8px 24px rgba(0,0,0,0.18)', zIndex: 10 }}
                transition={isCorrect !== null ? { type: 'tween', duration: 0.35 } : { type: 'spring', stiffness: 400, damping: 28, delay: results === null ? position * 0.05 : 0 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '12px 14px', borderRadius: 14, background: bg, border,
                  cursor: answered ? 'default' : 'grab',
                  transition: 'background 0.2s, border 0.2s',
                  ...(isDragging ? { zIndex: 10 } : {}),
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
                <span style={{ flex: 1, fontSize: 15, fontWeight: 700, color: textColor, lineHeight: 1.3 }}>
                  {steps[stepIdx]}
                </span>

                {/* Drag handle */}
                {!answered && <GripHandle color={unitColor} />}
              </Reorder.Item>
            );
          })}
        </Reorder.Group>
      </div>
    );
  }
);

export default OrderStepsCard;
