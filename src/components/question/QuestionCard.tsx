'use client';

import { useState, useCallback } from 'react';
import type { Question } from '@/data/types';
import { cn, getDifficultyColor, getDifficultyLabel, getQuestionTypeLabel, getQuestionTypeIcon } from '@/lib/utils';
import MultipleChoiceInput from './MultipleChoiceInput';
import TwoChoiceInput from './TwoChoiceInput';
import MultiSelectInput from './MultiSelectInput';
import RankingInput from './RankingInput';
import FreeTextInput from './FreeTextInput';
import EstimationInput from './EstimationInput';
import SpotTheFlawInput from './SpotTheFlawInput';
import ScenarioInput from './ScenarioInput';
import WhatFailsFirstInput from './WhatFailsFirstInput';
import DesignDecisionInput from './DesignDecisionInput';
import MaterialSelectionInput from './MaterialSelectionInput';
import ConfidenceRating from './ConfidenceRating';
import FeedbackPanel from '../feedback/FeedbackPanel';
import QuestionDiagram from './QuestionDiagram';
import { topics } from '@/data/topics';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (correct: boolean, confidence?: number, timeSpent?: number) => void;
  onNext: () => void;
  showConfidence?: boolean;
}

export default function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  onNext,
  showConfidence = true,
}: QuestionCardProps) {
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [confidence, setConfidence] = useState<number | undefined>(undefined);
  const [showFeedback, setShowFeedback] = useState(false);
  const [startTime] = useState(Date.now());

  const topic = topics.find(t => t.id === question.topic);

  const handleSubmit = useCallback((correct: boolean) => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    setIsCorrect(correct);
    setAnswered(true);
    setShowFeedback(true);
    onAnswer(correct, confidence, timeSpent);
  }, [confidence, startTime, onAnswer]);

  const handleNext = useCallback(() => {
    setAnswered(false);
    setIsCorrect(false);
    setConfidence(undefined);
    setShowFeedback(false);
    onNext();
  }, [onNext]);

  const renderQuestionInput = () => {
    const commonProps = { disabled: answered, onSubmit: handleSubmit };

    switch (question.type) {
      case 'multiple-choice':
        return <MultipleChoiceInput question={question} {...commonProps} />;
      case 'two-choice-tradeoff':
        return <TwoChoiceInput question={question} {...commonProps} />;
      case 'multi-select':
        return <MultiSelectInput question={question} {...commonProps} />;
      case 'ranking':
        return <RankingInput question={question} {...commonProps} />;
      case 'free-text':
      case 'explanation':
        return <FreeTextInput question={question} {...commonProps} />;
      case 'estimation':
        return <EstimationInput question={question} {...commonProps} />;
      case 'spot-the-flaw':
        return <SpotTheFlawInput question={question} {...commonProps} />;
      case 'scenario':
        return <ScenarioInput question={question} {...commonProps} />;
      case 'what-fails-first':
        return <WhatFailsFirstInput question={question} {...commonProps} />;
      case 'design-decision':
        return <DesignDecisionInput question={question} {...commonProps} />;
      case 'material-selection':
        return <MaterialSelectionInput question={question} {...commonProps} />;
      case 'confidence-rated':
        return <MultipleChoiceInput question={question as import('@/data/types').ConfidenceRatedQuestion} {...commonProps} />;
      default:
        return <div className="text-surface-500">This question type is not yet supported. Please skip to the next question.</div>;
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Question Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-surface-400">
            {questionNumber} / {totalQuestions}
          </span>
          <span className={cn('badge border', getDifficultyColor(question.difficulty))}>
            {getDifficultyLabel(question.difficulty)}
          </span>
          <span className="badge bg-surface-100 text-surface-600">
            {getQuestionTypeIcon(question.type)} {getQuestionTypeLabel(question.type)}
          </span>
        </div>
        {topic && (
          <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ backgroundColor: `${topic.color}15`, color: topic.color }}>
            {topic.icon} {topic.name}
          </span>
        )}
      </div>

      {/* Question Text */}
      <div className="card p-6 mb-4">
        <h2 className="text-lg font-semibold text-surface-900 leading-relaxed mb-6">
          {question.question}
        </h2>

        {/* Question Diagram */}
        {question.diagram && <QuestionDiagram svg={question.diagram} />}

        {/* Question-specific input */}
        {renderQuestionInput()}

        {/* Confidence Rating (before answer) */}
        {showConfidence && !answered && (question.type === 'confidence-rated' || confidence === undefined) && (
          <ConfidenceRating
            value={confidence}
            onChange={setConfidence}
            className="mt-6"
          />
        )}
      </div>

      {/* Feedback Panel */}
      {showFeedback && (
        <FeedbackPanel
          question={question}
          isCorrect={isCorrect}
          onNext={handleNext}
        />
      )}
    </div>
  );
}
