'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useJPFontSize, useBodyFont, useHeadingFont } from '@/src/hooks/useFonts';

export default function Home() {
  const t = useTranslations();
  const { jpFontSize } = useJPFontSize();
  const { getBodyFontClass, getBodyFontStyle } = useBodyFont();
  const { getHeadingFontClass, getHeadingFontStyle } = useHeadingFont();

  return (
    <div className="mt-24 md:mt-28 md:mb-16">
      {/* Hero Section - Bilingual Layout */}
      <section className="py-16 md:py-24">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-end">
          {/* Left Column - English */}
          <div className="flex-1">
            <h1 className="text-heading-3xl md:text-heading-4xl mb-2">{t('hero.name')}</h1>
            <p className="text-body-lg md:text-body-xl font-helvetica-neue mb-1">{t('hero.description1')}</p>
            <p className="text-body-lg md:text-body-xl font-helvetica-neue">{t('hero.description2')}</p>
          </div>

          {/* Right Column - Japanese */}
          <div className="flex-1">
            <p className="text-body-base md:text-body-lg font-noto-sans-jp font-light mb-1">
              好奇心が私の仕事と人生を動かしています。
            </p>
            <p className="text-body-base md:text-body-lg font-noto-sans-jp font-light">誰もがつくれる時代に、デザインに「意味」をもたらすものを探っています。</p>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section className="py-8">
        {/* h2: Heading/L_M_120 - 常に英語 */}
        <h2 className="text-heading-2xl md:text-heading-3xl mb-16">Work</h2>

        {/* Project 1 - Gym Crowd Status Dashboard */}
        <Link href="/work/gym_crowd_status_dashboard" className="block mb-16 hover:opacity-80">
          <div className="mb-20">
            <div className="mb-6">
              <Image
                src="/figma-reference/gcsd_thumbnail_top.png"
                alt="Gym Crowd Status Dashboard"
                width={600}
                height={300}
                className="w-full object-cover rounded-lg"
              />
            </div>

            <div className="flex items-center gap-6 mb-4 flex-wrap md:flex-nowrap">
              <h3 className={`text-heading-xl md:text-heading-2xl ${getHeadingFontClass()}`}>
                {t('projects.gymDashboard.title')}
              </h3>
              <div className="flex gap-2">
                <span className="font-space-mono text-body-base md:text-body-lg px-3 py-1 rounded-lg bg-[#f5f5f7] text-[#696969]">
                  UI
                </span>
                <span className="font-space-mono text-body-base md:text-body-lg px-3 py-1 rounded-lg bg-[#f5f5f7] text-[#696969]">
                  Context Engineering
                </span>
              </div>
            </div>

            <p className={`mb-2 text-body-lg md:text-body-xl ${getBodyFontClass()}`}>{t('projects.gymDashboard.description1')}</p>
            <p
              className={`${getBodyFontClass()} ${jpFontSize(
                'text-body-base',
                'text-body-lg',
                'text-body-sm',
                'text-body-base',
              )}`}
            >
              {t('projects.gymDashboard.description2')}
            </p>
          </div>
        </Link>

        {/* Project 2 */}
        <Link href="/work/google_ux_design_certificate_project" className="block mb-16 hover:opacity-80">
          <div className="mb-20">
            <div className="mb-6">
              <Image
                src="/work/image2.png"
                alt="Google UX Design Certificate Project"
                width={600}
                height={300}
                className="w-full object-cover"
              />
            </div>
            <div className="flex items-center gap-6 mb-4 flex-wrap md:flex-nowrap">
              <h3 className={`text-heading-xl md:text-heading-2xl ${getHeadingFontClass()}`}>
                Google UX Design Certificate Project
              </h3>
              <div className="flex gap-2">
                <span className="font-space-mono text-body-base md:text-body-lg px-3 py-1 rounded-lg bg-[#f5f5f7] text-[#696969]">
                  Research
                </span>
                <span className="font-space-mono text-body-base md:text-body-lg px-3 py-1 rounded-lg bg-[#f5f5f7] text-[#696969]">
                  UI
                </span>
                <span className="font-space-mono text-body-base md:text-body-lg px-3 py-1 rounded-lg bg-[#f5f5f7] text-[#696969]">
                  UX
                </span>
              </div>
            </div>
            {/* Project 2の説明: 言語切り替え対応 */}
            <p className={`mb-2 text-body-lg md:text-body-xl ${getBodyFontClass()}`}>{t('projects.googleUX.description1')}</p>
            <p
              className={`${getBodyFontClass()} ${jpFontSize(
                'text-body-base',
                'text-body-lg',
                'text-body-sm',
                'text-body-base',
              )}`}
            >
              {t('projects.googleUX.description2')}
            </p>
          </div>
        </Link>
      </section>
    </div>
  );
}
