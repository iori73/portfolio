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

type PaletteColor = { name: string; hex: string; rgb: string; use: string; fg: string };
type Palette = { rows: string[]; colors: PaletteColor[] };

const LABEL = 'text-body font-space-grotesk font-semibold text-ink-tertiary';

/**
 * 色の見本（1色=1枚）。地の色と文字の色は、色そのものが内容なので、値（HEX）をそのまま使う。
 * CMYK・PANTONE は、Web の案件に定義がないため載せない（HEX から計算できる RGB のみ）。
 */
function Swatch({ c, rows, className }: { c: PaletteColor; rows: string[]; className?: string }) {
  const light = c.hex.toUpperCase() === '#F9FAF5';
  return (
    <div
      className={`flex flex-col gap-6 p-6 md:p-10 ${light ? 'ring-1 ring-inset ring-black/10' : ''} ${className ?? ''}`}
      style={{ backgroundColor: c.hex, color: c.fg }}
    >
      <p className="font-space-grotesk text-body tracking-[0.12em]">{c.name}</p>
      <dl className="grid grid-cols-[5rem_minmax(0,1fr)] gap-x-4 gap-y-3 text-body">
        <dt className="opacity-80">{rows[0]}</dt>
        <dd className="font-space-grotesk">{c.hex}</dd>
        <dt className="opacity-80">{rows[1]}</dt>
        <dd className="font-space-grotesk">{c.rgb}</dd>
        <dt className="opacity-80">{rows[2]}</dt>
        <dd>{c.use}</dd>
      </dl>
    </div>
  );
}

const NakahatsuSy: React.FC<{ launched: boolean }> = () => {
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
  const palette = t.raw('palette') as Palette;
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
              {/* 全幅と中央寄せ（760）を交互に。キャプションは置かず、alt に説明を入れる。
                  色の図（palette）は画像でなく、文字として組む（HEX・RGB・使う場所を、読み上げでも読める） */}
              {s.fig === 'palette' ? (
                <figure aria-label={s.cap} className="overflow-hidden rounded-media md:grid md:grid-cols-2">
                  <Swatch c={palette.colors[0]} rows={palette.rows} className="md:row-span-2 md:min-h-[460px]" />
                  <Swatch c={palette.colors[1]} rows={palette.rows} className="md:min-h-[230px]" />
                  <Swatch c={palette.colors[2]} rows={palette.rows} className="md:min-h-[230px]" />
                </figure>
              ) : (
                <div className={`flex justify-center`}>
                  <div className={`w-full overflow-hidden rounded-media bg-surface-muted ${i % 2 === 1 ? 'md:w-[760px]' : ''}`}>
                    <Image src={`/work/nakahatsu/${s.fig === 'before-after' ? `before-after-${language === 'jp' ? 'jp' : 'en'}` : s.fig}.webp`} alt={s.cap} width={1200} height={675} className="h-auto w-full" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Status（公開前・数字なし・見ていく指標）の節は、河野さんの判断で外した（2026-10-28、Figma の注釈）。
            ただの希望なので、ページには載せない。文言は messages の statusCatch / status と、
            Figma の退避枠に残してある。公開後に数字が出たら、この位置に実績の節として足す。 */}

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
