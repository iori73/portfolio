// CVデータの型定義
export interface CVData {
  personalInfo: {
    name: { en: string; jp: string };
    title: { en: string; jp: string };
    location: { en: string; jp: string };
    email: string;
    website?: string;
    summary: { en: string; jp: string };
  };
  workExperience: WorkExperience[];
  education: Education[];
  skills: SkillCategory[];
  projects: Project[];
  certifications?: Certification[];
}

export interface WorkExperience {
  id: string;
  company: { en: string; jp: string };
  position: { en: string; jp: string };
  location: { en: string; jp: string };
  startDate: string; // "2024-01"
  endDate: string | 'Present'; // "2024-12" or "Present"
  description: { en: string[]; jp: string[] }; // 箇条書き
  technologies?: string[];
}

export interface Education {
  id: string;
  institution: { en: string; jp: string };
  degree: { en: string; jp: string };
  field: { en: string; jp: string };
  startDate: string;
  endDate: string | 'Present';
  description?: { en: string; jp: string };
}

export interface SkillCategory {
  category: { en: string; jp: string };
  items: string[];
}

export interface Project {
  id: string;
  title: { en: string; jp: string };
  description: { en: string; jp: string };
  period: { en: string; jp: string };
  technologies?: string[];
  link?: string;
}

export interface Certification {
  id: string;
  name: { en: string; jp: string };
  issuer: { en: string; jp: string };
  date: string;
  link?: string;
}

// 実際のデータ（Notion参考、適切なSVに編集）
export const cvData: CVData = {
  personalInfo: {
    name: { en: 'Iori Kawano', jp: '河野 伊織' },
    title: { en: 'Product Designer & Developer', jp: 'プロダクトデザイナー・開発者' },
    location: { en: 'Tokyo, Japan', jp: '東京都' },
    email: 'your-email@example.com',
    website: 'https://your-website.com',
    summary: {
      en: 'Brief professional summary. Add your professional background and key expertise here.',
      jp: 'プロフェッショナルな要約。あなたの専門的背景と主要な専門知識をここに追加してください。',
    },
  },
  workExperience: [
    {
      id: 'work-1',
      company: { en: 'Company Name', jp: '会社名' },
      position: { en: 'Position Title', jp: '役職名' },
      location: { en: 'Tokyo, Japan', jp: '東京都' },
      startDate: '2024-01',
      endDate: 'Present',
      description: {
        en: [
          'Key achievement or responsibility',
          'Another important point',
          'Impact or result',
        ],
        jp: ['主な成果や責任', '別の重要なポイント', '影響や結果'],
      },
      technologies: ['React', 'TypeScript', 'Figma'],
    },
    // 他の職歴を追加...
  ],
  education: [
    {
      id: 'edu-1',
      institution: { en: 'University Name', jp: '大学名' },
      degree: { en: "Bachelor's Degree", jp: '学士' },
      field: { en: 'Field of Study', jp: '専攻' },
      startDate: '2020-04',
      endDate: '2024-03',
    },
    // 他の学歴を追加...
  ],
  skills: [
    {
      category: { en: 'Design', jp: 'デザイン' },
      items: ['Figma', 'Adobe XD', 'User Research'],
    },
    {
      category: { en: 'Development', jp: '開発' },
      items: ['React', 'TypeScript', 'Next.js'],
    },
    // 他のスキルカテゴリを追加...
  ],
  projects: [
    {
      id: 'project-1',
      title: { en: 'Project Title', jp: 'プロジェクト名' },
      description: {
        en: 'Brief project description. Add details about the project here.',
        jp: 'プロジェクトの簡潔な説明。プロジェクトの詳細をここに追加してください。',
      },
      period: { en: '2024', jp: '2024年' },
      technologies: ['React', 'TypeScript'],
      link: 'https://project-link.com',
    },
    // 他のプロジェクトを追加...
  ],
};

