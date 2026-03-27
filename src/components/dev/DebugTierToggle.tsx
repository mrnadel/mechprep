'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useSubscriptionStore } from '@/hooks/useSubscription';
import { useCourseStore } from '@/store/useCourseStore';
import { useEngagementStore } from '@/store/useEngagementStore';
import { useStore } from '@/store/useStore';
import { getTotalLessonsMeta, loadUnitData, courseMeta } from '@/data/course/course-meta';
import { leagueTiers } from '@/data/league';
import { LeagueImage } from '@/components/icons/LeagueImage';
import { levels, getLevelForXp } from '@/data/levels';
import { LevelBadge } from '@/components/engagement/LevelBadge';
import { getUnitTheme } from '@/lib/unitThemes';
import QuestionCard from '@/components/lesson/QuestionCard';
import type { QuestionCardHandle } from '@/components/lesson/QuestionCard';
import type { CourseQuestion, Unit } from '@/data/course/types';
import type { SubscriptionTier } from '@/lib/subscription';

const TIERS: { value: SubscriptionTier | null; label: string }[] = [
  { value: null, label: 'Real' },
  { value: 'free', label: 'Free' },
  { value: 'pro', label: 'Pro' },
];

function LevelDebug() {
  const totalXp = useStore((s) => s.progress.totalXp);
  const debugSetXp = useStore((s) => s.debugSetXp);
  const current = getLevelForXp(totalXp);
  const currentIdx = levels.findIndex((l) => l.level === current.level);

  const goDown = () => {
    if (currentIdx <= 0) return;
    // Set XP to exactly the previous level's requirement
    debugSetXp(levels[currentIdx - 1].xpRequired);
  };
  const goUp = () => {
    if (currentIdx >= levels.length - 1) return;
    // Set XP to exactly the next level's requirement
    debugSetXp(levels[currentIdx + 1].xpRequired);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={goDown}
        disabled={currentIdx <= 0}
        className="px-2 py-1 rounded-md text-sm font-bold bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        ▼
      </button>
      <span className="flex-1 flex items-center justify-center gap-1.5 text-sm font-bold">
        <LevelBadge level={current} size={22} />
        <span>Lv.{current.level}</span>
      </span>
      <button
        onClick={goUp}
        disabled={currentIdx >= levels.length - 1}
        className="px-2 py-1 rounded-md text-sm font-bold bg-green-50 text-green-600 hover:bg-green-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        ▲
      </button>
    </div>
  );
}

function LeagueDebug() {
  const currentTier = useEngagementStore((s) => s.league.currentTier);
  const debugSetLeagueTier = useEngagementStore((s) => s.debugSetLeagueTier);
  const tier = leagueTiers.find((t) => t.tier === currentTier) ?? leagueTiers[0];

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => debugSetLeagueTier(currentTier - 1)}
        disabled={currentTier <= 1}
        className="px-2 py-1 rounded-md text-sm font-bold bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        ▼
      </button>
      <span className="flex-1 text-center text-sm font-bold">
        <LeagueImage tier={tier} size={20} /> {tier.name}
      </span>
      <button
        onClick={() => debugSetLeagueTier(currentTier + 1)}
        disabled={currentTier >= 5}
        className="px-2 py-1 rounded-md text-sm font-bold bg-green-50 text-green-600 hover:bg-green-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        ▲
      </button>
    </div>
  );
}

/** Parse "u1-L3-Q16" or "pf-u0-L1-Q5" → { unitNum, lessonNum, questionNum, prefix } */
function parseQuestionId(raw: string) {
  const m = raw.trim().match(/^(?:([a-z]+-)?u(\d+)-L(\d+)-Q(\d+))$/i);
  if (!m) return null;
  return { prefix: m[1] ?? '', unitNum: parseInt(m[2], 10), lessonNum: parseInt(m[3], 10), questionNum: parseInt(m[4], 10) };
}

interface ResolvedQuestion {
  question: CourseQuestion;
  unitIndex: number;
  lessonIndex: number;
  unitTitle: string;
  lessonTitle: string;
}

function QuestionSearch() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resolved, setResolved] = useState<ResolvedQuestion | null>(null);
  const [hasSelection, setHasSelection] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const questionRef = useRef<QuestionCardHandle>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const loadedUnitsRef = useRef<Map<number, Unit>>(new Map());

  const handleGo = useCallback(async () => {
    const parsed = parseQuestionId(input);
    if (!parsed) { setError('Format: u1-L3-Q16 or pf-u0-L1-Q5'); return; }
    // Prefixed IDs (pf-u0) use 0-based units; unprefixed (u1) use 1-based
    const unitIndex = parsed.prefix ? parsed.unitNum : parsed.unitNum - 1;
    const lessonIndex = parsed.lessonNum - 1;
    if (unitIndex < 0 || unitIndex >= courseMeta.length) { setError(`Unit ${parsed.unitNum} doesn't exist`); return; }
    const unitMeta = courseMeta[unitIndex];
    if (lessonIndex < 0 || lessonIndex >= unitMeta.lessons.length) { setError(`Lesson ${parsed.lessonNum} doesn't exist in Unit ${parsed.unitNum} (1-${unitMeta.lessons.length})`); return; }
    setError(''); setLoading(true);
    try {
      let unit = loadedUnitsRef.current.get(unitIndex);
      if (!unit) { unit = await loadUnitData(unitIndex); loadedUnitsRef.current.set(unitIndex, unit); }
      const lesson = unit.lessons[lessonIndex];
      const questionId = `${parsed.prefix}u${parsed.unitNum}-L${parsed.lessonNum}-Q${parsed.questionNum}`;
      const question = lesson.questions.find(q => q.id === questionId);
      if (!question) { const qIds = lesson.questions.map(q => q.id.split('-Q')[1]).join(', '); setError(`Q${parsed.questionNum} not found. Available: Q${qIds}`); setLoading(false); return; }
      setResolved({ question, unitIndex, lessonIndex, unitTitle: unit.title, lessonTitle: lesson.title });
      setAnswered(false); setHasSelection(false);
    } catch { setError('Failed to load unit data'); }
    setLoading(false);
  }, [input]);

  const handleClose = useCallback(() => { setResolved(null); setError(''); setAnswered(false); setHasSelection(false); }, []);

  // Prev/next navigation
  const adjacentIds = (() => {
    if (!resolved) return { prev: null as string | null, next: null as string | null };
    const parsed = parseQuestionId(resolved.question.id);
    if (!parsed) return { prev: null, next: null };
    const unit = loadedUnitsRef.current.get(resolved.unitIndex);
    if (!unit) return { prev: null, next: null };
    const lesson = unit.lessons[resolved.lessonIndex];
    const currentIdx = lesson.questions.findIndex(q => q.id === resolved.question.id);
    return {
      prev: currentIdx > 0 ? lesson.questions[currentIdx - 1].id : null,
      next: currentIdx < lesson.questions.length - 1 ? lesson.questions[currentIdx + 1].id : null,
    };
  })();

  const goToQuestion = useCallback(async (id: string) => {
    setInput(id);
    const parsed = parseQuestionId(id);
    if (!parsed) return;
    const unitIndex = parsed.prefix ? parsed.unitNum : parsed.unitNum - 1;
    const lessonIndex = parsed.lessonNum - 1;
    const unit = loadedUnitsRef.current.get(unitIndex);
    if (!unit) return;
    const lesson = unit.lessons[lessonIndex];
    const question = lesson.questions.find(q => q.id === id);
    if (!question) return;
    setResolved({ question, unitIndex, lessonIndex, unitTitle: unit.title, lessonTitle: lesson.title });
    setAnswered(false); setHasSelection(false);
  }, []);

  // Global keyboard handler when viewing a question
  useEffect(() => {
    if (!resolved) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); handleClose(); return; }
      if (e.key === 'ArrowLeft' && adjacentIds.prev) { e.preventDefault(); goToQuestion(adjacentIds.prev); return; }
      if (e.key === 'ArrowRight' && adjacentIds.next) { e.preventDefault(); goToQuestion(adjacentIds.next); return; }
      if (e.key === 'Enter') {
        e.preventDefault();
        if (answered) { setAnswered(false); setHasSelection(false); setRetryKey(k => k + 1); }
        else if (hasSelection) { questionRef.current?.check(); }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [resolved, answered, hasSelection, adjacentIds, handleClose, goToQuestion]);

  const theme = resolved ? getUnitTheme(resolved.unitIndex) : null;
  const unitColor = theme?.color ?? '#6366F1';

  // Full-screen question preview overlay
  if (resolved) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#FAFAFA]">
        <div className="w-full h-full max-w-3xl flex flex-col bg-[#FAFAFA] lg:shadow-lg lg:border-x lg:border-gray-200">
          <div className="flex items-center" style={{ padding: '10px 16px', gap: 12, borderBottom: '2px solid #E5E5E5', background: 'white' }}>
            <button onClick={handleClose} className="flex-shrink-0 flex items-center justify-center transition-transform active:scale-90" style={{ width: 44, height: 44, borderRadius: 12, background: '#F5F5F5', border: 'none', cursor: 'pointer' }} aria-label="Close preview">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="#AFAFAF" strokeWidth="2.5" strokeLinecap="round" /></svg>
            </button>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-gray-400 truncate">{resolved.unitTitle} &rarr; {resolved.lessonTitle}</p>
              <p className="text-sm font-extrabold text-gray-700 font-mono">{resolved.question.id}</p>
            </div>
            <span className="flex-shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg" style={{ background: theme?.bg, color: theme?.dark }}>{resolved.question.type}</span>
            <span className="flex-shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg" style={{ background: '#FEE2E2', color: '#DC2626' }}>DEBUG</span>
          </div>
          <div className="flex-1 overflow-y-auto" style={{ padding: '16px 20px 20px' }}>
            <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
              <QuestionCard key={`${resolved.question.id}-${retryKey}`} ref={questionRef} question={resolved.question} onAnswer={() => setAnswered(true)} onSelectionChange={setHasSelection} answered={answered} unitColor={unitColor} />
            </div>
          </div>
          <div style={{ padding: '12px 20px', paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 16px)', borderTop: '2px solid #E5E5E5', background: 'white' }}>
            <div className="flex items-center gap-2.5">
              <button onClick={() => adjacentIds.prev && goToQuestion(adjacentIds.prev)} disabled={!adjacentIds.prev} className="flex-shrink-0 flex items-center justify-center transition-transform active:scale-90 disabled:opacity-30" style={{ width: 48, height: 48, borderRadius: 14, background: '#F5F5F5', border: '2px solid #E5E5E5', boxShadow: '0 3px 0 #CCCCCC', cursor: adjacentIds.prev ? 'pointer' : 'default' }} title="Previous question (←)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#AFAFAF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              {!answered ? (
                <button onClick={() => questionRef.current?.check()} disabled={!hasSelection} className="flex-1 transition-transform active:scale-[0.98]" style={{ padding: '14px 0', borderRadius: 16, fontSize: 15, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.8, background: hasSelection ? unitColor : '#E5E5E5', color: hasSelection ? '#FFFFFF' : '#AFAFAF', boxShadow: hasSelection ? `0 4px 0 ${theme?.dark ?? '#4F46E5'}` : '0 4px 0 #CCCCCC', border: 'none', cursor: hasSelection ? 'pointer' : 'default' }}>Check</button>
              ) : (
                <button onClick={() => { setAnswered(false); setHasSelection(false); setRetryKey(k => k + 1); }} className="flex-1 transition-transform active:scale-[0.98]" style={{ padding: '14px 0', borderRadius: 16, fontSize: 15, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.8, background: unitColor, color: '#FFFFFF', boxShadow: `0 4px 0 ${theme?.dark ?? '#4F46E5'}`, border: 'none', cursor: 'pointer' }}>Try Again</button>
              )}
              <button onClick={() => adjacentIds.next && goToQuestion(adjacentIds.next)} disabled={!adjacentIds.next} className="flex-shrink-0 flex items-center justify-center transition-transform active:scale-90 disabled:opacity-30" style={{ width: 48, height: 48, borderRadius: 14, background: '#F5F5F5', border: '2px solid #E5E5E5', boxShadow: '0 3px 0 #CCCCCC', cursor: adjacentIds.next ? 'pointer' : 'default' }} title="Next question (→)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#AFAFAF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Inline search bar inside the debug panel
  return (
    <div>
      <div className="flex gap-1.5">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => { setInput(e.target.value); setError(''); }}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleGo(); } }}
          placeholder="u1-L3-Q16 or pf-u0-L1-Q5"
          className="flex-1 min-w-0 px-2 py-1.5 rounded-lg border border-gray-200 text-[11px] font-mono font-bold focus:outline-none focus:border-indigo-400 transition-colors"
          spellCheck={false}
        />
        <button
          onClick={handleGo}
          disabled={loading || !input.trim()}
          className="px-3 py-1.5 rounded-lg text-[11px] font-bold text-white transition-colors disabled:opacity-40"
          style={{ background: '#6366F1' }}
        >
          {loading ? '...' : 'Go'}
        </button>
      </div>
      {error && <p className="mt-1 text-[10px] font-semibold text-red-500">{error}</p>}
    </div>
  );
}

export function DebugTierToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const { debugTierOverride, setDebugTierOverride } = useSubscriptionStore();
  const completedLessons = useCourseStore((s) => s.progress.completedLessons);
  const debugSetProgress = useCourseStore((s) => s.debugSetProgress);
  const activeProfession = useCourseStore((s) => s.activeProfession);
  const totalLessons = getTotalLessonsMeta(activeProfession);
  const completedCount = Object.keys(completedLessons).length;
  const goldenCount = Object.values(completedLessons).filter((l) => l.golden).length;

  const [totalInput, setTotalInput] = useState<string>('');
  const [goldenInput, setGoldenInput] = useState<string>('');
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const commitProgress = useCallback((total: number, golden: number) => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      debugSetProgress(total, golden);
      setTotalInput('');
      setGoldenInput('');
    }, 300);
  }, [debugSetProgress]);

  // Dragging state
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, posX: 0, posY: 0 });
  const hasDraggedRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load saved position
  useEffect(() => {
    try {
      const saved = localStorage.getItem('dev-btn-pos');
      if (saved) {
        const parsed = JSON.parse(saved);
        setPos({ x: parsed.x ?? 0, y: parsed.y ?? 0 });
      }
    } catch {}
  }, []);

  // Save position on change
  useEffect(() => {
    if (pos.x !== 0 || pos.y !== 0) {
      localStorage.setItem('dev-btn-pos', JSON.stringify(pos));
    }
  }, [pos]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (isOpen) return;
    hasDraggedRef.current = false;
    dragStartRef.current = { x: e.clientX, y: e.clientY, posX: pos.x, posY: pos.y };
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [isOpen, pos.x, pos.y]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      hasDraggedRef.current = true;
    }
    setPos({
      x: dragStartRef.current.posX + dx,
      y: dragStartRef.current.posY + dy,
    });
  }, [isDragging]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleClick = useCallback(() => {
    if (!hasDraggedRef.current) {
      setIsOpen((v) => !v);
    }
  }, []);

  if (process.env.NODE_ENV !== 'development') return null;

  const currentLabel = TIERS.find((t) => t.value === debugTierOverride)?.label ?? 'Real';
  const isOverriding = debugTierOverride !== null;

  return (
    <div
      ref={containerRef}
      className="fixed z-[9999]"
      style={{
        bottom: `calc(5rem + ${-pos.y}px)`,
        left: `calc(1rem + ${pos.x}px)`,
        touchAction: 'none',
      }}
    >
      {isOpen && (
        <div className="absolute bottom-12 left-0 bg-white rounded-lg shadow-xl border border-gray-200 p-3 min-w-[200px]">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
            Test as
          </p>
          {TIERS.map(({ value, label }) => (
            <button
              key={label}
              onClick={() => {
                setDebugTierOverride(value);
              }}
              className={`w-full text-left px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                debugTierOverride === value
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {label}
              {value === null && (
                <span className="text-[10px] text-gray-400 ml-1">(no override)</span>
              )}
            </button>
          ))}

          <div className="border-t border-gray-200 mt-3 pt-3">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
              Level
            </p>
            <LevelDebug />
          </div>

          <div className="border-t border-gray-200 mt-3 pt-3">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
              League Tier
            </p>
            <LeagueDebug />
          </div>

          <div className="border-t border-gray-200 mt-3 pt-3">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
              Lesson Progress <span className="text-gray-300 font-normal">({completedCount}/{totalLessons})</span>
            </p>

            {/* Total completed slider */}
            <div className="mb-2">
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] text-gray-500 font-medium">Completed</label>
                <input
                  type="number"
                  min={0}
                  max={totalLessons}
                  value={totalInput !== '' ? totalInput : completedCount}
                  onChange={(e) => {
                    setTotalInput(e.target.value);
                    const t = Math.max(0, Math.min(totalLessons, Number(e.target.value) || 0));
                    let g = goldenInput !== '' ? Number(goldenInput) || 0 : goldenCount;
                    if (g > t) { g = t; setGoldenInput(String(g)); }
                    commitProgress(t, g);
                  }}
                  className="w-12 px-1 py-0.5 text-[11px] border border-gray-200 rounded text-center focus:outline-none focus:ring-1 focus:ring-indigo-400 tabular-nums"
                />
              </div>
              <input
                type="range"
                min={0}
                max={totalLessons}
                value={totalInput !== '' ? Number(totalInput) || 0 : completedCount}
                onChange={(e) => {
                  const t = Number(e.target.value);
                  setTotalInput(String(t));
                  let g = goldenInput !== '' ? Number(goldenInput) || 0 : goldenCount;
                  if (g > t) { g = t; setGoldenInput(String(g)); }
                  commitProgress(t, g);
                }}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-indigo-500 bg-gray-200"
              />
            </div>

            {/* Golden slider — subset of completed */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] text-amber-600 font-semibold">Golden</label>
                <input
                  type="number"
                  min={0}
                  max={totalInput !== '' ? Number(totalInput) || 0 : completedCount}
                  value={goldenInput !== '' ? goldenInput : goldenCount}
                  onChange={(e) => {
                    const maxG = totalInput !== '' ? Number(totalInput) || 0 : completedCount;
                    setGoldenInput(e.target.value);
                    const g = Math.max(0, Math.min(maxG, Number(e.target.value) || 0));
                    const t = totalInput !== '' ? Number(totalInput) || 0 : completedCount;
                    commitProgress(t, g);
                  }}
                  className="w-12 px-1 py-0.5 text-[11px] border border-amber-200 rounded text-center bg-amber-50 focus:outline-none focus:ring-1 focus:ring-amber-400 tabular-nums"
                />
              </div>
              <input
                type="range"
                min={0}
                max={totalInput !== '' ? Number(totalInput) || 0 : completedCount}
                value={goldenInput !== '' ? Math.min(Number(goldenInput) || 0, totalInput !== '' ? Number(totalInput) || 0 : completedCount) : goldenCount}
                onChange={(e) => {
                  const g = Number(e.target.value);
                  setGoldenInput(String(g));
                  const t = totalInput !== '' ? Number(totalInput) || 0 : completedCount;
                  commitProgress(t, g);
                }}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-amber-500 bg-amber-100"
              />
            </div>
          </div>

          {/* Jump to Question */}
          <div className="border-t border-gray-200 mt-3 pt-3">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
              Jump to Question
            </p>
            <QuestionSearch />
          </div>

        </div>
      )}
      <button
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onClick={handleClick}
        className={`flex items-center justify-center shadow-lg transition-colors select-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: isOverriding
            ? 'rgba(245, 158, 11, 0.4)'
            : 'rgba(31, 41, 55, 0.35)',
          color: isOverriding ? '#FFF' : 'rgba(209, 213, 219, 0.9)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          fontSize: 16,
          border: 'none',
        }}
      >
        &#x1F527;
      </button>
    </div>
  );
}
