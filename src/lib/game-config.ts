// ── Game Configuration Constants ──
// Single source of truth for all gameplay-tuning numbers.
// Change values here to adjust game balance across the entire app.

// --------------- Hearts ---------------

export const MAX_HEARTS = 5;
export const HEART_REGEN_INTERVAL_MS = 14_400_000; // 4 hours

// --------------- XP System ---------------

export const BASE_XP = {
  beginner: 20,
  intermediate: 35,
  advanced: 55,
} as const;

/** Fraction of base XP awarded for an incorrect answer. */
export const INCORRECT_ANSWER_XP_RATE = 0.15;

/** Speed bonus multipliers applied when answering quickly. */
export const SPEED_BONUS = {
  FAST_THRESHOLD_S: 15,
  FAST_MULTIPLIER: 1.3,
  MEDIUM_THRESHOLD_S: 30,
  MEDIUM_MULTIPLIER: 1.15,
} as const;

/** Confidence-calibration multipliers. */
export const CONFIDENCE_BONUS = {
  /** Confident (>=4) and correct */
  CORRECT_CONFIDENT: 1.1,
  /** Surprised (<=2) and correct — learning moment */
  CORRECT_SURPRISED: 1.2,
} as const;

// --------------- Star Ratings ---------------

export const STAR_THRESHOLDS = {
  THREE_STARS: 90,
  TWO_STARS: 50,
} as const;

// --------------- Sessions ---------------

export const SESSION_SIZE = 10;

// --------------- Mastery ---------------

/** Volume of attempts that caps the mastery formula. */
export const MASTERY_VOLUME_CAP = 20;

// --------------- Daily Goals ---------------

/** Maps daily-minutes commitment to XP target. */
export const DAILY_XP_MAP: Record<number, number> = {
  5: 40,
  10: 80,
  15: 120,
  20: 200,
};

// --------------- Double XP ---------------

/** Buffer added when validating double-XP expiry to account for clock drift. */
export const DOUBLE_XP_BUFFER_MS = 5_000;
/** Window after a shop purchase that counts as "recent" for tamper checks. */
export const DOUBLE_XP_RECENT_PURCHASE_WINDOW_MS = 5 * 60 * 1000;

// --------------- Interview Readiness ---------------

export const INTERVIEW_READINESS = {
  WEIGHTS: { coverage: 0.3, accuracy: 0.4, depth: 0.3 },
  MIN_COVERAGE_ATTEMPTS: 5,
  MIN_DEPTH_ATTEMPTS: 15,
} as const;

// --------------- Password Validation ---------------

export const PASSWORD_MIN_LENGTH = 8;

// --------------- Adaptive Difficulty ---------------

/** Number of recent answers to consider for rolling accuracy. */
export const ADAPTIVE_ROLLING_WINDOW = 5;
/** Rolling accuracy at or below this triggers struggling mode. */
export const ADAPTIVE_STRUGGLING_THRESHOLD = 0.4;
/** Rolling accuracy at or above this triggers cruising mode (must be perfect). */
export const ADAPTIVE_CRUISING_THRESHOLD = 1.0;
/** XP multiplier bonus per question answered correctly during cruising mode. */
export const ADAPTIVE_CRUISING_XP_BONUS = 1.5;
/** Minimum answers before adaptive mode kicks in. */
export const ADAPTIVE_MIN_ANSWERS = 3;
