# Design System Architecture

## Overview

このドキュメントは、ポートフォリオサイトのデザインシステムの全体像を記述します。

## Typography System

### Font Families

- **Merriweather Sans**: 見出し（Heading）用
- **Inter**: 本文（Body）とインターフェース用
- **Space Mono**: タグやコード表示用
- **JetBrains Mono**: キャプション用

### Font Size Scale

#### Heading Scale (line-height: 120%)

- `heading-xl-m-120`: 56px
- `heading-l-120`: 48px
- `heading-m-120`: 40px
- `heading-s-120`: 32px
- `heading-xs-120`: 28px
- `heading-xxs-120`: 24px
- `heading-xxxs-120`: 21px

#### Body Scale (line-height: 140%)

- `body-xxxxl-140`: 40px
- `body-xxxl-140`: 32px
- `body-xxl-140`: 28px
- `body-xl-140`: 24px
- `body-l-140`: 21px
- `body-m-140`: 18px
- `body-s-140`: 16px
- `body-xs-140`: 14px

#### Caption Scale (line-height: 120%)

- `caption-xl-120`: 24px
- `caption-l-120`: 16px
- `caption-m-120`: 14px

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

- モバイル: `text-body-s-140` (16px)
- デスクトップ: `text-body-l-140` (21px)
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
jpFontSize('text-body-s-140', 'text-body-l-140');

// 言語ごとに異なるサイズ
jpFontSize(
  'text-body-xl-140', // モバイル英語
  'text-body-xxl-140', // デスクトップ英語
  'text-body-l-140', // モバイル日本語
  'text-body-xl-140', // デスクトップ日本語
);
```

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

## Last Updated

2025-01-17
