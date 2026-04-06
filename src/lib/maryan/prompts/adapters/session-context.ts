import type { MaryanSessionContextSource } from '../shared/types';

export function buildSessionContext(session?: MaryanSessionContextSource | null): string | null {
  if (!session) return null;

  const lines = [
    session.summary ? `Résumé utile : ${session.summary}` : null,
    session.lastUserNeed ? `Besoin exprimé récemment : ${session.lastUserNeed}` : null,
    session.clarifiedPoints?.length
      ? `Points déjà clarifiés : ${session.clarifiedPoints.join(' | ')}`
      : null,
    session.openQuestions?.length ? `Questions ouvertes : ${session.openQuestions.join(' | ')}` : null
  ].filter(Boolean);

  return lines.length ? lines.join('\n') : null;
}
