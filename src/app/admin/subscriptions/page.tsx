'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

interface Overview {
  free: number;
  pro: number;
  activeSubscriptions: number;
  trialUsers: number;
  revenueThisMonthCents: number;
}

interface Subscription {
  id: string;
  tier: string;
  status: string;
  billingInterval: string | null;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
  userName: string | null;
  userEmail: string | null;
}

interface Payment {
  id: string;
  amountCents: number;
  currency: string;
  status: string;
  createdAt: string;
  userName: string | null;
  userEmail: string | null;
}

interface ApiData {
  overview: Overview;
  subscriptions: Subscription[];
  recentPayments: Payment[];
}

const tierBadgeStyle = (tier: string): React.CSSProperties => {
  const colors: Record<string, { bg: string; color: string }> = {
    free: { bg: '#F0F0F0', color: '#666' },
    pro: { bg: '#E8F5E9', color: '#2E7D32' },
  };
  const c = colors[tier] ?? colors.free;
  return {
    fontSize: 11,
    fontWeight: 700,
    padding: '2px 8px',
    borderRadius: 6,
    background: c.bg,
    color: c.color,
    textTransform: 'capitalize',
  };
};

const paymentStatusStyle = (status: string): React.CSSProperties => {
  const colors: Record<string, { bg: string; color: string }> = {
    succeeded: { bg: '#E8F5E9', color: '#2E7D32' },
    failed: { bg: '#FFEBEE', color: '#C62828' },
    pending: { bg: '#FFF8E1', color: '#F57F17' },
  };
  const c = colors[status] ?? colors.pending;
  return {
    fontSize: 11,
    fontWeight: 700,
    padding: '2px 8px',
    borderRadius: 6,
    background: c.bg,
    color: c.color,
    textTransform: 'capitalize',
  };
};

function formatDollars(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function AdminSubscriptionsPage() {
  const { status } = useSession();
  const [data, setData] = useState<ApiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status !== 'authenticated') return;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/admin/subscriptions');
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
    })();
  }, [status]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-200 border-t-indigo-500 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500">Loading subscriptions...</p>
        </div>
      </div>
    );
  }
  if (status !== 'authenticated') {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <p className="text-gray-500 font-semibold">Not authenticated</p>
          <a href="/login" className="text-indigo-600 text-sm font-medium hover:underline mt-1 inline-block">Sign in</a>
        </div>
      </div>
    );
  }

  const labelStyle: React.CSSProperties = {
    fontSize: 12,
    color: '#999',
    fontWeight: 500,
    marginBottom: 2,
  };

  const valueStyle: React.CSSProperties = {
    fontSize: 14,
    fontWeight: 600,
  };

  const cardStyle: React.CSSProperties = {
    background: 'white',
    borderRadius: 12,
    border: '1px solid #E5E5E5',
    padding: 16,
    marginBottom: 12,
  };

  return (
    <div style={{ padding: '32px 24px', fontFamily: 'system-ui' }}>
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Subscriptions</h1>
      <p style={{ fontSize: 14, color: '#666', marginBottom: 24 }}>
        Subscription and revenue overview.
      </p>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && data && (
        <>
          {/* Overview Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 32 }}>
            {[
              { label: 'Free', value: data.overview.free },
              { label: 'Pro', value: data.overview.pro },
              { label: 'Active Subscriptions', value: data.overview.activeSubscriptions },
              { label: 'Trial Users', value: data.overview.trialUsers },
              { label: 'Revenue (this month)', value: formatDollars(data.overview.revenueThisMonthCents) },
            ].map((card) => (
              <div
                key={card.label}
                style={{
                  background: 'white',
                  borderRadius: 12,
                  border: '1px solid #E5E5E5',
                  padding: '20px 24px',
                }}
              >
                <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>
                  {card.value}
                </div>
                <div style={{ fontSize: 13, color: '#666', fontWeight: 500 }}>
                  {card.label}
                </div>
              </div>
            ))}
          </div>

          {/* Subscription List */}
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Paid Subscriptions</h2>
          {data.subscriptions.length === 0 ? (
            <p style={{ color: '#999', fontSize: 14, marginBottom: 32 }}>No paid subscriptions yet.</p>
          ) : (
            <div style={{ marginBottom: 32 }}>
              {data.subscriptions.map((sub) => (
                <div key={sub.id} style={cardStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontWeight: 700, fontSize: 15 }}>{sub.userName ?? 'Unknown'}</span>
                    <span style={tierBadgeStyle(sub.tier)}>{sub.tier}</span>
                  </div>
                  <div style={{ fontSize: 13, color: '#999', marginBottom: 12 }}>
                    {sub.userEmail ?? ''}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={labelStyle}>Billing</span>
                      <span style={valueStyle}>
                        {sub.billingInterval ? sub.billingInterval : '-'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={labelStyle}>Period End</span>
                      <span style={valueStyle}>
                        {sub.currentPeriodEnd
                          ? new Date(sub.currentPeriodEnd).toLocaleDateString()
                          : '-'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={labelStyle}>Cancel at End</span>
                      <span style={valueStyle}>
                        {sub.cancelAtPeriodEnd ? (
                          <span style={{ color: '#C62828', fontWeight: 700 }}>Yes</span>
                        ) : (
                          <span style={{ color: '#999' }}>No</span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Recent Payments */}
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Recent Payments</h2>
          {data.recentPayments.length === 0 ? (
            <p style={{ color: '#999', fontSize: 14 }}>No payments yet.</p>
          ) : (
            <div>
              {data.recentPayments.map((p) => (
                <div key={p.id} style={cardStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontWeight: 700, fontSize: 16 }}>
                      {formatDollars(p.amountCents)}{' '}
                      <span style={{ fontSize: 12, fontWeight: 500, textTransform: 'uppercase', color: '#666' }}>
                        {p.currency}
                      </span>
                    </span>
                    <span style={paymentStatusStyle(p.status)}>{p.status}</span>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{p.userName ?? 'Unknown'}</div>
                  <div style={{ fontSize: 13, color: '#999' }}>
                    {p.createdAt
                      ? new Date(p.createdAt).toLocaleDateString()
                      : '-'}
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
