'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import type { ContentFeedbackType, FeedbackReason } from '@/data/types';

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
      // Silently fail — data will be stale but consistent on next refresh
    }
  };

  if (status === 'loading') return <p style={{ padding: 40 }}>Loading...</p>;
  if (status !== 'authenticated') return <p style={{ padding: 40 }}>Not authenticated</p>;

  return (
    <div style={{ fontFamily: 'system-ui' }}>
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Content Feedback</h1>
      <p style={{ fontSize: 14, color: '#666', marginBottom: 24 }}>
        Flagged questions sorted by total flags. Review and dismiss after fixing.
      </p>

      <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24, fontSize: 14, cursor: 'pointer' }}>
        <input
          type="checkbox"
          checked={showDismissed}
          onChange={(e) => setShowDismissed(e.target.checked)}
        />
        Show dismissed items
      </label>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && items.length === 0 && (
        <p style={{ color: '#999', fontSize: 14 }}>No flagged content yet.</p>
      )}

      {!loading && !error && items.length > 0 && (
        <div>
          {items.map((item) => {
            const key = `${item.contentType}:${item.contentId}`;
            const isExpanded = expandedId === key;
            return (
              <div
                key={key}
                onClick={() => setExpandedId(isExpanded ? null : key)}
                style={{
                  background: item.dismissedAt ? '#FAFAFA' : 'white',
                  opacity: item.dismissedAt ? 0.6 : 1,
                  borderRadius: 12,
                  border: '1px solid #E5E5E5',
                  padding: 16,
                  marginBottom: 12,
                  cursor: 'pointer',
                }}
              >
                {/* Top row: ID + type badge + flag count */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#888' }}>
                    {item.contentId}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 6,
                      background: item.contentType === 'question' ? '#E8F5E9' : '#E3F2FD',
                      color: item.contentType === 'question' ? '#2E7D32' : '#1565C0',
                    }}
                  >
                    {item.contentType === 'question' ? 'Practice' : 'Lesson'}
                  </span>
                  <span style={{ marginLeft: 'auto', fontWeight: 800, fontSize: 16 }}>
                    {item.totalFlags}
                  </span>
                </div>

                {/* Question text */}
                <p style={{ fontSize: 14, margin: '0 0 10px 0', lineHeight: 1.4, wordBreak: 'break-word' }}>
                  {isExpanded
                    ? item.questionText
                    : item.questionText.slice(0, 60) + (item.questionText.length > 60 ? '...' : '')}
                </p>

                {/* Reason chips */}
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 10 }}>
                  {(Object.entries(item.reasons) as [FeedbackReason, number][])
                    .filter(([, count]) => count > 0)
                    .map(([reason, count]) => (
                      <span
                        key={reason}
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: 6,
                          background: '#F5F5F5',
                          color: '#666',
                        }}
                      >
                        {REASON_LABELS[reason]} ({count})
                      </span>
                    ))}
                </div>

                {/* User comments */}
                {item.comments.length > 0 && (
                  <div style={{ marginBottom: 10 }}>
                    {item.comments.map((c, i) => (
                      <div
                        key={i}
                        style={{
                          fontSize: 12,
                          color: '#555',
                          padding: '4px 8px',
                          background: '#FFF9E8',
                          border: '1px solid #FFE4B8',
                          borderRadius: 6,
                          marginBottom: 4,
                          lineHeight: 1.4,
                          wordBreak: 'break-word',
                        }}
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
                    style={{
                      width: '100%',
                      fontSize: 12,
                      fontWeight: 700,
                      padding: '8px 14px',
                      borderRadius: 8,
                      border: '1.5px solid #E5E5E5',
                      background: 'white',
                      cursor: 'pointer',
                    }}
                  >
                    Dismiss
                  </button>
                )}
                {item.dismissedAt && (
                  <span style={{ fontSize: 11, color: '#999' }}>Dismissed</span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
