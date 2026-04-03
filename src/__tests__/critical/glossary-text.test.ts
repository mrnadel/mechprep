import { describe, it, expect } from 'vitest';
import { GlossaryMatcher } from '@/lib/glossary-matcher';
import type { GlossaryEntry } from '@/data/course/types';

const entries: GlossaryEntry[] = [
  { term: 'compound interest', definition: 'Interest on interest.', sectionIndex: 0 },
  { term: 'interest', definition: 'Money charged for borrowing.', sectionIndex: 0 },
  { term: 'budget', definition: 'A spending plan.', sectionIndex: 1 },
  { term: 'APY', definition: 'Annual percentage yield.', sectionIndex: 0, relatedTerms: ['compound interest'] },
];

describe('GlossaryText matching behavior', () => {
  const matcher = new GlossaryMatcher(entries);

  it('prefers longer term over shorter overlapping term', () => {
    const matches = matcher.findTerms('Compound interest grows your money.', 0);
    const terms = matches.map(m => m.term);
    expect(terms).toContain('compound interest');
    expect(terms).toHaveLength(1);
  });

  it('matches standalone shorter term when longer term is absent', () => {
    const matches = matcher.findTerms('The interest rate is 5%.', 0);
    expect(matches).toHaveLength(1);
    expect(matches[0].term).toBe('interest');
  });

  it('handles abbreviations', () => {
    const matches = matcher.findTerms('Your APY is 4.5%.', 0);
    expect(matches).toHaveLength(1);
    expect(matches[0].term).toBe('APY');
  });

  it('returns no matches for ME course (null matcher scenario)', () => {
    const emptyMatcher = new GlossaryMatcher([]);
    const matches = emptyMatcher.findTerms('Any text here.');
    expect(matches).toHaveLength(0);
  });

  it('handles multiple terms in one sentence', () => {
    const matches = matcher.findTerms('Your budget affects compound interest growth.');
    const terms = matches.map(m => m.term);
    expect(terms).toContain('budget');
    expect(terms).toContain('compound interest');
  });

  it('section filter excludes out-of-section terms', () => {
    const matches = matcher.findTerms('Your budget affects compound interest growth.', 0);
    const terms = matches.map(m => m.term);
    expect(terms).toContain('compound interest');
    expect(terms).not.toContain('budget');
  });
});
