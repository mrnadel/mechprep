'use client';

import { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useCourseStore } from '@/store/useCourseStore';
import { courseMeta } from '@/data/course/course-meta';
import { Sparkles } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { useGems } from '@/store/useEngagementStore';
import { shopItems } from '@/data/gem-shop';

type PopoverType = 'streak' | 'xp' | 'gems' | null;

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
  const { status } = useSession();
  const progress = useCourseStore((s) => s.progress);
  const [popover, setPopover] = useState<PopoverType>(null);
  const { tier, hasFetched } = useSubscription();
  const gems = useGems();

  const headerRef = useRef<HTMLElement>(null);
  const streakBtnRef = useRef<HTMLButtonElement>(null);
  const xpBtnRef = useRef<HTMLButtonElement>(null);
  const gemsBtnRef = useRef<HTMLButtonElement>(null);
  const [popoverPos, setPopoverPos] = useState<{ top: number; arrowRight: number; right: number; width: number } | null>(null);

  const completedCount = Object.keys(progress.completedLessons).length;
  const totalLessons = courseMeta.reduce((s, u) => s + u.lessons.length, 0);
  const completedPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  const lessonsToNext = Math.max(1, 3 - (completedCount % 3));

  const weekDays = useMemo(() => getWeekDays(), []);

  const togglePopover = (type: PopoverType) => {
    if (popover === type) {
      setPopover(null);
      setPopoverPos(null);
      return;
    }
    const ref = type === 'streak' ? streakBtnRef : type === 'xp' ? xpBtnRef : type === 'gems' ? gemsBtnRef : null;
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
        className="sticky top-0 z-30 bg-[#FAFAFA] px-4 sm:px-5 py-1.5"
      >
        <div className="flex items-center justify-center" style={{ gap: 4 }}>
            <button
              ref={streakBtnRef}
              className="flex items-center transition-all active:scale-95"
              style={{
                gap: 3,
                fontWeight: 800,
                fontSize: 13,
                color: popover === 'streak' ? '#D97706' : '#3C3C3C',
                padding: '5px 8px',
                borderRadius: 10,
                background: popover === 'streak' ? '#FFFBEB' : 'transparent',
              }}
              onClick={() => togglePopover('streak')}
              aria-label={`${progress.currentStreak} day streak`}
              aria-expanded={popover === 'streak'}
            >
              <span style={{ fontSize: 15 }} aria-hidden="true">⚡</span>
              <span>{progress.currentStreak}</span>
            </button>

            <button
              ref={xpBtnRef}
              className="flex items-center transition-all active:scale-95"
              style={{
                gap: 3,
                fontWeight: 800,
                fontSize: 13,
                color: popover === 'xp' ? '#7B2FBE' : '#3C3C3C',
                padding: '5px 8px',
                borderRadius: 10,
                background: popover === 'xp' ? '#F3E6FF' : 'transparent',
              }}
              onClick={() => togglePopover('xp')}
              aria-label={`${progress.totalXp.toLocaleString()} experience points`}
              aria-expanded={popover === 'xp'}
            >
              <span style={{ fontSize: 15 }} aria-hidden="true">⭐</span>
              <span>{progress.totalXp.toLocaleString()}</span>
            </button>

            <button
              ref={gemsBtnRef}
              className="flex items-center transition-all active:scale-95"
              style={{
                gap: 3,
                fontWeight: 800,
                fontSize: 13,
                color: popover === 'gems' ? '#7C3AED' : '#3C3C3C',
                padding: '5px 8px',
                borderRadius: 10,
                background: popover === 'gems' ? '#F3E8FF' : 'transparent',
              }}
              onClick={() => togglePopover('gems')}
              aria-label={`${gems.balance} gems`}
              aria-expanded={popover === 'gems'}
            >
              <span style={{ fontSize: 15 }} aria-hidden="true">💎</span>
              <span>{gems.balance}</span>
            </button>

            {/* Upgrade CTA for free registered users */}
            {hasFetched && tier === 'free' && status === 'authenticated' && (
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
        </div>
      </header>


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
              <div style={{ padding: 20, position: 'relative' }}>
                {popover === 'streak' ? (
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
                ) : popover === 'gems' ? (
                  <GemsPopoverContent gems={gems} onGoToShop={closePopover} />
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
                        ⭐
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

function GemsPopoverContent({
  gems,
  onGoToShop,
}: {
  gems: ReturnType<typeof useGems>;
  onGoToShop: () => void;
}) {
  const recentTx = gems.transactions.slice(-5).reverse();
  const affordable = shopItems
    .filter((i) => i.cost <= gems.balance)
    .sort((a, b) => a.cost - b.cost);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
        <div className="flex items-center" style={{ gap: 10 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              boxShadow: '0 4px 12px rgba(124,58,237,0.3)',
            }}
          >
            💎
          </div>
          <div>
            <p style={{ fontSize: 28, fontWeight: 800, color: '#7C3AED', lineHeight: 1 }}>
              {gems.balance.toLocaleString()}
            </p>
            <p style={{ fontSize: 11, color: '#AFAFAF', fontWeight: 600, marginTop: 2 }}>
              {gems.totalEarned.toLocaleString()} total earned
            </p>
          </div>
        </div>
      </div>

      {/* Affordable items hint */}
      {affordable.length > 0 && (
        <div
          style={{
            background: '#F5F3FF',
            borderRadius: 12,
            padding: '10px 12px',
            marginBottom: 14,
            border: '1px solid #EDE9FE',
          }}
        >
          <p style={{ fontSize: 11, fontWeight: 700, color: '#7C3AED' }}>
            You can afford {affordable.length} item{affordable.length !== 1 ? 's' : ''} in the shop!
          </p>
          <div className="flex items-center" style={{ gap: 4, marginTop: 6 }}>
            {affordable.slice(0, 5).map((item) => (
              <span key={item.id} style={{ fontSize: 16 }} title={`${item.name} — ${item.cost} 💎`}>
                {item.icon}
              </span>
            ))}
            {affordable.length > 5 && (
              <span style={{ fontSize: 10, fontWeight: 800, color: '#A78BFA', marginLeft: 2 }}>
                +{affordable.length - 5}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Recent transactions */}
      {recentTx.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#AFAFAF', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>
            Recent
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {recentTx.map((tx) => {
              const isPositive = tx.amount > 0;
              return (
                <div
                  key={tx.id}
                  className="flex items-center justify-between"
                  style={{
                    padding: '5px 8px',
                    borderRadius: 8,
                    background: isPositive ? '#FAFFF5' : '#FFF5F5',
                  }}
                >
                  <span style={{ fontSize: 12, color: '#4B5563', fontWeight: 600, textTransform: 'capitalize', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {formatGemSource(tx.source)}
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 800, color: isPositive ? '#16A34A' : '#DC2626', flexShrink: 0, marginLeft: 8 }}>
                    {isPositive ? '+' : ''}{tx.amount} 💎
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty state */}
      {recentTx.length === 0 && (
        <div style={{ textAlign: 'center', padding: '12px 0', marginBottom: 14 }}>
          <p style={{ fontSize: 13, color: '#AFAFAF', fontWeight: 600 }}>
            Complete quests and lessons to earn gems!
          </p>
        </div>
      )}

      {/* Shop CTA */}
      <Link
        href="/shop"
        onClick={onGoToShop}
        className="flex items-center justify-center transition-all hover:brightness-110 active:scale-95"
        style={{
          gap: 6,
          padding: '10px 16px',
          borderRadius: 12,
          background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
          color: '#FFFFFF',
          fontSize: 13,
          fontWeight: 800,
          textDecoration: 'none',
          boxShadow: '0 2px 8px rgba(124,58,237,0.3)',
        }}
      >
        🛍️ Visit Gem Shop
      </Link>
    </div>
  );
}

function formatGemSource(source: string): string {
  return source
    .replace(/_/g, ' ')
    .replace(/-/g, ' ')
    .replace(/\bxp\b/gi, 'XP')
    .replace(/\bdaily\b/gi, 'Daily')
    .replace(/\bweekly\b/gi, 'Weekly')
    .replace(/\bquest\b/gi, 'Quest')
    .replace(/\blesson\b/gi, 'Lesson')
    .replace(/\bchest\b/gi, 'Chest')
    .replace(/\bpurchase\b/gi, 'Purchase');
}
