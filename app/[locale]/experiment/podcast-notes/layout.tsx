import type { Metadata } from 'next';
import { buildPageMetadata } from '@/src/lib/pageMetadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    path: '/experiment/podcast-notes',
    locale,
    title: { en: "Podcast Notes", jp: "Podcast Notes" },
    description: { en: "Podcast episodes I listened to, parsed and mapped by meaning.", jp: "聴いたポッドキャストを解析し、意味の近さで配置した実験。" },
  });
}

export default function PodcastNotesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
