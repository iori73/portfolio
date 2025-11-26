# Typography System Refactoring Plan

## 現状分析

### 問題点

1. **fontSize設定にfontWeightが含まれている**
   - `text-body-s-140`などに`fontWeight: '400'`が設定されている
   - `font-semibold`を追加しても上書きされない
   - `!important`や詳細度ハックが必要

2. **過剰なカスタムフォントサイズ**
   - 30以上のカスタムサイズが定義されている
   - `heading-*`, `body-*`, `caption-*`の3系統
   - `*-responsive`バージョンも存在

3. **複雑なレスポンシブ対応**
   - モバイル/デスクトップで異なるサイズ
   - `md:text-body-l-140`のようなパターン
   - `useJPFontSize`フックによる言語別調整

4. **shadcn/uiの標準に準拠していない**
   - shadcn/uiは通常、Tailwindの標準タイポグラフィを使用
   - セマンティックなHTMLタグ（h1-h6, p）を推奨
   - `fontSize`設定に`fontWeight`を含めない

### 現在の使用状況

- **最も使用頻度が高い**: `text-body-s-140`, `text-body-l-140`
- **Heading系**: `text-heading-*` (使用頻度: 中)
- **Caption系**: `text-caption-*` (使用頻度: 低)
- **標準Tailwindサイズ**: `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`など (182箇所)

## 再構築案

### 原則

1. **shadcn/uiの標準に準拠**
   - `fontSize`設定から`fontWeight`を削除
   - セマンティックなHTMLタグを使用
   - Tailwindの標準的なタイポグラフィシステムをベースに

2. **最小限のカスタムサイズ**
   - 実際に使用されているサイズのみ保持
   - 不要なサイズは削除

3. **fontWeightの分離**
   - `fontSize`設定には`fontSize`と`lineHeight`のみ
   - `fontWeight`は別クラス（`font-normal`, `font-medium`, `font-semibold`, `font-bold`）で制御

4. **レスポンシブ対応の簡素化**
   - Tailwindの標準的な`md:`プレフィックスを使用
   - 必要最小限のレスポンシブサイズのみ

### 提案する新しいシステム

#### 1. fontSize設定の簡素化

```javascript
fontSize: {
  // 標準Tailwindサイズをベースに、必要最小限のカスタムサイズを追加
  // fontWeightは含めない
  
  // 実際に使用されているサイズのみ保持
  'body-sm': ['16px', { lineHeight: '1.4' }],      // 16px (text-body-s-140相当)
  'body-base': ['18px', { lineHeight: '1.4' }],    // 18px (text-body-m-140相当)
  'body-lg': ['21px', { lineHeight: '1.4' }],     // 21px (text-body-l-140相当)
  'body-xl': ['24px', { lineHeight: '1.4' }],     // 24px (text-body-xl-140相当)
  
  // Heading系（必要最小限）
  'heading-sm': ['24px', { lineHeight: '1.2' }],  // 24px
  'heading-base': ['28px', { lineHeight: '1.2' }], // 28px
  'heading-lg': ['32px', { lineHeight: '1.2' }],  // 32px
  'heading-xl': ['40px', { lineHeight: '1.2' }],  // 40px
  'heading-2xl': ['48px', { lineHeight: '1.2' }], // 48px
}
```

#### 2. 使用パターンの統一

**Before:**
```tsx
<p className="font-inter text-body-s-140 md:text-body-l-140 font-semibold mb-2">
  Title
</p>
```

**After:**
```tsx
<h4 className="font-inter text-body-sm md:text-body-lg font-semibold mb-2">
  Title
</h4>
```

#### 3. globals.cssの整理

- `fontSize`設定の`fontWeight`を削除
- 詳細度ハックを削除
- シンプルなユーティリティクラスのみ

### 移行計画

#### Phase 1: 設定の修正
1. `tailwind.config.js`の`fontSize`から`fontWeight`を削除
2. 使用されていないサイズを削除
3. 必要最小限のサイズのみ保持

#### Phase 2: コードの移行
1. `text-body-s-140` → `text-body-sm`
2. `text-body-l-140` → `text-body-lg`
3. `text-heading-*` → `text-heading-*` (新しい命名)
4. `font-semibold`が正しく動作することを確認

#### Phase 3: クリーンアップ
1. 未使用のカスタムサイズを削除
2. `globals.css`のハックを削除
3. ドキュメントの更新

### メリット

1. **保守性の向上**
   - `!important`や詳細度ハックが不要
   - シンプルで理解しやすい

2. **shadcn/uiとの互換性**
   - 標準的なTailwindパターンに準拠
   - コンポーネントライブラリとの統合が容易

3. **スケーラビリティ**
   - 新しいサイズの追加が容易
   - 一貫性のあるシステム

4. **パフォーマンス**
   - 不要なCSSの削減
   - より小さなバンドルサイズ

### 注意点

1. **既存コードへの影響**
   - 398箇所の使用箇所を移行する必要がある
   - 段階的な移行が必要

2. **言語別のサイズ調整**
   - `useJPFontSize`フックの見直しが必要
   - または、コンポーネントレベルでの対応

3. **デザインシステムの一貫性**
   - 既存のデザインとの整合性を保つ
   - 視覚的な変更を最小限に

