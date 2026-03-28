'use client';

import { useState, useEffect } from 'react';
import { FLAG_DEFINITIONS, type FlagDefinition } from '@/lib/feature-flags';

const CATEGORIES = ['engagement', 'ui', 'practice', 'course', 'prompts'] as const;

const CATEGORY_META: Record<string, { label: string; color: string; bg: string }> = {
  engagement: { label: 'Engagement', color: 'text-purple-700', bg: 'bg-purple-50' },
  ui:         { label: 'UI',         color: 'text-blue-700',   bg: 'bg-blue-50' },
  practice:   { label: 'Practice',   color: 'text-emerald-700', bg: 'bg-emerald-50' },
  course:     { label: 'Course',     color: 'text-amber-700',  bg: 'bg-amber-50' },
  prompts:    { label: 'Prompts',    color: 'text-pink-700',   bg: 'bg-pink-50' },
};

export default function FeatureFlagsPage() {
  const [flags, setFlags] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/feature-flags')
      .then((r) => r.json())
      .then(({ flags: f }) => { setFlags(f); setLoading(false); })
      .catch(() => {
        // Use defaults if API fails
        const defaults: Record<string, boolean> = {};
        for (const def of FLAG_DEFINITIONS) defaults[def.key] = def.enabled;
        setFlags(defaults);
        setLoading(false);
      });
  }, []);

  const toggleFlag = async (key: string) => {
    const newValue = !flags[key];
    setUpdating(key);
    setFlags((prev) => ({ ...prev, [key]: newValue }));

    try {
      const res = await fetch('/api/feature-flags', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, enabled: newValue }),
      });
      if (!res.ok) {
        // Revert on error
        setFlags((prev) => ({ ...prev, [key]: !newValue }));
      }
    } catch {
      setFlags((prev) => ({ ...prev, [key]: !newValue }));
    } finally {
      setUpdating(null);
    }
  };

  const enabledCount = Object.values(flags).filter(Boolean).length;
  const totalCount = FLAG_DEFINITIONS.length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-extrabold text-gray-900">Feature Flags</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {enabledCount}/{totalCount} enabled. Changes apply instantly for new page loads.
          </p>
        </div>
      </div>

      {/* Flags by category */}
      <div className="space-y-6">
        {CATEGORIES.map((cat) => {
          const meta = CATEGORY_META[cat];
          const catFlags = FLAG_DEFINITIONS.filter((f) => f.category === cat);
          if (catFlags.length === 0) return null;

          return (
            <div key={cat}>
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs font-bold uppercase tracking-widest ${meta.color}`}>
                  {meta.label}
                </span>
                <span className="text-xs text-gray-400">
                  {catFlags.filter((f) => flags[f.key]).length}/{catFlags.length}
                </span>
              </div>
              <div className="space-y-1.5">
                {catFlags.map((flag) => (
                  <FlagRow
                    key={flag.key}
                    flag={flag}
                    enabled={flags[flag.key] ?? flag.enabled}
                    updating={updating === flag.key}
                    onToggle={() => toggleFlag(flag.key)}
                    meta={meta}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FlagRow({
  flag,
  enabled,
  updating,
  onToggle,
  meta,
}: {
  flag: FlagDefinition;
  enabled: boolean;
  updating: boolean;
  onToggle: () => void;
  meta: { bg: string };
}) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 px-4 py-3 hover:border-gray-200 transition-colors">
      <div className={`w-8 h-8 rounded-lg ${meta.bg} flex items-center justify-center text-xs font-bold shrink-0`}>
        {enabled ? '✓' : '✗'}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <code className="text-sm font-semibold text-gray-900">{flag.key}</code>
        </div>
        <p className="text-xs text-gray-500 mt-0.5 truncate">{flag.description}</p>
      </div>
      <button
        onClick={onToggle}
        disabled={updating}
        className="relative shrink-0"
        aria-label={`Toggle ${flag.key}`}
      >
        <div
          className={`w-11 h-6 rounded-full transition-colors duration-200 ${
            enabled ? 'bg-green-500' : 'bg-gray-300'
          } ${updating ? 'opacity-50' : ''}`}
        >
          <div
            className={`w-5 h-5 rounded-full bg-white shadow-sm absolute top-0.5 transition-transform duration-200 ${
              enabled ? 'translate-x-[22px]' : 'translate-x-0.5'
            }`}
          />
        </div>
      </button>
    </div>
  );
}
