'use client';
import React, { useEffect, useState } from 'react';
import { useJPFontSize } from '@/src/hooks/useFonts';
import { cvData, WorkExperience, Education, SkillCategory, Project } from '@/src/data/cvData';
import { useLocale, useTranslations } from 'next-intl';

// 日付範囲フォーマット関数
function formatDateRange(startDate: string, endDate: string | 'Present', lang: 'en' | 'jp'): string {
  const formatDate = (dateStr: string) => {
    const [year, month] = dateStr.split('-');
    if (lang === 'en') {
      const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      return `${monthNames[parseInt(month) - 1]} ${year}`;
    } else {
      return `${year}年${parseInt(month)}月`;
    }
  };

  const start = formatDate(startDate);
  const end = endDate === 'Present' ? (lang === 'en' ? 'Present' : '現在') : formatDate(endDate);

  return `${start} - ${end}`;
}

// 職歴アイテムコンポーネント
const WorkExperienceItem: React.FC<{ work: WorkExperience; lang: 'en' | 'jp' }> = ({ work, lang }) => {
  const { jpFontSize } = useJPFontSize();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
        <div className="flex-1">
          <h3 className={jpFontSize('text-heading-xl', 'text-heading-2xl')}>{work.position[lang]}</h3>
          <p className={jpFontSize('text-body-lg', 'text-body-xl') + ' font-roboto'}>{work.company[lang]}</p>
          <p className={jpFontSize('text-body-base', 'text-body-lg') + ' font-roboto'}>{work.location[lang]}</p>
        </div>
        <p className={jpFontSize('text-caption-lg', 'text-caption-xl') + ' font-space-mono'}>
          {formatDateRange(work.startDate, work.endDate, lang)}
        </p>
      </div>

      <ul className="list-disc list-inside space-y-2">
        {work.description[lang].map((item, index) => (
          <li key={index} className={jpFontSize('text-body-base', 'text-body-lg') + ' font-roboto'}>
            {item}
          </li>
        ))}
      </ul>

      {work.technologies && work.technologies.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {work.technologies.map((tech) => (
            <span
              key={tech}
              className="font-space-mono text-body-base md:text-body-lg px-3 py-1 rounded-lg bg-[#f5f5f7] text-[#696969]"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

// 学歴アイテムコンポーネント
const EducationItem: React.FC<{ education: Education; lang: 'en' | 'jp' }> = ({ education, lang }) => {
  const { jpFontSize } = useJPFontSize();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
        <div className="flex-1">
          <h3 className={jpFontSize('text-heading-xl', 'text-heading-2xl')}>
            {education.degree[lang]} in {education.field[lang]}
          </h3>
          <p className={jpFontSize('text-body-lg', 'text-body-xl') + ' font-roboto'}>
            {education.institution[lang]}
          </p>
          {education.description && (
            <p className={jpFontSize('text-body-base', 'text-body-lg') + ' font-roboto'}>
              {education.description[lang]}
            </p>
          )}
        </div>
        <p className={jpFontSize('text-caption-lg', 'text-caption-xl') + ' font-space-mono'}>
          {formatDateRange(education.startDate, education.endDate, lang)}
        </p>
      </div>
    </div>
  );
};

// スキルカテゴリアイテムコンポーネント
const SkillCategoryItem: React.FC<{ category: SkillCategory; lang: 'en' | 'jp' }> = ({ category, lang }) => {
  const { jpFontSize } = useJPFontSize();

  return (
    <div className="flex flex-col gap-4">
      <h3 className={jpFontSize('text-heading-base', 'text-heading-xl')}>{category.category[lang]}</h3>
      <div className="flex flex-wrap gap-2">
        {category.items.map((item) => (
          <span
            key={item}
            className="font-space-mono text-body-base md:text-body-lg px-3 py-1 rounded-lg bg-[#f5f5f7] text-[#696969]"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

// プロジェクトアイテムコンポーネント
const ProjectItem: React.FC<{ project: Project; lang: 'en' | 'jp' }> = ({ project, lang }) => {
  const { jpFontSize } = useJPFontSize();
  const t = useTranslations('cv');

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
        <h3 className={jpFontSize('text-heading-xl', 'text-heading-2xl')}>{project.title[lang]}</h3>
        <p className={jpFontSize('text-caption-lg', 'text-caption-xl') + ' font-space-mono'}>
          {project.period[lang]}
        </p>
      </div>
      <p className={jpFontSize('text-body-base', 'text-body-lg') + ' font-roboto'}>
        {project.description[lang]}
      </p>
      {project.technologies && (
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="font-space-mono text-body-base md:text-body-lg px-3 py-1 rounded-lg bg-[#f5f5f7] text-[#696969]"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className={jpFontSize('text-body-base', 'text-body-lg') + ' font-roboto hover:opacity-80'}
        >
          {t('viewProject')} →
        </a>
      )}
    </div>
  );
};

export default function CVPage() {
  const locale = useLocale();
  const t = useTranslations('cv');
  const { jpFontSize } = useJPFontSize();
  const [linkedInData, setLinkedInData] = useState<any>(null);

  // LinkedInデータ取得
  useEffect(() => {
    const fetchLinkedIn = async () => {
      try {
        const response = await fetch('/api/linkedin');
        if (response.ok) {
          const data = await response.json();
          setLinkedInData(data);
        }
      } catch (error) {
        console.error('Error fetching LinkedIn data:', error);
      }
    };
    fetchLinkedIn();
  }, []);

  const lang = locale as 'en' | 'jp'; // 'en' | 'jp'

  return (
    <div className="w-full flex flex-col gap-16 my-24 md:mt-28 md:mb-16">
      {/* ========== 基本情報セクション ========== */}
      <section className="pt-4 md:pt-16 pb-4 md:pb-16">
        <div className="flex flex-col gap-4">
          <h1 className="text-heading-3xl md:text-heading-4xl font-semibold">
            {cvData.personalInfo.name[lang]}
          </h1>
          <p className={jpFontSize('text-body-lg', 'text-body-xl') + ' font-roboto'}>
            {cvData.personalInfo.title[lang]}
          </p>
          <p className={jpFontSize('text-body-base', 'text-body-lg') + ' font-roboto'}>
            {cvData.personalInfo.location[lang]} • {cvData.personalInfo.email}
          </p>
          <p className={jpFontSize('text-body-base', 'text-body-lg') + ' font-roboto'}>
            {cvData.personalInfo.summary[lang]}
          </p>
        </div>
      </section>

      {/* ========== 職歴セクション ========== */}
      <section className="pt-4 md:pt-16 pb-4 md:pb-16">
        <h2 className="text-heading-2xl md:text-heading-3xl mb-8">{t('workExperience')}</h2>
        <div className="flex flex-col gap-12">
          {cvData.workExperience.map((work) => (
            <WorkExperienceItem key={work.id} work={work} lang={lang} />
          ))}
        </div>
      </section>

      {/* ========== 学歴セクション ========== */}
      <section className="pt-4 md:pt-16 pb-4 md:pb-16">
        <h2 className="text-heading-2xl md:text-heading-3xl mb-8">{t('education')}</h2>
        <div className="flex flex-col gap-12">
          {cvData.education.map((edu) => (
            <EducationItem key={edu.id} education={edu} lang={lang} />
          ))}
        </div>
      </section>

      {/* ========== スキルセクション ========== */}
      <section className="pt-4 md:pt-16 pb-4 md:pb-16">
        <h2 className="text-heading-2xl md:text-heading-3xl mb-8">{t('skills')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cvData.skills.map((skillCategory, index) => (
            <SkillCategoryItem key={index} category={skillCategory} lang={lang} />
          ))}
        </div>
      </section>

      {/* ========== プロジェクトセクション ========== */}
      <section className="pt-4 md:pt-16 pb-4 md:pb-16">
        <h2 className="text-heading-2xl md:text-heading-3xl mb-8">{t('projects')}</h2>
        <div className="flex flex-col gap-12">
          {cvData.projects.map((project) => (
            <ProjectItem key={project.id} project={project} lang={lang} />
          ))}
        </div>
      </section>

      {/* ========== LinkedInセクション（オプション） ========== */}
      {linkedInData && (
        <section className="pt-4 md:pt-16 pb-4 md:pb-16">
          <h2 className="text-heading-2xl md:text-heading-3xl mb-8">{t('linkedIn')}</h2>
          <a
            href={linkedInData.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={jpFontSize('text-body-base', 'text-body-lg') + ' font-roboto hover:opacity-80'}
          >
            {linkedInData.profileUrl} →
          </a>
        </section>
      )}
    </div>
  );
}

