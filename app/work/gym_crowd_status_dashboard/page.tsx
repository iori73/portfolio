'use client';
import React, { useState, useEffect } from 'react';
import BackToTopButton from '@/src/compositions/BackToTopButton';
import TechnicalTooltip from '@/components/TechnicalTooltip';
import AnnotatedSystemDiagram from '@/components/AnnotatedSystemDiagram';
import InteractiveChart from '@/components/InteractiveChart';
import { useLanguage, useJPFontSize } from '@/src/lib/i18n';
import { MoveUpRight } from 'lucide-react';

const GymDashboardPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const { t } = useLanguage();
  const { jpFontSize } = useJPFontSize();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'performance-metrics', 'design-process', 'solution', 'impact-reflection'];
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
      {/* Hero Section - Static Image */}
      <section className="mb-8">
        <div className="max-w-[1152px] w-full mx-auto px-4">
          <img
            src="/figma-reference/gcsd_thumbnail.svg"
            alt="Gym Dashboard Thumbnail"
            className="w-full h-auto rounded-xl"
          />
        </div>
      </section>

      {/* Project Info */}
      <section className="  pt-4 pb-8">
        <div className="max-w-[896px] w-full mx-auto">
          <div className="flex items-center gap-4 mb-4 flex-wrap lg:flex-nowrap">
            <div className="flex items-center gap-2">
              <h1 className="text-heading-s-120 md:text-heading-s-120 font-merriweather">
                <a
                  href="https://crowd-data-dashboard-v2.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-600 transition-colors"
                >
                  {t('gymDashboardTitle')}
                </a>
              </h1>
              <a
                href="https://crowd-data-dashboard-v2.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group transition-all duration-300 hover:scale-120"
              >
                <MoveUpRight
                  className="w-6 h-6 text-gray-600 group-hover: transition-colors duration-300"
                />
              </a>
            </div>
            <div className="flex gap-2">
              <span className="text-body-s-140 md:text-body-l-140 font-space-mono px-2 py-1 rounded-[16px] bg-[#f5f5f7] text-[#696969] whitespace-nowrap">
                UI
              </span>
              <span className="text-body-s-140 md:text-body-l-140 font-space-mono px-2 py-1 rounded-[16px] bg-[#f5f5f7] text-[#696969] whitespace-nowrap">
                Context Engineering
              </span>
            </div>
          </div>

          <p className="text-heading-xxs-120 font-inter text-gray-600 mb-8">{t('gymDashboardDescription')}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <h3 className="text-caption-m-120 font-jetbrains-mono text-gray-500 mb-2">{t('timeline')}</h3>
              <p className="text-body-l-140">{t('gymTimeline')}</p>
            </div>
            <div>
              <h3 className="text-caption-m-120 font-jetbrains-mono text-gray-500 mb-2">{t('mySkills')}</h3>
              <p className="text-body-l-140">{t('gymSkills')}</p>
            </div>
            <div>
              <h3 className="text-caption-m-120 font-jetbrains-mono text-gray-500 mb-2">{t('type')}</h3>
              <p className="text-body-l-140">{t('personalProject')}</p>
            </div>
            <div>
              <h3 className="text-caption-m-120 font-jetbrains-mono text-gray-500 mb-2">{t('deliverables')}</h3>
              <p className="text-body-l-140">{t('gymDeliverables')}</p>
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
              <h2 className="text-heading-s-120 md:text-heading-m-120 font-merriweather mb-6">{t('overview')}</h2>

              <p className={`mb-6 font-inter ${jpFontSize('text-body-s-140', 'text-body-l-140')}`}>
                {t('gymMainOverviewText')}
              </p>

              <p className={`mb-6 font-inter ${jpFontSize('text-body-s-140', 'text-body-l-140')}`}>
                {t('gymRoleDescriptionFull')}
              </p>
            </section>

            {/* Performance Metrics Section */}
            <section id="performance-metrics" className="py-8">
              <h2 className="text-heading-s-120 md:text-heading-m-120 font-merriweather mb-6">
                {t('gymPerformanceMetrics')}
              </h2>

              {/* System Architecture Diagram */}
              <div className="mb-6">
                <AnnotatedSystemDiagram />
              </div>

              <ul className={`list-disc pl-5 space-y-2 font-inter ${jpFontSize('text-body-s-140', 'text-body-l-140')}`}>
                <li>{t('gymCollectedDataPoints')}</li>
                <li>{t('gymOCRSuccessRate')}</li>
                <li>{t('gymSystemUptimeRate')}</li>
              </ul>
            </section>

            {/* Design Process Section */}
            <section id="design-process" className="py-8">
              <h2 className="text-heading-s-120 md:text-heading-m-120 font-merriweather mb-6">{t('designProcess')}</h2>
              <p className={`mb-4 font-inter ${jpFontSize('text-body-s-140', 'text-body-l-140')}`}>
                {t('gymDesignProcessText')}
              </p>
              <ol
                className={`list-decimal pl-5 mb-4 space-y-4 font-inter ${jpFontSize(
                  'text-body-s-140',
                  'text-body-l-140',
                )}`}
              >
                <li>{t('gymDesignStep1')}</li>
                <li>{t('gymDesignStep2')}</li>
                <li>{t('gymDesignStep3')}</li>
              </ol>
            </section>

            {/* Solution Section */}
            <section id="solution" className="py-8">
              <h2 className="text-heading-s-120 md:text-heading-m-120 font-merriweather mb-6">{t('solution')}</h2>

              <div className="mb-8">
                <h3 className="text-heading-xxs-120 font-merriweather mb-4">{t('gymSmartDataCollection')}</h3>
                <p className={`mb-4 font-inter ${jpFontSize('text-body-s-140', 'text-body-l-140')}`}>
                  {t('gymDataCollectionText1')}
                </p>
                <p className={`mb-4 font-inter ${jpFontSize('text-body-s-140', 'text-body-l-140')}`}>
                  {t('gymDataCollectionText2')}
                </p>
                <div className="grid grid-cols-1 gap-4 mt-6">
                  {/* <div className="bg-gray-100 rounded-xl p-6 text-center">
                    <p className="text-body-s-140 italic text-gray-600">{t('gymIOSAutomationWorkflow')}</p>
                    <p className="text-body-xs-140 mt-2 text-gray-500">{t('gymIOSWorkflowSteps')}</p>
                  </div> */}
                  <div className="relative w-full bg-white rounded-xl border border-gray-200 overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div
                        className="w-full h-full"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23666666' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                      ></div>
                    </div>

                    {/* Image content */}
                    <div className="relative p-6">
                      <img
                        src="/figma-reference/AppleShortcut_Automation.png"
                        alt="Apple Shortcuts Automation Workflow"
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-heading-xxs-120 font-merriweather mb-4">{t('gymHighAccuracyOCR')}</h3>
                <p className={`mb-4 font-inter ${jpFontSize('text-body-s-140', 'text-body-l-140')}`}>
                  <TechnicalTooltip content="コンピュータビジョン用ライブラリで、画像処理・機械学習アルゴリズムを提供">
                    OpenCV
                  </TechnicalTooltip>
                  {t('gymOCRText2')}
                </p>
                <ol
                  className={`list-decimal pl-5 mb-4 space-y-2 font-inter ${jpFontSize(
                    'text-body-s-140',
                    'text-body-l-140',
                  )}`}
                >
                  <li>
                    <TechnicalTooltip content="画像をカラーから白黒に変換するOpenCV関数">
                      <code>cv2.cvtColor</code>
                    </TechnicalTooltip>
                    {t('gymOCRStep1')}
                  </li>
                  <li>
                    <TechnicalTooltip content="非局所平均アルゴリズムで画像ノイズを除去するOpenCV関数">
                      <code>cv2.fastNlMeansDenoising</code>
                    </TechnicalTooltip>
                    {t('gymOCRStep2')}
                  </li>
                  <li>
                    <TechnicalTooltip content="画像の局所的なコントラストを適応的に強化するヒストグラム均等化手法">
                      <code>cv2.createCLAHE</code>
                    </TechnicalTooltip>
                    {t('gymOCRStep3')}
                  </li>
                </ol>
                <p className={`mb-4 font-inter ${jpFontSize('text-body-s-140', 'text-body-l-140')}`}>
                  <TechnicalTooltip content="Googleが開発したオープgymOCRAccuracyImprovementンソースOCRエンジン、100以上の言語をサポート">
                    Tesseract OCR
                  </TechnicalTooltip>
                  と
                  <TechnicalTooltip content="PaddleOCRベースのOCRライブラリ、多言語対応でPython実装">
                    EasyOCR
                  </TechnicalTooltip>
                  {t('gymOCRText3')}
                </p>
                {/* <div className="grid grid-cols-1 gap-4 mt-6">
                  <div className="bg-gray-100 rounded-xl p-6 text-center">
                    <p className="text-body-s-140 italic text-gray-600">{t('gymOCRPipeline')}</p>
                    <p className="text-body-xs-140 mt-2 text-gray-500">{t('gymOCRPipelineSteps')}</p>
                  </div>
                </div> */}
              </div>

              <div className="mb-8">
                <h3 className="text-heading-xxs-120 font-merriweather mb-4">{t('gymCICDInfrastructure')}</h3>
                <p className={`mb-4 font-inter ${jpFontSize('text-body-s-140', 'text-body-l-140')}`}>
                  {t('gymGitHubActionsSuccess')} {t('gymFailureCausesProcess')}
                </p>
                <div className="mb-4">
                  <p className={`font-inter ${jpFontSize('text-body-s-140', 'text-body-l-140')} font-bold`}>
                    {t('gymFailureHistory')}
                  </p>
                  <ul
                    className={`list-disc pl-5 space-y-1 font-inter ${jpFontSize(
                      'text-body-s-140',
                      'text-body-l-140',
                    )}`}
                  >
                    <li>{t('gymFailureRun5')}</li>
                    <li>{t('gymFailureRun67')}</li>
                  </ul>
                </div>
                <div className="mb-4">
                  <p className={`font-inter ${jpFontSize('text-body-s-140', 'text-body-l-140')} font-bold`}>
                    {t('gymDecisiveFix')}
                  </p>
                  <p className={`mb-2 font-inter ${jpFontSize('text-body-s-140', 'text-body-l-140')}`}>
                    {t('gymDecisiveFixText')}
                  </p>
                </div>
                <div className="mb-4">
                  <p className={`font-inter ${jpFontSize('text-body-s-140', 'text-body-l-140')} font-bold`}>
                    {t('gymTwoStageSync')}
                  </p>
                  <ol
                    className={`list-decimal pl-5 space-y-1 font-inter ${jpFontSize(
                      'text-body-s-140',
                      'text-body-l-140',
                    )}`}
                  >
                    <li>{t('gymSyncStep1')}</li>
                    <li>
                      <TechnicalTooltip content="macOSのシステムデーモン管理ツール、定期実行や自動起動を制御">
                        launchd
                      </TechnicalTooltip>
                      {t('gymSyncStep2')}
                    </li>
                  </ol>
                </div>
                <p className={`mb-4 font-inter ${jpFontSize('text-body-s-140', 'text-body-l-140')}`}>
                  {t('gymSyncResult')}
                </p>
                {/* <div className="grid grid-cols-1 gap-4 mt-6">
                  <div className="bg-gray-100 rounded-xl p-6 text-center">
                    <p className="text-body-s-140 italic text-gray-600">{t('gymAutomationPipeline')}</p>
                    <p className="text-body-xs-140 mt-2 text-gray-500">{t('gymPipelineSteps')}</p>
                  </div>
                </div> */}
              </div>
            </section>

            {/* Impact & Reflection Section */}
            <section id="impact-reflection" className="py-8">
              <h2 className="text-heading-s-120 md:text-heading-m-120 font-merriweather mb-6">
                {t('impactReflection')}
              </h2>

              <div className="mb-6">
                <h3 className="text-heading-xxs-120 font-merriweather mb-3">{t('gymProjectLearnings')}</h3>
                <p className={`mb-4 font-inter ${jpFontSize('text-body-s-140', 'text-body-l-140')}`}>
                  {t('gymLearningText1')}
                </p>
                <p className={`mb-4 font-inter ${jpFontSize('text-body-s-140', 'text-body-l-140')}`}>
                  {t('gymLearningText2')}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-heading-xxs-120 font-merriweather mb-3">{t('gymFutureProspects')}</h3>
                <p className={`mb-4 font-inter ${jpFontSize('text-body-s-140', 'text-body-l-140')}`}>
                  {t('gymProspectsText')}
                </p>
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
                    className={
                      activeSection === 'overview'
                        ? 'text-left text-body-xl-140 font-inter transition-transform duration-900 scale-110'
                        : 'text-left text-heading-xxxs-120 font-inter transition-transform duration-900 scale-100 opacity-50'
                    }
                  >
                    {t('navOverview')}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('performance-metrics')}
                    className={
                      activeSection === 'performance-metrics'
                        ? 'text-left text-body-xl-140 font-inter transition-transform duration-900 scale-110'
                        : 'text-left text-heading-xxxs-120 font-inter transition-transform duration-900 scale-100 opacity-50'
                    }
                  >
                    {t('gymPerformanceMetrics')}
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
                    {t('navDesignProcess')}
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
                    {t('navSolution')}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('impact-reflection')}
                    className={
                      activeSection === 'impact-reflection'
                        ? 'text-left text-body-xl-140 font-inter transition-transform duration-900 scale-110'
                        : 'text-left text-heading-xxxs-120 font-inter transition-transform duration-900 scale-100 opacity-50'
                    }
                  >
                    {t('navImpactReflection')}
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

export default GymDashboardPage;
