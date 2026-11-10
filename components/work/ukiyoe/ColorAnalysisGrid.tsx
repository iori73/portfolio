'use client';

import Image from 'next/image';

/**
 * The seven eras of the current site (ukiyoe-timeline src/data/v2/eras.js, 2026-11):
 * two key works each and the colours that era used, in the site's ten colour slots.
 * Thumbnails are taken from the live /timeline (CC0 works from AIC, The Met and CMA).
 * Keep in sync with the site: era years, names, activeSlots and slot colours.
 */

type SlotId = 'sumi' | 'tan' | 'beni' | 'kin' | 'midori' | 'ao' | 'ai' | 'bero' | 'gin' | 'hada';

const SLOTS: { id: SlotId; ja: string; en: string; hex: string }[] = [
  { id: 'sumi', ja: '墨', en: 'Ink black', hex: '#1a1a1a' },
  { id: 'tan', ja: '丹', en: 'Red lead', hex: '#d27a3f' },
  { id: 'beni', ja: '紅', en: 'Safflower red', hex: '#c04545' },
  { id: 'kin', ja: '金/茶', en: 'Gold / ochre', hex: '#c9a050' },
  { id: 'midori', ja: '緑', en: 'Green', hex: '#7a9060' },
  { id: 'ao', ja: '青灰', en: 'Blue-grey', hex: '#607888' },
  { id: 'ai', ja: '藍', en: 'Indigo', hex: '#2a3848' },
  { id: 'bero', ja: 'ベロ藍', en: 'Prussian blue', hex: '#2d4f6e' },
  { id: 'gin', ja: '雲母', en: 'Mica', hex: '#b8b0a4' },
  { id: 'hada', ja: '紙', en: 'Paper', hex: '#d9c5b8' },
];

interface Work {
  file: string;
  ja: string;
  en: string;
}

interface Era {
  num: string;
  years: string;
  ja: string;
  en: string;
  slots: SlotId[];
  works: [Work, Work];
}

const ERAS: Era[] = [
  {
    num: '一', years: '1670–1700', ja: '墨摺絵', en: 'Sumizuri-e',
    slots: ['sumi', 'hada'],
    works: [
      { file: '01-1942.60', ja: '菱川師宣「吉原の体」', en: 'Hishikawa Moronobu, Scene in the Yoshiwara' },
      { file: '01-1925.1689', ja: '菱川師宣「上野花見の躰」', en: 'Hishikawa Moronobu, Flower-Viewing Party with Crest-Bearing Curtain' },
    ],
  },
  {
    num: '二', years: '1700–1720', ja: '丹絵', en: 'Tan-e',
    slots: ['sumi', 'tan', 'kin', 'midori', 'hada'],
    works: [
      { file: '02-1925.1726', ja: '鳥居清倍「坂田金時と天狗の相撲」', en: 'Torii Kiyomasu I, Sakata Kintoki Wrestling with a Tengu' },
      { file: '02-JP3075', ja: '鳥居清忠「二代目市川團十郎の暫」', en: 'Torii Kiyotada, Ichikawa Danjūrō II in the Scene “Wait a Moment” (Shibaraku)' },
    ],
  },
  {
    num: '三', years: '1720–1744', ja: '紅絵・漆絵', en: 'Beni-e and urushi-e',
    slots: ['sumi', 'beni', 'kin', 'midori', 'hada'],
    works: [
      { file: '03-1925.2285', ja: '奥村政信「芝居狂言舞台顔見世大浮絵」', en: 'Okumura Masanobu, Large Perspective Picture of the Kaomise' },
      { file: '03-JP1308', ja: '奥村政信「中村富十郎の騎馬武者」', en: 'Okumura Masanobu, The Actor Nakamuro Tomijuro as a Mounted Warrior' },
    ],
  },
  {
    num: '四', years: '1744–1765', ja: '紅摺絵', en: 'Benizuri-e',
    slots: ['sumi', 'beni', 'midori', 'hada'],
    works: [
      { file: '04-1925.1937', ja: '石川豊信「文を読む美人」', en: 'Ishikawa Toyonobu, Beauty Reading a Letter' },
      { file: '04-JP848', ja: '石川豊信「潮干狩り」', en: 'Ishikawa Toyonobu, Women and a Small Boy Gathering Shells on a Beach by the Sea' },
    ],
  },
  {
    num: '五', years: '1765–1770', ja: '錦絵の誕生', en: 'Birth of nishiki-e',
    slots: ['sumi', 'beni', 'kin', 'midori', 'ao', 'ai', 'hada'],
    works: [
      { file: '05-1985.304', ja: '鈴木春信「撫子の鉢を見る娘」', en: 'Suzuki Harunobu, Young Woman Looking at a Pot of Pinks' },
      { file: '05-1957.556', ja: '鈴木春信「夕立」', en: 'Suzuki Harunobu, A Young Woman in a Summer Shower' },
    ],
  },
  {
    num: '六', years: '1770–1829', ja: '錦絵の成熟', en: 'Mature nishiki-e',
    slots: ['sumi', 'beni', 'kin', 'midori', 'ao', 'ai', 'gin', 'hada'],
    works: [
      { file: '06-JP2822', ja: '東洲斎写楽「三代目大谷鬼次の奴江戸兵衛」', en: 'Tōshūsai Sharaku, Kabuki Actor Ōtani Oniji III as Yakko Edobei' },
      { file: '06-JP1528', ja: '喜多川歌麿「寛政三美人」', en: 'Kitagawa Utamaro, Three Beauties of the Kwansei Period' },
    ],
  },
  {
    num: '七', years: '1829–1858', ja: 'ベロ藍と風景', en: 'Prussian blue and landscape',
    slots: ['sumi', 'beni', 'kin', 'midori', 'ao', 'ai', 'bero', 'hada'],
    works: [
      { file: '07-JP1847', ja: '葛飾北斎「冨嶽三十六景 神奈川沖浪裏」', en: 'Katsushika Hokusai, Under the Wave off Kanagawa' },
      { file: '07-1961.170', ja: '葛飾北斎「冨嶽三十六景 礫川雪ノ旦」', en: 'Katsushika Hokusai, Snowy Morning from Koishikawa' },
    ],
  },
];

function Swatches({ era, prev, jp }: { era: Era; prev?: Era; jp: boolean }) {
  return (
    <div className="grid grid-cols-5 gap-x-1.5 gap-y-2 w-max" role="list">
      {SLOTS.map((s) => {
        const on = era.slots.includes(s.id);
        const fresh = on && (!prev || !prev.slots.includes(s.id));
        const label = jp ? s.ja : s.en;
        return (
          <div key={s.id} role="listitem" className="relative flex flex-col items-center" aria-label={`${label}${on ? '' : jp ? '（なし）' : ' (not used)'}`}>
            <span aria-hidden className={`mb-0.5 text-[8px] leading-none ${fresh ? 'text-ink' : 'text-transparent'}`}>◆</span>
            <span
              aria-hidden
              className="block h-3.5 w-3.5 border"
              style={on ? { backgroundColor: s.hex, borderColor: 'rgba(0,0,0,0.25)' } : { borderColor: 'rgba(0,0,0,0.22)' }}
            />
          </div>
        );
      })}
    </div>
  );
}

export default function ColorAnalysisGrid({ locale }: { locale: string }) {
  const jp = locale === 'jp';
  return (
    <div className="bg-[#F8F5F0] px-3 py-5 md:px-6 md:py-7 select-none">
      <div className="overflow-x-auto snap-x snap-mandatory scroll-px-3 md:snap-none -mx-3 px-3 md:mx-0 md:px-0">
        <ol className="grid grid-flow-col auto-cols-[136px] md:auto-cols-auto md:grid-flow-row md:grid-cols-7 gap-4 md:gap-3 lg:gap-4">
          {ERAS.map((era, i) => (
            <li key={era.num} className="snap-start flex flex-col">
              <div className="flex flex-col gap-2">
                {era.works.map((w) => (
                  <div key={w.file} className="relative aspect-[4/5] w-full">
                    <Image
                      src={`/work/ukiyoe/artworks-v2/${w.file}.webp`}
                      alt={jp ? w.ja : w.en}
                      fill
                      sizes="(min-width: 768px) 140px, 136px"
                      className="object-contain object-bottom"
                    />
                  </div>
                ))}
              </div>
              <p className="mt-3 text-body-sm text-ink-secondary tabular-nums leading-snug">
                <span className="mr-1.5 inline-flex h-5 w-5 items-center justify-center border border-ink/40 text-[13px] leading-none align-[-3px]">{era.num}</span>
                {era.years}
              </p>
              <p className="mt-1 mb-2 text-body leading-snug text-ink md:min-h-[2lh]">{jp ? era.ja : era.en}</p>
              <Swatches era={era} prev={ERAS[i - 1]} jp={jp} />
            </li>
          ))}
        </ol>
      </div>

      {/* Legend: the ten colour slots, 5 + 5 (2 × 5 on phones). Never a lone item on its own row */}
      <div className="mt-6 border-t border-black/10 pt-4">
        <ul className="grid grid-cols-2 sm:grid-cols-5 gap-x-3 gap-y-2 max-w-[680px]">
          {SLOTS.map((s) => (
            <li key={s.id} className="flex items-center gap-1.5 text-body-sm text-ink-secondary whitespace-nowrap">
              <span aria-hidden className="block h-3.5 w-3.5 shrink-0 border border-black/25" style={{ backgroundColor: s.hex }} />
              {jp ? s.ja : s.en}
            </li>
          ))}
        </ul>
        <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-body-sm text-ink-tertiary">
          <span>{jp ? '◆ その時代に新しく加わった色' : '◆ a colour new in that era'}</span>
          <span>{jp ? '□ まだ使われていない色' : '□ not yet in use'}</span>
        </p>
      </div>
    </div>
  );
}
