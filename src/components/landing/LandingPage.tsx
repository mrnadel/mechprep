'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

/* ── Animated XP bar fill ── */
function useAnimatedFill(target: number, delay: number) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(target), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, delay]);
  return { ref, width };
}

/* ── Scroll-triggered fade-in ── */
function AnimateIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ── SVG Icons ── */
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="18" height="18" style={{ flexShrink: 0, marginTop: 1 }} aria-hidden="true">
    <path d="M20 6L9 17l-5-5" stroke="#58CC02" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CrossIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="18" height="18" style={{ flexShrink: 0, marginTop: 1 }} aria-hidden="true">
    <path d="M18 6L6 18M6 6l12 12" stroke="#E2E8F0" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const PartialIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="18" height="18" style={{ flexShrink: 0, marginTop: 1 }} aria-hidden="true">
    <path d="M20 6L9 17l-5-5" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ── Main Landing Page ── */
export function LandingPage() {
  const xpBar = useAnimatedFill(68, 400);

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", background: '#FAFAFA', color: '#0F172A', minHeight: '100vh' }}>

      {/* ── NAV ── */}
      <nav aria-label="Main navigation" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: '#FAFAFA', borderBottom: '1px solid #E2E8F0',
      }}>
        <div style={{
          maxWidth: 960, margin: '0 auto', padding: '0 24px',
          height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <Link href="/" style={{
            fontSize: 24, fontWeight: 900, color: '#6366F1',
            letterSpacing: -0.5, textDecoration: 'none',
          }}>
            MechReady
          </Link>
          <Link href="/login" style={{
            fontSize: 14, fontWeight: 800, color: '#1CB0F6',
            textDecoration: 'none', textTransform: 'uppercase', letterSpacing: 0.8,
            padding: '10px 20px', border: '2px solid #E2E8F0', borderRadius: 12,
            minHeight: 44, display: 'inline-flex', alignItems: 'center',
          }}>
            Log in
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="landing-hero-section" style={{ paddingTop: 120, paddingBottom: 80, textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 24px' }}>
          <AnimateIn>
            <div style={{
              display: 'inline-block', background: '#EEF2FF', color: '#6366F1',
              fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1,
              padding: '6px 16px', borderRadius: 100, marginBottom: 24,
            }}>
              Free to start
            </div>
          </AnimateIn>

          <AnimateIn delay={0.1}>
            <h1 className="landing-hero-h1" style={{
              fontWeight: 900, lineHeight: 1.1, color: '#0F172A',
              marginBottom: 20, letterSpacing: -1,
            }}>
              Study for interviews<br />without it <span style={{ color: '#58CC02' }}>feeling like studying</span>
            </h1>
          </AnimateIn>

          <AnimateIn delay={0.2}>
            <p className="landing-hero-p" style={{
              fontWeight: 600, color: '#64748B', lineHeight: 1.6,
              maxWidth: 540, margin: '0 auto 36px',
            }}>
              MechReady turns mechanical engineering interview prep into a game. Earn XP, keep your streak, unlock achievements &mdash; and actually remember what you learn.
            </p>
          </AnimateIn>

          <AnimateIn delay={0.3}>
            <div className="landing-hero-actions" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
              <Link
                href="/get-started"
                className="landing-btn-primary"
                style={{
                  display: 'inline-block', background: '#58CC02', color: '#fff',
                  fontSize: 16, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.8,
                  padding: '14px 36px', border: 'none', borderRadius: 16,
                  boxShadow: '0 5px 0 #46A302', textDecoration: 'none',
                  transition: 'transform 0.1s, box-shadow 0.1s, filter 0.1s',
                }}
              >
                Start playing free
              </Link>
              <Link
                href="/login"
                className="landing-btn-secondary"
                style={{
                  display: 'inline-block', color: '#1CB0F6', fontSize: 15, fontWeight: 700,
                  textDecoration: 'none', padding: '12px 28px',
                  border: '2px solid #E2E8F0', borderRadius: 16,
                  transition: 'background 0.15s',
                }}
              >
                I already have an account
              </Link>
            </div>
          </AnimateIn>

          <AnimateIn delay={0.4}>
            <div className="landing-hero-stats" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 32, marginTop: 40, flexWrap: 'wrap',
            }}>
              {[
                { num: '10', label: 'Units' },
                { num: '94', label: 'Questions' },
                { num: '12', label: 'Question Types' },
              ].map((s) => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <div className="landing-stat-num" style={{ fontWeight: 900, color: '#0F172A' }}>{s.num}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── PLAYER STATS SECTION ── */}
      <section style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <AnimateIn>
            <div style={{
              textAlign: 'center', fontSize: 13, fontWeight: 800,
              textTransform: 'uppercase', letterSpacing: 1.5, color: '#94A3B8', marginBottom: 16,
            }}>
              Your progress, visualized
            </div>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h2 style={{
              textAlign: 'center', fontSize: 32, fontWeight: 900,
              color: '#0F172A', marginBottom: 40, letterSpacing: -0.5,
            }}>
              Level up as you learn
            </h2>
          </AnimateIn>

          <AnimateIn delay={0.2}>
            <div className="landing-player-card" style={{
              background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12,
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            }}>
              {/* Player Header */}
              <div className="landing-player-header" style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #6366F1, #818CF8)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#0F172A' }}>Engineering_Pro</div>
                  <div className="landing-level-row" style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 4,
                      background: '#FEF3C7', color: '#D97706',
                      fontSize: 12, fontWeight: 800, padding: '3px 10px',
                      borderRadius: 100, textTransform: 'uppercase', letterSpacing: 0.5,
                    }}>
                      <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
                      </svg>
                      Level 7
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#94A3B8' }}>Thermo Specialist</span>
                  </div>
                </div>
              </div>

              {/* XP Bar */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 800, color: '#0F172A' }}>Experience Points</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#64748B' }}>1,340 / 2,000 XP</span>
                </div>
                <div
                  ref={xpBar.ref}
                  style={{ height: 14, background: '#E2E8F0', borderRadius: 100, overflow: 'hidden' }}
                >
                  <div style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #58CC02, #6EE715)',
                    borderRadius: 100,
                    width: `${xpBar.width}%`,
                    transition: 'width 1.5s ease',
                  }} />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="landing-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
                {/* Streak */}
                <div className="landing-stat-box" style={{ textAlign: 'center', background: '#FAFAFA', borderRadius: 12, border: '1px solid #F1F5F9' }}>
                  <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'center' }}>
                    <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
                      <path d="M12 23C7.029 23 3 18.971 3 14c0-3.275 2.07-6.239 4.2-8.4C9.033 3.767 10.88 2.43 12 1c1.12 1.43 2.967 2.767 4.8 4.6C18.93 7.761 21 10.725 21 14c0 4.971-4.029 9-9 9z" fill="#FF9600" />
                      <path d="M12 23c-2.485 0-4.5-2.686-4.5-6 0-1.638 1.035-3.12 2.1-4.2C10.517 11.883 11.44 11.215 12 10.5c.56.715 1.483 1.383 2.4 2.3 1.065 1.08 2.1 2.562 2.1 4.2 0 3.314-2.015 6-4.5 6z" fill="#FFCC00" />
                    </svg>
                  </div>
                  <div className="landing-stat-number" style={{ fontWeight: 900, color: '#0F172A', lineHeight: 1 }}>14</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 4 }}>Day Streak</div>
                </div>

                {/* Questions Answered */}
                <div className="landing-stat-box" style={{ textAlign: 'center', background: '#FAFAFA', borderRadius: 12, border: '1px solid #F1F5F9' }}>
                  <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'center' }}>
                    <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
                      <circle cx="12" cy="12" r="10" fill="#58CC02" />
                      <path d="M8 12.5l2.5 2.5 5.5-5.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="landing-stat-number" style={{ fontWeight: 900, color: '#0F172A', lineHeight: 1 }}>87</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 4 }}>Answered</div>
                </div>

                {/* Accuracy */}
                <div className="landing-stat-box" style={{ textAlign: 'center', background: '#FAFAFA', borderRadius: 12, border: '1px solid #F1F5F9' }}>
                  <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'center' }}>
                    <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
                      <circle cx="12" cy="12" r="10" stroke="#6366F1" strokeWidth="2" fill="none" />
                      <circle cx="12" cy="12" r="6" stroke="#6366F1" strokeWidth="2" fill="none" />
                      <circle cx="12" cy="12" r="2" fill="#6366F1" />
                    </svg>
                  </div>
                  <div className="landing-stat-number" style={{ fontWeight: 900, color: '#0F172A', lineHeight: 1 }}>91%</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 4 }}>Accuracy</div>
                </div>
              </div>

              {/* Achievements */}
              <div style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', marginBottom: 12 }}>Achievements</div>
              <div className="landing-achievements" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {/* Earned achievements */}
                {[
                  { title: 'First Lesson', icon: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></> },
                  { title: '7-Day Streak', icon: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" /> },
                  { title: 'Perfect Score', icon: <><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></> },
                  { title: 'Speed Demon', icon: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /> },
                ].map((a) => (
                  <div key={a.title} style={{
                    width: 48, height: 48, borderRadius: 12,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: '#ECFDF5', border: '2px solid #A7F3D0',
                  }} title={a.title}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
                      {a.icon}
                    </svg>
                  </div>
                ))}
                {/* Locked */}
                {[1, 2].map((i) => (
                  <div key={`locked-${i}`} style={{
                    width: 48, height: 48, borderRadius: 12,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: '#F1F5F9', border: '2px solid #E2E8F0', opacity: 0.5,
                  }} title="Locked">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── COMPARISON SECTION ── */}
      <section className="landing-compare-section" style={{
        padding: '80px 24px', background: '#fff',
        borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0',
      }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <AnimateIn>
            <div style={{
              textAlign: 'center', fontSize: 13, fontWeight: 800,
              textTransform: 'uppercase', letterSpacing: 1.5, color: '#94A3B8', marginBottom: 16,
            }}>
              Why MechReady?
            </div>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <div className="landing-section-heading" style={{
              textAlign: 'center', fontWeight: 900,
              color: '#0F172A', marginBottom: 40, letterSpacing: -0.5,
            }}>
              Not all prep methods are equal
            </div>
          </AnimateIn>

          <div className="landing-compare-grid" style={{ display: 'grid', gap: 24, marginBottom: 48 }}>
            {/* Textbook */}
            <AnimateIn delay={0}>
              <CompareCard
                iconBg="#FEE2E2"
                iconColor="#DC2626"
                icon={<><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></>}
                title="Textbooks"
                subtitle="Passive reading"
                items={[
                  { text: 'Dense walls of theory', type: 'cross' },
                  { text: 'No feedback on understanding', type: 'cross' },
                  { text: 'Easy to zone out', type: 'cross' },
                  { text: 'Not interview-focused', type: 'cross' },
                ]}
              />
            </AnimateIn>

            {/* Flashcards */}
            <AnimateIn delay={0.1}>
              <CompareCard
                iconBg="#FEF3C7"
                iconColor="#D97706"
                icon={<><rect x="2" y="4" width="16" height="14" rx="2" /><path d="M6 2h12a2 2 0 0 1 2 2v12" /></>}
                title="Flashcards"
                subtitle="Recall practice"
                items={[
                  { text: 'Tests memorization only', type: 'partial' },
                  { text: 'No problem-solving practice', type: 'cross' },
                  { text: 'Gets repetitive fast', type: 'cross' },
                  { text: 'No progress tracking', type: 'cross' },
                ]}
              />
            </AnimateIn>

            {/* MechReady (featured) */}
            <AnimateIn delay={0.2}>
              <CompareCard
                featured
                iconBg="#DCFCE7"
                iconColor="#16A34A"
                icon={<><line x1="6" y1="12" x2="18" y2="12" /><line x1="12" y1="6" x2="12" y2="18" /><rect x="2" y="6" width="20" height="12" rx="3" /></>}
                title="MechReady"
                subtitle="Active + fun"
                items={[
                  { text: '12 interactive question types', type: 'check' },
                  { text: 'Instant feedback & explanations', type: 'check' },
                  { text: 'XP, streaks & achievements', type: 'check' },
                  { text: 'Built for real interview questions', type: 'check' },
                ]}
              />
            </AnimateIn>
          </div>

          <AnimateIn delay={0.3}>
            <div style={{ textAlign: 'center' }}>
              <Link
                href="/get-started"
                className="landing-btn-primary"
                style={{
                  display: 'inline-block', background: '#58CC02', color: '#fff',
                  fontSize: 16, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.8,
                  padding: '14px 36px', border: 'none', borderRadius: 16,
                  boxShadow: '0 5px 0 #46A302', textDecoration: 'none',
                  transition: 'transform 0.1s, box-shadow 0.1s, filter 0.1s',
                }}
              >
                Start learning for free
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── TOPICS SECTION ── */}
      <section className="landing-topics-section" style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <AnimateIn>
            <div style={{
              textAlign: 'center', fontSize: 13, fontWeight: 800,
              textTransform: 'uppercase', letterSpacing: 1.5, color: '#94A3B8', marginBottom: 16,
            }}>
              10 units covering everything
            </div>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <div className="landing-section-heading" style={{
              textAlign: 'center', fontWeight: 900,
              color: '#0F172A', marginBottom: 40, letterSpacing: -0.5,
            }}>
              What you&apos;ll master
            </div>
          </AnimateIn>

          <AnimateIn delay={0.2}>
            <div style={{
              display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
              gap: 12, marginBottom: 40,
            }}>
              {[
                { name: 'Statics', color: '#EF4444', count: '20+' },
                { name: 'Dynamics', color: '#F97316', count: '20+' },
                { name: 'Strength of Materials', color: '#EAB308', count: '25+' },
                { name: 'Thermodynamics', color: '#22C55E', count: '25+' },
                { name: 'Heat Transfer', color: '#14B8A6', count: '20+' },
                { name: 'Fluid Mechanics', color: '#3B82F6', count: '20+' },
                { name: 'Materials Science', color: '#6366F1', count: '20+' },
                { name: 'Machine Elements', color: '#8B5CF6', count: '20+' },
                { name: 'GD&T', color: '#EC4899', count: '15+' },
                { name: 'Interview Prep', color: '#0F172A', count: '20+' },
              ].map((topic) => (
                <div
                  key={topic.name}
                  className="landing-topic-pill"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    background: '#fff', border: '1px solid #E2E8F0', borderRadius: 100,
                    padding: '10px 20px', fontSize: 14, fontWeight: 700, color: '#0F172A',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                  }}
                >
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: topic.color, flexShrink: 0 }} />
                  {topic.name}
                  <span style={{ fontSize: 12, fontWeight: 800, color: '#94A3B8' }}>{topic.count}</span>
                </div>
              ))}
            </div>
          </AnimateIn>

          <AnimateIn delay={0.3}>
            <div style={{ textAlign: 'center' }}>
              <Link
                href="/get-started"
                className="landing-btn-primary"
                style={{
                  display: 'inline-block', background: '#58CC02', color: '#fff',
                  fontSize: 16, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.8,
                  padding: '14px 36px', border: 'none', borderRadius: 16,
                  boxShadow: '0 5px 0 #46A302', textDecoration: 'none',
                  transition: 'transform 0.1s, box-shadow 0.1s, filter 0.1s',
                }}
              >
                Start playing free
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding: '40px 24px', borderTop: '1px solid #E2E8F0', textAlign: 'center' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <p>
            <Link href="/" style={{ fontSize: 20, fontWeight: 900, color: '#6366F1', letterSpacing: -0.5, textDecoration: 'none' }}>
              MechReady
            </Link>
          </p>
          <p style={{ marginTop: 12, fontSize: 14, fontWeight: 600, color: '#94A3B8' }}>
            Mechanical engineering interview prep that actually sticks.
          </p>
          <p style={{ marginTop: 8, fontSize: 14, fontWeight: 600, color: '#94A3B8' }}>
            <Link href="/get-started" style={{ color: '#1CB0F6', fontWeight: 700, textDecoration: 'none' }}>Sign up</Link>
            {' '}&middot;{' '}
            <Link href="/login" style={{ color: '#1CB0F6', fontWeight: 700, textDecoration: 'none' }}>Log in</Link>
          </p>
        </div>
      </footer>

      {/* ── Responsive CSS ── */}
      <style>{`
        .landing-hero-h1 { font-size: 48px; }
        .landing-hero-p { font-size: 19px; }
        .landing-stat-num { font-size: 28px; }
        .landing-section-heading { font-size: 32px; }
        .landing-stat-number { font-size: 22px; }
        .landing-player-card { padding: 32px; }
        .landing-stat-box { padding: 16px 8px; }
        .landing-compare-grid { grid-template-columns: repeat(3, 1fr); }

        .landing-btn-primary:hover { filter: brightness(1.05); }
        .landing-btn-primary:active { transform: translateY(2px); box-shadow: 0 3px 0 #46A302 !important; }
        .landing-btn-secondary:hover { background: #F0F9FF; }
        .landing-topic-pill:hover { border-color: #6366F1 !important; box-shadow: 0 2px 8px rgba(99, 102, 241, 0.1) !important; }

        @media (max-width: 768px) {
          .landing-hero-h1 { font-size: 34px !important; }
          .landing-hero-p { font-size: 17px !important; }
          .landing-stat-num { font-size: 24px !important; }
          .landing-section-heading { font-size: 26px !important; }
          .landing-stat-number { font-size: 18px !important; }
          .landing-player-card { padding: 24px !important; }
          .landing-stat-box { padding: 12px 6px !important; }
          .landing-stats-grid { gap: 10px !important; }
          .landing-compare-grid {
            grid-template-columns: 1fr !important;
            max-width: 400px !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }
          .landing-compare-featured { transform: none !important; order: -1; }
          .landing-hero-stats { gap: 24px !important; }
        }

        @media (max-width: 480px) {
          .landing-hero-h1 { font-size: 26px !important; letter-spacing: -0.5px !important; }
          .landing-hero-p { font-size: 15px !important; }
          .landing-section-heading { font-size: 22px !important; }
          .landing-hero-actions { flex-direction: column; }
          .landing-hero-actions .landing-btn-primary,
          .landing-hero-actions .landing-btn-secondary { width: 100%; text-align: center; padding: 12px 24px !important; }
          .landing-player-header { flex-direction: column; text-align: center; }
          .landing-player-card { padding: 20px !important; }
          .landing-level-row { justify-content: center; flex-wrap: wrap; }
          .landing-achievements { justify-content: center; }
          .landing-stats-grid { grid-template-columns: repeat(3, 1fr) !important; gap: 8px !important; }
          .landing-stat-number { font-size: 16px !important; }
          .landing-stat-box { padding: 10px 4px !important; }
          .landing-topic-pill { padding: 8px 14px !important; font-size: 13px !important; }
          nav > div { padding: 0 16px !important; }
          .landing-hero-section { padding-top: 100px !important; padding-bottom: 48px !important; }
          .landing-compare-section, .landing-topics-section { padding-top: 48px !important; padding-bottom: 48px !important; }
        }

        @media (max-width: 360px) {
          .landing-hero-section { padding-top: 88px !important; padding-bottom: 40px !important; }
          .landing-compare-section, .landing-topics-section { padding-top: 40px !important; padding-bottom: 40px !important; }
          .landing-hero-h1 { font-size: 22px !important; }
          .landing-hero-p { font-size: 14px !important; }
          .landing-section-heading { font-size: 20px !important; }
          .landing-player-card { padding: 16px !important; }
          .landing-topic-pill { padding: 6px 12px !important; font-size: 12px !important; }
        }
      `}</style>
    </div>
  );
}

/* ── Comparison Card Component ── */
function CompareCard({
  featured = false,
  iconBg,
  iconColor,
  icon,
  title,
  subtitle,
  items,
}: {
  featured?: boolean;
  iconBg: string;
  iconColor: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  items: { text: string; type: 'check' | 'cross' | 'partial' }[];
}) {
  return (
    <div
      className={featured ? 'landing-compare-featured' : ''}
      style={{
        background: featured ? '#fff' : '#FAFAFA',
        border: featured ? '2px solid #58CC02' : '1px solid #E2E8F0',
        borderRadius: 12,
        boxShadow: featured ? '0 4px 16px rgba(88, 204, 2, 0.15)' : '0 1px 2px rgba(0,0,0,0.05)',
        padding: '32px 24px',
        textAlign: 'center',
        position: 'relative',
        height: '100%',
        transform: featured ? 'scale(1.03)' : undefined,
      }}
    >
      {featured && (
        <div style={{
          position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)',
          background: '#58CC02', color: '#fff', fontSize: 11, fontWeight: 800,
          textTransform: 'uppercase', letterSpacing: 1, padding: '4px 16px',
          borderRadius: 100, whiteSpace: 'nowrap',
        }}>
          Best for interviews
        </div>
      )}
      <div style={{
        width: 64, height: 64, borderRadius: 16, margin: '0 auto 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'center', background: iconBg,
      }}>
        <svg viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="32" height="32">
          {icon}
        </svg>
      </div>
      <div style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#94A3B8', marginBottom: 24, textTransform: 'uppercase', letterSpacing: 0.5 }}>{subtitle}</div>
      <ul style={{ listStyle: 'none', textAlign: 'left', padding: 0, margin: 0 }}>
        {items.map((item, i) => (
          <li key={i} style={{
            display: 'flex', alignItems: 'flex-start', gap: 10,
            padding: '10px 0', fontSize: 14, fontWeight: 600, color: '#64748B',
            borderTop: i > 0 ? '1px solid #F1F5F9' : 'none',
          }}>
            {item.type === 'check' ? <CheckIcon /> : item.type === 'partial' ? <PartialIcon /> : <CrossIcon />}
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
