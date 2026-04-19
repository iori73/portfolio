---
name: project-add
description: テンプレートから新規プロジェクトをセットアップし、projects.jsonに登録する。
user-invocable: true
---

# /project-add

テンプレートから新規プロジェクトをセットアップするSkill。

## 引数

`/project-add <project-name>` — 新規プロジェクトのディレクトリ名（slug形式推奨: 小文字・ハイフン区切り）

## 手順

### Phase 1: ディレクトリセットアップ

1. `_template/` の内容を `<project-name>/` にコピーする
2. コピー後、以下を確認:
   - `CLAUDE.md` が存在すること
   - `README.md` が存在すること
   - `docs/` ディレクトリが存在すること

### Phase 2: プロジェクト情報ヒアリング

対話的に以下の情報を収集する（AskUserQuestion を使用）:

**必須項目**:
- プロジェクト名（日本語表示名）
- クライアント名
- 業界
- 経由（agency, intermediary）
- 期間（開始日、終了予定日）
- 自分の役割
- 機密性レベル（public / nda / internal_only）

**任意項目**（後から `/project-update` で追加可能）:
- チーム構成
- 技術スタック
- 初期の目標・成果物

### Phase 3: ファイル更新

1. コピーした `CLAUDE.md` のプレースホルダーを埋める:
   - `[PROJECT_NAME]` → プロジェクト名
   - `[PROJECT_DESCRIPTION]` → 概要
   - `[CLIENT_NAME]` → クライアント名
   - `[OBJECTIVE]` → 目的
   - `[DELIVERABLES]` → 主要成果物
   - `[DURATION]` → 期間
   - その他 `_template/CLAUDE.md` 内のプレースホルダー
2. `README.md` のプレースホルダーも同様に埋める

### Phase 4: レジストリ登録

1. `projects.json` を読み込む
2. 新しいプロジェクトエントリを作成する（スキーマに従う）
3. 初期値:
   - `status`: "active"
   - `metadata.createdAt`: 今日の日付
   - `metadata.updatedAt`: 今日の日付
   - `metadata.featured`: false
   - `metadata.visibility`: "private"
   - `directory`: project-name
4. `projects.json` に追加して保存

### Phase 5: 完了確認

1. 作成されたファイル一覧を表示
2. `/project-summary <project-id>` の実行を提案

## 注意

- 既に同名のディレクトリが存在する場合はエラーとして中断
- projects.json に同じ id が既に存在する場合もエラー
- `_template/SETUP.md` に記載された追加フォルダ（prototypes/, assets/ 等）が必要かユーザーに確認する
