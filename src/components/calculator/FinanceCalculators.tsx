// src/components/calculator/FinanceCalculators.tsx
'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Helpers ──

function fmt(n: number): string {
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtInt(n: number): string {
  return n.toLocaleString('en-US');
}

// ── Types ──

type TabId = 'compound' | 'loan' | 'budget';

interface TabDef {
  id: TabId;
  label: string;
  icon: string;
}

const TABS: TabDef[] = [
  { id: 'compound', label: 'Compound Interest', icon: '📈' },
  { id: 'loan', label: 'Loan Payoff', icon: '🏦' },
  { id: 'budget', label: 'Budget 50/30/20', icon: '💰' },
];

// ── Shared input component ──

function CalcInput({
  label,
  value,
  onChange,
  prefix,
  suffix,
  min = 0,
  max,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <label style={{ fontSize: 13, fontWeight: 700, color: '#64748B' }}>{label}</label>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        background: 'white',
        border: '1.5px solid #E2E8F0',
        borderRadius: 8,
        overflow: 'hidden',
        transition: 'border-color 0.2s',
      }}>
        {prefix && (
          <span style={{ padding: '0 0 0 12px', fontSize: 14, fontWeight: 700, color: '#94A3B8' }}>
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          min={min}
          max={max}
          step={step}
          style={{
            flex: 1,
            padding: '10px 12px',
            border: 'none',
            outline: 'none',
            fontSize: 15,
            fontWeight: 700,
            color: '#1E293B',
            background: 'transparent',
            width: '100%',
            minWidth: 0,
          }}
        />
        {suffix && (
          <span style={{ padding: '0 12px 0 0', fontSize: 14, fontWeight: 700, color: '#94A3B8' }}>
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

// ── Result row ──

function ResultRow({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 0',
      borderBottom: '1px solid #F1F5F9',
    }}>
      <span style={{ fontSize: 14, fontWeight: 600, color: '#64748B' }}>{label}</span>
      <span style={{ fontSize: 15, fontWeight: 800, color: color || '#1E293B' }}>{value}</span>
    </div>
  );
}

// ── Tab 1: Compound Interest ──

function CompoundInterestCalc() {
  const [initial, setInitial] = useState(1000);
  const [monthly, setMonthly] = useState(200);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(30);

  const result = useMemo(() => {
    const r = rate / 100 / 12;
    const n = years * 12;
    // Future value of lump sum + future value of annuity
    const fvLump = initial * Math.pow(1 + r, n);
    const fvAnnuity = r > 0 ? monthly * ((Math.pow(1 + r, n) - 1) / r) : monthly * n;
    const finalBalance = fvLump + fvAnnuity;
    const totalContributions = initial + monthly * n;
    const totalInterest = finalBalance - totalContributions;
    return { finalBalance, totalContributions, totalInterest };
  }, [initial, monthly, rate, years]);

  const contribPct = result.finalBalance > 0
    ? (result.totalContributions / result.finalBalance) * 100
    : 0;
  const interestPct = result.finalBalance > 0
    ? (result.totalInterest / result.finalBalance) * 100
    : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <CalcInput label="Initial Amount" value={initial} onChange={setInitial} prefix="$" />
        <CalcInput label="Monthly Contribution" value={monthly} onChange={setMonthly} prefix="$" />
        <CalcInput label="Annual Interest Rate" value={rate} onChange={setRate} suffix="%" step={0.1} />
        <CalcInput label="Time Period" value={years} onChange={setYears} suffix="years" min={1} max={50} />
      </div>

      <motion.div
        key={`${initial}-${monthly}-${rate}-${years}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        style={{
          background: '#F0FDF4',
          borderRadius: 12,
          padding: 16,
          border: '1.5px solid #A7F3D0',
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 700, color: '#047857', marginBottom: 4 }}>
          Final Balance
        </div>
        <div style={{ fontSize: 28, fontWeight: 800, color: '#059669', lineHeight: 1.2 }}>
          {fmt(result.finalBalance)}
        </div>
      </motion.div>

      <div>
        <ResultRow label="Total Contributions" value={fmt(result.totalContributions)} color="#3B82F6" />
        <ResultRow label="Total Interest Earned" value={fmt(result.totalInterest)} color="#10B981" />
      </div>

      {/* Visual bar */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8', marginBottom: 6 }}>
          Contributions vs Interest
        </div>
        <div style={{
          display: 'flex',
          borderRadius: 8,
          overflow: 'hidden',
          height: 28,
          background: '#F1F5F9',
        }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.max(contribPct, 0)}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              background: '#3B82F6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: contribPct > 10 ? undefined : 0,
            }}
          >
            {contribPct > 15 && (
              <span style={{ fontSize: 11, fontWeight: 800, color: 'white' }}>
                {contribPct.toFixed(0)}%
              </span>
            )}
          </motion.div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.max(interestPct, 0)}%` }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            style={{
              background: '#10B981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: interestPct > 10 ? undefined : 0,
            }}
          >
            {interestPct > 15 && (
              <span style={{ fontSize: 11, fontWeight: 800, color: 'white' }}>
                {interestPct.toFixed(0)}%
              </span>
            )}
          </motion.div>
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 10, height: 10, borderRadius: 3, background: '#3B82F6' }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: '#64748B' }}>Contributions</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 10, height: 10, borderRadius: 3, background: '#10B981' }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: '#64748B' }}>Interest</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Tab 2: Loan Payoff ──

function LoanPayoffCalc() {
  const [balance, setBalance] = useState(25000);
  const [rate, setRate] = useState(6.5);
  const [payment, setPayment] = useState(500);

  const result = useMemo(() => {
    const monthlyRate = rate / 100 / 12;
    if (monthlyRate === 0) {
      const months = balance > 0 && payment > 0 ? Math.ceil(balance / payment) : 0;
      return {
        months,
        totalInterest: 0,
        totalCost: balance,
        extra50: { months: payment + 50 > 0 ? Math.ceil(balance / (payment + 50)) : 0, savings: 0 },
        extra100: { months: payment + 100 > 0 ? Math.ceil(balance / (payment + 100)) : 0, savings: 0 },
      };
    }

    // Minimum payment to cover interest
    const minPayment = balance * monthlyRate;
    if (payment <= minPayment) {
      return { months: Infinity, totalInterest: Infinity, totalCost: Infinity, extra50: null, extra100: null };
    }

    const calcPayoff = (bal: number, pmt: number): { months: number; totalInterest: number; totalCost: number } => {
      if (pmt <= bal * monthlyRate) return { months: Infinity, totalInterest: Infinity, totalCost: Infinity };
      const months = Math.ceil(
        -Math.log(1 - (bal * monthlyRate) / pmt) / Math.log(1 + monthlyRate)
      );
      const totalCost = pmt * months;
      const totalInterest = totalCost - bal;
      return { months, totalInterest, totalCost };
    };

    const base = calcPayoff(balance, payment);
    const with50 = calcPayoff(balance, payment + 50);
    const with100 = calcPayoff(balance, payment + 100);

    return {
      ...base,
      extra50: {
        months: with50.months,
        savings: base.totalInterest - with50.totalInterest,
      },
      extra100: {
        months: with100.months,
        savings: base.totalInterest - with100.totalInterest,
      },
    };
  }, [balance, rate, payment]);

  const isInfinite = result.months === Infinity;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <CalcInput label="Loan Balance" value={balance} onChange={setBalance} prefix="$" />
        <CalcInput label="Interest Rate" value={rate} onChange={setRate} suffix="%" step={0.1} />
      </div>
      <CalcInput label="Monthly Payment" value={payment} onChange={setPayment} prefix="$" />

      {isInfinite ? (
        <div style={{
          background: '#FEF2F2',
          borderRadius: 12,
          padding: 16,
          border: '1.5px solid #FECACA',
        }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#DC2626' }}>
            Payment too low to cover interest. Increase your monthly payment above {fmt(balance * (rate / 100 / 12))}.
          </div>
        </div>
      ) : (
        <>
          <motion.div
            key={`${balance}-${rate}-${payment}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              background: '#F0FDF4',
              borderRadius: 12,
              padding: 16,
              border: '1.5px solid #A7F3D0',
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 700, color: '#047857', marginBottom: 4 }}>
              Payoff Time
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#059669', lineHeight: 1.2 }}>
              {fmtInt(result.months)} months
              <span style={{ fontSize: 15, fontWeight: 600, color: '#64748B', marginLeft: 8 }}>
                ({(result.months / 12).toFixed(1)} years)
              </span>
            </div>
          </motion.div>

          <div>
            <ResultRow label="Total Interest Paid" value={fmt(result.totalInterest)} color="#EF4444" />
            <ResultRow label="Total Cost" value={fmt(result.totalCost)} />
          </div>

          {/* Extra payment comparison */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#64748B', marginBottom: 8 }}>
              What if you pay extra?
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {result.extra50 && (
                <div style={{
                  background: '#EFF6FF',
                  borderRadius: 10,
                  padding: 12,
                  border: '1px solid #BFDBFE',
                }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#3B82F6', marginBottom: 2 }}>
                    +$50/month
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: '#1E293B' }}>
                    {fmtInt(result.extra50.months)} months
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#10B981', marginTop: 2 }}>
                    Save {fmt(result.extra50.savings)}
                  </div>
                </div>
              )}
              {result.extra100 && (
                <div style={{
                  background: '#ECFDF5',
                  borderRadius: 10,
                  padding: 12,
                  border: '1px solid #A7F3D0',
                }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#10B981', marginBottom: 2 }}>
                    +$100/month
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: '#1E293B' }}>
                    {fmtInt(result.extra100.months)} months
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#10B981', marginTop: 2 }}>
                    Save {fmt(result.extra100.savings)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ── Tab 3: Budget 50/30/20 ──

const BUDGET_SEGMENTS = [
  { label: 'Needs', pct: 50, color: '#3B82F6', bgColor: '#EFF6FF', examples: 'Rent, food, utilities, insurance' },
  { label: 'Wants', pct: 30, color: '#F59E0B', bgColor: '#FFFBEB', examples: 'Dining out, hobbies, streaming' },
  { label: 'Savings', pct: 20, color: '#10B981', bgColor: '#F0FDF4', examples: 'Emergency fund, investments, debt payoff' },
] as const;

function BudgetCalc() {
  const [income, setIncome] = useState(5000);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <CalcInput label="Monthly Net Income" value={income} onChange={setIncome} prefix="$" />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {BUDGET_SEGMENTS.map((seg) => {
          const amount = income * (seg.pct / 100);
          return (
            <motion.div
              key={seg.label}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                background: seg.bgColor,
                borderRadius: 12,
                padding: 14,
                borderLeft: `4px solid ${seg.color}`,
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 4,
              }}>
                <div>
                  <span style={{ fontSize: 15, fontWeight: 800, color: '#1E293B' }}>
                    {seg.label}
                  </span>
                  <span style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: seg.color,
                    marginLeft: 6,
                    background: 'white',
                    padding: '1px 6px',
                    borderRadius: 6,
                  }}>
                    {seg.pct}%
                  </span>
                </div>
                <span style={{ fontSize: 20, fontWeight: 800, color: seg.color }}>
                  {fmt(amount)}
                </span>
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#94A3B8' }}>
                {seg.examples}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Stacked bar */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8', marginBottom: 6 }}>
          Breakdown
        </div>
        <div style={{
          display: 'flex',
          borderRadius: 8,
          overflow: 'hidden',
          height: 28,
        }}>
          {BUDGET_SEGMENTS.map((seg) => (
            <motion.div
              key={seg.label}
              initial={{ width: 0 }}
              animate={{ width: `${seg.pct}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{
                background: seg.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: 11, fontWeight: 800, color: 'white' }}>
                {seg.pct}%
              </span>
            </motion.div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 14, marginTop: 6, flexWrap: 'wrap' }}>
          {BUDGET_SEGMENTS.map((seg) => (
            <div key={seg.label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: seg.color }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: '#64748B' }}>{seg.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly breakdown */}
      <div style={{
        background: 'white',
        borderRadius: 10,
        padding: 12,
        border: '1px solid #E2E8F0',
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8', marginBottom: 8 }}>
          Weekly Breakdown
        </div>
        {BUDGET_SEGMENTS.map((seg) => {
          const weekly = (income * (seg.pct / 100)) / 4.33;
          return (
            <div key={seg.label} style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '4px 0',
            }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#64748B' }}>{seg.label}</span>
              <span style={{ fontSize: 13, fontWeight: 800, color: seg.color }}>
                {fmt(weekly)}/week
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Main component ──

export default function FinanceCalculators() {
  const [activeTab, setActiveTab] = useState<TabId>('compound');

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 16px 32px' }}>
      {/* Tab bar */}
      <div style={{
        display: 'flex',
        gap: 4,
        background: '#F1F5F9',
        borderRadius: 12,
        padding: 4,
        marginBottom: 20,
      }}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              padding: '10px 8px',
              borderRadius: 10,
              border: 'none',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 700,
              background: activeTab === tab.id ? 'white' : 'transparent',
              color: activeTab === tab.id ? '#1E293B' : '#94A3B8',
              boxShadow: activeTab === tab.id ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
            }}
          >
            <span style={{ fontSize: 15 }}>{tab.icon}</span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Calculator content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'compound' && <CompoundInterestCalc />}
          {activeTab === 'loan' && <LoanPayoffCalc />}
          {activeTab === 'budget' && <BudgetCalc />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
