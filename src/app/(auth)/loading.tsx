export default function AuthLoading() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-6">
      <div className="w-full max-w-sm animate-pulse">
        {/* Logo skeleton */}
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-surface-100" />
        </div>

        {/* Title skeleton */}
        <div className="h-7 w-32 bg-surface-100 rounded-lg mb-8" />

        {/* Google button skeleton */}
        <div className="h-12 w-full bg-surface-100 rounded-2xl mb-6" />

        {/* Divider skeleton */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-surface-200" />
          <div className="w-6 h-3 bg-surface-100 rounded" />
          <div className="flex-1 h-px bg-surface-200" />
        </div>

        {/* Form fields skeleton */}
        <div className="space-y-3">
          <div className="h-12 w-full bg-surface-100 rounded-2xl" />
          <div className="h-12 w-full bg-surface-100 rounded-2xl" />
          <div className="h-12 w-full bg-surface-100 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
