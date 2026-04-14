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
      en: 'Self-taught designer with a sociology background who thinks in systems and builds with code. I believe great design scales through tools, tokens, and shared language — not documentation alone. In my first year at YUMEMI, I have shipped design systems for a major airline, prototyped a donation app grounded in 118-person research, and designed IoT interfaces for a consumer electronics leader. My sociological training gives me a structural lens on both user behavior and organizational adoption.',
      jp: '社会学を学んだバックグラウンドを持つ独学デザイナー。システムで考え、コードでも形にします。優れたデザインはドキュメントだけでなく、ツール・トークン・共通言語によってスケールすると信じています。ゆめみでの1年目で、大手航空会社のデザインシステム構築、118名のリサーチに基づく寄付アプリのプロトタイプ、大手電機メーカーのIoTインターフェース設計を経験。社会学のバックグラウンドが、ユーザー行動と組織への定着の両面に構造的な視点をもたらしています。',
    },
  },
  workExperience: [
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
      endDate: 'Present',
      description: {
        en: [
          '[Construction Tech] First project as a new grad: led full UI renewal of a cloud-based video learning platform for the residential construction industry. Learned OOUI methodology under a senior mentor and applied it to redesign 11+ screens with Duolingo-inspired gamification. Delivered wireframes in 15 business days, iterated through 3 client review sessions.',
          '[Consumer Electronics] Designed smart home voice notification UI for a major electronics company, managing two parallel design tracks. Built interactive HTML prototypes to validate a character-count-aware responsive text system, and created frame-perfect infinite-loop loader animations.',
          '[Airline] Architected a design system spanning 9 digital platforms for a major airline. Built a two-layer token system (399 variables, 3 color modes, 3 typography modes), developed 12 custom Figma plugins to automate token setup and migration, and implemented a Next.js component prototype extending shadcn/ui.',
          '[University] Led Figma prototype design for a 670,000-alumni donation app, coordinating across 4 organizations (strategy, visual design, service design, UI/UX). Integrated 118-person survey insights — finding only 4% donate due to channel unawareness — to design a non-coercive donation UX.',
        ],
        jp: [
          '[建築テック] 新卒最初のプロジェクト: 住宅建築業界向けクラウド動画学習プラットフォームのUI全面リニューアルを主導。シニアメンターのもとOOUI手法を習得し、Duolingo着想のゲーミフィケーションで11画面以上を再設計。15営業日でワイヤーフレームを完成、3回のクライアントレビューを経て納品。',
          '[大手電機メーカー] スマートホーム音声プッシュ通知のUI設計を担当。2つの並行デザイントラックを管理。文字数対応レスポンシブテキストシステムをインタラクティブHTMLプロトタイプで検証し、フレームパーフェクトな無限ループローダーアニメーションを制作。',
          '[大手航空会社] 9つのデジタルプラットフォームを横断するデザインシステムを設計。2層トークンシステム（399変数、3カラーモード、3タイポグラフィモード）を構築し、トークン設定・移行を自動化する12個のカスタムFigmaプラグインを開発。shadcn/uiを拡張したNext.jsコンポーネントプロトタイプも実装。',
          '[大手大学] 67万人の校友を対象とした寄付アプリのFigmaプロトタイプ設計を主導。戦略・ビジュアルデザイン・サービスデザイン・UI/UXの4組織を調整。118名のアンケートから「寄付率4%、障壁は認知不足」を特定し、非強制的な寄付UXを設計。',
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
        en: 'End-to-end system for real-time gym crowd monitoring — from automated screenshot capture via Apple Shortcuts to OCR processing with GitHub Actions and a live dashboard.',
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
        en: 'A collection of custom Figma plugins and widgets built to automate design workflows — from token setup and component organization to legacy migration tools.',
        jp: 'デザインワークフローを自動化するためのカスタムFigmaプラグイン & ウィジェット集。トークン設定、コンポーネント整理、レガシー移行ツールなど。',
      },
      period: { en: '2025 - 2026', jp: '2025年 - 2026年' },
      technologies: ['TypeScript', 'Figma API'],
      link: '/work/figma-plugins',
    },
  ],
};

