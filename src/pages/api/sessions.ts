import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

export const prerender = false;

const SUPABASE_URL = (import.meta.env.PUBLIC_SUPABASE_URL as string) || (process.env.PUBLIC_SUPABASE_URL as string);
const SUPABASE_SERVICE_KEY = (import.meta.env.SUPABASE_SERVICE_KEY as string) || (process.env.SUPABASE_SERVICE_KEY as string);

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

async function getAuthenticatedUserId(token: string): Promise<string | null> {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) return null;
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
  const { data: { user } } = await supabase.auth.getUser(token);
  return user?.id || null;
}

// GET /api/sessions — retourne les 10 dernières sessions de l'utilisateur
export const GET: APIRoute = async ({ request }) => {
  const token = getToken(request);
  if (!token) return json({ error: 'Non authentifié.' }, 401);

  const userId = await getAuthenticatedUserId(token);
  if (!userId) return json({ error: 'Token invalide.' }, 401);

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
  const { data, error } = await supabase
    .from('copilote_sessions')
    .select('id, session_type, titre, diagnostic_key, created_at, updated_at')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })
    .limit(10);

  if (error) return json({ error: error.message }, 500);
  return json({ sessions: data || [] });
};

// POST /api/sessions — crée ou met à jour une session
export const POST: APIRoute = async ({ request }) => {
  const token = getToken(request);
  if (!token) return json({ error: 'Non authentifié.' }, 401);

  const userId = await getAuthenticatedUserId(token);
  if (!userId) return json({ error: 'Token invalide.' }, 401);

  let body: {
    id?: string;
    session_type?: string;
    titre?: string;
    messages?: unknown[];
    diagnostic_key?: string;
  } | null = null;

  try {
    body = await request.json();
  } catch {
    return json({ error: 'Format JSON invalide.' }, 400);
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

  if (body?.id) {
    // Mise à jour
    const { data, error } = await supabase
      .from('copilote_sessions')
      .update({
        titre: body.titre,
        messages: body.messages || [],
        updated_at: new Date().toISOString()
      })
      .eq('id', body.id)
      .eq('user_id', userId)
      .select('id')
      .single();

    if (error) return json({ error: error.message }, 500);
    return json({ session: data });
  } else {
    // Création
    const sessionType = ['copilote', 'cr_reunion', 'analyse'].includes(body?.session_type || '')
      ? body!.session_type
      : 'copilote';

    const { data, error } = await supabase
      .from('copilote_sessions')
      .insert({
        user_id: userId,
        session_type: sessionType,
        titre: body?.titre || 'Session sans titre',
        messages: body?.messages || [],
        diagnostic_key: body?.diagnostic_key || null
      })
      .select('id')
      .single();

    if (error) return json({ error: error.message }, 500);
    return json({ session: data }, 201);
  }
};

// DELETE /api/sessions — supprime une session ou toutes les sessions de l'utilisateur
export const DELETE: APIRoute = async ({ request }) => {
  const token = getToken(request);
  if (!token) return json({ error: 'Non authentifié.' }, 401);

  const userId = await getAuthenticatedUserId(token);
  if (!userId) return json({ error: 'Token invalide.' }, 401);

  let body: { session_id?: string; delete_all?: boolean } | null = null;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Format JSON invalide.' }, 400);
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

  if (body?.delete_all) {
    const { error } = await supabase
      .from('copilote_sessions')
      .delete()
      .eq('user_id', userId);
    if (error) return json({ error: error.message }, 500);
    return json({ success: true });
  } else if (body?.session_id) {
    const { error } = await supabase
      .from('copilote_sessions')
      .delete()
      .eq('id', body.session_id)
      .eq('user_id', userId);
    if (error) return json({ error: error.message }, 500);
    return json({ success: true });
  } else {
    return json({ error: 'Paramètre session_id ou delete_all requis.' }, 400);
  }
};

export const ALL: APIRoute = async () => json({ error: 'Méthode non autorisée.' }, 405);
