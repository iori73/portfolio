/**
 * Article Pipeline — /experiment/article-pipeline の内容。
 *
 * note / Medium の記事を、メモから下書きまで AI エージェントで進める仕組み（個人の ai-ops リポジトリ）。
 * 事実は 2026-11-23 に ai-ops の手順書（content-pipeline / note コマンド / note エディタの手順 /
 * note-lint / 公開版の回収スクリプト）で裏取りしたもの。
 * - 仕事の情報・他人の名前は載せない
 * - 記事の本数など、数字として見せる段階にない指標は載せない
 */

import type { Bi } from '@/src/data/bilingualBooks';

export type APStepIcon = 'intent' | 'draft' | 'review' | 'lint' | 'editor' | 'recover';

export const AP_TAGS = [
  'Claude Code',
  'Multi-Agent',
  'Obsidian',
  'Browser Automation',
  'Figma',
  'Python',
] as const;

export const AP_TITLE: Bi = {
  en: 'Article Pipeline',
  jp: 'Article Pipeline',
};

export const AP_SUBTITLE: Bi = {
  en: 'From rough notes to a draft on note and Medium, written by AI agents with separate roles.',
  jp: 'メモから、note と Medium の下書きまで。役割を分けた AI エージェントで記事を書く仕組み。',
};

export const AP_OVERVIEW: Bi[] = [
  {
    jp: '仕事の合間に書くので、記事を1本仕上げる時間がまとまって取れない。そこで、私はメモと判断だけを出し、構成・下書き・点検は AI に任せる仕組みを、Claude Code の上に作った。',
    en: 'I write between work, so I rarely have a solid block of time to finish an article. I built a setup on Claude Code where I only provide the notes and the decisions, and AI handles the structure, the draft and the review.',
  },
  {
    jp: '1つの AI に全部をやらせず、下書きを書く役と、それを点検する5つの役に分けた。役割ごとに手順書を書き、記憶は Obsidian のノートで共有する。役同士は会話せず、書いたものだけで引き継ぐ。',
    en: 'Instead of one AI doing everything, there is one role that drafts and five roles that review. Each role has its own written instructions, and they share memory through notes in Obsidian. The roles do not talk to each other; they hand off only through what is written down.',
  },
  {
    jp: 'note には日本語と英語を段落ごとに交互に並べて書き、Medium には同じ原稿から英語版を作って出す。どの記事も、公開のボタンを押すのは私だけにしている。',
    en: 'On note, Japanese and English alternate paragraph by paragraph. For Medium, an English version is made from the same draft. For every article, I am the only one who presses publish.',
  },
];

export const AP_STEPS: Array<{ icon: APStepIcon; label: Bi; title: Bi; body: Bi }> = [
  {
    icon: 'intent',
    label: { en: 'Intent', jp: '意図' },
    title: { en: 'Fix the intent first', jp: '意図を先に固める' },
    body: {
      jp: 'メモを読んだ AI が、目的、核になる主張、やらないこと、賞味期限の4行を出す。私が確かめるまで、下書きは始まらない。核がメモから読み取れないときは、推測で埋めずに質問させる。',
      en: 'The AI reads my notes and returns four lines: the purpose, the core claim, what the article will not do, and how long it should stay relevant. Drafting does not start until I confirm them. If the core cannot be found in the notes, it asks instead of guessing.',
    },
  },
  {
    icon: 'draft',
    label: { en: 'Draft', jp: '下書き' },
    title: { en: 'Draft from my own words', jp: '自分の言葉から下書きする' },
    body: {
      jp: '下書き役は、媒体ごとの形式で組み立てる。ゼロからは書かず、メモにある体験と言葉を使う。過去に自分で書いた記事から語り口を抜き出したノートを、毎回読ませている。',
      en: 'The drafting role builds the article in the format of each platform. It does not write from scratch; it works from the experiences and words in my notes. Every time, it reads a note that describes my voice, taken from articles I wrote myself.',
    },
  },
  {
    icon: 'review',
    label: { en: 'Review', jp: '点検' },
    title: { en: 'Five separate reviews', jp: '5つの点検を別々の役で' },
    body: {
      jp: '文体、内容の深さ、自分の声、賞味期限、AI らしい言い回しの5つを、別々の役が見る。直しが要る箇所は下書き役に戻し、2回直しても通らなければ私の判断に回す。',
      en: 'Five roles each check one thing: style, depth, my voice, whether it will still hold up later, and phrasing that sounds like AI. Anything that needs fixing goes back to the drafting role. If it still fails after two rounds, it comes to me.',
    },
  },
  {
    icon: 'lint',
    label: { en: 'Format check', jp: '機械検査' },
    title: { en: 'Check the format with a script', jp: '形式はスクリプトで検査する' },
    body: {
      jp: '目次、見出しの上の空行、リンクになっていない URL、画像のキャプションと代替テキストなど、決まった形式のルールは Python のスクリプトで検査する。AI の判断に任せず、エラーが0になるまで次に進まない。',
      en: 'Fixed format rules, such as the table of contents, the blank line above headings, URLs that are not links, and image captions and alt text, are checked by a Python script. These are not left to the AI’s judgment; the next step waits until there are zero errors.',
    },
  },
  {
    icon: 'editor',
    label: { en: 'Draft on note', jp: 'note に入力' },
    title: { en: 'Enter it into the editor', jp: 'エディタに入力する' },
    body: {
      jp: 'ブラウザを操作して、note のエディタに本文、画像、キャプション、リンクを入れ、公開設定まで入力する。サムネイルは、Figma に決めておいたルールに沿って作る。「投稿する」の手前で止め、押すのは私。',
      en: 'Through browser automation, it enters the text, images, captions and links into the note editor, and fills in the publishing settings. The thumbnail is made in Figma from a set of rules I defined. It stops right before the publish button, which I press myself.',
    },
  },
  {
    icon: 'recover',
    label: { en: 'Look back', jp: '回収' },
    title: { en: 'Collect what I changed', jp: '私が直した箇所を回収する' },
    body: {
      jp: '公開された記事を取得して、AI の原稿との差分を残す。公開の直前に私が直した箇所が、次のルールの材料になる。ルールに昇格させるかどうかは、私が決める。',
      en: 'After publishing, it fetches the live article and records the difference from the AI’s draft. What I changed just before publishing becomes material for the next rules. Whether a change becomes a rule is my decision.',
    },
  },
];

export const AP_ROLES: { ai: Bi[]; me: Bi[] } = {
  ai: [
    { jp: '構成と下書き', en: 'Structure and drafting' },
    { jp: '5つの点検と直し', en: 'The five reviews and the fixes' },
    { jp: '形式の検査', en: 'Format checks' },
    { jp: 'note への入力、サムネイル、公開設定', en: 'Entering it into note, the thumbnail and the publishing settings' },
    { jp: '公開後の差分の記録', en: 'Recording the changes after publishing' },
  ],
  me: [
    { jp: '書く素材と、記事の核', en: 'The notes, and the core of the article' },
    { jp: '固有名詞や事実の確認', en: 'Checking names and facts' },
    { jp: '公開（投稿のボタン）', en: 'Publishing (the button itself)' },
    { jp: '差分をルールにするかどうか', en: 'Whether a change becomes a rule' },
  ],
};

export const AP_LEARNINGS: Array<{ title: Bi; body: Bi }> = [
  {
    title: { jp: 'AI が膨らませた原稿は、使われなかった', en: 'The AI’s expanded drafts were not used' },
    body: {
      jp: 'ある記事で、公開版と2つの原稿を比べた。AI がエッセイの形に組み直した版との語の重なりは26%、メモに最小限の手を入れた版は45%だった。公開のときに、AI の構成は丸ごと捨てていた。それからは、メモをなるべくそのまま残す版を先に作るようにした。',
      en: 'For one article, I compared the published version with two drafts. It shared 26% of its words with the draft the AI had reshaped into an essay, and 45% with the draft that only lightly edited my notes. When publishing, I had thrown away the AI’s structure entirely. Since then, the lightly edited version comes first.',
    },
  },
  {
    title: { jp: '口で伝えたルールは、残らない', en: 'Rules said in conversation do not last' },
    body: {
      jp: '下書きや点検を担う役は、私との会話の記憶を読まない。だから新しいルールは、手順書か検査のスクリプトに書き込むまで、決まったとみなさないことにした。',
      en: 'The roles that draft and review do not read the memory of my conversations. So a new rule does not count as decided until it is written into the instructions or the check script.',
    },
  },
  {
    title: { jp: '入力の成功は、見た目では分からない', en: 'A successful edit can still be wrong' },
    body: {
      jp: 'ブラウザでの入力は、見た目では成功していても、別の場所を書き換えていることがあった。今は入力のたびに、リンク、段落、図の数を数えて、巻き込みを見つけている。',
      en: 'In the browser, an edit could look successful and still overwrite a different part of the article. Now every edit is followed by counting the links, paragraphs and figures, to catch anything it touched by mistake.',
    },
  },
];

export const AP_LINKS: Array<{ label: string; href: string }> = [
  { label: 'note', href: 'https://note.com/io_73' },
  { label: 'Medium', href: 'https://medium.com/@iori73' },
];
