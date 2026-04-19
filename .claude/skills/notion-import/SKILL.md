---
name: notion-import
description: Notion exportからプロジェクト履歴を抽出し、projects.jsonに未登録プロジェクトを追加する。
user-invocable: true
---

# /notion-import

Notion exportファイルからプロジェクト履歴を抽出し、projects.json に追加するSkill。

## 前提

- Notion export は `Documents/work/notion-export/extracted/` 配下に展開されている
- 各 export ディレクトリは HTML 形式のファイルを含む
- 既知のマッピング（portfolio-materials.md より）:
  - `export_1/` → パナソニック関連（62 HTML, 95+画像）
  - `export_2/` → ネクストステージ関連（151 HTML, 50+議事録）
  - `export_3/` → ANA関連（113 HTML）
  - `export_4/` → 早稲田関連（1 HTML）

## 引数

- 引数なし → `notion-export/extracted/` 全体をスキャン
- `--export <number>` → 特定の export ディレクトリのみ処理（例: `--export 2`）
- `--dry-run` → projects.json を更新せず、抽出結果のプレビューのみ表示

## 手順

### Phase 1: スキャン

1. `notion-export/extracted/` 配下のディレクトリ一覧を取得
2. 各ディレクトリ内の HTML ファイルを走査
3. ファイル名とディレクトリ構造からプロジェクト構造を推定

### Phase 2: 情報抽出

各 HTML ファイルを解析し、以下の情報を抽出:

- プロジェクト名 / 案件名
- クライアント名
- 期間（開始日・終了日）
- 役割
- 成果物の記録
- 議事録からのキーポイント
- タスクDB の内容

抽出時の注意:
- Notion の HTML は `<article>` や `<div class="page-body">` にコンテンツが含まれる
- テーブルは `<table>` タグで構造化されている
- プロパティ（ステータス、担当者等）は特定のクラス名で識別可能

### Phase 3: マッチング

1. `projects.json` を読み込む
2. 抽出したプロジェクト情報と既存エントリを照合:
   - `client.name` と `period` で一致を判定
   - `notionExport` フィールドで既に紐付けられているかチェック
3. 結果を3カテゴリに分類:
   - **既存・紐付け済み**: 既に projects.json に存在し、notionExport が設定されている
   - **既存・未紐付け**: projects.json に存在するが、notionExport が未設定 → 紐付けを提案
   - **新規**: projects.json に存在しない → 新規追加を提案

### Phase 4: ユーザー確認

1. 抽出結果をテーブルで表示
2. 新規追加・紐付け更新の対象をユーザーに確認
3. 承認されたものだけを処理

### Phase 5: 登録

承認されたプロジェクトについて:

1. 新規プロジェクトの場合:
   - `directory: null`（ローカルディレクトリなし）
   - `status: "completed"` or `"archived"`
   - `notionExport` にパスを設定
   - `metadata.visibility: "private"`（後から変更可能）
   - 抽出できた情報をスキーマに沿って埋める
   - 埋められなかったフィールドは null or 空配列
2. 既存プロジェクトの紐付けの場合:
   - `notionExport` フィールドを更新
   - Notion から追加情報があれば既存データを補完（上書きはしない）
3. `projects.json` を保存

### Phase 6: レポート

- 追加・更新されたプロジェクト数
- 抽出できた情報のサマリー
- 手動で補完が必要なフィールドのリスト

## 注意

- HTML の解析は完璧でなくてよい。抽出できる情報を最大限取り込み、不足分は `/project-update` で手動補完する
- 大量のファイルがある場合、代表的なファイル（プロジェクト概要、タスクDB等）を優先的に解析する
- 画像ファイルは参照パスの記録のみ行い、内容の解析は行わない
