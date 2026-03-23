'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useSubscriptionStore } from '@/hooks/useSubscription';
import { useCourseStore } from '@/store/useCourseStore';
import { useEngagementStore } from '@/store/useEngagementStore';
import { getTotalLessonsMeta } from '@/data/course/course-meta';
import { leagueTiers } from '@/data/league';
import type { SubscriptionTier } from '@/lib/subscription';

const TIERS: { value: SubscriptionTier | null; label: string }[] = [
  { value: null, label: 'Real' },
  { value: 'free', label: 'Free' },
  { value: 'pro', label: 'Pro' },
];

function LeagueDebug() {
  const currentTier = useEngagementStore((s) => s.league.currentTier);
  const debugSetLeagueTier = useEngagementStore((s) => s.debugSetLeagueTier);
  const tier = leagueTiers.find((t) => t.tier === currentTier) ?? leagueTiers[0];

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => debugSetLeagueTier(currentTier - 1)}
        disabled={currentTier <= 1}
        className="px-2 py-1 rounded-md text-sm font-bold bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        ▼
      </button>
      <span className="flex-1 text-center text-sm font-bold">
        {tier.icon} {tier.name}
      </span>
      <button
        onClick={() => debugSetLeagueTier(currentTier + 1)}
        disabled={currentTier >= 5}
        className="px-2 py-1 rounded-md text-sm font-bold bg-green-50 text-green-600 hover:bg-green-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        ▲
      </button>
    </div>
  );
}

export function DebugTierToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const { debugTierOverride, setDebugTierOverride } = useSubscriptionStore();
  const completedCount = useCourseStore((s) => Object.keys(s.progress.completedLessons).length);
  const debugSetProgress = useCourseStore((s) => s.debugSetProgress);
  const totalLessons = getTotalLessonsMeta();
  const [sliderValue, setSliderValue] = useState<number | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const commitProgress = useCallback((value: number) => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      debugSetProgress(value);
      setSliderValue(null);
    }, 150);
  }, [debugSetProgress]);

  // Dragging state
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, posX: 0, posY: 0 });
  const hasDraggedRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load saved position
  useEffect(() => {
    try {
      const saved = localStorage.getItem('dev-btn-pos');
      if (saved) {
        const parsed = JSON.parse(saved);
        setPos({ x: parsed.x ?? 0, y: parsed.y ?? 0 });
      }
    } catch {}
  }, []);

  // Save position on change
  useEffect(() => {
    if (pos.x !== 0 || pos.y !== 0) {
      localStorage.setItem('dev-btn-pos', JSON.stringify(pos));
    }
  }, [pos]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (isOpen) return;
    hasDraggedRef.current = false;
    dragStartRef.current = { x: e.clientX, y: e.clientY, posX: pos.x, posY: pos.y };
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [isOpen, pos.x, pos.y]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      hasDraggedRef.current = true;
    }
    setPos({
      x: dragStartRef.current.posX + dx,
      y: dragStartRef.current.posY + dy,
    });
  }, [isDragging]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleClick = useCallback(() => {
    if (!hasDraggedRef.current) {
      setIsOpen((v) => !v);
    }
  }, []);

  if (process.env.NODE_ENV !== 'development') return null;

  const currentLabel = TIERS.find((t) => t.value === debugTierOverride)?.label ?? 'Real';
  const isOverriding = debugTierOverride !== null;

  return (
    <div
      ref={containerRef}
      className="fixed z-[9999]"
      style={{
        bottom: `calc(1rem + ${-pos.y}px)`,
        right: `calc(1rem + ${-pos.x}px)`,
        touchAction: 'none',
      }}
    >
      {isOpen && (
        <div className="absolute bottom-12 right-0 bg-white rounded-lg shadow-xl border border-gray-200 p-3 min-w-[200px]">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
            Test as
          </p>
          {TIERS.map(({ value, label }) => (
            <button
              key={label}
              onClick={() => {
                setDebugTierOverride(value);
              }}
              className={`w-full text-left px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                debugTierOverride === value
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {label}
              {value === null && (
                <span className="text-[10px] text-gray-400 ml-1">(no override)</span>
              )}
            </button>
          ))}

          <div className="border-t border-gray-200 mt-3 pt-3">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
              League Tier
            </p>
            <LeagueDebug />
          </div>

          <div className="border-t border-gray-200 mt-3 pt-3">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
              Lesson Progress
            </p>
            <input
              type="range"
              min={0}
              max={totalLessons}
              value={sliderValue ?? completedCount}
              onChange={(e) => {
                const v = Number(e.target.value);
                setSliderValue(v);
                commitProgress(v);
              }}
              className="w-full accent-indigo-600"
            />
            <div className="flex justify-between text-[11px] text-gray-500 mt-1">
              <span>{sliderValue ?? completedCount} / {totalLessons}</span>
              <span>{totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0}%</span>
            </div>
          </div>
        </div>
      )}
      <button
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onClick={handleClick}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold shadow-lg transition-colors select-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{
          background: isOverriding
            ? 'rgba(245, 158, 11, 0.4)'
            : 'rgba(31, 41, 55, 0.35)',
          color: isOverriding ? '#FFF' : 'rgba(209, 213, 219, 0.9)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      >
        <span className="text-sm">&#x1F527;</span>
        {isOverriding ? currentLabel.toUpperCase() : 'DEV'}
      </button>
    </div>
  );
}
