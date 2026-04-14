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
      en: 'Product Designer & Developer',
      jp: 'プロダクトデザイナー & デベロッパー',
    },
    location: { en: 'Tokyo, Japan', jp: '東京都' },
    email: 'iori730002204294@gmail.com',
    website: 'https://iori-kawano.vercel.app',
    summary: {
      en: 'Designer and developer bridging design systems, UI/UX design, and frontend implementation. At YUMEMI Inc., I have contributed to enterprise-scale design system architecture, mobile app prototyping, and IoT interface design for major clients across diverse industries. I combine strategic design thinking with hands-on development — from building custom Figma plugins and design token systems to implementing production-ready React components.',
      jp: 'デザインシステム構築、UI/UXデザイン、フロントエンド実装を横断するデザイナー兼デベロッパー。株式会社ゆめみにて、エンタープライズ規模のデザインシステム設計、モバイルアプリのプロトタイピング、IoTインターフェースデザインなど、多様な業界の大手クライアント向けプロジェクトに従事。カスタムFigmaプラグインやデザイントークンシステムの構築から、プロダクションレディなReactコンポーネントの実装まで、戦略的デザイン思考と実装力を兼ね備えています。',
    },
  },
  workExperience: [
    {
      id: 'work-waseda',
      company: {
        en: 'YUMEMI Inc. (Client: Major University via Consulting Firm)',
        jp: '株式会社ゆめみ（クライアント: 大手大学 / コンサルティングファーム経由）',
      },
      position: {
        en: 'UI/UX Designer (IxD)',
        jp: 'UI/UXデザイナー（IxD）',
      },
      location: { en: 'Tokyo, Japan', jp: '東京都' },
      startDate: '2026-04',
      endDate: '2026-04',
      description: {
        en: [
          'Led Figma prototype design for a donation mobile app targeting 670,000+ alumni as part of the university\'s 150th anniversary initiative',
          'Integrated insights from 118-person alumni survey into UX decisions, identifying that only 4% currently donate and the main barrier is lack of awareness of donation channels',
          'Conducted competitive analysis of 20+ apps across alumni platforms, donation services, gamification, and digital ID solutions',
          'Built a design system with 12-color semantic token palette and 176 variable bindings across 6 components',
          'Coordinated across a cross-functional team of 4 organizations: strategy, visual design, service design, and UI/UX',
        ],
        jp: [
          '大学創立150周年記念事業として、67万人以上の校友を対象とした寄付モバイルアプリのFigmaプロトタイプ設計を主導',
          '118名の校友アンケート結果をUX設計判断に統合。現在の寄付率はわずか4%で、最大の障壁は「寄付チャネルを知らない」ことを特定',
          'アルムナイプラットフォーム、寄付サービス、ゲーミフィケーション、デジタルIDソリューションなど20以上のアプリを競合分析',
          '12色のセマンティックトークンパレットと6コンポーネント・176変数バインディングのデザインシステムを構築',
          '戦略・ビジュアルデザイン・サービスデザイン・UI/UXの4組織にわたるクロスファンクショナルチームを調整',
        ],
      },
      technologies: ['Figma', 'Mural', 'Markdown'],
    },
    {
      id: 'work-ana',
      company: {
        en: 'YUMEMI Inc. (Client: Major Airline via Consulting Firm)',
        jp: '株式会社ゆめみ（クライアント: 大手航空会社 / コンサルティングファーム経由）',
      },
      position: {
        en: 'Design System Designer & Developer',
        jp: 'デザインシステム デザイナー & デベロッパー',
      },
      location: { en: 'Tokyo, Japan', jp: '東京都' },
      startDate: '2025-11',
      endDate: '2026-03',
      description: {
        en: [
          'Architected a comprehensive design system spanning 9 digital platforms (2 mobile apps, 7 web variants) with a two-layer token structure (Primitive + Semantic)',
          'Built 399 design variables across 6 collections, supporting 3 color modes (Light/Dark/GraySwitch) and 3 typography modes (Web/iOS/Android)',
          'Developed 12 custom Figma plugins for token setup, component organization, legacy migration, and production workflows',
          'Audited and systematized 53 UI components across 6 categories with a platform-by-component matrix',
          'Implemented a Next.js component prototype with 11 page variants, extending shadcn/ui with airline-specific theming',
          'Created 51+ documentation files covering analysis, design specs, implementation guides, and competitive research of 12 airline websites',
        ],
        jp: [
          '9つのデジタルプラットフォーム（モバイルアプリ2本、Web7種）を横断する包括的デザインシステムを設計。Primitive + Semanticの2層トークン構造を採用',
          '6コレクション・399デザイン変数を構築。3カラーモード（Light/Dark/GraySwitch）と3タイポグラフィモード（Web/iOS/Android）に対応',
          'トークン設定、コンポーネント整理、レガシー移行、プロダクションワークフロー用の12個のカスタムFigmaプラグインを開発',
          '53のUIコンポーネントを6カテゴリで監査・体系化し、プラットフォーム×コンポーネントのマトリクスを作成',
          'Next.jsコンポーネントプロトタイプを11ページバリアントで実装。shadcn/uiを航空会社固有のテーマで拡張',
          '分析・設計仕様・実装ガイド・12航空会社の競合調査を含む51以上のドキュメントを作成',
        ],
      },
      technologies: [
        'Figma',
        'Tokens Studio',
        'TypeScript',
        'Next.js',
        'React',
        'Tailwind CSS',
        'shadcn/ui',
        'Radix UI',
        'Playwright',
        'Python',
      ],
    },
    {
      id: 'work-pana',
      company: {
        en: 'YUMEMI Inc. (Client: Major Consumer Electronics Company)',
        jp: '株式会社ゆめみ（クライアント: 大手電機メーカー）',
      },
      position: { en: 'UI Designer', jp: 'UIデザイナー' },
      location: { en: 'Tokyo, Japan', jp: '東京都' },
      startDate: '2025-07',
      endDate: 'Present',
      description: {
        en: [
          'Designed UI for a smart home voice push notification service, managing two parallel design tracks: notification settings hub and third-party speaker setup wizard',
          'Developed a responsive text wrapping system with character-count-aware layout switching (1-line for ≤14 chars, 2-line for 15-28 chars), validated through 4 interactive HTML/CSS prototypes',
          'Created frame-perfect infinite-loop loader animations in 3 sizes (80px/24px/16px) with seamless end-to-start transitions',
          'Designed scenario-based UI states for anniversary, family day, and special card features with ON/OFF notification management',
          'Authored 6 detailed design specification documents and partner-specific terms pages, aligned with the 360UX brand refresh initiative',
        ],
        jp: [
          'スマートホーム音声プッシュ通知サービスのUI設計を担当。通知設定ハブとサードパーティスピーカーセットアップウィザードの2つの並行デザイントラックを管理',
          '文字数対応レイアウト切替システムを開発（14文字以下で1行、15-28文字で2行表示）。4本のインタラクティブHTML/CSSプロトタイプで検証',
          'フレームパーフェクトな無限ループローダーアニメーションを3サイズ（80px/24px/16px）で作成。シームレスなend-to-start遷移を実現',
          'Anniversary、Family Day、Special Card機能のシナリオベースUI状態を設計。ON/OFF通知管理に対応',
          '6本の詳細デザイン仕様書とパートナー固有条件ページを作成。360UXブランドリフレッシュに準拠',
        ],
      },
      technologies: ['Figma', 'HTML', 'CSS', 'JavaScript', 'Lottie'],
    },
    {
      id: 'work-nextstage',
      company: {
        en: 'YUMEMI Inc. (Client: Construction Tech & Consulting Company)',
        jp: '株式会社ゆめみ（クライアント: 建築テック・コンサルティング企業）',
      },
      position: { en: 'UI Designer', jp: 'UIデザイナー' },
      location: { en: 'Tokyo, Japan', jp: '東京都' },
      startDate: '2025-04',
      endDate: '2025-08',
      description: {
        en: [
          'Led the complete UI renewal of a cloud-based video learning platform for the residential construction industry, applying Object-Oriented UI (OOUI) methodology for unified information architecture',
          'Designed gamification and emotional feedback systems inspired by Duolingo: badges, level/rank progression, avatars that grow with learning progress, and mascot encouragement',
          'Delivered wireframes for 11+ screens in 15 business days, followed by visual design with Material Design 3 component integration',
          'Conducted 3 client review sessions with iterative feedback incorporation, from wireframes through final visual design',
          'Conceptualized design around 3 pillars: growth awareness, learner autonomy, and real-world speed — enabling both individual progress tracking and organization-wide learning oversight',
        ],
        jp: [
          '住宅建築業界向けクラウド動画学習プラットフォームのUI全面リニューアルを主導。OOUI（オブジェクト指向UI）手法で統一的な情報設計を実現',
          'Duolingoに着想を得たゲーミフィケーションと感情的フィードバックシステムを設計: バッジ、レベル/ランク、学習進捗に応じて成長するアバター、マスコットキャラクターによる励まし',
          '15営業日で11画面以上のワイヤーフレームを完成。その後Material Design 3コンポーネント統合によるビジュアルデザインを実施',
          'ワイヤーフレームから最終ビジュアルデザインまで、3回のクライアントレビュー会を通じたフィードバック反映を実施',
          '学び・成長の実感、主体性・未来志向、現場・スピード感の3軸でコンセプトを言語化。個人の進捗確認と組織全体の学習状況俯瞰の両方を実現する設計',
        ],
      },
      technologies: ['Figma', 'FigJam', 'Material Design 3'],
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
    },
  ],
  skills: [
    {
      category: { en: 'Design', jp: 'デザイン' },
      items: [
        'Figma',
        'Design Systems',
        'UI/UX Design',
        'OOUI',
        'Gamification Design',
        'User Research',
        'Competitive Analysis',
        'Information Architecture',
        'Interaction Design',
        'Material Design 3',
      ],
    },
    {
      category: { en: 'Development', jp: '開発' },
      items: [
        'Next.js',
        'React',
        'TypeScript',
        'Tailwind CSS',
        'shadcn/ui',
        'Radix UI',
        'HTML/CSS/JavaScript',
        'Node.js',
        'Python',
        'Playwright',
      ],
    },
    {
      category: { en: 'Tools & Methods', jp: 'ツール & 手法' },
      items: [
        'Figma Plugin Development',
        'Tokens Studio',
        'Lottie Animation',
        'Git/GitHub',
        'Notion',
        'Mural',
        'FigJam',
        'Design Token Management',
      ],
    },
  ],
  projects: [
    {
      id: 'project-airline-ds',
      title: {
        en: 'Airline Design System',
        jp: '航空会社デザインシステム',
      },
      description: {
        en: 'Enterprise-scale design system spanning 9 digital platforms with 399 design tokens, 53 audited components, and 12 custom Figma plugins. Built a Next.js component prototype and comprehensive documentation covering token architecture, component specs, and competitive analysis.',
        jp: '9つのデジタルプラットフォームを横断するエンタープライズ規模のデザインシステム。399デザイントークン、53の監査済みコンポーネント、12のカスタムFigmaプラグインを構築。Next.jsコンポーネントプロトタイプと、トークン設計・コンポーネント仕様・競合分析を含む包括的ドキュメントを作成。',
      },
      period: { en: 'Nov 2025 - Mar 2026', jp: '2025年11月 - 2026年3月' },
      technologies: [
        'Figma',
        'TypeScript',
        'Next.js',
        'Tailwind CSS',
        'shadcn/ui',
        'Playwright',
      ],
    },
    {
      id: 'project-donation-app',
      title: {
        en: 'University Alumni Donation App',
        jp: '大学校友寄付アプリ',
      },
      description: {
        en: 'Figma prototype for a donation mobile app connecting 670,000+ alumni. Integrated 118-person survey insights, analyzed 20+ competitor apps, and designed a non-coercive donation UX that positions giving as a natural extension of community engagement.',
        jp: '67万人以上の校友をつなぐ寄付モバイルアプリのFigmaプロトタイプ。118名のアンケートインサイトを統合し、20以上の競合アプリを分析。寄付をコミュニティ体験の自然な延長として位置づける非強制的な寄付UXを設計。',
      },
      period: { en: 'Apr 2026', jp: '2026年4月' },
      technologies: ['Figma', 'Mural'],
    },
    {
      id: 'project-smart-home',
      title: {
        en: 'Smart Home Voice Notification UI',
        jp: 'スマートホーム音声通知UI',
      },
      description: {
        en: 'UI design for a voice push notification service across two parallel tracks: notification settings hub and third-party speaker setup. Developed character-count-aware responsive layouts and frame-perfect infinite-loop animations, validated through interactive HTML prototypes.',
        jp: '音声プッシュ通知サービスのUI設計。通知設定ハブとサードパーティスピーカーセットアップの2トラックを並行管理。文字数対応レスポンシブレイアウトとフレームパーフェクトな無限ループアニメーションを、インタラクティブHTMLプロトタイプで検証。',
      },
      period: { en: 'Jul 2025 - Present', jp: '2025年7月 - 現在' },
      technologies: ['Figma', 'HTML', 'CSS', 'JavaScript', 'Lottie'],
    },
    {
      id: 'project-learning-platform',
      title: {
        en: 'Video Learning Platform UI Renewal',
        jp: '動画学習プラットフォームUIリニューアル',
      },
      description: {
        en: 'Complete UI redesign of a cloud-based video learning platform for the residential construction industry. Applied OOUI methodology combined with Duolingo-inspired gamification — badges, avatars, and emotional feedback — to reduce navigation complexity and boost learner engagement.',
        jp: '住宅建築業界向けクラウド動画学習プラットフォームのUI全面リデザイン。OOUI手法とDuolingoに着想を得たゲーミフィケーション（バッジ、アバター、感情的フィードバック）を組み合わせ、ナビゲーション複雑性の軽減と学習者エンゲージメントの向上を実現。',
      },
      period: { en: 'Apr - Aug 2025', jp: '2025年4月 - 8月' },
      technologies: ['Figma', 'FigJam', 'Material Design 3'],
    },
  ],
};

