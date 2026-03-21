'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { QuestBoard } from '@/components/engagement/QuestBoard';

export default function QuestsPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFA' }}>
      {/* Header */}
      <header
        className="sticky top-0 z-30 bg-white"
        style={{ borderBottom: '2px solid #E5E5E5', padding: '12px 20px' }}
      >
        <div className="flex items-center" style={{ gap: 12 }}>
          <Link
            href="/"
            className="flex items-center justify-center transition-transform active:scale-90"
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: '#F0F0F0',
            }}
          >
            <ChevronLeft style={{ width: 20, height: 20, color: '#777' }} />
          </Link>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: '#3C3C3C', lineHeight: 1.2 }}>
              Quests
            </h1>
            <p style={{ fontSize: 12, fontWeight: 600, color: '#AFAFAF', marginTop: 1 }}>
              Complete quests for XP & gems
            </p>
          </div>
        </div>
      </header>

      {/* Quest Board */}
      <div style={{ padding: '16px 20px 32px' }}>
        <QuestBoard />
      </div>
    </div>
  );
}
