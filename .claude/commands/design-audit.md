コードベース全体をデザインシステム準拠の観点で監査してください。

## 手順

1. `docs/architecture/design-system.md` を読んで最新の規約を確認
2. 以下のカテゴリごとに Grep でコードベースを走査
3. サマリーテーブルを出力

## 走査対象

ディレクトリ: `app/`, `components/`, `src/compositions/`, `src/components/`
ファイル: `*.tsx`, `*.ts` (node_modules, .next 除外)

## チェックカテゴリ

### 1. Color — Hardcoded hex values
```
Grep: text-\[#, bg-\[#, border-\[#
Grep: style=.*color.*#
Grep: text-black(?!\/)
```

### 2. Typography — Inline font styles
```
Grep: style=.*fontFamily
Grep: style=.*fontWeight
```

### 3. Typography — Legacy scale usage
```
Grep: text-heading-
Grep: text-body-base, text-body-xs, text-body-xl, text-body-2xl
Grep: text-caption-sm, text-caption-base
```

### 4. Typography — Missing semantic scale
```
Grep: text-xs(?!\s*font), text-sm(?!\s*font), text-base, text-lg, text-xl, text-2xl, text-3xl, text-4xl
(Tailwind デフォルトサイズがセマンティッククラスの代わりに使われているケース)
```

### 5. Spacing — Arbitrary values
```
Grep: p-\[\d+px\], m-\[\d+px\], gap-\[\d+px\]
(Tailwind スケール外の任意値)
```

### 6. Accessibility — Semantic HTML violations
```
Grep: <div onClick, <span onClick
(button/a を使うべき箇所)
```

## 出力フォーマット

### サマリーテーブル

| カテゴリ | 違反数 | 重要度 | 備考 |
|---|---|---|---|
| Color: hardcoded hex | N | High | セマンティックトークンに移行 |
| Typography: inline styles | N | High | フォントフックに移行 |
| Typography: legacy scale | N | Medium | 新スケールに移行 |
| Typography: Tailwind default | N | Low | セマンティッククラスに移行 |
| Spacing: arbitrary values | N | Low | Tailwind スケールに合わせる |
| Accessibility: semantic HTML | N | Medium | button/a に変更 |

### 詳細（カテゴリごと）

各カテゴリの上位5件を具体的に表示:
- ファイルパス:行番号
- 該当コード
- 推奨修正

$ARGUMENTS
