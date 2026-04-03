'use client';

import { useState, useCallback, useEffect, useImperativeHandle, forwardRef, useMemo } from 'react';
import { motion, Reorder } from 'framer-motion';
import type { CourseQuestion } from '@/data/course/types';
import type { QuestionCardHandle } from './QuestionCard';
import { GlossaryText } from '@/components/ui/GlossaryText';
import { useLessonColors } from '@/lib/lessonColors';

interface RankOrderCardProps {
  question: CourseQuestion;
  onAnswer: (correct: boolean) => void;
  onSelectionChange: (hasSelection: boolean) => void;
  answered: boolean;
  unitColor: string;
}

const RANK_MEDALS = ['\u{1F947}', '\u{1F948}', '\u{1F949}', '4\uFE0F\u20E3', '5\uFE0F\u20E3', '6\uFE0F\u20E3', '7\uFE0F\u20E3', '8\uFE0F\u20E3'];

function GripHandle({ color }: { color: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 3, padding: '4px 2px', cursor: 'grab', touchAction: 'none' }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{ width: 16, height: 2, borderRadius: 1, background: color, opacity: 0.5 }} />
      ))}
    </div>
  );
}

const RankOrderCard = forwardRef<QuestionCardHandle, RankOrderCardProps>(
  function RankOrderCard({ question, onAnswer, onSelectionChange, answered, unitColor }, ref) {
    const c = useLessonColors();
    const items = question.steps ?? [];
    const correctOrder = question.correctOrder ?? items.map((_, i) => i);
    const criteria = question.rankCriteria ?? 'Rank these items';

    const initialOrder = useMemo(() => {
      const indices = items.map((_, i) => i);
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
      questionType: 'rank-order',
      availableWordCount: 0,
    }), [handleCheck]);

    return (
      <div className="flex flex-col flex-1">
        {/* Action title */}
        <div style={{ fontSize: 12, fontWeight: 800, color: c.subtitle, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 }}>
          Rank from best to worst
        </div>

        <h2 style={{ fontSize: 17, fontWeight: 800, color: c.title, lineHeight: 1.35, margin: '0 0 6px' }}>
          <GlossaryText text={question.question} />
        </h2>

        {/* Ranking criteria badge */}
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '6px 12px', borderRadius: 20, alignSelf: 'flex-start',
            background: `${unitColor}12`, border: `1.5px solid ${unitColor}30`,
            fontSize: 12, fontWeight: 700, color: unitColor, marginBottom: 14,
          }}
        >
          {criteria}
        </motion.div>

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

        {/* Ranked list */}
        <Reorder.Group
          axis="y"
          values={order}
          onReorder={handleReorder}
          style={{ display: 'flex', flexDirection: 'column', gap: 8, listStyle: 'none', padding: 0, margin: 0 }}
        >
          {order.map((itemIdx, rank) => {
            const isCorrect = results ? results[rank] : null;
            const isDragging = dragging === itemIdx;
            const medal = RANK_MEDALS[rank] ?? `${rank + 1}`;

            let bg = c.cardBg;
            let border = `2px solid ${c.border}`;
            let textColor = c.title;

            if (isCorrect !== null) {
              if (isCorrect) {
                bg = '#D7FFB8'; border = '2px solid #58CC02'; textColor = '#58A700';
              } else {
                bg = '#FFDFE0'; border = '2px solid #FF4B4B'; textColor = '#EA2B2B';
              }
            }

            return (
              <Reorder.Item
                key={itemIdx}
                value={itemIdx}
                dragListener={!answered}
                onDragStart={() => setDragging(itemIdx)}
                onDragEnd={() => setDragging(null)}
                initial={{ opacity: 0, y: 10 }}
                animate={
                  isCorrect !== null
                    ? isCorrect
                      ? { opacity: 1, scale: [1, 1.05, 1], y: 0 }
                      : { opacity: 1, x: [0, -6, 6, -4, 4, 0], y: 0 }
                    : { opacity: 1, y: 0 }
                }
                whileDrag={{ scale: 1.04, boxShadow: '0 8px 24px rgba(0,0,0,0.18)', zIndex: 10 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28, delay: results === null ? rank * 0.05 : 0 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '12px 14px', borderRadius: 14, background: bg, border,
                  cursor: answered ? 'default' : 'grab',
                  transition: 'background 0.2s, border 0.2s',
                  ...(isDragging ? { zIndex: 10 } : {}),
                }}
              >
                {/* Medal/rank */}
                <span style={{
                  fontSize: 22, lineHeight: 1, flexShrink: 0, width: 32, textAlign: 'center',
                  filter: isCorrect === false ? 'grayscale(1)' : 'none',
                }}>
                  {medal}
                </span>

                {/* Item text */}
                <span style={{ flex: 1, fontSize: 15, fontWeight: 700, color: textColor, lineHeight: 1.3 }}>
                  {items[itemIdx]}
                </span>

                {/* Correct rank indicator after answer */}
                {isCorrect === false && results && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                      fontSize: 10, fontWeight: 800, color: '#58A700', background: '#D7FFB8',
                      padding: '2px 8px', borderRadius: 8,
                    }}
                  >
                    #{correctOrder.indexOf(itemIdx) + 1}
                  </motion.span>
                )}

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

export default RankOrderCard;
