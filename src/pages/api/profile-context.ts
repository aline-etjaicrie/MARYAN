import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { ensureProfileRecord } from '../../lib/profiles';
import {
  buildDiagnosticStateFromProfileRow,
  buildMaryanProfileFromDiagnosticState,
  normalizeOptionalString,
  sanitizeDiagnosticPayload,
  type ProfileContextRow
} from '../../lib/user-personalization';

export const prerender = false;

const SUPABASE_URL = process.env.PUBLIC_SUPABASE_URL as string;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY as string;

const PROFILE_SELECT = [
  'id',
  'first_name',
  'last_name',
  'commune',
  'role',
  'plan',
  'parti_id',
  'parti_label',
  'affiliation_politique',
  'taille_ct',
  'type_ct',
  'metier_hors_mandat',
  'diagnostic_key',
  'diagnostic_label',
  'diagnostic_completed',
  'last_diagnostic_summary',
  'profile_context',
  'profile_context_updated_at',
  'advanced_diagnostic_completed',
  'advanced_diagnostic_data',
  'created_at'
].join(', ');

type ProfileContextRequestBody = {
  profile?: Record<string, unknown> | null;
  diagnosticState?: unknown;
  advancedDiagnosticState?: Record<string, unknown> | null;
};

function json(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store'
    }
  });
}

function getToken(request: Request): string | null {
  const auth = request.headers.get('Authorization') || '';
  return auth.startsWith('Bearer ') ? auth.slice(7) : null;
}

async function getAuthenticatedProfile(request: Request) {
  const token = getToken(request);
  if (!token) {
    return { error: json({ error: 'Non authentifié.' }, 401) };
  }

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    return { error: json({ error: 'Configuration serveur manquante.' }, 500) };
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser(token);

  if (authError || !user) {
    return { error: json({ error: 'Token invalide.' }, 401) };
  }

  await ensureProfileRecord(supabase, user);

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select(PROFILE_SELECT)
    .eq('id', user.id)
    .single();

  if (profileError) {
    return { error: json({ error: 'Impossible de charger le profil.' }, 500) };
  }

  return {
    supabase,
    user,
    profile: profile as ProfileContextRow
  };
}

function serializeProfileContext(profile: ProfileContextRow | null | undefined) {
  const diagnosticState = buildDiagnosticStateFromProfileRow(profile);
  const maryanProfile = buildMaryanProfileFromDiagnosticState(diagnosticState, {
    firstName: profile?.first_name || null,
    commune: profile?.commune || null,
    plan: profile?.plan || null
  });

  return {
    profile,
    diagnosticState,
    maryanProfile
  };
}

export const GET: APIRoute = async ({ request }) => {
  const result = await getAuthenticatedProfile(request);
  if ('error' in result) return result.error;

  return json(serializeProfileContext(result.profile));
};

export const POST: APIRoute = async ({ request }) => {
  const result = await getAuthenticatedProfile(request);
  if ('error' in result) return result.error;

  let body: ProfileContextRequestBody | null = null;
  try {
    body = (await request.json()) as ProfileContextRequestBody;
  } catch {
    return json({ error: 'Format JSON invalide.' }, 400);
  }

  const updates: Record<string, unknown> = {};
  const profileInput = body?.profile && typeof body.profile === 'object' ? body.profile : null;

  if (profileInput) {
    const firstName = normalizeOptionalString(profileInput.first_name);
    const commune = normalizeOptionalString(profileInput.commune);
    const role = normalizeOptionalString(profileInput.role);
    const partiId = normalizeOptionalString(profileInput.parti_id);
    const partiLabel = normalizeOptionalString(profileInput.parti_label);

    if (firstName !== null || profileInput.first_name === null) updates.first_name = firstName;
    if (commune !== null || profileInput.commune === null) updates.commune = commune;
    if (role !== null || profileInput.role === null) updates.role = role;
    if (partiId !== null || profileInput.parti_id === null) updates.parti_id = partiId;
    if (partiLabel !== null || profileInput.parti_label === null) updates.parti_label = partiLabel;
  }

  if (body && 'diagnosticState' in body) {
    const raw = sanitizeDiagnosticPayload(body.diagnosticState);

    const diagnosticKey = normalizeOptionalString(raw.diagnostic_key as string);
    const diagnosticLabel = normalizeOptionalString(raw.diagnostic_label as string);
    const summary = normalizeOptionalString(raw.summary as string);
    const priorities = Array.isArray(raw.priorities)
      ? (raw.priorities as unknown[]).filter((p): p is string => typeof p === 'string')
      : [];
    const fiches = Array.isArray(raw.recommended_slugs)
      ? (raw.recommended_slugs as unknown[]).filter((f): f is string => typeof f === 'string')
      : [];

    if (diagnosticKey) {
      const nowIso = new Date().toISOString();
      const existingContext =
        result.profile?.profile_context &&
        typeof result.profile.profile_context === 'object' &&
        !Array.isArray(result.profile.profile_context)
          ? (result.profile.profile_context as Record<string, unknown>)
          : {};

      const existingDiagnosticContext =
        existingContext.diagnostic &&
        typeof existingContext.diagnostic === 'object' &&
        !Array.isArray(existingContext.diagnostic)
          ? (existingContext.diagnostic as Record<string, unknown>)
          : {};

      updates.diagnostic_key = diagnosticKey;
      updates.diagnostic_label = diagnosticLabel;
      updates.diagnostic_completed = true;
      updates.profile_context = {
        ...existingContext,
        diagnostic: {
          ...existingDiagnosticContext,
          key: diagnosticKey,
          label: diagnosticLabel || null,
          priorities,
          fiches,
          completed_at: nowIso
        }
      };
      updates.profile_context_updated_at = nowIso;
      if (summary) updates.last_diagnostic_summary = summary;
    }
  }

  if (body?.advancedDiagnosticState && typeof body.advancedDiagnosticState === 'object') {
    const adv = body.advancedDiagnosticState as Record<string, unknown>;
    // Basic sanitization — only allow known string/enum fields
    const allowed = ['situation_principale', 'energie_principale', 'profil_parole', 'profil_exposition', 'advanced_priorities', 'advanced_resources'];
    const sanitized: Record<string, unknown> = {};
    for (const key of allowed) {
      if (key in adv) sanitized[key] = adv[key];
    }
    if (Object.keys(sanitized).length) {
      updates.advanced_diagnostic_completed = true;
      updates.advanced_diagnostic_data = sanitized;
    }
  }

  if (!Object.keys(updates).length) {
    return json(serializeProfileContext(result.profile));
  }

  const { data: updatedProfile, error: updateError } = await result.supabase
    .from('profiles')
    .update(updates)
    .eq('id', result.user.id)
    .select(PROFILE_SELECT)
    .single();

  if (updateError) {
    console.error('[profile-context] update failed:', updateError);
    return json({ error: 'Impossible de mettre à jour le profil.' }, 500);
  }

  return json(serializeProfileContext(updatedProfile as ProfileContextRow));
};

export const ALL: APIRoute = async () => json({ error: 'Méthode non autorisée.' }, 405);
