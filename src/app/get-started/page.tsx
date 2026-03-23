'use client';

import { useState, useCallback } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  Rocket,
  Sparkles,
  ArrowLeft,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { analytics } from '@/lib/mixpanel';
import Link from 'next/link';

/* ─── Constants ─── */

const TOTAL_STEPS = 4;

const SAMPLE_QUESTIONS = [
  {
    topic: 'thermodynamics',
    topicIcon: '🔥',
    question: 'You leave the refrigerator door open in a sealed, insulated kitchen. After several hours, the kitchen temperature will:',
    options: [
      { id: 'a', text: 'Decrease — the fridge is cooling the room' },
      { id: 'b', text: 'Stay the same — cooling and heating balance out' },
      { id: 'c', text: 'Increase — the compressor motor adds net energy' },
      { id: 'd', text: 'Decrease, then increase once the compressor overheats' },
    ],
    correctAnswer: 'c',
    explanation: 'A refrigerator moves heat from inside to outside, plus the compressor adds work energy. With the door open, the net effect is the compressor\'s work being added as heat to the room.',
  },
  {
    topic: 'fluid-mechanics',
    topicIcon: '💧',
    question: 'An airplane wing generates lift primarily because:',
    options: [
      { id: 'a', text: 'Air on top travels a longer path and must go faster (equal transit time)' },
      { id: 'b', text: 'The wing deflects air downward — Newton\'s third law pushes it up' },
      { id: 'c', text: 'Circulation and angle of attack make air faster on top, creating lower pressure (Bernoulli)' },
      { id: 'd', text: 'The wing shape creates a vacuum above it' },
    ],
    correctAnswer: 'c',
    explanation: 'The "equal transit time" theory is a myth! Air moves faster over the top due to circulation and angle of attack, not because it must meet at the trailing edge. This pressure difference creates lift.',
  },
  {
    topic: 'strength-of-materials',
    topicIcon: '🏗️',
    question: 'A bolt is tightened to clamp two plates together. What type of stress is the bolt primarily under?',
    options: [
      { id: 'a', text: 'Pure shear stress along the thread interface' },
      { id: 'b', text: 'Tensile stress along its axis from the preload' },
      { id: 'c', text: 'Compressive stress — it\'s being squeezed by the nut' },
      { id: 'd', text: 'Bending stress from plate misalignment' },
    ],
    correctAnswer: 'b',
    explanation: 'When you torque a bolt, the nut pulls the bolt head and stretches the shank — creating axial tensile stress (preload). The plates are compressed, not the bolt!',
  },
  {
    topic: 'heat-transfer',
    topicIcon: '🌡️',
    question: 'Why does blowing on hot soup cool it down faster?',
    options: [
      { id: 'a', text: 'Your breath is cooler than the soup' },
      { id: 'b', text: 'Blowing removes the hot boundary layer, increasing convective and evaporative cooling' },
      { id: 'c', text: 'The wind chill effect makes it "feel" cooler' },
      { id: 'd', text: 'Blowing increases the soup\'s emissivity' },
    ],
    correctAnswer: 'b',
    explanation: 'Hot soup creates a stagnant boundary layer of warm, humid air. Blowing strips it away, replacing it with fresh, cooler, drier air — boosting both convection and evaporation.',
  },
];

/* ─── Animation Variants ─── */

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
  }),
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
                ? score === 3 ? 'bg-[#58CC02]' : score === 2 ? 'bg-amber-400' : 'bg-red-400'
                : 'bg-gray-200'
            )}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {checks.map((check) => (
          <span key={check.label} className={cn('text-xs font-bold', check.met ? 'text-[#58CC02]' : 'text-gray-300')}>
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

/* ─── Main Component ─── */

export default function GetStartedPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);

  // Sample question
  const [sampleAnswer, setSampleAnswer] = useState<string | null>(null);
  const [sampleRevealed, setSampleRevealed] = useState(false);
  const [sampleQuestion] = useState(() =>
    SAMPLE_QUESTIONS[Math.floor(Math.random() * SAMPLE_QUESTIONS.length)]
  );

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

  const handleSampleAnswer = (optionId: string) => {
    if (sampleRevealed) return;
    setSampleAnswer(optionId);
    setSampleRevealed(true);
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

      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

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
    signIn('google', { callbackUrl: '/' });
  };

  const completeOnboarding = () => {
    if (navigating) return;
    setNavigating(true);
    analytics.milestone({ type: 'onboarding_completed' });
    window.location.href = '/';
  };

  // Which steps can go back
  const canGoBack = step > 0 && step !== TOTAL_STEPS - 1;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* ── Loading Overlay ── */}
      <AnimatePresence>
        {navigating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center gap-4"
          >
            <motion.svg
              width="64"
              height="64"
              viewBox="0 0 80 80"
              fill="none"
              animate={{ scale: [1, 1.05, 1], rotate: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <path d="M40 8L67 23.6V54.4L40 70L13 54.4V23.6L40 8Z" stroke="#58CC02" strokeWidth="2.5" fill="#58CC02" fillOpacity="0.06" />
              <path d="M40 22L54.5 30.4V47.6L40 56L25.5 47.6V30.4L40 22Z" stroke="#58CC02" strokeWidth="2" fill="#58CC02" fillOpacity="0.12" />
              <circle cx="40" cy="39" r="7" stroke="#58CC02" strokeWidth="2.5" fill="white" />
            </motion.svg>
            <p className="text-lg font-black text-gray-900">Preparing your course...</p>
            <Loader2 className="w-6 h-6 animate-spin text-[#58CC02]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Progress Bar ── */}
      <div className="px-5 pt-4 pb-2">
        <div className="flex gap-1.5">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className={cn(
                'h-2 rounded-full flex-1 transition-all duration-500',
                i < step
                  ? 'bg-[#58CC02]'
                  : i === step
                    ? 'bg-[#58CC02]/60'
                    : 'bg-gray-100'
              )}
            />
          ))}
        </div>
        <div className="flex items-center justify-between mt-3">
          {canGoBack ? (
            <button
              onClick={prevStep}
              className="flex items-center gap-1 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          ) : (
            <div />
          )}
          <span className="text-xs font-bold text-gray-300 tabular-nums">
            {step + 1} / {TOTAL_STEPS}
          </span>
        </div>
      </div>

      {/* ── Step Content ── */}
      <div className="flex-1 px-4 sm:px-5 flex flex-col justify-center pb-4 sm:pb-8">
        <AnimatePresence mode="wait" custom={direction}>
          {/* ═══ Step 0: Welcome ═══ */}
          {step === 0 && (
            <motion.div
              key="welcome"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="text-center max-w-sm mx-auto"
            >
              <motion.svg
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
                className="mx-auto mb-8"
                initial={{ scale: 0.7, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
              >
                <path
                  d="M40 8L67 23.6V54.4L40 70L13 54.4V23.6L40 8Z"
                  stroke="#58CC02"
                  strokeWidth="2.5"
                  fill="#58CC02"
                  fillOpacity="0.06"
                />
                <path
                  d="M40 22L54.5 30.4V47.6L40 56L25.5 47.6V30.4L40 22Z"
                  stroke="#58CC02"
                  strokeWidth="2"
                  fill="#58CC02"
                  fillOpacity="0.12"
                />
                <circle cx="40" cy="39" r="7" stroke="#58CC02" strokeWidth="2.5" fill="white" />
              </motion.svg>

              <motion.h1
                className="text-2xl sm:text-3xl font-black text-gray-900 mb-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Ready to ace your{' '}
                <span className="text-primary-600">ME interview</span>?
              </motion.h1>

              <motion.p
                className="text-gray-500 text-base mb-10 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Bite-sized lessons. Real interview questions.
                <br />
                Master mechanical engineering, one concept at a time.
              </motion.p>

              <motion.button
                onClick={nextStep}
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#58CC02] text-white font-extrabold text-lg rounded-2xl transition-all active:translate-y-[2px] disabled:opacity-70"
                style={{ boxShadow: '0 5px 0 #46A302' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileTap={{ scale: 0.98 }}
              >
                GET STARTED
                <ChevronRight className="w-5 h-5" />
              </motion.button>

              <motion.p
                className="mt-6 text-sm text-gray-400 font-semibold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Already have an account?{' '}
                <Link href="/login" className="text-[#1CB0F6] font-bold">
                  Log in
                </Link>
              </motion.p>
            </motion.div>
          )}

          {/* ═══ Step 1: Sample Question ═══ */}
          {step === 1 && (
            <motion.div
              key="sample"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="max-w-sm mx-auto w-full"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">{sampleQuestion.topicIcon}</span>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Try a question
                </span>
              </div>

              <h2 className="text-lg font-black text-gray-900 mb-5 leading-snug">
                {sampleQuestion.question}
              </h2>

              <div className="space-y-2.5 mb-5">
                {sampleQuestion.options.map((opt) => {
                  const isCorrect = opt.id === sampleQuestion.correctAnswer;
                  const isSelected = sampleAnswer === opt.id;
                  let optionStyle = 'border-gray-200 bg-white hover:border-gray-300';
                  if (sampleRevealed) {
                    if (isCorrect) {
                      optionStyle = 'border-[#58CC02] bg-[#58CC02]/5';
                    } else if (isSelected && !isCorrect) {
                      optionStyle = 'border-red-400 bg-red-50';
                    } else {
                      optionStyle = 'border-gray-100 bg-gray-50 opacity-60';
                    }
                  } else if (isSelected) {
                    optionStyle = 'border-primary-400 bg-primary-50';
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSampleAnswer(opt.id)}
                      disabled={sampleRevealed}
                      className={cn(
                        'w-full flex items-start gap-3 p-3.5 sm:p-3.5 min-h-[48px] rounded-xl border-2 transition-all text-left',
                        optionStyle
                      )}
                    >
                      <span className={cn(
                        'w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0 mt-0.5',
                        sampleRevealed && isCorrect
                          ? 'bg-[#58CC02] text-white'
                          : sampleRevealed && isSelected && !isCorrect
                            ? 'bg-red-400 text-white'
                            : 'bg-gray-100 text-gray-500'
                      )}>
                        {sampleRevealed && isCorrect ? '✓' : sampleRevealed && isSelected && !isCorrect ? '✗' : opt.id.toUpperCase()}
                      </span>
                      <span className="text-sm font-semibold text-gray-700 leading-snug">
                        {opt.text}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              <AnimatePresence>
                {sampleRevealed && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className={cn(
                      'p-4 rounded-xl mb-5',
                      sampleAnswer === sampleQuestion.correctAnswer
                        ? 'bg-[#58CC02]/10 border border-[#58CC02]/20'
                        : 'bg-amber-50 border border-amber-200'
                    )}>
                      <p className={cn(
                        'font-black text-sm mb-1',
                        sampleAnswer === sampleQuestion.correctAnswer ? 'text-[#58CC02]' : 'text-amber-600'
                      )}>
                        {sampleAnswer === sampleQuestion.correctAnswer ? '🎉 Correct!' : '💡 Good try!'}
                      </p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {sampleQuestion.explanation}
                      </p>
                    </div>

                    <button
                      onClick={nextStep}
                      className="w-full py-3.5 rounded-2xl bg-[#58CC02] text-white font-extrabold text-base transition-all active:translate-y-[2px]"
                      style={{ boxShadow: '0 5px 0 #46A302' }}
                    >
                      CONTINUE
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ═══ Step 2: Create Account ═══ */}
          {step === 2 && (
            <motion.div
              key="signup"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="max-w-sm mx-auto w-full"
            >
              <div className="text-center mb-6">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Sparkles className="w-8 h-8 text-[#58CC02]" />
                </motion.div>
                <h2 className="text-2xl font-black text-gray-900 mb-1">
                  Save your progress
                </h2>
                <p className="text-gray-400 text-sm font-semibold">
                  Create a free account to start learning
                </p>
              </div>

              {/* Google */}
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

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center font-semibold">
                    {error}
                  </div>
                )}

                <input
                  type="text"
                  placeholder="Name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                  minLength={2}
                  maxLength={50}
                  className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-900 font-semibold placeholder-gray-300 focus:outline-none focus:border-[#58CC02] focus:bg-white transition-colors"
                />

                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-900 font-semibold placeholder-gray-300 focus:outline-none focus:border-[#58CC02] focus:bg-white transition-colors"
                />

                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-900 font-semibold placeholder-gray-300 focus:outline-none focus:border-[#58CC02] focus:bg-white transition-colors"
                  />
                  <PasswordStrength password={password} />
                </div>

                <button
                  type="submit"
                  disabled={loading || password.length < 8}
                  className={cn(
                    'w-full py-3.5 rounded-2xl font-extrabold text-base transition-all active:translate-y-[2px]',
                    loading || password.length < 8
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-[#58CC02] text-white'
                  )}
                  style={{
                    boxShadow: loading || password.length < 8 ? 'none' : '0 5px 0 #46A302',
                  }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Creating account...
                    </span>
                  ) : 'CREATE ACCOUNT'}
                </button>
              </form>

              <p className="text-center text-gray-400 text-sm font-semibold mt-5">
                Already have an account?{' '}
                <Link href="/login" className="text-[#1CB0F6] font-bold">
                  Log in
                </Link>
              </p>
            </motion.div>
          )}

          {/* ═══ Step 3: Ready! ═══ */}
          {step === 3 && (
            <motion.div
              key="ready"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="text-center max-w-sm mx-auto w-full"
            >
              {/* Celebration */}
              <motion.div
                className="relative mx-auto mb-6 w-24 h-24"
                initial={{ scale: 0.5, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 12 }}
              >
                <div className="w-24 h-24 bg-gradient-to-br from-green-50 to-emerald-100 rounded-3xl flex items-center justify-center">
                  <Rocket className="w-12 h-12 text-[#58CC02]" />
                </div>
                {/* Sparkle decorations */}
                {[
                  { x: -16, y: -12, delay: 0.3, size: 16 },
                  { x: 90, y: -8, delay: 0.4, size: 14 },
                  { x: -10, y: 80, delay: 0.5, size: 12 },
                  { x: 94, y: 76, delay: 0.35, size: 15 },
                ].map((spark, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-amber-400"
                    style={{ left: spark.x, top: spark.y }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: spark.delay, type: 'spring', stiffness: 300 }}
                  >
                    <Sparkles style={{ width: spark.size, height: spark.size }} />
                  </motion.div>
                ))}
              </motion.div>

              <motion.h2
                className="text-2xl sm:text-3xl font-black text-gray-900 mb-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                You&apos;re all set!
              </motion.h2>

              <motion.p
                className="text-gray-500 text-base mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Start with Unit 1 — it&apos;s completely free.
                <br />
                Dive in and master mechanical engineering!
              </motion.p>

              <motion.button
                onClick={completeOnboarding}
                disabled={navigating}
                className="w-full py-4 rounded-2xl bg-[#58CC02] text-white font-extrabold text-lg transition-all active:translate-y-[2px] disabled:opacity-70 flex items-center justify-center gap-2"
                style={{ boxShadow: navigating ? 'none' : '0 5px 0 #46A302' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileTap={{ scale: 0.98 }}
              >
                {navigating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Loading your course...
                  </>
                ) : (
                  'START LEARNING'
                )}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
