# Portfolio - Lessons Learned

> バグ修正、設計変更、大きな方向転換の後に記録する。
> 同じミスを繰り返さないための学びの蓄積。

---

## 2026-02-23: デザインシステム整理

### インライン fontFamily style の乱立
**状況**: 各 Work ページの h2/h3 に `style={{ fontFamily: 'Helvetica Neue, ...', fontWeight: 500 }}` がハードコードされていた。`@layer base` で既に同じフォントが適用されているにもかかわらず。

**原因**: `getHeadingFontClass()` の仕組みが確立される前にページが作られ、その後の統一が漏れた。

**教訓**:
- フォントスタイルは `src/hooks/useFonts.ts` のフックで一元管理する
- `@layer base` で h1-h6 に自動適用されるデフォルトを信頼する
- 新しい Work ページを追加する時はインライン style を使わない

### hardcoded hex カラーの散在
**状況**: `text-[#0A0A0A]`, `text-[#333333]`, `text-[#656d76]`, `text-[#0000008f]` 等の hex 値が各ページに直接書かれていた。

**教訓**:
- セマンティックカラートークン（`text-ink`, `text-ink-secondary` 等）を使う
- 新しいページを作る時は design-system.md のトークン表を参照する
- `tailwind.config.js` に定義された色のみ使用し、arbitrary value `[#xxx]` は避ける

### ClassName 重複の罠
**状況**: `style={...}` を `className={...}` に置換する際、既存の `className="..."` と新しい `className={...}` が重複し、JSX エラーになった。

**教訓**:
- 属性の追加ではなく、既存の className にテンプレートリテラルで統合する
- `className="foo"` → `className={\`foo ${dynamicClass}\`}` のパターンを使う

### useFonts.ts の font-regular バグ
**状況**: `getBodyFontClass()` が日本語ロケールで `font-regular` を返していたが、Tailwind に `font-regular` クラスは存在しない。

**教訓**:
- Tailwind のユーティリティクラスは正式名称を使う（`font-light`, `font-normal`, `font-medium`, `font-bold`）
- `font-regular` は Tailwind には存在しない

---

## 2026-03-26: NoteCard デザインレビューで発覚したパターン

### 見出し要素に bodyFontClass が使われていた
**状況**: NoteCard の h4 に `bodyFontClass`（Helvetica Neue / Noto Sans JP Light）が渡されていた。見出しには `headingFontClass`（Switzer / Noto Sans JP Medium）を使うべき。

**原因**: コンポーネント作成時に bodyFontClass しか props に含めず、見出しにも同じクラスを流用していた。

**教訓**:
- 見出し要素 (h1-h6) には必ず `headingFontClass` を使う
- コンポーネントが見出しと本文の両方を含む場合、両方の font class を props で受け取る
- `/design-review` コマンドでチェック可能

### メタテキストのサイズが本文と同じだった
**状況**: ポッドキャスト名、日付、duration 等のメタ情報に `text-body` (16px) が使われ、見出しとの階層が不明瞭だった。

**教訓**:
- メタ情報・補助テキスト → `text-body-sm` (13-14px)
- タグ・ラベル → `text-label` (13-14px) + `font-space-grotesk`
- 本文 → `text-body` (16px)
- design-system.md §1.6 の本文サイズ表を必ず参照する

---

## 2025-01-17: Tailwind spacing のローカル vs 本番不一致

> ADR: docs/decisions/002-tailwind-spacing-fix.md

**状況**: カスタム Tailwind spacing を定義したら、ローカルと Vercel 本番で異なるレンダリングになった。

**教訓**:
- Tailwind のカスタム spacing を定義する場合、`extend` 内に書かないとデフォルトが上書きされる
- 問題が複雑な場合はカスタム値を削除してデフォルトに戻す判断も重要
