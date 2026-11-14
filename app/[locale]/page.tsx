'use client';
import { useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import WorkCard, { WorkCardImage } from '@/src/components/work/WorkCard';
import { useWorkCardLink } from '@/src/hooks/useWorkCardLink';
import { CARD_WORK_SLUGS } from '@/src/data/siteRoutes';

/** The Nakahatsu card follows siteRoutes.ts, so un-archiving it there brings the card back. */
const showNakahatsu = (CARD_WORK_SLUGS as readonly string[]).includes('nakahatsu');
import PluginCardDeckThumb, { PLUGIN_DECK_HERO_MAX_SCALE } from '@/components/work/figma-plugins/PluginCardDeckThumb';
// The hero pairs both languages on screen at the same time, so it cannot go
// through useTranslations — that resolves to the active locale only.
import enMessages from '@/messages/en.json';
import jpMessages from '@/messages/jp.json';

const enHero = enMessages.hero;
const jpHero = jpMessages.hero;

export default function Home() {
  const t = useTranslations();
  const locale = useLocale();
  const workCard = useWorkCardLink();
  const ukiyoeImageRef = useRef<HTMLDivElement>(null);
  const figmaPluginsImageRef = useRef<HTMLDivElement>(null);
  const nakahatsuImageRef = useRef<HTMLDivElement>(null);

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

        {/* Work カード。3枚とも WorkCard を通す（比率・枠・角丸・タグを1か所で決める） */}
        <WorkCard
          href={workCard.href('ukiyoe')}
          onClick={workCard.onClick('ukiyoe', ukiyoeImageRef, {
            type: 'image',
            src: locale === 'jp' ? '/work/ukiyoe/thumbnail-jp.webp' : '/work/ukiyoe/thumbnail-en.webp',
          })}
          thumbRef={ukiyoeImageRef}
          thumb={
            <WorkCardImage
              src={locale === 'jp' ? '/work/ukiyoe/thumbnail-jp.webp' : '/work/ukiyoe/thumbnail-en.webp'}
              alt="Ukiyoe: Layer by Layer"
            />
          }
          title={t('projects.ukiyoe.title')}
          tags={['UI', 'Context Engineering']}
          description1={t('projects.ukiyoe.description1')}
          description2={t('projects.ukiyoe.description2')}
        />

        <WorkCard
          href={workCard.href('figma-plugins')}
          onClick={workCard.onClick('figma-plugins', figmaPluginsImageRef, {
            type: 'node',
            key: 'figmaPluginsDeck',
          })}
          thumbRef={figmaPluginsImageRef}
          thumb={<PluginCardDeckThumb maxScale={PLUGIN_DECK_HERO_MAX_SCALE} />}
          thumbClassName="bg-surface-raised"
          title={t('projects.figmaPlugins.title')}
          tags={['Figma Plugin', 'AI Vibe Coding']}
          description1={t('projects.figmaPlugins.description1')}
          description2={t('projects.figmaPlugins.description2')}
        />

        {showNakahatsu && (
        <WorkCard
          href={workCard.href('nakahatsu')}
          onClick={workCard.onClick('nakahatsu', nakahatsuImageRef, {
            type: 'image',
            src: locale === 'jp' ? '/work/nakahatsu/thumbnail-jp.webp' : '/work/nakahatsu/thumbnail-en.webp',
          })}
          thumbRef={nakahatsuImageRef}
          thumb={
            <WorkCardImage
              src={locale === 'jp' ? '/work/nakahatsu/thumbnail-jp.webp' : '/work/nakahatsu/thumbnail-en.webp'}
              alt="Nakahatsu Shoten Website"
            />
          }
          title={t('projects.nakahatsu.title')}
          tags={['Shopify', 'Design System']}
          description1={t('projects.nakahatsu.description1')}
          description2={t('projects.nakahatsu.description2')}
        />
        )}

      </section>
    </div>
  );
}
