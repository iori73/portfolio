/**
 * Podcast Notes データパイプライン
 *
 * Notion DB → OpenAI Embeddings → UMAP 次元削減 → JSON 出力
 *
 * Usage:
 *   node scripts/generate-podcast-data.js
 *   node scripts/generate-podcast-data.js --skip-embeddings  (OpenAI APIキーなしで実行)
 */

const { Client } = require('@notionhq/client');
const fs = require('fs');
const path = require('path');

// Load .env.local if running locally
try { require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') }); } catch {}

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DB_ID = process.env.NOTION_PODCAST_DB_ID;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const SKIP_EMBEDDINGS = process.argv.includes('--skip-embeddings') || !OPENAI_API_KEY;
const METADATA_ONLY = process.argv.includes('--metadata-only');

const CATEGORY_COLORS = {
  'Technology': '#6C5CE7',
  'AI': '#6C5CE7',
  'Al': '#6C5CE7',
  'Science': '#0984E3',
  'Biology & Nature': '#00B894',
  'Design & Art': '#FD79A8',
  'Business': '#FDCB6E',
  'Career': '#F39C12',
  'Startup & VC': '#E17055',
  'Education': '#74B9FF',
  'Liberal Arts': '#A29BFE',
  'Others': '#636E72',
};

const DEFAULT_COLOR = '#B2BEC3';

// ─── Notion helpers ───────────────────────────────────────

const notion = new Client({ auth: NOTION_API_KEY });

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function withRetry(fn, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (err.status === 429 && attempt < maxRetries - 1) {
        const retryAfter = parseInt(err.headers?.get?.('retry-after') || '60', 10);
        const waitSec = Math.max(retryAfter, 60) + attempt * 30;
        console.log(`  Rate limited, waiting ${waitSec}s before retry (attempt ${attempt + 1}/${maxRetries})...`);
        await sleep(waitSec * 1000);
      } else {
        throw err;
      }
    }
  }
}

async function fetchAllPages() {
  const pages = [];
  let cursor = undefined;
  let hasMore = true;

  while (hasMore) {
    const response = await withRetry(() =>
      notion.search({
        filter: { property: 'object', value: 'page' },
        start_cursor: cursor,
        page_size: 100,
      })
    );

    const dbPages = response.results.filter(
      (p) => p.parent?.data_source_id === '1db26482-6e0c-8160-ad77-000b12e41365'
    );
    pages.push(...dbPages);
    hasMore = response.has_more;
    cursor = response.next_cursor;
    await sleep(500);
  }

  console.log(`Fetched ${pages.length} pages from Notion`);
  return pages;
}

function extractRichText(richTextArr) {
  if (!richTextArr) return '';
  return richTextArr.map((t) => t.plain_text).join('');
}

function normalizeCategoryName(name) {
  if (name === 'Al') return 'AI';
  return name;
}

function extractPageMetadata(page) {
  const props = page.properties;
  const rawCategory = props.Category?.select?.name || null;
  const category = rawCategory ? normalizeCategoryName(rawCategory) : null;
  return {
    id: page.id,
    title: extractRichText(props.Name?.title) || '(Untitled)',
    podcast: props.Podcast?.select?.name || 'Unknown',
    podcastCover: page.cover?.external?.url || page.cover?.file?.url || '',
    category,
    tags: [category].filter(Boolean),
    date: props['Release Date']?.date?.start || page.created_time?.split('T')[0] || '',
    url: props.URL?.url || '',
    durationMinutes: props['1. Duration']?.number || 0,
  };
}

async function fetchPageBlocks(pageId) {
  const blocks = [];
  let cursor = undefined;
  let hasMore = true;

  while (hasMore) {
    const response = await withRetry(() =>
      notion.blocks.children.list({
        block_id: pageId,
        start_cursor: cursor,
        page_size: 100,
      })
    );
    blocks.push(...response.results);
    hasMore = response.has_more;
    cursor = response.next_cursor;
  }

  return blocks;
}

/**
 * Section-aware parser: walks Notion blocks and extracts structured content.
 *
 * Notion page structure (confirmed via Playwright):
 *   heading_3 "Basic Information"  → skip (redundant metadata)
 *   heading_3 "Summary"            → summary text + key points
 *   heading_3 "Chapters"           → timestamped chapter list
 *   heading_3 "Transcript"         → full transcript (flag only)
 *
 * Some pages use heading_2 instead of heading_3 for section headers.
 */
function parsePageContent(blocks) {
  let currentSection = null;
  let currentSubSection = null;
  const summaryParts = [];
  const keyLearnings = [];
  const chapters = [];
  let hasTranscript = false;
  // Fallback: collect all text for embedding generation
  const allText = [];

  const SECTION_NAMES = ['basic information', 'summary', 'chapters', 'timestamps', 'transcript'];
  const SKIP_SECTIONS = ['basic information'];
  const SUMMARY_SECTIONS = ['summary'];
  const CHAPTER_SECTIONS = ['chapters', 'timestamps'];
  const TRANSCRIPT_SECTIONS = ['transcript'];
  // Sub-sections within Summary that should be skipped or treated differently
  const KEY_POINT_LABELS = ['主要ポイント', 'key points', 'key learnings'];

  for (const block of blocks) {
    const type = block.type;
    const content = block[type];
    const text = content?.rich_text ? extractRichText(content.rich_text) : '';

    // Detect section headers (heading_2 or heading_3)
    if (type === 'heading_2' || type === 'heading_3') {
      const headerLower = text.toLowerCase().trim();
      if (SECTION_NAMES.some((s) => headerLower.includes(s))) {
        if (SKIP_SECTIONS.some((s) => headerLower.includes(s))) {
          currentSection = 'skip';
        } else if (SUMMARY_SECTIONS.some((s) => headerLower.includes(s))) {
          currentSection = 'summary';
        } else if (CHAPTER_SECTIONS.some((s) => headerLower.includes(s))) {
          currentSection = 'chapters';
        } else if (TRANSCRIPT_SECTIONS.some((s) => headerLower.includes(s))) {
          currentSection = 'transcript';
          hasTranscript = true;
        }
        currentSubSection = null;
        continue;
      }
      // Check for sub-section within summary (e.g., "主要ポイント:")
      if (currentSection === 'summary') {
        const subLower = text.toLowerCase().trim();
        if (KEY_POINT_LABELS.some((kp) => subLower.includes(kp))) {
          currentSubSection = 'keypoints';
        } else {
          currentSubSection = 'text';
        }
        continue;
      }
    }

    if (!text) continue;

    // Collect all text for embeddings
    if (currentSection !== 'transcript') {
      allText.push(text);
    }

    // Route text based on current section
    if (currentSection === 'skip') {
      continue;
    } else if (currentSection === 'summary') {
      // Bulleted list items in key points sub-section
      if (currentSubSection === 'keypoints' || type === 'bulleted_list_item') {
        const cleaned = text.replace(/^[•\-・→]\s*/, '').trim();
        if (cleaned.length > 5 && cleaned.length < 500) {
          keyLearnings.push(cleaned);
        }
      } else {
        // Strip common prefixes like "要約:" or "冒頭の内容:" etc.
        const stripped = text.replace(/^(要約|冒頭の内容|中盤の内容)\s*[:：]\s*/, '').trim();
        if (stripped) {
          summaryParts.push(stripped);
        }
      }
    } else if (currentSection === 'chapters') {
      // Parse timestamp lines: "00:00 Title..." or "0:00:00 Title..."
      const match = text.match(/^(\d{1,2}:\d{2}(?::\d{2})?)\s+(.+)/);
      if (match) {
        chapters.push({
          timestamp: match[1],
          title: match[2].substring(0, 100), // cap chapter title length
        });
      }
    } else if (currentSection === 'transcript') {
      // Don't store transcript text, just flag
      hasTranscript = true;
    } else if (currentSection === null) {
      // Before any section header, text might still be useful
      allText.push(text);
    }
  }

  // Build summary: join paragraphs, cap at 500 chars
  let summary = summaryParts.join(' ').trim();
  if (summary.length > 500) {
    summary = summary.substring(0, 497).trim() + '...';
  }

  return {
    summary,
    keyLearnings: keyLearnings.slice(0, 8),
    chapters,
    hasTranscript,
    contentText: allText.join('\n'),
  };
}

// ─── OpenAI Embeddings ───────────────────────────────────

async function generateEmbeddings(texts) {
  if (SKIP_EMBEDDINGS) {
    console.log('Skipping embeddings (--skip-embeddings or no OPENAI_API_KEY)');
    return null;
  }

  const OpenAI = require('openai');
  const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

  console.log(`Generating embeddings for ${texts.length} texts...`);
  const embeddings = [];
  const batchSize = 20;

  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize);
    const truncated = batch.map((t) => t.substring(0, 8000));

    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: truncated,
    });

    embeddings.push(...response.data.map((d) => d.embedding));
    console.log(`  Embedded ${Math.min(i + batchSize, texts.length)}/${texts.length}`);
  }

  return embeddings;
}

// ─── UMAP + Clustering ──────────────────────────────────

function runUMAP(embeddings) {
  const { UMAP } = require('umap-js');

  console.log('Running UMAP dimensionality reduction...');
  const umap = new UMAP({
    nComponents: 2,
    nNeighbors: Math.min(15, Math.floor(embeddings.length / 2)),
    minDist: 0.1,
    spread: 1.0,
  });

  return umap.fit(embeddings);
}

function kMeans(points, k, maxIter = 100) {
  const n = points.length;
  if (n === 0 || k <= 0) return { assignments: [], centroids: [] };

  const centroids = [];
  const used = new Set();
  for (let i = 0; i < k; i++) {
    let idx;
    do {
      idx = Math.floor(Math.random() * n);
    } while (used.has(idx));
    used.add(idx);
    centroids.push([...points[idx]]);
  }

  let assignments = new Array(n).fill(0);

  for (let iter = 0; iter < maxIter; iter++) {
    const newAssignments = points.map((p) => {
      let minDist = Infinity;
      let minIdx = 0;
      for (let c = 0; c < k; c++) {
        const dx = p[0] - centroids[c][0];
        const dy = p[1] - centroids[c][1];
        const dist = dx * dx + dy * dy;
        if (dist < minDist) {
          minDist = dist;
          minIdx = c;
        }
      }
      return minIdx;
    });

    const sums = Array.from({ length: k }, () => [0, 0]);
    const counts = new Array(k).fill(0);
    for (let i = 0; i < n; i++) {
      const c = newAssignments[i];
      sums[c][0] += points[i][0];
      sums[c][1] += points[i][1];
      counts[c]++;
    }
    for (let c = 0; c < k; c++) {
      if (counts[c] > 0) {
        centroids[c][0] = sums[c][0] / counts[c];
        centroids[c][1] = sums[c][1] / counts[c];
      }
    }

    let changed = false;
    for (let i = 0; i < n; i++) {
      if (assignments[i] !== newAssignments[i]) {
        changed = true;
        break;
      }
    }
    assignments = newAssignments;
    if (!changed) break;
  }

  return { assignments, centroids };
}

// Use category-based clustering as fallback when no embeddings
function categoryBasedPositioning(episodes) {
  const categories = [...new Set(episodes.map((e) => e.category || 'Others'))];
  const angleStep = (2 * Math.PI) / categories.length;

  const positions = episodes.map((ep) => {
    const catIdx = categories.indexOf(ep.category || 'Others');
    const angle = angleStep * catIdx;
    const radius = 3 + Math.random() * 2;
    const jitterAngle = angle + (Math.random() - 0.5) * angleStep * 0.7;
    return [
      Math.cos(jitterAngle) * radius + (Math.random() - 0.5) * 1.5,
      Math.sin(jitterAngle) * radius + (Math.random() - 0.5) * 1.5,
    ];
  });

  return positions;
}

// ─── Cluster labeling ────────────────────────────────────

function labelClusters(episodes, assignments, centroids) {
  const k = centroids.length;
  const clusters = [];

  for (let c = 0; c < k; c++) {
    const clusterEpisodes = episodes.filter((_, i) => assignments[i] === c);
    const catCounts = {};
    for (const ep of clusterEpisodes) {
      const cat = ep.category || 'Others';
      catCounts[cat] = (catCounts[cat] || 0) + 1;
    }
    const sortedCats = Object.entries(catCounts).sort((a, b) => b[1] - a[1]);
    const topCat = sortedCats[0]?.[0] || 'Others';

    clusters.push({
      id: c,
      label: topCat,
      center: centroids[c],
      color: CATEGORY_COLORS[topCat] || DEFAULT_COLOR,
      episodeCount: clusterEpisodes.length,
    });
  }

  return clusters;
}

// ─── Main ─────────────────────────────────────────────────

async function main() {
  console.log('=== Podcast Notes Data Pipeline ===\n');

  if (!NOTION_API_KEY || !NOTION_DB_ID) {
    console.error('Missing NOTION_API_KEY or NOTION_PODCAST_DB_ID in environment');
    process.exit(1);
  }

  // 1. Fetch all pages from Notion
  const pages = await fetchAllPages();

  // 2. Extract metadata for each page
  console.log('Extracting metadata...');
  const episodes = pages.map(extractPageMetadata);

  // 3. Fetch page content (rate-limited) — skip with --metadata-only
  if (!METADATA_ONLY) {
    console.log('Fetching page content...');
    for (let i = 0; i < episodes.length; i++) {
      const blocks = await fetchPageBlocks(episodes[i].id);
      const parsed = parsePageContent(blocks);
      episodes[i].contentText = parsed.contentText;
      episodes[i].summary = parsed.summary;
      episodes[i].keyLearnings = parsed.keyLearnings;
      episodes[i].chapters = parsed.chapters;
      episodes[i].hasTranscript = parsed.hasTranscript;

      await sleep(350);

      if ((i + 1) % 20 === 0) {
        console.log(`  Fetched content for ${i + 1}/${episodes.length} episodes`);
      }
    }
    console.log(`  Fetched content for ${episodes.length}/${episodes.length} episodes`);
  } else {
    console.log('Skipping page content fetch (--metadata-only)');
    for (const ep of episodes) {
      ep.contentText = '';
      ep.summary = '';
      ep.keyLearnings = [];
      ep.chapters = [];
      ep.hasTranscript = false;
    }
  }

  // 4. Generate embeddings
  const embeddingTexts = episodes.map(
    (ep) => `${ep.title}\n${ep.podcast}\n${ep.tags.join(', ')}\n${ep.contentText?.substring(0, 2000) || ''}`
  );

  const embeddings = await generateEmbeddings(embeddingTexts);

  // 5. UMAP + Clustering
  let positions;
  let assignments;
  let centroids;

  if (embeddings) {
    positions = runUMAP(embeddings);
    const numClusters = Math.min(8, Math.max(3, Math.floor(episodes.length / 15)));
    const clustering = kMeans(positions, numClusters);
    assignments = clustering.assignments;
    centroids = clustering.centroids;
  } else {
    console.log('Using category-based positioning (no embeddings)');
    positions = categoryBasedPositioning(episodes);
    const categories = [...new Set(episodes.map((e) => e.category || 'Others'))];
    assignments = episodes.map((ep) => categories.indexOf(ep.category || 'Others'));
    centroids = categories.map((_, i) => {
      const angle = ((2 * Math.PI) / categories.length) * i;
      return [Math.cos(angle) * 3, Math.sin(angle) * 3];
    });
  }

  // 6. Build cluster info
  const clusters = labelClusters(episodes, assignments, centroids);

  // 7. Build podcast stats
  const podcastMap = new Map();
  for (const ep of episodes) {
    if (!podcastMap.has(ep.podcast)) {
      podcastMap.set(ep.podcast, {
        name: ep.podcast,
        cover: ep.podcastCover,
        episodeCount: 0,
        primaryTags: new Set(),
      });
    }
    const pod = podcastMap.get(ep.podcast);
    pod.episodeCount++;
    ep.tags.forEach((t) => pod.primaryTags.add(t));
  }

  const podcasts = [...podcastMap.values()]
    .map((p) => ({ ...p, primaryTags: [...p.primaryTags] }))
    .sort((a, b) => b.episodeCount - a.episodeCount);

  // 8. Build tag distribution
  const tagDistribution = {};
  for (const ep of episodes) {
    for (const tag of ep.tags) {
      tagDistribution[tag] = (tagDistribution[tag] || 0) + 1;
    }
  }

  // 9. Build output
  const output = {
    episodes: episodes.map((ep, i) => ({
      id: ep.id,
      title: ep.title,
      podcast: ep.podcast,
      podcastCover: ep.podcastCover,
      category: ep.category,
      tags: ep.tags,
      date: ep.date,
      url: ep.url,
      durationMinutes: ep.durationMinutes,
      summary: ep.summary,
      keyLearnings: ep.keyLearnings,
      chapters: ep.chapters || [],
      hasTranscript: ep.hasTranscript || false,
      embedding2d: positions[i],
      cluster: assignments[i],
    })),
    podcasts,
    clusters,
    stats: {
      totalEpisodes: episodes.length,
      totalPodcasts: podcasts.length,
      totalCategories: Object.keys(tagDistribution).length,
      tagDistribution,
    },
    meta: {
      generatedAt: new Date().toISOString(),
      hasEmbeddings: !!embeddings,
    },
  };

  // 10. Write output
  const outputPath = path.join(__dirname, '..', 'public', 'data', 'podcast-notes.json');
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
  console.log(`\nOutput written to ${outputPath}`);
  console.log(`  ${output.stats.totalEpisodes} episodes`);
  console.log(`  ${output.stats.totalPodcasts} podcasts`);
  console.log(`  ${output.clusters.length} clusters`);
  console.log(`  Embeddings: ${output.meta.hasEmbeddings ? 'yes' : 'no (category-based fallback)'}`);
}

main().catch((err) => {
  console.error('Pipeline failed:', err);
  process.exit(1);
});
