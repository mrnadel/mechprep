'use client';

import type { Question } from '@/data/types';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, Lightbulb, Target, Globe, ArrowRight, AlertCircle } from 'lucide-react';
import FlagButton from './FlagButton';

interface Props {
  question: Question;
  isCorrect: boolean;
  onNext: () => void;
}

export default function FeedbackPanel({ question, isCorrect, onNext }: Props) {
  return (
    <div className="animate-slide-up space-y-4">
      {/* Result Header */}
      <div
        className={cn(
          'flex items-center gap-3 p-4 rounded-xl border-2',
          isCorrect ? 'bg-emerald-50 border-emerald-300' : 'bg-red-50 border-red-300'
        )}
        role="alert"
      >
        {isCorrect ? (
          <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0" aria-hidden="true" />
        ) : (
          <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" aria-hidden="true" />
        )}
        <div>
          <span className={cn('font-bold text-lg', isCorrect ? 'text-emerald-800' : 'text-red-800')}>
            {isCorrect ? 'Correct!' : 'Not quite'}
          </span>
          <p className={cn('text-sm mt-0.5', isCorrect ? 'text-emerald-700' : 'text-red-700')}>
            {isCorrect ? 'Great engineering thinking.' : 'No worries — review the explanation below to learn from this.'}
          </p>
        </div>
      </div>

      {/* Explanation */}
      <div className="card p-5 space-y-4">
        {/* Core Explanation */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span className="font-semibold text-surface-800 text-sm">Explanation</span>
          </div>
          <p className="text-sm text-surface-600 leading-relaxed">{question.explanation}</p>
        </div>

        {/* Interview Insight */}
        <div className="p-4 bg-primary-50 rounded-lg border border-primary-100">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-primary-600" />
            <span className="font-semibold text-primary-800 text-sm">Interview Insight</span>
          </div>
          <p className="text-sm text-primary-700 leading-relaxed">{question.interviewInsight}</p>
        </div>

        {/* Real-World Connection */}
        {question.realWorldConnection && (
          <div className="p-4 bg-surface-50 rounded-lg border border-surface-200">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-4 h-4 text-surface-500" />
              <span className="font-semibold text-surface-700 text-sm">Real-World Connection</span>
            </div>
            <p className="text-sm text-surface-600 leading-relaxed">{question.realWorldConnection}</p>
          </div>
        )}

        {/* Common Mistake */}
        {question.commonMistake && !isCorrect && (
          <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              <span className="font-semibold text-amber-800 text-sm">Common Mistake</span>
            </div>
            <p className="text-sm text-amber-700 leading-relaxed">{question.commonMistake}</p>
          </div>
        )}
      </div>

      {/* Flag Button */}
      <FlagButton contentType="question" contentId={question.id} />

      {/* Next Button */}
      <button onClick={onNext} className="btn-primary w-full" autoFocus>
        Continue <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  );
}
