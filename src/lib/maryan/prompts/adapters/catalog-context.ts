import type { MaryanCatalogContextItem } from '../shared/types';

export function buildCatalogContext(items: MaryanCatalogContextItem[] = []): string | null {
  if (!items.length) return null;

  return items
    .map((item) => {
      const parts = [
        item.title,
        item.kind ? `type: ${item.kind}` : null,
        item.slug ? `slug: ${item.slug}` : null,
        item.promise ? `promesse: ${item.promise}` : null,
        item.access ? `accès: ${item.access}` : null
      ].filter(Boolean);

      return `- ${parts.join(' — ')}`;
    })
    .join('\n');
}
