import { ReactNode } from 'react';

interface TLDRCalloutProps {
  label?: string;
  children: ReactNode;
  className?: string;
}

export default function TLDRCallout({ label = 'TL;DR', children, className = '' }: TLDRCalloutProps) {
  return (
    <aside className={`bg-surface-muted rounded-lg px-7 py-6 my-8 ${className}`}>
      <div className="font-space-grotesk text-label font-semibold text-ink-tertiary uppercase tracking-[0.04em] mb-2">
        {label}
      </div>
      <div className="text-body-lg leading-[1.6] text-ink">
        {children}
      </div>
    </aside>
  );
}
