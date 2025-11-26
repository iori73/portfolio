'use client';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useTransition } from 'react';

interface LanguageSwitcherProps {
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
}

export function LanguageSwitcher({ className = '', activeClassName = '', inactiveClassName = '' }: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (newLocale: string) => {
    startTransition(() => {
      // Update locale in cookie and navigate
      document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`;
      // Force a full page reload to apply the new locale
      router.refresh();
    });
  };

  return (
    <div className={`flex items-center ${className}`}>
      <button
        onClick={() => switchLocale('en')}
        disabled={isPending}
        className={`font-helvetica-neue text-body-xl leading-[33.6px] text-center transition-[font-weight] duration-300 ${
          locale === 'en' ? activeClassName || 'font-bold' : inactiveClassName || 'font-light'
        }`}
      >
        EN
      </button>
      <span className="mx-2 text-body-sm leading-6">|</span>
      <button
        onClick={() => switchLocale('jp')}
        disabled={isPending}
        className={`font-helvetica-neue text-body-xl leading-[33.6px] text-center transition-[font-weight] duration-300 ${
          locale === 'jp' ? activeClassName || 'font-bold' : inactiveClassName || 'font-light'
        }`}
      >
        JP
      </button>
    </div>
  );
}

