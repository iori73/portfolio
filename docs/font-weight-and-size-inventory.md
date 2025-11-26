# フォントウェイトとフォントサイズの完全な一覧

## 使用されているフォントウェイト

プロジェクト全体で使用されているフォントウェイトクラス：

1. **`font-normal`** (font-weight: 400)
   - 使用箇所: 約10箇所
   - 主に標準の本文テキスト

2. **`font-medium`** (font-weight: 500)
   - 使用箇所: 約30箇所
   - UIコンポーネント（tabs, buttons等）で使用

3. **`font-semibold`** (font-weight: 600)
   - 使用箇所: 約150箇所
   - **最も使用頻度が高い**
   - 見出し、強調テキスト、タイトルに使用

4. **`font-bold`** (font-weight: 700)
   - 使用箇所: 約10箇所
   - 大きな見出し（h1, h2）に使用

**合計: 4種類のフォントウェイト**

## 現在定義されているフォントサイズとクラス名

### Custom Sizes (未分類)

| クラス名 | フォントサイズ | Line Height | Font Weight | 使用状況 |
|---------|--------------|-------------|-------------|---------|
| `text-custom-h1` | 40px (2.5rem) | 1.1 | 700 | 低 |
| `text-custom-h2` | 28px (1.75rem) | 1.2 | 600 | 低 |
| `text-custom-h3` | 24px (1.5rem) | 1.2 | 500 | 低 |
| `text-custom-body` | 20px (1.25rem) | 1.6 | 400 | 低 |

### Heading Scale (line-height: 120%)

| クラス名 | フォントサイズ | Line Height | Font Weight | 使用状況 |
|---------|--------------|-------------|-------------|---------|
| `text-heading-xl-m-120` | 56px | 120% | 600 | 低 |
| `text-heading-l-120` | 48px | 120% | 600 | 中 |
| `text-heading-m-120` | 40px | 120% | 600 | 中 |
| `text-heading-s-120` | 32px | 120% | 600 | 中 |
| `text-heading-xs-120` | 28px | 120% | 600 | 中 |
| `text-heading-xxs-120` | 24px | 120% | 400 | 中 |
| `text-heading-xxxs-120` | 21px | 120% | 600 | 中 |

### Body Scale (line-height: 140%)

| クラス名 | フォントサイズ | Line Height | Font Weight | 使用状況 |
|---------|--------------|-------------|-------------|---------|
| `text-body-xxxxl-140` | 40px | 140% | 400 | 低（未使用の可能性） |
| `text-body-xxxl-140` | 32px | 140% | 400 | 低 |
| `text-body-xxl-140` | 28px | 140% | 400 | 低 |
| `text-body-xl-140` | 24px | 140% | 400 | 中 |
| `text-body-l-140` | 21px | 140% | 400 | **高（最も使用頻度が高い）** |
| `text-body-m-140` | 18px | 140% | 400 | 中 |
| `text-body-s-140` | 16px | 140% | 400 | **高（最も使用頻度が高い）** |
| `text-body-xs-140` | 14px | 140% | 400 | 低 |

### Body - Responsive Scale (line-height: 140%)

| クラス名 | フォントサイズ | Line Height | Font Weight | 使用状況 |
|---------|--------------|-------------|-------------|---------|
| `text-body-xxxxl-responsive` | 40px | 140% | 400 | 低（未使用の可能性） |
| `text-body-xxxl-responsive` | 32px | 140% | 400 | 低（未使用の可能性） |
| `text-body-xxl-responsive` | 28px | 140% | 400 | 低（未使用の可能性） |
| `text-body-xl-responsive` | 24px | 140% | 400 | 低（未使用の可能性） |
| `text-body-l-responsive` | 21px | 140% | 400 | 低（未使用の可能性） |
| `text-body-m-responsive` | 18px | 140% | 400 | 低（未使用の可能性） |
| `text-body-s-responsive` | 16px | 140% | 400 | 低（未使用の可能性） |
| `text-body-xs-responsive` | 14px | 140% | 400 | 低（未使用の可能性） |

### Caption Scale (line-height: 120%)

| クラス名 | フォントサイズ | Line Height | Font Weight | 使用状況 |
|---------|--------------|-------------|-------------|---------|
| `text-caption-xl-120` | 24px | 120% | 400 | 低 |
| `text-caption-l-120` | 21px | 120% | 400 | 低 |
| `text-caption-m-120` | 18px | 120% | 400 | 低 |
| `text-caption-s-120` | 16px | 120% | 400 | 低 |
| `text-caption-xs-120` | 14px | 120% | 400 | 低 |
| `text-caption-xxs-120` | 12px | 120% | 400 | 低 |
| `text-caption-xxxs-120` | 10px | 120% | 400 | 低 |

## 統計

### フォントサイズの定義数
- **合計: 30個のカスタムフォントサイズ**
  - Custom: 4個
  - Heading: 7個
  - Body: 8個
  - Body Responsive: 8個
  - Caption: 7個

### 実際に使用されているサイズ（推定）
- **高頻度**: `text-body-s-140` (16px), `text-body-l-140` (21px)
- **中頻度**: `text-body-m-140` (18px), `text-body-xl-140` (24px), `text-heading-*`系
- **低頻度**: その他大部分

### 問題点

1. **fontWeightがfontSize設定に含まれている**
   - 全30個のカスタムサイズに`fontWeight`が設定されている
   - これにより、`font-semibold`などのクラスが効かない

2. **未使用のサイズが多い**
   - `*-responsive`系はほぼ未使用の可能性
   - `body-xxxxl-140`, `body-xxxl-140`なども未使用の可能性

3. **命名規則が複雑**
   - `heading-xxxs-120`のような長い名前
   - サイズとline-heightが名前に入っている

## 推奨される新しいシステム

### 最小限のカスタムサイズ（fontWeightなし）

```javascript
fontSize: {
  // Body (line-height: 1.4)
  'body-xs': ['14px', { lineHeight: '1.4' }],
  'body-sm': ['16px', { lineHeight: '1.4' }],    // 最も使用頻度が高い
  'body-base': ['18px', { lineHeight: '1.4' }],
  'body-lg': ['21px', { lineHeight: '1.4' }],    // 最も使用頻度が高い
  'body-xl': ['24px', { lineHeight: '1.4' }],
  
  // Heading (line-height: 1.2)
  'heading-sm': ['21px', { lineHeight: '1.2' }],
  'heading-base': ['24px', { lineHeight: '1.2' }],
  'heading-lg': ['28px', { lineHeight: '1.2' }],
  'heading-xl': ['32px', { lineHeight: '1.2' }],
  'heading-2xl': ['40px', { lineHeight: '1.2' }],
  'heading-3xl': ['48px', { lineHeight: '1.2' }],
}
```

### フォントウェイトの分離

フォントウェイトは別クラスで制御：
- `font-normal` (400)
- `font-medium` (500)
- `font-semibold` (600) - 最も使用頻度が高い
- `font-bold` (700)

