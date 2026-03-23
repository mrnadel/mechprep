// src/components/calculator/EngineeringCalculator.tsx
'use client';

import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { evaluate } from './calcEngine';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  accentColor?: string;    // unit theme color (defaults to indigo)
  accentDark?: string;     // darker shade for shadows
}

interface HistoryEntry {
  expr: string;
  result: string;
}

const STORAGE_KEY = 'calc-history';

function loadHistory(): HistoryEntry[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveHistory(h: HistoryEntry[]) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(h));
  } catch { /* ignore */ }
}

export default function EngineeringCalculator({ isOpen, onClose, accentColor = '#6366F1', accentDark = '#4338CA' }: Props) {
  const [expression, setExpression] = useState('');
  const [isDegrees, setIsDegrees] = useState(true);
  const [history, setHistory] = useState<HistoryEntry[]>(loadHistory);
  const [showHistory, setShowHistory] = useState(false);
  const [error, setError] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Clear error when expression changes
  useEffect(() => { setError(false); }, [expression]);

  // Live result preview
  const liveResult = useMemo(() => {
    if (!expression.trim()) return '';
    const r = evaluate(expression, isDegrees);
    if (r === null) return '';
    return String(r);
  }, [expression, isDegrees]);

  const lastResult = history.length > 0 ? history[0].result : null;

  const append = useCallback((text: string) => {
    setExpression(prev => prev + text);
  }, []);

  const handleClear = useCallback(() => {
    setExpression('');
  }, []);

  const handleDelete = useCallback(() => {
    setExpression(prev => {
      // Remove trailing named function (e.g., "sin(") as a unit
      const fnMatch = prev.match(/(sin|cos|tan|sqrt|log|ln|abs)\($/);
      if (fnMatch) return prev.slice(0, -fnMatch[0].length);
      return prev.slice(0, -1);
    });
  }, []);

  const handleEvaluate = useCallback(() => {
    if (!expression.trim()) return;
    const r = evaluate(expression, isDegrees);
    if (r === null) {
      setError(true); // show "Error" in display
      return;
    }
    const entry: HistoryEntry = { expr: expression, result: String(r) };
    const newHistory = [entry, ...history].slice(0, 5);
    setHistory(newHistory);
    saveHistory(newHistory);
    setExpression(String(r));
  }, [expression, isDegrees, history]);

  const handleAns = useCallback(() => {
    if (lastResult) append(lastResult);
  }, [lastResult, append]);

  const handleNegate = useCallback(() => {
    setExpression(prev => {
      if (!prev) return '-';
      if (prev.startsWith('-')) return prev.slice(1);
      return '-' + prev;
    });
  }, []);

  // Keyboard handler — used via onKeyDown on both desktop and mobile panels.
  // The global question handler in LessonView/SessionView checks
  // document.activeElement to skip when calculator is focused.
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      (e.target as HTMLElement).blur(); // unfocus calculator, return keyboard to question
      return;
    }
    if (e.key === 'Enter' || e.key === '=') {
      e.preventDefault();
      handleEvaluate();
      return;
    }
    if (e.key === 'Backspace') {
      e.preventDefault();
      handleDelete();
      return;
    }
    if (/^[0-9.+\-*/^()]$/.test(e.key)) {
      e.preventDefault();
      append(e.key);
    }
  }, [handleEvaluate, handleDelete, append]);

  // Button definitions
  const buttons = [
    // Row 1: functions
    { label: 'sin', action: () => append('sin('), style: 'fn' },
    { label: 'cos', action: () => append('cos('), style: 'fn' },
    { label: 'tan', action: () => append('tan('), style: 'fn' },
    { label: '(', action: () => append('('), style: 'op' },
    { label: ')', action: () => append(')'), style: 'op' },
    // Row 2: scientific
    { label: 'ln', action: () => append('ln('), style: 'fn' },
    { label: 'log', action: () => append('log('), style: 'fn' },
    { label: '√', action: () => append('sqrt('), style: 'fn', ariaLabel: 'square root' },
    { label: 'x²', action: () => append('^2'), style: 'fn', ariaLabel: 'squared' },
    { label: 'xⁿ', action: () => append('^'), style: 'fn', ariaLabel: 'power' },
    // Row 3: digits + ops
    { label: '7', action: () => append('7'), style: 'digit' },
    { label: '8', action: () => append('8'), style: 'digit' },
    { label: '9', action: () => append('9'), style: 'digit' },
    { label: '÷', action: () => append('/'), style: 'op', ariaLabel: 'divide' },
    { label: 'DEL', action: handleDelete, style: 'util' },
    // Row 4
    { label: '4', action: () => append('4'), style: 'digit' },
    { label: '5', action: () => append('5'), style: 'digit' },
    { label: '6', action: () => append('6'), style: 'digit' },
    { label: '×', action: () => append('*'), style: 'op', ariaLabel: 'multiply' },
    { label: 'π', action: () => append('pi'), style: 'const', ariaLabel: 'pi' },
    // Row 5
    { label: '1', action: () => append('1'), style: 'digit' },
    { label: '2', action: () => append('2'), style: 'digit' },
    { label: '3', action: () => append('3'), style: 'digit' },
    { label: '−', action: () => append('-'), style: 'op', ariaLabel: 'subtract' },
    { label: 'e', action: () => append('e'), style: 'const', ariaLabel: 'euler number' },
    // Row 6
    { label: '0', action: () => append('0'), style: 'digit' },
    { label: '.', action: () => append('.'), style: 'digit' },
    { label: '±', action: handleNegate, style: 'util', ariaLabel: 'negate' },
    { label: '+', action: () => append('+'), style: 'op', ariaLabel: 'add' },
    { label: '=', action: handleEvaluate, style: 'equals', ariaLabel: 'equals' },
  ];

  const getButtonStyle = (style: string) => {
    const base = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      border: 'none',
      cursor: 'pointer',
      fontWeight: 800 as const,
      fontFamily: 'inherit',
      transition: 'all 0.1s ease',
      height: 42,
    };
    switch (style) {
      case 'digit':
        return { ...base, background: '#F5F5F5', color: '#3C3C3C', fontSize: 16 };
      case 'op':
        return { ...base, background: '#EEF2FF', color: '#4338CA', fontSize: 16 };
      case 'fn':
        return { ...base, background: '#F5F5F5', color: '#3C3C3C', fontSize: 11 };
      case 'const':
        return { ...base, background: '#FFF9E8', color: '#B56E00', fontSize: 14 };
      case 'util':
        return { ...base, background: '#F5F5F5', color: '#AFAFAF', fontSize: 11 };
      case 'equals':
        return { ...base, background: accentColor, color: '#FFFFFF', fontSize: 18 };
      default:
        return base;
    }
  };

  // Desktop: fixed right panel. Mobile: bottom sheet.
  // Detect via CSS media queries at render (useMediaQuery would add complexity for little gain;
  // instead use responsive CSS classes).
  return (
    <>
      {/* Desktop panel */}
      <motion.div
        ref={panelRef}
        tabIndex={0}
        role="complementary"
        aria-label="Engineering calculator"
        onKeyDown={handleKeyDown}
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        className="hidden lg:flex"
        style={{
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
          width: 280,
          zIndex: 55,
          background: 'white',
          borderLeft: '2px solid #E5E5E5',
          flexDirection: 'column',
          outline: 'none',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '12px 12px 8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #F0F0F0',
        }}>
          <span style={{ fontSize: 13, fontWeight: 800, color: '#3C3C3C' }}>Calculator</span>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {/* DEG/RAD toggle */}
            <button
              onClick={() => setIsDegrees(d => !d)}
              style={{
                padding: '3px 8px',
                borderRadius: 8,
                fontSize: 10,
                fontWeight: 800,
                background: isDegrees ? '#EEF2FF' : '#F5F5F5',
                color: isDegrees ? '#4338CA' : '#AFAFAF',
                border: 'none',
                cursor: 'pointer',
                letterSpacing: 0.5,
              }}
            >
              {isDegrees ? 'DEG' : 'RAD'}
            </button>
            <button
              onClick={onClose}
              aria-label="Close calculator"
              style={{
                width: 28, height: 28, borderRadius: 8,
                background: '#F5F5F5', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M4 4l8 8M12 4l-8 8" stroke="#AFAFAF" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Display */}
        <div style={{ padding: '10px 12px 6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <button
              onClick={handleClear}
              style={{
                fontSize: 10, fontWeight: 800, color: '#FF4B4B',
                background: 'none', border: 'none', cursor: 'pointer', padding: '2px 6px',
              }}
            >
              AC
            </button>
            <button
              onClick={() => append('g')}
              aria-label="gravity 9.81"
              title="g = 9.81 m/s²"
              style={{
                fontSize: 10, fontWeight: 800, color: '#B56E00',
                background: 'none', border: 'none', cursor: 'pointer', padding: '2px 6px',
              }}
            >
              g
            </button>
            <button
              onClick={handleAns}
              disabled={!lastResult}
              style={{
                fontSize: 10, fontWeight: 800,
                color: lastResult ? '#6366F1' : '#CFCFCF',
                background: 'none', border: 'none',
                cursor: lastResult ? 'pointer' : 'default',
                padding: '2px 6px',
              }}
            >
              ANS
            </button>
          </div>
          <div style={{
            background: '#FAFAFA',
            borderRadius: 10,
            padding: '8px 12px',
            border: '1.5px solid #E5E5E5',
            minHeight: 56,
          }}>
            <div style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: 16, fontWeight: 700, color: '#3C3C3C',
              textAlign: 'right', wordBreak: 'break-all',
              minHeight: 22,
            }}>
              {expression || '0'}
            </div>
            {(liveResult || error) && (
              <div style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: 13, fontWeight: 600,
                color: error ? '#FF4B4B' : '#AFAFAF',
                textAlign: 'right', marginTop: 2,
              }}>
                {error ? 'Error' : `= ${liveResult}`}
              </div>
            )}
          </div>
        </div>

        {/* History toggle */}
        {history.length > 0 && (
          <div style={{ padding: '0 12px' }}>
            <button
              onClick={() => setShowHistory(h => !h)}
              style={{
                fontSize: 10, fontWeight: 700, color: '#AFAFAF',
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '4px 0', display: 'flex', alignItems: 'center', gap: 4,
              }}
            >
              <svg
                width="8" height="8" viewBox="0 0 8 8" fill="none"
                style={{ transform: showHistory ? 'rotate(90deg)' : 'none', transition: 'transform 0.15s' }}
              >
                <path d="M2 1l4 3-4 3z" fill="#AFAFAF" />
              </svg>
              History ({history.length})
            </button>
            {showHistory && (
              <div style={{ maxHeight: 80, overflowY: 'auto', marginBottom: 4 }}>
                {history.map((h, i) => (
                  <button
                    key={i}
                    onClick={() => setExpression(h.result)}
                    style={{
                      display: 'block', width: '100%', textAlign: 'right',
                      fontSize: 11, fontWeight: 600, fontFamily: 'var(--font-mono), monospace',
                      color: '#AFAFAF', background: 'none', border: 'none',
                      cursor: 'pointer', padding: '2px 0',
                    }}
                  >
                    <span style={{ color: '#CFCFCF' }}>{h.expr} = </span>
                    <span style={{ color: '#3C3C3C' }}>{h.result}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Keypad */}
        <div style={{
          padding: '8px 10px',
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 4,
          marginTop: 'auto',
          paddingBottom: 16,
        }}>
          {buttons.map((btn) => (
            <button
              key={btn.label}
              onClick={btn.action}
              aria-label={btn.ariaLabel || btn.label}
              style={getButtonStyle(btn.style)}
              className="active:scale-95 transition-transform"
            >
              {btn.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Mobile bottom sheet */}
      <motion.div
        tabIndex={0}
        role="complementary"
        aria-label="Engineering calculator"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        className="lg:hidden"
        onKeyDown={handleKeyDown}
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 55,
          background: 'white',
          borderTop: '2px solid #E5E5E5',
          borderRadius: '16px 16px 0 0',
          maxHeight: '55vh',
          overflowY: 'auto',
          outline: 'none',
        }}
      >
        {/* Drag handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0 4px' }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: '#E5E5E5' }} />
        </div>

        {/* Header */}
        <div style={{
          padding: '4px 16px 8px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ fontSize: 13, fontWeight: 800, color: '#3C3C3C' }}>Calculator</span>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button
              onClick={() => setIsDegrees(d => !d)}
              style={{
                padding: '3px 8px', borderRadius: 8, fontSize: 10, fontWeight: 800,
                background: isDegrees ? '#EEF2FF' : '#F5F5F5',
                color: isDegrees ? '#4338CA' : '#AFAFAF',
                border: 'none', cursor: 'pointer', letterSpacing: 0.5,
              }}
            >
              {isDegrees ? 'DEG' : 'RAD'}
            </button>
            <button
              onClick={handleClear}
              style={{ fontSize: 10, fontWeight: 800, color: '#FF4B4B', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              AC
            </button>
            <button
              onClick={() => append('g')}
              aria-label="gravity 9.81"
              style={{ fontSize: 10, fontWeight: 800, color: '#B56E00', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              g
            </button>
            <button
              onClick={handleAns}
              disabled={!lastResult}
              style={{
                fontSize: 10, fontWeight: 800,
                color: lastResult ? '#6366F1' : '#CFCFCF',
                background: 'none', border: 'none',
                cursor: lastResult ? 'pointer' : 'default',
              }}
            >
              ANS
            </button>
            <button
              onClick={onClose}
              aria-label="Close calculator"
              style={{
                width: 28, height: 28, borderRadius: 8,
                background: '#F5F5F5', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M4 4l8 8M12 4l-8 8" stroke="#AFAFAF" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Display */}
        <div style={{ padding: '0 16px 6px' }}>
          <div style={{
            background: '#FAFAFA', borderRadius: 10,
            padding: '8px 12px', border: '1.5px solid #E5E5E5',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: 18, fontWeight: 700, color: '#3C3C3C',
              textAlign: 'right', wordBreak: 'break-all', minHeight: 24,
            }}>
              {expression || '0'}
            </div>
            {(liveResult || error) && (
              <div style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: 14, fontWeight: 600,
                color: error ? '#FF4B4B' : '#AFAFAF',
                textAlign: 'right', marginTop: 2,
              }}>
                {error ? 'Error' : `= ${liveResult}`}
              </div>
            )}
          </div>
        </div>

        {/* Keypad */}
        <div style={{
          padding: '6px 12px',
          paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 12px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 4,
        }}>
          {buttons.map((btn) => (
            <button
              key={btn.label}
              onClick={btn.action}
              aria-label={btn.ariaLabel || btn.label}
              style={getButtonStyle(btn.style)}
              className="active:scale-95 transition-transform"
            >
              {btn.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Mobile backdrop — tap to close */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="lg:hidden"
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 54,
          background: 'rgba(0,0,0,0.1)',
        }}
      />
    </>
  );
}
