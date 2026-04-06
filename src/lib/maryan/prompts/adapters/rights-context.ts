import type { MaryanRightsContextItem } from '../shared/types';

export function buildRightsContext(items: MaryanRightsContextItem[] = []): string | null {
  if (!items.length) return null;

  return items
    .map((item) => {
      const parts = [
        item.title,
        item.reference ? `référence: ${item.reference}` : null,
        item.summary ? `repère: ${item.summary}` : null
      ].filter(Boolean);

      return `- ${parts.join(' — ')}`;
    })
    .join('\n');
}
