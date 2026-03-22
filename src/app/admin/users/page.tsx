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
  const [updating, setUpdating] = useState<string | null>(null);

  const toggleTier = async (userId: string, currentTier: string) => {
    const newTier = currentTier === 'pro' ? 'free' : 'pro';
    setUpdating(userId);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, tier: newTier }),
      });
      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, tier: newTier } : u))
        );
      }
    } catch {
      // silently fail
    } finally {
      setUpdating(null);
    }
  };

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
    <div style={{ fontFamily: 'system-ui' }}>
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Users</h1>
      <p style={{ fontSize: 14, color: '#666', marginBottom: 24 }}>
        {loading ? 'Loading...' : `${total} registered user${total === 1 ? '' : 's'}`}
      </p>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && users.length === 0 && (
        <p style={{ color: '#999', fontSize: 14 }}>No users found.</p>
      )}

      {!loading && !error && users.length > 0 && (
        <div>
          {users.map((user) => {
            const tierStyle = TIER_STYLES[user.tier] || TIER_STYLES.free;
            return (
              <div
                key={user.id}
                style={{
                  background: 'white',
                  borderRadius: 12,
                  border: '1px solid #E5E5E5',
                  padding: 16,
                  marginBottom: 12,
                }}
              >
                {/* Name + tier badge + toggle */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 15, fontWeight: 700, flex: 1 }}>
                    {user.name || user.email || '-'}
                  </span>
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
                  <button
                    onClick={() => toggleTier(user.id, user.tier)}
                    disabled={updating === user.id}
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: 6,
                      border: 'none',
                      cursor: updating === user.id ? 'wait' : 'pointer',
                      background: user.tier === 'pro' ? '#FFEBEE' : '#E8F5E9',
                      color: user.tier === 'pro' ? '#C62828' : '#2E7D32',
                      opacity: updating === user.id ? 0.5 : 1,
                    }}
                  >
                    {updating === user.id
                      ? '...'
                      : user.tier === 'pro'
                        ? 'Revoke Pro'
                        : 'Grant Pro'}
                  </button>
                </div>

                {/* Email */}
                <div style={{ fontSize: 13, color: '#888', marginBottom: 12 }}>
                  {user.email || '-'}
                </div>

                {/* Stats row */}
                <div style={{ display: 'flex', gap: 24, marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 11, color: '#999', fontWeight: 600, marginBottom: 2 }}>XP</div>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>{user.totalXp.toLocaleString()}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: '#999', fontWeight: 600, marginBottom: 2 }}>Streak</div>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>{user.currentStreak}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: '#999', fontWeight: 600, marginBottom: 2 }}>Questions</div>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>{user.totalQuestionsAttempted}</div>
                  </div>
                </div>

                {/* Last active */}
                <div style={{ fontSize: 12, color: '#999' }}>
                  Last active: {formatDate(user.lastActiveDate)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
