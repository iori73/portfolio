export interface Chapter {
  timestamp: string;     // e.g. "05:00", "01:23:45"
  title: string;
}

export interface Episode {
  id: string;
  title: string;
  podcast: string;
  podcastCover: string;
  category: string | null;
  tags: string[];
  date: string;
  url: string;
  durationMinutes: number;
  summary: string;
  keyLearnings: string[];
  chapters?: Chapter[];
  hasTranscript?: boolean;
  embedding2d: [number, number];
  cluster: number;
}

export interface Podcast {
  name: string;
  cover: string;
  episodeCount: number;
  primaryTags: string[];
}

export interface Cluster {
  id: number;
  label: string;
  center: [number, number];
  color: string;
  episodeCount: number;
}

export interface PodcastStats {
  totalEpisodes: number;
  totalPodcasts: number;
  totalCategories: number;
  tagDistribution: Record<string, number>;
}

export interface PodcastData {
  episodes: Episode[];
  podcasts: Podcast[];
  clusters: Cluster[];
  stats: PodcastStats;
  meta: {
    generatedAt: string;
    hasEmbeddings: boolean;
  };
}

export const CATEGORY_COLORS: Record<string, string> = {
  'Technology': '#6C5CE7',
  'AI': '#6C5CE7',
  'Al': '#6C5CE7',
  'Science': '#0984E3',
  'Biology & Nature': '#00B894',
  'Design & Art': '#FD79A8',
  'Business': '#FDCB6E',
  'Career': '#F39C12',
  'Startup & VC': '#E17055',
  'Education': '#74B9FF',
  'Liberal Arts': '#A29BFE',
  'Others': '#636E72',
};

export function normalizeCategoryName(name: string): string {
  if (name === 'Al') return 'AI';
  return name;
}

export const DEFAULT_CATEGORY_COLOR = '#B2BEC3';
