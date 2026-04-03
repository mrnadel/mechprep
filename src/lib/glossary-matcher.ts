import type { GlossaryEntry } from '@/data/course/types';

export interface GlossaryMatch {
  term: string;
  definition: string;
  relatedTerms?: string[];
  start: number;
  end: number;
}

export class GlossaryMatcher {
  private entries: GlossaryEntry[];
  private lookupMap: Map<string, GlossaryEntry>;
  private sectionEntries: Map<number, GlossaryEntry[]>;

  constructor(entries: GlossaryEntry[]) {
    this.entries = entries;
    this.lookupMap = new Map();
    this.sectionEntries = new Map();

    for (const entry of entries) {
      this.lookupMap.set(entry.term.toLowerCase(), entry);

      const list = this.sectionEntries.get(entry.sectionIndex);
      if (list) {
        list.push(entry);
      } else {
        this.sectionEntries.set(entry.sectionIndex, [entry]);
      }
    }
  }

  private buildRegex(terms: string[]): RegExp | null {
    if (terms.length === 0) return null;

    const sorted = [...terms].sort((a, b) => b.length - a.length);
    const escaped = sorted.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const pattern = `\\b(${escaped.join('|')})\\b`;
    return new RegExp(pattern, 'gi');
  }

  findTerms(text: string, sectionIndex?: number): GlossaryMatch[] {
    const pool = sectionIndex !== undefined
      ? (this.sectionEntries.get(sectionIndex) ?? [])
      : this.entries;

    const regex = this.buildRegex(pool.map(e => e.term));
    if (!regex) return [];

    const matches: GlossaryMatch[] = [];
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      const entry = this.lookupMap.get(match[1].toLowerCase());
      if (entry) {
        matches.push({
          term: entry.term,
          definition: entry.definition,
          relatedTerms: entry.relatedTerms,
          start: match.index,
          end: match.index + match[0].length,
        });
      }
    }

    return matches.sort((a, b) => a.start - b.start);
  }

  lookupTerm(term: string): GlossaryEntry | undefined {
    return this.lookupMap.get(term.toLowerCase());
  }
}
