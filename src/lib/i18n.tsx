'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'jp';

// 翻訳データの型定義
type Translations = {
  [key: string]: {
    en: string;
    jp: string;
  };
};

// 翻訳データ
const translations: Translations = {
  // ナビゲーション項目
  experiment: {
    en: 'Experiment',
    jp: '実験',
  },
  about: {
    en: 'About',
    jp: '私について',
  },
  blog: {
    en: 'Blog',
    jp: 'ブログ',
  },
  // 言語選択
  languageEN: {
    en: 'EN',
    jp: 'EN',
  },
  languageJP: {
    en: 'JP',
    jp: 'JP',
  },
  // ホームページのコンテンツ
  heroDescription1: {
    en: 'A UI designer passionate about crafting design to the next level.',
    jp: 'デザインをより磨き上げることに情熱を持つUIデザイナーです。',
  },
  heroDescription2: {
    en: 'Especially interested in how data, design, and technology that blends seamlessly into daily life can work together to enhance human experience.',
    jp: '特に日常生活にシームレスに溶け込むデータ・デザイン・テクノロジーが連携して人間の体験を向上させることに強い関心があります。',
  },
  // プロジェクト1の説明
  project1Description1: {
    en: 'A sales support app for easy schedule adjustment with a smartphone',
    jp: 'スマートフォンで簡単にスケジュール調整ができる営業支援アプリ',
  },
  project1Description2: {
    en: 'Users can easily find suitable appointment dates, send requests, and get travel time-based suggestions for in-person meetings.',
    jp: 'ユーザーは適切な予約日を簡単に見つけ、リクエストを送信し、対面会議のための移動時間に基づいた提案を受けることができます。',
  },
  // プロジェクト2の説明
  project2Description1: {
    en: 'Navigating the best 100 yen shops in your neighborhood',
    jp: 'あなたの近所の最高の100円ショップをナビゲート',
  },
  project2Description2: {
    en: 'Smart100 revolutionizes 100 yen store shopping with real-time pricing and stock data. It combines promotions and custom lists, streamlining visits for maximum savings and satisfaction.',
    jp: 'Smart100はリアルタイムの価格と在庫データで100円ショップの買い物を革新します。プロモーションとカスタムリストを組み合わせ、最大限の節約と満足度のために訪問を効率化します。',
  },

  // Aboutページのコンテンツ
  aboutDescription1: {
    en: "I'm a UI designer with a passion for creating structured, detail-oriented designs that drive scalable and idiomatic solutions.",
    jp: 'UIデザイナーとして、構造化され細部にこだわったデザインを作ることに情熱を持っています。スケーラブルで慣用的なソリューションを生み出すことを目指しています。',
  },
  aboutDescription2: {
    en: 'I specialize in creating manageable and scalable design systems—not as an end goal, but as a foundation—freeing design from repetition and opening space for human-centered, contextual exploration.',
    jp: '管理しやすくスケーラブルなデザインシステムの構築を専門としています。それは最終目標ではなく基盤として、デザインを反復作業から解放し、人間中心で文脈的な探求のための空間を開くものです。',
  },
  myInterests: {
    en: 'My Interests',
    jp: '興味・関心',
  },
  interestsDescription: {
    en: 'This visualization highlights the topics I am deeply interested in. Each node represents a subject that inspires my curiosity and enriches my perception of the world.',
    jp: 'このビジュアライゼーションは、私が深く興味を持っているトピックを強調しています。各ノードは私の好奇心を刺激し、世界の認識を豊かにしてくれます。',
  },
  // Experimentページのコンテンツ
  experimentDescription: {
    en: 'I design and build experiments to explore new ideas and concepts.',
    jp: '新しいアイデアやコンセプトを探求するために、さまざまな実験をデザインし構築しています。',
  },
  podcastNotes: {
    en: 'Podcast Notes',
    jp: 'ポッドキャストノート',
  },
  podcastNotesDescription: {
    en: 'My personal notes to leave learnings from podcasts',
    jp: 'ポッドキャストから学んだことを記録する個人的なメモ',
  },
  andMore: {
    en: 'and more!',
    jp: '他にも！',
  },
  goToPage: {
    en: 'Go to Page',
    jp: 'ページへ移動',
  },
  // Tag translations for experiment page
  tagBusiness: {
    en: '#business',
    jp: '#ビジネス',
  },
  tagTechnology: {
    en: '#technology',
    jp: '#テクノロジー',
  },
  tagScience: {
    en: '#science',
    jp: '#科学',
  },
  tagLiberalArts: {
    en: '#liberal arts',
    jp: '#教養',
  },
  // Vision Pro + Spotify translations
  visionProSpotify: {
    en: 'Vision Pro + Spotify',
    jp: 'Vision Pro + Spotify',
  },
  visionProSpotifyDescription: {
    en: 'This work was created in early 2024, immediately after Apple first announced Vision Pro but before it was available to consumers. I imagined the future of Spotify in spatial computing, envisioning lyrics displayed in 3D space without having to look down at a phone screen—turning this pre-launch speculation into a visual prototype. (*Due to its large size, I recommend viewing it on a computer)',
    jp: 'この作品は2024年初頭、AppleがVision Proを初めて発表した直後、まだ一般消費者に販売される前に制作しました。空間コンピューティングにおけるSpotifyの未来を想像し、スマホ画面を覗き込まずに歌詞を3D空間に表示する—この販売前の予想をビジュアルプロトタイプに落とし込みました。（※データサイズが大きいためパソコンでの閲覧がおすすめです）',
  },
  timeline: {
    en: 'Timeline',
    jp: '制作期間',
  },
  twoWeeksInJan2024: {
    en: '2 Weeks in Jan 2024',
    jp: '2024年1月の2週間',
  },
  mySkills: {
    en: 'My Skills',
    jp: 'スキル',
  },
  type: {
    en: 'Type',
    jp: 'タイプ',
  },
  solo: {
    en: 'Solo',
    jp: '個人',
  },
  deliverables: {
    en: 'Deliverables',
    jp: '成果物',
  },
  prototype: {
    en: 'Prototype',
    jp: 'プロトタイプ',
  },
  viewPrototype: {
    en: 'View Prototype',
    jp: 'プロトタイプを見る',
  },
  // Work project grid translations
  internTimeline: {
    en: 'Feb 19, 2024 - Feb 15, 2024',
    jp: '2024年2月19日 - 2月15日',
  },
  internSkills: {
    en: 'UI, UX, Intern',
    jp: 'UI、UX、インターン',
  },
  wireframes: {
    en: 'Wireframes',
    jp: 'ワイヤーフレーム',
  },
  googleUXTimeline: {
    en: 'Apr 2024 - June 2024',
    jp: '2024年4月 - 6月',
  },
  uxRole: {
    en: 'UX',
    jp: 'UX',
  },
  // Scenario bullets with placeholders for A, B, C, D
  scenarioBullet1: {
    en: '{A} needed a new meeting time after the first consultation.',
    jp: '{A}は初回相談後に新しい会議時間が必要になった。',
  },
  scenarioBullet2: {
    en: "{A} required {B}'s presence.",
    jp: '{A}は{B}の出席を必要とした。',
  },
  scenarioBullet3: {
    en: '{A} and {B} sought a 1‑hour slot.',
    jp: '{A}と{B}は1時間の枠を求めた。',
  },
  scenarioBullet4: {
    en: 'Before proposing times to {C} and {D}, {A} confirmed availability with {B}.',
    jp: '{C}と{D}に時間を提案する前に、{A}は{B}の都合を確認した。',
  },
  scenarioBullet5: {
    en: '{A} then presented the options to {C} and {D}.',
    jp: 'その後、{A}は{C}と{D}に選択肢を提示した。',
  },
  scenarioBullet6: {
    en: '{C} coordinated with {D} for a common time.',
    jp: '{C}は共通の時間について{D}と調整した。',
  },
  scenarioBullet7: {
    en: "{C} confirmed {D}'s availability before replying to {A}.",
    jp: '{C}は{A}に返信する前に{D}の都合を確認した。',
  },
  scenarioBullet8: {
    en: 'Finally, {C} provided a mutually agreed time to {A}.',
    jp: '最終的に、{C}は{A}に相互に合意した時間を提供した。',
  },
  // Blogページのコンテンツ
  goToNote: {
    en: 'Go to note',
    jp: 'noteへ移動',
  },
  goToMedium: {
    en: 'Go to Medium',
    jp: 'Mediumへ移動',
  },
  // 2 Day Internshipページのコンテンツ
  internshipDescription: {
    en: 'A sales support app for easy schedule adjustment with a smartphone',
    jp: 'スマートフォンで簡単にスケジュール調整ができる営業支援アプリ',
  },
  // セクションタイトル
  overview: {
    en: 'Overview',
    jp: '概要',
  },
  designProcess: {
    en: 'Design Process',
    jp: 'デザインプロセス',
  },
  solution: {
    en: 'Solution',
    jp: '解決策',
  },
  reflection: {
    en: 'Reflection',
    jp: '振り返り',
  },

  // Overview セクション
  overviewText: {
    en: 'During my 2-day internship at Knowledge Work Inc, I participated in a design exploration project centered around the challenge of efficiently scheduling meetings.',
    jp: 'ナレッジワーク株式会社での2日間のインターンシップ中、会議のスケジューリングを効率的に行うという課題に焦点を当てたデザイン探索プロジェクトに参加しました。',
  },
  scenarioIntro: {
    en: 'The project was inspired by the following hypothetical scenario, provided by the company:',
    jp: 'このプロジェクトは、会社から提供された以下の仮想シナリオに触発されました：',
  },
  internRole: {
    en: 'As a UI/UX design intern, my role involved conducting user research, creating wireframes, designing user interfaces...',
    jp: 'UI/UXデザインインターンとして、私の役割はユーザーリサーチの実施、ワイヤーフレームの作成、ユーザーインターフェースのデザインなどでした...',
  },

  // Design Process セクション
  designProcessText: {
    en: 'The design process involved a combination of research, prototyping, and testing.',
    jp: 'デザインプロセスには、調査、プロトタイピング、テストの組み合わせが含まれていました。',
  },
  infoGatheringTitle: {
    en: 'Information Gathering',
    jp: '情報収集',
  },
  infoGathering: {
    en: 'I began by reviewing existing scheduling apps, and conducting competitive analysis. This research helped me identify key user needs and pain points.',
    jp: '既存のスケジューリングアプリのレビューと競合分析から始めました。この調査により、主要なユーザーニーズと課題点を特定することができました。',
  },
  prototypingTitle: {
    en: 'Prototyping',
    jp: 'プロトタイピング',
  },
  prototyping: {
    en: 'After the research, I created low-fidelity wireframes from selecting candidate date and time to requesting them for the companion. I then conducted usability testing with a sales person at the company I participated.',
    jp: '調査後、候補日時の選択から同伴者へのリクエストまでの低忠実度ワイヤーフレームを作成しました。その後、参加した会社の営業担当者とユーザビリティテストを実施しました。',
  },
  improvementsTitle: {
    en: 'Improvements',
    jp: '改善点',
  },
  improvements: {
    en: 'Based on the results of our usability testing, I made several key improvements to the design, including the fact that travel time needs to be considered as well as available slots, and adding clearer instructions. These improvements significantly enhanced the overall user experience.',
    jp: 'ユーザビリティテストの結果に基づき、移動時間も利用可能な時間枠と同様に考慮する必要があることや、より明確な指示を追加するなど、デザインにいくつかの重要な改善を加えました。これらの改善により、全体的なユーザー体験が大幅に向上しました。',
  },

  // Solution セクション
  conditionSearch: {
    en: '1. Condition Search',
    jp: '1. 条件検索',
  },
  conditionSearchText: {
    en: 'Search by "Refine by criteria" at the top of the calendar view (companion / business target / location / duration)',
    jp: 'カレンダービューの上部にある「条件で絞り込む」で検索（同伴者/商談対象/場所/所要時間）',
  },
  searchResults: {
    en: '2. Search Results',
    jp: '2. 検索結果',
  },
  searchResultsText1: {
    en: 'The "Search results" view dims the surrounding area, highlighting the specified period (from the 5th to the 9th). Results are presented in a list view at the bottom on the page, and users can easily adjust the time by tapping the right arrow.',
    jp: '「検索結果」ビューは周囲の領域を暗くし、指定期間（5日から9日）を強調表示します。結果はページ下部のリストビューに表示され、ユーザーは右矢印をタップするだけで時間を簡単に調整できます。',
  },
  searchResultsText2: {
    en: 'In Day view of the calendar, the meeting time and the travel time displayed, eliminating the need to worry about travel time.',
    jp: 'カレンダーの日表示では、会議時間と移動時間が表示され、移動時間を気にする必要がなくなります。',
  },
  sendRequest: {
    en: '3. Send Request',
    jp: '3. リクエストを送信',
  },
  sendRequestText: {
    en: 'The screen transitions to the confirmation page about the detail.',
    jp: '画面は詳細についての確認ページに遷移します。',
  },

  // Reflection セクション
  impressions: {
    en: 'Impressions',
    jp: '感想',
  },
  impressionsPoint1: {
    en: 'The most impressive part was interviewing the sales staff and receiving valuable feedback on the designs at that point in time.',
    jp: '最も印象的だったのは、営業スタッフへのインタビューと、その時点でのデザインに対する貴重なフィードバックを受けたことです。',
  },
  impressionsPoint2: {
    en: "The reactions of the designers during the presentation were impressive; they took the students' work seriously and reacted with large nods of their heads.",
    jp: 'プレゼンテーション中のデザイナーの反応が印象的でした。彼らは学生の作品を真剣に受け止め、大きくうなずいて反応してくれました。',
  },
  impressionsPoint3: {
    en: 'Feedback was provided in the form of a set of good points (GOOD), opportunities for improvement (OPPORTUNITY) and areas for improvement (IMPROVE).',
    jp: 'フィードバックは、良い点（GOOD）、改善の機会（OPPORTUNITY）、改善すべき領域（IMPROVE）のセットという形で提供されました。',
  },
  reflectionTitle: {
    en: 'Reflection',
    jp: '振り返り',
  },
  reflectionPoint1: {
    en: 'As mentioned above, I got an opportunity to interview a sales person and his feedback provided me with more practical design ideas. For me, the interview was my first experience and very valuable.',
    jp: '上述のように、営業担当者にインタビューする機会を得て、そのフィードバックからより実践的なデザインのアイデアを得ることができました。私にとって、インタビューは初めての経験であり、非常に貴重なものでした。',
  },
  reflectionPoint2: {
    en: 'I received realistic advice for improvement that I need to consider not only available slots but also travel time. I learned not only to consider the usability and usability of the application, but also the perspective of what users want to use this application in what environment and for what purpose.',
    jp: '利用可能な時間枠だけでなく移動時間も考慮する必要があるという現実的な改善アドバイスを受けました。アプリケーションの使いやすさや有用性だけでなく、ユーザーがどのような環境で、どのような目的でこのアプリケーションを使用したいのかという観点も考慮することを学びました。',
  },
  reflectionPoint3: {
    en: 'As for the function to obtain location information of each individual, I felt that privacy concerns and the fact that some people register locations in their calendars while others do not, were challenges in connecting design with the real world.',
    jp: '各個人の位置情報を取得する機能については、プライバシーの懸念や、カレンダーに場所を登録する人もいれば登録しない人もいるという事実が、デザインと現実世界をつなぐ上での課題だと感じました。',
  },

  // Google UX Design Certificate Projectページのコンテンツ
  googleUXDescription: {
    en: 'Navigating the best 100 yen shops in your neighborhood.',
    jp: 'あなたの近所の最高の100円ショップをナビゲート。',
  },
  projectOverview: {
    en: 'Project overview',
    jp: 'プロジェクト概要',
  },
  understandingTheUser: {
    en: 'Understanding the User',
    jp: 'ユーザーの理解',
  },
  secondaryResearch: {
    en: 'Secondary research',
    jp: '二次調査',
  },
  personas: {
    en: 'Personas',
    jp: 'ペルソナ',
  },
  empathyMap: {
    en: 'Empathy map',
    jp: '共感マップ',
  },
  painPoints: {
    en: 'Pain points',
    jp: '課題点',
  },
  userJourneyMap: {
    en: 'User journey map',
    jp: 'ユーザージャーニーマップ',
  },
  valuePropositionCanvas: {
    en: 'Value proposition canvas',
    jp: '価値提案キャンバス',
  },
  featureIdeas: {
    en: 'Feature ideas',
    jp: '機能アイデア',
  },
  competitiveAudit: {
    en: 'Competitive audit',
    jp: '競合分析',
  },
  startingTheDesign: {
    en: 'Starting the design',
    jp: 'デザインの開始',
  },
  userFlow: {
    en: 'User flow',
    jp: 'ユーザーフロー',
  },
  storyboard: {
    en: 'Storyboard',
    jp: 'ストーリーボード',
  },
  paperWireframes: {
    en: 'Paper wireframes',
    jp: '紙のワイヤーフレーム',
  },
  lowFidelityPrototypes: {
    en: 'Low-fidelity prototypes',
    jp: '低忠実度プロトタイプ',
  },
  refiningTheDesign: {
    en: 'Refining the design',
    jp: 'デザインの洗練',
  },
  mockups: {
    en: 'Mockups',
    jp: 'モックアップ',
  },
  goingForward: {
    en: 'Going forward',
    jp: '今後の展開',
  },
};

// コンテキストの型定義
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

// デフォルト値
const defaultContext: LanguageContextType = {
  language: 'en',
  setLanguage: () => {},
  t: () => '',
};

// コンテキストの作成
const LanguageContext = createContext<LanguageContextType>(defaultContext);

// プロバイダーコンポーネント
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // ブラウザのstorageから言語設定を取得するか、デフォルトは英語
  const [language, setLanguage] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  // クライアントサイドでのみ実行されるようにする
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'jp')) {
      setLanguage(savedLanguage);
    }
    setMounted(true);
  }, []);

  // 言語変更時にlocalStorageに保存
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('language', language);
    }
  }, [language, mounted]);

  // 翻訳関数
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][language];
  };

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
};

// フックの作成
export const useLanguage = () => useContext(LanguageContext);

// 日本語のフォントサイズ調整ヘルパー関数
export const useJPFontSize = () => {
  const { language } = useLanguage();

  const jpFontSize = (
    mobileBaseClass: string,
    desktopBaseClass: string,
    mobileJpClass: string,
    desktopJpClass: string,
  ) => {
    if (language === 'jp') {
      return `${mobileJpClass} md:${desktopJpClass}`;
    }
    return `${mobileBaseClass} md:${desktopBaseClass}`;
  };

  return { jpFontSize };
};
