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

type SystemFig = {
  before: string; after: string; k1: string; k2: string; d1: string; d2: string; pages: string[]; lang: string; langAlt: string;
};

/**
 * 小節1の図。2つのシステム（WordPress と EC-CUBE）が Shopify の1つのストアになる前後。
 * 参考にした図の型: モノクロで平らな薄灰色の面、左に行ラベル（細い縦線で区切る）、白い小さな箱に細い線、細い接続。
 * 画像でなく文字として組む（読み上げでも読め、SP では縦に積む）。Figma の同名の図と同じ内容。
 * ロゴ・言語アイコンは Figma の素材置き場（437:779）から書き出したもの。
 */
function SystemFigure({ label, f }: { label: string; f: SystemFig }) {
  const box = 'flex items-center gap-3 rounded-[3px] border border-ink/70 bg-white px-3.5 py-3';
  const sys = (logo: string, k: string, n: string) => (
    <div className={`${box} md:flex-1`}>
      <Image src={`/work/nakahatsu/logo-${logo}.png`} alt="" width={32} height={32} className="h-8 w-8 shrink-0" />
      <div className="flex flex-col">
        <p className="text-caption leading-tight text-ink-tertiary">{k}</p>
        <p className="font-space-grotesk text-body-lg font-bold leading-tight text-ink">{n}</p>
      </div>
    </div>
  );
  const row = (name: string, children: React.ReactNode) => (
    <div className="flex flex-col gap-2 md:flex-row md:gap-5">
      <p className="font-space-grotesk text-caption font-bold text-ink md:w-[112px] md:shrink-0 md:border-r md:border-ink/15 md:pr-4">{name}</p>
      <div className="flex min-w-0 flex-col gap-3 rounded-md bg-[#F4F4F5] p-3.5 md:flex-1 md:px-5 md:py-[18px]">{children}</div>
    </div>
  );
  return (
    <figure aria-label={label} className="flex w-full flex-col gap-3 rounded-media border border-line-subtle bg-white p-4 md:w-[760px] md:gap-5 md:px-8 md:py-7">
      {row(
        f.before,
        <>
          <div className="flex flex-col gap-2.5 md:flex-row">
            {sys('wordpress', f.k1, 'WordPress')}
            {sys('eccube', f.k2, 'EC-CUBE')}
          </div>
          <p className="text-caption text-ink-tertiary">{f.d1}</p>
        </>,
      )}
      <p aria-hidden="true" className="text-center text-title text-ink-tertiary">↓</p>
      {row(
        f.after,
        <>
          <div className={box}>
            <Image src="/work/nakahatsu/logo-shopify.png" alt="" width={32} height={32} className="h-8 w-8 shrink-0" />
            <p className="font-space-grotesk text-title-sm font-bold text-ink">Shopify</p>
          </div>
          <ul className="flex flex-wrap gap-2">
            {f.pages.map((p) => (
              <li key={p} className="rounded-[3px] border border-ink/70 bg-white px-2.5 py-1.5 text-caption text-ink">{p}</li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <span className="text-caption text-ink-tertiary">{f.lang}</span>
            <Image src="/work/nakahatsu/lang-icons.png" alt={f.langAlt} width={691} height={81} className="h-5 w-auto" />
          </div>
          <p className="text-caption text-ink-tertiary">{f.d2}</p>
        </>,
      )}
    </figure>
  );
}

/** 前後の図の上に置くラベル（位置は図の中の2枚のページに合わせる）。 */
function BeforeAfterLabels({ before, after }: { before: string; after: string }) {
  return (
    <div aria-hidden="true" className="relative h-8 font-space-grotesk text-caption font-bold text-ink-tertiary">
      <p className="absolute left-[3.2%] top-2">{before}</p>
      <p className="absolute left-[57.4%] top-2">{after}</p>
    </div>
  );
}

/** About「醸造家として」のパララックスの録画。無音・ループ。動きを減らす設定のときは自動再生せず、コントロールを出す。実物の写真のまま（先方の許可を取ってから公開する。2026-11-01 河野の指示）。 */
function ParallaxVideo({ label, note }: { label: string; note: string }) {
  const ref = React.useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      v.pause();
      v.controls = true;
    } else {
      v.play().catch(() => {});
    }
  }, []);
  return (
    <figure className="flex w-full flex-col gap-2">
      <video
        ref={ref}
        aria-label={label}
        className="w-full rounded-media bg-black"
        src="/work/nakahatsu/about-parallax.mp4"
        poster="/work/nakahatsu/about-parallax-poster.webp"
        width={1280}
        height={720}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
      />
      {note ? <p className="text-caption text-ink-tertiary">{note}</p> : null}
    </figure>
  );
}

type RejFig = { lead: string; groups: [string, string][]; note: string; alts: string[] };

/** 没にした About の案（醸造家として）8案。グループごとに、左に説明、右に画像（スマートフォンは説明のあとに2列）。人物の写真は灰色に置換済み。 */
/** ローディングアニメーションの録画。無音。画面に入ったら1回だけ再生。動きを減らす設定のときは自動再生せず、コントロールを出す。 */
function LoadingVideo({ label }: { label: string }) {
  const ref = React.useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      v.controls = true;
      return;
    }
    // 画面に半分以上入ったときに、先頭から1回だけ再生する（ループしない。終わったら最後のコマで止まる）
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          v.currentTime = 0;
          v.play().catch(() => {});
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <video
      ref={ref}
      aria-label={label}
      className="w-full rounded-media bg-black"
      src="/work/nakahatsu/loading-anim.mp4"
      poster="/work/nakahatsu/loading-anim-poster.webp"
      width={1280}
      height={720}
      muted
      playsInline
      preload="metadata"
    />
  );
}

type IterFig = { lead: string; groups: [string, string][]; note: string; alts: string[] };

/** トップページの About の節の、没にした案9案（A 7案、B 2案）。RejectedFigure と同じ作り。顔・Sample・住所は写っていない。 */
function TopIterFigure({ f }: { f: IterFig }) {
  const sets = [[1, 2, 3, 4, 5, 6, 7], [8, 9]];
  return (
    <figure aria-label={f.lead} className="flex w-full flex-col gap-6 rounded-media border border-line-subtle bg-white p-4 md:gap-7 md:p-8">
      <p className="text-caption text-ink-secondary">{f.lead}</p>
      {sets.map((set, gi) => (
        <div key={f.groups[gi][0]} className="flex flex-col gap-3 md:flex-row md:gap-6">
          <div className="flex flex-col gap-1 md:w-[260px] md:shrink-0">
            <p className="text-caption font-bold text-ink">{f.groups[gi][0]}</p>
            <p className="text-caption text-ink-secondary">{f.groups[gi][1]}</p>
          </div>
          <div className={`grid min-w-0 flex-1 grid-cols-2 gap-2 bg-white p-2 md:gap-4 md:p-4 ${set.length > 2 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
            {set.map((n) => (
              <Image key={n} src={`/work/nakahatsu/top-iter-${n}.webp`} alt={f.alts[n - 1]} width={1024} height={720} className="h-auto w-full rounded" />
            ))}
          </div>
        </div>
      ))}
      <p className="text-caption text-ink-tertiary">{f.note}</p>
    </figure>
  );
}

function RejectedFigure({ f }: { f: RejFig }) {
  const sets = [[1, 2], [3, 4, 5], [6, 7, 8]];
  return (
    <figure aria-label={f.lead} className="flex w-full flex-col gap-6 rounded-media border border-line-subtle bg-white p-4 md:gap-7 md:p-8">
      <p className="text-caption text-ink-secondary">{f.lead}</p>
      {sets.map((set, gi) => (
        <div key={f.groups[gi][0]} className="flex flex-col gap-3 md:flex-row md:gap-6">
          <div className="flex flex-col gap-1 md:w-[260px] md:shrink-0">
            <p className="text-caption font-bold text-ink">{f.groups[gi][0]}</p>
            <p className="text-caption text-ink-secondary">{f.groups[gi][1]}</p>
          </div>
          <div className={`grid min-w-0 flex-1 grid-cols-2 gap-2 bg-white p-2 md:gap-4 md:p-4 ${set.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
            {set.map((n) => (
              <Image key={n} src={`/work/nakahatsu/about-rej-${n}.webp`} alt={f.alts[n - 1]} width={900} height={560} className="h-auto w-full rounded" />
            ))}
          </div>
        </div>
      ))}
      <p className="text-caption text-ink-tertiary">{f.note}</p>
    </figure>
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

        {/* ローディングアニメーション（ライブテーマのトップを開いた瞬間を録画）。本文の最初。キャプションは置かず、aria-label に説明を入れる。Figma の Overview 直前と同じ */}
        <LoadingVideo label={t('loadingVideoAlt')} />

        <Row label="Overview">
          <p className={catchLine}>{t('overviewCatch')}</p>
          {(t.raw('overview') as string[]).map((p) => (
            <p key={p} className={body}>{p}</p>
          ))}
        </Row>

        {/* 主要画面の一覧（PC とスマートフォン）。Figma の Overview 直下の図と同じ。キャプションは置かず、alt に説明を入れる */}
        <div className="flex justify-center">
          <div className="w-full">
            <Image src={`/work/nakahatsu/overview-pcsp-${language === 'jp' ? 'jp' : 'en'}.webp`} alt={t('overviewFigAlt')} width={2400} height={1446} className="h-auto w-full" />
          </div>
        </div>

        <div className="flex flex-col gap-16 md:gap-20">
          <Row label="Process">
            <p className={catchLine}>{t('processCatch')}</p>
            {(t.raw('process') as string[]).map((p) => (
              <p key={p} className={body}>{p}</p>
            ))}
          </Row>
          {/* Process の導入のあとに、Instagram の投稿から見た先方の活動（Figma の Process 直下の図と同じ。PC は横4枚、スマートフォンは2列） */}
          <div className="flex justify-center">
            <div className="w-full">
              <Image src={`/work/nakahatsu/ig-posts-${language === 'jp' ? 'jp' : 'en'}-pc.webp`} alt={t('igAlt')} width={1523} height={414} className="hidden h-auto w-full md:block" />
              <Image src={`/work/nakahatsu/ig-posts-${language === 'jp' ? 'jp' : 'en'}-sp.webp`} alt={t('igAlt')} width={654} height={language === 'jp' ? 893 : 981} className="block h-auto w-full md:hidden" />
            </div>
          </div>
          {/* 上の図のあとに、投稿そのものの見た目（SP 幅のスクリーンショット）を並べた図。人物が写る写真は灰色に置き換え、載せない投稿は文字の枠。Figma の Instagram の図の下と同じ */}
          {(() => {
            const shots = t.raw('igShots') as { dates: string[]; alts: string[]; urls: string[]; linkLabel: string; textCard: string; note: string };
            const files = ['muji', 'fest', 'overseas'];
            return (
              <figure className="flex w-full flex-col gap-4 rounded-media bg-surface-muted p-3 md:px-12 md:pb-6 md:pt-8">
                <div className="grid grid-cols-2 gap-x-2 gap-y-4 md:grid-cols-4 md:gap-4">
                  {files.map((f, k) => (
                    <div key={f} className="flex min-w-0 flex-col gap-1.5">
                      <p className="font-space-grotesk text-caption font-bold text-ink-tertiary">{shots.dates[k]}</p>
                      <a href={shots.urls[k]} target="_blank" rel="noopener noreferrer" aria-label={`${shots.dates[k]} ${shots.linkLabel}`} className="block min-h-11 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
                        <Image src={`/work/nakahatsu/ig-shot-${f}.webp`} alt={shots.alts[k]} width={780} height={1210} className="h-auto w-full rounded-md" />
                      </a>
                    </div>
                  ))}
                  <div className="flex min-w-0 flex-col gap-1.5">
                    <p className="font-space-grotesk text-caption font-bold text-ink-tertiary">{shots.dates[3]}</p>
                    <div className="flex flex-1 items-center rounded-md bg-white p-3 md:p-4">
                      <p className="text-caption text-ink-secondary">{shots.textCard}</p>
                    </div>
                  </div>
                </div>
                <p className="text-caption text-ink-tertiary">{shots.note}</p>
              </figure>
            );
          })()}
          {steps.map((s, i) => (
            <div key={s.h} className="flex flex-col gap-10 md:gap-10">
              <div className="flex flex-col md:flex-row md:gap-8">
                <div className="hidden md:block md:w-[280px] md:shrink-0" aria-hidden="true" />
                <div className="flex min-w-0 flex-col gap-3 md:flex-1">
                  <p className={`text-title text-ink-tertiary ${getHeadingFontClass()}`}>{i + 1}.</p>
                  <h2 className={`text-title-sm text-ink ${getHeadingFontClass()}`}>{s.h}</h2>
                  {s.fig === 'about-tenyu' && <h3 className={`text-body-lg font-medium text-ink ${getHeadingFontClass()}`}>{t('topSub')}</h3>}
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
              ) : s.fig === 'challenges' ? (
                <div className="flex justify-center">
                  <SystemFigure label={s.cap} f={t.raw('systemFig') as SystemFig} />
                </div>
              ) : s.fig === 'about-tenyu' ? (
                <div className="flex flex-col items-center gap-10 md:gap-12">
                  {/* トップの前後、トップの軌跡（没案）、About の文章、About の前後、パララックス、没にした About の案。Figma の Step 3 と同じ順。キャプションは置かず、alt に説明を入れる */}
                  <div className="w-full">
                    <BeforeAfterLabels before={t('beforeLabel')} after={t('afterLabel')} />
                    <Image src={`/work/nakahatsu/top-ba-${language === 'jp' ? 'jp' : 'en'}.webp`} alt={t('topBaAlt')} width={1520} height={975} className="h-auto w-full" />
                  </div>
                  <TopIterFigure f={t.raw('topIter') as IterFig} />
                  <div className="flex w-full flex-col md:flex-row md:gap-8">
                    <div className="hidden md:block md:w-[280px] md:shrink-0" aria-hidden="true" />
                    <div className="flex min-w-0 flex-col gap-3 md:flex-1">
                      <h3 className={`text-body-lg font-medium text-ink ${getHeadingFontClass()}`}>{t('aboutSub')}</h3>
                      <p className={body}>{t('aboutText')}</p>
                    </div>
                  </div>
                  <div className="w-full">
                    <BeforeAfterLabels before={t('beforeLabel')} after={t('afterLabel')} />
                    <Image src={`/work/nakahatsu/about-ba-${language === 'jp' ? 'jp' : 'en'}.webp`} alt={t('aboutBaAlt')} width={1520} height={1756} className="h-auto w-full" />
                  </div>
                  {/* About「醸造家として」のパララックスの録画。About の前後の図の直後。キャプションは置かず、aria-label に説明を入れる */}
                  <ParallaxVideo label={t('parallaxVideoAlt')} note={t('parallaxVideoNote')} />
                  <RejectedFigure f={t.raw('rejFig') as RejFig} />
                </div>
              ) : s.fig === 'bilingual-3lang' ? null /* ヒーローの3言語の図は、注釈「見せない」（2026-10-30）で外した。下の商品一覧の図だけ出す */ : (
                <div className={`flex justify-center`}>
                  <div className={`w-full overflow-hidden rounded-media bg-surface-muted ${i % 2 === 1 ? 'md:w-[760px]' : ''}`}>
                    <Image src={`/work/nakahatsu/${s.fig === 'before-after' ? `before-after-${language === 'jp' ? 'jp' : 'en'}` : s.fig}.webp`} alt={s.cap} width={1200} height={675} className="h-auto w-full" />
                  </div>
                </div>
              )}
              {/* 2案を並べる: 旧サイトとの比べの図のあとに、v1（既存サイトを再現した案）と v2（リデザイン案）のトップを並べた図を足す */}
              {s.fig === 'before-after' && (
                <div className="flex justify-center">
                  <div className="w-full overflow-hidden rounded-media bg-surface-muted">
                    <div aria-hidden="true" className="relative h-9 font-space-grotesk text-caption font-bold text-ink-tertiary">
                      <p className="absolute left-[3.2%] top-3">{t('v1Label')}</p>
                      <p className="absolute left-[57.4%] top-3">{t('v2Label')}</p>
                    </div>
                    <Image src={`/work/nakahatsu/v1-v2-${language === 'jp' ? 'jp' : 'en'}.webp`} alt={t('v1v2Alt')} width={1520} height={975} className="h-auto w-full" />
                  </div>
                </div>
              )}
              {s.fig === 'before-after' && (
                <div className="flex justify-center">
                  <div className="w-full overflow-hidden rounded-media bg-surface-muted">
                    <div aria-hidden="true" className="relative h-9 font-space-grotesk text-caption font-bold text-ink-tertiary">
                      <p className="absolute left-[3.2%] top-3">{t('v1Label')}</p>
                      <p className="absolute left-[57.4%] top-3">{t('v2Label')}</p>
                    </div>
                    <Image src={`/work/nakahatsu/v1-v2-tall-${language === 'jp' ? 'jp' : 'en'}.webp`} alt={t('v1v2TallAlt')} width={1520} height={1444} className="h-auto w-full" />
                  </div>
                </div>
              )}
              {/* さらに長い版: Instagram の節まで。人物が写る写真と見本（Sample）の画像は、灰色の四角に置き換えてある。Figma の長尺図の下と同じ */}
              {s.fig === 'before-after' && (
                <div className="flex justify-center">
                  <div className="w-full overflow-hidden rounded-media bg-surface-muted">
                    <div aria-hidden="true" className="relative h-9 font-space-grotesk text-caption font-bold text-ink-tertiary">
                      <p className="absolute left-[3.2%] top-3">{t('v1Label')}</p>
                      <p className="absolute left-[57.4%] top-3">{t('v2Label')}</p>
                    </div>
                    <Image src={`/work/nakahatsu/v1-v2-full-${language === 'jp' ? 'jp' : 'en'}.webp`} alt={t('v1v2FullAlt')} width={1520} height={language === 'jp' ? 3136 : 3194} className="h-auto w-full" />
                    <p className="px-6 pb-4 text-caption text-ink-tertiary">{t('v1v2FullNote')}</p>
                  </div>
                </div>
              )}
              {/* 色の図のあとに、ストアのテーマの文字・サイズ・色・余白の図（デザインシステム）。Figma の Step/5 の下と同じ */}
              {s.fig === 'palette' && (
                <div className="w-full overflow-hidden rounded-media">
                  <Image src={`/work/nakahatsu/design-system-${language === 'jp' ? 'jp' : 'en'}.webp`} alt={t('dsAlt')} width={2176} height={language === 'jp' ? 1326 : 1362} className="h-auto w-full" />
                </div>
              )}
              {/* 3つの言語: ヒーローの図のあとに、スマートフォン幅の商品ページ（文字の部分）を並べた図を足す。住所・フッターは写さない */}
              {s.fig === 'bilingual-3lang' && (
                <div className="flex justify-center">
                  <div className="w-full">
                    <Image src="/work/nakahatsu/bilingual-text.webp" alt={t('bilingualTextAlt')} width={1560} height={757} className="h-auto w-full" />
                  </div>
                </div>
              )}
              {/* ヒーロー節を、スマートフォン幅で、3言語並べた図（商品一覧の図の下）。Figma の Step/4 の最後と同じ */}
              {s.fig === 'bilingual-3lang' && (
                <div className="flex justify-center">
                  <div className="w-full">
                    <Image src={`/work/nakahatsu/hero-sp-${language === 'jp' ? 'jp' : 'en'}.webp`} alt={t('heroSpAlt')} width={2176} height={1400} className="h-auto w-full" />
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
