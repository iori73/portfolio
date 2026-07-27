'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useBodyFont } from '@/src/hooks/useFonts';
import { CTAButton } from '@/components/ui/cta-button';

const FavoriteVisuals: React.FC = () => {
  const t = useTranslations('experiment');
  const tCommon = useTranslations('common');
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
              src="/favorite_visuals.webp"
              alt="Favorite Visuals"
              className="w-full max-w-lg mx-auto rounded-[16px]"
            />
          </div>
        </div>

        {/* 右カラム：テキストなど */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <h2 className="text-headline">{t('favoriteVisuals')}</h2>
          <p className={`text-body-lg ${getBodyFontClass()}`}>{t('favoriteVisualsDescription')}</p>

          <blockquote
            className={`border-l-4 border-line-section pl-4 italic text-body-sm ${getBodyFontClass()} text-ink-tertiary`}
          >
            {t('favoriteVisualsNote')}
          </blockquote>

          <CTAButton
            href="https://elite-kite-224.notion.site/Favorite-Visuals-2b233d06cce38096b428c41871d97102?pvs=73"
            external
            className="w-full md:w-auto md:self-start"
          >
            {tCommon('goToPage')}
          </CTAButton>
        </div>
      </div>
    </section>
  );
};

export default FavoriteVisuals;
