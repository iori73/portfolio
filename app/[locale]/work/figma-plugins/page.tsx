'use client';

import React, { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { MoveUpRight } from 'lucide-react';
import BackToTopButton from '@/src/compositions/BackToTopButton';
import { useJPFontSize, useBodyFont, useHeadingFont } from '@/src/hooks/useFonts';
import ConceptC from '@/components/work/figma-plugins/ConceptC';
import PluginCardDeckThumb, { PLUGIN_DECK_HERO_MAX_SCALE } from '@/components/work/figma-plugins/PluginCardDeckThumb';
import { usePageTransition } from '@/src/contexts/TransitionContext';
import { plugins, formatUsers } from '@/components/work/figma-plugins/pluginData';

export default function FigmaPluginsPage() {
  const t = useTranslations('figmaPlugins');
  const tWork = useTranslations('work');
  const { jpFontSize } = useJPFontSize();
  const { getBodyFontClass } = useBodyFont();
  const { getHeadingFontClass } = useHeadingFont();

  const { state: transitionState, endTransition } = usePageTransition();

  useEffect(() => {
    if (transitionState.phase === 'navigating') {
      const timeout = setTimeout(() => endTransition(), 100);
      return () => clearTimeout(timeout);
    }
  }, [transitionState.phase, endTransition]);

  const bodyTextClass = `${getBodyFontClass()} tracking-[0.2px] ${jpFontSize('text-body-base', 'text-body-lg')}`;
  const totalUsers = plugins.reduce((sum, p) => sum + (p.users ?? 0), 0);

  return (
    <div className={`my-24 md:mt-28 md:mb-16 ${getBodyFontClass()}`}>
      <BackToTopButton />

      {/* Hero */}
      <section className="mb-0 md:mb-12 full-bleed">
        <div className="w-full">
          <div className="w-full aspect-[5/2] bg-[#F5F5F7] overflow-hidden relative">
            <PluginCardDeckThumb maxScale={PLUGIN_DECK_HERO_MAX_SCALE} />
          </div>
        </div>
      </section>

      <div className="w-full">

        {/* Project Header */}
        <div className="mb-12 mt-6 md:mt-12">
          <span className="font-space-grotesk text-label text-ink-tertiary">
            Work
          </span>
          <h1 className={`text-headline text-ink mt-2 ${getHeadingFontClass()}`}>
            {t('title')}
          </h1>
          <p className={`text-body-lg text-ink-secondary mt-3 max-w-2xl ${getBodyFontClass()} tracking-[0.2px]`}>
            {t('subtitle')}
          </p>

          <div className="grid grid-cols-2 gap-6 mt-8 max-w-md">
            <div>
              <span className="text-caption-lg font-space-grotesk font-semibold text-ink-tertiary mb-2 block">
                Total tools
              </span>
              <p className="text-body-lg tracking-[0.2px]">{plugins.length}</p>
            </div>
            <div>
              <span className="text-caption-lg font-space-grotesk font-semibold text-ink-tertiary mb-2 block">
                Users
              </span>
              <p className="text-body-lg tracking-[0.2px]">{formatUsers(totalUsers)}+</p>
            </div>
          </div>
        </div>

        {/* Overview */}
        <section className="mb-16">
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
    </div>
  );
}
