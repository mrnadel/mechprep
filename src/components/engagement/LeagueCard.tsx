'use client';

import Link from 'next/link';
import { useLeague } from '@/store/useEngagementStore';
import { leagueTiers } from '@/data/league';
import { getUserRank } from '@/lib/league-simulator';

export function LeagueCard() {
  const league = useLeague();

  const tier = leagueTiers.find((t) => t.tier === league.currentTier) ?? leagueTiers[0];
  const rank = getUserRank(league.weeklyXp, league.competitors);

  // Build full sorted list: competitors + user
  const userEntry = {
    id: 'user',
    name: 'You',
    avatarInitial: 'Y',
    countryFlag: '🇮🇱',
    weeklyXp: league.weeklyXp,
    dailyXpRate: 0,
    variance: 0,
  };

  const allEntries = [...league.competitors, userEntry].sort(
    (a, b) => b.weeklyXp - a.weeklyXp,
  );

  const top5 = allEntries.slice(0, 5);
  const userInTop5 = top5.some((e) => e.id === 'user');

  return (
    <div
      className="bg-white rounded-2xl border shadow-sm overflow-hidden"
      style={{ borderColor: `${tier.color}40` }}
    >
      {/* Header bar */}
      <div
        className="px-4 py-3 flex items-center justify-between"
        style={{ background: `${tier.color}18` }}
      >
        <div className="flex items-center gap-2">
          <span className="text-2xl">{tier.icon}</span>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: tier.color }}>
              {tier.name} League
            </p>
            <p className="text-xs text-gray-500">#{rank} of {league.competitors.length + 1}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-extrabold text-gray-800">{league.weeklyXp} XP</p>
          <p className="text-xs text-gray-400">this week</p>
        </div>
      </div>

      {/* Top 5 mini list */}
      <div className="px-4 py-3 space-y-1.5">
        {top5.map((entry, i) => {
          const isUser = entry.id === 'user';
          return (
            <div
              key={entry.id}
              className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl"
              style={{ background: isUser ? '#EEF2FF' : 'transparent' }}
            >
              <span
                className="text-xs font-bold w-4 text-center"
                style={{ color: i === 0 ? '#F59E0B' : '#9CA3AF' }}
              >
                {i + 1}
              </span>
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                style={{ background: isUser ? '#4F46E5' : '#6B7280' }}
              >
                {entry.avatarInitial}
              </div>
              <span
                className="flex-1 text-xs font-semibold truncate"
                style={{ color: isUser ? '#4F46E5' : '#374151' }}
              >
                {isUser ? 'You' : entry.name}
              </span>
              <span className="text-xs font-bold text-gray-500">{entry.weeklyXp} XP</span>
            </div>
          );
        })}

        {/* Show user's position if not in top 5 */}
        {!userInTop5 && (
          <>
            <div className="flex items-center gap-2 px-2 py-0.5">
              <span className="text-gray-300 text-xs">···</span>
            </div>
            <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl bg-indigo-50">
              <span className="text-xs font-bold w-4 text-center text-gray-400">{rank}</span>
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white bg-indigo-500 flex-shrink-0">
                Y
              </div>
              <span className="flex-1 text-xs font-semibold text-indigo-600">You</span>
              <span className="text-xs font-bold text-gray-500">{league.weeklyXp} XP</span>
            </div>
          </>
        )}
      </div>

      {/* Footer link */}
      <div className="px-4 pb-3">
        <Link
          href="/league"
          className="block text-center text-xs font-bold py-2 rounded-xl transition-colors"
          style={{ background: '#F3F4F6', color: '#6B7280' }}
        >
          View Leaderboard →
        </Link>
      </div>
    </div>
  );
}
