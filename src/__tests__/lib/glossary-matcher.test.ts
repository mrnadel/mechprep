import { describe, it, expect } from 'vitest';
import { GlossaryMatcher } from '@/lib/glossary-matcher';
import type { GlossaryEntry } from '@/data/course/types';

const entries: GlossaryEntry[] = [
  { term: 'solar system', definition: 'The Sun and everything bound to it.', sectionIndex: 0 },
  { term: 'star', definition: 'A massive ball of hot gas.', sectionIndex: 0, relatedTerms: ['planet'] },
  { term: 'planet', definition: 'A large body that orbits a star.', sectionIndex: 0 },
  { term: 'nebula', definition: 'A cloud of gas and dust.', sectionIndex: 3 },
  { term: 'Milky Way', definition: 'Our home galaxy.', sectionIndex: 0, relatedTerms: ['galaxy'] },
];

describe('GlossaryMatcher', () => {
  const matcher = new GlossaryMatcher(entries);

  describe('findTerms', () => {
    it('finds a single-word term', () => {
      const matches = matcher.findTerms('A star is a ball of gas.');
      expect(matches).toHaveLength(1);
      expect(matches[0].term).toBe('star');
      expect(matches[0].start).toBe(2);
      expect(matches[0].end).toBe(6);
    });

    it('finds multi-word terms and prioritizes longest match', () => {
      const matches = matcher.findTerms('Our solar system has one star.');
      const terms = matches.map(m => m.term);
      expect(terms).toContain('solar system');
      expect(terms).toContain('star');
      expect(terms).not.toContain('solar');
    });

    it('is case-insensitive', () => {
      const matches = matcher.findTerms('The milky way is huge.');
      expect(matches).toHaveLength(1);
      expect(matches[0].term).toBe('Milky Way');
    });

    it('does not match partial words', () => {
      const matches = matcher.findTerms('Starting a new journey.');
      expect(matches).toHaveLength(0);
    });

    it('filters by sectionIndex', () => {
      const matches = matcher.findTerms('A star near a nebula.', 0);
      const terms = matches.map(m => m.term);
      expect(terms).toContain('star');
      expect(terms).not.toContain('nebula');
    });

    it('returns all terms when no sectionIndex filter', () => {
      const matches = matcher.findTerms('A star near a nebula.');
      const terms = matches.map(m => m.term);
      expect(terms).toContain('star');
      expect(terms).toContain('nebula');
    });

    it('returns matches sorted by position', () => {
      const matches = matcher.findTerms('A planet orbits a star.');
      expect(matches[0].term).toBe('planet');
      expect(matches[1].term).toBe('star');
      expect(matches[0].start).toBeLessThan(matches[1].start);
    });

    it('returns empty array for text with no terms', () => {
      const matches = matcher.findTerms('Hello world.');
      expect(matches).toHaveLength(0);
    });

    it('includes definition and relatedTerms in matches', () => {
      const matches = matcher.findTerms('A star shines.');
      expect(matches[0].definition).toBe('A massive ball of hot gas.');
      expect(matches[0].relatedTerms).toEqual(['planet']);
    });
  });

  describe('lookupTerm', () => {
    it('finds a term by exact name (case-insensitive)', () => {
      const entry = matcher.lookupTerm('milky way');
      expect(entry).toBeDefined();
      expect(entry!.term).toBe('Milky Way');
    });

    it('returns undefined for unknown terms', () => {
      expect(matcher.lookupTerm('quasar')).toBeUndefined();
    });
  });
});
