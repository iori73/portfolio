import { notFound } from 'next/navigation';

// Catch-all for unknown paths under a locale. next-intl rewrites unmatched
// URLs into the [locale] segment, so without this route Next.js falls back to
// its bare built-in 404 instead of the designed app/[locale]/not-found.tsx.
export default function CatchAllNotFound() {
  notFound();
}
