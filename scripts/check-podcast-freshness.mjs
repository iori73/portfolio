// Notion の最新エピソードが本番サイトに載っているかを確認する（結果を監視する）。
// 共有切れ・push拒否・デプロイ不達など、原因を問わず「サイトが古い」状態を検知するための単一チェック。
//
// 判定: Notion に GRACE_DAYS 日より前に作られたページが、本番の podcast-notes.json に無ければ失敗。
// 失敗時は exit 1（ワークフロー側が Issue を起こす）。

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DB_ID = process.env.NOTION_PODCAST_DB_ID;
// 本番ドメインは Vercel の Security Checkpoint が bot に 429 を返すため、デプロイ元の main 上の JSON を見る
// （Vercel は main への merge で自動デプロイされる）。
const SITE_URL = process.env.SITE_URL || 'https://raw.githubusercontent.com/iori73/portfolio/main/public';
const GRACE_DAYS = 3;
const SAMPLE = 20;

const NOTION_VERSION = '2025-09-03';

function fail(msg) {
  console.error(`FRESHNESS CHECK FAILED: ${msg}`);
  process.exit(1);
}

async function notion(path, body) {
  const res = await fetch(`https://api.notion.com/v1${path}`, {
    method: body ? 'POST' : 'GET',
    headers: {
      Authorization: `Bearer ${NOTION_API_KEY}`,
      'Notion-Version': NOTION_VERSION,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    fail(`Notion ${path} -> ${res.status} ${(await res.text()).slice(0, 200)} (integration lost access?)`);
  }
  return res.json();
}

if (!NOTION_API_KEY || !NOTION_DB_ID) fail('Missing NOTION_API_KEY or NOTION_PODCAST_DB_ID');

const db = await notion(`/databases/${NOTION_DB_ID}`);
const dataSourceId = db.data_sources?.[0]?.id;
if (!dataSourceId) fail('Database has no data source');

const { results } = await notion(`/data_sources/${dataSourceId}/query`, {
  sorts: [{ timestamp: 'created_time', direction: 'descending' }],
  page_size: SAMPLE,
});
if (results.length === 0) fail('Notion returned 0 pages');

const siteRes = await fetch(`${SITE_URL}/data/podcast-notes.json`, { cache: 'no-store' });
if (!siteRes.ok) fail(`Site JSON -> ${siteRes.status}`);
const site = await siteRes.json();
const siteIds = new Set(site.episodes.map((e) => e.id));

const cutoff = Date.now() - GRACE_DAYS * 24 * 60 * 60 * 1000;
const missing = results.filter((p) => Date.parse(p.created_time) < cutoff && !siteIds.has(p.id));

console.log(`Notion latest: ${results[0].created_time} / site episodes: ${site.episodes.length}`);
if (missing.length > 0) {
  fail(
    `${missing.length} Notion page(s) older than ${GRACE_DAYS} days are missing from the published data (${SITE_URL}). ` +
      `Oldest missing created_time: ${missing[missing.length - 1].created_time}`
  );
}
console.log('OK: site is in sync with Notion');
