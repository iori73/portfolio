# ポートフォリオサイト レビュー（iori-kawano.vercel.app）

レビュー日：2026-07-29／対象：`/about`・`/cv`（英語版で確認。日本語版も同じ記述なら同様に要修正）
突き合わせ元：projects.json、Notion「Songでの案件歴」「ゆめみでの案件歴」、面接準備Q&A（interview-prep）、各PJ docs。

> ⚠️＝事実誤り／要確認、✂️＝冗長・要簡潔化、💡＝改善提案。**優先度高＝★**

---

## A. /about の指摘

### A-1 ★⚠️ 学歴の説明が不正確（学部名は正しい）
- 現状：Bachelor's / Aoyama Gakuin /「Studied social structures, group behavior, and research methodology.」
- 事実：**青山学院大学 地球社会共生学部（School of Global Studies and Collaboration）卒業**。同学部は政治・経済・経営・メディア/空間情報・社会学を横断する**社会科学系のグローバル学部**で、①オーダーメイド型カリキュラム、②1〜2年次の集中語学教育、③**原則 東南アジアへ半期留学**、④4領域（コラボレーション＝紛争/平和・経済/ビジネス・メディア/空間情報・ソシオロジー）が特徴。「社会構造・集団行動・リサーチ手法」は概要としてズレている。
- 修正案（EN）：*"B.A. in Global Studies and Collaboration — an interdisciplinary social-science program (politics, economics, business, media, sociology) with an order-made curriculum, intensive language training, and a semester studying abroad in Southeast Asia."*
- 修正案（JP）：「青山学院大学 地球社会共生学部 卒業。政治・経済・経営・メディア/空間情報・社会学を横断する社会科学系のグローバル学部。オーダーメイド型カリキュラムと東南アジアでの半期留学を軸に、語学・異文化コミュニケーション・情報活用力を養う。」

### A-2 ★⚠️ 「Sociology / sociology background」の強調が不正確
- `/cv`冒頭では *"Sociology background turned professional asset…"*、学歴も *"...Collaboration, Sociology"* と**社会学専攻のように**書いている。地球社会共生学部は**社会学専攻ではない**（社会学は4領域の1つ）。「専攻＝Sociology」と読めるのは誤り。
- 提案：「social-science / global-studies background」に変更。集団行動・組織ダイナミクスへの関心は"学びの1側面"として残すのはOK。学部名の後に「, Sociology」と付けるのは削除推奨。

### A-3 💡 NEXT STAGE の業種表記（後述B-5と同じ）
- `/about`「Learning platform UI renewal for a **construction tech company**」。NEXT STAGE＝**技能職（職人）向け動画学習**。"construction tech"は要確認（住宅/建設寄りか、技能職全般か）。

### A-4 💡 スキル「Figma Plugin Development」を筆頭級で出す是非
- あなた自身がプラグインの有用性に懐疑的（後述C）。トップスキルに据えると過大に見えるリスク。実際に効いたものに絞るか、"Design Systems / Tokens" を前に。

---

## B. /cv の指摘

### B-1 ★⚠️ ANA：「12 custom Figma plugins」＝数の誇示＋数値の不整合（詳細はC）
- 現状：*"...developed 12 custom Figma plugins to automate token setup and migration."*
- 問題：(1) **数が資料間で不一致**（初期記事=6／最終README=12／カテゴリ列挙は約15）。(2) あなた自身が「本当に役立ったか疑わしい」と認識。→ **数で語らず、実際に効いた少数＋目的/効果で語る**べき。修正案はC参照。

### B-2 ★⚠️ ANA：トークン変数の数値不一致（346 vs 399）
- `/cv`「**346 variables**, 3 color modes, 3 typography modes」。一方、projects.json・議事録では**約399変数・6コレクション**。どちらかが古い/誤り。→ **正しい数値に統一**（不明なら「約350」等に丸めるか、最新Figma実データで確定）。

### B-3 ★⚠️ ANA：「Owned the design system」は過大
- 現状：*"Owned the design system spanning mobile apps and web."*／冒頭も *"I owned an airline design system…"*。
- 事実：DSは大規模で**本人担当はトークン基盤・プラグイン・監査・検証・競合リサーチ**。ブランド方向性・本番UI Kitの大半・完成画面はチーム成果。"owned"は過大表現。
- 修正案（EN）：*"Built the token foundation and tooling for the airline's design system — a two-layer token architecture (~399 variables) and custom Figma plugins for token setup, linting, and migration."*（"owned the design system" → "built the token foundation & tooling"）

### B-4 ★✂️ Panasonic（CONSUMER ELECTRONICS）：冗長 → 簡潔化
- 現状：*"Designed smart home voice push notification UI. Managed two parallel design tracks, built interactive HTML prototypes to validate a character-count-aware responsive text system, and created frame-perfect infinite-loop loader animations."*
- 実作業（要点）：CCHUB通知設定UI＋他社スピーカーのセットアップウィザードの**2トラック**／文字数対応のレスポンシブテキスト設計をHTMLプロトで検証／ループ型ローダー／命名規則統一。
- 修正案（EN・簡潔）：*"Designed the UI for a smart-home voice push-notification service across two tracks (in-house hub + third-party speaker setup). Validated a character-count-aware responsive text system with HTML prototypes."*
- 修正案（JP・簡潔）：「スマートホーム音声プッシュ通知のUIを2トラック（自社ハブ＋他社スピーカー設定）で設計。文字数対応のレスポンシブ設計をHTMLプロトで検証。」
- ※ローダーアニメや命名規則は"詳細質問で話す"深掘りネタに回し、サマリーからは落として良い。

### B-5 ⚠️ NEXT STAGE（CONSTRUCTION TECH）：業種と担当範囲の要確認
- (a) 業種：*"...for the residential construction industry"*。NEXT STAGE＝技能職（職人）向け動画学習。**"residential construction"に限定して良いか要確認**（技能職全般ならその表現に）。
- (b) 担当：*"Led full UI renewal … redesign 11+ screens"*。実際は**"いおりん"担当の約20カットのみ**で、ホーム/動画視聴/マイページ等は他メンバー。"Led full UI renewal"は**担当範囲を過大に見せる**。→ "Contributed to the UI renewal; personally owned ~20 screens (search, in-progress/review, e-learning) applying OOUI + gamification." 等に。

### B-6 💡 職歴の一貫性（軽微・確認のみ）
- `/about`は Accenture「2025—Present」/YUMEMI「2025—2025」、`/cv`は Accenture「Dec 2025—Present」/YUMEMI「Apr 2025—Dec 2025」。/cvの方が具体で整合的。/aboutの年表記も揃えると良い。

---

## C. ANA「12プラグイン」— 実体と書き換え提案（あなたの問い）

**はい、実体を把握しています。** projects.json のカテゴリ定義では次の**5カテゴリ・計約15個**が列挙されています（"12"とは不一致）：

| カテゴリ | プラグイン |
|---|---|
| Foundation | Color Setup / Typography Setup |
| Library | Component Showcase / Component Organizer / TOC Linker |
| Migration | **Variable Migrator** / **Design Lint Fixer** / Field Replacer |
| Production | Design Study Generator / Study Style Applicator / **Screenshot Importer** |
| Conversion | PC to SP Converter / Flow Organizer / Form Pattern Matrix |

- **本当に効いた（面接で語れる）中核**：**Variable Migrator ＋ Design Lint Fixer**（適用順が重要＝先にLintすると生値化してMigratorの自動マッチが壊れる、という設計判断まで語れる）、Color/Typography **Setup**（トークン基盤の自動流し込み）、**Screenshot Importer**（検証エビデンス収集）。
- **有用性が疑わしい/一過性**：Showcase・Organizer・TOC Linker・Flow Organizer・Form Pattern Matrix 等は用途限定・使い捨て寄り。
- **推奨リライト**：数を売りにせず、**目的と効果**で語る。
  - EN：*"Built custom Figma plugins for the token pipeline — automated token setup, design-lint fixing, and variable migration (the migrate-after-lint ordering cut manual re-binding significantly)."*
  - JP：「トークン運用のためのFigmaプラグイン群を自作。トークンの自動セットアップ、デザインLint修正、変数マイグレーションを自動化（"Lint→Migrate"の順序設計で手作業の再バインドを大幅削減）。」
- **数字を残すなら**：まず"何個作ったか"を社内資料で確定（6/12/15のどれが正か）。曖昧なら数を出さないのが安全。

---

## D. まとめ：最優先の直し（TOP5）
1. **A-1/A-2** 学歴＝地球社会共生学部の正確な説明に。"Sociology専攻"表現は撤回。
2. **B-1/C** ANAプラグインを"12個開発"から"効いた少数＋効果"に。数値は社内資料で確定。
3. **B-3** ANA "owned the design system" → "built the token foundation & tooling"（過大表現の是正）。
4. **B-2** トークン変数 346 vs 399 の不一致を解消。
5. **B-4** Panasonicのサマリーを簡潔化（詳細は面接の深掘りネタへ）。

---

## E. 日本語版（/jp/about・/jp/cv）追加確認 ★

JP版はEN版と同じ問題（学歴の説明・Sociology寄り・346変数・"担当/主導"の過大・Panasonic冗長・NEXT STAGE業種&範囲）を**すべて含む**。加えてJP版**固有**の問題：

### E-1 ★⚠️ /cv 学歴見出しが誤植レベル
- 現状：「**学士 in 地球社会共生学部 社会学**」← 英語の "in" が残り、かつ「社会学」が付いて不自然＆不正確。
- 修正案：「**地球社会共生学部 卒業（学士）**」（"in" と "社会学" を削除）。

### E-2 ★⚠️ /about に学部名が無い
- JP/EN とも /about は「青山学院大学」だけで**学部名が欠落**（/cvには有り）。→ 「青山学院大学 **地球社会共生学部**」に統一し、説明もA-1の正確版へ。

### E-3 ⚠️ /cv 冒頭「社会学を学び…」
- 現状：「社会学を学び、システムで考え、コードで実装するデザイナー。集団行動と組織のダイナミクスを読む力が…」
- 社会学専攻ではない → 「**社会科学（地球社会共生学部）を学び**、…」等に。"集団行動・組織ダイナミクスを読む力"の主張は残してOK。

### E-4 JP版 該当箇所の具体（EN修正と対）
- 航空：「346変数」→**約399に統一**／「デザインシステムを**担当**」→「デザインシステムの**トークン基盤とツールを構築**」（過大表現回避、C参照）。
- 大手電機（Panasonic）：現状「…2つの並行デザイントラックを管理。文字数対応…HTMLプロト…フレームパーフェクトな無限ループローダー…」→ 簡潔案：「**スマートホーム音声プッシュ通知のUIを2トラック（自社ハブ＋他社スピーカー設定）で設計。文字数対応のレスポンシブ設計をHTMLプロトで検証。**」
- 建築テック（NEXT STAGE）：「**住宅建築業界向け**」は要確認（技能職全般か）／「UI全面リニューアルを**主導**」「11画面以上を再設計」→ 「UIリニューアルに参画し、**"いおりん"担当の約20画面（検索・受講中/復習・eラーニング等）**をOOUI＋ゲーミフィケーションで設計」に是正。

> 結論：JP・EN両方、A〜Eの修正が必要。`portfolio-review.md`（本ファイル）を別PCに共有すれば、そのままソース修正の指示書として使えます。
