# Design System

> このドキュメントはポートフォリオサイトのデザインシステムの**唯一の真実**です。
> コードの現状を正確に反映します。理想や過去の計画は記載しません。
>
> **最終更新: 2026-03-13**

---

## 1. Typography

### 1.1 Font Families

| フォント | Tailwind クラス | 用途 | 読み込み |
|---|---|---|---|
| Switzer | `font-switzer` | 見出し（EN）、サイドバーナビ | セルフホスト (WOFF2, Fontshare) |
| Helvetica Neue | `font-helvetica-neue` | 本文（EN）、UI 要素 | システムフォント |
| Noto Sans JP | `font-noto-sans-jp` | 見出し（JP）、本文（JP） | Google Fonts |
| Space Grotesk | `font-space-grotesk` | タグ、キャプション、メタラベル | Google Fonts |
| Merriweather Sans | `font-merriweather` | GymDashboardHero 内見出し、モバイルナビ | Google Fonts / ローカル |

### 1.2 Font Weight

| Weight | クラス | 用途 |
|---|---|---|
| 300 | `font-light` | 日本語本文、言語切替の非アクティブ |
| 400 | `font-normal`（デフォルト） | 英語本文、タグ、キャプション |
| 500 | `font-medium` | 見出し（h1-h6）— `@layer base` で自動適用 |
| 700 | `font-bold` | ナビゲーション・言語切替のアクティブ |

### 1.3 言語別フォント適用

`src/hooks/useFonts.ts` の3つのフックで制御:

**`useBodyFont()` → `getBodyFontClass()`**
- EN: `font-helvetica-neue`
- JP: `font-noto-sans-jp font-light`

**`useHeadingFont()` → `getHeadingFontClass()`**
- EN: `''`（空文字 — `@layer base` の `font-switzer font-medium` が適用）
- JP: `font-noto-sans-jp font-medium`

**`useJPFontSize()` → `jpFontSize(mobile, desktop, mobileJP?, desktopJP?)`**
- 言語ごとに異なるレスポンシブサイズを適用

### 1.4 Font Size Scale — New Semantic Scale (推奨)

**定義場所**: `app/globals.css` (CSS変数) + `tailwind.config.js` (セマンティッククラス)

**設計原則** (Spotify Encore inspired):
- **単一スケール**: heading / body / caption の3系統を統合し、10クラスの単一スケールに
- **レスポンシブ内蔵**: CSS変数が `@media (min-width: 768px)` で自動切替 — `md:` プレフィックス不要
- **大サイズほど伸縮が大きい**: body は固定 (16px)、headline は 1.5x (32→48px)

#### Size Tokens (CSS変数)

| トークン | Mobile (<768) | Desktop (≥768) |
|---|---|---|
| `--text-size-xs` | 12px | 12px |
| `--text-size-sm` | 13px | 14px |
| `--text-size-base` | 16px | 16px |
| `--text-size-lg` | 18px | 20px |
| `--text-size-xl` | 20px | 24px |
| `--text-size-2xl` | 24px | 32px |
| `--text-size-3xl` | 32px | 48px |
| `--text-size-4xl` | 40px | 56px |

#### Semantic Classes

| クラス | CSS変数 | line-height | 用途 |
|---|---|---|---|
| `text-display` | `--text-size-4xl` | 1.1 | Home Hero のみ |
| `text-headline` | `--text-size-3xl` | 1.2 | h1 ページタイトル |
| `text-title-lg` | `--text-size-2xl` | 1.2 | h2 セクション見出し |
| `text-title` | `--text-size-xl` | 1.25 | h3 サブセクション |
| `text-title-sm` | `--text-size-lg` | 1.3 | h4, カード見出し |
| `text-body-lg` | `--text-size-lg` | 1.6 | リード文、Hero subtitle、ケーススタディ本文 |
| `text-body` | `--text-size-base` | 1.6 | UI要素、ラベル、短いテキスト |
| `text-body-sm` | `--text-size-sm` | 1.5 | 補助テキスト、カードメタ |
| `text-label` | `--text-size-sm` | 1.3 | タグ、フィルター、ボタンラベル |
| `text-caption` | `--text-size-xs` | 1.3 | 微小テキスト、footnote |

### 1.5 ページタイプ別見出し階層（新スケール）

`md:` プレフィックスが不要。CSS変数が自動的にレスポンシブ対応する。

#### ランディングページ（Home, About, Experiment, Blog）

| 要素 | Mobile | Desktop | クラス |
|---|---|---|---|
| h1 (Hero) | 40px | 56px | `text-display` |
| h1 (通常) | 32px | 48px | `text-headline` |
| h2 | 24px | 32px | `text-title-lg` |
| h3 | 20px | 24px | `text-title` |

#### Work 詳細ページ

| 要素 | Mobile | Desktop | クラス |
|---|---|---|---|
| h1 | 32px | 48px | `text-headline` |
| h2 | 24px | 32px | `text-title-lg` |
| h3 | 20px | 24px | `text-title` |

### 1.6 本文サイズ（新スケール）

| 用途 | クラス | Mobile → Desktop |
|---|---|---|
| 短いテキスト・UI要素 | `text-body` + `getBodyFontClass()` | 16px (固定) |
| ケーススタディ本文・リード文 | `text-body-lg` + `getBodyFontClass()` | 18px → 20px |
| 補助テキスト | `text-body-sm` + `getBodyFontClass()` | 13px → 14px |
| タグ・ラベル | `text-label font-space-grotesk` | 13px → 14px |
| 微小テキスト | `text-caption` | 12px (固定) |

### 1.7 見出しのスタイル適用方法

`@layer base` で全 h1-h6 に `font-switzer font-medium` が自動適用される。

```tsx
// 新スケール（推奨）— md: プレフィックス不要
<h2 className={`text-title-lg mb-6 ${getHeadingFontClass()}`}>

// ラベル・タグ
<span className="text-label font-space-grotesk text-ink-tertiary">
```

**禁止**: インライン `style={{ fontFamily: '...', fontWeight: 500 }}` は使わない。

### 1.8 Legacy Scale (後方互換)

旧クラス（`text-heading-*`, `text-body-*`, `text-caption-*`）は `tailwind.config.js` に残存。
未移行ページで引き続き使用可能。新規コードには新スケールを使うこと。

---

## 2. Color

### 2.1 セマンティックカラートークン

**定義場所**: `app/globals.css` の `:root` + `tailwind.config.js`

| CSS 変数 | 値 | Tailwind クラス | 用途 |
|---|---|---|---|
| `--ink` | `#0A0A0A` | `text-ink` | 見出し、主要テキスト |
| `--ink-secondary` | `#333333` | `text-ink-secondary` | サブタイトル、副次テキスト |
| `--ink-tertiary` | `#71717a` | `text-ink-tertiary` | ラベル、キャプション |
| `--ink-muted` | `rgba(0,0,0,0.56)` | `text-ink-muted` | CTA ボタンテキスト等 |
| `--surface` | `#fcfbfc` | `bg-surface` | ページ背景 |
| `--surface-muted` | `#f5f5f7` | `bg-surface-muted` | タグ背景、TL;DR セクション |
| `--line-subtle` | `#e4e4e7` | `border-line-subtle` | コンテンツ内区切り |
| `--line-section` | `#d4d4d8` | `border-line-section` | セクション区切り |

### 2.2 既存カラー（維持）

- **Tailwind gray scale** (gray-50 ~ gray-900): コンポーネント内で使用
- **shadcn/ui HSL tokens** (`--foreground`, `--muted`, `--primary` 等): UI コンポーネントで使用
- **accent**: `#007aff` (Apple Blue)

### 2.3 置換マッピング（段階的に適用）

| 旧（hardcoded） | 新（セマンティック） |
|---|---|
| `text-black`, `text-[#0A0A0A]`, `text-[#171717]`, `text-[#101828]` | `text-ink` |
| `text-[#333333]`, `text-[#002a38]` | `text-ink-secondary` |
| `text-gray-500`, `text-[#696969]`, `text-[#656d76]` | `text-ink-tertiary` |
| `text-[#0000008f]` | `text-ink-muted` |
| `bg-[#f5f5f7]`, `bg-[#eeedee]` | `bg-surface-muted` |
| `border-gray-400` | `border-line-section` |

---

## 3. Spacing

Tailwind デフォルトスペーシングを使用。カスタム変数は定義しない。

### 3.1 ページレベル

| 用途 | クラス | 値 |
|---|---|---|
| ページ上下余白 | `my-24 md:mt-28 md:mb-16` | 96px / md: 112px top, 64px bottom |
| ヒーローセクション後 | `mb-0 md:mb-8` | 0 / md: 32px |
| ヒーローのモバイル全幅 | `-mx-6 md:mx-0` | -24px / md: 0 |

### 3.2 セクションレベル

| 用途 | クラス | 値 |
|---|---|---|
| セクション間パディング | `py-8` | 32px top & bottom |
| プロジェクト情報セクション | `pt-4 pb-8` | 16px top, 32px bottom |

### 3.3 要素レベル

| 用途 | クラス | 値 |
|---|---|---|
| h2 下マージン | `mb-6` | 24px |
| h3 下マージン | `mb-4` | 16px |
| h3 下マージン（Reflection 等） | `mb-3` | 12px |
| 本文段落間 | `mb-4` | 16px |
| 本文段落間（長文・画像前後） | `mb-6` | 24px |
| サブセクション間 | `mb-8` | 32px |
| 大ブロック間 | `mb-12` | 48px |
| メタラベルとキャプション | `mb-2` | 8px |

### 3.4 コンポーネントレベル

| 用途 | クラス | 値 |
|---|---|---|
| タグピル | `px-3 py-1` | 12px / 4px |
| CTA ボタン | `px-6 py-3` | 24px / 12px |
| メタグリッド | `gap-6` | 24px |
| サイドバーナビ間隔 | `space-y-3` | 12px |

---

## 4. Layout

### 4.1 最大幅

| 用途 | クラス | 値 |
|---|---|---|
| メインレイアウト | `max-w-6xl mx-auto px-6` | 1152px |
| Work ページ本文 + サイドバー | `max-w-7xl` | 1280px |
| プロジェクト情報 | `max-w-[1028px]` | 1028px |
| Google UX ページ | `max-w-[896px]` | 896px |

### 4.2 Work ページレイアウト

```
┌──────────────────────────────────────────┐
│ Hero (max-w-7xl or full-width)           │
├──────────────────────────────────────────┤
│ Project Info (max-w-[1028px])            │
├──────────────────────────────────────────┤
│ Main Content (80%)  │ Sidebar (20%)      │
│ (max-w-7xl)         │ sticky top-24      │
└──────────────────────────────────────────┘
```

### 4.3 レスポンシブブレークポイント

- **Mobile**: default (< 768px)
- **Desktop**: `md:` prefix (>= 768px)

---

## 5. Components

### 5.1 タグ

```tsx
<span className="font-space-grotesk text-label px-3 py-1.5 rounded-lg bg-surface-muted text-ink-tertiary">
  Tag Name
</span>
```

### 5.2 メタラベル（Timeline, My Skills 等）

```tsx
<span className="text-label font-space-grotesk font-semibold text-ink-tertiary mb-2 block">
  Label
</span>
<p className="text-body-lg tracking-[0.2px]">
  Value
</p>
```

### 5.3 CTA ボタン（サイトを見る）

```tsx
<a className="relative flex items-center justify-center px-6 py-3 rounded-[100px] text-ink-muted hover:text-white cursor-pointer transition-[color] duration-300 whitespace-nowrap overflow-hidden group">
  <span className="relative z-10 text-body-lg font-medium">
    {t('common.goToSite')}
  </span>
</a>
```

### 5.4 GitHub リポジトリリンク

```tsx
<a className="inline-flex items-center gap-2">
  {/* GitHub SVG icon */}
  <span className="text-body-sm md:text-body-lg leading-[1.25] font-normal text-ink-tertiary">owner</span>
  <span className="text-body-sm md:text-body-lg leading-[1.25] font-normal text-ink-tertiary">/</span>
  <span className="text-body-sm md:text-body-lg leading-[1.25] font-semibold text-ink">repo</span>
</a>
```

### 5.5 サイドバーナビ

```tsx
// Active（heading-base: 24px — inactive の heading-sm: 21px より大きい）
className="text-left text-heading-base font-switzer transition-transform duration-900 scale-110"

// Inactive
className="text-left text-heading-sm font-switzer transition-transform duration-900 scale-100 opacity-50"
```

### 5.6 画像スタイル

```tsx
<Image
  style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderRadius: '8px' }}
  className="w-full h-auto"
/>
```

---

## 6. Base Styles

**定義場所**: `app/globals.css`

```css
/* @layer base で適用 */
h1, h2, h3, h4, h5, h6 {
  @apply font-switzer font-medium;
}

body {
  font-family: 'Helvetica Neue', 'Helvetica', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background-color: #fcfbfc;
}

/* モバイル可読性 */
@media (max-width: 640px) {
  p, li { line-height: 160%; }
}
```

---

## 7. Dead Code（削除候補）

以下のファイルはどこからも import されておらず、削除可能:

- `src/lib/fonts.tsx` — `src/hooks/useFonts.ts` と重複する未使用ファイル
- `styles/globals.css` — 全行コメントアウト済み。8pt スペーシングスケールの残骸

---

## 8. Migration Notes

### hardcoded hex → セマンティックトークンへの移行

各ページで段階的に以下を置換する:

1. `text-black` / `text-[#0A0A0A]` / `text-[#171717]` → `text-ink`
2. `text-[#333333]` / `text-[#002a38]` → `text-ink-secondary`
3. `text-gray-500` / `text-[#696969]` → `text-ink-tertiary`
4. `text-[#0000008f]` → `text-ink-muted`
5. `bg-[#f5f5f7]` / `bg-[#eeedee]` → `bg-surface-muted`
6. `border-gray-400` → `border-line-section`

### インライン style の排除

全ての heading で `style={{ fontFamily: '...', fontWeight: 500 }}` を削除し、`getHeadingFontClass()` を className に追加する。

---

## 関連ファイル

| ファイル | 内容 |
|---|---|
| `tailwind.config.js` | フォントサイズ、カラー、フォントファミリーの定義 |
| `app/globals.css` | CSS 変数、base layer、フォント読み込み |
| `src/hooks/useFonts.ts` | 言語別フォント適用フック |
