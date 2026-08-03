// Résumé document body — the 1–2 page application PDF, distinct from the 8-page
// portfolio deck in app/print/[locale]/portfolio/.
//
// Both read the same cvData, but they answer different questions. The deck is
// read by a design lead who asked for work samples; this is read by a recruiter
// in about thirty seconds, and by an ATS before that. So: single column, plain
// section headings, no figures, no tables, selectable text throughout.
//
// EN renders `variant="compact"` — one sheet, one line per project.
// JP renders `variant="detailed"` — 職務経歴書 shape, where per-project 課題/成果
// is expected rather than optional.

import { cvData } from '@/src/data/cvData';
import type { WorkExperience, WorkProject } from '@/src/data/cvData';
import { formatDateRange, formatProjectPeriod } from '@/src/cv/format';
import { buildProjectBlocks } from '@/src/cv/selectors';
import { bodyFontClass } from '@/src/cv/fontClasses';

type Labels = Record<string, string>;
type Variant = 'compact' | 'detailed';

/** Detail blocks the résumé keeps. See DetailedEntry for why the other two go. */
const RESUME_BLOCKS = ['caseContext', 'caseOutcome'];

/**
 * First sentence of the summary, used when a project has no explicit
 * `resumeLine`. Handles the JP full stop as well as the Latin one.
 */
function firstSentence(text: string): string {
  const m = text.match(/^[\s\S]*?[.。]/);
  return m ? m[0].trim() : text;
}

function resumeLineFor(project: WorkProject, lang: 'en' | 'jp'): string {
  return project.resumeLine?.[lang] ?? firstSentence(project.summary[lang]);
}

export function ResumeHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-space-grotesk text-label font-semibold text-ink-tertiary uppercase tracking-[0.08em] border-t border-line-section pt-1.5 mt-3 mb-1.5">
      {children}
    </h2>
  );
}

/** Role line: title and employer left, dates hard right. */
function EntryHeader({ work, lang }: { work: WorkExperience; lang: 'en' | 'jp' }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <h3 className="text-body font-semibold">
        {work.position[lang]}
        {work.employmentType && (
          <span className="font-normal text-ink-tertiary"> ({work.employmentType[lang]})</span>
        )}
        <span className="font-normal text-ink-secondary">
          {lang === 'jp' ? '／' : ', '}
          {work.company[lang]}
        </span>
      </h3>
      <span className="font-space-grotesk text-caption text-ink-tertiary shrink-0">
        {formatDateRange(work.startDate, work.endDate, lang)}
      </span>
    </div>
  );
}

function CompactEntry({ work, lang }: { work: WorkExperience; lang: 'en' | 'jp' }) {
  const body = bodyFontClass(lang);

  return (
    <div className="pdf-block mb-2.5">
      <EntryHeader work={work} lang={lang} />
      <p className={`text-body-sm ${body} text-ink-secondary leading-[1.45] mt-0.5`}>
        {work.summary[lang]}
      </p>
      {work.projects && work.projects.length > 0 && (
        <ul className="mt-1">
          {work.projects.map((project) => (
            <li
              key={project.id}
              className={`text-body-sm ${body} text-ink-secondary leading-[1.45] pl-3 relative`}
            >
              <span className="absolute left-0 text-ink-tertiary" aria-hidden="true">
                ·
              </span>
              <span className="font-space-grotesk text-caption text-ink-tertiary uppercase tracking-[0.05em]">
                {project.label[lang]}
              </span>
              {' — '}
              {resumeLineFor(project, lang)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function DetailedEntry({
  work,
  lang,
  labels,
}: {
  work: WorkExperience;
  lang: 'en' | 'jp';
  labels: Labels;
}) {
  const body = bodyFontClass(lang);

  return (
    <div className="mb-3">
      <div className="pdf-block mb-1.5">
        <EntryHeader work={work} lang={lang} />
        <p className={`text-body-sm ${body} text-ink-secondary leading-[1.5] mt-0.5`}>
          {work.summary[lang]}
        </p>
      </div>

      {work.projects?.map((project) => {
        // 課題 and 成果 only. Goal and deliverables belong in the portfolio deck;
        // a 職務経歴書 is screened on what the problem was and what came of it.
        const blocks = buildProjectBlocks(project, lang).filter((b) =>
          RESUME_BLOCKS.includes(b.labelKey),
        );
        return (
          <div key={project.id} className="pdf-block border-l-2 border-line-subtle pl-3 mb-2">
            <div className="mb-0.5">
              <span className="font-space-grotesk text-caption font-semibold text-ink-tertiary uppercase tracking-[0.06em]">
                {project.label[lang]}
              </span>
              <span className="font-space-grotesk text-caption text-ink-tertiary ml-2.5">
                {formatProjectPeriod(project.period, lang)}
              </span>
            </div>
            <p className={`text-body-sm ${body} text-ink-secondary leading-[1.5] mb-1`}>
              {project.summary[lang]}
            </p>
            {blocks.map(({ labelKey, items }) => (
              <div key={labelKey} className="mb-0.5">
                <h4 className="font-space-grotesk text-caption font-semibold text-ink-tertiary uppercase tracking-[0.06em]">
                  {labels[labelKey] ?? labelKey}
                </h4>
                <ul>
                  {items.map((item, i) => (
                    <li
                      key={i}
                      className={`text-caption ${body} text-ink-secondary leading-[1.45] pl-3 relative`}
                    >
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
      })}
    </div>
  );
}

/** Name block and contact line. The portfolio URL sits in the first two lines by design. */
export function ResumeHeader({ lang }: { lang: 'en' | 'jp' }) {
  const body = bodyFontClass(lang);
  const { personalInfo } = cvData;

  return (
    <header className="mb-3">
      <div className="flex items-baseline justify-between gap-4">
        <h1 className="text-headline leading-[1.1]">{personalInfo.name[lang]}</h1>
        <p className={`text-body ${body} text-ink-secondary`}>{personalInfo.title[lang]}</p>
      </div>
      <p className={`text-caption ${body} text-ink-tertiary mt-1.5`}>
        {personalInfo.location[lang]} · {personalInfo.email}
      </p>
      <p className={`text-caption ${body} text-ink-tertiary`}>
        {personalInfo.website?.replace(/^https?:\/\//, '')} · linkedin.com/in/iori-kawano
      </p>
    </header>
  );
}

export function ResumeSummary({ lang, labels }: { lang: 'en' | 'jp'; labels: Labels }) {
  const body = bodyFontClass(lang);
  return (
    <section className="pdf-block">
      <ResumeHeading>{labels.summary}</ResumeHeading>
      <p className={`text-body-sm ${body} text-ink-secondary leading-[1.5]`}>
        {cvData.personalInfo.resumeSummary?.[lang] ?? cvData.personalInfo.summary[lang]}
      </p>
    </section>
  );
}

export function ResumeExperience({
  lang,
  labels,
  variant,
  ids,
  heading = true,
}: {
  lang: 'en' | 'jp';
  labels: Labels;
  variant: Variant;
  /** Render only these workExperience ids, in cvData order. Omit for all. */
  ids?: string[];
  heading?: boolean;
}) {
  const entries = ids
    ? cvData.workExperience.filter((w) => ids.includes(w.id))
    : cvData.workExperience;

  return (
    <section>
      {heading && <ResumeHeading>{labels.workExperience}</ResumeHeading>}
      {entries.map((work) =>
        variant === 'compact' ? (
          <CompactEntry key={work.id} work={work} lang={lang} />
        ) : (
          <DetailedEntry key={work.id} work={work} lang={lang} labels={labels} />
        ),
      )}
    </section>
  );
}

/** Personal work. Hidden projects stay hidden here too. */
export function ResumeSelectedWork({ lang, labels }: { lang: 'en' | 'jp'; labels: Labels }) {
  const body = bodyFontClass(lang);
  const projects = cvData.projects.filter((p) => !p.hidden);
  const site = cvData.personalInfo.website?.replace(/^https?:\/\//, '') ?? '';

  return (
    <section className="pdf-block">
      <ResumeHeading>{labels.selectedWork}</ResumeHeading>
      {projects.map((project) => (
        <div key={project.id} className="flex items-baseline justify-between gap-4">
          <p className={`text-body-sm ${body} text-ink-secondary leading-[1.5]`}>
            <span className="font-semibold text-ink">{project.title[lang]}</span>
            {project.link && (
              <span className="text-ink-tertiary">
                {' '}
                {site}
                {project.link}
              </span>
            )}
          </p>
          <span className="font-space-grotesk text-caption text-ink-tertiary shrink-0">
            {project.period[lang]}
          </span>
        </div>
      ))}
    </section>
  );
}

export function ResumeEducation({ lang, labels }: { lang: 'en' | 'jp'; labels: Labels }) {
  return (
    <section className="pdf-block">
      <ResumeHeading>{labels.education}</ResumeHeading>
      {cvData.education.map((edu) => (
        <div key={edu.id} className="flex items-baseline justify-between gap-4">
          <h3 className="text-body-sm font-semibold">
            {lang === 'en'
              ? `${edu.degree.en} in ${edu.field.en}`
              : `${edu.field.jp}（${edu.degree.jp}）`}
            <span className="font-normal text-ink-secondary">
              {lang === 'jp' ? '／' : ', '}
              {edu.institution[lang]}
            </span>
          </h3>
          <span className="font-space-grotesk text-caption text-ink-tertiary shrink-0">
            {formatDateRange(edu.startDate, edu.endDate, lang)}
          </span>
        </div>
      ))}
    </section>
  );
}

/**
 * Skills and certifications. Certifications get their own row rather than being
 * worked into prose, which is what the copy rules ask for.
 */
export function ResumeSkills({ lang, labels }: { lang: 'en' | 'jp'; labels: Labels }) {
  const body = bodyFontClass(lang);
  const { skills, certifications } = cvData;

  return (
    <section className="pdf-block">
      <ResumeHeading>{labels.skills}</ResumeHeading>
      {skills.map((skill) => (
        <p
          key={skill.category.en}
          className={`text-body-sm ${body} text-ink-secondary leading-[1.5]`}
        >
          <span className="font-semibold text-ink">{skill.category[lang]}: </span>
          {skill.items.map((i) => i[lang]).join(', ')}
        </p>
      ))}

      {certifications && certifications.length > 0 && (
        <>
          <ResumeHeading>{labels.certifications}</ResumeHeading>
          <p className={`text-body-sm ${body} text-ink-secondary leading-[1.5]`}>
            {certifications
              .map((c) => `${c.name[lang]} (${c.date.split('-')[0]})`)
              .join(' · ')}
          </p>
        </>
      )}
    </section>
  );
}
