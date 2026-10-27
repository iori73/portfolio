'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import BackToTopButton from '@/src/compositions/BackToTopButton';
import { useTranslations, useLocale } from 'next-intl';
import { useBodyFont, useHeadingFont } from '@/src/hooks/useFonts';
import { CTAButton } from '@/components/ui/cta-button';
import { usePageTransition } from '@/src/contexts/TransitionContext';

/**
 * 公開先。移行が完了すると nakahatsu.jp が新サイトになる。
 * このケーススタディ自体、クライアントサイトが一般公開されるまで
 * デプロイしない前提なので、公開時点ではこの URL が正しい。
 * ただしそれまでは旧サイト（WordPress + EC-CUBE）が返るため、
 * ローカルで押すと「移行前」が開く。公開前に必ず実物を確認すること。
 */
const SITE_URL = 'https://nakahatsu.jp/';

/** 同業リサーチで実際に調べた10サイト（docs/research/COMPETITOR-RESEARCH.md）。
 *  各社の公開サイトで、順序は調査時のもの。 */
const SURVEYED_SITES = [
  { name: '弓削多醤油', url: 'https://yugeta.com/' },
  { name: '金沢こんかこんか', url: 'https://kanazawakonkakonka.myshopify.com/' },
  { name: 'ヤマニ味噌', url: 'https://www.yamanimiso.jp/' },
  { name: 'ヤマト醤油味噌', url: 'https://shop.yamato-soysauce-miso.co.jp/' },
  { name: 'まめくら', url: 'https://mamekura.myshopify.com/' },
  { name: '河村醤油', url: 'https://www.kawamura-shoyu.co.jp/' },
  { name: 'ヒガシマル醤油', url: 'https://shop.higashimaru.co.jp/' },
  { name: 'ヤマヒサ', url: 'https://yama-hisa.jp/' },
  { name: '加賀生麩処 茶庵', url: 'https://saan-shopping.com/' },
  { name: '寧楽醗酵', url: 'https://narahakko.theshop.jp/' },
] as const;

/** ヒストリーページを参考にした老舗6社（2026年4月初旬。docs/research の記録）。 */
const HERITAGE_COMPANIES = ['サントリー', '任天堂', '虎屋', '月桂冠', 'ヤマサ', 'キッコーマン'] as const;

/** ムードボードで比べた3つの方向性（docs/research/MOODBOARD.md）。 */
const MOODBOARD_DIRECTIONS = ['A 蔵の静けさ', 'B 金沢の日常', 'C 発酵ラボ'] as const;

/**
 * 本文図版。ハンドオフ §5.2 の仕様どおり 16:9 / 1200x675 で、器と画像の比率が
 * 一致しているので切れも歪みもない。ただし中身が比較パネル（2枚並置・3幅並置）
 * なので、本文幅に収まるとラベルが実測 12.5px（1440px 幅）/ 4.0px（390px 幅）
 * まで縮む。読める大きさにならないビューポートがあるため、原寸を別タブで
 * 開けるようにしてある。
 *
 * href を渡すと、原寸画像ではなくその URL を開く。実際のページを見せたほうが
 * 情報量が多い図版（商品一覧など）はこちらを使う。
 */
function FullSizeImage({
  src,
  alt,
  visibleLabel,
  openLabel,
  width = 1200,
  height = 675,
  href,
}: {
  src: string;
  alt: string;
  visibleLabel: string;
  openLabel: string;
  width?: number;
  height?: number;
  href?: string;
}) {
  return (
    <a
      href={href ?? src}
      target="_blank"
      rel="noopener noreferrer"
      /* 可視ラベルは5枚とも同じ文言なので、そのままだとスクリーンリーダーのリンク
         一覧で5つとも同じ名前になり、どれがどの図版か区別できない。図版ごとの名前を
         渡す。頭は可視ラベルと同じ語で始めてある（WCAG 2.5.3 Label in Name）。 */
      aria-label={openLabel}
      className="group relative block w-full overflow-hidden rounded-media focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
    >
      <Image src={src} alt={alt} width={width} height={height} className="w-full h-auto" />
      <span className="pointer-events-none absolute bottom-2 right-3 font-space-grotesk text-body-sm text-ink-tertiary opacity-0 transition-opacity group-hover:opacity-100">
        {visibleLabel} ↗
      </span>
    </a>
  );
}

/**
 * ブランドカラーをどこで止めたかを、文章の横に実際の色で示す。
 * 「加賀五彩に由来する臙脂色」は言葉だけだと専門用語が2つ重なるため、色そのものを見せる。
 * 値は案件側の記録に基づく実値（臙脂 = ブランド、#005BD3 = Checkout 以降）。
 */
function ColorStop({ hex, label }: { hex: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className="h-9 w-9 flex-shrink-0 rounded-full ring-1 ring-line-section"
        style={{ backgroundColor: hex }}
      />
      <div className="min-w-0">
        <p className="text-body-sm text-ink">{label}</p>
        <p className="font-space-grotesk text-caption-lg text-ink-tertiary">{hex}</p>
      </div>
    </div>
  );
}

const SECTIONS = [
  'overview',
  'design-process',
  'solution',
  'reflection',
] as const;

/**
 * `launched` はクライアントサイトが一般公開されたか。判定はサーバー側（page.tsx）。
 *
 * 公開前提の記述はこの3か所しかなく、いずれもこのフラグで切り替わる:
 *   1. 概要 — 海外販売は今回の範囲外という断り
 *   2. 品質 — 「先方による全体の確認はこれから」の一文
 *   3. 振り返り末尾の「現在のステータス」節そのもの（公開後は節ごと出さない）
 *
 * 増やすときは、必ずこのコメントに追記すること。切り替え漏れは
 * 「事実と違うことが書いてあるページ」になって表に出る。
 */
const NakahatsuCaseStudy: React.FC<{ launched: boolean }> = ({ launched }) => {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const t = useTranslations();
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = activeSection;
      for (const id of SECTIONS) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            currentSection = id;
          }
        }
      }
      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection]);

  const sidebarButtonClass = (sectionId: string) =>
    activeSection === sectionId
      ? 'text-left text-title font-switzer transition-transform duration-900 scale-110'
      : 'text-left text-title-sm font-switzer transition-transform duration-900 scale-100 opacity-50';

  const bodyTextClass = `${getBodyFontClass()} tracking-[0.2px] text-body-lg`;
  const captionClass = 'mt-3 text-body-sm md:text-body-base text-ink-tertiary font-space-grotesk';

  return (
    <div className="font-sans my-24 md:mt-28 md:mb-16">
      <BackToTopButton />

      {/* Hero. aspect-[8/5] は TransitionOverlay 側にハードコードされた比率と
          一致している必要がある（外すと FLIP の着地がズレる）。 */}
      <section className="mb-0 md:mb-12 full-bleed">
        <div className="w-full">
          <div className="w-full aspect-[8/5] bg-surface-muted overflow-hidden relative">
            <Image
              key={language}
              src={language === 'jp' ? '/work/nakahatsu/thumbnail-jp.webp' : '/work/nakahatsu/thumbnail-en.webp'}
              alt={t('nakahatsu.heroAlt')}
              fill
              sizes="(min-width: 768px) 1280px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Project Info */}
      <section className="pt-6 pb-12 md:pt-8 md:pb-16">
        <div className="max-w-[1028px] w-full mx-auto">
          <div className="mb-10 md:mb-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
              <div className="flex-1">
                <h1
                  className={`text-headline text-ink mb-3 md:mb-2 ${getHeadingFontClass()}`}
                >
                  {t('nakahatsu.title')}
                </h1>
                <p
                  className={`text-body-lg ${getBodyFontClass()} text-ink-secondary tracking-[0.2px]`}
                >
                  {t('nakahatsu.subtitle')}
                </p>
              </div>
              {/* 公開前は nakahatsu.jp が旧 WordPress サイトのままなので、リンクは出さない。
                  ボタンの代わりに状態を出して、他の Work と見出しまわりの並びをそろえる。 */}
              <div className="flex-shrink-0 w-full md:w-auto">
                {launched ? (
                  <CTAButton href={SITE_URL} external className="w-full md:w-auto">
                    {t('common.goToSite')}
                  </CTAButton>
                ) : (
                  <span className={`inline-block text-body ${getBodyFontClass()} leading-[1.3] px-4 py-1.5 rounded-lg bg-surface-muted text-ink-secondary`}>
                    {t('nakahatsu.statusBadge')}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <span className="text-body font-space-grotesk font-semibold text-ink-tertiary mb-2 block">
                {t('common.timeline')}
              </span>
              <p className="text-body-lg tracking-[0.2px]">
                {t('projects.nakahatsu.timeline')}
              </p>
            </div>
            <div>
              <span className="text-body font-space-grotesk font-semibold text-ink-tertiary mb-2 block">
                {t('common.mySkills')}
              </span>
              <p className="text-body-lg tracking-[0.2px]">
                {t('projects.nakahatsu.skills')}
              </p>
            </div>
            <div>
              <span className="text-body font-space-grotesk font-semibold text-ink-tertiary mb-2 block">
                {t('common.type')}
              </span>
              <p className="text-body-lg tracking-[0.2px]">
                {t('nakahatsu.typeValue')}
              </p>
            </div>
            <div>
              <span className="text-body font-space-grotesk font-semibold text-ink-tertiary mb-2 block">
                {t('common.deliverables')}
              </span>
              <p className="text-body-lg tracking-[0.2px]">
                {t('projects.nakahatsu.deliverables')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content + Sidebar */}
      <div className="max-w-7xl w-full mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Main Content */}
          <div className="md:w-[80%]">
            {/* OVERVIEW */}
            <section
              id="overview"
              className="w-full mx-auto py-12 md:py-16 text-ink-secondary scroll-mt-32"
            >
              <h2 className={`text-title-lg mb-6 ${getHeadingFontClass()}`}>
                {t('work.overview')}
              </h2>
              <p className={`mb-4 ${bodyTextClass}`}>
                {t('nakahatsu.overviewText1')}
              </p>
              <p className={`mb-8 ${bodyTextClass}`}>
                {t(launched ? 'nakahatsu.overviewText2Live' : 'nakahatsu.overviewText2')}
              </p>

              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>
                  {t('nakahatsu.challengeTitle')}
                </h3>
                <ul className={`list-disc list-inside space-y-2 ${bodyTextClass}`}>
                  <li>{t('nakahatsu.challenge1')}</li>
                  <li>{t('nakahatsu.challenge2')}</li>
                  <li>{t('nakahatsu.challenge3')}</li>
                  <li>{t('nakahatsu.challenge4')}</li>
                  <li>{t('nakahatsu.challenge5')}</li>
                </ul>
                {/* 箇条書きだけだと主張の裏付けがないため、旧サイトからの証拠を添える。
                    パネル内は旧サイト（日本語）の画面なので日本語のまま。説明の文は画像に焼き込まない。 */}
                <figure className="mt-8">
                  <FullSizeImage
                    src="/work/nakahatsu/challenges.webp"
                    alt={t('nakahatsu.captionChallenges')}
                    width={1200}
                    height={675}
                    visibleLabel={t('common.viewFull')}
                    openLabel={`${t('common.viewFull')}: ${t('nakahatsu.captionChallenges')}`}
                  />
                  <figcaption className={captionClass}>
                    {t('nakahatsu.captionChallenges')}
                  </figcaption>
                </figure>
              </div>

              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>
                  {t('nakahatsu.contextTitle')}
                </h3>
                <p className={bodyTextClass}>
                  {t('nakahatsu.contextText')}
                </p>
              </div>

              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>
                  {t('nakahatsu.roleTitle')}
                </h3>
                <p className={`mb-4 ${bodyTextClass}`}>
                  {t('nakahatsu.roleText')}
                </p>
                <ul className={`list-disc list-inside space-y-2 mb-4 ${bodyTextClass}`}>
                  <li>{t('nakahatsu.scope1')}</li>
                  <li>{t('nakahatsu.scope2')}</li>
                  <li>{t('nakahatsu.scope3')}</li>
                  <li>{t('nakahatsu.scope4')}</li>
                  <li>{t('nakahatsu.scope5')}</li>
                  <li>{t('nakahatsu.scope6')}</li>
                </ul>
                <p className={`mb-4 text-ink-tertiary ${bodyTextClass}`}>
                  {t('nakahatsu.aiNote')}
                </p>
                {/* 公開前の状態の説明。公開後は事実でなくなるので出さない（docs/nakahatsu-after-launch.md） */}
                {!launched && (
                  <p className={`text-ink-tertiary ${bodyTextClass}`}>
                    {t('nakahatsu.scopeNote')}
                  </p>
                )}
              </div>

              <figure>
                <FullSizeImage
                  src={`/work/nakahatsu/before-after-${language === 'jp' ? 'jp' : 'en'}.webp`}
                  alt={t('nakahatsu.captionBeforeAfter')}
                  visibleLabel={t('common.viewFull')}
                  openLabel={`${t('common.viewFull')}: ${t('nakahatsu.captionBeforeAfter')}`}
                />
                <figcaption className={captionClass}>
                  {t('nakahatsu.captionBeforeAfter')}
                </figcaption>
              </figure>
            </section>

            {/* DESIGN PROCESS */}
            <section
              id="design-process"
              className="py-12 md:py-20 scroll-mt-32"
            >
              <h2 className={`text-title-lg mb-6 ${getHeadingFontClass()}`}>
                {t('work.designProcess')}
              </h2>
              <p className={`mb-10 md:mb-14 text-ink-secondary ${bodyTextClass}`}>
                {t('nakahatsu.designProcessIntro')}
              </p>

              {/* Research */}
              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>
                  {t('nakahatsu.researchTitle')}
                </h3>
                <p className={`text-ink-secondary ${bodyTextClass}`}>
                  {t('nakahatsu.researchText')}
                </p>
              </div>

              {/* Two directions */}
              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>
                  {t('nakahatsu.twoDirectionsTitle')}
                </h3>
                {/* v1 の図版は載せない。v1 のビジュアルはクライアントの既存デザインであり
                    自分のデザインとして出せないこと、および現在の ?view=v1 は
                    ヘッダー/フッターだけ新テーマに差し替わったハイブリッドで
                    v1 の忠実な姿ではないことを、中初側セッションの実測で確認したため。 */}
                <p className={`text-ink-secondary ${bodyTextClass}`}>
                  {t('nakahatsu.twoDirectionsText')}
                </p>
              </div>

              {/* 判断の事例: 実在しない写真を載せない（2026-10-12） */}
              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>
                  {t('nakahatsu.photosTitle')}
                </h3>
                <p className={`text-ink-secondary ${bodyTextClass}`}>
                  {t('nakahatsu.photosText')}
                </p>
              </div>

              {/* 8月以降のデザインの動き（About F 案・天祐の縦書き） */}
              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>
                  {t('nakahatsu.aboutTitle')}
                </h3>
                <p className={`text-ink-secondary ${bodyTextClass}`}>
                  {t('nakahatsu.aboutText')}
                </p>
                <figure className="mt-8">
                  <FullSizeImage
                    src="/work/nakahatsu/about-tenyu.webp"
                    alt={t('nakahatsu.captionAbout')}
                    width={1200}
                    height={675}
                    visibleLabel={t('common.viewFull')}
                    openLabel={`${t('common.viewFull')}: ${t('nakahatsu.captionAbout')}`}
                  />
                  <figcaption className={captionClass}>
                    {t('nakahatsu.captionAbout')}
                  </figcaption>
                </figure>
              </div>

              {/* おいでまっし: 円から四角へのアニメーション */}
              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>
                  {t('nakahatsu.motionTitle')}
                </h3>
                <p className={`text-ink-secondary ${bodyTextClass}`}>
                  {t('nakahatsu.motionText')}
                </p>
              </div>

              {/* Design system */}
              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>
                  {t('nakahatsu.dsTitle')}
                </h3>
                <p className={`text-ink-secondary ${bodyTextClass}`}>
                  {t('nakahatsu.dsText')}
                </p>
              </div>

              {/* 日英の組版。「英語のとき何を縦書きに残すか」の解説文は
                  説明するまでもない内容だったため落とし、図版だけ残している。 */}
              <div className="mb-10 md:mb-14">
                <figure>
                  <FullSizeImage
                    src="/work/nakahatsu/bilingual.webp"
                    alt={t('nakahatsu.captionBilingual')}
                    width={1200}
                    height={675}
                    visibleLabel={t('common.viewFull')}
                    openLabel={`${t('common.viewFull')}: ${t('nakahatsu.captionBilingual')}`}
                  />
                  <figcaption className={captionClass}>
                    {t('nakahatsu.captionBilingual')}
                  </figcaption>
                </figure>
              </div>
            </section>

            {/* SOLUTION */}
            <section
              id="solution"
              className="py-12 md:py-20 scroll-mt-32"
            >
              <h2 className={`text-title-lg mb-6 ${getHeadingFontClass()}`}>
                {t('work.solution')}
              </h2>
              <p className={`mb-10 md:mb-14 text-ink-secondary ${bodyTextClass}`}>
                {t('nakahatsu.solutionIntro')}
              </p>

              {/* What was built */}
              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>
                  {t('nakahatsu.buildTitle')}
                </h3>
                <p className={`mb-4 text-ink-secondary ${bodyTextClass}`}>
                  {t('nakahatsu.buildText')}
                </p>
                <figure>
                  <FullSizeImage
                    src="/work/nakahatsu/products.webp"
                    /* 原寸画像より実物のコレクションページのほうが情報量が多いので、
                       ここだけサイトを直接開く。SITE_URL のコメント参照。 */
                    href={launched ? `${SITE_URL}collections/all` : undefined}
                    alt={t('nakahatsu.captionProducts')}
                    visibleLabel={launched ? t('common.goToSite') : t('common.viewFull')}
                    openLabel={`${launched ? t('common.goToSite') : t('common.viewFull')}: ${t('nakahatsu.captionProducts')}`}
                  />
                  <figcaption className={captionClass}>
                    {t('nakahatsu.captionProducts')}
                  </figcaption>
                </figure>
              </div>

              {/* レスポンシブ。解説文は「当たり前のこと」として落とし、
                  3幅の比較図版だけ残している。 */}
              <div className="mb-10 md:mb-14">
                <figure>
                  <FullSizeImage
                    src="/work/nakahatsu/responsive.webp"
                    alt={t('nakahatsu.captionResponsive')}
                    visibleLabel={t('common.viewFull')}
                    openLabel={`${t('common.viewFull')}: ${t('nakahatsu.captionResponsive')}`}
                  />
                  <figcaption className={captionClass}>
                    {t('nakahatsu.captionResponsive')}
                  </figcaption>
                </figure>
              </div>

              {/* Checkout accent */}
              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>
                  {t('nakahatsu.checkoutTitle')}
                </h3>
                <p className={`text-ink-secondary ${bodyTextClass}`}>
                  {t('nakahatsu.checkoutText')}
                </p>
                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:gap-10">
                  <ColorStop hex="#8B2252" label={t('nakahatsu.swatchBrand')} />
                  <ColorStop hex="#005BD3" label={t('nakahatsu.swatchCheckout')} />
                </div>
              </div>

              {/* Quality */}
              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>
                  {t('nakahatsu.qualityTitle')}
                </h3>
                <p className={`text-ink-secondary ${bodyTextClass}`}>
                  {t(launched ? 'nakahatsu.qualityTextLive' : 'nakahatsu.qualityText')}
                </p>
              </div>
            </section>

            {/* REFLECTION */}
            <section
              id="reflection"
              className="py-12 md:py-20 scroll-mt-32"
            >
              <h2 className={`text-title-lg mb-6 ${getHeadingFontClass()}`}>
                {t('work.reflection')}
              </h2>
              {/* 振り返りは、技術的な武勇伝ではなく「この案件で何を学んだか」を書く場所。
                  Shopify の翻訳2層構造・ポリシーのレイアウト・トークンの比率といった
                  実装の詳細は、ここに置くべき内容ではないため落とした。 */}
              <div className="space-y-8 md:space-y-10">
                {(
                  [
                    ['aiLeverageTitle', 'aiLeverageText'],
                    ['aiLimitTitle', 'aiLimitText'],
                    // clientLearning（先方の活動についての記述）は、根拠が見つかるまで出さない（台帳 #未確認）
                    ['copyTitle', 'copyText'],
                    // 「現在のステータス」は未公開であることの説明なので、
                    // 公開された時点で書く意味がなくなる。節ごと出さない。
                    ...(launched
                      ? []
                      : [['statusTitle', 'statusText'] as const]),
                  ] as ReadonlyArray<readonly [string, string]>
                ).map(([titleKey, textKey]) => (
                  <div key={titleKey}>
                    <h3 className={`text-title mb-3 ${getHeadingFontClass()}`}>
                      {t(`nakahatsu.${titleKey}`)}
                    </h3>
                    <p className={`text-ink-secondary ${bodyTextClass}`}>
                      {t(`nakahatsu.${textKey}`)}
                    </p>
                  </div>
                ))}
              </div>

              {/* 参考文献。「市場の前提」で触れた同業10サイトを、本の巻末注のように
                  ページの最後にまとめる。本文の流れを切らずに出典を示すため。 */}
              <div className="mt-14 md:mt-20 border-t border-line-section pt-8">
                <h3 className={`text-title-sm mb-2 ${getHeadingFontClass()}`}>
                  {t('nakahatsu.referencesTitle')}
                </h3>
                <p className={`mb-5 text-body-sm text-ink-tertiary ${getBodyFontClass()}`}>
                  {t('nakahatsu.referencesNote')}
                </p>
                <ol className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
                  {SURVEYED_SITES.map((site, i) => (
                    <li key={site.url} className="flex gap-2 text-body-sm">
                      <span className="font-space-grotesk text-ink-tertiary tabular-nums">
                        {i + 1}.
                      </span>
                      <a
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ink-secondary underline decoration-line-section underline-offset-4 transition-colors hover:text-ink hover:decoration-current"
                      >
                        {site.name}
                      </a>
                    </li>
                  ))}
                </ol>
                <h3 className={`text-title-sm mt-8 mb-2 ${getHeadingFontClass()}`}>
                  {t('nakahatsu.heritageTitle')}
                </h3>
                <p className={`mb-3 text-body-sm text-ink-tertiary ${getBodyFontClass()}`}>
                  {t('nakahatsu.heritageNote')}
                </p>
                <ul className="flex flex-wrap gap-x-6 gap-y-2 text-body-sm text-ink-secondary">
                  {HERITAGE_COMPANIES.map((name) => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
                <h3 className={`text-title-sm mt-8 mb-2 ${getHeadingFontClass()}`}>
                  {t('nakahatsu.moodboardTitle')}
                </h3>
                <p className={`mb-3 text-body-sm text-ink-tertiary ${getBodyFontClass()}`}>
                  {t('nakahatsu.moodboardNote')}
                </p>
                <ul className="flex flex-wrap gap-x-6 gap-y-2 text-body-sm text-ink-secondary">
                  {MOODBOARD_DIRECTIONS.map((name) => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          {/* Sidebar Navigation */}
          <div className="hidden md:flex md:w-[20%] pl-4 pt-12 items-start justify-center">
            <nav className="sticky top-24">
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => scrollToSection('overview')}
                    className={sidebarButtonClass('overview')}
                  >
                    {t('work.navOverview')}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('design-process')}
                    className={sidebarButtonClass('design-process')}
                  >
                    {t('work.navDesignProcess')}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('solution')}
                    className={sidebarButtonClass('solution')}
                  >
                    {t('work.navSolution')}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('reflection')}
                    className={sidebarButtonClass('reflection')}
                  >
                    {t('work.reflection')}
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NakahatsuCaseStudy;
