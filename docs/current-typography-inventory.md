# Current Typography System Inventory

## 現在定義されているフォントサイズ

### Heading Scale (line-height: 120%, fontWeight: 600)

| クラス名 | サイズ | 使用状況 |
|---------|--------|---------|
| `text-heading-xl-m-120` | 56px | 低 |
| `text-heading-l-120` | 48px | 中 |
| `text-heading-m-120` | 40px | 中 |
| `text-heading-s-120` | 32px | 中 |
| `text-heading-xs-120` | 28px | 中 |
| `text-heading-xxs-120` | 24px | 中 |
| `text-heading-xxxs-120` | 21px | 中 |

### Body Scale (line-height: 140%, fontWeight: 400)

| クラス名 | サイズ | 使用状況 | 備考 |
|---------|--------|---------|------|
| `text-body-xxxxl-140` | 40px | 低 | 未使用の可能性 |
| `text-body-xxxl-140` | 32px | 低 | 未使用の可能性 |
| `text-body-xxl-140` | 28px | 低 | 未使用の可能性 |
| `text-body-xl-140` | 24px | 中 | 使用中 |
| `text-body-l-140` | 21px | **高** | **最も使用頻度が高い** |
| `text-body-m-140` | 18px | 中 | 使用中 |
| `text-body-s-140` | 16px | **高** | **最も使用頻度が高い** |
| `text-body-xs-140` | 14px | 低 | 使用中 |

### Body - Responsive Scale (line-height: 140%, fontWeight: 400)

| クラス名 | サイズ | 使用状況 | 備考 |
|---------|--------|---------|------|
| `text-body-xxxxl-responsive` | 40px | 低 | 未使用の可能性 |
| `text-body-xxxl-responsive` | 32px | 低 | 未使用の可能性 |
| `text-body-xxl-responsive` | 28px | 低 | 未使用の可能性 |
| `text-body-xl-responsive` | 24px | 低 | 未使用の可能性 |
| `text-body-l-responsive` | 21px | 低 | 未使用の可能性 |
| `text-body-m-responsive` | 18px | 低 | 未使用の可能性 |
| `text-body-s-responsive` | 16px | 低 | 未使用の可能性 |
| `text-body-xs-responsive` | 14px | 低 | 未使用の可能性 |

### Caption Scale (line-height: 120%, fontWeight: 400)

| クラス名 | サイズ | 使用状況 |
|---------|--------|---------|
| `text-caption-xl-120` | 24px | 低 |
| `text-caption-l-120` | 21px | 低 |
| `text-caption-m-120` | 18px | 低 |
| `text-caption-s-120` | 16px | 低 |
| `text-caption-xs-120` | 14px | 低 |
| `text-caption-xxs-120` | 12px | 低 |
| `text-caption-xxxs-120` | 10px | 低 |

### Custom Sizes (未分類)

| クラス名 | サイズ | 使用状況 |
|---------|--------|---------|
| `text-custom-h1` | 40px | 低 |
| `text-custom-h2` | 28px | 低 |
| `text-custom-h3` | 24px | 低 |
| `text-custom-body` | 20px | 低 |

## 標準Tailwindサイズの使用状況

標準的なTailwindのフォントサイズクラスも182箇所で使用されています：

- `text-xs` (12px)
- `text-sm` (14px)
- `text-base` (16px)
- `text-lg` (18px)
- `text-xl` (20px)
- `text-2xl` (24px)
- `text-3xl` (30px)
- `text-4xl` (36px)
- `text-5xl` (48px)
- `text-6xl` (60px)

## フォントファミリー

| クラス名 | フォント | 用途 |
|---------|---------|------|
| `font-inter` | Inter | 本文・インターフェース（**最も使用頻度が高い**） |
| `font-merriweather` | Merriweather Sans | 見出し |
| `font-roboto` | Roboto | 本文（body要素のデフォルト） |
| `font-space-mono` | Space Mono | コード・タグ |
| `font-jetbrains-mono` | JetBrains Mono | コード |
| `font-noto-sans-jp` | Noto Sans JP | 日本語 |

## 問題のあるパターン

### 1. fontWeightがfontSize設定に含まれている

```javascript
'body-s-140': [
  '16px',
  {
    lineHeight: '140%',
    fontWeight: '400', // ← これが問題
  },
],
```

**影響**: `font-semibold`を追加しても上書きされない

### 2. 詳細度ハックが必要

```css
/* globals.css */
.font-inter.text-body-s-140.font-semibold {
  font-weight: 600; /* 詳細度を上げて上書き */
}
```

### 3. 過剰なカスタムサイズ

- 30以上のカスタムサイズが定義されている
- 実際に使用されているのは10個程度
- 残りは未使用の可能性が高い

## 推奨される新しいシステム

### 最小限のカスタムサイズ

実際に使用されているサイズのみを保持：

```javascript
fontSize: {
  // Body (line-height: 1.4)
  'body-sm': ['16px', { lineHeight: '1.4' }],    // 最も使用頻度が高い
  'body-base': ['18px', { lineHeight: '1.4' }],
  'body-lg': ['21px', { lineHeight: '1.4' }],    // 最も使用頻度が高い
  'body-xl': ['24px', { lineHeight: '1.4' }],
  
  // Heading (line-height: 1.2)
  'heading-sm': ['24px', { lineHeight: '1.2' }],
  'heading-base': ['28px', { lineHeight: '1.2' }],
  'heading-lg': ['32px', { lineHeight: '1.2' }],
  'heading-xl': ['40px', { lineHeight: '1.2' }],
  'heading-2xl': ['48px', { lineHeight: '1.2' }],
}
```

### fontWeightの分離

```tsx
// Before (問題あり)
<p className="text-body-s-140 font-semibold"> // fontWeightが上書きされない

// After (推奨)
<h4 className="text-body-sm font-semibold"> // fontWeightが正しく適用される
```

## 移行マッピング

| 旧クラス | 新クラス | 備考 |
|---------|---------|------|
| `text-body-s-140` | `text-body-sm` | 最も使用頻度が高い |
| `text-body-m-140` | `text-body-base` | |
| `text-body-l-140` | `text-body-lg` | 最も使用頻度が高い |
| `text-body-xl-140` | `text-body-xl` | |
| `text-heading-xxxs-120` | `text-heading-sm` | |
| `text-heading-xxs-120` | `text-heading-sm` | |
| `text-heading-xs-120` | `text-heading-base` | |
| `text-heading-s-120` | `text-heading-lg` | |
| `text-heading-m-120` | `text-heading-xl` | |
| `text-heading-l-120` | `text-heading-2xl` | |

## 次のステップ

1. **使用状況の詳細分析**: 各クラスの実際の使用箇所を確認
2. **移行計画の策定**: 段階的な移行スケジュール
3. **テスト**: 視覚的な変更がないことを確認
4. **ドキュメント更新**: 新しいシステムのドキュメント作成

