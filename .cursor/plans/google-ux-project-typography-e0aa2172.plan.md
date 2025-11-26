<!-- e0aa2172-bc6c-4e11-a369-b1de93541a14 92c70d2b-56e0-4f4e-af38-6939c99fffeb -->
# Google UX Design Certificate Project Typography修正計画

## 現状分析

### 主な問題点

1. **古いクラス名の使用**

- `text-heading-s-120`, `text-heading-m-120`, `text-heading-xs-120` → 新しいクラス名に変更が必要
- `text-body-xl-140`, `text-body-l-140` → 新しいクラス名に変更が必要
- `text-caption-m-120` → 新しいクラス名に変更が必要

2. **フォントフック未使用**

- `useBodyFont`, `useHeadingFont`, `useJPFontSize`がインポート・使用されていない
- 言語切り替え時のフォント適応が正しく動作しない

3. **フォント指定の不一致**

- メタ情報ラベル: `font-jetbrains-mono` → `font-space-mono`に変更
- セクションタイトル: inline styleでHelvetica Neue, 500を適用する必要がある

4. **スタイルの不足**

- プロジェクト説明に`tracking-[0.2px]`が不足
- サイドバーナビゲーションのスタイルがgym_crowd_status_dashboardと異なる

## 修正内容

### 1. インポートの追加

- `useJPFontSize`, `useBodyFont`, `useHeadingFont`を`@/src/lib/i18n`からインポート

### 2. フックの初期化

- コンポーネント内で各フックを初期化

### 3. プロジェクトタイトル（h1）

- **現在**: `text-heading-s-120 md:text-heading-m-120 font-helvetica-neue`
- **修正後**: `text-heading-2xl md:text-heading-3xl` + `getHeadingFontClass()`
- **場所**: 91行目

### 4. プロジェクト説明（p）

- **現在**: `text-body-xl-140 font-helvetica-neue text-gray-600`
- **修正後**: `text-body-lg md:text-body-xl` + `getBodyFontClass()` + `tracking-[0.2px]` + `text-[#333333]`
- **場所**: 108行目

### 5. メタ情報ラベル（h3）

- **現在**: `text-caption-m-120 font-jetbrains-mono text-gray-500`
- **修正後**: `text-caption-lg font-space-mono font-semibold text-gray-500`
- **場所**: 112, 116, 120, 124行目

### 6. メタ情報値（p）

- **現在**: `text-body-l-140 font-helvetica-neue`
- **修正後**: `text-body-base md:text-body-lg tracking-[0.2px]` + `getBodyFontClass()`
- **場所**: 113, 117, 121, 125行目

### 7. セクションタイトル（h2）

- **現在**: `text-heading-s-120 md:text-heading-m-120 font-helvetica-neue`
- **修正後**: `text-heading-xl md:text-heading-2xl` + inline style (Helvetica Neue, 500)
- **場所**: 145, 182, 420, 541, 583行目

### 8. サブセクションタイトル（h3）

- **現在**: `text-heading-xs-120 md:text-heading-s-120 font-helvetica-neue`
- **修正後**: `text-heading-base md:text-heading-xl` + inline style (Helvetica Neue, 500)
- **場所**: 200, 237, 262, 277, 292, 319, 336, 353, 437, 452, 477, 494, 568行目

### 9. サイドバーナビゲーション

- **現在**: `text-body-l-140 font-helvetica-neue opacity-100/opacity-50 font-medium`
- **修正後**: 
- active: `text-body-xl font-helvetica-neue transition-transform duration-900 scale-110`
- inactive: `text-heading-sm font-helvetica-neue transition-transform duration-900 scale-100 opacity-50`
- **場所**: 627-843行目（サイドバー全体）

## 対応ファイル

- `app/work/google_ux_design_certificate_project/page.tsx`

## 注意事項

1. 本文テキストが存在しないため、本文の修正は不要（画像のみのセクション）
2. セクションタイトル（h2, h3）にはinline styleで`fontFamily: 'Helvetica Neue, Helvetica, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'`と`fontWeight: 500`を適用
3. サイドバーナビゲーションのスタイルはgym_crowd_status_dashboardと完全に一致させる
4. 色の指定: `text-gray-600` → `text-[#333333]`（gym_crowd_status_dashboardに合わせる）

### To-dos

- [ ] インポート文にuseJPFontSize, useBodyFont, useHeadingFontを追加
- [ ] コンポーネント内で各フックを初期化
- [ ] プロジェクトタイトル（h1）のクラス名とフォントフックを修正
- [ ] プロジェクト説明（p）のクラス名、フォントフック、tracking、色を修正
- [ ] メタ情報ラベル（h3）のクラス名とフォントを修正（4箇所）
- [ ] メタ情報値（p）のクラス名、フォントフック、trackingを修正（4箇所）
- [ ] セクションタイトル（h2）のクラス名とinline styleを修正（5箇所）
- [ ] サブセクションタイトル（h3）のクラス名とinline styleを修正（13箇所）
- [ ] サイドバーナビゲーションのスタイルを修正（active/inactive状態）