# TECH_STACK.md - Portfolio

> 技術スタックと依存関係の詳細。
> 新しいパッケージを追加する前にこのドキュメントを確認し、記載がなければユーザーに確認する。

---

## コアスタック

| カテゴリ | パッケージ | バージョン | 用途 |
|---|---|---|---|
| フレームワーク | next | ^15.5.9 | App Router ベースの React フレームワーク |
| UI ライブラリ | react / react-dom | ^19.2.3 | UI レンダリング |
| 言語 | typescript | ^5 | 型安全性 |
| スタイリング | tailwindcss | ^3.4.17 | ユーティリティファースト CSS |
| CSS 処理 | postcss, autoprefixer | ^8, ^10.4.20 | PostCSS プラグイン |
| アニメーション | tailwindcss-animate | ^1.0.7 | Tailwind CSS アニメーションユーティリティ |

---

## UI コンポーネント

| パッケージ | バージョン | 用途 |
|---|---|---|
| @radix-ui/react-* | 各種 | shadcn/ui の基盤（アクセシブルな Headless UI） |
| class-variance-authority | ^0.7.1 | コンポーネントバリアント管理 |
| clsx | ^2.1.1 | 条件付きクラス名結合 |
| tailwind-merge | ^2.5.5 | Tailwind クラスのマージ・競合解決 |
| lucide-react | ^0.454.0 | アイコン |
| cmdk | 1.0.4 | コマンドパレット |
| sonner | ^1.7.1 | トースト通知 |
| vaul | ^0.9.6 | ドロワー |
| embla-carousel-react | 8.5.1 | カルーセル |
| input-otp | 1.4.1 | OTP 入力 |

---

## i18n（国際化）

| パッケージ | バージョン | 用途 |
|---|---|---|
| next-intl | ^4.5.5 | App Router 対応の i18n ライブラリ |

- ロケール: `en`, `jp`
- 翻訳ファイル: `messages/en.json`, `messages/jp.json`
- 設定: `i18n/routing.ts`, `middleware.ts`

---

## データ可視化

| パッケージ | バージョン | 用途 |
|---|---|---|
| recharts | 2.15.0 | React ベースのチャート |
| chart.js | ^4.5.1 | Canvas ベースのチャート |
| d3 | ^7.9.0 | データ可視化ライブラリ |

---

## 3D / インタラクション

| パッケージ | バージョン | 用途 |
|---|---|---|
| @splinetool/react-spline | ^4.0.0 | Spline 3D シーンの埋め込み |
| lottie-react | ^2.4.1 | Lottie アニメーション |

---

## フォーム

| パッケージ | バージョン | 用途 |
|---|---|---|
| react-hook-form | ^7.54.1 | フォーム状態管理 |
| @hookform/resolvers | ^3.9.1 | バリデーションリゾルバ |
| zod | ^3.24.1 | スキーマバリデーション |
| react-day-picker | 8.10.1 | 日付ピッカー |

---

## ユーティリティ

| パッケージ | バージョン | 用途 |
|---|---|---|
| csv-parse | ^6.1.0 | CSV パース |
| xml2js | ^0.6.2 | XML パース（Medium RSS） |
| next-themes | ^0.4.4 | テーマ切替（ダークモード対応準備） |
| react-resizable-panels | ^2.1.7 | リサイズ可能パネル |

---

## アナリティクス / デプロイ

| パッケージ | バージョン | 用途 |
|---|---|---|
| @vercel/analytics | ^1.6.1 | Vercel Web Analytics |

- **デプロイ先**: Vercel
- **トリガー**: `main` ブランチへの push で自動デプロイ

---

## 開発ツール

| パッケージ | バージョン | 用途 |
|---|---|---|
| eslint | ^8.57.1 | リンター |
| @figma/code-connect | ^1.3.1 | Figma Code Connect |
| @types/node | ^22 | Node.js 型定義 |
| @types/react | ^19 | React 型定義 |
| @types/react-dom | ^19 | ReactDOM 型定義 |
| @types/xml2js | ^0.4.14 | xml2js 型定義 |

---

## パッケージマネージャー

**npm** を使用（`package-lock.json` で管理）。

```bash
npm install          # 依存関係インストール
npm run dev          # 開発サーバー
npm run build        # 本番ビルド
npm run start        # 本番サーバー
npm run lint         # ESLint
```

---

## 注意事項

- `.npmrc` に `legacy-peer-deps=true` が設定されている（React 19 との互換性のため）
- shadcn/ui コンポーネントは `components/ui/` に配置（`npx shadcn-ui@latest add` で追加）
- Radix UI パッケージは shadcn/ui の依存として導入されたもの。個別に追加する場合は確認する
