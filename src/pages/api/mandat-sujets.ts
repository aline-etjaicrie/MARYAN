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

const VALID_STATUTS = ['a_clarifier', 'a_arbitrer', 'a_faire', 'fait'] as const;
const VALID_TYPES = ['general', 'idee', 'dossier', 'reunion', 'prise_de_parole', 'vigilance', 'projet'] as const;

type Statut = typeof VALID_STATUTS[number];
type SujetType = typeof VALID_TYPES[number];

// GET /api/mandat-sujets — liste les sujets de l'utilisateur
// ?statut=a_clarifier  — filtre par colonne kanban
export const GET: APIRoute = async ({ request }) => {
  const token = getToken(request);
  if (!token) return json({ error: 'Non authentifié.' }, 401);

  const userId = await getAuthenticatedUserId(token);
  if (!userId) return json({ error: 'Token invalide.' }, 401);

  const url = new URL(request.url);
  const statut = url.searchParams.get('statut') as Statut | null;
  const sujetId = url.searchParams.get('id');

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

  if (sujetId) {
    const { data, error } = await supabase
      .from('mandat_sujets')
      .select('*')
      .eq('id', sujetId)
      .eq('user_id', userId)
      .single();
    if (error) return json({ error: error.message }, error.code === 'PGRST116' ? 404 : 500);
    return json({ sujet: data });
  }

  let query = supabase
    .from('mandat_sujets')
    .select('id, titre, type, statut, ressource_slug, created_at, updated_at')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });

  if (statut && VALID_STATUTS.includes(statut)) {
    query = query.eq('statut', statut);
  }

  const { data, error } = await query;
  if (error) return json({ error: error.message }, 500);
  return json({ sujets: data || [] });
};

// POST /api/mandat-sujets — crée un sujet
export const POST: APIRoute = async ({ request }) => {
  const token = getToken(request);
  if (!token) return json({ error: 'Non authentifié.' }, 401);

  const userId = await getAuthenticatedUserId(token);
  if (!userId) return json({ error: 'Token invalide.' }, 401);

  let body: {
    titre?: string;
    type?: SujetType;
    statut?: Statut;
    ressource_slug?: string;
  } | null = null;

  try {
    body = await request.json();
  } catch {
    return json({ error: 'Format JSON invalide.' }, 400);
  }

  const titre = body?.titre?.trim();
  if (!titre) return json({ error: 'Paramètre titre requis.' }, 400);

  const type: SujetType = (body?.type && VALID_TYPES.includes(body.type)) ? body.type : 'general';
  const statut: Statut = (body?.statut && VALID_STATUTS.includes(body.statut)) ? body.statut : 'a_clarifier';

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
  const { data, error } = await supabase
    .from('mandat_sujets')
    .insert({
      user_id: userId,
      titre,
      type,
      statut,
      ressource_slug: body?.ressource_slug || null
    })
    .select('id, titre, type, statut, ressource_slug, created_at, updated_at')
    .single();

  if (error) return json({ error: error.message }, 500);
  return json({ sujet: data }, 201);
};

// PATCH /api/mandat-sujets — met à jour un sujet (titre, type, statut, ressource_slug)
export const PATCH: APIRoute = async ({ request }) => {
  const token = getToken(request);
  if (!token) return json({ error: 'Non authentifié.' }, 401);

  const userId = await getAuthenticatedUserId(token);
  if (!userId) return json({ error: 'Token invalide.' }, 401);

  let body: {
    id?: string;
    titre?: string;
    type?: SujetType;
    statut?: Statut;
    ressource_slug?: string | null;
  } | null = null;

  try {
    body = await request.json();
  } catch {
    return json({ error: 'Format JSON invalide.' }, 400);
  }

  if (!body?.id) return json({ error: 'Paramètre id requis.' }, 400);

  const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (typeof body.titre === 'string' && body.titre.trim()) updates.titre = body.titre.trim();
  if (body.type && VALID_TYPES.includes(body.type)) updates.type = body.type;
  if (body.statut && VALID_STATUTS.includes(body.statut)) updates.statut = body.statut;
  if ('ressource_slug' in (body || {})) updates.ressource_slug = body?.ressource_slug || null;

  if (Object.keys(updates).length === 1) return json({ error: 'Aucun champ à mettre à jour.' }, 400);

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
  const { data, error } = await supabase
    .from('mandat_sujets')
    .update(updates)
    .eq('id', body.id)
    .eq('user_id', userId)
    .select('id, titre, type, statut, ressource_slug, updated_at')
    .single();

  if (error) return json({ error: error.message }, error.code === 'PGRST116' ? 404 : 500);
  return json({ sujet: data });
};

// DELETE /api/mandat-sujets — supprime un sujet
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
    .from('mandat_sujets')
    .delete()
    .eq('id', body.id)
    .eq('user_id', userId);

  if (error) return json({ error: error.message }, 500);
  return json({ success: true });
};

export const ALL: APIRoute = async () => json({ error: 'Méthode non autorisée.' }, 405);
