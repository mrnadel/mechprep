'use client';

import { useState, useCallback, useEffect, useImperativeHandle, forwardRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CourseQuestion } from '@/data/course/types';
import type { QuestionCardHandle } from './QuestionCard';
import { MoneyText } from '@/components/ui/MoneyText';

interface RankOrderCardProps {
  question: CourseQuestion;
  onAnswer: (correct: boolean) => void;
  onSelectionChange: (hasSelection: boolean) => void;
  answered: boolean;
  unitColor: string;
}

const RANK_MEDALS = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣'];
const RANK_COLORS = ['#FFD700', '#C0C0C0', '#CD7F32', '#888', '#888', '#888', '#888', '#888'];

const RankOrderCard = forwardRef<QuestionCardHandle, RankOrderCardProps>(
  function RankOrderCard({ question, onAnswer, onSelectionChange, answered, unitColor }, ref) {
    const items = question.steps ?? [];
    const correctOrder = question.correctOrder ?? items.map((_, i) => i);
    const criteria = question.rankCriteria ?? 'Rank these items';

    // Shuffle initial order
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

    useEffect(() => {
      setOrder(initialOrder);
      setResults(null);
    }, [question.id, initialOrder]);

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
      questionType: 'rank-order',
      availableWordCount: 0,
    }), [handleCheck]);

    return (
      <div className="flex flex-col flex-1" style={{ minHeight: '100%' }}>
        {/* Action title */}
        <div style={{ fontSize: 12, fontWeight: 800, color: '#AFAFAF', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 }}>
          Rank from best to worst
        </div>

        <h2 style={{ fontSize: 17, fontWeight: 800, color: '#3C3C3C', lineHeight: 1.35, margin: '0 0 6px' }}>
          <MoneyText text={question.question} />
        </h2>

        {/* Ranking criteria badge */}
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '6px 12px', borderRadius: 20, alignSelf: 'flex-start',
            background: `${unitColor}12`, border: `1.5px solid ${unitColor}30`,
            fontSize: 12, fontWeight: 700, color: unitColor, marginBottom: 10,
          }}
        >
          📊 {criteria}
        </motion.div>

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

        {/* Ranked list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <AnimatePresence>
            {order.map((itemIdx, rank) => {
              const isCorrect = results ? results[rank] : null;
              const medal = RANK_MEDALS[rank] ?? `${rank + 1}`;
              const medalColor = RANK_COLORS[rank] ?? '#888';

              let bg = 'white';
              let border = '2px solid #E5E5E5';
              let textColor = '#3C3C3C';
              let shadow = 'none';

              if (isCorrect !== null) {
                if (isCorrect) {
                  bg = '#D7FFB8'; border = '2px solid #58CC02'; textColor = '#58A700';
                  shadow = '0 0 12px rgba(88,204,2,0.25)';
                } else {
                  bg = '#FFDFE0'; border = '2px solid #FF4B4B'; textColor = '#EA2B2B';
                }
              }

              const revealAnimation = isCorrect !== null
                ? isCorrect
                  ? { opacity: 1, scale: [1, 1.05, 1] }
                  : { opacity: 1, x: [0, -6, 6, -4, 4, 0] }
                : { opacity: 1 };

              return (
                <motion.div
                  key={`rank-${itemIdx}`}
                  layout
                  initial={{ opacity: 0, x: -16 }}
                  animate={revealAnimation}
                  transition={{ type: 'spring', stiffness: 400, damping: 25, delay: rank * 0.05 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 12px', borderRadius: 14, background: bg, border,
                    boxShadow: shadow, transition: 'background 0.2s, border 0.2s, box-shadow 0.2s',
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
                  <span style={{ flex: 1, fontSize: 14, fontWeight: 700, color: textColor, lineHeight: 1.3 }}>
                    <MoneyText text={items[itemIdx]} />
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

                  {/* Move buttons */}
                  {!answered && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flexShrink: 0 }}>
                      <motion.button
                        whileTap={rank !== 0 ? { y: 2, boxShadow: '0 0 0 transparent', transition: { duration: 0.06 } } : undefined}
                        onClick={() => moveItem(rank, -1)}
                        disabled={rank === 0}
                        style={{
                          width: 28, height: 24, borderRadius: 6, border: 'none',
                          background: rank === 0 ? '#F0F0F0' : `${unitColor}15`,
                          color: rank === 0 ? '#CFCFCF' : unitColor,
                          fontSize: 14, fontWeight: 800, cursor: rank === 0 ? 'default' : 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          boxShadow: rank === 0 ? 'none' : `0 2px 0 color-mix(in srgb, ${unitColor} 65%, black)`,
                        }}
                      >
                        ▲
                      </motion.button>
                      <motion.button
                        whileTap={rank !== order.length - 1 ? { y: 2, boxShadow: '0 0 0 transparent', transition: { duration: 0.06 } } : undefined}
                        onClick={() => moveItem(rank, 1)}
                        disabled={rank === order.length - 1}
                        style={{
                          width: 28, height: 24, borderRadius: 6, border: 'none',
                          background: rank === order.length - 1 ? '#F0F0F0' : `${unitColor}15`,
                          color: rank === order.length - 1 ? '#CFCFCF' : unitColor,
                          fontSize: 14, fontWeight: 800, cursor: rank === order.length - 1 ? 'default' : 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          boxShadow: rank === order.length - 1 ? 'none' : `0 2px 0 color-mix(in srgb, ${unitColor} 65%, black)`,
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

export default RankOrderCard;
