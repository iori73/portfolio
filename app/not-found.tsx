'use client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useBodyFont } from '@/src/hooks/useFonts';

export default function NotFound() {
  const t = useTranslations('notFound');
  const { getBodyFontClass, getBodyFontStyle } = useBodyFont();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] mt-24 md:mt-28">
      <div className="text-center">
        <h1
          className="text-heading-4xl md:text-heading-5xl mb-4"
          style={{
            fontFamily: 'Helvetica Neue, Helvetica, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            fontWeight: 500,
          }}
        >
          404
        </h1>
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-px h-12 bg-black"></div>
          <p className={`text-body-xl md:text-body-2xl ${getBodyFontClass()}`}>{t('message')}</p>
        </div>
        <Link
          href="/"
          className={`inline-block px-8 py-3 border-2 border-black rounded-[40px] hover:border-transparent hover:bg-black hover:text-white transition-all duration-300 text-body-lg`}
          style={{
            fontFamily: 'Helvetica Neue, Helvetica, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            fontWeight: 500,
          }}
        >
          {t('backToHome')}
        </Link>
      </div>
    </div>
  );
}
