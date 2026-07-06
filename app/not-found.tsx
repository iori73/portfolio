import Link from 'next/link';

// Root-level safety net for unmatched paths that fall outside the [locale]
// segment (e.g. middleware-excluded routes). Locale pages use the richer
// app/[locale]/not-found.tsx instead. Kept dependency-free since this renders
// outside the NextIntlClientProvider.
export default function RootNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] mt-24">
      <div className="text-center">
        <h1 className="text-display mb-4">404</h1>
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-px h-12 bg-ink" />
          <p className="text-title-lg">This page could not be found.</p>
        </div>
        <Link
          href="/"
          className="inline-block px-8 py-3 border-2 border-ink rounded-[40px] hover:border-transparent hover:bg-ink hover:text-white transition-all duration-300 text-body-lg font-helvetica-neue font-medium"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
