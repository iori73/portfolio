'use client';
import React from 'react';
import Image from 'next/image';
import InterestsVisualization from './InterestsVisualization';
import { useTranslations, useLocale } from 'next-intl';
import { useBodyFont, useHeadingFont } from '@/src/hooks/useFonts';
import { cvData } from '@/src/data/cvData';

// Section label: Space Grotesk uppercase with top border
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-space-grotesk text-label font-semibold text-ink-tertiary uppercase tracking-[0.04em] mt-24 mb-6 border-t border-line-section pt-6">
      {children}
    </div>
  );
}

const AboutPage: React.FC = () => {
  const t = useTranslations('about');
  const locale = useLocale() as 'en' | 'jp';
  const { getBodyFontClass } = useBodyFont();
  const { getHeadingFontClass } = useHeadingFont();

  // Format date range: "2025-04" → "2025" (or "Present")
  const formatYear = (date: string | 'Present') =>
    date === 'Present' ? (locale === 'jp' ? '現在' : 'Present') : date.slice(0, 4);

  return (
    <div className="font-sans my-24 md:mt-28 md:mb-16">

      {/* ── Hero ── */}
      <section className="pb-4">
        <div className="flex flex-col md:flex-row items-start gap-10 md:gap-12">
          {/* Circle avatar */}
          <div className="shrink-0">
            <Image
              src="/about/my_image.png"
              alt="Iori Kawano"
              width={160}
              height={160}
              className="rounded-full object-cover object-top w-[120px] h-[120px] md:w-[160px] md:h-[160px]"
              priority
            />
          </div>

          {/* Heading + bilingual description */}
          <div className="flex-1">
            <h1 className={`text-headline mb-6 ${getHeadingFontClass()}`}>About</h1>
            <div>
              <p className={`text-body-lg ${getBodyFontClass()} mb-4`}>{t('description1')}</p>
              <p className={`text-body-lg ${getBodyFontClass()}`}>{t('description2')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Career ── */}
      <SectionLabel>Career</SectionLabel>
      <h2 className={`text-title-lg mb-8 ${getHeadingFontClass()}`}>
        {locale === 'jp' ? '略歴' : 'A short list, in reverse order.'}
      </h2>

      <div>
        {/* Work experience */}
        {cvData.workExperience.map((job) => (
          <div
            key={job.id}
            className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 md:gap-6 py-6 border-b border-line-subtle"
          >
            <div className="font-space-grotesk text-label text-ink-tertiary pt-1">
              {formatYear(job.startDate)} — {formatYear(job.endDate)}
            </div>
            <div>
              <p className={`text-title font-switzer font-medium mb-1`}>
                {job.position[locale]} — {job.company[locale]}
              </p>
              <p className={`text-body ${getBodyFontClass()} text-ink-secondary leading-[1.6]`}>
                {locale === 'jp'
                  ? '航空・電機・フィンテック・大学のクライアント向け、デザインシステム・Figmaプラグイン・プロダクトUI。'
                  : 'Design systems, Figma plugins, and product UI across airline, electronics, fintech, and university clients.'}
              </p>
            </div>
          </div>
        ))}

        {/* Education */}
        {cvData.education.map((edu) => (
          <div
            key={edu.id}
            className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 md:gap-6 py-6 border-b border-line-subtle last:border-b-0"
          >
            <div className="font-space-grotesk text-label text-ink-tertiary pt-1">
              {formatYear(edu.startDate)} — {formatYear(edu.endDate)}
            </div>
            <div>
              <p className={`text-title font-switzer font-medium mb-1`}>
                {edu.degree[locale]} — {edu.institution[locale]}
              </p>
              <p className={`text-body ${getBodyFontClass()} text-ink-secondary leading-[1.6]`}>
                {edu.description?.[locale]}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Skills ── */}
      <SectionLabel>Skills</SectionLabel>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {cvData.skills.map((skill) => (
          <div key={skill.category.en}>
            <div className="font-space-grotesk text-label font-semibold text-ink-tertiary uppercase tracking-[0.04em] mb-3">
              {skill.category.en}
            </div>
            <p className={`text-body ${getBodyFontClass()} text-ink-secondary leading-[1.6]`}>
              {skill.items.join(', ')}.
            </p>
          </div>
        ))}
      </div>

      {/* ── My Interests (moved to bottom) ── */}
      <SectionLabel>{t('myInterests')}</SectionLabel>
      <p className={`text-body-lg ${getBodyFontClass()} mb-8`}>
        {t('interestsDescription')}
      </p>
      <InterestsVisualization />

    </div>
  );
};

export default AboutPage;
