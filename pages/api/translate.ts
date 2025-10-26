import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const CACHE_DIR = path.resolve(process.cwd(), 'cache/translate');
const LIBRETRANSLATE_URL = 'https://libretranslate.com/translate';

// キャッシュディレクトリがなければ作成
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { text, source, target } = req.body;
  if (!text || !source || !target) {
    return res.status(400).json({ error: 'Missing parameters' });
  }
  // キャッシュファイル名を生成
  const cacheKey = Buffer.from(`${source}:${target}:${text}`).toString('base64');
  const cachePath = path.join(CACHE_DIR, `${cacheKey}.json`);

  // キャッシュがあれば返す
  if (fs.existsSync(cachePath)) {
    const cached = JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
    return res.status(200).json({ translated: cached.translated });
  }

  // LibreTranslate APIにリクエスト
  try {
    const response = await fetch(LIBRETRANSLATE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: text, source, target, format: 'text' }),
    });
    const data = await response.json();
    if (!data.translatedText) {
      throw new Error('Translation failed');
    }
    // キャッシュに保存
    fs.writeFileSync(cachePath, JSON.stringify({ translated: data.translatedText }), 'utf-8');
    return res.status(200).json({ translated: data.translatedText });
  } catch (e) {
    return res.status(500).json({ error: 'Translation error', detail: e.message });
  }
}
