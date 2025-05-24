// // // /app/blog/page.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { useLanguage, useJPFontSize } from '@/src/lib/i18n';

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
  const { t } = useLanguage();
  const { jpFontSize } = useJPFontSize();

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
      <div className="article lg:col-span-6 flex flex-col gap-2 relative cursor-pointer" onClick={handleArticleClick}>
        <img src={thumbnail} alt={title} />
        <div className="article-text flex flex-col gap-2 md:gap-4 py-2">
          <p
            className={`article-date ${jpFontSize(
              'text-caption-l-120',
              'text-caption-xl-120',
              'text-caption-s-120',
              'text-caption-l-120',
            )}`}
          >
            {formatDate(pubDate)}
          </p>
          <h3 className="article-title text-heading-xxxs-120 md:text-heading-s-120">{title}</h3>
          {/* description に「続きを見る」などが含まれていれば、置換や削除など工夫 */}
          <div
            dangerouslySetInnerHTML={{
              __html: description.replace('続きをみる', ''), // 例: "続きをみる" を消す
            }}
            className={`article-desc ${jpFontSize(
              'text-body-s-140',
              'text-body-s-140',
              'text-caption-s-120',
              'text-body-s-140',
            )}`}
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
        className="medium-article medium__story p-4 md:p-8 lg:col-span-6 flex flex-col md:flex-row gap-8 relative cursor-pointer"
        onClick={handleStoryClick}
      >
        {/* 画像コンテナ：md以上で幅520px、16:9のアスペクト比 */}
        {imageUrl && (
          <div className="w-full md:w-[520px]">
            <div className="relative w-full aspect-video">
              <img src={imageUrl} alt={title} className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </div>
        )}
        {/* テキスト */}
        <div className="flex flex-col md:flex-1  gap-2 md:gap-4">
          <p
            className={jpFontSize(
              'text-caption-l-120',
              'text-caption-xl-120',
              'text-caption-s-120',
              'text-caption-l-120',
            )}
          >
            {formatDate(pubDate)}
          </p>
          <h3 className="text-heading-xxxs-120 md:text-heading-s-120">{title}</h3>
          <p className={jpFontSize('text-body-s-140', 'text-body-m-140', 'text-body-s-140', 'text-body-s-140')}>
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
    <div className="w-full flex flex-col gap-16">
      {/* -------------- noteセクション -------------- */}
      <div className="note__container">
        <section className="pt-4 md:pt-16 pb-4 md:pb-16">
          <h2 className="text-heading-m-120 md:text-heading-l-20 mb-2">note</h2>
        </section>

        {/* 記事一覧 */}
        <div className="note__articles-container grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-12">
          {noteArticles.map((article, index) => (
            <NoteArticleItem key={index} {...article} />
          ))}
        </div>

        <div className="flex w-full justify-center">
          <button
            onClick={() => window.open('https://note.com/io_73', '_blank')}
            aria-label="Go to note"
            className="all-[unset] box-border inline-flex flex-col px-10 py-2 relative flex-[0_0_auto] border-2 border-black rounded-[40px]"
          >
            <div className="text-heading-xxs-120 py-1 z-10">{t('goToNote')}</div>
          </button>
        </div>
      </div>

      {/* -------------- Mediumセクション -------------- */}
      <div className="medium__container mt-16 md:mb-16">
        <section className="pt-4 md:pt-16 pb-4 md:pb-16">
          <h2 className="text-heading-m-120 md:text-heading-l-20 mb-2">Medium</h2>
        </section>

        {/* medium記事一覧 */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-16 items-start mb-12">
          {mediumStories.map((story, idx) => (
            <MediumStoryItem key={idx} {...story} />
          ))}
        </div>

        <div className="flex w-full justify-center">
          <button
            onClick={() => window.open('https://medium.com/@iori730002204294', '_blank')}
            aria-label="Go to Medium"
            className="all-[unset] box-border inline-flex flex-col px-10 py-2 relative flex-[0_0_auto] border-2 border-black rounded-[40px]"
          >
            <div className="text-heading-xxs-120 py-1 z-10">{t('goToMedium')}</div>
          </button>
        </div>
      </div>
    </div>
  );
}
