# 本番検証レポート — 2026-07-28

対象: https://iori-kawano.vercel.app/
デプロイ: `main` @ `b16a636`（PR #35 + #36 反映済み）
検証方法: Playwright で全ページを実巡回。各ページをフルスクロールして遅延読み込み画像を発火させ、`naturalWidth === 0`（＝読み込み失敗）の画像を検出。Blog は RSS API のレスポンスとキャッシュヘッダも確認。

---

## 今回直したこと（このラウンド）

| 分類 | 内容 | ユーザーに見える？ |
|---|---|---|
| 🖼 画像 WebP 化（全体） | 123枚を WebP に変換。合計 **101MB → 10MB（−90%）** | ○ 表示は同じ・読み込みが軽い |
| ⚡ Blog エッジキャッシュ | `/api/articles` を `no-store` → `stale-while-revalidate` に。CDN配信 | ○ 再訪・低速回線で速い |
| 🧹 未参照ファイル削除 | placeholder 5枚（v0雛形の残骸）を削除 | ✕ 内部整理 |
| 📦 依存の整理 | `@figma/code-connect` を本番依存から除外 | ✕ 内部・出荷サーフェス縮小 |
| 📝 設定の明文化 | `images.unoptimized` を維持する理由をコメント化 | ✕ 内部 |

> ナビ●カラー、CTA（黒地・白文字）、Podcastのスマホ表示、公式カバー修正は前ラウンド（PR #34）で反映済み。

---

## ライブ検証結果 — 全ページ画像チェック

| ページ | 画像数 | WebP | 壊れ画像 | 判定 |
|---|---:|---:|---:|:--:|
| Home (`/`) | 5 | 4 | 0 | ✅ |
| Work › Ukiyoe | 44 | 43 | 0 | ✅ |
| Work › Gym Dashboard | 9 | 1※ | 0 | ✅ |
| Work › Google UX | 38 | 37 | 0 | ✅ |
| Work › Airline Design System | 8 | 7 | 0 | ✅ |
| Work › Figma Plugins | 10 | 9 | 0 | ✅ |
| About | 3 | 1 | 0 | ✅ |
| Experiment | 7 | 0※ | 0 | ✅ |
| Blog | 7 | — | 0 | ✅ |

※ WebP以外の内訳はすべて正常な非対象:
- **Gym**: インラインSVGチャート／データ図（画像ファイルでない）
- **Experiment**: 番組カバーは `podcast-notes.json` 内の**外部CDN URL**（mzstatic.com 等）。ローカル資産ではないので対象外。Favorite Visuals セクションは非表示化済みのため `favorite_visuals.webp` は非描画
- **About**: D3のInterests可視化はSVG描画（imgでない）

**結論: 全9ページで壊れ画像ゼロ。WebP化は完全に成功。**

---

## Blog エッジキャッシュ検証

`/api/articles` を実際に叩いて確認:

| 項目 | 値 | 意味 |
|---|---|---|
| HTTP status | `200` | 正常 |
| 記事取得数 | `6` | note.com RSS 正常取得 |
| `x-vercel-cache` | **`HIT`** | **Vercelエッジから配信＝関数起動なし。今回の改善が実働** |
| `cache-control` | `public` | キャッシュ許可（変更前は `no-store` だった） |

**結論: エッジキャッシュ改善が本番で実働（`HIT`）。**

---

## SP（モバイル 390×844）検証

各ページを iPhone 幅（390px）にリサイズして再巡回。**横スクロール発生（`scrollWidth − viewport`）** と **ビューポート幅を超える要素** を検出＝レイアウト崩れの機械的チェック。

| ページ | 横あふれ | 崩れ要素 | 壊れ画像 | 判定 |
|---|---:|---:|---:|:--:|
| Home | 0px | 0 | 0 | ✅ |
| Podcast Notes 一覧（223件） | 0px | 0 | 1※ | ✅ |
| Work › Ukiyoe | 0px | 0 | 0 | ✅ |
| Work › Gym（チャート/表） | 0px | 0 | 0 | ✅ |
| Blog | 0px | 0 | 0 | ✅ |

**Podcast SP レイアウト（前ラウンド修正の実機確認）**: スクリーンショットで確認済み。
- カテゴリチップが**1行横スクロール**（All / Technology / Design & Art … 右端で見切れ＝スクロール可）
- "All Podcasts" Select が**独立した2行目・全幅**で画面外にはみ出さない
- エピソードカードが崩れず整列

→ C1（フィルタ高さ）/ C2（Select はみ出し）の修正が本番で正しく効いている。

※ **要注意（今回のスコープ外・既知の外部データ問題）**: Podcast 一覧の223カバーのうち**1件だけ画像が壊れ**。
- 番組「神保町で会いましょう」、URL `https://i.scdn.co/image/ab676563...`（**Spotify CDN**）
- 原因: `public/data/podcast-notes.json` 内の外部Spotifyカバーがホットリンク失敗（404/ブロック）。**今回のWebP/perf作業とは無関係**。
- 対処案: 該当エントリのカバーを iTunes 由来の公式カバーに再解決（`scripts/backfill-podcast-covers.js` の仕組みで1件だけ差し替え可能）。要望があれば対応します。

---

## 確認チェックリスト（すべて✅）

**画像表示**
- [x] Home — Workカードのサムネイル全表示
- [x] About — 丸いプロフィール写真
- [x] Work › Ukiyoe — ヒーロー・作品・団子・工程画像（44枚）
- [x] Work › Gym Dashboard — ヒーロー・図版
- [x] Work › Google UX — スクリーンショット群（38枚）
- [x] Work › Airline Design System — 競合分析・ロードマップ
- [x] Work › Figma Plugins — プラグインカバー
- [x] Experiment — 番組カバー（外部CDN）正常

**機能**
- [x] Blog — 記事6件表示、RSS正常、エッジキャッシュHIT
- [x] 壊れ画像ゼロ（全ページ）
- [x] EN ルーティング正常（`/en/...` → 正しいページ）

---

## 補足: 手動でも確認したい場合

ブラウザで ⌘⇧R（強制リロード）してから各ページを開き、画像が欠けていないか目視。特に Ukiyoe（画像最多）と Google UX を見れば十分。Blog は2回開くと2回目が体感で速い（エッジキャッシュ）。
