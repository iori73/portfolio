import Image from 'next/image';
import LineArrow from '@/src/components/work/LineArrow';

export type PairSide = { src: string; width: number; height: number; label: string };

/**
 * 前後の図: 左右に2枚の画像を置き、間の矢印はコード（LineArrow）で描く。
 * 画像1枚に矢印を焼き込まない（画像だけで済ませない）。ラベルもコードの文字。
 * 幅が狭いとき（スマートフォン）は縦に積み、矢印は下向きにする。
 * 図全体の説明は、呼ぶ側が `label`（aria-label）で渡す。画像の alt は空（説明は図の側にある）。
 */
export default function BeforeAfterPair({ before, after, label, className = '' }: { before: PairSide; after: PairSide; label: string; className?: string }) {
  const side = (s: PairSide) => (
    <div className="flex min-w-0 flex-col gap-2">
      <p className="font-space-grotesk text-body font-bold text-ink-tertiary">{s.label}</p>
      <Image src={s.src} alt="" width={s.width} height={s.height} className="h-auto w-full" />
    </div>
  );
  return (
    <figure aria-label={label} className={`flex w-full flex-col items-stretch gap-4 md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-6 ${className}`}>
      {side(before)}
      <div className="flex justify-center md:items-center md:pt-24">
        <LineArrow direction="right" className="hidden md:block" />
        <LineArrow direction="down" className="md:hidden" />
      </div>
      {side(after)}
    </figure>
  );
}
