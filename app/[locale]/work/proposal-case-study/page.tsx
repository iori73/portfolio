'use client';
import React, { useState, useEffect } from 'react';
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

const PublicTransportRfpPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const t = useTranslations();
  useLocale();
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

      {/* Project Info (no hero image: proposal-phase project, no client assets to show) */}
      <section className="pt-16 pb-12 md:pt-20 md:pb-16">
        <div className="max-w-[1028px] w-full mx-auto">
          <div className="mb-10 md:mb-12">
            <div className="flex flex-col items-start gap-4">
              <div className="flex-1">
                <h1 className={`text-headline text-ink mb-3 md:mb-2 ${getHeadingFontClass()}`}>
                  {t('proposalCaseStudy.title')}
                </h1>
                <p className={`text-body-lg ${getBodyFontClass()} text-ink-secondary tracking-[0.2px]`}>
                  {t('proposalCaseStudy.subtitle')}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <span className="text-caption-lg font-space-grotesk font-semibold text-ink-tertiary mb-2 block">
                {t('common.timeline')}
              </span>
              <p className="text-body-lg tracking-[0.2px]">{t('projects.proposalCaseStudy.timeline')}</p>
            </div>
            <div>
              <span className="text-caption-lg font-space-grotesk font-semibold text-ink-tertiary mb-2 block">
                {t('common.mySkills')}
              </span>
              <p className="text-body-lg tracking-[0.2px]">{t('projects.proposalCaseStudy.skills')}</p>
            </div>
            <div>
              <span className="text-caption-lg font-space-grotesk font-semibold text-ink-tertiary mb-2 block">
                {t('common.type')}
              </span>
              <p className="text-body-lg tracking-[0.2px]">{t('proposalCaseStudy.type')}</p>
            </div>
            <div>
              <span className="text-caption-lg font-space-grotesk font-semibold text-ink-tertiary mb-2 block">
                {t('common.deliverables')}
              </span>
              <p className="text-body-lg tracking-[0.2px]">{t('projects.proposalCaseStudy.deliverables')}</p>
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
            <section id="overview" className="w-full mx-auto py-12 md:py-16 text-ink-secondary scroll-mt-32">
              <h2 className={`text-title-lg mb-6 ${getHeadingFontClass()}`}>{t('work.overview')}</h2>
              <p className={`mb-4 ${bodyTextClass}`}>{t('proposalCaseStudy.overviewText1')}</p>
              <p className={`mb-8 ${bodyTextClass}`}>{t('proposalCaseStudy.overviewText2')}</p>

              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>{t('proposalCaseStudy.challengeTitle')}</h3>
                <ul className={`list-disc list-inside space-y-2 ${bodyTextClass}`}>
                  <li>{t('proposalCaseStudy.challenge1')}</li>
                  <li>{t('proposalCaseStudy.challenge2')}</li>
                  <li>{t('proposalCaseStudy.challenge3')}</li>
                </ul>
              </div>

              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>{t('proposalCaseStudy.roleTitle')}</h3>
                <p className={bodyTextClass}>{t('proposalCaseStudy.roleText')}</p>
              </div>
            </section>

            {/* DESIGN PROCESS */}
            <section id="design-process" className="py-12 md:py-20 scroll-mt-32">
              <h2 className={`text-title-lg mb-6 ${getHeadingFontClass()}`}>{t('work.designProcess')}</h2>
              <p className={`mb-10 md:mb-14 text-ink-secondary ${bodyTextClass}`}>
                {t('proposalCaseStudy.designProcessIntro')}
              </p>

              {/* IA Reconstruction */}
              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>{t('proposalCaseStudy.iaTitle')}</h3>
                <p className={`mb-4 text-ink-secondary ${bodyTextClass}`}>{t('proposalCaseStudy.iaText')}</p>
                <p className={`text-ink-secondary ${bodyTextClass}`}>{t('proposalCaseStudy.iaOutcome')}</p>
              </div>

              {/* Audit Scoping */}
              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>{t('proposalCaseStudy.auditTitle')}</h3>
                <p className={`text-ink-secondary ${bodyTextClass}`}>{t('proposalCaseStudy.auditText')}</p>
              </div>

              {/* Confidence Labels & Self-Correction */}
              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>{t('proposalCaseStudy.confidenceTitle')}</h3>
                <p className={`text-ink-secondary ${bodyTextClass}`}>{t('proposalCaseStudy.confidenceText')}</p>
              </div>

              {/* Accessibility & Design System */}
              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>{t('proposalCaseStudy.designSystemTitle')}</h3>
                <p className={`text-ink-secondary ${bodyTextClass}`}>{t('proposalCaseStudy.designSystemText')}</p>
              </div>
            </section>

            {/* SOLUTION */}
            <section id="solution" className="py-12 md:py-20 scroll-mt-32">
              <h2 className={`text-title-lg mb-6 ${getHeadingFontClass()}`}>{t('work.solution')}</h2>
              <p className={`mb-10 md:mb-14 text-ink-secondary ${bodyTextClass}`}>
                {t('proposalCaseStudy.solutionIntro')}
              </p>

              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>{t('proposalCaseStudy.deliverablesTitle')}</h3>
                <ul className={`list-disc list-inside space-y-2 ${bodyTextClass}`}>
                  <li>{t('proposalCaseStudy.deliverable1')}</li>
                  <li>{t('proposalCaseStudy.deliverable2')}</li>
                  <li>{t('proposalCaseStudy.deliverable3')}</li>
                  <li>{t('proposalCaseStudy.deliverable4')}</li>
                </ul>
              </div>
            </section>

            {/* IMPACT & REFLECTION */}
            <section id="reflection" className="py-12 md:py-20 scroll-mt-32">
              <h2 className={`text-title-lg mb-6 ${getHeadingFontClass()}`}>{t('work.impactReflection')}</h2>
              <div className="space-y-6">
                <div>
                  <h3 className={`text-title mb-3 ${getHeadingFontClass()}`}>{t('proposalCaseStudy.statusTitle')}</h3>
                  <p className={`text-ink-secondary ${bodyTextClass}`}>{t('proposalCaseStudy.statusText')}</p>
                </div>
                <div>
                  <h3 className={`text-title mb-3 ${getHeadingFontClass()}`}>{t('proposalCaseStudy.learningTitle')}</h3>
                  <p className={`text-ink-secondary ${bodyTextClass}`}>{t('proposalCaseStudy.learningText')}</p>
                </div>
                <div>
                  <h3 className={`text-title mb-3 ${getHeadingFontClass()}`}>{t('proposalCaseStudy.roleClarityTitle')}</h3>
                  <p className={`text-ink-secondary ${bodyTextClass}`}>{t('proposalCaseStudy.roleClarityText')}</p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar Navigation */}
          <div className="hidden md:flex md:w-[20%] pl-4 pt-12 items-start justify-center">
            <nav className="sticky top-24">
              <ul className="space-y-3">
                <li>
                  <button onClick={() => scrollToSection('overview')} className={sidebarButtonClass('overview')}>
                    {t('work.navOverview')}
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('design-process')} className={sidebarButtonClass('design-process')}>
                    {t('work.navDesignProcess')}
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('solution')} className={sidebarButtonClass('solution')}>
                    {t('work.navSolution')}
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('reflection')} className={sidebarButtonClass('reflection')}>
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

export default PublicTransportRfpPage;
