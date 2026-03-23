'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, Loader2, X } from 'lucide-react';

interface SearchResult {
  id: string;
  displayName: string;
  image: string | null;
  level: number;
}

export default function UserSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/user/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.users ?? []);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const showDropdown = focused && (results.length > 0 || (query.length >= 2 && !loading));

  return (
    <div ref={containerRef} className="relative mb-5">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
        <label htmlFor="user-search" className="sr-only">Search users by name</label>
        <input
          id="user-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder="Search users by name..."
          role="combobox"
          aria-expanded={showDropdown}
          aria-autocomplete="list"
          aria-controls="user-search-results"
          className="w-full pl-10 pr-10 py-3 rounded-xl border border-surface-200 bg-white text-sm font-medium text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400 transition-all"
        />
        {query && !loading && (
          <button
            onClick={() => { setQuery(''); setResults([]); }}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        {loading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-primary-400" />
        )}
      </div>

      {showDropdown && (
        <div id="user-search-results" role="listbox" className="absolute top-full mt-1 left-0 right-0 bg-white rounded-xl border border-surface-200 shadow-lg z-20 overflow-hidden">
          {results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-surface-400">No users found</p>
          ) : (
            results.map((user) => {
              const initials = (user.displayName || '?').charAt(0).toUpperCase();
              return (
                <Link
                  key={user.id}
                  href={`/user/${user.id}`}
                  onClick={() => setFocused(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-surface-50 transition-colors"
                >
                  <div
                    className="rounded-full flex items-center justify-center overflow-hidden shrink-0"
                    style={{ width: 36, height: 36, background: '#E0E7FF' }}
                  >
                    {user.image ? (
                      <img src={user.image} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-primary-700 font-bold text-xs">{initials}</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-surface-900 truncate">
                      {user.displayName}
                    </p>
                    <p className="text-xs text-surface-400">Level {user.level ?? 1}</p>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
