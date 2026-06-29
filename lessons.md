# Portfolio - Lessons Learned

> バグ修正、設計変更、大きな方向転換の後に記録する。
> 同じミスを繰り返さないための学びの蓄積。

---

## 2026-02-23: デザインシステム整理

### インライン fontFamily style の乱立
**状況**: 各 Work ページの h2/h3 に `style={{ fontFamily: 'Helvetica Neue, ...', fontWeight: 500 }}` がハードコードされていた。`@layer base` で既に同じフォントが適用されているにもかかわらず。

**原因**: `getHeadingFontClass()` の仕組みが確立される前にページが作られ、その後の統一が漏れた。

**教訓**:
- フォントスタイルは `src/hooks/useFonts.ts` のフックで一元管理する
- `@layer base` で h1-h6 に自動適用されるデフォルトを信頼する
- 新しい Work ページを追加する時はインライン style を使わない

### hardcoded hex カラーの散在
**状況**: `text-[#0A0A0A]`, `text-[#333333]`, `text-[#656d76]`, `text-[#0000008f]` 等の hex 値が各ページに直接書かれていた。

**教訓**:
- セマンティックカラートークン（`text-ink`, `text-ink-secondary` 等）を使う
- 新しいページを作る時は design-system.md のトークン表を参照する
- `tailwind.config.js` に定義された色のみ使用し、arbitrary value `[#xxx]` は避ける

### ClassName 重複の罠
**状況**: `style={...}` を `className={...}` に置換する際、既存の `className="..."` と新しい `className={...}` が重複し、JSX エラーになった。

**教訓**:
- 属性の追加ではなく、既存の className にテンプレートリテラルで統合する
- `className="foo"` → `className={\`foo ${dynamicClass}\`}` のパターンを使う

### useFonts.ts の font-regular バグ
**状況**: `getBodyFontClass()` が日本語ロケールで `font-regular` を返していたが、Tailwind に `font-regular` クラスは存在しない。

**教訓**:
- Tailwind のユーティリティクラスは正式名称を使う（`font-light`, `font-normal`, `font-medium`, `font-bold`）
- `font-regular` は Tailwind には存在しない

---

## 2026-03-26: NoteCard デザインレビューで発覚したパターン

### 見出し要素に bodyFontClass が使われていた
**状況**: NoteCard の h4 に `bodyFontClass`（Helvetica Neue / Noto Sans JP Light）が渡されていた。見出しには `headingFontClass`（Switzer / Noto Sans JP Medium）を使うべき。

**原因**: コンポーネント作成時に bodyFontClass しか props に含めず、見出しにも同じクラスを流用していた。

**教訓**:
- 見出し要素 (h1-h6) には必ず `headingFontClass` を使う
- コンポーネントが見出しと本文の両方を含む場合、両方の font class を props で受け取る
- `/design-review` コマンドでチェック可能

### メタテキストのサイズが本文と同じだった
**状況**: ポッドキャスト名、日付、duration 等のメタ情報に `text-body` (16px) が使われ、見出しとの階層が不明瞭だった。

**教訓**:
- メタ情報・補助テキスト → `text-body-sm` (13-14px)
- タグ・ラベル → `text-label` (13-14px) + `font-space-grotesk`
- 本文 → `text-body` (16px)
- design-system.md §1.6 の本文サイズ表を必ず参照する

---

## 2026-04-19: 複数 PC 環境での Git ワークフロー

### ローカルが remote より遅れていた
**状況**: 別 PC で CV 作業（PR #8, #9, #10）を行い push したが、このマシンの `main` が6コミット遅れていた。ローカルには未コミットの figma-plugins 変更もあった。

**解決策**: `stash → git pull → stash pop`
- remote 変更（CV/airline ページ）とローカル変更（figma-plugins）は別ファイルなので競合なし
- fast-forward だったのでマージコミットも不要でクリーンに完了

**今後の再発防止（複数 PC 運用の鉄則）**:
- **作業開始前**: 必ず `git pull` を実行してから作業を始める
- **作業終了後**: 必ず `git add` → `git commit` → `git push` して他 PC に渡す
- **未コミット変更がある状態で pull が必要な場合**: `git stash → git pull → git stash pop`
- この環境は複数 PC で継続的に作業するため、毎回このフローを意識する

---

## 2026-04-25: NDA クライアント名の管理

### 一次資料なしに職歴データを書いた
**状況**: cvData.ts の職歴バレットをセッション間の記憶・推測で書いていたため、案件の会社帰属（どのプロジェクトがYUMEMI/ACN Songか）が誤っていた。さらに NDA クライアントの実名（ANA・パナソニック・早稲田等）がサイトに掲載されていた。

**原因**:
- Notion エクスポートなどの一次資料を参照せず、以前のセッションで生成したデータをそのまま引き継いだ
- projects.json が公開 GitHub リポジトリに追跡されており、NDA 情報が誰でも閲覧可能だった

**教訓**:
- 職歴・案件情報は必ず Notion エクスポート等の一次資料から書く。記憶や推測で書かない
- NDA 対象プロジェクトの情報を含むファイルは .gitignore に追加してリポジトリから除外する
- クライアント固有名詞（社名・プロダクト名・担当者名）はポートフォリオに掲載しない。[Airline][University] 等の業界ラベルに置き換える
- 数字や統計（「118名のリサーチ」等）は自分が直接関与した事実のみ記載する

### projects.json を公開リポジトリに追跡していた
**状況**: src/data/projects.json に NDA クライアント実名・内部 ZAC コード・チームメンバー名・Notion パスが含まれたまま GitHub public リポジトリに push されていた。

**対応**: `git rm --cached src/data/projects.json` + `.gitignore` に追加。ファイルはローカルに保持。

**教訓**:
- NDA・機密情報を含むファイルは最初から .gitignore に含める
- 参照用データファイルを新規作成する際は、公開リポジトリに追跡すべきかを必ず確認する

---

## 2026-04-26: セキュリティヘッダーとプライバシー

### CSP ヘッダーが未設定だった
**状況**: X-Frame-Options・HSTS 等は設定済みだったが、Content Security Policy が完全に欠如していた。

**教訓**:
- Next.js の `headers()` に CSP を追加する際、`'unsafe-inline'` と `'unsafe-eval'` は Next.js/D3 の動作に必要なため許容する
- Google Fonts 使用時は `style-src` に `https://fonts.googleapis.com`、`font-src` に `https://fonts.gstatic.com` が必要
- Vercel Analytics 使用時は `script-src` に `https://va.vercel-scripts.com` が必要

---

## 2026-06-24: ホバーターゲットの予測性と公開状況の検証

### 重なりすぎ + 不揃いな間隔でホバー対象が予測できなかった
**状況**: Figma Plugins デッキ（PluginCardDeckThumb.tsx）で、カード幅200pxに対し間隔が約46〜62pxしかなく、しかも「意図的に不揃い」な配置だった。各カードが見せる「触れる帯」が細くバラバラで、カーソルがどのカードに当たるか予測しづらいユーザビリティ問題になっていた。

**原因**: 「有機的に見せる」ことを優先して間隔を意図的に不均一にした結果、インタラクションの予測性（どこを触れば何が起きるか）が犠牲になった。

**教訓**:
- 重なるカードのホバーUIでは、各カードが「重ならない帯」を十分かつ均等に確保することが予測性の核。装飾的な不揃いさより操作の予測性を優先する
- 目安: カード幅に対し中心間隔（STEP）を十分取り、露出帯を均等にする（今回は幅200pxに対しSTEP=150pxで約150pxの露出帯）
- 固定px設計のクラスタは狭い画面で見切れる。ResizeObserver でコンテナ幅を測り、設計幅に収まらなければ等比 scale で縮小する（クリップさせない）

### プラグインの公開状況は manifest.json の id で判定できる
**状況**: ポートフォリオで「Coming Soon」表示のプラグインが実際に公開済みか、Figma プロフィール（403でWebFetch不可）や Web 検索では確認できなかった。

**解決策**: ローカルのプラグインソース（~/Documents/figma-plugin/）の manifest.json を確認。
- **公開済み** → `id` が数値の Figma community ID（例: 1579722656902401183）
- **未公開** → `id` がローカル用スラッグ（例: arrow-connect-plugin, screenshot-reorganizer-local）

**教訓**:
- 外部サービス（Figma Community 等）の公開状況は、まず手元の一次ソース（manifest・ビルド成果物・公開URL記録）で機械的に判定する
- 外部の真実（別PC/別アカウントでの公開）はローカルに反映されないため検出できない。その場合は本人確認や公開URLの提供を仰ぐ

### ユーザーの「合計N個」と実データが食い違ったら、合意を取るまで実装しない
**状況**: 「Coming Soon を公開済みに」「合計4つにしたい」という要望だったが、調査では公開済みは3つ。ユーザー提示の URL（1609...）は新規プラグインではなく既存 Bulk Screenshot Importer の正しい URL（データの 1617... が誤り）だった。最終的に「公開済みは3つ」で確定し、デッキは3枚にした。

**教訓**:
- 「N個にしたい」という数の要望と、こちらの調査結果がズレたら、推測で実装せず AskUserQuestion で1つずつ潰す（このIDは新規か既存の修正か／4つ目は何か）
- ユーザーが提示する URL は「新規追加」ではなく「既存データの訂正」のこともある。ID をローカル manifest と突き合わせて正体を確認する
- 数の思い込み（4 vs 3）は、各要素の正体を確定すれば自然に解消する

---

## 2025-01-17: Tailwind spacing のローカル vs 本番不一致

> ADR: docs/decisions/002-tailwind-spacing-fix.md

**状況**: カスタム Tailwind spacing を定義したら、ローカルと Vercel 本番で異なるレンダリングになった。

**教訓**:
- Tailwind のカスタム spacing を定義する場合、`extend` 内に書かないとデフォルトが上書きされる
- 問題が複雑な場合はカスタム値を削除してデフォルトに戻す判断も重要
