# 中初商店ケーススタディ: 引き継ぎ（2026-10-28 時点）

別のセッションが、この状況から話を始められるようにするための記録。前の記録は `docs/session-2026-10-26-nakahatsu-case-study.md`。
注意: 先方の打ち合わせの引用を含む「根拠台帳」は、公開リポジトリに置かない。Desktop の `~/Desktop/nakahatsu-portfolio-preview/claims-ledger.md` にだけある。

## 1. いま何をしているか（一言）
中初商店（株式会社中初商店。個人受託の Shopify サイト）のケーススタディを、採用担当向けに書き直している。**メインは、Figma の SY型・日本語版・PC（`287:363`）**。河野さんが Figma の注釈でフィードバックを付け、私（Claude）が読んで、Figma（4枚）とサイトのページを同じ作業で直す。公開（push・merge）は、先方サイトの公開と、先方の一言の書面 OK のあと。

## 2. どこに何があるか
| もの | 場所 |
|---|---|
| コード（ローカルのみ） | worktree `~/dev/portfolio/.claude/worktrees/nakahatsu-case-study-v2`、ブランチ `worktree-nakahatsu-case-study-v2`（origin/main より 56 コミット先。**push していない**） |
| プレビュー | `pnpm exec next dev -p 3007 -H localhost`（`127.0.0.1` はループする）。詳しい版 `/jp/work/nakahatsu`、SY型 `/jp/work/nakahatsu-sy`（noindex）、takram型 `/jp/work/nakahatsu-story`（noindex） |
| 文言 | `messages/jp.json`・`messages/en.json` の `nakahatsu`（詳しい版）、`nakahatsuSy`（SY型。Figma と同じ文言）、`nakahatsuStory`（takram型） |
| Figma（メイン） | ファイル `portfolio_v5`（キー `0GbJ6ClSo6FMFwXMuqIYXx`）、ページ「Pages」`22:7`。SY型: JP PC `287:363`（メイン）、JP SP `287:610`、EN PC `288:363`、EN SP `288:610`。ラベル `288:844`、リクルーター評価 `291:363`、退避枠（外した小節）`304:363` |
| Figma（参考） | 詳しい版: JP `240:237`/`240:485`、EN `229:161`/`229:238`。takram型: `276:359` ほか4枚。トップのカード: `240:727`/`240:778`/`233:163`/`233:355` |
| 主要画面の一覧画像 | JP 編集可 `300:363`、EN 編集可 `332:363`、使い方5パターン `333:363`。ファイル `public/work/nakahatsu/overview-{jp,en}.webp`（ページには未組み込み） |
| 参考作品の台帳 | Figma「Screenshots」ファイル `gB4fyjgiJ4HIKJPlhB3q9P`、ページ「01 Web」、セクション「Portfolio & Studios」、ノード `40001269:131`。DB は `~/dev/figma-screenshots-library/db/seed_sy_reference.sql`（commit・push は河野さんの操作待ち） |
| Desktop の資料 | `~/Desktop/nakahatsu-portfolio-preview/`: 回答シート（PDF・HTML）、文章比較.html、リクルーター評価、先方への依頼文（長い版と短い版・PDF 添付）、先方に見せる資料（掲載予定のページ）.pdf、claims-ledger.md |
| 二拠点デイリーボード | artifact `https://claude.ai/artifact/MeCh5hpRWGgAQy3j8b5f2Z`、項目 `portfolio-case-study-decisions-2026-10-26` |
| 撮影・合成スクリプト | `scripts/capture-nakahatsu-screens.mjs`、`capture-nakahatsu-overview.mjs`（`NAKAHATSU_LANG_PREFIX=/en` で英語）、`compose-nakahatsu-overview.mjs`、`record-nakahatsu-motion.mjs`。認証情報は gitignore 済みの `.nakahatsu-capture.env` のみ |
| 既存 Work を SY型に直す agent | `.claude/agents/sy-case-study-converter.md`（次のセッションから呼べる） |

## 3. 決まったこと
- **SY型で進める**（Overview → Process（番号付き小節＋図）→ Status → Credit。文体は です・ます調）。詳しい版と takram型は参考として残す（事実の訂正以外は触らない）。歴史の小節は重要度が低いので SY型から外し、退避枠に保管。
- **Figma の注釈レビュー（2026-10-28）を反映済み**: Role は「サイトデザイン」、期間は「2026年3月〜10月」、AI の併用・先方の窓口・自動翻訳の段落・Status の節・Credit の AI の行は外した（Status は退避枠に保管）。「私」→「河野いおり」、「先方」→「中初商店」。5つ目の節は、チェックアウトの青の話を外し、臙脂の説明＋値の同期＋3色のパレット（臙脂・墨茶・和紙）。3つの言語の図にフランス語を追加。3つ目の節（About とトップ）は、旧サイトと新サイトを並べた観察（Figma `346:363`）からの**下書き**で、河野さんの確認待ち。Thumbnail は、撮影を3倍にして撮り直し、Figma には PNG で入れ直した。
- 人物の写真・動画は載せない。「43件・204画面」は SY型に足さない。日付は、読み手に要らないものを削る（月数表記は控えめ）。
- 先方への依頼は **PDF 添付の短い文面**（長い文面も残す）。パスワード付きの公開は、リポジトリが公開のため、しない。
- Figma の作り方: 幅は Fill / Hug（固定幅にしない）。メタ4項目は、PC は横一列、SP は 2×2。
- **Figma とサイトは常に同期**（片方を直したら、同じ作業でもう片方も直し、サイトの表示を確認する）。

## 4. 守るルール
- push・merge・PR をしない（リポジトリ `iori73/portfolio` は公開。push は実質の公開）。
- 主張は一次資料で確認できたものだけ。帰属を区別（私／先方／既存／AI）。EN の em dash 禁止、「complete/delivered」禁止、Lighthouse の数値禁止。
- 参考にした作り手の個人名を、コマンド・コード・ファイル名・コミットメッセージ・レイヤー名に入れない（「SY型」と書く）。
- ストア URL・管理画面 URL・パスワード・人物写真・「Sample」透かしの写真・住所入りの地図は、図にも記録にも入れない。

## 5. 未了と次にやること
1. 河野さんが `287:363` に Figma の注釈を付ける → 注釈を読んで、Figma 4枚とサイトを直す（文言を変えたら、比較表と PDF も作り直す）。
2. 主要画面の画像の使い先を決める（5パターン `333:363`。私のおすすめは A「冒頭に大きな1枚」）。
3. 先方へ書面 OK を送る（PDF 添付の短い版）。返事のスクリーンショットを残す。
4. 台帳の commit・push（河野さんの操作）。
5. 3つ目の節（About とトップ）の下書きを、河野さんが読んで、注釈で直す。
6. 河野さんの言葉が必要なもの: ログイン確認の日時・環境、先方の活動の具体、公開後の指標を先方と合意するか。
7. 既存の Work（ukiyoe など）を SY型に直す（agent を使う）。
8. 公開の日: 先方の OK を確認 → `/work/nakahatsu` を目視 → push → Vercel プレビュー → merge（merge が公開）。

## 6. 検証の目安
`pnpm build` は dev サーバーを止めてから。`tsc` は、既存の d3 / podcast-notes / i18n エラー以外が出ないこと。1440px・768px・390px で横スクロールが出ないこと。`pnpm lint` は main でも壊れている。
