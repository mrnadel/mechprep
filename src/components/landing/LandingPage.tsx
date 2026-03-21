'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const UNITS = [
  { icon: '🏗️', name: 'Statics', color: '#6366F1' },
  { icon: '🎯', name: 'Dynamics', color: '#8B5CF6' },
  { icon: '💪', name: 'Strength of Materials', color: '#EC4899' },
  { icon: '🔥', name: 'Thermodynamics', color: '#F59E0B' },
  { icon: '🌡️', name: 'Heat Transfer', color: '#EF4444' },
  { icon: '💧', name: 'Fluid Mechanics', color: '#3B82F6' },
  { icon: '🧱', name: 'Materials Science', color: '#10B981' },
  { icon: '⚙️', name: 'Machine Elements', color: '#64748B' },
  { icon: '📐', name: 'GD&T', color: '#D946EF' },
  { icon: '🎤', name: 'Interview Prep', color: '#0EA5E9' },
];

const FEATURES = [
  {
    icon: '🧠',
    title: 'Adaptive Practice',
    desc: 'Questions that match your level and target your weak spots',
  },
  {
    icon: '🎮',
    title: 'Gamified Learning',
    desc: 'Earn XP, maintain streaks, and unlock achievements',
  },
  {
    icon: '🏭',
    title: 'Real-World Scenarios',
    desc: 'Industry problems from actual engineering interviews',
  },
  {
    icon: '📊',
    title: 'Track Progress',
    desc: 'Detailed analytics on every topic and skill area',
  },
];

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.5 }
    );
    const el = document.getElementById(`counter-${target}`);
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [target, started]);

  useEffect(() => {
    if (!started) return;
    const duration = 1200;
    const steps = 30;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <span id={`counter-${target}`}>
      {count}
      {suffix}
    </span>
  );
}

function FloatingGear({ size, top, left, delay, duration }: { size: number; top: string; left: string; delay: string; duration: string }) {
  return (
    <div
      className="absolute pointer-events-none select-none"
      style={{
        top,
        left,
        fontSize: `${size}px`,
        opacity: 0.07,
        animation: `landingSpin ${duration} linear infinite`,
        animationDelay: delay,
      }}
    >
      &#x2699;
    </div>
  );
}

export function LandingPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #F0EDFF 0%, #FAFAFA 40%)' }}>
      {/* Floating background gears */}
      <FloatingGear size={80} top="5%" left="85%" delay="0s" duration="20s" />
      <FloatingGear size={50} top="15%" left="5%" delay="2s" duration="15s" />
      <FloatingGear size={35} top="45%" left="90%" delay="1s" duration="18s" />
      <FloatingGear size={60} top="70%" left="3%" delay="3s" duration="22s" />

      {/* ── Hero ── */}
      <section className="relative pt-12 pb-6 px-6 text-center">
        {/* Logo */}
        <div
          className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-3xl mb-5"
          style={{
            boxShadow: '0 8px 32px rgba(99,102,241,0.18), 0 2px 8px rgba(0,0,0,0.06)',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'scale(1)' : 'scale(0.8)',
            transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          <span className="text-5xl">&#x2699;&#xFE0F;</span>
        </div>

        <h1
          className="text-[2rem] leading-tight font-black text-surface-900 mb-3"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 0.5s ease-out 0.15s',
          }}
        >
          Ace Your
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #6366F1, #8B5CF6, #A855F7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Mech&nbsp;Interview
          </span>
        </h1>

        <p
          className="text-surface-500 text-base leading-relaxed max-w-[320px] mx-auto mb-8"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 0.5s ease-out 0.3s',
          }}
        >
          The Duolingo-style course for mechanical engineers preparing for technical interviews
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col gap-3 max-w-[280px] mx-auto"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 0.5s ease-out 0.45s',
          }}
        >
          <Link
            href="/register"
            className="block w-full py-3.5 text-white font-extrabold rounded-2xl text-lg text-center transition-all"
            style={{
              background: '#58CC02',
              boxShadow: '0 4px 0 #46A302',
            }}
          >
            GET STARTED — FREE
          </Link>
          <Link
            href="/login"
            className="block w-full py-3.5 font-bold rounded-2xl text-lg text-center border-2 border-surface-200 text-surface-600 bg-white transition-all hover:border-surface-300"
          >
            I ALREADY HAVE AN ACCOUNT
          </Link>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section
        className="mx-6 my-8 rounded-2xl p-5 grid grid-cols-3 gap-4 text-center"
        style={{
          background: 'white',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        }}
      >
        <div>
          <div className="text-2xl font-black text-primary-600">
            <AnimatedCounter target={10} />
          </div>
          <div className="text-xs font-semibold text-surface-400 mt-0.5">Units</div>
        </div>
        <div>
          <div className="text-2xl font-black text-primary-600">
            <AnimatedCounter target={200} suffix="+" />
          </div>
          <div className="text-xs font-semibold text-surface-400 mt-0.5">Questions</div>
        </div>
        <div>
          <div className="text-2xl font-black text-primary-600">
            <AnimatedCounter target={12} />
          </div>
          <div className="text-xs font-semibold text-surface-400 mt-0.5">Question Types</div>
        </div>
      </section>

      {/* ── Course Preview ── */}
      <section className="px-6 mb-8">
        <h2 className="text-lg font-extrabold text-surface-800 mb-1">The Full Course</h2>
        <p className="text-sm text-surface-400 mb-4">10 units covering every core ME topic</p>

        <div className="space-y-2.5">
          {UNITS.map((unit, i) => (
            <div
              key={unit.name}
              className="flex items-center gap-3.5 bg-white rounded-xl px-4 py-3 border border-surface-100"
              style={{
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              <div
                className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ background: `${unit.color}15` }}
              >
                {unit.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-surface-800">
                  Unit {i + 1}
                </div>
                <div className="text-xs text-surface-400 font-semibold">{unit.name}</div>
              </div>
              <div className="flex-shrink-0">
                {i === 0 ? (
                  <span className="text-xs font-bold text-white px-2.5 py-1 rounded-full" style={{ background: '#58CC02' }}>
                    FREE
                  </span>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-surface-300">
                    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="px-6 mb-8">
        <h2 className="text-lg font-extrabold text-surface-800 mb-4">How It Works</h2>

        <div className="relative pl-8">
          {/* Vertical connector line */}
          <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-primary-100 rounded-full" />

          {[
            { step: '1', title: 'Pick a lesson', desc: 'Start from Unit 1 or jump to any topic' },
            { step: '2', title: 'Answer questions', desc: 'Multiple formats: MCQ, estimation, design decisions & more' },
            { step: '3', title: 'Learn from feedback', desc: 'Detailed explanations for every answer' },
            { step: '4', title: 'Level up', desc: 'Earn XP, build streaks, unlock achievements' },
          ].map((item, i) => (
            <div key={i} className="relative flex gap-4 mb-5 last:mb-0">
              <div
                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white -ml-3"
                style={{ background: '#6366F1' }}
              >
                {item.step}
              </div>
              <div className="-mt-0.5">
                <div className="text-sm font-bold text-surface-800">{item.title}</div>
                <div className="text-xs text-surface-400 mt-0.5">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features grid ── */}
      <section className="px-6 mb-8">
        <h2 className="text-lg font-extrabold text-surface-800 mb-4">Built for Interview Success</h2>

        <div className="grid grid-cols-2 gap-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-xl p-4 border border-surface-100"
              style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
            >
              <div className="text-2xl mb-2">{f.icon}</div>
              <div className="text-sm font-bold text-surface-800 mb-1">{f.title}</div>
              <div className="text-xs text-surface-400 leading-relaxed">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Question types preview ── */}
      <section className="px-6 mb-8">
        <h2 className="text-lg font-extrabold text-surface-800 mb-1">Not Just Multiple Choice</h2>
        <p className="text-sm text-surface-400 mb-4">12 question formats to truly test your knowledge</p>

        <div className="flex flex-wrap gap-2">
          {[
            'Multiple Choice',
            'True / False',
            'Multi-Select',
            'Free Text',
            'Estimation',
            'Material Selection',
            'Design Decision',
            'Ranking',
            'Scenario Analysis',
            'Spot the Flaw',
            'What Fails First',
            'Confidence Rating',
          ].map((type) => (
            <span
              key={type}
              className="px-3 py-1.5 rounded-full text-xs font-bold border"
              style={{
                background: '#F5F3FF',
                borderColor: '#DDD6FE',
                color: '#6D28D9',
              }}
            >
              {type}
            </span>
          ))}
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section
        className="mx-6 mb-10 rounded-2xl p-6 text-center"
        style={{
          background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
          boxShadow: '0 8px 32px rgba(99,102,241,0.25)',
        }}
      >
        <h2 className="text-xl font-black text-white mb-2">Ready to Get Interview-Ready?</h2>
        <p className="text-sm text-indigo-200 mb-5">
          Join engineers sharpening their skills with MechReady
        </p>
        <Link
          href="/register"
          className="inline-block w-full py-3.5 text-primary-700 font-extrabold rounded-2xl text-lg text-center transition-all"
          style={{
            background: 'white',
            boxShadow: '0 4px 0 rgba(0,0,0,0.1)',
          }}
        >
          START LEARNING NOW
        </Link>
      </section>

      {/* ── Footer ── */}
      <footer className="text-center pb-8 px-6">
        <div className="text-xs text-surface-400">
          <span className="font-bold text-surface-500">MechReady</span> &middot; Mechanical Engineering Interview Prep
        </div>
      </footer>

    </div>
  );
}
