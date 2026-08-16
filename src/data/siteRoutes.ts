import { toLangTag } from '@/src/lib/locale';

export const SITE_URL = 'https://iori-kawano.vercel.app';

/**
 * トップページにカード（入口）を置く Work。
 * **トップページのカードと sitemap は、必ずこのファイルのリストを見る。**
 *
 * これを分けて持つと事故る。2026-08-16 時点の本番は
 * 「カードは手書き JSX / ルートはディレクトリ」の二重管理になっていて、
 * リンクを張っていない3ページが 200 かつ noindex なしで出ていた。
 * 検索に出ていなかったのは、カードが <a href> でなく sitemap も無かったからで、
 * 意図した制御ではなくたまたまだった。
 */
export const CARD_WORK_SLUGS = ['ukiyoe', 'figma-plugins'] as const;

/**
 * sitemap に載せる Work。カードを置くものに加えて、
 * 「公開はするがトップに入口は作らない」ものを含む。
 * 入口が無い以上、sitemap が唯一の発見経路になるので、ここから外すと
 * 「公開したい」が実質果たせない。
 */
export const INDEXED_WORK_SLUGS = [
  ...CARD_WORK_SLUGS,
  'google_ux_design_certificate_project',
] as const;

/**
 * 公開しない Work。各ページの layout.tsx が本番で notFound() を返す
 * （ENABLE_ARCHIVED_WORK=1 で解除。ローカルでは常に見られる）。
 * sitemap にも載せない。
 *
 * robots.txt の Disallow は使わない。robots.txt は誰でも読めるので、
 * 「隠したいパス」を書くとパスそのものが公開情報になる。
 */
export const ARCHIVED_WORK_SLUGS = [
  'airline-design-system',
  'gym_crowd_status_dashboard',
] as const;

/** Work 以外で sitemap に載せるページ。 */
export const PUBLIC_PAGE_PATHS = [
  '',
  '/about',
  '/blog',
  '/cv',
  '/experiment',
  '/experiment/podcast-notes',
] as const;

/**
 * ロケール付きのパスを作る。localePrefix は 'as-needed' なので、
 * 既定ロケール（en）は接頭辞なし、日本語だけ `/jp` が付く。
 */
export const localePath = (path: string, locale: string): string =>
  locale === 'jp' ? `/jp${path}` : path || '/';

export const localeUrl = (path: string, locale: string): string =>
  `${SITE_URL}${localePath(path, locale)}`;

/** hreflang の属性値は言語タグ（ja）、href は現行の /jp パス。 */
export const languageAlternates = (path: string): Record<string, string> =>
  Object.fromEntries(['en', 'jp'].map((l) => [toLangTag(l), localeUrl(path, l)]));

export const workPath = (slug: string): string => `/work/${slug}`;
