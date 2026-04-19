---
name: project-list
description: 全プロジェクト一覧を表示。ステータス・技術・業界でフィルタ可能。
user-invocable: true
---

# /project-list

全プロジェクトの一覧をテーブル形式で表示するSkill。

## 手順

1. `projects.json` を読み込む（パス: `src/data/projects.json（またはDocuments/work/projects.json）`）
2. ユーザーの引数からフィルタ条件を解析する:
   - `--status <value>` → status でフィルタ（active, completed, paused, archived）
   - `--tech <value>` → techStack内の任意のフィールドに含まれるかで検索
   - `--industry <value>` → client.industry でフィルタ
   - `--tag <value>` → tags内の任意のフィールドに含まれるかで検索
   - `--featured` → metadata.featured === true のみ表示
   - 引数なし → 全プロジェクトを表示
3. 以下のテーブル形式で出力する:

```
| ID | プロジェクト名 | クライアント | ステータス | 期間 | 役割 | 主要スキル |
```

4. テーブルの下に集計情報を表示:
   - 合計プロジェクト数（フィルタ後）
   - ステータス別内訳
   - 最終更新日

## 出力例

```
| ID | プロジェクト名 | クライアント | ステータス | 期間 | 役割 | 主要スキル |
|----|-------------|-----------|----------|------|------|----------|
| ana | ANA Digital DS | ANA | completed | 2025/11-2026/03 | DS設計・実装 | Figma Plugin, Token Arch |
| waseda | 早稲田寄付アプリ | 早稲田大学 | completed | 2026/04 | UI/UX主担当 | Figma Proto, Rapid Iter |
...

合計: 8プロジェクト（active: 2, completed: 4, archived: 1, paused: 0）
```

## 注意

- `directory: null` のプロジェクト（メタデータのみ）も表示する。その場合IDの横に `*` を付ける
- `confidentiality: "nda"` のプロジェクトには 🔒 を付ける
- ステータスでソート: active → paused → completed → archived の順
