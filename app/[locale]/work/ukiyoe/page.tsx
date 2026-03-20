'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import BackToTopButton from '@/src/compositions/BackToTopButton';
import { useTranslations, useLocale } from 'next-intl';
import { useJPFontSize, useBodyFont, useHeadingFont } from '@/src/hooks/useFonts';
import { MoveUpRight, Layers, Images, Palette, BarChart2 } from 'lucide-react';
import ColorSystemViz from '@/components/work/ukiyoe/ColorSystemViz';
import ColorAnalysisGrid from '@/components/work/ukiyoe/ColorAnalysisGrid';
import KushiDangoShowcase from '@/components/work/ukiyoe/KushiDangoShowcase';
import PrintingProcessStudy from '@/components/work/ukiyoe/PrintingProcessStudy';
import TopPageProcessShowcase from '@/components/work/ukiyoe/TopPageProcessShowcase';

const SECTIONS = [
  'overview',
  'research',
  'design-process',
  'hand-coloring',
  'ai-craft',
  'technical',
  'reflection',
] as const;

const UkiyoePage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const t = useTranslations();
  const language = useLocale();
  const { jpFontSize } = useJPFontSize();
  const { getBodyFontClass } = useBodyFont();
  const { getHeadingFontClass } = useHeadingFont();

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
      ? 'text-left text-heading-base font-switzer transition-transform duration-900 scale-110'
      : 'text-left text-heading-sm font-switzer transition-transform duration-900 scale-100 opacity-50';

  const bodyTextClass = `${getBodyFontClass()} tracking-[0.2px] ${jpFontSize('text-body-base', 'text-body-lg')}`;

  return (
    <div className="font-sans my-24 md:mt-28 md:mb-16">
      <BackToTopButton />

      {/* Hero */}
      <section className="mb-0 md:mb-12 -mx-6 md:mx-0">
        <div className="w-full md:max-w-7xl md:mx-auto px-0">
          <div className="w-full aspect-[8/5] bg-[#F8F5F0] rounded-none md:rounded-xl overflow-hidden relative">
            {/* High-res 2560×1600 — same files as home thumbnails; legacy hero-*.png were 1024px */}
            <Image
              src={
                language === 'jp' ? '/work/ukiyoe/thumbnail-jp.png' : '/work/ukiyoe/thumbnail-en.png'
              }
              alt="Ukiyoe - Interactive Cultural Exhibition"
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
                  className={`text-heading-2xl md:text-heading-3xl text-ink mb-3 md:mb-2 ${getHeadingFontClass()}`}
                >
                  {t('ukiyoe.title')}
                </h1>
                <p
                  className={`text-body-lg md:text-body-xl ${getBodyFontClass()} text-ink-secondary tracking-[0.2px]`}
                >
                  {t('ukiyoe.subtitle')}
                </p>
              </div>
              <div className="flex-shrink-0 w-full md:w-auto">
                <a
                  href="https://ukiyoe-timeline.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex items-center justify-center px-6 py-3 rounded-[100px] text-ink-muted hover:text-white cursor-pointer transition-[color] duration-300 whitespace-nowrap overflow-hidden group w-full md:w-auto"
                  style={{
                    background:
                      'radial-gradient(75% 150% at 100% 114.2%, rgba(210, 210, 215, 0.4) 0%, rgba(180, 180, 185, 0.4) 100%)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <span
                    className="absolute inset-0 rounded-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(75% 150% at 100% 114.2%, rgba(210, 210, 215, 0.8) 0%, rgba(180, 180, 185, 0.8) 100%)',
                      backdropFilter: 'blur(8px)',
                    }}
                  />
                  <span className="relative z-10 text-body-lg md:text-body-xl font-medium">
                    {t('common.goToSite')}
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <span className="text-caption-lg font-space-grotesk font-semibold text-ink-tertiary mb-2 block">
                Timeline
              </span>
              <p className="text-body-base md:text-body-lg tracking-[0.2px]">
                {t('projects.ukiyoe.timeline')}
              </p>
            </div>
            <div>
              <span className="text-caption-lg font-space-grotesk font-semibold text-ink-tertiary mb-2 block">
                My Skills
              </span>
              <p className="text-body-base md:text-body-lg tracking-[0.2px]">
                {t('projects.ukiyoe.skills')}
              </p>
            </div>
            <div>
              <span className="text-caption-lg font-space-grotesk font-semibold text-ink-tertiary mb-2 block">
                Type
              </span>
              <p className="text-body-base md:text-body-lg tracking-[0.2px]">
                {t('common.personalProject')}
              </p>
            </div>
            <div>
              <span className="text-caption-lg font-space-grotesk font-semibold text-ink-tertiary mb-2 block">
                Deliverables
              </span>
              <p className="text-body-base md:text-body-lg tracking-[0.2px]">
                {t('projects.ukiyoe.deliverables')}
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

            {/* 1. Overview */}
            <section id="overview" className="w-full mx-auto py-12 md:py-16 text-ink-secondary scroll-mt-32">
              <h2 className={`text-heading-xl md:text-heading-2xl mb-6 ${getHeadingFontClass()}`}>
                Overview
              </h2>
              <p className={`mb-4 ${bodyTextClass}`}>{t('ukiyoe.overviewText1')}</p>
              <p className={`mb-6 ${bodyTextClass}`}>{t('ukiyoe.overviewText2')}</p>

              <div className="mt-8">
                <a
                  href="https://github.com/iori73/ukiyoe"
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
                    <span className="text-body-sm md:text-body-lg leading-[1.25] font-normal text-ink-tertiary">
                      iori73
                    </span>
                    <span className="text-body-sm md:text-body-lg leading-[1.25] font-normal text-ink-tertiary">
                      /
                    </span>
                    <span className="text-body-sm md:text-body-lg leading-[1.25] font-semibold text-ink">
                      ukiyoe
                    </span>
                  </div>
                  <MoveUpRight className="w-4 h-4 md:w-5 md:h-5 text-ink-tertiary flex-shrink-0" />
                </a>
              </div>
            </section>

            {/* 2. Research & Discovery */}
            <section id="research" className="py-12 md:py-20 scroll-mt-32">
              <h2 className={`text-heading-xl md:text-heading-2xl mb-6 ${getHeadingFontClass()}`}>
                Research &amp; Discovery
              </h2>
              <p className={`mb-10 md:mb-14 text-ink-secondary ${bodyTextClass}`}>
                {t('ukiyoe.researchIntro')}
              </p>

              {/* Cultural Immersion */}
              <div className="mb-10 md:mb-14">
                <h3 className={`text-heading-base md:text-heading-xl mb-4 ${getHeadingFontClass()}`}>
                  {t('ukiyoe.culturalResearchTitle')}
                </h3>
                <p className={`mb-6 text-ink-secondary ${bodyTextClass}`}>
                  {t('ukiyoe.culturalResearchText')}
                </p>
                <figure>
                  <Image
                    src="/work/ukiyoe/research-sites.png"
                    alt="Cultural research across 25+ reference sites"
                    width={1200}
                    height={675}
                    className="w-full h-auto rounded-lg"
                  />
                  <figcaption className="mt-3 text-body-sm md:text-body-base text-ink-tertiary font-space-grotesk">
                    {t('ukiyoe.captionResearch')}
                  </figcaption>
                </figure>
              </div>

              {/* Color Extraction & Analysis */}
              <div className="mb-10 md:mb-14">
                <h3 className={`text-heading-base md:text-heading-xl mb-4 ${getHeadingFontClass()}`}>
                  {t('ukiyoe.colorAnalysisTitle')}
                </h3>
                <p className={`mb-6 text-ink-secondary ${bodyTextClass}`}>
                  {t('ukiyoe.colorAnalysisText')}
                </p>
                <figure>
                  <div className="rounded-lg overflow-hidden">
                    <ColorAnalysisGrid locale={language} />
                  </div>
                  <figcaption className="mt-3 text-body-sm md:text-body-base text-ink-tertiary font-space-grotesk">
                    {t('ukiyoe.captionColorAnalysis')}
                  </figcaption>
                </figure>
              </div>

              {/* Printing Process Study */}
              <div>
                <h3 className={`text-heading-base md:text-heading-xl mb-4 ${getHeadingFontClass()}`}>
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

            {/* 3. Design Process */}
            <section id="design-process" className="py-12 md:py-20 scroll-mt-32">
              <h2 className={`text-heading-xl md:text-heading-2xl mb-6 ${getHeadingFontClass()}`}>
                Design Process
              </h2>
              <p className={`mb-10 md:mb-14 text-ink-secondary ${bodyTextClass}`}>
                {t('ukiyoe.designProcessIntro')}
              </p>

              {/* Top Page: Layer Animation */}
              <div className="mb-12 md:mb-20">
                <h3 className={`text-heading-base md:text-heading-xl mb-4 ${getHeadingFontClass()}`}>
                  {t('ukiyoe.topPageDesignTitle')}
                </h3>
                <div className={`mb-6 text-ink-secondary ${bodyTextClass} space-y-4`}>
                  <p>{t('ukiyoe.topPageDesignText1')}</p>
                  <p>{t('ukiyoe.topPageDesignText2')}</p>
                  <p>{t('ukiyoe.topPageDesignText3')}</p>
                </div>
                <figure>
                  <TopPageProcessShowcase />
                  <figcaption className="mt-3 text-body-sm md:text-body-base text-ink-tertiary font-space-grotesk">
                    {t('ukiyoe.captionTopPage')}
                  </figcaption>
                </figure>
              </div>

              {/* Timeline: Artwork Gallery */}
              <div className="mb-12 md:mb-20">
                <h3 className={`text-heading-base md:text-heading-xl mb-4 ${getHeadingFontClass()}`}>
                  {t('ukiyoe.timelineDesignTitle')}
                </h3>
                <div className={`mb-6 text-ink-secondary ${bodyTextClass} space-y-4`}>
                  <p>{t('ukiyoe.timelineDesignText1')}</p>
                  <p>{t('ukiyoe.timelineDesignText2')}</p>
                </div>
                <figure>
                  <Image
                    src="/work/ukiyoe/process-timeline.png"
                    alt="Timeline page — architecture shift to vertical scroll"
                    width={1200}
                    height={675}
                    className="w-full h-auto"
                  />
                  <figcaption className="mt-3 text-body-sm md:text-body-base text-ink-tertiary font-space-grotesk">
                    {t('ukiyoe.captionTimeline')}
                  </figcaption>
                </figure>
              </div>

              {/* Design Motifs: Kushi-Dango */}
              <div className="mb-12 md:mb-20">
                <h3 className={`text-heading-base md:text-heading-xl mb-4 ${getHeadingFontClass()}`}>
                  {t('ukiyoe.motifsTitle')}
                </h3>
                <div className={`mb-6 text-ink-secondary ${bodyTextClass} space-y-4`}>
                  {t('ukiyoe.motifsIntro').split('\n').filter(Boolean).map((paragraph: string, i: number) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
                <figure>
                  <KushiDangoShowcase locale={language} />
                  <figcaption className="mt-3 text-body-sm md:text-body-base text-ink-tertiary font-space-grotesk">
                    {t('ukiyoe.captionMotifs')}
                  </figcaption>
                </figure>
              </div>

              {/* Color System & Period Ratios */}
              <div className="mb-12 md:mb-20">
                <h3 className={`text-heading-base md:text-heading-xl mb-4 ${getHeadingFontClass()}`}>
                  {t('ukiyoe.colorSystemTitle')}
                </h3>
                <div className={`mb-6 text-ink-secondary ${bodyTextClass} space-y-4`}>
                  <p>{t('ukiyoe.colorSystemIntro')}</p>
                  <p>{t('ukiyoe.colorSystemMethod')}</p>
                  <p>{t('ukiyoe.colorSystemViz')}</p>
                </div>
                <figure>
                  <ColorSystemViz locale={language} />
                  <figcaption className="mt-3 text-body-sm md:text-body-base text-ink-tertiary font-space-grotesk">
                    {t('ukiyoe.captionColorSystem')}
                  </figcaption>
                </figure>
              </div>

              {/* Logo Design */}
              <div>
                <h3 className={`text-heading-base md:text-heading-xl mb-4 ${getHeadingFontClass()}`}>
                  {t('ukiyoe.logoDesignTitle')}
                </h3>
                <p className={`mb-6 text-ink-secondary ${bodyTextClass}`}>
                  {t('ukiyoe.logoDesignText1')}
                </p>
                <p className={`mb-6 text-ink-secondary ${bodyTextClass}`}>
                  {t('ukiyoe.logoDesignText2')}
                </p>
                <figure>
                  <Image
                    src="/work/ukiyoe/process-logo.png"
                    alt="Logo design — from hanko to modern typography"
                    width={1200}
                    height={675}
                    className="w-full h-auto rounded-lg"
                  />
                  <figcaption className="mt-3 text-body-sm md:text-body-base text-ink-tertiary font-space-grotesk">
                    {t('ukiyoe.captionLogo')}
                  </figcaption>
                </figure>
              </div>
            </section>

            {/* 4. Hand-Coloring the Layers */}
            <section id="hand-coloring" className="py-12 md:py-20 scroll-mt-32">
              <h2 className={`text-heading-xl md:text-heading-2xl mb-6 ${getHeadingFontClass()}`}>
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
                  className="w-full md:w-[40%] md:mx-auto h-auto rounded-lg bg-black"
                />
                <figcaption className="mt-3 text-body-sm md:text-body-base text-ink-tertiary font-space-grotesk">
                  {t('ukiyoe.captionHandColoring')}
                </figcaption>
              </figure>
            </section>

            {/* 5. AI Can Create, But It Can't Craft */}
            <section id="ai-craft" className="py-12 md:py-20 scroll-mt-32">
              <h2 className={`text-heading-xl md:text-heading-2xl mb-6 ${getHeadingFontClass()}`}>
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
              <h2 className={`text-heading-xl md:text-heading-2xl mb-6 ${getHeadingFontClass()}`}>
                Technical Highlights
              </h2>
              <p className={`mb-10 md:mb-14 text-ink-secondary ${bodyTextClass}`}>
                {t('ukiyoe.technicalIntro')}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="p-5 md:p-6 rounded-xl bg-surface-muted flex flex-col">
                  <Layers className="size-8 md:size-9 shrink-0 text-ink mb-3" aria-hidden strokeWidth={1.75} />
                  <h4 className="text-heading-base md:text-heading-lg font-semibold text-ink mb-3">
                    {t('ukiyoe.techFeature1Title')}
                  </h4>
                  <p className={`text-ink-secondary ${getBodyFontClass()} text-body-sm md:text-body-base tracking-[0.2px]`}>
                    {t('ukiyoe.techFeature1Text')}
                  </p>
                </div>
                <div className="p-5 md:p-6 rounded-xl bg-surface-muted flex flex-col">
                  <Images className="size-8 md:size-9 shrink-0 text-ink mb-3" aria-hidden strokeWidth={1.75} />
                  <h4 className="text-heading-base md:text-heading-lg font-semibold text-ink mb-3">
                    {t('ukiyoe.techFeature2Title')}
                  </h4>
                  <p className={`text-ink-secondary ${getBodyFontClass()} text-body-sm md:text-body-base tracking-[0.2px]`}>
                    {t('ukiyoe.techFeature2Text')}
                  </p>
                </div>
                <div className="p-5 md:p-6 rounded-xl bg-surface-muted flex flex-col">
                  <Palette className="size-8 md:size-9 shrink-0 text-ink mb-3" aria-hidden strokeWidth={1.75} />
                  <h4 className="text-heading-base md:text-heading-lg font-semibold text-ink mb-3">
                    {t('ukiyoe.techFeature3Title')}
                  </h4>
                  <p className={`text-ink-secondary ${getBodyFontClass()} text-body-sm md:text-body-base tracking-[0.2px]`}>
                    {t('ukiyoe.techFeature3Text')}
                  </p>
                </div>
                <div className="p-5 md:p-6 rounded-xl bg-surface-muted flex flex-col">
                  <BarChart2 className="size-8 md:size-9 shrink-0 text-ink mb-3" aria-hidden strokeWidth={1.75} />
                  <h4 className="text-heading-base md:text-heading-lg font-semibold text-ink mb-3">
                    {t('ukiyoe.techFeature4Title')}
                  </h4>
                  <p className={`text-ink-secondary ${getBodyFontClass()} text-body-sm md:text-body-base tracking-[0.2px]`}>
                    {t('ukiyoe.techFeature4Text')}
                  </p>
                </div>
              </div>
            </section>

            {/* 7. Reflection */}
            <section id="reflection" className="py-12 md:py-20 scroll-mt-32">
              <h2 className={`text-heading-xl md:text-heading-2xl mb-6 ${getHeadingFontClass()}`}>
                Reflection
              </h2>
              <div className="mb-10 md:mb-14">
                <h3 className={`text-heading-base md:text-heading-xl mb-4 ${getHeadingFontClass()}`}>
                  {t('ukiyoe.learningsTitle')}
                </h3>
                <div className={`text-ink-secondary ${bodyTextClass} space-y-4`}>
                  <p>{t('ukiyoe.learningsText1')}</p>
                  <p>{t('ukiyoe.learningsText2')}</p>
                  <p>{t('ukiyoe.learningsText3')}</p>
                </div>
              </div>
              <div>
                <h3 className={`text-heading-base md:text-heading-xl mb-4 ${getHeadingFontClass()}`}>
                  {t('ukiyoe.futureTitle')}
                </h3>
                <p className={`text-ink-secondary ${bodyTextClass}`}>
                  {t('ukiyoe.futureText')}
                </p>
              </div>
            </section>
          </div>

          {/* Sidebar — 7 items */}
          <div className="hidden md:flex md:w-[20%] pl-4 pt-12 items-start justify-center">
            <nav className="sticky top-24">
              <ul className="space-y-3">
                <li>
                  <button onClick={() => scrollToSection('overview')} className={sidebarButtonClass('overview')}>
                    Overview
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('research')} className={sidebarButtonClass('research')}>
                    Research
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('design-process')}
                    className={sidebarButtonClass('design-process')}
                  >
                    Design Process
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('hand-coloring')}
                    className={sidebarButtonClass('hand-coloring')}
                  >
                    Hand-Coloring
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('ai-craft')}
                    className={sidebarButtonClass('ai-craft')}
                  >
                    AI &amp; Craft
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('technical')} className={sidebarButtonClass('technical')}>
                    Technical
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('reflection')}
                    className={sidebarButtonClass('reflection')}
                  >
                    Reflection
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

export default UkiyoePage;
