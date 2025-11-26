import { NextResponse } from 'next/server';

export const revalidate = 3600; // 1時間キャッシュ

export async function GET() {
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

