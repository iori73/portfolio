---
name: portfolio-generate
description: projects.jsonから portfolio-materials.md を自動生成。CV/レジュメ用の日英素材を出力。
user-invocable: true
---

# /portfolio-generate

projects.json のデータからポートフォリオ素材を自動生成するSkill。

## 引数

- 引数なし → `portfolio-materials.md` を再生成
- `--format cv` → CV/レジュメ用の簡潔な形式
- `--format casestudy` → ケーススタディ用の詳細な形式
- `--lang en` → 英語のみ
- `--lang ja` → 日本語のみ
- `--lang both` → 日英両方（デフォルト）

## 手順

### Phase 1: データ読み込み

1. `projects.json` を読み込む
2. 対象プロジェクトをフィルタ:
   - `metadata.featured === true` のプロジェクトを優先表示
   - `metadata.visibility` が `"private"` のプロジェクトは除外
   - `status === "archived"` かつ `metadata.featured === false` は除外
3. 期間の新しい順にソート

### Phase 2: 素材生成

各プロジェクトについて以下のセクションを生成:

```markdown
## [プロジェクト番号]. [プロジェクト名]

### 基本情報
| 項目 | 内容 |
|------|------|
| クライアント | [client.name]（via [via.intermediary]） |
| 期間 | [period.start] 〜 [period.end]（[durationMonths]ヶ月） |
| 役割 | [role.title] |
| 所属 | [via.agency] |

### 概要（日本語）
[summary.ja]

### Summary (English)
[summary.en]

### 技術スタック
[techStack をカテゴリ別にリスト化]

### 主な成果
[deliverables を定量的にリスト化。数値を必ず含める]

### ポートフォリオ掲載用キーメッセージ
[highlights からキーメッセージを抽出。転職に有効な観点で要約]

### ビジュアル素材
[media.assetPaths をテーブルで表示]
```

### Phase 3: 統合スキル一覧

全プロジェクトの techStack と tags.coreSkills を統合し、カテゴリ別のスキル一覧を生成:

- Design
- Development
- Tools & Methods

### Phase 4: ファイル出力

1. 生成した内容を `portfolio-materials.md（またはDocuments/work/portfolio-materials.md）` に書き込む
2. ファイル冒頭にヘッダーを追加:

```markdown
# Portfolio CV Materials — プロジェクト情報整理

> このファイルは `/portfolio-generate` により自動生成されました。
> 最終生成日: [今日の日付]
> ソース: projects.json
> 対象: [対象プロジェクト数]件（featured: [数]件）
```

### Phase 5: 差分確認

1. 既存の `portfolio-materials.md` がある場合、主な変更点を表示
2. 「ポートフォリオ実装時の参考情報」セクション（リポジトリ情報、TODO等）は既存ファイルから引き継ぐ

## 注意

- `confidentiality: "nda"` のプロジェクトには「注意: 内部プロジェクトのため公開可否を確認すること」を付記
- `directory: null` のプロジェクトは「ローカルプロジェクトフォルダなし」と注記
- ビジュアル素材のパスは実在するか確認し、存在しないパスには警告を付ける
- 既存の `portfolio-materials.md` の「ポートフォリオ実装時の参考情報」セクションは保持する
