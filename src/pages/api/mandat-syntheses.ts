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

const VALID_TYPES = ['reunion', 'note_cabinet', 'recap_dossier', 'point_etape', 'autre'] as const;
type SyntheseType = typeof VALID_TYPES[number];

// GET /api/mandat-syntheses — liste les synthèses de l'utilisateur
// ?sujet_id=uuid  — filtre par sujet
// ?id=uuid        — récupère une synthèse unique
export const GET: APIRoute = async ({ request }) => {
  const token = getToken(request);
  if (!token) return json({ error: 'Non authentifié.' }, 401);

  const userId = await getAuthenticatedUserId(token);
  if (!userId) return json({ error: 'Token invalide.' }, 401);

  const url = new URL(request.url);
  const syntheseId = url.searchParams.get('id');
  const sujetId = url.searchParams.get('sujet_id');

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

  if (syntheseId) {
    const { data, error } = await supabase
      .from('mandat_syntheses')
      .select('*')
      .eq('id', syntheseId)
      .eq('user_id', userId)
      .single();
    if (error) return json({ error: error.message }, error.code === 'PGRST116' ? 404 : 500);
    return json({ synthese: data });
  }

  let query = supabase
    .from('mandat_syntheses')
    .select('id, titre, type, sujet_id, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (sujetId) {
    query = query.eq('sujet_id', sujetId);
  }

  const { data, error } = await query;
  if (error) return json({ error: error.message }, 500);
  return json({ syntheses: data || [] });
};

// POST /api/mandat-syntheses — crée une synthèse
export const POST: APIRoute = async ({ request }) => {
  const token = getToken(request);
  if (!token) return json({ error: 'Non authentifié.' }, 401);

  const userId = await getAuthenticatedUserId(token);
  if (!userId) return json({ error: 'Token invalide.' }, 401);

  let body: {
    contenu?: string;
    titre?: string;
    type?: SyntheseType;
    sujet_id?: string;
  } | null = null;

  try {
    body = await request.json();
  } catch {
    return json({ error: 'Format JSON invalide.' }, 400);
  }

  const contenu = body?.contenu?.trim();
  if (!contenu) return json({ error: 'Paramètre contenu requis.' }, 400);

  const type: SyntheseType = (body?.type && VALID_TYPES.includes(body.type)) ? body.type : 'reunion';

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
  const { data, error } = await supabase
    .from('mandat_syntheses')
    .insert({
      user_id: userId,
      contenu,
      titre: body?.titre?.trim() || null,
      type,
      sujet_id: body?.sujet_id || null
    })
    .select('id, titre, type, sujet_id, created_at')
    .single();

  if (error) return json({ error: error.message }, 500);
  return json({ synthese: data }, 201);
};

// PATCH /api/mandat-syntheses — met à jour le titre d'une synthèse
export const PATCH: APIRoute = async ({ request }) => {
  const token = getToken(request);
  if (!token) return json({ error: 'Non authentifié.' }, 401);

  const userId = await getAuthenticatedUserId(token);
  if (!userId) return json({ error: 'Token invalide.' }, 401);

  let body: {
    id?: string;
    titre?: string;
    sujet_id?: string | null;
  } | null = null;

  try {
    body = await request.json();
  } catch {
    return json({ error: 'Format JSON invalide.' }, 400);
  }

  if (!body?.id) return json({ error: 'Paramètre id requis.' }, 400);

  const updates: Record<string, unknown> = {};
  if (typeof body.titre === 'string') updates.titre = body.titre.trim() || null;
  if ('sujet_id' in (body || {})) updates.sujet_id = body?.sujet_id || null;

  if (!Object.keys(updates).length) return json({ error: 'Aucun champ à mettre à jour.' }, 400);

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
  const { data, error } = await supabase
    .from('mandat_syntheses')
    .update(updates)
    .eq('id', body.id)
    .eq('user_id', userId)
    .select('id, titre, type, sujet_id, created_at')
    .single();

  if (error) return json({ error: error.message }, error.code === 'PGRST116' ? 404 : 500);
  return json({ synthese: data });
};

// DELETE /api/mandat-syntheses — supprime une synthèse
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
    .from('mandat_syntheses')
    .delete()
    .eq('id', body.id)
    .eq('user_id', userId);

  if (error) return json({ error: error.message }, 500);
  return json({ success: true });
};

export const ALL: APIRoute = async () => json({ error: 'Méthode non autorisée.' }, 405);
