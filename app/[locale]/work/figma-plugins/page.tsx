'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { MoveUpRight } from 'lucide-react';
import BackToTopButton from '@/src/compositions/BackToTopButton';
import { useJPFontSize, useBodyFont, useHeadingFont } from '@/src/hooks/useFonts';
import ConceptC from '@/components/work/figma-plugins/ConceptC';

export default function FigmaPluginsPage() {
  const t = useTranslations('figmaPlugins');
  const tWork = useTranslations('work');
  const { jpFontSize } = useJPFontSize();
  const { getBodyFontClass } = useBodyFont();
  const { getHeadingFontClass } = useHeadingFont();

  const bodyTextClass = `${getBodyFontClass()} tracking-[0.2px] ${jpFontSize('text-body-base', 'text-body-lg')}`;

  return (
    <div className={`my-24 md:mt-28 md:mb-16 ${getBodyFontClass()}`}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Project Header */}
        <div className="max-w-[1028px] mx-auto mb-12">
          <span className="font-space-grotesk text-label text-ink-tertiary">
            Work
          </span>
          <h1 className={`text-headline text-ink mt-2 ${getHeadingFontClass()}`}>
            {t('title')}
          </h1>
          <p className={`text-body-lg text-ink-secondary mt-3 max-w-2xl ${getBodyFontClass()} tracking-[0.2px]`}>
            {t('subtitle')}
          </p>
        </div>

        {/* Overview */}
        <section className="max-w-[1028px] mx-auto mb-16">
          <h2 className={`text-title-lg mb-6 ${getHeadingFontClass()}`}>
            {tWork('overview')}
          </h2>
          <p className={`mb-4 text-ink-secondary ${bodyTextClass}`}>
            {t('overviewText1')}
          </p>
          <p className={`mb-6 text-ink-secondary ${bodyTextClass}`}>
            {t('overviewText2')}
          </p>

          <div className="mt-8">
            <a
              href="https://www.figma.com/@io_73"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center">
                <svg viewBox="0 0 38 57" className="w-5 h-5 md:w-6 md:h-6" fill="none">
                  <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE"/>
                  <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z" fill="#0ACF83"/>
                  <path d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19z" fill="#FF7262"/>
                  <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E"/>
                  <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF"/>
                </svg>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-body-sm md:text-body-lg leading-[1.25] font-normal text-ink-tertiary">
                  Figma Community
                </span>
                <span className="text-body-sm md:text-body-lg leading-[1.25] font-normal text-ink-tertiary">
                  /
                </span>
                <span className="text-body-sm md:text-body-lg leading-[1.25] font-semibold text-ink">
                  @io_73
                </span>
              </div>
              <MoveUpRight className="w-4 h-4 md:w-5 md:h-5 text-ink-tertiary flex-shrink-0" />
            </a>
          </div>
        </section>

        {/* Gallery */}
        <ConceptC />
      </div>

      <BackToTopButton />
    </div>
  );
}
