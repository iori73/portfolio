'use client';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useJPFontSize, useBodyFont, useHeadingFont } from '@/src/hooks/useFonts';
import { usePageTransition } from '@/src/contexts/TransitionContext';

export default function Home() {
  const t = useTranslations();
  const locale = useLocale();
  const { jpFontSize } = useJPFontSize();
  const { getBodyFontClass, getBodyFontStyle } = useBodyFont();
  const { getHeadingFontClass, getHeadingFontStyle } = useHeadingFont();
  const { startTransition } = usePageTransition();
  const ukiyoeImageRef = useRef<HTMLDivElement>(null);

  return (
    <div className="mt-24 md:mt-28 md:mb-16">
      {/* Hero Section - Bilingual Layout */}
      <section className="py-16 md:py-24">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-end">
          {/* Left Column - English */}
          <div className="flex-1">
            <h1 className="text-display mb-2">{t('hero.name')}</h1>
            <p className="text-body-lg font-helvetica-neue mb-1">{t('hero.description1')}</p>
            <p className="text-body-lg font-helvetica-neue">{t('hero.description2')}</p>
          </div>

          {/* Right Column - Japanese */}
          <div className="flex-1">
            <p className="text-body-lg font-noto-sans-jp font-light mb-1">
              好奇心が私の仕事と人生を動かしています。
            </p>
            <p className="text-body-lg font-noto-sans-jp font-light">誰もがつくれる時代に、デザインに「意味」をもたらすものを探っています。</p>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section className="py-8">
        {/* h2: Heading/L_M_120 - 常に英語 */}
        <h2 className="text-headline mb-16">Work</h2>

        {/* Project 0 - Ukiyoe */}
        <div
          className="block mb-16 cursor-pointer hover:opacity-80"
          role="link"
          tabIndex={0}
          onClick={() => {
            const rect = ukiyoeImageRef.current?.getBoundingClientRect();
            if (!rect) return;
            const imageSrc = locale === 'jp' ? '/work/ukiyoe/thumbnail-jp.png' : '/work/ukiyoe/thumbnail-en.png';
            startTransition(imageSrc, rect, '/work/ukiyoe');
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              const rect = ukiyoeImageRef.current?.getBoundingClientRect();
              if (!rect) return;
              const imageSrc = locale === 'jp' ? '/work/ukiyoe/thumbnail-jp.png' : '/work/ukiyoe/thumbnail-en.png';
              startTransition(imageSrc, rect, '/work/ukiyoe');
            }
          }}
        >
          <div className="mb-20">
            <div className="mb-6" ref={ukiyoeImageRef}>
              <Image
                src={locale === 'jp' ? '/work/ukiyoe/thumbnail-jp.png' : '/work/ukiyoe/thumbnail-en.png'}
                alt="Ukiyoe: Layer by Layer"
                width={600}
                height={300}
                className="w-full object-cover rounded-lg"
              />
            </div>

            <div className="flex items-center gap-6 mb-4 flex-wrap md:flex-nowrap">
              <h3 className={`text-title-lg ${getHeadingFontClass()}`}>
                {t('projects.ukiyoe.title')}
              </h3>
              <div className="flex gap-2">
                <span className="font-space-grotesk text-label md:text-body-lg leading-[1.3] px-3 py-1 rounded-lg bg-surface-muted text-ink-tertiary">
                  UI
                </span>
                <span className="font-space-grotesk text-label md:text-body-lg leading-[1.3] px-3 py-1 rounded-lg bg-surface-muted text-ink-tertiary">
                  Context Engineering
                </span>
              </div>
            </div>

            <p className={`mb-2 text-body-lg ${getBodyFontClass()}`}>{t('projects.ukiyoe.description1')}</p>
            <p
              className={`${getBodyFontClass()} ${jpFontSize(
                'text-body',
                'text-body-lg',
                'text-body-sm',
                'text-body',
              )}`}
            >
              {t('projects.ukiyoe.description2')}
            </p>
          </div>
        </div>

        {/* Project 1 - Figma Plugins */}
        <Link href="/work/figma-plugins" className="block mb-16 hover:opacity-80">
          <div className="mb-20">
            <div className="mb-6 w-full aspect-[2/1] rounded-lg bg-surface-muted flex items-center justify-center overflow-hidden">
              <div className="flex items-center gap-3 text-ink-tertiary">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="font-space-grotesk text-body-lg">Thumbnail coming soon</span>
              </div>
            </div>

            <div className="flex items-center gap-6 mb-4 flex-wrap md:flex-nowrap">
              <h3 className={`text-title-lg ${getHeadingFontClass()}`}>
                {t('projects.figmaPlugins.title')}
              </h3>
              <div className="flex gap-2">
                <span className="font-space-grotesk text-label md:text-body-lg leading-[1.3] px-3 py-1 rounded-lg bg-surface-muted text-ink-tertiary">
                  Figma Plugin
                </span>
                <span className="font-space-grotesk text-label md:text-body-lg leading-[1.3] px-3 py-1 rounded-lg bg-surface-muted text-ink-tertiary">
                  AI Vibe Coding
                </span>
              </div>
            </div>

            <p className={`mb-2 text-body-lg ${getBodyFontClass()}`}>{t('projects.figmaPlugins.description1')}</p>
            <p
              className={`${getBodyFontClass()} ${jpFontSize(
                'text-body',
                'text-body-lg',
                'text-body-sm',
                'text-body',
              )}`}
            >
              {t('projects.figmaPlugins.description2')}
            </p>
          </div>
        </Link>

      </section>
    </div>
  );
}
