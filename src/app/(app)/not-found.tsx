import Link from 'next/link';

export default function AppNotFound() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        {/* Gear illustration */}
        <div className="mb-6 flex justify-center">
          <div className="relative w-24 h-24">
            <svg viewBox="0 0 120 120" className="w-full h-full text-primary-200">
              <path
                fill="currentColor"
                d="M60 10l6 14a36 36 0 0110.4 4.3l14.6-3.8 5.5 9.5-8.6 12a36 36 0 014.3 10.4L106 60l-3.5 10-14.6-3.8a36 36 0 01-4.3 10.4l8.6 12-9.5 5.5-12-8.6a36 36 0 01-10.4 4.3L60 110l-10-3.5 3.8-14.6a36 36 0 01-10.4-4.3l-12 8.6-5.5-9.5 8.6-12A36 36 0 0130.2 64.3L14 60l3.5-10 14.6 3.8a36 36 0 014.3-10.4l-8.6-12 9.5-5.5 12 8.6A36 36 0 0159.7 30.2L60 10z"
              />
              <circle cx="60" cy="60" r="20" fill="#FAFAFA" />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-2xl font-black text-primary-600">
              404
            </span>
          </div>
        </div>

        <h1 className="text-2xl font-black text-surface-900 mb-2">
          Page Not Found
        </h1>
        <p className="text-surface-500 mb-8 leading-relaxed">
          We couldn&apos;t find what you were looking for. It might have been moved or doesn&apos;t exist.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary">
            Back to Dashboard
          </Link>
          <Link href="/course" className="btn-secondary">
            Course Map
          </Link>
        </div>
      </div>
    </div>
  );
}
