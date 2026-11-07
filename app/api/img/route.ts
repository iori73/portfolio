import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/src/lib/rate-limit';

const ALLOWED_DOMAINS = [
  'assets.st-note.com',
  'note.com',
  'cdn-images-1.medium.com',
  'miro.medium.com',
  'images.unsplash.com',
];

function isAllowedUrl(urlString: string): boolean {
  try {
    const parsed = new URL(urlString);
    if (parsed.protocol !== 'https:') return false;
    return ALLOWED_DOMAINS.some(
      (domain) => parsed.hostname === domain || parsed.hostname.endsWith(`.${domain}`),
    );
  } catch {
    return false;
  }
}

const MAX_RESPONSE_SIZE = 10 * 1024 * 1024; // 10MB

// Raster formats only. SVG can carry <script>, and served from this origin it would
// run under the site's CSP (which allows inline scripts) — a stored-XSS vector.
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];

export async function GET(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
  const { success } = rateLimit(ip, { limit: 30, windowMs: 60_000 });
  if (!success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const url = request.nextUrl.searchParams.get('url');
  if (!url) return NextResponse.json({ error: 'No URL' }, { status: 400 });

  if (!isAllowedUrl(url)) {
    return NextResponse.json({ error: 'Domain not allowed' }, { status: 403 });
  }

  try {
    // Do not follow redirects: an allowed host redirecting elsewhere would otherwise
    // turn this into a proxy for any URL, bypassing ALLOWED_DOMAINS.
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      redirect: 'error',
    });
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch' }, { status: 502 });
    }

    const contentType = (response.headers.get('content-type') || '').split(';')[0].trim().toLowerCase();
    if (!ALLOWED_TYPES.includes(contentType)) {
      return NextResponse.json({ error: 'Not an image' }, { status: 400 });
    }

    const contentLength = response.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > MAX_RESPONSE_SIZE) {
      return NextResponse.json({ error: 'Image too large' }, { status: 413 });
    }

    const buffer = await response.arrayBuffer();
    if (buffer.byteLength > MAX_RESPONSE_SIZE) {
      return NextResponse.json({ error: 'Image too large' }, { status: 413 });
    }

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        // Even if a file is mislabelled, the browser must not run anything in it.
        // (next.config.mjs sets the same CSP for /api/img so the site-wide one cannot win.)
        'Content-Security-Policy': "default-src 'none'; sandbox",
        'X-Content-Type-Options': 'nosniff',
        // s-maxage lets Vercel's CDN answer repeats, so floods of the same URL do not
        // invoke the function (the in-memory rate limiter is per-instance only).
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
