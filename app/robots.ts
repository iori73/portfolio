import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/src/data/siteRoutes';

/**
 * 見せたくないページを Disallow で列挙しない。robots.txt は誰でも読めるので、
 * 隠したいパスを書くとパスそのものが公開情報になる。
 * 非公開にしたいページ側で robots: { index: false } を出す方針にしてある。
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
