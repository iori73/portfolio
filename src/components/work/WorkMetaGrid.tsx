import type { CSSProperties } from 'react';
import { softBreaks, textWeight } from '@/src/lib/softBreaks';

export type MetaItem = { label: string; value: string | string[] };

/**
 * 作品ページの冒頭のメタ情報（Timeline / My Skills / Type / Deliverables など）。
 *
 * - スマホ 2 列、md は 4 列の均等。lg（1024px 以上）は「いちばん長い値の列だけが縮み、
 *   ほかの列は内容の幅」にする。短い値（例: 「インタラクティブWebサイト」）が1文字だけ折り返すのを防ぐ。
 * - 日本語は文節の切れ目で折れる（`word-break: auto-phrase`）。さらに、値の文言に `¦` を書くと、
 *   その位置でだけ折れる（`src/lib/softBreaks.tsx`）。
 * - 値が配列のときは、1行ずつ改行して並べる。
 * - 新しい作品ページでは、メタ情報を自分で組まず、このコンポーネントを使う。
 */
export default function WorkMetaGrid({ items, labelClassName = 'text-caption-lg' }: { items: MetaItem[]; labelClassName?: string }) {
  const weights = items.map((it) => Math.max(...(Array.isArray(it.value) ? it.value : [it.value]).map(textWeight)));
  const longest = weights.indexOf(Math.max(...weights));
  // lg の列の配分。いちばん長い値の列だけが縮み、ほかは内容の幅にする。ただし、ほかの列が幅を取りすぎて
  // 長い列が狭くなる（目安: 本来の幅の45%未満、または200px未満）ときは、均等4列に戻す。
  // 幅の見積もり: 文字の重み1あたり約11px（本文 text-body-lg）、本文の幅 1028px、列の間隔 32px。
  const UNIT = 11, CONTENT = 1028, GAP = 32;
  const othersPx = weights.reduce((sum, w, i) => (i === longest ? sum : sum + w * UNIT), 0);
  const remaining = CONTENT - GAP * (items.length - 1) - othersPx;
  const fits = remaining >= 200 && remaining >= weights[longest] * UNIT * 0.45;
  const cols = fits
    ? items.map((_, i) => (i === longest ? 'minmax(0,1fr)' : 'auto')).join(' ')
    : items.map(() => 'minmax(0,1fr)').join(' ');
  return (
    <div
      className="grid grid-cols-2 gap-6 [word-break:auto-phrase] md:grid-cols-4 lg:gap-x-8 lg:[grid-template-columns:var(--meta-cols)]"
      style={{ '--meta-cols': cols } as CSSProperties}
    >
      {items.map((it) => (
        <div key={it.label}>
          <span className={`${labelClassName} font-space-grotesk font-semibold text-ink-tertiary mb-2 block`}>{it.label}</span>
          <p className="text-body-lg tracking-[0.2px]">
            {(Array.isArray(it.value) ? it.value : [it.value]).map((line, i) => (
              <span key={i} className="block">
                {softBreaks(line)}
              </span>
            ))}
          </p>
        </div>
      ))}
    </div>
  );
}
