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

## 技術スタック

| カテゴリ | 技術 | バージョン |
|---|---|---|
| フレームワーク | Next.js (App Router) | 15.5.9 |
| UI ライブラリ | React | 19.2.3 |
| 言語 | TypeScript | ^5 |
| スタイリング | Tailwind CSS | 3.4.17 |
| コンポーネント | shadcn/ui (Radix UI) | latest |
| i18n | next-intl | 4.5.5 |
| アニメーション | tailwindcss-animate | 1.0.7 |
| チャート | Recharts, Chart.js, D3 | - |
| 3D | Spline | 4.0.0 |
| アナリティクス | Vercel Analytics | 1.6.1 |
| デプロイ | Vercel | - |
| パッケージマネージャー | npm | - |

---

## 開発ワークフロー

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev

# 本番ビルド
npm run build

# リント
npm run lint
```

- 開発サーバー URL: `http://localhost:3000`

---

## ディレクトリ構造

```
portfolio/
├── CLAUDE.md                    # このファイル
├── progress.txt                 # 進捗追跡
├── lessons.md                   # 学びの記録
├── app/
│   ├── globals.css              # グローバルCSS・CSS変数・base layer
│   ├── layout.tsx               # ルートレイアウト
│   └── [locale]/                # ロケールベースルーティング (en, jp)
│       ├── layout.tsx           # ロケールレイアウト (Header, Footer)
│       ├── page.tsx             # Home
│       ├── not-found.tsx        # 404
│       ├── about/               # About ページ
│       ├── blog/                # Blog ページ
│       ├── cv/                  # CV ページ
│       ├── experiment/          # Experiment ページ
│       └── work/                # Work ケーススタディ
│           ├── ukiyoe/
│           ├── gym_crowd_status_dashboard/
│           └── google_ux_design_certificate_project/
├── components/
│   ├── ui/                      # shadcn/ui コンポーネント
│   └── work/                    # Work ページ専用コンポーネント
├── src/
│   ├── compositions/            # Header, Footer, BackToTopButton
│   ├── components/              # LanguageSwitcher
│   ├── contexts/                # MenuContext
│   ├── hooks/                   # useFonts, use-toast, use-mobile
│   ├── lib/                     # utils
│   ├── data/                    # cvData
│   └── figma/                   # Figma Code Connect
├── messages/                    # 翻訳ファイル (en.json, jp.json)
├── i18n/                        # next-intl 設定
├── public/                      # 静的アセット
├── docs/                        # プロジェクトドキュメント
│   ├── architecture/            # デザインシステム
│   ├── decisions/               # ADR (Architecture Decision Records)
│   ├── SCOPE.md                 # プロジェクトスコープ
│   ├── APP_FLOW.md              # ユーザーフロー・画面遷移
│   ├── TECH_STACK.md            # 技術スタック詳細
│   └── IMPLEMENTATION_PLAN.md   # 改善ロードマップ
└── _archive/                    # アーカイブ済みファイル
```

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

### インポート順序
1. 外部ライブラリ
2. 内部モジュール（`@/` エイリアス）
3. コンポーネント
4. 型定義

---

## デザイン/スタイル規約

> 詳細は [docs/architecture/design-system.md](docs/architecture/design-system.md) を参照。

### カラートークン（セマンティック）
| 用途 | Tailwind クラス | CSS 変数 |
|---|---|---|
| 見出し・主要テキスト | `text-ink` | `--ink: #0A0A0A` |
| 副次テキスト | `text-ink-secondary` | `--ink-secondary: #333333` |
| ラベル・キャプション | `text-ink-tertiary` | `--ink-tertiary: #71717a` |
| CTA テキスト | `text-ink-muted` | `--ink-muted: rgba(0,0,0,0.56)` |
| ページ背景 | `bg-surface` | `--surface: #fcfbfc` |
| タグ背景等 | `bg-surface-muted` | `--surface-muted: #f5f5f7` |
| コンテンツ区切り | `border-line-subtle` | `--line-subtle: #e4e4e7` |
| セクション区切り | `border-line-section` | `--line-section: #d4d4d8` |

### フォント
- **見出し（EN）**: Switzer Medium — `@layer base` で自動適用 (セルフホスト WOFF2, Fontshare)
- **見出し（JP）**: `${getHeadingFontClass()}` → `font-noto-sans-jp font-medium`
- **本文（EN）**: `${getBodyFontClass()}` → `font-helvetica-neue`
- **本文（JP）**: `${getBodyFontClass()}` → `font-noto-sans-jp font-light`
- **タグ・キャプション**: `font-space-grotesk`

### レスポンシブ
- **Mobile**: default (< 768px)
- **Desktop**: `md:` prefix (>= 768px)
- モバイルファーストで設計

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

---

## 参照ドキュメント

| ドキュメント | 役割 |
|---|---|
| **CLAUDE.md**（このファイル） | すべてのルールと参照を集約 |
| [SCOPE.md](docs/SCOPE.md) | 何を作るか（プロジェクト範囲） |
| [APP_FLOW.md](docs/APP_FLOW.md) | どう体験するか（画面遷移） |
| [TECH_STACK.md](docs/TECH_STACK.md) | 何で作るか（技術スタック詳細） |
| [design-system.md](docs/architecture/design-system.md) | どう見せるか（デザインシステム） |
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

### 2026-02-23: デザインシステム整理
- **問題**: インライン `fontFamily`/`fontWeight` style が各ページに散在し、`getHeadingFontClass()` と二重管理になっていた
- **教訓**: フォントスタイルは hooks（`useFonts.ts`）で一元管理し、インライン style は使わない
- **問題**: hardcoded hex カラーが散在（`#0A0A0A`, `#333333`, `#656d76` 等）
- **教訓**: セマンティックカラートークン（`text-ink`, `text-ink-secondary`）を優先使用する
