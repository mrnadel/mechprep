'use client';

import { useState, useCallback } from 'react';
import type { RankingQuestion } from '@/data/types';
import { cn, shuffleArray } from '@/lib/utils';
import { GripVertical, ArrowUp, ArrowDown, Check, X } from 'lucide-react';

interface Props {
  question: RankingQuestion;
  disabled: boolean;
  onSubmit: (correct: boolean) => void;
}

export default function RankingInput({ question, disabled, onSubmit }: Props) {
  const [items, setItems] = useState(() => shuffleArray(question.items));
  const [submitted, setSubmitted] = useState(false);

  const moveItem = useCallback((index: number, direction: 'up' | 'down') => {
    if (disabled || submitted) return;
    const newItems = [...items];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newItems.length) return;
    [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];
    setItems(newItems);
  }, [items, disabled, submitted]);

  const handleSubmit = () => {
    if (submitted) return;
    setSubmitted(true);
    const userOrder = items.map(i => i.id);
    const isCorrect = JSON.stringify(userOrder) === JSON.stringify(question.correctOrder);
    onSubmit(isCorrect);
  };

  const getCorrectPosition = (itemId: string): number => {
    return question.correctOrder.indexOf(itemId);
  };

  return (
    <div>
      <p className="text-sm text-surface-500 mb-4 font-medium">
        Drag or use arrows to rank from top (most) to bottom (least):
      </p>

      <div className="space-y-2">
        {items.map((item, index) => {
          const correctPos = getCorrectPosition(item.id);
          const isCorrectPosition = submitted && index === correctPos;
          const isWrongPosition = submitted && index !== correctPos;

          return (
            <div
              key={item.id}
              className={cn(
                'flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200',
                !submitted && 'border-surface-200 bg-white',
                isCorrectPosition && 'border-emerald-500 bg-emerald-50',
                isWrongPosition && 'border-amber-400 bg-amber-50',
              )}
            >
              <GripVertical className="w-5 h-5 text-surface-300 flex-shrink-0" />

              <span className={cn(
                'w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0',
                !submitted && 'bg-surface-100 text-surface-600',
                isCorrectPosition && 'bg-emerald-500 text-white',
                isWrongPosition && 'bg-amber-400 text-white',
              )}>
                {submitted ? (
                  isCorrectPosition ? <Check className="w-4 h-4" /> : correctPos + 1
                ) : (
                  index + 1
                )}
              </span>

              <span className="flex-1 text-sm text-surface-700">{item.text}</span>

              {!submitted && (
                <div className="flex flex-col gap-0.5">
                  <button
                    onClick={() => moveItem(index, 'up')}
                    disabled={index === 0}
                    aria-label={`Move ${item.text} up`}
                    className={cn('p-1 rounded hover:bg-surface-100', index === 0 && 'opacity-30')}
                  >
                    <ArrowUp className="w-4 h-4 text-surface-400" />
                  </button>
                  <button
                    onClick={() => moveItem(index, 'down')}
                    disabled={index === items.length - 1}
                    aria-label={`Move ${item.text} down`}
                    className={cn('p-1 rounded hover:bg-surface-100', index === items.length - 1 && 'opacity-30')}
                  >
                    <ArrowDown className="w-4 h-4 text-surface-400" />
                  </button>
                </div>
              )}

              {isWrongPosition && (
                <span className="text-xs text-amber-600 font-medium">
                  → #{correctPos + 1}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {!submitted && (
        <button onClick={handleSubmit} className="mt-5 btn-primary w-full">
          Lock In Ranking
        </button>
      )}
    </div>
  );
}
