'use client';

import { useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Target, Zap, Trophy, ChevronRight } from 'lucide-react';
import { useCourseStore } from '@/store/useCourseStore';
import { getLessonById } from '@/data/course';

export { ResultScreen };
export default function ResultScreen() {
  const lessonResult = useCourseStore((s) => s.lessonResult);
  const dismissResult = useCourseStore((s) => s.dismissResult);

  // Stable confetti particles
  const confetti = useMemo(() => {
    const hash = (i: number) => {
      const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
      return x - Math.floor(x);
    };
    return Array.from({ length: 28 }, (_, i) => ({
      left: hash(i) * 100,
      delay: hash(i + 50) * 2,
      size: 6 + hash(i + 100) * 8,
      duration: 2.8 + hash(i + 150) * 2,
      color: [
        '#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1',
        '#58CC02', '#FFEAA7', '#DDA0DD', '#FF9FF3',
        '#54A0FF', '#FF9600',
      ][Math.floor(hash(i + 300) * 10)],
      rotation: hash(i + 400) * 360,
      drift: (hash(i + 500) - 0.5) * 60,
      isCircle: hash(i + 600) > 0.5,
    }));
  }, []);

  // Enter/Space to dismiss result screen
  useEffect(() => {
    if (!lessonResult) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        dismissResult();
      }
    };
    // Delay to prevent accidental trigger from previous Enter press
    const timer = setTimeout(() => {
      window.addEventListener('keydown', handleKeyDown);
    }, 500);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lessonResult, dismissResult]);

  if (!lessonResult) return null;

  const lessonInfo = getLessonById(lessonResult.lessonId);
  const unitColor = lessonInfo?.unit.color ?? '#10B981';

  // Lighter tint of unitColor for backgrounds
  const hexToRgb = (hex: string) => ({
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  });
  const rgb = hexToRgb(unitColor);
  const tintBg = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.06)`;
  const tintBorder = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15)`;
  const tintMid = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.10)`;

  // Darken for button bottom shadow
  const darken = (hex: string, f: number) => {
    const { r, g, b } = hexToRgb(hex);
    return `rgb(${Math.round(r * f)}, ${Math.round(g * f)}, ${Math.round(b * f)})`;
  };

  const getMessage = () => {
    if (lessonResult.stars === 3) return 'Perfect!';
    if (lessonResult.stars === 2) return 'Great job!';
    return 'Lesson Complete!';
  };

  const getAccuracyStyle = () => {
    if (lessonResult.accuracy >= 90) return { color: '#58CC02', bg: '#E8FFE0', border: '#B8E6A0' };
    if (lessonResult.accuracy >= 70) return { color: '#FF9600', bg: '#FFF4E0', border: '#FFE0A0' };
    return { color: '#FF4B4B', bg: '#FFE0E0', border: '#FFB0B0' };
  };

  const accuracyStyle = getAccuracyStyle();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 220, damping: 20 },
    },
  } as const;

  return (
    <AnimatePresence>
      <motion.div
        key="result-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex flex-col overflow-hidden"
        style={{
          background: '#FAFAFA',
          paddingTop: 'env(safe-area-inset-top, 0px)',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
      >
        {/* Subtle dot pattern (matches LessonView) */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(${unitColor} 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Falling confetti */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {confetti.map((p, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${p.left}%`,
                top: -20,
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                borderRadius: p.isCircle ? '50%' : '2px',
              }}
              initial={{ y: -30, rotate: 0, opacity: 0 }}
              animate={{
                y: ['0vh', '110vh'],
                x: [0, p.drift],
                rotate: [0, p.rotation],
                opacity: [0, 0.7, 0.7, 0],
              }}
              transition={{
                delay: p.delay,
                duration: p.duration,
                ease: 'linear',
                repeat: Infinity,
                repeatDelay: 2,
              }}
            />
          ))}
        </div>

        {/* Main content */}
        <motion.div
          className="flex-1 flex flex-col items-center justify-center px-5 relative"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Trophy icon */}
          <motion.div
            variants={itemVariants}
            className="mb-3"
          >
            <motion.div
              className="flex items-center justify-center"
              style={{
                width: 80,
                height: 80,
                borderRadius: 20,
                background: `linear-gradient(135deg, ${tintBg} 0%, ${tintMid} 100%)`,
                border: `2px solid ${tintBorder}`,
              }}
              initial={{ scale: 0, rotate: -15 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.15 }}
            >
              <Trophy style={{ width: 40, height: 40, color: unitColor }} />
            </motion.div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            style={{ fontSize: 28, fontWeight: 800, color: '#3C3C3C', marginBottom: 2, textAlign: 'center' }}
          >
            {getMessage()}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            style={{ fontSize: 14, fontWeight: 700, color: '#AFAFAF', marginBottom: 20, textAlign: 'center' }}
          >
            {lessonResult.unitTitle} &mdash; {lessonResult.lessonTitle}
          </motion.p>

          {/* Stars */}
          <motion.div
            variants={itemVariants}
            className="flex items-end"
            style={{ gap: 8, marginBottom: 28 }}
          >
            {[1, 2, 3].map((starNum) => {
              const earned = starNum <= lessonResult.stars;
              const isMiddle = starNum === 2;
              return (
                <motion.div
                  key={starNum}
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{
                    scale: earned ? 1 : 0.6,
                    rotate: 0,
                    y: isMiddle && earned ? -6 : 0,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 14,
                    delay: 0.45 + starNum * 0.18,
                  }}
                >
                  <Star
                    style={{
                      width: isMiddle ? 56 : 44,
                      height: isMiddle ? 56 : 44,
                      color: earned ? '#FFD700' : '#E5E5E5',
                      fill: earned ? '#FFD700' : '#E5E5E5',
                      filter: earned
                        ? 'drop-shadow(0 3px 6px rgba(255,215,0,0.35))'
                        : 'none',
                    }}
                  />
                </motion.div>
              );
            })}
          </motion.div>

          {/* Stats card */}
          <motion.div
            variants={itemVariants}
            className="w-full max-w-sm"
            style={{
              background: 'white',
              borderRadius: 16,
              border: '2px solid #E5E5E5',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              padding: 20,
            }}
          >
            {/* Accuracy row */}
            <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
              <div className="flex items-center" style={{ gap: 10 }}>
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: accuracyStyle.bg,
                    border: `1.5px solid ${accuracyStyle.border}`,
                  }}
                >
                  <Target style={{ width: 18, height: 18, color: accuracyStyle.color }} />
                </div>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: '#AFAFAF' }}>Accuracy</p>
                  <p style={{ fontSize: 22, fontWeight: 800, color: accuracyStyle.color, lineHeight: 1 }}>
                    {lessonResult.accuracy}%
                  </p>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: '#AFAFAF' }}>Questions</p>
                <p style={{ fontSize: 16, fontWeight: 800, color: '#3C3C3C', lineHeight: 1.2 }}>
                  {lessonResult.correctAnswers}/{lessonResult.totalQuestions}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1.5, background: '#F0F0F0', borderRadius: 1, marginBottom: 14 }} />

            {/* XP earned */}
            <div className="flex items-center justify-between">
              <div className="flex items-center" style={{ gap: 10 }}>
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: tintBg,
                    border: `1.5px solid ${tintBorder}`,
                  }}
                >
                  <Zap style={{ width: 18, height: 18, color: unitColor }} />
                </div>
                <p style={{ fontSize: 12, fontWeight: 700, color: '#AFAFAF' }}>XP Earned</p>
              </div>
              <motion.p
                style={{ fontSize: 22, fontWeight: 800, color: unitColor, lineHeight: 1 }}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 250, damping: 15, delay: 0.8 }}
              >
                +{lessonResult.xpEarned}
              </motion.p>
            </div>

            {/* Achievement badges */}
            {(lessonResult.isNewBest || lessonResult.isFirstCompletion) && (
              <>
                <div style={{ height: 1.5, background: '#F0F0F0', borderRadius: 1, margin: '14px 0' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {lessonResult.isNewBest && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 }}
                      className="flex items-center"
                      style={{
                        gap: 10,
                        padding: '10px 12px',
                        borderRadius: 12,
                        background: '#FFF4E0',
                        border: '1.5px solid #FFE0A0',
                      }}
                    >
                      <Trophy style={{ width: 18, height: 18, color: '#FF9600' }} />
                      <span style={{ fontSize: 13, fontWeight: 800, color: '#CC7A00' }}>
                        New personal best!
                      </span>
                    </motion.div>
                  )}
                  {lessonResult.isFirstCompletion && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.1 }}
                      className="flex items-center"
                      style={{
                        gap: 10,
                        padding: '10px 12px',
                        borderRadius: 12,
                        background: '#E0F0FF',
                        border: '1.5px solid #A0D0FF',
                      }}
                    >
                      <Target style={{ width: 18, height: 18, color: '#2196F3' }} />
                      <span style={{ fontSize: 13, fontWeight: 800, color: '#1565C0' }}>
                        First time completing!
                      </span>
                    </motion.div>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </motion.div>

        {/* Continue button — Duolingo-style with bottom shadow */}
        <motion.div
          style={{
            padding: '0 20px',
            paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 24px)',
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, type: 'spring', stiffness: 200, damping: 20 }}
        >
          <motion.button
            onClick={dismissResult}
            className="w-full flex items-center justify-center transition-all active:scale-[0.97]"
            style={{
              padding: '16px 24px',
              borderRadius: 16,
              background: unitColor,
              color: 'white',
              fontSize: 17,
              fontWeight: 800,
              border: 'none',
              boxShadow: `0 4px 0 ${darken(unitColor, 0.7)}`,
              gap: 6,
              minHeight: 58,
            }}
            whileTap={{ y: 2, boxShadow: `0 2px 0 ${darken(unitColor, 0.7)}` }}
          >
            Continue
            <ChevronRight style={{ width: 20, height: 20 }} />
            <span style={{ fontSize: 11, opacity: 0.6, fontWeight: 700, marginLeft: 2 }}>↵</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
