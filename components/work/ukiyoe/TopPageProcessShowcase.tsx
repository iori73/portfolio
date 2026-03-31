'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useHeadingFont } from '@/src/hooks/useFonts';

const PHASES = [
  {
    key: 'topPagePhaseBenizuri' as const,
    image: '/work/ukiyoe/process-toppage/Benizuri-e.png',
    swatches: ['#c04545', '#7a9060'], // Beni, Midori
  },
  {
    key: 'topPagePhaseNishiki' as const,
    image: '/work/ukiyoe/process-toppage/Nishiki-e.png',
    swatches: ['#c9a050', '#607888', '#2a3848', '#c04545'], // Kin, Ao, Ai, Beni
  },
] as const;

export default function TopPageProcessShowcase() {
  const t = useTranslations('ukiyoe');
  const { getHeadingFontClass } = useHeadingFont();

  return (
    <div className="flex flex-col gap-8 max-w-2xl">
      {PHASES.map((phase) => (
        <figure key={phase.key} className="flex flex-col gap-3 w-full">
          <div className="flex flex-wrap items-center gap-3">
            <h4
              className={`text-title text-ink shrink-0 ${getHeadingFontClass()}`}
            >
              {t(phase.key)}
            </h4>
            <div className="flex items-center gap-2 flex-wrap">
              {phase.swatches.map((hex) => (
                <div
                  key={hex}
                  className="w-4 h-4 rounded-none shrink-0"
                  style={{ backgroundColor: hex }}
                />
              ))}
            </div>
          </div>
          <div className="w-full overflow-hidden rounded-lg">
            <Image
              src={phase.image}
              alt={t(phase.key)}
              width={800}
              height={500}
              className="w-full h-auto"
            />
          </div>
        </figure>
      ))}
    </div>
  );
}
