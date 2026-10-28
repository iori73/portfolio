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
 * 中初ケーススタディの「SY型」。
 *
 * 型: 小見出し → 作品名 → メタ4項目（2×2）→ Overview → Process（番号付き小節＋図）→ Status → Credit。
 * 本文の左に英字ラベル、右に文章の2カラム（PC）。図にキャプションは置かず、alt に説明を入れる。
 * 文言は messages の `nakahatsuSy`。Figma の「SY-style」4枚と同じ文言なので、片方を直したら
 * もう片方も直す（`feedback_figma_site_always_in_sync`）。
 *
 * 公開後に直す文: status（数字が出たら）、steps[3] の「先方の確認はまだです」（確認が済んだら）、
 * meta の Date「進行中・未公開」。
 */

type Meta = [string, string[]];
type Step = { h: string; p: string[]; fig: string; cap: string };
type Credit = [string, string];

const LABEL = 'text-body font-space-grotesk font-semibold text-ink-tertiary';

const NakahatsuSy: React.FC<{ launched: boolean }> = ({ launched }) => {
  const t = useTranslations('nakahatsuSy');
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

  const meta = t.raw('meta') as Meta[];
  const steps = t.raw('steps') as Step[];
  const credit = t.raw('credit') as Credit[];
  const body = `${getBodyFontClass()} tracking-[0.2px] text-body-lg text-ink [text-wrap:pretty]`;
  const catchLine = `text-title text-ink ${getHeadingFontClass()} [text-wrap:balance]`;

  /** PC は「ラベル | 本文」の2カラム、SP は縦に積む。 */
  const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <section className="flex flex-col gap-4 md:flex-row md:gap-8">
      <p className={`${LABEL} md:w-[280px] md:shrink-0`}>{label}</p>
      <div className="flex min-w-0 flex-col gap-4 md:flex-1">{children}</div>
    </section>
  );

  return (
    <div className="font-sans my-24 md:mt-28 md:mb-16">
      <BackToTopButton />

      {/* aspect-[8/5] は TransitionOverlay 側の比率と一致させる（ほかの作品と同じ）。 */}
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

      <div className="mx-auto flex w-full max-w-[1088px] flex-col gap-24 pt-6 md:gap-40 md:pt-8">
        {/* 冒頭: 小見出し → 作品名 → メタ2×2 */}
        <header className="flex flex-col gap-5 md:gap-6">
          <p className={`${getBodyFontClass()} text-body text-ink-tertiary`}>{t('kicker')}</p>
          <h1 className={`text-headline text-ink ${getHeadingFontClass()}`}>{t('title')}</h1>
          <dl className="mt-4 grid grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-4">
            {meta.map(([label, values]) => (
              <div key={label} className="flex flex-col gap-2">
                <dt className={LABEL}>{label}</dt>
                {values.map((v) => (
                  <dd key={v} className={`${getBodyFontClass()} text-body-lg tracking-[0.2px] text-ink [text-wrap:balance]`}>{v}</dd>
                ))}
              </div>
            ))}
          </dl>
        </header>

        <Row label="Overview">
          <p className={catchLine}>{t('overviewCatch')}</p>
          {(t.raw('overview') as string[]).map((p) => (
            <p key={p} className={body}>{p}</p>
          ))}
        </Row>

        <div className="flex flex-col gap-16 md:gap-20">
          <Row label="Process">
            <p className={catchLine}>{t('processCatch')}</p>
            {(t.raw('process') as string[]).map((p) => (
              <p key={p} className={body}>{p}</p>
            ))}
          </Row>
          {steps.map((s, i) => (
            <div key={s.h} className="flex flex-col gap-10 md:gap-10">
              <div className="flex flex-col md:flex-row md:gap-8">
                <div className="hidden md:block md:w-[280px] md:shrink-0" aria-hidden="true" />
                <div className="flex min-w-0 flex-col gap-3 md:flex-1">
                  <p className={`text-title text-ink-tertiary ${getHeadingFontClass()}`}>{i + 1}.</p>
                  <h2 className={`text-title-sm text-ink ${getHeadingFontClass()}`}>{s.h}</h2>
                  {s.p.map((p) => (
                    <p key={p} className={body}>{p}</p>
                  ))}
                </div>
              </div>
              {/* 全幅と中央寄せ（760）を交互に。キャプションは置かず、alt に説明を入れる。 */}
              <div className={`flex justify-center`}>
                <div className={`w-full overflow-hidden rounded-media bg-surface-muted ${i % 2 === 1 ? 'md:w-[760px]' : ''}`}>
                  <Image src={`/work/nakahatsu/${s.fig === 'before-after' ? `before-after-${language === 'jp' ? 'jp' : 'en'}` : s.fig}.webp`} alt={s.cap} width={1200} height={675} className="h-auto w-full" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 公開前は、数字がないことを明記する。公開後は、この節を数字に置き換える。 */}
        {!launched && (
          <Row label="Status">
            <p className={catchLine}>{t('statusCatch')}</p>
            {(t.raw('status') as string[]).map((p) => (
              <p key={p} className={body}>{p}</p>
            ))}
          </Row>
        )}

        <Row label="Credit">
          {credit.map(([who, what]) => (
            <div key={who} className="flex flex-col gap-1 md:flex-row md:gap-6">
              <p className={`${getBodyFontClass()} text-body-sm text-ink-tertiary md:w-[140px] md:shrink-0`}>{who}</p>
              <p className={`${getBodyFontClass()} text-body-sm tracking-[0.2px] text-ink`}>{what}</p>
            </div>
          ))}
        </Row>

        <section className="flex flex-col items-start gap-4 md:ml-[312px]">
          <p className={body}>{t('moreText')}</p>
          <CTAButton href={localePath('/work/nakahatsu', language)}>{t('moreLink')}</CTAButton>
        </section>
      </div>
    </div>
  );
};

export default NakahatsuSy;
