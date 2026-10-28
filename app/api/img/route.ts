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
    // redirect:'manual' — 許可ドメインがリダイレクトで別ホストへ飛ばす経路（SSRF / オープンプロキシ）を塞ぐ
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      redirect: 'manual',
    });
    if (response.status >= 300 && response.status < 400) {
      return NextResponse.json({ error: 'Redirect not allowed' }, { status: 502 });
    }

    const contentType = response.headers.get('content-type') || '';
    // SVG は自オリジンから配信するとスクリプトが走り得るので拒否（ラスター画像のみ）
    if (!contentType.startsWith('image/') || contentType.startsWith('image/svg')) {
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
        'Cache-Control': 'public, max-age=3600',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
