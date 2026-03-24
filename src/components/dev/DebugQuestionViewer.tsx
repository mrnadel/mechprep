'use client';

import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { loadUnitData, courseMeta } from '@/data/course/course-meta';
import { getUnitTheme } from '@/lib/unitThemes';
import QuestionCard from '@/components/lesson/QuestionCard';
import type { QuestionCardHandle } from '@/components/lesson/QuestionCard';
import type { CourseQuestion, Unit } from '@/data/course/types';

interface ResolvedQuestion {
  question: CourseQuestion;
  unitIndex: number;
  lessonIndex: number;
  unitTitle: string;
  lessonTitle: string;
}

/** Parse "u1-L3-Q16" → { unitNum: 1, lessonNum: 3, questionNum: 16 } */
function parseQuestionId(raw: string) {
  const m = raw.trim().match(/^u(\d+)-L(\d+)-Q(\d+)$/i);
  if (!m) return null;
  return {
    unitNum: parseInt(m[1], 10),
    lessonNum: parseInt(m[2], 10),
    questionNum: parseInt(m[3], 10),
  };
}

export function DebugQuestionViewer() {
  const [isOpen, setIsOpen] = useState(false);
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

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen && !resolved) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, resolved]);

  const handleGo = useCallback(async () => {
    const parsed = parseQuestionId(input);
    if (!parsed) {
      setError('Format: u1-L3-Q16');
      return;
    }

    const unitIndex = parsed.unitNum - 1;
    const lessonIndex = parsed.lessonNum - 1;

    if (unitIndex < 0 || unitIndex >= courseMeta.length) {
      setError(`Unit ${parsed.unitNum} doesn't exist (1-${courseMeta.length})`);
      return;
    }

    const unitMeta = courseMeta[unitIndex];
    if (lessonIndex < 0 || lessonIndex >= unitMeta.lessons.length) {
      setError(`Lesson ${parsed.lessonNum} doesn't exist in Unit ${parsed.unitNum} (1-${unitMeta.lessons.length})`);
      return;
    }

    setError('');
    setLoading(true);

    try {
      // Load unit data if not already cached
      let unit = loadedUnitsRef.current.get(unitIndex);
      if (!unit) {
        unit = await loadUnitData(unitIndex);
        loadedUnitsRef.current.set(unitIndex, unit);
      }

      const lesson = unit.lessons[lessonIndex];
      const questionId = `u${parsed.unitNum}-L${parsed.lessonNum}-Q${parsed.questionNum}`;
      const question = lesson.questions.find(q => q.id === questionId);

      if (!question) {
        const qIds = lesson.questions.map(q => q.id.split('-Q')[1]).join(', ');
        setError(`Q${parsed.questionNum} not found. Available: Q${qIds}`);
        setLoading(false);
        return;
      }

      setResolved({
        question,
        unitIndex,
        lessonIndex,
        unitTitle: unit.title,
        lessonTitle: lesson.title,
      });
      setAnswered(false);
      setHasSelection(false);
    } catch {
      setError('Failed to load unit data');
    }
    setLoading(false);
  }, [input]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleGo();
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
    }
  }, [handleGo]);

  const handleClose = useCallback(() => {
    setResolved(null);
    setError('');
    setAnswered(false);
    setHasSelection(false);
  }, []);

  // Prev/next navigation
  const adjacentIds = useMemo(() => {
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
  }, [resolved]);

  const goToQuestion = useCallback(async (id: string) => {
    setInput(id);
    const parsed = parseQuestionId(id);
    if (!parsed) return;

    const unitIndex = parsed.unitNum - 1;
    const lessonIndex = parsed.lessonNum - 1;
    const unit = loadedUnitsRef.current.get(unitIndex);
    if (!unit) return;

    const lesson = unit.lessons[lessonIndex];
    const question = lesson.questions.find(q => q.id === id);
    if (!question) return;

    setResolved({
      question,
      unitIndex,
      lessonIndex,
      unitTitle: unit.title,
      lessonTitle: lesson.title,
    });
    setAnswered(false);
    setHasSelection(false);
  }, []);

  // Global keyboard handler when viewing a question
  useEffect(() => {
    if (!resolved) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
        return;
      }
      if (e.key === 'ArrowLeft' && adjacentIds.prev) {
        e.preventDefault();
        goToQuestion(adjacentIds.prev);
        return;
      }
      if (e.key === 'ArrowRight' && adjacentIds.next) {
        e.preventDefault();
        goToQuestion(adjacentIds.next);
        return;
      }
      // Enter to check or reset
      if (e.key === 'Enter') {
        e.preventDefault();
        if (answered) {
          // Reset to try again
          setAnswered(false);
          setHasSelection(false);
          setRetryKey(k => k + 1);
        } else if (hasSelection) {
          questionRef.current?.check();
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [resolved, answered, hasSelection, adjacentIds, handleClose, goToQuestion]);

  if (process.env.NODE_ENV !== 'development') return null;

  const theme = resolved ? getUnitTheme(resolved.unitIndex) : null;
  const unitColor = theme?.color ?? '#6366F1';

  return (
    <>
      {/* Floating trigger button — bottom-left */}
      <button
        onClick={() => setIsOpen(v => !v)}
        className="fixed z-[9998] bottom-20 left-4 flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold shadow-lg transition-colors select-none cursor-pointer"
        style={{
          background: isOpen ? 'rgba(99, 102, 241, 0.5)' : 'rgba(31, 41, 55, 0.35)',
          color: isOpen ? '#FFF' : 'rgba(209, 213, 219, 0.9)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      >
        <span className="text-sm">🔍</span>
        Q
      </button>

      {/* Input panel */}
      {isOpen && !resolved && (
        <div className="fixed z-[9999] inset-0 flex items-center justify-center" onClick={() => setIsOpen(false)}>
          <div className="absolute inset-0 bg-black/30" />
          <div
            className="relative bg-white rounded-2xl shadow-2xl p-5"
            style={{ width: 360 }}
            onClick={e => e.stopPropagation()}
          >
            <p className="text-sm font-bold text-gray-700 mb-3">Jump to Question</p>
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => { setInput(e.target.value); setError(''); }}
                onKeyDown={handleKeyDown}
                placeholder="u1-L3-Q16"
                className="flex-1 px-3 py-2 rounded-xl border-2 border-gray-200 text-sm font-mono font-bold focus:outline-none focus:border-indigo-400 transition-colors"
                spellCheck={false}
              />
              <button
                onClick={handleGo}
                disabled={loading || !input.trim()}
                className="px-4 py-2 rounded-xl text-sm font-bold text-white transition-colors disabled:opacity-40"
                style={{ background: '#6366F1' }}
              >
                {loading ? '...' : 'Go'}
              </button>
            </div>
            {error && (
              <p className="mt-2 text-xs font-semibold text-red-500">{error}</p>
            )}
            <p className="mt-3 text-[10px] text-gray-400 font-medium">
              Format: u{'{unit}'}-L{'{lesson}'}-Q{'{question}'} — e.g. u1-L3-Q16
            </p>
          </div>
        </div>
      )}

      {/* Question preview overlay */}
      {resolved && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#FAFAFA]">
          <div className="w-full h-full max-w-3xl flex flex-col bg-[#FAFAFA] lg:shadow-lg lg:border-x lg:border-gray-200">
            {/* Top bar */}
            <div
              className="flex items-center"
              style={{
                padding: '10px 16px',
                gap: 12,
                borderBottom: '2px solid #E5E5E5',
                background: 'white',
              }}
            >
              <button
                onClick={handleClose}
                className="flex-shrink-0 flex items-center justify-center transition-transform active:scale-90"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: '#F5F5F5',
                  border: 'none',
                  cursor: 'pointer',
                }}
                aria-label="Close preview"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 4l8 8M12 4l-8 8" stroke="#AFAFAF" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </button>

              {/* Question info */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-gray-400 truncate">
                  {resolved.unitTitle} &rarr; {resolved.lessonTitle}
                </p>
                <p className="text-sm font-extrabold text-gray-700 font-mono">
                  {resolved.question.id}
                </p>
              </div>

              {/* Type badge */}
              <span
                className="flex-shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg"
                style={{ background: theme?.bg, color: theme?.dark }}
              >
                {resolved.question.type}
              </span>

              {/* Debug label */}
              <span
                className="flex-shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg"
                style={{ background: '#FEE2E2', color: '#DC2626' }}
              >
                DEBUG
              </span>
            </div>

            {/* Question area */}
            <div className="flex-1 overflow-y-auto" style={{ padding: '16px 20px 20px' }}>
              <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
                <QuestionCard
                  key={`${resolved.question.id}-${retryKey}`}
                  ref={questionRef}
                  question={resolved.question}
                  onAnswer={() => setAnswered(true)}
                  onSelectionChange={setHasSelection}
                  answered={answered}
                  unitColor={unitColor}
                />
              </div>
            </div>

            {/* Bottom bar */}
            <div
              style={{
                padding: '12px 20px',
                paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 16px)',
                borderTop: '2px solid #E5E5E5',
                background: 'white',
              }}
            >
              <div className="flex items-center gap-2.5">
                {/* Prev */}
                <button
                  onClick={() => adjacentIds.prev && goToQuestion(adjacentIds.prev)}
                  disabled={!adjacentIds.prev}
                  className="flex-shrink-0 flex items-center justify-center transition-transform active:scale-90 disabled:opacity-30"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: '#F5F5F5',
                    border: '2px solid #E5E5E5',
                    boxShadow: '0 3px 0 #CCCCCC',
                    cursor: adjacentIds.prev ? 'pointer' : 'default',
                  }}
                  title="Previous question (←)"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M15 18l-6-6 6-6" stroke="#AFAFAF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {/* Check / Reset button */}
                {!answered ? (
                  <button
                    onClick={() => questionRef.current?.check()}
                    disabled={!hasSelection}
                    className="flex-1 transition-transform active:scale-[0.98]"
                    style={{
                      padding: '14px 0',
                      borderRadius: 16,
                      fontSize: 15,
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: 0.8,
                      background: hasSelection ? unitColor : '#E5E5E5',
                      color: hasSelection ? '#FFFFFF' : '#AFAFAF',
                      boxShadow: hasSelection
                        ? `0 4px 0 ${theme?.dark ?? '#4F46E5'}`
                        : '0 4px 0 #CCCCCC',
                      border: 'none',
                      cursor: hasSelection ? 'pointer' : 'default',
                    }}
                  >
                    Check
                  </button>
                ) : (
                  <button
                    onClick={() => { setAnswered(false); setHasSelection(false); setRetryKey(k => k + 1); }}
                    className="flex-1 transition-transform active:scale-[0.98]"
                    style={{
                      padding: '14px 0',
                      borderRadius: 16,
                      fontSize: 15,
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: 0.8,
                      background: unitColor,
                      color: '#FFFFFF',
                      boxShadow: `0 4px 0 ${theme?.dark ?? '#4F46E5'}`,
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Try Again
                  </button>
                )}

                {/* Next */}
                <button
                  onClick={() => adjacentIds.next && goToQuestion(adjacentIds.next)}
                  disabled={!adjacentIds.next}
                  className="flex-shrink-0 flex items-center justify-center transition-transform active:scale-90 disabled:opacity-30"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: '#F5F5F5',
                    border: '2px solid #E5E5E5',
                    boxShadow: '0 3px 0 #CCCCCC',
                    cursor: adjacentIds.next ? 'pointer' : 'default',
                  }}
                  title="Next question (→)"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18l6-6-6-6" stroke="#AFAFAF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
