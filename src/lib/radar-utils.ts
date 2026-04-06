import type {
  RadarProofStatus,
  RadarSignalLevel,
  RadarSignalType,
  RadarSourceKind
} from './radar-contract';
import { getDirectSourceUrl, getRadarProofLabel } from './radar-contract';

export type RadarViewerMode = 'public' | 'subscriber';
export type RadarSort = 'recent' | 'important' | 'mandate';

export interface RadarFeedItem {
  id: string;
  slug: string;
  title: string;
  type: RadarSignalType;
  level: RadarSignalLevel;
  theme: string;
  proofStatus: RadarProofStatus;
  proofLabel: string;
  sourceKind: RadarSourceKind;
  source: {
    title: string | null;
    publisher: string;
    url: string | null;
    domain: string | null;
    publishedAt: string | null;
    checkedAt: string | null;
    documentType: string | null;
  };
  date: string;
  factSummary: string;
  publicSummary: string;
  isPriority: boolean;
  priorityRank: number | null;
  importance: number;
  mandateScore: number;
  analysis?: {
    whyImportant: string | null;
    whoConcerned: string | null;
    mandateImpact: string | null;
    toWatch: string | null;
    toDo: string[];
  };
}

export { getDirectSourceUrl, getRadarProofLabel };

export function formatRadarDate(value: string | null): string {
  if (!value) return 'Date non renseignée';

  try {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export function filterRadarFeed(
  items: RadarFeedItem[],
  filters: {
    search?: string;
    theme?: string;
    level?: string;
    type?: string;
  }
): RadarFeedItem[] {
  const query = String(filters.search || '').trim().toLowerCase();

  return items.filter((item) => {
    if (filters.theme && filters.theme !== 'all' && item.theme !== filters.theme) return false;
    if (filters.level && filters.level !== 'all' && item.level !== filters.level) return false;
    if (filters.type && filters.type !== 'all' && item.type !== filters.type) return false;
    if (!query) return true;

    const haystack = [
      item.title,
      item.theme,
      item.type,
      item.level,
      item.proofLabel,
      item.source.publisher,
      item.source.title,
      item.source.documentType,
      item.factSummary,
      item.publicSummary,
      item.analysis?.whyImportant,
      item.analysis?.whoConcerned,
      item.analysis?.mandateImpact,
      item.analysis?.toWatch
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return haystack.includes(query);
  });
}

function compareByDate(a: RadarFeedItem, b: RadarFeedItem) {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

export function sortRadarFeed(items: RadarFeedItem[], sort: RadarSort): RadarFeedItem[] {
  const cloned = [...items];

  if (sort === 'important') {
    return cloned.sort((a, b) => {
      if (b.importance !== a.importance) return b.importance - a.importance;
      if (b.mandateScore !== a.mandateScore) return b.mandateScore - a.mandateScore;
      if (a.priorityRank != null || b.priorityRank != null) {
        return (a.priorityRank ?? Number.MAX_SAFE_INTEGER) - (b.priorityRank ?? Number.MAX_SAFE_INTEGER);
      }
      return compareByDate(a, b);
    });
  }

  if (sort === 'mandate') {
    return cloned.sort((a, b) => {
      if (b.mandateScore !== a.mandateScore) return b.mandateScore - a.mandateScore;
      if (b.importance !== a.importance) return b.importance - a.importance;
      if (a.priorityRank != null || b.priorityRank != null) {
        return (a.priorityRank ?? Number.MAX_SAFE_INTEGER) - (b.priorityRank ?? Number.MAX_SAFE_INTEGER);
      }
      return compareByDate(a, b);
    });
  }

  return cloned.sort((a, b) => {
    if (a.isPriority !== b.isPriority) return a.isPriority ? -1 : 1;
    if (a.priorityRank != null || b.priorityRank != null) {
      const byRank = (a.priorityRank ?? Number.MAX_SAFE_INTEGER) - (b.priorityRank ?? Number.MAX_SAFE_INTEGER);
      if (byRank !== 0) return byRank;
    }

    const byDate = compareByDate(a, b);
    if (byDate !== 0) return byDate;
    if (b.importance !== a.importance) return b.importance - a.importance;
    return b.mandateScore - a.mandateScore;
  });
}
