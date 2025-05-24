'use client';

import React from 'react';
import Spline from '@splinetool/react-spline';
import { useLanguage } from '@/src/lib/i18n';

const SplineWork: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="w-full py-12">
      {/* 横並びのflexレイアウト */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* 左カラム：Spline 3D */}
        <div className="lg:col-span-6 relative w-full h-[400px] md:h-[500px]">
          <div className="absolute inset-0 bg-gray-100 -z-10"></div>
          <Spline
            className="w-full rounded-[16px]"
            scene="https://prod.spline.design/HS2WPsXRP-WLukO0/scene.splinecode"
          />
        </div>

        {/* 右カラム：テキストなど */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <h2 className="text-heading-m-120 md:text-heading-l-20">Vision Pro + Spotify</h2>
          <p className="text-body-l-140">{t('visionProSpotifyDescription')}</p>

          {/* 制作情報 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <h3 className="text-caption-m-120 font-sf-mono text-gray-500 mb-2">Timeline</h3>
              <p className="text-body-l-140 font-sf-pro">{t('twoWeeksInJan2024')}</p>
            </div>
            <div>
              <h3 className="text-caption-m-120 font-sf-mono text-gray-500 mb-2">My Skills</h3>
              <p className="text-body-l-140 font-sf-pro">Spline</p>
            </div>
            <div>
              <h3 className="text-caption-m-120 font-sf-mono text-gray-500 mb-2">Type</h3>
              <p className="text-body-l-140 font-sf-pro">{t('solo')}</p>
            </div>
            <div>
              <h3 className="text-caption-m-120 font-sf-mono text-gray-500 mb-2">Deliverables</h3>
              <p className="text-body-l-140 font-sf-pro">{t('prototype')}</p>
            </div>
          </div>

          <button
            onClick={() => window.open('https://visionpro-spotify.netlify.app/', '_blank')}
            aria-label="Vision Pro + Spotify"
            className="w-fit all-[unset] box-border inline-flex flex-col items-start px-10 py-2 relative flex-[0_0_auto] border-2 border-black rounded-[40px]"
          >
            <div className="text-heading-xxs-120 py-1 z-10">{t('viewPrototype')}</div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default SplineWork;
