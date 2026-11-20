# 本番品質の基準（QA）

2026-11-20 作成。きっかけ: 中初のページが iPhone 13 で、左右に余白ができた（幅 390px の画面でページが 461px に広がっていた）。
目視と一部の幅だけの確認では見つからず、自動の検査も無かった。**「壊したくないものは、テストにする」** ために、基準と自動検査を置く。

出典は、実際に読んだページだけ。読めなかったものは末尾に「未検証」と書いた。

## 1. 自動検査（毎回かならず）

```bash
pnpm dev                                          # 別のターミナルで
pnpm qa:responsive                                # ローカル（localhost:3000）
BASE=https://iori-kawano.vercel.app pnpm qa:responsive   # 本番
BROWSER=webkit pnpm qa:responsive                 # iOS Safari に近い（要: playwright install webkit）
WIDTHS=320,390 ROUTES=/work/nakahatsu pnpm qa:responsive # 絞り込み
```

`scripts/qa-responsive.mjs` が、全ルート × 幅 {320, 360, 390, 430, 768, 1024} × {en, jp} で次を調べる。PR ごとに GitHub Actions（`qa-responsive.yml`）でも走る。

| 種類 | 扱い | 根拠 |
|---|---|---|
| 横スクロール（`scrollWidth > clientWidth`）。原因の要素も出す | **失敗** | WCAG 2.2 SC 1.4.10 Reflow |
| コンソールエラー、読み込み失敗、HTTP 4xx/5xx | **失敗** | Next.js 本番チェックリスト |
| 壊れた画像 | **失敗** | |
| viewport meta が拡大を禁止（`maximum-scale`, `user-scalable=no`） | **失敗** | web.dev Responsive basics |
| タップ目標が 24×24px 未満（文中リンクは除く） | 警告 | WCAG 2.2 SC 2.5.8 |
| 文字が枠で切れている可能性 | 警告（装飾の誤検知あり。`sr-only` は除外済み） | WCAG 2.2 SC 1.4.12 |

## 2. 原則と、このサイトでの確認方法

1. **320px 幅で縦スクロールだけで読める**（WCAG 1.4.10 Reflow）。→ 全ページで横スクロール 0。例外にできるのは図・表の内部だけ。
2. **文字を 200% にしても欠けない**（WCAG 1.4.4）。→ 固定の高さで文字を切らない。文字サイズに `vw` 単独を使わない。
3. **行間・字間を広げても崩れない**（WCAG 1.4.12。行間 1.5 倍・段落間 2 倍・字間 0.12 倍）。→ `overflow:hidden` の固定高さに注意。
4. **タップ目標**は最低 24px、重要なものは 44px 目安（WCAG 2.5.8 / 2.5.5）。
5. **viewport meta と固定幅を避ける**（web.dev）。`width=device-width, initial-scale=1`。画像は `max-width:100%`。固定 px 幅より `fr`・%・flex。
6. **ユーザーに見える挙動を、実ブラウザで**（Playwright Best Practices）。iOS 固有の問題は Chromium だけだと見落とすので、WebKit でも流す。
7. **視覚比較は、同じ環境で撮ったベースラインで**（Playwright Visual comparisons）。環境差で変わるので、同じ OS・ブラウザで生成する。
8. **壊したくないものはテストにする**（Software Engineering at Google 第11章、O'Reilly 刊。公開版: abseil.io/resources/swe-book）。性能・アクセシビリティも含む。不安定なテストは信頼を損なうので、再実行でごまかさない。
9. **E2E は高コストで壊れやすい**（同 第14章）。待ち時間（sleep）でなく、状態を待つ。本番の確認は読み取り専用にする。
10. **Core Web Vitals は実ユーザーの 75 パーセンタイルで見る**（web.dev）。LCP ≤ 2.5s、INP ≤ 200ms、CLS ≤ 0.1。ラボ値（Lighthouse）は目安。
11. **Next.js の本番前チェックリストに沿う**（nextjs.org/docs/app/guides/production-checklist）。画像・フォントのモジュール、メタデータ、CSP、環境変数。
12. **部品は、自分に渡された幅で振る舞う**（Android Developers, Support different screen sizes）。画面全体の幅だけで分岐しない。

## 3. 端末の幅（CSS px）

| 区分 | 幅×高さ | 根拠 |
|---|---|---|
| 最小ライン | 320×568 | WCAG Reflow / iPhone SE (1st) |
| 小型 | 375×667 | iPhone SE (3rd) |
| 標準 iPhone | 390×844 | iPhone 13・14 |
| 新型 iPhone | 393×852 | iPhone 15 |
| 大型 iPhone | 430×932 | iPhone Pro Max |
| Android の最頻 | 360×800, 384×832, 412×915 | StatCounter 2026-10 の世界集計（日本の分布ではない） |
| タブレット縦 | 768×1024, 834×1194 | iPad mini / iPad Pro 11 |
| 境界 | 639/640, 767/768, 1023/1024, 1279/1280 | Tailwind の sm / md / lg / xl（自サイトのサイドバーは 1280px 以上） |

数値は Playwright の端末定義と StatCounter に基づく近似値。Apple 公式の画面サイズ表は確認できていない。

## 4. リリースチェックリスト

**merge 前**
1. `pnpm build` が通る。型・lint エラーなし。
2. `pnpm qa:responsive` が失敗 0（CI でも自動）。
3. 新しい作品ページ・図は、**320px と 390px の実画面を見る**（スクリーンショット）。
4. 固定幅（`w-[NNNpx]`, `min-w-[NNNpx]`）を足したら、スマホで効いていないか確認する。
5. grid の1列（スマホ）は `grid-cols-1`（= `minmax(0,1fr)`）にする。中身が横に並ぶ部品は `flex-wrap` を付ける。
6. 動画は `ControlledVideo`。「動きを減らす」で自動再生しない。
7. 実機（iPhone Safari と Android Chrome）で、トップと最新の作品ページを1回スクロールして、横ブレがないか見る。
   iOS のラバーバンドは見かけだけの余白になることがある（CLAUDE.md の「測ってから直す」）。

**deploy 後（本番 URL で）**
8. 本番の主要 URL が 200。jp/en 両方で、新しいページの画像が出る。
9. `BASE=https://iori-kawano.vercel.app pnpm qa:responsive` を再実行する。コンソール・CSP エラー 0。
10. 問題が出たら、Vercel の直前のデプロイに戻せる状態にしておく。

## 5. レスポンシブの不具合の典型と原因

| 型 | 原因 |
|---|---|
| **grid / flex の min-content（今回の原因）** | flex・grid の子の自動最小幅は 0 ではなく中身の最小サイズ。中身に固定幅・長い単語・`nowrap`・横長の並びがあると、親より広くなる。MDN `min-width` で確認。対処は `minmax(0,1fr)`（`grid-cols-1`）、`min-w-0`、`flex-wrap`。 |
| 長い文字列 | URL・長い英単語が折り返されない。`break-all` / `break-words`。 |
| 固定幅 | px 固定の列・パネル。%・`fr`・flex にする。 |
| 幅なし画像 | `max-width:100%` が無い画像・動画が列を超える。 |
| `100vw` | スクロールバー込みの幅。`100%` を使う（一般知識。出典は未確認）。 |
| `100vh` と iOS Safari | ツールバーで下が隠れる。`svh` / `dvh` を使う（MDN length で確認）。 |
| `position:fixed` と `transform` | 祖先に `transform` / `filter` があると、fixed の基準がその祖先になる（MDN position で確認）。 |
| 文字サイズの自動拡大 | `text-size-adjust`。全体に `none` は使わない（MDN）。 |

## 6. 未検証のもの

- Apple HIG（Layout / Safe areas / Dynamic Type）: ページから本文が取れなかった。HIG の個別の数値は、このファイルでは根拠にしていない。
- Material 3 の画面幅の区分: ページが 404。
- `100vw` とスクロールバー、`viewport-fit=cover` と safe area、`min-width:0` の効果: MDN の該当ページに記述がなく、一般知識として扱った。
- 書籍『Release It!』（Pragmatic Bookshelf）、『Accelerate』（IT Revolution）: 読んでいないので引用していない。
- iPhone 実機の画面サイズ表（Apple 公式）、Google Testing Blog、web.dev の Lighthouse 解説: 取得していない。
