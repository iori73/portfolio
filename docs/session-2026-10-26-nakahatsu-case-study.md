# 引き継ぎ: 中初ケーススタディ v2（2026-10-26）

## 状態
- ローカルのみ。**未 push・未 merge**。origin/main `f74a32a` 基準
- ブランチ: `worktree-nakahatsu-case-study-v2`
- worktree: `~/dev/portfolio/.claude/worktrees/nakahatsu-case-study-v2`
- 旧ブランチ `worktree-nakahatsu-case-study`（旧 worktree は `~/Documents/portfolio/.claude/worktrees/nakahatsu-case-study`、
  登録が壊れていて**修復していない**）は残してある。読むときは `git show <branch>:<path>`
- `pnpm build` 通過（42ページ）。`pnpm lint` は main でも失敗（lessons.md 参照）

## プレビュー
```
cd ~/dev/portfolio/.claude/worktrees/nakahatsu-case-study-v2
pnpm exec next dev -p 3007 -H localhost
```
- EN: http://localhost:3007/work/nakahatsu　JP: http://localhost:3007/jp/work/nakahatsu
- カード: `/` と `/jp`
- **`localhost` を使う。`127.0.0.1` はリダイレクトループ**
- 公開後の文言を見る: `NAKAHATSU_LAUNCHED=1` を付けて起動
- 代替のスクショ: `~/Desktop/nakahatsu-portfolio-preview/`

## コミット（`git log origin/main..HEAD`）
- 追加分: About 図版 / 現行テーマからの撮り直し + 撮影スクリプト / CV エントリ / 本文書き直し / layout メタデータ・sitemap・OG・`<a href>` カード
- 旧ブランチから cherry-pick 11件: 初版追加、事実誤り訂正、a11y、監査記録、図版撮り直し、公開後の自動切替 など
- 本書を含む docs コミット

## ファイルマップ
| 場所 | 内容 |
|---|---|
| `app/[locale]/work/nakahatsu/{page,layout}.tsx`, `NakahatsuCaseStudy.tsx` | ページ本体・メタデータ |
| `src/lib/nakahatsuLaunch.ts` | 公開判定（判定不能は未公開に倒す。6時間 revalidate） |
| `src/data/siteRoutes.ts` | `CARD_WORK_SLUGS`（カードとサイトマップ） |
| `messages/{en,jp}.json` | `nakahatsu.*`, `projects.nakahatsu` |
| `src/data/cvData.ts` | `project-nakahatsu`（業界ラベルで匿名） |
| `public/work/nakahatsu/*.webp`, `public/og/nakahatsu.jpg` | 図版・OG |
| `scripts/capture-nakahatsu-figures.mjs`, `docs/nakahatsu-figures.md` | 撮影手順 |

## 決めたこと（既定値。覆してよい）
- 図版は現行ライブテーマから 2026-10-25/26 に撮り直し
- CV は業界ラベルで匿名。実名はケーススタディページにだけ出る
- カードは `<a href>`（`useWorkCardLink`）、`nakahatsu` は `CARD_WORK_SLUGS` に入れた
- 本文は採用レビュワー向けに書き直し。Lighthouse は載せない

## 河野の判断待ち
1. CV に実名を出すか業界ラベルのままか（出す場合 `/cv` から名前付きページへリンクするか）
2. 旧 worktree 登録の修復（`git worktree repair`）
3. 公開後の図版自動更新（案: 週次で `isNakahatsuLaunched` を確認 → 公開済みなら撮影スクリプトを `https://nakahatsu.jp` に対し実行 → ローカル commit → 通知。スケジュールは未作成）
4. 契約事実の確認: 個人名義の請負 / 海外販売は範囲外 / 23節・商品12・区画10・パス7・指摘43・引き継ぎ13ページ（未検証）
5. oidemashi / FR / SP の About 図版（未撮影）

## 公開するとき
- 条件: クライアントサイト公開後に本人 GO
- **カードとサイトマップは公開状態でゲートされていない。merge = 公開**。`isNakahatsuLaunched()` が切り替えるのは本文の3か所だけ
- 手順: 実サイト（`SITE_URL`）を開いて確認 → `NAKAHATSU_LAUNCHED=1` で公開後の描画を確認 → push → PR → merge（Vercel 自動デプロイ）

## 図版の撮り直し
- 環境変数 `NAKAHATSU_STORE_URL` / `NAKAHATSU_STORE_PASSWORD`、または gitignore 済みの `.nakahatsu-capture.env`
- `node scripts/capture-nakahatsu-figures.mjs`（詳細は `docs/nakahatsu-figures.md`）
- 公開後はヒーローのスライド番号の固定値の見直しが要る場合がある

## 独立監査の結果
独立の監査役（書いた側の結論を見せずに実施）の結果。blocker 0。

**修正済み**（commit 046c8d8）
- 品質の記述: 「7回の監査で43件を処理」は根拠なし → 2026年5月の監査で43件検出、テーマ側で直せる High に対応、に訂正。「別のレビュー担当者」は人ではなく独立した AI セッションだったので明記。
- About の範囲: F 案はトップの「中初商店について」ブロック、天祐の2か所は About ページ、に書き分け。
- 公開前は nakahatsu.jp が旧 WordPress のままなので、「サイトを見る」ボタンと商品図版のリンクは公開判定が真のときだけ出す。
- 図版の alt を日英で出し分け。EN の「finished」「done」を「carried this far」「handled」に。メール2時間の件は「3月の監査の時点」と日付を付与。

**確認済み**: 数値（23セクション・12商品・10配送ゾーン・13ページ・oidemashi 2.7秒/319×380・トークン 120/72 ほか）、em dash なし、Lighthouse 数値なし、完了/納品/帰属の語なし、開発ストアURL・パスワード・テーマID・プレビューバー・IG写真帯・Sample透かしが図版・ソース・git履歴にない、画像寸法と props 一致、title/canonical/hreflang/og、sitemap、/cv は業界ラベルのみ。push なし。

**未解決（河野さんの判断・公開前）**
- 契約 第8条（秘密保持）と第7条3項（実績使用の許諾）。実名掲載・旧サイトの課題の記述・未承認の再設計の掲載について、先方から一行の書面OKをもらうのが安全。契約書が2通（`x業務委託契約書_中初商店.pdf` と通常版）あり、どちらが署名版か要確認。
- 実名は全ページの RSC/messages に載る（/cv のソースにも出る）。公開前に deploy しない前提でのみ許容。
- docs/nakahatsu-figures.md に旧サイトの商品価格や「オーナーの肖像」「Instagram 由来」の記述がある（低リスク。必要なら削る）。
- 未確認の事実: 契約の署名版の内容（個人名義・1人体制・海外販売は対象外）。
- 未監査: コントラスト比・キーボード/スクリーンリーダー・FR の内容。
