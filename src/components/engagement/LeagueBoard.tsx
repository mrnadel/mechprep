'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useLeague } from '@/store/useEngagementStore';
import { useStore } from '@/store/useStore';
import { leagueTiers } from '@/data/league';
import { getUserRank, getTierConfig } from '@/lib/league-simulator';
import { CompetitorAvatar } from './CompetitorAvatar';
import { LeagueImage } from '@/components/icons/LeagueImage';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { LeaderboardRow } from '@/components/ui/LeaderboardRow';
import { useIsDark } from '@/store/useThemeStore';

export function LeagueBoard() {
  const league = useLeague();
  const displayName = useStore((s) => s.progress.displayName);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const isDark = useIsDark();
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
      realUserId: undefined as string | undefined,
      frameStyle: undefined as string | undefined,
    };
    return [
      ...league.competitors.map((c) => ({
        id: c.id,
        name: c.name,
        avatarInitial: c.avatarInitial,
        weeklyXp: c.weeklyXp,
        fakeUserId: c.fakeUserId,
        realUserId: c.realUserId,
        frameStyle: c.frameStyle,
      })),
      userEntry,
    ].sort((a, b) => b.weeklyXp - a.weeklyXp);
  }, [league.competitors, league.weeklyXp, displayName]);

  // Avoid hydration mismatch — league data comes from localStorage
  if (!mounted) return <LoadingSpinner />;

  const userRank = getUserRank(league.weeklyXp, league.competitors);
  const promoteCount = tierConfig.promoteCount;
  const demoteCount = tierConfig.demoteCount;
  const totalCount = allEntries.length;

  return (
    <div className="bg-white dark:bg-surface-900 rounded-2xl border border-gray-100 dark:border-surface-700 shadow-sm overflow-hidden">
      {/* Board header */}
      <div
        className="px-4 py-4 flex items-center gap-3 border-b border-gray-100 dark:border-surface-700"
        style={{ background: `${tier.color}${isDark ? '20' : '14'}` }}
      >
        <LeagueImage tier={tier} size={48} />
        <div>
          <h2 className="text-lg font-extrabold text-gray-800 dark:text-surface-50">{tier.name} League</h2>
          <p className="text-xs text-gray-500 dark:text-surface-400">
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
            ? (isDark ? 'rgba(59, 130, 246, 0.12)' : '#EFF6FF')
            : inPromoteZone
              ? (isDark ? 'rgba(16, 185, 129, 0.08)' : 'rgba(16, 185, 129, 0.04)')
              : inDemoteZone
                ? (isDark ? 'rgba(239, 68, 68, 0.08)' : 'rgba(239, 68, 68, 0.04)')
                : 'transparent';

          return (
            <LeaderboardRow
              key={entry.id}
              rank={rank}
              name={entry.name}
              xp={entry.weeklyXp}
              isUser={isUser}
              bgColor={rowBg}
              onClick={
                !isUser
                  ? entry.realUserId
                    ? () => router.push(`/user/${entry.realUserId}`)
                    : entry.fakeUserId
                      ? () => router.push(`/user/competitor/${entry.fakeUserId}`)
                      : undefined
                  : undefined
              }
              avatar={
                <CompetitorAvatar
                  fakeUserId={entry.fakeUserId}
                  avatarInitial={entry.avatarInitial}
                  isUser={isUser}
                  size={isTop3 ? 36 : 32}
                  frameStyle={entry.frameStyle}
                />
              }
              trailing={
                <>
                  {inPromoteZone && !isUser && (
                    <span className="text-emerald-500 text-xs leading-none">{'\u2191'}</span>
                  )}
                  {inDemoteZone && !isUser && (
                    <span className="text-red-400 text-xs leading-none">{'\u2193'}</span>
                  )}
                </>
              }
            />
          );
        })}
      </div>

    </div>
  );
}
