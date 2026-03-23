'use client';

import { cn } from '@/lib/utils';

interface Props {
  value: number | undefined;
  onChange: (value: number) => void;
  className?: string;
}

const levels = [
  { value: 1, label: 'Guessing', emoji: '🤔', color: 'bg-red-100 text-red-700 border-red-300' },
  { value: 2, label: 'Not sure', emoji: '😐', color: 'bg-amber-100 text-amber-700 border-amber-300' },
  { value: 3, label: 'Somewhat', emoji: '🙂', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
  { value: 4, label: 'Confident', emoji: '😊', color: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
  { value: 5, label: 'Very sure', emoji: '💪', color: 'bg-primary-100 text-primary-700 border-primary-300' },
];

export default function ConfidenceRating({ value, onChange, className }: Props) {
  return (
    <div className={cn('border-t border-surface-200 pt-4', className)} role="group" aria-label="Confidence rating">
      <p className="text-sm font-medium text-surface-600 mb-3" id="confidence-label">How confident are you?</p>
      <div className="flex gap-2" role="radiogroup" aria-labelledby="confidence-label">
        {levels.map((level) => (
          <button
            key={level.value}
            onClick={() => onChange(level.value)}
            role="radio"
            aria-checked={value === level.value}
            aria-label={`${level.label} confidence`}
            className={cn(
              'flex-1 py-2 px-1 rounded-lg border-2 text-center transition-all duration-200 text-xs font-medium',
              value === level.value ? level.color : 'border-surface-200 text-surface-400 hover:border-surface-300'
            )}
          >
            <span className="block text-base mb-0.5" aria-hidden="true">{level.emoji}</span>
            {level.label}
          </button>
        ))}
      </div>
    </div>
  );
}
