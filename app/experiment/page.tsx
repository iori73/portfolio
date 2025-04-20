// // /Users/i_kawano/Documents/portfolio/app/experiment/page.tsx
// import Image from 'next/image';
// import Link from 'next/link';

// export default function Home() {
//   return (
//     <>
//       {/* Hero Section */}
//       <section className="py-20">
//         {/* h1: Heading/L_M_120 */}
//         <h1 className="text-heading-l-20 font-sf-pro mb-2">Hi, I'm Iori!</h1>
//         {/* Hero テキスト: Body/XXL_140 */}
//         <p className="max-w-full text-body-xxl-140 font-sf-pro">
//           A interface designer who loves crafting design to the next level.
//           <br />
//           Especially curious about the integration of data and design.
//         </p>
//       </section>

//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-6">
//         <div className="lg:col-span-6">
//           <p className="text-body-l-140 font-sf-pro mb-4">
//             The project was inspired by the following hypothetical scenario, provided by the company:
//           </p>

//           <ul className="space-y-2 mb-6 text-body-l-140">
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
import { Link } from 'lucide-react';
import React, { useState, useEffect } from 'react';

// /Users/i_kawano/Documents/portfolio/app/experiment/SplineWork.tsxをimportする
import SplineWork from './spline';

const ExperimentPage: React.FC = () => {
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
    <div className="font-sans">
      {/* Hero Section */}
      <section className="pt-4 md:pt-16 pb-4 md:pb-16">
        <h1 className="text-heading-l-120 md:text-heading-xl-m-120 mb-2">Hobby blog</h1>
        <p className="max-w-full text-body-l-140 md:text-body-xl-140 font-sf-pro">
          I listen to the podcast everyday and was driven by the desire to organize the input.
        </p>
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
                <img className="relative w-14 h-14" alt="S" src="/experiment/podcast_notes_icon.svg" />
                <h2 className="text-heading-m-120 md:text-heading-l-20">Podcast notes</h2>
              </div>

              <p className="text-body-l-140 md:text-body-xl-140">My personal notes to leave learnings from podcasts</p>

              <div className="inline-flex items-start gap-2 md:gap-6 relative flex-[0_0_auto] flex-wrap md:flex-nowrap">
                <div className="text-caption-l-120">#business</div>

                <div className="text-caption-l-120">#technology</div>

                <div className="text-caption-l-120">#science</div>

                <div className="text-caption-l-120">#liberal arts</div>
              </div>
            </div>

            <div className="flex flex-wrap items-end gap-[16px_24px] relative self-stretch w-full flex-[0_0_auto]">
              <img
                className="relative w-[72px] h-[72px] object-cover"
                alt="Today_I_Learned"
                // If Japanese is included, it will not be loaded on the site.
                src="/experiment/covers/Today_I_Learned.png"
              />

              <img
                className="relative w-[72px] h-[72px] object-cover"
                alt="デデデータ"
                src="/experiment/covers/dededata.png"
              />

              <img
                className="relative w-[72px] h-[72px] object-cover"
                alt="ミモリラジオ-自然の面白さを聴く"
                src="/experiment/covers/mimori radio.jpeg"
              />

              <img
                className="relative w-[72px] h-[72px] object-cover"
                alt="Ologies with Alie Ward"
                src="/experiment/covers/ologies.jpeg"
              />

              <img
                className="relative w-[72px] h-[72px] object-cover"
                alt="Off Topic"
                src="/experiment/covers/Off Topic.png"
              />

              <img
                className="relative w-[72px] h-[72px] object-cover"
                alt="バイリンガルニュース (Bilingual News)"
                src="/experiment/covers/Bilingual News.png"
              />

              <img
                className="relative w-[72px] h-[72px] object-cover"
                alt="START/FM"
                src="/experiment/covers/START_FM.jpeg"
              />

              <img
                className="relative w-[72px] h-[72px] object-cover"
                alt="Design Better"
                src="/experiment/covers/Design Better.png"
              />

              <div className="relative text-body-m-140">and more!</div>
            </div>

            <button
              onClick={() => window.open('https://paint-foam-7ff.notion.site/Podcast-notes-1bc264826e0c8009bf10ee284f3cc5b4?pvs=4', '_blank')}
              aria-label="Podcast Notes"
              className="all-[unset] box-border inline-flex flex-col items-start px-10 py-2 relative flex-[0_0_auto] border-2 border-black rounded-[40px]"

            >
              <div className="text-heading-xxs-120 py-1 z-10">Go to Page</div>
            </button>
          </div>
        </div>
      </div>

      {/* Spline 3D モデル */}
      <SplineWork
        style={{ width: '90%' }}
        className="spline"
        scene="https://prod.spline.design/HS2WPsXRP-WLukO0/scene.splinecode"
      />
    </div>
  );
};

export default ExperimentPage;
