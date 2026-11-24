import type { Metadata } from 'next';
import { buildPageMetadata } from '@/src/lib/pageMetadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    path: '/experiment/article-pipeline',
    locale,
    title: { en: 'Article Pipeline', jp: 'Article Pipeline' },
    description: {
      en: 'A setup on Claude Code that takes my rough notes to a draft on note and Medium: one drafting role, five reviewing roles, a format check, and publishing left to me.',
      jp: 'メモから note と Medium の下書きまでを、Claude Code で進める仕組みです。下書きを書く役、5つの観点で点検する役、形式を確かめるスクリプトがあり、公開だけは私が行います。',
    },
  });
}

export default function ArticlePipelineLayout({ children }: { children: React.ReactNode }) {
  return children;
}
