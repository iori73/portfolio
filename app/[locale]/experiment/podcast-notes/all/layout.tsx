import type { Metadata } from 'next';
import { buildPageMetadata } from '@/src/lib/pageMetadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    path: '/experiment/podcast-notes/all',
    locale,
    title: { en: 'All Podcast Notes', jp: 'Podcast Notes 一覧' },
    description: {
      en: 'Every parsed podcast episode in one list.',
      jp: '解析済みのポッドキャストエピソード一覧。',
    },
  });
}

export default function AllPodcastNotesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
