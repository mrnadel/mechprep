import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-surface-200 bg-white">
      <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col gap-2 items-center md:flex-row md:justify-between">
        <p className="text-sm text-surface-500">
          &copy; 2026 MechReady
        </p>
        <nav className="flex items-center gap-6" aria-label="Footer">
          <Link href="/privacy" className="text-sm text-surface-500 hover:text-primary-600 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-sm text-surface-500 hover:text-primary-600 transition-colors">
            Terms of Service
          </Link>
          <Link href="/contact" className="text-sm text-surface-500 hover:text-primary-600 transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
