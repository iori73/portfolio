# 新しいチャット用コンテキストプロンプト

## プロジェクト概要
Next.js + TypeScript + Tailwind CSSで構築されたポートフォリオサイトです。

## 最近完了した大規模リファクタリング

### タイポグラフィシステムの再構築（2025年1月完了）
- **目的**: shadcn/ui準拠のタイポグラフィシステムに移行
- **主な変更**:
  - `tailwind.config.js`の`fontSize`定義から`fontWeight`を削除
  - 旧クラス名（例: `text-body-s-140`）から新クラス名（例: `text-body-sm`）へ移行完了
  - すべてのコンポーネントファイルで移行済み
  - `font-semibold`などの標準Tailwindクラスが正しく動作するように修正

### 移行マッピング（実装済み）
- `text-body-s-140` → `text-body-sm` (16px)
- `text-body-m-140` → `text-body-base` (18px)
- `text-body-l-140` → `text-body-lg` (21px)
- `text-body-xl-140` → `text-body-xl` (24px)
- `text-body-xxl-140` → `text-body-2xl` (28px)
- `text-body-xxxl-140` → `text-body-3xl` (32px)
- `text-heading-xxxs-120` → `text-heading-sm` (21px)
- `text-heading-xxs-120` → `text-heading-base` (24px)
- `text-heading-xs-120` → `text-heading-lg` (28px)
- `text-heading-s-120` → `text-heading-xl` (32px)
- `text-heading-m-120` → `text-heading-2xl` (40px)
- `text-heading-l-120` → `text-heading-3xl` (48px)
- `text-heading-xl-m-120` → `text-heading-4xl` (56px)
- その他、Caption系も同様に移行済み

## 現在の作業対象: AnnotatedSystemDiagram.tsx

### ファイルの場所
`/components/AnnotatedSystemDiagram.tsx`

### 現在の状態（2025年1月時点）

#### レイアウト構造
- **Row 1**: メインのシステム図（`/Diagram.svg`）
- **Row 2**: 2x2グリッドの説明セクション
  - **Top Left**: "System Flow" - テキスト左、図右
  - **Top Right**: "User Action ↔ Weekly Process" - テキスト左、図右（`figure4-days.svg`）
  - **Bottom Left**: "How many people" - 図左、テキスト右（`figure2.svg`）
  - **Bottom Right**: "How many screenshots" - 図左、テキスト右（`figure3.svg`）

#### 現在のスタイリング
- すべての`h4`タイトル: `font-inter text-body-sm md:text-body-lg font-semibold mb-2`
- すべての説明テキスト: `text-lg text-gray-600`
- `figure4-days.svg`: PC幅で`scale(1.1) translateX(-2rem)`を適用
- `figure2.svg`: `max-width: 200px`
- `figure3.svg`: `max-width: 230px`

#### 使用している画像
- `/Diagram.svg` - メインのシステム図
- `/figures/figure1-noText.svg` - System Flow説明用
- `/figures/figure4-days.svg` - Weekly Process説明用（PC幅でスケール・位置調整あり）
- `/figures/figure2.svg` - How many people説明用
- `/figures/figure3.svg` - How many screenshots説明用

#### 国際化（i18n）
- `useLanguage`フックを使用
- 翻訳キー:
  - `systemFollowsClockwiseFlow`
  - `eachComponentRepresents`
  - `sevenBarsSevenDots`
  - `weeklyAutomaticUpdate`
  - `numberOfPeople`
  - `dotSizeRepresentsPeople`
  - `numberOfScreenshots`
  - `dotColorRepresentsScreenshots`

### これまでに行った変更履歴

1. **画像位置の調整**
   - `figure4-days.svg`の`margin-left: -6rem`（Tailwind: `-ml-24`）

2. **PC幅でのスケール調整**
   - `figure4-days.svg`にPC幅で`scale(1.2) translateY(10px)`を適用
   - 後に`scale(1.1) translateX(-2rem)`に変更

3. **テキスト変更**
   - "Number of People" → "How many people"
   - "Number of Screenshots" → "How many screenshots"

4. **レイアウト変更**
   - 下部3セクションを2x2グリッドに変更
   - 各セクションで図とテキストの配置を調整
   - 上部2セクションは図が右、下部2セクションは図が左

5. **フォントサイズの統一**
   - 4つの説明テキストを`text-lg`（18px）に統一
   - タイトルを`h4`タグに変更し、`font-inter text-body-sm md:text-body-lg font-semibold mb-2`を適用

6. **タイポグラフィシステムの移行**
   - 旧クラス名から新クラス名へ移行完了
   - `text-body-s-140` → `text-body-sm`
   - `text-body-l-140` → `text-body-lg`

### 現在のコード構造

```tsx
'use client';
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../src/lib/i18n';

const AnnotatedSystemDiagram: React.FC = () => {
  const { t } = useLanguage();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.matchMedia('(min-width: 768px)').matches);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full border-2 border-red-500">
      {/* メイン図と2x2グリッドの説明セクション */}
    </div>
  );
};
```

## 重要な技術的コンテキスト

### Tailwind CSS設定
- カスタムフォントサイズは`tailwind.config.js`で定義
- 新しい命名規則: `body-sm`, `body-base`, `body-lg`, `heading-xl`, `heading-2xl`など
- `fontWeight`は`fontSize`定義から分離され、標準Tailwindクラスで制御

### レスポンシブブレークポイント
- Mobile: デフォルト（< 768px）
- Desktop: `md:` prefix（≥ 768px）

### 国際化
- `src/lib/i18n.tsx`に翻訳キーが定義されている
- `useLanguage`フックで`t()`関数を使用

## 次の作業について

AnnotatedSystemDiagramの修正を続ける場合は、上記のコンテキストを参考にしてください。
現在のファイルは`/components/AnnotatedSystemDiagram.tsx`にあります。

