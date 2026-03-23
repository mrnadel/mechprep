'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import type { ContentFeedbackType, FeedbackReason } from '@/data/types';
import { cn } from '@/lib/utils';

interface FlaggedItem {
  contentId: string;
  contentType: ContentFeedbackType;
  questionText: string;
  totalFlags: number;
  reasons: Record<FeedbackReason, number>;
  comments: string[];
  dismissedAt: string | null;
}

const REASON_LABELS: Record<FeedbackReason, string> = {
  confusing: 'Confusing',
  incorrect: 'Incorrect',
  'too-easy': 'Too Easy',
  'too-hard': 'Too Hard',
  'bad-graphic': 'Bad Graphic',
};

export default function AdminFeedbackPage() {
  const { status } = useSession();
  const [items, setItems] = useState<FlaggedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDismissed, setShowDismissed] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/admin/content-feedback?includeDismissed=${showDismissed}`
      );
      if (!res.ok) {
        setError(res.status === 403 ? 'Access denied' : 'Failed to load');
        return;
      }
      const data = await res.json();
      setItems(data.items);
    } catch {
      setError('Failed to load');
    } finally {
      setLoading(false);
    }
  }, [showDismissed]);

  useEffect(() => {
    if (status === 'authenticated') fetchData();
  }, [status, fetchData]);

  const handleDismiss = async (contentType: string, contentId: string) => {
    try {
      await fetch('/api/admin/content-feedback/dismiss', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contentType, contentId }),
      });
      fetchData();
    } catch {
      setError('Failed to dismiss item. Please try again.');
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-200 border-t-primary-500 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500">Loading feedback...</p>
        </div>
      </div>
    );
  }
  if (status !== 'authenticated') {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <p className="text-gray-500 font-semibold">Not authenticated</p>
          <a href="/login" className="text-primary-600 text-sm font-medium hover:underline mt-1 inline-block">Sign in</a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-1">Content Feedback</h1>
      <p className="text-sm text-gray-500 mb-5">
        Flagged questions sorted by total flags. Review and dismiss after fixing.
      </p>

      <label className="flex items-center gap-2 mb-5 text-sm cursor-pointer min-h-[44px]">
        <input
          type="checkbox"
          checked={showDismissed}
          onChange={(e) => setShowDismissed(e.target.checked)}
          className="w-4 h-4"
        />
        Show dismissed items
      </label>

      {loading && <p className="text-sm text-gray-500">Loading...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {!loading && !error && items.length === 0 && (
        <p className="text-sm text-gray-400 py-8 text-center">No flagged content yet.</p>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="space-y-3">
          {items.map((item) => {
            const key = `${item.contentType}:${item.contentId}`;
            const isExpanded = expandedId === key;
            return (
              <div
                key={key}
                onClick={() => setExpandedId(isExpanded ? null : key)}
                className={cn(
                  'rounded-xl border border-gray-200 p-3.5 sm:p-4 cursor-pointer transition-colors',
                  item.dismissedAt ? 'bg-gray-50 opacity-60' : 'bg-white'
                )}
              >
                {/* Top row: ID + type badge + flag count */}
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="font-mono text-xs text-gray-400 truncate max-w-[150px] sm:max-w-none">
                    {item.contentId}
                  </span>
                  <span
                    className={cn(
                      'text-[11px] font-bold px-2 py-0.5 rounded-md shrink-0',
                      item.contentType === 'question'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                    )}
                  >
                    {item.contentType === 'question' ? 'Practice' : 'Lesson'}
                  </span>
                  <span className="ml-auto font-extrabold text-base text-gray-900 shrink-0">
                    {item.totalFlags}
                  </span>
                </div>

                {/* Question text */}
                <p className="text-sm text-gray-700 mb-2.5 leading-relaxed break-words">
                  {isExpanded
                    ? item.questionText
                    : item.questionText.slice(0, 60) + (item.questionText.length > 60 ? '...' : '')}
                </p>

                {/* Reason chips */}
                <div className="flex gap-1 flex-wrap mb-2.5">
                  {(Object.entries(item.reasons) as [FeedbackReason, number][])
                    .filter(([, count]) => count > 0)
                    .map(([reason, count]) => (
                      <span
                        key={reason}
                        className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-gray-100 text-gray-500"
                      >
                        {REASON_LABELS[reason]} ({count})
                      </span>
                    ))}
                </div>

                {/* User comments */}
                {item.comments.length > 0 && (
                  <div className="space-y-1 mb-2.5">
                    {item.comments.map((c, i) => (
                      <div
                        key={i}
                        className="text-xs text-gray-600 px-2 py-1 bg-amber-50 border border-amber-200 rounded-md leading-relaxed break-words"
                      >
                        &ldquo;{c}&rdquo;
                      </div>
                    ))}
                  </div>
                )}

                {/* Dismiss button or dismissed label */}
                {!item.dismissedAt && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDismiss(item.contentType, item.contentId);
                    }}
                    className="w-full text-xs font-bold py-2.5 min-h-[44px] rounded-lg border-[1.5px] border-gray-200 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Dismiss
                  </button>
                )}
                {item.dismissedAt && (
                  <span className="text-[11px] text-gray-400">Dismissed</span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
