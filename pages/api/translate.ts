import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Retired (2026-11-06). Nothing on the site calls this route.
 *
 * The old handler accepted any POSTed text from anyone, relayed it to
 * libretranslate.com, and wrote a cache file per request to the server disk.
 * On Vercel it crashed at load (read-only filesystem), but on any writable host it
 * was an unauthenticated write-to-disk + open relay. It now answers 410 so it
 * cannot be abused. Delete this file once confirmed it is not needed.
 */
export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(410).json({ error: 'Gone' });
}
