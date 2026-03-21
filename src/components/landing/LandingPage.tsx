'use client';

import Link from 'next/link';

const TOPICS = [
  { name: 'Statics', color: '#6366F1' },
  { name: 'Dynamics', color: '#8B5CF6' },
  { name: 'Strength of Materials', color: '#EC4899' },
  { name: 'Thermo', color: '#F59E0B' },
  { name: 'Heat Transfer', color: '#EF4444' },
  { name: 'Fluids', color: '#3B82F6' },
  { name: 'Materials', color: '#10B981' },
  { name: 'Machine Elements', color: '#64748B' },
  { name: 'GD&T', color: '#D946EF' },
  { name: 'Interview Prep', color: '#0EA5E9' },
];

export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">

      {/* Nav */}
      <nav className="w-full px-6 py-5 flex items-center justify-between max-w-3xl mx-auto">
        <span className="text-lg font-black text-surface-800 tracking-tight">MechReady</span>
        <Link
          href="/login"
          className="text-sm font-bold text-[#1CB0F6]"
        >
          LOG IN
        </Link>
      </nav>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
        <h1 className="text-3xl sm:text-[2.5rem] sm:leading-[1.15] leading-[1.2] font-black text-center text-surface-900 mb-4 max-w-lg">
          The free, fun way to get interview&#8209;ready in mechanical engineering.
        </h1>

        <p className="text-surface-400 text-[15px] sm:text-base text-center leading-relaxed mb-10 max-w-sm">
          Bite-sized lessons. Real interview questions. A course that actually sticks.
        </p>

        {/* CTA */}
        <Link
          href="/register"
          className="w-full max-w-xs block py-4 text-white font-extrabold rounded-2xl text-center text-[17px] tracking-wide transition-transform active:translate-y-[2px] hover:brightness-105"
          style={{
            background: '#58CC02',
            boxShadow: '0 5px 0 #46A302',
          }}
        >
          GET STARTED
        </Link>
      </div>

      {/* Topics */}
      <div className="px-6 pb-14 max-w-lg mx-auto">
        <p className="text-xs font-bold text-surface-300 uppercase tracking-widest text-center mb-4">
          10 units &middot; 200+ questions
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {TOPICS.map((t) => (
            <span
              key={t.name}
              className="px-3 py-1.5 rounded-full text-[13px] font-bold text-white"
              style={{ background: t.color }}
            >
              {t.name}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}
