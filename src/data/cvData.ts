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

// 職歴内の1案件。閉じた状態では summary のみ、展開すると detail の各ブロックを表示する
export interface WorkProject {
  id: string;
  label: { en: string; jp: string }; // 業界ラベル（NDAのためクライアント実名は使わない）
  period: { start: string; end: string | 'Present' };
  summary: { en: string; jp: string };
  detail?: {
    context?: { en: string[]; jp: string[] }; // 背景・課題
    goal?: { en: string[]; jp: string[] }; // プロジェクトゴール
    deliverables?: { en: string[]; jp: string[] }; // 成果物
    outcome?: { en: string[]; jp: string[] }; // アウトカム
  };
}

export interface WorkExperience {
  id: string;
  company: { en: string; jp: string };
  position: { en: string; jp: string };
  employmentType?: { en: string; jp: string }; // インターン等。正社員は未指定
  location: { en: string; jp: string };
  startDate: string; // "2024-01"
  endDate: string | 'Present'; // "2024-12" or "Present"
  summary: { en: string; jp: string };
  projects?: WorkProject[];
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
  /** true にすると /cv のプロジェクト一覧から除外される（データは残す） */
  hidden?: boolean;
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
    name: { en: 'Iori Kawano', jp: '河野いおり' },
    title: {
      en: 'UI/UX Designer',
      jp: 'UI/UXデザイナー',
    },
    location: { en: 'Tokyo, Japan', jp: '東京都' },
    email: 'iori730002204294@gmail.com',
    website: 'https://iori-kawano.vercel.app',
    summary: {
      en: 'Designer who thinks in systems and ships in code. Social-science background turned professional asset: I read group behavior and organizational dynamics the way others read user flows. At YUMEMI, I contributed to the UI renewal of a learning platform for skilled trade workers and designed smart home IoT interfaces. At Accenture Song, I built the token foundation and plugin tooling for an airline\'s design system across mobile and web, and led the UI for a university alumni app.',
      jp: '社会科学（地球社会共生学部）を学び、システムで考え、コードで実装するデザイナー。集団行動と組織のダイナミクスを読む力が、ユーザー行動の分析と組織への定着設計に直結しています。ゆめみでは技能職向け学習プラットフォームのUIリニューアルに参画し、スマートホームIoTインターフェースを設計。アクセンチュア・ソングでは、大手航空会社のモバイル・Web横断デザインシステムのトークン基盤とプラグイン開発を担当し、大学OB・OG向け校友アプリのUIを担当。',
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
      summary: {
        en: 'Design system for a major airline across mobile apps and web, and a university alumni app.',
        jp: '大手航空会社向けデザインシステム（モバイルアプリ・Web）と、大学OB・OG向け校友アプリ。',
      },
      projects: [
        {
          id: 'acn-university',
          label: { en: 'University', jp: '大学' },
          period: { start: '2026-04', end: '2026-04' },
          summary: {
            en: 'Led Figma prototype design for a university alumni app. Designed full-screen flows from LINE-integrated onboarding through donation program participation and completion.',
            jp: '大学OB・OG向け校友アプリのFigmaプロトタイプ設計を主導。LINE連携オンボーディングから寄付プログラム参加・完了まで全画面フローを設計。',
          },
        },
        {
          id: 'acn-airline',
          label: { en: 'Airline', jp: '航空' },
          period: { start: '2025-12', end: '2026-03' },
          summary: {
            en: 'Built the token foundation and tooling for the airline\'s design system — a two-layer token architecture (399 variables across 6 collections, 3 color modes, 3 typography modes) and custom Figma plugins for token setup, design-lint fixing, and variable migration (the migrate-after-lint ordering cut manual re-binding significantly).',
            jp: '航空会社のデザインシステムのトークン基盤とツールを構築。2層トークンアーキテクチャ（6コレクション・399変数、3カラーモード、3タイポグラフィモード）を構築し、トークンの自動セットアップ・デザインLint修正・変数マイグレーションを自動化するFigmaプラグイン群を開発（「Lint→Migrate」の順序設計で手作業の再バインドを大幅削減）。',
          },
        },
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
      summary: {
        en: 'Joined full-time after graduating. Contributed to the UI renewal of a video learning platform for skilled-trade workers in the housing construction industry, and continued the smart home voice notification work.',
        jp: '大学卒業後、正社員として参画。住宅建設業界の技能職向け動画学習プラットフォームのUIリニューアルに参画し、スマートホーム音声通知の設計を継続。',
      },
      projects: [
        {
          id: 'yumemi-voice-push-2',
          label: { en: 'Consumer Electronics', jp: '大手電機' },
          period: { start: '2025-06', end: '2025-10' },
          summary: {
            en: 'Designed the UI for a smart-home voice push-notification service across two tracks (in-house hub + third-party speaker setup). Validated a character-count-aware responsive text system with HTML prototypes.',
            jp: 'スマートホーム音声プッシュ通知のUIを2トラック（自社ハブ＋他社スピーカー設定）で設計。文字数対応のレスポンシブ設計をHTMLプロトで検証。',
          },
        },
        {
          id: 'yumemi-learning-platform',
          label: { en: 'Construction Tech', jp: '建築テック' },
          period: { start: '2025-03', end: '2025-07' },
          summary: {
            en: 'Contributed to the UI renewal of a video learning platform for skilled-trade workers in the housing construction industry (3-person team). Personally owned ~20 screens (search, in-progress/review, e-learning, generic loading), applying OOUI methodology and gamification design across 3 client review sessions.',
            jp: '住宅建設業界の技能職（職人）向け動画学習プラットフォームのUIリニューアルに3名体制で参画。OOUI手法とゲーミフィケーション設計を用い、3回のクライアントレビューを経て担当画面（検索・受講中/復習・eラーニング・汎用ローディング）約20画面を設計。',
          },
          detail: {
            context: {
              en: [
                'A BtoB cloud video learning service for skilled-trade workers in the housing construction industry, sold primarily on corporate contracts.',
                'The existing UI was flagged for not turning learning into results, for creating friction for older tradespeople, and for lacking a structure that worked at the organization level.',
                'Learning progress could not be tracked systematically, making retention and motivation hard to sustain — against an industry backdrop of labor shortage and skill succession.',
              ],
              jp: [
                '住宅建設業界の技能職（職人）向けの、法人契約を主対象としたBtoBクラウド動画学習サービス。',
                '既存UIには「学びが成果につながらない」「年配の職人層がストレスを感じやすい」「組織的に使いやすい設計が不足している」という課題が指摘されていた。',
                '学習状況を体系的に管理できず、定着とモチベーション維持が難しい状態だった。背景には人材不足・技能伝承という業界特有の事情がある。',
              ],
            },
            goal: {
              en: [
                'Organize objects and actions from an OOUI perspective, restructure the information architecture, and rebuild the main flows.',
                'Make learning progress visible and structured through curricula, badges, and team standings.',
                'Balance a modern feel with the flexibility and structure that corporate use demands.',
              ],
              jp: [
                'OOUI観点でオブジェクトとアクションを整理し、情報設計を再構成して主要フローのUIを刷新する。',
                '学習状況を「学習コース」「バッジ」「チーム対抗」といった仕組みで可視化・体系化する。',
                'モダンさと、法人利用に耐えうる柔軟性・体系性を両立させる。',
              ],
            },
            deliverables: {
              en: [
                'UX/UI improvement proposals and renewal designs, from wireframes through visual design.',
                'Moodboard, sitemap, and OOUI analysis board.',
                'New feature concepts: learning courses, badges and ranks, team standings, and playlists.',
                'An explicit out-of-scope definition (login/signup, corporate site top, contact, Q&A, manuals) to hold the scope steady.',
              ],
              jp: [
                'UX/UI改善策の抽出とリニューアルデザイン（ワイヤーフレーム〜ビジュアルデザイン）。',
                'ムードボード、サイトマップ、OOUI分析ボード。',
                '新機能の検討（学習コース、バッジ／ランク、チーム対抗、プレイリスト）。',
                'スコープを固定するための除外範囲の明示（ログイン／新規登録、総合サイトTOP、お問い合わせ、Q&A、操作マニュアル）。',
              ],
            },
            outcome: {
              en: [
                'Reorganizing screen granularity and transitions along OOUI lines lowered the navigation load on the main flows.',
                'Fixing the scope up front kept review discussions from drifting and reduced rework.',
                'Established a rhythm with the client-side designer — agree, then apply immediately — which shortened the UI update lead time.',
                'Turned the OOUI structuring and the review criteria (information architecture, appropriateness of data representation) into a reusable process for later projects.',
              ],
              jp: [
                'OOUIに基づく画面粒度と遷移の整理で、主要フローのナビゲーション負荷を低減。',
                '除外範囲を明示してスコープを固定したことで、レビュー論点のブレを抑え手戻りを削減。',
                'クライアント側デザイナーと「合意→即反映」のループを確立し、UI更新のリードタイムを短縮。',
                'OOUIによる整理とレビュー観点（情報設計・データ表現の妥当性）を、次案件でも流用できるプロセスとして標準化。',
              ],
            },
          },
        },
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
    {
      id: 'work-yumemi-intern',
      company: {
        en: 'YUMEMI Inc.',
        jp: '株式会社ゆめみ',
      },
      position: {
        en: 'UI/UX Designer',
        jp: 'UI/UXデザイナー',
      },
      employmentType: {
        en: 'Internship',
        jp: 'インターン',
      },
      location: { en: 'Tokyo, Japan', jp: '東京都' },
      startDate: '2024-06',
      endDate: '2025-03',
      summary: {
        en: 'Joined as a design intern while finishing my sociology degree. Shipped client work across consumer electronics, beauty, and public-sector digital, plus a self-initiated internal data visualization project.',
        jp: '社会学部在学中にデザインインターンとして参画。大手電機・化粧品・公共デジタル領域のクライアントワークに加え、自ら起案した社内データ可視化プロジェクトを担当。',
      },
      projects: [
        {
          id: 'yumemi-internal-survey',
          label: { en: 'Internal', jp: '社内' },
          period: { start: '2025-01', end: '2025-04' },
          summary: {
            en: 'Self-initiated: redesigned the quarterly internal employee survey report and built the visualization pipeline behind it.',
            jp: '自ら起案。四半期ごとの社内従業員サーベイのレポートを再設計し、その裏側の可視化パイプラインを構築。',
          },
          detail: {
            context: {
              en: [
                'The quarterly report slides were hard to read — composition, spacing, and element sizing all worked against the information.',
              ],
              jp: [
                '四半期ごとに作成しているレポートスライドが、構図・余白・各要素のサイズの面で読み取りにくかった。',
              ],
            },
            goal: {
              en: [
                'Make the slides visually easy to follow so more people engage with the survey.',
                'Reduce the version-management and update burden each quarter.',
              ],
              jp: [
                '視覚的に理解しやすいスライドにして、サーベイへの関心を高める。',
                '版管理と更新作業の負担を減らす運用へ改善する。',
              ],
            },
            deliverables: {
              en: [
                'Redesigned report slide deck.',
                'A chart template set built as Figma main components.',
                'Operating manuals for the Google Colab and Figma steps.',
              ],
              jp: [
                '再設計したレポートスライド一式。',
                'Figmaメインコンポーネントとして構築した図表テンプレート一式。',
                'Google ColabとFigmaの作業手順をまとめた運用マニュアル。',
              ],
            },
            outcome: {
              en: [
                'Unified the visualization rules — color, legend, axis, unit, and annotation placement — so readability improved without breaking the existing structure.',
                'Handled the whole chain alone for the first time, from data preparation in Google Colab through to the finished slides.',
                'Quarterly updates became mostly component swaps, cutting the work each cycle. Documenting the process kept it from depending on one person.',
              ],
              jp: [
                '可視化ルール（色・凡例・軸・単位・注記の位置）を統一し、従来の構成を崩さずに可読性を向上。',
                'Google Colabでのデータ整形から完成スライドまで、初めて一人で通しで担当した。',
                '四半期ごとの更新が主にコンポーネント差し替えとなり作業時間を削減。手順をドキュメント化して属人化を防いだ。',
              ],
            },
          },
        },
        {
          id: 'yumemi-design-system-docs',
          label: { en: 'Public Sector Digital', jp: '公共・デジタル' },
          period: { start: '2024-09', end: '2024-10' },
          summary: {
            en: 'Joined a design system build to produce its documentation site: Figma main components for the page designs, and roughly 50 pages assembled in STUDIO.',
            jp: 'デザインシステム構築プロジェクトにドキュメントサイト制作担当として参画。Figmaでのメインコンポーネント設計と、STUDIOでの約50ページのサイト構築を担当。',
          },
          detail: {
            context: {
              en: [
                'A design system build was already underway when the team decided to publish its documentation as a STUDIO site, which required additional hands.',
              ],
              jp: [
                'デザインシステム構築が進行中に、ドキュメントをSTUDIOでサイト化する方針となり、増員が必要になった。',
              ],
            },
            goal: {
              en: [
                'Design multiple Figma main components so page updates could be made in bulk.',
                'Get the STUDIO side to a state where structure and content could be built out quickly.',
              ],
              jp: [
                'Figmaでメインコンポーネントを複数設計し、一括編集性を確保する。',
                'STUDIO側でサイト構造とコンテンツ反映を高速に回せる状態を作る。',
              ],
            },
            deliverables: {
              en: [
                'A STUDIO site of roughly 50 pages.',
                "Sitemap derived from the lead designer's documentation, plus five baseline wireframes.",
                'An internal tips database on working in STUDIO, shared across the company.',
              ],
              jp: [
                'STUDIOサイト一式（約50ページ）。',
                '先輩デザイナーのドキュメントを元にしたサイトマップと、基準となるワイヤーフレーム5画面。',
                'STUDIO操作の学びをまとめた社内共有用のTipsデータベース。',
              ],
            },
            outcome: {
              en: [
                "Mapped out STUDIO's real constraints — CMS line height locked to multiples of the text size, a 790px ceiling on CMS images, fonts limited to those STUDIO supports — and worked around each one.",
                'Where a constraint could not be worked around, proposed the fix upstream in the Figma design system rather than patching it page by page.',
                'Publishing the learnings internally reduced how much STUDIO work depended on any one person.',
              ],
              jp: [
                'STUDIOの実際の制約（CMSの行間がテキストサイズの倍数に固定される、CMS画像は790pxが上限、利用可能フォントが限定される）を検証し、それぞれの回避策を確立。',
                '回避できない制約は、ページ単位で対処せずFigma側のデザインシステム修正として提案し、作業を最適化した。',
                '学びを社内に公開することで、STUDIO編集の属人性を低減。',
              ],
            },
          },
        },
        {
          id: 'yumemi-voice-push-1',
          label: { en: 'Consumer Electronics', jp: '大手電機' },
          period: { start: '2024-07', end: '2025-01' },
          summary: {
            en: 'Refactored the design environment for a smart home voice notification service. Organized scattered specs into a reusable Figma library and documented the naming and layer conventions behind it.',
            jp: 'スマートホーム音声通知サービスの開発環境リファクタリングを担当。分散していた仕様を再利用可能なFigmaライブラリに整理し、その土台となる命名・レイヤー規約をドキュメント化。',
          },
          detail: {
            context: {
              en: [
                'Authentication, settings UI, and operational tooling were being updated in parallel, scattering specs and design assets across the project.',
                'UI parts, annotations, and naming conventions drifted across teams, so every change carried a translation cost before it could be made.',
              ],
              jp: [
                '認証・設定UI・運用オペレーションが並行して更新され、仕様と設計資産がプロジェクト全体に分散していた。',
                'UI部品・注釈・命名規則が横断で揺れ、改修のたびに読み替えコストが発生していた。',
              ],
            },
            goal: {
              en: [
                'Establish a refactoring guide covering naming, layer structure, and dependency handling, plus a reuse-oriented design for UI assets.',
                'Move the team to a workflow where changes are made by swapping components.',
                'Give stakeholders a single screen-flow diagram they can trust as the current source of truth.',
              ],
              jp: [
                '命名・レイヤー構成・依存関係の扱いを網羅したリファクタリングガイドと、UI資産の再利用設計を確立する。',
                '以降の改修を「コンポーネント差し替え」で行える運用に移行する。',
                'ステークホルダーが最新の正として参照できる、包括的な画面遷移図を整備する。',
              ],
            },
            deliverables: {
              en: [
                '18 individual page specs plus an overall screen-flow diagram, covering 195 screens in total.',
                'Figma main component library: header, footer, list, modal bottom sheet, popup, card, form, sidebar, selection, button, icon, and illustration.',
                'Variant and property architecture, with color and typography tokens.',
                'Operational documentation templates for naming conventions and layer structure.',
              ],
              jp: [
                '18の個別ページ仕様と全体の画面遷移図（合計195画面）。',
                'Figmaメインコンポーネント・ライブラリ（ヘッダー、フッター、リスト、モーダルボトムシート、ポップアップ、カード、フォーム、サイドバー、セレクション、ボタン、アイコン、イラスト）。',
                'バリアント／プロパティ設計と、カラー・フォントトークン。',
                '命名規則とレイヤー構成の運用ドキュメント雛形。',
              ],
            },
            outcome: {
              en: [
                'Applying a change became a few steps instead of a hunt, raising both speed and reproducibility.',
                'Shared terminology and annotation rules let review discussions focus on implementation rather than interpretation.',
                'Each phase — kickoff, build, release — had one unambiguous latest version to reference.',
              ],
              jp: [
                '改修時の差分適用が数ステップに短縮され、再現性と速度が向上。',
                '用語・注釈の統一が進み、レビューの論点が解釈ではなく実装に集中するようになった。',
                'キックオフ→実装→公開の各フェーズで参照すべき最新版が単一化された。',
              ],
            },
          },
        },
        {
          id: 'yumemi-brand-lp',
          label: { en: 'Beauty', jp: '化粧品' },
          period: { start: '2024-07', end: '2024-09' },
          summary: {
            en: 'Designed feature-introduction landing pages for six brands in a major cosmetics group, built as one template with per-brand variants.',
            jp: '大手化粧品グループ6ブランド向けの機能紹介LPを、共通テンプレート＋ブランド別バリアントの構成で設計。',
          },
          detail: {
            context: {
              en: [
                'Six brands needed landing pages produced at speed without dropping quality.',
                'Each brand had its own copy and visuals, but the set had to stay consistent enough to operate as one system.',
              ],
              jp: [
                '6ブランド分のLPを、品質とスピードを両立して制作する必要があった。',
                '各ブランド固有の文言・ビジュアルを反映しつつ、ひとつの仕組みとして運用できる統一設計が求められた。',
              ],
            },
            goal: {
              en: [
                'Design main components on the assumption of templating, and manage brand differences through variants so all six can be updated together.',
              ],
              jp: [
                'テンプレート化を前提にメインコンポーネントを設計し、ブランド差分をバリアントで管理して6ブランドを一括編集できる体制を整える。',
              ],
            },
            deliverables: {
              en: ['Full design set: shared template plus per-brand variations.'],
              jp: ['デザイン一式（共通テンプレート＋ブランド差分）。'],
            },
            outcome: {
              en: [
                'Templating minimized the cost of swapping brand content and shortened the review-to-revision lead time.',
                'Standardizing the feedback and comment format in Figma kept the handoff with the PM predictable.',
              ],
              jp: [
                'テンプレート化により差し替え負荷を最小化し、レビュー〜反映のリードタイムを短縮。',
                'Figma上のフィードバック・コミュニケーション書式を統一し、PMとのやり取りを円滑化。',
              ],
            },
          },
        },
      ],
      technologies: ['Figma', 'STUDIO', 'Google Colab', 'Python'],
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
        en: 'Global Studies and Collaboration',
        jp: '地球社会共生学部',
      },
      startDate: '2021-04',
      endDate: '2025-03',
      description: {
        en: 'An interdisciplinary social-science program spanning politics, economics, business, media, and sociology, with an order-made curriculum, intensive language training, and a semester abroad in Southeast Asia. Independently pursued design through self-study and internships, transitioning from frontend development to UI/UX design.',
        jp: '政治・経済・経営・メディア/空間情報・社会学を横断する社会科学系のグローバル学部。オーダーメイド型カリキュラムと東南アジアでの半期留学を軸に、語学・異文化コミュニケーション・情報活用力を養う。在学中に独学とインターンを通じてフロントエンド開発からUI/UXデザインへ転身。',
      },
    },
  ],
  skills: [
    {
      category: { en: 'Design', jp: 'デザイン' },
      items: ['Design Systems', 'UI/UX Design'],
    },
    {
      category: { en: 'Tools & Methods', jp: 'ツール & 手法' },
      items: ['Claude Code', 'Cursor', 'Figma Plugin Development'],
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
      // 完成度がまだ低いため /cv では非表示（/work のページ自体は公開のまま）
      hidden: true,
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

