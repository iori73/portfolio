// // npm install xml2js
// // npm install --save-dev @types/xml2js

// // /app/api/articles/route.ts
// import { NextResponse } from 'next/server'
// import xml2js from 'xml2js'

// const parser = new xml2js.Parser()

// export async function GET() {
//   try {
//     console.log('Fetching RSS feed...')
//     const response = await fetch('https://note.com/io_73/rss')
//     if (!response.ok) {
//       return NextResponse.json(
//         { error: response.statusText },
//         { status: response.status }
//       )
//     }
//     const text = await response.text()
//     const result = await parser.parseStringPromise(text)
//     console.log('Parsed result:', result)

//     // 最新の記事4件だけ取得する例
//     const items = result.rss.channel[0].item.slice(0, 4)
//     const articles = items.map((item: any) => {
//       return {
//         title: item.title?.[0] || null,
//         link: item.link?.[0] || null,
//         description: item.description?.[0] || null,
//         thumbnail: item['media:thumbnail']?.[0] || null,
//         pubDate: item.pubDate?.[0] || null,
//       }
//     })

//     return NextResponse.json(articles, {
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//       },
//     })
//   } catch (error: any) {
//     return NextResponse.json(
//       { error: error.toString() },
//       { status: 500 }
//     )
//   }
// }

// /app/api/articles/route.ts (例)
import { NextResponse } from 'next/server';
import xml2js from 'xml2js';

interface Article {
  title: string;
  link: string;
  description: string;
  thumbnail: string;
  pubDate: string;
}

export async function GET() {
  try {
    console.log('Starting RSS fetch...');
    const rssUrl = 'https://note.com/io_73/rss';
    const response = await fetch(rssUrl, {
      cache: 'no-store', // キャッシュを無効化
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; RSS Reader)',
      },
    });

    if (!response.ok) {
      console.error('RSS fetch failed:', response.status, response.statusText);
      return NextResponse.json({ error: 'Failed to fetch RSS' }, { status: 500 });
    }

    const text = await response.text();
    console.log('RSS text length:', text.length);
    console.log('RSS first 500 chars:', text.substring(0, 500));

    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(text);

    console.log('Total items found:', result.rss.channel[0].item.length);

    const items = result.rss.channel[0].item.slice(0, 4); // 最新4件
    console.log('Processing items:', items.length);

    const articles: Article[] = items.map((item: any, index: number) => {
      console.log(`Processing item ${index}:`, {
        title: item.title?.[0],
        pubDate: item.pubDate?.[0],
        link: item.link?.[0],
      });

      // 取得した raw HTML
      let rawDescription = item.description?.[0] ?? '';

      // 「続きをみる」のアンカータグを削除
      rawDescription = rawDescription.replace(/<a [^>]*>続きをみる<\/a>/g, '');

      return {
        title: item.title?.[0] ?? '',
        link: item.link?.[0] ?? '',
        description: rawDescription,
        thumbnail: item['media:thumbnail']?.[0] ?? '',
        pubDate: item.pubDate?.[0] ?? '',
      };
    });

    console.log(
      'Final articles:',
      articles.map((a: Article) => ({ title: a.title, pubDate: a.pubDate })),
    );

    return NextResponse.json(articles, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
