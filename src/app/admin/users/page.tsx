'use client';

import { useEffect, useState, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { Search, ChevronUp, ChevronDown, Trash2, X } from 'lucide-react';

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

type SortKey = 'name' | 'email' | 'tier' | 'totalXp' | 'currentStreak' | 'totalQuestionsAttempted' | 'joinedDate' | 'lastActiveDate';
type SortDir = 'asc' | 'desc';

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
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('joinedDate');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [deleteTarget, setDeleteTarget] = useState<AdminUser | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [confirmText, setConfirmText] = useState('');

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

  const deleteUser = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: deleteTarget.id }),
      });
      if (res.ok) {
        setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id));
        setTotal((t) => t - 1);
        setDeleteTarget(null);
        setConfirmText('');
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to delete user');
      }
    } catch {
      alert('Failed to delete user');
    } finally {
      setDeleting(false);
    }
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir(key === 'name' || key === 'email' ? 'asc' : 'desc');
    }
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return users;
    return users.filter(
      (u) =>
        (u.name?.toLowerCase().includes(q)) ||
        (u.email?.toLowerCase().includes(q)) ||
        u.tier.toLowerCase().includes(q)
    );
  }, [users, search]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let aVal: string | number = '';
      let bVal: string | number = '';

      switch (sortKey) {
        case 'name':
          aVal = (a.name || '').toLowerCase();
          bVal = (b.name || '').toLowerCase();
          break;
        case 'email':
          aVal = (a.email || '').toLowerCase();
          bVal = (b.email || '').toLowerCase();
          break;
        case 'tier':
          aVal = a.tier;
          bVal = b.tier;
          break;
        case 'totalXp':
          aVal = a.totalXp;
          bVal = b.totalXp;
          break;
        case 'currentStreak':
          aVal = a.currentStreak;
          bVal = b.currentStreak;
          break;
        case 'totalQuestionsAttempted':
          aVal = a.totalQuestionsAttempted;
          bVal = b.totalQuestionsAttempted;
          break;
        case 'joinedDate':
          aVal = a.joinedDate ? new Date(a.joinedDate).getTime() : 0;
          bVal = b.joinedDate ? new Date(b.joinedDate).getTime() : 0;
          break;
        case 'lastActiveDate':
          aVal = a.lastActiveDate ? new Date(a.lastActiveDate).getTime() : 0;
          bVal = b.lastActiveDate ? new Date(b.lastActiveDate).getTime() : 0;
          break;
      }

      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filtered, sortKey, sortDir]);

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

  if (status === 'loading') return <p className="p-10 text-gray-500">Loading...</p>;
  if (status !== 'authenticated') return <p className="p-10 text-gray-500">Not authenticated</p>;

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ChevronDown className="w-3 h-3 text-gray-300" />;
    return sortDir === 'asc'
      ? <ChevronUp className="w-3 h-3 text-gray-700" />
      : <ChevronDown className="w-3 h-3 text-gray-700" />;
  };

  const columns: { key: SortKey; label: string; className?: string }[] = [
    { key: 'name', label: 'User' },
    { key: 'tier', label: 'Tier', className: 'w-20' },
    { key: 'totalXp', label: 'XP', className: 'w-20 text-right' },
    { key: 'currentStreak', label: 'Streak', className: 'w-20 text-right' },
    { key: 'totalQuestionsAttempted', label: 'Qs', className: 'w-16 text-right' },
    { key: 'joinedDate', label: 'Joined', className: 'w-28' },
    { key: 'lastActiveDate', label: 'Last Active', className: 'w-28' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Users</h1>
      <p className="text-sm text-gray-500 mb-5">
        {loading ? 'Loading...' : `${total} registered user${total === 1 ? '' : 's'}`}
        {search && !loading && ` · ${sorted.length} match${sorted.length === 1 ? '' : 'es'}`}
      </p>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, email, or tier..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {!loading && !error && sorted.length === 0 && (
        <p className="text-gray-400 text-sm py-8 text-center">
          {search ? 'No users match your search.' : 'No users found.'}
        </p>
      )}

      {!loading && !error && sorted.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      onClick={() => handleSort(col.key)}
                      className={`px-3 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700 select-none whitespace-nowrap ${col.className || ''}`}
                    >
                      <span className="inline-flex items-center gap-1">
                        {col.label}
                        <SortIcon col={col.key} />
                      </span>
                    </th>
                  ))}
                  <th className="w-28 px-3 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors"
                  >
                    {/* User (name + email) */}
                    <td className="px-3 py-2.5">
                      <div className="font-semibold text-gray-900 truncate max-w-[200px]">
                        {user.name || '-'}
                      </div>
                      <div className="text-xs text-gray-400 truncate max-w-[200px]">
                        {user.email || '-'}
                      </div>
                    </td>
                    {/* Tier */}
                    <td className="px-3 py-2.5">
                      <span
                        className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded-md capitalize ${
                          user.tier === 'pro'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {user.tier}
                      </span>
                    </td>
                    {/* XP */}
                    <td className="px-3 py-2.5 text-right font-medium text-gray-700">
                      {user.totalXp.toLocaleString()}
                    </td>
                    {/* Streak */}
                    <td className="px-3 py-2.5 text-right font-medium text-gray-700">
                      {user.currentStreak}
                    </td>
                    {/* Questions */}
                    <td className="px-3 py-2.5 text-right font-medium text-gray-700">
                      {user.totalQuestionsAttempted}
                    </td>
                    {/* Joined */}
                    <td className="px-3 py-2.5 text-gray-500 whitespace-nowrap">
                      {formatDate(user.joinedDate)}
                    </td>
                    {/* Last Active */}
                    <td className="px-3 py-2.5 text-gray-500 whitespace-nowrap">
                      {formatDate(user.lastActiveDate)}
                    </td>
                    {/* Actions */}
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => toggleTier(user.id, user.tier)}
                          disabled={updating === user.id}
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-lg transition-colors disabled:opacity-50 ${
                            user.tier === 'pro'
                              ? 'bg-red-50 text-red-600 hover:bg-red-100'
                              : 'bg-green-50 text-green-600 hover:bg-green-100'
                          }`}
                        >
                          {updating === user.id
                            ? '...'
                            : user.tier === 'pro'
                              ? 'Revoke'
                              : 'Grant'}
                        </button>
                        <button
                          onClick={() => { setDeleteTarget(user); setConfirmText(''); }}
                          className="p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                          title="Delete user"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Delete User</h3>
                <p className="text-sm text-gray-500 mt-1">This action cannot be undone.</p>
              </div>
              <button
                onClick={() => { setDeleteTarget(null); setConfirmText(''); }}
                className="p-1 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="bg-red-50 rounded-xl p-4 mb-4">
              <p className="text-sm text-red-800">
                You are about to permanently delete <strong>{deleteTarget.name || deleteTarget.email}</strong> and
                all their data including progress, subscriptions, and payment history.
              </p>
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                Type <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-red-600">DELETE</span> to confirm
              </label>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="DELETE"
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                autoFocus
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => { setDeleteTarget(null); setConfirmText(''); }}
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={deleteUser}
                disabled={confirmText !== 'DELETE' || deleting}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {deleting ? 'Deleting...' : 'Delete User'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
