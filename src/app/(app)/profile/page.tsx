'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import NextImage from 'next/image';
import { useSession } from 'next-auth/react';
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
  ChevronRight,
  Crown,
  Camera,
  Trash2,
  Loader2,
  Settings,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useMasteryStore } from '@/store/useMasteryStore';
import { computeAllMastery } from '@/data/mastery';
import { useSubscription } from '@/hooks/useSubscription';
import { useGems, useEngagementStore } from '@/store/useEngagementStore';
import { shopItems, findFrameById, findTitleById } from '@/data/gem-shop';
import { AvatarFrame } from '@/components/ui/AvatarFrame';
import type { FrameStyleId } from '@/components/ui/AvatarFrame';

// ─── Image compression ──────────────────────────────────────
const MAX_UPLOAD_MB = 5;
const OUTPUT_SIZE = 128; // px
const JPEG_QUALITY = 0.6;

function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (file.size > MAX_UPLOAD_MB * 1024 * 1024) {
      reject(new Error(`File too large. Max ${MAX_UPLOAD_MB}MB.`));
      return;
    }
    if (!file.type.startsWith('image/')) {
      reject(new Error('Not a valid image file.'));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = OUTPUT_SIZE;
        canvas.height = OUTPUT_SIZE;
        const ctx = canvas.getContext('2d')!;

        // Crop to square from center
        const min = Math.min(img.width, img.height);
        const sx = (img.width - min) / 2;
        const sy = (img.height - min) / 2;

        ctx.drawImage(img, sx, sy, min, min, 0, 0, OUTPUT_SIZE, OUTPUT_SIZE);
        const dataUrl = canvas.toDataURL('image/jpeg', JPEG_QUALITY);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('Failed to load image.'));
      img.src = reader.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file.'));
    reader.readAsDataURL(file);
  });
}

function formatDaysAgo(dateStr: string): string {
  const days = Math.floor(
    (Date.now() - new Date(dateStr + 'T12:00:00').getTime()) / (1000 * 60 * 60 * 24)
  );
  if (days === 0) return 'today';
  if (days === 1) return 'yesterday';
  return `${days}d ago`;
}

const MASTERY_COLORS: Record<string, string> = {
  strong: '#10B981',
  developing: '#F59E0B',
  'needs-work': '#EF4444',
  'not-started': '#94A3B8',
};

// ─── Pro Badge ──────────────────────────────────────────────
function ProBadge({ className = '' }: { className?: string }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.4, type: 'spring', stiffness: 300, damping: 20 }}
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-extrabold text-xs tracking-wide shadow-lg ${className}`}
      style={{
        background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #B45309 100%)',
        color: '#FFFBEB',
        boxShadow: '0 0 12px rgba(245, 158, 11, 0.4), 0 2px 8px rgba(0,0,0,0.15)',
      }}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
      PRO
    </motion.div>
  );
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

// ─── Topic bar ──────────────────────────────────────────────
function TopicBar({
  name,
  icon,
  color,
  mastery,
  level,
  eventCount,
  lastPracticed,
  delay,
}: {
  name: string;
  icon: string;
  color: string;
  mastery: number;
  level: string;
  eventCount: number;
  lastPracticed: string | null;
  delay: number;
}) {
  const barColor = eventCount > 0 ? MASTERY_COLORS[level] ?? color : '#E5E7EB';
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
        <span className="text-xs font-bold tabular-nums" style={{ color: eventCount > 0 ? barColor : '#94A3B8' }}>
          {eventCount > 0 ? `${mastery}%` : '—'}
        </span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${barColor}, ${barColor}CC)` }}
          initial={{ width: 0 }}
          animate={{ width: eventCount > 0 ? `${mastery}%` : '0%' }}
          transition={{ duration: 0.8, delay: delay + 0.2, ease: 'easeOut' }}
        />
      </div>
      {eventCount > 0 && (
        <p className="text-[10px] font-semibold text-gray-400 mt-0.5">
          {level === 'strong' ? 'Strong' : level === 'developing' ? 'Developing' : 'Needs Work'}
          {lastPracticed ? ` · ${formatDaysAgo(lastPracticed)}` : ''}
        </p>
      )}
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
  const router = useRouter();
  const { data: session, update: updateSession } = useSession();
  const progress = useStore((s) => s.progress);
  const courseProgress = useCourseStore((s) => s.progress);
  const { isProUser, hasFetched: subFetched } = useSubscription();
  const gems = useGems();

  // Resolve equipped cosmetics
  const equippedTitle = gems.selectedTitle ? findTitleById(gems.selectedTitle) : undefined;
  const equippedFrameMeta = gems.selectedFrame ? findFrameById(gems.selectedFrame) : null;
  const equippedFrameStyle = equippedFrameMeta?.frameStyle;


  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState('');
  const [nameLoading, setNameLoading] = useState(false);

  const [avatarUploading, setAvatarUploading] = useState(false);
  const [avatarError, setAvatarError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const masteryEvents = useMasteryStore((s) => s.events);
  const hydrateFromServer = useMasteryStore((s) => s.hydrateFromServer);
  useEffect(() => {
    hydrateFromServer();
  }, [hydrateFromServer]);
  const topicIds = useMemo(() => topics.map((t) => t.id), []);
  const masteryScores = useMemo(
    () => computeAllMastery(masteryEvents, topicIds),
    [masteryEvents, topicIds]
  );

  const topicStats = useMemo(
    () =>
      topics.map((topic) => {
        const ms = masteryScores.find((m) => m.topicId === topic.id);
        return {
          ...topic,
          mastery: ms?.score ?? 0,
          level: ms?.level ?? ('not-started' as const),
          eventCount: ms?.eventCount ?? 0,
          lastPracticed: ms?.lastPracticed ?? null,
        };
      }),
    [masteryScores]
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

  const handleAvatarUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Reset input so same file can be re-selected
    e.target.value = '';

    setAvatarError('');
    setAvatarUploading(true);
    try {
      const compressed = await compressImage(file);
      const res = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: compressed }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Upload failed');
      }
      await updateSession({ image: compressed });
    } catch (err: any) {
      setAvatarError(err.message || 'Upload failed');
      setTimeout(() => setAvatarError(''), 4000);
    } finally {
      setAvatarUploading(false);
    }
  }, [updateSession]);

  const handleRemoveAvatar = useCallback(async () => {
    setAvatarUploading(true);
    setAvatarError('');
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: null }),
      });
      if (res.ok) {
        await updateSession({ image: '' });
      }
    } catch { /* silent */ } finally {
      setAvatarUploading(false);
    }
  }, [updateSession]);

  // ═════════════════════════════════════════════════════════
  return (
    <div className="pb-10">
      {/* ─── Sticky Header ───────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-gray-100">
        <div className="flex items-center h-14 px-4">
          <button onClick={() => router.back()} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors lg:hidden">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-lg font-extrabold text-gray-900 ml-2">Profile</h1>
          <Link href="/settings" className="ml-auto p-2 -mr-2 rounded-full hover:bg-gray-100 transition-colors">
            <Settings className="w-5 h-5 text-gray-500" />
          </Link>
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
          {/* Avatar with Frame + Upload */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1, type: 'spring' }}
            className="relative mx-auto mb-4"
            style={{ width: 120, height: 120 }}
          >
            <AvatarFrame frameStyle={equippedFrameStyle as FrameStyleId} size={120}>
              {image ? (
                <NextImage src={image} alt={displayName} width={120} height={120} className="w-full h-full object-cover" />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-white text-3xl font-extrabold"
                  style={{ background: bgColor }}
                >
                  {initial}
                </div>
              )}
            </AvatarFrame>
            {/* Upload overlay */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleAvatarUpload}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={avatarUploading}
              className="absolute rounded-full bg-black/0 hover:bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-all cursor-pointer"
              style={{ top: 6, left: 6, width: 108, height: 108, zIndex: 10 }}
            >
              {avatarUploading ? (
                <Loader2 className="w-6 h-6 text-white animate-spin" />
              ) : (
                <Camera className="w-6 h-6 text-white drop-shadow-lg" />
              )}
            </button>
            {/* Level badge */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 300 }}
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 text-xs font-extrabold px-2.5 py-0.5 rounded-full shadow-lg whitespace-nowrap flex items-center gap-1"
              style={{ zIndex: 20 }}
            >
              <span>{levelInfo.current.icon}</span>
              <span>Lv. {levelInfo.current.level}</span>
            </motion.div>
            {/* Remove photo button */}
            {image && !avatarUploading && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={handleRemoveAvatar}
                className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 hover:bg-red-400 text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
                style={{ zIndex: 20 }}
                title="Remove photo"
              >
                <Trash2 className="w-3 h-3" />
              </motion.button>
            )}
          </motion.div>
          {/* Avatar error */}
          <AnimatePresence>
            {avatarError && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center text-xs text-red-300 bg-red-500/10 rounded-lg py-1.5 px-3 mb-2 mx-auto max-w-xs"
              >
                {avatarError}
              </motion.p>
            )}
          </AnimatePresence>

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
                    <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight truncate max-w-[220px] sm:max-w-xs">{displayName}</h2>
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
              {equippedTitle && (
                <p className="text-xs font-bold text-amber-300/90 mt-1.5 tracking-wide uppercase">{equippedTitle}</p>
              )}
              <p className="text-sm text-white/40 mt-1 truncate max-w-[280px] sm:max-w-sm mx-auto">{email}</p>
              <div className="flex items-center justify-center gap-3 mt-2 flex-wrap">
                <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-300/80 bg-amber-400/10 px-2.5 py-1 rounded-full">
                  <Crown className="w-3 h-3" />
                  {levelInfo.current.title}
                </span>
                {subFetched && isProUser && <ProBadge />}
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

      {/* ─── Stats Row ───────────────────────────────────── */}
      <div className="px-3 sm:px-4 -mt-5 relative z-10">
        <div className="flex gap-2 sm:gap-2.5">
          <HeroStat emoji="⭐" value={totalXp} label="Total XP" bg="#FFFBEB" border="#FDE68A" valueColor="#B45309" delay={0.2} />
          <HeroStat emoji="⚡" value={currentStreak} label="Day Streak" bg="#FFF7ED" border="#FED7AA" valueColor="#C2410C" delay={0.3} />
          <HeroStat emoji="🎯" value={accuracy} label="Accuracy" bg="#F0FDF4" border="#BBF7D0" valueColor="#15803D" delay={0.4} />
        </div>
      </div>

      <div className="px-3 sm:px-4 mt-6 space-y-6">
        {/* ─── My Collection ─────────────────────────────── */}
        {(gems.inventory.activeTitles.length > 0 || gems.inventory.activeFrames.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-extrabold text-gray-900">My Collection</h3>
              <Link href="/shop" className="text-xs font-bold text-primary-500 hover:text-primary-600 flex items-center gap-0.5 transition-colors">
                Shop <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Frame Selector — visual avatar previews */}
            {gems.inventory.activeFrames.length > 0 && (
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-3">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Avatar Frame</p>
                <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
                  {/* No frame option */}
                  <button
                    onClick={() => {
                      useEngagementStore.getState().equipFrame(null);
                    }}
                    className="flex flex-col items-center gap-1.5 shrink-0"
                  >
                    <div
                      className="rounded-2xl p-2 transition-all"
                      style={{
                        border: !gems.selectedFrame ? '2px solid #F5B800' : '2px solid transparent',
                        background: !gems.selectedFrame ? '#F0FDF4' : '#F9FAFB',
                      }}
                    >
                      <AvatarFrame frameStyle={null} size={56}>
                        <div className="w-full h-full flex items-center justify-center text-lg font-extrabold text-white" style={{ background: bgColor }}>
                          {initial}
                        </div>
                      </AvatarFrame>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400">None</span>
                  </button>

                  {gems.inventory.activeFrames.map((frameId) => {
                    const frameMeta = findFrameById(frameId);
                    if (!frameMeta) return null;
                    const isEquipped = gems.selectedFrame === frameId;
                    const fStyle = frameMeta.frameStyle as FrameStyleId;
                    const borderColor = frameMeta.borderColor;
                    return (
                      <button
                        key={frameId}
                        onClick={() => {
                          useEngagementStore.getState().equipFrame(isEquipped ? null : frameId);
                        }}
                        className="flex flex-col items-center gap-1.5 shrink-0"
                      >
                        <div
                          className="rounded-2xl p-2 transition-all"
                          style={{
                            border: isEquipped ? `2px solid ${borderColor}` : '2px solid transparent',
                            background: isEquipped ? `${borderColor}15` : '#F9FAFB',
                          }}
                        >
                          <AvatarFrame frameStyle={fStyle} size={56}>
                            <div className="w-full h-full flex items-center justify-center text-lg font-extrabold text-white" style={{ background: bgColor }}>
                              {initial}
                            </div>
                          </AvatarFrame>
                        </div>
                        <span className={`text-[10px] font-bold ${isEquipped ? 'text-gray-900' : 'text-gray-400'}`}>
                          {frameMeta.name.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Title Selector — pill buttons */}
            {gems.inventory.activeTitles.length > 0 && (
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Title</p>
                <div className="flex flex-wrap gap-2">
                  {/* No title option */}
                  <button
                    onClick={() => useEngagementStore.getState().equipTitle(null)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all"
                    style={{
                      background: !gems.selectedTitle ? '#F0FDF4' : '#F9FAFB',
                      border: !gems.selectedTitle ? '2px solid #F5B800' : '2px solid #E5E7EB',
                      color: !gems.selectedTitle ? '#16A34A' : '#6B7280',
                    }}
                  >
                    None
                  </button>
                  {gems.inventory.activeTitles.map((titleId) => {
                    const titleText = findTitleById(titleId);
                    if (!titleText) return null;
                    const isEquipped = gems.selectedTitle === titleId;
                    // Find icon from shop or reward
                    const shopItem = shopItems.find((i) => i.id === titleId);
                    const icon = shopItem?.icon || '🏅';
                    return (
                      <button
                        key={titleId}
                        onClick={() => useEngagementStore.getState().equipTitle(isEquipped ? null : titleId)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all"
                        style={{
                          background: isEquipped ? '#FFFBEB' : '#F9FAFB',
                          border: isEquipped ? '2px solid #F59E0B' : '2px solid #E5E7EB',
                          color: isEquipped ? '#B45309' : '#6B7280',
                        }}
                      >
                        <span>{icon}</span>
                        <span>{titleText}</span>
                        {isEquipped && <span className="text-amber-500">✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        )}

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
                mastery={topic.mastery}
                level={topic.level}
                eventCount={topic.eventCount}
                lastPracticed={topic.lastPracticed}
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

      </div>
    </div>
  );
}
