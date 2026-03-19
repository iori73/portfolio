'use client';

import { useRef, useState, useEffect } from 'react';

const CANONICAL_SLOTS = [
  { id: 'sumi',   ja: '墨',     en: 'Sumi (Ink)',        hex: '#1a1a1a' },
  { id: 'beni',   ja: '紅',     en: 'Beni (Crimson)',    hex: '#c04545' },
  { id: 'kin',    ja: '金/茶',  en: 'Kin (Gold)',        hex: '#c9a050' },
  { id: 'midori', ja: '緑',     en: 'Midori (Green)',    hex: '#7a9060' },
  { id: 'ao',     ja: '青灰',   en: 'Ao (Blue-gray)',    hex: '#607888' },
  { id: 'ai',     ja: '藍',     en: 'Ai (Indigo)',       hex: '#2a3848' },
  { id: 'bero',   ja: 'ベロ藍', en: 'Bero (Prussian)',   hex: '#2d4f6e' },
  { id: 'gin',    ja: '銀灰',   en: 'Gin (Mica)',        hex: '#b8b0a4' },
  { id: 'hada',   ja: '肌/紙',  en: 'Hada (Paper)',      hex: '#d9c5b8' },
] as const;

type SlotId = typeof CANONICAL_SLOTS[number]['id'];

interface PeriodData {
  num: string;
  years: string;
  ja: string;
  en: string;
  proportions: Partial<Record<SlotId, number>>;
}

const PERIODS: PeriodData[] = [
  {
    num: '01', years: '1670–1679',
    ja: '初期浮世絵の確立', en: 'Early Ukiyoe Established',
    proportions: { sumi: 0.50, beni: 0.15, kin: 0.10, hada: 0.25 },
  },
  {
    num: '02', years: '1700–1719',
    ja: '役者絵・手彩色', en: 'Actor Prints, Hand-coloring',
    proportions: { sumi: 0.60, kin: 0.15, hada: 0.25 },
  },
  {
    num: '03', years: '1720–1739',
    ja: '漆絵・紅絵', en: 'Urushi-e & Beni-e',
    proportions: { sumi: 0.35, beni: 0.25, kin: 0.15, hada: 0.25 },
  },
  {
    num: '04', years: '1740–1749',
    ja: '紅摺絵の隆盛', en: 'Rise of Benizuri-e',
    proportions: { sumi: 0.30, beni: 0.30, midori: 0.20, hada: 0.20 },
  },
  {
    num: '05', years: '1750–1764',
    ja: '紅摺絵の技術向上', en: 'Benizuri-e Refinement',
    proportions: { sumi: 0.22, beni: 0.20, kin: 0.12, midori: 0.15, ao: 0.10, hada: 0.21 },
  },
  {
    num: '06', years: '1765–1770',
    ja: '錦絵の成立', en: 'Birth of Nishiki-e',
    proportions: { sumi: 0.15, beni: 0.18, kin: 0.15, midori: 0.13, ao: 0.14, hada: 0.25 },
  },
  {
    num: '07', years: '1770–1789',
    ja: '大判錦絵の発展', en: 'Large-format Nishiki-e',
    proportions: { sumi: 0.14, beni: 0.17, kin: 0.13, midori: 0.12, ao: 0.12, ai: 0.12, hada: 0.20 },
  },
  {
    num: '08', years: '1790–1799',
    ja: '歌麿・写楽の時代', en: 'Utamaro & Sharaku',
    proportions: { sumi: 0.16, beni: 0.20, ao: 0.13, ai: 0.12, gin: 0.08, hada: 0.31 },
  },
  {
    num: '09', years: '1800–1850',
    ja: '北斎・広重の風景画', en: 'Hokusai & Hiroshige',
    proportions: { sumi: 0.15, beni: 0.15, midori: 0.14, ai: 0.12, bero: 0.29, hada: 0.15 },
  },
];

function SegmentTooltip({ slot, percentage, locale }: {
  slot: typeof CANONICAL_SLOTS[number];
  percentage: number;
  locale: string;
}) {
  return (
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-white text-[#2a2a2a] shadow-lg text-xs whitespace-nowrap pointer-events-none z-10 font-medium">
      <span>{locale === 'jp' ? slot.ja : slot.en}</span>
      <span className="ml-1.5 opacity-60">{percentage}%</span>
      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white" />
    </div>
  );
}

function PeriodRow({ period, locale }: {
  period: PeriodData;
  locale: string;
}) {
  const [hoveredSlot, setHoveredSlot] = useState<string | null>(null);

  const segments = CANONICAL_SLOTS
    .filter((slot) => (period.proportions[slot.id] ?? 0) > 0)
    .map((slot) => ({
      slot,
      proportion: period.proportions[slot.id]!,
    }));

  return (
    <div className="group flex items-center gap-2 md:gap-4">
      {/* Era number */}
      <span className="text-[#ffffff80] font-mono text-sm md:text-base w-5 md:w-6 shrink-0 tabular-nums">
        {period.num}
      </span>

      {/* Year range */}
      <span className="text-[#ffffff80] text-[11px] md:text-xs font-mono w-[76px] md:w-[84px] shrink-0 tabular-nums">
        {period.years}
      </span>

      {/* Period label */}
      <span className="text-[#ffffffc0] text-xs md:text-sm w-[130px] md:w-[190px] shrink-0 truncate leading-tight">
        {locale === 'jp' ? period.ja : period.en}
      </span>

      {/* Proportion bar */}
      <div className="flex h-5 md:h-6 flex-1 overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.5)' }}>
        {segments.map(({ slot, proportion }) => {
          const pct = Math.round(proportion * 100);
          return (
            <div
              key={slot.id}
              className="relative h-full"
              style={{
                width: `${proportion * 100}%`,
                backgroundColor: slot.hex,
                border: '1px solid rgba(0,0,0,0.15)',
              }}
              onMouseEnter={() => setHoveredSlot(slot.id)}
              onMouseLeave={() => setHoveredSlot(null)}
            >
              {hoveredSlot === slot.id && (
                <SegmentTooltip slot={slot} percentage={pct} locale={locale} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ColorSystemViz({ locale }: { locale: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="bg-[#2a2a2a] px-4 py-5 md:px-8 md:py-7 select-none transition-opacity duration-700 ease-out"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      {/* Period bars */}
      <div className="space-y-2.5 md:space-y-3">
        {PERIODS.map((period, i) => (
          <PeriodRow
            key={period.num}
            period={period}
            locale={locale}
          />
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-[#ffffff15] mt-5 md:mt-6 mb-4 md:mb-5" />

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-2 md:gap-x-5">
        {CANONICAL_SLOTS.map((slot) => (
          <div key={slot.id} className="flex items-center gap-1.5">
            <div
              className="w-2.5 h-2.5 md:w-3 md:h-3 shrink-0"
              style={{ backgroundColor: slot.hex }}
            />
            <span className="text-[#ffffffa0] text-[11px] md:text-xs leading-none">
              {locale === 'jp' ? slot.ja : slot.en}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
