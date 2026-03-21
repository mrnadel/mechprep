'use client';

import { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useCourseStore } from '@/store/useCourseStore';
import { course } from '@/data/course';
import { Sparkles, User, LogOut } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';

type PopoverType = 'streak' | 'xp' | 'menu' | null;

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning!';
  if (hour < 17) return 'Good afternoon!';
  return 'Good evening!';
}

function getWeekDays() {
  const labels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0=Sun, 1=Mon...
  const todayIdx = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Convert to Mon=0 index
  return labels.map((label, i) => ({
    label,
    isToday: i === todayIdx,
    todayIdx,
  }));
}

export function CourseHeader() {
  const { data: session, status } = useSession();
  const progress = useCourseStore((s) => s.progress);
  const [popover, setPopover] = useState<PopoverType>(null);
  const { tier, isProUser } = useSubscription();

  const headerRef = useRef<HTMLElement>(null);
  const streakBtnRef = useRef<HTMLButtonElement>(null);
  const xpBtnRef = useRef<HTMLButtonElement>(null);
  const [popoverPos, setPopoverPos] = useState<{ top: number; arrowRight: number; right: number; width: number } | null>(null);

  const userName = session?.user?.name || progress.displayName || 'Engineer';
  const userImage = session?.user?.image;
  const initial = userName.charAt(0).toUpperCase();

  const completedCount = Object.keys(progress.completedLessons).length;
  const totalLessons = course.reduce((s, u) => s + u.lessons.length, 0);
  const completedPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  const lessonsToNext = Math.max(1, 3 - (completedCount % 3));

  const weekDays = useMemo(() => getWeekDays(), []);

  const togglePopover = (type: PopoverType) => {
    if (popover === type) {
      setPopover(null);
      setPopoverPos(null);
      return;
    }
    const ref = type === 'streak' ? streakBtnRef : type === 'xp' ? xpBtnRef : null;
    const headerEl = headerRef.current;
    if (headerEl) {
      const headerRect = headerEl.getBoundingClientRect();
      const vw = window.innerWidth;
      const headerRight = vw - headerRect.right + 16;
      const popoverWidth = Math.min(300, headerRect.width - 32);
      if (ref?.current) {
        const btnRect = ref.current.getBoundingClientRect();
        const btnCenterX = btnRect.left + btnRect.width / 2;
        const popoverRightEdge = headerRect.right - 16;
        const arrowRight = popoverRightEdge - btnCenterX - 7;
        setPopoverPos({
          top: headerRect.bottom + 10,
          right: headerRight,
          width: popoverWidth,
          arrowRight: Math.max(24, Math.min(arrowRight, popoverWidth - 24)),
        });
      } else {
        // Menu popover: align to right edge of header
        setPopoverPos({
          top: headerRect.bottom + 10,
          right: headerRight,
          width: popoverWidth,
          arrowRight: 24,
        });
      }
    }
    setPopover(type);
  };

  const closePopover = () => {
    setPopover(null);
    setPopoverPos(null);
  };

  return (
    <>
      {/* Header */}
      <header
        ref={headerRef}
        className="sticky top-0 z-30 bg-white"
        style={{ borderBottom: '2px solid #E5E5E5', padding: '12px 20px' }}
      >
        <div className="flex items-center justify-between">
          {/* Logo – full text on sm+, compact icon on mobile */}
          <div className="hidden sm:block" style={{ fontSize: 24, fontWeight: 900, letterSpacing: -0.5 }}>
            <span style={{ color: '#58CC02' }}>Mech</span>
            <span style={{ color: '#3C3C3C' }}>Ready</span>
          </div>
          <div
            className="flex sm:hidden items-center justify-center"
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #6BD913 0%, #58CC02 100%)',
              boxShadow: '0 2px 0 #46A302',
              flexShrink: 0,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              {/* Gear shape */}
              <path
                d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                fill="white"
              />
              <path
                d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"
                fill="rgba(255,255,255,0.5)"
              />
              {/* Bold M */}
              <text
                x="12"
                y="13.5"
                textAnchor="middle"
                dominantBaseline="central"
                fill="white"
                fontSize="9"
                fontWeight="900"
                fontFamily="system-ui, sans-serif"
              >
                M
              </text>
            </svg>
          </div>

          {/* Stats */}
          <div className="flex items-center" style={{ gap: 8 }}>
            {/* Streak */}
            <button
              ref={streakBtnRef}
              className="flex items-center transition-all active:scale-95"
              style={{
                gap: 4,
                fontWeight: 800,
                fontSize: 15,
                color: popover === 'streak' ? '#D97706' : '#3C3C3C',
                padding: '4px 10px',
                borderRadius: 12,
                background: popover === 'streak' ? '#FFFBEB' : 'transparent',
              }}
              onClick={() => togglePopover('streak')}
            >
              <span style={{ fontSize: 18 }}>⚡</span>
              <span>{progress.currentStreak}</span>
            </button>

            {/* XP / Gems */}
            <button
              ref={xpBtnRef}
              className="flex items-center transition-all active:scale-95"
              style={{
                gap: 4,
                fontWeight: 800,
                fontSize: 15,
                color: popover === 'xp' ? '#7B2FBE' : '#3C3C3C',
                padding: '4px 10px',
                borderRadius: 12,
                background: popover === 'xp' ? '#F3E6FF' : 'transparent',
              }}
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

            {/* Avatar / Menu */}
            {status === 'loading' ? (
              <div
                className="animate-pulse"
                style={{ width: 34, height: 34, borderRadius: '50%', background: '#E5E5E5' }}
              />
            ) : session ? (
              <button
                onClick={() => togglePopover('menu')}
                className="transition-transform active:scale-95"
                style={{ flexShrink: 0 }}
              >
                {userImage ? (
                  <img
                    src={userImage}
                    alt={userName}
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: popover === 'menu' ? '2.5px solid #58CC02' : '2.5px solid #E5E5E5',
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
                      border: popover === 'menu' ? '2.5px solid #58CC02' : '2.5px solid #E5E5E5',
                      color: 'white',
                      fontSize: 14,
                      fontWeight: 800,
                    }}
                  >
                    {initial}
                  </div>
                )}
              </button>
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
        {popover && popoverPos && (
          <motion.div
            key="popover-backdrop"
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            onClick={closePopover}
          >
            <div className="absolute inset-0 bg-black/15" />

            <motion.div
              className="fixed"
              style={{
                top: popoverPos.top,
                right: popoverPos.right,
                width: popoverPos.width,
                maxWidth: 300,
                borderRadius: 16,
                background: 'white',
                border: '2px solid #E5E5E5',
                boxShadow: '0 10px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
                overflow: 'visible',
              }}
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ type: 'spring', damping: 26, stiffness: 400 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Arrow */}
              <div
                style={{
                  position: 'absolute',
                  top: -8,
                  right: popoverPos.arrowRight,
                  width: 14,
                  height: 14,
                  background: 'white',
                  borderTop: '2px solid #E5E5E5',
                  borderLeft: '2px solid #E5E5E5',
                  transform: 'rotate(45deg)',
                }}
              />

              {/* Content */}
              <div style={{ padding: popover === 'menu' ? 8 : 20, position: 'relative' }}>
                {popover === 'menu' ? (
                  <div>
                    {/* User card */}
                    <div
                      className="flex items-center"
                      style={{ gap: 12, padding: '12px 12px 14px', borderBottom: '1.5px solid #F0F0F0' }}
                    >
                      {userImage ? (
                        <img
                          src={userImage}
                          alt={userName}
                          style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', border: '2px solid #E5E5E5' }}
                        />
                      ) : (
                        <div
                          className="flex items-center justify-center"
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #89E219 0%, #58CC02 100%)',
                            color: 'white',
                            fontSize: 16,
                            fontWeight: 800,
                            flexShrink: 0,
                          }}
                        >
                          {initial}
                        </div>
                      )}
                      <div style={{ minWidth: 0 }}>
                        <p style={{ fontSize: 14, fontWeight: 800, color: '#3C3C3C', lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {userName}
                        </p>
                        {session?.user?.email && (
                          <p style={{ fontSize: 11, fontWeight: 600, color: '#AFAFAF', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {session.user.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Menu items */}
                    <div style={{ padding: '4px 0' }}>
                      <Link
                        href="/profile"
                        onClick={closePopover}
                        className="flex items-center transition-colors hover:bg-gray-50"
                        style={{ gap: 12, padding: '10px 12px', borderRadius: 10, textDecoration: 'none' }}
                      >
                        <div
                          className="flex items-center justify-center"
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: 8,
                            background: '#F0F0F0',
                          }}
                        >
                          <User style={{ width: 16, height: 16, color: '#777' }} />
                        </div>
                        <span style={{ fontSize: 14, fontWeight: 700, color: '#3C3C3C' }}>Profile</span>
                      </Link>

                      {tier === 'free' && (
                        <Link
                          href="/pricing"
                          onClick={closePopover}
                          className="flex items-center transition-colors hover:bg-amber-50"
                          style={{ gap: 12, padding: '10px 12px', borderRadius: 10, textDecoration: 'none' }}
                        >
                          <div
                            className="flex items-center justify-center"
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: 8,
                              background: '#FFF4E0',
                            }}
                          >
                            <Sparkles style={{ width: 16, height: 16, color: '#B56E00' }} />
                          </div>
                          <span style={{ fontSize: 14, fontWeight: 700, color: '#B56E00' }}>Upgrade to Pro</span>
                        </Link>
                      )}
                    </div>

                    {/* Divider + Logout */}
                    <div style={{ borderTop: '1.5px solid #F0F0F0', padding: '4px 0' }}>
                      <button
                        onClick={() => signOut({ callbackUrl: '/login' })}
                        className="flex items-center w-full transition-colors hover:bg-red-50"
                        style={{ gap: 12, padding: '10px 12px', borderRadius: 10 }}
                      >
                        <div
                          className="flex items-center justify-center"
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: 8,
                            background: '#FEF2F2',
                          }}
                        >
                          <LogOut style={{ width: 16, height: 16, color: '#EF4444' }} />
                        </div>
                        <span style={{ fontSize: 14, fontWeight: 700, color: '#EF4444' }}>Log Out</span>
                      </button>
                    </div>
                  </div>
                ) : popover === 'streak' ? (
                  <div>
                    {/* Header */}
                    <div className="flex items-center" style={{ gap: 10, marginBottom: 16 }}>
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 12,
                          background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 24,
                          boxShadow: '0 4px 12px rgba(245,158,11,0.3)',
                        }}
                      >
                        ⚡
                      </div>
                      <div>
                        <h3 style={{ fontSize: 16, fontWeight: 800, color: '#3C3C3C', lineHeight: 1.2 }}>
                          Practice Streak
                        </h3>
                        <p style={{ fontSize: 12, fontWeight: 600, color: '#AFAFAF', marginTop: 1 }}>
                          {progress.currentStreak > 0 ? 'Fully charged!' : 'Start your streak today!'}
                        </p>
                      </div>
                    </div>

                    {/* Stats cards */}
                    <div className="grid grid-cols-2" style={{ gap: 10, marginBottom: 16 }}>
                      <div
                        style={{
                          background: 'linear-gradient(135deg, #FFF6E8 0%, #FFF0DB 100%)',
                          borderRadius: 14,
                          padding: '14px 12px',
                          textAlign: 'center',
                          border: '1.5px solid #FFE4B8',
                        }}
                      >
                        <p style={{ fontSize: 30, fontWeight: 800, color: '#FF9600', lineHeight: 1 }}>
                          {progress.currentStreak}
                        </p>
                        <p style={{ fontSize: 11, color: '#CC8B1F', fontWeight: 700, marginTop: 4 }}>
                          Current
                        </p>
                      </div>
                      <div
                        style={{
                          background: '#F7F7F7',
                          borderRadius: 14,
                          padding: '14px 12px',
                          textAlign: 'center',
                          border: '1.5px solid #ECECEC',
                        }}
                      >
                        <p style={{ fontSize: 30, fontWeight: 800, color: '#3C3C3C', lineHeight: 1 }}>
                          {progress.longestStreak}
                        </p>
                        <p style={{ fontSize: 11, color: '#AFAFAF', fontWeight: 700, marginTop: 4 }}>
                          Longest
                        </p>
                      </div>
                    </div>

                    {/* Week tracker */}
                    <div
                      style={{
                        background: '#FAFAFA',
                        borderRadius: 12,
                        padding: '12px 10px',
                        marginBottom: 14,
                        border: '1px solid #F0F0F0',
                      }}
                    >
                      <p style={{ fontSize: 11, fontWeight: 700, color: '#AFAFAF', marginBottom: 8, textAlign: 'center' }}>
                        This week
                      </p>
                      <div className="flex justify-between" style={{ gap: 4 }}>
                        {weekDays.map((day, i) => {
                          const { todayIdx } = day;
                          const streakStart = todayIdx - progress.currentStreak + 1;
                          const isActive = i >= Math.max(0, streakStart) && i <= todayIdx && progress.currentStreak > 0;
                          return (
                            <div key={i} className="flex flex-col items-center" style={{ gap: 4, flex: 1 }}>
                              <div
                                style={{
                                  width: 28,
                                  height: 28,
                                  borderRadius: '50%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: isActive ? 13 : 11,
                                  fontWeight: 800,
                                  background: isActive
                                    ? 'linear-gradient(135deg, #FBBF24 0%, #D97706 100%)'
                                    : day.isToday
                                      ? '#E5E5E5'
                                      : 'transparent',
                                  color: isActive ? 'white' : day.isToday ? '#3C3C3C' : '#CFCFCF',
                                  border: day.isToday && !isActive ? '2px dashed #CFCFCF' : 'none',
                                  boxShadow: isActive ? '0 2px 6px rgba(217,119,6,0.3)' : 'none',
                                }}
                              >
                                {isActive ? '⚡' : day.label}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <p style={{ fontSize: 12, color: '#AFAFAF', fontWeight: 600, textAlign: 'center' }}>
                      Complete a lesson each day to keep going!
                    </p>
                  </div>
                ) : (
                  <div>
                    {/* Header */}
                    <div className="flex items-center" style={{ gap: 10, marginBottom: 16 }}>
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 12,
                          background: 'linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 24,
                          boxShadow: '0 4px 12px rgba(168,85,247,0.3)',
                        }}
                      >
                        💎
                      </div>
                      <div>
                        <h3 style={{ fontSize: 16, fontWeight: 800, color: '#3C3C3C', lineHeight: 1.2 }}>
                          Experience Points
                        </h3>
                        <p style={{ fontSize: 12, fontWeight: 600, color: '#AFAFAF', marginTop: 1 }}>
                          Keep earning XP!
                        </p>
                      </div>
                    </div>

                    {/* Total XP card */}
                    <div
                      style={{
                        background: 'linear-gradient(135deg, #F5EAFF 0%, #EDE0FF 100%)',
                        borderRadius: 14,
                        padding: '18px 16px',
                        textAlign: 'center',
                        marginBottom: 16,
                        border: '1.5px solid #E4D0FA',
                      }}
                    >
                      <p style={{ fontSize: 34, fontWeight: 800, color: '#7B2FBE', lineHeight: 1 }}>
                        {progress.totalXp.toLocaleString()}
                      </p>
                      <p style={{ fontSize: 12, color: '#9E5DD0', fontWeight: 700, marginTop: 4 }}>
                        Total XP earned
                      </p>
                    </div>

                    {/* Course progress */}
                    <div
                      style={{
                        background: '#FAFAFA',
                        borderRadius: 12,
                        padding: 14,
                        marginBottom: 14,
                        border: '1px solid #F0F0F0',
                      }}
                    >
                      <div className="flex justify-between items-center" style={{ marginBottom: 8 }}>
                        <span style={{ fontSize: 12, color: '#777', fontWeight: 700 }}>Course progress</span>
                        <span style={{ fontSize: 13, color: '#7B2FBE', fontWeight: 800 }}>
                          {completedCount}/{totalLessons}
                        </span>
                      </div>
                      <div style={{ height: 10, background: '#EADCF5', borderRadius: 5, overflow: 'hidden' }}>
                        <motion.div
                          style={{
                            height: '100%',
                            background: 'linear-gradient(90deg, #CE82FF 0%, #A855F7 100%)',
                            borderRadius: 5,
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${completedPercent}%` }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                        />
                      </div>
                      <p style={{ fontSize: 11, color: '#AFAFAF', fontWeight: 600, marginTop: 6 }}>
                        {completedPercent}% complete
                      </p>
                    </div>

                    <p style={{ fontSize: 12, color: '#AFAFAF', fontWeight: 600, textAlign: 'center' }}>
                      Earn XP by completing lessons. 3 stars = 3x XP!
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
