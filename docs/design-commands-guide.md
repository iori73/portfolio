# Design System Custom Commands — 使い方ガイド

> Claude Code のカスタムスラッシュコマンドを使って、デザインシステムの品質を維持する。
>
> **コマンドファイル**: `.claude/commands/` 配下
> **知識ベース**: メモリファイル（HIG / Material Design 3 / Spotify Encore + 書籍から抽出した原則）

---

## コマンド一覧

| コマンド | 用途 | いつ使う？ |
|---|---|---|
| `/design-review` | ファイル単位の準拠チェック | コンポーネント作成・修正後 |
| `/design-audit` | コードベース全体の違反検出 | 定期チェック、リリース前 |
| `/design-ref` | デザイン原則の深掘り検索 | 設計判断に迷った時 |
| `/component-scaffold` | 規約準拠コンポーネント生成 | 新コンポーネント作成時 |

---

## `/design-review`

**1ファイルをデザインシステム基準で評価する。**

### 使い方

```
/design-review components/podcast-notes/NoteCard.tsx
```

### チェック項目
1. **Color** — hardcoded hex → セマンティックトークン違反
2. **Typography** — インライン fontFamily/fontWeight、レガシースケール使用
3. **Font Hooks** — `getHeadingFontClass()` / `getBodyFontClass()` の適用漏れ
4. **Spacing** — arbitrary values、不一致な余白
5. **Components** — タグ/CTA/メタラベルのパターン準拠
6. **Accessibility** — タッチターゲット、alt属性、セマンティックHTML

### 出力例
```
### [Typography] 見出しにフォントフック未使用
- ファイル: NoteCard.tsx:65
- 現在: `${bodyFontClass}`
- 問題: h4 見出しに bodyFontClass が適用されている
- 修正案: `${headingFontClass}` に変更
- 根拠: design-system.md §1.3
```

---

## `/design-audit`

**コードベース全体を走査し、違反のサマリーテーブルを出力する。**

### 使い方

```
/design-audit
```

引数なしで実行。`app/`, `components/`, `src/` 内の全 `.tsx` / `.ts` を対象とする。

### 出力例
```
| カテゴリ | 違反数 | 重要度 |
|---|---|---|
| Color: hardcoded hex | 157 | High |
| Typography: inline styles | 3 | High |
| Typography: legacy scale | 25 | Medium |
```

### 典型的なワークフロー
1. `/design-audit` で全体の違反数を把握
2. 重要度 High のファイルを特定
3. `/design-review [file]` で詳細確認
4. 修正後、再度 `/design-audit` で改善を確認

---

## `/design-ref`

**デザイン原則を3層で検索し、統合的なガイダンスを返す。**

### 使い方

```
/design-ref typography
/design-ref color hierarchy
/design-ref chart selection
/design-ref design system scaling
```

### 検索の3層構造

1. **Layer 1: メモリファイル**（最優先）
   - typography-principles.md, color-principles.md 等
   - HIG/MD3/Encore の原則がプロジェクトのトークンにマッピング済み

2. **Layer 2: プロジェクトドキュメント**
   - `docs/architecture/design-system.md` — 実装の単一ソースオブトゥルース
   - `tailwind.config.js`, `app/globals.css`

3. **Layer 3: 書籍フルテキスト**（深掘り時）
   - **Design That Scales** — デザインシステムの構築・運用・スケーリング
   - **The Elements of User Experience** — UX戦略・情報アーキテクチャ
   - **データ可視化の基本が全部わかる本** — チャート設計・ダッシュボード構成

### いつ使う？
- 「このタイプスケールの判断根拠は？」→ `/design-ref typography`
- 「Pie chart と Bar chart どっちが良い？」→ `/design-ref chart selection`
- 「新しいトークンを追加すべき基準は？」→ `/design-ref token governance`

---

## `/component-scaffold`

**デザインシステム規約に完全準拠した新コンポーネントを生成する。**

### 使い方

```
/component-scaffold ProjectCard
/component-scaffold TagList
```

### 自動適用されるルール
- セマンティックカラートークン（hardcoded hex 禁止）
- セマンティックタイポグラフィスケール（`text-headline`, `text-body` 等）
- フォントフック（`getHeadingFontClass()`, `getBodyFontClass()`）
- i18n 対応（`useTranslations()`）
- モバイルファースト レスポンシブ
- アクセシビリティ（タッチターゲット、セマンティックHTML、フォーカス状態）
- 正しいインポート順序

---

## 知識ベースの構成

### メモリファイル（自動ロード）

セッション開始時に Claude が自動参照する。コード生成に暗黙的に反映される。

| ファイル | 内容 |
|---|---|
| `typography-principles.md` | タイプスケール、フォントペアリング、weight使い分け |
| `color-principles.md` | セマンティックカラーロール、opacity戦略 |
| `spacing-layout-principles.md` | グリッド、タッチターゲット、余白階層 |
| `component-patterns.md` | コンテナ形状、state layer、ナビパターン |
| `interaction-motion.md` | duration/easing、spring、reduced-motion |
| `accessibility-principles.md` | コントラスト、フォーカス、WCAG 2.1 AA |
| `data-visualization.md` | チャート選択、data-ink ratio |
| `design-system-governance.md` | トークン追加基準、移行戦略 |

### 参照ガイドライン
- **Apple Human Interface Guidelines (HIG)**
- **Google Material Design 3**
- **Spotify Encore Design System**

### 参照書籍
- **Design That Scales** (Dan Mall) — パイロットファースト戦略、Three-Instance Rule
- **The Elements of User Experience** (Jesse James Garrett) — UX の5層モデル
- **データ可視化の基本が全部わかる本** — 5Wフレームワーク、Visual Encoding Hierarchy

---

## 推奨ワークフロー

### 新コンポーネント作成時
1. `/component-scaffold ComponentName` で雛形生成
2. 実装
3. `/design-review path/to/Component.tsx` で準拠チェック
4. 指摘事項を修正

### 定期メンテナンス
1. `/design-audit` で全体の状態確認
2. 違反の多いファイルを `/design-review` で詳細確認
3. 段階的に修正

### 設計判断時
1. `/design-ref [topic]` で原則を確認
2. メモリの原則 + 書籍の詳細を統合して判断
