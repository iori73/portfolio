/**
 * 作品ページの図で使う矢印。実線の細い線と開いた矢じり（点線・破線の矢印は使わない）。
 * 前後の図（BeforeAfterPair）や、構造図（上から下への矢印）など、図の矢印は全部これに統一する。
 * 画像に矢印を焼き込まない（コードで描くので、読み上げ・拡大・色の変更に強い）。
 *
 * 矢じりは長さ 12・片側の幅 9（2026-11-23 に、河野さんの指示で 8・7 から長くした）。
 * 下向きは `rotate-90` で回さず、最初から縦長の形（24×56）で描く。
 * 回すと、見た目は縦に 56px 伸びるのに、レイアウト上の高さは 24px のままになり、
 * 上下の面（灰色の背景など）に矢印がはみ出して重なる（2026-11-22 に実際に起きた）。
 */
export default function LineArrow({ direction = 'right', className = '' }: { direction?: 'right' | 'down'; className?: string }) {
  const down = direction === 'down';
  return (
    <svg
      aria-hidden="true"
      viewBox={down ? '0 0 24 56' : '0 0 56 24'}
      width={down ? 24 : 56}
      height={down ? 56 : 24}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 text-ink-tertiary ${className}`}
    >
      {down ? (
        <>
          <path d="M12 3V52" />
          <path d="M3 40L12 52L21 40" />
        </>
      ) : (
        <>
          <path d="M3 12H52" />
          <path d="M40 3L52 12L40 21" />
        </>
      )}
    </svg>
  );
}
