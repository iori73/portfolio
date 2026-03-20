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
