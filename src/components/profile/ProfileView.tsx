'use client';

import { useState, useMemo, useRef } from 'react';
import NextImage from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Edit3, Check, X, Camera, Trash2, Loader2,
  Star, ChevronRight,
} from 'lucide-react';
import { achievements as allAchievements } from '@/data/achievements';
import { getXpToNextLevel } from '@/data/levels';
import { leagueTiers } from '@/data/league';
import { LevelBadge } from '@/components/engagement/LevelBadge';
import { LeagueImage } from '@/components/icons/LeagueImage';
import { AvatarFrame } from '@/components/ui/AvatarFrame';
import type { FrameStyleId } from '@/components/ui/AvatarFrame';
import { PageHeader } from '@/components/ui/PageHeader';

// ── Types ──────────────────────────────────────────────────

export interface ProfileData {
  displayName: string;
  image: string | null;
  totalXp: number;
  currentStreak: number;
  longestStreak?: number;
  accuracy: number;
  joinedDate: string | null;
  achievementIds: string[];
  frameStyle?: FrameStyleId | null;
  leagueTier?: number | null;
  avatarColor?: string;
}

export interface OwnProfileConfig {
  isProUser: boolean;
  equippedTitle?: {
    text: string;
    icon?: string;
    gradient?: string | null;
  } | null;
  onSaveName: (name: string) => Promise<boolean>;
  onAvatarUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveAvatar: () => void;
  avatarUploading: boolean;
  avatarError: string;
}

interface ProfileViewProps {
  data: ProfileData;
  ownProfile?: OwnProfileConfig;
  backHref?: string;
  headerTrailing?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

// ── Helpers ────────────────────────────────────────────────

function deriveAvatarColor(name: string) {
  const ch = (name || '?').charAt(0).toUpperCase();
  const colors = ['#3B82F6', '#8B5CF6', '#10B981', '#F97316', '#EC4899'];
  return { initial: ch, bgColor: colors[ch.charCodeAt(0) % colors.length] };
}

// ── Main Component ─────────────────────────────────────────

export function ProfileView({
  data, ownProfile, backHref = '/', headerTrailing, children, footer,
}: ProfileViewProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState('');
  const [nameLoading, setNameLoading] = useState(false);

  const { initial, bgColor: derivedColor } = deriveAvatarColor(data.displayName);
  const avatarBg = data.avatarColor || derivedColor;
  const levelInfo = useMemo(() => getXpToNextLevel(data.totalXp), [data.totalXp]);

  const tierInfo = useMemo(() => {
    if (data.leagueTier == null) return null;
    return leagueTiers.find((t) => t.tier === data.leagueTier) ?? leagueTiers[0];
  }, [data.leagueTier]);

  const earnedAchievements = useMemo(
    () => allAchievements.filter((a) => data.achievementIds.includes(a.id)),
    [data.achievementIds],
  );

  const handleSaveName = async () => {
    if (!newName.trim() || newName.trim().length < 2 || !ownProfile) return;
    setNameLoading(true);
    const success = await ownProfile.onSaveName(newName.trim());
    setNameLoading(false);
    if (success) setEditingName(false);
  };

  const isOwn = !!ownProfile;

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-surface-950 pb-10">
      <PageHeader title="Profile" backHref={backHref} trailing={headerTrailing} />

      <div className="px-4 sm:px-5 pt-4 space-y-4 max-w-2xl mx-auto">
        {/* ── Identity Card ────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="card dark:bg-surface-900 dark:border-surface-700 px-5 pt-6 pb-5"
        >
          <div className="flex flex-col items-center text-center">
            {/* Avatar */}
            <div className="relative" style={{ width: 80, height: 80 }}>
              <div className="rounded-full overflow-hidden w-full h-full">
                <AvatarFrame frameStyle={(data.frameStyle ?? null) as FrameStyleId} size={80}>
                  {data.image ? (
                    <NextImage src={data.image} alt={data.displayName} width={80} height={80} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white text-2xl font-extrabold" style={{ background: avatarBg }}>
                      {initial}
                    </div>
                  )}
                </AvatarFrame>
              </div>

              {ownProfile && (
                <>
                  <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={ownProfile.onAvatarUpload} />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={ownProfile.avatarUploading}
                    className="absolute -bottom-0.5 -right-0.5 w-7 h-7 rounded-full bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center shadow-md transition-colors"
                  >
                    {ownProfile.avatarUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Camera className="w-3.5 h-3.5" />}
                  </button>
                  {data.image && !ownProfile.avatarUploading && (
                    <button
                      onClick={ownProfile.onRemoveAvatar}
                      className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-danger-500 hover:bg-danger-400 text-white rounded-full flex items-center justify-center shadow transition-colors"
                      title="Remove photo"
                    >
                      <Trash2 className="w-2.5 h-2.5" />
                    </button>
                  )}
                </>
              )}
            </div>

            {/* Name */}
            <div className="mt-2.5">
              {ownProfile ? (
                <AnimatePresence mode="wait">
                  {editingName ? (
                    <motion.div key="edit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="flex items-center gap-1.5"
                    >
                      <input
                        type="text" value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="w-40 px-2.5 py-1.5 bg-surface-100 dark:bg-surface-800 border-2 border-primary-400 rounded-lg text-sm font-bold text-surface-900 dark:text-surface-50 focus:outline-none"
                        autoFocus maxLength={50}
                        onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                      />
                      <button onClick={handleSaveName} disabled={nameLoading}
                        className="p-1.5 bg-accent-500 text-white rounded-lg hover:bg-accent-400 transition-colors">
                        {nameLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                      </button>
                      <button onClick={() => setEditingName(false)}
                        className="p-1.5 bg-surface-200 dark:bg-surface-700 text-surface-500 rounded-lg hover:bg-surface-300 transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div key="display" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <div className="flex items-center justify-center gap-1">
                        <h2 className="text-lg font-extrabold text-[#3C3C3C] dark:text-surface-50">
                          {data.displayName}
                        </h2>
                        <button onClick={() => { setNewName(data.displayName); setEditingName(true); }}
                          className="p-1 text-surface-300 hover:text-surface-500 dark:text-surface-600 dark:hover:text-surface-400 transition-colors shrink-0">
                          <Edit3 className="w-3 h-3" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              ) : (
                <h2 className="text-lg font-extrabold text-[#3C3C3C] dark:text-surface-50">
                  {data.displayName}
                </h2>
              )}
            </div>

            {/* Equipped title (own only) */}
            {ownProfile?.equippedTitle && (
              <span
                className="inline-flex items-center gap-1 mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest"
                style={ownProfile.equippedTitle.gradient ? {
                  background: ownProfile.equippedTitle.gradient,
                  color: '#FFF',
                  textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                } : {
                  background: 'var(--color-brand-50)',
                  border: '1px solid var(--color-brand-200)',
                  color: 'var(--color-brand-700)',
                }}
              >
                {ownProfile.equippedTitle.icon && <span className="text-[10px]">{ownProfile.equippedTitle.icon}</span>}
                {ownProfile.equippedTitle.text}
              </span>
            )}

            {/* Subtitle: level · league · pro — clean text, not pill badges */}
            <p className="text-xs text-[#AFAFAF] dark:text-surface-500 mt-1.5 flex items-center gap-1.5 flex-wrap justify-center">
              <span className="inline-flex items-center gap-1 font-semibold">
                <LevelBadge level={levelInfo.current} size={13} />
                Lv. {levelInfo.current.level} {levelInfo.current.title}
              </span>
              {tierInfo && (
                <>
                  <span className="text-surface-300 dark:text-surface-600">·</span>
                  <span className="inline-flex items-center gap-1 font-semibold" style={{ color: tierInfo.color }}>
                    <LeagueImage tier={tierInfo} size={13} className="inline-block" /> {tierInfo.name}
                  </span>
                </>
              )}
              {ownProfile?.isProUser && (
                <>
                  <span className="text-surface-300 dark:text-surface-600">·</span>
                  <span className="inline-flex items-center gap-0.5 font-extrabold text-brand-600 dark:text-brand-400">
                    <Star className="w-2.5 h-2.5" fill="currentColor" /> PRO
                  </span>
                </>
              )}
            </p>

            {/* Join date (other users only) */}
            {!isOwn && data.joinedDate && (
              <p className="text-[11px] text-[#AFAFAF] dark:text-surface-500 mt-1">
                Joined {new Date(data.joinedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </p>
            )}
          </div>

          {/* Avatar upload error */}
          <AnimatePresence>
            {ownProfile?.avatarError && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-xs text-danger-600 bg-danger-50 dark:bg-danger-900/20 dark:text-danger-400 rounded-lg py-2 px-3 mt-3 text-center">
                {ownProfile.avatarError}
              </motion.p>
            )}
          </AnimatePresence>

          {/* XP progress (own only) — minimal: just bar + count */}
          {isOwn && levelInfo.next && (
            <div className="mt-4">
              <div className="h-2 bg-surface-100 dark:bg-surface-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.round(levelInfo.progress * 100)}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
              <p className="text-[11px] text-[#AFAFAF] dark:text-surface-500 mt-1.5 text-center tabular-nums">
                {data.totalXp.toLocaleString()} / {levelInfo.next.xpRequired.toLocaleString()} XP to {levelInfo.next.title}
              </p>
            </div>
          )}
        </motion.div>

        {/* ── Stats — single card, 3 columns ─────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.08 }}
          className="card dark:bg-surface-900 dark:border-surface-700 p-4 flex items-center"
        >
          <div className="flex-1 text-center">
            <p className="text-lg font-extrabold tabular-nums text-brand-500">{data.totalXp.toLocaleString()}</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#AFAFAF] dark:text-surface-500">Total XP</p>
          </div>
          <div className="w-px h-8 bg-surface-200 dark:bg-surface-700" />
          <div className="flex-1 text-center">
            <p className="text-lg font-extrabold tabular-nums text-orange-500">{data.currentStreak}d</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#AFAFAF] dark:text-surface-500">Streak</p>
          </div>
          {!isOwn && data.longestStreak != null && (
            <>
              <div className="w-px h-8 bg-gray-100 dark:bg-surface-700 mx-1 flex-shrink-0" />
              <div className="flex-1 text-center">
                <p className="text-lg font-extrabold tabular-nums text-amber-500">{data.longestStreak}d</p>
                <p className="text-[10px] font-medium text-gray-400 dark:text-surface-400 uppercase tracking-wider">Best</p>
              </div>
            </>
          )}
          {isOwn && (
            <>
              <div className="w-px h-8 bg-surface-200 dark:bg-surface-700" />
              <div className="flex-1 text-center">
                <p className="text-lg font-extrabold tabular-nums text-accent-500">{data.accuracy}%</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#AFAFAF] dark:text-surface-500">Accuracy</p>
              </div>
            </>
          )}
        </motion.div>

        {/* ── Children (collection for own profile) ─────── */}
        {children}

        {/* ── Achievements ─────────────────────────────── */}
        {earnedAchievements.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.16 }}
          >
            <div className="flex items-center justify-between mb-2.5">
              <h3 className="text-sm font-extrabold text-[#3C3C3C] dark:text-surface-100">
                Achievements
                <span className="ml-1.5 text-xs font-bold text-[#AFAFAF] dark:text-surface-500">{earnedAchievements.length}/{allAchievements.length}</span>
              </h3>
              {isOwn && (
                <Link href="/achievements" className="text-xs font-bold text-primary-500 hover:text-primary-600 flex items-center gap-0.5 transition-colors">
                  View All <ChevronRight className="w-3 h-3" />
                </Link>
              )}
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1">
              {earnedAchievements.slice(0, 8).map((ach) => (
                <div key={ach.id} className="flex flex-col items-center gap-1.5 shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center text-2xl border border-brand-100 dark:border-brand-800/30">
                    {ach.icon}
                  </div>
                  <span className="text-[10px] font-bold text-[#AFAFAF] dark:text-surface-500 w-16 text-center leading-tight line-clamp-2">
                    {ach.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Footer (invite section) ──────────────────── */}
        {footer}
      </div>
    </div>
  );
}
