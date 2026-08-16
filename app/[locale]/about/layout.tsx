import type { Metadata } from 'next';
import { buildPageMetadata } from '@/src/lib/pageMetadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    path: '/about',
    locale,
    title: { en: "About", jp: "About" },
    description: { en: "Who I am and what I am curious about. UI/UX designer Iori Kawano.", jp: "河野いおりの人物像と関心。UI/UX デザイナー。" },
  });
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
