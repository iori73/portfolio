import Image from 'next/image';
import LineArrow from '@/src/components/work/LineArrow';
import ZoomImage from '@/src/components/work/ZoomImage';

export type PairSide = { src: string; width: number; height: number; label: string };

/**
 * 前後の図: 左右に2枚の画像を置き、間の矢印はコード（LineArrow）で描く。
 * 画像1枚に矢印を焼き込まない（画像だけで済ませない）。ラベルもコードの文字。
 * 既定: 幅が狭いとき（スマートフォン）は縦に積み、矢印は下向きにする。
 * `sideBySideOnMobile`: スマートフォンでも左右に並べる（2案を見比べる図。縦に積むと比べにくい）。
 *   画像は小さくなるので、`zoom` を渡すと、タップで拡大できる（ZoomImage）。
 * 図全体の説明は、呼ぶ側が `label`（aria-label）で渡す。画像の alt は空（説明は図の側にある）。
 */
export default function BeforeAfterPair({
  before,
  after,
  label,
  className = '',
  sideBySideOnMobile = false,
  zoom,
}: {
  before: PairSide;
  after: PairSide;
  label: string;
  className?: string;
  sideBySideOnMobile?: boolean;
  zoom?: { openLabel: string; closeLabel: string };
}) {
  const side = (s: PairSide) => (
    <div className="flex min-w-0 flex-col gap-2">
      {/* 左右並びのときは、ラベルが1行・2行でも画像の上端がそろうよう、2行分の高さを確保する */}
      <p className={`font-space-grotesk font-bold text-ink-tertiary ${sideBySideOnMobile ? 'min-h-[2.75rem] text-body-sm leading-snug md:min-h-0 md:text-body md:leading-normal' : 'text-body'}`}>{s.label}</p>
      {zoom ? (
        <ZoomImage src={s.src} width={s.width} height={s.height} alt={s.label} openLabel={zoom.openLabel} closeLabel={zoom.closeLabel} />
      ) : (
        <Image src={s.src} alt="" width={s.width} height={s.height} className="h-auto w-full" />
      )}
    </div>
  );
  return (
    <figure
      aria-label={label}
      className={`w-full ${
        sideBySideOnMobile
          ? 'grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-2 md:gap-6'
          : 'flex flex-col items-stretch gap-4 md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-6'
      } ${className}`}
    >
      {side(before)}
      {sideBySideOnMobile ? (
        <div className="flex items-start justify-center pt-12 md:items-center md:pt-24">
          <LineArrow direction="right" className="h-auto w-4 md:w-14" />
        </div>
      ) : (
        <div className="flex justify-center md:items-center md:pt-24">
          <LineArrow direction="right" className="hidden md:block" />
          {/* 縦に積むときの下向き矢印。上下の画像・面に触れないよう、上下に余白をとる */}
          <LineArrow direction="down" className="my-1 md:hidden" />
        </div>
      )}
      {side(after)}
    </figure>
  );
}
