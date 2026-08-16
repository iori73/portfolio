'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import BackToTopButton from '@/src/compositions/BackToTopButton';
import { useTranslations, useLocale } from 'next-intl';
import { useBodyFont, useHeadingFont } from '@/src/hooks/useFonts';
import { usePageTransition } from '@/src/contexts/TransitionContext';

/**
 * 本文図版。ハンドオフ §5.2 の仕様どおり 16:9 / 1200x675 で、器と画像の比率が
 * 一致しているので切れも歪みもない。ただし中身が比較パネル（2枚並置・3幅並置）
 * なので、本文幅に収まるとラベルが実測 12.5px（1440px 幅）/ 4.0px（390px 幅）
 * まで縮む。読める大きさにならないビューポートがあるため、原寸を別タブで
 * 開けるようにしてある。
 */
function FullSizeImage({
  src,
  alt,
  visibleLabel,
  openLabel,
}: {
  src: string;
  alt: string;
  visibleLabel: string;
  openLabel: string;
}) {
  return (
    <a
      href={src}
      target="_blank"
      rel="noopener noreferrer"
      /* 可視ラベルは5枚とも同じ文言なので、そのままだとスクリーンリーダーのリンク
         一覧で5つとも同じ名前になり、どれがどの図版か区別できない。図版ごとの名前を
         渡す。頭は可視ラベルと同じ語で始めてある（WCAG 2.5.3 Label in Name）。 */
      aria-label={openLabel}
      className="group relative block w-full overflow-hidden rounded-lg"
    >
      <Image src={src} alt={alt} width={1200} height={675} className="w-full h-auto" />
      <span className="pointer-events-none absolute bottom-2 right-3 font-space-grotesk text-body-sm text-ink-tertiary opacity-0 transition-opacity group-hover:opacity-100">
        {visibleLabel} ↗
      </span>
    </a>
  );
}

const SECTIONS = [
  'overview',
  'design-process',
  'solution',
  'reflection',
] as const;

const NakahatsuPage: React.FC = () => {
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
          <div className="w-full aspect-[8/5] bg-[#F5F5F7] overflow-hidden relative">
            <Image
              key={language}
              src={language === 'jp' ? '/work/nakahatsu/thumbnail-jp.webp' : '/work/nakahatsu/thumbnail-en.webp'}
              alt="Nakahatsu Shoten Website"
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
            <div className="flex flex-col items-start gap-4">
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
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <span className="text-caption-lg font-space-grotesk font-semibold text-ink-tertiary mb-2 block">
                {t('common.timeline')}
              </span>
              <p className="text-body-lg tracking-[0.2px]">
                {t('projects.nakahatsu.timeline')}
              </p>
            </div>
            <div>
              <span className="text-caption-lg font-space-grotesk font-semibold text-ink-tertiary mb-2 block">
                {t('common.mySkills')}
              </span>
              <p className="text-body-lg tracking-[0.2px]">
                {t('projects.nakahatsu.skills')}
              </p>
            </div>
            <div>
              <span className="text-caption-lg font-space-grotesk font-semibold text-ink-tertiary mb-2 block">
                {t('common.type')}
              </span>
              <p className="text-body-lg tracking-[0.2px]">
                {t('common.clientWork')}
              </p>
            </div>
            <div>
              <span className="text-caption-lg font-space-grotesk font-semibold text-ink-tertiary mb-2 block">
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
                {t('nakahatsu.overviewText2')}
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
                <p className={bodyTextClass}>
                  {t('nakahatsu.roleText')}
                </p>
              </div>

              <figure>
                <FullSizeImage
                  src="/work/nakahatsu/before-after.webp"
                  alt="The previous WordPress site and EC-CUBE shop next to the new Shopify storefront"
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

              {/* Design system */}
              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>
                  {t('nakahatsu.dsTitle')}
                </h3>
                <p className={`mb-6 text-ink-secondary ${bodyTextClass}`}>
                  {t('nakahatsu.dsText')}
                </p>
                <figure>
                  <FullSizeImage
                    src="/work/nakahatsu/vertical-typography.webp"
                    alt="Vertical Japanese body copy on the About page"
                    visibleLabel={t('common.viewFull')}
                    openLabel={`${t('common.viewFull')}: ${t('nakahatsu.captionVerticalTypography')}`}
                  />
                  <figcaption className={captionClass}>
                    {t('nakahatsu.captionVerticalTypography')}
                  </figcaption>
                </figure>
              </div>

              {/* Bilingual typesetting */}
              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>
                  {t('nakahatsu.i18nTypeTitle')}
                </h3>
                <p className={`mb-6 text-ink-secondary ${bodyTextClass}`}>
                  {t('nakahatsu.i18nTypeText')}
                </p>
                <figure>
                  <FullSizeImage
                    src="/work/nakahatsu/bilingual.webp"
                    alt="The same About section in Japanese and English"
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-6">
                  <div className="p-6 rounded-lg bg-surface-muted">
                    <p className="text-title-sm font-space-grotesk font-semibold text-ink mb-2">23</p>
                    <p className="text-body-sm text-ink-tertiary">{t('nakahatsu.stat1')}</p>
                  </div>
                  <div className="p-6 rounded-lg bg-surface-muted">
                    <p className="text-title-sm font-space-grotesk font-semibold text-ink mb-2">12</p>
                    <p className="text-body-sm text-ink-tertiary">{t('nakahatsu.stat2')}</p>
                  </div>
                  <div className="p-6 rounded-lg bg-surface-muted">
                    <p className="text-title-sm font-space-grotesk font-semibold text-ink mb-2">10</p>
                    <p className="text-body-sm text-ink-tertiary">{t('nakahatsu.stat3')}</p>
                  </div>
                </div>
                <figure>
                  <FullSizeImage
                    src="/work/nakahatsu/products.webp"
                    alt="The product grid on the home page"
                    visibleLabel={t('common.viewFull')}
                    openLabel={`${t('common.viewFull')}: ${t('nakahatsu.captionProducts')}`}
                  />
                  <figcaption className={captionClass}>
                    {t('nakahatsu.captionProducts')}
                  </figcaption>
                </figure>
              </div>

              {/* Responsive */}
              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>
                  {t('nakahatsu.responsiveTitle')}
                </h3>
                <p className={`mb-6 text-ink-secondary ${bodyTextClass}`}>
                  {t('nakahatsu.responsiveText')}
                </p>
                <figure>
                  <FullSizeImage
                    src="/work/nakahatsu/responsive.webp"
                    alt="The home page at 1440, 768 and 390 pixels wide"
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
              </div>

              {/* Designing around uncertain assets */}
              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>
                  {t('nakahatsu.uncertainTitle')}
                </h3>
                <p className={`text-ink-secondary ${bodyTextClass}`}>
                  {t('nakahatsu.uncertainText')}
                </p>
              </div>

              {/* Quality */}
              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>
                  {t('nakahatsu.qualityTitle')}
                </h3>
                <p className={`text-ink-secondary ${bodyTextClass}`}>
                  {t('nakahatsu.qualityText')}
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
              <div className="space-y-6">
                <div>
                  <h3 className={`text-title mb-3 ${getHeadingFontClass()}`}>
                    {t('nakahatsu.translationTitle')}
                  </h3>
                  <p className={`text-ink-secondary ${bodyTextClass}`}>
                    {t('nakahatsu.translationText')}
                  </p>
                </div>
                <div>
                  <h3 className={`text-title mb-3 ${getHeadingFontClass()}`}>
                    {t('nakahatsu.policyTitle')}
                  </h3>
                  <p className={`text-ink-secondary ${bodyTextClass}`}>
                    {t('nakahatsu.policyText')}
                  </p>
                </div>
                <div>
                  <h3 className={`text-title mb-3 ${getHeadingFontClass()}`}>
                    {t('nakahatsu.tokenTitle')}
                  </h3>
                  <p className={`text-ink-secondary ${bodyTextClass}`}>
                    {t('nakahatsu.tokenText')}
                  </p>
                </div>
                <div>
                  <h3 className={`text-title mb-3 ${getHeadingFontClass()}`}>
                    {t('nakahatsu.statusTitle')}
                  </h3>
                  <p className={`text-ink-secondary ${bodyTextClass}`}>
                    {t('nakahatsu.statusText')}
                  </p>
                </div>
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

export default NakahatsuPage;
