'use client';

import {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { motion } from 'framer-motion';
import type { Question } from '@/data/types';

/* ── Public imperative handle (matches lesson QuestionCard) ── */

export interface QuestionCardHandle {
  check: () => void;
  hasSelection: boolean;
  selectOption: (index: number) => void;
  selectBool: (value: boolean) => void;
  selectWord: (index: number) => void;
  questionType: string;
  availableWordCount: number;
}

interface Props {
  question: Question;
  onAnswer: (correct: boolean) => void;
  onSelectionChange: (hasSelection: boolean) => void;
  answered: boolean;
  unitColor: string;
}

/* ── Normalize any question type to simple options ── */

interface SimpleOption {
  id: string;
  text: string;
}

function extractOptions(q: Question): { options: SimpleOption[]; correctIds: Set<string> } {
  switch (q.type) {
    case 'multiple-choice':
    case 'confidence-rated':
      return { options: q.options, correctIds: new Set([q.correctAnswer]) };
    case 'multi-select':
      // Show as single-select — accept any correct answer
      return { options: q.options, correctIds: new Set(q.correctAnswers.slice(0, 1)) };
    case 'two-choice-tradeoff':
      return {
        options: q.choices.map((c) => ({ id: c.id, text: c.text })),
        correctIds: new Set([q.preferredAnswer]),
      };
    case 'what-fails-first':
      return { options: q.components, correctIds: new Set([q.correctAnswer]) };
    case 'design-decision':
      return {
        options: q.designOptions.map((d) => ({ id: d.id, text: d.text })),
        correctIds: new Set([q.bestOption]),
      };
    case 'material-selection':
      return {
        options: q.candidates.map((c) => ({ id: c.id, text: c.name })),
        correctIds: new Set([q.bestChoice]),
      };
    case 'ranking':
      // "Which is most important?" — correct = first in order
      return { options: q.items, correctIds: new Set([q.correctOrder[0]]) };
    case 'spot-the-flaw': {
      // True/False style — "Is this statement correct?"
      return {
        options: [
          { id: 'true', text: 'This statement is correct' },
          { id: 'false', text: 'This statement has a flaw' },
        ],
        correctIds: new Set(['false']),
      };
    }
    case 'estimation': {
      // Convert to MC with range buckets
      const best = q.acceptableRange.bestEstimate;
      const unit = q.acceptableRange.unit;
      const low = best * 0.3;
      const mid = best * 0.7;
      const high = best * 1.5;
      const vhigh = best * 3;
      return {
        options: [
          { id: 'a', text: `~${fmtNum(low)} ${unit}` },
          { id: 'b', text: `~${fmtNum(mid)} ${unit}` },
          { id: 'c', text: `~${fmtNum(best)} ${unit}` },
          { id: 'd', text: `~${fmtNum(high)} ${unit}` },
          { id: 'e', text: `~${fmtNum(vhigh)} ${unit}` },
        ],
        correctIds: new Set(['c']),
      };
    }
    case 'scenario': {
      // Show first step as a question with key takeaway
      const opts = [
        { id: 'a', text: q.keyTakeaway },
        { id: 'b', text: q.steps[0]?.idealResponse ?? 'Investigate further' },
      ];
      // Shuffle will handle order, correct is 'a'
      return { options: opts, correctIds: new Set(['a']) };
    }
    default:
      return { options: [], correctIds: new Set() };
  }
}

function fmtNum(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'k';
  if (n >= 100) return Math.round(n).toString();
  if (n >= 1) return n.toFixed(1);
  return n.toPrecision(2);
}

function getQuestionText(q: Question): string {
  if (q.type === 'ranking') return q.question.replace(/rank|order|arrange/i, (m) => `Which is most important? (${m})`);
  if (q.type === 'spot-the-flaw') return q.statement;
  if (q.type === 'scenario') return `${q.context}\n\n${q.steps[0]?.prompt ?? q.question}`;
  return q.question;
}

/* ── Component ── */

const QuestionCard = forwardRef<QuestionCardHandle, Props>(
  function QuestionCard({ question, onAnswer, onSelectionChange, answered, unitColor }, ref) {
    const { options, correctIds } = useMemo(() => extractOptions(question), [question]);

    // Shuffle option display order
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
      if (answered || !hasSelection || selectedIndex === null) return;
      const pickedOption = options[shuffledIndices[selectedIndex]];
      const correct = correctIds.has(pickedOption.id);
      setLocalCorrect(correct);
      onAnswer(correct);
    }, [answered, hasSelection, selectedIndex, options, shuffledIndices, correctIds, onAnswer]);

    useImperativeHandle(
      ref,
      () => ({
        check: handleCheck,
        hasSelection,
        selectOption: (index: number) => {
          if (!answered && index < options.length) setSelectedIndex(index);
        },
        selectBool: () => {},
        selectWord: () => {},
        questionType: 'multiple-choice',
        availableWordCount: 0,
      }),
      [handleCheck, hasSelection, answered, options.length]
    );

    const displayText = getQuestionText(question);

    return (
      <div className="flex flex-col flex-1" style={{ minHeight: '100%' }}>
        {/* Question content */}
        <div className="flex flex-col" style={{ gap: 12 }}>
          {/* Diagram */}
          {question.diagram && (
            <div
              className="diagram-svg w-full flex items-center justify-center overflow-hidden"
              style={{
                borderRadius: 14,
                background: '#0F172A',
                border: '2px solid #1E293B',
                padding: 10,
                maxWidth: 400,
                margin: '0 auto',
              }}
              dangerouslySetInnerHTML={{ __html: question.diagram }}
            />
          )}

          {/* Question text */}
          <h2
            style={{
              fontSize: 17,
              fontWeight: 800,
              color: '#3C3C3C',
              lineHeight: 1.35,
              margin: 0,
              whiteSpace: 'pre-line',
            }}
          >
            {displayText}
          </h2>

          {/* Hint for special types */}
          {question.type === 'spot-the-flaw' && !answered && (
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
              Is this statement correct, or does it contain a flaw?
            </div>
          )}
        </div>

        {/* Options — pushed to bottom for thumb reach */}
        <div style={{ marginTop: 'auto', paddingTop: 20 }}>
          <div className="flex flex-col" style={{ gap: 8 }}>
            {shuffledIndices.map((originalIndex, displayIndex) => {
              const option = options[originalIndex];
              const isSelected = selectedIndex === displayIndex;
              const isCorrectOption = correctIds.has(option.id);

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
                    {option.text}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
);

export default QuestionCard;
