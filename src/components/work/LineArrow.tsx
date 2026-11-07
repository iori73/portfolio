/**
 * 作品ページの図で使う矢印。実線の細い線と開いた矢じり（点線・破線の矢印は使わない）。
 * 前後の図（BeforeAfterPair）や、構造図（上から下への矢印）など、図の矢印は全部これに統一する。
 * 画像に矢印を焼き込まない（コードで描くので、読み上げ・拡大・色の変更に強い）。
 */
export default function LineArrow({ direction = 'right', className = '' }: { direction?: 'right' | 'down'; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 56 24"
      width="56"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 text-ink-tertiary ${direction === 'down' ? 'rotate-90' : ''} ${className}`}
    >
      <path d="M3 12H52" />
      <path d="M44 5L52 12L44 19" />
    </svg>
  );
}
