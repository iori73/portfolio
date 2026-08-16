/**
 * URL のロケールセグメントと、HTML に出す BCP 47 言語タグの対応。
 *
 * URL 側は歴史的に `/jp/...` を使っており、外部リンクやブックマークが既にあるので
 * 変えない。一方 `jp` は ISO 3166 の**国**コードであって言語コードではないため、
 * `<html lang>` や `hreflang` にそのまま出すと、スクリーンリーダーが日本語として
 * 読み上げず、検索エンジンの言語判定も外れる。
 *
 * そこで「URL セグメントは jp のまま、言語タグだけ ja に写す」形にしてある。
 * URL ごと /ja に寄せる案は 301 が必要になるので、今回は採らない。
 */
export const LOCALE_TO_LANG: Record<string, string> = {
  en: 'en',
  jp: 'ja',
};

export const toLangTag = (locale: string): string => LOCALE_TO_LANG[locale] ?? locale;
