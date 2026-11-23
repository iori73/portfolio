import type { ReactNode } from 'react';

interface ColorDotTagProps {
  /** Identity color for the category. Drawn only as the dot — never as text. */
  color: string;
  children: ReactNode;
  className?: string;
}

/**
 * Category / type tag: ink text on a neutral chip, with the identity color as a dot.
 *
 * Why not colored text: the category palette (podcast categories, plugin accents) was
 * picked to tell categories apart, not to be read. As text on its own tint, 10 of the 11
 * podcast colors fell below WCAG 4.5:1 (Business #FDCB6E was 1.29:1). Splitting the two
 * jobs keeps every tag at ~10:1 whatever color it carries, and matches the FilterBar's
 * dot + label pattern. (2026-11-23, option B of the contrast audit.)
 */
export default function ColorDotTag({ color, children, className = '' }: ColorDotTagProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 bg-surface-muted text-ink-secondary font-space-grotesk ${className}`}
    >
      <span
        aria-hidden="true"
        className="h-2 w-2 shrink-0 rounded-full"
        style={{ backgroundColor: color }}
      />
      {children}
    </span>
  );
}
