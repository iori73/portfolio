# Design System Architecture

## Overview

このドキュメントは、ポートフォリオサイトのデザインシステムの全体像を記述します。

## Typography System

### Design Principles

このプロジェクトのタイポグラフィシステムは、**shadcn/uiのベストプラクティスに準拠**しています：

1. **Font SizeとFont Weightの分離**: `fontSize`定義には`fontWeight`を含めず、`fontSize`と`lineHeight`のみを定義
2. **Font Weightの独立制御**: `font-normal`, `font-medium`, `font-semibold`, `font-bold`などの標準Tailwindクラスで制御
3. **セマンティックな命名**: `text-body-sm`, `text-heading-xl`など、直感的で拡張しやすい命名規則

### Font Families

- **Merriweather Sans**: 見出し（Heading）用
- **Inter**: 本文（Body）とインターフェース用
- **Space Mono**: タグやコード表示用
- **JetBrains Mono**: キャプション用

### Font Size Scale

#### Heading Scale (line-height: 1.2 = 120%)

| クラス名 | サイズ | 旧クラス名 |
|---------|--------|-----------|
| `text-heading-sm` | 21px | `text-heading-xxxs-120` |
| `text-heading-base` | 24px | `text-heading-xxs-120` |
| `text-heading-lg` | 28px | `text-heading-xs-120` |
| `text-heading-xl` | 32px | `text-heading-s-120` |
| `text-heading-2xl` | 40px | `text-heading-m-120` |
| `text-heading-3xl` | 48px | `text-heading-l-120` |
| `text-heading-4xl` | 56px | `text-heading-xl-m-120` |

#### Body Scale (line-height: 1.4 = 140%)

| クラス名 | サイズ | 旧クラス名 |
|---------|--------|-----------|
| `text-body-xs` | 14px | `text-body-xs-140` |
| `text-body-sm` | 16px | `text-body-s-140` |
| `text-body-base` | 18px | `text-body-m-140` |
| `text-body-lg` | 21px | `text-body-l-140` |
| `text-body-xl` | 24px | `text-body-xl-140` |
| `text-body-2xl` | 28px | `text-body-xxl-140` |
| `text-body-3xl` | 32px | `text-body-xxxl-140` |
| `text-body-4xl` | 40px | `text-body-xxxxl-140` |

#### Caption Scale (line-height: 1.2 = 120%)

| クラス名 | サイズ | 旧クラス名 |
|---------|--------|-----------|
| `text-caption-xs` | 12px | `text-caption-xxs-120` |
| `text-caption-sm` | 14px | `text-caption-xs-120` |
| `text-caption-base` | 16px | `text-caption-s-120` |
| `text-caption-lg` | 18px | `text-caption-m-120` |
| `text-caption-xl` | 21px | `text-caption-l-120` |
| `text-caption-2xl` | 24px | `text-caption-xl-120` |

### Font Weight

Font Weightは`fontSize`定義から分離され、標準のTailwindクラスで制御します：

- `font-normal` (400)
- `font-medium` (500)
- `font-semibold` (600)
- `font-bold` (700)

#### セマンティックなHTMLタグのデフォルトFont Weight

shadcn/ui準拠のアプローチとして、セマンティックなHTMLタグにデフォルトのfont-weightを設定しています（`app/globals.css`の`@layer base`）：

- **h1**: `font-bold` (700)
- **h2, h3, h4, h5, h6**: `font-semibold` (600)

これにより、見出しタグを使用する際に明示的に`font-bold`や`font-semibold`を指定しなくても、適切な太さが適用されます。必要に応じて、個別にオーバーライドも可能です。

使用例：
```tsx
{/* デフォルトスタイルが適用される */}
<h1 className="text-heading-3xl font-merriweather">Main Title</h1>
<h2 className="text-heading-2xl font-inter">Section Title</h2>

{/* 必要に応じてオーバーライド可能 */}
<h3 className="text-heading-xl font-normal">Light Weight Heading</h3>
```

## Responsive Strategy

### Breakpoints

- Mobile: default (< 768px)
- Desktop: `md:` prefix (≥ 768px)

### Font Sizing Strategy

#### ホームページ（`app/page.tsx`）

言語の特性に応じて異なるサイズを使用：

- 日本語: 視認性を考慮して小さめのサイズ
- 英語: より大きいサイズで可読性を確保

#### ワーク詳細ページ（`app/work/*`）

両言語で統一されたサイズ：

- モバイル: `text-body-sm` (16px)
- デスクトップ: `text-body-lg` (21px)
- 比率: 約 76% (21px → 16px)

詳細は [ADR-003: モバイルフォントサイズの標準化](../decisions/003-mobile-font-size-standardization.md) を参照。

## Internationalization (i18n)

### Language Support

- 英語 (en)
- 日本語 (jp)

### Font Size Adjustment Hook

`useJPFontSize` フックを使用して、言語ごとに異なるフォントサイズを適用可能：

```typescript
const { jpFontSize } = useJPFontSize();

// 両言語で同じサイズ
jpFontSize('text-body-sm', 'text-body-lg');

// 言語ごとに異なるサイズ
jpFontSize(
  'text-body-xl',   // モバイル英語
  'text-body-2xl',  // デスクトップ英語
  'text-body-lg',   // モバイル日本語
  'text-body-xl',  // デスクトップ日本語
);
```

**注意**: `useJPFontSize`は柔軟な実装のため、新旧どちらのクラス名でも動作しますが、新クラス名の使用を推奨します。

## Color System

### Gray Scale

- gray-50 to gray-900: システム全体で使用

### Accent Colors

- Primary accent: `#007aff` (Apple Blue)

## Spacing System

Tailwind のデフォルトスケールを使用：

- `mb-2`: 0.5rem (8px)
- `mb-4`: 1rem (16px)
- `mb-6`: 1.5rem (24px)
- `mb-8`: 2rem (32px)

注意: 過去にカスタムスケール（`6: 48px`）を使用していましたが、公開サイトとの不一致を避けるため、デフォルトに戻しました。
詳細は [ADR-002: Tailwind Spacing 設定の修正](../decisions/002-tailwind-spacing-fix.md) を参照。

## Layout

### Maximum Widths

- Main content: `max-w-6xl` (1152px)
- Article content: `max-w-[896px]`

### Page Margins

各ページの最上位コンテナに個別適用：

- Mobile: `my-24`
- Desktop: `md:mt-28 md:mb-16`

## Migration Notes

### 旧クラス名からの移行

2025年1月に、タイポグラフィシステムをshadcn/ui準拠に再構築しました。旧クラス名（例: `text-body-s-140`）から新クラス名（例: `text-body-sm`）への移行が完了しています。

主な変更点：
- `fontSize`定義から`fontWeight`を削除
- セマンティックな命名規則に統一（`-sm`, `-base`, `-lg`, `-xl`, `-2xl`など）
- `font-semibold`などの標準Tailwindクラスが正しく動作するように修正

詳細は [Typography Refactor Plan](../typography-refactor-plan.md) を参照。

## Last Updated

2025-01-17 (Typography System Refactored)
