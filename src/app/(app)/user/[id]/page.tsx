'use client';

import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Crown,
  Loader2,
} from 'lucide-react';
import { achievements } from '@/data/achievements';
import { getXpToNextLevel } from '@/data/levels';
import { LevelBadge } from '@/components/engagement/LevelBadge';

interface PublicProfile {
  id: string;
  displayName: string;
  image: string | null;
  joinedDate: string;
  level: number;
  totalXp: number;
  currentStreak: number;
  longestStreak: number;
  accuracy: number;
  leagueTier: number;
  achievements: string[];
  relationship: 'self' | 'friends' | 'request_sent' | 'request_received' | 'none';
  requestId?: string;
}

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

// ─── Hero stat pill ─────────────────────────────────────────
function HeroStat({
  emoji,
  value,
  label,
  bg,
  border,
  valueColor,
  delay = 0,
}: {
  emoji: string;
  value: number;
  label: string;
  bg: string;
  border: string;
  valueColor: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="flex-1 flex flex-col items-center py-3.5 rounded-2xl"
      style={{ background: bg, border: `1.5px solid ${border}` }}
    >
      <span className="text-lg sm:text-[22px] leading-none">{emoji}</span>
      <p className="text-lg sm:text-xl font-extrabold tracking-tight mt-1.5" style={{ color: valueColor }}>
        <AnimatedNumber value={value} />
      </p>
      <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider mt-0.5" style={{ color: `${valueColor}99` }}>
        {label}
      </p>
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
// PUBLIC PROFILE PAGE
// ═══════════════════════════════════════════════════════════
export default function PublicProfilePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    fetch(`/api/user/${id}/profile`)
      .then((res) => {
        if (!res.ok) throw new Error('User not found');
        return res.json();
      })
      .then((data) => {
        if (data.relationship === 'self') {
          router.replace('/profile');
          return;
        }
        setProfile(data);
      })
      .catch(() => setError('User not found'))
      .finally(() => setLoading(false));
  }, [id, router]);

  const levelInfo = useMemo(
    () => (profile ? getXpToNextLevel(profile.totalXp) : null),
    [profile]
  );

  const earnedAchievements = useMemo(
    () => (profile ? achievements.filter((a) => profile.achievements.includes(a.id)) : []),
    [profile]
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center" style={{ minHeight: '100vh' }}>
        <Loader2 className="w-8 h-8 animate-spin text-primary-400" />
      </div>
    );
  }

  if (error || !profile || !levelInfo) {
    return (
      <div style={{ minHeight: '100vh', background: '#FAFAFA' }}>
        <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-gray-100">
          <div className="flex items-center h-14 px-4">
            <button onClick={() => router.back()} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-lg font-extrabold text-gray-900 ml-2">Profile</h1>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 py-20 px-6">
          <div className="w-20 h-20 rounded-full bg-surface-100 flex items-center justify-center">
            <span className="text-4xl">🔍</span>
          </div>
          <div className="text-center">
            <p className="text-surface-700 font-bold text-lg mb-1">User not found</p>
            <p className="text-surface-400 text-sm">This user may have been removed or doesn&apos;t exist</p>
          </div>
          <Link
            href="/friends"
            className="px-5 py-2.5 rounded-xl bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors"
          >
            Back to Friends
          </Link>
        </div>
      </div>
    );
  }

  const initial = (profile.displayName || '?').charAt(0).toUpperCase();
  const bgColors = ['#3B82F6', '#8B5CF6', '#10B981', '#F97316', '#EC4899'];
  const bgColor = bgColors[initial.charCodeAt(0) % bgColors.length];

  return (
    <div className="pb-10">
      {/* ─── Sticky Header (full-width) ──────────────────── */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-gray-100">
        <div className="flex items-center justify-between h-14 px-4">
          <div className="flex items-center">
            <button onClick={() => router.back()} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-lg font-extrabold text-gray-900 ml-2">Profile</h1>
          </div>
        </div>
      </div>

      {/* ─── Content wrapper (centered on desktop) ───────── */}
      <div className="max-w-2xl mx-auto">
        {/* ─── Hero Section ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #1E293B 0%, #334155 40%, #1E40AF 100%)',
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
          {/* Glow accents */}
          <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-primary-500/20 blur-3xl" />
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-amber-500/10 blur-3xl" />

          <div className="relative px-4 lg:px-8 pt-8 pb-10">
            {/* Avatar */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1, type: 'spring' }}
              className="relative mx-auto mb-4"
              style={{ width: 112, height: 112 }}
            >
              {/* XP Ring */}
              <svg width={112} height={112} className="absolute inset-0" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx={56} cy={56} r={50} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={4} />
                <motion.circle
                  cx={56} cy={56} r={50} fill="none"
                  stroke="url(#xpGradPub)" strokeWidth={4} strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 50}
                  initial={{ strokeDashoffset: 2 * Math.PI * 50 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 50 * (1 - Math.min(levelInfo.progress, 1)) }}
                  transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
                />
                <defs>
                  <linearGradient id="xpGradPub" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FBBF24" />
                    <stop offset="100%" stopColor="#F59E0B" />
                  </linearGradient>
                </defs>
              </svg>

              <div
                className="absolute rounded-full overflow-hidden flex items-center justify-center"
                style={{ top: 8, left: 8, width: 96, height: 96 }}
              >
                {profile.image ? (
                  <Image src={profile.image} alt={profile.displayName} width={96} height={96} className="w-full h-full object-cover" />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center text-white text-3xl font-extrabold"
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
                style={{ zIndex: 20 }}
              >
                <LevelBadge level={levelInfo.current} size={18} />
                <span>Lv. {levelInfo.current.level}</span>
              </motion.div>
            </motion.div>

            {/* Name + Info */}
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight truncate max-w-[220px] sm:max-w-xs lg:max-w-md mx-auto">
                {profile.displayName}
              </h2>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <div className="flex items-center justify-center gap-3 mt-2 flex-wrap">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-300/80 bg-amber-400/10 px-2.5 py-1 rounded-full">
                    <Crown className="w-3 h-3" />
                    {levelInfo.current.title}
                  </span>
                  {profile.joinedDate && (
                    <span className="text-xs text-white/30">
                      Joined {new Date(profile.joinedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
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
                className="mt-6 max-w-xs lg:max-w-sm mx-auto"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold text-white/40 uppercase tracking-wider">Next Level</span>
                  <span className="text-[11px] font-bold text-amber-300/70 tabular-nums">
                    {profile.totalXp.toLocaleString()} / {levelInfo.next.xpRequired.toLocaleString()} XP
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
                  {levelInfo.xpNeeded.toLocaleString()} XP to {levelInfo.next.title} <LevelBadge level={levelInfo.next} size={12} className="inline-block align-middle" />
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* ─── Stats Row ─────────────────────────────────── */}
        <div className="px-3 sm:px-4 lg:px-6 -mt-5 relative z-10">
          <div className="flex gap-2 sm:gap-2.5 lg:gap-4">
            <HeroStat emoji="⭐" value={profile.totalXp} label="Total XP" bg="#FFFBEB" border="#FDE68A" valueColor="#B45309" delay={0.2} />
            <HeroStat emoji="⚡" value={profile.currentStreak} label="Day Streak" bg="#FFF7ED" border="#FED7AA" valueColor="#C2410C" delay={0.3} />
            <HeroStat emoji="🎯" value={profile.accuracy} label="Accuracy" bg="#F0FDF4" border="#BBF7D0" valueColor="#15803D" delay={0.4} />
          </div>
        </div>

        <div className="px-3 sm:px-4 lg:px-6 mt-6 space-y-6">
          {/* ─── Achievements ──────────────────────────── */}
          {earnedAchievements.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <h3 className="text-base font-extrabold text-gray-900 mb-4">
                Achievements
                <span className="ml-2 text-xs font-bold text-gray-300">{earnedAchievements.length}/{achievements.length}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {earnedAchievements.slice(0, 6).map((ach, i) => (
                  <AchievementBadge key={ach.id} achievement={ach} delay={0.9 + i * 0.1} />
                ))}
                {earnedAchievements.length > 6 && (
                  <p className="text-center text-xs font-bold text-gray-400 py-2 sm:col-span-2">
                    +{earnedAchievements.length - 6} more achievements
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
