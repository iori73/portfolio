import Image from 'next/image';
import LineArrow from '@/src/components/work/LineArrow';
import { softBreaks } from '@/src/lib/softBreaks';

/**
 * Logo design process, from the owner's workspace (Figma floating-world, section 1399:6404, 2026-07-03).
 * Row 1: how the first idea (faces repeated like a kaleidoscope) came about.
 * Row 2: the rebuild — Google's AI answer on ukiyo-e composition → the mark → the favicon version.
 * Marks are the SVGs exported from that section; labels are text in code (ja / en).
 */

type Step = { src: string; ja: string; en: string };

const FIRST: Step[] = [
  { src: '01-face.svg', ja: '斜めから¦見た顔', en: 'A face seen at an angle' },
  { src: '02-kimono-line.svg', ja: '着物の¦なめらかな線', en: 'The smooth line of a kimono' },
  { src: '03-composition.svg', ja: 'よく見る構図¦（人物・枝・建物）', en: 'A common composition (figure, branch, building)' },
  { src: '04-parallel-repeat.svg', ja: '顔のパーツを¦並べて繰り返す', en: 'Face parts repeated in rows' },
  { src: '05-kaleidoscope.svg', ja: '顔を万華鏡の¦ように繰り返す¦（最初の案）', en: 'Faces repeated like a kaleidoscope (the first idea)' },
];

function Mark({ s, jp }: { s: Step; jp: boolean }) {
  return (
    <div className="flex min-w-0 flex-col items-center gap-2 text-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/work/ukiyoe/logo-process/${s.src}`} alt="" width={100} height={100} className="h-16 w-16 md:h-20 md:w-20" />
      <p className="text-body-sm leading-snug text-ink-secondary">{jp ? softBreaks(s.ja) : s.en}</p>
    </div>
  );
}

export default function LogoProcessFigure({ locale }: { locale: string }) {
  const jp = locale === 'jp';
  return (
    <div className="rounded-lg border border-line-section bg-[#F8F5F0] p-4 md:p-6">
      <p className="mb-4 text-body font-bold text-ink">{jp ? '最初の案ができるまで' : 'How the first idea came about'}</p>
      {/* phones: one column with down arrows (no 2 + 2 + 1 wrap); sm and up: one row with right arrows */}
      <ol className="flex flex-col items-center gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-1">
        {FIRST.map((s, i) => (
          <li key={s.src} className="contents">
            <div className="w-[200px] sm:w-[96px] md:w-[116px]"><Mark s={s} jp={jp} /></div>
            {i < FIRST.length - 1 && (
              <div aria-hidden className="flex justify-center sm:pt-6 md:pt-8">
                <LineArrow direction="down" className="sm:hidden" />
                <LineArrow direction="right" className="hidden sm:block" />
              </div>
            )}
          </li>
        ))}
      </ol>

      <div className="my-6 border-t border-black/10" />

      <p className="mb-4 text-body font-bold text-ink">{jp ? '作り直し' : 'The rebuild'}</p>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-[minmax(0,1.1fr)_auto_minmax(0,1fr)] md:items-center md:gap-6">
        <div className="flex flex-col gap-2">
          <Image
            src="/work/ukiyoe/logo-process/google-ai-answer.webp"
            alt=""
            width={800}
            height={1304}
            className="h-auto max-h-[420px] w-auto self-start rounded border border-black/10 object-contain object-top"
          />
          <p className="text-body-sm leading-snug text-ink-secondary">
            {jp
              ? 'Google の AI に聞いた「浮世絵の構図の特徴」の答え。4つの特徴と、参考の記事が挙がった'
              : 'Google’s AI answering “what defines ukiyo-e composition” (in Japanese): four features, with articles to read'}
          </p>
        </div>
        <div className="flex justify-center">
          <LineArrow direction="right" className="hidden md:block" />
          <LineArrow direction="down" className="md:hidden" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Mark s={{ src: '06-mark.svg', ja: 'マーク：¦大胆なトリミング、¦中心からずらす', en: 'The mark: bold cropping, set off-centre' }} jp={jp} />
          <Mark s={{ src: '07-favicon.svg', ja: 'favicon 用：¦細部を省き、¦線を太く', en: 'For the favicon: details dropped, lines thickened' }} jp={jp} />
        </div>
      </div>
    </div>
  );
}
