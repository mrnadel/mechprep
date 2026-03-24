'use client';

import {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CourseQuestion } from '@/data/course/types';

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
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [selectedBool, setSelectedBool] = useState<boolean | null>(null);
    const [filledBlanks, setFilledBlanks] = useState<(string | null)[]>([]);
    const [localCorrect, setLocalCorrect] = useState<boolean | null>(null);

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
      onAnswer(correct);
    }, [answered, hasSelection, question, selectedIndex, selectedBool, filledBlanks, shuffledIndices, onAnswer]);

    const handleWordTap = useCallback((word: string) => {
      if (answered) return;
      setFilledBlanks((prev) => {
        const next = [...prev];
        const emptyIdx = next.findIndex((b) => b === null);
        if (emptyIdx !== -1) {
          next[emptyIdx] = word;
        }
        return next;
      });
    }, [answered]);

    const handleBlankTap = useCallback((blankIdx: number) => {
      if (answered) return;
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
            if (item && item.available) {
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
          {/* Diagram */}
          {question.diagram && (
            <div
              className="w-full flex items-center justify-center overflow-hidden"
              style={{
                borderRadius: 14,
                background: 'white',
                border: '2px solid #E5E5E5',
                padding: 10,
                maxWidth: 400,
                margin: '0 auto',
              }}
              dangerouslySetInnerHTML={{
                __html: question.diagram.replace(
                  /(<svg[^>]*)\sheight="auto"/gi,
                  '$1'
                ).replace(
                  /(<svg[^>]*)\swidth="auto"/gi,
                  '$1'
                ),
              }}
            />
          )}

          {/* Question text - for fill-blank, render inline blanks */}
          {question.type === 'fill-blank' && question.blanks ? (
            <div
              style={{
                fontSize: 17,
                fontWeight: 800,
                color: '#3C3C3C',
                lineHeight: 2,
                margin: 0,
              }}
            >
              {questionParts.map((part, i) => (
                <span key={i}>
                  {part}
                  {i < blankCount && (
                    <motion.button
                      onClick={() => handleBlankTap(i)}
                      disabled={answered}
                      whileTap={!answered && filledBlanks[i] ? { scale: 0.95 } : undefined}
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
                        transition: 'all 0.15s ease',
                        ...(answered && localCorrect !== null
                          ? filledBlanks[i]?.toLowerCase() === question.blanks![i]?.toLowerCase()
                            ? { background: '#D7FFB8', border: '2px solid #58CC02', color: '#58A700' }
                            : { background: '#FFDFE0', border: '2px solid #FF4B4B', color: '#EA2B2B' }
                          : filledBlanks[i]
                            ? { background: 'white', border: `2.5px solid ${unitColor}`, color: '#3C3C3C' }
                            : { background: '#F0F0F0', border: '2px dashed #CFCFCF', color: '#CFCFCF' }
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
                color: '#3C3C3C',
                lineHeight: 1.35,
                margin: 0,
              }}
            >
              {question.question}
            </h2>
          )}

          {/* Hint */}
          {question.hint && !answered && (
            <div
              style={{
                padding: '8px 12px',
                borderRadius: 10,
                background: '#FFF9E8',
                border: '1.5px solid #FFE4B8',
                fontSize: 13,
                fontWeight: 600,
                color: '#B56E00',
                lineHeight: 1.4,
              }}
            >
              {question.hint}
            </div>
          )}
        </div>

        {/* Answer options - pushed to bottom for MC/TF, but inline for fill-blank */}
        <div style={{ marginTop: question.type === 'fill-blank' ? 16 : 'auto', paddingTop: question.type === 'fill-blank' ? 0 : 20 }}>

        {/* Multiple Choice */}
        {question.type === 'multiple-choice' && question.options && (
          <div className="flex flex-col" style={{ gap: 8 }}>
            {shuffledIndices.map((originalIndex, displayIndex) => {
              const option = question.options![originalIndex];
              const isSelected = selectedIndex === displayIndex;
              const isCorrectOption = originalIndex === question.correctIndex;

              let bg = 'rgba(255,255,255,0.65)';
              let border = '2px solid transparent';
              let textColor = '#3C3C3C';
              let badgeBg = '#F0F0F0';
              let badgeColor = '#AFAFAF';

              if (answered && localCorrect !== null) {
                if (isCorrectOption) {
                  bg = '#D7FFB8';
                  border = '2px solid #58CC02';
                  textColor = '#58A700';
                  badgeBg = '#58CC02';
                  badgeColor = 'white';
                } else if (isSelected && !isCorrectOption) {
                  bg = '#FFDFE0';
                  border = '2px solid #FF4B4B';
                  textColor = '#EA2B2B';
                  badgeBg = '#FF4B4B';
                  badgeColor = 'white';
                } else {
                  bg = '#F5F5F5';
                  textColor = '#CFCFCF';
                  badgeBg = '#E5E5E5';
                  badgeColor = '#CFCFCF';
                }
              } else if (isSelected) {
                bg = 'white';
                border = `2.5px solid ${unitColor}`;
                badgeBg = unitColor;
                badgeColor = 'white';
              }

              return (
                <motion.button
                  key={originalIndex}
                  onClick={() => !answered && setSelectedIndex(displayIndex)}
                  disabled={answered}
                  whileTap={!answered ? { scale: 0.98 } : undefined}
                  className="w-full text-left flex items-center"
                  style={{
                    padding: '10px 14px',
                    borderRadius: 14,
                    background: bg,
                    border,
                    gap: 12,
                    cursor: answered ? 'default' : 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span
                    className="flex-shrink-0 flex items-center justify-center"
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: badgeBg,
                      color: badgeColor,
                      fontSize: 12,
                      fontWeight: 800,
                    }}
                  >
                    {String.fromCharCode(65 + displayIndex)}
                  </span>
                  <span
                    style={{
                      fontSize: 14.5,
                      fontWeight: 700,
                      color: textColor,
                      lineHeight: 1.3,
                    }}
                  >
                    {option}
                  </span>
                </motion.button>
              );
            })}
          </div>
        )}

        {/* True / False */}
        {question.type === 'true-false' && (
          <div className="grid grid-cols-2" style={{ gap: 10 }}>
            {[true, false].map((value) => {
              const isSelected = selectedBool === value;
              const isCorrectOption = value === question.correctAnswer;

              let bg = 'rgba(255,255,255,0.65)';
              let border = '2px solid transparent';
              let textColor = '#3C3C3C';

              if (answered && localCorrect !== null) {
                if (isCorrectOption) {
                  bg = '#D7FFB8';
                  border = '2px solid #58CC02';
                  textColor = '#58A700';
                } else if (isSelected && !isCorrectOption) {
                  bg = '#FFDFE0';
                  border = '2px solid #FF4B4B';
                  textColor = '#EA2B2B';
                } else {
                  bg = '#F5F5F5';
                  textColor = '#CFCFCF';
                }
              } else if (isSelected) {
                bg = 'white';
                border = `2.5px solid ${unitColor}`;
              }

              return (
                <motion.button
                  key={String(value)}
                  onClick={() => !answered && setSelectedBool(value)}
                  disabled={answered}
                  whileTap={!answered ? { scale: 0.97 } : undefined}
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
                    transition: 'all 0.15s ease',
                  }}
                >
                  {value ? 'True' : 'False'}
                </motion.button>
              );
            })}
          </div>
        )}

        {/* Fill in the Blank - Word Bank */}
        {question.type === 'fill-blank' && (
          <div style={{ background: 'rgba(255,0,0,0.15)', padding: 12, borderRadius: 12 }}>
            <div style={{ fontSize: 10, color: 'red', marginBottom: 8 }}>
              WORD BANK DEBUG: wordBank={JSON.stringify(question.wordBank?.length)} | available={availableWords.length}
            </div>
            <div className="flex flex-wrap" style={{ gap: 8, justifyContent: 'center' }}>
              {availableWords.map(({ word, available }, i) => (
                <motion.button
                  key={`${word}-${i}`}
                  onClick={() => available && handleWordTap(word)}
                  disabled={answered || !available}
                  whileTap={!answered && available ? { scale: 0.93 } : undefined}
                  animate={{
                    opacity: available ? 1 : 0.35,
                    scale: available ? 1 : 0.95,
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  style={{
                    padding: '10px 18px',
                    borderRadius: 12,
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: answered ? 'default' : available ? 'pointer' : 'default',
                    background: available ? '#FFE0E0' : '#F5F5F5',
                    border: available ? '2px solid #FF4444' : '2px solid #EFEFEF',
                    color: available ? '#000000' : '#CFCFCF',
                    boxShadow: available ? '0 2px 0 #CC0000' : 'none',
                  }}
                >
                  {word}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        </div>
      </div>
    );
  }
);

export default QuestionCard;
