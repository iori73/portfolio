// // // // components/CaseStudyLayout.tsx

// // //   "use client";
// // // import React, { useState, useEffect } from "react";
// // // import { CaseStudyData } from "./CaseStudyTypes"; // your types file
// // // import Sidebar from "./Sidebar"; // optionally extract sidebar as its own component

// // // type Props = {
// // //   data: CaseStudyData;
// // // };

// // // const CaseStudyLayout: React.FC<Props> = ({ data }) => {
// // //   const [activeSection, setActiveSection] = useState<string>(data.sections[0]?.id || "overview");

// // //   const scrollToSection = (sectionId: string) => {
// // //     const element = document.getElementById(sectionId);
// // //     if (element) {
// // //       element.scrollIntoView({ behavior: "smooth" });
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     const sectionIds = data.sections.map(section => section.id);
// // //     const handleScroll = () => {
// // //       let current = activeSection;
// // //       for (const id of sectionIds) {
// // //         const el = document.getElementById(id);
// // //         if (el) {
// // //           const rect = el.getBoundingClientRect();
// // //           if (rect.top <= 150) {
// // //             current = id;
// // //           }
// // //         }
// // //       }
// // //       if (current !== activeSection) {
// // //         setActiveSection(current);
// // //       }
// // //     };

// // //     window.addEventListener("scroll", handleScroll);
// // //     handleScroll();
// // //     return () => window.removeEventListener("scroll", handleScroll);
// // //   }, [activeSection, data.sections]);

// // //   return (
// // //     <div className="font-sans">
// // //       {/* Hero Section */}
// // //       <section className="bg-white pt-32 scroll-mt-32">
// // //         <div className="max-w-[896px] w-full mx-auto">
// // //           <div className="flex justify-center">
// // //             <img src={data.heroImage} alt="Hero" className="w-full max-w-[896px]" />
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* Project Info */}
// // //       <section id="project-info" className="bg-white pt-4 pb-8 scroll-mt-32">
// // //         <div className="max-w-[896px] w-full mx-auto">
// // //           <div className="flex items-center gap-6 mb-4 flex-wrap md:flex-nowrap">
// // //             <h1 className="text-heading-s-120 md:text-heading-m-120 font-inter">{data.projectTitle}</h1>
// // //             <div className="flex gap-2">
// // //               {data.tags.map(tag => (
// // //                 <span key={tag} className="text-body-l-140 font-inter px-4 py-1 rounded-full bg-[#e3e3e3]">{tag}</span>
// // //               ))}
// // //             </div>
// // //           </div>
// // //           <p className="text-body-xl-140 font-inter text-gray-600 mb-8">
// // //             {data.projectDescription}
// // //           </p>
// // //           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
// // //             <div>
// // //               <h3 className="text-caption-xl-120 font-jetbrains-mono text-gray-500 mb-2">Timeline</h3>
// // //               <p className="text-body-l-140 font-inter">{data.infoGrid.timeline}</p>
// // //             </div>
// // //             <div>
// // //               <h3 className="text-caption-xl-120 font-jetbrains-mono text-gray-500 mb-2">My Role</h3>
// // //               <p className="text-body-l-140 font-inter">{data.infoGrid.role}</p>
// // //             </div>
// // //             <div>
// // //               <h3 className="text-caption-xl-120 font-jetbrains-mono text-gray-500 mb-2">Team</h3>
// // //               <p className="text-body-l-140 font-inter">{data.infoGrid.team}</p>
// // //             </div>
// // //             <div>
// // //               <h3 className="text-caption-xl-120 font-jetbrains-mono text-gray-500 mb-2">Tool + Deliverables</h3>
// // //               <p className="text-body-l-140 font-inter">{data.infoGrid.deliverables}</p>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* Main Content */}
// // //       <div className="max-w-[1152px] w-full mx-auto flex flex-col md:flex-row">
// // //         <div className="md:w-3/4">
// // //           {data.sections.map(section => (
// // //             <section key={section.id} id={section.id} className="py-4 scroll-mt-32">
// // //               <h2 className="text-heading-s-120 md:text-heading-m-120 font-inter mb-4">{section.heading}</h2>
// // //               {section.description && (
// // //                 <p className="text-body-xl-140 font-inter mb-4">{section.description}</p>
// // //               )}
// // //               {section.images.map((img, idx) => (
// // //                 <img key={idx} src={img} alt={`${section.heading} placeholder`} className="w-full mb-8" />
// // //               ))}
// // //             </section>
// // //           ))}
// // //         </div>
// // //         <div className="hidden md:flex md:w-1/4 pl-4 pt-8 items-start justify-center">
// // //           <nav className="sticky top-24">
// // //             <ul className="space-y-3">
// // //               {/* Render sidebar buttons based on section data */}
// // //               {data.sections.map(section => (
// // //                 <li key={section.id}>
// // //                   <button
// // //                     onClick={() => scrollToSection(section.id)}
// // //                     className={
// // //                       activeSection === section.id
// // //                         ? "text-left text-body-xl-140 font-inter transition-transform duration-900 scale-110"
// // //                         : "text-left text-body-xl-140 font-inter transition-transform duration-900 scale-100 opacity-50"
// // //                     }
// // //                   >
// // //                     {section.heading}
// // //                   </button>
// // //                 </li>
// // //               ))}
// // //             </ul>
// // //           </nav>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default CaseStudyLayout;

// // // /components/CaseStudyLayout.tsx
// // "use client";
// // import React, { useState, useEffect } from "react";
// // import { CaseStudyData } from "./CaseStudyTypes";
// // import { SplitImageSection } from "./SplitImageSection";
// // import { DefaultSection } from "./DefaultSection";

// // type Props = {
// //   data: CaseStudyData;
// // };

// // const CaseStudyLayout: React.FC<Props> = ({ data }) => {
// //   // Set the first section as active by default.
// //   const [activeSection, setActiveSection] = useState<string>(data.sections[0]?.id || "overview");

// //   const scrollToSection = (sectionId: string) => {
// //     const element = document.getElementById(sectionId);
// //     if (element) {
// //       element.scrollIntoView({ behavior: "smooth" });
// //     }
// //   };

// //   // Update activeSection based on scroll position
// //   useEffect(() => {
// //     const sectionIds = data.sections.map((section) => section.id);
// //     const handleScroll = () => {
// //       let current = activeSection;
// //       for (const id of sectionIds) {
// //         const el = document.getElementById(id);
// //         if (el) {
// //           const rect = el.getBoundingClientRect();
// //           if (rect.top <= 150) {
// //             current = id;
// //           }
// //         }
// //       }
// //       if (current !== activeSection) {
// //         setActiveSection(current);
// //       }
// //     };

// //     window.addEventListener("scroll", handleScroll);
// //     handleScroll();
// //     return () => window.removeEventListener("scroll", handleScroll);
// //   }, [activeSection, data.sections]);

// //   return (
// //     <div className="font-sans">
// //       {/* Hero Section */}
// //       <section className="bg-white pt-32 scroll-mt-32">
// //         <div className="max-w-[896px] w-full mx-auto">
// //           <div className="flex justify-center">
// //             <img src={data.heroImage} alt="Hero" className="w-full max-w-[896px]" />
// //           </div>
// //         </div>
// //       </section>

// //       {/* Project Info */}
// //       <section id="project-info" className="bg-white pt-4 pb-8 scroll-mt-32">
// //         <div className="max-w-[896px] w-full mx-auto">
// //           <div className="flex items-center gap-6 mb-4 flex-wrap md:flex-nowrap">
// //             <h1 className="text-heading-s-120 md:text-heading-m-120 font-inter">
// //               {data.projectTitle}
// //             </h1>
// //             <div className="flex gap-2">
// //               {data.tags.map((tag) => (
// //                 <span key={tag} className="text-body-l-140 font-inter px-4 py-1 rounded-full bg-[#e3e3e3]">
// //                   {tag}
// //                 </span>
// //               ))}
// //             </div>
// //           </div>
// //           <p className="text-body-xl-140 font-inter text-gray-600 mb-8">
// //             {data.projectDescription}
// //           </p>
// //           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
// //             <div>
// //               <h3 className="text-caption-xl-120 font-jetbrains-mono text-gray-500 mb-2">Timeline</h3>
// //               <p className="text-body-l-140 font-inter">{data.infoGrid.timeline}</p>
// //             </div>
// //             <div>
// //               <h3 className="text-caption-xl-120 font-jetbrains-mono text-gray-500 mb-2">My Role</h3>
// //               <p className="text-body-l-140 font-inter">{data.infoGrid.role}</p>
// //             </div>
// //             <div>
// //               <h3 className="text-caption-xl-120 font-jetbrains-mono text-gray-500 mb-2">Team</h3>
// //               <p className="text-body-l-140 font-inter">{data.infoGrid.team}</p>
// //             </div>
// //             <div>
// //               <h3 className="text-caption-xl-120 font-jetbrains-mono text-gray-500 mb-2">Tool + Deliverables</h3>
// //               <p className="text-body-l-140 font-inter">{data.infoGrid.deliverables}</p>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Main Content */}
// //       {/* <div className="max-w-[1152px] w-full mx-auto flex flex-col md:flex-row">
// //         <div className="md:w-3/4">
// //           {data.sections.map((section) => (
// //             <section key={section.id} id={section.id} className="py-4 scroll-mt-32">
// //               <h2 className="text-heading-s-120 md:text-heading-m-120 font-inter mb-4">
// //                 {section.heading}
// //               </h2>
// //               {section.description && (
// //                 <p className="text-body-xl-140 font-inter mb-4">{section.description}</p>
// //               )}
// //               {section.images.map((img, idx) => (
// //                 <img key={idx} src={img} alt={`${section.heading} placeholder`} className="w-full mb-8" />
// //               ))}
// //             </section>
// //           ))}
// //         </div>
// //         <div className="hidden md:flex md:w-1/4 pl-4 pt-8 items-start justify-center">
// //           <nav className="sticky top-24">
// //             <ul className="space-y-3">
// //               {data.sections.map((section) => (
// //                 <li key={section.id}>
// //                   <button
// //                     onClick={() => scrollToSection(section.id)}
// //                     className={
// //                       activeSection === section.id
// //                         ? "text-left text-body-xl-140 font-inter transition-transform duration-900 scale-110"
// //                         : "text-left text-body-xl-140 font-inter transition-transform duration-900 scale-100 opacity-50"
// //                     }
// //                   >
// //                     {section.heading}
// //                   </button>
// //                 </li>
// //               ))}
// //             </ul>
// //           </nav>
// //         </div>
// //       </div> */}

// //       {/* メインのセクションをループ */}
// //       {data.sections.map((section) => {
// //         // layoutType が "splitImage" の場合
// //         if (section.layoutType === "splitImage") {
// //           return (
// //             <SplitImageSection
// //               key={section.id}
// //               heading={section.heading}
// //               bullets={section.bullets || []}
// //               image={section.images[0]} // 1枚想定
// //             />
// //           );
// //         } else {
// //           // 通常セクション
// //           return (
// //             <DefaultSection
// //               key={section.id}
// //               heading={section.heading}
// //               description={section.description}
// //               images={section.images}
// //             />
// //           );
// //         }
// //       })}

// //     </div>
// //   );
// // };

// // export default CaseStudyLayout;

// // /components/CaseStudyLayout.tsx
// "use client";
// import React from "react";
// import { DefaultSection } from "./DefaultSection";
// import { SplitImageSection } from "./SplitImageSection";
// import { CaseStudyData } from "./CaseStudyTypes";

// type CaseStudyLayoutProps = {
//   data: CaseStudyData;
// };

// export default function CaseStudyLayout({ data }: CaseStudyLayoutProps) {
//   return (
//     <div className="font-sans">
//       {/* Hero Section */}
//       <section className="bg-white pt-32 scroll-mt-32">
//         <div className="max-w-[896px] w-full mx-auto">
//           <div className="flex flex-wrap justify-center">
//             <img
//               src={data.heroImage}
//               alt="Hero Image"
//               className="w-full max-w-[896px]"
//             />
//           </div>
//         </div>
//       </section>

//       {/* Project Info Section */}
//       <section id="project-info" className="bg-white pt-4 pb-8 scroll-mt-32">
//         <div className="max-w-[896px] w-full mx-auto">
//           <div className="flex items-center gap-6 mb-4 flex-wrap md:flex-nowrap">
//             <h1 className="text-heading-s-120 md:text-heading-m-120 font-inter">
//               {data.projectTitle}
//             </h1>
//             <div className="flex gap-2">
//               {data.tags.map((tag, index) => (
//                 <span
//                   key={index}
//                   className="text-body-l-140 font-inter px-4 py-1 rounded-full bg-[#e3e3e3]"
//                 >
//                   {tag}
//                 </span>
//               ))}
//             </div>
//           </div>
//           <p className="text-body-xl-140 font-inter text-gray-600 mb-8">
//             {data.projectDescription}
//           </p>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             <div>
//               <h3 className="text-caption-xl-120 font-jetbrains-mono text-gray-500 mb-2">
//                 Timeline
//               </h3>
//               <p className="text-body-l-140 font-inter">{data.infoGrid.timeline}</p>
//             </div>
//             <div>
//               <h3 className="text-caption-xl-120 font-jetbrains-mono text-gray-500 mb-2">
//                 My Role
//               </h3>
//               <p className="text-body-l-140 font-inter">{data.infoGrid.role}</p>
//             </div>
//             <div>
//               <h3 className="text-caption-xl-120 font-jetbrains-mono text-gray-500 mb-2">
//                 Team
//               </h3>
//               <p className="text-body-l-140 font-inter">{data.infoGrid.team}</p>
//             </div>
//             <div>
//               <h3 className="text-caption-xl-120 font-jetbrains-mono text-gray-500 mb-2">
//                 Tool + Deliverables
//               </h3>
//               <p className="text-body-l-140 font-inter">{data.infoGrid.deliverables}</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Main Content and Sidebar */}
//       <div className="max-w-[1152px] w-full mx-auto">
//         <div className="flex flex-col md:flex-row">
//           {/* Main Content */}
//           <div className="md:w-3/4">
//             {data.sections.map((section) => {
//               if (section.layoutType === "splitImage") {
//                 return (
//                   <SplitImageSection
//                     key={section.id}
//                     heading={section.heading}
//                     description={section.description}
//                     bullets={section.bullets}
//                     image={section.images[0] || ""}
//                   />
//                 );
//               } else {
//                 return (
//                   <DefaultSection
//                     key={section.id}
//                     heading={section.heading}
//                     description={section.description}
//                     images={section.images}
//                   />
//                 );
//               }
//             })}
//           </div>

//           {/* Sidebar - 静的なナビゲーション（必要に応じて data から生成してもよい） */}
//           <div className="hidden md:flex md:w-1/4 pl-4 pt-8 items-start justify-center">
//             <nav className="sticky top-24">
//               <ul className="space-y-3">
//                 {data.sections.map((section) => (
//                   <li key={section.id}>
//                     <button
//                       onClick={() => {
//                         const el = document.getElementById(section.id);
//                         if (el) {
//                           el.scrollIntoView({ behavior: "smooth" });
//                         }
//                       }}
//                       className="text-left text-body-xl-140 font-inter transition-transform duration-900"
//                     >
//                       {section.heading}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </nav>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /components/CaseStudyLayout.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { DefaultSection } from './DefaultSection';
import { SplitImageSection } from './SplitImageSection';
import { CaseStudyData } from './CaseStudyTypes';

type CaseStudyLayoutProps = {
  data: CaseStudyData;
};

export default function CaseStudyLayout({ data }: CaseStudyLayoutProps) {
  // サイドバーのハイライト用に、現在のセクションIDを管理
  const [activeSection, setActiveSection] = useState<string>(data.sections[0]?.id || '');

  // セクションへのスムーズスクロール
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // スクロール位置に応じて activeSection を更新
  useEffect(() => {
    const handleScroll = () => {
      let current = activeSection;

      // sections の順番通りにチェックして、画面上部から 150px 程度に入ったら active 扱い
      for (const section of data.sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            current = section.id;
          }
        }
      }
      if (current !== activeSection) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初回チェック
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection, data.sections]);

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="bg-white pt-32 scroll-mt-32">
        <div className="max-w-[896px] w-full mx-auto">
          <div className="flex flex-wrap justify-center">
            <img src={data.heroImage} alt="Hero Image" className="w-full max-w-[896px]" />
          </div>
        </div>
      </section>

      {/* Project Info Section */}
      <section id="project-info" className="bg-white pt-4 pb-8 scroll-mt-32">
        <div className="max-w-[896px] w-full mx-auto">
          <div className="flex items-center gap-6 mb-4 flex-wrap md:flex-nowrap">
            <h1 className="text-heading-s-120 md:text-heading-m-120 font-inter">{data.projectTitle}</h1>
            <div className="flex gap-2">
              {data.tags.map((tag, index) => (
                <span key={index} className="text-body-l-140 font-inter px-4 py-1 rounded-full bg-[#e3e3e3]">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <p className="text-body-xl-140 font-inter text-gray-600 mb-8">{data.projectDescription}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <h3 className="text-caption-xl-120 font-jetbrains-mono text-gray-500 mb-2">Timeline</h3>
              <p className="text-body-l-140 font-inter">{data.infoGrid.timeline}</p>
            </div>
            <div>
              <h3 className="text-caption-xl-120 font-jetbrains-mono text-gray-500 mb-2">My Role</h3>
              <p className="text-body-l-140 font-inter">{data.infoGrid.role}</p>
            </div>
            <div>
              <h3 className="text-caption-xl-120 font-jetbrains-mono text-gray-500 mb-2">Team</h3>
              <p className="text-body-l-140 font-inter">{data.infoGrid.team}</p>
            </div>
            <div>
              <h3 className="text-caption-xl-120 font-jetbrains-mono text-gray-500 mb-2">Tool + Deliverables</h3>
              <p className="text-body-l-140 font-inter">{data.infoGrid.deliverables}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content and Sidebar */}
      <div className="max-w-[1152px] w-full mx-auto">
        <div className="flex flex-col md:flex-row">
          {/* Main Content */}
          <div className="md:w-3/4">
            {data.sections.map((section) => {
              if (section.layoutType === 'splitImage') {
                // 画像＋テキストが左右分割のレイアウト
                return (
                  <SplitImageSection
                    key={section.id}
                    heading={section.heading}
                    description={section.description}
                    bullets={section.bullets}
                    image={section.images[0] || ''}
                  />
                );
              } else {
                // 通常のデフォルトレイアウト
                return (
                  <DefaultSection
                    key={section.id}
                    heading={section.heading}
                    description={section.description}
                    images={section.images}
                  />
                );
              }
            })}
          </div>
          {/* Sidebar - スクロール連動ナビゲーション */}
          <div className="hidden md:flex md:w-1/4 pl-4 pt-8 items-start justify-center">
            <nav className="sticky top-24">
              <ul className="space-y-3">
                {data.sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => scrollToSection(section.id)}
                      className={
                        activeSection === section.id
                          ? // アクティブ時
                            'text-left text-body-xl-140 font-inter transition-transform duration-900 scale-110'
                          : // 非アクティブ時
                            'text-left text-body-xl-140 font-inter transition-transform duration-900 scale-100 opacity-50'
                      }
                    >
                      {section.heading}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Sidebar - Hidden on mobile */}
          {/* <div className="hidden md:flex md:w-1/4 pl-4 pt-8 items-start justify-center">
            <nav className="sticky top-24">
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => scrollToSection('overview')}
                    // 非アクティブ: scale-100, opacity-50
                    // アクティブ:   scale-110, opacity-100
                    className={
                      activeSection === 'overview'
                        ? 'text-left text-body-xl-140 font-inter transition-transform duration-900 scale-110'
                        : 'text-left text-body-xl-140 font-inter transition-transform duration-900 scale-100 opacity-50'
                    }
                  >
                    Overview
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('design-process')}
                    className={
                      activeSection === 'design-process'
                        ? 'text-left text-body-xl-140 font-inter transition-transform duration-900 scale-110'
                        : 'text-left text-body-xl-140 font-inter transition-transform duration-900 scale-100 opacity-50'
                    }
                  >
                    Design Process
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('solution')}
                    className={
                      activeSection === 'solution'
                        ? 'text-left text-body-xl-140 font-inter transition-transform duration-900 scale-110'
                        : 'text-left text-body-xl-140 font-inter transition-transform duration-900 scale-100 opacity-50'
                    }
                  >
                    Solution
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('reflection')}
                    className={
                      activeSection === 'reflection'
                        ? 'text-left text-body-xl-140 font-inter transition-transform duration-900 scale-110'
                        : 'text-left text-body-xl-140 font-inter transition-transform duration-900 scale-100 opacity-50'
                    }
                  >
                    Reflection
                  </button>
                </li>
              </ul>
            </nav>
          </div> */}
        </div>
      </div>
    </div>
  );
}
