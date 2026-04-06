import { listPublishedRadarSignals } from './radar-repository';
import {
  getDirectSourceUrl,
  getRadarProofLabel,
  sortRadarFeed,
  type RadarFeedItem,
  type RadarSort,
  type RadarViewerMode
} from './radar-utils';

export async function buildRadarFeed(viewer: RadarViewerMode): Promise<RadarFeedItem[]> {
  const publishedSignals = await listPublishedRadarSignals();

  return publishedSignals.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    type: item.type,
    level: item.level,
    theme: item.theme,
    proofStatus: item.proofStatus,
    proofLabel: getRadarProofLabel(item.proofStatus),
    sourceKind: item.sourceKind,
    source: {
      title: item.source.title,
      publisher: item.source.publisher,
      url: getDirectSourceUrl(item.source.url),
      domain: item.source.domain,
      publishedAt: item.source.publishedAt,
      checkedAt: item.source.checkedAt,
      documentType: item.source.documentType
    },
    date: item.source.publishedAt || item.capturedAt,
    factSummary: item.factSummary,
    publicSummary: item.publicSummary,
    isPriority: item.isPriority,
    priorityRank: item.priorityRank,
    importance: item.importanceScore,
    mandateScore: item.mandateScore,
    analysis:
      viewer === 'subscriber'
        ? {
            whyImportant: item.analysis.whyImportant,
            whoConcerned: item.analysis.whoIsConcerned,
            mandateImpact: item.analysis.mandateImpact,
            toWatch: item.analysis.watchpoints,
            toDo: item.analysis.actions
          }
        : undefined
  }));
}

export function getPriorityRadarItem(items: RadarFeedItem[], sort: RadarSort): RadarFeedItem | null {
  const explicitPriority = [...items]
    .filter((item) => item.isPriority)
    .sort((a, b) => {
      const left = a.priorityRank ?? Number.MAX_SAFE_INTEGER;
      const right = b.priorityRank ?? Number.MAX_SAFE_INTEGER;
      return left - right;
    })[0];

  if (explicitPriority) return explicitPriority;

  const sorted = sortRadarFeed(items, sort);
  return sorted[0] || null;
}
