import type { MaryanProfileContextSource } from '../shared/types';

export function buildProfileContext(profile?: MaryanProfileContextSource | null): string | null {
  if (!profile) return null;

  const lines = [
    profile.firstName ? `Prénom : ${profile.firstName}` : null,
    profile.role ? `Rôle : ${profile.role}` : null,
    profile.commune ? `Commune : ${profile.commune}` : null,
    profile.diagnosticLabel || profile.diagnosticKey
      ? `Diagnostic : ${profile.diagnosticLabel || 'non libellé'}${profile.diagnosticKey ? ` (${profile.diagnosticKey})` : ''}`
      : null,
    profile.experience ? `Niveau de repères : ${profile.experience}` : null,
    profile.plan ? `Plan : ${profile.plan}` : null,
    profile.tags?.length ? `Tags utiles : ${profile.tags.join(', ')}` : null,
    profile.source ? `Source du profil : ${profile.source}` : null,
    profile.note ? `Note utile : ${profile.note}` : null
  ].filter(Boolean);

  return lines.length ? lines.join('\n') : null;
}
