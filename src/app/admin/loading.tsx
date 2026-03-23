export default function AdminLoading() {
  return (
    <div className="animate-pulse" style={{ padding: '32px 24px', fontFamily: 'system-ui' }}>
      {/* Title skeleton */}
      <div className="h-7 w-48 bg-gray-200 rounded-lg mb-2" />
      <div className="h-4 w-64 bg-gray-100 rounded-md mb-6" />

      {/* Stats grid skeleton */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-200 p-5"
          >
            <div className="h-8 w-16 bg-gray-100 rounded-md mb-2" />
            <div className="h-3 w-24 bg-gray-100 rounded-md" />
          </div>
        ))}
      </div>

      {/* Table skeleton */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="h-4 w-32 bg-gray-100 rounded-md" />
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 px-4 py-3 border-b border-gray-50"
          >
            <div className="h-4 w-32 bg-gray-100 rounded-md" />
            <div className="h-4 w-16 bg-gray-100 rounded-md" />
            <div className="h-4 w-12 bg-gray-100 rounded-md ml-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}
