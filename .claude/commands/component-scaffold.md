デザインシステム規約に完全準拠した新しいコンポーネントを生成してください。

## 事前準備

1. `docs/architecture/design-system.md` を読んで最新の規約を確認
2. 指定されたコンポーネントに類似する既存コンポーネントを検索し、パターンを把握
3. `src/hooks/useFonts.ts` のフック仕様を確認

## コンポーネント生成ルール

### ファイル構造
```tsx
'use client';  // フックを使用する場合

// 1. 外部ライブラリ
import { useTranslations } from 'next-intl';

// 2. 内部モジュール
import { useBodyFont, useHeadingFont } from '@/src/hooks/useFonts';

// 3. コンポーネント（必要な場合）

// 4. 型定義
interface ComponentNameProps {
  // ...
}
```

### Typography
- 見出し: `text-headline` / `text-title-lg` / `text-title` / `text-title-sm` + `${getHeadingFontClass()}`
- 本文: `text-body` / `text-body-lg` / `text-body-sm` + `${getBodyFontClass()}`
- ラベル/タグ: `text-label font-space-grotesk`
- キャプション: `text-caption`
- **禁止**: インライン fontFamily/fontWeight、レガシースケール、Tailwind デフォルトサイズ
- **禁止**: 新スケールクラスに `md:` プレフィックス（CSS変数で自動レスポンシブ）

### Color
- テキスト: `text-ink` / `text-ink-secondary` / `text-ink-tertiary` / `text-ink-muted`
- 背景: `bg-surface` / `bg-surface-muted`
- ボーダー: `border-line-subtle` / `border-line-section`
- **禁止**: hardcoded hex values

### Spacing（design-system.md §3 準拠）
- h2 下: `mb-6`
- h3 下: `mb-4`
- 本文段落間: `mb-4`
- セクション間: `py-8`
- タグ: `px-3 py-1.5`

### Responsive
- モバイルファースト（default = mobile）
- デスクトップ: `md:` prefix
- レイアウト変更のみ `md:` を使用（フォントサイズはCSS変数で自動）

### i18n
- `useTranslations()` でテキスト取得
- 見出しに `getHeadingFontClass()` 適用
- 本文に `getBodyFontClass()` 適用

### Accessibility
- インタラクティブ要素は `<button>` / `<a>`（`<div onClick>` 禁止）
- 画像に `alt` 属性
- フォーカスインジケータ: `focus-visible:outline-2 focus-visible:outline-offset-2`
- タッチターゲット >= 44px

## 出力

生成されたコンポーネントコードと、使用したデザインシステムの規約の一覧。

$ARGUMENTS
