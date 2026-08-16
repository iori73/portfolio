import type { Metadata } from 'next';
import { languageAlternates, localeUrl } from '@/src/data/siteRoutes';

/**
 * ページ単位の title / canonical / hreflang / og:image を1箇所で組み立てる。
 *
 * ページ本体は 'use client' なので metadata を export できない。App Router の
 * 流儀どおり、各ルートに server component の layout.tsx を置いてそこから呼ぶ。
 * ルート層（app/layout.tsx）の title.template が `%s — Iori Kawano` なので、
 * ここで渡す title は作品名だけでよい。
 *
 * canonical は必ずページごとに出す。親レイアウトに置くと子が全部同じ canonical を
 * 継承してしまい、重複ページとして扱われる。
 */
type Localized = { en: string; jp: string };

export type PageMetaInput = {
  /** ロケール接頭辞なしのパス。トップは ''。 */
  path: string;
  locale: string;
  title: Localized;
  description: Localized;
  /** public/og/ 配下のファイル名。省略時はサイト共通のカード。 */
  image?: string;
  /**
   * トップページだけ true。タイトルに「 — Iori Kawano」を足さない
   * （すでに名前が入っているため）。
   */
  isLocaleRoot?: boolean;
};

const pick = (v: Localized, locale: string) => (locale === 'jp' ? v.jp : v.en);

const TITLE_TEMPLATE = '%s — Iori Kawano';

export function buildPageMetadata({
  path,
  locale,
  title,
  description,
  image,
  isLocaleRoot,
}: PageMetaInput): Metadata {
  const t = pick(title, locale);
  const d = pick(description, locale);
  const ogImage = `/og/${image ?? 'default.png'}`;
  const url = localeUrl(path, locale);

  const fullTitle = isLocaleRoot ? t : `${t} — Iori Kawano`;

  return {
    // absolute + template をセットで返すのが要点。
    // title にただの文字列を返すと、そのセグメントが親のテンプレートを消費し、
    // **配下の全ページがテンプレートを失う**。実測でこれを踏んだ:
    // /about が「About」だけになり、トップは「… — Iori Kawano — Iori Kawano」と
    // 二重になった。absolute で自分は親のテンプレートから抜け、template で
    // 子に渡し直すと、階層が何段でも同じ結果になる。
    title: { absolute: fullTitle, template: TITLE_TEMPLATE },
    description: d,
    alternates: {
      canonical: url,
      // 属性値は言語タグ（ja）、href は現行の /jp パス。URL は変えていない。
      languages: languageAlternates(path),
    },
    openGraph: {
      title: fullTitle,
      description: d,
      url,
      siteName: 'Iori Kawano',
      type: 'website',
      locale: locale === 'jp' ? 'ja_JP' : 'en_US',
      images: [{ url: ogImage, width: 1200, height: 630, alt: t }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: d,
      images: [ogImage],
    },
  };
}
