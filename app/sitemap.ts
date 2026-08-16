import type { MetadataRoute } from 'next';
import {
  PUBLIC_PAGE_PATHS,
  INDEXED_WORK_SLUGS,
  languageAlternates,
  localeUrl,
  workPath,
} from '@/src/data/siteRoutes';

/**
 * 載せるページは明示的に列挙する。ルートを自動列挙しないこと。
 * app/[locale]/work/ には、公開しないページも同居している
 * （src/data/siteRoutes.ts の ARCHIVED_WORK_SLUGS）。自動列挙にすると、
 * 見せないつもりのページを自分で検索に載せることになる。
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...PUBLIC_PAGE_PATHS, ...INDEXED_WORK_SLUGS.map(workPath)];

  return paths.map((path) => ({
    // 既定ロケール（en）は接頭辞なしの URL が正規。/en/... は /... へリダイレクトされる。
    url: localeUrl(path, 'en'),
    alternates: { languages: languageAlternates(path) },
  }));
}
