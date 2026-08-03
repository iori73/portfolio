'use client';
import React, { useEffect, useState } from 'react';
import { cvData, WorkExperience, WorkProject, Education, SkillCategory, Project } from '@/src/data/cvData';
import { useLocale, useTranslations } from 'next-intl';
import { useHeadingFont, useBodyFont } from '@/src/hooks/useFonts';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
// 日付整形と detail ブロックの組み立ては print（PDF）側と共有する。
// ここで再定義すると両者がサイレントに乖離するため src/cv/* を参照すること。
import { formatDateRange, formatProjectPeriod } from '@/src/cv/format';
import { buildProjectBlocks } from '@/src/cv/selectors';

// 案件カード。detail があれば展開可能、なければ静的表示
const WorkProjectCard: React.FC<{ project: WorkProject; lang: 'en' | 'jp' }> = ({ project, lang }) => {
  const t = useTranslations('cv');
  const { getBodyFontClass } = useBodyFont();
  const [open, setOpen] = useState(false);

  // 案件カードの本文は職務サマリー（text-body）の一段下。実機で両者が同じ大きさに
  // 見えて入れ子が読めなかったため、サイズで従属関係を出す。
  const bodyClass = `text-body-sm ${getBodyFontClass()} text-ink-secondary leading-[1.6]`;
  const meta = (
    <div className="flex items-baseline gap-3">
      <span className="font-space-grotesk text-label font-semibold text-ink uppercase tracking-caps">
        {project.label[lang]}
      </span>
      <span className="font-space-grotesk text-caption text-ink-tertiary">
        {formatProjectPeriod(project.period, lang)}
      </span>
    </div>
  );

  if (!project.detail) {
    return (
      <div className="border-l-2 border-line-section pl-4 flex flex-col gap-1">
        {meta}
        <p className={bodyClass}>{project.summary[lang]}</p>
      </div>
    );
  }

  const blocks = buildProjectBlocks(project, lang);

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="border-l-2 border-line-section pl-4">
      <CollapsibleTrigger className="group w-full min-h-[44px] py-1 flex flex-col gap-1 text-left rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2">
        {meta}
        <div className="flex items-start gap-3">
          <p className={bodyClass}>{project.summary[lang]}</p>
          <svg
            className="shrink-0 mt-1 size-4 text-ink-tertiary transition-transform duration-200 motion-reduce:transition-none group-data-[state=open]:rotate-90"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6 3.5 10.5 8 6 12.5" />
          </svg>
        </div>
        <span className="sr-only">{open ? t('hideDetail') : t('showDetail')}</span>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className="flex flex-col gap-4 pt-4 pb-2">
          {blocks.map(({ labelKey, items }) => (
            <div key={labelKey} className="flex flex-col gap-1.5">
              <h4 className="font-space-grotesk text-label font-semibold text-ink-tertiary uppercase tracking-[0.06em]">
                {t(labelKey)}
              </h4>
              <ul className="flex flex-col gap-1.5">
                {items?.map((item, index) => (
                  <li key={index} className={`${bodyClass} pl-4 relative`}>
                    <span className="absolute left-0 text-ink-tertiary" aria-hidden="true">
                      ·
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

// 職歴アイテムコンポーネント
const WorkExperienceItem: React.FC<{ work: WorkExperience; lang: 'en' | 'jp' }> = ({ work, lang }) => {
  const { getBodyFontClass } = useBodyFont();

  return (
    <div className="flex flex-col gap-6">
      {/* 会社ヘッダー */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1">
        <div className="flex-1">
          <h3 className="text-title-lg">
            {work.position[lang]}
            {work.employmentType && (
              <span className="text-ink-tertiary"> ({work.employmentType[lang]})</span>
            )}
          </h3>
          <p className={`text-body-lg ${getBodyFontClass()} text-ink-secondary`}>{work.company[lang]}</p>
          <p className={`text-body ${getBodyFontClass()} text-ink-tertiary`}>{work.location[lang]}</p>
        </div>
        <p className="text-body-sm font-space-grotesk text-ink-tertiary shrink-0 pt-1">
          {formatDateRange(work.startDate, work.endDate, lang)}
        </p>
      </div>

      {/* サマリー */}
      <p className={`text-body ${getBodyFontClass()} text-ink-secondary leading-[1.6]`}>{work.summary[lang]}</p>

      {/* プロジェクトカード一覧 */}
      {work.projects && work.projects.length > 0 && (
        <div className="flex flex-col gap-3">
          {work.projects.map((project) => (
            <WorkProjectCard key={project.id} project={project} lang={lang} />
          ))}
        </div>
      )}

      {/* テクノロジータグ */}
      {work.technologies && work.technologies.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {work.technologies.map((tech) => (
            <span
              key={tech}
              className="font-space-grotesk text-label leading-[1.3] px-3 py-1 rounded-lg bg-surface-muted text-ink-tertiary"
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
  const { getBodyFontClass } = useBodyFont();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
        <div className="flex-1">
          <h3 className="text-title-lg">
            {lang === 'en'
              ? `${education.degree.en} in ${education.field.en}`
              : `${education.field.jp} 卒業（${education.degree.jp}）`}
          </h3>
          <p className={`text-body-lg ${getBodyFontClass()}`}>
            {education.institution[lang]}
          </p>
          {education.description && (
            <p className={`text-body ${getBodyFontClass()}`}>
              {education.description[lang]}
            </p>
          )}
        </div>
        <p className="text-body-sm font-space-grotesk">
          {formatDateRange(education.startDate, education.endDate, lang)}
        </p>
      </div>
    </div>
  );
};

// スキルカテゴリアイテムコンポーネント
const SkillCategoryItem: React.FC<{ category: SkillCategory; lang: 'en' | 'jp' }> = ({ category, lang }) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-title-lg">{category.category[lang]}</h3>
      <div className="flex flex-wrap gap-2">
        {category.items.map((item) => (
          <span
            key={item.en}
            className="font-space-grotesk text-label md:text-body-lg leading-[1.3] px-3 py-1 rounded-lg bg-surface-muted text-ink-tertiary"
          >
            {item[lang]}
          </span>
        ))}
      </div>
    </div>
  );
};

// プロジェクトアイテムコンポーネント
const ProjectItem: React.FC<{ project: Project; lang: 'en' | 'jp' }> = ({ project, lang }) => {
  const t = useTranslations('cv');
  const { getBodyFontClass } = useBodyFont();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
        <h3 className="text-title-lg">{project.title[lang]}</h3>
        <p className="text-body-sm font-space-grotesk">
          {project.period[lang]}
        </p>
      </div>
      <p className={`text-body ${getBodyFontClass()}`}>
        {project.description[lang]}
      </p>
      {project.technologies && (
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="font-space-grotesk text-label md:text-body-lg leading-[1.3] px-3 py-1 rounded-lg bg-surface-muted text-ink-tertiary"
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
          className={`text-body ${getBodyFontClass()} hover:opacity-80`}
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

  const lang = locale as 'en' | 'jp';
  const { getHeadingFontClass } = useHeadingFont();
  const { getBodyFontClass } = useBodyFont();

  return (
    <div className="w-full flex flex-col gap-16 my-24 md:mt-28 md:mb-16">
      {/* ========== 基本情報セクション ========== */}
      <section className="pt-4 md:pt-16 pb-4 md:pb-16">
        <div className="flex flex-col gap-4">
          <h1 className={`text-display font-semibold ${getHeadingFontClass()}`}>
            {cvData.personalInfo.name[lang]}
          </h1>
          <p className={`text-body-lg ${getBodyFontClass()}`}>
            {cvData.personalInfo.title[lang]}
          </p>
          <p className={`text-body ${getBodyFontClass()}`}>
            {cvData.personalInfo.location[lang]}
          </p>
          <p className={`text-body ${getBodyFontClass()}`}>
            {cvData.personalInfo.summary[lang]}
          </p>
          {/* Generated by `pnpm generate:pdf` from this same cvData, so the sheet
              and the page cannot drift. See .gitignore for why only the résumé
              is committed. */}
          <a
            href={`/downloads/Iori-Kawano-Resume-${lang.toUpperCase()}.pdf`}
            download
            className={`self-start mt-2 inline-flex items-center gap-2 rounded-lg border border-line-section px-4 py-2 text-body ${getBodyFontClass()} text-ink-secondary transition-colors hover:bg-surface-muted hover:text-ink`}
          >
            {t('downloadPdf')}
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      {/* ========== 職歴セクション ========== */}
      <section className="pt-4 md:pt-16 pb-4 md:pb-16">
        <h2 className="text-headline mb-8">{t('workExperience')}</h2>
        <div className="flex flex-col gap-12">
          {cvData.workExperience.map((work) => (
            <WorkExperienceItem key={work.id} work={work} lang={lang} />
          ))}
        </div>
      </section>

      {/* ========== 学歴セクション ========== */}
      <section className="pt-4 md:pt-16 pb-4 md:pb-16">
        <h2 className="text-headline mb-8">{t('education')}</h2>
        <div className="flex flex-col gap-12">
          {cvData.education.map((edu) => (
            <EducationItem key={edu.id} education={edu} lang={lang} />
          ))}
        </div>
      </section>

      {/* ========== スキルセクション ========== */}
      <section className="pt-4 md:pt-16 pb-4 md:pb-16">
        <h2 className="text-headline mb-8">{t('skills')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cvData.skills.map((skillCategory, index) => (
            <SkillCategoryItem key={index} category={skillCategory} lang={lang} />
          ))}
        </div>
      </section>

      {/* ========== プロジェクトセクション ========== */}
      <section className="pt-4 md:pt-16 pb-4 md:pb-16">
        <h2 className="text-headline mb-8">{t('projects')}</h2>
        <div className="flex flex-col gap-12">
          {cvData.projects
            .filter((project) => !project.hidden)
            .map((project) => (
              <ProjectItem key={project.id} project={project} lang={lang} />
            ))}
        </div>
      </section>

      {/* ========== LinkedInセクション（オプション） ========== */}
      {linkedInData && (
        <section className="pt-4 md:pt-16 pb-4 md:pb-16">
          <h2 className="text-headline mb-8">{t('linkedIn')}</h2>
          <a
            href={linkedInData.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-body ${getBodyFontClass()} hover:opacity-80`}
          >
            {linkedInData.profileUrl} →
          </a>
        </section>
      )}
    </div>
  );
}
