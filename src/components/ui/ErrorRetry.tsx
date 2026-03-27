'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorRetryProps {
  /** Title text. Default: "Something went wrong" */
  title?: string;
  /** Subtitle text. Default: "Please try again." */
  subtitle?: string;
  /** Retry callback */
  onRetry: () => void;
  /** Render as a standalone card (true) or inline content (false). Default: true */
  card?: boolean;
}

export function ErrorRetry({
  title = 'Something went wrong',
  subtitle = 'Please try again.',
  onRetry,
  card = true,
}: ErrorRetryProps) {
  const content = (
    <>
      <div className="flex justify-center mb-3">
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
          <AlertCircle className="w-6 h-6 text-red-500" />
        </div>
      </div>
      <p className="text-surface-700 font-bold text-sm mb-1">{title}</p>
      <p className="text-surface-400 text-xs mb-3">{subtitle}</p>
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-surface-200 text-sm font-semibold text-surface-600 hover:bg-surface-50 transition-colors"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        Retry
      </button>
    </>
  );

  if (!card) return <div className="text-center">{content}</div>;

  return (
    <div
      className="card p-6 sm:p-8 text-center"
      style={{ background: '#FEF2F2', borderColor: '#FECACA' }}
    >
      {content}
    </div>
  );
}
