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

  if (status === 'loading') return <p style={{ padding: 40 }}>Loading...</p>;
  if (status !== 'authenticated') return <p style={{ padding: 40 }}>Not authenticated</p>;

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 24px', fontFamily: 'system-ui' }}>
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
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
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
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, marginBottom: 32 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #E5E5E5', textAlign: 'left' }}>
                  <th style={{ padding: '8px 12px', fontWeight: 700 }}>Topic</th>
                  <th style={{ padding: '8px 12px', fontWeight: 700, textAlign: 'right' }}>Total Attempts</th>
                  <th style={{ padding: '8px 12px', fontWeight: 700, textAlign: 'right' }}>Accuracy %</th>
                </tr>
              </thead>
              <tbody>
                {data.topicPerformance.map((row) => (
                  <tr
                    key={row.topicId}
                    style={{ borderBottom: '1px solid #F0F0F0' }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLTableRowElement).style.background = '#FAFAFA';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLTableRowElement).style.background = 'white';
                    }}
                  >
                    <td style={{ padding: '10px 12px' }}>
                      {formatTopicId(row.topicId)}
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: 'monospace' }}>
                      {row.totalAttempts.toLocaleString()}
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'right' }}>
                      <span
                        style={{
                          fontWeight: 700,
                          color: row.accuracy >= 70 ? '#2E7D32' : row.accuracy >= 40 ? '#F57F17' : '#C62828',
                        }}
                      >
                        {row.accuracy}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Recent Activity Table */}
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Recent Activity</h2>
          {data.recentActivity.length === 0 ? (
            <p style={{ color: '#999', fontSize: 14 }}>No recent sessions.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #E5E5E5', textAlign: 'left' }}>
                  <th style={{ padding: '8px 12px', fontWeight: 700 }}>Date</th>
                  <th style={{ padding: '8px 12px', fontWeight: 700 }}>User</th>
                  <th style={{ padding: '8px 12px', fontWeight: 700, textAlign: 'right' }}>Questions</th>
                  <th style={{ padding: '8px 12px', fontWeight: 700, textAlign: 'right' }}>Correct</th>
                  <th style={{ padding: '8px 12px', fontWeight: 700, textAlign: 'right' }}>XP Earned</th>
                </tr>
              </thead>
              <tbody>
                {data.recentActivity.map((row, i) => (
                  <tr
                    key={`${row.date}-${row.userId}-${i}`}
                    style={{ borderBottom: '1px solid #F0F0F0' }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLTableRowElement).style.background = '#FAFAFA';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLTableRowElement).style.background = 'white';
                    }}
                  >
                    <td style={{ padding: '10px 12px' }}>{row.date}</td>
                    <td style={{ padding: '10px 12px', fontFamily: 'monospace', fontSize: 12 }}>
                      {row.userId.slice(0, 8)}...
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: 'monospace' }}>
                      {row.questionsAttempted}
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: 'monospace' }}>
                      {row.questionsCorrect}
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 700 }}>
                      +{row.xpEarned} XP
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
