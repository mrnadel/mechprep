'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { PROFESSIONS } from '@/data/professions';
import { CourseIcon } from '@/components/course/CourseIcon';

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

/* ── Demo questions for interactive landing ── */
const DEMO_QUESTIONS = [
  {
    topic: 'Statics', topicColor: '#10B981', typeLabel: 'Multiple Choice',
    question: 'A beam is supported at both ends. Where should you place a load to maximize the reaction force at the left support?',
    options: ['Directly at the left support', 'At the center of the beam', 'At the right support', "It doesn't matter — both supports share equally"],
    correctIndex: 0,
    explanation: "Placing the load closer to a support increases that support's reaction. At the left end, the left support carries nearly all the load — a key equilibrium concept.",
    xp: 20,
  },
  {
    topic: 'Thermodynamics', topicColor: '#22C55E', typeLabel: 'True / False',
    question: 'A refrigerator violates the second law of thermodynamics because it transfers heat from a cold space to a warmer room.',
    options: ['True', 'False'],
    correctIndex: 1,
    explanation: "The 2nd law only forbids spontaneous heat flow from cold to hot. A refrigerator uses compressor work to move heat — perfectly allowed by the Clausius statement.",
    xp: 15,
  },
  {
    topic: 'Materials', topicColor: '#3B82F6', typeLabel: 'Multiple Choice',
    question: 'Why does adding a small percentage of carbon to iron dramatically increase its strength?',
    options: ['Carbon atoms block dislocation movement in the crystal lattice', 'Carbon makes the iron lighter and more flexible', 'Carbon prevents all forms of corrosion', 'Carbon increases the melting point above 3,000°C'],
    correctIndex: 0,
    explanation: "Carbon atoms act as obstacles to dislocation motion in the iron lattice, dramatically increasing yield strength — the fundamental principle behind all carbon steels.",
    xp: 20,
  },
];

/* ── Animated count-up ── */
function useCountUp(target: number, dur = 500) {
  const [val, setVal] = useState(0);
  const prev = useRef(0);
  useEffect(() => {
    if (target === prev.current) return;
    const from = prev.current;
    const diff = target - from;
    const t0 = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - t0) / dur, 1);
      setVal(Math.round(from + diff * (1 - Math.pow(1 - t, 3))));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    prev.current = target;
  }, [target, dur]);
  return val;
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
  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", background: '#FAFAFA', color: '#0F172A', minHeight: '100vh' }}>

      {/* ── NAV ── */}
      <nav aria-label="Main navigation" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: '#FAFAFA',
      }}>
        <div style={{
          maxWidth: 960, margin: '0 auto', padding: '0 24px',
          height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <Link href="/" style={{
            fontSize: 24, fontWeight: 900,
            letterSpacing: -0.5, textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <img src="/icon-48.png" alt="" width={34} height={34} style={{ borderRadius: 10, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))' }} />
            <span>
              <span style={{ color: '#F5B800', textShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>Mech</span>
              <span style={{ color: '#3D4654', textShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>Ready</span>
            </span>
          </Link>
          <Link href="/login" style={{
            fontSize: 14, fontWeight: 800, color: '#F5B800',
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
              display: 'inline-block', background: '#FFF8E1', color: '#C49200',
              fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1,
              padding: '6px 16px', borderRadius: 100, marginBottom: 24,
            }}>
              Free to start
            </div>
          </AnimateIn>

          <AnimateIn delay={0.1}>
            <h1 className="landing-hero-h1" style={{
              fontWeight: 900, lineHeight: 1.1, color: '#3D4654',
              marginBottom: 20, letterSpacing: -1,
            }}>
              Learn anything.<br /><span style={{ color: '#E5A800' }}>Master everything.</span>
            </h1>
          </AnimateIn>

          <AnimateIn delay={0.2}>
            <p className="landing-hero-p" style={{
              fontWeight: 600, color: '#64748B', lineHeight: 1.6,
              maxWidth: 540, margin: '0 auto 36px',
            }}>
              MechReady turns learning into a game. Pick your profession, earn XP, keep your streak, unlock achievements &mdash; and actually remember what you learn.
            </p>
          </AnimateIn>

          <AnimateIn delay={0.3}>
            <div className="landing-hero-actions" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
              <Link
                href="/get-started"
                className="landing-btn-primary"
                style={{
                  display: 'inline-block', background: '#F5B800', color: '#fff',
                  fontSize: 16, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.8,
                  padding: '14px 36px', border: 'none', borderRadius: 16,
                  boxShadow: '0 5px 0 #C49200', textDecoration: 'none',
                  transition: 'transform 0.1s, box-shadow 0.1s, filter 0.1s',
                }}
              >
                Start playing free
              </Link>
              <Link
                href="/login"
                className="landing-btn-secondary"
                style={{
                  display: 'inline-block', color: '#3D4654', fontSize: 15, fontWeight: 700,
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
                { num: `${PROFESSIONS.length}`, label: 'Professions' },
                { num: `${PROFESSIONS.reduce((sum, p) => sum + p.questionCount, 0).toLocaleString()}+`, label: 'Questions' },
                { num: 'Free', label: 'To Start' },
              ].map((s) => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <div className="landing-stat-num" style={{ fontWeight: 900, color: '#3D4654' }}>{s.num}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>


      {/* ── INTERACTIVE DEMO SECTION ── */}
      <section className="landing-demo-section" style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: 580, margin: '0 auto' }}>
          <AnimateIn>
            <div style={{
              textAlign: 'center', fontSize: 13, fontWeight: 800,
              textTransform: 'uppercase', letterSpacing: 1.5, color: '#C49200', marginBottom: 16,
            }}>
              Try it yourself
            </div>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h2 className="landing-section-heading" style={{
              textAlign: 'center', fontWeight: 900,
              color: '#3D4654', marginBottom: 40, letterSpacing: -0.5,
            }}>
              Answer a real interview question
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <InteractiveDemo />
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
              textTransform: 'uppercase', letterSpacing: 1.5, color: '#C49200', marginBottom: 16,
            }}>
              Why MechReady?
            </div>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <div className="landing-section-heading" style={{
              textAlign: 'center', fontWeight: 900,
              color: '#3D4654', marginBottom: 40, letterSpacing: -0.5,
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
                  { text: '11 interactive question types', type: 'check' },
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
                  display: 'inline-block', background: '#F5B800', color: '#fff',
                  fontSize: 16, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.8,
                  padding: '14px 36px', border: 'none', borderRadius: 16,
                  boxShadow: '0 5px 0 #C49200', textDecoration: 'none',
                  transition: 'transform 0.1s, box-shadow 0.1s, filter 0.1s',
                }}
              >
                Start learning for free
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── PROFESSIONS SECTION ── */}
      <section className="landing-topics-section" style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <AnimateIn>
            <div style={{
              textAlign: 'center', fontSize: 13, fontWeight: 800,
              textTransform: 'uppercase', letterSpacing: 1.5, color: '#C49200', marginBottom: 16,
            }}>
              Multiple professions
            </div>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <div className="landing-section-heading" style={{
              textAlign: 'center', fontWeight: 900,
              color: '#3D4654', marginBottom: 40, letterSpacing: -0.5,
            }}>
              Pick your path
            </div>
          </AnimateIn>

          <AnimateIn delay={0.2}>
            <div className="landing-professions-grid" style={{
              display: 'grid', gap: 16, marginBottom: 40,
            }}>
              {PROFESSIONS.map((prof) => (
                <div
                  key={prof.id}
                  className="landing-profession-card"
                  style={{
                    background: '#fff',
                    border: '1px solid #E2E8F0',
                    borderRadius: 16,
                    padding: '24px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {prof.isComingSoon && (
                    <div style={{
                      position: 'absolute', top: 12, right: 12,
                      background: '#FFF8E1', color: '#C49200',
                      fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5,
                      padding: '3px 10px', borderRadius: 100,
                    }}>
                      Coming soon
                    </div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: 14,
                      background: `${prof.color}15`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <CourseIcon professionId={prof.id} color={prof.color} size={30} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: 18, fontWeight: 800, color: '#0F172A', marginBottom: 4,
                      }}>
                        {prof.name}
                      </div>
                      <div style={{
                        fontSize: 14, fontWeight: 600, color: '#64748B', lineHeight: 1.5, marginBottom: 12,
                      }}>
                        {prof.description}
                      </div>
                      <div style={{ display: 'flex', gap: 16 }}>
                        <div style={{
                          display: 'flex', alignItems: 'center', gap: 6,
                          fontSize: 13, fontWeight: 700, color: '#94A3B8',
                        }}>
                          <span style={{
                            width: 8, height: 8, borderRadius: '50%',
                            background: prof.color, flexShrink: 0,
                          }} />
                          {prof.unitCount} {prof.unitCount === 1 ? 'unit' : 'units'}
                        </div>
                        <div style={{
                          fontSize: 13, fontWeight: 700, color: '#94A3B8',
                        }}>
                          {prof.questionCount.toLocaleString()}+ questions
                        </div>
                      </div>
                    </div>
                  </div>
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
                  display: 'inline-block', background: '#F5B800', color: '#fff',
                  fontSize: 16, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.8,
                  padding: '14px 36px', border: 'none', borderRadius: 16,
                  boxShadow: '0 5px 0 #C49200', textDecoration: 'none',
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
            <Link href="/" style={{ fontSize: 20, fontWeight: 900, letterSpacing: -0.5, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <img src="/icon-48.png" alt="" width={26} height={26} style={{ borderRadius: 8 }} />
              <span>
                <span style={{ color: '#F5B800' }}>Mech</span>
                <span style={{ color: '#3D4654' }}>Ready</span>
              </span>
            </Link>
          </p>
          <p style={{ marginTop: 12, fontSize: 14, fontWeight: 600, color: '#94A3B8' }}>
            Gamified learning that actually sticks.
          </p>
          <p style={{ marginTop: 8, fontSize: 14, fontWeight: 600, color: '#94A3B8' }}>
            <Link href="/get-started" style={{ color: '#F5B800', fontWeight: 700, textDecoration: 'none' }}>Sign up</Link>
            {' '}&middot;{' '}
            <Link href="/login" style={{ color: '#F5B800', fontWeight: 700, textDecoration: 'none' }}>Log in</Link>
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
        .landing-btn-primary:active { transform: translateY(2px); box-shadow: 0 3px 0 #C49200 !important; }
        .landing-btn-secondary:hover { background: #F0F9FF; }
        .landing-profession-card:hover { border-color: #F5B800 !important; box-shadow: 0 4px 16px rgba(245, 184, 0, 0.12) !important; }
        .landing-professions-grid { grid-template-columns: 1fr; }

        @keyframes demoFadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes demoPopIn { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
        .demo-option { font-family: inherit; }
        .demo-option:not(:disabled):hover { border-color: #F5B800 !important; background: #FFFBEB !important; transform: translateY(-1px); }
        .demo-option:not(:disabled):active { transform: translateY(1px); box-shadow: none !important; }
        .demo-next-btn { font-family: inherit; }
        .demo-next-btn:hover { filter: brightness(1.05); }
        .demo-next-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 #C49200 !important; }
        .demo-restart-btn { font-family: inherit; }
        .demo-restart-btn:hover { background: #F8FAFC !important; border-color: #CBD5E1 !important; }

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
          .landing-profession-card { padding: 20px !important; }
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
          .landing-profession-card { padding: 16px !important; }
        }
      `}</style>
    </div>
  );
}

/* ── Interactive Demo Component ── */
function InteractiveDemo() {
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [stats, setStats] = useState({ xp: 0, answered: 0, correct: 0 });
  const [showFeedback, setShowFeedback] = useState(false);
  const [achievement, setAchievement] = useState(false);
  const done = qIdx >= DEMO_QUESTIONS.length;
  const q = DEMO_QUESTIONS[done ? 0 : qIdx];
  const isRight = selected !== null && selected === q.correctIndex;
  const animXp = useCountUp(stats.xp);
  const totalXp = 70;
  const accuracy = stats.answered > 0 ? Math.round((stats.correct / stats.answered) * 100) : 0;
  function pick(idx: number) {
    if (selected !== null || done) return;
    setSelected(idx);
    const correct = idx === DEMO_QUESTIONS[qIdx].correctIndex;
    setTimeout(() => {
      setStats(p => ({ xp: p.xp + (correct ? DEMO_QUESTIONS[qIdx].xp : 5), answered: p.answered + 1, correct: p.correct + (correct ? 1 : 0) }));
      setShowFeedback(true);
      if (correct && stats.correct === 0 && !achievement) setTimeout(() => setAchievement(true), 300);
    }, 500);
  }
  function next() { setQIdx(i => i + 1); setSelected(null); setShowFeedback(false); }
  function restart() { setQIdx(0); setSelected(null); setShowFeedback(false); setStats({ xp: 0, answered: 0, correct: 0 }); setAchievement(false); }

  if (done) {
    return (
      <div style={{ background: '#fff', borderRadius: 16, border: '2px solid #F5B800', padding: 32, textAlign: 'center', boxShadow: '0 4px 24px rgba(245, 184, 0, 0.12)' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', margin: '0 auto 20px', background: 'linear-gradient(135deg, #F5B800, #FFD54F)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg viewBox="0 0 24 24" fill="none" width="36" height="36"><path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <div style={{ fontSize: 24, fontWeight: 900, color: '#0F172A', marginBottom: 8 }}>Nice work!</div>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#64748B', marginBottom: 28 }}>You got {stats.correct} of {stats.answered} correct</div>
        <div className="demo-final-stats" style={{ display: 'flex', justifyContent: 'center', gap: 32, marginBottom: 28 }}>
          {[{ val: stats.xp, label: 'XP Earned' }, { val: `${accuracy}%`, label: 'Accuracy' }, { val: stats.correct, label: 'Correct' }].map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}><div style={{ fontSize: 28, fontWeight: 900, color: '#0F172A' }}>{s.val}</div><div style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 4 }}>{s.label}</div></div>
          ))}
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#94A3B8', marginBottom: 24 }}>{PROFESSIONS.reduce((sum, p) => sum + p.questionCount, 0).toLocaleString()}+ questions across {PROFESSIONS.length} professions</div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/get-started" className="landing-btn-primary" style={{ display: 'inline-block', background: '#F5B800', color: '#fff', fontSize: 16, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.8, padding: '14px 32px', border: 'none', borderRadius: 16, boxShadow: '0 5px 0 #C49200', textDecoration: 'none' }}>Keep playing</Link>
          <button onClick={restart} className="demo-restart-btn" style={{ background: 'none', border: '2px solid #E2E8F0', borderRadius: 16, padding: '12px 24px', fontSize: 14, fontWeight: 700, color: '#64748B', cursor: 'pointer' }}>Try again</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #E2E8F0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
      <div style={{ height: 4, background: '#F1F5F9' }}><div style={{ height: '100%', background: 'linear-gradient(90deg, #F5B800, #FFD54F)', width: `${(qIdx / DEMO_QUESTIONS.length) * 100}%`, transition: 'width 0.5s ease', borderRadius: '0 4px 4px 0' }} /></div>
      <div className="demo-card-inner" style={{ padding: 32 }}>
        <div className="demo-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {DEMO_QUESTIONS.map((_, i) => (<div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: i < qIdx ? '#F5B800' : i === qIdx ? q.topicColor : '#E2E8F0', transition: 'background 0.3s' }} />))}
            <span style={{ fontSize: 13, fontWeight: 700, color: '#94A3B8', marginLeft: 4 }}>{qIdx + 1} / {DEMO_QUESTIONS.length}</span>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: q.topicColor, background: `${q.topicColor}15`, padding: '4px 10px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: 0.5 }}>{q.topic}</span>
            <span style={{ fontSize: 11, fontWeight: 800, color: '#94A3B8', background: '#F1F5F9', padding: '4px 10px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: 0.5 }}>{q.typeLabel}</span>
          </div>
        </div>
        <div style={{ fontSize: 17, fontWeight: 700, color: '#0F172A', lineHeight: 1.5, marginBottom: 24 }}>{q.question}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {q.options.map((opt, i) => {
            const isSel = selected === i; const isCorr = i === q.correctIndex; const answered = selected !== null;
            let bg = '#fff', border = '2px solid #E2E8F0', color = '#0F172A', shadow = '0 2px 0 #E2E8F0';
            if (answered) {
              if (isSel && isCorr) { bg = '#DCFCE7'; border = '2px solid #58CC02'; color = '#166534'; shadow = '0 2px 0 #86EFAC'; }
              else if (isSel) { bg = '#FEE2E2'; border = '2px solid #EF4444'; color = '#991B1B'; shadow = '0 2px 0 #FECACA'; }
              else if (isCorr && showFeedback) { bg = '#DCFCE7'; border = '2px solid #58CC02'; color = '#166534'; shadow = '0 2px 0 #86EFAC'; }
              else { bg = '#FAFAFA'; border = '2px solid #F1F5F9'; color = '#94A3B8'; shadow = 'none'; }
            }
            return (
              <button key={i} onClick={() => pick(i)} disabled={answered} className="demo-option" style={{ width: '100%', textAlign: 'left', padding: q.options.length === 2 ? '16px 20px' : '14px 18px', borderRadius: 12, background: bg, border, color, fontSize: 15, fontWeight: 600, cursor: answered ? 'default' : 'pointer', boxShadow: shadow, transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', gap: 12, opacity: answered && !isSel && !(isCorr && showFeedback) ? 0.5 : 1 }}>
                {q.options.length > 2 && (<span style={{ width: 28, height: 28, borderRadius: 8, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: answered && (isSel || (isCorr && showFeedback)) ? (isCorr ? '#58CC02' : '#EF4444') : '#F1F5F9', color: answered && (isSel || (isCorr && showFeedback)) ? '#fff' : '#64748B', fontSize: 13, fontWeight: 800 }}>{String.fromCharCode(65 + i)}</span>)}
                <span style={{ flex: 1 }}>{opt}</span>
                {answered && isSel && (<svg viewBox="0 0 24 24" fill="none" width="20" height="20" style={{ flexShrink: 0 }}>{isCorr ? <path d="M20 6L9 17l-5-5" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /> : <path d="M18 6L6 18M6 6l12 12" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" />}</svg>)}
              </button>
            );
          })}
        </div>
        {showFeedback && (
          <div style={{ marginTop: 16, padding: 20, borderRadius: 12, background: isRight ? '#F0FDF4' : '#FFF7ED', border: `1px solid ${isRight ? '#BBF7D0' : '#FED7AA'}`, animation: 'demoFadeIn 0.3s ease' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              {isRight ? (<><svg viewBox="0 0 24 24" fill="none" width="20" height="20"><circle cx="12" cy="12" r="10" fill="#58CC02" /><path d="M8 12.5l2.5 2.5 5.5-5.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg><span style={{ fontSize: 15, fontWeight: 800, color: '#166534' }}>Correct! +{q.xp} XP</span></>) : (<><svg viewBox="0 0 24 24" fill="none" width="20" height="20"><circle cx="12" cy="12" r="10" fill="#F97316" /><path d="M15 9l-6 6M9 9l6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg><span style={{ fontSize: 15, fontWeight: 800, color: '#9A3412' }}>Not quite &mdash; +5 XP</span></>)}
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#64748B', lineHeight: 1.5, marginBottom: 16 }}>{q.explanation}</div>
            <button onClick={next} className="demo-next-btn" style={{ width: '100%', padding: '12px', borderRadius: 12, background: '#F5B800', color: '#fff', border: 'none', fontSize: 15, fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 0 #C49200', textTransform: 'uppercase', letterSpacing: 0.5 }}>{qIdx < DEMO_QUESTIONS.length - 1 ? 'Next Question' : 'See Results'}</button>
          </div>
        )}
        <div className="demo-stats-bar" style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><svg viewBox="0 0 24 24" fill="none" width="18" height="18"><path d="M12 23C7 23 3 19 3 14c0-3.3 2-6.2 4.2-8.4C9 3.8 10.9 2.4 12 1c1.1 1.4 3 2.8 4.8 4.6C19 7.8 21 10.7 21 14c0 5-4 9-9 9z" fill="#FF9600" /><path d="M12 23c-2.5 0-4.5-2.7-4.5-6 0-1.6 1-3.1 2.1-4.2C10.5 11.9 11.4 11.2 12 10.5c.6.7 1.5 1.4 2.4 2.3 1.1 1.1 2.1 2.6 2.1 4.2 0 3.3-2 6-4.5 6z" fill="#FFCC00" /></svg><span style={{ fontSize: 14, fontWeight: 800, color: '#0F172A' }}>{stats.correct}</span></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><svg viewBox="0 0 24 24" fill="none" width="18" height="18"><circle cx="12" cy="12" r="10" fill="#58CC02" /><path d="M8 12.5l2.5 2.5 5.5-5.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg><span style={{ fontSize: 14, fontWeight: 800, color: '#0F172A' }}>{stats.answered}/{DEMO_QUESTIONS.length}</span></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><svg viewBox="0 0 24 24" fill="none" width="18" height="18"><circle cx="12" cy="12" r="10" stroke="#3B82F6" strokeWidth="2" fill="none" /><circle cx="12" cy="12" r="6" stroke="#3B82F6" strokeWidth="2" fill="none" /><circle cx="12" cy="12" r="2" fill="#3B82F6" /></svg><span style={{ fontSize: 14, fontWeight: 800, color: '#0F172A' }}>{stats.answered > 0 ? `${accuracy}%` : '--'}</span></div>
          </div>
          <div style={{ flex: 1, maxWidth: 160, marginLeft: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}><span style={{ fontSize: 11, fontWeight: 800, color: '#94A3B8' }}>XP</span><span style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8' }}>{animXp}/{totalXp}</span></div>
            <div style={{ height: 8, background: '#F1F5F9', borderRadius: 100, overflow: 'hidden' }}><div style={{ height: '100%', background: 'linear-gradient(90deg, #F5B800, #FFD54F)', width: `${Math.min((stats.xp / totalXp) * 100, 100)}%`, transition: 'width 0.8s ease', borderRadius: 100 }} /></div>
          </div>
        </div>
        {achievement && (
          <div style={{ marginTop: 12, padding: '10px 16px', borderRadius: 10, background: '#FFF8E1', border: '1px solid #FFE082', display: 'flex', alignItems: 'center', gap: 10, animation: 'demoPopIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: '#FFE082', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><svg viewBox="0 0 24 24" fill="none" stroke="#C49200" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg></div>
            <div><div style={{ fontSize: 11, fontWeight: 800, color: '#C49200', textTransform: 'uppercase', letterSpacing: 0.5 }}>Achievement Unlocked!</div><div style={{ fontSize: 13, fontWeight: 700, color: '#A16207' }}>First Correct Answer</div></div>
          </div>
        )}
      </div>
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
        border: featured ? '2px solid #F5B800' : '1px solid #E2E8F0',
        borderRadius: 12,
        boxShadow: featured ? '0 4px 16px rgba(245, 184, 0, 0.15)' : '0 1px 2px rgba(0,0,0,0.05)',
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
          background: '#F5B800', color: '#fff', fontSize: 11, fontWeight: 800,
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
