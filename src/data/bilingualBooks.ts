/**
 * Bilingual Books (podcast) — /experiment/bilingual-books の内容。
 *
 * 事実・数字は 2026-11-23 にポッドキャスト側で裏取りしたもの
 * （ai-ops/output/portfolio/bilingual-books-experiment-content.md）。
 * - 再生数・フォロワー数は載せない
 * - Season 4 と、武士道の読書サイトは未公開なので載せない
 * - S3 の状態は 12/2 の全話配信後に「配信済み」へ直す
 */

export type Bi = { en: string; jp: string };

export const BB_TAGS = [
  'Bilingual',
  'Text-to-Speech',
  'Translation',
  'Publishing Automation',
  'Figma Variables',
] as const;

export const BB_IMG = '/experiment/bilingual-books';

export const BB_TITLE: Bi = {
  en: 'Bilingual Books',
  jp: 'Bilingual Books',
};

export const BB_SUBTITLE: Bi = {
  en: 'A podcast that reads classics in Japanese and English, one sentence at a time.',
  jp: 'バイリンガルで本を聴く。古典を、日本語と英語の一文ずつで聴くポッドキャスト。',
};

export const BB_OVERVIEW: Bi[] = [
  {
    jp: '日本語を読んでいる途中で、「これは英語でどう言うか」が気になる。その頭の動き方に合わせて、日本語の一文のあとに英語の一文が続く形で、古典を聴ける番組を作った。',
    en: 'While reading in Japanese, I keep wondering how the same sentence would be said in English. This podcast follows that habit: every Japanese sentence is followed by its English counterpart.',
  },
  {
    jp: '扱うのは、茶の本（岡倉覚三）、代表的日本人（内村鑑三）、武士道（新渡戸稲造）の3冊、全30話。どれも英語で書かれた本なので、日本語側は英語の原文から新しく訳した。',
    en: 'It covers three books, thirty episodes: The Book of Tea (Kakuzo Okakura), Representative Men of Japan (Kanzo Uchimura) and Bushido: The Soul of Japan (Inazo Nitobe). All three were written in English, so the Japanese side is a new translation from the English originals.',
  },
];

export type BBStepIcon = 'rights' | 'chunks' | 'audio' | 'cover' | 'release';

export const BB_STEPS: Array<{ icon: BBStepIcon; label: Bi; title: Bi; body: Bi }> = [
  {
    icon: 'rights',
    label: { en: 'Rights', jp: '権利確認' },
    title: { en: 'Choosing the text and checking rights', jp: '原文の選定と権利の確認' },
    body: {
      jp: '著者の没年（日本は没年＋70年）と出版年（米国は1929年以前）を基準にし、根拠を各リポジトリの README に残す。既存の日本語訳があっても、訳者の没年は別に確認し、保護が続いていれば使わず、英語の原文から訳し直す。',
      en: "I check the author's death date (Japan: life plus 70 years) and the publication year (US: before 1929), and record the basis in each repository's README. If a Japanese translation exists, the translator's death date is checked separately; when it is still protected, I do not use it and translate again from the English.",
    },
  },
  {
    icon: 'chunks',
    label: { en: 'Chunks', jp: '対訳チャンク' },
    title: { en: 'Bilingual chunks', jp: '対訳チャンク' },
    body: {
      jp: '本文を一文ごとのチャンク（日本語、英語、段落の区切り）に分ける。サイトでは日本語→英語を交互に表示し、ブラウザの読み上げでチャンクごとにハイライトする。3冊で合計4,080チャンク（茶の本965、代表的日本人1,955、武士道1,160）。',
      en: "The text is split into sentence-level chunks (Japanese, English and a paragraph-break flag). The site shows Japanese then English in turn, and the browser's read-aloud highlights one chunk at a time. Across the three books there are 4,080 chunks (965, 1,955 and 1,160).",
    },
  },
  {
    icon: 'audio',
    label: { en: 'Audio', jp: '音声合成' },
    title: { en: 'Synthesized audio', jp: '音声合成' },
    body: {
      jp: '音声は Google Cloud Text-to-Speech の Neural2（日本語 ja-JP-Neural2-B、英語 en-US-Neural2-F）。macOS のシステム音声は、Apple の規約でポッドキャストへの再配布が禁じられているため使わない。',
      en: "Audio comes from Google Cloud Text-to-Speech (Neural2: ja-JP-Neural2-B and en-US-Neural2-F). The macOS system voices are not used, because Apple's license forbids redistributing them in a podcast.",
    },
  },
  {
    icon: 'cover',
    label: { en: 'Covers', jp: 'カバー' },
    title: { en: 'Covers and quote cards', jp: 'カバーと名言カード' },
    body: {
      jp: 'カバーは Figma の Main Component と Variables で作る。シリーズの色を変数で切り替え、全エピソードのカバーと Instagram の名言カードを、同じ部品から出す。',
      en: 'Covers are built in Figma with a main component and variables. The series color is a variable, so every episode cover and every Instagram quote card comes from the same parts.',
    },
  },
  {
    icon: 'release',
    label: { en: 'Release', jp: '配信と予約' },
    title: { en: 'Release and scheduling', jp: '配信と予約' },
    body: {
      jp: 'Spotify for Creators に音声を上げ、タイトル、説明、カバー、公開日時を入れて予約する。Apple Podcasts は Spotify に連動する。Instagram は Meta Business Suite で予約するが、予約は作成から29日以内に限られる。そこで、作成できる日に自動で予約を作る仕組み（launchd）を組んだ。ログインが切れて失敗した回は、再ログインのあとに手動で補った。',
      en: 'Audio is uploaded to Spotify for Creators, and I set the title, description, cover and release time. Apple Podcasts follows Spotify. Instagram posts are scheduled in Meta Business Suite, which only accepts dates within 29 days of creation, so a launchd job creates each post on the first day it is allowed. When a login expired and a run failed, I scheduled that post by hand after logging in again.',
    },
  },
];

export const BB_SEASONS: Array<{
  season: string;
  cover: string;
  title: Bi;
  author: Bi;
  original: Bi;
  episodes: Bi;
  status: Bi;
  reader?: string;
}> = [
  {
    season: 'S1',
    cover: `${BB_IMG}/s1-book-of-tea.webp`,
    title: { en: 'The Book of Tea', jp: '茶の本' },
    author: { en: 'Kakuzo Okakura', jp: '岡倉覚三' },
    original: { en: 'English, 1906', jp: '英語・1906年' },
    episodes: { en: '7', jp: '7' },
    status: { en: 'Released', jp: '配信済み' },
    reader: 'https://iori73.github.io/book-of-tea-reader/',
  },
  {
    season: 'S2',
    cover: `${BB_IMG}/s2-representative-men.webp`,
    title: { en: 'Representative Men of Japan', jp: '代表的日本人' },
    author: { en: 'Kanzo Uchimura', jp: '内村鑑三' },
    original: { en: 'English, 1908', jp: '英語・1908年' },
    episodes: { en: '6 (preface + 5 chapters)', jp: '6（序文＋5章）' },
    status: { en: 'Released', jp: '配信済み' },
    reader: 'https://iori73.github.io/representative-men-of-japan-reader/',
  },
  {
    season: 'S3',
    cover: `${BB_IMG}/s3-bushido.webp`,
    title: { en: 'Bushido: The Soul of Japan', jp: '武士道' },
    author: { en: 'Inazo Nitobe', jp: '新渡戸稲造' },
    original: { en: 'English, 1900', jp: '英語・1900年' },
    episodes: { en: '17', jp: '17' },
    // 2026-12-02 に全話の配信が終わる。その後「配信済み」へ。
    status: { en: 'Releasing (Mon, Wed, Fri until Dec 2)', jp: '配信中（月水金、12/2まで）' },
  },
];

export const BB_LISTEN: Array<{ label: string; href: string; note?: Bi }> = [
  { label: 'Spotify', href: 'https://open.spotify.com/show/6Z39YdVEKFLUmHk5uYI7gb' },
  { label: 'Apple Podcasts', href: 'https://podcasts.apple.com/jp/podcast/id6821636572' },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@bilingual-books-pod',
    note: { en: 'Videos', jp: '動画' },
  },
  { label: 'Instagram', href: 'https://www.instagram.com/bilingual.books.pod/' },
];
