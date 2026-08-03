// app/print/[locale]/portfolio/page.tsx — the PDF document.
//
// Server component by design: this route is excluded from middleware.ts, so the
// locale comes from the URL segment rather than request detection. No
// NextIntlClientProvider, no useTranslations, no useFonts anywhere below here.
//
// Every page is a fixed-height .pdf-page so the baked footer numbers are always
// correct. scripts/generate-portfolio-pdf.mjs asserts that no page overflows and
// that the real PDF page count matches the number of .pdf-page elements — so
// growth in cvData surfaces as a loud failure, never a silent clip.
//
// Contents are work only (no personal projects), with clients kept anonymous
// behind industry labels, matching the public site.
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { cvData } from '@/src/data/cvData';
import PdfPage from '@/src/print/PdfPage';
import { PdfExperience, PdfEducationSkills } from '@/src/print/PdfResume';
import { bodyFontClass } from '@/src/cv/fontClasses';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'Portfolio (print)',
  robots: { index: false, follow: false },
};

const TOTAL = 8;

/** Section label in the shared caps style. */
function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-space-grotesk text-label font-semibold text-ink-tertiary uppercase tracking-[0.06em] mb-2">
      {children}
    </div>
  );
}

export default async function PrintPortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'en' | 'jp')) {
    notFound();
  }

  // Keep /print off the deployed site unless explicitly enabled. The generator
  // script sets this on the server it spawns.
  if (process.env.NODE_ENV === 'production' && process.env.ENABLE_PRINT_ROUTES !== '1') {
    notFound();
  }

  setRequestLocale(locale);
  const lang = locale as 'en' | 'jp';
  const t = await getTranslations({ locale });
  const body = bodyFontClass(lang);
  const { personalInfo } = cvData;

  // Pulled once so PdfResume stays free of next-intl.
  const labels = {
    workExperience: t('cv.workExperience'),
    education: t('cv.education'),
    skills: t('cv.skills'),
    caseContext: t('cv.caseContext'),
    caseGoal: t('cv.caseGoal'),
    caseDeliverables: t('cv.caseDeliverables'),
    caseOutcome: t('cv.caseOutcome'),
  };

  const a = (k: string) => t(`airlineDesignSystem.${k}`);
  const caseKicker = a('title');

  return (
    <div className="pdf-doc" data-lang={lang === 'jp' ? 'ja' : 'en'}>
      {/* ── 1. Cover ─────────────────────────────────────────────── */}
      <PdfPage n={1} total={TOTAL} lang={lang} kicker="">
        <div className="h-full flex flex-col">
          <Kicker>{lang === 'jp' ? 'ポートフォリオ' : 'Portfolio'}</Kicker>
          <h1 className="text-display leading-[1.05] mb-3">{personalInfo.name[lang]}</h1>
          <p className={`text-title ${body} text-ink-secondary mb-8`}>{personalInfo.title[lang]}</p>

          <div className="max-w-[150mm]">
            <p className={`text-body ${body} text-ink-secondary leading-[1.7]`}>
              {personalInfo.summary[lang]}
            </p>
          </div>

          <div className={`text-body-sm ${body} text-ink-tertiary mt-auto`}>
            <p>{personalInfo.location[lang]}</p>
            <p>
              <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
            </p>
            <p>
              <a href={personalInfo.website}>{personalInfo.website}</a>
            </p>
          </div>
        </div>
      </PdfPage>

      {/* ── 2–4. Résumé ──────────────────────────────────────────────
          Page breaks are explicit rather than auto-flowed so the baked footer
          numbers stay correct; the generator asserts no page overflows. */}
      <PdfPage n={2} total={TOTAL} lang={lang} kicker={labels.workExperience}>
        <PdfExperience lang={lang} labels={labels} ids={['work-accenture-song', 'work-yumemi']} />
      </PdfPage>

      <PdfPage n={3} total={TOTAL} lang={lang} kicker={labels.workExperience}>
        <PdfExperience
          lang={lang}
          labels={labels}
          ids={['work-yumemi-intern']}
          heading={false}
          projectIds={['yumemi-internal-survey', 'yumemi-design-system-docs']}
        />
      </PdfPage>

      <PdfPage n={4} total={TOTAL} lang={lang} kicker={labels.workExperience}>
        <PdfExperience
          lang={lang}
          labels={labels}
          ids={['work-yumemi-intern']}
          heading={false}
          showEntryHeader={false}
          projectIds={['yumemi-voice-push-1', 'yumemi-brand-lp']}
        />
        {/* Kibidango has no project entries, so it rides along at the end of the
            last work-experience page rather than claiming a sheet of its own. */}
        <PdfExperience lang={lang} labels={labels} ids={['work-kibidango']} heading={false} />
      </PdfPage>

      <PdfPage n={5} total={TOTAL} lang={lang} kicker={labels.education}>
        <PdfEducationSkills lang={lang} labels={labels} />
      </PdfPage>

      {/* ── 6. Airline — overview ────────────────────────────────── */}
      <PdfPage n={6} total={TOTAL} lang={lang} kicker={caseKicker} id="cs-airline">
        <Kicker>{a('type')}</Kicker>
        <h2 className="text-headline mb-2">{a('title')}</h2>
        <p className={`text-body-lg ${body} text-ink-secondary leading-[1.6] mb-5`}>{a('subtitle')}</p>

        {/* The hero is only 784px wide, so it can honestly carry ~104mm at 2x.
            Pairing it with a text column beats stretching it across the page. */}
        <div className="grid grid-cols-[104mm_1fr] gap-6 mb-5">
          <figure className="pdf-figure">
            <img src="/work/airline-design-system/system-structure.webp" alt="" />
          </figure>
          <div>
            <h3 className="text-title mb-1">{a('roleTitle')}</h3>
            <p className={`text-body-sm ${body} text-ink-secondary leading-[1.55]`}>{a('roleText')}</p>
          </div>
        </div>

        <p className={`text-body ${body} text-ink-secondary leading-[1.6] mb-2`}>{a('overviewText1')}</p>
        <p className={`text-body ${body} text-ink-secondary leading-[1.6] mb-4`}>{a('overviewText2')}</p>

        <div className="pdf-block">
          <h3 className="text-title mb-1">{a('challengeTitle')}</h3>
          <ul>
            {['challenge1', 'challenge2', 'challenge3'].map((k) => (
              <li
                key={k}
                className={`text-body-sm ${body} text-ink-secondary leading-[1.55] pl-3 relative`}
              >
                <span className="absolute left-0 text-ink-tertiary" aria-hidden="true">
                  ·
                </span>
                {a(k)}
              </li>
            ))}
          </ul>
        </div>
      </PdfPage>

      {/* ── 7. Airline — design process ──────────────────────────── */}
      <PdfPage n={7} total={TOTAL} lang={lang} kicker={caseKicker}>
        <Kicker>{t('work.designProcess')}</Kicker>
        <p className={`text-body ${body} text-ink-secondary leading-[1.6] mb-5`}>
          {a('designProcessIntro')}
        </p>

        <div className="pdf-block mb-5">
          <h3 className="text-title mb-1">{a('competitiveTitle')}</h3>
          <p className={`text-body-sm ${body} text-ink-secondary leading-[1.55] mb-2`}>
            {a('competitiveText')}
          </p>
          {/* Very tall full-page captures — show a top band and label it an excerpt. */}
          <div className="grid grid-cols-3 gap-3">
            {['competitive-1', 'competitive-2', 'competitive-4'].map((n) => (
              <figure key={n} className="pdf-figure pdf-figure--band" style={{ '--band-h': '38mm' } as React.CSSProperties}>
                <img src={`/work/airline-design-system/${n}.webp`} alt="" />
              </figure>
            ))}
          </div>
          <figcaption className="text-caption font-space-grotesk text-ink-tertiary mt-1">
            {a('captionCompetitive')} ({lang === 'jp' ? '抜粋' : 'excerpt'})
          </figcaption>
        </div>

        <div className="pdf-block mb-5">
          <h3 className="text-title mb-1">{a('auditTitle')}</h3>
          <p className={`text-body-sm ${body} text-ink-secondary leading-[1.55]`}>{a('auditText')}</p>
        </div>

        <div className="pdf-block">
          <h3 className="text-title mb-1">{a('tokenTitle')}</h3>
          <p className={`text-body-sm ${body} text-ink-secondary leading-[1.55] mb-2`}>{a('tokenText')}</p>
          <div className="grid grid-cols-[1fr_70mm] gap-4 items-start">
            <p className={`text-body-sm ${body} text-ink-secondary leading-[1.55]`}>{a('colorTypoText')}</p>
            <figure className="pdf-figure pdf-figure--band" style={{ '--band-h': '46mm' } as React.CSSProperties}>
              <img src="/work/airline-design-system/token-architecture.webp" alt="" />
              <figcaption className="text-caption font-space-grotesk text-ink-tertiary mt-1">
                {a('captionToken')}
              </figcaption>
            </figure>
          </div>
        </div>
      </PdfPage>

      {/* ── 8. Airline — solution & impact ───────────────────────── */}
      <PdfPage n={8} total={TOTAL} lang={lang} kicker={caseKicker}>
        <Kicker>{t('work.solution')}</Kicker>
        <p className={`text-body ${body} text-ink-secondary leading-[1.6] mb-4`}>{a('solutionIntro')}</p>

        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { v: '399', k: 'stat1' },
            { v: '6', k: 'stat2' },
            { v: '3 + 3', k: 'stat3' },
          ].map(({ v, k }) => (
            <div key={k} className="pdf-figure rounded-lg bg-surface-muted p-3">
              <p className="text-title font-space-grotesk font-semibold text-ink mb-1">{v}</p>
              <p className={`text-caption ${body} text-ink-tertiary leading-[1.4]`}>{a(k)}</p>
            </div>
          ))}
        </div>

        {[
          ['tokenSystemTitle', 'tokenSystemText'],
          ['pluginsTitle', 'pluginsText'],
          ['prototypeTitle', 'prototypeText'],
          ['docsTitle', 'docsText'],
        ].map(([titleKey, textKey]) => (
          <div key={titleKey} className="pdf-block mb-3">
            <h3 className="text-title mb-1">{a(titleKey)}</h3>
            <p className={`text-body-sm ${body} text-ink-secondary leading-[1.55]`}>{a(textKey)}</p>
          </div>
        ))}

        <div className="pdf-block border-t border-line-section pt-3 mt-4">
          <Kicker>{t('work.reflection')}</Kicker>
          {[
            ['impactTitle', 'impactText'],
            ['learningTitle', 'learningText'],
          ].map(([titleKey, textKey]) => (
            <div key={titleKey} className="mb-2">
              <h3 className="text-title-sm mb-1">{a(titleKey)}</h3>
              <p className={`text-body-sm ${body} text-ink-secondary leading-[1.55]`}>{a(textKey)}</p>
            </div>
          ))}
        </div>
      </PdfPage>
    </div>
  );
}
