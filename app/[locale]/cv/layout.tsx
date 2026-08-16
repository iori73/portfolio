import type { Metadata } from 'next';
import { buildPageMetadata } from '@/src/lib/pageMetadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    path: '/cv',
    locale,
    title: { en: "CV", jp: "CV" },
    description: { en: "Career, projects and skills. Available as a PDF résumé.", jp: "経歴・担当案件・スキル。レジュメ PDF もダウンロードできます。" },
  });
}

export default function CvLayout({ children }: { children: React.ReactNode }) {
  return children;
}
