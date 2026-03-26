指定されたトピックについて、デザイン原則と実践ガイダンスを検索・統合してください。

## 検索手順（3層構造）

### Layer 1: プロジェクトメモリ（最優先）
プロジェクトメモリファイルから関連する原則を検索:
- typography-principles.md
- color-principles.md
- spacing-layout-principles.md
- component-patterns.md
- interaction-motion.md
- accessibility-principles.md
- data-visualization.md
- design-system-governance.md

### Layer 2: プロジェクトドキュメント
- `docs/architecture/design-system.md` — 実装の単一ソースオブトゥルース
- `tailwind.config.js` — トークン定義
- `app/globals.css` — CSS変数、base layer

### Layer 3: 書籍フルテキスト（深掘りが必要な場合）
トピックに応じて以下のOCRテキストを検索:

**デザインシステムの構築・運用・スケーリング:**
- `/Users/iorikawano/Documents/Auto_screenshots/Design_That_Scales/Design_That_Scales.txt`

**UX戦略・情報アーキテクチャ・ユーザー体験の5層モデル:**
- `/Users/iorikawano/Documents/Auto_screenshots/The_Elements_of_User_Experience/The_Elements_of_User_Experience.txt`

**データ可視化・チャート設計・ダッシュボード構成:**
- `/Users/iorikawano/Documents/Auto_screenshots/Data_Visualization_Basics/データ可視化の基本が全部わかる本.txt`

## 出力フォーマット

### [トピック名] — デザインガイダンス

#### 原則（HIG / MD3 / Encore）
- 関連する原則を箇条書き

#### プロジェクトでの実装
- 現在のトークン/クラス/パターン
- design-system.md からの該当セクション

#### 書籍からの知見（該当する場合）
- 関連する箇所を引用・要約

#### 実践的な推奨
- このトピックに関してコードを書く際の具体的なガイダンス

$ARGUMENTS
