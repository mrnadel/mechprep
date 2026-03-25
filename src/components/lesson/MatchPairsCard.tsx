'use client';

import { useState, useCallback, useEffect, useImperativeHandle, forwardRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import type { CourseQuestion } from '@/data/course/types';
import type { QuestionCardHandle } from './QuestionCard';
import { MoneyText } from '@/components/ui/MoneyText';

interface MatchPairsCardProps {
  question: CourseQuestion;
  onAnswer: (correct: boolean) => void;
  onSelectionChange: (hasSelection: boolean) => void;
  answered: boolean;
  unitColor: string;
}

const PAIR_COLORS = ['#6366F1', '#EC4899', '#F59E0B', '#10B981', '#8B5CF6', '#EF4444'];

const MatchPairsCard = forwardRef<QuestionCardHandle, MatchPairsCardProps>(
  function MatchPairsCard({ question, onAnswer, onSelectionChange, answered, unitColor }, ref) {
    const leftItems = question.options ?? [];
    const rightItems = question.matchTargets ?? [];
    const correctMatches = question.correctMatches ?? [];

    // Shuffle right column display order
    const shuffledRightIndices = useMemo(() => {
      const indices = rightItems.map((_, i) => i);
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      return indices;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [question.id]);

    // matches[leftIdx] = rightIdx (actual index, not display index)
    const [matches, setMatches] = useState<(number | null)[]>(() => leftItems.map(() => null));
    const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
    const [results, setResults] = useState<boolean[] | null>(null);

    useEffect(() => {
      setMatches(leftItems.map(() => null));
      setSelectedLeft(null);
      setResults(null);
    }, [question.id, leftItems.length]);

    const allMatched = matches.every((m) => m !== null);

    useEffect(() => {
      onSelectionChange(allMatched);
    }, [allMatched, onSelectionChange]);

    const handleLeftTap = useCallback((leftIdx: number) => {
      if (answered) return;
      setSelectedLeft((prev) => prev === leftIdx ? null : leftIdx);
    }, [answered]);

    const handleRightTap = useCallback((rightActualIdx: number) => {
      if (answered || selectedLeft === null) return;
      setMatches((prev) => {
        const next = [...prev];
        // Clear any existing match to this right item
        const existingLeft = next.findIndex((m) => m === rightActualIdx);
        if (existingLeft !== -1) next[existingLeft] = null;
        next[selectedLeft] = rightActualIdx;
        return next;
      });
      setSelectedLeft(null);
    }, [answered, selectedLeft]);

    const handleCheck = useCallback(() => {
      if (!allMatched || answered) return;
      const itemResults = matches.map((m, i) => m === correctMatches[i]);
      const allCorrect = itemResults.every(Boolean);
      setResults(itemResults);
      onAnswer(allCorrect);
    }, [allMatched, answered, matches, correctMatches, onAnswer]);

    // Get color for a matched pair
    const getMatchColor = (leftIdx: number): string | null => {
      if (matches[leftIdx] === null) return null;
      return PAIR_COLORS[leftIdx % PAIR_COLORS.length];
    };

    // Which right items are already matched?
    const matchedRightSet = useMemo(() => new Set(matches.filter((m) => m !== null)), [matches]);

    useImperativeHandle(ref, () => ({
      check: handleCheck,
      hasSelection: allMatched,
      selectOption: (index: number) => {
        if (!answered && index < leftItems.length) {
          if (selectedLeft === null) {
            handleLeftTap(index);
          }
        }
      },
      selectBool: () => {},
      selectWord: (index: number) => {
        if (!answered && index < shuffledRightIndices.length) {
          handleRightTap(shuffledRightIndices[index]);
        }
      },
      questionType: 'match-pairs',
      availableWordCount: shuffledRightIndices.length,
    }), [handleCheck, allMatched, answered, leftItems.length, selectedLeft, handleLeftTap, shuffledRightIndices, handleRightTap]);

    return (
      <div className="flex flex-col flex-1" style={{ minHeight: '100%' }}>
        <h2 style={{ fontSize: 17, fontWeight: 800, color: '#3C3C3C', lineHeight: 1.35, margin: '0 0 16px' }}>
          <MoneyText text={question.question} />
        </h2>

        {/* Two columns - pushed to bottom */}
        <div className="grid grid-cols-2" style={{ gap: 10, marginTop: 'auto', paddingTop: 16 }}>
          {/* Left column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {leftItems.map((item, leftIdx) => {
              const isSelected = selectedLeft === leftIdx;
              const matchColor = getMatchColor(leftIdx);
              const isCorrect = results ? results[leftIdx] : null;

              let bg = 'white';
              let border = '2px solid #E5E5E5';
              let textColor = '#3C3C3C';
              let shadow = 'none';

              if (isCorrect !== null) {
                bg = isCorrect ? '#D7FFB8' : '#FFDFE0';
                border = isCorrect ? '2px solid #58CC02' : '2px solid #FF4B4B';
                textColor = isCorrect ? '#58A700' : '#EA2B2B';
                shadow = isCorrect ? '0 0 12px rgba(88, 204, 2, 0.25)' : 'none';
              } else if (matchColor) {
                bg = `${matchColor}15`;
                border = `2.5px solid ${matchColor}`;
                textColor = matchColor;
                shadow = `0 0 8px ${matchColor}20`;
              } else if (isSelected) {
                bg = `${unitColor}10`;
                border = `2.5px solid ${unitColor}`;
                shadow = `0 0 0 3px ${unitColor}20`;
              }

              const revealAnimation = isCorrect !== null
                ? isCorrect
                  ? { opacity: 1, x: 0, scale: [1, 1.06, 1] }
                  : { opacity: 1, x: [0, -5, 5, -3, 3, 0], scale: 1 }
                : { opacity: 1, x: 0, scale: 1 };

              return (
                <motion.button
                  key={`l-${leftIdx}`}
                  onClick={() => handleLeftTap(leftIdx)}
                  disabled={answered}
                  initial={{ opacity: 0, x: -16 }}
                  animate={revealAnimation}
                  transition={{
                    delay: answered ? 0 : leftIdx * 0.06,
                    type: 'spring',
                    stiffness: 400,
                    damping: 25,
                  }}
                  whileTap={!answered ? { scale: 0.94, transition: { duration: 0.1 } } : undefined}
                  whileHover={!answered ? { scale: 1.02 } : undefined}
                  style={{
                    padding: '10px 12px',
                    borderRadius: 12,
                    background: bg,
                    border,
                    fontSize: 13,
                    fontWeight: 700,
                    color: textColor,
                    cursor: answered ? 'default' : 'pointer',
                    transition: 'background 0.2s ease, border 0.2s ease, color 0.2s ease, box-shadow 0.2s ease',
                    textAlign: 'center',
                    boxShadow: shadow,
                  }}
                >
                  <MoneyText text={item} />
                </motion.button>
              );
            })}
          </div>

          {/* Right column (shuffled) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {shuffledRightIndices.map((rightActualIdx, displayIdx) => {
              const item = rightItems[rightActualIdx];
              const matchedByLeft = matches.findIndex((m) => m === rightActualIdx);
              const matchColor = matchedByLeft !== -1 ? PAIR_COLORS[matchedByLeft % PAIR_COLORS.length] : null;
              const isCorrect = matchedByLeft !== -1 && results ? results[matchedByLeft] : null;
              const isAvailable = !matchedRightSet.has(rightActualIdx);

              let bg = 'white';
              let border = '2px solid #E5E5E5';
              let textColor = '#3C3C3C';
              let shadow = 'none';

              if (isCorrect !== null) {
                bg = isCorrect ? '#D7FFB8' : '#FFDFE0';
                border = isCorrect ? '2px solid #58CC02' : '2px solid #FF4B4B';
                textColor = isCorrect ? '#58A700' : '#EA2B2B';
                shadow = isCorrect ? '0 0 12px rgba(88, 204, 2, 0.25)' : 'none';
              } else if (matchColor) {
                bg = `${matchColor}15`;
                border = `2.5px solid ${matchColor}`;
                textColor = matchColor;
                shadow = `0 0 8px ${matchColor}20`;
              } else if (selectedLeft !== null && isAvailable) {
                border = `2px dashed ${unitColor}`;
              }

              const revealAnimation = isCorrect !== null
                ? isCorrect
                  ? { opacity: 1, x: 0, scale: [1, 1.06, 1] }
                  : { opacity: 1, x: [0, 5, -5, 3, -3, 0], scale: 1 }
                : { opacity: 1, x: 0, scale: 1 };

              return (
                <motion.button
                  key={`r-${displayIdx}`}
                  onClick={() => handleRightTap(rightActualIdx)}
                  disabled={answered || selectedLeft === null}
                  initial={{ opacity: 0, x: 16 }}
                  animate={revealAnimation}
                  transition={{
                    delay: answered ? 0 : displayIdx * 0.06 + 0.1,
                    type: 'spring',
                    stiffness: 400,
                    damping: 25,
                  }}
                  whileTap={!answered && selectedLeft !== null ? { scale: 0.94, transition: { duration: 0.1 } } : undefined}
                  whileHover={!answered && selectedLeft !== null ? { scale: 1.02 } : undefined}
                  style={{
                    padding: '10px 12px',
                    borderRadius: 12,
                    background: bg,
                    border,
                    fontSize: 13,
                    fontWeight: 700,
                    color: textColor,
                    cursor: answered || selectedLeft === null ? 'default' : 'pointer',
                    transition: 'background 0.2s ease, border 0.2s ease, color 0.2s ease, box-shadow 0.2s ease',
                    textAlign: 'center',
                    boxShadow: shadow,
                  }}
                >
                  <MoneyText text={item} />
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
);

export default MatchPairsCard;
