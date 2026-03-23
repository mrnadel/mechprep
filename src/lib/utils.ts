import type { Difficulty, Question, QuestionType } from '@/data/types';

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatNumber(num: number): string {
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return num.toString();
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs}s`;
  return `${mins}m ${secs}s`;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function getRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return formatDate(dateStr);
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

export function getQuestionTypeLabel(type: QuestionType): string {
  const labels: Record<QuestionType, string> = {
    'multiple-choice': 'Multiple Choice',
    'two-choice-tradeoff': 'Tradeoff',
    'multi-select': 'Multi-Select',
    'ranking': 'Ranking',
    'scenario': 'Scenario',
    'spot-the-flaw': 'Spot the Flaw',
    'estimation': 'Estimation',
    'confidence-rated': 'Confidence Check',
    'what-fails-first': 'What Fails First?',
    'design-decision': 'Design Decision',
    'material-selection': 'Material Selection',
  };
  return labels[type] || type;
}

export function getQuestionTypeIcon(type: QuestionType): string {
  const icons: Record<QuestionType, string> = {
    'multiple-choice': '○',
    'two-choice-tradeoff': '⇄',
    'multi-select': '☑',
    'ranking': '≡',
    'scenario': '📋',
    'spot-the-flaw': '🔍',
    'estimation': '📏',
    'confidence-rated': '🎯',
    'what-fails-first': '⚠️',
    'design-decision': '🔧',
    'material-selection': '🧱',
  };
  return icons[type] || '?';
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

export function calculateMastery(attempted: number, correct: number, recency: number = 1): number {
  if (attempted === 0) return 0;
  const accuracy = correct / attempted;
  const volume = Math.min(attempted / 20, 1); // caps at 20 questions
  return Math.round(accuracy * volume * recency * 100);
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

export function getStreakStatus(lastActiveDate: string): 'active' | 'at-risk' | 'broken' {
  if (!lastActiveDate) return 'broken';
  const today = getTodayString();
  if (lastActiveDate === today) return 'active';
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];
  if (lastActiveDate === yesterdayStr) return 'at-risk';
  return 'broken';
}

export function getInterviewReadiness(topicProgress: Record<string, { accuracy: number; attempted: number }>): number {
  const topics = Object.values(topicProgress);
  if (topics.length === 0) return 0;

  const weights = { coverage: 0.3, accuracy: 0.4, depth: 0.3 };
  const totalTopics = 11;

  const coverage = topics.filter(t => t.attempted >= 5).length / totalTopics;
  const avgAccuracy = topics.reduce((sum, t) => sum + (t.attempted > 0 ? t.accuracy : 0), 0) / Math.max(topics.length, 1);
  const depth = topics.filter(t => t.attempted >= 15).length / totalTopics;

  return Math.round((coverage * weights.coverage + avgAccuracy * weights.accuracy + depth * weights.depth) * 100);
}
