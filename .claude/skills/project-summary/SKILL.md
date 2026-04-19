---
name: project-summary
description: 特定プロジェクトの詳細サマリーを表示。projects.json + 実ディレクトリから情報を集約。
user-invocable: true
---

# /project-summary

特定プロジェクトの詳細サマリーを表示するSkill。

## 引数

`/project-summary <project-id>`

project-id は projects.json の `id` フィールドに一致する文字列。省略時は一覧から選択を促す。

## 手順

1. `projects.json` を読み込み、指定されたIDのプロジェクトを取得する
2. プロジェクトの `directory` が存在する場合、実ディレクトリを走査して以下を自動集計:
   - ファイル総数
   - ドキュメント数（.md, .pdf, .docx）
   - 画像数（.png, .jpg, .svg）
   - コードファイル数（.ts, .tsx, .js, .html, .css, .py）
   - サブディレクトリ構造
3. 以下のセクション構成で出力する:

### 出力フォーマット

```markdown
# [プロジェクト名]

**ステータス**: [status] | **機密性**: [confidentiality] | **表示範囲**: [visibility]

## 基本情報
- クライアント: [client.name]（[client.industry]）
- 経由: [via.agency] → [via.intermediary]
- 期間: [period.start] 〜 [period.end]（[period.durationMonths]ヶ月）
- 役割: [role.title]

## 概要
[summary.ja]

## チーム
[team テーブル]

## 工数・規模
[effort 情報]

## 技術スタック
[techStack をカテゴリ別に表示]

## 成果物
[deliverables を定量的に表示]

## ハイライト
[highlights をリストで表示]

## 方法論
[methodology をリストで表示]

## リンク
[links をカテゴリ別に表示]

## ビジュアル素材
[media.assetPaths をテーブルで表示]

## ディレクトリ統計（実ファイルから集計）
[自動集計結果]
```

## 注意

- `directory: null` の場合はディレクトリ統計セクションを「ローカルディレクトリなし（メタデータのみ）」と表示
- 空のフィールドはセクションごと省略する（「なし」と表示しない）
- 日本語で出力する（英語サマリーも併記する場合は `summary.en` を使用）
