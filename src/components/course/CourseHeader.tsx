'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useCourseStore } from '@/store/useCourseStore';
import { course } from '@/data/course';
import { Sparkles } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';

type PopoverType = 'streak' | 'xp' | null;

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning!';
  if (hour < 17) return 'Good afternoon!';
  return 'Good evening!';
}

export function CourseHeader() {
  const { data: session, status } = useSession();
  const progress = useCourseStore((s) => s.progress);
  const [popover, setPopover] = useState<PopoverType>(null);
  const { tier, isProUser } = useSubscription();

  const userName = session?.user?.name || progress.displayName || 'Engineer';
  const userImage = session?.user?.image;
  const initial = userName.charAt(0).toUpperCase();

  const completedCount = Object.keys(progress.completedLessons).length;
  const totalLessons = course.reduce((s, u) => s + u.lessons.length, 0);
  const completedPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  const lessonsToNext = Math.max(1, 3 - (completedCount % 3));

  const togglePopover = (type: PopoverType) => {
    setPopover((prev) => (prev === type ? null : type));
  };

  return (
    <>
      {/* Header */}
      <header
        className="sticky top-0 z-30 bg-white"
        style={{ borderBottom: '2px solid #E5E5E5', padding: '12px 20px' }}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div style={{ fontSize: 24, fontWeight: 900, letterSpacing: -0.5 }}>
            <span style={{ color: '#58CC02' }}>Mech</span>
            <span style={{ color: '#3C3C3C' }}>Prep</span>
          </div>

          {/* Stats */}
          <div className="flex items-center" style={{ gap: 16 }}>
            {/* Streak */}
            <button
              className="flex items-center transition-transform active:scale-95"
              style={{ gap: 4, fontWeight: 800, fontSize: 15, color: '#3C3C3C' }}
              onClick={() => togglePopover('streak')}
            >
              <span style={{ fontSize: 18 }}>🔥</span>
              <span>{progress.currentStreak}</span>
            </button>

            {/* XP / Gems */}
            <button
              className="flex items-center transition-transform active:scale-95"
              style={{ gap: 4, fontWeight: 800, fontSize: 15, color: '#3C3C3C' }}
              onClick={() => togglePopover('xp')}
            >
              <span style={{ fontSize: 18 }}>💎</span>
              <span>{progress.totalXp.toLocaleString()}</span>
            </button>

            {/* Upgrade CTA for free registered users */}
            {tier === 'free' && status === 'authenticated' && (
              <Link
                href="/pricing"
                className="flex items-center transition-transform active:scale-95"
                style={{
                  gap: 4,
                  padding: '4px 10px',
                  borderRadius: 8,
                  background: '#FFF0DB',
                  color: '#B56E00',
                  fontSize: 11,
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}
              >
                <Sparkles style={{ width: 12, height: 12 }} />
                <span>Pro</span>
              </Link>
            )}

            {/* Avatar / Sign Up */}
            {status === 'loading' ? (
              <div
                className="animate-pulse"
                style={{ width: 34, height: 34, borderRadius: '50%', background: '#E5E5E5' }}
              />
            ) : session ? (
              <Link href="/profile" className="transition-transform active:scale-95">
                {userImage ? (
                  <img
                    src={userImage}
                    alt={userName}
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: '50%',
                      border: '2.5px solid #E5E5E5',
                    }}
                  />
                ) : (
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #89E219 0%, #58CC02 100%)',
                      border: '2.5px solid #E5E5E5',
                      color: 'white',
                      fontSize: 14,
                      fontWeight: 800,
                    }}
                  >
                    {initial}
                  </div>
                )}
              </Link>
            ) : (
              <Link
                href="/register"
                className="transition-transform active:scale-95"
                style={{
                  padding: '6px 14px',
                  borderRadius: 17,
                  background: '#58CC02',
                  color: 'white',
                  fontSize: 13,
                  fontWeight: 800,
                }}
              >
                Sign Up
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Greeting */}
      <div style={{ padding: '24px 20px 8px' }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#3C3C3C' }}>
          {getGreeting()}
        </h2>
        <p style={{ fontSize: 14, color: '#AFAFAF', fontWeight: 700, marginTop: 2 }}>
          {completedCount === 0
            ? 'Start your first lesson today!'
            : progress.currentStreak > 0
              ? `Keep your streak going — ${lessonsToNext} lessons to next level`
              : 'Pick up where you left off'}
        </p>
      </div>

      {/* Popover overlay */}
      <AnimatePresence>
        {popover && (
          <motion.div
            key="popover-backdrop"
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPopover(null)}
          >
            <div className="absolute inset-0 bg-black/20" />
            <div style={{ maxWidth: 480, margin: '0 auto', position: 'relative' }}>
              <motion.div
                className="absolute left-0 right-0 bg-white shadow-xl"
                style={{ top: 4, margin: '0 16px', borderRadius: 20, border: '2px solid #E5E5E5', padding: 16 }}
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                onClick={(e) => e.stopPropagation()}
              >
                {popover === 'streak' ? (
                  <div>
                    <div className="flex items-center" style={{ gap: 8, marginBottom: 12 }}>
                      <span style={{ fontSize: 28 }}>🔥</span>
                      <h3 style={{ fontSize: 18, fontWeight: 800, color: '#3C3C3C' }}>
                        Practice Streak
                      </h3>
                    </div>
                    <div className="grid grid-cols-2" style={{ gap: 12, marginBottom: 12 }}>
                      <div style={{ background: '#FFF0DB', borderRadius: 16, padding: 12, textAlign: 'center' }}>
                        <p style={{ fontSize: 28, fontWeight: 800, color: '#FF9600' }}>
                          {progress.currentStreak}
                        </p>
                        <p style={{ fontSize: 12, color: '#CC8B1F', fontWeight: 700, marginTop: 2 }}>
                          Current streak
                        </p>
                      </div>
                      <div style={{ background: '#F5F5F5', borderRadius: 16, padding: 12, textAlign: 'center' }}>
                        <p style={{ fontSize: 28, fontWeight: 800, color: '#3C3C3C' }}>
                          {progress.longestStreak}
                        </p>
                        <p style={{ fontSize: 12, color: '#AFAFAF', fontWeight: 700, marginTop: 2 }}>
                          Longest streak
                        </p>
                      </div>
                    </div>
                    <p style={{ fontSize: 12, color: '#AFAFAF', fontWeight: 600 }}>
                      Complete at least one lesson each day to keep your streak alive!
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center" style={{ gap: 8, marginBottom: 12 }}>
                      <span style={{ fontSize: 28 }}>💎</span>
                      <h3 style={{ fontSize: 18, fontWeight: 800, color: '#3C3C3C' }}>
                        Experience Points
                      </h3>
                    </div>
                    <div style={{ background: '#F3E6FF', borderRadius: 16, padding: 12, textAlign: 'center', marginBottom: 12 }}>
                      <p style={{ fontSize: 28, fontWeight: 800, color: '#7B2FBE' }}>
                        {progress.totalXp.toLocaleString()} XP
                      </p>
                      <p style={{ fontSize: 12, color: '#9E5DD0', fontWeight: 700, marginTop: 2 }}>
                        Total earned
                      </p>
                    </div>
                    <div style={{ marginBottom: 12 }}>
                      <div className="flex justify-between" style={{ marginBottom: 4 }}>
                        <span style={{ fontSize: 12, color: '#AFAFAF', fontWeight: 700 }}>Course progress</span>
                        <span style={{ fontSize: 12, color: '#3C3C3C', fontWeight: 800 }}>
                          {completedCount}/{totalLessons}
                        </span>
                      </div>
                      <div style={{ height: 10, background: '#F0F0F0', borderRadius: 5, overflow: 'hidden' }}>
                        <div
                          style={{
                            height: '100%',
                            width: `${completedPercent}%`,
                            background: '#CE82FF',
                            borderRadius: 5,
                            transition: 'width 0.5s ease',
                          }}
                        />
                      </div>
                    </div>
                    <p style={{ fontSize: 12, color: '#AFAFAF', fontWeight: 600 }}>
                      Earn XP by completing lessons. 3 stars = 3x XP!
                    </p>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
