'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Loader2, UserPlus, UserCheck, UserX } from 'lucide-react';
import { ProfileView } from '@/components/profile/ProfileView';
import type { ProfileData } from '@/components/profile/ProfileView';

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

export default function PublicProfilePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [relation, setRelation] = useState<PublicProfile['relationship']>('none');
  const [reqId, setReqId] = useState<string | undefined>();
  const [actionLoading, setActionLoading] = useState(false);

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
        setRelation(data.relationship);
        setReqId(data.requestId);
      })
      .catch(() => setError('User not found'))
      .finally(() => setLoading(false));
  }, [id, router]);

  async function handleAddFriend() {
    if (!profile || actionLoading) return;
    setActionLoading(true);
    try {
      const res = await fetch('/api/friends/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ receiverId: profile.id }),
      });
      if (res.ok) setRelation('request_sent');
    } finally {
      setActionLoading(false);
    }
  }

  async function handleCancelRequest() {
    if (!reqId || actionLoading) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/friends/request/${reqId}`, { method: 'DELETE' });
      if (res.ok) {
        setRelation('none');
        setReqId(undefined);
      }
    } finally {
      setActionLoading(false);
    }
  }

  async function handleAcceptRequest() {
    if (!reqId || actionLoading) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/friends/request/${reqId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'accept' }),
      });
      if (res.ok) setRelation('friends');
    } finally {
      setActionLoading(false);
    }
  }

  async function handleDeclineRequest() {
    if (!reqId || actionLoading) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/friends/request/${reqId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'decline' }),
      });
      if (res.ok) {
        setRelation('none');
        setReqId(undefined);
      }
    } finally {
      setActionLoading(false);
    }
  }

  async function handleUnfriend() {
    if (!profile || actionLoading) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/friends/${profile.id}`, { method: 'DELETE' });
      if (res.ok) setRelation('none');
    } finally {
      setActionLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center" style={{ minHeight: '100vh' }}>
        <Loader2 className="w-8 h-8 animate-spin text-primary-400" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="bg-[#FAFAFA] dark:bg-surface-950" style={{ minHeight: '100vh' }}>
        <div className="sticky top-0 z-30 bg-white/90 dark:bg-surface-900/90 backdrop-blur-xl border-b border-gray-100 dark:border-surface-700">
          <div className="flex items-center h-14 px-4">
            <button onClick={() => router.back()} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-surface-800 transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-surface-400" />
            </button>
            <h1 className="text-lg font-extrabold text-gray-900 dark:text-surface-50 ml-2">Profile</h1>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 py-20 px-6">
          <div className="w-20 h-20 rounded-full bg-surface-100 dark:bg-surface-800 flex items-center justify-center">
            <span className="text-4xl">🔍</span>
          </div>
          <div className="text-center">
            <p className="text-surface-700 dark:text-surface-200 font-bold text-lg mb-1">User not found</p>
            <p className="text-surface-400 dark:text-surface-500 text-sm">This user may have been removed or doesn&apos;t exist</p>
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

  const profileData: ProfileData = {
    displayName: profile.displayName,
    image: profile.image,
    totalXp: profile.totalXp,
    currentStreak: profile.currentStreak,
    longestStreak: profile.longestStreak,
    accuracy: profile.accuracy,
    joinedDate: profile.joinedDate,
    achievementIds: profile.achievements,
    leagueTier: profile.leagueTier,
  };

  const friendButton = (() => {
    if (relation === 'none') {
      return (
        <button
          onClick={handleAddFriend}
          disabled={actionLoading}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-brand-500 text-white hover:bg-brand-600 active:scale-95 transition-all disabled:opacity-50"
        >
          {actionLoading ? <Loader2 size={14} className="animate-spin" /> : <UserPlus size={14} />}
          Add Friend
        </button>
      );
    }
    if (relation === 'request_sent') {
      return (
        <button
          onClick={handleCancelRequest}
          disabled={actionLoading}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-gray-100 dark:bg-surface-700 text-gray-500 dark:text-surface-300 hover:bg-gray-200 dark:hover:bg-surface-600 active:scale-95 transition-all disabled:opacity-50"
        >
          {actionLoading ? <Loader2 size={14} className="animate-spin" /> : <UserCheck size={14} />}
          Request Sent
        </button>
      );
    }
    if (relation === 'request_received') {
      return (
        <div className="flex items-center gap-2">
          <button
            onClick={handleAcceptRequest}
            disabled={actionLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-500 text-white hover:bg-emerald-600 active:scale-95 transition-all disabled:opacity-50"
          >
            {actionLoading ? <Loader2 size={14} className="animate-spin" /> : <UserCheck size={14} />}
            Accept
          </button>
          <button
            onClick={handleDeclineRequest}
            disabled={actionLoading}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-bold bg-gray-100 dark:bg-surface-700 text-gray-500 dark:text-surface-300 hover:bg-gray-200 dark:hover:bg-surface-600 active:scale-95 transition-all disabled:opacity-50"
          >
            <UserX size={14} />
          </button>
        </div>
      );
    }
    if (relation === 'friends') {
      return (
        <button
          onClick={handleUnfriend}
          disabled={actionLoading}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-500 dark:hover:text-red-400 active:scale-95 transition-all disabled:opacity-50 group"
        >
          {actionLoading ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <UserCheck size={14} className="group-hover:hidden" />
          )}
          {!actionLoading && <UserX size={14} className="hidden group-hover:block" />}
          <span className="group-hover:hidden">Friends</span>
          <span className="hidden group-hover:inline">Unfriend</span>
        </button>
      );
    }
    return null;
  })();

  return <ProfileView data={profileData} headerTrailing={friendButton} />;
}
