import type { QuestDefinition } from './engagement-types';

// --------------- Chest Rewards ---------------

export const dailyChestReward = { xp: 50, gems: 10 };
export const weeklyChestReward = { xp: 150, gems: 40 };

// --------------- Daily Quest Pool (10 quests) ---------------
//
// Rarity distribution: 4 Common, 3 Rare, 2 Epic, 1 Legendary
// Rewards per rarity — Common: 20 XP / 3 gems, Rare: 30 / 5,
//                       Epic: 45 / 8, Legendary: 70 / 12

export const dailyQuestPool: QuestDefinition[] = [
  // ---- Common (4) ----
  {
    id: 'dq-stale-topic',
    title: 'Practice a Stale Topic',
    description: 'Practice a topic you haven\'t touched in 7+ days.',
    icon: '/quest-icons/stale-topic.png',
    trackingKey: 'stale_topic_practiced',
    target: 1,
    rarity: 'common',
    reward: { xp: 20, gems: 3 },
    tooltip: 'A topic you haven\'t practiced in 7+ days',
  },
  {
    id: 'dq-earn-xp-100',
    title: 'Earn 100 XP',
    description: 'Earn 100 XP in a single day.',
    icon: '/quest-icons/xp.png',
    trackingKey: 'xp_earned',
    target: 100,
    rarity: 'common',
    reward: { xp: 20, gems: 3 },
  },
  {
    id: 'dq-stars-3',
    title: 'Earn 3 Stars',
    description: 'Earn 3 stars across your sessions today.',
    icon: '/quest-icons/stars.png',
    trackingKey: 'stars_earned',
    target: 3,
    rarity: 'common',
    reward: { xp: 20, gems: 3 },
  },
  {
    id: 'dq-unit-lesson',
    title: 'Complete a Lesson',
    description: 'Complete a lesson in your current unit.',
    icon: '/quest-icons/lesson.png',
    trackingKey: 'lessons_completed',
    target: 1,
    rarity: 'common',
    reward: { xp: 20, gems: 3 },
    filter: { currentUnit: true },
  },

  // ---- Rare (3) ----
  {
    id: 'dq-complete-lessons',
    title: 'Complete 2 Lessons',
    description: 'Complete 2 lessons today.',
    icon: '/quest-icons/books-x2.png',
    trackingKey: 'lessons_completed',
    target: 2,
    rarity: 'rare',
    reward: { xp: 30, gems: 5 },
  },
  {
    id: 'dq-accuracy-80',
    title: 'Get 80% Accuracy',
    description: 'Finish a session with 80% or higher accuracy.',
    icon: '/quest-icons/accuracy.png',
    trackingKey: 'accuracy_above_threshold',
    target: 1,
    rarity: 'rare',
    reward: { xp: 30, gems: 5 },
    filter: { threshold: 0.8 },
  },
  {
    id: 'dq-daily-challenge',
    title: 'Complete Daily Challenge',
    description: 'Complete today\'s daily challenge.',
    icon: '/quest-icons/calendar-flame.png',
    trackingKey: 'daily_challenges_completed',
    target: 1,
    rarity: 'rare',
    reward: { xp: 30, gems: 5 },
  },

  // ---- Epic (2) ----
  {
    id: 'dq-correct-answers-15',
    title: 'Answer 15 Correctly',
    description: 'Get 15 questions correct today.',
    icon: '/quest-icons/checkmark.png',
    trackingKey: 'questions_correct',
    target: 15,
    rarity: 'epic',
    reward: { xp: 45, gems: 8 },
  },
  {
    id: 'dq-fast-answers-5',
    title: '5 Fast Answers',
    description: 'Answer 5 questions correctly in under 30 seconds each.',
    icon: '/quest-icons/blocks-arrow.png',
    trackingKey: 'fast_answers',
    target: 5,
    rarity: 'epic',
    reward: { xp: 45, gems: 8 },
    tooltip: 'Answer correctly in under 30 seconds each',
  },

  // ---- Legendary (1) ----
  {
    id: 'dq-perfect-session',
    title: 'Perfect Session',
    description: 'Complete a session with 100% accuracy (min 5 questions).',
    icon: '/quest-icons/diamond.png',
    trackingKey: 'perfect_sessions',
    target: 1,
    rarity: 'legendary',
    reward: { xp: 70, gems: 12 },
    tooltip: '100% accuracy with at least 5 questions',
  },
];

// --------------- Weekly Quest Pool (10 quests) ---------------
//
// Rarity distribution: 4 Common, 3 Rare, 2 Epic, 1 Legendary
// Rewards per rarity — Common: 60 XP / 12 gems, Rare: 90 / 18,
//                       Epic: 130 / 25, Legendary: 200 / 40

export const weeklyQuestPool: QuestDefinition[] = [
  // ---- Common (4) ----
  {
    id: 'wq-lessons-5',
    title: 'Complete 5 Lessons',
    description: 'Complete 5 lessons this week.',
    icon: '/quest-icons/wq-lessons-5.png',
    trackingKey: 'lessons_completed',
    target: 5,
    rarity: 'common',
    reward: { xp: 60, gems: 12 },
  },
  {
    id: 'wq-topics-4',
    title: 'Practice 4 Topics',
    description: 'Practice 4 different topics this week.',
    icon: '/quest-icons/wq-topics-4.png',
    trackingKey: 'topics_practiced',
    target: 4,
    rarity: 'common',
    reward: { xp: 60, gems: 12 },
  },
  {
    id: 'wq-unit-lessons-3',
    title: '3 Unit Lessons',
    description: 'Complete 3 lessons in your current unit.',
    icon: '/quest-icons/wq-unit-lessons-3.png',
    trackingKey: 'lessons_completed',
    target: 3,
    rarity: 'common',
    reward: { xp: 60, gems: 12 },
    filter: { currentUnit: true },
  },
  {
    id: 'wq-correct-50',
    title: '50 Correct Answers',
    description: 'Answer 50 questions correctly this week.',
    icon: '/quest-icons/wq-correct-50.png',
    trackingKey: 'questions_correct',
    target: 50,
    rarity: 'common',
    reward: { xp: 60, gems: 12 },
  },

  // ---- Rare (3) ----
  {
    id: 'wq-xp-500',
    title: 'Earn 500 XP',
    description: 'Earn 500 XP this week.',
    icon: '/quest-icons/wq-xp-500.png',
    trackingKey: 'xp_earned',
    target: 500,
    rarity: 'rare',
    reward: { xp: 90, gems: 18 },
  },
  {
    id: 'wq-stars-3x3',
    title: 'Earn 9 Stars',
    description: 'Get 3 stars in 3 different sessions this week.',
    icon: '/quest-icons/wq-stars-9.png',
    trackingKey: 'stars_earned',
    target: 9,
    rarity: 'rare',
    reward: { xp: 90, gems: 18 },
    tooltip: 'Get 3 stars in 3 different sessions',
  },
  {
    id: 'wq-accuracy-90-x3',
    title: '3 Sessions at 90%+',
    description: 'Achieve 90%+ accuracy in 3 different sessions this week.',
    icon: '/quest-icons/wq-accuracy-90.png',
    trackingKey: 'accuracy_above_threshold',
    target: 3,
    rarity: 'rare',
    reward: { xp: 90, gems: 18 },
    tooltip: '90%+ accuracy in 3 separate sessions',
    filter: { threshold: 0.9 },
  },

  // ---- Epic (2) ----
  {
    id: 'wq-all-daily-challenges',
    title: '7 Daily Challenges',
    description: 'Complete all 7 daily challenges this week.',
    icon: '/quest-icons/wq-challenges-7.png',
    trackingKey: 'daily_challenges_completed',
    target: 7,
    rarity: 'epic',
    reward: { xp: 130, gems: 25 },
  },
  {
    id: 'wq-streak-7',
    title: 'Keep a 7-Day Streak',
    description: 'Maintain a 7-day practice streak.',
    icon: '/quest-icons/wq-streak-7.png',
    trackingKey: 'streak_days',
    target: 7,
    rarity: 'epic',
    reward: { xp: 130, gems: 25 },
  },

  // ---- Legendary (1) ----
  {
    id: 'wq-finish-unit',
    title: 'Finish a Unit',
    description: 'Finish all lessons in a unit this week.',
    icon: '/quest-icons/wq-finish-unit.png',
    trackingKey: 'lessons_completed',
    target: 1,
    rarity: 'legendary',
    reward: { xp: 200, gems: 40 },
    filter: { unitComplete: true },
  },
];

// --------------- Comeback Quests (3 common quests) ---------------

export const comebackQuests: QuestDefinition[] = [
  {
    id: 'cq-answer-questions',
    title: 'Answer 5 Questions',
    description: 'Answer 5 questions to get warmed up.',
    icon: '/quest-icons/cq-answer-5.png',
    trackingKey: 'questions_correct',
    target: 5,
    rarity: 'common',
    reward: { xp: 30, gems: 10 },
  },
  {
    id: 'cq-complete-lesson',
    title: 'Complete 1 Lesson',
    description: 'Complete 1 lesson to rebuild your momentum.',
    icon: '/quest-icons/cq-complete-1.png',
    trackingKey: 'lessons_completed',
    target: 1,
    rarity: 'common',
    reward: { xp: 30, gems: 10 },
  },
  {
    id: 'cq-accuracy-70',
    title: 'Get 70%+ Accuracy',
    description: 'Finish a session with 70%+ accuracy.',
    icon: '/quest-icons/cq-accuracy-70.png',
    trackingKey: 'accuracy_above_threshold',
    target: 1,
    rarity: 'common',
    reward: { xp: 30, gems: 10 },
    filter: { threshold: 0.7 },
  },
];
