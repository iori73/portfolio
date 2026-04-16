'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import BackToTopButton from '@/src/compositions/BackToTopButton';
import { useTranslations, useLocale } from 'next-intl';
import { useBodyFont, useHeadingFont } from '@/src/hooks/useFonts';
import { usePageTransition } from '@/src/contexts/TransitionContext';

const SECTIONS = [
  'overview',
  'design-process',
  'solution',
  'reflection',
] as const;

const AirlineDesignSystemPage: React.FC = () => {
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

  return (
    <div className="font-sans my-24 md:mt-28 md:mb-16">
      <BackToTopButton />

      {/* Hero */}
      <section className="mb-0 md:mb-12 full-bleed">
        <div className="w-full">
          <div className="w-full aspect-[8/5] bg-[#0a1628] overflow-hidden relative">
            <Image
              key={language}
              src="/work/airline-design-system/system-structure.png"
              alt="Airline Design System Architecture"
              fill
              sizes="(min-width: 768px) 1280px, 100vw"
              className="object-contain"
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
                  {t('airlineDesignSystem.title')}
                </h1>
                <p
                  className={`text-body-lg ${getBodyFontClass()} text-ink-secondary tracking-[0.2px]`}
                >
                  {t('airlineDesignSystem.subtitle')}
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
                {t('projects.airlineDesignSystem.timeline')}
              </p>
            </div>
            <div>
              <span className="text-caption-lg font-space-grotesk font-semibold text-ink-tertiary mb-2 block">
                {t('common.mySkills')}
              </span>
              <p className="text-body-lg tracking-[0.2px]">
                {t('projects.airlineDesignSystem.skills')}
              </p>
            </div>
            <div>
              <span className="text-caption-lg font-space-grotesk font-semibold text-ink-tertiary mb-2 block">
                {t('common.type')}
              </span>
              <p className="text-body-lg tracking-[0.2px]">
                {t('airlineDesignSystem.type')}
              </p>
            </div>
            <div>
              <span className="text-caption-lg font-space-grotesk font-semibold text-ink-tertiary mb-2 block">
                {t('common.deliverables')}
              </span>
              <p className="text-body-lg tracking-[0.2px]">
                {t('projects.airlineDesignSystem.deliverables')}
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
                {t('airlineDesignSystem.overviewText1')}
              </p>
              <p className={`mb-8 ${bodyTextClass}`}>
                {t('airlineDesignSystem.overviewText2')}
              </p>

              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>
                  {t('airlineDesignSystem.challengeTitle')}
                </h3>
                <ul className={`list-disc list-inside space-y-2 ${bodyTextClass}`}>
                  <li>{t('airlineDesignSystem.challenge1')}</li>
                  <li>{t('airlineDesignSystem.challenge2')}</li>
                  <li>{t('airlineDesignSystem.challenge3')}</li>
                </ul>
              </div>

              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>
                  {t('airlineDesignSystem.roleTitle')}
                </h3>
                <p className={`${bodyTextClass}`}>
                  {t('airlineDesignSystem.roleText')}
                </p>
              </div>

              <figure>
                <Image
                  src="/work/airline-design-system/roadmap.png"
                  alt="Project roadmap showing 4 phases from December 2024 to March 2026"
                  width={1200}
                  height={675}
                  className="w-full h-auto rounded-lg"
                />
                <figcaption className="mt-3 text-body-sm md:text-body-base text-ink-tertiary font-space-grotesk">
                  {t('airlineDesignSystem.captionRoadmap')}
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
                {t('airlineDesignSystem.designProcessIntro')}
              </p>

              {/* Competitive Research */}
              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>
                  {t('airlineDesignSystem.competitiveTitle')}
                </h3>
                <p className={`mb-6 text-ink-secondary ${bodyTextClass}`}>
                  {t('airlineDesignSystem.competitiveText')}
                </p>
                <figure>
                  <div className="grid grid-cols-2 gap-4">
                    <Image
                      src="/work/airline-design-system/competitive-1.png"
                      alt="Competitive analysis - Airline 1"
                      width={600}
                      height={400}
                      className="w-full h-auto rounded-lg"
                    />
                    <Image
                      src="/work/airline-design-system/competitive-2.png"
                      alt="Competitive analysis - Airline 2"
                      width={600}
                      height={400}
                      className="w-full h-auto rounded-lg"
                    />
                    <Image
                      src="/work/airline-design-system/competitive-3.png"
                      alt="Competitive analysis - Airline 3"
                      width={600}
                      height={400}
                      className="w-full h-auto rounded-lg"
                    />
                    <Image
                      src="/work/airline-design-system/competitive-4.png"
                      alt="Competitive analysis - Airline 4"
                      width={600}
                      height={400}
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                  <figcaption className="mt-3 text-body-sm md:text-body-base text-ink-tertiary font-space-grotesk">
                    {t('airlineDesignSystem.captionCompetitive')}
                  </figcaption>
                </figure>
              </div>

              {/* Component Audit */}
              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>
                  {t('airlineDesignSystem.auditTitle')}
                </h3>
                <p className={`mb-6 text-ink-secondary ${bodyTextClass}`}>
                  {t('airlineDesignSystem.auditText')}
                </p>
              </div>

              {/* Token Architecture */}
              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>
                  {t('airlineDesignSystem.tokenTitle')}
                </h3>
                <p className={`mb-6 text-ink-secondary ${bodyTextClass}`}>
                  {t('airlineDesignSystem.tokenText')}
                </p>
                <figure>
                  <Image
                    src="/work/airline-design-system/token-architecture.png"
                    alt="Two-layer token architecture: Primitive and Semantic layers"
                    width={1200}
                    height={675}
                    className="w-full h-auto rounded-lg"
                  />
                  <figcaption className="mt-3 text-body-sm md:text-body-base text-ink-tertiary font-space-grotesk">
                    {t('airlineDesignSystem.captionToken')}
                  </figcaption>
                </figure>
              </div>

              {/* Color & Typography */}
              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>
                  {t('airlineDesignSystem.colorTypoTitle')}
                </h3>
                <p className={`text-ink-secondary ${bodyTextClass}`}>
                  {t('airlineDesignSystem.colorTypoText')}
                </p>
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
                {t('airlineDesignSystem.solutionIntro')}
              </p>

              {/* Token System */}
              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>
                  {t('airlineDesignSystem.tokenSystemTitle')}
                </h3>
                <p className={`mb-4 text-ink-secondary ${bodyTextClass}`}>
                  {t('airlineDesignSystem.tokenSystemText')}
                </p>
                <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-6`}>
                  <div className="p-6 rounded-lg bg-surface-muted">
                    <p className="text-title-sm font-space-grotesk font-semibold text-ink mb-2">399</p>
                    <p className="text-body-sm text-ink-tertiary">{t('airlineDesignSystem.stat1')}</p>
                  </div>
                  <div className="p-6 rounded-lg bg-surface-muted">
                    <p className="text-title-sm font-space-grotesk font-semibold text-ink mb-2">6</p>
                    <p className="text-body-sm text-ink-tertiary">{t('airlineDesignSystem.stat2')}</p>
                  </div>
                  <div className="p-6 rounded-lg bg-surface-muted">
                    <p className="text-title-sm font-space-grotesk font-semibold text-ink mb-2">3 + 3</p>
                    <p className="text-body-sm text-ink-tertiary">{t('airlineDesignSystem.stat3')}</p>
                  </div>
                </div>
              </div>

              {/* Figma Plugins */}
              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>
                  {t('airlineDesignSystem.pluginsTitle')}
                </h3>
                <p className={`mb-6 text-ink-secondary ${bodyTextClass}`}>
                  {t('airlineDesignSystem.pluginsText')}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { category: 'Foundation', items: 'Color Setup, Typography Setup' },
                    { category: 'Library', items: 'Component Showcase, Organizer, TOC Linker' },
                    { category: 'Migration', items: 'Variable Migrator, Design Lint Fixer, Field Replacer' },
                    { category: 'Production', items: 'Design Study Generator, Screenshot Importer, PC→SP Converter' },
                  ].map((group) => (
                    <div key={group.category} className="p-5 rounded-lg border border-line-subtle">
                      <p className="text-body font-space-grotesk font-semibold text-ink mb-1">
                        {group.category}
                      </p>
                      <p className="text-body-sm text-ink-tertiary">{group.items}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Component Prototype */}
              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>
                  {t('airlineDesignSystem.prototypeTitle')}
                </h3>
                <p className={`text-ink-secondary ${bodyTextClass}`}>
                  {t('airlineDesignSystem.prototypeText')}
                </p>
              </div>

              {/* Documentation */}
              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>
                  {t('airlineDesignSystem.docsTitle')}
                </h3>
                <p className={`text-ink-secondary ${bodyTextClass}`}>
                  {t('airlineDesignSystem.docsText')}
                </p>
              </div>
            </section>

            {/* IMPACT & REFLECTION */}
            <section
              id="reflection"
              className="py-12 md:py-20 scroll-mt-32"
            >
              <h2 className={`text-title-lg mb-6 ${getHeadingFontClass()}`}>
                {t('work.impactReflection')}
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className={`text-title mb-3 ${getHeadingFontClass()}`}>
                    {t('airlineDesignSystem.impactTitle')}
                  </h3>
                  <p className={`text-ink-secondary ${bodyTextClass}`}>
                    {t('airlineDesignSystem.impactText')}
                  </p>
                </div>
                <div>
                  <h3 className={`text-title mb-3 ${getHeadingFontClass()}`}>
                    {t('airlineDesignSystem.learningTitle')}
                  </h3>
                  <p className={`text-ink-secondary ${bodyTextClass}`}>
                    {t('airlineDesignSystem.learningText')}
                  </p>
                </div>
                <div>
                  <h3 className={`text-title mb-3 ${getHeadingFontClass()}`}>
                    {t('airlineDesignSystem.technicalTitle')}
                  </h3>
                  <p className={`text-ink-secondary ${bodyTextClass}`}>
                    {t('airlineDesignSystem.technicalText')}
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
                    {t('work.navImpactReflection')}
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

export default AirlineDesignSystemPage;
