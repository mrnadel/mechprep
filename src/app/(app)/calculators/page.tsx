import { PageHeader } from '@/components/ui/PageHeader';
import FinanceCalculators from '@/components/calculator/FinanceCalculators';

export const metadata = {
  title: 'Finance Calculators',
  description: 'Compound interest, loan payoff, and budget calculators for personal finance planning.',
};

export default function CalculatorsPage() {
  return (
    <div style={{ minHeight: '100dvh', background: '#F8FAFC' }}>
      <PageHeader
        title="Finance Calculators"
        subtitle="Plan your financial future"
        backHref="/"
      />
      <div style={{ paddingTop: 20 }}>
        <FinanceCalculators />
      </div>
    </div>
  );
}
