'use client';

import {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useImperativeHandle,
  forwardRef,
  memo,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CourseQuestion } from '@/data/course/types';
import { MoneyText } from '@/components/ui/MoneyText';
import { playSound } from '@/lib/sounds';
import { useLessonColors } from '@/lib/lessonColors';

/** Memoised diagram so SVG animations don't reset on answer selection re-renders */
const DiagramDisplay = memo(function DiagramDisplay({ html }: { html: string }) {
  const c = useLessonColors();
  const sanitised = html
    .replace(/(<svg[^>]*)\sheight="auto"/gi, '$1')
    .replace(/(<svg[^>]*)\swidth="auto"/gi, '$1');

  return (
    <div
      className="w-full flex items-center justify-center overflow-hidden"
      style={{
        borderRadius: 14,
        background: c.cardBg,
        border: `2px solid ${c.border}`,
        padding: 10,
        maxWidth: 400,
        margin: '0 auto',
      }}
      dangerouslySetInnerHTML={{ __html: sanitised }}
    />
  );
});

export interface QuestionCardHandle {
  check: () => void;
  hasSelection: boolean;
  selectOption: (index: number) => void;
  selectBool: (value: boolean) => void;
  selectWord: (index: number) => void;
  questionType: string;
  availableWordCount: number;
}

interface QuestionCardProps {
  question: CourseQuestion;
  onAnswer: (correct: boolean) => void;
  onSelectionChange: (hasSelection: boolean) => void;
  answered: boolean;
  unitColor: string;
}

const QuestionCard = forwardRef<QuestionCardHandle, QuestionCardProps>(
  function QuestionCard({ question, onAnswer, onSelectionChange, answered, unitColor }, ref) {
    const c = useLessonColors();
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [selectedBool, setSelectedBool] = useState<boolean | null>(null);
    const [filledBlanks, setFilledBlanks] = useState<(string | null)[]>([]);
    const [localCorrect, setLocalCorrect] = useState<boolean | null>(null);
    const [activeBlankIdx, setActiveBlankIdx] = useState(0);

    // Shuffle MC option display order so correct answer isn't always A
    const shuffledIndices = useMemo(() => {
      if (question.type !== 'multiple-choice' || !question.options) return [];
      const indices = question.options.map((_, i) => i);
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      return indices;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [question.id]);

    // Shuffle word bank for fill-blank
    const shuffledWordBank = useMemo(() => {
      if (question.type !== 'fill-blank' || !question.wordBank) return [];
      const words = [...question.wordBank];
      for (let i = words.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [words[i], words[j]] = [words[j], words[i]];
      }
      return words;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [question.id]);

    // Split question text into parts around _____ for fill-blank rendering
    const questionParts = useMemo(() => {
      if (question.type !== 'fill-blank') return [];
      return question.question.split('_____');
    }, [question.type, question.question]);

    const blankCount = useMemo(() => {
      if (question.type !== 'fill-blank') return 0;
      return question.blanks?.length ?? 1;
    }, [question.type, question.blanks]);

    useEffect(() => {
      setSelectedIndex(null);
      setSelectedBool(null);
      setFilledBlanks(new Array(question.blanks?.length ?? 1).fill(null));
      setLocalCorrect(null);
      setActiveBlankIdx(0);
    }, [question.id, question.blanks?.length]);

    const hasSelection = (() => {
      switch (question.type) {
        case 'multiple-choice':
          return selectedIndex !== null;
        case 'true-false':
          return selectedBool !== null;
        case 'fill-blank':
          return filledBlanks.length > 0 && filledBlanks.every((b) => b !== null);
        default:
          return false;
      }
    })();

    useEffect(() => {
      onSelectionChange(hasSelection);
    }, [hasSelection, onSelectionChange]);

    const handleCheck = useCallback(() => {
      if (answered || !hasSelection) return;

      let correct = false;
      switch (question.type) {
        case 'multiple-choice':
          correct = selectedIndex !== null && shuffledIndices[selectedIndex] === question.correctIndex;
          break;
        case 'true-false':
          correct = selectedBool === question.correctAnswer;
          break;
        case 'fill-blank': {
          if (question.blanks) {
            correct = question.blanks.every(
              (b, i) => filledBlanks[i]?.toLowerCase() === b.toLowerCase()
            );
          }
          break;
        }
      }

      setLocalCorrect(correct);
      playSound(correct ? 'correct' : 'wrong');
      onAnswer(correct);
    }, [answered, hasSelection, question, selectedIndex, selectedBool, filledBlanks, shuffledIndices, onAnswer]);

    const handleWordTap = useCallback((word: string) => {
      if (answered) return;
      playSound('tap');
      let nextActive = 0;
      setFilledBlanks((prev) => {
        const next = [...prev];
        // Prefer first empty blank; if all filled, replace active blank
        const emptyIdx = next.findIndex((b) => b === null);
        const targetIdx = emptyIdx !== -1 ? emptyIdx : activeBlankIdx;
        next[targetIdx] = word;
        // Advance active to next blank (wrapping)
        nextActive = (targetIdx + 1) % next.length;
        return next;
      });
      // React 18+ batches both updates into a single render
      setActiveBlankIdx(nextActive);
    }, [answered, activeBlankIdx]);

    const handleBlankTap = useCallback((blankIdx: number) => {
      if (answered) return;
      setActiveBlankIdx(blankIdx);
      setFilledBlanks((prev) => {
        const next = [...prev];
        next[blankIdx] = null;
        return next;
      });
    }, [answered]);

    // Words already placed in blanks (for hiding from word bank)
    const usedWords = useMemo(() => {
      const used: Record<string, number> = {};
      for (const word of filledBlanks) {
        if (word) used[word] = (used[word] || 0) + 1;
      }
      return used;
    }, [filledBlanks]);

    // Available words in word bank (not yet placed)
    const availableWords = useMemo(() => {
      const remaining = [...shuffledWordBank];
      const usedCopy = { ...usedWords };
      return remaining.map((word) => {
        if (usedCopy[word] && usedCopy[word] > 0) {
          usedCopy[word]--;
          return { word, available: false };
        }
        return { word, available: true };
      });
    }, [shuffledWordBank, usedWords]);

    useImperativeHandle(
      ref,
      () => ({
        check: handleCheck,
        hasSelection,
        selectOption: (index: number) => {
          if (!answered && question.type === 'multiple-choice' && question.options && index < question.options.length) {
            setSelectedIndex(index);
          }
        },
        selectBool: (value: boolean) => {
          if (!answered && question.type === 'true-false') {
            setSelectedBool(value);
          }
        },
        selectWord: (index: number) => {
          if (!answered && question.type === 'fill-blank') {
            const item = availableWords[index];
            if (item) {
              // Allow selecting even if word is "used" — it will replace the active blank
              handleWordTap(item.word);
            }
          }
        },
        questionType: question.type,
        availableWordCount: availableWords.length,
      }),
      [handleCheck, hasSelection, answered, question, availableWords, handleWordTap]
    );

    return (
      <div className="flex flex-col flex-1" style={{ minHeight: '100%' }}>
        {/* Question content - top area */}
        <div className="flex flex-col" style={{ gap: 12 }}>
          {/* Action title */}
          <div style={{ fontSize: 12, fontWeight: 800, color: c.subtitle, textTransform: 'uppercase', letterSpacing: 0.8 }}>
            {question.type === 'multiple-choice' ? 'Choose the correct answer'
              : question.type === 'true-false' ? 'True or false?'
              : 'Fill in the blank'}
          </div>

          {/* Diagram */}
          {question.diagram && <DiagramDisplay html={question.diagram} />}

          {/* Question text - for fill-blank, render inline blanks */}
          {question.type === 'fill-blank' && question.blanks ? (
            <div
              style={{
                fontSize: 17,
                fontWeight: 800,
                color: c.title,
                lineHeight: 2,
                margin: 0,
              }}
            >
              {questionParts.map((part, i) => (
                <span key={i}>
                  <MoneyText text={part} />
                  {i < blankCount && (
                    <motion.button
                      onClick={() => handleBlankTap(i)}
                      disabled={answered}
                      whileTap={!answered && filledBlanks[i] ? { scale: 0.92 } : undefined}
                      animate={
                        answered && localCorrect !== null
                          ? filledBlanks[i]?.toLowerCase() === question.blanks![i]?.toLowerCase()
                            ? { scale: [1, 1.1, 1] }
                            : { x: [0, -5, 5, -3, 3, 0] }
                          : filledBlanks[i]
                            ? { scale: [0.9, 1.05, 1] }
                            : {}
                      }
                      transition={{ duration: 0.3 }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: 80,
                        height: 34,
                        padding: '2px 14px',
                        borderRadius: 10,
                        margin: '0 4px',
                        verticalAlign: 'middle',
                        fontSize: 15,
                        fontWeight: 800,
                        cursor: answered ? 'default' : filledBlanks[i] ? 'pointer' : 'default',
                        transition: 'background 0.2s ease, border 0.2s ease, color 0.2s ease, box-shadow 0.2s ease',
                        ...(answered && localCorrect !== null
                          ? filledBlanks[i]?.toLowerCase() === question.blanks![i]?.toLowerCase()
                            ? { background: '#D7FFB8', border: '2px solid #58CC02', color: '#58A700' }
                            : { background: '#FFDFE0', border: '2px solid #FF4B4B', color: '#EA2B2B' }
                          : filledBlanks[i]
                            ? { background: c.cardBg, border: `2.5px solid ${unitColor}`, color: c.title,
                                boxShadow: `0 0 0 3px ${unitColor}20`,
                                ...(i === activeBlankIdx && blankCount > 1 ? { boxShadow: `0 0 0 3px ${unitColor}33` } : {}) }
                            : { background: i === activeBlankIdx ? c.emptyActiveBg : c.emptyBg,
                                border: i === activeBlankIdx ? `2px dashed ${unitColor}` : `2px dashed ${c.muted}`,
                                color: c.muted }
                        ),
                      }}
                    >
                      {filledBlanks[i] || '\u00A0'}
                    </motion.button>
                  )}
                </span>
              ))}
            </div>
          ) : (
            <h2
              style={{
                fontSize: 17,
                fontWeight: 800,
                color: c.title,
                lineHeight: 1.35,
                margin: 0,
              }}
            >
              <MoneyText text={question.question} />
            </h2>
          )}

          {/* Hint */}
          {question.hint && !answered && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              style={{
                padding: '8px 12px',
                borderRadius: 10,
                background: c.hintBg,
                border: '1.5px solid #FFE4B8',
                fontSize: 13,
                fontWeight: 600,
                color: c.hintColor,
                lineHeight: 1.4,
              }}
            >
              <MoneyText text={question.hint} />
            </motion.div>
          )}
        </div>

        {/* Answer options - pushed to bottom */}
        <div style={{ marginTop: 'auto', paddingTop: 20 }}>

        {/* Multiple Choice */}
        {question.type === 'multiple-choice' && question.options && (
          <div className="flex flex-col" style={{ gap: 8 }}>
            {shuffledIndices.map((originalIndex, displayIndex) => {
              const option = question.options![originalIndex];
              const isSelected = selectedIndex === displayIndex;
              const isCorrectOption = originalIndex === question.correctIndex;

              let bg = c.cardBg;
              let border = `2px solid ${c.border}`;
              let textColor = c.title;
              let badgeBg = c.emptyBg;
              let badgeColor = c.subtitle;
              let shadow = '0 3px 0 #DCDCDC';

              if (answered && localCorrect !== null) {
                if (isCorrectOption) {
                  bg = '#D7FFB8';
                  border = '2px solid #58CC02';
                  textColor = '#58A700';
                  badgeBg = '#58CC02';
                  badgeColor = 'white';
                  shadow = '0 0 12px rgba(88, 204, 2, 0.25)';
                } else if (isSelected && !isCorrectOption) {
                  bg = '#FFDFE0';
                  border = '2px solid #FF4B4B';
                  textColor = '#EA2B2B';
                  badgeBg = '#FF4B4B';
                  badgeColor = 'white';
                  shadow = 'none';
                } else {
                  bg = '#F5F5F5';
                  border = '2px solid #EFEFEF';
                  textColor = c.muted;
                  badgeBg = '#E5E5E5';
                  badgeColor = c.muted;
                  shadow = 'none';
                }
              } else if (isSelected) {
                bg = c.cardBg;
                border = `2.5px solid ${unitColor}`;
                badgeBg = unitColor;
                badgeColor = 'white';
                shadow = `0 3px 0 color-mix(in srgb, ${unitColor} 65%, black)`;
              }

              // Answer reveal animation
              const revealAnimation = answered && localCorrect !== null
                ? isCorrectOption
                  ? { opacity: 1, y: 0, scale: [1, 1.04, 1] }
                  : isSelected && !isCorrectOption
                    ? { opacity: 1, y: 0, x: [0, -8, 8, -5, 5, 0] }
                    : { opacity: 0.5, y: 0, scale: 0.98 }
                : { opacity: 1, y: 0 };

              return (
                <motion.button
                  key={originalIndex}
                  onClick={() => { if (!answered) { playSound('tap'); setSelectedIndex(displayIndex); } }}
                  disabled={answered}
                  initial={{ opacity: 0, y: 16 }}
                  animate={revealAnimation}
                  transition={
                    answered && localCorrect !== null
                      ? { duration: 0.35 }
                      : { delay: displayIndex * 0.06, type: 'spring', stiffness: 400, damping: 25 }
                  }
                  whileTap={!answered ? { y: 3, boxShadow: '0 0 0 transparent', transition: { duration: 0.06 } } : undefined}
                  className="w-full text-left flex items-center"
                  style={{
                    padding: '10px 14px',
                    borderRadius: 14,
                    background: bg,
                    border,
                    gap: 12,
                    cursor: answered ? 'default' : 'pointer',
                    transition: 'background 0.2s ease, border 0.2s ease, box-shadow 0.2s ease',
                    boxShadow: shadow,
                  }}
                >
                  <motion.span
                    className="flex-shrink-0 flex items-center justify-center"
                    animate={isSelected && !answered ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: badgeBg,
                      color: badgeColor,
                      fontSize: 12,
                      fontWeight: 800,
                      transition: 'background 0.2s ease, color 0.2s ease',
                    }}
                  >
                    {String.fromCharCode(65 + displayIndex)}
                  </motion.span>
                  <span
                    style={{
                      fontSize: 14.5,
                      fontWeight: 700,
                      color: textColor,
                      lineHeight: 1.3,
                      transition: 'color 0.2s ease',
                    }}
                  >
                    <MoneyText text={option} />
                  </span>
                </motion.button>
              );
            })}
          </div>
        )}

        {/* True / False */}
        {question.type === 'true-false' && (
          <div className="grid grid-cols-2" style={{ gap: 10 }}>
            {[true, false].map((value, idx) => {
              const isSelected = selectedBool === value;
              const isCorrectOption = value === question.correctAnswer;

              let bg = c.cardBg;
              let border = `2px solid ${c.border}`;
              let textColor = c.title;
              let shadow = '0 3px 0 #DCDCDC';

              if (answered && localCorrect !== null) {
                if (isCorrectOption) {
                  bg = '#D7FFB8';
                  border = '2px solid #58CC02';
                  textColor = '#58A700';
                  shadow = '0 0 12px rgba(88, 204, 2, 0.25)';
                } else if (isSelected && !isCorrectOption) {
                  bg = '#FFDFE0';
                  border = '2px solid #FF4B4B';
                  textColor = '#EA2B2B';
                  shadow = 'none';
                } else {
                  bg = '#F5F5F5';
                  border = '2px solid #EFEFEF';
                  textColor = c.muted;
                  shadow = 'none';
                }
              } else if (isSelected) {
                bg = c.cardBg;
                border = `2.5px solid ${unitColor}`;
                shadow = `0 3px 0 color-mix(in srgb, ${unitColor} 65%, black)`;
              }

              const revealAnimation = answered && localCorrect !== null
                ? isCorrectOption
                  ? { opacity: 1, y: 0, scale: [1, 1.06, 1] }
                  : isSelected && !isCorrectOption
                    ? { opacity: 1, y: 0, x: [0, -6, 6, -4, 4, 0] }
                    : { opacity: 0.5, y: 0, scale: 0.97 }
                : { opacity: 1, y: 0 };

              return (
                <motion.button
                  key={String(value)}
                  onClick={() => { if (!answered) { playSound('tap'); setSelectedBool(value); } }}
                  disabled={answered}
                  initial={{ opacity: 0, y: 14 }}
                  animate={revealAnimation}
                  transition={
                    answered && localCorrect !== null
                      ? { duration: 0.35 }
                      : { delay: idx * 0.08, type: 'spring', stiffness: 400, damping: 25 }
                  }
                  whileTap={!answered ? { y: 3, boxShadow: '0 0 0 transparent', transition: { duration: 0.06 } } : undefined}
                  className="flex items-center justify-center"
                  style={{
                    padding: '14px 16px',
                    borderRadius: 14,
                    background: bg,
                    border,
                    cursor: answered ? 'default' : 'pointer',
                    fontSize: 16,
                    fontWeight: 800,
                    color: textColor,
                    transition: 'background 0.2s ease, border 0.2s ease, box-shadow 0.2s ease',
                    boxShadow: shadow,
                  }}
                >
                  {value ? 'True' : 'False'}
                </motion.button>
              );
            })}
          </div>
        )}

        {/* Fill in the Blank - Word Bank */}
        {question.type === 'fill-blank' && question.wordBank && (
          <div className="flex flex-wrap" style={{ gap: 8, justifyContent: 'center' }}>
            <AnimatePresence>
              {availableWords.map(({ word, available }, i) => (
                <motion.button
                  key={`${word}-${i}`}
                  onClick={() => available && handleWordTap(word)}
                  disabled={answered || !available}
                  whileTap={!answered && available ? { y: 2, boxShadow: '0 0 0 transparent', transition: { duration: 0.06 } } : undefined}
                  layout
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{
                    opacity: available ? 1 : 0.3,
                    scale: available ? 1 : 0.92,
                    y: 0,
                  }}
                  transition={{
                    delay: i * 0.04,
                    type: 'spring',
                    stiffness: 400,
                    damping: 25,
                  }}
                  style={{
                    padding: '10px 18px',
                    borderRadius: 12,
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: answered ? 'default' : available ? 'pointer' : 'default',
                    transition: 'background 0.15s ease, border 0.15s ease, color 0.15s ease, box-shadow 0.15s ease',
                    background: available ? c.cardBg : '#F5F5F5',
                    border: available ? `2px solid ${c.border}` : '2px solid #EFEFEF',
                    color: available ? c.title : c.muted,
                    boxShadow: available ? '0 2px 0 #E0E0E0' : 'none',
                  }}
                >
                  {word}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        )}

        </div>
      </div>
    );
  }
);

export default QuestionCard;
