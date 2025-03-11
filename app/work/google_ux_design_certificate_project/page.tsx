// // // // /Users/i_kawano/Documents/portfolio/app/work/google_ux_design_certificate_project/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import BackToTopButton from '@/src/compositions/BackToTopButton';

const GoogleUXDesignCertificateProject: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('overview');

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
    <div className="font-sans">
      <BackToTopButton />
      {/* 
        Hero Section 
        画面最上部にヘッダーが固定されているため、
        最初のセクションに pt-32 を付与し、見えなくならないように調整。
        scroll-mt-32 を付与することで、アンカーリンクで飛んだときにも
        ヘッダーと被らないようにする。
      */}
      <section className="bg-white pt-32 scroll-mt-32">
        <div className="max-w-[896px] w-full mx-auto">
          <div className="flex flex-wrap justify-center">
            {/* Hero Image */}
            <img
              style={{
                // Optional: a simple box-shadow
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                borderRadius: '8px',
              }}
              src="/work/image2.png"
              alt="Phone mockups"
              className="w-full max-w-[896px]"
            />
          </div>
        </div>
      </section>

      {/* Project Info */}
      <section id="project-info" className="bg-white pt-4 pb-8 scroll-mt-32">
        <div className="max-w-[896px] w-full mx-auto">
          <div className="flex items-center gap-6 mb-4 flex-wrap md:flex-nowrap">
            {/* モバイルでは text-heading-s-120, md以上では text-heading-m-120 */}
            <h1 className="text-heading-s-120 md:text-heading-m-120 font-sf-pro">
              Google UX Design Certificate Project
            </h1>
            <div className="flex gap-2">
              <span className="text-body-l-140 font-sf-pro px-4 py-1 rounded-full  bg-[#646464] text-[#fff]">
                Research
              </span>
              <span className="text-body-l-140 font-sf-pro px-4 py-1 rounded-full  bg-[#646464] text-[#fff]">UI</span>
              <span className="text-body-l-140 font-sf-pro px-4 py-1 rounded-full  bg-[#646464] text-[#fff]">UX</span>
            </div>
          </div>

          {/* 説明文: Body/XL_140 */}
          <p className="text-body-xl-140 font-sf-pro text-gray-600 mb-8">
            Navigating the best 100 yen shops in your neighborhood.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <h3 className="text-caption-m-120 font-sf-mono text-gray-500 mb-2">Timeline</h3>
              <p className="text-body-l-140 font-sf-pro">Apr 2024 - June 2024</p>
            </div>
            <div>
              <h3 className="text-caption-m-120 font-sf-mono text-gray-500 mb-2">My Role</h3>
              <p className="text-body-l-140 font-sf-pro">UX</p>
            </div>
            <div>
              <h3 className="text-caption-m-120 font-sf-mono text-gray-500 mb-2">Team</h3>
              <p className="text-body-l-140 font-sf-pro">Solo</p>
            </div>
            <div>
              <h3 className="text-caption-m-120 font-sf-mono text-gray-500 mb-2">Deliverables</h3>
              <p className="text-body-l-140 font-sf-pro">
                Secondary Research
                <br />
                Storyboards
                <br />
                Prototypes
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
            <section id="overview" className="w-full mx-auto py-8 bg-white text-[#002a38] scroll-mt-32">
              <h2 className="text-heading-s-120 md:text-heading-m-120 font-sf-pro mb-6">Project overview</h2>
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
              <h2 className="text-heading-s-120 md:text-heading-m-120 font-sf-pro mb-4">Understanding the User</h2>
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
              <h3 className="text-heading-xs-120 md:text-heading-s-120 font-sf-pro mb-2">Secondary research</h3>
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
              <h3 className="text-heading-xs-120 md:text-heading-s-120 font-sf-pro mb-2">Personas</h3>
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
              <h3 className="text-heading-xs-120 md:text-heading-s-120 font-sf-pro mb-2">Empathy map</h3>
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
              <h3 className="text-heading-xs-120 md:text-heading-s-120 font-sf-pro mb-2">Pain points</h3>
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
              <h3 className="text-heading-xs-120 md:text-heading-s-120 font-sf-pro mb-2">User journey map</h3>
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
              <h3 className="text-heading-xs-120 md:text-heading-s-120 font-sf-pro mb-2">Value Proposition Canvas</h3>
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
              <h3 className="text-heading-xs-120 md:text-heading-s-120 font-sf-pro mb-2">Feature Ideas</h3>
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
              <h3 className="text-heading-xs-120 md:text-heading-s-120 font-sf-pro mb-2">Competitive audit</h3>
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
              <h2 className="text-heading-s-120 md:text-heading-m-120 font-sf-pro mb-4">Starting the design</h2>
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
              <h3 className="text-heading-xs-120 md:text-heading-s-120 font-sf-pro mb-2">User flow</h3>
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
              <h3 className="text-heading-xs-120 md:text-heading-s-120 font-sf-pro mb-2">Storyboard</h3>
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
              <h3 className="text-heading-xs-120 md:text-heading-s-120 font-sf-pro mb-2">Paper wireframes</h3>
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
              <h3 className="text-heading-xs-120 md:text-heading-s-120 font-sf-pro mb-2">Low-fidelity prototypes</h3>
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
              <h2 className="text-heading-s-120 md:text-heading-m-120 font-sf-pro mb-4">Refining the design</h2>
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
              <h3 className="text-heading-xs-120 md:text-heading-s-120 font-sf-pro mb-2">Mockups</h3>
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
              <h2 className="text-heading-s-120 md:text-heading-m-120 font-sf-pro mb-4">Going forward</h2>
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
                        ? 'text-left text-body-xxl-140 font-sf-pro transition-transform duration-900 scale-110'
                        : 'text-left text-body-xl-140 font-sf-pro transition-transform duration-900 scale-100 opacity-50'
                    }
                  >
                    Project overview
                  </button>
                </li>

                {/* Understanding the User */}
                <li>
                  <button
                    onClick={() => scrollToSection('understanding-the-user')}
                    className={
                      activeSection === 'understanding-the-user'
                        ? 'text-left text-body-xxl-140 font-sf-pro transition-transform duration-900 scale-110'
                        : 'text-left text-body-xl-140 font-sf-pro transition-transform duration-900 scale-100 opacity-50'
                    }
                  >
                    Understanding the User
                  </button>
                </li>

                {/* subheadings */}
                <div className="subheadings flex flex-col pl-4 gap-1">
                  {/* Secondary research */}
                  <button
                    onClick={() => scrollToSection('secondary-research')}
                    className={
                      activeSection === 'secondary-research'
                        ? 'text-left text-body-l-140 font-sf-pro transition-transform duration-900 scale-110'
                        : 'text-left text-body-l-140 font-sf-pro transition-transform duration-900 opacity-50'
                    }
                  >
                    Secondary research
                  </button>
                  {/* Personas */}
                  <button
                    onClick={() => scrollToSection('personas')}
                    className={
                      activeSection === 'personas'
                        ? 'text-left text-body-l-140 font-sf-pro transition-transform duration-900 scale-110'
                        : 'text-left text-body-l-140 font-sf-pro transition-transform duration-900 opacity-50'
                    }
                  >
                    Personas
                  </button>
                  {/* Empathy map */}
                  <button
                    onClick={() => scrollToSection('empathy-map')}
                    className={
                      activeSection === 'empathy-map'
                        ? 'text-left text-body-l-140 font-sf-pro transition-transform duration-900 scale-110'
                        : 'text-left text-body-l-140 font-sf-pro transition-transform duration-900 opacity-50'
                    }
                  >
                    Empathy map
                  </button>
                  {/* Pain points */}
                  <button
                    onClick={() => scrollToSection('pain-points')}
                    className={
                      activeSection === 'pain-points'
                        ? 'text-left text-body-l-140 font-sf-pro transition-transform duration-900 scale-110'
                        : 'text-left text-body-l-140 font-sf-pro transition-transform duration-900 opacity-50'
                    }
                  >
                    Pain points
                  </button>
                  {/* User journey map */}
                  <button
                    onClick={() => scrollToSection('user-journey-map')}
                    className={
                      activeSection === 'user-journey-map'
                        ? 'text-left text-body-l-140 font-sf-pro transition-transform duration-900 scale-110'
                        : 'text-left text-body-l-140 font-sf-pro transition-transform duration-900 opacity-50'
                    }
                  >
                    User journey map
                  </button>
                  {/* Value Proposition Canvas */}
                  <button
                    onClick={() => scrollToSection('value-proposition-canvas')}
                    className={
                      activeSection === 'value-proposition-canvas'
                        ? 'text-left text-body-l-140 font-sf-pro transition-transform duration-900 scale-110'
                        : 'text-left text-body-l-140 font-sf-pro transition-transform duration-900 opacity-50'
                    }
                  >
                    Value Proposition Canvas
                  </button>
                  {/* Feature Ideas */}
                  <button
                    onClick={() => scrollToSection('feature-ideas')}
                    className={
                      activeSection === 'feature-ideas'
                        ? 'text-left text-body-l-140 font-sf-pro transition-transform duration-900 scale-110'
                        : 'text-left text-body-l-140 font-sf-pro transition-transform duration-900 opacity-50'
                    }
                  >
                    Feature Ideas
                  </button>
                  {/* Competitive audit */}
                  <button
                    onClick={() => scrollToSection('competitive-audit')}
                    className={
                      activeSection === 'competitive-audit'
                        ? 'text-left text-body-l-140 font-sf-pro transition-transform duration-900 scale-110'
                        : 'text-left text-body-l-140 font-sf-pro transition-transform duration-900 opacity-50'
                    }
                  >
                    Competitive audit
                  </button>
                </div>

                {/* Starting the design */}
                <li>
                  <button
                    onClick={() => scrollToSection('starting-the-design')}
                    className={
                      activeSection === 'starting-the-design'
                        ? 'text-left text-body-xxl-140 font-sf-pro transition-transform duration-900 scale-110'
                        : 'text-left text-body-xl-140 font-sf-pro transition-transform duration-900 scale-100 opacity-50'
                    }
                  >
                    Starting the design
                  </button>
                </li>

                {/* subheadings */}
                <div className="subheadings flex flex-col pl-4 gap-1">
                  {/* User flow */}
                  <button
                    onClick={() => scrollToSection('user-flow')}
                    className={
                      activeSection === 'user-flow'
                        ? 'text-left text-body-l-140 font-sf-pro transition-transform duration-900 scale-110'
                        : 'text-left text-body-l-140 font-sf-pro transition-transform duration-900 opacity-50'
                    }
                  >
                    User flow
                  </button>
                  {/* Storyboard */}
                  <button
                    onClick={() => scrollToSection('storyboard')}
                    className={
                      activeSection === 'storyboard'
                        ? 'text-left text-body-l-140 font-sf-pro transition-transform duration-900 scale-110'
                        : 'text-left text-body-l-140 font-sf-pro transition-transform duration-900 opacity-50'
                    }
                  >
                    Storyboard
                  </button>
                  {/* Paper wireframes */}
                  <button
                    onClick={() => scrollToSection('paper-wireframes')}
                    className={
                      activeSection === 'paper-wireframes'
                        ? 'text-left text-body-l-140 font-sf-pro transition-transform duration-900 scale-110'
                        : 'text-left text-body-l-140 font-sf-pro transition-transform duration-900 opacity-50'
                    }
                  >
                    Paper wireframes
                  </button>
                  {/* Low-fidelity prototypes */}
                  <button
                    onClick={() => scrollToSection('low-fidelity-prototypes')}
                    className={
                      activeSection === 'low-fidelity-prototypes'
                        ? 'text-left text-body-l-140 font-sf-pro transition-transform duration-900 scale-110'
                        : 'text-left text-body-l-140 font-sf-pro transition-transform duration-900 opacity-50'
                    }
                  >
                    Low-fidelity prototypes
                  </button>
                </div>

                {/* Refining the design */}
                <li>
                  <button
                    onClick={() => scrollToSection('refining-the-design')}
                    className={
                      activeSection === 'refining-the-design'
                        ? 'text-left text-body-xxl-140 font-sf-pro transition-transform duration-900 scale-110'
                        : 'text-left text-body-xl-140 font-sf-pro transition-transform duration-900 scale-100 opacity-50'
                    }
                  >
                    Refining the design
                  </button>
                </li>

                {/* subheadings */}
                <div className="subheadings flex flex-col pl-4 gap-1">
                  {/* Mockups */}
                  <button
                    onClick={() => scrollToSection('mockups')}
                    className={
                      activeSection === 'mockups'
                        ? 'text-left text-body-l-140 font-sf-pro transition-transform duration-900 scale-110'
                        : 'text-left text-body-l-140 font-sf-pro transition-transform duration-900 opacity-50'
                    }
                  >
                    Mockups
                  </button>
                </div>

                {/* Going forward */}
                <li>
                  <button
                    onClick={() => scrollToSection('going-forward')}
                    className={
                      activeSection === 'going-forward'
                        ? 'text-left text-body-xxl-140 font-sf-pro transition-transform duration-900 scale-110'
                        : 'text-left text-body-xl-140 font-sf-pro transition-transform duration-900 scale-100 opacity-50'
                    }
                  >
                    Going forward
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

// "use client";
// import CaseStudyLayout from "@/components/CaseStudyLayout";
// import googleUXData from "@/data/googleUXDesignCertificateProjectData";

// export default function GoogleUXDesignCertificateProjectPage() {
//   return <CaseStudyLayout data={googleUXData} />;
// }
