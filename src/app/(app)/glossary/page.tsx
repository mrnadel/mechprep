'use client';

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { financeGlossary } from '@/data/course/professions/personal-finance/glossary';

export default function GlossaryPage() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return financeGlossary;
    const q = search.toLowerCase();
    return financeGlossary.filter(
      (e) => e.term.toLowerCase().includes(q) || e.definition.toLowerCase().includes(q)
    );
  }, [search]);

  // Group by first letter
  const grouped = useMemo(() => {
    const groups: Record<string, typeof filtered> = {};
    for (const entry of filtered) {
      const letter = entry.term[0].toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(entry);
    }
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  return (
    <div>
      <PageHeader title="Glossary" subtitle="Every financial term, explained simply" backHref="/" />

      <div className="max-w-2xl mx-auto px-4 pb-24">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search terms..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-sm font-semibold focus:outline-none focus:border-emerald-400 transition-colors"
          />
        </div>

        {/* Results */}
        {grouped.length === 0 ? (
          <p className="text-center text-gray-400 font-semibold py-12">No terms found for "{search}"</p>
        ) : (
          grouped.map(([letter, entries]) => (
            <div key={letter} className="mb-6">
              <div className="text-xs font-extrabold text-emerald-500 uppercase tracking-widest mb-2 pl-1">{letter}</div>
              <div className="flex flex-col gap-2">
                {entries.map((entry) => (
                  <div
                    key={entry.term}
                    className="bg-white rounded-xl border border-gray-100 px-4 py-3 hover:border-emerald-200 transition-colors"
                  >
                    <div className="font-bold text-gray-800 text-sm">{entry.term}</div>
                    <div className="text-gray-500 text-sm mt-0.5 leading-relaxed">{entry.definition}</div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}

        <p className="text-center text-gray-300 text-xs font-semibold mt-8">
          {financeGlossary.length} terms across all units
        </p>
      </div>
    </div>
  );
}
