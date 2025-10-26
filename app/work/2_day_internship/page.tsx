// // // // /Users/i_kawano/Documents/portfolio/app/work/2_day_internship/page.tsx

'use client';
import React, { useState, useEffect } from 'react';
import BackToTopButton from '@/src/compositions/BackToTopButton';
import { useLanguage, useJPFontSize } from '@/src/lib/i18n';

const CaseStudyPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const { t } = useLanguage();
  const { jpFontSize } = useJPFontSize();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Safe function to render text with colored letter placeholders
  const formatScenarioText = (text: string) => {
    const parts = text.split(/(\{[A-D]\})/);
    return parts.map((part, index) => {
      if (part === '{A}') {
        return <span key={index} className="text-[#ff6b6b] font-medium">A</span>;
      } else if (part === '{B}') {
        return <span key={index} className="text-[#6b88ff] font-medium">B</span>;
      } else if (part === '{C}') {
        return <span key={index} className="text-[#6b88ff] font-medium">C</span>;
      } else if (part === '{D}') {
        return <span key={index} className="text-[#6b88ff] font-medium">D</span>;
      }
      return part;
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'design-process', 'solution', 'reflection'];
      let currentSection = activeSection;
      for (const id of sections) {
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

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  return (
    <div className="font-sans my-24 md:mt-28 md:mb-16">
      <BackToTopButton />
      {/* Hero Section */}
      <section className=" ">
        <div className="max-w-[896px] w-full mx-auto">
          <div className="flex flex-wrap justify-center">
            {/* Hero Image */}
            <img src="/work/2_day_internship/thumbnail.png" alt="Phone mockups" className="w-full max-w-[896px]" />
          </div>
        </div>
      </section>

      {/* Project Info */}
      <section className="  pt-4 pb-8">
        <div className="max-w-[896px] w-full mx-auto">
          <div className="flex items-center gap-6 mb-4 flex-wrap md:flex-nowrap">
            <h1 className="text-heading-s-120 md:text-heading-m-120 font-merriweather">2 Day Internship</h1>
            <div className="flex gap-2">
              <span className="text-body-l-140 font-space-mono px-2 py-1 rounded-[16px] bg-[#f5f5f7] text-[#696969]">
                UI
              </span>
              <span className="text-body-l-140 font-space-mono px-2 py-1 rounded-[16px] bg-[#f5f5f7] text-[#696969]">
                Rapid Design
              </span>
            </div>
          </div>

          {/* 説明文: Body/XL_140 */}
          <p className="text-heading-xxs-120 font-inter text-gray-600 mb-8">{t('internshipDescription')}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              {/* キャプション: Caption/XL_120 (font-jetbrains-mono) */}
              <h3 className="text-caption-m-120 font-jetbrains-mono text-gray-500 mb-2">Timeline</h3>
              {/* 小テキスト: Body/L_140 */}
              <p className="text-body-l-140 ">{t('internTimeline')}</p>
            </div>
            <div>
              <h3 className="text-caption-m-120 font-jetbrains-mono text-gray-500 mb-2">My Skills</h3>
              <p className="text-body-l-140 ">{t('internSkills')}</p>
            </div>
            <div>
              <h3 className="text-caption-m-120 font-jetbrains-mono text-gray-500 mb-2">Type</h3>
              <p className="text-body-l-140 ">{t('solo')}</p>
            </div>
            <div>
              <h3 className="text-caption-m-120 font-jetbrains-mono text-gray-500 mb-2">Deliverables</h3>
              <p className="text-body-l-140 ">{t('wireframes')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[1152px] w-full mx-auto">
        <div className="flex flex-col md:flex-row">
          {/* Main Content */}
          <div className="md:w-3/4">
            {/* Overview Section */}
            <section id="overview" className="w-full mx-auto py-8   text-[#002a38]">
              {/* Heading: L_M_120 */}
              <h2 className="text-heading-s-120 md:text-heading-m-120 font-merriweather mb-6">{t('overview')}</h2>

              {/* 残りのテキスト: Body/XL_140 */}
              <p className={`mb-6 font-inter ${jpFontSize('text-body-s-140', 'text-body-l-140')}`}>
                {t('overviewText')}
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-6">
                <div className="lg:col-span-6">
                  <p className={`mb-4 font-inter ${jpFontSize('text-body-s-140', 'text-body-l-140')}`}>
                    {t('scenarioIntro')}
                  </p>

                  <ul className={`space-y-2 mb-6 ${jpFontSize('text-body-s-140', 'text-body-l-140')}`}>
                    <li className="flex gap-2">
                      <span className="text-lg">•</span>
                      <div>{formatScenarioText(t('scenarioBullet1'))}</div>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-lg">•</span>
                      <div>{formatScenarioText(t('scenarioBullet2'))}</div>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-lg">•</span>
                      <div>{formatScenarioText(t('scenarioBullet3'))}</div>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-lg">•</span>
                      <div>{formatScenarioText(t('scenarioBullet4'))}</div>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-lg">•</span>
                      <div>{formatScenarioText(t('scenarioBullet5'))}</div>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-lg">•</span>
                      <div>{formatScenarioText(t('scenarioBullet6'))}</div>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-lg">•</span>
                      <div>{formatScenarioText(t('scenarioBullet7'))}</div>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-lg">•</span>
                      <div>{formatScenarioText(t('scenarioBullet8'))}</div>
                    </li>
                  </ul>
                </div>

                <div className="lg:col-span-6 relative">
                  <div className="absolute inset-0 bg-gray-100 rounded-[40px] -z-10"></div>
                  <div className="relative pt-0 md:pt-8">
                    <img
                      src="/work/2_day_internship/2_day_internship-image.png"
                      alt="Project overview diagram"
                      className="w-full max-w-lg mx-auto"
                    />
                  </div>
                </div>
              </div>

              <p className={`font-inter ${jpFontSize('text-body-s-140', 'text-body-l-140')}`}>{t('internRole')}</p>
            </section>

            {/* Problem Section
            <section className="py-8">
              <h2 className="text-heading-s-120 md:text-heading-m-120 font-inter mb-6">Problem</h2>
              <p className="mb-4 text-body-m-140 md:text-body-l-140 ">
                Our user research process highlighted several potential challenges...
              </p>
              <ul className="list-disc pl-5 mb-4 space-y-2 text-body-m-140 md:text-body-l-140 ">
                <li>Difficulty coordinating dates...</li>
                <li>Confirming availability...</li>
                <li>Existing scheduling tools lacked workflow integration.</li>
                <li>Mobile-unfriendly interfaces slowed the process.</li>
              </ul>
            </section> */}

            {/* Design Process Section */}
            <section id="design-process" className="py-8">
              <h2 className="text-heading-s-120 md:text-heading-m-120 font-merriweather mb-6">{t('designProcess')}</h2>
              <p className={`mb-4 font-inter ${jpFontSize('text-body-s-140', 'text-body-l-140')}`}>
                {t('designProcessText')}
              </p>
              <ol
                className={`list-decimal pl-5 mb-4 space-y-4 font-inter ${jpFontSize(
                  'text-body-s-140',
                  'text-body-l-140',
                )}`}
              >
                <li>
                  <strong>{t('infoGatheringTitle')}:</strong> {t('infoGathering')}
                </li>
                <li>
                  <strong>{t('prototypingTitle')}:</strong> {t('prototyping')}
                </li>
                <li>
                  <strong>{t('improvementsTitle')}:</strong> {t('improvements')}
                </li>
              </ol>
            </section>

            {/* Solution Section */}
            <section id="solution" className="py-8">
              <h2 className="text-heading-s-120 md:text-heading-m-120 font-merriweather mb-6">{t('solution')}</h2>
              <div className="mb-8">
                <h3 className="text-heading-xxs-120 font-merriweather mb-4">{t('conditionSearch')}</h3>
                <p className={`mb-4 font-inter ${jpFontSize('text-body-s-140', 'text-body-l-140')}`}>
                  {t('conditionSearchText')}
                </p>
                <div className="grid grid-cols-1 gap-4 mt-6">
                  <img src="/work/2_day_internship/frames1.png" alt="Condition search wireframe 1" className="w-full" />
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-heading-xxs-120 font-merriweather mb-4">{t('searchResults')}</h3>
                <p className={`mb-4 font-inter ${jpFontSize('text-body-s-140', 'text-body-l-140')}`}>
                  {t('searchResultsText1')}
                </p>
                <p className={`mb-4 font-inter ${jpFontSize('text-body-s-140', 'text-body-l-140')}`}>
                  {t('searchResultsText2')}
                </p>
                <div className="grid grid-cols-1 gap-4 mt-6">
                  <img src="/work/2_day_internship/frames2.png" alt="Condition search wireframe 2" className="w-full" />
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-heading-xxs-120 font-merriweather mb-4">{t('sendRequest')}</h3>
                <p className={`mb-4 font-inter ${jpFontSize('text-body-s-140', 'text-body-l-140')}`}>
                  {t('sendRequestText')}
                </p>
                <div className="grid grid-cols-1 gap-4 mt-6">
                  <img src="/work/2_day_internship/frames3.png" alt="Condition search wireframe 3" className="w-full" />
                </div>
              </div>
            </section>

            {/* Reflection Section */}
            <section id="reflection" className="py-8">
              <h2 className="text-heading-s-120 md:text-heading-m-120 font-merriweather mb-6">{t('reflection')}</h2>
              <div className="mb-6">
                <h3 className="text-heading-xxs-120 font-merriweather mb-3">{t('impressions')}</h3>
                <ul
                  className={`list-disc pl-5 space-y-2 font-inter ${jpFontSize('text-body-s-140', 'text-body-l-140')}`}
                >
                  <li>{t('impressionsPoint1')}</li>
                  <li>{t('impressionsPoint2')}</li>
                  <li>{t('impressionsPoint3')}</li>
                </ul>
              </div>
              <div className="mb-6">
                <h3 className="text-heading-xxs-120 font-merriweather mb-3">{t('reflectionTitle')}</h3>
                <ul
                  className={`list-disc pl-5 space-y-2 font-inter ${jpFontSize('text-body-s-140', 'text-body-l-140')}`}
                >
                  <li>{t('reflectionPoint1')}</li>
                  <li>{t('reflectionPoint2')}</li>
                  <li>{t('reflectionPoint3')}</li>
                </ul>
              </div>
            </section>
          </div>

          {/* Sidebar - Hidden on mobile */}
          <div className="hidden md:flex md:w-1/4 pl-4 pt-8 items-start justify-center">
            <nav className="sticky top-24">
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => scrollToSection('overview')}
                    // 非アクティブ: scale-100, opacity-50
                    // アクティブ:   scale-110, opacity-100
                    className={
                      activeSection === 'overview'
                        ? 'text-left text-body-xl-140 font-inter transition-transform duration-900 scale-110'
                        : 'text-left text-heading-xxxs-120 font-inter transition-transform duration-900 scale-100 opacity-50'
                    }
                  >
                    {t('overview')}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('design-process')}
                    className={
                      activeSection === 'design-process'
                        ? 'text-left text-body-xl-140 font-inter transition-transform duration-900 scale-110'
                        : 'text-left text-heading-xxxs-120 font-inter transition-transform duration-900 scale-100 opacity-50'
                    }
                  >
                    {t('designProcess')}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('solution')}
                    className={
                      activeSection === 'solution'
                        ? 'text-left text-body-xl-140 font-inter transition-transform duration-900 scale-110'
                        : 'text-left text-heading-xxxs-120 font-inter transition-transform duration-900 scale-100 opacity-50'
                    }
                  >
                    {t('solution')}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('reflection')}
                    className={
                      activeSection === 'reflection'
                        ? 'text-left text-body-xl-140 font-inter transition-transform duration-900 scale-110'
                        : 'text-left text-heading-xxxs-120 font-inter transition-transform duration-900 scale-100 opacity-50'
                    }
                  >
                    {t('reflection')}
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

export default CaseStudyPage;

// "use client";
// import CaseStudyLayout from "@/components/CaseStudyLayout";
// import twoDayInternshipData from "@/data/2DayInternshipData";

// export default function twoDayInternshipPage() {
//   return <CaseStudyLayout data={twoDayInternshipData} />;
// }
