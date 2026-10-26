'use client';

import Image from 'next/image';
import type { MouseEvent, ReactNode, RefObject } from 'react';
import { useBodyFont, useHeadingFont, useJPFontSize } from '@/src/hooks/useFonts';

/**
 * トップページの Work カード。**3枚とも、必ずこの1つを通す。**
 *
 * 以前は ukiyoe / figma-plugins / 中初が別々の JSX で、比率（8:5 と 2:1）・
 * 外枠（あり／なし）・角丸（16 / 8 / 0）・タグの文字サイズ（15 / 21px）が
 * 案件ごとに違っていた。見る人は「違いに意味があるのか」を考えてしまう
 * （NN/g「Consistency and Standards」）。仕様は docs/architecture/design-system.md
 * の「Work カード」を参照。数値を変えるときは、ここと DS の両方を直す。
 *
 * サムネの比率 8:5 は、詳細ページのヒーロー（`aspect-[8/5]`）と
 * `TransitionOverlay.tsx` の heightRatio（5/8）と同じにしてある。
 * 変えるなら3つ一緒に変える。そうしないと FLIP の着地がずれる。
 */
export const WORK_THUMB_ASPECT = 'aspect-[8/5]';

type Props = {
  href: string;
  onClick: (e: MouseEvent<HTMLAnchorElement>) => void;
  /** FLIP トランジションの出発点（外枠の位置を測る）。 */
  thumbRef: RefObject<HTMLDivElement | null>;
  /** 8:5 の箱の中身。画像は WorkCardImage を使う。 */
  thumb: ReactNode;
  /** 箱の地色。写真・画像は不要。ノード（図版を組むもの）だけ渡す。 */
  thumbClassName?: string;
  title: string;
  tags: readonly string[];
  description1: string;
  description2: string;
};

export function WorkCardImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(min-width: 1280px) 1088px, (min-width: 768px) 80vw, 100vw"
      className="object-cover"
    />
  );
}

export default function WorkCard({
  href,
  onClick,
  thumbRef,
  thumb,
  thumbClassName = '',
  title,
  tags,
  description1,
  description2,
}: Props) {
  const { getBodyFontClass } = useBodyFont();
  const { getHeadingFontClass } = useHeadingFont();
  const { jpFontSize } = useJPFontSize();

  return (
    <a data-work-card href={href} className="block mb-16 cursor-pointer hover:opacity-80" onClick={onClick}>
      <div className="mb-20">
        {/* サムネの絵の地色は、ページの地に近いことがある（2026-09-23 河野）。
            縁がはっきり読めるよう、タグと同じ surface-muted の枠で囲む。 */}
        <div data-work-thumb-frame className="mb-6 p-2 rounded-card bg-surface-muted" ref={thumbRef}>
          <div data-work-thumb className={`relative ${WORK_THUMB_ASPECT} overflow-hidden rounded-media ${thumbClassName}`}>
            {thumb}
          </div>
        </div>

        <div className="flex items-center gap-6 mb-4 flex-wrap md:flex-nowrap">
          <h3 className={`text-title-lg ${getHeadingFontClass()}`}>{title}</h3>
          <div className="flex gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="font-space-grotesk text-label leading-[1.3] px-3 py-1 rounded-lg bg-surface-muted text-ink-tertiary"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <p className={`mb-2 text-body-lg ${getBodyFontClass()}`}>{description1}</p>
        <p
          className={`${getBodyFontClass()} ${jpFontSize(
            'text-body',
            'text-body-lg',
            'text-body-sm',
            'text-body',
          )}`}
        >
          {description2}
        </p>
      </div>
    </a>
  );
}
