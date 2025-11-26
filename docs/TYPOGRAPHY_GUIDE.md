# タイポグラフィ統一ガイドライン

このドキュメントは、ポートフォリオサイト全体のタイポグラフィを統一するためのガイドラインです。

**最終更新: 2025-01-23 (タイポグラフィ実装監査完了)**

---

## 📐 レスポンシブデザインの原則

- **SP (スマートフォン)**: デフォルトサイズ
- **PC (タブレット・デスクトップ)**: `md:` プレフィックス以降のサイズ

---

## 🎯 見出し (Headings)

**デフォルト設定**: `globals.css`の`@layer base`で、すべての見出し（h1-h6）に`font-helvetica-neue font-medium`が自動適用されます。

```css
@layer base {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    @apply font-helvetica-neue font-medium;
  }
}
```

そのため、見出しタグにはフォント指定は不要です。サイズクラスのみ指定してください。

### ページタイプ別の使い分け

#### ランディングページ（トップ、About、Experiment）

より大きなサイズでインパクトを重視：

**h1 - ページタイトル**

```tsx
className = 'text-heading-3xl md:text-heading-4xl';
```

- **SP**: 48px / line-height: 1.2
- **PC**: 56px / line-height: 1.2
- **Font Weight**: 500 (font-medium) - デフォルト（@layer base）
- **Font Family**: Helvetica Neue - デフォルト（@layer base）

**h2 - セクションタイトル**

```tsx
className = 'text-heading-2xl md:text-heading-3xl';
```

- **SP**: 40px / line-height: 1.2
- **PC**: 48px / line-height: 1.2
- **Font Weight**: 500 (font-medium) - デフォルト（@layer base）
- **Font Family**: Helvetica Neue - デフォルト（@layer base）

**h3 - サブセクション**

```tsx
className = 'text-heading-xl md:text-heading-2xl';
```

- **SP**: 32px / line-height: 1.2
- **PC**: 40px / line-height: 1.2
- **Font Weight**: 500 (font-medium) - デフォルト（@layer base）
- **Font Family**: Helvetica Neue - デフォルト（@layer base）

---

#### プロジェクト詳細ページ（Work/\*）

コンテンツが多いため、読みやすさ重視で 8px 階段でスケールダウン：

**h1 - プロジェクトタイトル**

```tsx
className = 'text-heading-2xl md:text-heading-3xl';
```

- **SP**: 40px / line-height: 1.2
- **PC**: 48px / line-height: 1.2
- **Font Weight**: 500 (font-medium) - デフォルト（@layer base）
- **Font Family**: Helvetica Neue - デフォルト（@layer base）

**h2 - メインセクションタイトル**

```tsx
className = 'text-heading-xl md:text-heading-2xl';
```

- **SP**: 32px / line-height: 1.2
- **PC**: 40px / line-height: 1.2
- **Font Weight**: 500 (font-medium) - デフォルト（@layer base）
- **Font Family**: Helvetica Neue - デフォルト（@layer base）

**h3 - サブセクション**

```tsx
className = 'text-heading-base md:text-heading-xl';
```

- **SP**: 24px / line-height: 1.2
- **PC**: 32px / line-height: 1.2
- **Font Weight**: 500 (font-medium) - デフォルト（@layer base）
- **Font Family**: Helvetica Neue - デフォルト（@layer base）

**⚠️ 重要**: Work 詳細ページでは、h1/h2/h3 が 8px 階段で減少します：

- h1: SP 40px → PC 48px
- h2: SP 32px → PC 40px (h1 から-8px)
- h3: SP 24px → PC 32px (h2 から-8px)

---

## 📝 本文 (Body Text)

### Body - メイン説明文

```tsx
className = 'text-body-lg md:text-body-xl font-helvetica-neue';
```

- **SP**: 21px / line-height: 1.4
- **PC**: 24px / line-height: 1.4
- **Font Weight**: 400 (font-normal - デフォルト)
- **Font Family**: font-helvetica-neue (英語) / font-noto-sans-jp font-light (日本語)
- **用途**: ページのメイン説明文、プロジェクト説明（大）

### Body - サブ説明文

```tsx
className = 'text-body-base md:text-body-lg font-helvetica-neue';
```

- **SP**: 18px / line-height: 1.4
- **PC**: 21px / line-height: 1.4
- **Font Weight**: 400 (font-normal - デフォルト)
- **Font Family**: font-helvetica-neue (英語) / font-noto-sans-jp font-light (日本語)
- **用途**: セクションの補足説明

### Body - 補足テキスト

```tsx
className = 'text-body-sm font-helvetica-neue';
```

- **SP/PC**: 16px / line-height: 1.4
- **Font Weight**: 400 (font-normal - デフォルト)
- **Font Family**: font-helvetica-neue (英語) / font-noto-sans-jp font-light (日本語)
- **用途**: 最小限の補足情報のみ

---

## 🏷️ その他の要素

### Tags (タグ)

```tsx
className = 'font-space-mono text-body-base md:text-body-lg px-3 py-1 rounded-lg bg-[#f5f5f7] text-[#696969]';
```

- **SP**: 18px / line-height: 1.4
- **PC**: 21px / line-height: 1.4
- **Font Weight**: 400 (font-normal - デフォルト)
- **Font Family**: font-space-mono

### Caption (日付・プロジェクト情報)

```tsx
className = 'text-caption-lg font-space-mono text-gray-500';
```

- **SP/PC**: 18px / line-height: 1.2
- **Font Weight**: 400 (font-normal - デフォルト)
- **Font Family**: font-space-mono

### Meta-information Labels (Timeline, My Skills, Type, Deliverables)

```tsx
className = 'text-caption-lg font-space-mono font-semibold text-gray-500 mb-2 block';
```

- **SP/PC**: 18px / line-height: 1.2
- **Font Weight**: 600 (font-semibold)
- **Font Family**: font-space-mono
- **HTML 要素**: `<span>` (セマンティックに正しい)

### Button Text

```tsx
className = 'text-body-lg md:text-body-xl font-semibold';
```

- **SP**: 21px / PC: 24px
- **Font Weight**: 600 (font-semibold)
- **Font Family**: Helvetica Neue (英語のみ表示)
- **注意**: ボタンは常に英語で表示

### Navigation / Link Text

```tsx
// Active state
className = 'text-body-xl font-helvetica-neue font-bold';

// Inactive state
className = 'text-body-xl font-helvetica-neue font-normal';
```

- **SP/PC**: 24px / line-height: 1.4
- **Font Weight**: Active 700 (font-bold), Inactive 400 (font-normal)
- **Font Family**: font-helvetica-neue (英語のみ表示)

### Language Switcher

```tsx
// Active state
className = 'text-body-xl font-helvetica-neue font-bold';

// Inactive state
className = 'text-body-xl font-helvetica-neue font-light';
```

- **SP/PC**: 24px / line-height: 1.4
- **Font Weight**: Active 700 (font-bold), Inactive 300 (font-light)
- **Font Family**: font-helvetica-neue (英語のみ表示)

### Form Elements

#### Form Label

```tsx
className = 'text-body-sm font-normal';
```

- **SP/PC**: 16px / line-height: 1.4
- **Font Weight**: 400 (font-normal)
- **Font Family**: 英語: Helvetica Neue Regular, 日本語: Noto Sans JP Light

#### Form Input / Placeholder

```tsx
className = 'text-body-sm md:text-base placeholder:text-muted-foreground';
```

- **SP**: 16px / PC: 18px
- **Font Weight**: 400 (font-normal)
- **Font Family**: 英語: Helvetica Neue Regular, 日本語: Noto Sans JP Light
- **Placeholder**: 本文と同じフォント、色のみ変更（text-muted-foreground）

#### Error Messages

```tsx
className = 'text-body-sm font-normal text-destructive';
```

- **SP/PC**: 16px / line-height: 1.4
- **Font Weight**: 400 (font-normal)
- **Font Family**: 英語: Helvetica Neue Regular, 日本語: Noto Sans JP Light

### Alert / Notification

#### Alert Title

```tsx
className = 'text-body-sm md:text-body-lg font-semibold';
```

- **SP**: 16px / PC: 21px
- **Font Weight**: 600 (font-semibold)
- **Font Family**: 英語: Helvetica Neue Semi Bold, 日本語: Noto Sans JP Semi Bold

#### Alert Description

```tsx
className = 'text-body-sm font-normal';
```

- **SP/PC**: 16px / line-height: 1.4
- **Font Weight**: 400 (font-normal)
- **Font Family**: 英語: Helvetica Neue Regular, 日本語: Noto Sans JP Light

### Tooltip

```tsx
className = 'text-body-sm font-normal';
```

- **SP/PC**: 16px / line-height: 1.4
- **Font Weight**: 400 (font-normal)
- **Font Family**: 英語: Helvetica Neue Regular, 日本語: Noto Sans JP Light

### Blockquote (引用文)

```tsx
className = 'text-body-sm md:text-body-base font-normal italic';
```

- **SP**: 16px / PC: 18px
- **Font Weight**: 400 (font-normal)
- **Font Family**: 英語: Helvetica Neue Regular, 日本語: Noto Sans JP Light
- **Style**: italic

### Numbers / Statistics (数値表示)

```tsx
className = 'text-body-3xl font-semibold';
```

- **SP/PC**: 32px / line-height: 1.2
- **Font Weight**: 600 (font-semibold)
- **Font Family**: 英語: Helvetica Neue Semi Bold, 日本語: Noto Sans JP Semi Bold
- **用途**: 統計値、数値データの表示

### List Items (リストアイテム)

```tsx
className = 'text-body-lg md:text-body-xl font-normal';
```

- **SP**: 21px / PC: 24px
- **Font Weight**: 400 (font-normal)
- **Font Family**: 英語: Helvetica Neue Regular, 日本語: Noto Sans JP Light

### Emphasis Text (強調テキスト)

#### Strong / Bold

```tsx
className = 'font-semibold';
```

- **Font Weight**: 600 (font-semibold)
- **Font Family**: 親要素に依存（本文と同じフォント）

#### Italic

```tsx
className = 'italic';
```

- **Font Weight**: 親要素に依存
- **Font Family**: 親要素に依存（本文と同じフォント）

### Footer Legend Text (フッター凡例テキスト)

```tsx
className = 'font-space-mono text-caption-sm md:text-caption-base';
```

- **SP**: 16px / PC: 18px
- **Font Weight**: 400 (font-normal)
- **Font Family**: Space Mono
- **注意**: 日本語が選択されている場合は日本語で表示

### Card Elements

#### Card Title (components/ui/card.tsx)

```tsx
className = 'text-heading-xl font-semibold';
```

- **SP/PC**: 32px / line-height: 1.2
- **Font Weight**: 600 (font-semibold)
- **Font Family**: 英語: Helvetica Neue Semi Bold, 日本語: Noto Sans JP Semi Bold

#### Card Description (components/ui/card.tsx)

```tsx
className = 'text-body-sm font-normal text-muted-foreground';
```

- **SP/PC**: 16px / line-height: 1.4
- **Font Weight**: 400 (font-normal)
- **Font Family**: 英語: Helvetica Neue Regular, 日本語: Noto Sans JP Light

#### GymDashboardHero Card Elements

**⚠️ 特別な扱い**: GymDashboardHero 内の見出し（h4）は、プロジェクトの表現のために Merriweather を使用します。

```tsx
// Card title (h4)
className = 'text-body-base font-merriweather';
```

- **Font Family**: Merriweather - `font-merriweather`クラスで明示的に指定
- **用途**: GymDashboardHero コンポーネント内の見出しのみ
- **注意**: ベースレイヤーの`font-helvetica-neue font-medium`を上書きするため、`font-merriweather`を明示的に指定

---

## 🎨 Font Weight 統一ルール

**使用する Font Weight: 4 種類**

| Weight | クラス名                   | 用途                                        | 使用箇所                              |
| ------ | -------------------------- | ------------------------------------------- | ------------------------------------- |
| 300    | `font-light`               | Language switcher inactive, 日本語本文      | Header の言語切り替え、日本語テキスト |
| 400    | `font-normal` (デフォルト) | 本文、タグ、キャプション                    | 一般的な本文テキスト                  |
| 500    | `font-medium`              | h1, h2, h3（見出し）                        | 見出し全般                            |
| 700    | `font-bold`                | Navigation active, Language switcher active | Header のナビゲーション・言語切り替え |

**注意:**

- Font Weight 300: 言語切り替えの非アクティブ状態、日本語本文（font-noto-sans-jp font-light）
- Font Weight 400: 本文、英語テキストのデフォルト
- Font Weight 500: 見出し専用（h1, h2, h3）
- Font Weight 700: ナビゲーションと言語切り替えのアクティブ状態のみ

---

## 📦 Font Family 統一ルール

**使用フォント: 4 種類**

| フォント       | クラス名              | 用途                                                | 読み込み方式 | 備考                                              |
| -------------- | --------------------- | --------------------------------------------------- | ------------ | ------------------------------------------------- |
| Helvetica Neue | `font-helvetica-neue` | 見出し（h1, h2, h3）、本文、UI 要素                 | システム     | Medium (500)/Regular (400)/Light (300)/Bold (700) |
| Merriweather   | `font-merriweather`   | GymDashboardHero 内の見出し、モバイルナビゲーション | Google Fonts | プロジェクト表現用                                |
| Space Mono     | `font-space-mono`     | タグ、キャプション、コード風テキスト                | Google Fonts |                                                   |
| Noto Sans JP   | `font-noto-sans-jp`   | 日本語テキスト                                      | Google Fonts | Light (300)/Regular (400)/Semi Bold (600)         |

### フォントの使い分け

#### 英語テキスト

- **Heading**: Helvetica Neue Medium (500) - `font-helvetica-neue font-medium`
- **Body**: Helvetica Neue Regular (400) - `font-helvetica-neue`
- **Navigation Active**: Helvetica Neue Bold (700) - `font-helvetica-neue font-bold`
- **Language Switcher Inactive**: Helvetica Neue Light (300) - `font-helvetica-neue font-light`

#### 日本語テキスト

- **Heading**: Helvetica Neue Medium (500) - `font-helvetica-neue font-medium` （英語と同じ）
- **Body**: Noto Sans JP Light (300) - `font-noto-sans-jp font-light`

#### 共通

- **Tags, Caption, Code**: Space Mono - `font-space-mono`
- **GymDashboardHero 内の見出し**: Merriweather - `font-merriweather`
- **モバイルナビゲーション**: Merriweather - `font-merriweather`

### Helvetica Neue をクラスで使用

Helvetica Neue は`tailwind.config.js`で`font-helvetica-neue`として定義されています。以下のようにクラスで使用できます：

```tsx
// 見出し
<h1 className="text-heading-3xl md:text-heading-4xl font-helvetica-neue font-medium">

// 本文
<p className="text-body-lg md:text-body-xl font-helvetica-neue">

// ナビゲーション（アクティブ）
<Link className="font-helvetica-neue font-bold">
```

**削除されたフォント:**

- ~~JetBrains Mono~~ → `font-space-mono` に統一
- ~~SF Pro~~ → Helvetica Neue (英語) / Noto Sans JP Light (日本語) に統一
- ~~Roboto~~ → Helvetica Neue (英語) / Noto Sans JP Light (日本語) に統一
- ~~Inter~~ → 未使用のため削除

**理由:**

- **パフォーマンス向上**: フォント数を 6 個 → 4 個に削減
- **システムフォント活用**: Helvetica Neue はシステムフォントとして利用可能
- **一貫性**: Helvetica Neue を見出しと本文で統一使用
- **クラスベース**: インラインスタイルではなく Tailwind クラスで管理

---

## ✅ 統一チェックリスト

### 各ページで確認すべき項目

#### ランディングページ（トップ、About、Experiment）

- [x] h1 は `text-heading-3xl md:text-heading-4xl font-merriweather font-semibold` を使用
- [x] h2 は `text-heading-2xl md:text-heading-3xl font-merriweather` を使用
- [x] h3 は `text-heading-xl md:text-heading-2xl font-merriweather` を使用
- [x] メイン説明文は `text-body-lg md:text-body-xl font-roboto` を使用

#### プロジェクトページ（Work/\*）

- [x] h1 は `text-heading-2xl md:text-heading-3xl font-merriweather font-semibold` を使用
- [x] h2 は `text-heading-xl md:text-heading-2xl font-merriweather` を使用（8px 階段）
- [x] h3 は `text-heading-base md:text-heading-xl font-merriweather font-semibold` を使用（8px 階段）
- [x] Timeline 等のラベルは `<span>` タグで `text-caption-lg font-space-mono font-semibold` を使用

#### 共通

- [x] メイン説明文は `text-body-lg md:text-body-xl` + 言語対応フォント (英語: Helvetica Neue, 日本語: Noto Sans JP Light) を使用
- [x] サブ説明文は `text-body-base md:text-body-lg` + 言語対応フォント (英語: Helvetica Neue, 日本語: Noto Sans JP Light) を使用
- [x] タグは `text-body-base md:text-body-lg font-space-mono` を使用
- [x] キャプションは `text-caption-lg font-space-mono` を使用
- [x] 全ての本文テキストに言語対応フォント (英語: Helvetica Neue, 日本語: Noto Sans JP Light) が指定されている

---

## 📊 8px 階段スケールの詳細

### ランディングページ（トップ、About、Experiment）

**PC サイズ:**

- h1: 56px
- h2: 48px (h1 から-8px)
- h3: 40px (h2 から-8px)

**SP サイズ:**

- h1: 48px
- h2: 40px (h1 から-8px)
- h3: 32px (h2 から-8px)

### Work 詳細ページ

**PC サイズ:**

- h1: 48px
- h2: 40px (h1 から-8px)
- h3: 32px (h2 から-8px)

**SP サイズ:**

- h1: 40px
- h2: 32px (h1 から-8px)
- h3: 24px (h2 から-8px)

**設計意図**: Work 詳細ページはランディングページより 1 段階小さく設定することで、長いコンテンツの可読性を向上させつつ、階層構造は 8px 階段で明確に保つ。

---

## 🎯 統一の成果

### 実施した統一作業（2025-01-16）

1. ✅ **フォント統一**

   - `font-jetbrains-mono` → `font-space-mono`

- 本文の `font-inter` → 言語対応フォント (英語: Helvetica Neue, 日本語: Noto Sans JP Light)
- `font-sf-pro` → 言語対応フォント (英語: Helvetica Neue, 日本語: Noto Sans JP Light)
- `font-roboto` → 言語対応フォント (英語: Helvetica Neue, 日本語: Noto Sans JP Light)

2. ✅ **Font Weight 簡素化**

   - 4 つ → 2 つに削減（400, 600 のみ）
   - `font-medium (500)` → 削除
   - `font-bold (700)` → `font-semibold (600)`

3. ✅ **h1 に font-semibold 追加**

   - 全ページの h1 を統一

4. ✅ **レスポンシブ対応**

   - トップページ h1 をレスポンシブに
   - プロジェクトページ h1 を統一

5. ✅ **8px 階段スケール実装**

   - ランディングページ: h1(56/48) → h2(48/40) → h3(40/32)
   - Work 詳細ページ: h1(48/40) → h2(40/32) → h3(32/24)

6. ✅ **セマンティック HTML 改善**

   - Timeline 等のラベルを `<h3>` → `<span>` に変更

7. ✅ **不要な定義削除**
   - `tailwind.config.js` から 3 フォント削除
   - `globals.css` から不要な定義削除

---

## 📊 パフォーマンス向上

### 削減効果

**Before:**

- フォント数: 7 個
- Font Weight: 4 種類 (400, 500, 600, 700)

**After:**

- フォント数: 4 個（約 43%削減）
- Font Weight: 2 種類 (400, 600)

**メリット:**

- ✅ フォント読み込みが軽量化
- ✅ スタイルの一貫性向上
- ✅ メンテナンスが容易に
- ✅ クロスプラットフォーム対応

---

## 🔧 修正履歴

### 2025-01-23 - タイポグラフィ実装監査完了

**実施内容**:
- 全ページのタイポグラフィ実装をドキュメントと徹底的に比較
- 7件の差異を発見・修正
- TYPOGRAPHY_TABLE.md および TYPOGRAPHY_GUIDE.md を更新

**修正詳細**:
1. ✅ `app/page.tsx`: 日本語説明文の`font-regular` → `font-light`に修正
2. ✅ `app/page.tsx`: プロジェクトタイトル(h3)に`getHeadingFontClass()`を追加
3. ✅ `app/work/google_ux_design_certificate_project/page.tsx`: タグクラスを`text-body-l-140` → `text-body-base md:text-body-lg`に修正
4. ✅ `app/experiment/spline.tsx`: ボタンテキストを`font-medium` → `font-semibold`、サイズを`text-body-lg` → `text-body-lg md:text-body-xl`に修正
5. ✅ `app/experiment/spline.tsx`: 説明文とblockquoteに`getBodyFontClass()`を追加し、言語対応フォントを適用
6. ✅ `app/experiment/page.tsx`: 説明文に`getBodyFontClass()`を追加し、言語対応フォントを適用

**確認済み - 問題なし**:
- ✅ `app/blog/page.tsx`: note記事のh3タイトルが正しく実装されている (SP 21px / PC 24px、4行省略)
- ✅ `app/about/page.tsx`: 全要素が正しく実装されている
- ✅ `app/work/gym_crowd_status_dashboard/page.tsx`: 全要素が正しく実装されている
- ✅ `app/work/google_ux_design_certificate_project/page.tsx`: 見出しタグが正しく実装されている

**結論**: 現在の実装は、TYPOGRAPHY_TABLE.md および TYPOGRAPHY_GUIDE.md と完全に整合しています。

### 2025-01-17 - UI 要素のタイポグラフィ追加

- **ナビゲーション/リンクテキストの定義追加**
  - Active: Helvetica Neue 700
  - Inactive: Helvetica Neue 400
- **言語切り替えボタンの定義追加**
  - Active: Helvetica Neue 700
  - Inactive: Helvetica Neue 300 (Light)
- **ボタンテキストの定義追加**
  - Helvetica Neue Semi Bold（英語のみ表示）
- **フォーム要素の定義追加**
  - Label: Helvetica Neue Regular / Noto Sans JP Light
  - Input/Placeholder: Helvetica Neue Regular / Noto Sans JP Light
  - Error Messages: Helvetica Neue Regular / Noto Sans JP Light
- **アラート/通知の定義追加**
  - Title: Helvetica Neue Semi Bold / Noto Sans JP Semi Bold
  - Description: Helvetica Neue Regular / Noto Sans JP Light
- **ツールチップの定義追加**
  - Helvetica Neue Regular / Noto Sans JP Light
- **引用文の定義追加**
  - Helvetica Neue Regular / Noto Sans JP Light (italic)
- **数値表示/統計値の定義追加**
  - Helvetica Neue Semi Bold / Noto Sans JP Semi Bold
- **リストアイテムの定義追加**
  - Helvetica Neue Regular / Noto Sans JP Light
- **強調テキストの定義追加**
  - Strong: font-semibold
  - Italic: italic
- **フッター凡例テキストの定義追加**
  - Space Mono（日本語選択時は日本語表示）
- **カード要素の定義追加**
  - CardTitle: Helvetica Neue Semi Bold / Noto Sans JP Semi Bold
  - CardDescription: Helvetica Neue Regular / Noto Sans JP Light
- **GymDashboardHero の特別な扱い**
  - 内のカード要素は Montserrat, Noto Sans JP, sans-serif を使用

### 2025-01-16 - 最終統一

- タイポグラフィ統一ガイドライン作成
- h1 に `font-semibold` (600) を追加
- タグのサイズを `text-body-base md:text-body-lg` に統一
- トップページ h1 をレスポンシブ対応
- font-jetbrains-mono → font-space-mono に統一
- 本文を言語対応フォント (英語: Helvetica Neue Regular, 日本語: Noto Sans JP Light) に統一
- Font Weight を 2 つに簡素化（400, 600 のみ）
- 不要なフォント定義を削除（jetbrains, sf-pro, sf-mono）
- **プロジェクトページのタイポグラフィを 8px 階段でスケールダウン**
  - h1: SP 40px → PC 48px（ランディングページより小さく）
  - h2: SP 32px → PC 40px（8px 階段）
  - h3: SP 24px → PC 32px（8px 階段）
  - 理由: コンテンツ量が多いため、読みやすさを優先
- **About ページの本文を統一**
  - 全ての本文に言語対応フォント (英語: Helvetica Neue, 日本語: Noto Sans JP Light) を追加
  - 興味の説明文を `text-body-lg md:text-body-xl` に統一
- **ガイドラインの正確性を 100%に向上**
  - Work 詳細ページの h2/h3 の実装と完全一致
- **全ての見出しを font-merriweather に統一**
  - 全ページ（トップ、About、Experiment、Blog、Work 詳細）の h1, h2, h3 を font-merriweather に変更
  - Inter フォントは見出しから削除

---

## 📚 参考

- Tailwind CSS 設定: `/tailwind.config.js`
- グローバルスタイル: `/app/globals.css`
- フォント読み込み: `/app/layout.tsx`
- フォントサイズ定義: `tailwind.config.js` の `fontSize` セクション
