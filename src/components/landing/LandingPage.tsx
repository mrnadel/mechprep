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
    topic: 'Everyday Physics', topicColor: '#14B8A6',
    question: 'Why does a wet phone screen stop responding to your touch?',
    options: ['Water conducts electricity and confuses the sensor', 'Your fingers lose their charge when wet', 'The screen glass gets too slippery', 'Water blocks Bluetooth signals'],
    correctIndex: 0,
    explanation: 'Touchscreens detect tiny electrical signals from your fingertip. Water conducts electricity too, creating false touches everywhere.',
    xp: 20,
  },
  {
    topic: 'Quick Think', topicColor: '#F59E0B',
    question: 'Is it true that hot water freezes faster than cold water?',
    options: ['Yes, it can', 'No, never'],
    correctIndex: 0,
    explanation: "It's called the Mpemba effect. Under certain conditions, hot water actually does freeze faster. Scientists still debate exactly why.",
    xp: 15,
  },
  {
    topic: 'Real World', topicColor: '#8B5CF6',
    question: 'Why do bridges have expansion joints (gaps) in them?',
    options: ['So the bridge can expand in heat without cracking', 'To let rainwater drain through', 'To reduce the weight of the bridge', 'For decoration and visual appeal'],
    correctIndex: 0,
    explanation: 'Materials expand when heated. Without gaps, a bridge could buckle on a hot day. Expansion joints give the structure room to grow and shrink safely.',
    xp: 20,
  },
];

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
            <span style={{ color: '#0D9488', textShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>Octokeen</span>
          </Link>
          <Link href="/login" style={{
            fontSize: 14, fontWeight: 800, color: '#0D9488',
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
              display: 'inline-block', background: '#F0FDFA', color: '#0F766E',
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
              Learn anything.<br /><span style={{ color: '#14B8A6' }}>Master everything.</span>
            </h1>
          </AnimateIn>

          <AnimateIn delay={0.2}>
            <p className="landing-hero-p" style={{
              fontWeight: 600, color: '#64748B', lineHeight: 1.6,
              maxWidth: 540, margin: '0 auto 36px',
            }}>
              Octokeen turns learning into a game. Pick your profession, earn XP, keep your streak, unlock achievements &mdash; and actually remember what you learn.
            </p>
          </AnimateIn>

          <AnimateIn delay={0.3}>
            <div className="landing-hero-actions" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
              <Link
                href="/get-started"
                className="landing-btn-primary"
                style={{
                  display: 'inline-block', background: '#0D9488', color: '#fff',
                  fontSize: 16, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.8,
                  padding: '14px 36px', border: 'none', borderRadius: 16,
                  boxShadow: '0 5px 0 #0F766E', textDecoration: 'none',
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
              textTransform: 'uppercase', letterSpacing: 1.5, color: '#0F766E', marginBottom: 16,
            }}>
              Try it now
            </div>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h2 className="landing-section-heading" style={{
              textAlign: 'center', fontWeight: 900,
              color: '#3D4654', marginBottom: 40, letterSpacing: -0.5,
            }}>
              Can you get all 3 right?
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
              textTransform: 'uppercase', letterSpacing: 1.5, color: '#0F766E', marginBottom: 16,
            }}>
              Why Octokeen?
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

            {/* Octokeen (featured) */}
            <AnimateIn delay={0.2}>
              <CompareCard
                featured
                iconBg="#DCFCE7"
                iconColor="#16A34A"
                icon={<><line x1="6" y1="12" x2="18" y2="12" /><line x1="12" y1="6" x2="12" y2="18" /><rect x="2" y="6" width="20" height="12" rx="3" /></>}
                title="Octokeen"
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
                  display: 'inline-block', background: '#0D9488', color: '#fff',
                  fontSize: 16, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.8,
                  padding: '14px 36px', border: 'none', borderRadius: 16,
                  boxShadow: '0 5px 0 #0F766E', textDecoration: 'none',
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
              textTransform: 'uppercase', letterSpacing: 1.5, color: '#0F766E', marginBottom: 16,
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
                      background: '#F0FDFA', color: '#0F766E',
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
                  display: 'inline-block', background: '#0D9488', color: '#fff',
                  fontSize: 16, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.8,
                  padding: '14px 36px', border: 'none', borderRadius: 16,
                  boxShadow: '0 5px 0 #0F766E', textDecoration: 'none',
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
              <span style={{ color: '#0D9488' }}>Octokeen</span>
            </Link>
          </p>
          <p style={{ marginTop: 12, fontSize: 14, fontWeight: 600, color: '#94A3B8' }}>
            Gamified learning that actually sticks.
          </p>
          <p style={{ marginTop: 8, fontSize: 14, fontWeight: 600, color: '#94A3B8' }}>
            <Link href="/get-started" style={{ color: '#0D9488', fontWeight: 700, textDecoration: 'none' }}>Sign up</Link>
            {' '}&middot;{' '}
            <Link href="/login" style={{ color: '#0D9488', fontWeight: 700, textDecoration: 'none' }}>Log in</Link>
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
        .landing-btn-primary:active { transform: translateY(2px); box-shadow: 0 3px 0 #0F766E !important; }
        .landing-btn-secondary:hover { background: #F0F9FF; }
        .landing-profession-card:hover { border-color: #0D9488 !important; box-shadow: 0 4px 16px rgba(13, 148, 136, 0.12) !important; }
        .landing-professions-grid { grid-template-columns: 1fr; }

        @keyframes demoFadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes demoPopIn { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
        .demo-option { font-family: inherit; }
        .demo-option:not(:disabled):hover { border-color: #14B8A6 !important; background: #F0FDFA !important; transform: translateY(-1px); }
        .demo-option:not(:disabled):active { transform: translateY(1px); box-shadow: none !important; }
        .demo-next-btn { font-family: inherit; }
        .demo-next-btn:hover { filter: brightness(1.05); }
        .demo-next-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 #0F766E !important; }
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
  const [correct, setCorrect] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const done = qIdx >= DEMO_QUESTIONS.length;
  const q = DEMO_QUESTIONS[done ? 0 : qIdx];
  const isRight = selected !== null && selected === q.correctIndex;

  function pick(idx: number) {
    if (selected !== null || done) return;
    setSelected(idx);
    setTimeout(() => {
      if (idx === DEMO_QUESTIONS[qIdx].correctIndex) setCorrect(c => c + 1);
      setShowFeedback(true);
    }, 400);
  }
  function next() { setQIdx(i => i + 1); setSelected(null); setShowFeedback(false); }
  function restart() { setQIdx(0); setSelected(null); setShowFeedback(false); setCorrect(0); }

  if (done) {
    return (
      <div style={{ background: '#fff', borderRadius: 20, border: '2px solid #0D9488', padding: '40px 32px', textAlign: 'center', boxShadow: '0 4px 24px rgba(13, 148, 136, 0.10)' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>{correct === DEMO_QUESTIONS.length ? '\uD83C\uDF89' : '\uD83D\uDCAA'}</div>
        <div style={{ fontSize: 26, fontWeight: 900, color: '#0F172A', marginBottom: 8 }}>
          {correct === DEMO_QUESTIONS.length ? 'Perfect!' : 'Nice try!'}
        </div>
        <div style={{ fontSize: 16, fontWeight: 600, color: '#64748B', marginBottom: 32 }}>
          You got {correct} of {DEMO_QUESTIONS.length} right
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#94A3B8', marginBottom: 28 }}>
          Imagine this with {PROFESSIONS.reduce((sum, p) => sum + p.questionCount, 0).toLocaleString()}+ questions across {PROFESSIONS.length} professions
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/get-started" className="landing-btn-primary" style={{ display: 'inline-block', background: '#0D9488', color: '#fff', fontSize: 16, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.8, padding: '14px 32px', border: 'none', borderRadius: 16, boxShadow: '0 5px 0 #0F766E', textDecoration: 'none' }}>Start learning free</Link>
          <button onClick={restart} className="demo-restart-btn" style={{ background: 'none', border: '2px solid #E2E8F0', borderRadius: 16, padding: '12px 24px', fontSize: 14, fontWeight: 700, color: '#64748B', cursor: 'pointer' }}>Play again</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #E2E8F0', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
      {/* Progress bar */}
      <div style={{ height: 4, background: '#F1F5F9' }}>
        <div style={{ height: '100%', background: '#14B8A6', width: `${(qIdx / DEMO_QUESTIONS.length) * 100}%`, transition: 'width 0.5s ease', borderRadius: '0 4px 4px 0' }} />
      </div>

      <div style={{ padding: '28px 28px 32px' }}>
        {/* Step dots + topic */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {DEMO_QUESTIONS.map((_, i) => (
              <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: i < qIdx ? '#14B8A6' : i === qIdx ? '#0D9488' : '#E2E8F0', transition: 'background 0.3s' }} />
            ))}
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, color: q.topicColor, background: `${q.topicColor}12`, padding: '4px 12px', borderRadius: 100 }}>{q.topic}</span>
        </div>

        {/* Question */}
        <div style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', lineHeight: 1.5, marginBottom: 24 }}>{q.question}</div>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {q.options.map((opt, i) => {
            const isSel = selected === i;
            const isCorr = i === q.correctIndex;
            const answered = selected !== null;
            let bg = '#fff', border = '2px solid #E2E8F0', color = '#0F172A', shadow = '0 2px 0 #E2E8F0';
            if (answered) {
              if (isSel && isCorr) { bg = '#DCFCE7'; border = '2px solid #22C55E'; color = '#166534'; shadow = '0 2px 0 #86EFAC'; }
              else if (isSel) { bg = '#FEE2E2'; border = '2px solid #EF4444'; color = '#991B1B'; shadow = '0 2px 0 #FECACA'; }
              else if (isCorr && showFeedback) { bg = '#DCFCE7'; border = '2px solid #22C55E'; color = '#166534'; shadow = '0 2px 0 #86EFAC'; }
              else { bg = '#FAFAFA'; border = '2px solid #F1F5F9'; color = '#94A3B8'; shadow = 'none'; }
            }
            return (
              <button key={i} onClick={() => pick(i)} disabled={answered} className="demo-option" style={{
                width: '100%', textAlign: 'left', padding: '14px 18px', borderRadius: 14, background: bg, border, color,
                fontSize: 15, fontWeight: 600, cursor: answered ? 'default' : 'pointer', boxShadow: shadow,
                transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', gap: 12,
                opacity: answered && !isSel && !(isCorr && showFeedback) ? 0.4 : 1,
              }}>
                <span style={{ flex: 1 }}>{opt}</span>
                {answered && isSel && (
                  <svg viewBox="0 0 24 24" fill="none" width="20" height="20" style={{ flexShrink: 0 }}>
                    {isCorr
                      ? <path d="M20 6L9 17l-5-5" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      : <path d="M18 6L6 18M6 6l12 12" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" />}
                  </svg>
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div style={{
            marginTop: 16, padding: '18px 20px', borderRadius: 14,
            background: isRight ? '#F0FDF4' : '#FFF7ED',
            border: `1px solid ${isRight ? '#BBF7D0' : '#FED7AA'}`,
            animation: 'demoFadeIn 0.3s ease',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 20 }}>{isRight ? '\u2705' : '\uD83D\uDCA1'}</span>
              <span style={{ fontSize: 15, fontWeight: 800, color: isRight ? '#166534' : '#9A3412' }}>
                {isRight ? 'Correct!' : 'Good guess!'}
              </span>
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#64748B', lineHeight: 1.6, marginBottom: 16 }}>{q.explanation}</div>
            <button onClick={next} className="demo-next-btn" style={{
              width: '100%', padding: '12px', borderRadius: 14, background: '#0D9488', color: '#fff',
              border: 'none', fontSize: 15, fontWeight: 800, cursor: 'pointer',
              boxShadow: '0 4px 0 #0F766E', letterSpacing: 0.3,
            }}>
              {qIdx < DEMO_QUESTIONS.length - 1 ? 'Next' : 'See Results'}
            </button>
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
        border: featured ? '2px solid #0D9488' : '1px solid #E2E8F0',
        borderRadius: 12,
        boxShadow: featured ? '0 4px 16px rgba(13, 148, 136, 0.15)' : '0 1px 2px rgba(0,0,0,0.05)',
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
          background: '#0D9488', color: '#fff', fontSize: 11, fontWeight: 800,
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
