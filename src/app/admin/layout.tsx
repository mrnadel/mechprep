'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/admin/feedback', label: 'Feedback' },
  { href: '/admin/analytics', label: 'Analytics' },
  { href: '/admin/users', label: 'Users' },
  { href: '/admin/content', label: 'Content' },
  { href: '/admin/subscriptions', label: 'Subs' },
  { href: '/admin/flags', label: 'Flags' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-4 flex items-center h-12 gap-3">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-[13px] font-semibold text-gray-500 hover:text-gray-700 transition-colors shrink-0 min-h-[44px] px-1"
        >
          <span className="text-base leading-none">&larr;</span>
          App
        </Link>
        <span className="text-[15px] font-extrabold text-gray-900 ml-auto">
          Admin
        </span>
      </div>

      {/* Nav tabs */}
      <nav className="bg-white border-b-2 border-gray-200 overflow-x-auto scrollbar-none">
        <div className="flex px-3 gap-0.5 min-w-max">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'text-[13px] py-3 px-4 -mb-[2px] whitespace-nowrap border-b-2 transition-colors min-h-[44px] flex items-center',
                  isActive
                    ? 'font-bold text-gray-900 border-gray-900'
                    : 'font-medium text-gray-400 border-transparent hover:text-gray-600'
                )}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Page content */}
      <main className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}
