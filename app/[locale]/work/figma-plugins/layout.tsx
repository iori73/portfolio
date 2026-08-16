import type { Metadata } from 'next';
import { buildPageMetadata } from '@/src/lib/pageMetadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    path: '/work/figma-plugins',
    locale,
    title: { en: "Figma Plugins & Widgets", jp: "Figma Plugins & Widgets" },
    description: { en: "Plugins and widgets built to fix real workflow problems, made through dialogue with AI.", jp: "実際のワークフローの詰まりから生まれたプラグインとウィジェット。AI との対話でつくったもの。" },
    image: 'figma-plugins.jpg',
  });
}

export default function FigmaPluginsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
