// // SplitImageSection.tsx (例)

// interface SplitImageSectionProps {
//     heading: string;
//     bullets: string[];
//     image: string;
//   }

//   export function SplitImageSection({ heading, bullets, image }: SplitImageSectionProps) {
//     return (
//       <section className="py-8 bg-white text-[#002a38]">
//         <h2 className="text-heading-xl md:text-heading-2xl font-helvetica-neue mb-6">{heading}</h2>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-6">
//           {/* 左側 */}
//           <div className="lg:col-span-6">
//             <p className="text-body-lg font-helvetica-neue mb-4">
//               {/* 必要であれば追加の説明文 */}
//               The project was inspired by the following hypothetical scenario...
//             </p>
//             <ul className="space-y-2 mb-6 text-body-lg">
//               {bullets.map((bullet, idx) => (
//                 <li key={idx} className="flex gap-2">
//                   <span className="text-lg">•</span>
//                   <div>{bullet}</div>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* 右側 */}
//           <div className="lg:col-span-6 relative">
//             <div className="absolute inset-0 bg-gray-100 rounded-[40px] -z-10"></div>
//             <div className="relative pt-0 md:pt-8">
//               <img
//                 src={image}
//                 alt="Project overview diagram"
//                 className="w-full max-w-lg mx-auto"
//               />
//             </div>
//           </div>
//         </div>
//       </section>
//     );
//   }

// /components/SplitImageSection.tsx
'use client';
import React from 'react';

interface SplitImageSectionProps {
  heading: string;
  description?: string;
  bullets?: string[];
  image: string;
  headingLevel?: 'h2' | 'h3';
}

export function SplitImageSection({
  heading,
  description,
  bullets,
  image,
  headingLevel = 'h2',
}: SplitImageSectionProps) {
  const HeadingTag = headingLevel === 'h3' ? 'h3' : 'h2';
  const headingClassName =
    headingLevel === 'h3'
      ? 'text-heading-base font-merriweather font-semibold mb-4'
      : 'text-heading-xl md:text-heading-2xl font-helvetica-neue mb-6';

  return (
    <section className="py-8 bg-white text-[#002a38] scroll-mt-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6">
          <HeadingTag className={headingClassName}>{heading}</HeadingTag>
          {description && <p className="text-body-lg font-helvetica-neue mb-4">{description}</p>}
          {bullets && bullets.length > 0 && (
            <ul className="space-y-2 mb-6 text-body-lg">
              {bullets.map((bullet, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="text-body-base">•</span>
                  <div>{bullet}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="lg:col-span-6 relative">
          <div className="absolute inset-0 bg-gray-100 rounded-[40px] -z-10"></div>
          <div className="relative pt-0 md:pt-8">
            <img src={image} alt={`${heading} diagram`} className="w-full max-w-lg mx-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}
