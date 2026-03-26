指定されたファイルをポートフォリオのデザインシステム基準で評価してください。

## 手順

1. まず `docs/architecture/design-system.md` を読んで最新の規約を確認
2. 指定されたファイルを読む
3. 以下のチェック項目を順に確認
4. 違反ごとに「行番号 / 現在のコード / 違反内容 / 修正案」を出力

## チェック項目

### Color Tokens
- hardcoded hex (`text-[#...]`, `bg-[#...]`, `border-[#...]`) → セマンティックトークンに置換すべき箇所
- `text-black` → `text-ink`
- `text-[#0A0A0A]`, `text-[#171717]`, `text-[#101828]` → `text-ink`
- `text-[#333333]`, `text-[#002a38]` → `text-ink-secondary`
- `text-gray-500`, `text-[#696969]`, `text-[#656d76]` → `text-ink-tertiary`
- `bg-[#f5f5f7]`, `bg-[#eeedee]` → `bg-surface-muted`

### Typography
- インライン `style={{ fontFamily: '...', fontWeight: ... }}` → `getHeadingFontClass()` / `getBodyFontClass()` を使用すべき
- レガシースケール (`text-heading-*`, `text-body-base`, `text-body-xs`, `text-caption-sm`) → 新スケール (`text-headline`, `text-title-lg`, `text-body`, `text-caption`) に移行すべき
- 見出し要素 (h1-h6) に `font-bold` → `font-medium` が @layer base で自動適用される
- Tailwind デフォルトサイズ (`text-xl`, `text-2xl`, `md:text-3xl`) → セマンティッククラスを使用すべき
- 新スケールクラスに不要な `md:` プレフィックス（CSS変数で自動レスポンシブ）

### Font Hooks (i18n)
- 見出しに `getHeadingFontClass()` が適用されているか（JP対応）
- 本文に `getBodyFontClass()` が適用されているか
- `useLocale()` を使用している場合、フォントフックも使用しているか

### Spacing
- arbitrary values (`p-[13px]`, `m-[7px]`) → Tailwind スケールに合わせるべき
- 同じセマンティックな距離に異なるクラスが使われていないか（h2下は常に `mb-6`）

### Components
- タグ: `font-space-grotesk text-label px-3 py-1.5 rounded-lg bg-surface-muted text-ink-tertiary` パターンに準拠しているか
- CTA: `rounded-[100px]` (pill), `text-ink-muted`, `text-body-lg font-medium` パターンに準拠しているか

### Accessibility
- インタラクティブ要素のタッチターゲット >= 44px
- `<img>` / `<Image>` に alt 属性があるか
- `<div onClick>` / `<span onClick>` → `<button>` / `<a>` を使用すべき
- `focus-visible` スタイルがあるか

## 出力フォーマット

各違反を以下の形式で出力:

```
### [カテゴリ] 違反名
- **ファイル**: path:line
- **現在**: `現在のコード`
- **問題**: 何が違反しているか
- **修正案**: `推奨コード`
- **根拠**: HIG/MD3/design-system.md のどのルールに基づくか
```

最後にサマリーテーブル（カテゴリ別の違反数）を出力。

$ARGUMENTS
