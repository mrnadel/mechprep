import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center">
      <div className="w-full max-w-sm mx-auto flex flex-col min-h-screen px-6 pt-4 pb-8">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm font-bold text-surface-300 hover:text-surface-500 transition-colors w-fit"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12 5L7 10L12 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>

        {/* Logo */}
        <div className="flex flex-col items-center mt-10 sm:mt-16 mb-10">
          <span className="text-2xl font-black text-surface-900 tracking-tight">MechReady</span>
        </div>

        {/* Page content */}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
