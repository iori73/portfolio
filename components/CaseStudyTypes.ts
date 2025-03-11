// // // /components/CaseStudyTypes.ts
// // export type SectionData = {
// //     id: string;
// //     heading: string;
// //     description?: string;
// //     images: string[]; // paths to images
// //   };
  
// //   export type CaseStudyData = {
// //     heroImage: string;
// //     projectTitle: string;
// //     tags: string[];
// //     projectDescription: string;
// //     infoGrid: {
// //       timeline: string;
// //       role: string;
// //       team: string;
// //       deliverables: string;
// //     };
// //     sections: SectionData[];
// //   };
  



// // /components/CaseStudyTypes.ts
// export type SectionData = {
//   id: string;
//   heading: string;
//   description?: string;
//   images: string[];
//   layoutType?: "default" | "splitImage";
//   bullets?: string[]; // SplitImageSection で使う場合など
// };

// export type CaseStudyData = {
//   heroImage: string;
//   projectTitle: string;
//   tags: string[];
//   projectDescription: string;
//   infoGrid: {
//     timeline: string;
//     role: string;
//     team: string;
//     deliverables: string;
//   };
//   sections: SectionData[];
// };


// /components/CaseStudyTypes.ts
export type SectionData = {
  id: string;                   // 一意なID（例: "overview"）
  heading: string;              // セクションの見出し（例: "Overview"）
  description?: string;         // セクション本文（任意）
  images: string[];             // 表示する画像パスの配列
  layoutType?: "default" | "splitImage";  // デフォルトレイアウトか分割レイアウトか
  bullets?: string[];           // 分割レイアウトなどで使う箇条書き（任意）
  // さらに必要なら、headingLevel: "h2" | "h3"、borderTop?: boolean など追加可能
};

export type CaseStudyData = {
  heroImage: string;            // ヒーロー画像のパス
  projectTitle: string;
  tags: string[];
  projectDescription: string;
  infoGrid: {
    timeline: string;
    role: string;
    team: string;
    deliverables: string;
  };
  sections: SectionData[];
};
