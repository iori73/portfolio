import type { Metadata } from 'next';
import { buildPageMetadata } from '@/src/lib/pageMetadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    path: '/blog',
    locale,
    title: { en: "Blog", jp: "Blog" },
    description: { en: "Writing on design, systems and building with AI.", jp: "デザイン、システム、AI とのものづくりについて書いたもの。" },
  });
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
