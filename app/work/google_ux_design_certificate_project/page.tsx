'use client';
import React, { useState, useEffect } from 'react';
import BackToTopButton from '@/src/compositions/BackToTopButton';
import { useLanguage } from '@/src/lib/i18n';

const GoogleUXDesignCertificateProject: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const { t } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // スクロール位置で activeSection を更新
  useEffect(() => {
    const sections = [
      'overview',
      'understanding-the-user',
      'secondary-research',
      'personas',
      'empathy-map',
      'pain-points',
      'user-journey-map',
      'value-proposition-canvas',
      'feature-ideas',
      'competitive-audit',
      'starting-the-design',
      'user-flow',
      'storyboard',
      'paper-wireframes',
      'low-fidelity-prototypes',
      'refining-the-design',
      'mockups',
      'going-forward',
    ];

    const handleScroll = () => {
      let currentSection = activeSection;
      for (const id of sections) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // 150px 程度のオフセットで画面上部に入ったらハイライト
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
    handleScroll(); // 初回チェック

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  return (
    <div className="font-sans my-24 md:mt-28 md:mb-16">
      <BackToTopButton />
      {/* 
        Hero Section 
        画面最上部にヘッダーが固定されているため、
        最初のセクションに pt-32 を付与し、見えなくならないように調整。
        scroll-mt-32 を付与することで、アンカーリンクで飛んだときにも
        ヘッダーと被らないようにする。
      */}
      <section className="  ">
        <div className="max-w-[896px] w-full mx-auto">
          <div className="flex flex-wrap justify-center">
            {/* Hero Image */}
            <img
              src="/work/google_ux_design_certificate_project/thumbnail.png"
              alt="Phone mockups"
              className="w-full max-w-[896px]"
            />
          </div>
        </div>
      </section>

      {/* Project Info */}
      <section id="project-info" className="  pt-4 pb-8 scroll-mt-32">
        <div className="max-w-[896px] w-full mx-auto">
          <div className="flex items-center gap-6 mb-4 flex-wrap md:flex-nowrap">
            {/* モバイルでは text-heading-s-120, md以上では text-heading-m-120 */}
            <h1 className="text-heading-s-120 md:text-heading-m-120 font-inter">
              Google UX Design Certificate Project
            </h1>
            <div className="flex gap-2">
              <span className="text-body-l-140 font-space-mono px-2 py-1 rounded-[16px] bg-[#f5f5f7] text-[#696969]">
                Research
              </span>
              <span className="text-body-l-140 font-space-mono px-2 py-1 rounded-[16px] bg-[#f5f5f7] text-[#696969]">
                UI
              </span>
              <span className="text-body-l-140 font-space-mono px-2 py-1 rounded-[16px] bg-[#f5f5f7] text-[#696969]">
                UX
              </span>
            </div>
          </div>

          {/* 説明文: Body/XL_140 */}
          <p className="text-body-xl-140 font-inter text-gray-600 mb-8">{t('googleUXDescription')}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <h3 className="text-caption-m-120 font-jetbrains-mono text-gray-500 mb-2">Timeline</h3>
              <p className="text-body-l-140 font-inter">{t('googleUXTimeline')}</p>
            </div>
            <div>
              <h3 className="text-caption-m-120 font-jetbrains-mono text-gray-500 mb-2">My Role</h3>
              <p className="text-body-l-140 font-inter">{t('uxRole')}</p>
            </div>
            <div>
              <h3 className="text-caption-m-120 font-jetbrains-mono text-gray-500 mb-2">Team</h3>
              <p className="text-body-l-140 font-inter">{t('solo')}</p>
            </div>
            <div>
              <h3 className="text-caption-m-120 font-jetbrains-mono text-gray-500 mb-2">Deliverables</h3>
              <p className="text-body-l-140 font-inter">
                {t('secondaryResearch')}
                <br />
                {t('storyboard')}
                <br />
                {t('prototype')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[1152px] w-full mx-auto">
        <div className="flex flex-col md:flex-row">
          {/* Main Content */}
          <div className="md:w-3/4 md:pr-8">
            {/* Project overview (h2, border preserved) */}
            {/* scroll-mt-32 を付与して、ヘッダー下に隠れないようにする */}
            <section id="overview" className="w-full mx-auto py-8   text-[#002a38] scroll-mt-32">
              <h2 className="text-heading-s-120 md:text-heading-m-120 font-inter mb-6">{t('projectOverview')}</h2>
              <img
                style={{
                  // Optional: a simple box-shadow
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                }}
                src="/work/google_ux_design_certificate_project/02.png"
                alt="Project overview placeholder"
                className="w-full mb-8"
              />
              <img
                style={{
                  // Optional: a simple box-shadow
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                }}
                src="/work/google_ux_design_certificate_project/03.png"
                alt="Project overview placeholder"
                className="w-full mb-8"
              />
              <img
                style={{
                  // Optional: a simple box-shadow
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                }}
                src="/work/google_ux_design_certificate_project/04.png"
                alt="Project overview placeholder"
                className="w-full mb-8"
              />
            </section>

            {/* Understanding the User (h2, border preserved) */}
            <section id="understanding-the-user" className="py-8 border-t border-gray-400 scroll-mt-32">
              <h2 className="text-heading-s-120 md:text-heading-m-120 font-inter mb-4">{t('understandingTheUser')}</h2>
              <img
                style={{
                  // Optional: a simple box-shadow
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                }}
                src="/work/google_ux_design_certificate_project/05.png"
                alt="Understanding the User placeholder"
                className="w-full mb-8"
              />
            </section>

            {/* 以下、h3 セクションは border を削除 */}
            {/* Secondary research */}
            <section id="secondary-research" className="py-4 scroll-mt-32">
              <h3 className="text-heading-xs-120 md:text-heading-s-120 font-inter mb-2">{t('secondaryResearch')}</h3>
              <img
                style={{
                  // Optional: a simple box-shadow
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                }}
                src="/work/google_ux_design_certificate_project/06.png"
                alt="Secondary research placeholder"
                className="w-full mb-8"
              />
              <img
                style={{
                  // Optional: a simple box-shadow
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                }}
                src="/work/google_ux_design_certificate_project/07.png"
                alt="Secondary research placeholder"
                className="w-full mb-8"
              />
              <img
                style={{
                  // Optional: a simple box-shadow
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                }}
                src="/work/google_ux_design_certificate_project/08.png"
                alt="Secondary research placeholder"
                className="w-full mb-8"
              />
            </section>

            {/* Personas */}
            <section id="personas" className="py-4 scroll-mt-32">
              <h3 className="text-heading-xs-120 md:text-heading-s-120 font-inter mb-2">{t('personas')}</h3>
              <img
                style={{
                  // Optional: a simple box-shadow
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                }}
                src="/work/google_ux_design_certificate_project/09.png"
                alt="Personas placeholder"
                className="w-full mb-8"
              />
              <img
                style={{
                  // Optional: a simple box-shadow
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                }}
                src="/work/google_ux_design_certificate_project/10.png"
                alt="Personas placeholder"
                className="w-full mb-8"
              />
            </section>

            {/* Empathy map */}
            <section id="empathy-map" className="py-4 scroll-mt-32">
              <h3 className="text-heading-xs-120 md:text-heading-s-120 font-inter mb-2">{t('empathyMap')}</h3>
              <img
                style={{
                  // Optional: a simple box-shadow
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                }}
                src="/work/google_ux_design_certificate_project/11.png"
                alt="Empathy map placeholder"
                className="w-full mb-8"
              />
            </section>

            {/* Pain points */}
            <section id="pain-points" className="py-4 scroll-mt-32">
              <h3 className="text-heading-xs-120 md:text-heading-s-120 font-inter mb-2">{t('painPoints')}</h3>
              <img
                style={{
                  // Optional: a simple box-shadow
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                }}
                src="/work/google_ux_design_certificate_project/12.png"
                alt="Pain points placeholder"
                className="w-full mb-8"
              />
            </section>

            {/* User journey map */}
            <section id="user-journey-map" className="py-4 scroll-mt-32">
              <h3 className="text-heading-xs-120 md:text-heading-s-120 font-inter mb-2">{t('userJourneyMap')}</h3>
              <img
                style={{
                  // Optional: a simple box-shadow
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                }}
                src="/work/google_ux_design_certificate_project/13.png"
                alt="User journey map placeholder"
                className="w-full mb-8"
              />
              <img
                style={{
                  // Optional: a simple box-shadow
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                }}
                src="/work/google_ux_design_certificate_project/14.png"
                alt="User journey map placeholder"
                className="w-full mb-8"
              />
            </section>

            {/* Value Proposition Canvas */}
            <section id="value-proposition-canvas" className="py-4 scroll-mt-32">
              <h3 className="text-heading-xs-120 md:text-heading-s-120 font-inter mb-2">
                {t('valuePropositionCanvas')}
              </h3>
              <img
                style={{
                  // Optional: a simple box-shadow
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                }}
                src="/work/google_ux_design_certificate_project/15.png"
                alt="Value Proposition Canvas placeholder"
                className="w-full mb-8"
              />
            </section>

            {/* Feature Ideas */}
            <section id="feature-ideas" className="py-4 scroll-mt-32">
              <h3 className="text-heading-xs-120 md:text-heading-s-120 font-inter mb-2">{t('featureIdeas')}</h3>
              <img
                style={{
                  // Optional: a simple box-shadow
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                }}
                src="/work/google_ux_design_certificate_project/16.png"
                alt="Feature Ideas placeholder"
                className="w-full mb-8"
              />
            </section>

            {/* Competitive audit */}
            <section id="competitive-audit" className="py-4 scroll-mt-32">
              <h3 className="text-heading-xs-120 md:text-heading-s-120 font-inter mb-2">{t('competitiveAudit')}</h3>
              <img
                style={{
                  // Optional: a simple box-shadow
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                }}
                src="/work/google_ux_design_certificate_project/17.png"
                alt="Competitive audit placeholder"
                className="w-full mb-8"
              />
              <img
                style={{
                  // Optional: a simple box-shadow
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                }}
                src="/work/google_ux_design_certificate_project/18.png"
                alt="Competitive audit placeholder"
                className="w-full mb-8"
              />
              <img
                style={{
                  // Optional: a simple box-shadow
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                }}
                src="/work/google_ux_design_certificate_project/19.png"
                alt="Competitive audit placeholder"
                className="w-full mb-8"
              />
              <img
                style={{
                  // Optional: a simple box-shadow
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                }}
                src="/work/google_ux_design_certificate_project/20.png"
                alt="Competitive audit placeholder"
                className="w-full mb-8"
              />
              <img
                style={{
                  // Optional: a simple box-shadow
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                }}
                src="/work/google_ux_design_certificate_project/21.png"
                alt="Competitive audit placeholder"
                className="w-full mb-8"
              />
              <img
                style={{
                  // Optional: a simple box-shadow
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                }}
                src="/work/google_ux_design_certificate_project/22.png"
                alt="Competitive audit placeholder"
                className="w-full mb-8"
              />
            </section>

            {/* Starting the design (h2, border preserved) */}
            <section id="starting-the-design" className="py-8 border-t border-gray-400 scroll-mt-32">
              <h2 className="text-heading-s-120 md:text-heading-m-120 font-inter mb-4">{t('startingTheDesign')}</h2>
              <img
                style={{
                  // Optional: a simple box-shadow
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                }}
                src="/work/google_ux_design_certificate_project/23.png"
                alt="Starting the design placeholder"
                className="w-full mb-8"
              />
            </section>

            {/* User flow */}
            <section id="user-flow" className="py-4 scroll-mt-32">
              <h3 className="text-heading-xs-120 md:text-heading-s-120 font-inter mb-2">{t('userFlow')}</h3>
              <img
                style={{
                  // Optional: a simple box-shadow
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                }}
                src="/work/google_ux_design_certificate_project/24.png"
                alt="User flow placeholder"
                className="w-full mb-8"
              />
            </section>

            {/* Storyboard */}
            <section id="storyboard" className="py-4 scroll-mt-32">
              <h3 className="text-heading-xs-120 md:text-heading-s-120 font-inter mb-2">{t('storyboard')}</h3>
              <img
                style={{
                  // Optional: a simple box-shadow
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                }}
                src="/work/google_ux_design_certificate_project/25.png"
                alt="Storyboard placeholder"
                className="w-full mb-8"
              />
              <img
                style={{
                  // Optional: a simple box-shadow
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                }}
                src="/work/google_ux_design_certificate_project/26.png"
                alt="Storyboard placeholder"
                className="w-full mb-8"
              />
            </section>

            {/* Paper wireframes */}
            <section id="paper-wireframes" className="py-4 scroll-mt-32">
              <h3 className="text-heading-xs-120 md:text-heading-s-120 font-inter mb-2">{t('paperWireframes')}</h3>
              <img
                style={{
                  // Optional: a simple box-shadow
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                }}
                src="/work/google_ux_design_certificate_project/27.png"
                alt="Paper wireframes placeholder"
                className="w-full mb-8"
              />
            </section>

            {/* Low-fidelity prototypes */}
            <section id="low-fidelity-prototypes" className="py-4 scroll-mt-32">
              <h3 className="text-heading-xs-120 md:text-heading-s-120 font-inter mb-2">
                {t('lowFidelityPrototypes')}
              </h3>
              <img
                style={{
                  // Optional: a simple box-shadow
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                }}
                src="/work/google_ux_design_certificate_project/28.png"
                alt="Low-fidelity prototypes placeholder"
                className="w-full mb-8"
              />
              <img
                style={{
                  // Optional: a simple box-shadow
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                }}
                src="/work/google_ux_design_certificate_project/29.png"
                alt="Low-fidelity prototypes placeholder"
                className="w-full mb-8"
              />
              <img
                style={{
                  // Optional: a simple box-shadow
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                }}
                src="/work/google_ux_design_certificate_project/30.png"
                alt="Low-fidelity prototypes placeholder"
                className="w-full mb-8"
              />
              <img
                style={{
                  // Optional: a simple box-shadow
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                }}
                src="/work/google_ux_design_certificate_project/31.png"
                alt="Low-fidelity prototypes placeholder"
                className="w-full mb-8"
              />
            </section>

            {/* Refining the design (h2, border preserved) */}
            <section id="refining-the-design" className="py-8 border-t border-gray-400 scroll-mt-32">
              <h2 className="text-heading-s-120 md:text-heading-m-120 font-inter mb-4">{t('refiningTheDesign')}</h2>
              <img
                style={{
                  // Optional: a simple box-shadow
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                }}
                src="/work/google_ux_design_certificate_project/36.png"
                alt="Refining the design placeholder"
                className="w-full mb-8"
              />
              <img
                style={{
                  // Optional: a simple box-shadow
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                }}
                src="/work/google_ux_design_certificate_project/37.png"
                alt="Refining the design placeholder"
                className="w-full mb-8"
              />
            </section>

            {/* Mockups */}
            <section id="mockups" className="py-4 scroll-mt-32">
              <h3 className="text-heading-xs-120 md:text-heading-s-120 font-inter mb-2">{t('mockups')}</h3>
              <img
                style={{
                  // Optional: a simple box-shadow
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                }}
                src="/work/google_ux_design_certificate_project/38.png"
                alt="Mockups placeholder"
                className="w-full mb-8"
              />
            </section>

            {/* Going forward (h2, border preserved) */}
            <section id="going-forward" className="py-8 border-t border-gray-400 scroll-mt-32">
              <h2 className="text-heading-s-120 md:text-heading-m-120 font-inter mb-4">{t('goingForward')}</h2>
              <img
                style={{
                  // Optional: a simple box-shadow
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                }}
                src="/work/google_ux_design_certificate_project/39.png"
                alt="Going forward placeholder"
                className="w-full mb-8"
              />
              <img
                style={{
                  // Optional: a simple box-shadow
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                }}
                src="/work/google_ux_design_certificate_project/40.png"
                alt="Going forward placeholder"
                className="w-full mb-8"
              />
              <img
                style={{
                  // Optional: a simple box-shadow
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                }}
                src="/work/google_ux_design_certificate_project/41.png"
                alt="Going forward placeholder"
                className="w-full mb-8"
              />
            </section>
          </div>

          {/* Sidebar - Hidden on mobile */}
          <div className="hidden md:flex md:w-1/4 pl-4 pt-8 items-start justify-center ">
            <nav className="sticky top-24">
              <ul className="space-y-3">
                {/* Project overview */}
                <li>
                  <button
                    onClick={() => scrollToSection('overview')}
                    className={
                      activeSection === 'overview'
                        ? 'text-left text-body-l-140 font-inter opacity-100 font-medium'
                        : 'text-left text-body-l-140 font-inter opacity-50'
                    }
                  >
                    {t('projectOverview')}
                  </button>
                </li>

                {/* Understanding the User */}
                <li>
                  <button
                    onClick={() => scrollToSection('understanding-the-user')}
                    className={
                      activeSection === 'understanding-the-user'
                        ? 'text-left text-body-l-140 font-inter opacity-100 font-medium'
                        : 'text-left text-body-l-140 font-inter opacity-50'
                    }
                  >
                    {t('understandingTheUser')}
                  </button>
                </li>

                {/* subheadings */}
                <div className="subheadings flex flex-col pl-4 gap-1">
                  {/* Secondary research */}
                  <button
                    onClick={() => scrollToSection('secondary-research')}
                    className={
                      activeSection === 'secondary-research'
                        ? 'text-left text-body-l-140 font-inter opacity-100 font-medium ml-4'
                        : 'text-left text-body-l-140 font-inter opacity-50 ml-4'
                    }
                  >
                    {t('secondaryResearch')}
                  </button>
                  {/* Personas */}
                  <button
                    onClick={() => scrollToSection('personas')}
                    className={
                      activeSection === 'personas'
                        ? 'text-left text-body-l-140 font-inter opacity-100 font-medium ml-4'
                        : 'text-left text-body-l-140 font-inter opacity-50 ml-4'
                    }
                  >
                    {t('personas')}
                  </button>
                  {/* Empathy map */}
                  <button
                    onClick={() => scrollToSection('empathy-map')}
                    className={
                      activeSection === 'empathy-map'
                        ? 'text-left text-body-l-140 font-inter opacity-100 font-medium ml-4'
                        : 'text-left text-body-l-140 font-inter opacity-50 ml-4'
                    }
                  >
                    {t('empathyMap')}
                  </button>
                  {/* Pain points */}
                  <button
                    onClick={() => scrollToSection('pain-points')}
                    className={
                      activeSection === 'pain-points'
                        ? 'text-left text-body-l-140 font-inter opacity-100 font-medium ml-4'
                        : 'text-left text-body-l-140 font-inter opacity-50 ml-4'
                    }
                  >
                    {t('painPoints')}
                  </button>
                  {/* User journey map */}
                  <button
                    onClick={() => scrollToSection('user-journey-map')}
                    className={
                      activeSection === 'user-journey-map'
                        ? 'text-left text-body-l-140 font-inter opacity-100 font-medium ml-4'
                        : 'text-left text-body-l-140 font-inter opacity-50 ml-4'
                    }
                  >
                    {t('userJourneyMap')}
                  </button>
                  {/* Value Proposition Canvas */}
                  <button
                    onClick={() => scrollToSection('value-proposition-canvas')}
                    className={
                      activeSection === 'value-proposition-canvas'
                        ? 'text-left text-body-l-140 font-inter opacity-100 font-medium ml-4'
                        : 'text-left text-body-l-140 font-inter opacity-50 ml-4'
                    }
                  >
                    {t('valuePropositionCanvas')}
                  </button>
                  {/* Feature Ideas */}
                  <button
                    onClick={() => scrollToSection('feature-ideas')}
                    className={
                      activeSection === 'feature-ideas'
                        ? 'text-left text-body-l-140 font-inter opacity-100 font-medium ml-4'
                        : 'text-left text-body-l-140 font-inter opacity-50 ml-4'
                    }
                  >
                    {t('featureIdeas')}
                  </button>
                  {/* Competitive audit */}
                  <button
                    onClick={() => scrollToSection('competitive-audit')}
                    className={
                      activeSection === 'competitive-audit'
                        ? 'text-left text-body-l-140 font-inter opacity-100 font-medium ml-4'
                        : 'text-left text-body-l-140 font-inter opacity-50 ml-4'
                    }
                  >
                    {t('competitiveAudit')}
                  </button>
                </div>

                {/* Starting the design */}
                <li>
                  <button
                    onClick={() => scrollToSection('starting-the-design')}
                    className={
                      activeSection === 'starting-the-design'
                        ? 'text-left text-body-l-140 font-inter opacity-100 font-medium'
                        : 'text-left text-body-l-140 font-inter opacity-50'
                    }
                  >
                    {t('startingTheDesign')}
                  </button>
                </li>

                {/* subheadings */}
                <div className="subheadings flex flex-col pl-4 gap-1">
                  {/* User flow */}
                  <button
                    onClick={() => scrollToSection('user-flow')}
                    className={
                      activeSection === 'user-flow'
                        ? 'text-left text-body-l-140 font-inter opacity-100 font-medium ml-4'
                        : 'text-left text-body-l-140 font-inter opacity-50 ml-4'
                    }
                  >
                    {t('userFlow')}
                  </button>
                  {/* Storyboard */}
                  <button
                    onClick={() => scrollToSection('storyboard')}
                    className={
                      activeSection === 'storyboard'
                        ? 'text-left text-body-l-140 font-inter opacity-100 font-medium ml-4'
                        : 'text-left text-body-l-140 font-inter opacity-50 ml-4'
                    }
                  >
                    {t('storyboard')}
                  </button>
                  {/* Paper wireframes */}
                  <button
                    onClick={() => scrollToSection('paper-wireframes')}
                    className={
                      activeSection === 'paper-wireframes'
                        ? 'text-left text-body-l-140 font-inter opacity-100 font-medium ml-4'
                        : 'text-left text-body-l-140 font-inter opacity-50 ml-4'
                    }
                  >
                    {t('paperWireframes')}
                  </button>
                  {/* Low-fidelity prototypes */}
                  <button
                    onClick={() => scrollToSection('low-fidelity-prototypes')}
                    className={
                      activeSection === 'low-fidelity-prototypes'
                        ? 'text-left text-body-l-140 font-inter opacity-100 font-medium ml-4'
                        : 'text-left text-body-l-140 font-inter opacity-50 ml-4'
                    }
                  >
                    {t('lowFidelityPrototypes')}
                  </button>
                </div>

                {/* Refining the design */}
                <li>
                  <button
                    onClick={() => scrollToSection('refining-the-design')}
                    className={
                      activeSection === 'refining-the-design'
                        ? 'text-left text-body-l-140 font-inter opacity-100 font-medium'
                        : 'text-left text-body-l-140 font-inter opacity-50'
                    }
                  >
                    {t('refiningTheDesign')}
                  </button>
                </li>

                {/* subheadings */}
                <div className="subheadings flex flex-col pl-4 gap-1">
                  {/* Mockups */}
                  <button
                    onClick={() => scrollToSection('mockups')}
                    className={
                      activeSection === 'mockups'
                        ? 'text-left text-body-l-140 font-inter opacity-100 font-medium ml-4'
                        : 'text-left text-body-l-140 font-inter opacity-50 ml-4'
                    }
                  >
                    {t('mockups')}
                  </button>
                </div>

                {/* Going forward */}
                <li>
                  <button
                    onClick={() => scrollToSection('going-forward')}
                    className={
                      activeSection === 'going-forward'
                        ? 'text-left text-body-l-140 font-inter opacity-100 font-medium'
                        : 'text-left text-body-l-140 font-inter opacity-50'
                    }
                  >
                    {t('goingForward')}
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

export default GoogleUXDesignCertificateProject;
