'use client';

import { useState, useCallback } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  GraduationCap,
  Target,
  RefreshCw,
  ChevronRight,
  Rocket,
  Flame,
  Zap,
  Trophy,
  Timer,
  Check,
  Sparkles,
  ArrowLeft,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

/* ─── Constants ─── */

const TOTAL_STEPS = 8;

const GOALS = [
  { id: 'interview', label: 'Interview Prep', desc: 'Ace your next ME interview', icon: Briefcase, emoji: '💼' },
  { id: 'skill', label: 'Skill Building', desc: 'Deepen your engineering knowledge', icon: Target, emoji: '🎯' },
  { id: 'exam', label: 'Exam Prep', desc: 'Prepare for PE / FE exams', icon: GraduationCap, emoji: '📚' },
  { id: 'career', label: 'Career Switch', desc: 'Transition into mechanical engineering', icon: RefreshCw, emoji: '🔄' },
] as const;

const EXPERIENCE_LEVELS = [
  { id: 'student', label: 'Still in school', desc: 'Currently studying ME', badge: '🎓' },
  { id: 'junior', label: '0 – 3 years', desc: 'Early career engineer', badge: '🌱' },
  { id: 'mid', label: '3 – 7 years', desc: 'Experienced practitioner', badge: '⚡' },
  { id: 'senior', label: '7+ years', desc: 'Seasoned professional', badge: '👑' },
] as const;

const TOPICS = [
  { id: 'engineering-mechanics', name: 'Engineering Mechanics', icon: '⚖️' },
  { id: 'strength-of-materials', name: 'Strength of Materials', icon: '🏗️' },
  { id: 'thermodynamics', name: 'Thermodynamics', icon: '🔥' },
  { id: 'heat-transfer', name: 'Heat Transfer', icon: '🌡️' },
  { id: 'fluid-mechanics', name: 'Fluid Mechanics', icon: '💧' },
  { id: 'materials-engineering', name: 'Materials Engineering', icon: '🔬' },
  { id: 'manufacturing', name: 'Manufacturing', icon: '🏭' },
  { id: 'machine-elements', name: 'Machine Elements', icon: '⚙️' },
  { id: 'design-tolerancing', name: 'Design & GD&T', icon: '📐' },
  { id: 'vibrations', name: 'Vibrations', icon: '〰️' },
  { id: 'real-world-mechanisms', name: 'Real-World Mechanisms', icon: '🔧' },
] as const;

const DAILY_GOALS = [
  { id: 'casual', label: 'Casual', desc: '5 min / day', detail: '1–2 questions', icon: Timer, color: 'text-blue-500' },
  { id: 'regular', label: 'Regular', desc: '10 min / day', detail: '~5 questions', icon: Flame, color: 'text-orange-500' },
  { id: 'serious', label: 'Serious', desc: '15 min / day', detail: '~10 questions', icon: Zap, color: 'text-amber-500' },
  { id: 'intense', label: 'Intense', desc: '20 min / day', detail: '15+ questions', icon: Trophy, color: 'text-red-500' },
] as const;

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
              'h-1 flex-1 rounded-full transition-colors',
              i <= score
                ? score === 3 ? 'bg-[#58CC02]' : score === 2 ? 'bg-amber-400' : 'bg-red-400'
                : 'bg-gray-200'
            )}
          />
        ))}
      </div>
      <div className="flex gap-3">
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

  // Preferences
  const [goal, setGoal] = useState<string | null>(null);
  const [experience, setExperience] = useState<string | null>(null);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [dailyGoal, setDailyGoal] = useState<string | null>(null);

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

  const toggleTopic = (topicId: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topicId)
        ? prev.filter((t) => t !== topicId)
        : [...prev, topicId]
    );
  };

  const selectAllTopics = () => {
    setSelectedTopics(
      selectedTopics.length === TOPICS.length ? [] : TOPICS.map((t) => t.id)
    );
  };

  const handleSampleAnswer = (optionId: string) => {
    if (sampleRevealed) return;
    setSampleAnswer(optionId);
    setSampleRevealed(true);
  };

  const savePreferences = () => {
    const prefs = { goal, experience, topics: selectedTopics, dailyGoal };
    localStorage.setItem('mechready_onboarding', JSON.stringify(prefs));
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

      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Account created but login failed. Try signing in.');
        setLoading(false);
      } else {
        savePreferences();
        nextStep();
        setLoading(false);
      }
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    savePreferences();
    setGoogleLoading(true);
    signIn('google', { callbackUrl: '/' });
  };

  const completeOnboarding = () => {
    if (navigating) return;
    setNavigating(true);
    savePreferences();
    router.push('/');
    router.refresh();
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
            <motion.div
              className="w-20 h-20 bg-gradient-to-br from-green-50 to-emerald-100 rounded-3xl flex items-center justify-center"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <span className="text-4xl">⚙️</span>
            </motion.div>
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
      <div className="flex-1 px-5 flex flex-col justify-center pb-8">
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
              <motion.div
                className="w-24 h-24 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl flex items-center justify-center mx-auto mb-8"
                initial={{ scale: 0.7, rotate: -15 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
              >
                <span className="text-5xl">⚙️</span>
              </motion.div>

              <motion.h1
                className="text-3xl font-black text-gray-900 mb-3"
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

          {/* ═══ Step 1: Goal ═══ */}
          {step === 1 && (
            <motion.div
              key="goal"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="max-w-sm mx-auto w-full"
            >
              <h2 className="text-2xl font-black text-gray-900 mb-1 text-center">
                What brings you here?
              </h2>
              <p className="text-gray-400 text-sm font-semibold mb-6 text-center">
                We&apos;ll tailor your experience
              </p>

              <div className="space-y-3 mb-6">
                {GOALS.map((g) => {
                  const selected = goal === g.id;
                  return (
                    <button
                      key={g.id}
                      onClick={() => {
                        setGoal(g.id);
                        setTimeout(nextStep, 300);
                      }}
                      className={cn(
                        'w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all active:scale-[0.98]',
                        selected
                          ? 'border-[#58CC02] bg-[#58CC02]/5 shadow-sm'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      )}
                    >
                      <span className="text-2xl">{g.emoji}</span>
                      <div className="text-left">
                        <p className={cn('font-bold', selected ? 'text-[#58CC02]' : 'text-gray-800')}>
                          {g.label}
                        </p>
                        <p className="text-xs text-gray-400 font-medium">{g.desc}</p>
                      </div>
                      {selected && (
                        <div className="ml-auto w-6 h-6 rounded-full bg-[#58CC02] flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" strokeWidth={3} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ═══ Step 2: Experience ═══ */}
          {step === 2 && (
            <motion.div
              key="experience"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="max-w-sm mx-auto w-full"
            >
              <h2 className="text-2xl font-black text-gray-900 mb-1 text-center">
                How experienced are you?
              </h2>
              <p className="text-gray-400 text-sm font-semibold mb-6 text-center">
                No wrong answer — we&apos;ll adapt to your level
              </p>

              <div className="space-y-3 mb-6">
                {EXPERIENCE_LEVELS.map((lvl) => {
                  const selected = experience === lvl.id;
                  return (
                    <button
                      key={lvl.id}
                      onClick={() => {
                        setExperience(lvl.id);
                        setTimeout(nextStep, 300);
                      }}
                      className={cn(
                        'w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all active:scale-[0.98]',
                        selected
                          ? 'border-[#58CC02] bg-[#58CC02]/5 shadow-sm'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      )}
                    >
                      <span className="text-2xl">{lvl.badge}</span>
                      <div className="text-left">
                        <p className={cn('font-bold', selected ? 'text-[#58CC02]' : 'text-gray-800')}>
                          {lvl.label}
                        </p>
                        <p className="text-xs text-gray-400 font-medium">{lvl.desc}</p>
                      </div>
                      {selected && (
                        <div className="ml-auto w-6 h-6 rounded-full bg-[#58CC02] flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" strokeWidth={3} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ═══ Step 3: Topics ═══ */}
          {step === 3 && (
            <motion.div
              key="topics"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="max-w-sm mx-auto w-full"
            >
              <h2 className="text-2xl font-black text-gray-900 mb-1 text-center">
                What interests you most?
              </h2>
              <p className="text-gray-400 text-sm font-semibold mb-5 text-center">
                Pick as many as you like
              </p>

              {/* Select All */}
              <button
                onClick={selectAllTopics}
                className={cn(
                  'w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 mb-3 text-sm font-bold transition-all',
                  selectedTopics.length === TOPICS.length
                    ? 'border-[#58CC02] bg-[#58CC02]/5 text-[#58CC02]'
                    : 'border-gray-200 text-gray-500 hover:border-gray-300'
                )}
              >
                <Sparkles className="w-4 h-4" />
                {selectedTopics.length === TOPICS.length ? 'All selected!' : 'Select all topics'}
              </button>

              <div className="grid grid-cols-2 gap-2 mb-6">
                {TOPICS.map((topic) => {
                  const selected = selectedTopics.includes(topic.id);
                  return (
                    <button
                      key={topic.id}
                      onClick={() => toggleTopic(topic.id)}
                      className={cn(
                        'flex items-center gap-2 p-3 rounded-xl border-2 transition-all text-left active:scale-[0.97]',
                        selected
                          ? 'border-[#58CC02] bg-[#58CC02]/5'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      )}
                    >
                      <span className="text-base">{topic.icon}</span>
                      <span className={cn(
                        'text-xs font-bold leading-tight',
                        selected ? 'text-[#58CC02]' : 'text-gray-600'
                      )}>
                        {topic.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={nextStep}
                disabled={selectedTopics.length === 0}
                className={cn(
                  'w-full py-3.5 rounded-2xl font-extrabold text-base transition-all active:translate-y-[2px]',
                  selectedTopics.length > 0
                    ? 'bg-[#58CC02] text-white'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                )}
                style={{
                  boxShadow: selectedTopics.length > 0 ? '0 5px 0 #46A302' : 'none',
                }}
              >
                CONTINUE
              </button>
            </motion.div>
          )}

          {/* ═══ Step 4: Daily Goal ═══ */}
          {step === 4 && (
            <motion.div
              key="daily-goal"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="max-w-sm mx-auto w-full"
            >
              <h2 className="text-2xl font-black text-gray-900 mb-1 text-center">
                Set a daily goal
              </h2>
              <p className="text-gray-400 text-sm font-semibold mb-6 text-center">
                You can always change this later
              </p>

              <div className="space-y-3 mb-6">
                {DAILY_GOALS.map((dg) => {
                  const selected = dailyGoal === dg.id;
                  const Icon = dg.icon;
                  return (
                    <button
                      key={dg.id}
                      onClick={() => {
                        setDailyGoal(dg.id);
                        setTimeout(nextStep, 300);
                      }}
                      className={cn(
                        'w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all active:scale-[0.98]',
                        selected
                          ? 'border-[#58CC02] bg-[#58CC02]/5 shadow-sm'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      )}
                    >
                      <div className={cn(
                        'w-10 h-10 rounded-xl flex items-center justify-center',
                        selected ? 'bg-[#58CC02]/10' : 'bg-gray-100'
                      )}>
                        <Icon className={cn('w-5 h-5', selected ? 'text-[#58CC02]' : dg.color)} />
                      </div>
                      <div className="text-left flex-1">
                        <div className="flex items-baseline gap-2">
                          <p className={cn('font-bold', selected ? 'text-[#58CC02]' : 'text-gray-800')}>
                            {dg.label}
                          </p>
                          <span className="text-xs text-gray-400 font-medium">{dg.desc}</span>
                        </div>
                        <p className="text-xs text-gray-400">{dg.detail}</p>
                      </div>
                      {selected && (
                        <div className="w-6 h-6 rounded-full bg-[#58CC02] flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" strokeWidth={3} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ═══ Step 5: Sample Question ═══ */}
          {step === 5 && (
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
                        'w-full flex items-start gap-3 p-3.5 rounded-xl border-2 transition-all text-left',
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

          {/* ═══ Step 6: Create Account ═══ */}
          {step === 6 && (
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

          {/* ═══ Step 7: Ready! ═══ */}
          {step === 7 && (
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
              {/* Confetti-style celebration */}
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
                className="text-3xl font-black text-gray-900 mb-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Your path is ready!
              </motion.h2>

              <motion.p
                className="text-gray-500 text-base mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                We&apos;ve personalized your learning path.
                <br />
                Start with Unit 1 — it&apos;s completely free.
              </motion.p>

              {/* Summary cards */}
              <motion.div
                className="grid grid-cols-3 gap-3 mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {[
                  {
                    label: 'Goal',
                    value: GOALS.find((g) => g.id === goal)?.label || 'Interview Prep',
                    emoji: GOALS.find((g) => g.id === goal)?.emoji || '💼',
                  },
                  {
                    label: 'Topics',
                    value: `${selectedTopics.length} selected`,
                    emoji: '📖',
                  },
                  {
                    label: 'Daily',
                    value: DAILY_GOALS.find((d) => d.id === dailyGoal)?.desc || '10 min',
                    emoji: '🔥',
                  },
                ].map((card) => (
                  <div
                    key={card.label}
                    className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100"
                  >
                    <span className="text-xl">{card.emoji}</span>
                    <p className="text-xs font-bold text-gray-800 mt-1">{card.value}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      {card.label}
                    </p>
                  </div>
                ))}
              </motion.div>

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
