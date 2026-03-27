'use client';

import { useState, useMemo } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { TabToggle } from '@/components/ui/TabToggle';
import { LeagueBoard } from '@/components/engagement/LeagueBoard';
import { LeaguePromotion } from '@/components/engagement/LeaguePromotion';
import { FriendLeaderboard } from '@/components/engagement/FriendLeaderboard';

function getWeekDateRange(): string {
  const now = new Date();
  const day = now.getUTCDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const monday = new Date(now);
  monday.setUTCDate(now.getUTCDate() + diffToMonday);
  const sunday = new Date(monday);
  sunday.setUTCDate(monday.getUTCDate() + 6);

  const fmt = (d: Date) =>
    d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return `${fmt(monday)} – ${fmt(sunday)}`;
}

const TABS = [
  { id: 'league' as const, label: 'League' },
  { id: 'friends' as const, label: 'Friends' },
];

export default function LeaguePage() {
  const weekRange = useMemo(() => getWeekDateRange(), []);
  const [tab, setTab] = useState<'league' | 'friends'>('league');

  return (
    <div className="min-h-screen" style={{ background: '#FAFAFA' }}>
      <PageHeader title="Leaderboard" subtitle={weekRange} maxWidth />

      {/* Tabs */}
      <div className="px-4 sm:px-5 pt-4 max-w-2xl mx-auto">
        <div className="mb-4">
          <TabToggle tabs={TABS} activeTab={tab} onChange={setTab} />
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-5 pb-8 max-w-2xl mx-auto">
        {tab === 'league' ? (
          <>
            <LeagueBoard />
            <LeaguePromotion />
          </>
        ) : (
          <FriendLeaderboard />
        )}
      </div>
    </div>
  );
}
