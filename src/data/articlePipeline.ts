/**
 * Article Pipeline — /experiment/article-pipeline の内容。
 *
 * note / Medium の記事を、メモから下書きまで AI エージェントで進める仕組み（個人の ai-ops リポジトリ）。
 * 事実は 2026-11-23 に ai-ops の手順書（content-pipeline / note コマンド / note エディタの手順 /
 * note-lint / 公開版の回収スクリプト）と、Figma「Thumbnail/Icon」の README・rules v3 で裏取りしたもの。
 * - 仕事の情報・他人の名前は載せない（サムネの型の見本に人名が入っているので、型は図で描き直している）
 * - 記事の本数など、数字として見せる段階にない指標は載せない
 * - 日本語は敬体（2026-11-23 河野さんの指示）
 */

import type { Bi } from '@/src/data/bilingualBooks';

export type APStepIcon = 'intent' | 'draft' | 'review' | 'lint' | 'editor' | 'recover';

export const AP_IMG = '/experiment/article-pipeline';

export const AP_TAGS = ['Claude Code', 'Multi-Agent', 'Browser Automation', 'Figma', 'Python'] as const;

export const AP_TITLE: Bi = {
  en: 'Article Pipeline',
  jp: 'Article Pipeline',
};

export const AP_SUBTITLE: Bi = {
  en: 'From rough notes to a draft on note and Medium, written by AI agents with separate roles.',
  jp: 'メモから、note と Medium の下書きまで。役割を分けた AI エージェントで記事を書く仕組みです。',
};

export const AP_OVERVIEW: Bi[] = [
  {
    jp: '仕事の合間に書くので、記事を1本仕上げる時間がまとまって取れません。そこで、私はメモと判断だけを出し、構成・下書き・点検は AI に任せる仕組みを、Claude Code の上に作りました。',
    en: 'I write between work, so I rarely have a solid block of time to finish an article. I built a setup on Claude Code where I only provide the notes and the decisions, and AI handles the structure, the draft and the review.',
  },
  {
    jp: '1つの AI に全部をやらせず、下書きを書く役と、それを点検する5つの役に分けました。役割ごとに手順書を書き、私の語り口や作業の引き継ぎは、共有のノート（Markdown のファイル）に残します。役同士は会話せず、書いたものだけで引き継ぎます。',
    en: 'Instead of one AI doing everything, there is one role that drafts and five roles that review. Each role has its own written instructions, and my voice and the handoffs between tasks live in shared notes (Markdown files). The roles do not talk to each other; they hand off only through what is written down.',
  },
  {
    jp: 'note には日本語と英語を段落ごとに交互に並べて書き、Medium には同じ原稿から英語版を作って出します。どの記事も、公開のボタンを押すのは私だけです。',
    en: 'On note, Japanese and English alternate paragraph by paragraph. For Medium, an English version is made from the same draft. For every article, I am the only one who presses publish.',
  },
];

export const AP_STEPS: Array<{ icon: APStepIcon; label: Bi; title: Bi; body: Bi }> = [
  {
    icon: 'intent',
    label: { en: 'Intent', jp: '意図' },
    title: { en: 'Fix the intent first', jp: '意図を先に固める' },
    body: {
      jp: 'メモを読んだ AI が、目的、核になる主張、やらないこと、賞味期限の4行を出します。私が確かめるまで、下書きは始まりません。核がメモから読み取れないときは、推測で埋めずに質問させています。',
      en: 'The AI reads my notes and returns four lines: the purpose, the core claim, what the article will not do, and how long it should stay relevant. Drafting does not start until I confirm them. If the core cannot be found in the notes, it asks instead of guessing.',
    },
  },
  {
    icon: 'draft',
    label: { en: 'Draft', jp: '下書き' },
    title: { en: 'Draft from my own words', jp: '自分の言葉から下書きする' },
    body: {
      jp: '下書き役は、媒体ごとの形式で組み立てます。ゼロからは書かず、メモにある体験と言葉を使います。過去に自分で書いた記事から語り口を抜き出したノートを、毎回読ませています。',
      en: 'The drafting role builds the article in the format of each platform. It does not write from scratch; it works from the experiences and words in my notes. Every time, it reads a note that describes my voice, taken from articles I wrote myself.',
    },
  },
  {
    icon: 'review',
    label: { en: 'Review', jp: '点検' },
    title: { en: 'Five separate reviews', jp: '5つの点検を別々の役で' },
    body: {
      jp: '文体、内容の深さ、自分の声、賞味期限、AI らしい言い回しの5つを、別々の役が見ます。直しが要る箇所は下書き役に戻し、2回直しても通らなければ私の判断に回します。',
      en: 'Five roles each check one thing: style, depth, my voice, whether it will still hold up later, and phrasing that sounds like AI. Anything that needs fixing goes back to the drafting role. If it still fails after two rounds, it comes to me.',
    },
  },
  {
    icon: 'lint',
    label: { en: 'Format check', jp: '機械検査' },
    title: { en: 'Check the format with a script', jp: '形式はスクリプトで検査する' },
    body: {
      jp: '目次、見出しの上の空行、リンクになっていない URL、画像のキャプションと代替テキストなど、決まった形式のルールは Python のスクリプトで検査します。AI の判断には任せず、エラーが0になるまで次に進みません。',
      en: 'Fixed format rules, such as the table of contents, the blank line above headings, URLs that are not links, and image captions and alt text, are checked by a Python script. These are not left to the AI’s judgment; the next step waits until there are zero errors.',
    },
  },
  {
    icon: 'editor',
    label: { en: 'Draft on note', jp: 'note に入力' },
    title: { en: 'Enter it into the editor', jp: 'エディタに入力する' },
    body: {
      jp: 'ブラウザを操作して、note のエディタに本文、画像、キャプション、リンクを入れ、公開設定まで入力します。サムネイルは、Figma に作っておいた型とルールに沿って作ります（下の具体例）。「投稿する」の手前で止め、押すのは私です。',
      en: 'Through browser automation, it enters the text, images, captions and links into the note editor, and fills in the publishing settings. The thumbnail is made from a template and rules I set up in Figma (see the example below). It stops right before the publish button, which I press myself.',
    },
  },
  {
    icon: 'recover',
    label: { en: 'Look back', jp: '回収' },
    title: { en: 'Collect what I changed', jp: '私が直した箇所を回収する' },
    body: {
      jp: '公開された記事を取得して、AI の原稿との差分を残します。公開の直前に私が直した箇所が、次のルールの材料になります。ルールに昇格させるかどうかは、私が決めます。',
      en: 'After publishing, it fetches the live article and records the difference from the AI’s draft. What I changed just before publishing becomes material for the next rules. Whether a change becomes a rule is my decision.',
    },
  },
];

/**
 * 具体例: サムネイル。事実の出典は Figma「Thumbnail/Icon」(t1TmZXTMJG8QpnIyEwnXBu) の
 * 00 Index / README（§3 新しい記事のサムネを作る・§5 rules v3 要約）と、家紋の記事の STATUS.md。
 * 完成品は 02 Covers の部品 1471:1075（2026-11-21 公開の note 記事の表紙）を書き出したもの。
 * 型の枠の位置は rules v3 の版面（1280×670）の値を % にしたもの。
 */
export const AP_THUMB = {
  heading: { en: 'Example: a thumbnail', jp: '具体例: サムネイル' } as Bi,
  lead: {
    jp: 'サムネイルを例に、私が渡すもの、AI がすること、私が仕上げることを並べました。型は Figma に部品として作ってあり、AI は記事の中身をその型にはめ込みます。',
    en: 'Using a thumbnail as an example, here is what I hand over, what the AI does, and what I finish myself. The template is a component in Figma, and the AI fits the article into it.',
  } as Bi,
  input: {
    title: { jp: '私が渡すもの', en: 'What I hand over' } as Bi,
    body: {
      jp: '記事の原稿だけです。カテゴリや画像を指定したいときだけ、一言添えます。',
      en: 'Only the article. I add a word only when I want a specific category or image.',
    } as Bi,
  },
  fill: {
    title: { jp: 'AI が型にはめ込む', en: 'The AI fills in the template' } as Bi,
    templateCaption: {
      jp: 'Figma の型。版面は 1280×670 で、4つの枠の位置と大きさ、文字の大きさが決まっています。',
      en: 'The template in Figma. The canvas is 1280×670, and the position and size of the four slots and the type sizes are fixed.',
    } as Bi,
  },
  /** 枠の位置（%）は rules v3: Eyebrow (48,48) / 題字 (48,128) / 副題 / 図版 506×506 を (707,80) */
  slots: [
    {
      label: { jp: 'カテゴリ', en: 'Category' } as Bi,
      rule: { jp: '記事の分野から、9種類のうち1つか2つを選びます', en: 'Pick one or two of nine, based on the topic' } as Bi,
      value: { jp: 'DESIGN', en: 'DESIGN' } as Bi,
      box: { left: 3.75, top: 7, width: 15, height: 7 },
    },
    {
      label: { jp: '題字', en: 'Title' } as Bi,
      rule: { jp: '記事のタイトルです。改行の位置も決めます', en: 'The article title, with line breaks placed by hand' } as Bi,
      value: { jp: '家紋と紋章は、似ているのか', en: '家紋と紋章は、似ているのか (Do kamon and heraldry look alike?)' } as Bi,
      box: { left: 3.75, top: 19, width: 45, height: 25 },
    },
    {
      label: { jp: '副題', en: 'Subtitle' } as Bi,
      rule: { jp: '本文から一番強い一文を、そのまま引用します。要約はしません', en: 'Quote the strongest sentence from the body as it is. No summarizing' } as Bi,
      value: {
        jp: '別々に、似た働きの答えを生んだのかもしれない。',
        en: '別々に、似た働きの答えを生んだのかもしれない。 (They may have arrived at answers that work alike, separately.)',
      } as Bi,
      box: { left: 3.75, top: 48, width: 38, height: 14 },
    },
    {
      label: { jp: '図版', en: 'Image' } as Bi,
      rule: { jp: '使ってよいことを確かめた画像を探し、出典とライセンスを記録します', en: 'Find images that may be reused, and record the source and license' } as Bi,
      value: {
        jp: '下がり藤の家紋と、12世紀のエナメル板',
        en: 'A Japanese family crest and a 12th-century enamel plaque',
      } as Bi,
      box: { left: 55.25, top: 12, width: 39.5, height: 75.5 },
    },
  ],
  finish: {
    title: { jp: '私が仕上げる', en: 'What I finish myself' } as Bi,
    items: [
      {
        jp: '題字と副題の書体を、游ゴシックに差し替えます。AI の作業環境には游ゴシックがないので、仮の書体で置かれています',
        en: 'Swap the title and subtitle to Yu Gothic. The AI’s environment does not have that typeface, so it places a stand-in',
      },
      { jp: '図版の縁の色を決めます。図版から採った明るい色が基本です', en: 'Decide the color of the image frame, usually a light color taken from the image' },
      {
        jp: '記事を公開します。公開後は、AI が公開済みの一覧に移し、赤い枠の印を付けます',
        en: 'Publish the article. Afterwards, the AI moves the thumbnail to the published list and marks it with a red frame',
      },
    ] as Bi[],
    imageAlt: {
      jp: '完成したサムネイル。左に「DESIGN」のカテゴリ、題字「家紋と紋章は、似ているのか」と副題、右に家紋と中世の紋章の画像が並んでいます。',
      en: 'The finished thumbnail: the DESIGN category, a Japanese title and subtitle on the left, and a family crest beside a medieval coat of arms on the right.',
    } as Bi,
    caption: {
      jp: '完成したサムネイル（2026年11月に公開した note 記事の表紙）。',
      en: 'The finished thumbnail, used as the cover of a note article published in November 2026.',
    } as Bi,
    credit:
      'Images: Sagarifuji crest, Hakko-daiodo, CC BY-SA 4.0, via Wikimedia Commons / Enamel effigy of Geoffrey Plantagenet, public domain, via Wikimedia Commons',
  },
};

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
    { jp: 'サムネイルの書体の差し替えと、縁の色', en: 'The thumbnail’s typeface and frame color' },
    { jp: '公開（投稿のボタン）', en: 'Publishing (the button itself)' },
    { jp: '差分をルールにするかどうか', en: 'Whether a change becomes a rule' },
  ],
};

export const AP_LEARNINGS: Array<{ title: Bi; body: Bi }> = [
  {
    title: { jp: 'AI が膨らませた原稿は、使われませんでした', en: 'The AI’s expanded drafts were not used' },
    body: {
      jp: 'ある記事で、公開版と2つの原稿を比べました。AI がエッセイの形に組み直した版との語の重なりは26%、メモに最小限の手を入れた版は45%でした。公開のときに、AI の構成は丸ごと捨てていたことになります。それからは、メモをなるべくそのまま残す版を先に作るようにしています。',
      en: 'For one article, I compared the published version with two drafts. It shared 26% of its words with the draft the AI had reshaped into an essay, and 45% with the draft that only lightly edited my notes. When publishing, I had thrown away the AI’s structure entirely. Since then, the lightly edited version comes first.',
    },
  },
  {
    title: { jp: '口で伝えたルールは、残りません', en: 'Rules said in conversation do not last' },
    body: {
      jp: '下書きや点検を担う役は、私との会話の記憶を読みません。そのため、新しいルールは、手順書か検査のスクリプトに書き込むまで、決まったとみなさないことにしました。',
      en: 'The roles that draft and review do not read the memory of my conversations. So a new rule does not count as decided until it is written into the instructions or the check script.',
    },
  },
  {
    title: { jp: '入力の成功は、見た目では分かりません', en: 'A successful edit can still be wrong' },
    body: {
      jp: 'ブラウザでの入力は、見た目では成功していても、別の場所を書き換えていることがありました。今は入力のたびに、リンク、段落、図の数を数えて、巻き込みを見つけています。',
      en: 'In the browser, an edit could look successful and still overwrite a different part of the article. Now every edit is followed by counting the links, paragraphs and figures, to catch anything it touched by mistake.',
    },
  },
];

export const AP_LINKS: Array<{ label: string; href: string }> = [
  { label: 'note', href: 'https://note.com/io_73' },
  { label: 'Medium', href: 'https://medium.com/@iori73' },
];
