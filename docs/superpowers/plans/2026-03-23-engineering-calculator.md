# Engineering Calculator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a slide-out engineering calculator panel to the question UI (LessonView + SessionView) so engineers can compute answers without leaving the question screen.

**Architecture:** A pure expression parser (`calcEngine.ts`) handles safe math evaluation. A React component (`EngineeringCalculator.tsx`) renders the calculator panel with display, keypad, and history. The panel is integrated as a sibling of the `max-w-3xl` wrapper in both LessonView and SessionView, using `position: fixed` to overlay the right margin on desktop and a bottom sheet on mobile. Focus-based keyboard routing prevents conflicts with existing question shortcuts.

**Tech Stack:** React 19, TypeScript, Framer Motion (animations), Vitest (tests), sessionStorage (history persistence)

**Spec:** `docs/superpowers/specs/2026-03-23-engineering-calculator-design.md`

---

## File Structure

| File | Responsibility |
|------|---------------|
| `src/components/calculator/calcEngine.ts` | Pure expression tokenizer + recursive descent parser/evaluator. No React. No dependencies. |
| `src/components/calculator/EngineeringCalculator.tsx` | Calculator panel UI: display, keypad grid, history, open/close animation. Self-contained `'use client'` component. |
| `src/__tests__/lib/calcEngine.test.ts` | Unit tests for the expression parser |
| `src/components/lesson/LessonView.tsx` | **Modify:** Add calculator toggle button to top bar, render `EngineeringCalculator` as sibling of content wrapper, update keyboard handler to respect calculator focus |
| `src/components/session/SessionView.tsx` | **Modify:** Same changes as LessonView |

---

## Task 1: Expression Parser — Core Arithmetic

**Files:**
- Create: `src/components/calculator/calcEngine.ts`
- Create: `src/__tests__/lib/calcEngine.test.ts`

- [ ] **Step 1: Write failing tests for basic arithmetic**

```typescript
// src/__tests__/lib/calcEngine.test.ts
import { evaluate } from '@/components/calculator/calcEngine';

describe('calcEngine', () => {
  describe('basic arithmetic', () => {
    it('evaluates addition', () => {
      expect(evaluate('2+3')).toBe(5);
    });
    it('evaluates subtraction', () => {
      expect(evaluate('10-4')).toBe(6);
    });
    it('evaluates multiplication', () => {
      expect(evaluate('3*4')).toBe(12);
    });
    it('evaluates division', () => {
      expect(evaluate('15/3')).toBe(5);
    });
    it('respects operator precedence', () => {
      expect(evaluate('2+3*4')).toBe(14);
    });
    it('handles parentheses', () => {
      expect(evaluate('(2+3)*4')).toBe(20);
    });
    it('handles nested parentheses', () => {
      expect(evaluate('((2+3)*4)+1')).toBe(21);
    });
    it('handles decimals', () => {
      expect(evaluate('1.5+2.5')).toBe(4);
    });
    it('handles negative numbers', () => {
      expect(evaluate('-5+3')).toBe(-2);
    });
    it('handles unary minus', () => {
      expect(evaluate('-(3+2)')).toBe(-5);
    });
  });

  describe('error handling', () => {
    it('returns null for empty input', () => {
      expect(evaluate('')).toBeNull();
    });
    it('returns null for unmatched parentheses', () => {
      expect(evaluate('(2+3')).toBeNull();
    });
    it('returns null for division by zero', () => {
      expect(evaluate('5/0')).toBeNull();
    });
    it('returns null for invalid expression', () => {
      expect(evaluate('2++3')).toBeNull();
    });
    it('returns null for gibberish', () => {
      expect(evaluate('abc')).toBeNull();
    });
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run src/__tests__/lib/calcEngine.test.ts`
Expected: FAIL — module not found

- [ ] **Step 3: Implement the expression parser**

```typescript
// src/components/calculator/calcEngine.ts

// Recursive descent parser for safe math evaluation.
// Supports: +, -, *, /, parentheses, unary minus, decimals.
// Returns null on any error (malformed input, division by zero).

export function evaluate(expr: string, isDegrees = false): number | null {
  const tokens = tokenize(expr);
  if (!tokens) return null;
  try {
    const ctx = { tokens, pos: 0, isDegrees };
    const result = parseExpression(ctx);
    if (ctx.pos !== ctx.tokens.length) return null; // leftover tokens
    if (!isFinite(result)) return null;
    return Math.round(result * 1e12) / 1e12; // avoid floating point noise
  } catch {
    return null;
  }
}

type Token =
  | { type: 'number'; value: number }
  | { type: 'op'; value: string }
  | { type: 'paren'; value: '(' | ')' }
  | { type: 'fn'; value: string };

interface Ctx {
  tokens: Token[];
  pos: number;
  isDegrees: boolean;
}

function tokenize(expr: string): Token[] | null {
  const tokens: Token[] = [];
  let i = 0;
  const s = expr.replace(/\s/g, '');
  if (s.length === 0) return null;

  while (i < s.length) {
    const ch = s[i];

    // Number (including decimals)
    if (/[0-9.]/.test(ch)) {
      let num = '';
      while (i < s.length && /[0-9.]/.test(s[i])) {
        num += s[i++];
      }
      const val = parseFloat(num);
      if (isNaN(val)) return null;
      tokens.push({ type: 'number', value: val });
      continue;
    }

    // Named functions / constants
    if (/[a-z]/i.test(ch)) {
      let name = '';
      while (i < s.length && /[a-z]/i.test(s[i])) {
        name += s[i++];
      }
      const lower = name.toLowerCase();
      // Constants
      if (lower === 'pi' || lower === 'π') {
        tokens.push({ type: 'number', value: Math.PI });
      } else if (lower === 'e' && (i >= s.length || s[i] !== '(')) {
        // 'e' not followed by '(' is Euler's number; otherwise treat as function name error
        tokens.push({ type: 'number', value: Math.E });
      } else if (lower === 'g') {
        tokens.push({ type: 'number', value: 9.81 });
      } else if (['sin', 'cos', 'tan', 'sqrt', 'log', 'ln', 'abs'].includes(lower)) {
        tokens.push({ type: 'fn', value: lower });
      } else {
        return null; // unknown identifier
      }
      continue;
    }

    // Operators
    if ('+-*/^'.includes(ch)) {
      tokens.push({ type: 'op', value: ch });
      i++;
      continue;
    }

    // Parentheses
    if (ch === '(' || ch === ')') {
      tokens.push({ type: 'paren', value: ch });
      i++;
      continue;
    }

    // Unknown character
    return null;
  }

  return tokens;
}

function peek(ctx: Ctx): Token | null {
  return ctx.tokens[ctx.pos] ?? null;
}

function consume(ctx: Ctx): Token {
  return ctx.tokens[ctx.pos++];
}

// expression = term (('+' | '-') term)*
function parseExpression(ctx: Ctx): number {
  let left = parseTerm(ctx);
  while (peek(ctx)?.type === 'op' && (peek(ctx)!.value === '+' || peek(ctx)!.value === '-')) {
    const op = consume(ctx).value;
    const right = parseTerm(ctx);
    left = op === '+' ? left + right : left - right;
  }
  return left;
}

// term = power (('*' | '/') power)*
function parseTerm(ctx: Ctx): number {
  let left = parsePower(ctx);
  while (peek(ctx)?.type === 'op' && (peek(ctx)!.value === '*' || peek(ctx)!.value === '/')) {
    const op = consume(ctx).value;
    const right = parsePower(ctx);
    if (op === '/') {
      if (right === 0) throw new Error('div/0');
      left = left / right;
    } else {
      left = left * right;
    }
  }
  return left;
}

// power = unary ('^' unary)*
function parsePower(ctx: Ctx): number {
  const base = parseUnary(ctx);
  if (peek(ctx)?.type === 'op' && peek(ctx)!.value === '^') {
    consume(ctx);
    const exp = parseUnary(ctx);
    return Math.pow(base, exp);
  }
  return base;
}

// unary = ('-' unary) | atom
function parseUnary(ctx: Ctx): number {
  if (peek(ctx)?.type === 'op' && peek(ctx)!.value === '-') {
    consume(ctx);
    return -parseUnary(ctx);
  }
  return parseAtom(ctx);
}

// atom = number | '(' expression ')' | function '(' expression ')'
function parseAtom(ctx: Ctx): number {
  const tok = peek(ctx);
  if (!tok) throw new Error('unexpected end');

  if (tok.type === 'number') {
    consume(ctx);
    return tok.value;
  }

  if (tok.type === 'fn') {
    const fn = consume(ctx).value as string;
    if (peek(ctx)?.type !== 'paren' || peek(ctx)!.value !== '(') throw new Error('expected (');
    consume(ctx); // '('
    const arg = parseExpression(ctx);
    if (peek(ctx)?.type !== 'paren' || peek(ctx)!.value !== ')') throw new Error('expected )');
    consume(ctx); // ')'
    return applyFn(fn, arg, ctx.isDegrees);
  }

  if (tok.type === 'paren' && tok.value === '(') {
    consume(ctx); // '('
    const val = parseExpression(ctx);
    if (peek(ctx)?.type !== 'paren' || peek(ctx)!.value !== ')') throw new Error('expected )');
    consume(ctx); // ')'
    return val;
  }

  throw new Error('unexpected token');
}

function applyFn(fn: string, arg: number, isDegrees: boolean): number {
  // Convert degrees to radians for trig functions
  const toRad = (x: number) => isDegrees ? x * Math.PI / 180 : x;
  switch (fn) {
    case 'sqrt': return Math.sqrt(arg);
    case 'abs': return Math.abs(arg);
    case 'log': return Math.log10(arg);
    case 'ln': return Math.log(arg);
    case 'sin': return Math.sin(toRad(arg));
    case 'cos': return Math.cos(toRad(arg));
    case 'tan': return Math.tan(toRad(arg));
    default: throw new Error('unknown fn');
  }
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run src/__tests__/lib/calcEngine.test.ts`
Expected: All tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/calculator/calcEngine.ts src/__tests__/lib/calcEngine.test.ts
git commit -m "feat(calculator): add expression parser with basic arithmetic and error handling"
```

---

## Task 2: Expression Parser — Scientific Functions

**Files:**
- Modify: `src/__tests__/lib/calcEngine.test.ts`
- Modify: `src/components/calculator/calcEngine.ts` (already implemented above — tests verify it)

- [ ] **Step 1: Add tests for scientific functions, constants, and degree mode**

Append to `src/__tests__/lib/calcEngine.test.ts`:

```typescript
describe('scientific functions', () => {
  it('evaluates sqrt', () => {
    expect(evaluate('sqrt(16)')).toBe(4);
  });
  it('evaluates power with ^', () => {
    expect(evaluate('2^3')).toBe(8);
  });
  it('evaluates log base 10', () => {
    expect(evaluate('log(100)')).toBe(2);
  });
  it('evaluates natural log', () => {
    expect(evaluate('ln(e)')).toBeCloseTo(1, 10);
  });
  it('evaluates sin (radians)', () => {
    expect(evaluate('sin(0)')).toBe(0);
  });
  it('evaluates cos (radians)', () => {
    expect(evaluate('cos(0)')).toBe(1);
  });
  it('evaluates nested functions', () => {
    expect(evaluate('sqrt(abs(-16))')).toBe(4);
  });
});

describe('constants', () => {
  it('evaluates pi', () => {
    expect(evaluate('pi')).toBeCloseTo(3.14159265, 6);
  });
  it('evaluates e', () => {
    expect(evaluate('e')).toBeCloseTo(2.71828, 4);
  });
  it('evaluates g', () => {
    expect(evaluate('g')).toBe(9.81);
  });
  it('uses pi in expressions', () => {
    expect(evaluate('2*pi')).toBeCloseTo(6.28318, 4);
  });
});

describe('degree mode', () => {
  it('evaluates sin(90) in degrees', () => {
    expect(evaluate('sin(90)', true)).toBeCloseTo(1, 10);
  });
  it('evaluates cos(0) in degrees', () => {
    expect(evaluate('cos(0)', true)).toBe(1);
  });
  it('evaluates tan(45) in degrees', () => {
    expect(evaluate('tan(45)', true)).toBeCloseTo(1, 10);
  });
  it('handles nested expressions in degree trig', () => {
    expect(evaluate('sin(45+45)', true)).toBeCloseTo(1, 10);
  });
  it('handles trig of complex expression in degrees', () => {
    expect(evaluate('sin(sqrt(8100))', true)).toBeCloseTo(1, 10); // sqrt(8100)=90
  });
});

describe('abs function', () => {
  it('evaluates abs of negative', () => {
    expect(evaluate('abs(-5)')).toBe(5);
  });
});

describe('chained operations', () => {
  it('handles chained addition', () => {
    expect(evaluate('2+3+4')).toBe(9);
  });
  it('handles chained multiplication', () => {
    expect(evaluate('2*3*4')).toBe(24);
  });
  it('handles mixed chained ops with precedence', () => {
    expect(evaluate('2+3*4-1')).toBe(13);
  });
});
```

- [ ] **Step 2: Run tests to verify they pass**

Run: `npx vitest run src/__tests__/lib/calcEngine.test.ts`
Expected: All tests PASS (implementation was included in Task 1)

- [ ] **Step 3: Commit**

```bash
git add src/__tests__/lib/calcEngine.test.ts
git commit -m "test(calculator): add scientific functions, constants, and degree mode tests"
```

---

## Task 3: Calculator UI Component

**Files:**
- Create: `src/components/calculator/EngineeringCalculator.tsx`

- [ ] **Step 1: Build the calculator panel component**

```tsx
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
```

- [ ] **Step 2: Verify component builds without errors**

Run: `npx next build 2>&1 | head -30` (or `npx tsc --noEmit`)
Expected: No TypeScript errors

- [ ] **Step 3: Commit**

```bash
git add src/components/calculator/EngineeringCalculator.tsx
git commit -m "feat(calculator): add engineering calculator UI component with keypad, history, and responsive layout"
```

---

## Task 4: Integrate Calculator into LessonView

**Files:**
- Modify: `src/components/lesson/LessonView.tsx`

- [ ] **Step 1: Add calculator toggle state and import**

At the top of `LessonView.tsx`, add the import (AnimatePresence is already imported):

```typescript
import EngineeringCalculator from '@/components/calculator/EngineeringCalculator';
```

Inside the component, add state:

```typescript
const [isCalcOpen, setIsCalcOpen] = useState(false);
```

- [ ] **Step 2: Add calculator toggle button to the top bar**

Insert after the XP counter `motion.div` and before the closing `</div>` of the top bar:

```tsx
{/* Calculator toggle */}
<button
  onClick={() => setIsCalcOpen(c => !c)}
  className="flex-shrink-0 flex items-center justify-center transition-transform active:scale-90"
  style={{
    width: 36,
    height: 36,
    borderRadius: 12,
    background: isCalcOpen ? theme.bg : '#F5F5F5',
    border: isCalcOpen ? `1.5px solid ${unitColor}` : '1.5px solid transparent',
    cursor: 'pointer',
  }}
  aria-label={isCalcOpen ? 'Close calculator' : 'Open calculator'}
  title="Calculator (`)"
>
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <rect x="4" y="2" width="16" height="20" rx="2" stroke={isCalcOpen ? unitColor : '#AFAFAF'} strokeWidth="2" />
    <rect x="7" y="5" width="10" height="4" rx="1" fill={isCalcOpen ? unitColor : '#AFAFAF'} />
    <circle cx="8.5" cy="13" r="1" fill={isCalcOpen ? unitColor : '#AFAFAF'} />
    <circle cx="12" cy="13" r="1" fill={isCalcOpen ? unitColor : '#AFAFAF'} />
    <circle cx="15.5" cy="13" r="1" fill={isCalcOpen ? unitColor : '#AFAFAF'} />
    <circle cx="8.5" cy="17" r="1" fill={isCalcOpen ? unitColor : '#AFAFAF'} />
    <circle cx="12" cy="17" r="1" fill={isCalcOpen ? unitColor : '#AFAFAF'} />
    <circle cx="15.5" cy="17" r="1" fill={isCalcOpen ? unitColor : '#AFAFAF'} />
  </svg>
</button>
```

- [ ] **Step 3: Render the calculator panel as sibling of the content wrapper**

Inside the `motion.div[key="lesson-view"]`, after the closing `</div>{/* end centered wrapper */}` and before the exit confirmation modal, add:

```tsx
{/* Calculator panel */}
<AnimatePresence>
  {isCalcOpen && (
    <EngineeringCalculator
      isOpen={isCalcOpen}
      onClose={() => setIsCalcOpen(false)}
      accentColor={unitColor}
      accentDark={theme.dark}
    />
  )}
</AnimatePresence>
```

- [ ] **Step 4: Update keyboard handler to respect calculator focus and add backtick toggle**

In the existing `handleKeyDown` effect, add these two checks:

1. At the very top of the handler (before any other logic), add:
```typescript
// If calculator has focus, let it handle its own keys
const activeEl = document.activeElement;
if (activeEl && activeEl.closest('[aria-label="Engineering calculator"]')) {
  return;
}
```

2. After the Escape handler, add the backtick toggle:
```typescript
if (e.key === '`') {
  e.preventDefault();
  setIsCalcOpen(c => !c);
  return;
}
```

3. Add `isCalcOpen` and `setIsCalcOpen` to the effect dependency array.

- [ ] **Step 5: Test manually — open the app, start a lesson, toggle calculator**

Run: `npm run dev`
- Open a lesson
- Click the calculator icon in the top bar — panel should slide in from right (desktop) or up from bottom (mobile)
- Type numbers on the keypad, verify expression appears
- Press `=` to evaluate
- Press backtick (`` ` ``) to toggle
- Answer a question with keyboard (a/b/c/d) while calculator is open but unfocused — should work
- Click into calculator, type digits — should go to calculator, not select options

- [ ] **Step 6: Commit**

```bash
git add src/components/lesson/LessonView.tsx
git commit -m "feat(calculator): integrate calculator panel into LessonView with toggle and keyboard routing"
```

---

## Task 5: Integrate Calculator into SessionView

**Files:**
- Modify: `src/components/session/SessionView.tsx`

- [ ] **Step 1: Apply identical integration as LessonView**

Same changes as Task 4, adapted for `SessionView`:

1. Import `EngineeringCalculator`
2. Add `isCalcOpen` state
3. Add toggle button in top bar (uses `PRACTICE_THEME.color` and `PRACTICE_THEME.dark` instead of unit theme)
4. Render `<EngineeringCalculator>` as sibling of content wrapper, after `</div>` (end content wrapper) and before exit modal
5. Update keyboard handler: add focus check at top, backtick toggle after Escape, add dependencies

The toggle button uses `PRACTICE_THEME`:

```tsx
background: isCalcOpen ? PRACTICE_THEME.bg : '#F5F5F5',
border: isCalcOpen ? `1.5px solid ${PRACTICE_THEME.color}` : '1.5px solid transparent',
// SVG stroke/fill: isCalcOpen ? PRACTICE_THEME.color : '#AFAFAF'
```

The `EngineeringCalculator` props:
```tsx
accentColor={PRACTICE_THEME.color}
accentDark={PRACTICE_THEME.dark}
```

- [ ] **Step 2: Test manually — start a practice session, toggle calculator**

Same verification as Task 4 Step 5, but in a practice session.

- [ ] **Step 3: Commit**

```bash
git add src/components/session/SessionView.tsx
git commit -m "feat(calculator): integrate calculator panel into SessionView"
```

---

## Task 6: Final Polish & Edge Cases

**Files:**
- Modify: `src/components/calculator/EngineeringCalculator.tsx`
- Modify: `src/components/calculator/calcEngine.ts`

- [ ] **Step 1: Add implicit multiplication support to parser**

Engineers expect `2pi` to mean `2*pi` and `3(4+5)` to mean `3*(4+5)`. In `calcEngine.ts`, add implicit multiplication during tokenization: if a number token is directly followed by a `(` token or a function/constant token, insert a `*` operator token between them.

In the `tokenize` function, before the `return tokens` line, add a post-processing pass:

```typescript
// Insert implicit multiplication
const result: Token[] = [];
for (let j = 0; j < tokens.length; j++) {
  result.push(tokens[j]);
  const curr = tokens[j];
  const next = tokens[j + 1];
  if (!next) continue;
  const needsMul =
    (curr.type === 'number' && (next.type === 'paren' && next.value === '(' || next.type === 'fn' || next.type === 'number')) ||
    (curr.type === 'paren' && curr.value === ')' && (next.type === 'number' || next.type === 'paren' && next.value === '(' || next.type === 'fn'));
  if (needsMul) {
    result.push({ type: 'op', value: '*' });
  }
}
return result;
```

- [ ] **Step 2: Add tests for implicit multiplication**

```typescript
describe('implicit multiplication', () => {
  it('handles number before paren', () => {
    expect(evaluate('3(4+5)')).toBe(27);
  });
  it('handles number before constant', () => {
    expect(evaluate('2pi')).toBeCloseTo(6.28318, 4);
  });
  it('handles paren before number', () => {
    expect(evaluate('(2+3)4')).toBe(20);
  });
});
```

- [ ] **Step 3: Run all tests**

Run: `npx vitest run src/__tests__/lib/calcEngine.test.ts`
Expected: All tests PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/calculator/calcEngine.ts src/__tests__/lib/calcEngine.test.ts
git commit -m "feat(calculator): add implicit multiplication support (2pi, 3(4+5))"
```
