'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
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
  Trophy,
  ChevronRight,
  Shield,
  Crown,
  Camera,
  Trash2,
  Loader2,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useMasteryStore } from '@/store/useMasteryStore';
import { computeAllMastery } from '@/data/mastery';
import { useSubscription } from '@/hooks/useSubscription';

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
      <span style={{ fontSize: 22, lineHeight: 1 }}>{emoji}</span>
      <p className="text-xl font-extrabold tracking-tight mt-1.5" style={{ color: valueColor }}>
        <AnimatedNumber value={value} />
      </p>
      <p className="text-[10px] font-bold uppercase tracking-wider mt-0.5" style={{ color: `${valueColor}99` }}>
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

  const [avatarUploading, setAvatarUploading] = useState(false);
  const [avatarError, setAvatarError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset progress state — 3-step confirmation
  const [resetStep, setResetStep] = useState(0); // 0=hidden, 1=warning, 2=type confirm, 3=processing
  const [resetConfirmText, setResetConfirmText] = useState('');
  const [resetError, setResetError] = useState('');

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

  const handleResetProgress = useCallback(async () => {
    if (resetConfirmText !== 'RESET MY PROGRESS') return;
    setResetStep(3);
    setResetError('');
    try {
      const res = await fetch('/api/user/reset-progress', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confirmation: 'RESET MY PROGRESS' }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to reset');
      }
      // Clear local stores
      useStore.getState().resetProgress();
      useCourseStore.setState({ progress: { displayName: displayName, totalXp: 0, currentStreak: 0, longestStreak: 0, lastActiveDate: '', completedLessons: {} } });
      useMasteryStore.getState().clearEvents();
      setResetStep(0);
      setResetConfirmText('');
      // Reload page to reflect clean state
      window.location.reload();
    } catch (err: any) {
      setResetError(err.message || 'Something went wrong');
      setResetStep(2);
    }
  }, [resetConfirmText, displayName]);

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
          <button onClick={() => router.back()} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
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
          {/* Avatar with XP Ring + Upload */}
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
                className="absolute inset-0 rounded-full bg-black/0 hover:bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-all cursor-pointer group"
              >
                {avatarUploading ? (
                  <Loader2 className="w-6 h-6 text-white animate-spin" />
                ) : (
                  <Camera className="w-6 h-6 text-white drop-shadow-lg" />
                )}
              </button>
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
            {/* Remove photo button */}
            {image && !avatarUploading && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={handleRemoveAvatar}
                className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 hover:bg-red-400 text-white rounded-full flex items-center justify-center shadow-lg transition-colors z-10"
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
      <div className="px-4 -mt-5">
        <div className="flex gap-2.5">
          <HeroStat emoji="⭐" value={totalXp} label="Total XP" bg="#FFFBEB" border="#FDE68A" valueColor="#B45309" delay={0.2} />
          <HeroStat emoji="🔥" value={currentStreak} label="Day Streak" bg="#FFF7ED" border="#FED7AA" valueColor="#C2410C" delay={0.3} />
          <HeroStat emoji="🎯" value={accuracy} label="Accuracy" bg="#F0FDF4" border="#BBF7D0" valueColor="#15803D" delay={0.4} />
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

        {/* ─── Danger Zone ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          <h3 className="text-base font-extrabold text-gray-900 mb-3">Danger Zone</h3>
          <div className="bg-white rounded-2xl border border-red-100 shadow-sm overflow-hidden">
            <button
              onClick={() => { setResetStep(resetStep === 0 ? 1 : 0); setResetConfirmText(''); setResetError(''); }}
              className="flex items-center gap-3 w-full px-4 py-3.5 hover:bg-red-50/50 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                <RotateCcw className="w-4 h-4 text-red-400" />
              </div>
              <div className="text-left">
                <span className="text-sm font-bold text-gray-700 block">Reset All Progress</span>
                <span className="text-[11px] text-gray-400">Erase XP, streaks, lessons, achievements — everything</span>
              </div>
              <ChevronRight className={`w-4 h-4 text-gray-300 ml-auto transition-transform ${resetStep > 0 ? 'rotate-90' : ''}`} />
            </button>

            <AnimatePresence>
              {resetStep >= 1 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 border-t border-red-50 pt-4 space-y-3">
                    {/* Step 1: Warning */}
                    {resetStep === 1 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                        <div className="flex gap-3 p-3 bg-red-50 rounded-xl">
                          <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                          <div className="text-xs text-red-700 space-y-1">
                            <p className="font-bold">This action is permanent and cannot be undone.</p>
                            <p>All your progress will be permanently deleted:</p>
                            <ul className="list-disc pl-4 space-y-0.5 text-red-600">
                              <li>All XP and level progress</li>
                              <li>Streak history</li>
                              <li>All completed lessons and courses</li>
                              <li>Topic mastery data</li>
                              <li>Achievements</li>
                              <li>Session history</li>
                            </ul>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setResetStep(2)}
                            className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl text-sm transition-colors"
                          >
                            I understand, continue
                          </button>
                          <button
                            onClick={() => { setResetStep(0); setResetConfirmText(''); }}
                            className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold rounded-xl text-sm transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2: Type confirmation */}
                    {resetStep === 2 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                        {resetError && <p className="text-red-500 text-xs font-semibold">{resetError}</p>}
                        <p className="text-xs text-gray-500">
                          Type <span className="font-mono font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">RESET MY PROGRESS</span> to confirm:
                        </p>
                        <input
                          type="text"
                          value={resetConfirmText}
                          onChange={(e) => setResetConfirmText(e.target.value)}
                          placeholder="Type here..."
                          autoFocus
                          className="w-full px-3 py-2.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:border-red-400 transition-all"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={handleResetProgress}
                            disabled={resetConfirmText !== 'RESET MY PROGRESS'}
                            className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold rounded-xl text-sm transition-colors"
                          >
                            Permanently Reset Everything
                          </button>
                          <button
                            onClick={() => { setResetStep(0); setResetConfirmText(''); setResetError(''); }}
                            className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold rounded-xl text-sm transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Processing */}
                    {resetStep === 3 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center gap-2 py-4">
                        <Loader2 className="w-5 h-5 text-red-400 animate-spin" />
                        <span className="text-sm font-bold text-gray-500">Resetting all progress...</span>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
