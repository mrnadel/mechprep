import { evaluate } from '@/components/calculator/calcEngine';

describe('calcEngine', () => {
  describe('basic arithmetic', () => {
    it('evaluates addition', () => { expect(evaluate('2+3')).toBe(5); });
    it('evaluates subtraction', () => { expect(evaluate('10-4')).toBe(6); });
    it('evaluates multiplication', () => { expect(evaluate('3*4')).toBe(12); });
    it('evaluates division', () => { expect(evaluate('15/3')).toBe(5); });
    it('respects operator precedence', () => { expect(evaluate('2+3*4')).toBe(14); });
    it('handles parentheses', () => { expect(evaluate('(2+3)*4')).toBe(20); });
    it('handles nested parentheses', () => { expect(evaluate('((2+3)*4)+1')).toBe(21); });
    it('handles decimals', () => { expect(evaluate('1.5+2.5')).toBe(4); });
    it('handles negative numbers', () => { expect(evaluate('-5+3')).toBe(-2); });
    it('handles unary minus', () => { expect(evaluate('-(3+2)')).toBe(-5); });
  });

  describe('error handling', () => {
    it('returns null for empty input', () => { expect(evaluate('')).toBeNull(); });
    it('returns null for unmatched parentheses', () => { expect(evaluate('(2+3')).toBeNull(); });
    it('returns null for division by zero', () => { expect(evaluate('5/0')).toBeNull(); });
    it('returns null for invalid expression', () => { expect(evaluate('2++3')).toBeNull(); });
    it('returns null for gibberish', () => { expect(evaluate('abc')).toBeNull(); });
  });
});
