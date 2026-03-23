import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FAFAFA] lg:bg-[#E5E7EB] flex flex-col items-center lg:justify-center">
      <div className="w-full max-w-md lg:max-w-lg mx-auto flex flex-col min-h-screen lg:min-h-0 px-5 sm:px-6 pt-4 pb-8 bg-[#FAFAFA] lg:rounded-2xl lg:shadow-xl lg:border lg:border-gray-200 lg:my-8 lg:pb-10 lg:pt-8">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm font-bold text-surface-300 hover:text-surface-500 transition-colors w-fit min-w-[44px] min-h-[44px]"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M12 5L7 10L12 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="hidden lg:inline">Back to home</span>
          <span className="lg:hidden sr-only">Back to home</span>
        </Link>

        {/* Logo */}
        <div className="flex flex-col items-center mt-8 sm:mt-12 mb-8 lg:mt-6 lg:mb-8">
          <span className="text-xl sm:text-2xl font-black text-surface-900 tracking-tight">MechReady</span>
          <p className="hidden lg:block text-sm text-surface-400 font-semibold mt-2">
            Mechanical engineering interview prep
          </p>
        </div>

        {/* Page content */}
        <div className="flex-1 lg:flex-none">{children}</div>
      </div>
    </div>
  );
}
