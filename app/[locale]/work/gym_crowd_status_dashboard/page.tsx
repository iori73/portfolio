'use client';
import React, { useState, useEffect } from 'react';
import BackToTopButton from '@/src/compositions/BackToTopButton';
import TechnicalTooltip from '@/components/TechnicalTooltip';
import AnnotatedSystemDiagram from '@/components/AnnotatedSystemDiagram';
import InteractiveChart from '@/components/InteractiveChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useTranslations, useLocale } from 'next-intl';
import { useJPFontSize, useBodyFont, useHeadingFont } from '@/src/hooks/useFonts';
import { MoveUpRight, Waves, Lightbulb, Boxes, CircleAlert, CircleCheck, Server, Users } from 'lucide-react';
import GymDashboardHero from '@/components/GymDashboardHero';

interface GymStats {
  totalRecords: number;
  dateRange: string;
  averageCrowd: number;
  peakTime: {
    time: string;
    count: number;
  };
  quietTime: {
    time: string;
    count: number;
  };
  systemUptime: number;
  operationDurationMonths: number;
  crowdednessComparison: {
    time: string;
    multiplier: number;
  };
}

const GymDashboardPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [isDesktop, setIsDesktop] = useState(false);
  const [gymStats, setGymStats] = useState<GymStats | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const t = useTranslations();
  const language = useLocale();
  const { jpFontSize } = useJPFontSize();
  const { getBodyFontClass, getBodyFontStyle } = useBodyFont();
  const { getHeadingFontClass, getHeadingFontStyle } = useHeadingFont();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Fetch gym statistics from API
  useEffect(() => {
    const fetchGymStats = async () => {
      try {
        const response = await fetch('/api/gym-stats');
        if (response.ok) {
          const data = await response.json();
          // Validate that we received valid data
          if (data && typeof data.totalRecords === 'number') {
            setGymStats(data);
          } else {
            console.error('Invalid data format received from API');
            // Keep gymStats as null to use fallback values in UI
          }
        } else {
          console.error('Failed to fetch gym stats:', response.status, response.statusText);
          // Keep gymStats as null to use fallback values in UI
        }
      } catch (error) {
        console.error('Error fetching gym stats:', error);
        // Keep gymStats as null to use fallback values in UI
      } finally {
        setIsLoadingStats(false);
      }
    };

    fetchGymStats();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'design-process', 'solution', 'impact-reflection'];
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

    const handleResize = () => {
      setIsDesktop(window.matchMedia('(min-width: 768px)').matches);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleScroll();
    handleResize();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeSection]);

  return (
    <div className="font-sans my-24 md:mt-28 md:mb-16">
      <BackToTopButton />
      {/* Hero Section - Animated */}
      <section className="mb-0 md:mb-8 -mx-6 md:mx-0">
        <div className="w-full md:max-w-7xl md:mx-auto px-0">
          <GymDashboardHero gymStats={gymStats} isLoading={isLoadingStats} />
        </div>
      </section>

      {/* Project Info */}
      <section className="pt-4 pb-8">
        <div className="max-w-[1028px]  w-full mx-auto">
          {/* Card with Title, Description, and Button */}
          <div className="rounded-xl mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
              {/* Left side: Title and Description */}
              <div className="flex-1">
                <h1 className={`text-heading-2xl md:text-heading-3xl text-black mb-3 md:mb-2 ${getHeadingFontClass()}`}>
                  Gym Crowd Status Dashboard
                </h1>
                <p className={`text-body-lg md:text-body-xl ${getBodyFontClass()} text-[#333333] tracking-[0.2px]`}>
                  {t('projects.gymDashboard.description1')}
                </p>
              </div>
              {/* Right side: Button */}
              <div className="flex-shrink-0 w-full md:w-auto">
                <a
                  href="https://crowd-data-dashboard-v2.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex items-center justify-center px-6 py-3 rounded-[100px] text-[#0000008f] hover:text-white cursor-pointer transition-[color] duration-300 whitespace-nowrap overflow-hidden group w-full md:w-auto"
                  style={{
                    background:
                      'radial-gradient(75% 150% at 100% 114.2%, rgba(210, 210, 215, 0.4) 0%, rgba(180, 180, 185, 0.4) 100%)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {/* Hover background overlay */}
                  <span
                    className="absolute inset-0 rounded-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(75% 150% at 100% 114.2%, rgba(210, 210, 215, 0.8) 0%, rgba(180, 180, 185, 0.8) 100%)',
                      backdropFilter: 'blur(8px)',
                    }}
                  />
                  <span className="relative z-10 text-body-lg md:text-body-xl font-medium">{t('common.goToSite')}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Tags */}
          {/* <div className="flex gap-2 mb-8">
            <span className="text-body-sm md:text-body-lg font-space-mono px-2 py-1 rounded-[16px] bg-[#f5f5f7] text-[#696969] whitespace-nowrap">
              UI
            </span>
            <span className="text-body-sm md:text-body-lg font-space-mono px-2 py-1 rounded-[16px] bg-[#f5f5f7] text-[#696969] whitespace-nowrap">
              Context Engineering
            </span>
          </div> */}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <span className="text-caption-lg font-space-mono font-semibold text-gray-500 mb-2 block">Timeline</span>
              <p className="text-body-base md:text-body-lg tracking-[0.2px]">{t('projects.gymDashboard.timeline')}</p>
            </div>
            <div>
              <span className="text-caption-lg font-space-mono font-semibold text-gray-500 mb-2 block">My Skills</span>
              <p className="text-body-base md:text-body-lg tracking-[0.2px]">{t('projects.gymDashboard.skills')}</p>
            </div>
            <div>
              <span className="text-caption-lg font-space-mono font-semibold text-gray-500 mb-2 block">Type</span>
              <p className="text-body-base md:text-body-lg tracking-[0.2px]">{t('common.personalProject')}</p>
            </div>
            <div>
              <span className="text-caption-lg font-space-mono font-semibold text-gray-500 mb-2 block">
                Deliverables
              </span>
              <p className="text-body-base md:text-body-lg tracking-[0.2px]">
                {t('projects.gymDashboard.deliverables')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TLDR Section */}
      <section className="py-8">
        <div className="max-w-[1028px] w-full mx-auto px-0 md:px-6">
          <div className="bg-[#eeedee] rounded-lg px-4 py-6 md:p-6 flex flex-col gap-6">
            <h2
              className="text-heading-xl md:text-heading-2xl text-[#0A0A0A]"
              style={{
                fontFamily: 'Helvetica Neue, Helvetica, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                fontWeight: 500,
              }}
            >
              TL;DR
            </h2>
            <div className="flex flex-col gap-6">
              {/* Problem and Solution Row */}
              <div className="flex flex-col md:flex-row gap-8">
                {/* Problem Card */}
                <div className="flex-1  rounded-lg p-0 flex flex-col gap-2">
                  <div
                    className="rounded-full w-10 h-10 flex items-center justify-center shrink-0"
                    style={{
                      background:
                        'radial-gradient(circle at 100% 114%, rgba(210, 210, 215, 0.8) 0%, rgba(180, 180, 185, 0.8) 100%)',
                    }}
                  >
                    <Waves className="w-6 h-6 text-[#0A0A0A]" strokeWidth={2} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3
                      className="text-heading-base md:text-heading-xl text-[#171717]"
                      style={{
                        fontFamily:
                          'Helvetica Neue, Helvetica, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                        fontWeight: 500,
                      }}
                    >
                      Problem
                    </h3>
                    <p className="text-body-sm md:text-body-base font-helvetica-neue text-[#0A0A0A] opacity-80 leading-[1.5]">
                      {t('tldr.problemText')}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="hidden md:block w-[1.5px] bg-black shrink-0"></div>

                {/* Solution Card */}
                <div className="flex-1  rounded-lg p-0 flex flex-col gap-2">
                  <div
                    className="rounded-full w-10 h-10 flex items-center justify-center shrink-0"
                    style={{
                      background:
                        'radial-gradient(circle at 100% 114%, rgba(210, 210, 215, 0.8) 0%, rgba(180, 180, 185, 0.8) 100%)',
                    }}
                  >
                    <Lightbulb className="w-6 h-6 text-[#0A0A0A]" strokeWidth={2} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3
                      className="text-heading-base md:text-heading-xl text-[#171717]"
                      style={{
                        fontFamily:
                          'Helvetica Neue, Helvetica, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                        fontWeight: 500,
                      }}
                    >
                      Solution
                    </h3>
                    <p className="text-body-sm md:text-body-base font-helvetica-neue text-[#0A0A0A] opacity-80 leading-[1.5]">
                      {t('tldr.solutionText')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Horizontal Divider */}
              <div className="h-[1.5px] bg-black"></div>

              {/* Key Results */}
              <div className="flex flex-col gap-2">
                <h3
                  className="text-heading-base md:text-heading-xl text-[#171717]"
                  style={{
                    fontFamily: 'Helvetica Neue, Helvetica, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                    fontWeight: 500,
                  }}
                >
                  Key Results
                </h3>
                <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                  {/* Card 1 */}
                  <div className="flex-1 bg-white rounded-md p-4 flex flex-col gap-0">
                    <div
                      className="rounded-full w-10 h-10 flex items-center justify-center shrink-0 mb-2"
                      style={{
                        background:
                          'radial-gradient(circle at 100% 114%, rgba(210, 210, 215, 0.8) 0%, rgba(180, 180, 185, 0.8) 100%)',
                      }}
                    >
                      <Boxes className="w-6 h-6 text-[#0A0A0A]" strokeWidth={2} />
                    </div>
                    <div className="flex flex-col justify-end items-end">
                      <span className="text-body-3xl font-helvetica-neue font-medium text-[#171717]">
                        {isLoadingStats ? '...' : gymStats?.totalRecords || '354'}
                      </span>
                      <span className="text-body-base font-helvetica-neue text-[#0A0A0A] leading-[1.5]">
                        {t('tldr.result1Label')}
                      </span>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="flex-1 bg-white rounded-md p-4 flex flex-col gap-0">
                    <div
                      className="rounded-full w-10 h-10 flex items-center justify-center shrink-0 mb-2"
                      style={{
                        background:
                          'radial-gradient(circle at 100% 114%, rgba(210, 210, 215, 0.8) 0%, rgba(180, 180, 185, 0.8) 100%)',
                      }}
                    >
                      <Server className="w-6 h-6 text-[#0A0A0A]" strokeWidth={2} />
                    </div>
                    <div className="flex flex-col justify-end items-end">
                      <span className="text-body-3xl font-helvetica-neue font-medium text-[#171717] text-right">
                        {isLoadingStats
                          ? '...'
                          : gymStats?.systemUptime !== undefined
                          ? `${gymStats.systemUptime.toFixed(1)}%`
                          : '99.1%'}
                      </span>
                      <span className="text-body-sm md:text-body-base font-helvetica-neue text-[#0A0A0A] leading-[1.5] text-right">
                        {isLoadingStats
                          ? t('tldr.result2Label')
                          : gymStats?.operationDurationMonths !== undefined
                          ? language === 'en'
                            ? `System uptime over ${gymStats.operationDurationMonths.toFixed(1)} months of operation`
                            : `${gymStats.operationDurationMonths.toFixed(1)}ヶ月間のシステム稼働率`
                          : t('tldr.result2Label')}
                      </span>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="flex-1 bg-white rounded-md p-4 flex flex-col gap-0">
                    <div
                      className="rounded-full w-10 h-10 flex items-center justify-center shrink-0 mb-2"
                      style={{
                        background:
                          'radial-gradient(circle at 100% 114%, rgba(210, 210, 215, 0.8) 0%, rgba(180, 180, 185, 0.8) 100%)',
                      }}
                    >
                      <Users className="w-6 h-6 text-[#0A0A0A]" strokeWidth={2} />
                    </div>
                    <div className="flex flex-col justify-end items-end">
                      <span className="text-body-3xl font-helvetica-neue font-medium text-[#171717]">
                        {isLoadingStats ? '...' : gymStats?.crowdednessComparison?.time || t('tldr.result3Time')}
                      </span>
                      <span className="text-body-base font-helvetica-neue text-[#0A0A0A] leading-[1.5]">
                        {isLoadingStats
                          ? t('tldr.result3Label')
                          : gymStats?.crowdednessComparison?.multiplier !== undefined
                          ? language === 'en'
                            ? `is ${gymStats.crowdednessComparison.multiplier.toFixed(1)}x more crowded`
                            : `平均の${gymStats.crowdednessComparison.multiplier.toFixed(1)}倍混雑`
                          : t('tldr.result3Label')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl w-full mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Main Content */}
          <div className="md:w-[80%]">
            {/* Overview Section */}
            <section id="overview" className="w-full mx-auto py-8   text-[#002a38]">
              <h2
                className="text-heading-xl md:text-heading-2xl mb-6"
                style={{
                  fontFamily: 'Helvetica Neue, Helvetica, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                  fontWeight: 500,
                }}
              >
                Overview
              </h2>

              <p
                className={`mb-6 ${getBodyFontClass()} tracking-[0.2px] ${jpFontSize('text-body-sm', 'text-body-lg')}`}
              >
                {t('gymDashboard.overviewText')}
              </p>

              <p
                className={`mb-6 ${getBodyFontClass()} tracking-[0.2px] ${jpFontSize('text-body-sm', 'text-body-lg')}`}
              >
                {t('gymDashboard.roleDescription')}
              </p>

              {/* GitHub Repository Link */}
              <div className="mt-8">
                <a
                  href="https://github.com/iori73/crowd_data_dashboard_v2"
                  target="_blank"
                  rel="noopener noreferrer"
                  // className="inline-flex items-center gap-2 hover:bg-[#818b981a] hover:rounded-md p-2 transition-all duration-150 group"
                  className="inline-flex items-center gap-2 "
                >
                  {/* GitHub Octocat Logo */}
                  <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center">
                    <svg
                      viewBox="0 0 16 16"
                      className="w-6 h-6 md:w-8 md:h-8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                        fill="#24292f"
                        className="group-hover:fill-[#0969da] transition-colors duration-150"
                      />
                    </svg>
                  </div>
                  {/* Repository Path */}
                  <div className="flex items-center gap-1">
                    <span className="text-body-sm md:text-body-lg leading-[1.25] font-normal text-[#656d76] group-hover:text-[#0969da] transition-colors duration-150">
                      iori73
                    </span>
                    <span className="text-body-sm md:text-body-lg leading-[1.25] font-normal text-[#656d76]">/</span>
                    <span className="text-body-sm md:text-body-lg leading-[1.25] font-semibold text-[#24292f] group-hover:text-[#0969da] transition-colors duration-150">
                      crowd_data_dashboard_v2
                    </span>
                  </div>
                  {/* External Link Icon */}
                  <MoveUpRight className="w-4 h-4 md:w-5 md:h-5 text-[#656d76] group-hover:text-[#0969da] transition-colors duration-150 flex-shrink-0" />
                </a>
              </div>
            </section>

            {/* Performance Metrics Section */}
            <section id="system-flow" className="py-8">
              {/* <h2 className="text-heading-xl md:text-heading-2xl font-merriweather mb-6">
                {t('systemFlow')}
              </h2> */}
              <h3
                className="text-heading-base md:text-heading-xl mb-4"
                style={{
                  fontFamily: 'Helvetica Neue, Helvetica, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                  fontWeight: 500,
                }}
              >
                System flow
              </h3>
              <div id="system-flow" className="mb-6">
                {/* <h3 className="text-2xl font-semibold text-gray-900 mb-2">{t('systemFlow')}</h3> */}
                <p className="text-body-sm md:text-body-lg text-gray-600">{t('gymDashboard.systemFlowDescription')}</p>
              </div>
              {/* System Architecture Diagram */}
              <div className="mb-12">
                <AnnotatedSystemDiagram />
              </div>

              <ul
                className={`list-disc pl-5 space-y-2 ${getBodyFontClass()} ${jpFontSize(
                  'text-body-sm',
                  'text-body-lg',
                )}`}
              >
                <li>
                  {isLoadingStats
                    ? t('gymDashboard.collectedDataPoints')
                    : gymStats
                    ? language === 'en'
                      ? `Collected Data Points: ${gymStats.totalRecords} (as of ${new Date(
                          gymStats.dateRange.split(' - ')[1],
                        ).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })})`
                      : `収集データポイント: ${gymStats.totalRecords}件（${new Date(
                          gymStats.dateRange.split(' - ')[1],
                        ).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long' })}時点）`
                    : t('gymDashboard.collectedDataPoints')}
                </li>
                <li>{t('gymDashboard.ocrSuccessRate')}</li>
                <li>{t('gymDashboard.systemUptime')}</li>
              </ul>
            </section>

            {/* Design Process Section */}
            <section id="design-process" className="py-8">
              <h2
                className="text-heading-xl md:text-heading-2xl mb-6"
                style={{
                  fontFamily: 'Helvetica Neue, Helvetica, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                  fontWeight: 500,
                }}
              >
                Design Process
              </h2>
              <p
                className={`mb-4 ${getBodyFontClass()} tracking-[0.2px] ${jpFontSize('text-body-sm', 'text-body-lg')}`}
              >
                {t('gymDashboard.designProcessText')}
              </p>
              <div className="space-y-6 mb-4">
                <div>
                  <p className="font-helvetica-neue text-body-sm md:text-body-lg font-medium mb-2">
                    1. {t('gymDashboard.designStep1Title')}
                  </p>
                  <p className={`${getBodyFontClass()} tracking-[0.2px] ${jpFontSize('text-body-sm', 'text-body-lg')}`}>
                    {t('gymDashboard.designStep1Body')}
                  </p>
                </div>
                <div>
                  <p className="font-helvetica-neue text-body-sm md:text-body-lg font-medium mb-2">
                    2. {t('gymDashboard.designStep2Title')}
                  </p>
                  <p className={`${getBodyFontClass()} tracking-[0.2px] ${jpFontSize('text-body-sm', 'text-body-lg')}`}>
                    {t('gymDashboard.designStep2Body')}
                  </p>
                </div>
                <div>
                  <p className="font-helvetica-neue text-body-sm md:text-body-lg font-medium mb-2">
                    3. {t('gymDashboard.designStep3Title')}
                  </p>
                  <p className={`${getBodyFontClass()} tracking-[0.2px] ${jpFontSize('text-body-sm', 'text-body-lg')}`}>
                    {t('gymDashboard.designStep3Body')}
                  </p>
                </div>
              </div>
            </section>

            {/* Solution Section */}
            <section id="solution" className="py-8">
              <h2
                className="text-heading-xl md:text-heading-2xl mb-6"
                style={{
                  fontFamily: 'Helvetica Neue, Helvetica, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                  fontWeight: 500,
                }}
              >
                Solution
              </h2>

              <div className="mb-8">
                <h3
                  className="text-heading-base md:text-heading-xl mb-4"
                  style={{
                    fontFamily: 'Helvetica Neue, Helvetica, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                    fontWeight: 500,
                  }}
                >
                  Smart Data Collection System
                </h3>
                <p
                  className={`mb-4 ${getBodyFontClass()} tracking-[0.2px] ${jpFontSize(
                    'text-body-sm',
                    'text-body-lg',
                  )}`}
                >
                  {t('gymDashboard.dataCollectionText1')}
                </p>
                <p
                  className={`mb-4 ${getBodyFontClass()} tracking-[0.2px] ${jpFontSize(
                    'text-body-sm',
                    'text-body-lg',
                  )}`}
                >
                  {t('gymDashboard.dataCollectionText2')}
                </p>
                <div className="grid grid-cols-1 gap-4 mt-6">
                  {/* Before/After Comparison */}
                  <Tabs defaultValue="before" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-[#F5F5F5] rounded-[10px] p-1 h-12 gap-1">
                      <TabsTrigger
                        value="before"
                        className="w-full h-full rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm text-body-sm"
                      >
                        {t('common.before')}
                      </TabsTrigger>
                      <TabsTrigger
                        value="after"
                        className="w-full h-full rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm text-body-sm"
                      >
                        {t('common.after')}
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="before" className="mt-4">
                      <div className="flex flex-col">
                        <div className="bg-[#F1F1F3] rounded-t-[8px] p-6">
                          <img
                            src="/figma-reference/AppleShortcut_Automation_Before.png"
                            alt={t('common.before')}
                            className="w-full h-auto"
                          />
                        </div>
                        <Alert className="rounded-b-[10px] rounded-t-none border-t-0 border-[#E5E5E5] [&>svg]:text-[#DC2626] [&>svg]:relative [&>svg]:left-0 [&>svg]:top-0">
                          <div className="flex items-center gap-3">
                            <CircleAlert className="h-5 w-5 md:h-6 md:w-6 text-[#DC2626] shrink-0" />
                            <AlertTitle className="text-[#DC2626] text-body-sm md:text-body-lg mb-0 font-medium">
                              Initial design
                            </AlertTitle>
                          </div>
                          <AlertDescription className="text-[#DC2626] text-body-sm mt-2 pl-7">
                            {t('gymDashboard.alertInitialDesignDescription')}
                          </AlertDescription>
                        </Alert>
                      </div>
                    </TabsContent>
                    <TabsContent value="after" className="mt-4">
                      <div className="flex flex-col">
                        <div className="bg-[#F1F1F3] rounded-t-[8px] p-6">
                          <img
                            src="/figma-reference/AppleShortcut_Automation_After.png"
                            alt={t('common.after')}
                            className="w-full h-auto"
                          />
                        </div>
                        <Alert className="rounded-b-[10px] rounded-t-none border-t-0 [&>svg]:relative [&>svg]:left-0 [&>svg]:top-0">
                          <div className="flex items-center gap-3">
                            <CircleCheck className="h-5 w-5 md:h-6 md:w-6 shrink-0" />
                            <AlertTitle className="text-body-sm md:text-body-lg mb-0 font-medium">
                              Optimized design
                            </AlertTitle>
                          </div>
                          <AlertDescription className="text-body-sm mt-2 pl-7">
                            {t('gymDashboard.alertOptimizedDesignDescription')}
                          </AlertDescription>
                        </Alert>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>

              <div className="mb-8">
                <h3
                  className="text-heading-base md:text-heading-xl mb-4"
                  style={{
                    fontFamily: 'Helvetica Neue, Helvetica, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                    fontWeight: 500,
                  }}
                >
                  High-Accuracy OCR Processing Engine
                </h3>
                <p
                  className={`mb-4 ${getBodyFontClass()} tracking-[0.2px] ${jpFontSize(
                    'text-body-sm',
                    'text-body-lg',
                  )}`}
                >
                  <TechnicalTooltip content="コンピュータビジョン用ライブラリで、画像処理・機械学習アルゴリズムを提供">
                    <code>OpenCV</code>
                  </TechnicalTooltip>
                  {t('gymDashboard.ocrText2')}
                </p>
                <ol
                  className={`list-decimal pl-5 mb-4 space-y-2 font-helvetica-neue ${jpFontSize(
                    'text-body-sm',
                    'text-body-lg',
                  )}`}
                >
                  <li>
                    <TechnicalTooltip content="画像をカラーから白黒に変換するOpenCV関数">
                      <code>cv2.cvtColor</code>
                    </TechnicalTooltip>
                    {t('gymDashboard.ocrStep1')}
                  </li>
                  <li>
                    <TechnicalTooltip content="非局所平均アルゴリズムで画像ノイズを除去するOpenCV関数">
                      <code>cv2.fastNlMeansDenoising</code>
                    </TechnicalTooltip>
                    {t('gymDashboard.ocrStep2')}
                  </li>
                  <li>
                    <TechnicalTooltip content="画像の局所的なコントラストを適応的に強化するヒストグラム均等化手法">
                      <code>cv2.createCLAHE</code>
                    </TechnicalTooltip>
                    {t('gymDashboard.ocrStep3')}
                  </li>
                </ol>
                <p
                  className={`mb-4 ${getBodyFontClass()} tracking-[0.2px] ${jpFontSize(
                    'text-body-sm',
                    'text-body-lg',
                  )}`}
                >
                  {t('gymDashboard.ocrText3Before')}
                  <TechnicalTooltip content="Googleが開発したオープンソースOCRエンジン、100以上の言語をサポート">
                    <code>Tesseract OCR</code>
                  </TechnicalTooltip>
                  {t('gymDashboard.ocrText3Middle')}
                  <TechnicalTooltip content="PaddleOCRベースのOCRライブラリ、多言語対応でPython実装">
                    <code>EasyOCR</code>
                  </TechnicalTooltip>
                  {t('gymDashboard.ocrText3After')}
                </p>
              </div>

              <div className="mb-8">
                <h3
                  className="text-heading-base md:text-heading-xl mb-4"
                  style={{
                    fontFamily: 'Helvetica Neue, Helvetica, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                    fontWeight: 500,
                  }}
                >
                  CI/CD Infrastructure
                </h3>
                <p
                  className={`mb-4 ${getBodyFontClass()} tracking-[0.2px] ${jpFontSize(
                    'text-body-sm',
                    'text-body-lg',
                  )}`}
                >
                  {t('gymDashboard.githubActionsSuccess')} {t('gymDashboard.failureCausesProcess')}
                </p>
                <div className="mb-4">
                  <p className={`${getBodyFontClass()} ${jpFontSize('text-body-sm', 'text-body-lg')} font-medium`}>
                    {t('gymDashboard.failureHistory')}
                  </p>
                  <ul
                    className={`list-disc pl-5 space-y-1 ${getBodyFontClass()} ${jpFontSize(
                      'text-body-sm',
                      'text-body-lg',
                    )}`}
                  >
                    <li>
                      {t('gymDashboard.failureRun5Before')}
                      <TechnicalTooltip content="設定ファイルの記述形式の一つ。インデント（字下げ）で構造を表現する">
                        <code>YAML</code>
                      </TechnicalTooltip>
                      {t('gymDashboard.failureRun5Middle')}
                      <TechnicalTooltip content="複数行のテキストを記述するための記法。改行を含む長いテキストを書く際に使用">
                        <code>HEREDOC</code>
                      </TechnicalTooltip>
                      {t('gymDashboard.failureRun5After')}
                    </li>
                    <li>
                      {t('gymDashboard.failureRun67Before')}
                      <TechnicalTooltip content="3Dグラフィックスを処理するためのシステムライブラリ。画像処理ライブラリが正常に動作するために必要">
                        <code>OpenGL</code>
                      </TechnicalTooltip>
                      {t('gymDashboard.failureRun67After')}
                    </li>
                  </ul>
                </div>
                <div className="mb-4">
                  <p className={`${getBodyFontClass()} ${jpFontSize('text-body-sm', 'text-body-lg')} font-medium`}>
                    {t('gymDashboard.decisiveFix')}
                  </p>
                  <p
                    className={`mb-2 ${getBodyFontClass()} tracking-[0.2px] ${jpFontSize(
                      'text-body-sm',
                      'text-body-lg',
                    )}`}
                  >
                    {t('gymDashboard.decisiveFixTextBefore')}
                    <TechnicalTooltip content="Ubuntu 24.04で廃止された、OpenGLライブラリを提供する古いパッケージ">
                      <code>libgl1-mesa-glx</code>
                    </TechnicalTooltip>
                    {t('gymDashboard.decisiveFixTextMiddle')}
                    <TechnicalTooltip content="OpenGLライブラリを提供する新しいパッケージ。開発用のヘッダーファイルも含む">
                      <code>libgl1-mesa-dev</code>
                    </TechnicalTooltip>
                    {t('gymDashboard.decisiveFixTextAfter')}
                  </p>
                </div>
                <div className="mb-4">
                  <p className={`${getBodyFontClass()} ${jpFontSize('text-body-sm', 'text-body-lg')} font-medium`}>
                    {t('gymDashboard.twoStageSync')}
                  </p>
                  <ol
                    className={`list-decimal pl-5 space-y-1 ${getBodyFontClass()} ${jpFontSize(
                      'text-body-sm',
                      'text-body-lg',
                    )}`}
                  >
                    <li>
                      {t('gymDashboard.syncStep1Before')}
                      <TechnicalTooltip content="3Dグラフィックスを処理するためのシステムライブラリ。画像処理ライブラリが正常に動作するために必要">
                        <code>OpenGL</code>
                      </TechnicalTooltip>
                      {t('gymDashboard.syncStep1After')}
                    </li>
                    <li>
                      <TechnicalTooltip content="macOSのシステムデーモン管理ツール、定期実行や自動起動を制御">
                        <code>launchd</code>
                      </TechnicalTooltip>
                      {t('gymDashboard.syncStep2')}
                    </li>
                  </ol>
                </div>
                <p
                  className={`mb-4 ${getBodyFontClass()} tracking-[0.2px] ${jpFontSize(
                    'text-body-sm',
                    'text-body-lg',
                  )}`}
                >
                  {t('gymDashboard.syncResult')}
                </p>
              </div>
            </section>

            {/* Impact & Reflection Section */}
            <section id="impact-reflection" className="py-8">
              <h2
                className="text-heading-xl md:text-heading-2xl mb-6"
                style={{
                  fontFamily: 'Helvetica Neue, Helvetica, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                  fontWeight: 500,
                }}
              >
                Impact & Reflection
              </h2>

              <div className="mb-6">
                <h3
                  className="text-heading-base md:text-heading-xl mb-3"
                  style={{
                    fontFamily: 'Helvetica Neue, Helvetica, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                    fontWeight: 500,
                  }}
                >
                  Learnings Through the Project
                </h3>
                <p
                  className={`mb-4 ${getBodyFontClass()} tracking-[0.2px] ${jpFontSize(
                    'text-body-sm',
                    'text-body-lg',
                  )}`}
                >
                  {t('gymDashboard.learningText1')}
                </p>
                <p
                  className={`mb-4 ${getBodyFontClass()} tracking-[0.2px] ${jpFontSize(
                    'text-body-sm',
                    'text-body-lg',
                  )}`}
                >
                  {t('gymDashboard.learningText2')}
                </p>
              </div>

              <div className="mb-6">
                <h3
                  className="text-heading-base md:text-heading-xl mb-3"
                  style={{
                    fontFamily: 'Helvetica Neue, Helvetica, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                    fontWeight: 500,
                  }}
                >
                  Future Prospects
                </h3>
                <p
                  className={`mb-4 ${getBodyFontClass()} tracking-[0.2px] ${jpFontSize(
                    'text-body-sm',
                    'text-body-lg',
                  )}`}
                >
                  {t('gymDashboard.prospectsText')}
                </p>
              </div>
            </section>
          </div>

          {/* Sidebar - Hidden on mobile */}
          <div className="hidden md:flex md:w-[20%] pl-4 pt-8 items-start justify-center">
            <nav className="sticky top-24">
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => scrollToSection('overview')}
                    className={
                      activeSection === 'overview'
                        ? 'text-left text-body-xl font-helvetica-neue transition-transform duration-900 scale-110'
                        : 'text-left text-heading-sm font-helvetica-neue transition-transform duration-900 scale-100 opacity-50'
                    }
                  >
                    Overview
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('design-process')}
                    className={
                      activeSection === 'design-process'
                        ? 'text-left text-body-xl font-helvetica-neue transition-transform duration-900 scale-110'
                        : 'text-left text-heading-sm font-helvetica-neue transition-transform duration-900 scale-100 opacity-50'
                    }
                  >
                    Design Process
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('solution')}
                    className={
                      activeSection === 'solution'
                        ? 'text-left text-body-xl font-helvetica-neue transition-transform duration-900 scale-110'
                        : 'text-left text-heading-sm font-helvetica-neue transition-transform duration-900 scale-100 opacity-50'
                    }
                  >
                    Solution
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('impact-reflection')}
                    className={
                      activeSection === 'impact-reflection'
                        ? 'text-left text-body-xl font-helvetica-neue transition-transform duration-900 scale-110'
                        : 'text-left text-heading-sm font-helvetica-neue transition-transform duration-900 scale-100 opacity-50'
                    }
                  >
                    Impact & Reflection
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
