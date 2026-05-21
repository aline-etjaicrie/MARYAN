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

// GET /api/mandat-notes — liste les notes de l'utilisateur
// ?sujet_id=uuid  — filtre par sujet
// ?id=uuid        — récupère une note unique
export const GET: APIRoute = async ({ request }) => {
  const token = getToken(request);
  if (!token) return json({ error: 'Non authentifié.' }, 401);

  const userId = await getAuthenticatedUserId(token);
  if (!userId) return json({ error: 'Token invalide.' }, 401);

  const url = new URL(request.url);
  const noteId = url.searchParams.get('id');
  const sujetId = url.searchParams.get('sujet_id');

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

  if (noteId) {
    const { data, error } = await supabase
      .from('mandat_notes')
      .select('*')
      .eq('id', noteId)
      .eq('user_id', userId)
      .single();
    if (error) return json({ error: error.message }, error.code === 'PGRST116' ? 404 : 500);
    return json({ note: data });
  }

  let query = supabase
    .from('mandat_notes')
    .select('id, contenu, sujet_id, session_copilote_id, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (sujetId) {
    query = query.eq('sujet_id', sujetId);
  }

  const { data, error } = await query;
  if (error) return json({ error: error.message }, 500);
  return json({ notes: data || [] });
};

// POST /api/mandat-notes — crée une note
export const POST: APIRoute = async ({ request }) => {
  const token = getToken(request);
  if (!token) return json({ error: 'Non authentifié.' }, 401);

  const userId = await getAuthenticatedUserId(token);
  if (!userId) return json({ error: 'Token invalide.' }, 401);

  let body: {
    contenu?: string;
    sujet_id?: string;
    session_copilote_id?: string;
  } | null = null;

  try {
    body = await request.json();
  } catch {
    return json({ error: 'Format JSON invalide.' }, 400);
  }

  const contenu = body?.contenu?.trim();
  if (!contenu) return json({ error: 'Paramètre contenu requis.' }, 400);

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
  const { data, error } = await supabase
    .from('mandat_notes')
    .insert({
      user_id: userId,
      contenu,
      sujet_id: body?.sujet_id || null,
      session_copilote_id: body?.session_copilote_id || null
    })
    .select('id, contenu, sujet_id, session_copilote_id, created_at')
    .single();

  if (error) return json({ error: error.message }, 500);
  return json({ note: data }, 201);
};

// DELETE /api/mandat-notes — supprime une note
export const DELETE: APIRoute = async ({ request }) => {
  const token = getToken(request);
  if (!token) return json({ error: 'Non authentifié.' }, 401);

  const userId = await getAuthenticatedUserId(token);
  if (!userId) return json({ error: 'Token invalide.' }, 401);

  let body: { id?: string } | null = null;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Format JSON invalide.' }, 400);
  }

  if (!body?.id) return json({ error: 'Paramètre id requis.' }, 400);

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
  const { error } = await supabase
    .from('mandat_notes')
    .delete()
    .eq('id', body.id)
    .eq('user_id', userId);

  if (error) return json({ error: error.message }, 500);
  return json({ success: true });
};

export const ALL: APIRoute = async () => json({ error: 'Méthode non autorisée.' }, 405);
