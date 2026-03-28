interface LoadingSpinnerProps {
  /** Render inside a white card container. Default: true */
  card?: boolean;
  /** Spinner size in px. Default: 24 */
  size?: number;
}

export function LoadingSpinner({ card = true, size = 24 }: LoadingSpinnerProps) {
  const spinner = (
    <div
      className="border-2 border-surface-300 border-t-primary-500 rounded-full animate-spin"
      style={{ width: size, height: size }}
    />
  );

  if (!card) {
    return (
      <div className="flex justify-center py-10">{spinner}</div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex justify-center">
      {spinner}
    </div>
  );
}
