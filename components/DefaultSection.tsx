// "use client"; // 必要に応じて
// import React from "react";

// interface DefaultSectionProps {
//   heading: string;
//   description?: string;
//   images?: string[];
// }

// /**
//  * 共通的な（通常レイアウト）のセクション表示用コンポーネント
//  */
// export function DefaultSection({
//   heading,
//   description,
//   images = [],
// }: DefaultSectionProps) {
//   return (
//     <section className="py-8 bg-white text-[#002a38]">
//       <h2 className="text-heading-xl md:text-heading-2xl font-helvetica-neue mb-6">
//         {heading}
//       </h2>

//       {/* Description */}
//       {description && (
//         <p className="text-body-lg font-helvetica-neue mb-4">{description}</p>
//       )}

//       {/* 画像があれば複数並べる */}
//       {images.length > 0 && (
//         <div className="grid grid-cols-1 gap-4 mt-6">
//           {images.map((imgPath, idx) => (
//             <img key={idx} src={imgPath} alt={`${heading} image ${idx}`} />
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }

// /components/DefaultSection.tsx
'use client';
import React from 'react';

interface DefaultSectionProps {
  heading: string;
  description?: string;
  images?: string[];
  headingLevel?: 'h2' | 'h3';
}

export function DefaultSection({ heading, description, images = [], headingLevel = 'h2' }: DefaultSectionProps) {
  const HeadingTag = headingLevel === 'h3' ? 'h3' : 'h2';
  const headingClassName =
    headingLevel === 'h3'
      ? 'text-heading-base font-merriweather font-semibold mb-4'
      : 'text-heading-xl md:text-heading-2xl font-helvetica-neue mb-6';

  return (
    <section className="py-8 bg-white text-[#002a38] scroll-mt-32">
      <HeadingTag className={headingClassName}>{heading}</HeadingTag>
      {description && <p className="text-body-lg font-helvetica-neue mb-6">{description}</p>}
      {images.length > 0 && (
        <div className="grid grid-cols-1 gap-4 mt-6">
          {images.map((img, idx) => (
            <img key={idx} src={img} alt={`${heading} image ${idx + 1}`} className="w-full" />
          ))}
        </div>
      )}
    </section>
  );
}
