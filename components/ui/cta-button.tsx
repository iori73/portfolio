import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/src/lib/utils';

/**
 * CTAButton — the site's primary call-to-action.
 * Solid ink fill + white text (high-contrast, HIG-style primary). It already
 * reads as a real button at rest; hover is a subtle lightening only.
 * Renders an external `<a>` when `external`, otherwise a client-nav `<Link>`.
 */
interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
  'aria-label'?: string;
}

const CTA_CLASS =
  'inline-flex items-center justify-center px-6 py-3 rounded-pill bg-ink text-white ' +
  'text-body-lg font-medium whitespace-nowrap transition-colors duration-200 hover:bg-ink-secondary';

export function CTAButton({ href, children, external, className, ...rest }: CTAButtonProps) {
  const cls = cn(CTA_CLASS, className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}
