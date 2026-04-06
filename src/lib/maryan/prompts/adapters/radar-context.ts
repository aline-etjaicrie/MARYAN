import type { MaryanRadarContextItem } from '../shared/types';

export function buildRadarContext(items: MaryanRadarContextItem[] = []): string | null {
  if (!items.length) return null;

  return items
    .map((item) => {
      const parts = [
        item.title,
        item.proofStatus ? `preuve: ${item.proofStatus}` : null,
        item.sourceName ? `source: ${item.sourceName}` : null,
        item.sourceUrl ? `url: ${item.sourceUrl}` : null,
        item.publicSummary ? `résumé factuel: ${item.publicSummary}` : null,
        item.maryanSummary ? `lecture MARYAN: ${item.maryanSummary}` : null
      ].filter(Boolean);

      return `- ${parts.join(' — ')}`;
    })
    .join('\n');
}
