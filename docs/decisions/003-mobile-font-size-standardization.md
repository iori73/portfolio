# ADR-003: ワーク詳細ページのモバイルフォントサイズ標準化

## Status

Accepted

## Date

2025-01-17

## Context

### 問題

ワーク詳細ページ（`app/work/2_day_internship/page.tsx` および `app/work/2_day_internship_copy/page.tsx`）において、本文テキストのフォントサイズがモバイルとデスクトップで以下のようになっていました：

- デスクトップ: `text-body-l-140` (21px)
- モバイル: `text-body-m-140` (18px)

しかし、ユーザーテストとデザインレビューの結果、モバイル幅では 16px の方が読みやすく、適切であると判断されました。

### 既存の設計

ホームページ（`app/page.tsx`）では、言語の特性（英語と日本語の文字の特徴の違い）により、意図的に異なるフォントサイズを使用しています。この設計は維持されるべきです。

## Decision

ワーク詳細ページの本文テキストについて、以下の標準化を実施：

### 変更前

- モバイル: `text-body-m-140` (18px)
- デスクトップ: `text-body-l-140` (21px)

### 変更後

- モバイル: `text-body-s-140` (16px)
- デスクトップ: `text-body-l-140` (21px)
- **ダウングレード比率: 約 76% (21px → 16px)**

### 対象ファイルと箇所

#### `app/work/2_day_internship/page.tsx`

✅ 修正完了（9 箇所）

- Overview 本文
- シナリオ説明とリスト
- Design Process 本文とリスト
- Solution 各セクション本文（3 箇所）
- Reflection 各セクションリスト（2 箇所）

#### `app/work/2_day_internship_copy/page.tsx`

🔄 修正予定（17 箇所）

- Overview 本文
- Overview チャレンジ説明
- Overview リスト
- ロール説明
- Design Process 本文
- Design Process リスト
- Solution 各セクション本文（4 箇所）
- Impact & Reflection リスト（3 箇所）

### 適用方法

`jpFontSize` フックの呼び出しを簡略化：

```typescript
// 変更前
jpFontSize('text-body-m-140', 'text-body-l-140', 'text-body-s-140', 'text-body-m-140');

// 変更後
jpFontSize('text-body-s-140', 'text-body-l-140');
```

注意: `useJPFontSize` フックは、日本語用サイズが指定されていない場合、英語と同じサイズを使用するように修正済み（ADR-002 参照）。

## Consequences

### ポジティブ

- ✅ モバイルでの可読性が向上
- ✅ デスクトップとモバイルの比率が一貫
- ✅ コードが簡潔になり保守性が向上
- ✅ 英語と日本語で統一されたサイズにより、言語切り替え時の違和感が減少

### ネガティブ

- ⚠️ モバイルで表示される情報量がわずかに減少（18px → 16px）
- ⚠️ 既存の`text-body-m-140`を使用している他の箇所との整合性確認が必要

### 今後の考慮事項

- 他のワークページを追加する際は、この標準を適用
- ユーザーフィードバックに基づき、16px が本当に最適かを継続的に評価
- アクセシビリティ（視覚障害者向け）の観点から、フォントサイズ調整機能の追加を検討

## Related Decisions

- [ADR-001: 日本語と英語のフォントサイズ戦略](001-font-sizing-language-strategy.md) (未作成)
- [ADR-002: Tailwind Spacing 設定の修正](002-tailwind-spacing-fix.md)

## References

- `src/lib/i18n.tsx`: `useJPFontSize` フックの実装
- `tailwind.config.js`: フォントサイズスケールの定義
- `docs/architecture/design-system.md`: デザインシステム全体の概要
