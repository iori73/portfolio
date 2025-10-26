// /app/about/page.tsx
'use client';
import { Link, Underline } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import InterestsVisualization from './InterestsVisualization';
import { useLanguage } from '@/src/lib/i18n';

const AboutPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const { t } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // スクロールに応じた activeSection の更新
  useEffect(() => {
    const sections = ['overview', 'about', 'results', 'conclusion'];
    const handleScroll = () => {
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
      {/* Hero Section */}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
        <div className="lg:col-span-6">
          <div className="flex flex-col items-start gap-10 relative">
            <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
              <h1 className=" mb-2 text-heading-l-120 md:text-heading-xl-m-120 ">Iori Kawano</h1>
              <p className="max-w-full text-body-m-140 md:text-body-xxl-140">{t('aboutDescription1')}</p>
              {/* Idiomatic means (here: 71. 直観的より慣用的に)[https://www.sociomedia.co.jp/9752] */}
              <p className="max-w-full text-body-m-140 md:text-body-xxl-140">{t('aboutDescription2')}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 relative">
          <div className="relative pt-0 md:pt-8">
            <img src="/about/my_image.png" alt="My image" className="w-full max-w-lg mx-auto" />
          </div>
        </div>
      </div>

      <section className="pt-4 md:pt-0 pb-4 md:pb-0 flex flex-col gap-4">
        <h2 className="text-heading-m-120 md:text-heading-l-20">{t('myInterests')}</h2>
        <p className="max-w-full text-body-m-140 md:text-body-xxl-140">{t('interestsDescription')}</p>
        <InterestsVisualization />
      </section>
    </div>
  );
};

export default AboutPage;
