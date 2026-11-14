'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import BackToTopButton from '@/src/compositions/BackToTopButton';
import { useTranslations, useLocale } from 'next-intl';
import WorkMetaGrid from '@/src/components/work/WorkMetaGrid';
import { useBodyFont, useHeadingFont } from '@/src/hooks/useFonts';
import { MoveUpRight } from 'lucide-react';
import { CTAButton } from '@/components/ui/cta-button';
import ColorAnalysisGrid from '@/components/work/ukiyoe/ColorAnalysisGrid';
import PrintingProcessStudy from '@/components/work/ukiyoe/PrintingProcessStudy';
import TopPageProcessShowcase from '@/components/work/ukiyoe/TopPageProcessShowcase';
import TopPageEvolutionGrid from '@/components/work/ukiyoe/TopPageEvolutionGrid';
import LogoProcessFigure from '@/components/work/ukiyoe/LogoProcessFigure';
import BeforeAfterPair from '@/src/components/work/BeforeAfterPair';
import { usePageTransition } from '@/src/contexts/TransitionContext';
import WorkShell from '@/src/components/work/WorkShell';
import WorkSidebar, { type SidebarItem } from '@/src/components/work/WorkSidebar';

/** 側面メニューに出す小見出し。開いている節（親）の下にだけ表示する。文言は本文の h3 と同じ翻訳キー */
const SUBSECTIONS: Record<string, { id: string; key: string }[]> = {
  research: [
    { id: 'cultural-immersion', key: 'ukiyoe.culturalResearchTitle' },
    { id: 'color-analysis', key: 'ukiyoe.colorAnalysisTitle' },
    { id: 'printing-process', key: 'ukiyoe.printingProcessTitle' },
  ],
  'design-process': [
    { id: 'top-page-design', key: 'ukiyoe.topPageDesignTitle' },
    { id: 'timeline-design', key: 'ukiyoe.timelineDesignTitle' },
    { id: 'color-system', key: 'ukiyoe.colorSystemTitle' },
    { id: 'logo-design', key: 'ukiyoe.logoDesignTitle' },
    { id: 'language-toggle', key: 'ukiyoe.langToggleTitle' },
  ],
  reflection: [
    { id: 'learnings', key: 'ukiyoe.learningsTitle' },
  ],
};

const UkiyoePage: React.FC = () => {
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

  /** 側面メニュー（共通の WorkSidebar）。文言は本文の見出しと同じ翻訳キー。小見出しは開いている節の下にだけ出る */
  const baseItems: { id: string; label: string }[] = [
    { id: 'overview', label: t('work.overview') },
    { id: 'research', label: t('ukiyoe.sectionResearch') },
    { id: 'hand-coloring', label: t('ukiyoe.handColoringTitle') },
    { id: 'design-process', label: t('work.designProcess') },
    { id: 'ai-craft', label: t('ukiyoe.aiCraftTitle') },
    { id: 'technical', label: t('ukiyoe.sectionTechnical') },
    { id: 'reflection', label: t('work.reflection') },
  ];
  const sidebarItems: SidebarItem[] = baseItems.map((it) => ({
    ...it,
    subs: SUBSECTIONS[it.id]?.map((sub) => ({ id: sub.id, label: t(sub.key) })),
  }));

  const bodyTextClass = `${getBodyFontClass()} tracking-[0.2px] text-body-lg`;

  return (
    <div className="font-sans mt-[var(--site-header-height)] mb-24 md:mb-16">
      <BackToTopButton />

      {/* Hero */}
      <section className="mb-0 md:mb-12 full-bleed">
        <div className="w-full">
          <div className="w-full aspect-[8/5] bg-[#F8F5F0] overflow-hidden relative">
            <Image
              key={language}
              /* The live site's hero (2026-11-07, direction A), captured without the
                 site's own header so it doesn't read as a second nav inside this page. */
              src={language === 'jp' ? '/work/ukiyoe/hero-site-jp.webp' : '/work/ukiyoe/hero-site-en.webp'}
              alt={language === 'jp' ? '浮世絵の技法変遷 — 作品サイトのトップ' : 'Evolution of Ukiyo-e Techniques — the site\'s top page'}
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
                  {t('ukiyoe.title')}
                </h1>
                <p
                  className={`text-body-lg ${getBodyFontClass()} text-ink-secondary tracking-[0.2px]`}
                >
                  {t('ukiyoe.subtitle')}
                </p>
              </div>
              <div className="flex-shrink-0 w-full md:w-auto">
                <CTAButton href="https://ukiyoe-timeline.vercel.app/" external className="w-full md:w-auto">
                  {t('common.goToSite')}
                </CTAButton>
              </div>
            </div>
          </div>

          <WorkMetaGrid
            labelClassName="text-body"
            items={[
              { label: 'Timeline', value: t('projects.ukiyoe.timeline') },
              { label: 'My Skills', value: t('projects.ukiyoe.skills') },
              { label: 'Type', value: t('common.personalProject') },
              { label: 'Deliverables', value: t('projects.ukiyoe.deliverables') },
            ]}
          />
        </div>
      </section>

      {/* 本文 + 側面メニュー（全作品ページで共通の枠。寸法は WorkShell） */}
      <WorkShell sidebar={<WorkSidebar items={sidebarItems} ariaLabel={language === 'jp' ? 'このページの目次' : 'On this page'} />}>

            {/* 1. Overview */}
            <section id="overview" className="w-full mx-auto py-12 md:py-16 text-ink-secondary scroll-mt-32">
              <h2 className={`text-title-lg mb-6 ${getHeadingFontClass()}`}>
                {t('work.overview')}
              </h2>
              <p className={`mb-4 ${bodyTextClass}`}>{t('ukiyoe.overviewText1')}</p>
              <p className={`mb-6 ${bodyTextClass}`}>{t('ukiyoe.overviewText2')}</p>

              <div className="mt-8">
                <a
                  href="https://github.com/iori73/ukiyoe-timeline"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center">
                    <svg viewBox="0 0 16 16" className="w-6 h-6 md:w-8 md:h-8" fill="none">
                      <path
                        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                        fill="#24292f"
                      />
                    </svg>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-body leading-[1.25] font-normal text-ink-tertiary">
                      iori73
                    </span>
                    <span className="text-body leading-[1.25] font-normal text-ink-tertiary">
                      /
                    </span>
                    <span className="text-body leading-[1.25] font-semibold text-ink">
                      ukiyoe-timeline
                    </span>
                  </div>
                  <MoveUpRight className="w-4 h-4 md:w-5 md:h-5 text-ink-tertiary flex-shrink-0" />
                </a>
              </div>
            </section>

            {/* 2. Research & Discovery */}
            <section id="research" className="py-12 md:py-20 scroll-mt-32">
              <h2 className={`text-title-lg mb-6 ${getHeadingFontClass()}`}>
                {t('ukiyoe.sectionResearch')}
              </h2>
              <p className={`mb-10 md:mb-14 text-ink-secondary ${bodyTextClass}`}>
                {t('ukiyoe.researchIntro')}
              </p>

              {/* Cultural Immersion */}
              <div className="mb-10 md:mb-14">
                <h3 id="cultural-immersion" className={`scroll-mt-32 text-title mb-4 ${getHeadingFontClass()}`}>
                  {t('ukiyoe.culturalResearchTitle')}
                </h3>
                <p className={`mb-6 text-ink-secondary ${bodyTextClass}`}>
                  {t('ukiyoe.culturalResearchText')}
                </p>
                <figure>
                  <Image
                    src="/work/ukiyoe/research-sites-v2.webp"
                    alt={t('ukiyoe.captionResearch')}
                    width={1600}
                    height={1914}
                    className="w-full h-auto rounded-lg border border-line-section overflow-hidden"
                  />
                  <figcaption className="mt-3 text-body-sm md:text-body-base text-ink-tertiary font-space-grotesk">
                    {t('ukiyoe.captionResearch')}
                  </figcaption>
                </figure>
              </div>

              {/* Color Extraction & Analysis */}
              <div className="mb-10 md:mb-14">
                <h3 id="color-analysis" className={`scroll-mt-32 text-title mb-4 ${getHeadingFontClass()}`}>
                  {t('ukiyoe.colorAnalysisTitle')}
                </h3>
                <p className={`mb-6 text-ink-secondary ${bodyTextClass}`}>
                  {t('ukiyoe.colorAnalysisText')}
                </p>
                <figure>
                  <div className="rounded-lg border border-line-section overflow-hidden">
                    <ColorAnalysisGrid locale={language} />
                  </div>
                  <figcaption className="mt-3 text-body-sm md:text-body-base text-ink-tertiary font-space-grotesk">
                    {t('ukiyoe.captionColorAnalysis')}
                  </figcaption>
                </figure>
              </div>

              {/* Printing Process Study */}
              <div>
                <h3 id="printing-process" className={`scroll-mt-32 text-title mb-4 ${getHeadingFontClass()}`}>
                  {t('ukiyoe.printingProcessTitle')}
                </h3>
                <p className={`mb-6 text-ink-secondary ${bodyTextClass}`}>
                  {t('ukiyoe.printingProcessText')}
                </p>
                <figure>
                  <PrintingProcessStudy />
                </figure>
              </div>
            </section>

            {/* 3. Hand-Coloring the Layers — first on the live site, so first here */}
            <section id="hand-coloring" className="py-12 md:py-20 scroll-mt-32">
              <h2 className={`text-title-lg mb-6 ${getHeadingFontClass()}`}>
                {t('ukiyoe.handColoringTitle')}
              </h2>
              <div className={`mb-10 md:mb-14 text-ink-secondary ${bodyTextClass} space-y-4`}>
                <p>{t('ukiyoe.handColoringText1')}</p>
                <p>{t('ukiyoe.handColoringText2')}</p>
                <p>{t('ukiyoe.handColoringText3')}</p>
              </div>
              <figure>
                <video
                  src="/work/ukiyoe/sumizuri-timelapse.mp4"
                  controls
                  playsInline
                  muted
                  loop
                  className="w-full md:w-[56%] md:mx-auto h-auto rounded-lg border border-line-section bg-black"
                />
                <figcaption className="mt-3 text-body-sm md:text-body-base text-ink-tertiary font-space-grotesk">
                  {t('ukiyoe.captionHandColoring')}
                </figcaption>
              </figure>
            </section>

            {/* 4. Design Process */}
            <section id="design-process" className="py-12 md:py-20 scroll-mt-32">
              <h2 className={`text-title-lg mb-6 ${getHeadingFontClass()}`}>
                {t('work.designProcess')}
              </h2>
              <p className={`mb-10 md:mb-14 text-ink-secondary ${bodyTextClass}`}>
                {t('ukiyoe.designProcessIntro')}
              </p>

              {/* Top Page: Layer Animation */}
              <div className="mb-12 md:mb-20">
                <h3 id="top-page-design" className={`scroll-mt-32 text-title mb-4 ${getHeadingFontClass()}`}>
                  {t('ukiyoe.topPageDesignTitle')}
                </h3>
                <div className={`mb-6 text-ink-secondary ${bodyTextClass} space-y-4`}>
                  <p>{t('ukiyoe.topPageDesignText1')}</p>
                </div>
                <figure className="mb-6 md:mb-8">
                  <TopPageProcessShowcase />
                  <figcaption className="mt-3 text-body-sm md:text-body-base text-ink-tertiary font-space-grotesk">
                    {t('ukiyoe.captionTopPage')}
                  </figcaption>
                </figure>
                <div className={`mb-6 md:mb-8 text-ink-secondary ${bodyTextClass} space-y-4`}>
                  <p>{t('ukiyoe.topPageDesignText2')}</p>
                  <p>{t('ukiyoe.topPageDesignText3')}</p>
                </div>
                <figure>
                  <TopPageEvolutionGrid />
                  <figcaption className="mt-3 text-body-sm md:text-body-base text-ink-tertiary font-space-grotesk">
                    {t('ukiyoe.topPageDesignHeroCaption')}
                  </figcaption>
                </figure>
              </div>

              {/* Timeline: Artwork Gallery */}
              <div className="mb-12 md:mb-20">
                <h3 id="timeline-design" className={`scroll-mt-32 text-title mb-4 ${getHeadingFontClass()}`}>
                  {t('ukiyoe.timelineDesignTitle')}
                </h3>
                <div className={`mb-6 text-ink-secondary ${bodyTextClass} space-y-4`}>
                  <p>{t('ukiyoe.timelineDesignText1')}</p>
                  <p>{t('ukiyoe.timelineDesignText2')}</p>
                </div>
                <figure>
                  <Image
                    src={language === 'jp' ? '/work/ukiyoe/timeline-era-v2-jp.webp' : '/work/ukiyoe/timeline-era-v2-en.webp'}
                    alt={t('ukiyoe.captionTimeline')}
                    width={1320}
                    height={language === 'jp' ? 1793 : 2004}
                    className="w-full h-auto rounded-lg"
                  />
                  <figcaption className="mt-3 text-body-sm md:text-body-base text-ink-tertiary font-space-grotesk">
                    {t('ukiyoe.captionTimeline')}
                  </figcaption>
                </figure>
                {/* 2026-11 rebuild: eras by technique, prints only, records for every work */}
                <div className={`mt-10 md:mt-14 mb-6 text-ink-secondary ${bodyTextClass} space-y-4`}>
                  <p>{t('ukiyoe.timelineDesignText3')}</p>
                  <p>{t('ukiyoe.timelineDesignText4')}</p>
                </div>
                {/* before / after, both captured from the live site (the first version still runs at /a/timeline) */}
                <div>
                  <BeforeAfterPair
                    label={t('ukiyoe.captionTimelineV2')}
                    before={{ src: `/work/ukiyoe/timeline-before-${language === 'jp' ? 'jp' : 'en'}.webp`, width: 1000, height: 625, label: t('ukiyoe.timelineBefore') }}
                    after={{ src: `/work/ukiyoe/timeline-after-${language === 'jp' ? 'jp' : 'en'}.webp`, width: 1000, height: 625, label: t('ukiyoe.timelineAfter') }}
                  />
                  <p className="mt-3 text-body-sm md:text-body-base text-ink-tertiary font-space-grotesk">
                    {t('ukiyoe.captionTimelineV2')}
                  </p>
                </div>
              </div>

              {/* Color System & Period Ratios */}
              <div className="mb-12 md:mb-20">
                <h3 id="color-system" className={`scroll-mt-32 text-title mb-4 ${getHeadingFontClass()}`}>
                  {t('ukiyoe.colorSystemTitle')}
                </h3>
                <div className={`mb-6 text-ink-secondary ${bodyTextClass} space-y-4`}>
                  <p>{t('ukiyoe.colorSystemIntro')}</p>
                  <p>{t('ukiyoe.colorSystemMethod')}</p>
                  <p>{t('ukiyoe.colorSystemViz')}</p>
                </div>
                <figure>
                  {/* the site's own palette summary (2026-11 rebuild) — replaces the earlier proportion bars */}
                  <Image
                    key={language}
                    src={language === 'jp' ? '/work/ukiyoe/palette-v3-jp.webp' : '/work/ukiyoe/palette-v3-en.webp'}
                    alt={t('ukiyoe.captionColorSystem')}
                    width={980}
                    height={845}
                    className="w-full md:w-[75%] md:mx-auto h-auto rounded-lg"
                  />
                  <figcaption className="mt-3 text-body-sm md:text-body-base text-ink-tertiary font-space-grotesk">
                    {t('ukiyoe.captionColorSystem')}
                  </figcaption>
                </figure>
              </div>

              {/* Logo Design */}
              <div>
                <h3 id="logo-design" className={`scroll-mt-32 text-title mb-4 ${getHeadingFontClass()}`}>
                  {t('ukiyoe.logoDesignTitle')}
                </h3>
                <p className={`mb-6 text-ink-secondary ${bodyTextClass}`}>
                  {t('ukiyoe.logoDesignText1')}
                </p>
                <figure className="mb-8">
                  <LogoProcessFigure locale={language} />
                  <figcaption className="mt-3 text-body-sm md:text-body-base text-ink-tertiary font-space-grotesk">
                    {t('ukiyoe.captionLogoProcess')}
                  </figcaption>
                </figure>
                <p className={`mb-6 text-ink-secondary ${bodyTextClass}`}>
                  {t('ukiyoe.logoDesignText2')}
                </p>
                <figure>
                  <Image
                    src="/work/ukiyoe/process-logo.webp"
                    alt={t('ukiyoe.captionLogo')}
                    width={1200}
                    height={675}
                    className="w-full h-auto rounded-lg border border-line-section overflow-hidden"
                  />
                  <figcaption className="mt-3 text-body-sm md:text-body-base text-ink-tertiary font-space-grotesk">
                    {t('ukiyoe.captionLogo')}
                  </figcaption>
                </figure>
              </div>

              {/* Language toggle: Japanese eyes / foreign eyes (2026-11) */}
              <div className="mt-12 md:mt-20">
                <h3 id="language-toggle" className={`scroll-mt-32 text-title mb-4 ${getHeadingFontClass()}`}>
                  {t('ukiyoe.langToggleTitle')}
                </h3>
                <div className={`mb-6 text-ink-secondary ${bodyTextClass} space-y-4`}>
                  <p>{t('ukiyoe.langToggleText1')}</p>
                </div>
                {/* before / after: the same two states, captured from the live site (old design at /a/timeline) */}
                <figure className="mb-8 md:mb-10">
                  <div className="grid grid-cols-2 gap-4 md:gap-8 rounded-lg bg-surface-muted p-4 md:p-8 md:w-[75%] md:mx-auto">
                    {([
                      ['before', 'old', 'ukiyoe.langToggleBefore'],
                      ['now', 'new', 'ukiyoe.langToggleNow'],
                    ] as const).map(([key, file, label]) => (
                      <div key={key} className="flex flex-col gap-3 md:gap-4">
                        <span className="text-caption-lg font-space-grotesk font-semibold text-ink-tertiary">
                          {t(label)}
                        </span>
                        {(['ja', 'en'] as const).map((l) => (
                          <div key={l} className="flex flex-col gap-1.5">
                            <Image
                              src={`/work/ukiyoe/lang-${file}-toggle-${l}.webp`}
                              alt={`${t(label)} — ${t(l === 'ja' ? 'ukiyoe.langToggleStateJa' : 'ukiyoe.langToggleStateEn')}`}
                              width={720}
                              height={384}
                              className="w-full h-auto rounded-md"
                            />
                            <span className="text-body-sm text-ink-tertiary">
                              {t(l === 'ja' ? 'ukiyoe.langToggleStateJa' : 'ukiyoe.langToggleStateEn')}
                            </span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                  <figcaption className="mt-3 md:w-[75%] md:mx-auto text-body-sm md:text-body-base text-ink-tertiary font-space-grotesk">
                    {t('ukiyoe.captionLangToggleBefore')}
                  </figcaption>
                </figure>
                <div className={`mb-6 text-ink-secondary ${bodyTextClass} space-y-4`}>
                  <p>{t('ukiyoe.langToggleText2')}</p>
                  <p>{t('ukiyoe.langToggleText3')}</p>
                  <p>{t('ukiyoe.langToggleText4')}</p>
                </div>
                <figure>
                  <Image
                    src="/work/ukiyoe/language-toggle-japonisme.webp"
                    alt={t('ukiyoe.captionLangToggle')}
                    width={1766}
                    height={1204}
                    className="w-full h-auto rounded-lg"
                  />
                  <figcaption className="mt-3 text-body-sm md:text-body-base text-ink-tertiary font-space-grotesk">
                    {t('ukiyoe.captionLangToggle')}
                  </figcaption>
                </figure>
              </div>
            </section>

            {/* 5. AI Can Create, But It Can't Craft */}
            <section id="ai-craft" className="py-12 md:py-20 scroll-mt-32">
              <h2 className={`text-title-lg mb-6 ${getHeadingFontClass()}`}>
                {t('ukiyoe.aiCraftTitle')}
              </h2>
              <div className={`text-ink-secondary ${bodyTextClass} space-y-4`}>
                <p>{t('ukiyoe.aiCraftText1')}</p>
                <p>{t('ukiyoe.aiCraftText2')}</p>
                <p>{t('ukiyoe.aiCraftText3')}</p>
              </div>
            </section>

            {/* 6. Technical Highlights */}
            <section id="technical" className="py-12 md:py-20 scroll-mt-32">
              <h2 className={`text-title-lg mb-6 ${getHeadingFontClass()}`}>
                {t('ukiyoe.sectionTechnical')}
              </h2>
              <p className={`mb-10 md:mb-14 text-ink-secondary ${bodyTextClass}`}>
                {t('ukiyoe.technicalIntro')}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                <div className="p-5 md:p-6 rounded-xl bg-surface-raised border border-line-section flex flex-col">
                  <h4 className={`text-title text-ink mb-4 ${getHeadingFontClass()}`}>
                    {t('ukiyoe.techFeature1Title')}
                  </h4>
                  <p className={`text-ink-secondary ${getBodyFontClass()} text-body-base tracking-[0.2px]`}>
                    {t('ukiyoe.techFeature1Text')}
                  </p>
                </div>
                <div className="p-5 md:p-6 rounded-xl bg-surface-raised border border-line-section flex flex-col">
                  <h4 className={`text-title text-ink mb-4 ${getHeadingFontClass()}`}>
                    {t('ukiyoe.techFeature2Title')}
                  </h4>
                  <p className={`text-ink-secondary ${getBodyFontClass()} text-body-base tracking-[0.2px]`}>
                    {t('ukiyoe.techFeature2Text')}
                  </p>
                </div>
                <div className="p-5 md:p-6 rounded-xl bg-surface-raised border border-line-section flex flex-col">
                  <h4 className={`text-title text-ink mb-4 ${getHeadingFontClass()}`}>
                    {t('ukiyoe.techFeature3Title')}
                  </h4>
                  <p className={`text-ink-secondary ${getBodyFontClass()} text-body-base tracking-[0.2px]`}>
                    {t('ukiyoe.techFeature3Text')}
                  </p>
                </div>
                <div className="p-5 md:p-6 rounded-xl bg-surface-raised border border-line-section flex flex-col">
                  <h4 className={`text-title text-ink mb-4 ${getHeadingFontClass()}`}>
                    {t('ukiyoe.techFeature4Title')}
                  </h4>
                  <p className={`text-ink-secondary ${getBodyFontClass()} text-body-base tracking-[0.2px]`}>
                    {t('ukiyoe.techFeature4Text')}
                  </p>
                </div>
              </div>
            </section>

            {/* 7. Reflection */}
            <section id="reflection" className="py-12 md:py-20 scroll-mt-32">
              <h2 className={`text-title-lg mb-6 ${getHeadingFontClass()}`}>
                {t('work.reflection')}
              </h2>
              <div>
                <h3 id="learnings" className={`scroll-mt-32 text-title mb-4 ${getHeadingFontClass()}`}>
                  {t('ukiyoe.learningsTitle')}
                </h3>
                <div className={`text-ink-secondary ${bodyTextClass} space-y-4`}>
                  <p>{t('ukiyoe.learningsText1')}</p>
                  <p>{t('ukiyoe.learningsText2')}</p>
                  {/* learningsText3 restated aiCraftText3 ("AI can't craft") almost word for word; not rendered. */}
                </div>
              </div>
            </section>
      </WorkShell>
    </div>
  );
};

export default UkiyoePage;
