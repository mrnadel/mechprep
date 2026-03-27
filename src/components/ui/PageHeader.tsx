'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  /** Icon rendered before the title */
  icon?: React.ReactNode;
  /** Where the back button links to. Default: "/" */
  backHref?: string;
  /** Extra content rendered on the right side of the header */
  trailing?: React.ReactNode;
  /** Wrap children in max-w-2xl mx-auto. Default: false */
  maxWidth?: boolean;
}

export function PageHeader({
  title,
  subtitle,
  icon,
  backHref = '/',
  trailing,
  maxWidth = false,
}: PageHeaderProps) {
  return (
    <header
      className="sticky top-0 z-30 bg-white px-4 sm:px-5 py-3"
      style={{ borderBottom: '2px solid #E5E5E5' }}
    >
      <div className={`flex items-center gap-2 sm:gap-3${maxWidth ? ' max-w-2xl mx-auto' : ''}`}>
        <Link
          href={backHref}
          className="flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-[10px] transition-transform active:scale-90 lg:hidden"
          style={{ background: '#F0F0F0' }}
          aria-label="Back"
        >
          <ChevronLeft style={{ width: 20, height: 20, color: '#777' }} />
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="text-base sm:text-lg font-extrabold text-[#3C3C3C] flex items-center gap-2 leading-tight">
            {icon}
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs font-semibold mt-px" style={{ color: '#AFAFAF' }}>
              {subtitle}
            </p>
          )}
        </div>
        {trailing}
      </div>
    </header>
  );
}
