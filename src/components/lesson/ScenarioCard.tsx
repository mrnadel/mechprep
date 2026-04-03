'use client';

import { useState, useCallback, useEffect, useImperativeHandle, forwardRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import type { CourseQuestion } from '@/data/course/types';
import type { QuestionCardHandle } from './QuestionCard';
import { GlossaryText } from '@/components/ui/GlossaryText';
import { useLessonColors } from '@/lib/lessonColors';

interface ScenarioCardProps {
  question: CourseQuestion;
  onAnswer: (correct: boolean) => void;
  onSelectionChange: (hasSelection: boolean) => void;
  answered: boolean;
  unitColor: string;
}

const ScenarioCard = forwardRef<QuestionCardHandle, ScenarioCardProps>(
  function ScenarioCard({ question, onAnswer, onSelectionChange, answered, unitColor }, ref) {
    const c = useLessonColors();
    const options = question.options ?? [];
    const correctIndex = question.correctIndex ?? 0;
    const scenario = question.scenario ?? '';

    // Shuffle options
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
      questionType: 'scenario',
      availableWordCount: 0,
    }), [handleCheck, hasSelection, answered, shuffledIndices]);

    return (
      <div className="flex flex-col flex-1" style={{ minHeight: '100%' }}>
        {/* Action title */}
        <div style={{ fontSize: 12, fontWeight: 800, color: c.subtitle, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 }}>
          Read the scenario and decide
        </div>

        {/* Question prompt */}
        <h2 style={{ fontSize: 17, fontWeight: 800, color: c.title, lineHeight: 1.35, margin: '0 0 10px' }}>
          <GlossaryText text={question.question} />
        </h2>

        {/* Scenario story card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 400, damping: 25 }}
          style={{
            padding: '14px 16px',
            borderRadius: 14,
            background: `linear-gradient(135deg, ${unitColor}08 0%, ${unitColor}15 100%)`,
            border: `1.5px solid ${unitColor}30`,
            fontSize: 14,
            fontWeight: 600,
            color: c.title,
            lineHeight: 1.55,
            marginBottom: 8,
          }}
        >
          <div style={{
            fontSize: 11, fontWeight: 800, color: unitColor, textTransform: 'uppercase',
            letterSpacing: 0.8, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <span style={{ fontSize: 16 }}>📖</span> Scenario
          </div>
          <GlossaryText text={scenario} />
        </motion.div>

        {question.hint && !answered && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
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

        {/* Decision options */}
        <div className="flex flex-col" style={{ gap: 8 }}>
          {shuffledIndices.map((originalIdx, displayIdx) => {
            const option = options[originalIdx];
            const isSelected = selectedIndex === displayIdx;
            const isCorrectOption = originalIdx === correctIndex;

            let bg = c.cardBg;
            let border = `2px solid ${c.border}`;
            let textColor = c.title;
            let shadow = '0 3px 0 #DCDCDC';
            let iconContent = '';

            if (answered && localCorrect !== null) {
              if (isCorrectOption) {
                bg = '#D7FFB8'; border = '2px solid #58CC02'; textColor = '#58A700';
                shadow = '0 0 12px rgba(88, 204, 2, 0.25)';
                iconContent = '✓';
              } else if (isSelected && !isCorrectOption) {
                bg = '#FFDFE0'; border = '2px solid #FF4B4B'; textColor = '#EA2B2B';
                shadow = 'none';
                iconContent = '✗';
              } else {
                bg = c.closeBtnBg; border = `2px solid ${c.border}`; textColor = c.muted;
                shadow = 'none';
              }
            } else if (isSelected) {
              bg = c.cardBg; border = `2.5px solid ${unitColor}`;
              shadow = `0 3px 0 color-mix(in srgb, ${unitColor} 65%, black)`;
            }

            const revealAnimation = answered && localCorrect !== null
              ? isCorrectOption
                ? { opacity: 1, y: 0, scale: [1, 1.04, 1] }
                : isSelected && !isCorrectOption
                  ? { opacity: 1, y: 0, x: [0, -8, 8, -5, 5, 0] }
                  : { opacity: 0.5, y: 0, scale: 0.98 }
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
                    : { delay: displayIdx * 0.08 + 0.2, type: 'spring', stiffness: 400, damping: 25 }
                }
                whileTap={!answered ? { y: 3, boxShadow: '0 0 0 transparent', transition: { duration: 0.06 } } : undefined}
                className="w-full text-left flex items-center"
                style={{
                  padding: '12px 14px', borderRadius: 14, background: bg, border,
                  gap: 12, cursor: answered ? 'default' : 'pointer',
                  transition: 'background 0.2s, border 0.2s, box-shadow 0.2s',
                  boxShadow: shadow,
                }}
              >
                {answered && iconContent ? (
                  <span style={{
                    width: 26, height: 26, borderRadius: 13, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 14, fontWeight: 800,
                    background: isCorrectOption ? '#58CC02' : '#FF4B4B', color: 'white',
                  }}>
                    {iconContent}
                  </span>
                ) : (
                  <span style={{
                    width: 26, height: 26, borderRadius: 13, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 800,
                    background: isSelected ? unitColor : c.emptyBg,
                    color: isSelected ? 'white' : c.subtitle,
                    border: !isSelected ? '2px solid #D5D5D5' : 'none',
                    transition: 'background 0.2s, color 0.2s',
                  }}>
                    {String.fromCharCode(65 + displayIdx)}
                  </span>
                )}
                <span style={{ fontSize: 14, fontWeight: 700, color: textColor, lineHeight: 1.3 }}>
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

export default ScenarioCard;
