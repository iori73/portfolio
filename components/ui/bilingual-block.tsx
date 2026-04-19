import { ReactNode } from 'react';

interface BilingualBlockProps {
  en: ReactNode;
  jp: ReactNode;
  align?: 'start' | 'end';
  className?: string;
}

export default function BilingualBlock({ en, jp, align = 'start', className = '' }: BilingualBlockProps) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 ${align === 'end' ? 'md:items-end' : 'md:items-start'} ${className}`}
    >
      <div className="text-body-lg font-helvetica-neue leading-[1.6] text-ink">
        {en}
      </div>
      <div className="text-body-lg font-noto-sans-jp font-light leading-[1.75] text-ink">
        {jp}
      </div>
    </div>
  );
}
