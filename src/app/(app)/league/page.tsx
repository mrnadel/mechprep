'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { LeagueBoard } from '@/components/engagement/LeagueBoard';
import { LeaguePromotion } from '@/components/engagement/LeaguePromotion';

export default function LeaguePage() {
  return (
    <div className="min-h-screen" style={{ background: '#FAFAFA' }}>
      {/* Header */}
      <header
        className="sticky top-0 z-30 bg-white px-4 sm:px-5 py-3"
        style={{ borderBottom: '2px solid #E5E5E5' }}
      >
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-[10px] transition-transform active:scale-90"
            style={{ background: '#F0F0F0' }}
          >
            <ChevronLeft style={{ width: 20, height: 20, color: '#777' }} />
          </Link>
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold" style={{ color: '#3C3C3C', lineHeight: 1.2 }}>
              League
            </h1>
            <p className="text-xs font-semibold mt-px" style={{ color: '#AFAFAF' }}>
              Compete with other engineers
            </p>
          </div>
        </div>
      </header>

      {/* League content */}
      <div className="px-4 sm:px-5 pt-4 pb-8">
        <LeagueBoard />
        <LeaguePromotion />
      </div>
    </div>
  );
}
