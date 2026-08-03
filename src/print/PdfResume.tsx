// Résumé pages for the PDF. Server component.
//
// Renders the SAME cvData the /cv page does, but flat: every project's detail
// blocks are always visible. The /cv page hides them behind Radix Collapsible,
// whose CollapsibleContent unmounts while closed — a naive page.pdf() of /cv
// would silently drop all of it. Block order and the empty-block filter come
// from src/cv/selectors.ts so the two renderers cannot drift.
//
// Layout is block + margin rather than flex: these pages auto-flow across
// sheets, and Chromium ignores `break-inside: avoid` on flex items and leaves
// stray `gap` whitespace at page tops.

import { cvData } from '@/src/data/cvData';
import type { WorkExperience, WorkProject } from '@/src/data/cvData';
import { formatDateRange, formatProjectPeriod } from '@/src/cv/format';
import { buildProjectBlocks } from '@/src/cv/selectors';
import { bodyFontClass } from '@/src/cv/fontClasses';

type Labels = Record<string, string>;

function ProjectEntry({
  project,
  lang,
  labels,
}: {
  project: WorkProject;
  lang: 'en' | 'jp';
  labels: Labels;
}) {
  const body = bodyFontClass(lang);
  const blocks = buildProjectBlocks(project, lang);

  return (
    <div className="pdf-block border-l-2 border-line-subtle pl-3 mb-2.5">
      <div className="mb-1">
        <span className="font-space-grotesk text-label font-semibold text-ink-tertiary uppercase tracking-[0.06em]">
          {project.label[lang]}
        </span>
        <span className="font-space-grotesk text-label text-ink-tertiary ml-3">
          {formatProjectPeriod(project.period, lang)}
        </span>
      </div>

      <p className={`text-body ${body} text-ink-secondary leading-[1.55] mb-1.5`}>
        {project.summary[lang]}
      </p>

      {blocks.map(({ labelKey, items }) => (
        <div key={labelKey} className="mb-1">
          <h4 className="font-space-grotesk text-caption font-semibold text-ink-tertiary uppercase tracking-[0.06em] mb-0.5">
            {labels[labelKey] ?? labelKey}
          </h4>
          <ul>
            {items.map((item, i) => (
              <li key={i} className={`text-body-sm ${body} text-ink-secondary leading-[1.5] pl-3 relative`}>
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
  );
}

function ExperienceEntry({
  work,
  lang,
  labels,
  projectIds,
  showHeader = true,
}: {
  work: WorkExperience;
  lang: 'en' | 'jp';
  labels: Labels;
  /** Render only these project ids. Omit for all. */
  projectIds?: string[];
  /** False when the entry continues from the previous page. */
  showHeader?: boolean;
}) {
  const body = bodyFontClass(lang);
  const projects = projectIds
    ? work.projects?.filter((p) => projectIds.includes(p.id))
    : work.projects;

  return (
    <div className="mb-4">
      {showHeader ? (
        // Header stays with at least the summary below it.
        <div className="pdf-block mb-2">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-title">
              {work.position[lang]}
              {work.employmentType && (
                <span className="text-ink-tertiary"> ({work.employmentType[lang]})</span>
              )}
              <span className="text-ink-secondary"> — {work.company[lang]}</span>
            </h3>
            <span className="font-space-grotesk text-label text-ink-tertiary shrink-0">
              {formatDateRange(work.startDate, work.endDate, lang)}
            </span>
          </div>
          <p className={`text-body-sm ${body} text-ink-secondary leading-[1.55] mt-1`}>
            {work.summary[lang]}
          </p>
        </div>
      ) : (
        <p className="font-space-grotesk text-label text-ink-tertiary mb-2">
          {work.company[lang]}
          {work.employmentType && ` (${work.employmentType[lang]})`}
          {lang === 'jp' ? ' — 続き' : ' — continued'}
        </p>
      )}

      {projects?.map((project) => (
        <ProjectEntry key={project.id} project={project} lang={lang} labels={labels} />
      ))}
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-space-grotesk text-label font-semibold text-ink-tertiary uppercase tracking-[0.06em] border-t border-line-section pt-2 mb-2">
      {children}
    </h2>
  );
}

/**
 * Work-experience entries, optionally sliced so the caller can lay them out
 * across explicit fixed pages. Every page in this document is fixed-height so
 * the baked footer numbers are always right; the generator asserts that nothing
 * overflows, so growth in cvData surfaces as a loud error rather than a silent clip.
 */
export function PdfExperience({
  lang,
  labels,
  ids,
  heading = true,
  projectIds,
  showEntryHeader = true,
}: {
  lang: 'en' | 'jp';
  labels: Labels;
  /** Render only these workExperience ids, in cvData order. Omit for all. */
  ids?: string[];
  heading?: boolean;
  /** Render only these project ids (used when one entry spans two pages). */
  projectIds?: string[];
  /** False when the entry is continued from the previous page. */
  showEntryHeader?: boolean;
}) {
  const entries = ids
    ? cvData.workExperience.filter((w) => ids.includes(w.id))
    : cvData.workExperience;

  return (
    <>
      {heading && <SectionHeading>{labels.workExperience}</SectionHeading>}
      {entries.map((work) => (
        <ExperienceEntry
          key={work.id}
          work={work}
          lang={lang}
          labels={labels}
          projectIds={projectIds}
          showHeader={showEntryHeader}
        />
      ))}
    </>
  );
}

export function PdfEducationSkills({ lang, labels }: { lang: 'en' | 'jp'; labels: Labels }) {
  const body = bodyFontClass(lang);
  const { personalInfo, education, skills } = cvData;

  return (
    <>
      <SectionHeading>{labels.education}</SectionHeading>
      {education.map((edu) => (
        <div key={edu.id} className="pdf-block mb-3">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-title">
              {lang === 'en'
                ? `${edu.degree.en} in ${edu.field.en}`
                : `${edu.field.jp}（${edu.degree.jp}）`}
              <span className="text-ink-secondary"> — {edu.institution[lang]}</span>
            </h3>
            <span className="font-space-grotesk text-label text-ink-tertiary shrink-0">
              {formatDateRange(edu.startDate, edu.endDate, lang)}
            </span>
          </div>
          {edu.description && (
            <p className={`text-body-sm ${body} text-ink-secondary leading-[1.55] mt-1`}>
              {edu.description[lang]}
            </p>
          )}
        </div>
      ))}

      <SectionHeading>{labels.skills}</SectionHeading>
      <div className="pdf-block">
        {skills.map((skill) => (
          <div key={skill.category.en} className="mb-2">
            <span className="font-space-grotesk text-caption font-semibold text-ink-tertiary uppercase tracking-[0.06em]">
              {skill.category[lang]}
            </span>
            <p className={`text-body-sm ${body} text-ink-secondary leading-[1.55]`}>
              {skill.items.join(', ')}
            </p>
          </div>
        ))}
      </div>

      <p className={`text-caption ${body} text-ink-tertiary mt-4`}>
        {personalInfo.email} · {personalInfo.website}
      </p>
    </>
  );
}
