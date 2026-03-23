import type { Difficulty, Question } from '@/data/types';

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function getDifficultyColor(difficulty: Difficulty): string {
  switch (difficulty) {
    case 'beginner': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    case 'intermediate': return 'text-amber-600 bg-amber-50 border-amber-200';
    case 'advanced': return 'text-red-600 bg-red-50 border-red-200';
  }
}

export function getDifficultyLabel(difficulty: Difficulty): string {
  switch (difficulty) {
    case 'beginner': return 'Beginner';
    case 'intermediate': return 'Intermediate';
    case 'advanced': return 'Advanced';
  }
}

export function calculateXP(question: Question, correct: boolean, timeSpent: number, confidence?: number): number {
  if (!correct) return Math.round(baseXPForDifficulty(question.difficulty) * 0.15);

  let xp = baseXPForDifficulty(question.difficulty);

  // Speed bonus: up to 30% extra for quick answers
  if (timeSpent < 15) xp *= 1.3;
  else if (timeSpent < 30) xp *= 1.15;

  // Confidence calibration bonus
  if (confidence !== undefined) {
    if (confidence >= 4 && correct) xp *= 1.1; // confident and correct
    if (confidence <= 2 && correct) xp *= 1.2; // surprised yourself (learning moment)
  }

  return Math.round(xp);
}

function baseXPForDifficulty(difficulty: Difficulty): number {
  switch (difficulty) {
    case 'beginner': return 20;
    case 'intermediate': return 35;
    case 'advanced': return 55;
  }
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}
