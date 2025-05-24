'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage, useJPFontSize } from '@/src/lib/i18n';

export default function Home() {
  const { t } = useLanguage();
  const { jpFontSize } = useJPFontSize();

  return (
    <>
      {/* Hero Section */}
      <section className="py-16">
        {/* h1: Heading/L_M_120 - 常に英語 */}
        <h1 className="text-heading-l-120 md:text-heading-xl-m-120 font-merriweather mb-2">Hi, I'm Iori!</h1>
        {/* Hero テキスト: Body/XXL_140 - 言語切り替え対応 */}
        <p
          className={`max-w-full font-roboto ${jpFontSize(
            'text-body-xl-140',
            'text-body-xxl-140',
            'text-body-l-140',
            'text-body-xl-140',
          )}`}
        >
          {t('heroDescription1')}
          <br />
          {t('heroDescription2')}
        </p>
      </section>

      {/* Work Section */}
      <section className="py-8">
        {/* h2: Heading/L_M_120 - 常に英語 */}
        <h2 className="text-heading-m-120 md:text-heading-l-20 font-merriweather mb-16">Work</h2>

        {/* Project 1 */}
        <Link href="/work/2_day_internship" className="block mb-16 hover:opacity-80">
          <div className="mb-20">
            <div className="mb-6">
              <Image
                src="/work/image1.png"
                alt="2 Day Internship Project"
                width={600}
                height={300}
                className="w-full object-cover"
              />
            </div>

            <div className="flex items-center gap-6 mb-4 flex-wrap md:flex-nowrap">
              <h3 className="text-heading-s-120 md:text-heading-m-120 font-merriweather">2 Day Internship</h3>
              <div className="flex gap-2">
                <span className="text-body-l-140 font-roboto px-4 py-1 rounded-[16px] bg-[#f5f5f7] text-[#696969]">
                  UI
                </span>
                <span className="text-body-l-140 font-roboto px-4 py-1 rounded-[16px] bg-[#f5f5f7] text-[#696969]">
                  Rapid Design
                </span>
              </div>
            </div>

            {/* Project 1の説明: 言語切り替え対応 */}
            <p
              className={`mb-2 font-roboto ${jpFontSize(
                'text-body-xl-140',
                'text-body-xxl-140',
                'text-body-l-140',
                'text-body-xl-140',
              )}`}
            >
              {t('project1Description1')}
            </p>
            <p
              className={`font-roboto ${jpFontSize(
                'text-body-m-140',
                'text-body-l-140',
                'text-body-s-140',
                'text-body-m-140',
              )}`}
            >
              {t('project1Description2')}
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
              <h3 className="text-heading-s-120 md:text-heading-m-120 font-merriweather">
                Google UX Design Certificate Project
              </h3>
              <div className="flex gap-2">
                <span className="text-body-l-140 font-roboto px-4 py-1 rounded-[16px] bg-[#f5f5f7] text-[#696969]">
                  Research
                </span>
                <span className="text-body-l-140 font-roboto px-4 py-1 rounded-[16px] bg-[#f5f5f7] text-[#696969]">
                  UI
                </span>
                <span className="text-body-l-140 font-roboto px-4 py-1 rounded-[16px] bg-[#f5f5f7] text-[#696969]">
                  UX
                </span>
              </div>
            </div>
            {/* Project 2の説明: 言語切り替え対応 */}
            <p
              className={`mb-2 font-roboto ${jpFontSize(
                'text-body-xl-140',
                'text-body-xxl-140',
                'text-body-l-140',
                'text-body-xl-140',
              )}`}
            >
              {t('project2Description1')}
            </p>
            <p
              className={`font-roboto ${jpFontSize(
                'text-body-m-140',
                'text-body-l-140',
                'text-body-s-140',
                'text-body-m-140',
              )}`}
            >
              {t('project2Description2')}
            </p>
          </div>
        </Link>
      </section>
    </>
  );
}
