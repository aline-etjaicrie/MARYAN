import type { APIRoute } from 'astro';
import {
  maryanRadarThemes,
  maryanRadarTypes,
  maryanRadarLevels,
  type MaryanRadarItem
} from '../../../data/radar';
import { getAdminContext } from '../../../lib/admin';
import {
  createRadarSignalDraft,
  getRadarCatalogSnapshot,
  radarAdminOptions,
  saveRadarSignal,
  seedRadarSignalsFromLocalCatalog
} from '../../../lib/radar-repository';
import type {
  RadarProofStatus,
  RadarSignalStatus,
  RadarSourceKind
} from '../../../lib/radar-contract';

export const prerender = false;

function json(payload: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store'
    }
  });
}

function toNullableString(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const normalized = value.trim();
  return normalized || null;
}

function toRequiredString(value: unknown, fallback = ''): string {
  return toNullableString(value) || fallback;
}

function toBoolean(value: unknown): boolean {
  return value === true || value === 'true' || value === 'on' || value === 1;
}

function toNullableInteger(value: unknown): number | null {
  if (value == null || value === '') return null;
  const parsed = Number.parseInt(String(value), 10);
  return Number.isFinite(parsed) ? parsed : null;
}

function toScore(value: unknown, fallback = 0): number {
  const parsed = Number.parseInt(String(value ?? ''), 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(0, Math.min(5, parsed));
}

function toStatus(value: unknown): RadarSignalStatus {
  const normalized = toNullableString(value);
  return (radarAdminOptions.statuses.find((entry) => entry === normalized) || 'draft') as RadarSignalStatus;
}

function toSourceKind(value: unknown): RadarSourceKind {
  const normalized = toNullableString(value);
  return (radarAdminOptions.sourceKinds.find((entry) => entry === normalized) || 'external') as RadarSourceKind;
}

function toProofStatus(value: unknown, sourceKind: RadarSourceKind): RadarProofStatus {
  if (sourceKind === 'internal_maryan') return 'internal';
  const normalized = toNullableString(value);
  return (radarAdminOptions.proofStatuses.find((entry) => entry === normalized) || 'unverified') as RadarProofStatus;
}

function normalizeActions(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map((entry) => (typeof entry === 'string' ? entry.trim() : ''))
      .filter(Boolean);
  }

  if (typeof value === 'string') {
    return value
      .split('\n')
      .map((entry) => entry.trim())
      .filter(Boolean);
  }

  return [];
}

function normalizeTheme(value: unknown): string {
  const normalized = toRequiredString(value, maryanRadarThemes[0]);
  return normalized;
}

function normalizeType(value: unknown): MaryanRadarItem['type'] {
  const normalized = toNullableString(value);
  return maryanRadarTypes.find((entry) => entry === normalized) || 'signal';
}

function normalizeLevel(value: unknown): MaryanRadarItem['level'] {
  const normalized = toNullableString(value);
  return maryanRadarLevels.find((entry) => entry === normalized) || 'local';
}

function normalizeSignal(input: Record<string, any>): MaryanRadarItem {
  const sourceKind = toSourceKind(input.sourceKind);
  const status = toStatus(input.status);
  const publishedAt =
    status === 'published'
      ? toNullableString(input.publishedAt) || new Date().toISOString()
      : null;

  return {
    id: toRequiredString(input.id),
    slug: toRequiredString(input.slug, `signal-${Date.now()}`),
    status,
    capturedAt: toRequiredString(input.capturedAt, new Date().toISOString().slice(0, 10)),
    title: toRequiredString(input.title, 'Signal sans titre'),
    type: normalizeType(input.type),
    level: normalizeLevel(input.level),
    theme: normalizeTheme(input.theme),
    isPriority: toBoolean(input.isPriority),
    priorityRank: toNullableInteger(input.priorityRank),
    importanceScore: toScore(input.importanceScore, 3),
    mandateScore: toScore(input.mandateScore, 3),
    sourceKind,
    proofStatus: toProofStatus(input.proofStatus, sourceKind),
    source: {
      title: toNullableString(input.source?.title),
      publisher: toRequiredString(input.source?.publisher, sourceKind === 'internal_maryan' ? 'Signal MARYAN' : 'Source à renseigner'),
      url: toNullableString(input.source?.url),
      domain: toNullableString(input.source?.domain),
      publishedAt: toNullableString(input.source?.publishedAt),
      checkedAt: toNullableString(input.source?.checkedAt),
      documentType: toNullableString(input.source?.documentType) || normalizeType(input.type)
    },
    factSummary: toRequiredString(input.factSummary),
    publicSummary: toRequiredString(input.publicSummary),
    analysis: {
      whyImportant: toNullableString(input.analysis?.whyImportant),
      whoIsConcerned: toNullableString(input.analysis?.whoIsConcerned),
      mandateImpact: toNullableString(input.analysis?.mandateImpact),
      watchpoints: toNullableString(input.analysis?.watchpoints),
      actions: normalizeActions(input.analysis?.actions)
    },
    promptKey: toNullableString(input.promptKey),
    internalNotes: toNullableString(input.internalNotes),
    reviewerName: toNullableString(input.reviewerName),
    publishedAt
  };
}

async function requireAdmin(request: Request) {
  const authHeader = request.headers.get('Authorization') || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) return null;
  return getAdminContext(token);
}

export const GET: APIRoute = async ({ request }) => {
  const admin = await requireAdmin(request);
  if (!admin) return json({ error: 'Non autorisé.' }, 403);

  try {
    const snapshot = await getRadarCatalogSnapshot();
    return json({
      ok: true,
      ...snapshot,
      options: radarAdminOptions
    });
  } catch (error) {
    return json({
      ok: false,
      error: error instanceof Error ? error.message : 'Impossible de charger le Radar.'
    }, 500);
  }
};

export const POST: APIRoute = async ({ request }) => {
  const admin = await requireAdmin(request);
  if (!admin) return json({ error: 'Non autorisé.' }, 403);

  const body = await request.json().catch(() => ({}));
  const action = toNullableString(body?.action);

  try {
    if (action === 'seed') {
      const result = await seedRadarSignalsFromLocalCatalog(admin.userId);
      const snapshot = await getRadarCatalogSnapshot();
      return json({
        ok: true,
        action,
        result,
        ...snapshot,
        options: radarAdminOptions
      });
    }

    if (action === 'create') {
      const signal = await createRadarSignalDraft(admin.userId);
      return json({ ok: true, action, signal });
    }

    return json({ error: 'Action inconnue.' }, 400);
  } catch (error) {
    return json({
      ok: false,
      error: error instanceof Error ? error.message : 'Action Radar impossible.'
    }, 500);
  }
};

export const PATCH: APIRoute = async ({ request }) => {
  const admin = await requireAdmin(request);
  if (!admin) return json({ error: 'Non autorisé.' }, 403);

  const body = await request.json().catch(() => null);
  if (!body?.signal || typeof body.signal !== 'object') {
    return json({ error: 'Signal invalide.' }, 400);
  }

  try {
    const signal = normalizeSignal(body.signal as Record<string, any>);
    const saved = await saveRadarSignal(signal, admin.userId);

    return json({
      ok: true,
      signal: saved
    });
  } catch (error) {
    return json({
      ok: false,
      error: error instanceof Error ? error.message : 'Sauvegarde impossible.'
    }, 400);
  }
};

export const ALL: APIRoute = async () => json({ error: 'Méthode non autorisée.' }, 405);
