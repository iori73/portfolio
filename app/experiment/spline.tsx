'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useBodyFont } from '@/src/hooks/useFonts';

const FavoriteVisuals: React.FC = () => {
  const t = useTranslations('experiment');
  const { getBodyFontClass } = useBodyFont();

  return (
    <section className="w-full py-12">
      {/* 横並びのflexレイアウト */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* 左カラム：ビジュアル */}
        <div className="lg:col-span-6 relative">
          <div className="absolute inset-0 -z-10"></div>
          <div className="relative pt-0 md:pt-8">
            <img
              src="/favorite_visuals.png"
              alt="Favorite Visuals"
              className="w-full max-w-lg mx-auto rounded-[16px]"
            />
          </div>
        </div>

        {/* 右カラム：テキストなど */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <h2 className="text-heading-2xl md:text-heading-3xl">{t('favoriteVisuals')}</h2>
          <p className={`text-body-base md:text-body-lg ${getBodyFontClass()}`}>{t('favoriteVisualsDescription')}</p>

          <blockquote
            className={`border-l-4 border-gray-300 pl-4 italic text-body-sm md:text-body-base ${getBodyFontClass()} text-gray-600`}
          >
            {t('favoriteVisualsNote')}
          </blockquote>

          <a
            href="https://elite-kite-224.notion.site/Favorite-Visuals-2b233d06cce38096b428c41871d97102?pvs=73"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center px-6 py-3 rounded-[100px] text-[#0000008f] hover:text-white cursor-pointer transition-[color] duration-300 whitespace-nowrap overflow-hidden group w-full md:w-auto md:self-start"
            style={{
              background:
                'radial-gradient(75% 150% at 100% 114.2%, rgba(210, 210, 215, 0.4) 0%, rgba(180, 180, 185, 0.4) 100%)',
              backdropFilter: 'blur(8px)',
            }}
          >
            {/* Hover background overlay */}
            <span
              className="absolute inset-0 rounded-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background:
                  'radial-gradient(75% 150% at 100% 114.2%, rgba(210, 210, 215, 0.8) 0%, rgba(180, 180, 185, 0.8) 100%)',
                backdropFilter: 'blur(8px)',
              }}
            />
            <span className="relative z-10 text-body-lg md:text-body-xl font-semibold">{t('goToPage')}</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FavoriteVisuals;
