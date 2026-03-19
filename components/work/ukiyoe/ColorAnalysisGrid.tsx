'use client';

import { useRef, useState, useEffect, useCallback } from 'react';


interface Artwork {
  url: string;
  ja: { title: string; artist: string };
  en: { title: string; artist: string };
}

interface PeriodColumn {
  yearStart: number;
  label: string;
  signatureColor: { hex: string; ja: string; en: string };
  artworks: [Artwork, Artwork];
}

const PERIODS: PeriodColumn[] = [
  {
    yearStart: 1670,
    label: '1670s',
    signatureColor: { hex: '#1a1a1a', ja: '墨', en: 'Sumi' },
    artworks: [
      {
        url: '/work/ukiyoe/artworks/moronobu-yoshiwara.jpg',
        ja: { title: '吉原の体', artist: '菱川師宣' },
        en: { title: 'Yoshiwara Quarters', artist: 'Hishikawa Moronobu' },
      },
      {
        url: '/work/ukiyoe/artworks/moronobu-self-portrait.jpg',
        ja: { title: '自画像', artist: '菱川師宣' },
        en: { title: 'Self-Portrait', artist: 'Hishikawa Moronobu' },
      },
    ],
  },
  {
    yearStart: 1700,
    label: '1700s',
    signatureColor: { hex: '#c9a050', ja: '金/茶', en: 'Kin' },
    artworks: [
      {
        url: '/work/ukiyoe/artworks/kiyonobu-1.jpg',
        ja: { title: '役者絵（筒井吉十郎）', artist: '鳥居清信' },
        en: { title: 'Actor Tsutsui Kichijuro', artist: 'Torii Kiyonobu I' },
      },
      {
        url: '/work/ukiyoe/artworks/kiyonobu-2.jpg',
        ja: { title: '歌舞伎役者図', artist: '鳥居清信' },
        en: { title: 'Kabuki Actor', artist: 'Torii Kiyonobu I' },
      },
    ],
  },
  {
    yearStart: 1720,
    label: '1720s',
    signatureColor: { hex: '#c04545', ja: '紅', en: 'Beni' },
    artworks: [
      {
        url: '/work/ukiyoe/artworks/masanobu-dp124527.jpg',
        ja: { title: '絵本表紙', artist: '奥村政信' },
        en: { title: 'Illustrated Book Cover', artist: 'Okumura Masanobu' },
      },
      {
        url: '/work/ukiyoe/artworks/masanobu-dp124524.jpg',
        ja: { title: '華笠三幅対', artist: '奥村政信' },
        en: { title: 'Triptych of Umbrellas', artist: 'Okumura Masanobu' },
      },
    ],
  },
  {
    yearStart: 1740,
    label: '1740s',
    signatureColor: { hex: '#7a9060', ja: '緑', en: 'Midori' },
    artworks: [
      {
        url: '/work/ukiyoe/artworks/toyonobu-nakamura.jpg',
        ja: { title: '中村七三郎と佐野川市松', artist: '石川豊信' },
        en: { title: 'Actors Nakamura & Sanogawa', artist: 'Ishikawa Toyonobu' },
      },
      {
        url: '/work/ukiyoe/artworks/toyonobu-flower-cart.jpg',
        ja: { title: '花車と若衆', artist: '石川豊信' },
        en: { title: 'Wakashu with Flower Cart', artist: 'Ishikawa Toyonobu' },
      },
    ],
  },
  {
    yearStart: 1750,
    label: '1750s',
    signatureColor: { hex: '#607888', ja: '青灰', en: 'Ao' },
    artworks: [
      {
        url: '/work/ukiyoe/artworks/toyonobu-dp135501.jpg',
        ja: { title: '夏柳の美人', artist: '石川豊信' },
        en: { title: 'Summer Willow in Breeze', artist: 'Ishikawa Toyonobu' },
      },
      {
        url: '/work/ukiyoe/artworks/toyonobu-dp135503.jpg',
        ja: { title: '坂田金平の飲酒図', artist: '石川豊信' },
        en: { title: 'Sakata Kinpira Drinking', artist: 'Ishikawa Toyonobu' },
      },
    ],
  },
  {
    yearStart: 1765,
    label: '1765',
    signatureColor: { hex: '#c04545', ja: '紅', en: 'Beni' },
    artworks: [
      {
        url: '/work/ukiyoe/artworks/harunobu-dp114905.jpg',
        ja: { title: '縁側にて', artist: '鈴木春信' },
        en: { title: 'On the Veranda', artist: 'Suzuki Harunobu' },
      },
      {
        url: '/work/ukiyoe/artworks/harunobu-dp114910.jpg',
        ja: { title: '美人琴高図', artist: '鈴木春信' },
        en: { title: 'The Bijin Kinko', artist: 'Suzuki Harunobu' },
      },
    ],
  },
  {
    yearStart: 1770,
    label: '1770s',
    signatureColor: { hex: '#2a3848', ja: '藍', en: 'Ai' },
    artworks: [
      {
        url: '/work/ukiyoe/artworks/kiyonaga-bathhouse.jpg',
        ja: { title: '女湯', artist: '鳥居清長' },
        en: { title: 'Bathhouse Women', artist: 'Torii Kiyonaga' },
      },
      {
        url: '/work/ukiyoe/artworks/kiyonaga-sumida.jpg',
        ja: { title: '隅田川の船遊び', artist: '鳥居清長' },
        en: { title: 'Boating on Sumida River', artist: 'Torii Kiyonaga' },
      },
    ],
  },
  {
    yearStart: 1790,
    label: '1790s',
    signatureColor: { hex: '#b8b0a4', ja: '銀灰', en: 'Gin' },
    artworks: [
      {
        url: '/work/ukiyoe/artworks/utamaro-three-beauties.jpg',
        ja: { title: '寛政三美人', artist: '喜多川歌麿' },
        en: { title: 'Three Beauties', artist: 'Kitagawa Utamaro' },
      },
      {
        url: '/work/ukiyoe/artworks/sharaku-otani.jpg',
        ja: { title: '大谷鬼次の奴江戸兵衛', artist: '東洲斎写楽' },
        en: { title: 'Otani Oniji as Edobei', artist: 'Toshusai Sharaku' },
      },
    ],
  },
  {
    yearStart: 1800,
    label: '1800s',
    signatureColor: { hex: '#2d4f6e', ja: 'ベロ藍', en: 'Bero' },
    artworks: [
      {
        url: '/work/ukiyoe/artworks/hokusai-great-wave.jpg',
        ja: { title: '神奈川沖浪裏', artist: '葛飾北斎' },
        en: { title: 'The Great Wave', artist: 'Katsushika Hokusai' },
      },
      {
        url: '/work/ukiyoe/artworks/hokusai-red-fuji.jpg',
        ja: { title: '凱風快晴', artist: '葛飾北斎' },
        en: { title: 'Red Fuji', artist: 'Katsushika Hokusai' },
      },
    ],
  },
];

const LOAD_TIMEOUT_MS = 12000;

function ArtworkThumbnail({
  artwork,
  locale,
  isVisible,
  delay,
}: {
  artwork: Artwork;
  locale: string;
  isVisible: boolean;
  delay: number;
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const localized = locale === 'jp' ? artwork.ja : artwork.en;

  const handleError = useCallback(() => {
    setRetryCount((c) => {
      if (c < 2) return c + 1;
      setError(true);
      setLoaded(true);
      return c;
    });
  }, []);

  // タイムアウトで retryCount が 2 になったときは onError が来ないのでここでフォールバック表示
  useEffect(() => {
    if (retryCount >= 2 && !loaded && !error) {
      setError(true);
      setLoaded(true);
    }
  }, [retryCount, loaded, error]);

  // 一定時間 load しなければリトライ or フォールバック（外部サーバ遅延・重い画像対策）
  useEffect(() => {
    if (loaded || error) return;
    const t = setTimeout(() => {
      setRetryCount((c) => (c < 2 ? c + 1 : c));
    }, LOAD_TIMEOUT_MS);
    return () => clearTimeout(t);
  }, [loaded, error, retryCount]);

  const imgSrc = artwork.url;

  return (
    <div
      className="relative aspect-[4/5] overflow-hidden bg-[#3a3a3a] transition-all duration-500 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      {!loaded && (
        <div className="absolute inset-0 bg-[#3a3a3a] animate-pulse" />
      )}
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-[#3a3a3a]">
          <span className="text-[#ffffff40] text-[10px] text-center px-1 leading-tight">
            {localized.title}
          </span>
        </div>
      ) : (
        <img
          src={imgSrc}
          alt={localized.title}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={handleError}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
}

function PeriodColumn({
  period,
  locale,
  isVisible,
  index,
}: {
  period: PeriodColumn;
  locale: string;
  isVisible: boolean;
  index: number;
}) {
  const baseDelay = index * 60;
  const colorLabel =
    locale === 'jp' ? period.signatureColor.ja : period.signatureColor.en;

  return (
    <div className="flex flex-col items-center gap-2.5 min-w-[96px] md:min-w-0">
      {period.artworks.map((artwork, i) => (
        <ArtworkThumbnail
          key={i}
          artwork={artwork}
          locale={locale}
          isVisible={isVisible}
          delay={baseDelay + i * 40}
        />
      ))}

      {/* Signature color swatch */}
      <div
        className="flex items-center gap-1.5 mt-1 transition-all duration-500 ease-out"
        style={{
          opacity: isVisible ? 1 : 0,
          transitionDelay: `${baseDelay + 100}ms`,
        }}
      >
        <div
          className="w-3 h-3 md:w-3.5 md:h-3.5 shrink-0 border border-[#ffffff20]"
          style={{ backgroundColor: period.signatureColor.hex }}
        />
        <span className="text-[#ffffffd0] text-xs md:text-sm leading-none whitespace-nowrap">
          {colorLabel}
        </span>
      </div>

      {/* Era label */}
      <span
        className="text-[#ffffffa0] text-[11px] md:text-xs font-mono tabular-nums leading-none transition-all duration-500 ease-out"
        style={{
          opacity: isVisible ? 1 : 0,
          transitionDelay: `${baseDelay + 120}ms`,
        }}
      >
        {period.label}
      </span>
    </div>
  );
}

export default function ColorAnalysisGrid({ locale }: { locale: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="bg-[#2a2a2a] px-3 py-4 pb-5 md:px-6 md:py-6 md:pb-7 select-none overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none"
    >
      <div className="grid grid-flow-col md:grid-cols-9 gap-3 md:gap-4">
        {PERIODS.map((period, i) => (
          <div key={period.yearStart} className="snap-start">
            <PeriodColumn
              period={period}
              locale={locale}
              isVisible={isVisible}
              index={i}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
