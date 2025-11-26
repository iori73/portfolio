// /app/about/page.tsx
'use client';
import { Link, Underline } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import InterestsVisualization from './InterestsVisualization';
import { useTranslations } from 'next-intl';
import { useBodyFont, useHeadingFont } from '@/src/hooks/useFonts';

const AboutPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const t = useTranslations('about');
  const { getBodyFontClass, getBodyFontStyle } = useBodyFont();
  const { getHeadingFontClass, getHeadingFontStyle } = useHeadingFont();

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
              <h1 className="mb-2 text-heading-3xl md:text-heading-4xl">Iori Kawano</h1>
              <p className={`max-w-full text-body-lg md:text-body-xl ${getBodyFontClass()}`}>
                {t('description1')}
              </p>
              {/* Idiomatic means (here: 71. 直観的より慣用的に)[https://www.sociomedia.co.jp/9752] */}
              <p className={`max-w-full text-body-lg md:text-body-xl ${getBodyFontClass()}`}>
                {t('description2')}
              </p>
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
        <h2 className={`text-heading-2xl md:text-heading-3xl ${getHeadingFontClass()}`}>{t('myInterests')}</h2>
        <p className={`max-w-full text-body-lg md:text-body-xl ${getBodyFontClass()}`}>{t('interestsDescription')}</p>
        <InterestsVisualization />
      </section>

      {/* <section className="pt-4 md:pt-0 pb-4 md:pb-0 flex flex-col gap-4">
        <iframe
          className="w-full md:w-[90%] min-h-[600px]"
          src="https://elite-kite-224.notion.site/ebd/17b33d06cce380449ac0f37f68e1b6c5?v=202f4b4c9db74271a04bac3e501151ab"
          height="600"
          frameBorder="0"
          allowFullScreen
          backgroundColor="transparent"
        />
      </section> */}
    </div>
  );
};

export default AboutPage;
