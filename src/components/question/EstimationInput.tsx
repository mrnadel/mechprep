'use client';

import { useState } from 'react';
import type { EstimationQuestion } from '@/data/types';
import { cn } from '@/lib/utils';
import { Target, Lightbulb, ArrowRight } from 'lucide-react';

interface Props {
  question: EstimationQuestion;
  disabled: boolean;
  onSubmit: (correct: boolean) => void;
}

export default function EstimationInput({ question, disabled, onSubmit }: Props) {
  const [value, setValue] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showHints, setShowHints] = useState(false);

  const handleSubmit = () => {
    if (!value || submitted) return;
    setSubmitted(true);
    const numVal = parseFloat(value);
    const correct = numVal >= question.acceptableRange.low && numVal <= question.acceptableRange.high;
    onSubmit(correct);
  };

  const numVal = parseFloat(value);
  const isInRange = !isNaN(numVal) && numVal >= question.acceptableRange.low && numVal <= question.acceptableRange.high;

  return (
    <div>
      {/* Hints toggle */}
      {!submitted && question.hints && question.hints.length > 0 && (
        <button
          onClick={() => setShowHints(!showHints)}
          className="flex items-center gap-2 text-sm text-amber-600 hover:text-amber-700 mb-4 font-medium"
        >
          <Lightbulb className="w-4 h-4" />
          {showHints ? 'Hide hints' : 'Need a hint?'}
        </button>
      )}

      {showHints && !submitted && (
        <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-xl animate-slide-up">
          <ul className="space-y-1.5">
            {question.hints.map((hint, i) => (
              <li key={i} className="text-sm text-amber-800 flex items-start gap-2">
                <span className="text-amber-500 font-bold">{i + 1}.</span> {hint}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Input */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <label htmlFor="estimation-input" className="sr-only">Your estimate in {question.acceptableRange.unit}</label>
          <input
            id="estimation-input"
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={disabled || submitted}
            placeholder="Your estimate"
            className="input text-lg font-mono"
          />
        </div>
        <span className="text-sm font-medium text-surface-500 min-w-[40px]">
          {question.acceptableRange.unit}
        </span>
      </div>

      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={!value}
          className={cn('mt-4 btn-primary w-full', !value && 'opacity-50 cursor-not-allowed')}
        >
          Submit Estimate <ArrowRight className="w-4 h-4" />
        </button>
      )}

      {/* Result */}
      {submitted && (
        <div className="mt-5 space-y-4 animate-slide-up">
          {/* Range visualization */}
          <div className={cn(
            'p-5 rounded-xl border-2',
            isInRange ? 'bg-emerald-50 border-emerald-300' : 'bg-red-50 border-red-300'
          )}>
            <div className="flex items-center gap-2 mb-3">
              <Target className={cn('w-5 h-5', isInRange ? 'text-emerald-600' : 'text-red-500')} />
              <span className={cn('font-semibold', isInRange ? 'text-emerald-800' : 'text-red-800')}>
                {isInRange ? 'Within acceptable range!' : 'Outside the expected range'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center mt-4">
              <div>
                <p className="text-xs text-surface-500 mb-1">Low end</p>
                <p className="font-mono font-bold text-surface-700">
                  {question.acceptableRange.low} {question.acceptableRange.unit}
                </p>
              </div>
              <div>
                <p className="text-xs text-surface-500 mb-1">Best estimate</p>
                <p className="font-mono font-bold text-primary-600">
                  {question.acceptableRange.bestEstimate} {question.acceptableRange.unit}
                </p>
              </div>
              <div>
                <p className="text-xs text-surface-500 mb-1">High end</p>
                <p className="font-mono font-bold text-surface-700">
                  {question.acceptableRange.high} {question.acceptableRange.unit}
                </p>
              </div>
            </div>

            <div className="mt-3 text-center">
              <p className="text-sm text-surface-500">Your answer:</p>
              <p className={cn(
                'font-mono font-bold text-lg',
                isInRange ? 'text-emerald-700' : 'text-red-600'
              )}>
                {value} {question.acceptableRange.unit}
              </p>
            </div>
          </div>

          {/* Approach */}
          {question.approachSteps && question.approachSteps.length > 0 && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <span className="font-semibold text-blue-800 text-sm">Estimation Approach:</span>
              <ol className="mt-2 space-y-1.5">
                {question.approachSteps.map((step, i) => (
                  <li key={i} className="text-sm text-blue-700 flex items-start gap-2">
                    <span className="text-blue-400 font-bold shrink-0">{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
