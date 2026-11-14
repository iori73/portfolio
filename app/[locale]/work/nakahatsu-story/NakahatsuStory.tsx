'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import BackToTopButton from '@/src/compositions/BackToTopButton';
import { useTranslations, useLocale } from 'next-intl';
import { useBodyFont, useHeadingFont } from '@/src/hooks/useFonts';
import { CTAButton } from '@/components/ui/cta-button';
import { usePageTransition } from '@/src/contexts/TransitionContext';
import { localePath } from '@/src/data/siteRoutes';

/**
 * 中初ケーススタディの「読みやすい版」。
 *
 * 詳しい版（../nakahatsu）が事実を網羅するのに対し、こちらは takram の
 * ケーススタディの型を参考に、1段落1〜2文、判断ごとに図を1枚、最後にビジョンへ
 * 戻る流れにしてある。数字は並べない。事実の根拠と、公開後に直す文は
 * 詳しい版と同じ台帳（claims-ledger）で管理する。
 *
 * 公開後に直す文: threeText2（先方の確認が済んだら）、metaStatusValue、
 * creditClientText の「決済の有効化・ドメインの切り替え」（済んだら）。
 */

const FIGURE_FRAME = 'overflow-hidden rounded-media bg-surface-muted';

const NakahatsuStory: React.FC<{ launched: boolean; motionVideo: string | null }> = ({
  launched,
  motionVideo,
}) => {
  const t = useTranslations('nakahatsuStory');
  const tc = useTranslations('nakahatsu');
  const language = useLocale();
  const { getBodyFontClass } = useBodyFont();
  const { getHeadingFontClass } = useHeadingFont();
  const { state: transitionState, endTransition } = usePageTransition();

  useEffect(() => {
    if (transitionState.phase === 'navigating') {
      const timeout = setTimeout(() => endTransition(), 100);
      return () => clearTimeout(timeout);
    }
  }, [transitionState.phase, endTransition]);

  const body = `${getBodyFontClass()} tracking-[0.2px] text-body-lg text-ink [text-wrap:pretty]`;
  const h2 = `text-title-lg text-ink ${getHeadingFontClass()}`;
  const caption = 'mt-3 text-body-sm md:text-body-base text-ink-tertiary font-space-grotesk';
  const label = 'text-body font-space-grotesk font-semibold text-ink-tertiary mb-2 block';

  const meta = [
    ['metaClient', 'metaClientValue'],
    ['metaYear', 'metaYearValue'],
    ['metaRole', 'metaRoleValue'],
    ['metaExpertise', 'metaExpertiseValue'],
    ['metaStatus', 'metaStatusValue'],
  ] as const;

  const credits = [
    ['creditMe', 'creditMeText'],
    ['creditClient', 'creditClientText'],
    ['creditExisting', 'creditExistingText'],
    ['creditAi', 'creditAiText'],
  ] as const;

  /** 節 = 見出し + 短い段落 + 図1枚。図の説明は、詳しい版と同じ文を使う。 */
  const Figure = ({ src, alt, cap }: { src: string; alt: string; cap: string }) => (
    <figure className="mt-8">
      <div className={FIGURE_FRAME}>
        <Image src={src} alt={alt} width={1200} height={675} className="w-full h-auto" />
      </div>
      <figcaption className={caption}>{cap}</figcaption>
    </figure>
  );

  const Section = ({ title, texts, children }: { title: string; texts: string[]; children?: React.ReactNode }) => (
    <section className="mt-20 md:mt-28">
      <h2 className={`${h2} mb-6`}>{title}</h2>
      <div className="space-y-4">
        {texts.map((text) => (
          <p key={text} className={body}>
            {text}
          </p>
        ))}
      </div>
      {children}
    </section>
  );

  return (
    <div className="font-sans mt-[var(--site-header-height)] mb-24 md:mb-16">
      <BackToTopButton />

      {/* aspect-[8/5] は TransitionOverlay 側の比率と一致させる（詳しい版と同じ）。 */}
      <section className="mb-0 md:mb-12 full-bleed">
        <div className="w-full aspect-[8/5] bg-surface-muted overflow-hidden relative">
          <Image
            key={language}
            src={language === 'jp' ? '/work/nakahatsu/thumbnail-jp.webp' : '/work/nakahatsu/thumbnail-en.webp'}
            alt={tc('heroAlt')}
            fill
            sizes="(min-width: 768px) 1280px, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </section>

      <div className="max-w-[1028px] w-full mx-auto pt-6 md:pt-8">
        <h1 className={`text-headline text-ink mb-3 ${getHeadingFontClass()}`}>{t('title')}</h1>
        <p className={`text-title text-ink-secondary ${getHeadingFontClass()}`}>{t('subtitle')}</p>

        <div className="mt-10 space-y-4">
          <p className={body}>{t('intro1')}</p>
          <p className={body}>{t('intro2')}</p>
        </div>

        <dl className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8">
          {meta.map(([k, v]) => (
            <div key={k}>
              <dt className={label}>{t(k)}</dt>
              <dd className="text-body-lg tracking-[0.2px]">{t(v)}</dd>
            </div>
          ))}
        </dl>

        <Section title={t('oneTitle')} texts={[t('oneText1'), t('oneText2')]}>
          <Figure
            src={language === 'jp' ? '/work/nakahatsu/before-after-jp.webp' : '/work/nakahatsu/before-after-en.webp'}
            alt={tc('captionBeforeAfter')}
            cap={tc('captionBeforeAfter')}
          />
        </Section>

        <Section title={t('twoTitle')} texts={[t('twoText1'), t('twoText2')]}>
          <Figure src="/work/nakahatsu/about-tenyu.webp" alt={tc('captionAbout')} cap={tc('captionAbout')} />
        </Section>

        <Section title={t('threeTitle')} texts={[t('threeText1'), t('threeText2')]}>
          <Figure src="/work/nakahatsu/bilingual.webp" alt={tc('captionBilingual')} cap={tc('captionBilingual')} />
        </Section>

        <Section title={t('fourTitle')} texts={[t('fourText1'), t('fourText2')]}>
          <Figure src="/work/nakahatsu/products.webp" alt={tc('captionProducts')} cap={tc('captionProducts')} />
        </Section>

        <Section title={t('motionTitle')} texts={[t('motionText1'), t('motionText2')]}>
          {/* 動画は、public/work/nakahatsu/ochimasse.mp4 を置いたときだけ出す。
              自動再生は動きを減らす設定の人に不向きなので、操作で再生する。 */}
          {motionVideo ? (
            <figure className="mt-8">
              <video
                className={`${FIGURE_FRAME} w-full h-auto`}
                src={motionVideo}
                controls
                muted
                playsInline
                preload="metadata"
                aria-label={t('motionVideoLabel')}
              />
              <figcaption className={caption}>{t('motionVideoLabel')}</figcaption>
            </figure>
          ) : null}
        </Section>

        <Section title={t('systemTitle')} texts={[t('systemText1'), t('systemText2')]}>
          <Figure src="/work/nakahatsu/responsive.webp" alt={tc('captionResponsive')} cap={tc('captionResponsive')} />
        </Section>

        <section className="mt-24 md:mt-32">
          <h2 className={`${h2} mb-6`}>{t('closingTitle')}</h2>
          <p className={body}>{t('closingText')}</p>
        </section>

        <section className="mt-20 md:mt-28">
          <h2 className={`${h2} mb-6`}>{t('creditsTitle')}</h2>
          <dl className="grid gap-6 md:grid-cols-2 max-w-[860px]">
            {credits.map(([k, v]) => (
              <div key={k}>
                <dt className={label}>{t(k)}</dt>
                <dd className={`${getBodyFontClass()} text-body tracking-[0.2px] text-ink-secondary`}>{t(v)}</dd>
              </div>
            ))}
          </dl>
          {launched ? null : (
            <p className={`mt-6 ${getBodyFontClass()} text-body text-ink-tertiary`}>{tc('scopeNote')}</p>
          )}
        </section>

        <section className="mt-20 md:mt-28">
          <h2 className={`${h2} mb-6`}>{t('moreTitle')}</h2>
          <p className={`${body} mb-6`}>{t('moreText')}</p>
          <CTAButton href={localePath('/work/nakahatsu', language)}>{t('moreLink')}</CTAButton>
        </section>
      </div>
    </div>
  );
};

export default NakahatsuStory;
