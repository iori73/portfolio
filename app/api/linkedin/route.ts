import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/src/lib/rate-limit';

export const revalidate = 3600; // 1時間キャッシュ

export async function GET(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
  const { success } = rateLimit(ip, { limit: 30, windowMs: 60_000 });
  if (!success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    // 初期実装: 静的データを返す
    // 後でLinkedIn API統合やスクレイピングを追加可能

    const linkedInData = {
      profileUrl: 'https://www.linkedin.com/in/iori-kawano/',
      // 将来的にLinkedIn APIから取得するデータ
      // またはスクレイピングしたデータ
    };

    return NextResponse.json(linkedInData);
  } catch (error) {
    console.error('Error fetching LinkedIn data:', error);
    return NextResponse.json({ error: 'Failed to fetch LinkedIn data' }, { status: 500 });
  }
}

