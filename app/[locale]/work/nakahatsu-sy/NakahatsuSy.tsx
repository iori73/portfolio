'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import BackToTopButton from '@/src/compositions/BackToTopButton';
import { useTranslations, useLocale } from 'next-intl';
import { useBodyFont, useHeadingFont } from '@/src/hooks/useFonts';
import { CTAButton } from '@/components/ui/cta-button';
import { usePageTransition } from '@/src/contexts/TransitionContext';
import { localePath } from '@/src/data/siteRoutes';
import WorkShell from '@/src/components/work/WorkShell';
import WorkSidebar, { type SidebarItem } from '@/src/components/work/WorkSidebar';
import LineArrow from '@/src/components/work/LineArrow';
import ControlledVideo from '@/src/components/work/ControlledVideo';
import BeforeAfterPair from '@/src/components/work/BeforeAfterPair';
import DesignSystemFigure, { type DesignSystemData } from '@/src/components/work/DesignSystemFigure';

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
      <p className="font-space-grotesk text-caption font-bold text-ink md:w-[112px] md:shrink-0">{name}</p>
      <div className="flex min-w-0 flex-col gap-3 rounded-md bg-[var(--nk-surface)] p-3.5 md:flex-1 md:px-5 md:py-[18px]">{children}</div>
    </div>
  );
  return (
    <figure aria-label={label} className="flex w-full flex-col gap-3 rounded-media border border-[var(--nk-border)] bg-white p-4 md:w-[760px] md:gap-5 md:px-8 md:py-7">
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
      <div className="flex justify-center"><LineArrow direction="down" /></div>
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
            {/* 本物のサイトの言語切り替え（旗16px＋JP｜EN｜FR。この図では下線は付けない）と同じ形。画像でなく部品として組む */}
            <ul aria-label={f.langAlt} className="flex items-center">
              {[
                { code: 'JP', flag: 'ja', current: true },
                { code: 'EN', flag: 'us', current: false },
                { code: 'FR', flag: 'fr', current: false },
              ].map((l, i) => (
                <li key={l.code} className={`relative flex items-center gap-2 px-1 py-0.5 ${i > 0 ? 'ml-1 pl-2 before:absolute before:left-0 before:top-1/2 before:h-4 before:w-px before:-translate-y-1/2 before:bg-ink/35' : ''}`}>
                  <Image src={`/work/nakahatsu/flag-${l.flag}.svg`} alt="" width={16} height={16} className="h-4 w-4 shrink-0 rounded-full shadow-[0_0_0_1px_var(--nk-border)]" />
                  <span className={`font-space-grotesk text-caption text-ink ${l.current ? 'font-semibold' : ''}`}>{l.code}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-caption text-ink-tertiary">{f.d2}</p>
        </>,
      )}
    </figure>
  );
}

/** About「醸造家として」のパララックスの録画。無音・ループ。止められるボタンつき（ControlledVideo）。実物の写真のまま（先方の許可を取ってから公開する。2026-11-01 河野の指示）。 */
function ParallaxVideo({ label, note, noteClass, pauseLabel, playLabel }: { label: string; note: string; noteClass: string; pauseLabel: string; playLabel: string }) {
  return (
    <figure className="flex w-full flex-col gap-3">
      {/* 動画の解説は、動画の上に1〜2文で置く（2026-11-04 河野の指示） */}
      {note ? <p className={noteClass}>{note}</p> : null}
      <ControlledVideo src="/work/nakahatsu/about-parallax.mp4" poster="/work/nakahatsu/about-parallax-poster.webp" label={label} pauseLabel={pauseLabel} playLabel={playLabel} width={1280} height={720} />
    </figure>
  );
}

type IterProcFig = { lead: string; groups: [string, string][]; note: string; alts: string[] };
type RingFig = { lead: string; title: string; leadText: string; rest: string[]; note: string; alt: string };
type RejFig = { lead: string; groups: [string, string][]; note: string; alts: string[] };

/** 没にした About の案（醸造家として）8案。グループごとに、左に説明、右に画像（スマートフォンは説明のあとに2列）。人物の写真は灰色に置換済み。 */
/** ローディングアニメーションの録画。無音・ループ。画面に入ったら先頭から再生。止められるボタンつき（ControlledVideo）。 */
function LoadingVideo({ label, pauseLabel, playLabel }: { label: string; pauseLabel: string; playLabel: string }) {
  return <ControlledVideo src="/work/nakahatsu/loading-anim.mp4" poster="/work/nakahatsu/loading-anim-poster.webp" label={label} pauseLabel={pauseLabel} playLabel={playLabel} width={1280} height={720} startWhenVisible />;
}

type IterFig = { lead: string; groups: [string, string][]; note: string; alts: string[] };

/**
 * トップページの About の節の、没にした案9案（A 7案、B 2案）。Figma の `Figure/Iteration process Home About section`（568:1067）と同じ作り:
 * 外枠は図全体に1つ。グループごとに、見出し → 説明 → 画像の縦並び。画像は1枚ずつ細い枠線つき（A は 4 列、B は 3 列）。
 * 顔・Sample・住所は写っていない。
 */
const TOP_ITER_DIMS: Record<number, [number, number]> = {
  1: [1024, 718], 2: [1024, 718], 3: [1024, 718], 4: [1024, 718], 5: [1024, 781], 6: [1024, 781], 7: [1024, 814], 8: [1024, 690], 9: [1024, 671],
};
function TopIterFigure({ f }: { f: IterFig }) {
  const groups = [
    { ids: [1, 2, 3, 4, 5, 6, 7], cols: 'md:grid-cols-4' },
    { ids: [8, 9], cols: 'md:grid-cols-3' },
  ];
  return (
    <figure aria-label={f.lead} className="flex w-full flex-col gap-7 rounded-media border border-[var(--nk-border)] bg-white p-4 md:p-8">
      <p className="text-body text-ink-secondary">{f.lead}</p>
      {groups.map((g, gi) => (
        <div key={f.groups[gi][0]} className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <p className="text-body font-bold text-ink-tertiary">{f.groups[gi][0]}</p>
            <p className="text-body-sm text-ink">{f.groups[gi][1]}</p>
          </div>
          <div className={`grid grid-cols-2 items-start gap-3 md:gap-4 ${g.cols}`}>
            {g.ids.map((n) => (
              <Image key={n} src={`/work/nakahatsu/top-iter-${n}.webp`} alt={f.alts[n - 1]} width={TOP_ITER_DIMS[n][0]} height={TOP_ITER_DIMS[n][1]} className="h-auto w-full border border-line-section" />
            ))}
          </div>
        </div>
      ))}
      <p className="text-body-sm text-ink-tertiary">{f.note}</p>
    </figure>
  );
}

/** 製法へのこだわりの変遷（5 場面）。「醸造家として」の没案の図（RejectedFigure）の置き換え。RejectedFigure と同じ作り。人物が写る部分は灰色に置き換えてある */
function ProcessIterationsFigure({ f, lang, pauseLabel, playLabel }: { f: IterProcFig & { videoAlts: string[] }; lang: string; pauseLabel: string; playLabel: string }) {
  // 4. は、選ばれなかった2つ（円・一直線）にアニメーションを加えた2つ。どちらも動画（'va' 円・'vb' 一直線）。円は点の軌道を、環に沿って各円の出現に合わせ、搾りの手前で止まるように直した（2026-11-06）。
  const sets: (number | 'va' | 'vb')[][] = [[1], [2], [3, 4], ['va', 'vb'], [9]];
  const videos = { va: { name: 'ring-a', alt: f.videoAlts[0], height: 800 }, vb: { name: 'ring-b', alt: f.videoAlts[1], height: 676 } } as const;
  const ratio: Record<number, number> = { 1: 583, 2: 630, 3: 750, 4: 633, 5: 750, 6: 750, 7: 750, 8: 750, 9: 750 };
  return (
    <figure aria-label={f.lead} className="flex w-full flex-col gap-6 rounded-media border border-[var(--nk-border)] bg-white p-4 md:gap-7 md:p-8">
      <p className="text-body text-ink-secondary">{f.lead}</p>
      {sets.map((set, gi) => (
        <div key={f.groups[gi][0]} className="flex flex-col gap-3 md:flex-row md:gap-6">
          <div className="flex flex-col gap-1 md:w-[260px] md:shrink-0">
            <p className="text-body font-bold text-ink">{f.groups[gi][0]}</p>
            <p className="text-body-sm text-ink-secondary">{f.groups[gi][1]}</p>
          </div>
          <div className={`grid min-w-0 flex-1 gap-2 bg-white p-2 md:gap-4 md:p-4 ${set.length === 1 ? 'grid-cols-1 justify-items-center' : 'grid-cols-2'}`}>
            {set.map((n) =>
              typeof n === 'string' ? (
                <ControlledVideo
                  key={n}
                  src={`/work/nakahatsu/${videos[n].name}-${lang === 'jp' ? 'jp' : 'en'}.mp4`}
                  poster={`/work/nakahatsu/${videos[n].name}-${lang === 'jp' ? 'jp' : 'en'}-poster.webp`}
                  label={videos[n].alt}
                  pauseLabel={pauseLabel}
                  playLabel={playLabel}
                  width={1280}
                  height={videos[n].height}
                  startWhenVisible
                />
              ) : (
                <Image key={n} src={`/work/nakahatsu/process-iter-${n}.webp`} alt={f.alts[n - 1]} width={1200} height={ratio[n]} className={`h-auto w-full rounded ${set.length === 1 ? 'md:max-w-[520px]' : ''}`} />
              ),
            )}
          </div>
        </div>
      ))}
      <p className="text-body-sm text-ink-tertiary">{f.note}</p>
    </figure>
  );
}

/** 製法へのこだわりの「5 つの丸の環」。「醸造家として」の没案の図（RejectedFigure）の置き換え。仕込みの丸は、人物が写るため灰色。文章は先方の原稿のまま */
function ProcessRingFigure({ f, lang, headingClass, bodyClass }: { f: RingFig; lang: string; headingClass: string; bodyClass: string }) {
  return (
    <figure aria-label={f.alt} className="flex w-full flex-col gap-6 rounded-media border border-[var(--nk-border)] bg-white p-4 md:gap-7 md:p-8">
      <p className="text-body text-ink-secondary">{f.lead}</p>
      <div className="flex flex-col items-center gap-6 md:flex-row md:gap-10">
        <Image src={`/work/nakahatsu/process-ring-${lang === 'jp' ? 'jp' : 'en'}.webp`} alt={f.alt} width={1440} height={1442} className="h-auto w-full max-w-[420px] md:w-[46%]" />
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <h4 className={`text-body-lg font-medium text-ink ${headingClass}`}>{f.title}</h4>
          <p className={`${bodyClass} font-medium`}>{f.leadText}</p>
          {f.rest.map((p) => (
            <p key={p} className={bodyClass}>{p}</p>
          ))}
        </div>
      </div>
      <p className="text-body-sm text-ink-tertiary">{f.note}</p>
    </figure>
  );
}

function RejectedFigure({ f }: { f: RejFig }) {
  const sets = [[1, 2], [3, 4, 5], [6, 7, 8]];
  return (
    <figure aria-label={f.lead} className="flex w-full flex-col gap-6 rounded-media border border-[var(--nk-border)] bg-white p-4 md:gap-7 md:p-8">
      <p className="text-body text-ink-secondary">{f.lead}</p>
      {sets.map((set, gi) => (
        <div key={f.groups[gi][0]} className="flex flex-col gap-3 md:flex-row md:gap-6">
          <div className="flex flex-col gap-1 md:w-[260px] md:shrink-0">
            <p className="text-body font-bold text-ink">{f.groups[gi][0]}</p>
            <p className="text-body-sm text-ink-secondary">{f.groups[gi][1]}</p>
          </div>
          <div className={`grid min-w-0 flex-1 grid-cols-2 gap-2 bg-white p-2 md:gap-4 md:p-4 ${set.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
            {set.map((n) => (
              <Image key={n} src={`/work/nakahatsu/about-rej-${n}.webp`} alt={f.alts[n - 1]} width={900} height={560} className="h-auto w-full rounded" />
            ))}
          </div>
        </div>
      ))}
      <p className="text-body-sm text-ink-tertiary">{f.note}</p>
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
  const rl = t.raw('rowLabels') as { overview: string; process: string; credit: string };
  /** 側面メニュー（共通の WorkSidebar。1280px 以上）。項目は本文の見出しと同じ文言（概要・各ステップの見出し・クレジット）。Figma の Sidebar と同じ */
  const sidebarItems: SidebarItem[] = [
    { id: 'overview', label: rl.overview },
    ...steps.map((st, i) => ({ id: `step-${i + 1}`, label: st.h })),
    { id: 'credit', label: rl.credit },
  ];
  const body = `${getBodyFontClass()} tracking-[0.2px] text-body-lg text-ink [text-wrap:pretty]`;
  const catchLine = `text-title text-ink ${getHeadingFontClass()} [text-wrap:balance]`;

  /** 見出し（ラベル）は本文の上に縦に並べる（ほかの作品ページと同じ。PC もスマホも同じ並び）。 */
  const Row = ({ id, label, children }: { id?: string; label: string; children: React.ReactNode }) => (
    <section id={id} className="flex scroll-mt-28 flex-col gap-4 md:gap-6">
      <h2 className={`text-title-lg ${getHeadingFontClass()}`}>{label}</h2>
      <div className="flex min-w-0 flex-col gap-4">{children}</div>
    </section>
  );

  return (
    <div className="font-sans mt-[var(--site-header-height)] mb-24 [--nk-border:#dad6ce] [--nk-surface:#f0f0f0] md:mb-16">
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

      <WorkShell sidebar={<WorkSidebar items={sidebarItems} ariaLabel={language === 'jp' ? 'このページの目次' : 'On this page'} />}>
      <div className="flex w-full flex-col gap-24 pt-6 md:gap-40 md:pt-8">
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
        <LoadingVideo label={t('loadingVideoAlt')} pauseLabel={t('videoPause')} playLabel={t('videoPlay')} />

        <Row id="overview" label={rl.overview}>
          <p className={catchLine}>{t('overviewCatch')}</p>
          {(t.raw('overview') as string[]).map((p) => (
            <p key={p} className={body}>{p}</p>
          ))}
        </Row>

        {/* 主要画面の一覧（PC とスマートフォン）。Figma の Overview 直下の図と同じ。キャプションは置かず、alt に説明を入れる */}
        <div className="flex justify-center">
          <div className="w-full">
            <Image src={`/work/nakahatsu/overview-pcsp-${language === 'jp' ? 'jp' : 'en'}.webp`} alt={t('overviewFigAlt')} width={2176} height={1312} className="h-auto w-full" />
          </div>
        </div>

        <div className="flex flex-col gap-16 md:gap-20">
          <Row id="process" label={rl.process}>
            <p className={catchLine}>{t('processCatch')}</p>
            {(t.raw('process') as string[]).map((p) => (
              <p key={p} className={body}>{p}</p>
            ))}
          </Row>
          {/* Instagram の投稿カードの図（ig-posts-*.webp）は、Figma の v2 で非表示にしたため載せない（JP は 2026-11-01 に、EN も同日に外した。画像ファイルは残してある） */}
          {/* 上の図のあとに、投稿そのものの見た目（SP 幅のスクリーンショット）を並べた図。海外の投稿は5枚目（英語の手書きのノート）、一番右は園児の投稿（2026-11-04 に Figma に合わせた）。Figma の Instagram の図の下と同じ */}
          {(() => {
            const shots = t.raw('igShots') as { dates: string[]; alts: string[]; urls: string[]; linkLabel: string; textCard: string; note: string };
            const files = ['muji', 'fest', 'overseas', 'kids'];
            return (
              <figure className="flex w-full flex-col gap-4 rounded-media bg-[var(--nk-surface)] p-3 md:px-12 md:pb-6 md:pt-8">
                <div className="grid grid-cols-2 gap-x-2 gap-y-4 md:grid-cols-4 md:gap-4">
                  {files.map((f, k) => (
                    <div key={f} className="flex min-w-0 flex-col gap-1.5">
                      <p className="font-space-grotesk text-caption font-bold text-ink-tertiary">{shots.dates[k]}</p>
                      <a href={shots.urls[k]} target="_blank" rel="noopener noreferrer" aria-label={`${shots.dates[k]} ${shots.linkLabel}`} className="block min-h-11 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
                        <Image src={`/work/nakahatsu/ig-shot-${f}.webp`} alt={shots.alts[k]} width={780} height={1210} className="h-auto w-full rounded-md" />
                      </a>
                    </div>
                  ))}
                </div>
                <p className="text-caption text-ink-tertiary">{shots.note}</p>
              </figure>
            );
          })()}
          {steps.map((s, i) => (
            <div key={s.h} id={`step-${i + 1}`} className="flex scroll-mt-28 flex-col gap-10 md:gap-10">
              <div className="flex flex-col">
                <div className="flex min-w-0 flex-col gap-3">
                  <h3 className={`text-title text-ink ${getHeadingFontClass()}`}>{s.h}</h3>
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
                  <BeforeAfterPair
                    label={t('topBaAlt')}
                    before={{ src: `/work/nakahatsu/top-ba-${language === 'jp' ? 'jp' : 'en'}-l.webp`, width: 600, height: 975, label: t('beforeLabel') }}
                    after={{ src: `/work/nakahatsu/top-ba-${language === 'jp' ? 'jp' : 'en'}-r.webp`, width: 600, height: 975, label: t('afterLabel') }}
                  />
                  <TopIterFigure f={t.raw('topIter') as IterFig} />
                  <div className="flex w-full flex-col">
                    <div className="flex min-w-0 flex-col gap-3">
                      <h3 className={`text-body-lg font-medium text-ink ${getHeadingFontClass()}`}>{t('aboutSub')}</h3>
                      <p className={body}>{t('aboutText')}</p>
                    </div>
                  </div>
                  <BeforeAfterPair
                    label={t('aboutBaAlt')}
                    before={{ src: `/work/nakahatsu/about-ba-${language === 'jp' ? 'jp' : 'en'}-l.webp`, width: 600, height: 1756, label: t('beforeLabel') }}
                    after={{ src: `/work/nakahatsu/about-ba-${language === 'jp' ? 'jp' : 'en'}-r.webp`, width: 600, height: 1756, label: t('afterLabel') }}
                  />
                  {/* About「醸造家として」のパララックスの録画。About の前後の図の直後。キャプションは置かず、aria-label に説明を入れる */}
                  <ParallaxVideo label={t('parallaxVideoAlt')} note={t('parallaxVideoNote')} noteClass={body} pauseLabel={t('videoPause')} playLabel={t('videoPlay')} />
                  <ProcessIterationsFigure f={t.raw('iterFig') as IterProcFig & { videoAlts: string[] }} lang={language} pauseLabel={t('videoPause')} playLabel={t('videoPlay')} />
                </div>
              ) : s.fig === 'before-after' ? null /* ステップ2の上側の「リニューアル前→後」の図（before-after-*）は、Figma の v2 で非表示にしたため載せない（2026-11-04。画像ファイルは残してある）。下の v1/v2 の長い図だけ出す */ : s.fig === 'bilingual-3lang' ? null /* ヒーローの3言語の図は、注釈「見せない」（2026-10-30）で外した。下の商品一覧の図だけ出す */ : (
                <div className={`flex justify-center`}>
                  <div className={`w-full overflow-hidden rounded-media bg-[var(--nk-surface)] ${i % 2 === 1 ? 'md:w-[760px]' : ''}`}>
                    <Image src={`/work/nakahatsu/${s.fig === 'before-after' ? `before-after-${language === 'jp' ? 'jp' : 'en'}` : s.fig}.webp`} alt={s.cap} width={1200} height={675} className="h-auto w-full" />
                  </div>
                </div>
              )}
              {/* v1/v2 の 1500px の図（v1-v2-*.webp）と縦長の図（v1-v2-tall-*.webp）は、Figma の v2 で非表示にしたため載せない（JP・EN とも 2026-11-01。画像ファイルは残してある） */}
              {/* さらに長い版: Instagram の節まで。人物が写る写真と見本（Sample）の画像は、灰色の四角に置き換えてある。Figma の長尺図の下と同じ */}
              {s.fig === 'before-after' && (
                <div className="flex justify-center">
                  <div className="w-full overflow-hidden rounded-media bg-[var(--nk-surface)] p-4 md:p-8">
                    <BeforeAfterPair
                      label={t('v1v2FullAlt')}
                      before={{ src: `/work/nakahatsu/v1-v2-full-${language === 'jp' ? 'jp' : 'en'}-l.webp`, width: 600, height: language === 'jp' ? 3136 : 3194, label: t('v1Label') }}
                      after={{ src: `/work/nakahatsu/v1-v2-full-${language === 'jp' ? 'jp' : 'en'}-r.webp`, width: 600, height: language === 'jp' ? 3136 : 3194, label: t('v2Label') }}
                    />
                    <p className="pt-4 text-body-sm text-ink-tertiary">{t('v1v2FullNote')}</p>
                  </div>
                </div>
              )}
              {/* 色の図のあとに、ストアのテーマの文字・サイズ・色・余白の図（デザインシステム）。Figma の Step/5 の下と同じ */}
              {s.fig === 'palette' && (
                <DesignSystemFigure f={t.raw('dsFig') as DesignSystemData} label={t('dsAlt')} />
              )}
              {/* 3つの言語の商品一覧の図（bilingual-text.webp）は、Figma の v2 で非表示にしたため載せない（JP・EN とも 2026-11-01。画像ファイルは残してある） */}
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

        <Row id="credit" label={rl.credit}>
          {credit.map(([who, what]) => (
            <div key={who} className="flex flex-col gap-1 md:flex-row md:gap-6">
              <p className={`${getBodyFontClass()} text-body-sm text-ink-tertiary md:w-[140px] md:shrink-0`}>{who}</p>
              <p className={`${getBodyFontClass()} text-body-sm tracking-[0.2px] text-ink`}>{what}</p>
            </div>
          ))}
        </Row>

        <section className="flex flex-col items-start gap-4">
          <p className={body}>{t('moreText')}</p>
          <CTAButton href={localePath('/work/nakahatsu', language)}>{t('moreLink')}</CTAButton>
        </section>
      </div>
      </WorkShell>
    </div>
  );
};

export default NakahatsuSy;
