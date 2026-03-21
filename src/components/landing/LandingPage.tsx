'use client';

import Link from 'next/link';
import Footer from '@/components/layout/Footer';

/* ── SVG Illustrations ── */

function RadarChartIllustration() {
  // Spider/radar chart showing skill strengths — some high, some low
  const cx = 120, cy = 120, r = 85;
  const labels = ['Statics', 'Dynamics', 'Thermo', 'Fluids', 'Materials', 'GD&T'];
  const values = [0.92, 0.45, 0.78, 0.35, 0.88, 0.55]; // varying strengths
  const n = labels.length;

  const getPoint = (i: number, val: number) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    return { x: cx + r * val * Math.cos(angle), y: cy + r * val * Math.sin(angle) };
  };

  const gridLevels = [0.33, 0.66, 1];
  const dataPoints = values.map((v, i) => getPoint(i, v));
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + ' Z';

  return (
    <svg viewBox="0 0 240 240" className="w-full max-w-[240px]">
      {/* Grid */}
      {gridLevels.map((level) => {
        const pts = Array.from({ length: n }, (_, i) => getPoint(i, level));
        const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + ' Z';
        return <path key={level} d={path} fill="none" stroke="#E2E8F0" strokeWidth="1" />;
      })}
      {/* Spokes */}
      {Array.from({ length: n }, (_, i) => {
        const p = getPoint(i, 1);
        return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#E2E8F0" strokeWidth="1" />;
      })}
      {/* Data fill */}
      <path d={dataPath} fill="rgba(99,102,241,0.15)" stroke="#6366F1" strokeWidth="2.5" />
      {/* Data dots */}
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4" fill="#6366F1" />
      ))}
      {/* Labels */}
      {labels.map((label, i) => {
        const p = getPoint(i, 1.22);
        return (
          <text
            key={label}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="9"
            fontWeight="700"
            fill="#64748B"
            fontFamily="Nunito, sans-serif"
          >
            {label}
          </text>
        );
      })}
    </svg>
  );
}

function StreakIllustration() {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const active = [true, true, true, true, true, false, false];
  return (
    <svg viewBox="0 0 240 140" className="w-full max-w-[240px]">
      {days.map((d, i) => {
        const x = 17 + i * 30;
        return (
          <g key={i}>
            {/* Circle */}
            <circle
              cx={x}
              cy={55}
              r="13"
              fill={active[i] ? '#58CC02' : '#E2E8F0'}
            />
            {/* Checkmark or empty */}
            {active[i] && (
              <path
                d={`M${x - 4},${55} l3,4 l6,-8`}
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
            {/* Day label */}
            <text
              x={x}
              y={82}
              textAnchor="middle"
              fontSize="10"
              fontWeight="700"
              fill={active[i] ? '#0F172A' : '#94A3B8'}
              fontFamily="Nunito, sans-serif"
            >
              {d}
            </text>
          </g>
        );
      })}
      {/* Streak badge */}
      <rect x="65" y="100" width="110" height="30" rx="15" fill="#FFF7ED" stroke="#FB923C" strokeWidth="1.5" />
      {/* Fire icon */}
      <path d="M105,108 c0,-3 3,-5 3,-8 c3,3 5,6 4,10 c2,-1 3,-3 3,-5 c3,4 2,9 -2,12 c-3,2 -7,2 -10,0 c-3,-2 -4,-6 -2,-9 z" fill="#FB923C" />
      <text x="122" y="120" fontSize="11" fontWeight="800" fill="#C2410C" fontFamily="Nunito, sans-serif">5 day streak!</text>
    </svg>
  );
}

function ProgressBarsIllustration() {
  const skills = [
    { name: 'Statics', pct: 92, color: '#6366F1' },
    { name: 'Fluids', pct: 35, color: '#3B82F6' },
    { name: 'Thermo', pct: 78, color: '#F59E0B' },
    { name: 'GD&T', pct: 15, color: '#D946EF' },
  ];
  return (
    <svg viewBox="0 0 220 160" className="w-full max-w-[220px]">
      {skills.map((s, i) => {
        const y = 10 + i * 38;
        return (
          <g key={s.name}>
            <text x="0" y={y + 4} fontSize="11" fontWeight="700" fill="#0F172A" fontFamily="Nunito, sans-serif">{s.name}</text>
            <text x="220" y={y + 4} fontSize="11" fontWeight="800" fill={s.color} textAnchor="end" fontFamily="Nunito, sans-serif">{s.pct}%</text>
            <rect x="0" y={y + 12} width="220" height="10" rx="5" fill="#E2E8F0" />
            <rect x="0" y={y + 12} width={220 * s.pct / 100} height="10" rx="5" fill={s.color} />
          </g>
        );
      })}
    </svg>
  );
}

function QuestionPreviewIllustration() {
  return (
    <svg viewBox="0 0 240 200" className="w-full max-w-[240px]">
      {/* Card background */}
      <rect x="8" y="8" width="224" height="184" rx="16" fill="white" stroke="#E2E8F0" strokeWidth="1.5" />
      {/* Topic badge */}
      <rect x="20" y="22" width="65" height="22" rx="11" fill="#EEF2FF" />
      <text x="52" y="37" textAnchor="middle" fontSize="9" fontWeight="800" fill="#6366F1" fontFamily="Nunito, sans-serif">Statics</text>
      {/* Question text */}
      <text x="20" y="64" fontSize="11" fontWeight="800" fill="#0F172A" fontFamily="Nunito, sans-serif">A beam is loaded with a uniform</text>
      <text x="20" y="78" fontSize="11" fontWeight="800" fill="#0F172A" fontFamily="Nunito, sans-serif">distributed load. Where is the max</text>
      <text x="20" y="92" fontSize="11" fontWeight="800" fill="#0F172A" fontFamily="Nunito, sans-serif">bending moment?</text>
      {/* Option A */}
      <rect x="20" y="104" width="200" height="28" rx="10" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />
      <text x="36" y="123" fontSize="10" fontWeight="700" fill="#64748B" fontFamily="Nunito, sans-serif">At the free end</text>
      {/* Option B - selected/correct */}
      <rect x="20" y="138" width="200" height="28" rx="10" fill="#DCFCE7" stroke="#58CC02" strokeWidth="2" />
      <circle cx="206" cy="152" r="8" fill="#58CC02" />
      <path d="M202,152 l3,3 l5,-6" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <text x="36" y="157" fontSize="10" fontWeight="700" fill="#166534" fontFamily="Nunito, sans-serif">At the fixed support</text>
      {/* Option C */}
      <rect x="20" y="172" width="200" height="14" rx="7" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

function XpLevelIllustration() {
  return (
    <svg viewBox="0 0 200 200" className="w-full max-w-[180px]">
      {/* Outer ring background */}
      <circle cx="100" cy="100" r="80" fill="none" stroke="#E2E8F0" strokeWidth="12" />
      {/* Progress ring */}
      <circle
        cx="100" cy="100" r="80"
        fill="none"
        stroke="#6366F1"
        strokeWidth="12"
        strokeLinecap="round"
        strokeDasharray={`${2 * Math.PI * 80 * 0.68} ${2 * Math.PI * 80}`}
        transform="rotate(-90 100 100)"
      />
      {/* Level number */}
      <text x="100" y="90" textAnchor="middle" fontSize="36" fontWeight="900" fill="#0F172A" fontFamily="Nunito, sans-serif">7</text>
      <text x="100" y="112" textAnchor="middle" fontSize="11" fontWeight="700" fill="#64748B" fontFamily="Nunito, sans-serif">LEVEL</text>
      {/* XP label */}
      <rect x="60" y="145" width="80" height="26" rx="13" fill="#EEF2FF" />
      <text x="100" y="163" textAnchor="middle" fontSize="11" fontWeight="800" fill="#6366F1" fontFamily="Nunito, sans-serif">1,340 XP</text>
    </svg>
  );
}

/* ── Feature Section Component ── */
function FeatureSection({
  headline,
  headlineColor,
  body,
  illustration,
  reverse = false,
}: {
  headline: string;
  headlineColor: string;
  body: string;
  illustration: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <section className="w-full max-w-3xl mx-auto px-6 py-12 sm:py-20">
      <div className={`flex flex-col ${reverse ? 'sm:flex-row-reverse' : 'sm:flex-row'} items-center gap-8 sm:gap-16`}>
        {/* Illustration */}
        <div className="flex-shrink-0 flex justify-center">
          {illustration}
        </div>
        {/* Text */}
        <div className={reverse ? 'sm:text-right' : ''}>
          <h2
            className="text-2xl sm:text-[1.75rem] font-black leading-tight mb-3"
            style={{ color: headlineColor }}
          >
            {headline}
          </h2>
          <p className="text-surface-500 text-[15px] sm:text-base leading-relaxed max-w-sm">
            {body}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── Main Landing Page ── */
export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">

      {/* ── Nav ── */}
      <nav className="w-full px-6 py-5 flex items-center justify-between max-w-3xl mx-auto">
        <span className="text-lg font-black text-surface-800 tracking-tight">MechReady</span>
        <Link href="/login" className="text-sm font-bold text-[#1CB0F6] tracking-wide">
          LOG IN
        </Link>
      </nav>

      {/* ── Hero ── */}
      <section className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 max-w-3xl mx-auto px-6 pt-8 sm:pt-16 pb-12 sm:pb-20">
        {/* Illustration cluster */}
        <div className="flex-shrink-0 flex items-center gap-3">
          <QuestionPreviewIllustration />
        </div>
        {/* Text + CTA */}
        <div className="text-center sm:text-left">
          <h1 className="text-[1.75rem] sm:text-[2.25rem] leading-[1.15] font-black text-surface-900 mb-4">
            The free, fun, and effective way to prep for ME interviews.
          </h1>
          <p className="text-surface-400 text-[15px] sm:text-base leading-relaxed mb-8 max-w-md">
            Bite-sized lessons and real questions that adapt to you. Know exactly where you&apos;re strong — and where you need work.
          </p>
          <Link
            href="/register"
            className="inline-block w-full sm:w-auto sm:px-16 py-4 text-white font-extrabold rounded-2xl text-center text-[17px] tracking-wide transition-transform active:translate-y-[2px] hover:brightness-105"
            style={{ background: '#58CC02', boxShadow: '0 5px 0 #46A302' }}
          >
            GET STARTED
          </Link>
          <div className="mt-4">
            <Link href="/login" className="text-[15px] font-bold text-[#1CB0F6] tracking-wide">
              I ALREADY HAVE AN ACCOUNT
            </Link>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full border-t border-surface-200" />

      {/* ── Section 1: Know your strengths ── */}
      <FeatureSection
        headline="know exactly where you stand."
        headlineColor="#6366F1"
        body="MechReady maps your strengths and weaknesses across every topic. See at a glance what you've mastered and what needs more practice — so you never waste time studying what you already know."
        illustration={<RadarChartIllustration />}
      />

      {/* Divider */}
      <div className="w-full border-t border-surface-200" />

      {/* ── Section 2: Track your progress ── */}
      <FeatureSection
        headline="watch yourself improve."
        headlineColor="#58CC02"
        body="Track your accuracy in every area. As you practice, your weak spots fill in and your confidence grows — backed by real numbers, not guesswork."
        illustration={<ProgressBarsIllustration />}
        reverse
      />

      {/* Divider */}
      <div className="w-full border-t border-surface-200" />

      {/* ── Section 3: Streaks & habit ── */}
      <FeatureSection
        headline="build a study habit that sticks."
        headlineColor="#FB923C"
        body="Daily streaks and XP rewards keep you coming back. Five minutes a day is all it takes — and it feels more like a game than studying."
        illustration={
          <div className="flex flex-col items-center gap-4">
            <StreakIllustration />
          </div>
        }
      />

      {/* Divider */}
      <div className="w-full border-t border-surface-200" />

      {/* ── Section 4: Level up ── */}
      <FeatureSection
        headline="earn XP. level up. prove it."
        headlineColor="#6366F1"
        body="Every correct answer earns XP. Level up as you go and unlock achievements. By interview day, you'll have the score — and the confidence — to back it up."
        illustration={<XpLevelIllustration />}
        reverse
      />

      {/* ── Bottom CTA ── */}
      <section className="w-full border-t border-surface-200 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-14 sm:py-20 flex flex-col items-center text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-surface-900 mb-3">
            Ready to find out where you stand?
          </h2>
          <p className="text-surface-400 text-[15px] mb-8 max-w-sm">
            Free forever. No credit card. Start practicing in 30 seconds.
          </p>
          <Link
            href="/register"
            className="w-full max-w-xs block py-4 text-white font-extrabold rounded-2xl text-center text-[17px] tracking-wide transition-transform active:translate-y-[2px] hover:brightness-105"
            style={{ background: '#58CC02', boxShadow: '0 5px 0 #46A302' }}
          >
            GET STARTED
          </Link>
          <Link href="/login" className="mt-4 text-[15px] font-bold text-[#1CB0F6] tracking-wide">
            I ALREADY HAVE AN ACCOUNT
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
