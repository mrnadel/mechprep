'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Zap, Heart, Trophy, Flame } from 'lucide-react';
import { useCourseStore } from '@/store/useCourseStore';
import { analytics } from '@/lib/mixpanel';

const ONBOARDED_KEY = 'mechready-onboarded';

const STEPS = [
  {
    icon: Zap,
    color: '#3B82F6',
    bg: '#EFF6FF',
    title: 'Bite-sized lessons',
    desc: 'Each lesson is 5–10 questions. Learn in just a few minutes a day.',
  },
  {
    icon: Heart,
    color: '#EF4444',
    bg: '#FEF2F2',
    title: '5 hearts to start',
    desc: 'Wrong answers cost a heart. Hearts recharge over time — or go Pro for unlimited.',
  },
  {
    icon: Flame,
    color: '#F59E0B',
    bg: '#FFFBEB',
    title: 'Build your streak',
    desc: 'Practice every day to grow your streak and earn bonus gems.',
  },
  {
    icon: Trophy,
    color: '#10B981',
    bg: '#ECFDF5',
    title: 'Compete & earn',
    desc: 'Climb the league, complete quests, and unlock achievements.',
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const startLesson = useCourseStore((s) => s.startLesson);
  const completedLessons = useCourseStore((s) => s.progress.completedLessons);

  // If user already onboarded (returning user hitting this URL), redirect home
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (localStorage.getItem(ONBOARDED_KEY)) {
      router.replace('/');
    }
  }, [router]);

  // If user already has completed lessons, skip onboarding
  useEffect(() => {
    if (Object.keys(completedLessons).length > 0) {
      localStorage.setItem(ONBOARDED_KEY, '1');
      router.replace('/');
    }
  }, [completedLessons, router]);

  const handleStart = () => {
    localStorage.setItem(ONBOARDED_KEY, '1');
    analytics.milestone({ type: 'onboarding_completed', name: 'onboarding_completed', value: 1 });
    // Start Unit 1, Lesson 1 automatically
    startLesson(0, 0);
    router.push('/');
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      handleStart();
    }
  };

  const handleSkip = () => {
    handleStart();
  };

  const isLast = step === STEPS.length - 1;
  const current = STEPS[step];

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center px-4 py-8 bg-white">
      <div className="w-full max-w-sm mx-auto">

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {STEPS.map((_, i) => (
            <motion.div
              key={i}
              className="rounded-full"
              animate={{
                width: i === step ? 24 : 8,
                height: 8,
                backgroundColor: i <= step ? '#3B82F6' : '#E5E7EB',
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        {/* Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25 }}
            className="text-center"
          >
            {/* Icon */}
            <motion.div
              className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: current.bg }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <current.icon className="w-10 h-10" style={{ color: current.color }} />
            </motion.div>

            {/* Text */}
            <h1 className="text-2xl font-extrabold text-gray-900 mb-3">
              {current.title}
            </h1>
            <p className="text-gray-500 text-base leading-relaxed max-w-xs mx-auto">
              {current.desc}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Buttons */}
        <div className="mt-12 space-y-3">
          <motion.button
            onClick={handleNext}
            className="w-full py-3.5 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-base transition-colors shadow-lg shadow-primary-200 active:scale-[0.98] flex items-center justify-center gap-2"
            whileTap={{ scale: 0.97 }}
          >
            {isLast ? (
              <>
                <Sparkles className="w-5 h-5" />
                Start First Lesson
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>

          {!isLast && (
            <button
              onClick={handleSkip}
              className="w-full py-3 text-gray-400 hover:text-gray-500 text-sm font-medium transition-colors"
            >
              Skip — start learning now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
