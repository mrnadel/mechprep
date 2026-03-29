'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { PROFESSIONS } from '@/data/professions';

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
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

/* ── Main Landing Page ── */
export function LandingPage() {
  return (
    <div className="landing-page" style={{ fontFamily: "'Nunito', sans-serif", background: '#FAFAFA', color: '#0F172A', minHeight: '100vh' }}>

      {/* ── NAV ── */}
      <nav aria-label="Main navigation" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: '#FAFAFA' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ fontSize: 24, fontWeight: 900, letterSpacing: -0.5, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src="/icon-48.png" alt="" width={34} height={34} style={{ borderRadius: 10, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))' }} />
            <span style={{ color: '#0D9488' }}>Octokeen</span>
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
      <section className="landing-hero-section" style={{ paddingTop: 140, paddingBottom: 60, textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 24px' }}>
          <AnimateIn>
            <h1 className="landing-hero-h1" style={{ fontWeight: 900, lineHeight: 1.1, color: '#1E293B', marginBottom: 20, letterSpacing: -1 }}>
              The free, fun way to<br />
              <span style={{ color: '#14B8A6' }}>master any profession</span>
            </h1>
          </AnimateIn>

          <AnimateIn delay={0.1}>
            <p className="landing-hero-p" style={{ fontWeight: 600, color: '#64748B', lineHeight: 1.6, maxWidth: 460, margin: '0 auto 40px' }}>
              Bite-sized lessons. Real interview questions. Gamified from the ground up.
            </p>
          </AnimateIn>

          <AnimateIn delay={0.2}>
            <Link
              href="/get-started"
              className="landing-btn-primary"
              style={{
                display: 'inline-block', background: '#0D9488', color: '#fff',
                fontSize: 16, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.8,
                padding: '16px 48px', border: 'none', borderRadius: 16,
                boxShadow: '0 5px 0 #0F766E', textDecoration: 'none',
                transition: 'transform 0.1s, box-shadow 0.1s, filter 0.1s',
              }}
            >
              Get started
            </Link>
          </AnimateIn>

          <AnimateIn delay={0.3}>
            <p style={{ marginTop: 16, fontSize: 13, fontWeight: 600, color: '#94A3B8' }}>
              <Link href="/login" style={{ color: '#0D9488', fontWeight: 700, textDecoration: 'none' }}>I already have an account</Link>
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ── INTERACTIVE DEMO ── */}
      <section className="landing-demo-section" style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          <AnimateIn>
            <h2 className="landing-section-heading" style={{
              textAlign: 'center', fontWeight: 900, color: '#1E293B', marginBottom: 32, letterSpacing: -0.5,
            }}>
              Can you get all 3 right?
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <InteractiveDemo />
          </AnimateIn>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section style={{ padding: '64px 24px', background: '#fff', borderTop: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: 500, margin: '0 auto', textAlign: 'center' }}>
          <AnimateIn>
            <h2 className="landing-section-heading" style={{ fontWeight: 900, color: '#1E293B', marginBottom: 12, letterSpacing: -0.5 }}>
              Ready to start?
            </h2>
            <p style={{ fontSize: 15, fontWeight: 600, color: '#94A3B8', marginBottom: 32 }}>
              {PROFESSIONS.filter(p => !p.requiresAccess).reduce((sum, p) => sum + p.questionCount, 0).toLocaleString()}+ questions across {PROFESSIONS.filter(p => !p.requiresAccess).length} courses. Free forever.
            </p>
          </AnimateIn>

          <AnimateIn delay={0.1}>
            <Link
              href="/get-started"
              className="landing-btn-primary"
              style={{
                display: 'inline-block', background: '#0D9488', color: '#fff',
                fontSize: 16, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.8,
                padding: '16px 48px', border: 'none', borderRadius: 16,
                boxShadow: '0 5px 0 #0F766E', textDecoration: 'none',
                transition: 'transform 0.1s, box-shadow 0.1s, filter 0.1s',
              }}
            >
              Get started
            </Link>
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
          <p style={{ marginTop: 8, fontSize: 13, fontWeight: 600, color: '#94A3B8' }}>
            <Link href="/terms" style={{ color: '#94A3B8', textDecoration: 'none' }}>Terms</Link>
            {' '}&middot;{' '}
            <Link href="/privacy" style={{ color: '#94A3B8', textDecoration: 'none' }}>Privacy</Link>
            {' '}&middot;{' '}
            <Link href="/contact" style={{ color: '#94A3B8', textDecoration: 'none' }}>Contact</Link>
          </p>
        </div>
      </footer>

      {/* ── Responsive CSS ── */}
      <style>{`
        @media (max-width: 768px) {
          html { scroll-snap-type: y proximity; scroll-padding-top: 16px; }
          .landing-demo-section { scroll-snap-align: start; }
        }

        .landing-hero-h1 { font-size: 46px; }
        .landing-hero-p { font-size: 18px; }
        .landing-section-heading { font-size: 30px; }
        .landing-btn-primary:hover { filter: brightness(1.05); }
        .landing-btn-primary:active { transform: translateY(2px); box-shadow: 0 3px 0 #0F766E !important; }

        @keyframes demoFadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .demo-option { font-family: inherit; }
        .demo-option:not(:disabled):hover { border-color: #14B8A6 !important; background: #F0FDFA !important; transform: translateY(-1px); }
        .demo-option:not(:disabled):active { transform: translateY(1px); box-shadow: none !important; }
        .demo-next-btn { font-family: inherit; }
        .demo-next-btn:hover { filter: brightness(1.05); }
        .demo-next-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 #0F766E !important; }
        .demo-restart-btn { font-family: inherit; }
        .demo-restart-btn:hover { background: #F8FAFC !important; border-color: #CBD5E1 !important; }

        @media (max-width: 768px) {
          .landing-hero-h1 { font-size: 32px !important; }
          .landing-hero-p { font-size: 16px !important; }
          .landing-section-heading { font-size: 24px !important; }
          .landing-hero-section { padding-top: 110px !important; padding-bottom: 40px !important; }
        }

        @media (max-width: 480px) {
          .landing-hero-h1 { font-size: 26px !important; letter-spacing: -0.5px !important; }
          .landing-hero-p { font-size: 15px !important; }
          .landing-section-heading { font-size: 22px !important; }
          .landing-hero-section { padding-top: 100px !important; padding-bottom: 32px !important; }
          nav > div { padding: 0 16px !important; }
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
