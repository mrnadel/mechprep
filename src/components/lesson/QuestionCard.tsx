'use client';

import {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { motion } from 'framer-motion';
import type { CourseQuestion } from '@/data/course/types';

export interface QuestionCardHandle {
  check: () => void;
  hasSelection: boolean;
  selectOption: (index: number) => void;
  selectBool: (value: boolean) => void;
  questionType: string;
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
    const [textValue, setTextValue] = useState('');
    const [localCorrect, setLocalCorrect] = useState<boolean | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      setSelectedIndex(null);
      setSelectedBool(null);
      setTextValue('');
      setLocalCorrect(null);
    }, [question.id]);

    const hasSelection = (() => {
      switch (question.type) {
        case 'multiple-choice':
          return selectedIndex !== null;
        case 'true-false':
          return selectedBool !== null;
        case 'fill-blank':
          return textValue.trim().length > 0;
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
          correct = selectedIndex === question.correctIndex;
          break;
        case 'true-false':
          correct = selectedBool === question.correctAnswer;
          break;
        case 'fill-blank': {
          const trimmed = textValue.trim().toLowerCase();
          correct =
            question.acceptedAnswers?.some(
              (a) => a.toLowerCase() === trimmed
            ) ?? false;
          break;
        }
      }

      setLocalCorrect(correct);
      onAnswer(correct);
    }, [answered, hasSelection, question, selectedIndex, selectedBool, textValue, onAnswer]);

    useEffect(() => {
      if (question.type === 'fill-blank' && inputRef.current) {
        const timer = setTimeout(() => inputRef.current?.focus(), 300);
        return () => clearTimeout(timer);
      }
    }, [question.id, question.type]);

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
        questionType: question.type,
      }),
      [handleCheck, hasSelection, answered, question]
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

          {/* Question text */}
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

        {/* Answer options - pushed to bottom for thumb-friendly mobile use */}
        <div style={{ marginTop: 'auto', paddingTop: 20 }}>

        {/* Multiple Choice */}
        {question.type === 'multiple-choice' && question.options && (
          <div className="flex flex-col" style={{ gap: 8 }}>
            {question.options.map((option, index) => {
              const isSelected = selectedIndex === index;
              const isCorrectOption = index === question.correctIndex;

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
                  key={index}
                  onClick={() => !answered && setSelectedIndex(index)}
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
                    {String.fromCharCode(65 + index)}
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

        {/* Fill in the Blank */}
        {question.type === 'fill-blank' && (
          <div>
            <input
              ref={inputRef}
              type="text"
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && hasSelection && !answered) {
                  handleCheck();
                }
              }}
              disabled={answered}
              placeholder="Type your answer..."
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: 14,
                border: answered
                  ? localCorrect
                    ? '2px solid #58CC02'
                    : '2px solid #FF4B4B'
                  : textValue.trim().length > 0
                    ? `2.5px solid ${unitColor}`
                    : '2px solid #E5E5E5',
                background: answered
                  ? localCorrect
                    ? '#D7FFB8'
                    : '#FFDFE0'
                  : 'white',
                fontSize: 16,
                fontWeight: 700,
                color: '#3C3C3C',
                outline: 'none',
                transition: 'all 0.15s ease',
              }}
            />
          </div>
        )}

        </div>
      </div>
    );
  }
);

export default QuestionCard;
