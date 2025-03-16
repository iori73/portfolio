// // // // // /src/compositions/Footer.tsx
// // // // 'use client';

// // // // import Link from 'next/link';
// // // // import Image from 'next/image';

// // // // export default function Home() {
// // // //   return (
// // // //     <div className="relative flex flex-row items-center justify-center p-4 pb-16 bg-[#F2F2F2]">
// // //  // {/* 左端に縦書きの "frequency" を絶対配置 */}
// // //  // <div className=" absolute top-1/2 gap-2 left-72 -translate-y-16 flex flex-col items-center">
// // //  //   <div
// // //  //     className="w-6 h-6 rounded-full"
// // //  //     style={{
// // //  //       background: 'linear-gradient(180deg, rgba(219, 219, 219, 0.40) 0%, rgba(219, 219, 219, 0.80) 100%)',
// // //  //     }}
// // //  //   />

// // //  //   <span
// // //  //     className=" font-mono mb-2"
// // //  //     style={{
// // //  //       writingMode: 'vertical-rl',
// // //  //       textOrientation: 'mixed',
// // //  //       transform: 'rotate(0deg)',
// // //  //     }}
// // //  //   >
// // //  //     frequency
// // //  //   </span>
// // //  // </div>

// // // //       <div className="w-full max-w-2xl">
// // // //         <div className="relative mb-24">
// // // //           {/* メインの横線 */}
// // // //           <div className="relative mx-auto mt-40">
// // // //             {/* Horizontal line */}
// // // //             <div className="absolute left-0 right-0 top-0 h-px bg-[#dbdbdb] z-0"></div>

// // // //             {/* Icons in the desired order */}
// // // //             <div className="relative flex w-full justify-between">
// // // //               {/* 1) X (Twitter) - 128px */}
// // // //               <div className="relative flex flex-col items-center">
// // // //                 <Link
// // // //                   href="https://twitter.com/iori73wsy"
// // // //                   aria-label="Twitter/X"
// // // //                   target="_blank"
// // // //                   rel="noreferrer"
// // // //                   className="absolute top-[-64px] z-10 flex h-[128px] w-[128px] items-center justify-center rounded-full"
// // // //                   style={{
// // // //                     background: 'linear-gradient(180deg, rgba(219, 219, 219, 0.40) 0%, rgba(219, 219, 219, 0.80) 100%)',
// // // //                   }}
// // // //                 >
// // // //                   <Image src="/socials/X.svg" alt="X" width={32} height={32} className="text-[#384a9d]" />
// // // //                 </Link>
// // // //               </div>
// // // //               {/* 2) GitHub - 88px */}
// // // //               <div className="relative flex flex-col items-center">
// // // //                 <Link
// // // //                   href="https://github.com/iori73"
// // // //                   aria-label="GitHub"
// // // //                   target="_blank"
// // // //                   rel="noreferrer"
// // // //                   className="absolute top-[-44px] z-10 flex h-[88px] w-[88px] items-center justify-center rounded-full"
// // // //                   style={{
// // // //                     background: 'linear-gradient(180deg, rgba(219, 219, 219, 0.40) 0%, rgba(219, 219, 219, 0.80) 100%)',
// // // //                   }}
// // // //                 >
// // // //                   <Image src="/socials/GitHub.svg" alt="GitHub" width={32} height={32} className="text-[#384a9d]" />
// // // //                 </Link>
// // // //               </div>
// // // //               {/* 3) LinkedIn - 104px */}
// // // //               <div className="relative flex flex-col items-center">
// // // //                 <Link
// // // //                   href="https://www.linkedin.com/in/iori-kawano-131a4122a/"
// // // //                   aria-label="LinkedIn"
// // // //                   target="_blank"
// // // //                   rel="noreferrer"
// // // //                   className="absolute top-[-52px] z-10 flex h-[104px] w-[104px] items-center justify-center rounded-full"
// // // //                   style={{
// // // //                     background: 'linear-gradient(180deg, rgba(219, 219, 219, 0.40) 0%, rgba(219, 219, 219, 0.80) 100%)',
// // // //                   }}
// // // //                 >
// // // //                   <Image src="/socials/LinkedIn.svg" alt="LinkedIn" width={40} height={32} className="text-[#384a9d]" />
// // // //                 </Link>
// // // //               </div>
// // // //               {/* 4) Note - 120px */}
// // // //               <div className="relative flex flex-col items-center">
// // // //                 <Link
// // // //                   href="https://note.com/io_73"
// // // //                   aria-label="note"
// // // //                   target="_blank"
// // // //                   rel="noreferrer"
// // // //                   className="absolute top-[-60px] z-10 flex h-[120px] w-[120px] items-center justify-center rounded-full"
// // // //                   style={{
// // // //                     background: 'linear-gradient(180deg, rgba(219, 219, 219, 0.40) 0%, rgba(219, 219, 219, 0.80) 100%)',
// // // //                   }}
// // // //                 >
// // // //                   <Image src="/socials/note.svg" alt="note" width={40} height={32} className="text-[#384a9d]" />{' '}
// // // //                 </Link>
// // // //               </div>
// // // //               {/* 5) Behance - 72px */}
// // // //               <div className="relative flex flex-col items-center">
// // // //                 <Link
// // // //                   href="https://www.behance.net/835e5127"
// // // //                   aria-label="Behance"
// // // //                   target="_blank"
// // // //                   rel="noreferrer"
// // // //                   className="absolute top-[-36px] z-10 flex h-[72px] w-[72px] items-center justify-center rounded-full"
// // // //                   style={{
// // // //                     background: 'linear-gradient(180deg, rgba(219, 219, 219, 0.40) 0%, rgba(219, 219, 219, 0.80) 100%)',
// // // //                   }}
// // // //                 >
// // // //                   <Image src="/socials/Behance.svg" alt="Behance" width={40} height={32} className="text-[#384a9d]" />
// // // //                 </Link>
// // // //               </div>

// // // //               {/* Medium - 80px */}
// // // //               <div className="relative flex flex-col items-center">
// // // //                 <Link
// // // //                   href="https://medium.com/@iori730002204294"
// // // //                   aria-label="Medium"
// // // //                   target="_blank"
// // // //                   rel="noreferrer"
// // // //                   className="absolute top-[-40px] z-10 flex h-[80px] w-[80px] items-center justify-center rounded-full"
// // // //                   style={{
// // // //                     background: 'linear-gradient(180deg, rgba(219, 219, 219, 0.40) 0%, rgba(219, 219, 219, 0.80) 100%)',
// // // //                   }}
// // // //                 >
// // // //                   <Image
// // // //                     src="/socials/Medium-Icon-Black.svg"
// // // //                     alt="Medium"
// // // //                     width={40}
// // // //                     height={32}
// // // //                     className="text-[#384a9d]"
// // // //                   />
// // // //                 </Link>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         {/* Copyright */}
// // // //         <div className="text-body-m-140 md:text-body-l-140 text-center mt-8 pt-8">@ 2025 Iori Kawano</div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // "use client";

// // // import Link from "next/link";
// // // import Image from "next/image";

// // // export default function Home() {
// // //   return (
// // //     <div className="relative flex flex-col items-center p-4 pb-16 bg-[#F2F2F2]">
// // //       {/* "frequency" は md以上で左端に縦書き表示し、モバイルでは隠す */}
// // //       <div className="absolute hidden md:flex top-1/2 left-8 -translate-y-1/2 flex-col items-center">
// // //         <div
// // //           className="w-6 h-6 rounded-full"
// // //           style={{
// // //             background:
// // //               "linear-gradient(180deg, rgba(219, 219, 219, 0.40) 0%, rgba(219, 219, 219, 0.80) 100%)",
// // //           }}
// // //         />
// // //         <span
// // //           className="font-mono mt-2"
// // //           style={{
// // //             writingMode: "vertical-rl",
// // //             textOrientation: "mixed",
// // //           }}
// // //         >
// // //           frequency
// // //         </span>
// // //       </div>

// // //       <div className="w-full max-w-3xl">
// // //         <div className="relative mb-12">
// // //           {/* 横線は md以上のみ表示 */}
// // //           <div className="hidden md:block absolute left-0 right-0 top-16 h-px bg-[#dbdbdb] z-0" />

// // //           {/* アイコンをラップさせるため flex-wrap */}
// // //           <div className="relative mt-8 mx-auto flex flex-wrap items-center justify-center gap-8">
// // //             {/* 1) X (Twitter) - 128px */}
// // //             <Link
// // //               href="https://twitter.com/iori73wsy"
// // //               aria-label="Twitter/X"
// // //               target="_blank"
// // //               rel="noreferrer"
// // //               className="flex-none flex items-center justify-center rounded-full"
// // //               style={{
// // //                 width: 128,
// // //                 height: 128,
// // //                 background:
// // //                   "linear-gradient(180deg, rgba(219, 219, 219, 0.40) 0%, rgba(219, 219, 219, 0.80) 100%)",
// // //               }}
// // //             >
// // //               <Image src="/socials/X.svg" alt="X" width={56} height={56} />
// // //             </Link>

// // //             {/* 2) GitHub - 88px */}
// // //             <Link
// // //               href="https://github.com/iori73"
// // //               aria-label="GitHub"
// // //               target="_blank"
// // //               rel="noreferrer"
// // //               className="flex-none flex items-center justify-center rounded-full"
// // //               style={{
// // //                 width: 88,
// // //                 height: 88,
// // //                 background:
// // //                   "linear-gradient(180deg, rgba(219, 219, 219, 0.40) 0%, rgba(219, 219, 219, 0.80) 100%)",
// // //               }}
// // //             >
// // //               <Image src="/socials/GitHub.svg" alt="GitHub" width={40} height={40} />
// // //             </Link>

// // //             {/* 3) LinkedIn - 104px */}
// // //             <Link
// // //               href="https://www.linkedin.com/in/iori-kawano-131a4122a/"
// // //               aria-label="LinkedIn"
// // //               target="_blank"
// // //               rel="noreferrer"
// // //               className="flex-none flex items-center justify-center rounded-full"
// // //               style={{
// // //                 width: 104,
// // //                 height: 104,
// // //                 background:
// // //                   "linear-gradient(180deg, rgba(219, 219, 219, 0.40) 0%, rgba(219, 219, 219, 0.80) 100%)",
// // //               }}
// // //             >
// // //               <Image src="/socials/LinkedIn.svg" alt="LinkedIn" width={48} height={48} />
// // //             </Link>

// // //             {/* 4) Note - 120px */}
// // //             <Link
// // //               href="https://note.com/io_73"
// // //               aria-label="note"
// // //               target="_blank"
// // //               rel="noreferrer"
// // //               className="flex-none flex items-center justify-center rounded-full"
// // //               style={{
// // //                 width: 120,
// // //                 height: 120,
// // //                 background:
// // //                   "linear-gradient(180deg, rgba(219, 219, 219, 0.40) 0%, rgba(219, 219, 219, 0.80) 100%)",
// // //               }}
// // //             >
// // //               <Image src="/socials/note.svg" alt="note" width={48} height={48} />
// // //             </Link>

// // //             {/* 5) Behance - 72px */}
// // //             <Link
// // //               href="https://www.behance.net/835e5127"
// // //               aria-label="Behance"
// // //               target="_blank"
// // //               rel="noreferrer"
// // //               className="flex-none flex items-center justify-center rounded-full"
// // //               style={{
// // //                 width: 72,
// // //                 height: 72,
// // //                 background:
// // //                   "linear-gradient(180deg, rgba(219, 219, 219, 0.40) 0%, rgba(219, 219, 219, 0.80) 100%)",
// // //               }}
// // //             >
// // //               <Image src="/socials/Behance.svg" alt="Behance" width={32} height={32} />
// // //             </Link>

// // //             {/* 6) Medium - 80px */}
// // //             <Link
// // //               href="https://medium.com/@iori730002204294"
// // //               aria-label="Medium"
// // //               target="_blank"
// // //               rel="noreferrer"
// // //               className="flex-none flex items-center justify-center rounded-full"
// // //               style={{
// // //                 width: 80,
// // //                 height: 80,
// // //                 background:
// // //                   "linear-gradient(180deg, rgba(219, 219, 219, 0.40) 0%, rgba(219, 219, 219, 0.80) 100%)",
// // //               }}
// // //             >
// // //               <Image src="/socials/Medium-Icon-Black.svg" alt="Medium" width={32} height={32} />
// // //             </Link>
// // //           </div>
// // //         </div>

// // //         {/* Copyright */}
// // //         <div className="text-center text-body-m-140 md:text-body-l-140 mt-4">@ 2025 Iori Kawano</div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // // /src/compositions/Footer.tsx
// // 'use client';

// // import Link from 'next/link';
// // import Image from 'next/image';

// // export default function Footer() {
// //   return (
// //     <div className="relative flex flex-col items-center py-16 md:pb-16 bg-[#F7F7F7]">
// //       <div className="w-full max-w-3xl">
// //         <div className="flex flex-col items-center gap-4 justify-center md:flex-row">
// //           {/* Frequency legend (desktop only, vertical) */}
// //           <div
// //             className="
// //               hidden       /* モバイルでは非表示 */
// //               md:flex      /* md以上でflex表示 */
// //               flex-col
// //               items-center
// //               gap-2

// //               top-1/2
// //               left-80

// //             "
// //           >
// //             {/* 丸いアイコン */}
// //             <div
// //               className="w-6 h-6 rounded-full"
// //               style={{
// //                 background: 'linear-gradient(180deg, rgba(219, 219, 219, 0.40) 0%, rgba(219, 219, 219, 0.80) 100%)',
// //               }}
// //             />
// //             {/* 縦書きのテキスト */}
// //             <span
// //               className="font-mono"
// //               style={{
// //                 writingMode: 'vertical-rl',
// //                 textOrientation: 'mixed',
// //                 transform: 'rotate(0deg)', // 必要に応じて調整
// //               }}
// //             >
// //               frequency
// //             </span>
// //           </div>
// //           {/* Frequency legend (mobile only, horizontal) */}
// //           <div
// //             className="
// //               flex        /* モバイルではflex表示 */
// //               md:hidden   /* md以上で非表示 */
// //               w-full
// //               flex-row
// //               items-center
// //               justify-center
// //               gap-2
// //             "
// //           >
// //             {/* 丸いアイコン */}
// //             <div
// //               className="w-6 h-6 rounded-full"
// //               style={{
// //                 background: 'linear-gradient(180deg, rgba(219, 219, 219, 0.40) 0%, rgba(219, 219, 219, 0.80) 100%)',
// //               }}
// //             />
// //             {/* 横書きのテキスト */}
// //             <span className="font-mono">frequency</span>
// //           </div>

// //           {/* アイコンをラップさせるため flex-wrap */}
// //           <div className="relative md: mx-auto flex flex-wrap items-center justify-center gap-4">
// //             {/* X (Twitter) */}
// //             <Link
// //               href="https://twitter.com/iori73wsy"
// //               aria-label="Twitter/X"
// //               target="_blank"
// //               rel="noreferrer"
// //               // className="flex-none flex items-center justify-center rounded-full"
// //               // style={{
// //               //   background:
// //               //     "linear-gradient(180deg, rgba(219, 219, 219, 0.40) 0%, rgba(219, 219, 219, 0.80) 100%)",
// //               //   width: 128,
// //               //   height: 128,
// //               // }}
// //               className="flex-none flex items-center justify-center rounded-full
// //               w-[112px] h-[112px] md:w-[128px] md:h-[128px]"
// //               style={{
// //                 background: 'linear-gradient(180deg, rgba(219, 219, 219, 0.40) 0%, rgba(219, 219, 219, 0.80) 100%)',

// //               }}
// //             >
// //               {/* モバイル用: w=40/h=40 */}
// //               <Image src="/socials/X.svg" alt="X" width={32} height={32} className="block md:hidden" />
// //               {/* デスクトップ用: w=56/h=56 */}
// //               <Image src="/socials/X.svg" alt="X" width={40} height={40} className="hidden md:block" />
// //             </Link>

// //             {/* GitHub */}
// //             <Link
// //               href="https://github.com/iori73"
// //               aria-label="GitHub"
// //               target="_blank"
// //               rel="noreferrer"
// //               className="flex-none flex items-center justify-center rounded-full w-[72px] h-[72px] md:w-[88px] md:h-[88px]"
// //               style={{
// //                 background: 'linear-gradient(180deg, rgba(219,219,219,0.40) 0%, rgba(219,219,219,0.80) 100%)',
// //               }}
// //             >
// //               <Image src="/socials/GitHub.svg" alt="GitHub" width={32} height={32} className="block md:hidden" />
// //               <Image src="/socials/GitHub.svg" alt="GitHub" width={40} height={40} className="hidden md:block" />
// //             </Link>

// //             {/* LinkedIn */}
// //             <Link
// //               href="https://www.linkedin.com/in/iori-kawano-131a4122a/"
// //               aria-label="LinkedIn"
// //               target="_blank"
// //               rel="noreferrer"
// //               className="flex-none flex items-center justify-center rounded-full w-[88px] h-[88px] md:w-[104px] md:h-[104px]"
// //               style={{
// //                 background: 'linear-gradient(180deg, rgba(219,219,219,0.40) 0%, rgba(219,219,219,0.80) 100%)',
// //               }}
// //             >
// //               <Image src="/socials/LinkedIn.svg" alt="LinkedIn" width={32} height={32} className="block md:hidden" />
// //               <Image src="/socials/LinkedIn.svg" alt="LinkedIn" width={40} height={40} className="hidden md:block" />
// //             </Link>
// //             {/* Note */}
// //             <Link
// //               href="https://note.com/io_73"
// //               aria-label="note"
// //               target="_blank"
// //               rel="noreferrer"
// //               className="flex-none flex items-center justify-center rounded-full w-[104px] h-[104px] md:w-[120px] md:h-[120px]"
// //               style={{
// //                 background: 'linear-gradient(180deg, rgba(219,219,219,0.40) 0%, rgba(219,219,219,0.80) 100%)',
// //               }}
// //             >
// //               <Image src="/socials/note.svg" alt="note" width={32} height={32} className="block md:hidden" />
// //               <Image src="/socials/note.svg" alt="note" width={40} height={40} className="hidden md:block" />
// //             </Link>
// //             {/* Behance */}
// //             <Link
// //               href="https://www.behance.net/835e5127"
// //               aria-label="Behance"
// //               target="_blank"
// //               rel="noreferrer"
// //               className="flex-none flex items-center justify-center rounded-full w-[56px] h-[56px] md:w-[72px] md:h-[72px]"
// //               style={{
// //                 background: 'linear-gradient(180deg, rgba(219,219,219,0.40) 0%, rgba(219,219,219,0.80) 100%)',
// //               }}
// //             >
// //               <Image src="/socials/Behance.svg" alt="Behance" width={32} height={32} className="block md:hidden" />
// //               <Image src="/socials/Behance.svg" alt="Behance" width={40} height={40} className="hidden md:block" />
// //             </Link>
// //             {/* Medium */}
// //             <Link
// //               href="https://medium.com/@iori730002204294"
// //               aria-label="Medium"
// //               target="_blank"
// //               rel="noreferrer"
// //               className="flex-none flex items-center justify-center rounded-full w-[64px] h-[64px] md:w-[80px] md:h-[80px]"
// //               style={{
// //                 background: 'linear-gradient(180deg, rgba(219,219,219,0.40) 0%, rgba(219,219,219,0.80) 100%)',
// //               }}
// //             >
// //               <Image
// //                 src="/socials/Medium-Icon-Black.svg"
// //                 alt="Medium"
// //                 width={32}
// //                 height={32}
// //                 className="block md:hidden"
// //               />
// //               <Image
// //                 src="/socials/Medium-Icon-Black.svg"
// //                 alt="Medium"
// //                 width={40}
// //                 height={40}
// //                 className="hidden md:block"
// //               />
// //             </Link>
// //           </div>

// //         </div>

// //         {/* Copyright */}
// //         <div className="text-center text-body-m-140 md:text-body-l-140 mt-8">@ 2025 Iori Kawano</div>
// //       </div>
// //     </div>
// //   );
// // }

// // ok
// "use client";

// import Link from "next/link";
// import Image from "next/image";

// export default function Footer() {
//   return (
//     <div
//       className="relative flex flex-col items-center py-16 md:pb-16"
//     >
//       <div className="w-full max-w-3xl">
//         <div className="flex flex-col items-center gap-4 justify-center md:flex-row">
//           {/* Frequency legend (desktop only, vertical) */}
//           <div className="hidden md:flex flex-col items-center gap-2 top-1/2 left-80">
//             <div
//               className="w-6 h-6 rounded-full"
//               style={{
//                 background:
//                   "linear-gradient(180deg, rgba(219, 219, 219, 0.20) 0%, rgba(219, 219, 219, 0.80) 100%)",
//               }}
//             />
//             <span
//               className="font-mono"
//               style={{
//                 writingMode: "vertical-rl",
//                 textOrientation: "mixed",
//               }}
//             >
//               frequency
//             </span>
//           </div>

//           {/* Frequency legend (mobile only, horizontal) */}
//           <div className="flex md:hidden w-full flex-row items-center justify-center gap-2">
//             <div
//               className="w-6 h-6 rounded-full"
//               style={{
//                 background:
//                   "linear-gradient(180deg, rgba(219, 219, 219, 0.20) 0%, rgba(219, 219, 219, 0.80) 100%)",
//               }}
//             />
//             <span className="font-mono">frequency</span>
//           </div>

//           {/* Icon list */}
//           <div className="relative md:mx-auto flex flex-wrap items-center justify-center gap-4">
//             {/* X (Twitter) */}
//             <Link
//               href="https://twitter.com/iori73wsy"
//               aria-label="Twitter/X"
//               target="_blank"
//               rel="noreferrer"
//               className="flex-none flex items-center justify-center rounded-full
//                          w-[112px] h-[112px] md:w-[128px] md:h-[128px]"
//               style={{
//                 background:
//                   "linear-gradient(180deg, rgba(219, 219, 219, 0.20) 0%, rgba(219, 219, 219, 0.80) 100%)",
//               }}
//             >
//               <Image
//                 src="/socials/X.svg"
//                 alt="X"
//                 width={32}
//                 height={32}
//                 className="block md:hidden"
//               />
//               <Image
//                 src="/socials/X.svg"
//                 alt="X"
//                 width={40}
//                 height={40}
//                 className="hidden md:block"
//               />
//             </Link>

//             {/* GitHub */}
//             <Link
//               href="https://github.com/iori73"
//               aria-label="GitHub"
//               target="_blank"
//               rel="noreferrer"
//               className="flex-none flex items-center justify-center rounded-full
//                          w-[72px] h-[72px] md:w-[88px] md:h-[88px]"
//               style={{
//                 background:
//                   "linear-gradient(180deg, rgba(219, 219, 219, 0.20) 0%, rgba(219,219,219,0.80) 100%)",
//               }}
//             >
//               <Image
//                 src="/socials/GitHub.svg"
//                 alt="GitHub"
//                 width={32}
//                 height={32}
//                 className="block md:hidden"
//               />
//               <Image
//                 src="/socials/GitHub.svg"
//                 alt="GitHub"
//                 width={40}
//                 height={40}
//                 className="hidden md:block"
//               />
//             </Link>

//             {/* LinkedIn */}
//             <Link
//               href="https://www.linkedin.com/in/iori-kawano-131a4122a/"
//               aria-label="LinkedIn"
//               target="_blank"
//               rel="noreferrer"
//               className="flex-none flex items-center justify-center rounded-full
//                          w-[88px] h-[88px] md:w-[104px] md:h-[104px]"
//               style={{
//                 background:
//                   "linear-gradient(180deg, rgba(219, 219, 219, 0.20) 0%, rgba(219,219,219,0.80) 100%)",
//               }}
//             >
//               <Image
//                 src="/socials/LinkedIn.svg"
//                 alt="LinkedIn"
//                 width={32}
//                 height={32}
//                 className="block md:hidden"
//               />
//               <Image
//                 src="/socials/LinkedIn.svg"
//                 alt="LinkedIn"
//                 width={40}
//                 height={40}
//                 className="hidden md:block"
//               />
//             </Link>

//             {/* Note */}
//             <Link
//               href="https://note.com/io_73"
//               aria-label="note"
//               target="_blank"
//               rel="noreferrer"
//               className="flex-none flex items-center justify-center rounded-full
//                          w-[104px] h-[104px] md:w-[120px] md:h-[120px]"
//               style={{
//                 background:
//                   "linear-gradient(180deg, rgba(219, 219, 219, 0.20) 0%, rgba(219,219,219,0.80) 100%)",
//               }}
//             >
//               <Image
//                 src="/socials/note.svg"
//                 alt="note"
//                 width={32}
//                 height={32}
//                 className="block md:hidden"
//               />
//               <Image
//                 src="/socials/note.svg"
//                 alt="note"
//                 width={40}
//                 height={40}
//                 className="hidden md:block"
//               />
//             </Link>

//             {/* Behance */}
//             <Link
//               href="https://www.behance.net/835e5127"
//               aria-label="Behance"
//               target="_blank"
//               rel="noreferrer"
//               className="flex-none flex items-center justify-center rounded-full
//                          w-[56px] h-[56px] md:w-[72px] md:h-[72px]"
//               style={{
//                 background:
//                   "linear-gradient(180deg, rgba(219, 219, 219, 0.20) 0%, rgba(219,219,219,0.80) 100%)",
//               }}
//             >
//               <Image
//                 src="/socials/Behance.svg"
//                 alt="Behance"
//                 width={32}
//                 height={32}
//                 className="block md:hidden"
//               />
//               <Image
//                 src="/socials/Behance.svg"
//                 alt="Behance"
//                 width={40}
//                 height={40}
//                 className="hidden md:block"
//               />
//             </Link>

//             {/* Medium */}
//             <Link
//               href="https://medium.com/@iori730002204294"
//               aria-label="Medium"
//               target="_blank"
//               rel="noreferrer"
//               className="flex-none flex items-center justify-center rounded-full
//                          w-[64px] h-[64px] md:w-[80px] md:h-[80px]"
//               style={{
//                 background:
//                   "linear-gradient(180deg, rgba(219, 219, 219, 0.20) 20%, rgba(219,219,219,0.80) 100%)",
//               }}
//             >
//               <Image
//                 src="/socials/Medium-Icon-Black.svg"
//                 alt="Medium"
//                 width={32}
//                 height={32}
//                 className="block md:hidden"
//               />
//               <Image
//                 src="/socials/Medium-Icon-Black.svg"
//                 alt="Medium"
//                 width={40}
//                 height={40}
//                 className="hidden md:block"
//               />
//             </Link>
//           </div>
//         </div>

//         {/* Copyright */}
//         <div className="text-center text-body-m-140 md:text-body-l-140 mt-8">
//           @ 2025 Iori Kawano
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function Footer() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // // Create blue to white gradient background
    // const gradient = ctx.createLinearGradient(0, 0, 0, height);
    // gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    // gradient.addColorStop(0.4, 'rgba(230, 242, 255, 1)');
    // gradient.addColorStop(0.7, 'rgba(184, 217, 255, 1)');
    // gradient.addColorStop(1, 'rgba(75, 139, 190, 1)');
    // Gradient reflecting blue neck radish colors:

    // 画面幅によって MD / SP を切り替える
    if (window.innerWidth < 768) {
      // SP 用のグラデーション
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0.01, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.1, 'rgba(249, 250, 235, .4)');
      gradient.addColorStop(0.4, 'rgba(214, 228, 174, .6)');
      gradient.addColorStop(1, 'rgba(125, 181, 118, .6)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    } else {
      // MD 用のグラデーション
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0.1, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(249, 250, 235, .4)');
      gradient.addColorStop(0.5, 'rgba(214, 228, 174, .6)');
      gradient.addColorStop(1, 'rgba(125, 181, 118, .6)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }

    // Add grain effect
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      // Add variations to each pixel
      const grainAmount = Math.random() * 20 - 10; // Random value between -10 and 10

      // Apply grain variation to RGB channels
      data[i] = Math.min(255, Math.max(0, data[i] + grainAmount));
      data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + grainAmount));
      data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + grainAmount));

      // // Every 20th pixel, add more dramatic noise to simulate woodblock print texture
      // if (i % 320 === 0) {
      //   const textureVariation = Math.random() * 30 - 15;
      //   data[i] = Math.min(255, Math.max(0, data[i] + textureVariation));
      //   data[i+1] = Math.min(255, Math.max(0, data[i+1] + textureVariation));
      //   data[i+2] = Math.min(255, Math.max(0, data[i+2] + textureVariation));
      // }
    }

    ctx.putImageData(imageData, 0, 0);

    // // Add subtle horizontal brush stroke lines to mimic woodblock printing
    // ctx.globalAlpha = 0.05;
    // for (let y = 0; y < height; y += 15) {
    //   ctx.beginPath();
    //   ctx.moveTo(0, y);

    //   // Create wavy line to simulate brush stroke
    //   for (let x = 0; x < width; x += 10) {
    //     const variance = Math.random() * 2;
    //     ctx.lineTo(x, y + variance);
    //   }

    //   ctx.strokeStyle = 'rgba(0, 0, 80, 0.4)';
    //   ctx.lineWidth = 1.5;
    //   ctx.stroke();
    // }
  }, []);

  return (
    <div className="relative flex flex-col items-center py-16 md:pb-16">
      {/* Canvas background */}
      <canvas ref={canvasRef} width="1200" height="600" className="absolute inset-0 w-full h-full object-cover z-0" />

      <div className="w-full max-w-3xl relative z-10">
        <div className="flex flex-col items-center gap-4 justify-center flex-column">
          {/* Frequency legend (desktop only, vertical) */}
          <div className="hidden md:flex flex-col items-center gap-2 top-1/2 left-80">
            {/* <div
              className="w-6 h-6 rounded-full"
              style={{
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.20) 100%)',
                backdropFilter: 'blur(4px)',
              }}
            /> */}
            <span
              className="font-mono text-caption-s-120"
              style={{
                // writingMode: 'vertical-rl',
                textOrientation: 'mixed',
              }}
            >
              The size of each circle represents its frequency
            </span>
          </div>
          {/* Frequency legend (mobile only, horizontal) */}
          <div className="flex md:hidden w-full flex-column items-center justify-center gap-2">
            {/* <div
              className="w-6 h-6 rounded-full"
              style={{
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.20) 100%)',
                backdropFilter: 'blur(4px)',
              }}
            /> */}
            <span className="font-mono text-caption-xs-120 text-center">
              The size of each circle
              <br /> represents its frequency
            </span>
          </div>

          {/* Icon list */}
          <div className="relative md:mx-auto flex flex-wrap items-center justify-center gap-4">
            {/* X (Twitter) */}
            <Link
              href="https://twitter.com/iori73wsy"
              aria-label="Twitter/X"
              target="_blank"
              rel="noreferrer"
              className="flex-none flex items-center justify-center rounded-full
                         w-[112px] h-[112px] md:w-[128px] md:h-[128px]"
              style={{
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.0) 100%)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Image src="/socials/X.svg" alt="X" width={32} height={32} className="block md:hidden" />
              <Image src="/socials/X.svg" alt="X" width={40} height={40} className="hidden md:block" />
            </Link>

            {/* GitHub */}
            <Link
              href="https://github.com/iori73"
              aria-label="GitHub"
              target="_blank"
              rel="noreferrer"
              className="flex-none flex items-center justify-center rounded-full
                         w-[72px] h-[72px] md:w-[88px] md:h-[88px]"
              style={{
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.0) 100%)',
                backdropFilter: 'blur(4px)',
              }}
            >
              <Image src="/socials/GitHub.svg" alt="GitHub" width={32} height={32} className="block md:hidden" />
              <Image src="/socials/GitHub.svg" alt="GitHub" width={40} height={40} className="hidden md:block" />
            </Link>

            {/* LinkedIn */}
            <Link
              href="https://www.linkedin.com/in/iori-kawano-131a4122a/"
              aria-label="LinkedIn"
              target="_blank"
              rel="noreferrer"
              className="flex-none flex items-center justify-center rounded-full
                         w-[88px] h-[88px] md:w-[104px] md:h-[104px]"
              style={{
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.0) 100%)',
                backdropFilter: 'blur(4px)',
              }}
            >
              <Image src="/socials/LinkedIn.svg" alt="LinkedIn" width={32} height={32} className="block md:hidden" />
              <Image src="/socials/LinkedIn.svg" alt="LinkedIn" width={40} height={40} className="hidden md:block" />
            </Link>

            {/* Note */}
            <Link
              href="https://note.com/io_73"
              aria-label="note"
              target="_blank"
              rel="noreferrer"
              className="flex-none flex items-center justify-center rounded-full
                         w-[104px] h-[104px] md:w-[120px] md:h-[120px]"
              style={{
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.0) 100%)',
                backdropFilter: 'blur(4px)',
              }}
            >
              <Image src="/socials/note.svg" alt="note" width={32} height={32} className="block md:hidden" />
              <Image src="/socials/note.svg" alt="note" width={40} height={40} className="hidden md:block" />
            </Link>

            {/* Behance */}
            <Link
              href="https://www.behance.net/835e5127"
              aria-label="Behance"
              target="_blank"
              rel="noreferrer"
              className="flex-none flex items-center justify-center rounded-full
                         w-[56px] h-[56px] md:w-[72px] md:h-[72px]"
              style={{
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.0) 100%)',
                backdropFilter: 'blur(4px)',
              }}
            >
              <Image src="/socials/Behance.svg" alt="Behance" width={32} height={32} className="block md:hidden" />
              <Image src="/socials/Behance.svg" alt="Behance" width={40} height={40} className="hidden md:block" />
            </Link>

            {/* Medium */}
            <Link
              href="https://medium.com/@iori730002204294"
              aria-label="Medium"
              target="_blank"
              rel="noreferrer"
              className="flex-none flex items-center justify-center rounded-full
                         w-[64px] h-[64px] md:w-[80px] md:h-[80px]"
              style={{
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.0) 100%)',
                backdropFilter: 'blur(4px)',
              }}
            >
              <Image
                src="/socials/Medium-Icon-Black.svg"
                alt="Medium"
                width={32}
                height={32}
                className="block md:hidden"
              />
              <Image
                src="/socials/Medium-Icon-Black.svg"
                alt="Medium"
                width={40}
                height={40}
                className="hidden md:block"
              />
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-body-m-140 md:text-body-l-140 mt-8 md:mt-8">@ 2025 Iori Kawano</div>
      </div>
    </div>
  );
}
