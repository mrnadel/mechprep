'use client';

import { useState, useCallback, useEffect, useImperativeHandle, forwardRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import type { CourseQuestion } from '@/data/course/types';
import type { QuestionCardHandle } from './QuestionCard';
import { MoneyText } from '@/components/ui/MoneyText';
import { useLessonColors } from '@/lib/lessonColors';

interface PickTheBestCardProps {
  question: CourseQuestion;
  onAnswer: (correct: boolean) => void;
  onSelectionChange: (hasSelection: boolean) => void;
  answered: boolean;
  unitColor: string;
}

const PickTheBestCard = forwardRef<QuestionCardHandle, PickTheBestCardProps>(
  function PickTheBestCard({ question, onAnswer, onSelectionChange, answered, unitColor }, ref) {
    const c = useLessonColors();
    const options = question.options ?? [];
    const correctIndex = question.correctIndex ?? 0;

    // Shuffle display order
    const shuffledIndices = useMemo(() => {
      const indices = options.map((_, i) => i);
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      return indices;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [question.id]);

    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [localCorrect, setLocalCorrect] = useState<boolean | null>(null);

    useEffect(() => {
      setSelectedIndex(null);
      setLocalCorrect(null);
    }, [question.id]);

    const hasSelection = selectedIndex !== null;

    useEffect(() => {
      onSelectionChange(hasSelection);
    }, [hasSelection, onSelectionChange]);

    const handleCheck = useCallback(() => {
      if (answered || !hasSelection) return;
      const correct = selectedIndex !== null && shuffledIndices[selectedIndex] === correctIndex;
      setLocalCorrect(correct);
      onAnswer(correct);
    }, [answered, hasSelection, selectedIndex, shuffledIndices, correctIndex, onAnswer]);

    useImperativeHandle(ref, () => ({
      check: handleCheck,
      hasSelection,
      selectOption: (index: number) => {
        if (!answered && index < shuffledIndices.length) {
          setSelectedIndex(index);
        }
      },
      selectBool: () => {},
      selectWord: () => {},
      questionType: 'pick-the-best',
      availableWordCount: 0,
    }), [handleCheck, hasSelection, answered, shuffledIndices]);

    return (
      <div className="flex flex-col flex-1" style={{ minHeight: '100%' }}>
        {/* Action title */}
        <div style={{ fontSize: 12, fontWeight: 800, color: c.subtitle, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 }}>
          Pick the best answer
        </div>

        <h2 style={{ fontSize: 17, fontWeight: 800, color: c.title, lineHeight: 1.35, margin: '0 0 6px' }}>
          <MoneyText text={question.question} />
        </h2>

        {/* "Pick the best" badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 400, damping: 25 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, alignSelf: 'flex-start',
            padding: '6px 12px', borderRadius: 20,
            background: 'linear-gradient(135deg, #FFF9E8 0%, #FFF3D0 100%)',
            border: '1.5px solid #FFD166',
            fontSize: 12, fontWeight: 800, color: '#B8860B', marginBottom: 10,
          }}
        >
          All are valid, pick the BEST
        </motion.div>

        {question.hint && !answered && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            style={{
              padding: '8px 12px', borderRadius: 10, background: c.hintBg,
              border: '1.5px solid #FFE4B8', fontSize: 13, fontWeight: 600,
              color: c.hintColor, lineHeight: 1.4, marginBottom: 4,
            }}
          >
            <MoneyText text={question.hint} />
          </motion.div>
        )}

        <div style={{ flex: 1, minHeight: 8 }} />

        {/* Options */}
        <div className="flex flex-col" style={{ gap: 8 }}>
          {shuffledIndices.map((originalIdx, displayIdx) => {
            const option = options[originalIdx];
            const isSelected = selectedIndex === displayIdx;
            const isBest = originalIdx === correctIndex;

            let bg = c.cardBg;
            let border = `2px solid ${c.border}`;
            let textColor = c.title;
            let starColor = '#D5D5D5';
            let shadow = '0 3px 0 #DCDCDC';

            if (answered && localCorrect !== null) {
              if (isBest) {
                bg = 'linear-gradient(135deg, #D7FFB8 0%, #C5F7A0 100%)';
                border = '2.5px solid #58CC02';
                textColor = '#58A700';
                starColor = '#FFD700';
                shadow = '0 0 16px rgba(88,204,2,0.3)';
              } else if (isSelected && !isBest) {
                bg = '#FFF9E8';
                border = '2px solid #F59E0B';
                textColor = '#B8860B';
                starColor = '#F59E0B';
                shadow = 'none';
              } else {
                bg = '#F8F8F8';
                border = '2px solid #EFEFEF';
                textColor = c.subtitle;
                starColor = '#E5E5E5';
                shadow = 'none';
              }
            } else if (isSelected) {
              bg = c.cardBg;
              border = `2.5px solid ${unitColor}`;
              starColor = '#FFD700';
              shadow = `0 3px 0 color-mix(in srgb, ${unitColor} 65%, black)`;
            }

            const revealAnimation = answered && localCorrect !== null
              ? isBest
                ? { opacity: 1, y: 0, scale: [1, 1.06, 1] }
                : isSelected && !isBest
                  ? { opacity: 1, y: 0, x: [0, -4, 4, -2, 2, 0] }
                  : { opacity: 0.6, y: 0, scale: 0.98 }
              : { opacity: 1, y: 0 };

            return (
              <motion.button
                key={originalIdx}
                onClick={() => !answered && setSelectedIndex(displayIdx)}
                disabled={answered}
                initial={{ opacity: 0, y: 16 }}
                animate={revealAnimation}
                transition={
                  answered && localCorrect !== null
                    ? { duration: 0.35 }
                    : { delay: displayIdx * 0.07, type: 'spring', stiffness: 400, damping: 25 }
                }
                whileTap={!answered ? { y: 3, boxShadow: '0 0 0 transparent', transition: { duration: 0.06 } } : undefined}
                className="w-full text-left flex items-center"
                style={{
                  padding: '12px 14px', borderRadius: 14, background: bg, border,
                  gap: 12, cursor: answered ? 'default' : 'pointer',
                  transition: 'border 0.2s, box-shadow 0.2s',
                  boxShadow: shadow,
                }}
              >
                {/* Star indicator */}
                <motion.span
                  animate={isSelected && !answered ? { scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    fontSize: 20, flexShrink: 0, width: 28, textAlign: 'center',
                    color: starColor, transition: 'color 0.2s',
                    filter: starColor === '#E5E5E5' || starColor === '#D5D5D5' ? 'grayscale(1) opacity(0.4)' : 'none',
                  }}
                >
                  ⭐
                </motion.span>
                <span style={{ fontSize: 14, fontWeight: 700, color: textColor, lineHeight: 1.3 }}>
                  <MoneyText text={option} />
                </span>

                {/* "BEST" badge after answer */}
                {answered && isBest && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 500, damping: 20 }}
                    style={{
                      marginLeft: 'auto', flexShrink: 0,
                      padding: '3px 8px', borderRadius: 8,
                      background: '#58CC02', color: 'white',
                      fontSize: 10, fontWeight: 900, letterSpacing: 0.5,
                    }}
                  >
                    BEST
                  </motion.span>
                )}

                {/* "Good" badge for wrong-but-valid */}
                {answered && isSelected && !isBest && localCorrect !== null && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{
                      marginLeft: 'auto', flexShrink: 0,
                      padding: '3px 8px', borderRadius: 8,
                      background: '#F59E0B', color: 'white',
                      fontSize: 10, fontWeight: 900, letterSpacing: 0.5,
                    }}
                  >
                    GOOD
                  </motion.span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  }
);

export default PickTheBestCard;
