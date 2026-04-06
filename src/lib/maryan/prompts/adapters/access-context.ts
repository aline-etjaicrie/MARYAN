import type { MaryanAccessContextSource } from '../shared/types';

export function buildAccessContext(access?: MaryanAccessContextSource | null): string | null {
  if (!access) return null;

  const lines = [
    access.plan ? `Plan : ${access.plan}` : null,
    access.status ? `Statut d'accès : ${access.status}` : null,
    access.remainingFreeMessages != null
      ? `Messages gratuits restants : ${access.remainingFreeMessages}`
      : null,
    access.accessibleFeatures?.length
      ? `Fonctionnalités accessibles : ${access.accessibleFeatures.join(', ')}`
      : null,
    access.restrictedFeatures?.length
      ? `Fonctionnalités limitées : ${access.restrictedFeatures.join(', ')}`
      : null,
    access.notes?.length ? `Notes produit : ${access.notes.join(' | ')}` : null
  ].filter(Boolean);

  return lines.length ? lines.join('\n') : null;
}
