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
import { NextResponse } from 'next/server'
import xml2js from 'xml2js'

export async function GET() {
  try {
    const rssUrl = 'https://note.com/io_73/rss'
    const response = await fetch(rssUrl)
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch RSS' }, { status: 500 })
    }
    const text = await response.text()
    const parser = new xml2js.Parser()
    const result = await parser.parseStringPromise(text)

    const items = result.rss.channel[0].item.slice(0, 4) // 最新4件

    const articles = items.map((item: any) => {
      // 取得した raw HTML
      let rawDescription = item.description?.[0] ?? ''

      // 「続きをみる」のアンカータグを削除
      //  - 「続きをみる」以外のアンカータグは消したくない場合は、もう少し厳密な正規表現に
      //  - 例えば `<a ...>続きをみる</a>` を全て除去
      rawDescription = rawDescription.replace(/<a [^>]*>続きをみる<\/a>/g, '')

      return {
        title: item.title?.[0] ?? '',
        link: item.link?.[0] ?? '',
        description: rawDescription,
        thumbnail: item['media:thumbnail']?.[0] ?? '',
        pubDate: item.pubDate?.[0] ?? '',
      }
    })

    return NextResponse.json(articles, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
