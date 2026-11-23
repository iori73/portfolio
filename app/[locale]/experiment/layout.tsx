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
      en: 'Side experiments: podcast notes parsed and mapped by meaning, a bilingual podcast of classics built as one pipeline, a multi-agent setup for writing articles, and other things built to find out whether they work.',
      jp: 'ポッドキャストの内容を解析して意味で配置する実験や、古典を日英で聴くポッドキャストの仕組み、役割を分けた AI で記事を書く仕組みなど、成立するかを確かめるために作ったもの。',
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
