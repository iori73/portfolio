'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import BackToTopButton from '@/src/compositions/BackToTopButton';
import { useTranslations, useLocale } from 'next-intl';
import { useBodyFont, useHeadingFont } from '@/src/hooks/useFonts';
import { usePageTransition } from '@/src/contexts/TransitionContext';

const SECTIONS = ['overview', 'design-process', 'solution', 'reflection'] as const;

const VideoLearningPlatformPage: React.FC = () => {
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
          <div className="w-full aspect-[8/5] bg-[#1a1a2e] overflow-hidden relative">
            <Image
              src="/work/video-learning-platform/concept.png"
              alt="Video Learning Platform UI Renewal"
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
                  {t('videoLearningPlatform.title')}
                </h1>
                <p className={`text-body-lg ${getBodyFontClass()} text-ink-secondary tracking-[0.2px]`}>
                  {t('videoLearningPlatform.subtitle')}
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <span className="text-caption-lg font-space-grotesk font-semibold text-ink-tertiary mb-2 block">{t('common.timeline')}</span>
              <p className="text-body-lg tracking-[0.2px]">{t('projects.videoLearningPlatform.timeline')}</p>
            </div>
            <div>
              <span className="text-caption-lg font-space-grotesk font-semibold text-ink-tertiary mb-2 block">{t('common.mySkills')}</span>
              <p className="text-body-lg tracking-[0.2px]">{t('projects.videoLearningPlatform.skills')}</p>
            </div>
            <div>
              <span className="text-caption-lg font-space-grotesk font-semibold text-ink-tertiary mb-2 block">{t('common.type')}</span>
              <p className="text-body-lg tracking-[0.2px]">{t('videoLearningPlatform.type')}</p>
            </div>
            <div>
              <span className="text-caption-lg font-space-grotesk font-semibold text-ink-tertiary mb-2 block">{t('common.deliverables')}</span>
              <p className="text-body-lg tracking-[0.2px]">{t('projects.videoLearningPlatform.deliverables')}</p>
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
              <p className={`mb-4 ${bodyTextClass}`}>{t('videoLearningPlatform.overviewText1')}</p>
              <p className={`mb-8 ${bodyTextClass}`}>{t('videoLearningPlatform.overviewText2')}</p>

              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>{t('videoLearningPlatform.conceptTitle')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['concept1', 'concept2', 'concept3'].map((key) => (
                    <div key={key} className="p-5 rounded-lg border border-line-subtle">
                      <p className="text-body font-space-grotesk font-semibold text-ink mb-1">
                        {t(`videoLearningPlatform.${key}Title`)}
                      </p>
                      <p className="text-body-sm text-ink-tertiary">
                        {t(`videoLearningPlatform.${key}Text`)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>{t('videoLearningPlatform.roleTitle')}</h3>
                <p className={`${bodyTextClass}`}>{t('videoLearningPlatform.roleText')}</p>
              </div>
            </section>

            {/* DESIGN PROCESS */}
            <section id="design-process" className="py-12 md:py-20 scroll-mt-32">
              <h2 className={`text-title-lg mb-6 ${getHeadingFontClass()}`}>{t('work.designProcess')}</h2>
              <p className={`mb-10 md:mb-14 text-ink-secondary ${bodyTextClass}`}>{t('videoLearningPlatform.designProcessIntro')}</p>

              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>{t('videoLearningPlatform.oouiTitle')}</h3>
                <p className={`mb-6 text-ink-secondary ${bodyTextClass}`}>{t('videoLearningPlatform.oouiText')}</p>
              </div>

              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>{t('videoLearningPlatform.gamificationTitle')}</h3>
                <p className={`mb-6 text-ink-secondary ${bodyTextClass}`}>{t('videoLearningPlatform.gamificationText')}</p>
              </div>

              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>{t('videoLearningPlatform.benchmarkTitle')}</h3>
                <p className={`text-ink-secondary ${bodyTextClass}`}>{t('videoLearningPlatform.benchmarkText')}</p>
              </div>
            </section>

            {/* SOLUTION */}
            <section id="solution" className="py-12 md:py-20 scroll-mt-32">
              <h2 className={`text-title-lg mb-6 ${getHeadingFontClass()}`}>{t('work.solution')}</h2>
              <p className={`mb-10 md:mb-14 text-ink-secondary ${bodyTextClass}`}>{t('videoLearningPlatform.solutionIntro')}</p>

              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>{t('videoLearningPlatform.screensTitle')}</h3>
                <p className={`mb-6 text-ink-secondary ${bodyTextClass}`}>{t('videoLearningPlatform.screensText')}</p>
              </div>

              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>{t('videoLearningPlatform.componentsTitle')}</h3>
                <p className={`text-ink-secondary ${bodyTextClass}`}>{t('videoLearningPlatform.componentsText')}</p>
              </div>

              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>{t('videoLearningPlatform.reviewTitle')}</h3>
                <p className={`text-ink-secondary ${bodyTextClass}`}>{t('videoLearningPlatform.reviewText')}</p>
              </div>
            </section>

            {/* REFLECTION */}
            <section id="reflection" className="py-12 md:py-20 scroll-mt-32">
              <h2 className={`text-title-lg mb-6 ${getHeadingFontClass()}`}>{t('work.impactReflection')}</h2>
              <div className="space-y-6">
                <div>
                  <h3 className={`text-title mb-3 ${getHeadingFontClass()}`}>{t('videoLearningPlatform.impactTitle')}</h3>
                  <p className={`text-ink-secondary ${bodyTextClass}`}>{t('videoLearningPlatform.impactText')}</p>
                </div>
                <div>
                  <h3 className={`text-title mb-3 ${getHeadingFontClass()}`}>{t('videoLearningPlatform.mentoringTitle')}</h3>
                  <p className={`text-ink-secondary ${bodyTextClass}`}>{t('videoLearningPlatform.mentoringText')}</p>
                </div>
                <div>
                  <h3 className={`text-title mb-3 ${getHeadingFontClass()}`}>{t('videoLearningPlatform.technicalTitle')}</h3>
                  <p className={`text-ink-secondary ${bodyTextClass}`}>{t('videoLearningPlatform.technicalText')}</p>
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

export default VideoLearningPlatformPage;
