import type { MaryanProfile } from '../features/copilote-maryan/config';
import { maryanResources } from '../data/resources';
import { DIAGNOSTIC_ACCROCHES, buildStoredDiagnosticEntry } from './diagnostic-personalization';

const DIAGNOSTIC_STRING_KEYS = new Set([
  'role',
  'seniority',
  'tension',
  'lack',
  'feeling',
  'vigilance',
  'diagnostic_key',
  'diagnostic_label',
  'profile',
  'summary',
  'situation',
  'offer_type'
]);

const DIAGNOSTIC_ARRAY_KEYS = new Set(['recommended_slugs', 'priorities']);

type DiagnosticPayload = Record<string, string | string[]>;

export type ProfileContextRow = {
  id?: string | null;
  first_name?: string | null;
  commune?: string | null;
  role?: string | null;
  plan?: string | null;
  diagnostic_key?: string | null;
  diagnostic_label?: string | null;
  diagnostic_completed?: boolean | null;
  last_diagnostic_summary?: string | null;
  profile_context?: Record<string, unknown> | null;
  profile_context_updated_at?: string | null;
  parti_id?: string | null;
  parti_label?: string | null;
  created_at?: string | null;
};

type BuildProfileOptions = {
  firstName?: string | null;
  commune?: string | null;
  plan?: string | null;
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

export function normalizeOptionalString(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed || null;
}

export function sanitizeDiagnosticPayload(value: unknown): DiagnosticPayload {
  if (!isPlainObject(value)) return {};

  const payload: DiagnosticPayload = {};

  for (const [key, rawValue] of Object.entries(value)) {
    if (DIAGNOSTIC_STRING_KEYS.has(key)) {
      const normalized = normalizeOptionalString(rawValue);
      if (normalized) payload[key] = normalized;
      continue;
    }

    if (DIAGNOSTIC_ARRAY_KEYS.has(key) && Array.isArray(rawValue)) {
      const normalized = rawValue
        .map((entry) => normalizeOptionalString(entry))
        .filter((entry): entry is string => !!entry);

      if (normalized.length) payload[key] = normalized;
    }
  }

  return payload;
}

export function buildDiagnosticState(seed: unknown) {
  return buildStoredDiagnosticEntry(sanitizeDiagnosticPayload(seed) as Record<string, unknown>, maryanResources);
}

export function buildDiagnosticStateFromProfileRow(profile: ProfileContextRow | null | undefined) {
  const ctx = isPlainObject(profile?.profile_context) ? profile!.profile_context as Record<string, unknown> : null;
  const diagCtx = isPlainObject(ctx?.diagnostic) ? ctx!.diagnostic as Record<string, unknown> : {};

  const priorities = Array.isArray(diagCtx.priorities)
    ? (diagCtx.priorities as unknown[]).filter((p): p is string => typeof p === 'string')
    : [];
  const recommendedSlugs = Array.isArray(diagCtx.fiches)
    ? (diagCtx.fiches as unknown[]).filter((f): f is string => typeof f === 'string')
    : [];

  return buildStoredDiagnosticEntry(
    {
      diagnostic_key:
        normalizeOptionalString(profile?.diagnostic_key) || normalizeOptionalString(diagCtx.key as string),
      diagnostic_label:
        normalizeOptionalString(profile?.diagnostic_label) || normalizeOptionalString(diagCtx.label as string),
      role: normalizeOptionalString(profile?.role),
      priorities,
      recommended_slugs: recommendedSlugs
    },
    maryanResources
  );
}

export function buildMaryanProfileFromDiagnosticState(
  diagnosticState: Record<string, unknown> | null | undefined,
  options: BuildProfileOptions = {}
): MaryanProfile | null {
  const safeState = buildDiagnosticState(diagnosticState);
  const profileKey = normalizeOptionalString(safeState.profile) || normalizeOptionalString(safeState.diagnostic_key);

  if (!profileKey) return null;

  const roleMap: Record<string, { title: string; theme: string; themeLabel: string }> = {
    maire: { title: 'Maire', theme: 'gouvernance', themeLabel: 'Gouvernance et arbitrage' },
    adjoint: { title: 'Adjoint·e municipal·e', theme: 'delegation', themeLabel: 'Délégation et mise en oeuvre' },
    conseiller_maj: { title: 'Élu·e de majorité', theme: 'mandat', themeLabel: 'Conduite du mandat' },
    conseiller_opp: { title: 'Élu·e d’opposition', theme: 'positionnement', themeLabel: 'Positionnement politique' },
    majorite: { title: 'Élu·e de majorité', theme: 'mandat', themeLabel: 'Conduite du mandat' },
    opposition: { title: 'Élu·e d’opposition', theme: 'positionnement', themeLabel: 'Positionnement politique' },
    interco: { title: 'Élu·e intercommunal·e', theme: 'coordination', themeLabel: 'Coordination territoriale' }
  };

  const roleKey = normalizeOptionalString(safeState.role) || 'elu';
  const role = roleMap[roleKey] || {
    title: 'Élu·e local·e',
    theme: 'mandat',
    themeLabel: 'Conduite du mandat'
  };

  const offerType = normalizeOptionalString(safeState.offer_type);
  const offerNames: Record<string, string> = {
    copilote: 'Copilote',
    individuel: 'Offre individuelle',
    collectivite: 'Offre collectivité',
    formation_irl: 'Formation / Appui IRL'
  };

  const tags: string[] = [];
  if (safeState.seniority === 'moins1an') tags.push('début de mandat');
  if (safeState.feeling === 'seul') tags.push('isolement');
  if (safeState.feeling === 'surcharge') tags.push('surcharge');
  if (safeState.tension === 'conflit') tags.push('tension');
  if (safeState.tension === 'exposition') tags.push('exposition');
  if (safeState.tension === 'flou') tags.push('arbitrage dans le flou');
  if (safeState.tension === 'administration') tags.push('friction administrative');
  if (safeState.lack === 'cadre') tags.push('besoin de cadre');
  if (safeState.vigilance === 'maniere') tags.push('prise de parole');

  const customPriorities = Array.isArray(safeState.priorities)
    ? safeState.priorities
        .map((value) => normalizeOptionalString(value))
        .filter((value): value is string => !!value)
    : [];

  if (!tags.length && customPriorities.length) {
    tags.push(...customPriorities.slice(0, 3));
  }

  if (!tags.length) {
    tags.push('mandat local');
  }

  const plan = normalizeOptionalString(options.plan);
  const offerName =
    plan === 'plus' || plan === 'admin'
      ? 'MARYAN Plus'
      : offerType && offerNames[offerType]
        ? offerNames[offerType]
        : 'Copilote';

  return {
    key: `${roleKey}-${normalizeOptionalString(safeState.tension) || normalizeOptionalString(safeState.feeling) || profileKey}`,
    title: role.title,
    summary:
      normalizeOptionalString(safeState.summary) ||
      DIAGNOSTIC_ACCROCHES[profileKey as keyof typeof DIAGNOSTIC_ACCROCHES] ||
      normalizeOptionalString(safeState.diagnostic_label) ||
      'MARYAN adapte son aide à votre situation de mandat.',
    theme: role.theme,
    themeLabel: role.themeLabel,
    offerLevel: plan === 'plus' || plan === 'admin' || offerType !== 'copilote' ? 2 : 1,
    offerName,
    tags: [...new Set(tags)].slice(0, 5),
    plan: plan || undefined,
    firstName: normalizeOptionalString(options.firstName) || undefined,
    commune: normalizeOptionalString(options.commune) || undefined,
    source: 'derived'
  };
}
