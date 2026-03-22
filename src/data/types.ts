// ============================================================
// Mechanical Engineering Interview Prep — Complete Type System
// ============================================================

// --------------- Question Types ---------------

export type QuestionType =
  | 'multiple-choice'
  | 'two-choice-tradeoff'
  | 'multi-select'
  | 'ranking'
  | 'scenario'
  | 'free-text'
  | 'spot-the-flaw'
  | 'estimation'
  | 'explanation'
  | 'confidence-rated'
  | 'what-fails-first'
  | 'design-decision'
  | 'material-selection';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export type TopicId =
  | 'engineering-mechanics'
  | 'strength-of-materials'
  | 'thermodynamics'
  | 'heat-transfer'
  | 'fluid-mechanics'
  | 'materials-engineering'
  | 'manufacturing'
  | 'machine-elements'
  | 'design-tolerancing'
  | 'vibrations'
  | 'real-world-mechanisms';

export type InterviewRelevance = 'critical' | 'high' | 'medium';

// --------------- Option / Choice Shapes ---------------

export interface MCOption {
  id: string;       // "a", "b", "c", "d"
  text: string;
}

export interface TradeoffChoice {
  id: 'a' | 'b';
  text: string;
  pros: string[];
  cons: string[];
}

export interface RankingItem {
  id: string;
  text: string;
}

export interface ScenarioStep {
  prompt: string;
  idealResponse: string;
}

export interface FlawStatement {
  text: string;
  flawIndex: number;          // which sentence/clause contains the flaw
  flawExplanation: string;
}

export interface EstimationBound {
  low: number;
  high: number;
  unit: string;
  bestEstimate: number;
}

export interface DesignOption {
  id: string;
  text: string;
  tradeoffs: string;
}

export interface MaterialOption {
  id: string;
  name: string;
  properties: string;
}

// --------------- Base Question ---------------

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  topic: TopicId;
  subtopic: string;
  difficulty: Difficulty;
  question: string;
  diagram?: string;
  explanation: string;
  interviewInsight: string;
  realWorldConnection?: string;
  commonMistake: string;
  tags: string[];
}

// --------------- Concrete Question Variants ---------------

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice';
  options: MCOption[];
  correctAnswer: string;          // option id, e.g. "b"
}

export interface TwoChoiceTradeoffQuestion extends BaseQuestion {
  type: 'two-choice-tradeoff';
  choices: TradeoffChoice[];
  preferredAnswer: 'a' | 'b';
  acceptableAnswer: 'a' | 'b' | 'either';
  justification: string;
}

export interface MultiSelectQuestion extends BaseQuestion {
  type: 'multi-select';
  options: MCOption[];
  correctAnswers: string[];       // array of option ids
}

export interface RankingQuestion extends BaseQuestion {
  type: 'ranking';
  items: RankingItem[];
  correctOrder: string[];         // ordered ids, first = most relevant
}

export interface ScenarioQuestion extends BaseQuestion {
  type: 'scenario';
  context: string;
  steps: ScenarioStep[];
  keyTakeaway: string;
}

export interface FreeTextQuestion extends BaseQuestion {
  type: 'free-text' | 'explanation';
  sampleAnswer: string;
  keyPoints: string[];
}

export interface SpotTheFlawQuestion extends BaseQuestion {
  type: 'spot-the-flaw';
  statement: string;
  flaw: FlawStatement;
  correctedStatement: string;
}

export interface EstimationQuestion extends BaseQuestion {
  type: 'estimation';
  hints: string[];
  acceptableRange: EstimationBound;
  approachSteps: string[];
}

export interface ConfidenceRatedQuestion extends BaseQuestion {
  type: 'confidence-rated';
  options: MCOption[];
  correctAnswer: string;
  confidenceLevels: string[];     // ["Guessing", "Somewhat sure", "Very confident"]
}

export interface WhatFailsFirstQuestion extends BaseQuestion {
  type: 'what-fails-first';
  components: MCOption[];
  correctAnswer: string;
  failureMode: string;
  failureChain: string[];         // sequence of events after initial failure
}

export interface DesignDecisionQuestion extends BaseQuestion {
  type: 'design-decision';
  context: string;
  designOptions: DesignOption[];
  bestOption: string;
  evaluationCriteria: string[];
}

export interface MaterialSelectionQuestion extends BaseQuestion {
  type: 'material-selection';
  requirements: string[];
  candidates: MaterialOption[];
  bestChoice: string;
  selectionReasoning: string;
}

// --------------- Union Type ---------------

export type Question =
  | MultipleChoiceQuestion
  | TwoChoiceTradeoffQuestion
  | MultiSelectQuestion
  | RankingQuestion
  | ScenarioQuestion
  | FreeTextQuestion
  | SpotTheFlawQuestion
  | EstimationQuestion
  | ConfidenceRatedQuestion
  | WhatFailsFirstQuestion
  | DesignDecisionQuestion
  | MaterialSelectionQuestion;

// --------------- Topic ---------------

export interface SubTopic {
  id: string;
  name: string;
  description: string;
}

export interface Topic {
  id: TopicId;
  name: string;
  description: string;
  icon: string;
  color: string;
  subtopics: SubTopic[];
  questionCount: number;
  interviewRelevance: InterviewRelevance;
}

// --------------- Achievement ---------------

export type AchievementCategory =
  | 'knowledge'
  | 'consistency'
  | 'challenge'
  | 'exploration'
  | 'mastery'
  | 'hidden';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  condition: string;
  xpReward: number;
}

// --------------- Level ---------------

export interface Level {
  level: number;
  title: string;
  xpRequired: number;
  icon: string;
}

// --------------- Daily Challenge ---------------

export interface DailyChallenge {
  dayOfWeek: number;  // 0 = Sunday … 6 = Saturday
  dayName: string;
  theme: string;
  description: string;
  questionIds: string[];
}

// --------------- User Progress ---------------

export interface TopicProgress {
  topicId: TopicId;
  questionsAttempted: number;
  questionsCorrect: number;
  averageConfidence: number;       // 0‑1
  lastAttempted: string;           // ISO date
  subtopicBreakdown: Record<string, { attempted: number; correct: number }>;
}

export interface SessionRecord {
  id: string;
  date: string;
  durationMinutes: number;
  questionsAttempted: number;
  questionsCorrect: number;
  topicsCovered: TopicId[];
  xpEarned: number;
}

export interface UserProgress {
  userId: string;
  displayName: string;
  joinedDate: string;
  currentLevel: number;
  totalXp: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  achievementsUnlocked: string[];
  topicProgress: TopicProgress[];
  sessionHistory: SessionRecord[];
  dailyChallengesCompleted: number;
  totalQuestionsAttempted: number;
  totalQuestionsCorrect: number;
  bookmarkedQuestions: string[];
  weakAreas: string[];
  strongAreas: string[];
}

// --------------- Content Feedback ---------------

export type ContentFeedbackType = 'question' | 'lesson-question';
export type FeedbackReason = 'confusing' | 'incorrect' | 'too-easy' | 'too-hard' | 'bad-graphic';

export const VALID_CONTENT_TYPES: ContentFeedbackType[] = ['question', 'lesson-question'];
export const VALID_REASONS: FeedbackReason[] = ['confusing', 'incorrect', 'too-easy', 'too-hard', 'bad-graphic'];

export interface UserFlagItem {
  contentType: ContentFeedbackType;
  contentId: string;
  reason: FeedbackReason;
  comment?: string | null;
}

export * from './engagement-types'
