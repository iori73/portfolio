// app/print/[locale]/resume/page.tsx — the application résumé PDF.
//
// Sibling of ./portfolio/, same rules: server component, locale from the URL
// segment, no next-intl client provider below here.
//
// The two locales are deliberately NOT the same document translated. An English
// résumé merges 履歴書 and 職務経歴書 into one short sheet and leaves motivation to
// the cover letter, so EN is one page. A Japanese 職務経歴書 is expected to carry
// per-project 課題 / 担当 / 成果, so JP runs to two and reuses the detail blocks
// that already exist in cvData.
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import PdfPage from '@/src/print/PdfPage';
import {
  ResumeHeader,
  ResumeSummary,
  ResumeExperience,
  ResumeSelectedWork,
  ResumeEducation,
  ResumeSkills,
} from '@/src/print/PdfResumeDoc';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'Résumé (print)',
  robots: { index: false, follow: false },
};

export default async function PrintResumePage({
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

  const labels = {
    summary: t('cv.summary'),
    workExperience: t('cv.workExperience'),
    selectedWork: t('cv.selectedWork'),
    education: t('cv.education'),
    skills: t('cv.skills'),
    certifications: t('cv.certifications'),
    caseContext: t('cv.caseContext'),
    caseGoal: t('cv.caseGoal'),
    caseDeliverables: t('cv.caseDeliverables'),
    caseOutcome: t('cv.caseOutcome'),
  };

  // EN: one sheet.
  if (lang === 'en') {
    return (
      <div className="pdf-doc pdf-resume" data-lang="en">
        <PdfPage n={1} total={1} lang={lang} kicker="Résumé" docName="Résumé">
          <ResumeHeader lang={lang} />
          <ResumeSummary lang={lang} labels={labels} />
          <ResumeExperience lang={lang} labels={labels} variant="compact" />
          <ResumeSelectedWork lang={lang} labels={labels} />
          <ResumeEducation lang={lang} labels={labels} />
          <ResumeSkills lang={lang} labels={labels} />
        </PdfPage>
      </div>
    );
  }

  // JP: 職務経歴書. One page per employer era, then a closing page for the
  // remaining role, personal work, education, skills and certifications.
  return (
    <div className="pdf-doc pdf-resume" data-lang="ja">
      <PdfPage n={1} total={3} lang={lang} kicker="職務経歴書" docName="職務経歴書">
        <ResumeHeader lang={lang} />
        <ResumeSummary lang={lang} labels={labels} />
        <ResumeExperience
          lang={lang}
          labels={labels}
          variant="detailed"
          ids={['work-accenture-song', 'work-yumemi']}
        />
      </PdfPage>

      <PdfPage n={2} total={3} lang={lang} kicker="職務経歴書" docName="職務経歴書">
        <ResumeExperience
          lang={lang}
          labels={labels}
          variant="detailed"
          ids={['work-yumemi-intern']}
          heading={false}
        />
      </PdfPage>

      <PdfPage n={3} total={3} lang={lang} kicker="職務経歴書" docName="職務経歴書">
        <ResumeExperience
          lang={lang}
          labels={labels}
          variant="detailed"
          ids={['work-kibidango']}
          heading={false}
        />
        <ResumeSelectedWork lang={lang} labels={labels} />
        <ResumeEducation lang={lang} labels={labels} />
        <ResumeSkills lang={lang} labels={labels} />
      </PdfPage>
    </div>
  );
}
