// // /Users/i_kawano/Documents/portfolio/app/experiment/page.tsx
// import Image from 'next/image';
// import Link from 'next/link';

// export default function Home() {
//   return (
//     <>
//       {/* Hero Section */}
//       <section className="py-20">
//         {/* h1: Heading/L_M_120 */}
//         <h1 className="text-heading-3xl  mb-2">Hi, I'm Iori!</h1>
//         {/* Hero テキスト: Body/XXL_140 */}
//         <p className="max-w-full text-body-2xl ">
//           A interface designer who loves crafting design to the next level.
//           <br />
//           Especially curious about the integration of data and design.
//         </p>
//       </section>

//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-6">
//         <div className="lg:col-span-6">
//           <p className="text-body-lg  mb-4">
//             The project was inspired by the following hypothetical scenario, provided by the company:
//           </p>

//           <ul className="space-y-2 mb-6 text-body-lg">
//             <li className="flex gap-2">
//               <span className="text-lg">•</span>
//               <div>
//                 <span className="text-[#ff6b6b] font-medium">A</span> needed a new meeting time after the first
//                 consultation.
//               </div>
//             </li>
//             <li className="flex gap-2">
//               <span className="text-lg">•</span>
//               <div>
//                 <span className="text-[#ff6b6b] font-medium">A</span> required{' '}
//                 <span className="text-[#6b88ff] font-medium">B</span>'s presence.
//               </div>
//             </li>
//             <li className="flex gap-2">
//               <span className="text-lg">•</span>
//               <div>
//                 <span className="text-[#ff6b6b] font-medium">A</span> and{' '}
//                 <span className="text-[#6b88ff] font-medium">B</span> sought a 1‑hour slot.
//               </div>
//             </li>
//             <li className="flex gap-2">
//               <span className="text-lg">•</span>
//               <div>
//                 Before proposing times to <span className="text-[#6b88ff] font-medium">C</span> and{' '}
//                 <span className="text-[#6b88ff] font-medium">D</span>,{' '}
//                 <span className="text-[#ff6b6b] font-medium">A</span> confirmed availability with{' '}
//                 <span className="text-[#6b88ff] font-medium">B</span>.
//               </div>
//             </li>
//             <li className="flex gap-2">
//               <span className="text-lg">•</span>
//               <div>
//                 <span className="text-[#ff6b6b] font-medium">A</span> then presented the options to{' '}
//                 <span className="text-[#6b88ff] font-medium">C</span> and{' '}
//                 <span className="text-[#6b88ff] font-medium">D</span>.
//               </div>
//             </li>
//             <li className="flex gap-2">
//               <span className="text-lg">•</span>
//               <div>
//                 <span className="text-[#6b88ff] font-medium">C</span> coordinated with{' '}
//                 <span className="text-[#6b88ff] font-medium">D</span> for a common time.
//               </div>
//             </li>
//             <li className="flex gap-2">
//               <span className="text-lg">•</span>
//               <div>
//                 <span className="text-[#6b88ff] font-medium">C</span> confirmed{' '}
//                 <span className="text-[#6b88ff] font-medium">D</span>'s availability before replying to{' '}
//                 <span className="text-[#ff6b6b] font-medium">A</span>.
//               </div>
//             </li>
//             <li className="flex gap-2">
//               <span className="text-lg">•</span>
//               <div>
//                 Finally, <span className="text-[#6b88ff] font-medium">C</span> provided a mutually agreed time to{' '}
//                 <span className="text-[#ff6b6b] font-medium">A</span>.
//               </div>
//             </li>
//           </ul>
//         </div>

//         <div className="lg:col-span-6 relative">
//           <div className="absolute inset-0 bg-gray-100 rounded-[40px] -z-10"></div>
//           <div className="relative pt-0 md:pt-8">
//             <img
//               src="/work/2_day_internship/2_day_internship-image.webp"
//               alt="Project overview diagram"
//               className="w-full max-w-lg mx-auto"
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// /app/experiment/page.tsx
'use client';
import { MoveUpRight } from 'lucide-react';
import NextLink from 'next/link';
import { CTAButton } from '@/components/ui/cta-button';
import React, { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useBodyFont, useHeadingFont } from '@/src/hooks/useFonts';

const ExperimentPage: React.FC = () => {
  const t = useTranslations('experiment');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const { getBodyFontClass, getBodyFontStyle } = useBodyFont();
  const { getHeadingFontClass, getHeadingFontStyle } = useHeadingFont();
  const [activeSection, setActiveSection] = useState<string>('overview');

  // 5 most-recent podcast episodes — dynamic (covers are Spotify URLs already
  // embedded in the notes data). Resilient fetch: live API first, static bundled
  // JSON as fallback (the API rate-limits from datacenter IPs).
  type RecentEpisode = { title: string; cover: string; podcast: string };
  const [recentEpisodes, setRecentEpisodes] = useState<RecentEpisode[]>([]);
  const [hasMoreEpisodes, setHasMoreEpisodes] = useState<boolean>(false);
  const [episodesLoading, setEpisodesLoading] = useState<boolean>(true);

  useEffect(() => {
    let cancelled = false;
    const pick = (data: any) => {
      const episodes: any[] = data?.episodes ?? (Array.isArray(data) ? data : []);
      // Official show covers (resolved offline via iTunes), keyed by podcast name.
      const coverByShow = new Map<string, string>(
        (data?.podcasts ?? []).filter((p: any) => p?.cover).map((p: any) => [p.name, p.cover]),
      );
      const usable = episodes.filter((e) => e?.podcast && e.podcast !== 'Unknown');
      const byRecent = [...usable].sort((a, b) =>
        String(b?.date ?? '').localeCompare(String(a?.date ?? '')),
      );
      // Dedupe by show: keep the most-recent episode per podcast, so no cover repeats.
      const seen = new Set<string>();
      const uniqueShows: RecentEpisode[] = [];
      for (const e of byRecent) {
        if (seen.has(e.podcast)) continue;
        const cover = coverByShow.get(e.podcast) || e.podcastCover;
        if (!cover) continue;
        seen.add(e.podcast);
        uniqueShows.push({ title: e?.title ?? e?.podcast ?? '', cover, podcast: e.podcast });
      }
      if (!cancelled) {
        setRecentEpisodes(uniqueShows.slice(0, 5));
        setHasMoreEpisodes(uniqueShows.length > 5);
      }
    };
    // Static JSON first — it's a fast bundled file with official covers, and this
    // decorative row doesn't need Notion-live freshness (the live API can take ~8s).
    const load = async () => {
      try {
        const res = await fetch('/data/podcast-notes.json');
        if (!res.ok) throw new Error('static');
        pick(await res.json());
      } catch {
        try {
          const res = await fetch('/api/podcast-notes');
          pick(await res.json());
        } catch {
          /* leave empty */
        }
      } finally {
        if (!cancelled) setEpisodesLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // スクロールに応じた activeSection の更新
  useEffect(() => {
    const sections = ['overview', 'about', 'results', 'conclusion'];
    const handleScroll = () => {
      let currentSection = activeSection;
      for (const id of sections) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            currentSection = id;
          }
        }
      }
      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  return (
    <div className="font-sans my-24 md:mt-28 md:mb-16">
      {/* Hero Section */}
      <section className="pt-4 md:pt-16 pb-4 md:pb-16">
        <h1 className="text-display mb-2">Experiment</h1>
        <p className={`max-w-full text-body-lg ${getBodyFontClass()}`}>{t('description')}</p>
      </section>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
        <div className="lg:col-span-6 relative">
          <div className="absolute inset-0 -z-10"></div>
          <div className="relative pt-0 md:pt-8">
            <img
              src="/experiment/Radial cluster tree.svg"
              alt="Radial cluster tree"
              className="w-full max-w-lg mx-auto"
            />
          </div>
        </div>
        <div className="lg:col-span-6">
          <div className="flex flex-col items-start gap-10 relative">
            <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
              <div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
                {/* <img className="relative w-14 h-14" alt="S" src="/experiment/podcast_notes_icon.svg" /> */}
                <h2 className="text-headline">Podcast Notes</h2>
              </div>

              <div className="flex gap-2 items-start flex-wrap">
                <span className="font-space-grotesk text-label leading-[1.3] px-3 py-1 rounded-lg bg-surface-muted text-ink-tertiary">
                  Al
                </span>
                <span className="font-space-grotesk text-label leading-[1.3] px-3 py-1 rounded-lg bg-surface-muted text-ink-tertiary">
                  Biology/Nature
                </span>
                <span className="font-space-grotesk text-label leading-[1.3] px-3 py-1 rounded-lg bg-surface-muted text-ink-tertiary">
                  Business
                </span>
                <span className="font-space-grotesk text-label leading-[1.3] px-3 py-1 rounded-lg bg-surface-muted text-ink-tertiary">
                  Career
                </span>
                <span className="font-space-grotesk text-label leading-[1.3] px-3 py-1 rounded-lg bg-surface-muted text-ink-tertiary">
                  Design & Art
                </span>
                <span className="font-space-grotesk text-label leading-[1.3] px-3 py-1 rounded-lg bg-surface-muted text-ink-tertiary">
                  Liberal Arts
                </span>
                <span className="font-space-grotesk text-label leading-[1.3] px-3 py-1 rounded-lg bg-surface-muted text-ink-tertiary">
                  Science
                </span>
                <span className="font-space-grotesk text-label leading-[1.3] px-3 py-1 rounded-lg bg-surface-muted text-ink-tertiary">
                  Startup/VC
                </span>
                <span className="font-space-grotesk text-label leading-[1.3] px-3 py-1 rounded-lg bg-surface-muted text-ink-tertiary">
                  Technology
                </span>
              </div>
              <p className={`text-body-base md:text-body-lg ${getBodyFontClass()}`}>{t('podcastNotesDescription')}</p>
            </div>

            <div className="flex flex-wrap items-end gap-[16px_24px] relative self-stretch w-full flex-[0_0_auto]">
              {episodesLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={`skeleton-${i}`}
                      className="w-[72px] h-[72px] rounded-media bg-surface-muted animate-pulse"
                    />
                  ))
                : recentEpisodes.map((e, i) => (
                    <img
                      key={`${e.cover}-${i}`}
                      className="w-[72px] h-[72px] object-cover rounded-media"
                      alt={e.title}
                      title={e.title}
                      src={e.cover}
                      loading="lazy"
                    />
                  ))}
              {!episodesLoading && hasMoreEpisodes && (
                <div className="relative self-center text-body-base text-ink-tertiary">and more!</div>
              )}
            </div>

            <CTAButton href={`/${locale}/experiment/podcast-notes`} className="w-full md:w-auto">
              {tCommon('goToPage')}
            </CTAButton>
          </div>
        </div>
      </div>

      {/* Favorite Visuals: personal collection, intentionally hidden from the live site (code kept for potential reuse) */}
    </div>
  );
};

export default ExperimentPage;
