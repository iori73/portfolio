'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import BackToTopButton from '@/src/compositions/BackToTopButton';
import { useTranslations, useLocale } from 'next-intl';
import { useBodyFont, useHeadingFont } from '@/src/hooks/useFonts';
import { usePageTransition } from '@/src/contexts/TransitionContext';

const SECTIONS = ['overview', 'design-process', 'solution', 'reflection'] as const;

const UniversityDonationAppPage: React.FC = () => {
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
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      let current = activeSection;
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 150) current = id;
      }
      if (current !== activeSection) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const sidebarButtonClass = (id: string) =>
    activeSection === id
      ? 'text-left text-title font-switzer transition-transform duration-900 scale-110'
      : 'text-left text-title-sm font-switzer transition-transform duration-900 scale-100 opacity-50';

  const bodyTextClass = `${getBodyFontClass()} tracking-[0.2px] text-body-lg`;

  return (
    <div className="font-sans my-24 md:mt-28 md:mb-16">
      <BackToTopButton />

      {/* Hero */}
      <section className="mb-0 md:mb-12 full-bleed">
        <div className="w-full">
          <div className="w-full aspect-[8/5] bg-[#8E1728] overflow-hidden relative">
            <Image
              src="/work/university-donation-app/global-network.png"
              alt="University Alumni Donation App"
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
                <h1 className={`text-headline text-ink mb-3 md:mb-2 ${getHeadingFontClass()}`}>
                  {t('universityDonationApp.title')}
                </h1>
                <p className={`text-body-lg ${getBodyFontClass()} text-ink-secondary tracking-[0.2px]`}>
                  {t('universityDonationApp.subtitle')}
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <span className="text-caption-lg font-space-grotesk font-semibold text-ink-tertiary mb-2 block">{t('common.timeline')}</span>
              <p className="text-body-lg tracking-[0.2px]">{t('projects.universityDonationApp.timeline')}</p>
            </div>
            <div>
              <span className="text-caption-lg font-space-grotesk font-semibold text-ink-tertiary mb-2 block">{t('common.mySkills')}</span>
              <p className="text-body-lg tracking-[0.2px]">{t('projects.universityDonationApp.skills')}</p>
            </div>
            <div>
              <span className="text-caption-lg font-space-grotesk font-semibold text-ink-tertiary mb-2 block">{t('common.type')}</span>
              <p className="text-body-lg tracking-[0.2px]">{t('universityDonationApp.type')}</p>
            </div>
            <div>
              <span className="text-caption-lg font-space-grotesk font-semibold text-ink-tertiary mb-2 block">{t('common.deliverables')}</span>
              <p className="text-body-lg tracking-[0.2px]">{t('projects.universityDonationApp.deliverables')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main + Sidebar */}
      <div className="max-w-7xl w-full mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="md:w-[80%]">

            {/* OVERVIEW */}
            <section id="overview" className="w-full mx-auto py-12 md:py-16 text-ink-secondary scroll-mt-32">
              <h2 className={`text-title-lg mb-6 ${getHeadingFontClass()}`}>{t('work.overview')}</h2>
              <p className={`mb-4 ${bodyTextClass}`}>{t('universityDonationApp.overviewText1')}</p>
              <p className={`mb-8 ${bodyTextClass}`}>{t('universityDonationApp.overviewText2')}</p>

              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>{t('universityDonationApp.challengeTitle')}</h3>
                <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mt-4`}>
                  <div className="p-6 rounded-lg bg-surface-muted">
                    <p className="text-title-sm font-space-grotesk font-semibold text-ink mb-2">4%</p>
                    <p className="text-body-sm text-ink-tertiary">{t('universityDonationApp.stat1')}</p>
                  </div>
                  <div className="p-6 rounded-lg bg-surface-muted">
                    <p className="text-title-sm font-space-grotesk font-semibold text-ink mb-2">670K+</p>
                    <p className="text-body-sm text-ink-tertiary">{t('universityDonationApp.stat2')}</p>
                  </div>
                  <div className="p-6 rounded-lg bg-surface-muted">
                    <p className="text-title-sm font-space-grotesk font-semibold text-ink mb-2">2.5 {language === 'jp' ? '週間' : 'weeks'}</p>
                    <p className="text-body-sm text-ink-tertiary">{t('universityDonationApp.stat3')}</p>
                  </div>
                </div>
              </div>

              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>{t('universityDonationApp.roleTitle')}</h3>
                <p className={`${bodyTextClass}`}>{t('universityDonationApp.roleText')}</p>
              </div>
            </section>

            {/* DESIGN PROCESS */}
            <section id="design-process" className="py-12 md:py-20 scroll-mt-32">
              <h2 className={`text-title-lg mb-6 ${getHeadingFontClass()}`}>{t('work.designProcess')}</h2>
              <p className={`mb-10 md:mb-14 text-ink-secondary ${bodyTextClass}`}>{t('universityDonationApp.designProcessIntro')}</p>

              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>{t('universityDonationApp.researchTitle')}</h3>
                <p className={`mb-6 text-ink-secondary ${bodyTextClass}`}>{t('universityDonationApp.researchText')}</p>
              </div>

              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>{t('universityDonationApp.competitiveTitle')}</h3>
                <p className={`mb-6 text-ink-secondary ${bodyTextClass}`}>{t('universityDonationApp.competitiveText')}</p>
              </div>

              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>{t('universityDonationApp.principlesTitle')}</h3>
                <p className={`mb-4 text-ink-secondary ${bodyTextClass}`}>{t('universityDonationApp.principlesIntro')}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['principle1', 'principle2', 'principle3'].map((key) => (
                    <div key={key} className="p-5 rounded-lg border border-line-subtle">
                      <p className="text-body font-space-grotesk font-semibold text-ink mb-1">
                        {t(`universityDonationApp.${key}Title`)}
                      </p>
                      <p className="text-body-sm text-ink-tertiary">
                        {t(`universityDonationApp.${key}Text`)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>{t('universityDonationApp.iaTitle')}</h3>
                <p className={`text-ink-secondary ${bodyTextClass}`}>{t('universityDonationApp.iaText')}</p>
              </div>
            </section>

            {/* SOLUTION */}
            <section id="solution" className="py-12 md:py-20 scroll-mt-32">
              <h2 className={`text-title-lg mb-6 ${getHeadingFontClass()}`}>{t('work.solution')}</h2>
              <p className={`mb-10 md:mb-14 text-ink-secondary ${bodyTextClass}`}>{t('universityDonationApp.solutionIntro')}</p>

              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>{t('universityDonationApp.flowTitle')}</h3>
                <p className={`mb-6 text-ink-secondary ${bodyTextClass}`}>{t('universityDonationApp.flowText')}</p>
              </div>

              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>{t('universityDonationApp.screensTitle')}</h3>
                <p className={`mb-6 text-ink-secondary ${bodyTextClass}`}>{t('universityDonationApp.screensText')}</p>
                <figure>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <Image
                        key={i}
                        src={`/work/university-donation-app/onboarding-${i}.jpg`}
                        alt={`Onboarding card ${i}`}
                        width={300}
                        height={200}
                        className="w-full h-auto rounded-lg"
                      />
                    ))}
                  </div>
                  <figcaption className="mt-3 text-body-sm md:text-body-base text-ink-tertiary font-space-grotesk">
                    {t('universityDonationApp.captionOnboarding')}
                  </figcaption>
                </figure>
              </div>

              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>{t('universityDonationApp.dsTitle')}</h3>
                <p className={`text-ink-secondary ${bodyTextClass}`}>{t('universityDonationApp.dsText')}</p>
              </div>
            </section>

            {/* REFLECTION */}
            <section id="reflection" className="py-12 md:py-20 scroll-mt-32">
              <h2 className={`text-title-lg mb-6 ${getHeadingFontClass()}`}>{t('work.impactReflection')}</h2>
              <div className="space-y-6">
                <div>
                  <h3 className={`text-title mb-3 ${getHeadingFontClass()}`}>{t('universityDonationApp.impactTitle')}</h3>
                  <p className={`text-ink-secondary ${bodyTextClass}`}>{t('universityDonationApp.impactText')}</p>
                </div>
                <div>
                  <h3 className={`text-title mb-3 ${getHeadingFontClass()}`}>{t('universityDonationApp.learningTitle')}</h3>
                  <p className={`text-ink-secondary ${bodyTextClass}`}>{t('universityDonationApp.learningText')}</p>
                </div>
              </div>
            </section>

          </div>

          {/* Sidebar */}
          <div className="hidden md:flex md:w-[20%] pl-4 pt-12 items-start justify-center">
            <nav className="sticky top-24">
              <ul className="space-y-3">
                {SECTIONS.map((id) => (
                  <li key={id}>
                    <button onClick={() => scrollToSection(id)} className={sidebarButtonClass(id)}>
                      {id === 'overview' && t('work.navOverview')}
                      {id === 'design-process' && t('work.navDesignProcess')}
                      {id === 'solution' && t('work.navSolution')}
                      {id === 'reflection' && t('work.navImpactReflection')}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityDonationAppPage;
