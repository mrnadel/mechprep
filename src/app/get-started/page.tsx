'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { signIn } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Loader2,
  ArrowLeft,
  Heart,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { analytics } from '@/lib/mixpanel';
import Link from 'next/link';
import { ProfessionPicker } from '@/components/profession/ProfessionPicker';
import { useCourseStore } from '@/store/useCourseStore';
import { getProfession, PROFESSIONS } from '@/data/professions';
import { getCourseMetaForProfession, loadUnitData } from '@/data/course/course-meta';
import type { Unit, CourseQuestion } from '@/data/course/types';

/* ─── Constants ─── */

const STARTING_HEARTS = 3;
const TOTAL_STEPS = 5;
const PLACEMENT_QUESTION_COUNT = 5;

const SUPPORTED_QUESTION_TYPES = new Set([
  'multiple-choice',
  'true-false',
  'multi-select',
]);

/* ─── Animation Variants ─── */

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -60 : 60, opacity: 0 }),
};

/* ─── Password Strength ─── */

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: '8+ chars', met: password.length >= 8 },
    { label: 'Uppercase', met: /[A-Z]/.test(password) },
    { label: 'Number', met: /\d/.test(password) },
  ];
  if (!password) return null;
  const score = checks.filter((c) => c.met).length;
  return (
    <div className="space-y-2 pt-1">
      <div className="flex gap-1">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              'h-1.5 sm:h-1 flex-1 rounded-full transition-colors',
              i <= score
                ? score === 3 ? 'bg-primary-500' : score === 2 ? 'bg-primary-400' : 'bg-red-400'
                : 'bg-gray-200'
            )}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {checks.map((check) => (
          <span key={check.label} className={cn('text-xs font-bold', check.met ? 'text-primary-500' : 'text-gray-300')}>
            {check.met ? '✓' : '•'} {check.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Google Icon ─── */

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

/* ─── Hearts Display ─── */

function HeartsBar({ hearts, max }: { hearts: number; max: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <motion.div
          key={i}
          animate={i === hearts ? { scale: [1, 0.6, 1], opacity: [1, 0.3, 1] } : {}}
          transition={{ duration: 0.4 }}
        >
          <Heart
            className={cn(
              'w-5 h-5 transition-all',
              i < hearts
                ? 'fill-red-500 text-red-500'
                : 'fill-gray-200 text-gray-200'
            )}
          />
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Out of Hearts Modal (placement version) ─── */

function OutOfHeartsModal({ onRefill }: { onRefill: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-6"
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-xl"
      >
        <div className="flex justify-center gap-1 mb-4">
          {[0, 1, 2].map((i) => (
            <Heart key={i} className="w-8 h-8 fill-gray-200 text-gray-200" />
          ))}
        </div>
        <h3 className="text-2xl font-black text-gray-900 mb-2">Out of hearts!</h3>
        <p className="text-gray-500 text-sm font-semibold mb-6 leading-relaxed">
          No worries. Tap below to refill for free and keep going.
        </p>
        <button
          onClick={onRefill}
          className="w-full py-3.5 rounded-2xl bg-primary-500 text-white font-extrabold text-base transition-all active:translate-y-[2px]"
          style={{ boxShadow: '0 5px 0 #0F766E' }}
        >
          REFILL HEARTS FOR FREE
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ─── Helpers: pick questions from a unit ─── */

interface PlacementQuestion {
  question: CourseQuestion;
  unitIndex: number;
  unitTitle: string;
  unitIcon: string;
}

function pickQuestionsFromUnit(unit: Unit, unitIndex: number, count: number): PlacementQuestion[] {
  // Gather all supported questions across all lessons (skip 'teaching' type)
  const eligible: CourseQuestion[] = [];
  for (const lesson of unit.lessons) {
    for (const q of lesson.questions) {
      if (SUPPORTED_QUESTION_TYPES.has(q.type)) {
        eligible.push(q);
      }
    }
  }

  if (eligible.length === 0) return [];

  // Pick evenly spaced questions
  const picked: PlacementQuestion[] = [];
  const step = Math.max(1, Math.floor(eligible.length / count));
  for (let i = 0; i < count && i * step < eligible.length; i++) {
    picked.push({
      question: eligible[i * step],
      unitIndex,
      unitTitle: unit.title,
      unitIcon: unit.icon,
    });
  }

  return picked;
}

/* ─── Main Component ─── */

export default function GetStartedPage() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);

  // Profession selection
  const publicProfessions = PROFESSIONS.filter(p => !p.requiresAccess);
  const setActiveProfession = useCourseStore((s) => s.setActiveProfession);
  const [selectedProfession, setSelectedProfession] = useState<string>(publicProfessions[0]?.id ?? '');

  // Placement test state
  const [placementQuestions, setPlacementQuestions] = useState<PlacementQuestion[]>([]);
  const [placementIndex, setPlacementIndex] = useState(0);
  const [placementAnswer, setPlacementAnswer] = useState<number[] | null>(null);
  const [placementRevealed, setPlacementRevealed] = useState(false);
  const [highestPassedUnit, setHighestPassedUnit] = useState(-1);
  const [placedUnitIndex, setPlacedUnitIndex] = useState(0);
  const [loadingUnits, setLoadingUnits] = useState(false);
  const [placementDone, setPlacementDone] = useState(false);
  const loadingRef = useRef(false);

  // Self-assessment level: determines which unit range the test draws from
  const [testStartUnit, setTestStartUnit] = useState(0);

  // Hearts
  const [hearts, setHearts] = useState(STARTING_HEARTS);
  const [showOutOfHearts, setShowOutOfHearts] = useState(false);

  // Navigation loading
  const [navigating, setNavigating] = useState(false);

  // Account creation
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const nextStep = useCallback(() => {
    setDirection(1);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  }, []);

  const prevStep = useCallback(() => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  }, []);

  // Track which start unit was loaded so we reload if the user picks a different level
  const loadedForStartUnit = useRef<number | null>(null);

  // Load placement test questions when entering step 2
  useEffect(() => {
    if (step !== 2) return;
    if (loadingRef.current) return;
    if (placementQuestions.length > 0 && loadedForStartUnit.current === testStartUnit) return;
    loadingRef.current = true;
    loadedForStartUnit.current = testStartUnit;
    // Reset placement state for fresh test
    setPlacementIndex(0);
    setPlacementAnswer(null);
    setPlacementRevealed(false);
    setHighestPassedUnit(-1);
    setHearts(STARTING_HEARTS);
    setPlacementDone(false);
    setPlacementQuestions([]);

    async function loadPlacementQuestions() {
      setLoadingUnits(true);
      const meta = getCourseMetaForProfession(selectedProfession);
      const totalUnits = meta.length;
      const allQuestions: PlacementQuestion[] = [];

      // Sample from testStartUnit onwards, picking evenly spaced units
      const rangeStart = testStartUnit;
      const rangeEnd = totalUnits - 1;
      const rangeSize = rangeEnd - rangeStart + 1;
      const count = Math.min(PLACEMENT_QUESTION_COUNT, rangeSize);

      const unitIndices: number[] = [];
      if (rangeSize <= count) {
        for (let i = rangeStart; i <= rangeEnd; i++) unitIndices.push(i);
      } else {
        for (let i = 0; i < count; i++) {
          unitIndices.push(rangeStart + Math.round(i * (rangeSize - 1) / (count - 1)));
        }
      }

      // Load only the selected units, pick 1 question from each
      for (const idx of unitIndices) {
        try {
          const fullUnit = await loadUnitData(idx, selectedProfession);
          const picked = pickQuestionsFromUnit(fullUnit, idx, 1);
          allQuestions.push(...picked);
        } catch {
          // Skip units that fail to load
        }
      }

      setPlacementQuestions(allQuestions);
      setLoadingUnits(false);
      loadingRef.current = false;
    }

    loadPlacementQuestions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, selectedProfession, testStartUnit]);

  // Check answer for placement question
  const handlePlacementAnswer = (selectedIndices: number[]) => {
    if (placementRevealed || showOutOfHearts) return;
    setPlacementAnswer(selectedIndices);
    setPlacementRevealed(true);

    const q = placementQuestions[placementIndex].question;
    const isCorrect = checkAnswer(q, selectedIndices);

    if (isCorrect) {
      const unitIdx = placementQuestions[placementIndex].unitIndex;
      setHighestPassedUnit((prev) => Math.max(prev, unitIdx));
    } else {
      const newHearts = hearts - 1;
      setHearts(newHearts);
      if (newHearts <= 0) {
        setTimeout(() => setShowOutOfHearts(true), 800);
      }
    }
  };

  const handleNextPlacementQuestion = () => {
    if (placementIndex + 1 >= placementQuestions.length) {
      // All questions done, user aced it
      finishPlacement();
    } else {
      setPlacementIndex((prev) => prev + 1);
      setPlacementAnswer(null);
      setPlacementRevealed(false);
    }
  };

  const finishPlacement = useCallback(() => {
    const placed = highestPassedUnit + 1;
    setPlacedUnitIndex(placed);
    setPlacementDone(true);
  }, [highestPassedUnit]);

  // Refill hearts and continue the placement test
  const handleRefillHearts = () => {
    setHearts(STARTING_HEARTS);
    setShowOutOfHearts(false);
  };

  // When placement test finishes (aced all), go to signup
  useEffect(() => {
    if (placementDone) {
      setDirection(1);
      setStep(3);
    }
  }, [placementDone]);

  // "I'm new" handler: skip test, place at unit 0
  const handleNewUser = () => {
    setPlacedUnitIndex(0);
    setDirection(1);
    setStep(3);
  };

  // Level option handler: set the starting range and go to placement test
  const handleLevelChoice = (startFraction: number) => {
    const meta = getCourseMetaForProfession(selectedProfession);
    const startIdx = Math.floor(startFraction * meta.length);
    setTestStartUnit(startIdx);
    nextStep();
  };

  const handleProfessionContinue = () => {
    setActiveProfession(selectedProfession);
    nextStep();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, displayName }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Registration failed');
        setLoading(false);
        return;
      }

      analytics.auth({ action: 'signup', method: 'credentials' });

      const result = await signIn('credentials', { email, password, redirect: false });

      if (result?.error) {
        setError('Account created but login failed. Try signing in.');
        setLoading(false);
      } else {
        nextStep();
        setLoading(false);
      }
    } catch {
      setError('Something went wrong. Please try again.');
      analytics.error({ action: 'signup', message: 'Registration request failed', source: 'get_started' });
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    setGoogleLoading(true);
    analytics.auth({ action: 'signup', method: 'google' });
    // Save placement before redirecting
    try {
      sessionStorage.setItem(
        'octokeen-placement',
        JSON.stringify({ professionId: selectedProfession, unitIndex: placedUnitIndex })
      );
    } catch {}
    signIn('google', { callbackUrl: '/' });
  };

  const completeOnboarding = () => {
    if (navigating) return;
    setNavigating(true);
    setActiveProfession(selectedProfession);
    // Save placement to sessionStorage
    try {
      sessionStorage.setItem(
        'octokeen-placement',
        JSON.stringify({ professionId: selectedProfession, unitIndex: placedUnitIndex })
      );
    } catch {}
    analytics.milestone({ type: 'onboarding_completed' });
    window.location.href = '/';
  };

  const canGoBack = step > 0 && step < TOTAL_STEPS - 1;

  // Get the placed unit name for the ready screen
  const meta = getCourseMetaForProfession(selectedProfession);
  const placedUnitName = meta[placedUnitIndex]?.title ?? `Unit ${placedUnitIndex + 1}`;

  return (
    <div className="min-h-[100dvh] bg-white flex flex-col">
      {/* Out of Hearts Modal */}
      <AnimatePresence>
        {showOutOfHearts && <OutOfHeartsModal onRefill={handleRefillHearts} />}
      </AnimatePresence>

      {/* Loading Overlay */}
      <AnimatePresence>
        {navigating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center gap-4"
          >
            <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
            <p className="text-lg font-black text-gray-900">Preparing your course...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Bar */}
      <div className="px-5 pt-4 pb-2">
        <div className="flex gap-1.5 max-w-lg mx-auto">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className={cn(
                'h-2 rounded-full flex-1 transition-all duration-500',
                i < step ? 'bg-primary-500' : i === step ? 'bg-primary-500/60' : 'bg-gray-100'
              )}
            />
          ))}
        </div>
        <div className="flex items-center justify-between mt-3 max-w-lg mx-auto">
          {canGoBack ? (
            <button onClick={prevStep} className="flex items-center gap-1 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          ) : <div />}
          <span className="text-xs font-bold text-gray-300 tabular-nums">{step + 1} / {TOTAL_STEPS}</span>
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 px-4 sm:px-5 flex flex-col justify-center pb-4 sm:pb-8">
        <AnimatePresence mode="wait" custom={direction}>

          {/* Step 0: Choose Course */}
          {step === 0 && (
            <motion.div
              key="profession"
              custom={direction}
              variants={slideVariants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="max-w-lg mx-auto w-full"
            >
              <motion.div
                className="text-center mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">
                  What do you want to learn?
                </h2>
                <p className="text-gray-400 text-sm sm:text-base font-semibold">
                  Pick a course to get started
                </p>
              </motion.div>

              <ProfessionPicker
                selectedId={selectedProfession}
                onSelect={setSelectedProfession}
                filterOut={['mechanical-engineering']}
              />

              <motion.div
                className="mt-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <button
                  onClick={handleProfessionContinue}
                  disabled={!selectedProfession}
                  className={cn(
                    'w-full py-3.5 rounded-2xl font-extrabold text-base transition-all active:translate-y-[2px]',
                    selectedProfession ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  )}
                  style={{ boxShadow: selectedProfession ? '0 5px 0 #0F766E' : 'none' }}
                >
                  CONTINUE
                </button>
              </motion.div>

              <p className="text-center text-gray-400 text-sm font-semibold mt-5">
                Already have an account?{' '}
                <Link href="/login" className="text-primary-500 font-bold">Log in</Link>
              </p>
            </motion.div>
          )}

          {/* Step 1: "Already know some?" prompt */}
          {step === 1 && (
            <motion.div
              key="know-some"
              custom={direction}
              variants={slideVariants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="max-w-lg mx-auto w-full"
            >
              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">
                  Already know some {getProfession(selectedProfession)?.name ?? 'of this'}?
                </h2>
                <p className="text-gray-400 text-sm sm:text-base font-semibold">
                  Take a quick test to find your starting level, or begin from scratch.
                </p>
              </motion.div>

              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {[
                  { emoji: '\uD83C\uDF31', label: "I'm new to this", desc: 'Start from the basics', action: () => handleNewUser() },
                  { emoji: '\uD83D\uDCA1', label: 'I know a little', desc: 'Test me on the early stuff', action: () => handleLevelChoice(0) },
                  { emoji: '\uD83D\uDCDA', label: 'I know a fair amount', desc: 'Test me on intermediate topics', action: () => handleLevelChoice(0.3) },
                  { emoji: '\uD83C\uDFAF', label: 'I know a lot', desc: 'Challenge me with advanced topics', action: () => handleLevelChoice(0.6) },
                ].map((opt, i) => (
                  <motion.button
                    key={opt.label}
                    onClick={opt.action}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.06 }}
                    className="w-full p-4 rounded-2xl border-2 border-gray-200 bg-white hover:border-primary-300 hover:bg-primary-50/30 transition-all text-left group"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{opt.emoji}</span>
                      <div>
                        <p className="text-base font-black text-gray-900 group-hover:text-primary-600 transition-colors">
                          {opt.label}
                        </p>
                        <p className="text-sm font-semibold text-gray-400 mt-0.5">
                          {opt.desc}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Step 2: Placement Test */}
          {step === 2 && (
            <motion.div
              key="placement"
              custom={direction}
              variants={slideVariants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="max-w-lg mx-auto w-full"
            >
              {loadingUnits ? (
                <div className="flex flex-col items-center justify-center gap-4 py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
                  <p className="text-base font-black text-gray-900">Loading placement test...</p>
                  <p className="text-sm font-semibold text-gray-400">Preparing questions from your course</p>
                </div>
              ) : placementQuestions.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-4 py-20">
                  <p className="text-base font-black text-gray-900">No questions available</p>
                  <button
                    onClick={() => { setPlacedUnitIndex(0); setDirection(1); setStep(3); }}
                    className="py-3 px-8 rounded-2xl bg-primary-500 text-white font-extrabold text-base transition-all active:translate-y-[2px]"
                    style={{ boxShadow: '0 5px 0 #0F766E' }}
                  >
                    START FROM BASICS
                  </button>
                </div>
              ) : (
                <>
                  {/* Progress header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-black text-primary-500 uppercase tracking-wider block truncate">
                        {placementQuestions[placementIndex]?.unitIcon}{' '}
                        Unit {placementQuestions[placementIndex]?.unitIndex + 1}: {placementQuestions[placementIndex]?.unitTitle}
                      </span>
                      <span className="text-xs font-bold text-gray-400 mt-0.5 block">
                        Question {placementIndex + 1} / {placementQuestions.length}
                      </span>
                    </div>
                    <HeartsBar hearts={hearts} max={STARTING_HEARTS} />
                  </div>

                  {/* Progress bar for questions */}
                  <div className="w-full h-1.5 bg-gray-100 rounded-full mb-5 overflow-hidden">
                    <motion.div
                      className="h-full bg-primary-500 rounded-full"
                      initial={false}
                      animate={{ width: `${((placementIndex) / placementQuestions.length) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  {/* Question card */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={placementIndex}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.2 }}
                    >
                      <PlacementQuestionCard
                        pq={placementQuestions[placementIndex]}
                        selectedAnswer={placementAnswer}
                        revealed={placementRevealed}
                        showOutOfHearts={showOutOfHearts}
                        onAnswer={handlePlacementAnswer}
                        onNext={handleNextPlacementQuestion}
                        isLast={placementIndex + 1 >= placementQuestions.length}
                      />
                    </motion.div>
                  </AnimatePresence>
                </>
              )}
            </motion.div>
          )}

          {/* Step 3: Create Account */}
          {step === 3 && (
            <motion.div
              key="signup"
              custom={direction}
              variants={slideVariants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="max-w-sm mx-auto w-full"
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-black text-gray-900 mb-1">Save your progress</h2>
                <p className="text-gray-400 text-sm font-semibold">Create a free account to start learning</p>
              </div>

              <button
                onClick={handleGoogleSignIn}
                disabled={googleLoading}
                className="w-full flex items-center justify-center gap-3 px-4 py-3.5 bg-white border-2 border-gray-200 rounded-2xl text-gray-700 font-bold hover:border-gray-300 disabled:opacity-60 transition-colors mb-4"
              >
                {googleLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <GoogleIcon />}
                {googleLoading ? 'Redirecting to Google...' : 'Continue with Google'}
              </button>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">or</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center font-semibold">{error}</div>
                )}
                <input type="text" placeholder="Name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required minLength={2} maxLength={50}
                  className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-900 font-semibold placeholder-gray-300 focus:outline-none focus:border-primary-500 focus:bg-white transition-colors" />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required
                  className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-900 font-semibold placeholder-gray-300 focus:outline-none focus:border-primary-500 focus:bg-white transition-colors" />
                <div>
                  <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8}
                    className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-900 font-semibold placeholder-gray-300 focus:outline-none focus:border-primary-500 focus:bg-white transition-colors" />
                  <PasswordStrength password={password} />
                </div>
                <button type="submit" disabled={loading || password.length < 8}
                  className={cn('w-full py-3.5 rounded-2xl font-extrabold text-base transition-all active:translate-y-[2px]',
                    loading || password.length < 8 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-primary-500 text-white')}
                  style={{ boxShadow: loading || password.length < 8 ? 'none' : '0 5px 0 #0F766E' }}>
                  {loading ? <span className="flex items-center justify-center gap-2"><Loader2 className="w-5 h-5 animate-spin" />Creating account...</span> : 'CREATE ACCOUNT'}
                </button>
              </form>

              <p className="text-center text-gray-400 text-sm font-semibold mt-5">
                Already have an account?{' '}<Link href="/login" className="text-primary-500 font-bold">Log in</Link>
              </p>
            </motion.div>
          )}

          {/* Step 4: Ready */}
          {step === 4 && (
            <motion.div
              key="ready"
              custom={direction}
              variants={slideVariants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="text-center max-w-sm mx-auto w-full"
            >
              <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 12 }} className="text-5xl mb-6">
                &#x1F680;
              </motion.div>

              <motion.h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                You&apos;re all set!
              </motion.h2>

              {placedUnitIndex > 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-6"
                >
                  <div className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-primary-500/10 mb-3">
                    <span className="text-lg">{meta[placedUnitIndex]?.icon ?? '&#x1F3AF;'}</span>
                    <span className="text-base font-black text-primary-600">
                      Unit {placedUnitIndex + 1}: {placedUnitName}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm font-semibold leading-relaxed">
                    You placed into Unit {placedUnitIndex + 1}! We skipped {placedUnitIndex} {placedUnitIndex === 1 ? 'unit' : 'units'} based on your test.
                  </p>
                </motion.div>
              ) : (
                <motion.p className="text-gray-500 text-base mb-6 leading-relaxed" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  Dive in and master {getProfession(selectedProfession)?.name ?? 'your course'}!
                </motion.p>
              )}

              <motion.button
                onClick={completeOnboarding}
                disabled={navigating}
                className="w-full py-4 rounded-2xl bg-primary-500 text-white font-extrabold text-lg transition-all active:translate-y-[2px] disabled:opacity-70 flex items-center justify-center gap-2"
                style={{ boxShadow: navigating ? 'none' : '0 5px 0 #0F766E' }}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                whileTap={{ scale: 0.98 }}
              >
                {navigating ? <><Loader2 className="w-5 h-5 animate-spin" />Loading your course...</> : 'START LEARNING'}
              </motion.button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Answer Checking ─── */

function checkAnswer(q: CourseQuestion, selectedIndices: number[]): boolean {
  switch (q.type) {
    case 'multiple-choice':
      return selectedIndices[0] === q.correctIndex;
    case 'true-false':
      // index 0 = True, index 1 = False
      return (selectedIndices[0] === 0) === q.correctAnswer;
    case 'multi-select': {
      if (!q.correctIndices) return false;
      const sorted = [...selectedIndices].sort();
      const correctSorted = [...q.correctIndices].sort();
      return sorted.length === correctSorted.length && sorted.every((v, i) => v === correctSorted[i]);
    }
    default:
      return false;
  }
}

/* ─── Placement Question Card ─── */

function PlacementQuestionCard({
  pq,
  selectedAnswer,
  revealed,
  showOutOfHearts,
  onAnswer,
  onNext,
  isLast,
}: {
  pq: PlacementQuestion;
  selectedAnswer: number[] | null;
  revealed: boolean;
  showOutOfHearts: boolean;
  onAnswer: (indices: number[]) => void;
  onNext: () => void;
  isLast: boolean;
}) {
  const q = pq.question;
  const isMultiSelect = q.type === 'multi-select';
  const [multiSelections, setMultiSelections] = useState<number[]>([]);

  // Reset multi-selections when question changes
  useEffect(() => {
    setMultiSelections([]);
  }, [q.id]);

  const options = q.type === 'true-false'
    ? ['True', 'False']
    : q.options ?? [];

  const isCorrect = selectedAnswer !== null && checkAnswer(q, selectedAnswer);

  const handleOptionClick = (idx: number) => {
    if (revealed || showOutOfHearts) return;

    if (isMultiSelect) {
      setMultiSelections((prev) =>
        prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
      );
    } else {
      onAnswer([idx]);
    }
  };

  const handleMultiSelectSubmit = () => {
    if (multiSelections.length === 0) return;
    onAnswer(multiSelections);
  };

  return (
    <>
      {/* Question */}
      <div className="bg-gray-50 rounded-2xl px-5 py-4 mb-5">
        {q.type === 'multi-select' && (
          <span className="text-xs font-black text-amber-500 uppercase tracking-wider mb-2 block">
            Select all that apply
          </span>
        )}
        <h2 className="text-base sm:text-lg font-black text-gray-900 leading-snug">
          {q.question}
        </h2>
      </div>

      {/* Options */}
      <div className="space-y-2.5 mb-5">
        {options.map((opt, idx) => {
          const isSelected = isMultiSelect
            ? (revealed ? selectedAnswer?.includes(idx) : multiSelections.includes(idx))
            : selectedAnswer?.[0] === idx;

          let isOptionCorrect = false;
          if (q.type === 'true-false') {
            isOptionCorrect = (idx === 0) === q.correctAnswer;
          } else if (q.type === 'multi-select') {
            isOptionCorrect = q.correctIndices?.includes(idx) ?? false;
          } else {
            isOptionCorrect = idx === q.correctIndex;
          }

          let optionStyle = 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50';
          if (revealed) {
            if (isOptionCorrect) optionStyle = 'border-primary-500 bg-primary-500/5';
            else if (isSelected && !isOptionCorrect) optionStyle = 'border-red-400 bg-red-50';
            else optionStyle = 'border-gray-100 bg-gray-50 opacity-60';
          } else if (isSelected) {
            optionStyle = 'border-primary-400 bg-primary-50';
          }

          const label = String.fromCharCode(65 + idx); // A, B, C, D...

          return (
            <motion.button
              key={idx}
              onClick={() => handleOptionClick(idx)}
              disabled={revealed}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 + idx * 0.04 }}
              className={cn(
                'w-full flex items-start gap-3 p-3.5 min-h-[48px] rounded-xl border-2 transition-all text-left',
                optionStyle
              )}
            >
              <span className={cn(
                'w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0 mt-0.5',
                revealed && isOptionCorrect ? 'bg-primary-500 text-white'
                  : revealed && isSelected && !isOptionCorrect ? 'bg-red-400 text-white'
                  : isSelected && !revealed ? 'bg-primary-400 text-white'
                  : 'bg-gray-100 text-gray-500'
              )}>
                {revealed && isOptionCorrect ? '✓' : revealed && isSelected && !isOptionCorrect ? '✗' : label}
              </span>
              <span className="text-sm font-semibold text-gray-700 leading-snug">{opt}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Multi-select submit button (before revealing) */}
      {isMultiSelect && !revealed && (
        <button
          onClick={handleMultiSelectSubmit}
          disabled={multiSelections.length === 0}
          className={cn(
            'w-full py-3.5 rounded-2xl font-extrabold text-base transition-all active:translate-y-[2px] mb-5',
            multiSelections.length === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-primary-500 text-white'
          )}
          style={{ boxShadow: multiSelections.length === 0 ? 'none' : '0 5px 0 #0F766E' }}
        >
          CHECK ANSWER
        </button>
      )}

      {/* Feedback + Next */}
      <AnimatePresence>
        {revealed && !showOutOfHearts && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className={cn(
              'p-4 rounded-xl mb-5 flex items-start gap-3',
              isCorrect
                ? 'bg-primary-500/10 border border-primary-500/20'
                : 'bg-orange-50 border border-orange-200'
            )}>
              {isCorrect
                ? <CheckCircle2 className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                : <XCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
              }
              <div>
                <p className={cn(
                  'font-black text-sm mb-1',
                  isCorrect ? 'text-primary-500' : 'text-orange-600'
                )}>
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {q.explanation}
                </p>
              </div>
            </div>

            <button
              onClick={onNext}
              className="w-full py-3.5 rounded-2xl bg-primary-500 text-white font-extrabold text-base transition-all active:translate-y-[2px]"
              style={{ boxShadow: '0 5px 0 #0F766E' }}
            >
              {isLast ? 'FINISH TEST' : 'NEXT QUESTION'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
