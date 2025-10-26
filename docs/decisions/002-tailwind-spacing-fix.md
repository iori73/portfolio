# ADR-002: Tailwind Spacing 設定の修正

## Status

Accepted

## Date

2025-01-17

## Context

### 問題

ローカルホスト（`localhost:3001`）と公開サイト（`iori-kawano.vercel.app`）で余白（margin/padding）が異なる問題が発覚しました。

具体的には：

- `mb-6`が localhost では 48px、公開サイトでは 24px となっていた
- 他の余白クラスも同様に不一致

### 原因

`tailwind.config.js`で以下のカスタムスケールを定義していたことが原因：

```javascript
spacing: {
  1: '8px',
  2: '16px',
  3: '24px',
  4: '32px',
  5: '40px',
  6: '48px',  // ← Tailwindデフォルト(1.5rem = 24px)を上書き
  7: '56px',
  8: '64px',
  9: '72px',
  10: '80px',
}
```

この設定が Git にコミットされていなかったため、Vercel の公開サイトでは Tailwind のデフォルト値が使用されていました。

## Decision

### 実施した変更

1. **`tailwind.config.js`からカスタム spacing 設定を削除**

   - Tailwind のデフォルトスケール（0.25rem 単位）に戻す
   - `mb-6` = 1.5rem (24px) が確実に適用される

2. **ページレベルのマージン管理を変更**
   - `app/layout.tsx`のグローバルマージン（`my-24 md:mt-28 md:mb-16`）を削除
   - 各ページの最上位コンテナに個別適用：
     - `app/page.tsx`
     - `app/about/page.tsx`
     - `app/blog/page.tsx`
     - `app/experiment/page.tsx`
     - `app/work/2_day_internship/page.tsx`
     - `app/work/2_day_internship_copy/page.tsx`
     - `app/work/google_ux_design_certificate_project/page.tsx`

### Tailwind デフォルトスペーシングスケール

```
1  = 0.25rem = 4px
2  = 0.5rem  = 8px
3  = 0.75rem = 12px
4  = 1rem    = 16px
5  = 1.25rem = 20px
6  = 1.5rem  = 24px
8  = 2rem    = 32px
10 = 2.5rem  = 40px
12 = 3rem    = 48px
16 = 4rem    = 64px
```

## Consequences

### ポジティブ

- ✅ ローカルと公開サイトの表示が完全に一致
- ✅ Tailwind の標準に準拠し、予測可能性が向上
- ✅ チームメンバーや将来の開発者が混乱しない
- ✅ Tailwind CSS のドキュメントがそのまま参照可能

### ネガティブ

- ⚠️ 既存のデザインで`mb-6: 48px`を期待していた箇所は`mb-12`に変更が必要
  - ただし、調査の結果、そのような箇所は発見されず

### 移行時の注意

もし`48px`の余白が必要な場合：

- `mb-6` → `mb-12` に変更
- または `mb-[48px]` のような任意値を使用

## Related Decisions

- [ADR-001: フォントサイズ設定の標準化](001-font-sizing-language-strategy.md) (未作成)

## Technical Details

### その他のカスタム設定

以下のカスタム設定は意図的なもので、保持されています：

1. **`fontSize.sm`**: 1rem (16px) - Tailwind デフォルト(0.875rem = 14px)を上書き

   - これは意図的な設計で、プロジェクト全体で 16px を基準にするため

2. **カスタムフォントサイズ**: `heading-*-120`, `body-*-140`, `caption-*-120`

   - Tailwind のデフォルトと競合しない命名
   - デザインシステムの一部として維持

3. **`borderRadius`**: CSS 変数`--radius`を使用
   - 動的な設定が可能

## References

- GitHub Issue/Commit: 158f056
- Related Files:
  - `tailwind.config.js`
  - `app/layout.tsx`
  - All page components under `app/`
