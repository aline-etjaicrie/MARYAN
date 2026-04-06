import { createClient } from '@supabase/supabase-js';
import {
  maryanRadarItems,
  maryanRadarLevels,
  maryanRadarThemes,
  maryanRadarTypes,
  type MaryanRadarItem
} from '../data/radar';
import {
  getRadarSignalIssues,
  isRadarSignalPublished,
  isRadarSignalReady,
  type RadarProofStatus,
  type RadarSignalLevel,
  type RadarSignalStatus,
  type RadarSignalType,
  type RadarSourceKind
} from './radar-contract';

const SUPABASE_URL = (import.meta.env.PUBLIC_SUPABASE_URL as string) || (process.env.PUBLIC_SUPABASE_URL as string);
const SUPABASE_SERVICE_KEY = (import.meta.env.SUPABASE_SERVICE_KEY as string) || (process.env.SUPABASE_SERVICE_KEY as string);

export type RadarStorageMode = 'database' | 'seed';

interface RadarSignalRecord {
  id: string;
  slug: string;
  status: RadarSignalStatus;
  captured_at: string;
  title: string;
  type: RadarSignalType;
  level: RadarSignalLevel;
  theme: string;
  is_priority: boolean;
  priority_rank: number | null;
  importance_score: number;
  mandate_score: number;
  source_kind: RadarSourceKind;
  proof_status: RadarProofStatus;
  source_title: string | null;
  source_publisher: string;
  source_url: string | null;
  source_domain: string | null;
  source_published_at: string | null;
  source_checked_at: string | null;
  source_document_type: string | null;
  fact_summary: string;
  public_summary: string;
  analysis_why_important: string | null;
  analysis_who_is_concerned: string | null;
  analysis_mandate_impact: string | null;
  analysis_watchpoints: string | null;
  analysis_actions: unknown;
  prompt_key: string | null;
  internal_notes: string | null;
  reviewer_name: string | null;
  published_at: string | null;
}

export interface RadarCatalogSignal extends MaryanRadarItem {
  issues: string[];
  canPublish: boolean;
  isPublished: boolean;
}

export interface RadarCatalogSnapshot {
  mode: RadarStorageMode;
  persistenceAvailable: boolean;
  warning: string | null;
  signals: RadarCatalogSignal[];
  stats: {
    total: number;
    published: number;
    ready: number;
    withIssues: number;
    verified: number;
    internal: number;
  };
}

export const radarAdminOptions = {
  statuses: ['draft', 'review', 'ready', 'published', 'archived'] as RadarSignalStatus[],
  sourceKinds: ['external', 'internal_maryan'] as RadarSourceKind[],
  proofStatuses: ['verified', 'internal', 'unverified'] as RadarProofStatus[],
  types: maryanRadarTypes,
  levels: maryanRadarLevels,
  themes: [...maryanRadarThemes]
};

function getRadarAdminClient() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) return null;
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
}

function isMissingStorageError(error: { code?: string; message?: string } | null) {
  if (!error) return false;
  return error.code === '42P01' || /radar_signals/i.test(error.message || '');
}

function sanitizeActions(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((entry) => (typeof entry === 'string' ? entry.trim() : ''))
    .filter(Boolean);
}

function extractDomain(value: string | null, fallback: string | null = null): string | null {
  if (!value) return fallback;

  try {
    return new URL(value).hostname.replace(/^www\./, '') || fallback;
  } catch {
    return fallback;
  }
}

function sortSignals(items: MaryanRadarItem[]): MaryanRadarItem[] {
  return [...items].sort((left, right) => {
    if (left.isPriority !== right.isPriority) return left.isPriority ? -1 : 1;

    if (left.priorityRank != null || right.priorityRank != null) {
      const byRank = (left.priorityRank ?? Number.MAX_SAFE_INTEGER) - (right.priorityRank ?? Number.MAX_SAFE_INTEGER);
      if (byRank !== 0) return byRank;
    }

    const leftDate = left.source.publishedAt || left.publishedAt || left.capturedAt;
    const rightDate = right.source.publishedAt || right.publishedAt || right.capturedAt;
    const byDate = new Date(rightDate).getTime() - new Date(leftDate).getTime();
    if (byDate !== 0) return byDate;

    if (right.importanceScore !== left.importanceScore) return right.importanceScore - left.importanceScore;
    return right.mandateScore - left.mandateScore;
  });
}

function mapRecordToSignal(record: RadarSignalRecord): MaryanRadarItem {
  return {
    id: record.id,
    slug: record.slug,
    status: record.status,
    capturedAt: record.captured_at,
    title: record.title,
    type: record.type,
    level: record.level,
    theme: record.theme,
    isPriority: Boolean(record.is_priority),
    priorityRank: record.priority_rank,
    importanceScore: Number(record.importance_score || 0),
    mandateScore: Number(record.mandate_score || 0),
    sourceKind: record.source_kind,
    proofStatus: record.proof_status,
    source: {
      title: record.source_title,
      publisher: record.source_publisher,
      url: record.source_url,
      domain: record.source_domain,
      publishedAt: record.source_published_at,
      checkedAt: record.source_checked_at,
      documentType: record.source_document_type
    },
    factSummary: record.fact_summary,
    publicSummary: record.public_summary,
    analysis: {
      whyImportant: record.analysis_why_important,
      whoIsConcerned: record.analysis_who_is_concerned,
      mandateImpact: record.analysis_mandate_impact,
      watchpoints: record.analysis_watchpoints,
      actions: sanitizeActions(record.analysis_actions)
    },
    promptKey: record.prompt_key,
    internalNotes: record.internal_notes,
    reviewerName: record.reviewer_name,
    publishedAt: record.published_at
  };
}

function mapSignalToRecord(signal: MaryanRadarItem, actorId?: string | null): Omit<RadarSignalRecord, 'analysis_actions'> & {
  analysis_actions: string[];
  updated_by?: string | null;
  created_by?: string | null;
  updated_at?: string;
} {
  return {
    id: signal.id,
    slug: signal.slug,
    status: signal.status,
    captured_at: signal.capturedAt,
    title: signal.title,
    type: signal.type,
    level: signal.level,
    theme: signal.theme,
    is_priority: signal.isPriority,
    priority_rank: signal.priorityRank,
    importance_score: signal.importanceScore,
    mandate_score: signal.mandateScore,
    source_kind: signal.sourceKind,
    proof_status: signal.proofStatus,
    source_title: signal.source.title,
    source_publisher: signal.source.publisher,
    source_url: signal.source.url,
    source_domain: extractDomain(signal.source.url, signal.source.domain),
    source_published_at: signal.source.publishedAt,
    source_checked_at: signal.source.checkedAt,
    source_document_type: signal.source.documentType,
    fact_summary: signal.factSummary,
    public_summary: signal.publicSummary,
    analysis_why_important: signal.analysis.whyImportant,
    analysis_who_is_concerned: signal.analysis.whoIsConcerned,
    analysis_mandate_impact: signal.analysis.mandateImpact,
    analysis_watchpoints: signal.analysis.watchpoints,
    analysis_actions: signal.analysis.actions,
    prompt_key: signal.promptKey,
    internal_notes: signal.internalNotes,
    reviewer_name: signal.reviewerName,
    published_at: signal.publishedAt,
    created_by: actorId ?? null,
    updated_by: actorId ?? null,
    updated_at: new Date().toISOString()
  };
}

function toCatalogSignals(signals: MaryanRadarItem[]): RadarCatalogSignal[] {
  return sortSignals(signals).map((signal) => {
    const issues = getRadarSignalIssues(signal);

    return {
      ...signal,
      issues,
      canPublish: isRadarSignalReady(signal),
      isPublished: isRadarSignalPublished(signal)
    };
  });
}

function buildCatalogSnapshot(
  signals: MaryanRadarItem[],
  mode: RadarStorageMode,
  persistenceAvailable: boolean,
  warning: string | null
): RadarCatalogSnapshot {
  const catalogSignals = toCatalogSignals(signals);

  return {
    mode,
    persistenceAvailable,
    warning,
    signals: catalogSignals,
    stats: {
      total: catalogSignals.length,
      published: catalogSignals.filter((signal) => signal.isPublished).length,
      ready: catalogSignals.filter((signal) => signal.canPublish && signal.status === 'ready').length,
      withIssues: catalogSignals.filter((signal) => signal.issues.length > 0).length,
      verified: catalogSignals.filter((signal) => signal.proofStatus === 'verified').length,
      internal: catalogSignals.filter((signal) => signal.sourceKind === 'internal_maryan').length
    }
  };
}

async function loadDatabaseSignals() {
  const client = getRadarAdminClient();
  if (!client) {
    return {
      mode: 'seed' as const,
      persistenceAvailable: false,
      warning: 'Configuration Supabase absente côté serveur.',
      signals: maryanRadarItems
    };
  }

  const { data, error } = await client
    .from('radar_signals')
    .select('*')
    .order('is_priority', { ascending: false })
    .order('priority_rank', { ascending: true, nullsFirst: false })
    .order('source_published_at', { ascending: false, nullsFirst: false })
    .order('captured_at', { ascending: false });

  if (error) {
    if (isMissingStorageError(error)) {
      return {
        mode: 'seed' as const,
        persistenceAvailable: false,
        warning: 'Table radar_signals absente pour le moment. Le seed local reste utilisé en lecture seule.',
        signals: maryanRadarItems
      };
    }

    throw new Error(`[radar] Impossible de charger le catalogue: ${error.message}`);
  }

  return {
    mode: 'database' as const,
    persistenceAvailable: true,
    warning: data?.length ? null : 'Base Radar prête, mais encore vide. Vous pouvez importer le seed local depuis l’admin.',
    signals: (data || []).map((entry) => mapRecordToSignal(entry as RadarSignalRecord))
  };
}

function getRequiredRadarAdminClient() {
  const client = getRadarAdminClient();
  if (!client) {
    throw new Error('Configuration Supabase manquante pour persister le Radar.');
  }
  return client;
}

export async function listRadarSignals(): Promise<MaryanRadarItem[]> {
  const snapshot = await loadDatabaseSignals();
  return sortSignals(snapshot.signals);
}

export async function listPublishedRadarSignals(): Promise<MaryanRadarItem[]> {
  const signals = await listRadarSignals();
  return signals.filter(isRadarSignalPublished);
}

export async function getRadarCatalogSnapshot(): Promise<RadarCatalogSnapshot> {
  const snapshot = await loadDatabaseSignals();
  return buildCatalogSnapshot(snapshot.signals, snapshot.mode, snapshot.persistenceAvailable, snapshot.warning);
}

export async function getRadarCatalogDiagnostics() {
  const snapshot = await getRadarCatalogSnapshot();
  return snapshot.signals.map((signal) => ({
    id: signal.id,
    slug: signal.slug,
    status: signal.status,
    proofStatus: signal.proofStatus,
    issues: signal.issues
  }));
}

export async function saveRadarSignal(signal: MaryanRadarItem, actorId?: string | null): Promise<RadarCatalogSignal> {
  const issues = getRadarSignalIssues(signal);
  if ((signal.status === 'ready' || signal.status === 'published') && issues.length) {
    throw new Error(`Signal non publiable: ${issues.join(', ')}`);
  }

  const client = getRequiredRadarAdminClient();
  const { data, error } = await client
    .from('radar_signals')
    .upsert(mapSignalToRecord(signal, actorId), { onConflict: 'id' })
    .select('*')
    .single();

  if (error) {
    throw new Error(`[radar] Sauvegarde impossible: ${error.message}`);
  }

  return toCatalogSignals([mapRecordToSignal(data as RadarSignalRecord)])[0];
}

export async function createRadarSignalDraft(actorId?: string | null): Promise<RadarCatalogSignal> {
  const stamp = new Date().toISOString().replace(/\D/g, '').slice(0, 14);
  const id = `radar-draft-${stamp}`;
  const draft: MaryanRadarItem = {
    id,
    slug: `signal-a-completer-${stamp}`,
    status: 'draft',
    capturedAt: new Date().toISOString().slice(0, 10),
    title: 'Nouveau signal à qualifier',
    type: 'signal',
    level: 'local',
    theme: maryanRadarThemes[0],
    isPriority: false,
    priorityRank: null,
    importanceScore: 3,
    mandateScore: 3,
    sourceKind: 'external',
    proofStatus: 'unverified',
    source: {
      title: null,
      publisher: 'Source à renseigner',
      url: null,
      domain: null,
      publishedAt: null,
      checkedAt: null,
      documentType: 'signal'
    },
    factSummary: '',
    publicSummary: '',
    analysis: {
      whyImportant: null,
      whoIsConcerned: null,
      mandateImpact: null,
      watchpoints: null,
      actions: []
    },
    promptKey: null,
    internalNotes: null,
    reviewerName: null,
    publishedAt: null
  };

  return saveRadarSignal(draft, actorId);
}

export async function seedRadarSignalsFromLocalCatalog(actorId?: string | null) {
  const client = getRequiredRadarAdminClient();

  const { data: existingRows, error: existingError } = await client
    .from('radar_signals')
    .select('id');

  if (existingError) {
    throw new Error(`[radar] Lecture de la base impossible: ${existingError.message}`);
  }

  const existingIds = new Set((existingRows || []).map((row) => row.id as string));
  const missingRows = maryanRadarItems
    .filter((signal) => !existingIds.has(signal.id))
    .map((signal) => mapSignalToRecord(signal, actorId));

  if (!missingRows.length) {
    return { inserted: 0, skipped: maryanRadarItems.length };
  }

  const { error: insertError } = await client
    .from('radar_signals')
    .insert(missingRows);

  if (insertError) {
    throw new Error(`[radar] Import du seed impossible: ${insertError.message}`);
  }

  return {
    inserted: missingRows.length,
    skipped: maryanRadarItems.length - missingRows.length
  };
}
