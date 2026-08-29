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

const StatCard: React.FC<{ value: string; caption: string }> = ({ value, caption }) => (
  <div className="p-6 rounded-lg bg-surface-muted">
    <p className="text-title-sm font-space-grotesk font-semibold text-ink mb-2">{value}</p>
    <p className="text-body-sm text-ink-tertiary">{caption}</p>
  </div>
);

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

      {/* Project Info (no hero image — proposal-phase project, no client assets to show) */}
      <section className="pt-16 pb-12 md:pt-20 md:pb-16">
        <div className="max-w-[1028px] w-full mx-auto">
          <div className="mb-10 md:mb-12">
            <div className="flex flex-col items-start gap-4">
              <div className="flex-1">
                <h1 className={`text-headline text-ink mb-3 md:mb-2 ${getHeadingFontClass()}`}>
                  {t('publicTransportRfp.title')}
                </h1>
                <p className={`text-body-lg ${getBodyFontClass()} text-ink-secondary tracking-[0.2px]`}>
                  {t('publicTransportRfp.subtitle')}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <span className="text-caption-lg font-space-grotesk font-semibold text-ink-tertiary mb-2 block">
                {t('common.timeline')}
              </span>
              <p className="text-body-lg tracking-[0.2px]">{t('projects.publicTransportRfp.timeline')}</p>
            </div>
            <div>
              <span className="text-caption-lg font-space-grotesk font-semibold text-ink-tertiary mb-2 block">
                {t('common.mySkills')}
              </span>
              <p className="text-body-lg tracking-[0.2px]">{t('projects.publicTransportRfp.skills')}</p>
            </div>
            <div>
              <span className="text-caption-lg font-space-grotesk font-semibold text-ink-tertiary mb-2 block">
                {t('common.type')}
              </span>
              <p className="text-body-lg tracking-[0.2px]">{t('publicTransportRfp.type')}</p>
            </div>
            <div>
              <span className="text-caption-lg font-space-grotesk font-semibold text-ink-tertiary mb-2 block">
                {t('common.deliverables')}
              </span>
              <p className="text-body-lg tracking-[0.2px]">{t('projects.publicTransportRfp.deliverables')}</p>
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
              <p className={`mb-4 ${bodyTextClass}`}>{t('publicTransportRfp.overviewText1')}</p>
              <p className={`mb-8 ${bodyTextClass}`}>{t('publicTransportRfp.overviewText2')}</p>

              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>{t('publicTransportRfp.challengeTitle')}</h3>
                <ul className={`list-disc list-inside space-y-2 ${bodyTextClass}`}>
                  <li>{t('publicTransportRfp.challenge1')}</li>
                  <li>{t('publicTransportRfp.challenge2')}</li>
                  <li>{t('publicTransportRfp.challenge3')}</li>
                </ul>
              </div>

              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>{t('publicTransportRfp.roleTitle')}</h3>
                <p className={bodyTextClass}>{t('publicTransportRfp.roleText')}</p>
              </div>
            </section>

            {/* DESIGN PROCESS */}
            <section id="design-process" className="py-12 md:py-20 scroll-mt-32">
              <h2 className={`text-title-lg mb-6 ${getHeadingFontClass()}`}>{t('work.designProcess')}</h2>
              <p className={`mb-10 md:mb-14 text-ink-secondary ${bodyTextClass}`}>
                {t('publicTransportRfp.designProcessIntro')}
              </p>

              {/* IA Reconstruction */}
              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>{t('publicTransportRfp.iaTitle')}</h3>
                <p className={`mb-4 text-ink-secondary ${bodyTextClass}`}>{t('publicTransportRfp.iaText')}</p>
                <p className={`text-ink-secondary ${bodyTextClass}`}>{t('publicTransportRfp.iaOutcome')}</p>
              </div>

              {/* Audit Scoping */}
              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>{t('publicTransportRfp.auditTitle')}</h3>
                <p className={`text-ink-secondary ${bodyTextClass}`}>{t('publicTransportRfp.auditText')}</p>
              </div>

              {/* Confidence Labels & Self-Correction */}
              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>{t('publicTransportRfp.confidenceTitle')}</h3>
                <p className={`text-ink-secondary ${bodyTextClass}`}>{t('publicTransportRfp.confidenceText')}</p>
              </div>

              {/* Accessibility & Design System */}
              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>{t('publicTransportRfp.a11yTitle')}</h3>
                <p className={`text-ink-secondary ${bodyTextClass}`}>{t('publicTransportRfp.a11yText')}</p>
              </div>
            </section>

            {/* SOLUTION */}
            <section id="solution" className="py-12 md:py-20 scroll-mt-32">
              <h2 className={`text-title-lg mb-6 ${getHeadingFontClass()}`}>{t('work.solution')}</h2>
              <p className={`mb-10 md:mb-14 text-ink-secondary ${bodyTextClass}`}>
                {t('publicTransportRfp.solutionIntro')}
              </p>

              <div className="mb-10 md:mb-14">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-6">
                  <StatCard value="188" caption={t('publicTransportRfp.stat1')} />
                  <StatCard value="43 → 2" caption={t('publicTransportRfp.stat2')} />
                  <StatCard value="10 + 1" caption={t('publicTransportRfp.stat3')} />
                </div>
              </div>

              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>{t('publicTransportRfp.deliverablesTitle')}</h3>
                <ul className={`list-disc list-inside space-y-2 ${bodyTextClass}`}>
                  <li>{t('publicTransportRfp.deliverable1')}</li>
                  <li>{t('publicTransportRfp.deliverable2')}</li>
                  <li>{t('publicTransportRfp.deliverable3')}</li>
                  <li>{t('publicTransportRfp.deliverable4')}</li>
                </ul>
              </div>
            </section>

            {/* IMPACT & REFLECTION */}
            <section id="reflection" className="py-12 md:py-20 scroll-mt-32">
              <h2 className={`text-title-lg mb-6 ${getHeadingFontClass()}`}>{t('work.impactReflection')}</h2>
              <div className="space-y-6">
                <div>
                  <h3 className={`text-title mb-3 ${getHeadingFontClass()}`}>{t('publicTransportRfp.statusTitle')}</h3>
                  <p className={`text-ink-secondary ${bodyTextClass}`}>{t('publicTransportRfp.statusText')}</p>
                </div>
                <div>
                  <h3 className={`text-title mb-3 ${getHeadingFontClass()}`}>{t('publicTransportRfp.learningTitle')}</h3>
                  <p className={`text-ink-secondary ${bodyTextClass}`}>{t('publicTransportRfp.learningText')}</p>
                </div>
                <div>
                  <h3 className={`text-title mb-3 ${getHeadingFontClass()}`}>{t('publicTransportRfp.roleClarityTitle')}</h3>
                  <p className={`text-ink-secondary ${bodyTextClass}`}>{t('publicTransportRfp.roleClarityText')}</p>
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
