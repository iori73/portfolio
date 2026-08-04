'use client';
import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useTranslations, useLocale } from 'next-intl';

// Lazy-load the D3 interests viz so the ~250KB d3 bundle no longer inflates the
// About route JS — it loads as a separate chunk after the page shell renders.
const InterestsVisualization = dynamic(() => import('./InterestsVisualization'), {
  ssr: false,
  loading: () => <div className="w-4/5 mx-auto aspect-square" aria-hidden />,
});
import { useBodyFont, useHeadingFont } from '@/src/hooks/useFonts';
import { CTAButton } from '@/components/ui/cta-button';

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

  return (
    <div className="font-sans my-24 md:mt-28 md:mb-16">

      {/* ── Hero ── */}
      <section className="pb-4">
        <div className="flex flex-col md:flex-row items-start gap-10 md:gap-12">
          {/* Circle avatar */}
          <div className="shrink-0">
            <Image
              src="/about/my_image.webp"
              alt="Iori Kawano"
              width={160}
              height={160}
              className="rounded-full object-cover object-top"
              style={{ width: '20vw', height: '20vw', minWidth: 80, minHeight: 80, maxWidth: 240, maxHeight: 240 }}
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

            {/* 経歴・スキルは /cv が唯一のソース（cvData）。ここに同じものを並べると
                二重管理になるため、導線だけ置く。 */}
            <div className="mt-8">
              <CTAButton href={`/${locale}/cv`}>{t('viewFullCv')}</CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* ── My Interests ── */}
      <SectionLabel>{t('myInterests')}</SectionLabel>
      <p className={`text-body-lg ${getBodyFontClass()} mb-8`}>
        {t('interestsDescription')}
      </p>
      <InterestsVisualization />

    </div>
  );
};

export default AboutPage;
