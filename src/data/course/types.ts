import type { TopicId } from '../types';

export type QuestionType = 'multiple-choice' | 'true-false' | 'fill-blank' | 'teaching' | 'sort-buckets' | 'match-pairs' | 'order-steps' | 'multi-select' | 'slider-estimate' | 'scenario' | 'category-swipe' | 'rank-order' | 'pick-the-best' | 'image-tap';

// ─── Lesson Types ──────────────────────────────────────────
export type LessonType = 'standard' | 'conversation' | 'speed-round' | 'timeline' | 'case-study';

// Conversation — branching chat dialogue
export interface ConversationOption {
  text: string;
  nextNodeId: string;
  quality: 'great' | 'okay' | 'poor';
  feedback: string;
}
export interface ConversationNode {
  id: string;
  speaker: string;
  message: string;
  nextNodeId?: string;        // auto-advance for narration-only nodes
  options?: ConversationOption[];
}

// Speed Round — timed rapid-fire questions
export interface SpeedQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

// Timeline — branching narrative with consequences
export interface TimelineChoice {
  text: string;
  nextStageId: string;
  impact: string;
  optimal: boolean;
}
export interface TimelineStage {
  id: string;
  narrative: string;
  emoji?: string;
  choices?: TimelineChoice[];
}
export interface TimelineOutcome {
  title: string;
  description: string;
  score: 'great' | 'good' | 'poor';
}

// Case Study — narrative with embedded question checkpoints
export interface CaseStudySection {
  id: string;
  content: string;
  checkpoint?: CourseQuestion;
}

// Props shared by all lesson type renderers
export interface LessonTypeProps {
  lesson: Lesson;
  unitColor: string;
  theme: { color: string; dark: string; bg: string };
  isGolden: boolean;
  isDoubleXp: boolean;
  onAnswer: (questionId: string, correct: boolean) => void;
  onProgress: (current: number, total: number) => void;
  onComplete: () => void;
  checkHearts: () => boolean;
}

export interface CourseQuestion {
  id: string;
  type: QuestionType;
  question: string;
  // Multiple-choice
  options?: string[];
  correctIndex?: number;
  // True-false
  correctAnswer?: boolean;
  // Fill-blank (Duolingo word-bank style)
  blanks?: string[];       // correct answer for each _____ in order
  wordBank?: string[];     // all word choices (correct + distractors), shuffled at render
  acceptedAnswers?: string[]; // legacy fallback
  // Sort-buckets
  buckets?: string[];          // bucket labels (e.g. ["Need", "Want"])
  correctBuckets?: number[];   // correct bucket index for each option
  // Match-pairs
  matchTargets?: string[];     // right column items
  correctMatches?: number[];   // options[i] matches matchTargets[correctMatches[i]]
  // Order-steps
  steps?: string[];              // items to reorder
  correctOrder?: number[];       // correct sequence (indices into steps[])
  // Multi-select
  correctIndices?: number[];     // all correct option indices (uses options[])
  // Slider-estimate
  sliderMin?: number;
  sliderMax?: number;
  correctValue?: number;
  tolerance?: number;            // % tolerance (e.g. 10 = within 10% is correct)
  unit?: string;                 // display unit ("$", "%", "years", etc.)
  // Scenario
  scenario?: string;             // the situation/story text (uses options[] + correctIndex)
  // Category-swipe (reuses options[], buckets[0]=left, buckets[1]=right, correctBuckets[])
  // Rank-order (reuses steps[], correctOrder[])
  rankCriteria?: string;         // e.g. "Risk level: lowest → highest"
  // Pick-the-best (reuses options[], correctIndex — all options are valid, one is BEST)
  // Image-tap
  tapZones?: { id: string; label: string; x: number; y: number; w: number; h: number }[];
  correctZoneId?: string;
  // Common
  explanation: string;
  /** Per-wrong-option explanation keyed by original option index. Shown when user picks that distractor. */
  distractorExplanations?: Record<number, string>;
  hint?: string;
  diagram?: string;
  // Localized content variants (keyed by ISO 3166-1 alpha-2 country code)
  variants?: Record<string, string>;  // e.g. { US: '...', GB: '...', AU: '...', IL: '...' }
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  type?: LessonType;
  levels?: number;             // max mastery levels / stacks (default 1)
  questions: CourseQuestion[];
  // Conversation
  conversationNodes?: ConversationNode[];
  conversationStartNodeId?: string;
  // Speed Round
  speedQuestions?: SpeedQuestion[];
  speedTimeLimit?: number;          // seconds, default 60
  // Timeline
  timelineStages?: TimelineStage[];
  timelineStartStageId?: string;
  timelineOutcomes?: Record<string, TimelineOutcome>;
  // Case Study
  caseStudySections?: CaseStudySection[];
  caseStudyTitle?: string;
  // Background
  background?: string;          // key into backgrounds library (e.g. 'space-stars')
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: string;
  topicId?: TopicId;
  // Section grouping (for courses with 100+ units)
  // Units with the same sectionIndex are grouped under the sectionTitle header on the course map
  sectionIndex?: number;       // 1-15, determines order and grouping
  sectionTitle?: string;       // displayed as a full-width banner between unit groups
  /** URL to an SVG/image used as the unit header background (replaces CSS gradient pattern) */
  headerBg?: string;
  lessons: Lesson[];
}

export interface LessonProgress {
  stars: number;       // 1-3 based on successful attempt count (not accuracy)
  bestAccuracy: number;
  attempts: number;    // incremented on every completion
  lastAttempted: string;
  passed: boolean;                // true once user completes the lesson
  golden: boolean;                // achieved golden mastery
  answeredQuestionIds: string[];  // questions seen across all attempts
  correctQuestionIds: string[];   // questions answered correctly at least once
}

export interface CourseIntroData {
  experienceLevel: 0 | 1 | 2 | 3;
  placementChoice: 'scratch' | 'test' | 'advanced';
  goal: 'interview' | 'refresh' | 'exam' | 'curiosity';
  dailyMinutes: 5 | 10 | 15 | 20;
  completedAt: string;
  placementDone?: boolean;
  placementUnitIndex?: number;
}

export interface CourseProgress {
  displayName: string;
  totalXp: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  activeDays: string[];  // YYYY-MM-DD dates of recent activity (last 14 days, local only)
  completedLessons: Record<string, LessonProgress>;
  courseIntros?: Record<string, CourseIntroData>;
  /** Unit index from placement test. All lessons before this unit are unlocked (but not completed). */
  placementUnitIndex?: number;
  /** IDs of story unlocks the user has already seen. Separate field per CR-C17. */
  viewedStoryUnlocks?: string[];
}

export interface ActiveLesson {
  unitIndex: number;
  lessonIndex: number;
  currentQuestionIndex: number;
  answers: { questionId: string; correct: boolean; selectedIndex?: number }[];
  startTime: number;
  sessionQuestionIds: string[];
  isGolden: boolean;
  /** IDs of review questions interleaved from earlier units (for UI badge). */
  reviewQuestionIds?: string[];
  /** Count of questions answered correctly while in cruising mode (100% rolling accuracy). */
  cruisingCorrectCount?: number;
}

export interface LessonResult {
  lessonId: string;
  unitTitle: string;
  lessonTitle: string;
  totalQuestions: number;
  correctAnswers: number;
  xpEarned: number;
  accuracy: number;
  stars: number;
  passed: boolean;        // always true (completing = passing)
  isFlawless: boolean;    // true if 100% accuracy with >= 3 questions
  isNewBest: boolean;
  isFirstCompletion: boolean;
  isGolden: boolean;
  /** XP multiplier from active events at time of completion (1 = no events). */
  eventXpMultiplier?: number;
  /** Name(s) of active events at time of completion. */
  activeEventNames?: string[];
}

// ─── Placement Test ──────────────────────────────────────────────

export interface PlacementTest {
  targetUnitIndex: number;
  fromUnitIndex: number;       // first skipped unit
  questions: CourseQuestion[];
  currentQuestionIndex: number;
  answers: { questionId: string; correct: boolean }[];
  mistakes: number;
  maxMistakes: number;
  startTime: number;
}

export interface PlacementTestResult {
  passed: boolean;
  targetUnitIndex: number;
  targetUnitTitle: string;
  totalQuestions: number;
  correctAnswers: number;
  mistakes: number;
  maxMistakes: number;
  unitsSkipped: number;
  xpEarned: number;
  accuracy: number;
}

export interface GlossaryEntry {
  term: string;
  definition: string;
  sectionIndex: number;
  relatedTerms?: string[];
}
