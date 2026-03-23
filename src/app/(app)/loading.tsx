export default function AppLoading() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] animate-pulse">
      {/* Header skeleton */}
      <div className="bg-white px-4 py-3 border-b-2 border-[#E5E5E5]">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface-100" />
            <div>
              <div className="h-4 w-24 bg-surface-100 rounded-md" />
              <div className="h-3 w-16 bg-surface-100 rounded-md mt-1.5" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-16 bg-surface-100 rounded-lg" />
            <div className="h-8 w-16 bg-surface-100 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
        {/* Practice card skeleton */}
        <div className="bg-white rounded-2xl border-2 border-[#E5E5E5] p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-surface-100" />
            <div className="flex-1">
              <div className="h-4 w-40 bg-surface-100 rounded-md" />
              <div className="h-3 w-28 bg-surface-100 rounded-md mt-2" />
            </div>
            <div className="h-10 w-24 bg-surface-100 rounded-xl" />
          </div>
        </div>

        {/* Unit header skeleton */}
        <div className="bg-white rounded-2xl border-2 border-[#E5E5E5] p-5">
          <div className="h-5 w-48 bg-surface-100 rounded-md" />
          <div className="h-3 w-32 bg-surface-100 rounded-md mt-2" />
          <div className="h-2 w-full bg-surface-100 rounded-full mt-4" />
        </div>

        {/* Lesson nodes skeleton */}
        <div className="flex flex-col items-center gap-4 py-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="w-16 h-16 rounded-full bg-surface-100"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
