# CLAUDE.md - Portfolio

> このファイルは AI（Claude / Cursor）がプロジェクトを理解し、一貫した開発を行うためのガイドラインです。
> セッション開始時に自動的に読み込まれます。

---

## セッション初期化プロトコル

1. **このファイル（CLAUDE.md）を読む**
2. **[progress.txt](progress.txt) を読む** — 現在の進捗と次のタスクを把握
3. **[lessons.md](lessons.md) を読む** — 過去の失敗パターンを確認

---

## プロジェクト概要

Iori Kawano の個人ポートフォリオサイト。バイリンガル（EN/JP）対応で、デザインと開発のケーススタディを掲載。

- **ライブURL**: Vercel にデプロイ（`main` ブランチへの push で自動デプロイ）
- **リポジトリ**: https://github.com/iori73/portfolio.git
- **ステータス**: 運用中

---

## コーディング規約

### 命名規則
- **ファイル**: kebab-case (`user-profile.tsx`) — ただし既存の snake_case パス（`gym_crowd_status_dashboard`）は維持
- **コンポーネント**: PascalCase (`UserProfile`)
- **関数・変数**: camelCase (`getUserData`)
- **型/インターフェース**: PascalCase (`ApiResponse`)

### コンポーネント規約
- 関数コンポーネント + Hooks を使用
- `components/ui/` は shadcn/ui のコンポーネント（手動編集は最小限に）
- ページ固有のコンポーネントは Work ページ内に直接配置されることがある

### スタイリング規約
- **Tailwind CSS** を使用（CSS Modules は不使用）
- インライン `style={{ fontFamily: '...' }}` は禁止 → `getHeadingFontClass()` / `getBodyFontClass()` を使用
- デザイントークンは [design-system.md](docs/architecture/design-system.md) に従う
- セマンティックカラートークン（`text-ink`, `bg-surface-muted`, `border-line-section`）を優先使用

### 作品ページの共通部品（新しい作品でも必ず使う）
- **背景**: `app/[locale]/work/layout.tsx` が work/ 配下の全ページを白（`--background`）にする。作品ページ側で背景を決めない。ページ最上部の余白は `mt-[var(--site-header-height)]`（ヘッダーとヒーローの間に隙間を作らない）。
- **メタ情報**（Timeline / My Skills / Type / Deliverables）: 自分で `grid` を組まず `src/components/work/WorkMetaGrid.tsx` を使う。lg 以上は、いちばん長い値の列だけが縮み、短い値が1文字だけ折り返すのを防ぐ（余裕がないときは均等4列に戻る）。
- **日本語の折り返し**: 日本語は単語の途中でも折れ、「リング」だけが次の行に残ることがある。狭い列（メタ情報・短い説明・見出し）で気になる文言は、`messages/*.json` の折り返したい位置に `¦`（U+00A6）を書く。表示は `softBreaks()`（`src/lib/softBreaks.tsx`。`WorkMetaGrid` は内部で使用）。`¦` を含む文言は `¦` と空白の位置でだけ折れる。1つの区切りは列の幅（1024px 以上で約 240px ≒ 全角 11 文字）に収める。本文の長い段落には使わない。例: `"UI、コンテキスト¦エンジニアリング"`。
- **本文の枠と側面メニュー（サイドバー）**: 本文は `src/components/work/WorkShell.tsx` で包み、`sidebar` に `WorkSidebar` を渡す。寸法は全作品で同じ（本文 最大1088px + 間隔40px + サイドバー200px。サイドバーは 1280px 以上の画面だけ）。サイドバーの見た目・動き（文字サイズ 15px、現在の節の強調、小見出しは開いている節の下にだけ。切り替わりは 300ms の濃さ・3px の横移動・小見出しの開閉で、太さは変えない。「動きを減らす」では動かさない）は `WorkSidebar` に1つだけ持つ。ページごとにサイドバーの幅や文字サイズを決めない。項目の文言は、本文の見出しと同じ翻訳キーから出す（直書きしない）。JP のページは日本語、EN は英語。各項目の `id` は本文の節・見出しの `id` と同じ（`scroll-mt-28` 以上）。
- **図**: ① 前後の図は、2枚の画像と、間の矢印を `BeforeAfterPair` + `LineArrow`（実線の矢印）で組む。画像1枚に矢印・ラベルを焼き込まない。矢印は全て実線（点線・破線の矢印は使わない。Figma も同じ）。② 文字・数値・色が内容の図（デザインシステム、色見本、構造図）は画像にせず、コードで組む（`DesignSystemFigure` など）。③ 図の見出し（タイトルに当たる文字）は `text-body`（約17px）以上、説明は `text-body-sm`（約14px）以上。13px 以下にしない。
- **動画・録画**: 繰り返し再生する動画は、`<video>` を直接置かず `ControlledVideo` を使う。左下に一時停止/再生ボタンが付き、「動きを減らす」設定の人には自動再生しない（利用者が止められないループ動画は置かない。WCAG 2.2.2）。先方の写真や人物が写る素材は、公開前に先方の許可が要る。

---

## デザイン/スタイル規約

> カラートークン・フォント・レスポンシブブレークポイントの詳細は [docs/architecture/design-system.md](docs/architecture/design-system.md) を参照。

---

## i18n（国際化）

- `next-intl` を使用（ロケール: `en`, `jp`）
- 翻訳ファイル: `messages/en.json`, `messages/jp.json`
- ミドルウェアで自動ロケール検出
- `useTranslations()` フックでアクセス
- `useLocale()` で現在のロケールを取得
- フォント切り替えは `src/hooks/useFonts.ts` で管理

---

## プロジェクト固有のルール

### ファイル削除ポリシー
- **ユーザーの明示的な許可なくファイルを削除しない**

### 破壊的変更の禁止
- ユーザー向け機能を削除・無効化する変更は禁止
- データフィールドの削除は禁止（追加・修正は許可）
- 既存の動作を変更する場合は事前にユーザーへ確認を取る

### 確認が必要な操作
- 新規パッケージの追加 → TECH_STACK.md に記載のないものは確認
- デザイントークンの変更 → design-system.md との整合性確認
- コンポーネントの props やインターフェースの変更
- ファイル構造の大幅な変更

### ページの役割分担（重複を作らない）
- **`/cv`** — 経歴・スキルの唯一の表示先。ソースは `src/data/cvData.ts`（PDF生成も同じソース）
- **`/about`** — 人物と関心（Hero + My Interests）。**経歴・スキルを再掲しない**。
  CV への導線を置くだけにする（2026-08-03 に重複を解消済み。再び生やさないこと）

### 見た目の不具合は測ってから直す
「余白がある」「はみ出している」等の実機報告は、CSS を足す前に必ず数値で切り分ける。
`document.documentElement.scrollHeight` と対象要素の実座標を測れば、DOM に実体があるのか
レンダリング上の錯覚（iOS のラバーバンド等）なのかが1回で確定する。詳細は lessons.md 参照。

---

## プロジェクト情報データソース

CV・職歴・スキル・作品の唯一のデータソースは **`src/data/cvData.ts`** である。`/cv` ページと PDF（ポートフォリオデック・レジュメ）はすべてここから生成される。片方だけ直すことはできない構造になっている。

> `/about` も以前はここから Career / Skills を描画していたが、`/cv` との完全な重複だったため
> 2026-08-03 に削除した。上の「ページの役割分担」を参照。

- クライアント実名は使わず、`label` の業界ラベル（Airline / Construction Tech 等）で匿名化する
- レジュメPDF は生成時に `scripts/generate-portfolio-pdf.mjs` のクライアント名デニーリストで検証される
- 職歴を追加したら `app/print/` の各ページが職歴IDを直書きしている点に注意。
  どのページにも属さないエントリは PDF からサイレントに消える（2026-08-03 に実際に起きた）

かつて `src/data/projects.json`（`Documents/work/projects.json` のコピー）を参照する運用だったが、**このファイルは存在しない**（`.gitignore` 済み）。機密を含むため公開リポジトリには置かない方針。仕事PC側のマスターを参照する必要がある場合は、必要な情報だけを手で `cvData.ts` に転記する。

---

## 参照ドキュメント

| ドキュメント | 役割 |
|---|---|
| **CLAUDE.md**（このファイル） | すべてのルールと参照を集約 |
| [cvData.ts](src/data/cvData.ts) | 経歴・スキル・作品の唯一のデータソース（/cv・/about・PDF が共有） |
| [SCOPE.md](docs/SCOPE.md) | 何を作るか（プロジェクト範囲） |
| [APP_FLOW.md](docs/APP_FLOW.md) | どう体験するか（画面遷移） |
| [TECH_STACK.md](docs/TECH_STACK.md) | 何で作るか（技術スタック詳細） |
| [design-system.md](docs/architecture/design-system.md) | どう見せるか（デザインシステム） |
| [design-commands-guide.md](docs/design-commands-guide.md) | カスタムコマンドの使い方ガイド |
| [IMPLEMENTATION_PLAN.md](docs/IMPLEMENTATION_PLAN.md) | 改善ロードマップ |
| [progress.txt](progress.txt) | 現在地の記録 |
| [lessons.md](lessons.md) | 学びの蓄積 |
| [docs/decisions/](docs/decisions/) | ADR（設計判断の記録） |

### CLAUDE.md は生きたドキュメント
- AI が間違いを犯し、ユーザーが修正した場合 → CLAUDE.md を更新して再発防止
- 新しいパターンや規約が確立された場合 → CLAUDE.md に追記

---

## デザイン原則参照

### 参照ガイドライン
- **Apple Human Interface Guidelines (HIG)** — タッチターゲット、光学サイズ調整、spring animation
- **Google Material Design 3** — Type roles、tonal palette、state layer、duration tokens
- **Spotify Encore Design System** — 単一タイプスケール、レスポンシブ CSS 変数、ミニマルパレット
- **書籍**: Design That Scales, The Elements of UX, データ可視化の基本が全部わかる本

### カスタムコマンド
| コマンド | 用途 |
|---|---|
| `/design-review [file]` | 特定ファイルのデザインシステム準拠チェック |
| `/design-audit` | コードベース全体の違反検出 |
| `/design-ref [topic]` | デザイン原則の深掘り検索（メモリ + docs + 書籍） |
| `/component-scaffold [name]` | 規約準拠の新コンポーネント生成 |

### メモリファイル（自動ロード）
トピック別のデザイン原則がプロジェクトメモリに保存されている。HIG/MD3/Encore の原則をプロジェクトのトークンにマッピングした知識ベース。コード生成時に自動参照される。

---

## 過去の学び

> 詳細は [lessons.md](lessons.md) を参照。
