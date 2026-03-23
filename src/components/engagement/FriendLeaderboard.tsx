'use client';

import { Users, AlertCircle, RefreshCw } from 'lucide-react';
import useSWR from 'swr';
import InviteShare from '@/components/friends/InviteShare';

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error(`Request failed: ${r.status}`);
    return r.json();
  });

interface LeaderboardEntry {
  id: string;
  displayName: string;
  image: string | null;
  weeklyXp: number;
  isUser: boolean;
}

export function FriendLeaderboard() {
  const { data, error, isLoading, mutate } = useSWR('/api/friends/weekly-xp', fetcher);
  const leaderboard: LeaderboardEntry[] = data?.leaderboard ?? [];

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex justify-center">
        <div className="w-6 h-6 border-2 border-gray-300 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
        <div className="flex justify-center mb-3">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-red-400" />
          </div>
        </div>
        <p className="text-gray-700 font-bold text-sm mb-1">Failed to load leaderboard</p>
        <p className="text-gray-400 text-xs mb-3">Something went wrong. Please try again.</p>
        <button
          onClick={() => mutate()}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Retry
        </button>
      </div>
    );
  }

  if (leaderboard.length <= 1) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 text-center">
          <div className="flex justify-center mb-3">
            <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center">
              <Users className="w-8 h-8 text-primary-500" />
            </div>
          </div>
          <p className="text-surface-700 font-bold text-sm mb-1">No friends yet</p>
          <p className="text-surface-400 text-xs mb-4">
            Invite friends to see how you stack up!
          </p>
          <InviteShare />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 py-4 flex items-center gap-3 border-b border-gray-100 bg-primary-50/50">
        <span className="text-3xl">👥</span>
        <div>
          <h2 className="text-lg font-extrabold text-gray-800">Friends Leaderboard</h2>
          <p className="text-xs text-gray-500">Weekly XP ranking</p>
        </div>
      </div>

      {/* Leaderboard */}
      <div>
        {leaderboard.map((entry, idx) => {
          const rank = idx + 1;
          const isTop3 = rank <= 3;
          const initials = (entry.displayName || '?').charAt(0).toUpperCase();

          return (
            <div
              key={entry.id}
              className={`flex items-center gap-2.5 px-4 border-b border-gray-50 last:border-0 ${
                isTop3 ? 'py-3' : 'py-2.5'
              }`}
              style={{ background: entry.isUser ? '#EEF2FF' : 'transparent' }}
            >
              {/* Rank */}
              <span
                className={`font-bold text-center flex-shrink-0 ${isTop3 ? 'text-base w-7' : 'text-sm w-6'}`}
                style={{
                  color: rank === 1 ? '#F59E0B' : rank === 2 ? '#9CA3AF' : rank === 3 ? '#CD7F32' : '#D1D5DB',
                }}
              >
                {rank === 1 ? '\u{1F947}' : rank === 2 ? '\u{1F948}' : rank === 3 ? '\u{1F949}' : rank}
              </span>

              {/* Avatar */}
              <div
                className="rounded-full flex items-center justify-center overflow-hidden shrink-0"
                style={{
                  width: isTop3 ? 36 : 32,
                  height: isTop3 ? 36 : 32,
                  background: entry.isUser ? '#C7D2FE' : '#E0E7FF',
                }}
              >
                {entry.image ? (
                  <img src={entry.image} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-primary-700 font-bold text-xs">{initials}</span>
                )}
              </div>

              {/* Name */}
              <div className="flex-1 min-w-0 flex items-center gap-1.5">
                <span
                  className="text-sm font-semibold truncate"
                  style={{ color: entry.isUser ? '#4F46E5' : '#374151' }}
                >
                  {entry.displayName}
                </span>
                {entry.isUser && (
                  <span className="flex-shrink-0 text-[10px] font-bold uppercase tracking-wide text-indigo-600 bg-indigo-100 px-1.5 py-0.5 rounded-full">
                    You
                  </span>
                )}
              </div>

              {/* XP */}
              <span className="text-sm font-bold text-gray-600 min-w-[60px] text-right">
                {entry.weeklyXp} XP
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
