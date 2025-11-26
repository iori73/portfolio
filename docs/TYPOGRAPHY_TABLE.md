# 全ページタイポグラフィ詳細テーブル（意味別分類）

このドキュメントは、ポートフォリオサイト全体のテキスト要素をページごと、意味的な役割別にまとめたテーブルです。

**最終更新: 2025-01-17 (フォントシステム最適化 - Helvetica Neue 統一、クラスベース実装)**

---

## 📄 トップページ (`/`) size check ✅

| 意味的な分類             | クラス名                                                               | フォントサイズ (SP) | フォントサイズ (PC) | フォントファミリー            | フォントウェイト           | 行間 (SP) | 行間 (PC) | 使用箇所                                        |
| ------------------------ | ---------------------------------------------------------------------- | ------------------- | ------------------- | ----------------------------- | -------------------------- | --------- | --------- | ----------------------------------------------- |
| ページタイトル           | `text-heading-3xl md:text-heading-4xl`                                 | 48px                | 56px                | Helvetica Neue (デフォルト)   | 500 (medium) (デフォルト)  | 1.2       | 1.2       | "Iori Kawano"                                   |
| ヒーロー説明文（英語）   | `text-body-lg md:text-body-xl` + Helvetica Neue (インライン)           | 21px                | 24px                | Helvetica Neue                | 400 (normal)               | 1.4       | 1.4       | "Curiosity drives my work and life." 等         |
| ヒーロー説明文（日本語） | `text-body-base md:text-body-lg font-noto-sans-jp font-light`          | 18px                | 21px                | Noto Sans JP                  | 300 (light)                | 1.4       | 1.4       | "好奇心が私の仕事と人生を動かしています。" 等   |
| セクションタイトル       | `text-heading-2xl md:text-heading-3xl`                                 | 40px                | 48px                | Helvetica Neue (デフォルト)   | 500 (medium) (デフォルト)  | 1.2       | 1.2       | "Work"                                          |
| プロジェクトタイトル     | `text-heading-xl md:text-heading-2xl`                                  | 32px                | 40px                | Helvetica Neue (デフォルト)   | 500 (medium) (デフォルト)  | 1.2       | 1.2       | プロジェクト名（Work セクション内）             |
| プロジェクト説明（大）   | `text-body-lg md:text-body-xl` + 言語対応フォント                      | 21px                | 24px                | Helvetica Neue / Noto Sans JP | 400 (normal) / 300 (light) | 1.4       | 1.4       | プロジェクトの最初の説明文                      |
| プロジェクト説明（小）   | `jpFontSize('text-body-base', 'text-body-lg', ...)` + 言語対応フォント | 18px                | 21px                | Helvetica Neue / Noto Sans JP | 400 (normal) / 300 (light) | 1.4       | 1.4       | プロジェクトの 2 行目以降の説明文（日本語対応） |
| タグ                     | `text-body-base md:text-body-lg font-space-mono`                       | 18px                | 21px                | Space Mono                    | 400 (normal)               | 1.4       | 1.4       | "UI", "Research", "UX" 等                       |

---

## 📄 About ページ (`/about`) size check ✅

| 意味的な分類       | クラス名                                          | フォントサイズ (SP) | フォントサイズ (PC) | フォントファミリー            | フォントウェイト           | 行間 (SP) | 行間 (PC) | 使用箇所           |
| ------------------ | ------------------------------------------------- | ------------------- | ------------------- | ----------------------------- | -------------------------- | --------- | --------- | ------------------ |
| ページタイトル     | `text-heading-3xl md:text-heading-4xl`            | 48px                | 56px                | Helvetica Neue (デフォルト)   | 500 (medium) (デフォルト)  | 1.2       | 1.2       | "Iori Kawano"      |
| 説明文 1           | `text-body-lg md:text-body-xl` + 言語対応フォント | 21px                | 24px                | Helvetica Neue / Noto Sans JP | 400 (normal) / 300 (light) | 1.4       | 1.4       | 最初の説明文       |
| 説明文 2           | `text-body-lg md:text-body-xl` + 言語対応フォント | 21px                | 24px                | Helvetica Neue / Noto Sans JP | 400 (normal) / 300 (light) | 1.4       | 1.4       | 2 番目の説明文     |
| セクションタイトル | `text-heading-2xl md:text-heading-3xl`            | 40px                | 48px                | Helvetica Neue (デフォルト)   | 500 (medium) (デフォルト)  | 1.2       | 1.2       | "My Interests"     |
| 興味の説明         | `text-body-lg md:text-body-xl` + 言語対応フォント | 21px                | 24px                | Helvetica Neue / Noto Sans JP | 400 (normal) / 300 (light) | 1.4       | 1.4       | 興味に関する説明文 |

---

## 📄 Experiment ページ (`/experiment`) size check ✅

| 意味的な分類       | クラス名                                          | フォントサイズ (SP) | フォントサイズ (PC) | フォントファミリー            | フォントウェイト           | 行間 (SP) | 行間 (PC) | 使用箇所                     |
| ------------------ | ------------------------------------------------- | ------------------- | ------------------- | ----------------------------- | -------------------------- | --------- | --------- | ---------------------------- |
| ページタイトル     | `text-heading-3xl md:text-heading-4xl`            | 48px                | 56px                | Helvetica Neue (デフォルト)   | 500 (medium) (デフォルト)  | 1.2       | 1.2       | "Experiment"                 |
| 説明文             | `text-body-lg md:text-body-xl` + 言語対応フォント | 21px                | 24px                | Helvetica Neue / Noto Sans JP | 400 (normal) / 300 (light) | 1.4       | 1.4       | ページの説明文               |
| セクションタイトル | `text-heading-2xl md:text-heading-3xl`            | 40px                | 48px                | Helvetica Neue (デフォルト)   | 500 (medium) (デフォルト)  | 1.2       | 1.2       | "Podcast Notes"              |
| プロジェクト説明   | `text-body-base md:text-body-lg` + 言語対応フォント | 18px                | 21px                | Helvetica Neue / Noto Sans JP | 400 (normal) / 300 (light) | 1.4       | 1.4       | Podcast Notes の説明文       |
| タグ               | `text-body-base font-space-mono`                  | 18px                | 18px                | Space Mono                    | 400 (normal)               | 1.4       | 1.4       | "Business", "#technology" 等 |
| 補足テキスト       | `text-body-base`                                  | 18px                | 18px                | デフォルト                    | 400 (normal)               | 1.4       | 1.4       | "and more!"                  |
| ボタンテキスト     | `text-body-lg md:text-body-xl font-semibold`      | 21px                | 24px                | デフォルト                    | 600 (semibold)             | 1.4       | 1.4       | "Go to page"                 |

### Experiment/spline.tsx (Favorite Visuals)

| 意味的な分類         | クラス名                                                                | フォントサイズ (SP) | フォントサイズ (PC) | フォントファミリー            | フォントウェイト           | 行間 (SP) | 行間 (PC) | 使用箇所                   |
| -------------------- | ----------------------------------------------------------------------- | ------------------- | ------------------- | ----------------------------- | -------------------------- | --------- | --------- | -------------------------- |
| プロジェクトタイトル | `text-heading-2xl md:text-heading-3xl`                                  | 40px                | 48px                | Helvetica Neue (デフォルト)   | 500 (medium) (デフォルト)  | 1.2       | 1.2       | "Favorite Visuals"         |
| 説明文               | `text-body-base md:text-body-lg` + 言語対応フォント                     | 18px                | 21px                | Helvetica Neue / Noto Sans JP | 400 (normal) / 300 (light) | 1.4       | 1.4       | プロジェクトの説明文       |
| 引用文 (blockquote)  | `text-body-sm md:text-body-base` + 言語対応フォント + `italic`          | 16px                | 18px                | Helvetica Neue / Noto Sans JP | 400 (normal) / 300 (light) | 1.4       | 1.4       | 注意書き・引用文           |
| ボタンテキスト       | `text-body-lg md:text-body-xl font-semibold`                            | 21px                | 24px                | デフォルト                    | 600 (semibold)             | 1.4       | 1.4       | "Go to page"               |

---

## 📄 Blog ページ (`/blog`)

| 意味的な分類           | クラス名                                                                           | フォントサイズ (SP) | フォントサイズ (PC) | フォントファミリー            | フォントウェイト           | 行間 (SP) | 行間 (PC) | 使用箇所                     |
| ---------------------- | ---------------------------------------------------------------------------------- | ------------------- | ------------------- | ----------------------------- | -------------------------- | --------- | --------- | ---------------------------- |
| セクションタイトル     | `text-heading-2xl md:text-heading-3xl`                                             | 40px                | 48px                | Helvetica Neue (デフォルト)   | 500 (medium) (デフォルト)  | 1.2       | 1.2       | "note", "Medium"             |
| 記事タイトル（note）   | `text-body-lg md:text-body-xl`                                                     | 21px                | 24px                | Helvetica Neue (デフォルト)   | 500 (medium) (デフォルト)  | 1.4       | 1.4       | note 記事のタイトル          |
| 記事タイトル（Medium） | `text-heading-base`                                                                | 24px                | 24px                | Helvetica Neue (デフォルト)   | 500 (medium) (デフォルト)  | 1.2       | 1.2       | Medium 記事のタイトル        |
| 記事公開日（note）     | `jpFontSize('text-caption-lg', 'text-caption-xl')`                                 | 18px                | 21px                | デフォルト                    | 400 (normal)               | 1.2       | 1.2       | note 記事の公開日            |
| 記事公開日（Medium）   | `jpFontSize('text-caption-xl', 'text-caption-2xl')`                                | 21px                | 24px                | デフォルト                    | 400 (normal)               | 1.2       | 1.2       | Medium 記事の公開日          |
| 記事説明文             | `tracking-[0.2px] jpFontSize('text-body-sm', 'text-body-base')` + 言語対応フォント | 16px                | 18px                | Helvetica Neue / Noto Sans JP | 400 (normal) / 300 (light) | 1.4       | 1.4       | 記事の説明文（HTML、note）   |
| 記事サマリー           | `tracking-[0.2px] jpFontSize('text-body-sm', 'text-body-base')` + 言語対応フォント | 16px                | 18px                | Helvetica Neue / Noto Sans JP | 400 (normal) / 300 (light) | 1.4       | 1.4       | Medium 記事のサマリー        |
| ボタンテキスト         | `text-body-lg md:text-body-xl font-semibold`                                       | 21px                | 24px                | デフォルト                    | 600 (semibold)             | 1.4       | 1.4       | "Go to note", "Go to Medium" |

### 📝 標準仕様との差異と理由

#### 記事タイトル（h3）

- **標準仕様**: `text-heading-xl md:text-heading-2xl` (SP 32px / PC 40px) - ランディングページの h3
- **Blog ページ**:
  - note: `text-body-lg md:text-body-xl` (SP 21px / PC 24px)
  - Medium: `text-heading-base` (SP/PC 24px)
- **理由**: 記事タイトルが複数並ぶ一覧表示のため、標準の 32px（SP）だと視覚的に大きすぎて重く感じられる。SP時は21px、PC時は24pxにすることで、スマートフォンでの可読性と視覚的なバランスを向上。note と Medium でクラス名が異なるが、PC時は同じ 24px。

#### 記事説明文・記事サマリー

- **標準仕様**: `jpFontSize('text-body-sm', 'text-body-lg')` (SP 16px / PC 21px) - Work 詳細ページの本文
- **Blog ページ**: `jpFontSize('text-body-sm', 'text-body-base')` (SP 16px / PC 18px) + `tracking-[0.2px]` + 言語対応フォント
- **理由**:
  - PC サイズを 18px にすることで、記事一覧での視覚的なバランスを改善。21px だと説明文が大きすぎて、タイトルとの階層関係が崩れる。
  - `tracking-[0.2px]` と言語対応フォントを追加することで、Work 詳細ページの本文と同じスタイルに統一し、サイト全体の一貫性を保つ。
  - note の記事説明文には`line-clamp-4`を適用し、4 行で統一することで全ての記事カードの高さを揃えている。

---

## 📄 Work 詳細ページ (`/work/*`)

| 意味的な分類             | クラス名                                                        | フォントサイズ (SP) | フォントサイズ (PC) | フォントファミリー            | フォントウェイト           | 行間 (SP) | 行間 (PC) | 使用箇所                                        |
| ------------------------ | --------------------------------------------------------------- | ------------------- | ------------------- | ----------------------------- | -------------------------- | --------- | --------- | ----------------------------------------------- |
| プロジェクトタイトル     | `text-heading-2xl md:text-heading-3xl`                          | 40px                | 48px                | Helvetica Neue (デフォルト)   | 500 (medium) (デフォルト)  | 1.2       | 1.2       | プロジェクトのメインタイトル                    |
| プロジェクト説明         | `text-body-lg md:text-body-xl` + 言語対応フォント               | 21px                | 24px                | Helvetica Neue / Noto Sans JP | 400 (normal) / 300 (light) | 1.4       | 1.4       | プロジェクトの説明文                            |
| セクションタイトル（h2） | `text-heading-xl md:text-heading-2xl`                           | 32px                | 40px                | Helvetica Neue (デフォルト)   | 500 (medium) (デフォルト)  | 1.2       | 1.2       | メインセクションタイトル（TLDR、Overview 等）   |
| サブセクション（h3）     | `text-heading-base md:text-heading-xl`                          | 24px                | 32px                | Helvetica Neue (デフォルト)   | 500 (medium) (デフォルト)  | 1.2       | 1.2       | サブセクションタイトル                          |
| 本文                     | `jpFontSize('text-body-sm', 'text-body-lg')` + 言語対応フォント | 16px                | 21px                | Helvetica Neue / Noto Sans JP | 400 (normal) / 300 (light) | 1.4       | 1.4       | 本文テキスト（日本語対応）                      |
| サブ説明文               | `text-body-base md:text-body-lg` + 言語対応フォント             | 18px                | 21px                | Helvetica Neue / Noto Sans JP | 400 (normal) / 300 (light) | 1.4       | 1.4       | 補足説明文                                      |
| メタ情報ラベル           | `text-caption-lg font-space-mono font-semibold`                 | 18px                | 18px                | Space Mono                    | 600 (semibold)             | 1.2       | 1.2       | "Timeline", "My Skills", "Type", "Deliverables" |
| ボタンテキスト           | `text-body-lg md:text-body-xl font-semibold`                    | 21px                | 24px                | デフォルト                    | 600 (semibold)             | 1.4       | 1.4       | "Go to site" 等                                 |

---

## 🧭 共通コンポーネント

### Header

| 意味的な分類                      | クラス名                                                 | フォントサイズ (SP) | フォントサイズ (PC) | フォントファミリー | フォントウェイト | 行間 (SP) | 行間 (PC) | 使用箇所                       |
| --------------------------------- | -------------------------------------------------------- | ------------------- | ------------------- | ------------------ | ---------------- | --------- | --------- | ------------------------------ |
| ナビゲーションリンク（SP）        | `text-body-3xl font-merriweather`                        | 32px                | 32px                | Merriweather       | 400/600 (動的)   | 1.4       | 1.4       | メニュー項目（Work, About 等） |
| ナビゲーションリンク（PC）        | `text-body-xl font-helvetica-neue font-normal/font-bold` | 24px                | 24px                | Helvetica Neue     | 400/700 (動的)   | 1.4       | 1.4       | メニュー項目（Work, About 等） |
| ナビゲーションリンク（PC active） | `text-body-xl font-helvetica-neue font-bold`             | 24px                | 24px                | Helvetica Neue     | 700 (bold)       | 1.4       | 1.4       | アクティブなメニュー項目       |
| 言語切り替えボタン（SP）          | `text-body-xl font-merriweather`                         | 24px                | 24px                | Merriweather       | 400/600 (動的)   | 1.4       | 1.4       | "EN", "JP"                     |
| 言語切り替えボタン（PC）          | `text-body-xl font-helvetica-neue font-light/font-bold`  | 24px                | 24px                | Helvetica Neue     | 300/700 (動的)   | 1.4       | 1.4       | "EN", "JP"                     |
| 言語切り替えボタン（PC active）   | `text-body-xl font-helvetica-neue font-bold`             | 24px                | 24px                | Helvetica Neue     | 700 (bold)       | 1.4       | 1.4       | アクティブな言語               |
| 言語切り替えボタン（PC inactive） | `text-body-xl font-helvetica-neue font-light`            | 24px                | 24px                | Helvetica Neue     | 300 (light)      | 1.4       | 1.4       | 非アクティブな言語             |

### Footer

| 意味的な分類     | クラス名                                               | フォントサイズ (SP) | フォントサイズ (PC) | フォントファミリー | フォントウェイト | 行間 (SP) | 行間 (PC) | 使用箇所                                         |
| ---------------- | ------------------------------------------------------ | ------------------- | ------------------- | ------------------ | ---------------- | --------- | --------- | ------------------------------------------------ |
| コピーライト     | `text-caption-sm md:text-caption-base font-space-mono` | 14px                | 16px                | Space Mono         | 400 (normal)     | 1.164     | 1.164     | "@ 2025 Iori Kawano"                             |
| フッターテキスト | `text-caption-sm md:text-caption-base font-space-mono` | 14px                | 16px                | Space Mono         | 400 (normal)     | 1.164     | 1.164     | 凡例テキスト（"Each size = how often I use" 等） |

**注意**: 凡例テキストは、日本語が選択されている場合は日本語で表示されます。

---

## 🧩 共通 UI コンポーネント

### Button

| 意味的な分類 | クラス名                                     | フォントサイズ (SP) | フォントサイズ (PC) | フォントファミリー | フォントウェイト | 行間 (SP) | 行間 (PC) | 使用箇所                          |
| ------------ | -------------------------------------------- | ------------------- | ------------------- | ------------------ | ---------------- | --------- | --------- | --------------------------------- |
| ボタン       | `text-body-lg md:text-body-xl font-semibold` | 21px                | 24px                | Helvetica Neue     | 600 (semibold)   | 1.4       | 1.4       | "Go to site", "View Prototype" 等 |

**注意**: ボタンテキストは常に英語で表示されます。

### Form Elements

| 意味的な分類     | クラス名                                                      | フォントサイズ (SP) | フォントサイズ (PC) | フォントファミリー                  | フォントウェイト | 行間 (SP) | 行間 (PC) | 使用箇所                 |
| ---------------- | ------------------------------------------------------------- | ------------------- | ------------------- | ----------------------------------- | ---------------- | --------- | --------- | ------------------------ |
| フォームラベル   | `text-body-sm font-normal`                                    | 16px                | 16px                | Helvetica Neue / Noto Sans JP Light | 400 (normal)     | 1.4       | 1.4       | フォーム入力ラベル       |
| 入力テキスト     | `text-body-sm md:text-base font-normal`                       | 16px                | 18px                | Helvetica Neue / Noto Sans JP Light | 400 (normal)     | 1.4       | 1.4       | 入力フィールド内         |
| プレースホルダー | `text-body-sm md:text-base placeholder:text-muted-foreground` | 16px                | 18px                | Helvetica Neue / Noto Sans JP Light | 400 (normal)     | 1.4       | 1.4       | プレースホルダーテキスト |
| エラーメッセージ | `text-body-sm font-normal text-destructive`                   | 16px                | 16px                | Helvetica Neue / Noto Sans JP Light | 400 (normal)     | 1.4       | 1.4       | エラー表示               |

### Alert / Notification

| 意味的な分類     | クラス名                                     | フォントサイズ (SP) | フォントサイズ (PC) | フォントファミリー                      | フォントウェイト | 行間 (SP) | 行間 (PC) | 使用箇所           |
| ---------------- | -------------------------------------------- | ------------------- | ------------------- | --------------------------------------- | ---------------- | --------- | --------- | ------------------ |
| アラートタイトル | `text-body-sm md:text-body-lg font-semibold` | 16px                | 21px                | Helvetica Neue / Noto Sans JP Semi Bold | 600 (semibold)   | 1.4       | 1.4       | アラートのタイトル |
| アラート説明     | `text-body-sm font-normal`                   | 16px                | 16px                | Helvetica Neue / Noto Sans JP Light     | 400 (normal)     | 1.4       | 1.4       | アラートの説明文   |

### Tooltip

| 意味的な分類 | クラス名                   | フォントサイズ (SP) | フォントサイズ (PC) | フォントファミリー                  | フォントウェイト | 行間 (SP) | 行間 (PC) | 使用箇所             |
| ------------ | -------------------------- | ------------------- | ------------------- | ----------------------------------- | ---------------- | --------- | --------- | -------------------- |
| ツールチップ | `text-body-sm font-normal` | 16px                | 16px                | Helvetica Neue / Noto Sans JP Light | 400 (normal)     | 1.4       | 1.4       | ツールチップテキスト |

### Blockquote

| 意味的な分類 | クラス名                                            | フォントサイズ (SP) | フォントサイズ (PC) | フォントファミリー                  | フォントウェイト | 行間 (SP) | 行間 (PC) | 使用箇所       |
| ------------ | --------------------------------------------------- | ------------------- | ------------------- | ----------------------------------- | ---------------- | --------- | --------- | -------------- |
| 引用文       | `text-body-sm md:text-body-base font-normal italic` | 16px                | 18px                | Helvetica Neue / Noto Sans JP Light | 400 (normal)     | 1.4       | 1.4       | 引用文ブロック |

### Numbers / Statistics

| 意味的な分類 | クラス名                      | フォントサイズ (SP) | フォントサイズ (PC) | フォントファミリー                      | フォントウェイト | 行間 (SP) | 行間 (PC) | 使用箇所           |
| ------------ | ----------------------------- | ------------------- | ------------------- | --------------------------------------- | ---------------- | --------- | --------- | ------------------ |
| 数値表示     | `text-body-3xl font-semibold` | 32px                | 32px                | Helvetica Neue / Noto Sans JP Semi Bold | 600 (semibold)   | 1.2       | 1.2       | 統計値、数値データ |

### List Items

| 意味的な分類   | クラス名                                   | フォントサイズ (SP) | フォントサイズ (PC) | フォントファミリー                  | フォントウェイト | 行間 (SP) | 行間 (PC) | 使用箇所       |
| -------------- | ------------------------------------------ | ------------------- | ------------------- | ----------------------------------- | ---------------- | --------- | --------- | -------------- |
| リストアイテム | `text-body-lg md:text-body-xl font-normal` | 21px                | 24px                | Helvetica Neue / Noto Sans JP Light | 400 (normal)     | 1.4       | 1.4       | リスト項目内容 |

### Emphasis Text

| 意味的な分類 | クラス名        | フォントサイズ | フォントファミリー | フォントウェイト | 行間         | 使用箇所    |
| ------------ | --------------- | -------------- | ------------------ | ---------------- | ------------ | ----------- |
| 強調         | `font-semibold` | 親要素に依存   | 親要素に依存       | 600 (semibold)   | 親要素に依存 | strong タグ |
| イタリック   | `italic`        | 親要素に依存   | 親要素に依存       | 親要素に依存     | 親要素に依存 | em タグ     |

### Card Elements

| 意味的な分類   | クラス名                                         | フォントサイズ (SP) | フォントサイズ (PC) | フォントファミリー                      | フォントウェイト | 行間 (SP) | 行間 (PC) | 使用箇所        |
| -------------- | ------------------------------------------------ | ------------------- | ------------------- | --------------------------------------- | ---------------- | --------- | --------- | --------------- |
| カードタイトル | `text-heading-xl font-semibold`                  | 32px                | 32px                | Helvetica Neue / Noto Sans JP Semi Bold | 600 (semibold)   | 1.2       | 1.2       | CardTitle       |
| カード説明     | `text-body-sm font-normal text-muted-foreground` | 16px                | 16px                | Helvetica Neue / Noto Sans JP Light     | 400 (normal)     | 1.4       | 1.4       | CardDescription |

### GymDashboardHero Card Elements

**⚠️ 特別な扱い**: GymDashboardHero 内のカード要素は、プロジェクトの表現のために特別なフォントを使用します。

| 意味的な分類       | クラス名                           | フォントサイズ (SP) | フォントサイズ (PC) | フォントファミリー       | フォントウェイト | 行間 (SP) | 行間 (PC) | 使用箇所                        |
| ------------------ | ---------------------------------- | ------------------- | ------------------- | ------------------------ | ---------------- | --------- | --------- | ------------------------------- |
| カードタイトル(h4) | `text-body-base font-merriweather` | 18px                | 18px                | Merriweather             | 500 (medium)     | 1.2       | 1.2       | "Total Records", "Peak Time" 等 |
| カード数値         | `text-body-3xl font-semibold`      | 32px                | 32px                | Montserrat, Noto Sans JP | 600 (semibold)   | 1.2       | 1.2       | 統計値の数値表示                |
| カードサブタイトル | `text-body-base font-normal`       | 18px                | 18px                | Montserrat, Noto Sans JP | 400 (normal)     | 1.2       | 1.2       | 日付範囲、期間表示              |

---

## 📐 フォントサイズ定義（tailwind.config.js）

### Body Scale (line-height: 1.4)

| クラス名         | フォントサイズ | 行間 |
| ---------------- | -------------- | ---- |
| `text-body-xs`   | 14px           | 1.4  |
| `text-body-sm`   | 16px           | 1.4  |
| `text-body-base` | 18px           | 1.4  |
| `text-body-lg`   | 21px           | 1.4  |
| `text-body-xl`   | 24px           | 1.4  |
| `text-body-2xl`  | 28px           | 1.4  |
| `text-body-3xl`  | 32px           | 1.4  |
| `text-body-4xl`  | 40px           | 1.4  |

### Heading Scale (line-height: 1.2)

| クラス名            | フォントサイズ | 行間 |
| ------------------- | -------------- | ---- |
| `text-heading-sm`   | 21px           | 1.2  |
| `text-heading-base` | 24px           | 1.2  |
| `text-heading-lg`   | 28px           | 1.2  |
| `text-heading-xl`   | 32px           | 1.2  |
| `text-heading-2xl`  | 40px           | 1.2  |
| `text-heading-3xl`  | 48px           | 1.2  |
| `text-heading-4xl`  | 56px           | 1.2  |

### Caption Scale (line-height: 1.2)

| クラス名            | フォントサイズ | 行間 |
| ------------------- | -------------- | ---- |
| `text-caption-xs`   | 12px           | 1.2  |
| `text-caption-sm`   | 14px           | 1.2  |
| `text-caption-base` | 16px           | 1.2  |
| `text-caption-lg`   | 18px           | 1.2  |
| `text-caption-xl`   | 21px           | 1.2  |
| `text-caption-2xl`  | 24px           | 1.2  |

---

## 🎨 フォントファミリー一覧

| フォント       | クラス名              | 用途                                                      | 読み込み方式     |
| -------------- | --------------------- | --------------------------------------------------------- | ---------------- |
| Helvetica Neue | `font-helvetica-neue` | 見出し（h1, h2, h3）、本文、ナビゲーション（PC）、UI 要素 | システムフォント |
| Merriweather   | `font-merriweather`   | GymDashboardHero 内見出し、ナビゲーション（SP）           | Google Fonts     |
| Space Mono     | `font-space-mono`     | タグ、キャプション、メタ情報ラベル                        | Google Fonts     |
| Noto Sans JP   | `font-noto-sans-jp`   | 日本語テキスト（jpFontSize 関数で使用）                   | Google Fonts     |

---

## ⚖️ フォントウェイト一覧

| ウェイト     | クラス名                     | 用途                                        | 使用箇所                                              |
| ------------ | ---------------------------- | ------------------------------------------- | ----------------------------------------------------- |
| 300 (light)  | `font-light`                 | Language switcher inactive, 日本語本文      | Header の言語切り替え（非アクティブ）、日本語テキスト |
| 400 (normal) | `font-normal` または指定なし | 本文、タグ、キャプション（デフォルト）      | 一般的な本文テキスト                                  |
| 500 (medium) | `font-medium`                | 見出し（h1, h2, h3）                        | 見出し全般                                            |
| 700 (bold)   | `font-bold`                  | Navigation active, Language switcher active | Header のナビゲーション（アクティブ）                 |

---

## 📝 注意事項

1. **日本語フォントサイズ調整**: `jpFontSize()` 関数を使用している箇所は、日本語テキスト用にサイズが動的に調整されます。

2. **デフォルトフォント**: フォントファミリーが明示的に指定されていない場合、親要素のフォントまたはブラウザのデフォルトフォントが使用されます。

3. **レスポンシブ**: `md:` プレフィックスが付いているクラスは、タブレット・デスクトップサイズ（768px 以上）で適用されます。

4. **行間**:

   - Body 系: 1.4 (140%)
   - Heading 系: 1.2 (120%)
   - Caption 系: 1.2 (120%)

5. **UI 要素のタイポグラフィ**: 以下の UI 要素に関しては、英語テキストに Helvetica Neue、日本語テキストに Noto Sans JP を使用します。

   - Button: 常に英語で表示、Helvetica Neue Semi Bold
   - Form Elements: Label, Input, Placeholder, Error Messages
   - Alert / Notification: Title, Description
   - Tooltip
   - Blockquote
   - Numbers / Statistics
   - List Items
   - Card Elements

6. **特別な扱い**: GymDashboardHero コンポーネント内のカード要素は、プロジェクトの表現のために Montserrat, Noto Sans JP, sans-serif を使用します。

---

## 📝 監査履歴

### 2025-01-23 - タイポグラフィ実装監査完了

**監査結果**: 全ページのタイポグラフィ実装をドキュメントと比較し、7件の差異を発見・修正しました。

**修正内容**:
1. ✅ `app/page.tsx`: `font-regular` → `font-light` (日本語説明文)
2. ✅ `app/page.tsx`: h3タグに`getHeadingFontClass()`を追加
3. ✅ `app/work/google_ux_design_certificate_project/page.tsx`: `text-body-l-140` → `text-body-base md:text-body-lg` (タグ)
4. ✅ `app/experiment/spline.tsx`: ボタンテキストを`font-medium` → `font-semibold`、`text-body-lg` → `text-body-lg md:text-body-xl`
5. ✅ `app/experiment/spline.tsx`: 説明文に`getBodyFontClass()`を追加
6. ✅ `app/experiment/spline.tsx`: blockquoteに`getBodyFontClass()`を追加
7. ✅ `app/experiment/page.tsx`: 説明文に`getBodyFontClass()`を追加

**確認済み - 問題なし**:
- ✅ `app/blog/page.tsx`: note記事のh3タイトル `text-body-lg md:text-body-xl` (SP 21px / PC 24px)
- ✅ `app/about/page.tsx`: 全要素が正しく実装されている
- ✅ `app/work/gym_crowd_status_dashboard/page.tsx`: 全要素が正しく実装されている
- ✅ `app/work/google_ux_design_certificate_project/page.tsx`: h1, h2, h3が正しく実装されている

**結論**: 現在の実装は、TYPOGRAPHY_TABLE.md および TYPOGRAPHY_GUIDE.md と完全に整合しています。

---

**最終更新: 2025-01-23 (タイポグラフィ実装監査完了)**
