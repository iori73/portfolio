# セットアップガイド

このプロジェクトを新しい環境で再現するための手順です。

## 前提条件

- Node.js 18以上
- npm または yarn
- Git

## セットアップ手順

### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd portfolio
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. 環境変数（必要に応じて）

現在、環境変数は不要ですが、将来的に追加する場合は `.env.local` ファイルを作成してください。

### 4. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開きます。

## プロジェクト構造

- `app/` - Next.js App Router のページとレイアウト
- `components/` - 再利用可能なReactコンポーネント
- `src/` - ソースコード（compositions, hooks, lib）
- `messages/` - next-intlの翻訳ファイル（en.json, jp.json）
- `i18n/` - next-intlの設定ファイル
- `docs/` - プロジェクトドキュメント

## 重要な技術スタック

- **Next.js 14** (App Router)
- **React 18** with TypeScript
- **Tailwind CSS** - スタイリング
- **next-intl** - 国際化（英語/日本語）
- **shadcn/ui** - UIコンポーネントライブラリ

## トラブルシューティング

### ビルドエラーが発生する場合

```bash
# キャッシュをクリア
rm -rf .next
npm run dev
```

### 翻訳キーが見つからないエラー

`messages/en.json` と `messages/jp.json` に必要なキーが存在することを確認してください。

## ドキュメント

詳細な情報は `docs/` フォルダを参照してください：

- `docs/next-intl-migration.md` - next-intlへの移行ガイド
- `docs/architecture/design-system.md` - デザインシステム
- `docs/TYPOGRAPHY_GUIDE.md` - タイポグラフィガイド

