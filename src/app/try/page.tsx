'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ProfessionPicker } from '@/components/profession/ProfessionPicker';
import { useCourseStore } from '@/store/useCourseStore';
import { loadUnitData } from '@/data/course/course-meta';
import { PROFESSIONS } from '@/data/professions';
import LessonView from '@/components/lesson/LessonView';
import type { SessionAdapter } from '@/components/lesson/LessonView';
import type { CourseQuestion } from '@/data/course/types';
import { Mascot } from '@/components/ui/Mascot';
import { GameButton } from '@/components/ui/GameButton';
import { playSound } from '@/lib/sounds';
import { ScreenFX } from '@/components/ui/ScreenFX';
import { shuffleArray } from '@/lib/utils';

const MAX_QUESTIONS = 8;

export default function TryPage() {
  const router = useRouter();
  const setActiveProfession = useCourseStore((s) => s.setActiveProfession);

  const [phase, setPhase] = useState<'pick' | 'loading' | 'lesson' | 'result'>('pick');
  const [professionId, setProfessionId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<CourseQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: string; correct: boolean }[]>([]);
  const [xpEarned, setXpEarned] = useState(0);

  // Load first lesson data when profession is picked
  const handleProfessionPick = useCallback(async (id: string) => {
    setProfessionId(id);
    setPhase('loading');

    // Set the profession in the store so themes/colors work
    setActiveProfession(id as never);

    try {
      const unit0 = await loadUnitData(0, id as never);
      const lesson0 = unit0?.lessons?.[0];

      if (!lesson0?.questions?.length) {
        // Fallback: go to signup if no lesson data
        router.push('/get-started');
        return;
      }

      // Select questions: skip teaching cards, take up to MAX_QUESTIONS
      const playable = lesson0.questions.filter((q) => q.type !== 'teaching');
      const teaching = lesson0.questions.filter((q) => q.type === 'teaching').slice(0, 2);
      const selected = [...teaching, ...shuffleArray(playable).slice(0, MAX_QUESTIONS - teaching.length)];

      setQuestions(selected);
      setCurrentIndex(0);
      setAnswers([]);
      setXpEarned(0);
      setPhase('lesson');
    } catch (err) {
      console.error('[TryPage] Failed to load lesson:', err);
      router.push('/get-started');
    }
  }, [setActiveProfession, router]);

  const currentQ = questions[currentIndex] ?? null;

  const handleSubmit = useCallback((_qId: string, correct: boolean) => {
    setAnswers((prev) => [...prev, { questionId: _qId, correct }]);
    if (correct) setXpEarned((x) => x + 10);
  }, []);

  const handleNext = useCallback(() => {
    if (currentIndex >= questions.length - 1) {
      playSound('lessonPass');
      setPhase('result');
    } else {
      setCurrentIndex((i) => i + 1);
    }
  }, [currentIndex, questions.length]);

  const handleExit = useCallback(() => {
    setPhase('pick');
    setQuestions([]);
    setCurrentIndex(0);
    setAnswers([]);
  }, []);

  // Build adapter for LessonView
  const adapter: SessionAdapter | null = useMemo(() => {
    if (phase !== 'lesson' || !currentQ) return null;

    const profession = PROFESSIONS.find((p) => p.id === professionId);
    const color = profession?.color ?? '#6366f1';

    return {
      currentQuestion: currentQ,
      answeredCount: answers.length,
      totalQuestions: questions.length,
      isCurrentAnswered: answers.length > currentIndex,
      isLastQuestion: currentIndex >= questions.length - 1,
      unitColor: color,
      theme: { color, dark: color, bg: `${color}15` },
      isGolden: false,
      submitAnswer: handleSubmit,
      nextQuestion: handleNext,
      complete: () => { playSound('lessonPass'); setPhase('result'); },
      exit: handleExit,
      hasAnswers: answers.length > 0,
      flagContentType: 'lesson-question',
      exitLabel: 'Exit Demo',
      exitConfirmTitle: 'Exit demo lesson?',
      exitConfirmMessage: 'You can try again anytime.',
      noHearts: true,
    };
  }, [phase, currentQ, professionId, answers, currentIndex, questions, handleSubmit, handleNext, handleExit]);

  // === PROFESSION PICKER ===
  if (phase === 'pick') {
    return (
      <div className="min-h-screen bg-[#FAFAFA] dark:bg-surface-950 flex flex-col">
        <div className="flex items-center gap-3 px-4 pt-4 pb-2">
          <Link href="/" className="p-2 -ml-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800">
            <ArrowLeft className="w-5 h-5 text-surface-500" />
          </Link>
          <span className="text-sm font-semibold text-surface-500">Try a free lesson</span>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
          <Mascot pose="excited" size={80} className="mb-4" />
          <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100 mb-2 text-center">
            What do you want to learn?
          </h1>
          <p className="text-surface-500 text-center mb-8 max-w-md">
            Pick a subject and jump straight into a lesson. No account needed.
          </p>

          <div className="w-full max-w-md">
            <ProfessionPicker
              onSelect={handleProfessionPick}
            />
          </div>
        </div>
      </div>
    );
  }

  // === LOADING ===
  if (phase === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] dark:bg-surface-950">
        <div className="text-center">
          <Mascot pose="thinking" size={70} className="mx-auto mb-4" />
          <p className="text-surface-500 font-semibold">Loading your first lesson...</p>
        </div>
      </div>
    );
  }

  // === LESSON ===
  if (phase === 'lesson' && adapter) {
    return <LessonView adapter={adapter} />;
  }

  // === RESULT (Duolingo-style: celebrate then prompt signup) ===
  if (phase === 'result') {
    const correctCount = answers.filter((a) => a.correct).length;
    const accuracy = answers.length > 0 ? Math.round((correctCount / answers.length) * 100) : 0;
    const profession = PROFESSIONS.find((p) => p.id === professionId);

    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden"
        style={{ background: accuracy >= 70 ? '#58A700' : '#E8850C' }}
      >
        <ScreenFX effect={accuracy >= 90 ? 'sparkle-dust' : 'confetti'} />

        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.1 }}
        >
          <Mascot pose={accuracy >= 70 ? 'celebrating' : 'excited'} size={100} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-extrabold text-white mt-6 mb-2 text-center"
        >
          {accuracy >= 90 ? 'Amazing!' : accuracy >= 70 ? 'Great job!' : 'Nice start!'}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="flex gap-6 mb-8"
        >
          <div className="text-center">
            <div className="text-2xl font-extrabold text-white">{xpEarned}</div>
            <div className="text-xs font-bold text-white/70 uppercase">XP earned</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-extrabold text-white">{accuracy}%</div>
            <div className="text-xs font-bold text-white/70 uppercase">Accuracy</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="w-full max-w-sm space-y-3"
        >
          <GameButton
            onClick={() => router.push('/get-started')}
            variant="gold"
            className="w-full"
          >
            Create free account to save progress
          </GameButton>

          <button
            onClick={handleExit}
            className="w-full text-center text-white/80 text-sm font-semibold py-2 hover:text-white transition-colors"
          >
            Try another subject
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-white/50 text-xs mt-6 text-center"
        >
          Your progress will be saved when you create an account
        </motion.p>
      </div>
    );
  }

  return null;
}
