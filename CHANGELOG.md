# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

## [2025-01-17-b]

### Changed

- モバイル幅でのワーク詳細ページ本文を 18px から 16px に変更 ([ADR-003](docs/decisions/003-mobile-font-size-standardization.md))
  - `app/work/2_day_internship/page.tsx`: 9 箇所修正完了
  - `app/work/2_day_internship_copy/page.tsx`: 17 箇所修正完了
  - ダウングレード比率: 21px → 16px (約 76%)

### Added

- プロフェッショナルなドキュメント構造を構築
  - `docs/architecture/design-system.md`: デザインシステム全体の概要と Tailwind 設定
  - `docs/decisions/002-tailwind-spacing-fix.md`: Tailwind spacing 修正の ADR
  - `docs/decisions/003-mobile-font-size-standardization.md`: モバイルフォントサイズ標準化の ADR
  - `CHANGELOG.md`: Keep a Changelog 形式の変更履歴

## [2025-01-17]

### Fixed

- Tailwind spacing 設定をデフォルトに戻し、ローカルと公開サイトの余白の不一致を解消 ([ADR-002](docs/decisions/002-tailwind-spacing-fix.md))
- `app/work/2_day_internship_copy/page.tsx`の言語切り替え機能を修正
  - 翻訳キーを`src/lib/i18n.tsx`に追加（45 個の新規キー）
  - ハードコードされた日本語テキストを`t()`関数に置き換え

### Changed

- `useJPFontSize`フックを改善し、日本語用サイズが未指定の場合は英語サイズを使用
- 各ページの最上位コンテナにマージン（`my-24 md:mt-28 md:mb-16`）を個別適用
- `app/layout.tsx`のグローバルマージンを削除

### Added

- ドキュメント構造を新規作成
  - `docs/architecture/design-system.md`: デザインシステム全体の概要
  - `docs/decisions/`: Architecture Decision Records (ADR)
  - `CHANGELOG.md`: 変更履歴

## [2025-01-16]

### Changed

- "Gym Crowd Status Dashboard"プロジェクトのタグを変更
  - 旧: "Full-Stack, Data Pipeline, iOS Automation"
  - 新: "UI, Context Engineering"
- "Gym Crowd Status Dashboard"の h1 フォントサイズを 36px、font-weight を 600 に変更
- タイトルとタグに`whitespace-nowrap`を追加して折り返しを防止

### Fixed

- `tailwind.config.js`のカスタムフォントサイズ名を変更して Tailwind デフォルトとの競合を回避
  - `h1`, `h2`, `h3`, `body` → `custom-h1`, `custom-h2`, `custom-h3`, `custom-body`

---

## Legend

- **Added**: 新機能
- **Changed**: 既存機能の変更
- **Deprecated**: 非推奨になった機能
- **Removed**: 削除された機能
- **Fixed**: バグ修正
- **Security**: セキュリティ関連の変更
