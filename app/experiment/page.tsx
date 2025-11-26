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
//               src="/work/2_day_internship/2_day_internship-image.png"
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
import { Link, MoveUpRight } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useBodyFont, useHeadingFont } from '@/src/hooks/useFonts';

// /Users/i_kawano/Documents/portfolio/app/experiment/FavoriteVisuals.tsxをimportする
import FavoriteVisuals from './spline';

const ExperimentPage: React.FC = () => {
  const t = useTranslations('experiment');
  const locale = useLocale();
  const { getBodyFontClass, getBodyFontStyle } = useBodyFont();
  const { getHeadingFontClass, getHeadingFontStyle } = useHeadingFont();
  const [activeSection, setActiveSection] = useState<string>('overview');

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
        <h1 className="text-heading-3xl md:text-heading-4xl mb-2">Experiment</h1>
        <p className={`max-w-full text-body-lg md:text-body-xl ${getBodyFontClass()}`}>{t('experimentDescription')}</p>
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
                <h2 className="text-heading-2xl md:text-heading-3xl">Podcast Notes</h2>
              </div>

              <div className="flex gap-2 items-start flex-wrap">
                <span className="font-space-mono text-body-base px-3 py-1 rounded-lg bg-[#f5f5f7] text-[#696969]">
                  Al
                </span>
                <span className="font-space-mono text-body-base px-3 py-1 rounded-lg bg-[#f5f5f7] text-[#696969]">
                  Biology/Nature
                </span>
                <span className="font-space-mono text-body-base px-3 py-1 rounded-lg bg-[#f5f5f7] text-[#696969]">
                  Business
                </span>
                <span className="font-space-mono text-body-base px-3 py-1 rounded-lg bg-[#f5f5f7] text-[#696969]">
                  Career
                </span>
                <span className="font-space-mono text-body-base px-3 py-1 rounded-lg bg-[#f5f5f7] text-[#696969]">
                  Design & Art
                </span>
                <span className="font-space-mono text-body-base px-3 py-1 rounded-lg bg-[#f5f5f7] text-[#696969]">
                  Liberal Arts
                </span>
                <span className="font-space-mono text-body-base px-3 py-1 rounded-lg bg-[#f5f5f7] text-[#696969]">
                  Science
                </span>
                <span className="font-space-mono text-body-base px-3 py-1 rounded-lg bg-[#f5f5f7] text-[#696969]">
                  Startup/VC
                </span>
                <span className="font-space-mono text-body-base px-3 py-1 rounded-lg bg-[#f5f5f7] text-[#696969]">
                  Technology
                </span>
              </div>
              <p className={`text-body-base md:text-body-lg ${getBodyFontClass()}`}>{t('podcastNotesDescription')}</p>
            </div>

            <div className="flex flex-wrap items-end gap-[16px_24px] relative self-stretch w-full flex-[0_0_auto]">
              <img
                className="relative w-[72px] h-[72px] object-cover"
                alt="Today_I_Learned"
                // If Japanese is included, it will not be loaded on the site.
                src="https://i.scdn.co/image/ab6765630000ba8a66df42744157019b4156d323"
              />

              <img
                className="relative w-[72px] h-[72px] object-cover"
                alt="デデデータ"
                src="https://i.scdn.co/image/ab6765630000ba8a8cf1ff631fdba63c7a354fff"
              />

              <img
                className="relative w-[72px] h-[72px] object-cover"
                alt="ミモリラジオ-自然の面白さを聴く"
                src="https://i.scdn.co/image/ab6765630000ba8ae29175ad2623d601ede331e2"
              />

              <img
                className="relative w-[72px] h-[72px] object-cover"
                alt="Ologies with Alie Ward"
                src="https://i.scdn.co/image/ab6765630000ba8a44e9ed06f94f5391dbd73049"
              />

              <img
                className="relative w-[72px] h-[72px] object-cover"
                alt="Off Topic"
                src="https://i.scdn.co/image/ab6765630000ba8a2332b679810aa74a364db7fd"
              />

              <img
                className="relative w-[72px] h-[72px] object-cover"
                alt="バイリンガルニュース (Bilingual News)"
                src="https://i.scdn.co/image/ab6765630000ba8aea2b4558f98bd78edd90beb8"
              />

              <img
                className="relative w-[72px] h-[72px] object-cover"
                alt="START/FM"
                src="https://i.scdn.co/image/ab6765630000ba8a10bfd90aa0934995794d5bb4"
              />

              <img
                className="relative w-[72px] h-[72px] object-cover"
                alt="Design Better"
                src="https://i.scdn.co/image/ab6765630000ba8a5383d40bcd6e695ff40eed19"
              />

              {/* <div className="relative text-body-base">{t('andMore')}</div> */}
              <div className="relative text-body-base">and more!</div>
            </div>

            <a
              href="https://paint-foam-7ff.notion.site/Podcast-notes-1bc264826e0c8009bf10ee284f3cc5b4?pvs=4"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center justify-center px-6 py-3 rounded-[100px] text-[#0000008f] hover:text-white cursor-pointer transition-[color] duration-300 whitespace-nowrap overflow-hidden group w-full md:w-auto"
              style={{
                background:
                  'radial-gradient(75% 150% at 100% 114.2%, rgba(210, 210, 215, 0.4) 0%, rgba(180, 180, 185, 0.4) 100%)',
                backdropFilter: 'blur(8px)',
              }}
            >
              {/* Hover background overlay */}
              <span
                className="absolute inset-0 rounded-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(75% 150% at 100% 114.2%, rgba(210, 210, 215, 0.8) 0%, rgba(180, 180, 185, 0.8) 100%)',
                  backdropFilter: 'blur(8px)',
                }}
              />
              <span className="relative z-10 text-body-lg md:text-body-xl font-medium">{t('goToPage')}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Favorite Visuals */}
      <FavoriteVisuals />
    </div>
  );
};

export default ExperimentPage;
