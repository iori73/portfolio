'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import BackToTopButton from '@/src/compositions/BackToTopButton';
import { useTranslations, useLocale } from 'next-intl';
import { useBodyFont, useHeadingFont } from '@/src/hooks/useFonts';
import { usePageTransition } from '@/src/contexts/TransitionContext';

const SECTIONS = ['overview', 'design-process', 'solution', 'reflection'] as const;

const SmartHomeVoiceUIPage: React.FC = () => {
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
          <div className="w-full aspect-[8/5] bg-[#364563] overflow-hidden relative">
            <Image
              src="/work/smart-home-voice-ui/ui-overview.png"
              alt="Smart Home Voice Notification UI"
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
                  {t('smartHomeVoiceUI.title')}
                </h1>
                <p className={`text-body-lg ${getBodyFontClass()} text-ink-secondary tracking-[0.2px]`}>
                  {t('smartHomeVoiceUI.subtitle')}
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <span className="text-caption-lg font-space-grotesk font-semibold text-ink-tertiary mb-2 block">{t('common.timeline')}</span>
              <p className="text-body-lg tracking-[0.2px]">{t('projects.smartHomeVoiceUI.timeline')}</p>
            </div>
            <div>
              <span className="text-caption-lg font-space-grotesk font-semibold text-ink-tertiary mb-2 block">{t('common.mySkills')}</span>
              <p className="text-body-lg tracking-[0.2px]">{t('projects.smartHomeVoiceUI.skills')}</p>
            </div>
            <div>
              <span className="text-caption-lg font-space-grotesk font-semibold text-ink-tertiary mb-2 block">{t('common.type')}</span>
              <p className="text-body-lg tracking-[0.2px]">{t('smartHomeVoiceUI.type')}</p>
            </div>
            <div>
              <span className="text-caption-lg font-space-grotesk font-semibold text-ink-tertiary mb-2 block">{t('common.deliverables')}</span>
              <p className="text-body-lg tracking-[0.2px]">{t('projects.smartHomeVoiceUI.deliverables')}</p>
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
              <p className={`mb-4 ${bodyTextClass}`}>{t('smartHomeVoiceUI.overviewText1')}</p>
              <p className={`mb-8 ${bodyTextClass}`}>{t('smartHomeVoiceUI.overviewText2')}</p>

              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>{t('smartHomeVoiceUI.tracksTitle')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-lg border border-line-subtle">
                    <p className="text-body font-space-grotesk font-semibold text-ink mb-1">{t('smartHomeVoiceUI.track1Title')}</p>
                    <p className="text-body-sm text-ink-tertiary">{t('smartHomeVoiceUI.track1Text')}</p>
                  </div>
                  <div className="p-5 rounded-lg border border-line-subtle">
                    <p className="text-body font-space-grotesk font-semibold text-ink mb-1">{t('smartHomeVoiceUI.track2Title')}</p>
                    <p className="text-body-sm text-ink-tertiary">{t('smartHomeVoiceUI.track2Text')}</p>
                  </div>
                </div>
              </div>

              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>{t('smartHomeVoiceUI.roleTitle')}</h3>
                <p className={`${bodyTextClass}`}>{t('smartHomeVoiceUI.roleText')}</p>
              </div>
            </section>

            {/* DESIGN PROCESS */}
            <section id="design-process" className="py-12 md:py-20 scroll-mt-32">
              <h2 className={`text-title-lg mb-6 ${getHeadingFontClass()}`}>{t('work.designProcess')}</h2>
              <p className={`mb-10 md:mb-14 text-ink-secondary ${bodyTextClass}`}>{t('smartHomeVoiceUI.designProcessIntro')}</p>

              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>{t('smartHomeVoiceUI.textWrappingTitle')}</h3>
                <p className={`mb-6 text-ink-secondary ${bodyTextClass}`}>{t('smartHomeVoiceUI.textWrappingText')}</p>
              </div>

              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>{t('smartHomeVoiceUI.animationTitle')}</h3>
                <p className={`mb-6 text-ink-secondary ${bodyTextClass}`}>{t('smartHomeVoiceUI.animationText')}</p>
              </div>

              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>{t('smartHomeVoiceUI.brandTitle')}</h3>
                <p className={`text-ink-secondary ${bodyTextClass}`}>{t('smartHomeVoiceUI.brandText')}</p>
              </div>
            </section>

            {/* SOLUTION */}
            <section id="solution" className="py-12 md:py-20 scroll-mt-32">
              <h2 className={`text-title-lg mb-6 ${getHeadingFontClass()}`}>{t('work.solution')}</h2>
              <p className={`mb-10 md:mb-14 text-ink-secondary ${bodyTextClass}`}>{t('smartHomeVoiceUI.solutionIntro')}</p>

              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>{t('smartHomeVoiceUI.cchubTitle')}</h3>
                <p className={`mb-6 text-ink-secondary ${bodyTextClass}`}>{t('smartHomeVoiceUI.cchubText')}</p>
              </div>

              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>{t('smartHomeVoiceUI.speakerTitle')}</h3>
                <p className={`mb-6 text-ink-secondary ${bodyTextClass}`}>{t('smartHomeVoiceUI.speakerText')}</p>
              </div>

              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>{t('smartHomeVoiceUI.scenarioTitle')}</h3>
                <p className={`text-ink-secondary ${bodyTextClass}`}>{t('smartHomeVoiceUI.scenarioText')}</p>
              </div>

              <div className="mb-10 md:mb-14">
                <h3 className={`text-title mb-4 ${getHeadingFontClass()}`}>{t('smartHomeVoiceUI.specsTitle')}</h3>
                <p className={`text-ink-secondary ${bodyTextClass}`}>{t('smartHomeVoiceUI.specsText')}</p>
              </div>
            </section>

            {/* REFLECTION */}
            <section id="reflection" className="py-12 md:py-20 scroll-mt-32">
              <h2 className={`text-title-lg mb-6 ${getHeadingFontClass()}`}>{t('work.impactReflection')}</h2>
              <div className="space-y-6">
                <div>
                  <h3 className={`text-title mb-3 ${getHeadingFontClass()}`}>{t('smartHomeVoiceUI.impactTitle')}</h3>
                  <p className={`text-ink-secondary ${bodyTextClass}`}>{t('smartHomeVoiceUI.impactText')}</p>
                </div>
                <div>
                  <h3 className={`text-title mb-3 ${getHeadingFontClass()}`}>{t('smartHomeVoiceUI.learningTitle')}</h3>
                  <p className={`text-ink-secondary ${bodyTextClass}`}>{t('smartHomeVoiceUI.learningText')}</p>
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

export default SmartHomeVoiceUIPage;
