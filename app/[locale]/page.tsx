'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { useJPFontSize, useBodyFont, useHeadingFont } from '@/src/hooks/useFonts';
import { usePageTransition } from '@/src/contexts/TransitionContext';
import PluginCardDeckThumb from '@/components/work/figma-plugins/PluginCardDeckThumb';
// The hero pairs both languages on screen at the same time, so it cannot go
// through useTranslations — that resolves to the active locale only.
import enMessages from '@/messages/en.json';
import jpMessages from '@/messages/jp.json';

const enHero = enMessages.hero;
const jpHero = jpMessages.hero;

export default function Home() {
  const t = useTranslations();
  const locale = useLocale();
  const { jpFontSize } = useJPFontSize();
  const { getBodyFontClass, getBodyFontStyle } = useBodyFont();
  const { getHeadingFontClass, getHeadingFontStyle } = useHeadingFont();
  const { startTransition } = usePageTransition();
  const ukiyoeImageRef = useRef<HTMLDivElement>(null);
  const figmaPluginsImageRef = useRef<HTMLDivElement>(null);

  return (
    <div className="mt-24 md:mt-28 md:mb-16">
      {/* Hero Section - Bilingual Layout */}
      <section className="py-16 md:py-24">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 md:items-end">
          {/* Left Column - English.
              Read straight from the EN messages rather than through t(), because
              this block is bilingual by design: both languages show side by side
              at once. Going through t() made the left column follow the locale,
              so /jp rendered Japanese twice. */}
          <div className="flex-1">
            <h1 className="text-display mb-2">{enHero.name}</h1>
            <p className="text-body-lg font-helvetica-neue mb-1">{enHero.description1}</p>
            <p className="text-body-lg font-helvetica-neue">{enHero.description2}</p>
          </div>

          {/* Right Column - Japanese. Same reason, from the JP messages.
              text-body-lg-jp, not text-body-lg: at the same px the Japanese
              outweighs the English optically. See the token in tailwind.config.js. */}
          <div className="flex-1">
            <p className="text-body-lg-jp font-noto-sans-jp font-light mb-1">{jpHero.description1}</p>
            <p className="text-body-lg-jp font-noto-sans-jp font-light">{jpHero.description2}</p>
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
            const imageSrc = locale === 'jp' ? '/work/ukiyoe/thumbnail-jp.webp' : '/work/ukiyoe/thumbnail-en.webp';
            startTransition({ type: 'image', src: imageSrc }, rect, '/work/ukiyoe');
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              const rect = ukiyoeImageRef.current?.getBoundingClientRect();
              if (!rect) return;
              const imageSrc = locale === 'jp' ? '/work/ukiyoe/thumbnail-jp.webp' : '/work/ukiyoe/thumbnail-en.webp';
              startTransition({ type: 'image', src: imageSrc }, rect, '/work/ukiyoe');
            }
          }}
        >
          <div className="mb-20">
            <div className="mb-6" ref={ukiyoeImageRef}>
              <Image
                src={locale === 'jp' ? '/work/ukiyoe/thumbnail-jp.webp' : '/work/ukiyoe/thumbnail-en.webp'}
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
        <div
          className="block mb-16 cursor-pointer hover:opacity-80"
          role="link"
          tabIndex={0}
          onClick={() => {
            const rect = figmaPluginsImageRef.current?.getBoundingClientRect();
            if (!rect) return;
            startTransition({ type: 'node', key: 'figmaPluginsDeck' }, rect, '/work/figma-plugins');
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              const rect = figmaPluginsImageRef.current?.getBoundingClientRect();
              if (!rect) return;
              startTransition({ type: 'node', key: 'figmaPluginsDeck' }, rect, '/work/figma-plugins');
            }
          }}
        >
          <div className="mb-20">
            <div
              className="mb-6 w-full aspect-[2/1] rounded-lg bg-surface-raised overflow-hidden"
              ref={figmaPluginsImageRef}
            >
              <PluginCardDeckThumb />
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
        </div>

      </section>
    </div>
  );
}
