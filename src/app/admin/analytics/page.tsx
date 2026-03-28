'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

interface OverviewData {
  totalUsers: number;
  activeToday: number;
  activeThisWeek: number;
  totalQuestionsAnswered: number;
}

interface TopicPerformanceRow {
  topicId: string;
  totalAttempts: number;
  accuracy: number;
}

interface RecentActivityRow {
  date: string;
  userId: string;
  questionsAttempted: number;
  questionsCorrect: number;
  xpEarned: number;
}

interface AnalyticsData {
  overview: OverviewData;
  topicPerformance: TopicPerformanceRow[];
  recentActivity: RecentActivityRow[];
}

export default function AdminAnalyticsPage() {
  const { status } = useSession();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status !== 'authenticated') return;

    async function fetchAnalytics() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/admin/analytics');
        if (!res.ok) {
          setError(res.status === 403 ? 'Access denied' : 'Failed to load');
          return;
        }
        const json = await res.json();
        setData(json);
      } catch {
        setError('Failed to load');
      } finally {
        setLoading(false);
      }
    }

    fetchAnalytics();
  }, [status]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-200 border-t-primary-500 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500">Loading analytics...</p>
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
    <div style={{ padding: '32px 24px', fontFamily: 'system-ui' }}>
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Analytics Dashboard</h1>
      <p style={{ fontSize: 14, color: '#666', marginBottom: 24 }}>
        Key engagement metrics and activity overview.
      </p>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && data && (
        <>
          {/* Overview Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 16,
              marginBottom: 32,
            }}
          >
            <StatCard label="Total Users" value={data.overview.totalUsers} />
            <StatCard label="Active Today" value={data.overview.activeToday} />
            <StatCard label="Active This Week" value={data.overview.activeThisWeek} />
            <StatCard label="Total Questions Answered" value={data.overview.totalQuestionsAnswered} />
          </div>

          {/* Topic Performance Table */}
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Topic Performance</h2>
          {data.topicPerformance.length === 0 ? (
            <p style={{ color: '#999', fontSize: 14, marginBottom: 32 }}>No topic data yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
              {data.topicPerformance.map((row) => (
                <div
                  key={row.topicId}
                  style={{
                    background: 'white',
                    borderRadius: 12,
                    border: '1px solid #E5E5E5',
                    padding: '16px 20px',
                  }}
                >
                  <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>
                    {formatTopicId(row.topicId)}
                  </div>
                  <div style={{ fontSize: 13, color: '#666', marginBottom: 4 }}>
                    Attempts: <span style={{ fontFamily: 'monospace', color: '#111' }}>{row.totalAttempts.toLocaleString()}</span>
                  </div>
                  <div style={{ fontSize: 13, color: '#666' }}>
                    Accuracy:{' '}
                    <span
                      style={{
                        fontWeight: 700,
                        color: row.accuracy >= 70 ? '#2E7D32' : row.accuracy >= 40 ? '#F57F17' : '#C62828',
                      }}
                    >
                      {row.accuracy}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Recent Activity Table */}
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Recent Activity</h2>
          {data.recentActivity.length === 0 ? (
            <p style={{ color: '#999', fontSize: 14 }}>No recent sessions.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {data.recentActivity.map((row, i) => (
                <div
                  key={`${row.date}-${row.userId}-${i}`}
                  style={{
                    background: 'white',
                    borderRadius: 12,
                    border: '1px solid #E5E5E5',
                    padding: '16px 20px',
                  }}
                >
                  <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>
                    {row.date}
                  </div>
                  <div style={{ fontSize: 13, color: '#666', marginBottom: 4 }}>
                    Questions: <span style={{ fontFamily: 'monospace', color: '#111' }}>{row.questionsAttempted}</span>
                    {' / '}
                    <span style={{ fontFamily: 'monospace', color: '#111' }}>{row.questionsCorrect} correct</span>
                  </div>
                  <div style={{ fontSize: 13, color: '#666' }}>
                    XP: <span style={{ fontWeight: 700, color: '#111' }}>+{row.xpEarned} XP</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div
      style={{
        background: 'white',
        borderRadius: 12,
        border: '1px solid #E5E5E5',
        padding: '20px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <span style={{ fontSize: 28, fontWeight: 800, color: '#111' }}>
        {value.toLocaleString()}
      </span>
      <span style={{ fontSize: 13, fontWeight: 500, color: '#888' }}>
        {label}
      </span>
    </div>
  );
}

function formatTopicId(topicId: string): string {
  return topicId
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
