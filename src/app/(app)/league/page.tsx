'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { LeagueBoard } from '@/components/engagement/LeagueBoard';
import { LeaguePromotion } from '@/components/engagement/LeaguePromotion';

function getWeekDateRange(): string {
  const now = new Date();
  const day = now.getUTCDay(); // 0=Sun..6=Sat
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const monday = new Date(now);
  monday.setUTCDate(now.getUTCDate() + diffToMonday);
  const sunday = new Date(monday);
  sunday.setUTCDate(monday.getUTCDate() + 6);

  const fmt = (d: Date) =>
    d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return `${fmt(monday)} – ${fmt(sunday)}`;
}

export default function LeaguePage() {
  const weekRange = useMemo(() => getWeekDateRange(), []);

  return (
    <div className="min-h-screen" style={{ background: '#FAFAFA' }}>
      {/* Header */}
      <header
        className="sticky top-0 z-30 bg-white px-4 sm:px-5 py-3"
        style={{ borderBottom: '2px solid #E5E5E5' }}
      >
        <div className="flex items-center gap-3 max-w-2xl mx-auto">
          <Link
            href="/"
            className="flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-[10px] transition-transform active:scale-90 lg:hidden"
            style={{ background: '#F0F0F0' }}
          >
            <ChevronLeft style={{ width: 20, height: 20, color: '#777' }} />
          </Link>
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold" style={{ color: '#3C3C3C', lineHeight: 1.2 }}>
              League
            </h1>
            <p className="text-xs font-semibold mt-px" style={{ color: '#AFAFAF' }}>
              {weekRange}
            </p>
          </div>
        </div>
      </header>

      {/* League content */}
      <div className="px-4 sm:px-5 pt-4 pb-8 max-w-2xl mx-auto">
        <LeagueBoard />
        <LeaguePromotion />
      </div>
    </div>
  );
}
