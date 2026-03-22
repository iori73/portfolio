'use client';

import { useRef, useState, useEffect } from 'react';
import { useBodyFont, useHeadingFont } from '@/src/hooks/useFonts';

const TIMELINE_ERAS = [
  { year: '1670', opacity: 0.9, height: 116 },
  { year: '1700', opacity: 0.9, height: 18 },
  { year: '1720', opacity: 0.8, height: 18 },
  { year: '1740', opacity: 0.7, height: 18 },
  { year: '1750', opacity: 0.6, height: 18 },
  { year: '1765', opacity: 0.5, height: 18 },
  { year: '1770', opacity: 0.4, height: 18 },
  { year: '1790', opacity: 0.3, height: 18 },
  { year: '1800', opacity: 0.2, height: 18 },
] as const;

interface ArtworkCard {
  image: string;
  title: { ja: string; en: string };
  artist: { ja: string; en: string };
  circles: Array<{ x: string; y: string; size: number }>;
  objectPosition?: string;
}

const ARTWORK_CARDS: ArtworkCard[] = [
  {
    image: '/work/ukiyoe/dango-artwork-kuniyoshi.webp',
    title: { ja: '卯のだんごや', en: 'Rabbit Dango Shop' },
    artist: { ja: '歌川国芳', en: 'Utagawa Kuniyoshi' },
    circles: [
      { x: '32%', y: '28%', size: 60 },
      { x: '64%', y: '77%', size: 64 },
    ],
  },
  {
    image: '/work/ukiyoe/dango-artwork-harunobu.webp',
    title: { ja: '団子を持つ笠森お仙', en: 'Kasamori Osen with Dango' },
    artist: { ja: '鈴木春信', en: 'Suzuki Harunobu' },
    circles: [
      { x: '20%', y: '16%', size: 48 },
      { x: '75%', y: '34%', size: 60 },
    ],
  },
  {
    image: '/work/ukiyoe/dango-artwork-kunisada.webp',
    title: { ja: '東都名所遊観　葉月高輪', en: 'Famous Places: August at Takanawa' },
    artist: { ja: '香蝶楼国貞', en: 'Kōchōrō Kunisada' },
    objectPosition: 'right center',
    circles: [
      { x: '90%', y: '76%', size: 48 },
    ],
  },
];

function TimelineIndicators() {
  return (
    <div className="flex flex-col items-end gap-2.5">
      <div className="flex flex-col items-start gap-2.5">
        {TIMELINE_ERAS.map((era) => (
          <div
            key={era.year}
            className="flex items-center gap-2 justify-end"
            style={{ opacity: era.opacity }}
          >
            <span
              className="text-[#f5f0e6] text-lg tracking-wider leading-tight"
              style={{ fontFamily: "'Shippori Mincho', serif", fontWeight: 500 }}
            >
              {era.year}
            </span>
            <div
              className="bg-[#f5f0e6] shrink-0"
              style={{
                width: 18,
                height: era.height,
                borderRadius: 100,
              }}
            />
          </div>
        ))}
      </div>

      {/* Separator */}
      <div className="w-4 border-t border-[#f5f0e6] opacity-50 self-end" />

      {/* Gallery grid icon */}
      <div className="grid grid-cols-2 grid-rows-2 gap-px opacity-50 self-end" style={{ width: 16, height: 16 }}>
        <div className="border-2 border-[#f5f0e6]" />
        <div className="border-2 border-[#f5f0e6]" />
        <div className="border-2 border-[#f5f0e6]" />
        <div className="border-2 border-[#f5f0e6]" />
      </div>
    </div>
  );
}

function ArtworkCardComponent({
  card,
  locale,
  isVisible,
}: {
  card: ArtworkCard;
  locale: string;
  isVisible: boolean;
}) {
  const { getHeadingFontClass } = useHeadingFont();
  const { getBodyFontClass } = useBodyFont();
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  }, []);

  return (
    <div className="flex-1 min-w-0 flex flex-col gap-2 overflow-hidden">
      <div className="relative aspect-[274/163] bg-white overflow-hidden">
        {!loaded && (
          <div className="absolute inset-0 bg-[#f5f0e6] animate-pulse" />
        )}
        <img
          ref={imgRef}
          src={card.image}
          alt={locale === 'jp' ? card.title.ja : card.title.en}
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          style={card.objectPosition ? { objectPosition: card.objectPosition } : undefined}
        />
        {card.circles.map((circle, i) => (
          <div
            key={i}
            className="absolute border-2 border-[#f5f0e6] rounded-full pointer-events-none"
            style={{
              width: circle.size,
              height: circle.size,
              left: circle.x,
              top: circle.y,
              opacity: isVisible ? 0.9 : 0,
              transform: isVisible
                ? 'translate(-50%, -50%)'
                : 'translate(-50%, calc(-50% + 10px))',
              transition: `opacity 0.5s ease-out ${0.8 + i * 0.15}s, transform 0.5s ease-out ${0.8 + i * 0.15}s`,
            }}
          />
        ))}
      </div>
      <div className="flex flex-col gap-1 tracking-wider">
        <span
          className={`text-sm md:text-lg leading-tight text-ink ${
            locale === 'jp' ? getHeadingFontClass() : 'font-switzer font-medium'
          }`}
        >
          {locale === 'jp' ? card.title.ja : card.title.en}
        </span>
        <span
          className={`text-xs md:text-base leading-tight text-ink-secondary ${getBodyFontClass()}`}
        >
          {locale === 'jp' ? card.artist.ja : card.artist.en}
        </span>
      </div>
    </div>
  );
}

export default function KushiDangoShowcase({ locale }: { locale: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="flex flex-col gap-6"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
      }}
    >
      {/* Top: Timeline + Dango composition */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '883 / 552' }}>
        <div className="absolute inset-0 flex">
          {/* Left: Timeline screenshot */}
          <div className="relative w-[52%] h-full overflow-hidden">
            <img
              src="/work/ukiyoe/timeline-showcase-bg.png"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          {/* Right: Dango photo */}
          <div className="relative flex-1 h-full overflow-hidden">
            <img
              src="/work/ukiyoe/dango-photo.png"
              alt="Kushi-dango — three-color mochi"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Timeline indicators overlay */}
        <div className="absolute right-[56%] top-0 bottom-0 flex items-center z-10 pointer-events-none">
          <TimelineIndicators />
        </div>
      </div>

      {/* Bottom: 3 artwork source cards */}
      <div className="flex gap-4">
        {ARTWORK_CARDS.map((card) => (
          <ArtworkCardComponent
            key={card.title.en}
            card={card}
            locale={locale}
            isVisible={isVisible}
          />
        ))}
      </div>
    </div>
  );
}
