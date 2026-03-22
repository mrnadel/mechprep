import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* ── Left Panel: Branding (desktop only) ── */}
      <div className="hidden lg:flex lg:w-[480px] xl:w-[560px] bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 flex-col justify-between p-10 relative overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/5" />
        <div className="absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute top-1/2 right-10 w-40 h-40 rounded-full bg-white/[0.03]" />

        {/* Logo */}
        <div>
          <Link href="/" className="text-2xl font-black text-white tracking-tight no-underline">
            MechReady
          </Link>
        </div>

        {/* Hero content */}
        <div className="relative z-10">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-8">
            <span className="text-4xl">&#x2699;&#xFE0F;</span>
          </div>
          <h1 className="text-4xl xl:text-5xl font-black text-white leading-[1.1] mb-5">
            Study for interviews
            <br />
            <span className="text-[#86EFAC]">without it feeling
            <br />like studying</span>
          </h1>
          <p className="text-indigo-200 text-base leading-relaxed max-w-sm">
            Earn XP, keep your streak, unlock achievements — and actually remember what you learn.
          </p>
        </div>

        {/* Stats */}
        <div className="flex gap-8 relative z-10">
          {[
            { num: '10', label: 'Units' },
            { num: '200+', label: 'Questions' },
            { num: '12', label: 'Types' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-black text-white">{s.num}</div>
              <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right Panel: Auth Form ── */}
      <div className="flex-1 bg-[#FAFAFA] flex flex-col items-center">
        <div className="w-full max-w-md mx-auto flex flex-col min-h-screen px-6 pt-4 pb-8 lg:justify-center lg:min-h-0 lg:py-12">
          {/* Back arrow (mobile) */}
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm font-bold text-surface-300 hover:text-surface-500 transition-colors w-fit lg:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12 5L7 10L12 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

          {/* Back link (desktop) */}
          <Link
            href="/"
            className="hidden lg:inline-flex items-center gap-1.5 text-sm font-bold text-surface-300 hover:text-surface-500 transition-colors w-fit mb-8"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path d="M12 5L7 10L12 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to home
          </Link>

          {/* Logo */}
          <div className="flex flex-col items-center mt-10 sm:mt-16 mb-10 lg:mt-0 lg:mb-8">
            <span className="text-2xl font-black text-surface-900 tracking-tight lg:text-3xl">MechReady</span>
            <p className="hidden lg:block text-sm text-surface-400 font-semibold mt-2">
              Mechanical engineering interview prep
            </p>
          </div>

          {/* Page content */}
          <div className="flex-1 lg:flex-none">{children}</div>
        </div>
      </div>
    </div>
  );
}
