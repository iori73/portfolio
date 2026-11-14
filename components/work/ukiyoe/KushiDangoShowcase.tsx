'use client';

import { useRef, useState, useEffect } from 'react';
import { useBodyFont, useHeadingFont } from '@/src/hooks/useFonts';

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
    <div className="flex-1 min-w-[60vw] snap-center md:min-w-0 flex flex-col gap-2 overflow-hidden">
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
          className={`text-caption md:text-lg leading-tight text-ink ${
            locale === 'jp' ? getHeadingFontClass() : 'font-switzer font-medium'
          }`}
        >
          {locale === 'jp' ? card.title.ja : card.title.en}
        </span>
        <span
          className={`text-[11px] md:text-base leading-tight text-ink-secondary ${getBodyFontClass()}`}
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
          {/* Left: the current timeline (2026-11 rebuild) — its era ruler is the line-and-dot (skewer and dango) */}
          <div className="relative w-[52%] h-full overflow-hidden">
            <img
              src="/work/ukiyoe/timeline-showcase-v2.webp"
              alt=""
              className="absolute inset-0 w-full h-full object-cover object-left-top"
            />
          </div>
          {/* Right: Dango photo */}
          <div className="relative flex-1 h-full overflow-hidden">
            <img
              src="/work/ukiyoe/dango-photo.webp"
              alt="Kushi-dango: three-color mochi"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Bottom: 3 artwork source cards */}
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 md:overflow-visible scrollbar-hide">
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
