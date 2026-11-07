#!/bin/bash
# 中初商店のサイトが公開されたら、図版を本番から撮り直して、ローカルに commit する。
#
#   bash scripts/nakahatsu-launch-watch.sh
#
# 定期実行（launchd など）から呼ぶ想定。公開前は何もせずに終わる。
# 判定は src/lib/nakahatsuLaunch.ts と同じ: nakahatsu.jp のトップにテーマ固有の `nkv2-` が入るか。
# 一度更新したら .capture/nakahatsu/refreshed を置いて、二度目以降は何もしない
# （もう一度撮り直したいときはそのファイルを消す）。
#
# やらないこと: git push、main への merge。公開リポジトリなので、push は実質の公開。
# 河野さんが差分と図版を見て、自分で push する。
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
STATE=".capture/nakahatsu/refreshed"
SITE="https://nakahatsu.jp/"

notify() {
  /usr/bin/osascript -e "display notification \"$1\" with title \"portfolio: 中初ケーススタディ\"" >/dev/null 2>&1 || true
}

[ -f "$STATE" ] && exit 0

# 判定できないとき（通信失敗など）は、未公開として何もしない
if ! curl -fsS --max-time 15 -L "$SITE" 2>/dev/null | grep -q 'nkv2-'; then
  exit 0
fi

# 公開後はパスワードなし。環境変数・.env にパスワードが残っていても使わない
export NAKAHATSU_STORE_URL="${SITE%/}"
export NAKAHATSU_STORE_PASSWORD=""

if ! node scripts/capture-nakahatsu-figures.mjs; then
  notify "公開を検知しましたが、図版の撮り直しに失敗しました。手動で scripts/capture-nakahatsu-figures.mjs を確認してください。"
  exit 1
fi
node scripts/generate-og-images.mjs

git add public/work/nakahatsu public/og/nakahatsu.jpg
if git diff --cached --quiet; then
  notify "公開を検知しました。図版に差分はありませんでした。"
else
  git commit -q -m "content(nakahatsu): refresh figures from the launched site

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
  notify "公開を検知し、図版を撮り直して commit しました（push はしていません）。差分を確認してください。"
fi
mkdir -p "$(dirname "$STATE")"
touch "$STATE"

# 公開（push・merge）の前に、先方の一言の書面OKが要る。記録（.capture/nakahatsu/client-ok）が無ければ促す
if [ ! -f ".capture/nakahatsu/client-ok" ]; then
  notify "先方の掲載OKがまだ記録されていません。00-次にやること.md の文面で先方に確認してください（OKが記録されるまで push しない）。"
fi
