import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { ensureProfileRecord } from '../../lib/profiles';

export const prerender = false;

const SUPABASE_URL = (import.meta.env.PUBLIC_SUPABASE_URL as string) || (process.env.PUBLIC_SUPABASE_URL as string);
const SUPABASE_SERVICE_KEY = (import.meta.env.SUPABASE_SERVICE_KEY as string) || (process.env.SUPABASE_SERVICE_KEY as string);

const ALLOWED_FIELDS = ['parti_id', 'parti_label', 'first_name', 'commune', 'role'] as const;
type AllowedField = typeof ALLOWED_FIELDS[number];

const LEGACY_DIAGNOSTIC_FIELDS = new Set(['diagnostic_key', 'diagnostic_label']);

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

// PATCH /api/profile-update — met à jour un champ autorisé du profil de l'utilisateur authentifié
export const PATCH: APIRoute = async ({ request }) => {
  const token = getToken(request);
  if (!token) return json({ error: 'Non authentifié.' }, 401);

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) return json({ error: 'Configuration serveur manquante.' }, 500);

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);
  if (authError || !user) return json({ error: 'Token invalide.' }, 401);

  await ensureProfileRecord(supabase, user);

  let body: { field?: unknown; value?: unknown } | null = null;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Format JSON invalide.' }, 400);
  }

  const field = body?.field;
  const value = body?.value;

  if (typeof field === 'string' && LEGACY_DIAGNOSTIC_FIELDS.has(field)) {
    return json(
      {
        error:
          'Mise à jour refusée. Utilisez /api/profile-context avec diagnosticState pour synchroniser le diagnostic.'
      },
      409
    );
  }

  // Validation du champ — seuls les champs autorisés peuvent être modifiés
  if (typeof field !== 'string' || !(ALLOWED_FIELDS as readonly string[]).includes(field)) {
    return json({ error: 'Champ non autorisé.' }, 403);
  }

  // La valeur doit être une chaîne ou null (pour effacer)
  if (value !== null && typeof value !== 'string') {
    return json({ error: 'Valeur invalide. Attendu : string ou null.' }, 400);
  }

  const normalizedValue = typeof value === 'string' ? value.trim() || null : null;

  const { error: updateError } = await supabase
    .from('profiles')
    .update({ [field as AllowedField]: normalizedValue })
    .eq('id', user.id);

  if (updateError) {
    console.error('[profile-update] erreur mise à jour profil');
    return json({ error: 'Erreur lors de la mise à jour.' }, 500);
  }

  return json({ success: true });
};

export const ALL: APIRoute = async () => json({ error: 'Méthode non autorisée.' }, 405);
