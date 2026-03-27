'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useLeague } from '@/store/useEngagementStore';
import { useStore } from '@/store/useStore';
import { leagueTiers } from '@/data/league';
import { getUserRank, getTierConfig } from '@/lib/league-simulator';
import { CompetitorAvatar } from './CompetitorAvatar';
import { LeagueImage } from '@/components/icons/LeagueImage';

export function LeagueBoard() {
  const league = useLeague();
  const displayName = useStore((s) => s.progress.displayName);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const tier = leagueTiers.find((t) => t.tier === league.currentTier) ?? leagueTiers[0];
  const tierConfig = getTierConfig(league.currentTier);

  // Memoize the sorted leaderboard entries to avoid re-sorting on every render
  const allEntries = useMemo(() => {
    const userEntry = {
      id: 'user',
      name: displayName ?? 'You',
      avatarInitial: (displayName ?? 'Y')[0].toUpperCase(),
      weeklyXp: league.weeklyXp,
      fakeUserId: undefined as string | undefined,
      frameStyle: undefined as string | undefined,
    };
    return [
      ...league.competitors.map((c) => ({
        id: c.id,
        name: c.name,
        avatarInitial: c.avatarInitial,
        weeklyXp: c.weeklyXp,
        fakeUserId: c.fakeUserId,
        frameStyle: c.frameStyle,
      })),
      userEntry,
    ].sort((a, b) => b.weeklyXp - a.weeklyXp);
  }, [league.competitors, league.weeklyXp, displayName]);

  // Avoid hydration mismatch — league data comes from localStorage
  if (!mounted) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-4 py-8 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-indigo-500 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  const userRank = getUserRank(league.weeklyXp, league.competitors);
  const promoteCount = tierConfig.promoteCount;
  const demoteCount = tierConfig.demoteCount;
  const totalCount = allEntries.length;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Board header */}
      <div
        className="px-4 py-4 flex items-center gap-3 border-b border-gray-100"
        style={{ background: `${tier.color}14` }}
      >
        <LeagueImage tier={tier} size={48} />
        <div>
          <h2 className="text-lg font-extrabold text-gray-800">{tier.name} League</h2>
          <p className="text-xs text-gray-500">
            Your rank: #{userRank} of {totalCount} &middot; Week XP: {league.weeklyXp}
          </p>
        </div>
      </div>

      {/* Leaderboard */}
      <div>
        {allEntries.map((entry, idx) => {
          const rank = idx + 1;
          const isUser = entry.id === 'user';
          const inPromoteZone = promoteCount > 0 && rank <= promoteCount;
          const inDemoteZone = demoteCount > 0 && rank > totalCount - demoteCount;
          const isTop3 = rank <= 3;

          const rowBg = isUser
            ? '#EEF2FF'
            : inPromoteZone
              ? 'rgba(16, 185, 129, 0.04)'
              : inDemoteZone
                ? 'rgba(239, 68, 68, 0.04)'
                : 'transparent';

          return (
            <div
              key={entry.id}
              className={`flex items-center gap-2.5 px-4 border-b border-gray-50 last:border-0 ${
                isTop3 ? 'py-3' : 'py-2.5'
              } ${
                !isUser ? 'cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors' : ''
              }`}
              onClick={() => {
                if (!isUser && entry.fakeUserId) {
                  router.push(`/user/competitor/${entry.fakeUserId}`);
                }
              }}
              style={{ background: rowBg }}
            >
              {/* Rank */}
              <span
                className={`font-bold text-center flex-shrink-0 ${isTop3 ? 'text-base w-7' : 'text-sm w-6'}`}
                style={{
                  color:
                    rank === 1
                      ? '#F59E0B'
                      : rank === 2
                        ? '#9CA3AF'
                        : rank === 3
                          ? '#CD7F32'
                          : '#D1D5DB',
                }}
              >
                {rank === 1 ? '\u{1F947}' : rank === 2 ? '\u{1F948}' : rank === 3 ? '\u{1F949}' : rank}
              </span>

              {/* Avatar */}
              <CompetitorAvatar
                fakeUserId={entry.fakeUserId}
                avatarInitial={entry.avatarInitial}
                isUser={isUser}
                size={isTop3 ? 36 : 32}
                frameStyle={entry.frameStyle}
              />

              {/* Name + "You" pill */}
              <div className="flex-1 min-w-0 flex items-center gap-1.5">
                <span
                  className="text-sm font-semibold truncate"
                  style={{ color: isUser ? '#4F46E5' : '#374151' }}
                >
                  {entry.name}
                </span>
                {isUser && (
                  <span className="flex-shrink-0 text-[10px] font-bold uppercase tracking-wide text-indigo-600 bg-indigo-100 px-1.5 py-0.5 rounded-full">
                    You
                  </span>
                )}
              </div>

              {/* XP + zone arrow */}
              <div className="flex items-center gap-1 flex-shrink-0">
                {inPromoteZone && !isUser && (
                  <span className="text-emerald-500 text-xs leading-none">{'\u2191'}</span>
                )}
                {inDemoteZone && !isUser && (
                  <span className="text-red-400 text-xs leading-none">{'\u2193'}</span>
                )}
                <span className="text-sm font-bold text-gray-600 min-w-[60px] text-right">
                  {entry.weeklyXp} XP
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
