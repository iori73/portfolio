# APP_FLOW.md - Portfolio

> ユーザーフローと画面遷移の定義。

---

## ルーティング構造

```
/                          → /(locale) にリダイレクト
/en                        → Home（英語）
/jp                        → Home（日本語）
/en/about                  → About
/en/blog                   → Blog
/en/cv                     → CV
/en/experiment             → Experiment
/en/work/ukiyoe            → Work: Ukiyoe
/en/work/figma-plugins     → Work: Figma Plugins & Widgets
/en/work/nakahatsu         → Work: 中初商店 ウェブサイト制作
/en/work/airline-design-system → Work: Airline Design System（Home からの導線なし）
/en/work/gym_crowd_status_dashboard  → Work: Gym Dashboard（Home からの導線なし）
/en/work/google_ux_design_certificate_project → Work: Google UX（Home からの導線なし）
/(any invalid path)        → 404 Not Found
```

- `[locale]` は `en` または `jp`
- ミドルウェアがブラウザの言語設定に基づいてリダイレクト
- ヘッダーの言語切替で EN ↔ JP を切り替え

---

## 主要なユーザーフロー

### 1. プロジェクト閲覧フロー（最重要）

```
Home → Work カード選択 → Work 詳細ページ → セクション間スクロール
                                           → サイドバーナビでジャンプ
                                           → 「サイトを見る」CTA で外部リンク
                                           → GitHub リポジトリリンク
```

### 2. プロフィール確認フロー

```
Home → About → 興味分野の可視化
            → CV（職務経歴詳細）
```

### 3. ブログ閲覧フロー

```
Home or Header → Blog → Medium 記事リンク（外部サイト）
```

### 4. 実験コンテンツ閲覧フロー

```
Header → Experiment → Spline 3D インタラクション
```

---

## ページ構成

### Home (`/[locale]`)
- ヒーローセクション
- プロジェクトカード一覧（portfolio_row）
- プロフィール概要

### About (`/[locale]/about`)
- 自己紹介テキスト
- InterestsVisualization（インタラクティブ可視化）

### Work 詳細 (`/[locale]/work/[project]`)
- ヒーロー画像（全幅 or max-w-7xl）
- プロジェクト情報（Timeline, Skills, Type, Deliverables）
- メインコンテンツ + サイドバーナビ（デスクトップのみ）
- セクション: Overview → Design Process → Solution → Reflection
  （`SECTIONS = ['overview','design-process','solution','reflection']`。
  airline-design-system / nakahatsu が現行の書き方。古いページは構成が異なる）

### Blog (`/[locale]/blog`)
- Medium 記事一覧（RSS 連携）

### CV (`/[locale]/cv`)
- 職務経歴・スキル一覧

### Experiment (`/[locale]/experiment`)
- Spline 3D コンテンツ

---

## 共通 UI 要素

### Header
- ロゴ / サイト名
- ナビゲーション（Home, About, Work, Blog, Experiment）
- 言語切替（EN / JP）
- モバイル: ハンバーガーメニュー

### Footer
- ソーシャルリンク
- コピーライト

### BackToTopButton
- スクロール位置に応じて表示
- クリックでページ先頭へスムーススクロール
