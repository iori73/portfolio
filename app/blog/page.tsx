// // // /app/blog/page.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useJPFontSize, useBodyFont, useHeadingFont } from '@/src/hooks/useFonts';

// ===== note の記事型 =====
interface NoteArticle {
  title: string;
  link: string;
  description: string;
  thumbnail: string;
  pubDate: string;
}

// ===== medium の記事型 =====
interface MediumStory {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  imageUrl?: string;
}

export default function BlogPage() {
  const t = useTranslations('common');
  const { jpFontSize } = useJPFontSize();
  const { getBodyFontClass, getBodyFontStyle } = useBodyFont();
  const { getHeadingFontClass, getHeadingFontStyle } = useHeadingFont();

  // ----------------------
  // note記事
  // ----------------------
  const [noteArticles, setNoteArticles] = useState<NoteArticle[]>([]);

  useEffect(() => {
    // note用の fetch (自前APIなど)
    const fetchNote = async () => {
      try {
        const response = await fetch('/api/articles');
        // ↑ もし `/api/articles` で note のRSSをパースして返すならこう
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        setNoteArticles(data);
      } catch (error) {
        console.error('Error fetching note articles:', error);
      }
    };
    fetchNote();
  }, []);

  // ----------------------
  // medium記事
  // ----------------------
  const [mediumStories, setMediumStories] = useState<MediumStory[]>([]);

  useEffect(() => {
    const fetchMedium = async () => {
      const rssUrl = 'https://medium.com/feed/@iori730002204294'; // ←あなたの Medium RSS
      const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`;
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // 最新3件など
        const sliced = data.items.slice(0, 3);

        // content から画像URLを抜き出す例
        const processed = sliced.map((story: any) => {
          const match = story.content.match(/<img.*?src="(.*?)"/);
          const imageUrl = match ? match[1] : '';
          return {
            title: story.title,
            link: story.link,
            pubDate: story.pubDate,
            content: story.content,
            imageUrl,
          };
        });

        setMediumStories(processed);
      } catch (error) {
        console.error('Error fetching Medium stories:', error);
      }
    };
    fetchMedium();
  }, []);

  // ----------------------
  // 日付フォーマット関数
  // ----------------------
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-EN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  // ----------------------
  // note 記事コンポーネント
  // ----------------------
  const NoteArticleItem: React.FC<NoteArticle> = ({ title, link, description, thumbnail, pubDate }) => {
    const handleArticleClick = () => {
      window.open(link, '_blank');
    };

    return (
      <div className="article flex flex-col gap-1.5 relative cursor-pointer" onClick={handleArticleClick}>
        <img src={thumbnail} alt={title} className="w-full aspect-video object-cover" />
        <div className="article-text flex flex-col gap-1.5 md:gap-2 py-1">
          <p className={`article-date ${jpFontSize('text-caption-lg', 'text-caption-xl')}`}>{formatDate(pubDate)}</p>
          <h3
            className={`article-title text-body-lg md:text-body-xl ${getHeadingFontClass()} line-clamp-4 md:line-clamp-none`}
          >
            {title}
          </h3>
          {/* description に「続きを見る」などが含まれていれば、置換や削除など工夫 */}
          <div
            dangerouslySetInnerHTML={{
              __html: description.replace('続きをみる', ''), // 例: "続きをみる" を消す
            }}
            className={`article-desc ${getBodyFontClass()} tracking-[0.2px] ${jpFontSize(
              'text-body-sm',
              'text-body-base',
            )} line-clamp-4`}
          />
        </div>
      </div>
    );
  };

  // ----------------------
  // medium 記事コンポーネント
  // ----------------------
  const MediumStoryItem: React.FC<MediumStory> = ({ title, link, pubDate, content, imageUrl }) => {
    const handleStoryClick = () => {
      window.open(link, '_blank');
    };

    // HTMLタグを除去してテキストをサマリに変換
    const textContent = content.replace(/<[^>]*>/g, '');
    const summary = textContent.length > 200 ? textContent.slice(0, 200) + '...' : textContent;

    return (
      <div
        className="medium-article medium__story lg:col-span-6 flex flex-col md:flex-row gap-8 relative cursor-pointer"
        onClick={handleStoryClick}
      >
        {/* 画像コンテナ：md以上で幅520px、16:9のアスペクト比 */}
        {imageUrl && (
          <div className="w-full md:w-[420px]">
            <div className="relative w-full aspect-video">
              <img src={imageUrl} alt={title} className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </div>
        )}
        {/* テキスト */}
        <div className="flex flex-col md:flex-1 gap-2 md:gap-4">
          <p className={`text-[#0A0A0A] ${jpFontSize('text-caption-xl', 'text-caption-2xl')}`}>{formatDate(pubDate)}</p>
          <h3 className={`article-title text-[#0A0A0A] text-heading-base ${getHeadingFontClass()}`}>{title}</h3>
          <p
            className={`text-[#0A0A0A] ${getBodyFontClass()} tracking-[0.2px] ${jpFontSize(
              'text-body-sm',
              'text-body-base',
            )}`}
          >
            {summary}
          </p>
        </div>
      </div>
    );
  };

  // =====================
  // レンダリング
  // =====================
  return (
    <div className="w-full flex flex-col gap-16 my-24 md:mt-28 md:mb-16">
      {/* -------------- noteセクション -------------- */}
      <div className="note__container">
        <section className="pt-4 md:pt-16 pb-4 md:pb-16">
          <h2 className="text-heading-2xl md:text-heading-3xl mb-2">note</h2>
        </section>

        {/* 記事一覧 */}
        <div className="note__articles-container grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-16 items-start mb-12">
          {noteArticles.map((article, index) => (
            <NoteArticleItem key={index} {...article} />
          ))}
        </div>

        <div className="flex w-full justify-center md:justify-center">
          <a
            href="https://note.com/io_73"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center px-6 py-3 rounded-[100px] text-[#0000008f] hover:text-white cursor-pointer transition-[color] duration-300 whitespace-nowrap overflow-hidden group w-full md:w-auto"
            style={{
              background:
                'radial-gradient(75% 150% at 100% 114.2%, rgba(210, 210, 215, 0.4) 0%, rgba(180, 180, 185, 0.4) 100%)',
              backdropFilter: 'blur(8px)',
            }}
          >
            {/* Hover background overlay */}
            <span
              className="absolute inset-0 rounded-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background:
                  'radial-gradient(75% 150% at 100% 114.2%, rgba(210, 210, 215, 0.8) 0%, rgba(180, 180, 185, 0.8) 100%)',
                backdropFilter: 'blur(8px)',
              }}
            />
            <span className="relative z-10 text-body-lg md:text-body-xl font-medium">{t('goToNote')}</span>
          </a>
        </div>
      </div>

      {/* -------------- Mediumセクション -------------- */}
      <div className="relative mt-16 md:mb-16">
        {/* 画面幅いっぱいの背景 */}
        <div
          className="absolute inset-0 bg-[#0A0A0A]/10"
          style={{
            left: '50%',
            right: '50%',
            marginLeft: '-50vw',
            marginRight: '-50vw',
            width: '100vw',
          }}
        />

        {/* コンテンツ */}
        <div className="medium__container relative pb-4 md:pb-16">
          <section className="pt-4 md:pt-16 pb-4 md:pb-16">
            <h2 className="text-[#0A0A0A] text-heading-2xl md:text-heading-3xl mb-2">Medium</h2>
          </section>

          {/* medium記事一覧 */}
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-16 items-start mb-12">
            {mediumStories.map((story, idx) => (
              <MediumStoryItem key={idx} {...story} />
            ))}
          </div>

          <div className="flex w-full justify-center md:justify-center">
            <a
              href="https://medium.com/@iori730002204294"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center justify-center px-6 py-3 rounded-[100px] text-[#0A0A0A] hover:text-[#0A0A0A] cursor-pointer transition-[color] duration-300 whitespace-nowrap overflow-hidden group w-full md:w-auto"
              style={{
                background:
                  'radial-gradient(75% 150% at 100% 114.2%, rgba(210, 210, 215, 0.4) 0%, rgba(180, 180, 185, 0.4) 100%)',
                backdropFilter: 'blur(8px)',
              }}
            >
              {/* Hover background overlay */}
              <span
                className="absolute inset-0 rounded-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(75% 150% at 100% 114.2%, rgba(210, 210, 215, 0.8) 0%, rgba(180, 180, 185, 0.8) 100%)',
                  backdropFilter: 'blur(8px)',
                }}
              />
              <span className="relative z-10 text-body-lg md:text-body-xl font-medium">{t('goToMedium')}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
