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
  description: { en: string[]; jp: string[] }; // 箇条書き [0]=summary, [1+]=project bullets
  projectPeriods?: { start: string; end: string | 'Present' }[]; // description[1+] に対応する期間
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

export const cvData: CVData = {
  personalInfo: {
    name: { en: 'Iori Kawano', jp: '川野 イオリ' },
    title: {
      en: 'UI/UX Designer',
      jp: 'UI/UXデザイナー',
    },
    location: { en: 'Tokyo, Japan', jp: '東京都' },
    email: 'iori730002204294@gmail.com',
    website: 'https://iori-kawano.vercel.app',
    summary: {
      en: 'Designer who thinks in systems and ships in code. Sociology background turned professional asset: I read group behavior and organizational dynamics the way others read user flows. At YUMEMI, I redesigned a learning platform for skilled trade workers and designed smart home IoT interfaces. At Accenture Song, I owned an airline design system across mobile and web (with 12 custom Figma plugins) and led the UI for a university alumni donation app.',
      jp: '社会学を学び、システムで考え、コードで実装するデザイナー。集団行動と組織のダイナミクスを読む力が、ユーザー行動の分析と組織への定着設計に直結しています。ゆめみでは職人向け学習プラットフォームのUIリニューアルとスマートホームIoTインターフェースを担当。アクセンチュア・ソングでは、大手航空会社のモバイル・Web横断デザインシステム（カスタムFigmaプラグイン12本）と大学OB・OG向け寄付アプリのUIを担当。',
    },
  },
  workExperience: [
    {
      id: 'work-accenture-song',
      company: {
        en: 'Accenture Song',
        jp: 'アクセンチュア・ソング',
      },
      position: {
        en: 'UI/UX Designer',
        jp: 'UI/UXデザイナー',
      },
      location: { en: 'Tokyo, Japan', jp: '東京都' },
      startDate: '2025-12',
      endDate: 'Present',
      description: {
        en: [
          'Design system for a major airline across mobile apps and web, and a university alumni donation app.',
          '[University] Led Figma prototype design for a university alumni donation app. Designed a non-coercive donation UX.',
          '[Airline] Owned the design system spanning mobile apps and web. Built a two-layer token architecture (399 variables, 3 color modes, 3 typography modes) and developed 12 custom Figma plugins to automate token setup and migration.',
        ],
        jp: [
          '大手航空会社向けデザインシステム（モバイルアプリ・Web）と、大学OB・OG向け寄付アプリ。',
          '[大学] 大学OB・OG向け寄付アプリのFigmaプロトタイプ設計を主導。非強制的な寄付UXを設計。',
          '[航空] モバイルアプリとWebにまたがるデザインシステムを担当。2層トークンアーキテクチャ（399変数、3カラーモード、3タイポグラフィモード）を構築し、トークン設定・移行を自動化する12個のカスタムFigmaプラグインを開発。',
        ],
      },
      projectPeriods: [
        { start: '2026-04', end: '2026-04' },
        { start: '2025-12', end: '2026-03' },
      ],
      technologies: ['Figma', 'TypeScript', 'Next.js', 'React', 'Tailwind CSS', 'shadcn/ui'],
    },
    {
      id: 'work-yumemi',
      company: {
        en: 'YUMEMI Inc.',
        jp: '株式会社ゆめみ',
      },
      position: {
        en: 'UI/UX Designer',
        jp: 'UI/UXデザイナー',
      },
      location: { en: 'Tokyo, Japan', jp: '東京都' },
      startDate: '2025-04',
      endDate: '2025-12',
      description: {
        en: [
          'Learning platform UI renewal for a construction tech company and smart home voice notification UI for a consumer electronics leader. First two projects out of university.',
          '[Consumer Electronics] Designed smart home voice push notification UI. Managed two parallel design tracks, built interactive HTML prototypes to validate a character-count-aware responsive text system, and created frame-perfect infinite-loop loader animations.',
          '[Construction Tech] Led full UI renewal of a cloud-based video learning platform for the residential construction industry. Applied OOUI methodology to redesign 11+ screens with Duolingo-inspired gamification. Delivered wireframes in 15 business days through 3 client review sessions.',
        ],
        jp: [
          '建築業界向け学習プラットフォームのUIリニューアルと、大手電機メーカーのスマートホーム音声通知UI。新卒最初の2案件。',
          '[大手電機] スマートホーム音声プッシュ通知のUI設計を担当。2つの並行デザイントラックを管理。文字数対応レスポンシブテキストシステムをHTMLプロトタイプで検証し、フレームパーフェクトな無限ループローダーアニメーションを制作。',
          '[建築テック] 住宅建築業界向け動画学習プラットフォームのUI全面リニューアルを主導。OOUI手法を習得し、Duolingo着想のゲーミフィケーションで11画面以上を再設計。15営業日でワイヤーフレームを完成、3回のクライアントレビューを経て納品。',
        ],
      },
      projectPeriods: [
        { start: '2025-07', end: '2025-12' },
        { start: '2025-04', end: '2025-08' },
      ],
      technologies: [
        'Figma',
        'TypeScript',
        'Next.js',
        'React',
        'Tailwind CSS',
        'shadcn/ui',
        'HTML/CSS',
        'Lottie',
        'Playwright',
        'Python',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      institution: {
        en: 'Aoyama Gakuin University',
        jp: '青山学院大学',
      },
      degree: { en: "Bachelor's Degree", jp: '学士' },
      field: {
        en: 'Global Studies and Collaboration, Sociology',
        jp: '地球社会共生学部 社会学',
      },
      startDate: '2021-04',
      endDate: '2025-03',
      description: {
        en: 'Studied social structures, group behavior, and research methodology. Independently pursued design through self-study and internships, transitioning from frontend development to UI/UX design.',
        jp: '社会構造、集団行動、リサーチ手法を学ぶ。在学中に独学とインターンを通じてフロントエンド開発からUI/UXデザインへ転身。',
      },
    },
  ],
  skills: [
    {
      category: { en: 'Design', jp: 'デザイン' },
      items: [
        'Figma',
        'Design Systems',
        'UI/UX Design',
        'User Research',
        'Information Architecture',
        'Interaction Design',
        'Material Design 3',
      ],
    },
    {
      category: { en: 'Development', jp: '開発' },
      items: [
        'TypeScript',
        'Next.js',
        'React',
        'Tailwind CSS',
        'shadcn/ui',
        'HTML/CSS/JavaScript',
        'Node.js',
        'Python',
      ],
    },
    {
      category: { en: 'Tools & Methods', jp: 'ツール & 手法' },
      items: [
        'Figma Plugin Development',
        'Tokens Studio',
        'Design Token Management',
        'Lottie Animation',
        'Git/GitHub',
        'Notion',
      ],
    },
  ],
  projects: [
    {
      id: 'project-ukiyoe',
      title: {
        en: 'Ukiyoe: Layer by Layer',
        jp: 'Ukiyoe: Layer by Layer',
      },
      description: {
        en: 'An interactive exploration of ukiyoe woodblock prints, deconstructing traditional art into its component layers for a modern digital experience.',
        jp: '浮世絵の木版画をレイヤーごとに分解し、伝統芸術をインタラクティブに探索するデジタル体験。',
      },
      period: { en: '2024', jp: '2024年' },
      technologies: ['Next.js', 'React', 'TypeScript'],
      link: '/work/ukiyoe',
    },
    {
      id: 'project-gym',
      title: {
        en: 'Gym Crowd Status Dashboard',
        jp: 'ジム混雑状況ダッシュボード',
      },
      description: {
        en: 'End-to-end system for real-time gym crowd monitoring: automated screenshot capture via Apple Shortcuts, OCR processing with GitHub Actions, and a live dashboard.',
        jp: 'Apple Shortcutsによる自動スクリーンショット取得からGitHub ActionsでのOCR処理、リアルタイムダッシュボードまで、ジム混雑状況をモニタリングするEnd-to-Endシステム。',
      },
      period: { en: '2024', jp: '2024年' },
      technologies: ['GitHub Actions', 'Apple Shortcuts', 'OCR'],
      link: '/work/gym_crowd_status_dashboard',
    },
    {
      id: 'project-google-ux',
      title: {
        en: 'Google UX Design Certificate Project',
        jp: 'Google UXデザイン認定プロジェクト',
      },
      description: {
        en: 'A mobile app design project completed as part of the Google UX Design Professional Certificate, focused on helping users navigate the best 100-yen shops in their neighborhood.',
        jp: 'Google UXデザインプロフェッショナル認定の一環として制作したモバイルアプリデザイン。近所のベスト100円ショップを探索するためのアプリ。',
      },
      period: { en: '2024', jp: '2024年' },
      technologies: ['Figma', 'User Research'],
      link: '/work/google_ux_design_certificate_project',
    },
    {
      id: 'project-figma-plugins',
      title: {
        en: 'Figma Plugins & Widgets',
        jp: 'Figmaプラグイン & ウィジェット',
      },
      description: {
        en: 'A collection of custom Figma plugins and widgets built to automate design workflows: token setup, component organization, and legacy migration tools.',
        jp: 'デザインワークフローを自動化するためのカスタムFigmaプラグイン & ウィジェット集。トークン設定、コンポーネント整理、レガシー移行ツールなど。',
      },
      period: { en: '2025 - 2026', jp: '2025年 - 2026年' },
      technologies: ['TypeScript', 'Figma API'],
      link: '/work/figma-plugins',
    },
  ],
};

