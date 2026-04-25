import { ReactNode } from 'react';

interface TagProps {
  children: ReactNode;
  size?: 'sm' | 'lg';
  className?: string;
}

export default function Tag({ children, size = 'sm', className = '' }: TagProps) {
  return (
    <span
      className={`font-space-grotesk ${size === 'lg' ? 'text-body-lg' : 'text-label'} leading-[1.3] px-3 py-1 rounded-lg bg-surface-muted text-ink-tertiary inline-block ${className}`}
    >
      {children}
    </span>
  );
}
