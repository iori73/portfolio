import type { Metadata } from 'next';
import { buildPageMetadata } from '@/src/lib/pageMetadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    path: '/work/google_ux_design_certificate_project',
    locale,
    title: { en: "Google UX Design Certificate Project", jp: "Google UX デザイン認定コース 課題" },
    description: { en: "Smart100, an app for finding what you need across 100 yen shops, with live pricing and stock.", jp: "100円ショップの価格と在庫を横断して探せるアプリ Smart100。" },
    image: 'google-ux.jpg',
  });
}

export default function GoogleUxLayout({ children }: { children: React.ReactNode }) {
  return children;
}
