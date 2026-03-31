import type { ReactNode } from 'react';

interface EmptyStateProps {
  /** Large icon or emoji rendered at the top */
  icon: ReactNode;
  title: string;
  subtitle?: string;
  /** Optional action button or custom content below the text */
  action?: ReactNode;
  /** Background/border color overrides */
  bgColor?: string;
  borderColor?: string;
}

export function EmptyState({
  icon,
  title,
  subtitle,
  action,
  bgColor,
  borderColor,
}: EmptyStateProps) {
  return (
    <div
      className="card p-6 sm:p-8 text-center"
      style={{
        ...(bgColor ? { background: bgColor } : {}),
        ...(borderColor ? { borderColor } : {}),
      }}
    >
      <div className="flex justify-center mb-3">{icon}</div>
      <p className="text-surface-700 dark:text-surface-200 font-bold text-sm mb-1">{title}</p>
      {subtitle && <p className="text-surface-400 dark:text-surface-500 text-xs mb-3">{subtitle}</p>}
      {action}
    </div>
  );
}
