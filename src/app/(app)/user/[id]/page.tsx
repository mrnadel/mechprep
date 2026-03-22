'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  Flame,
  Zap,
  Trophy,
  Crown,
  Calendar,
  Loader2,
} from 'lucide-react';
import { achievements } from '@/data/achievements';
import { topics } from '@/data/topics';
import AddFriendButton from '@/components/friends/AddFriendButton';
import type { MasteryLevel } from '@/data/mastery';

interface PublicProfile {
  id: string;
  displayName: string;
  image: string | null;
  joinedDate: string;
  level: number;
  totalXp: number;
  currentStreak: number;
  longestStreak: number;
  leagueTier: number;
  achievements: string[];
  topicMastery: { topicId: string; masteryLevel: MasteryLevel }[];
  relationship: 'self' | 'friends' | 'request_sent' | 'request_received' | 'none';
  requestId?: string;
}

const MASTERY_COLORS: Record<MasteryLevel, string> = {
  strong: '#22C55E',
  developing: '#F59E0B',
  'needs-work': '#EF4444',
  'not-started': '#E5E7EB',
};

const MASTERY_LABELS: Record<MasteryLevel, string> = {
  strong: 'Strong',
  developing: 'Developing',
  'needs-work': 'Needs Work',
  'not-started': 'Not Started',
};

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

  if (loading) {
    return (
      <div className="flex items-center justify-center" style={{ minHeight: '100vh' }}>
        <Loader2 className="w-8 h-8 animate-spin text-primary-400" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div style={{ minHeight: '100vh', background: '#FAFAFA' }}>
        <header style={{ borderBottom: '2px solid #E5E5E5', padding: '12px 20px' }}>
          <Link href="/friends" className="flex items-center gap-2">
            <ChevronLeft className="w-5 h-5" />
            <span style={{ fontSize: 16, fontWeight: 700 }}>Back</span>
          </Link>
        </header>
        <div className="flex flex-col items-center justify-center gap-4 py-20 px-6">
          <div className="w-20 h-20 rounded-full bg-surface-100 flex items-center justify-center">
            <span className="text-4xl">🔍</span>
          </div>
          <div className="text-center">
            <p className="text-surface-700 font-bold text-lg mb-1">User not found</p>
            <p className="text-surface-400 text-sm">This user may have been removed or doesn't exist</p>
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

  const initials = (profile.displayName || '?').charAt(0).toUpperCase();
  const earnedAchievements = achievements.filter((a) =>
    profile.achievements.includes(a.id)
  );

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFA' }}>
      <header
        className="sticky top-0 z-10 bg-white"
        style={{ borderBottom: '2px solid #E5E5E5', padding: '12px 20px' }}
      >
        <div className="flex items-center justify-between">
          <Link href="/friends" className="flex items-center gap-2">
            <ChevronLeft className="w-5 h-5" />
            <span style={{ fontSize: 16, fontWeight: 700 }}>Profile</span>
          </Link>
          {profile.relationship !== 'self' && (
            <AddFriendButton
              targetUserId={profile.id}
              initialRelationship={profile.relationship}
              requestId={profile.requestId}
            />
          )}
        </div>
      </header>

      <div style={{ padding: '24px 20px', maxWidth: 600, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-3 mb-6"
        >
          <div
            className="rounded-full flex items-center justify-center overflow-hidden"
            style={{ width: 80, height: 80, background: '#E0E7FF' }}
          >
            {profile.image ? (
              <img src={profile.image} alt="" className="w-full h-full object-cover" />
            ) : (
              <span className="text-primary-700 font-bold text-2xl">{initials}</span>
            )}
          </div>
          <div className="text-center">
            <h1 className="text-xl font-extrabold text-surface-900">
              {profile.displayName}
            </h1>
            {profile.joinedDate && (
              <p className="text-sm text-surface-400 flex items-center justify-center gap-1 mt-1">
                <Calendar className="w-3.5 h-3.5" />
                Joined {profile.joinedDate}
              </p>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-3 mb-6"
        >
          <div className="card p-4 text-center">
            <Zap className="w-5 h-5 mx-auto mb-1 text-primary-500" />
            <p className="text-lg font-extrabold text-surface-900">{profile.totalXp.toLocaleString()}</p>
            <p className="text-xs text-surface-400 font-semibold">Total XP</p>
          </div>
          <div className="card p-4 text-center">
            <span className="text-xl block mb-1">⭐</span>
            <p className="text-lg font-extrabold text-surface-900">{profile.level}</p>
            <p className="text-xs text-surface-400 font-semibold">Level</p>
          </div>
          <div className="card p-4 text-center">
            <Flame className="w-5 h-5 mx-auto mb-1 text-orange-500" />
            <p className="text-lg font-extrabold text-surface-900">{profile.currentStreak}</p>
            <p className="text-xs text-surface-400 font-semibold">Day Streak</p>
          </div>
          <div className="card p-4 text-center">
            <Crown className="w-5 h-5 mx-auto mb-1 text-amber-500" />
            <p className="text-lg font-extrabold text-surface-900">Tier {profile.leagueTier}</p>
            <p className="text-xs text-surface-400 font-semibold">League</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-5 mb-6"
        >
          <h2 className="text-sm font-extrabold text-surface-900 mb-4">Topic Mastery</h2>
          <div className="flex flex-col gap-3">
            {profile.topicMastery.map((tm) => {
              const topic = topics.find((t) => t.id === tm.topicId);
              if (!topic) return null;
              return (
                <div key={tm.topicId} className="flex items-center gap-3">
                  <span className="text-lg">{topic.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-surface-700 truncate">
                      {topic.name}
                    </p>
                  </div>
                  <span
                    className="text-xs font-bold px-2 py-1 rounded-full"
                    style={{
                      background: MASTERY_COLORS[tm.masteryLevel] + '20',
                      color: MASTERY_COLORS[tm.masteryLevel],
                    }}
                  >
                    {MASTERY_LABELS[tm.masteryLevel]}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {earnedAchievements.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card p-5"
          >
            <h2 className="text-sm font-extrabold text-surface-900 mb-4 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500" />
              Achievements ({earnedAchievements.length})
            </h2>
            <div className="grid grid-cols-4 gap-3">
              {earnedAchievements.map((ach) => (
                <div key={ach.id} className="flex flex-col items-center gap-1">
                  <span className="text-2xl">{ach.icon}</span>
                  <p className="text-[10px] text-surface-500 font-semibold text-center leading-tight">
                    {ach.name}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
