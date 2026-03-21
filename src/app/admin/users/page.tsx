'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

interface AdminUser {
  id: string;
  name: string | null;
  email: string | null;
  joinedDate: string | null;
  totalXp: number;
  currentStreak: number;
  totalQuestionsAttempted: number;
  lastActiveDate: string | null;
  tier: string;
}

const TIER_STYLES: Record<string, { background: string; color: string }> = {
  free: { background: '#E5E5E5', color: '#555' },
  pro: { background: '#E8F5E9', color: '#2E7D32' },
  team: { background: '#E3F2FD', color: '#1565C0' },
};

function formatDate(value: string | null): string {
  if (!value) return '-';
  const d = new Date(value);
  if (isNaN(d.getTime())) return value;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function AdminUsersPage() {
  const { status } = useSession();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status !== 'authenticated') return;

    async function fetchUsers() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/admin/users');
        if (!res.ok) {
          setError(res.status === 403 ? 'Access denied' : 'Failed to load');
          return;
        }
        const data = await res.json();
        setUsers(data.users);
        setTotal(data.total);
      } catch {
        setError('Failed to load');
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [status]);

  if (status === 'loading') return <p style={{ padding: 40 }}>Loading...</p>;
  if (status !== 'authenticated') return <p style={{ padding: 40 }}>Not authenticated</p>;

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 24px', fontFamily: 'system-ui' }}>
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Users</h1>
      <p style={{ fontSize: 14, color: '#666', marginBottom: 24 }}>
        {loading ? 'Loading...' : `${total} registered user${total === 1 ? '' : 's'}`}
      </p>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && users.length === 0 && (
        <p style={{ color: '#999', fontSize: 14 }}>No users found.</p>
      )}

      {!loading && !error && users.length > 0 && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #E5E5E5', textAlign: 'left' }}>
                <th style={{ padding: '8px 10px', fontWeight: 700 }}>Name</th>
                <th style={{ padding: '8px 10px', fontWeight: 700 }}>Email</th>
                <th style={{ padding: '8px 10px', fontWeight: 700 }}>Joined</th>
                <th style={{ padding: '8px 10px', fontWeight: 700 }}>Tier</th>
                <th style={{ padding: '8px 10px', fontWeight: 700, textAlign: 'right' }}>XP</th>
                <th style={{ padding: '8px 10px', fontWeight: 700, textAlign: 'right' }}>Streak</th>
                <th style={{ padding: '8px 10px', fontWeight: 700, textAlign: 'right' }}>Questions</th>
                <th style={{ padding: '8px 10px', fontWeight: 700 }}>Last Active</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => {
                const tierStyle = TIER_STYLES[user.tier] || TIER_STYLES.free;
                return (
                  <tr
                    key={user.id}
                    style={{
                      borderBottom: '1px solid #F0F0F0',
                      background: i % 2 === 0 ? 'white' : '#FAFAFA',
                    }}
                  >
                    <td style={{ padding: '10px 10px', fontWeight: 600 }}>
                      {user.name || user.email || '-'}
                    </td>
                    <td style={{ padding: '10px 10px', color: '#555' }}>
                      {user.email || '-'}
                    </td>
                    <td style={{ padding: '10px 10px', color: '#555' }}>
                      {formatDate(user.joinedDate)}
                    </td>
                    <td style={{ padding: '10px 10px' }}>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: 6,
                          background: tierStyle.background,
                          color: tierStyle.color,
                          textTransform: 'capitalize',
                        }}
                      >
                        {user.tier}
                      </span>
                    </td>
                    <td style={{ padding: '10px 10px', textAlign: 'right', fontWeight: 600 }}>
                      {user.totalXp.toLocaleString()}
                    </td>
                    <td style={{ padding: '10px 10px', textAlign: 'right', fontWeight: 600 }}>
                      {user.currentStreak}
                    </td>
                    <td style={{ padding: '10px 10px', textAlign: 'right', fontWeight: 600 }}>
                      {user.totalQuestionsAttempted}
                    </td>
                    <td style={{ padding: '10px 10px', color: '#555' }}>
                      {formatDate(user.lastActiveDate)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
