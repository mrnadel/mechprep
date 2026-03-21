'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useStore } from '@/store/useStore';
import { useCourseStore } from '@/store/useCourseStore';
import { getXpToNextLevel } from '@/data/levels';
import { achievements } from '@/data/achievements';
import { topics } from '@/data/topics';
import {
  ArrowLeft,
  Edit3,
  Check,
  X,
  Lock,
  LogOut,
  Zap,
  Flame,
  Target,
  Trophy,
  BookOpen,
  TrendingUp,
  ChevronRight,
  Shield,
  Star,
  Crown,
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Animated counter ───────────────────────────────────────
function AnimatedNumber({ value, duration = 1.2 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = value;
    if (end === 0) { setDisplay(0); return; }
    const step = Math.max(1, Math.floor(end / (duration * 60)));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setDisplay(end); clearInterval(timer); }
      else setDisplay(start);
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [value, duration]);
  return <>{display.toLocaleString()}</>;
}

// ─── XP Ring SVG ────────────────────────────────────────────
function XpRing({ progress, size = 112 }: { progress: number; size?: number }) {
  const stroke = 4;
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - Math.min(progress, 1));
  return (
    <svg width={size} height={size} className="absolute inset-0" style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={stroke} />
      <motion.circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke="url(#xpGrad)" strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
      />
      <defs>
        <linearGradient id="xpGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ─── Stat card ──────────────────────────────────────────────
function StatCard({
  icon,
  label,
  value,
  color,
  suffix = '',
  delay = 0,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
  suffix?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="relative overflow-hidden bg-white rounded-2xl p-4 shadow-sm border border-gray-100 group hover:shadow-md transition-shadow"
    >
      <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-[0.07] -translate-y-6 translate-x-6" style={{ background: color }} />
      <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-2.5" style={{ background: `${color}15` }}>
        <div style={{ color }}>{icon}</div>
      </div>
      <p className="text-2xl font-extrabold text-gray-900 tracking-tight">
        <AnimatedNumber value={value} />{suffix}
      </p>
      <p className="text-xs font-semibold text-gray-400 mt-0.5 uppercase tracking-wider">{label}</p>
    </motion.div>
  );
}

// ─── Topic bar ──────────────────────────────────────────────
function TopicBar({
  name,
  icon,
  color,
  accuracy,
  attempted,
  delay,
}: {
  name: string;
  icon: string;
  color: string;
  accuracy: number;
  attempted: number;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      className="group"
    >
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span className="text-sm">{icon}</span>
          <span className="text-sm font-semibold text-gray-700">{name}</span>
        </div>
        <span className="text-xs font-bold tabular-nums" style={{ color: attempted > 0 ? color : '#94A3B8' }}>
          {attempted > 0 ? `${accuracy}%` : '—'}
        </span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}CC)` }}
          initial={{ width: 0 }}
          animate={{ width: attempted > 0 ? `${accuracy}%` : '0%' }}
          transition={{ duration: 0.8, delay: delay + 0.2, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}

// ─── Achievement badge ──────────────────────────────────────
function AchievementBadge({
  achievement,
  delay,
}: {
  achievement: { id: string; name: string; icon: string; description: string; xpReward: number };
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay, type: 'spring', stiffness: 200 }}
      className="flex items-center gap-3 bg-white rounded-xl p-3 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-lg shrink-0">
        {achievement.icon}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-bold text-gray-800 truncate">{achievement.name}</p>
        <p className="text-xs text-gray-400 truncate">{achievement.description}</p>
      </div>
      <div className="ml-auto shrink-0">
        <span className="text-xs font-bold text-amber-500">+{achievement.xpReward}</span>
      </div>
    </motion.div>
  );
}


// ═══════════════════════════════════════════════════════════
// PROFILE PAGE
// ═══════════════════════════════════════════════════════════
export default function ProfilePage() {
  const { data: session, update: updateSession } = useSession();
  const progress = useStore((s) => s.progress);
  const courseProgress = useCourseStore((s) => s.progress);

  const [hasPassword, setHasPassword] = useState<boolean | null>(null);
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState('');
  const [nameLoading, setNameLoading] = useState(false);

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    fetch('/api/user/profile')
      .then((res) => res.json())
      .then((data) => setHasPassword(data.hasPassword ?? false))
      .catch(() => setHasPassword(false));
  }, []);

  // ─── Derived data ──────────────────────────────────────
  const displayName = session?.user?.name || progress.displayName || 'Engineer';
  const email = session?.user?.email || '';
  const image = session?.user?.image;
  const joinedDate = progress.joinedDate;

  const totalXp = progress.totalXp + courseProgress.totalXp;
  const currentStreak = Math.max(progress.currentStreak, courseProgress.currentStreak);
  const longestStreak = Math.max(progress.longestStreak, courseProgress.longestStreak);
  const totalQuestions = progress.totalQuestionsAttempted;
  const accuracy = totalQuestions > 0 ? Math.round((progress.totalQuestionsCorrect / totalQuestions) * 100) : 0;

  const levelInfo = useMemo(() => getXpToNextLevel(totalXp), [totalXp]);
  const unlockedAchievements = useMemo(
    () => achievements.filter((a) => progress.achievementsUnlocked.includes(a.id)),
    [progress.achievementsUnlocked]
  );

  const topicStats = useMemo(
    () =>
      topics.map((topic) => {
        const tp = progress.topicProgress.find((p) => p.topicId === topic.id);
        const attempted = tp?.questionsAttempted ?? 0;
        const correct = tp?.questionsCorrect ?? 0;
        return {
          ...topic,
          attempted,
          accuracy: attempted > 0 ? Math.round((correct / attempted) * 100) : 0,
        };
      }),
    [progress.topicProgress]
  );

  const initial = displayName.charAt(0).toUpperCase();
  const bgColors = ['#3B82F6', '#8B5CF6', '#10B981', '#F97316', '#EC4899'];
  const bgColor = bgColors[initial.charCodeAt(0) % bgColors.length];

  // ─── Handlers ──────────────────────────────────────────
  const handleSaveName = async () => {
    if (!newName.trim() || newName.trim().length < 2) return;
    setNameLoading(true);
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ displayName: newName.trim() }),
      });
      if (res.ok) {
        useStore.setState((state) => ({ progress: { ...state.progress, displayName: newName.trim() } }));
        useCourseStore.setState((state) => ({ progress: { ...state.progress, displayName: newName.trim() } }));
        await updateSession({ name: newName.trim() });
        setEditingName(false);
      }
    } catch { /* silent */ } finally {
      setNameLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');
    if (newPassword.length < 8) { setPasswordError('New password must be at least 8 characters'); return; }
    setPasswordLoading(true);
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) { setPasswordError(data.error || 'Failed to change password'); }
      else {
        setPasswordSuccess('Password changed successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setTimeout(() => { setShowPasswordForm(false); setPasswordSuccess(''); }, 2000);
      }
    } catch { setPasswordError('Something went wrong'); } finally {
      setPasswordLoading(false);
    }
  };

  // ═════════════════════════════════════════════════════════
  return (
    <div className="pb-10">
      {/* ─── Sticky Header ───────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-gray-100">
        <div className="flex items-center h-14 px-4">
          <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <h1 className="text-lg font-extrabold text-gray-900 ml-2">Profile</h1>
        </div>
      </div>

      {/* ─── Hero Section ────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1E293B 0%, #334155 40%, #3730A3 100%)',
        }}
      >
        {/* Decorative grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '32px 32px',
          }}
        />
        {/* Glow accent */}
        <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-amber-500/10 blur-3xl" />

        <div className="relative px-4 pt-8 pb-10">
          {/* Avatar with XP Ring */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1, type: 'spring' }}
            className="relative w-28 h-28 mx-auto mb-4"
          >
            <XpRing progress={levelInfo.progress} size={112} />
            <div className="absolute inset-2">
              {image ? (
                <img src={image} alt={displayName} className="w-full h-full rounded-full object-cover border-3 border-white/20" />
              ) : (
                <div
                  className="w-full h-full rounded-full flex items-center justify-center text-white text-3xl font-extrabold border-3 border-white/20"
                  style={{ background: bgColor }}
                >
                  {initial}
                </div>
              )}
            </div>
            {/* Level badge */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 300 }}
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 text-xs font-extrabold px-2.5 py-0.5 rounded-full shadow-lg whitespace-nowrap flex items-center gap-1"
            >
              <span>{levelInfo.current.icon}</span>
              <span>Lv. {levelInfo.current.level}</span>
            </motion.div>
          </motion.div>

          {/* Name */}
          <div className="text-center">
            <AnimatePresence mode="wait">
              {editingName ? (
                <motion.div
                  key="editing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-2"
                >
                  <input
                    type="text" value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="px-3 py-1.5 bg-white/10 border-2 border-amber-400/60 rounded-lg text-center text-white font-bold focus:outline-none focus:border-amber-400 backdrop-blur-sm"
                    autoFocus maxLength={50}
                  />
                  <button onClick={handleSaveName} disabled={nameLoading} className="p-1.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-400 transition-colors">
                    <Check className="w-4 h-4" />
                  </button>
                  <button onClick={() => setEditingName(false)} className="p-1.5 bg-white/10 text-white/70 rounded-lg hover:bg-white/20 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              ) : (
                <motion.div key="display" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="flex items-center justify-center gap-2">
                    <h2 className="text-2xl font-extrabold text-white tracking-tight">{displayName}</h2>
                    <button
                      onClick={() => { setNewName(displayName); setEditingName(true); }}
                      className="p-1 text-white/30 hover:text-white/70 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <p className="text-sm text-white/40 mt-1">{email}</p>
              <div className="flex items-center justify-center gap-3 mt-2">
                <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-300/80 bg-amber-400/10 px-2.5 py-1 rounded-full">
                  <Crown className="w-3 h-3" />
                  {levelInfo.current.title}
                </span>
                {joinedDate && (
                  <span className="text-xs text-white/30">
                    Joined {new Date(joinedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                )}
              </div>
            </motion.div>
          </div>

          {/* XP Progress Bar */}
          {levelInfo.next && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 max-w-xs mx-auto"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-white/40 uppercase tracking-wider">Next Level</span>
                <span className="text-[11px] font-bold text-amber-300/70 tabular-nums">
                  {totalXp.toLocaleString()} / {levelInfo.next.xpRequired.toLocaleString()} XP
                </span>
              </div>
              <div className="h-2.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #FBBF24, #F59E0B)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.round(levelInfo.progress * 100)}%` }}
                  transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
                />
              </div>
              <p className="text-[10px] text-white/25 mt-1 text-center">
                {levelInfo.xpNeeded.toLocaleString()} XP to {levelInfo.next.title} {levelInfo.next.icon}
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* ─── Stats Grid ──────────────────────────────────── */}
      <div className="px-4 -mt-5">
        <div className="grid grid-cols-3 gap-2.5">
          <StatCard icon={<Zap className="w-4 h-4" />} label="Total XP" value={totalXp} color="#8B5CF6" delay={0.2} />
          <StatCard icon={<Flame className="w-4 h-4" />} label="Streak" value={currentStreak} color="#F97316" delay={0.3} />
          <StatCard icon={<Target className="w-4 h-4" />} label="Accuracy" value={accuracy} color="#10B981" suffix="%" delay={0.4} />
          <StatCard icon={<BookOpen className="w-4 h-4" />} label="Questions" value={totalQuestions} color="#3B82F6" delay={0.5} />
          <StatCard icon={<Trophy className="w-4 h-4" />} label="Achievements" value={unlockedAchievements.length} color="#FBBF24" delay={0.6} />
          <StatCard icon={<TrendingUp className="w-4 h-4" />} label="Best Streak" value={longestStreak} color="#EC4899" delay={0.7} />
        </div>
      </div>

      <div className="px-4 mt-6 space-y-6">
        {/* ─── Topic Mastery ────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-extrabold text-gray-900">Topic Mastery</h3>
            <Link href="/skills" className="text-xs font-bold text-primary-500 hover:text-primary-600 flex items-center gap-0.5 transition-colors">
              View All <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-4">
            {topicStats.map((topic, i) => (
              <TopicBar
                key={topic.id}
                name={topic.name}
                icon={topic.icon}
                color={topic.color}
                accuracy={topic.accuracy}
                attempted={topic.attempted}
                delay={0.7 + i * 0.05}
              />
            ))}
          </div>
        </motion.div>

        {/* ─── Achievements ────────────────────────────── */}
        {unlockedAchievements.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-extrabold text-gray-900">
                Achievements
                <span className="ml-2 text-xs font-bold text-gray-300">{unlockedAchievements.length}/{achievements.length}</span>
              </h3>
              <Link href="/achievements" className="text-xs font-bold text-primary-500 hover:text-primary-600 flex items-center gap-0.5 transition-colors">
                View All <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-2">
              {unlockedAchievements.slice(0, 5).map((ach, i) => (
                <AchievementBadge key={ach.id} achievement={ach} delay={0.9 + i * 0.1} />
              ))}
              {unlockedAchievements.length > 5 && (
                <Link
                  href="/achievements"
                  className="block text-center text-xs font-bold text-gray-400 hover:text-primary-500 py-2 transition-colors"
                >
                  +{unlockedAchievements.length - 5} more achievements
                </Link>
              )}
            </div>
          </motion.div>
        )}

        {/* ─── Account Section ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="space-y-3"
        >
          <h3 className="text-base font-extrabold text-gray-900">Account</h3>

          {/* Change Password */}
          {hasPassword && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <button
                onClick={() => setShowPasswordForm(!showPasswordForm)}
                className="flex items-center gap-3 w-full px-4 py-3.5 hover:bg-gray-50 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                  <Lock className="w-4 h-4 text-slate-500" />
                </div>
                <span className="text-sm font-bold text-gray-700">Change Password</span>
                <ChevronRight className={`w-4 h-4 text-gray-300 ml-auto transition-transform ${showPasswordForm ? 'rotate-90' : ''}`} />
              </button>

              <AnimatePresence>
                {showPasswordForm && (
                  <motion.form
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleChangePassword}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 space-y-3 border-t border-gray-50 pt-3">
                      {passwordError && <p className="text-red-500 text-xs font-semibold">{passwordError}</p>}
                      {passwordSuccess && <p className="text-emerald-500 text-xs font-semibold">{passwordSuccess}</p>}
                      <input
                        type="password" placeholder="Current password" value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)} required
                        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all"
                      />
                      <input
                        type="password" placeholder="New password (8+ characters)" value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)} required minLength={8}
                        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all"
                      />
                      <button
                        type="submit" disabled={passwordLoading}
                        className="w-full py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white font-bold rounded-xl text-sm transition-colors"
                      >
                        {passwordLoading ? 'Updating...' : 'Update Password'}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Logout */}
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="w-full flex items-center gap-3 px-4 py-3.5 bg-white hover:bg-red-50 rounded-2xl border border-gray-100 shadow-sm transition-colors group"
          >
            <div className="w-8 h-8 rounded-lg bg-red-50 group-hover:bg-red-100 flex items-center justify-center transition-colors">
              <LogOut className="w-4 h-4 text-red-400 group-hover:text-red-500 transition-colors" />
            </div>
            <span className="text-sm font-bold text-red-400 group-hover:text-red-500 transition-colors">Log Out</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
