'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Briefcase,
  GraduationCap,
  Target,
  RefreshCw,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { PRO_TRIAL_DAYS } from '@/lib/pricing';
import { cn } from '@/lib/utils';

const GOALS = [
  { id: 'interview', label: 'Interview Prep', desc: 'Ace your next ME interview', icon: Briefcase },
  { id: 'skill', label: 'Skill Building', desc: 'Deepen your engineering knowledge', icon: Target },
  { id: 'exam', label: 'Exam Prep', desc: 'Prepare for PE/FE exams', icon: GraduationCap },
  { id: 'career', label: 'Career Switch', desc: 'Transition into mechanical engineering', icon: RefreshCw },
] as const;

const EXPERIENCE_LEVELS = [
  { id: 'student', label: 'Student', desc: 'Currently studying ME' },
  { id: 'junior', label: 'Junior (0-3 yr)', desc: 'Early career engineer' },
  { id: 'mid', label: 'Mid (3-7 yr)', desc: 'Experienced practitioner' },
  { id: 'senior', label: 'Senior (7+ yr)', desc: 'Seasoned professional' },
] as const;

const TOTAL_STEPS = 4;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
};

export default function OnboardingPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [goal, setGoal] = useState<string | null>(null);
  const [experience, setExperience] = useState<string | null>(null);

  const userName = session?.user?.name || 'Engineer';

  const nextStep = () => {
    setDirection(1);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  };

  const prevStep = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const completeOnboarding = (startTrial: boolean) => {
    // Save selections to localStorage
    const prefs = { goal, experience, startedTrial: startTrial };
    localStorage.setItem('mechprep_onboarding', JSON.stringify(prefs));
    router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Progress bar */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex gap-1.5">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className={cn(
                'h-1.5 rounded-full flex-1 transition-all duration-300',
                i <= step ? 'bg-primary-600' : 'bg-gray-200'
              )}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2">
          {step > 0 ? (
            <button
              onClick={prevStep}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Back
            </button>
          ) : (
            <div />
          )}
          <span className="text-xs text-gray-400">
            {step + 1} of {TOTAL_STEPS}
          </span>
        </div>
      </div>

      {/* Steps */}
      <div className="flex-1 px-4 flex flex-col justify-center">
        <AnimatePresence mode="wait" custom={direction}>
          {step === 0 && (
            <motion.div
              key="welcome"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="text-center"
            >
              <motion.div
                className="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 300 }}
              >
                <span className="text-4xl">&#x2699;&#xFE0F;</span>
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome, {userName}!
              </h2>
              <p className="text-gray-500 text-sm mb-8 max-w-xs mx-auto leading-relaxed">
                MechPrep helps you master mechanical engineering concepts with bite-sized, interactive lessons designed for real interview success.
              </p>
              <button
                onClick={nextStep}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-colors shadow-md shadow-primary-200 active:scale-[0.98]"
              >
                Get Started
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="goal"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              <h2 className="text-xl font-bold text-gray-900 mb-1 text-center">
                What&apos;s your goal?
              </h2>
              <p className="text-gray-500 text-sm mb-6 text-center">
                We&apos;ll personalize your experience
              </p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {GOALS.map((g) => {
                  const Icon = g.icon;
                  const selected = goal === g.id;
                  return (
                    <button
                      key={g.id}
                      onClick={() => setGoal(g.id)}
                      className={cn(
                        'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all active:scale-[0.97]',
                        selected
                          ? 'border-primary-500 bg-primary-50 shadow-sm'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      )}
                    >
                      <div className={cn(
                        'w-10 h-10 rounded-xl flex items-center justify-center',
                        selected ? 'bg-primary-100' : 'bg-gray-100'
                      )}>
                        <Icon className={cn(
                          'w-5 h-5',
                          selected ? 'text-primary-600' : 'text-gray-500'
                        )} />
                      </div>
                      <span className={cn(
                        'text-sm font-semibold',
                        selected ? 'text-primary-700' : 'text-gray-700'
                      )}>
                        {g.label}
                      </span>
                      <span className="text-xs text-gray-400">{g.desc}</span>
                    </button>
                  );
                })}
              </div>
              <button
                onClick={nextStep}
                disabled={!goal}
                className={cn(
                  'w-full py-3 rounded-xl font-semibold text-sm transition-all active:scale-[0.98]',
                  goal
                    ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-md shadow-primary-200'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                )}
              >
                Continue
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="experience"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              <h2 className="text-xl font-bold text-gray-900 mb-1 text-center">
                How experienced are you?
              </h2>
              <p className="text-gray-500 text-sm mb-6 text-center">
                This helps us tailor the difficulty
              </p>
              <div className="space-y-3 mb-6">
                {EXPERIENCE_LEVELS.map((lvl) => {
                  const selected = experience === lvl.id;
                  return (
                    <button
                      key={lvl.id}
                      onClick={() => setExperience(lvl.id)}
                      className={cn(
                        'w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left active:scale-[0.98]',
                        selected
                          ? 'border-primary-500 bg-primary-50 shadow-sm'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      )}
                    >
                      <div className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0',
                        selected ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-500'
                      )}>
                        {lvl.id === 'student' ? 'S' : lvl.id === 'junior' ? 'J' : lvl.id === 'mid' ? 'M' : 'Sr'}
                      </div>
                      <div>
                        <p className={cn(
                          'font-semibold text-sm',
                          selected ? 'text-primary-700' : 'text-gray-700'
                        )}>
                          {lvl.label}
                        </p>
                        <p className="text-xs text-gray-400">{lvl.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
              <button
                onClick={nextStep}
                disabled={!experience}
                className={cn(
                  'w-full py-3 rounded-xl font-semibold text-sm transition-all active:scale-[0.98]',
                  experience
                    ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-md shadow-primary-200'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                )}
              >
                Continue
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="trial"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="text-center"
            >
              <motion.div
                className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-5"
                initial={{ scale: 0.8, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 300 }}
              >
                <Sparkles className="w-8 h-8 text-amber-500" />
              </motion.div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Start your {PRO_TRIAL_DAYS}-day Pro trial
              </h2>
              <p className="text-gray-500 text-sm mb-2 max-w-xs mx-auto">
                Unlock all units, unlimited practice, full analytics, and interview readiness scoring.
              </p>
              <p className="text-xs text-gray-400 mb-6">No credit card required</p>

              <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6 text-left">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">What you get with Pro</p>
                <ul className="space-y-2">
                  {[
                    'All 10 course units',
                    'Unlimited daily practice',
                    'Detailed explanations',
                    'Full analytics dashboard',
                    'Interview readiness score',
                    'Weekly streak freeze',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => completeOnboarding(true)}
                className="w-full py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm transition-colors shadow-md shadow-primary-200 active:scale-[0.98] mb-3"
              >
                Start Free Trial
              </button>
              <button
                onClick={() => completeOnboarding(false)}
                className="w-full py-3 rounded-xl bg-white hover:bg-gray-50 text-gray-600 font-medium text-sm border border-gray-200 transition-colors active:scale-[0.98]"
              >
                Continue with Free
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
