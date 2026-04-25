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
      en: 'Designer who thinks in systems and ships in code. Sociology background turned professional asset: I read group behavior and organizational dynamics the way others read user flows. At YUMEMI and Accenture Song, I have worked across a 9-platform airline design system (with 12 custom Figma plugins), smart home IoT interfaces, a university alumni donation app built on 118-person research, and a talent management platform for an automotive company.',
      jp: '社会学を学び、システムで考え、コードで実装するデザイナー。集団行動と組織のダイナミクスを読む力が、ユーザー行動の分析と組織への定着設計に直結しています。ゆめみとアクセンチュア・ソングで、大手航空会社の9プラットフォームにわたるデザインシステム（カスタムFigmaプラグイン12本含む）、スマートホームIoTインターフェース、118名のリサーチに基づく大学OB・OG向け寄付アプリ、大手自動車会社のタレント管理プラットフォームを担当。',
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
          'Design systems for a major airline (9 platforms), smart home UI for a consumer electronics leader, a university alumni donation app, and a talent management system for an automotive company.',
          '[Airline] Continued and shipped the design system spanning 9 digital platforms. Owned full delivery from token system to component library.',
          '[Consumer Electronics] Continued smart home voice notification UI. Shipped responsive text system and loader animations.',
          '[University] Led Figma prototype design for a university alumni donation app. Coordinated across 4 organizations; designed a non-coercive donation UX based on 118-person survey insights.',
          '[Automotive] UI design for a talent management and learning system. First Japanese designer on a multinational team.',
        ],
        jp: [
          '大手航空会社向けデザインシステム（9プラットフォーム）、大手電機メーカーのスマートホームUI、大学OB・OG向け寄付アプリ、大手自動車会社のタレントシステム。',
          '[航空] 9つのデジタルプラットフォームにわたるデザインシステムを継続・納品。トークンシステムからコンポーネントライブラリまで一貫して担当。',
          '[大手電機] スマートホーム音声通知UIを継続。レスポンシブテキストシステムとローダーアニメーションを納品。',
          '[大学] 大学OB・OG向け寄付アプリのFigmaプロトタイプ設計を主導。4組織を調整し、118名のアンケートに基づく非強制的な寄付UXを設計。',
          '[自動車] タレントマネジメント・学習システムのUI設計。多国籍チームに参加した初の日本人デザイナー。',
        ],
      },
      technologies: ['Figma', 'TypeScript', 'Next.js', 'React', 'Tailwind CSS'],
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
          '[Construction Tech] Led full UI renewal of a cloud-based video learning platform for the residential construction industry. Applied OOUI methodology to redesign 11+ screens with Duolingo-inspired gamification. Delivered wireframes in 15 business days through 3 client review sessions.',
          '[Consumer Electronics] Designed smart home voice push notification UI. Managed two parallel design tracks, built interactive HTML prototypes to validate a character-count-aware responsive text system, and created frame-perfect infinite-loop loader animations.',
          '[Airline] Architected a design system spanning 9 digital platforms. Built a two-layer token system (399 variables, 3 color modes, 3 typography modes) and developed 12 custom Figma plugins to automate token setup and migration.',
        ],
        jp: [
          '建築業界向け学習プラットフォームのUIリニューアルと、大手電機メーカーのスマートホーム音声通知UI。新卒最初の2案件。',
          '[建築テック] 住宅建築業界向け動画学習プラットフォームのUI全面リニューアルを主導。OOUI手法を習得し、Duolingo着想のゲーミフィケーションで11画面以上を再設計。15営業日でワイヤーフレームを完成、3回のクライアントレビューを経て納品。',
          '[大手電機] スマートホーム音声プッシュ通知のUI設計を担当。2つの並行デザイントラックを管理。文字数対応レスポンシブテキストシステムをHTMLプロトタイプで検証し、フレームパーフェクトな無限ループローダーアニメーションを制作。',
          '[航空] 9つのデジタルプラットフォームにわたるデザインシステムを設計。2層トークンシステム（399変数、3カラーモード、3タイポグラフィモード）を構築し、トークン設定・移行を自動化する12個のカスタムFigmaプラグインを開発。',
        ],
      },
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

