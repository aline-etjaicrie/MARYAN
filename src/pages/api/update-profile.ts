import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { ensureProfileRecord } from '../../lib/profiles';

export const prerender = false;

const SUPABASE_URL =
  (import.meta.env.PUBLIC_SUPABASE_URL as string) || (process.env.PUBLIC_SUPABASE_URL as string);
const SUPABASE_SERVICE_KEY =
  (import.meta.env.SUPABASE_SERVICE_KEY as string) || (process.env.SUPABASE_SERVICE_KEY as string);

const ALLOWED_FIELDS = new Set([
  'first_name',
  'last_name',
  'commune',
  'role',
  'affiliation_politique',
  'taille_ct',
  'type_ct',
  'metier_hors_mandat',
  'parti_id',
  'parti_label',
  'profil_decision',
  'profil_conflit',
  'profil_parole',
  'profil_equipe',
  'profil_deliberation'
]);

const TAILLE_CT_VALUES = new Set(['moins500', '500-3500', '3500-10000', '10000-50000', 'plus50000', '']);
const TYPE_CT_VALUES = new Set(['commune_rurale', 'commune_urbaine', 'intercommunalite', 'metropole', 'plm_paris', 'plm_lyon', 'plm_marseille', 'commune', 'plm', '']);

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

export const POST: APIRoute = async ({ request }) => {
  const token = getToken(request);
  if (!token) return json({ error: 'Non authentifié.' }, 401);
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) return json({ error: 'Configuration serveur manquante.' }, 500);

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser(token);
  if (authError || !user) return json({ error: 'Token invalide.' }, 401);

  await ensureProfileRecord(supabase, user);

  let body: Record<string, unknown> | null = null;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ error: 'Format JSON invalide.' }, 400);
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return json({ error: 'Corps invalide.' }, 400);
  }

  const updates: Record<string, string | null> = {};

  for (const [key, rawValue] of Object.entries(body)) {
    if (!ALLOWED_FIELDS.has(key)) continue;
    const value = typeof rawValue === 'string' ? rawValue.trim() || null : null;

    // Validate enum fields
    if (key === 'taille_ct' && value !== null && !TAILLE_CT_VALUES.has(value)) continue;
    if (key === 'type_ct' && value !== null && !TYPE_CT_VALUES.has(value)) continue;

    updates[key] = value;
  }

  if (!Object.keys(updates).length) {
    return json({ success: true });
  }

  const { error: updateError } = await supabase.from('profiles').update(updates).eq('id', user.id);

  if (updateError) {
    console.error('[update-profile] Supabase error:', updateError.message, updateError.code, updateError.details);
    return json({ error: updateError.message }, 500);
  }

  return json({ success: true });
};

export const ALL: APIRoute = async () => json({ error: 'Méthode non autorisée.' }, 405);
