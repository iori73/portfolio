import type { Metadata } from 'next';
import { buildPageMetadata } from '@/src/lib/pageMetadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    path: '/experiment',
    locale,
    title: { en: 'Experiment', jp: 'Experiment' },
    description: {
      en: 'Side experiments: podcast notes parsed and mapped by meaning, and other things built to find out whether they work.',
      jp: 'ポッドキャストの内容を解析して意味で配置する実験など、成立するかを確かめるために作ったもの。',
    },
  });
}

export default function ExperimentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
