export type RadarSignalStatus = 'draft' | 'review' | 'ready' | 'published' | 'archived';
export type RadarSourceKind = 'external' | 'internal_maryan';
export type RadarSignalType = 'loi' | 'décret' | 'jurisprudence' | 'signal' | 'article de presse';
export type RadarSignalLevel = 'national' | 'interco' | 'local';
export type RadarProofStatus = 'verified' | 'internal' | 'unverified';

export interface RadarSignalSource {
  title: string | null;
  publisher: string;
  url: string | null;
  domain: string | null;
  publishedAt: string | null;
  checkedAt: string | null;
  documentType: string | null;
}

export interface RadarSignalAnalysis {
  whyImportant: string | null;
  whoIsConcerned: string | null;
  mandateImpact: string | null;
  watchpoints: string | null;
  actions: string[];
}

export interface RadarSignal {
  id: string;
  slug: string;
  status: RadarSignalStatus;
  capturedAt: string;
  title: string;
  type: RadarSignalType;
  level: RadarSignalLevel;
  theme: string;
  isPriority: boolean;
  priorityRank: number | null;
  importanceScore: number;
  mandateScore: number;
  sourceKind: RadarSourceKind;
  proofStatus: RadarProofStatus;
  source: RadarSignalSource;
  factSummary: string;
  publicSummary: string;
  analysis: RadarSignalAnalysis;
  promptKey?: string | null;
  internalNotes: string | null;
  reviewerName: string | null;
  publishedAt: string | null;
}

const GENERIC_SOURCE_PATHS = new Set([
  '/',
  '/actualites',
  '/actualites/',
  '/actus',
  '/actus/',
  '/news',
  '/news/',
  '/blog',
  '/blog/',
  '/articles',
  '/articles/',
  '/publication',
  '/publication/',
  '/publications',
  '/publications/',
  '/rubrique',
  '/rubrique/',
  '/rubriques',
  '/rubriques/',
  '/tag',
  '/tag/',
  '/tags',
  '/tags/',
  '/category',
  '/category/',
  '/categories',
  '/categories/'
]);

function isIsoDate(value: string | null): boolean {
  if (!value) return false;
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(new Date(value).getTime());
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isScore(value: number): boolean {
  return Number.isFinite(value) && value >= 0 && value <= 5;
}

export function getDirectSourceUrl(value?: string | null): string | null {
  if (!value) return null;

  try {
    const url = new URL(value);
    const pathname = url.pathname.trim();
    const normalizedPath = pathname.replace(/\/+$/, '') || '/';

    if (!/^https?:$/.test(url.protocol)) return null;
    if (GENERIC_SOURCE_PATHS.has(normalizedPath.toLowerCase())) return null;
    if (url.hostname.endsWith('maryanapp.fr') && normalizedPath === '/radar') return null;

    return url.toString();
  } catch {
    return null;
  }
}

export function getRadarProofLabel(proofStatus: RadarProofStatus): string {
  if (proofStatus === 'verified') return 'Source vérifiée';
  if (proofStatus === 'internal') return 'Signal éditorial MARYAN';
  return 'Source à vérifier';
}

export function getRadarSignalIssues(signal: RadarSignal): string[] {
  const issues: string[] = [];

  if (!isNonEmptyString(signal.id)) issues.push('id manquant');
  if (!isNonEmptyString(signal.slug)) issues.push('slug manquant');
  if (!isIsoDate(signal.capturedAt)) issues.push('capturedAt invalide');
  if (!isNonEmptyString(signal.title)) issues.push('titre manquant');
  if (!isNonEmptyString(signal.theme)) issues.push('thème manquant');
  if (!isNonEmptyString(signal.factSummary)) issues.push('résumé factuel manquant');
  if (!isNonEmptyString(signal.publicSummary)) issues.push('résumé public manquant');
  if (!isScore(signal.importanceScore)) issues.push('importanceScore invalide');
  if (!isScore(signal.mandateScore)) issues.push('mandateScore invalide');

  if (signal.isPriority && signal.priorityRank == null) {
    issues.push('priorityRank manquant pour un signal prioritaire');
  }

  if (signal.priorityRank != null && signal.priorityRank < 1) {
    issues.push('priorityRank invalide');
  }

  if (!isNonEmptyString(signal.source.publisher)) {
    issues.push('source.publisher manquant');
  }

  if (signal.sourceKind === 'external') {
    if (signal.proofStatus !== 'verified' && signal.status === 'published') {
      issues.push('source externe publiée sans statut vérifié');
    }

    if (signal.status === 'published') {
      if (!getDirectSourceUrl(signal.source.url)) issues.push('source.url directe manquante');
      if (!isNonEmptyString(signal.source.title)) issues.push('source.title manquant');
      if (!isIsoDate(signal.source.publishedAt)) issues.push('source.publishedAt invalide');
      if (!isIsoDate(signal.source.checkedAt)) issues.push('source.checkedAt invalide');
    }
  }

  if (signal.sourceKind === 'internal_maryan') {
    if (signal.proofStatus !== 'internal') {
      issues.push('signal interne sans statut internal');
    }

    if (signal.source.url) {
      issues.push('signal interne avec URL source externe inattendue');
    }
  }

  if (signal.status === 'published') {
    if (!isIsoDate(signal.publishedAt)) issues.push('publishedAt invalide');
    if (!isNonEmptyString(signal.analysis.whyImportant)) issues.push('analyse whyImportant manquante');
    if (!isNonEmptyString(signal.analysis.mandateImpact)) issues.push('analyse mandateImpact manquante');
    if (!isNonEmptyString(signal.analysis.watchpoints)) issues.push('analyse watchpoints manquante');
    if (!signal.analysis.actions.length) issues.push('analyse actions manquantes');
  }

  return issues;
}

export function isRadarSignalPublished(signal: RadarSignal): boolean {
  return signal.status === 'published' && getRadarSignalIssues(signal).length === 0;
}

export function isRadarSignalReady(signal: RadarSignal): boolean {
  return (signal.status === 'ready' || signal.status === 'published') && getRadarSignalIssues(signal).length === 0;
}
