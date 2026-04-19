---
name: project-update
description: 既存プロジェクトの情報を対話的に更新。ステータス変更、成果追加、ハイライト追記など。
user-invocable: true
---

# /project-update

既存プロジェクトの情報を更新するSkill。

## 引数

`/project-update <project-id>` — 更新対象のプロジェクトID

引数に追加の指示がある場合はそれに従う。例:
- `/project-update ana --status completed`
- `/project-update waseda 新しいハイライトを追加`

## 手順

1. `projects.json` を読み込み、指定されたIDのプロジェクトを取得する
2. 現在の情報を簡潔に表示する（名前、ステータス、期間、最終更新日）
3. ユーザーに更新したい項目を確認する。よくある更新:
   - **ステータス変更**: active → completed, paused など
   - **期間の更新**: endDate の設定、durationMonths の再計算
   - **成果物の追加**: deliverables に新しい定量データを追加
   - **ハイライトの追記**: 新しい成果・実績を highlights に追加
   - **リンクの追加**: GitHub, Figma, デモURL などを links に追加
   - **タグの更新**: 新しいスキルや分類を tags に追加
   - **チーム情報の更新**: メンバー追加・役割変更
   - **工数の更新**: 稼働時間・月数の記録
4. 対話的に更新内容を確認した後、`projects.json` を更新する
5. 更新時に以下を自動で行う:
   - `metadata.updatedAt` を今日の日付に更新
   - `lastUpdated`（ルートレベル）を今日の日付に更新
6. 更新完了後、変更内容のサマリーを表示する

## 注意

- 既存データを上書きする場合は必ずユーザーに確認する
- 配列フィールド（highlights, tags 等）は追加が基本。削除する場合は明示的に確認
- projects.json のフォーマット（インデント、構造）を維持する
- 大きな変更がある場合は、対応するプロジェクトの CLAUDE.md や README.md も更新が必要か確認する
