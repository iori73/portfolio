# IMPLEMENTATION_PLAN.md - Portfolio

> 改善ロードマップ。
> 新しいプロジェクトの初期実装計画ではなく、運用中のポートフォリオの段階的改善を管理する。

---

## Phase 1: デザインシステム全ページ適用 ✅ 進行中

### 1.1 セマンティックカラートークン適用
- [x] CSS 変数定義（globals.css）
- [x] Tailwind 接続（tailwind.config.js）
- [x] Ukiyoe ページ（パイロット）
- [ ] Gym Dashboard ページ
- [ ] Google UX ページ
- [ ] Home ページ
- [ ] About ページ
- [ ] Blog ページ
- [ ] Header / Footer

### 1.2 インライン style の排除
- [x] Ukiyoe ページ
- [x] Gym Dashboard ページ
- [x] not-found.tsx
- [ ] 残りのコンポーネント（Grep で `fontFamily` を検索して確認）

### 1.3 dead code の削除
- [ ] `src/lib/fonts.tsx`（未使用、`src/hooks/useFonts.ts` と重複）
- [ ] `styles/globals.css`（全行コメントアウト済み）
- [ ] `src/lib/i18n.tsx.backup`（next-intl 移行後の残骸）

---

## Phase 2: ドキュメント整理

### 2.1 古いドキュメントのアーカイブ
以下は `docs/architecture/design-system.md` に統合済みのため、`_archive/docs/` に移動を検討:

- `docs/font-weight-and-size-inventory.md`
- `docs/current-typography-inventory.md`
- `docs/FONT_USAGE_AUDIT.md`
- `docs/typography-refactor-plan.md`
- `docs/chat-context-prompt.md`

### 2.2 README.md の更新
- [ ] Next.js 14 → 15 の記載修正
- [ ] npm の記載確認
- [ ] ドキュメントリンクの更新

### 2.3 TYPOGRAPHY_TABLE.md / TYPOGRAPHY_GUIDE.md の扱い
- design-system.md との役割分担を明確化
- 重複があれば統合を検討

---

## Phase 3: コンテンツ・機能改善（将来）

### 3.1 新しい Work ケーススタディ追加
- テンプレートパターンを確立（既存3ページから抽象化）

### 3.2 パフォーマンス最適化
- [ ] 画像の最適化（next/image の活用度確認）
- [ ] Lighthouse スコアの測定・改善

### 3.3 アクセシビリティ改善
- [ ] WCAG AA 準拠の確認
- [ ] キーボードナビゲーションのテスト

---

## 優先度ガイドライン

1. **ユーザーに見える問題** → 最優先
2. **デザインシステムの一貫性** → Phase 1
3. **ドキュメントの正確性** → Phase 2
4. **新機能・最適化** → Phase 3

---

## QA 由来バックログ（2026-07-03 本番レビュー）

> 全問題の詳細・証拠スクショ: [docs/qa-2026-07-03/report.md](qa-2026-07-03/report.md)。優先度ガイドラインの「1. ユーザーに見える問題」に該当。修正推奨順:

### 🔴 機能欠陥（最優先）
- [x] 全ページ title「v0 App」→ 実名 metadata + OGP（`app/layout.tsx`）
- [x] google-ux の生 i18n キー7個（名前空間修正 + `googleUXProject.role` 追加）
- [x] Blog Medium が空（CSP に `api.rss2json.com` 追加）
- [x] Blog note サムネ破損（空 src のフォールバック）
- [x] podcast 一覧 API 502（真因は @notionhq/client v5 の `databases.query` 廃止 → `dataSources.query` 移行。env 問題ではなかった）
- [x] podcast サマリー「…」切れ（静的 JSON 全文再生成 211件 + parseBlocks の toggle/Key Takeaways 対応）
- [x] カスタム 404 未使用（`[locale]/[...rest]/page.tsx` + `app/not-found.tsx` 追加）
- [x] About 可視化が SP で極小（フォント/径拡大 + `height="auto"` 除去、4-5px→15px）
- [~] gym API 常時 500 → コード側は 200 フォールバック化済み。本番の実データ供給（CSV をリポジトリ相対 or 静的統計化）は残

### 🟠 UX・挙動
- [x] モバイルメニュー背景タップで閉じない + 背面スクロールロック（`Header.tsx`）
- [ ] 回遊導線欠如（Home Work 一覧 or Next Project ナビ、**airline 最優先**）※デザイン判断待ち

### 🟡 軽微
- [x] CV(JP) h1 に `getHeadingFontClass()` 適用
- [ ] API レートリミットの共有バケット改善
- [ ] podcast ヒーロー文言と実装（embeddings 無し）の整合
- [ ] Blog に h1 追加
- [ ] podcast-notes-all の scdn 期限切れ画像（静的JSON再生成で更新された可能性あり、要確認）
