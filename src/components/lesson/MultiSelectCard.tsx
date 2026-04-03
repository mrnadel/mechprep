'use client';

import { useState, useCallback, useEffect, useImperativeHandle, forwardRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import type { CourseQuestion } from '@/data/course/types';
import type { QuestionCardHandle } from './QuestionCard';
import { GlossaryText } from '@/components/ui/GlossaryText';
import { useLessonColors } from '@/lib/lessonColors';

interface MultiSelectCardProps {
  question: CourseQuestion;
  onAnswer: (correct: boolean) => void;
  onSelectionChange: (hasSelection: boolean) => void;
  answered: boolean;
  unitColor: string;
}

const MultiSelectCard = forwardRef<QuestionCardHandle, MultiSelectCardProps>(
  function MultiSelectCard({ question, onAnswer, onSelectionChange, answered, unitColor }, ref) {
    const c = useLessonColors();
    const options = question.options ?? [];
    const correctIndices = question.correctIndices ?? [];

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

    const [selected, setSelected] = useState<Set<number>>(new Set());
    const [localCorrect, setLocalCorrect] = useState<boolean | null>(null);

    useEffect(() => {
      setSelected(new Set());
      setLocalCorrect(null);
    }, [question.id]);

    const hasSelection = selected.size > 0;

    useEffect(() => {
      onSelectionChange(hasSelection);
    }, [hasSelection, onSelectionChange]);

    const toggleOption = useCallback((originalIdx: number) => {
      if (answered) return;
      setSelected(prev => {
        const next = new Set(prev);
        if (next.has(originalIdx)) {
          next.delete(originalIdx);
        } else {
          next.add(originalIdx);
        }
        return next;
      });
    }, [answered]);

    const handleCheck = useCallback(() => {
      if (answered || !hasSelection) return;
      const correctSet = new Set(correctIndices);
      const isCorrect = selected.size === correctSet.size &&
        [...selected].every(i => correctSet.has(i));
      setLocalCorrect(isCorrect);
      onAnswer(isCorrect);
    }, [answered, hasSelection, selected, correctIndices, onAnswer]);

    useImperativeHandle(ref, () => ({
      check: handleCheck,
      hasSelection,
      selectOption: (index: number) => {
        if (!answered && index < shuffledIndices.length) {
          toggleOption(shuffledIndices[index]);
        }
      },
      selectBool: () => {},
      selectWord: () => {},
      questionType: 'multi-select',
      availableWordCount: 0,
    }), [handleCheck, hasSelection, answered, shuffledIndices, toggleOption]);

    const correctSet = useMemo(() => new Set(correctIndices), [correctIndices]);

    return (
      <div className="flex flex-col flex-1" style={{ minHeight: '100%' }}>
        {/* Question */}
        <div style={{ marginBottom: 6 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: c.subtitle, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 }}>
            Select all that apply ({correctIndices.length} correct)
          </div>
          <h2 style={{ fontSize: 17, fontWeight: 800, color: c.title, lineHeight: 1.35, margin: 0 }}>
            <GlossaryText text={question.question} />
          </h2>
        </div>

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
            <GlossaryText text={question.hint} />
          </motion.div>
        )}

        {/* Spacer */}
        <div style={{ flex: 1, minHeight: 8 }} />

        {/* Options */}
        <div className="flex flex-col" style={{ gap: 8 }}>
          {shuffledIndices.map((originalIdx, displayIdx) => {
            const option = options[originalIdx];
            const isSelected = selected.has(originalIdx);
            const isCorrectOption = correctSet.has(originalIdx);

            let bg = c.cardBg;
            let border = `2px solid ${c.border}`;
            let textColor = c.title;
            let checkBg = c.emptyBg;
            let checkColor = c.muted;
            let checkContent = '';
            let shadow = '0 3px 0 #DCDCDC';

            if (answered && localCorrect !== null) {
              if (isCorrectOption) {
                bg = '#D7FFB8'; border = '2px solid #58CC02'; textColor = '#58A700';
                checkBg = '#58CC02'; checkColor = 'white'; checkContent = '✓';
                shadow = '0 0 12px rgba(88, 204, 2, 0.25)';
              } else if (isSelected && !isCorrectOption) {
                bg = '#FFDFE0'; border = '2px solid #FF4B4B'; textColor = '#EA2B2B';
                checkBg = '#FF4B4B'; checkColor = 'white'; checkContent = '✗';
                shadow = 'none';
              } else {
                bg = '#F5F5F5'; border = '2px solid #EFEFEF'; textColor = c.muted;
                checkBg = '#E5E5E5'; checkColor = c.muted; checkContent = '';
                shadow = 'none';
              }
            } else if (isSelected) {
              bg = c.cardBg; border = `2.5px solid ${unitColor}`;
              checkBg = unitColor; checkColor = 'white'; checkContent = '✓';
              shadow = `0 3px 0 color-mix(in srgb, ${unitColor} 65%, black)`;
            }

            const revealAnimation = answered && localCorrect !== null
              ? isCorrectOption
                ? { opacity: 1, y: 0, scale: [1, 1.04, 1] }
                : isSelected && !isCorrectOption
                  ? { opacity: 1, y: 0, x: [0, -6, 6, -4, 4, 0] }
                  : { opacity: 0.5, y: 0, scale: 0.98 }
              : { opacity: 1, y: 0 };

            return (
              <motion.button
                key={originalIdx}
                onClick={() => toggleOption(originalIdx)}
                disabled={answered}
                initial={{ opacity: 0, y: 16 }}
                animate={revealAnimation}
                transition={
                  answered && localCorrect !== null
                    ? { type: 'tween', duration: 0.35 }
                    : { delay: displayIdx * 0.06, type: 'spring', stiffness: 400, damping: 25 }
                }
                whileTap={!answered ? { y: 3, boxShadow: '0 0 0 transparent', transition: { duration: 0.06 } } : undefined}
                className="w-full text-left flex items-center"
                style={{
                  padding: '10px 14px', borderRadius: 14, background: bg, border,
                  gap: 12, cursor: answered ? 'default' : 'pointer',
                  transition: 'background 0.2s, border 0.2s, box-shadow 0.2s',
                  boxShadow: shadow,
                }}
              >
                {/* Checkbox */}
                <motion.span
                  className="flex-shrink-0 flex items-center justify-center"
                  animate={isSelected && !answered ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    width: 26, height: 26, borderRadius: 7,
                    background: checkBg, color: checkColor,
                    fontSize: 13, fontWeight: 800,
                    border: !isSelected && !answered ? '2px solid #D5D5D5' : 'none',
                    transition: 'background 0.2s, color 0.2s, border 0.2s',
                  }}
                >
                  {checkContent}
                </motion.span>
                <span style={{ fontSize: 14.5, fontWeight: 700, color: textColor, lineHeight: 1.3 }}>
                  {option}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  }
);

export default MultiSelectCard;
