import React from 'react';

/**
 * 日本語の文言に「ここで折り返してよい位置」を指定する記法。
 *
 * 文言（messages/*.json）の中で、折り返したい位置に `¦`（U+00A6）を書く。
 * 例: "UI、コンテキスト¦エンジニアリング" → 画面では「UI、コンテキスト」「エンジニアリング」の位置でだけ折れる
 * （幅が足りるときは1行のまま。`¦` 自体は表示されない）。`¦` を含む文言は、`¦` と空白の位置以外では折れない。
 * 折れてほしくない語（「2026年3月」「コンポーネントプロトタイプ」など）が、途中で割れるのを防げる。
 *
 * 使いどころ: 日本語は単語の途中でも折れるため、狭い列で「リング」だけが2行目に残ることがある。
 * そういう箇所（メタ情報、見出し、短い説明）で、折れてよい位置を `¦` で決める。
 * 本文の長い段落には使わない。
 *
 * `¦` を使うコンポーネント: `WorkMetaGrid`（メタ情報）。見出しなど他の場所で使うときは、
 * 表示する文字列を `softBreaks(text)` に通す。
 */
export const SOFT_BREAK = '¦';

/** 表示用の文字数に近い重み（全角=2、半角=1）。折り返し位置の記号は数えない */
export function textWeight(text: string): number {
  let n = 0;
  for (const ch of text.split(SOFT_BREAK).join('')) n += ch.charCodeAt(0) > 0x2e80 ? 2 : 1;
  return n;
}

export function softBreaks(text: string): React.ReactNode {
  const parts = text.split(SOFT_BREAK);
  if (parts.length === 1) return text;
  // `¦` を含む文言は、その位置（と空白）でだけ折れる。ほかの位置では折れない（keep-all）。
  // 1つの区切りが列の幅より長いときだけ、やむを得ず途中で折れる（overflow-wrap）。
  return (
    <span className="[overflow-wrap:anywhere] [word-break:keep-all]">
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          {i > 0 ? <wbr /> : null}
          {part}
        </React.Fragment>
      ))}
    </span>
  );
}
