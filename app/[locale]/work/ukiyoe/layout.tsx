import type { Metadata } from 'next';
import { buildPageMetadata } from '@/src/lib/pageMetadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    path: '/work/ukiyoe',
    locale,
    title: { en: "Ukiyoe: Layer by Layer", jp: "浮世絵：一色ずつ、時を摺る" },
    description: { en: "An interactive site that shows how ukiyoe woodblock printing went from one ink to full colour, one layer at a time.", jp: "墨摺絵から錦絵へ。浮世絵の版画技法の進化を、一色ずつ重ねながら体験するインタラクティブサイト。" },
    image: 'ukiyoe.jpg',
  });
}

export default function UkiyoeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
