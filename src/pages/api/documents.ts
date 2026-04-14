import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

export const prerender = false;

const SUPABASE_URL = process.env.PUBLIC_SUPABASE_URL as string;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY as string;
const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY as string;
const MISTRAL_CHAT_URL = 'https://api.mistral.ai/v1/chat/completions';

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

/** Génère un titre automatique via Mistral à partir du contenu */
async function generateTitle(contenu: string, type: string): Promise<string> {
  if (!MISTRAL_API_KEY) return 'Document sans titre';

  const typeLabel = type === 'compte-rendu' ? 'compte rendu de réunion' : type === 'document' ? 'synthèse de document' : 'note';
  const prompt = `Génère un titre court (8 mots max) et précis pour ce ${typeLabel}. Retourne UNIQUEMENT le titre, sans guillemets ni ponctuation finale.\n\nContenu :\n${contenu.slice(0, 800)}`;

  try {
    const res = await fetch(MISTRAL_CHAT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${MISTRAL_API_KEY}` },
      body: JSON.stringify({
        model: 'mistral-small-latest',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 40,
        temperature: 0.3
      })
    });
    if (!res.ok) return 'Document sans titre';
    const data = await res.json() as Record<string, any>;
    const raw = data?.choices?.[0]?.message?.content?.trim() || '';
    return raw.slice(0, 120) || 'Document sans titre';
  } catch {
    return 'Document sans titre';
  }
}

const DEFAULT_DOSSIER: Record<string, string> = {
  'compte-rendu': 'Réunions',
  'document': 'Documents',
  'note': 'Notes'
};

// GET /api/documents — liste les documents de l'utilisateur
export const GET: APIRoute = async ({ request }) => {
  const token = getToken(request);
  if (!token) return json({ error: 'Non authentifié.' }, 401);

  const userId = await getAuthenticatedUserId(token);
  if (!userId) return json({ error: 'Token invalide.' }, 401);

  const url = new URL(request.url);
  const dossier = url.searchParams.get('dossier');
  const docId = url.searchParams.get('id');

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

  // Récupération d'un document unique
  if (docId) {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('id', docId)
      .eq('user_id', userId)
      .single();
    if (error) return json({ error: error.message }, error.code === 'PGRST116' ? 404 : 500);
    return json({ document: data });
  }

  let query = supabase
    .from('documents')
    .select('id, type, titre, source_nom, dossier, created_at, updated_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (dossier) {
    query = query.eq('dossier', dossier);
  }

  const { data, error } = await query;
  if (error) return json({ error: error.message }, 500);

  // Retourne aussi la liste des dossiers distincts
  const { data: dossiersData } = await supabase
    .from('documents')
    .select('dossier')
    .eq('user_id', userId);

  const dossiers = [...new Set((dossiersData || []).map((d: { dossier: string }) => d.dossier))].sort();

  return json({ documents: data || [], dossiers });
};

// POST /api/documents — crée un document
export const POST: APIRoute = async ({ request }) => {
  const token = getToken(request);
  if (!token) return json({ error: 'Non authentifié.' }, 401);

  const userId = await getAuthenticatedUserId(token);
  if (!userId) return json({ error: 'Token invalide.' }, 401);

  let body: {
    type?: string;
    contenu?: string;
    source_nom?: string;
    dossier?: string;
    titre?: string;
    generate_title?: boolean;
  } | null = null;

  try {
    body = await request.json();
  } catch {
    return json({ error: 'Format JSON invalide.' }, 400);
  }

  const type = body?.type;
  if (!type || !['compte-rendu', 'document', 'note'].includes(type)) {
    return json({ error: 'Type invalide. Valeurs : compte-rendu, document, note.' }, 400);
  }

  const contenu = body?.contenu || '';
  const dossier = body?.dossier || DEFAULT_DOSSIER[type] || 'Documents';

  let titre = body?.titre || '';
  if (!titre || body?.generate_title) {
    titre = await generateTitle(contenu, type);
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
  const { data, error } = await supabase
    .from('documents')
    .insert({
      user_id: userId,
      type,
      titre,
      contenu,
      source_nom: body?.source_nom || null,
      dossier
    })
    .select('id, type, titre, dossier, created_at')
    .single();

  if (error) return json({ error: error.message }, 500);
  return json({ document: data }, 201);
};

// PATCH /api/documents — met à jour un document (titre, dossier)
// ou renomme un dossier entier (rename_folder: { from, to })
export const PATCH: APIRoute = async ({ request }) => {
  const token = getToken(request);
  if (!token) return json({ error: 'Non authentifié.' }, 401);

  const userId = await getAuthenticatedUserId(token);
  if (!userId) return json({ error: 'Token invalide.' }, 401);

  let body: {
    id?: string;
    titre?: string;
    dossier?: string;
    contenu?: string;
    rename_folder?: { from: string; to: string };
  } | null = null;

  try {
    body = await request.json();
  } catch {
    return json({ error: 'Format JSON invalide.' }, 400);
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

  // Renommage de dossier (batch)
  if (body?.rename_folder) {
    const { from, to } = body.rename_folder;
    if (!from || !to || typeof from !== 'string' || typeof to !== 'string') {
      return json({ error: 'Paramètres rename_folder.from et rename_folder.to requis.' }, 400);
    }
    const { error } = await supabase
      .from('documents')
      .update({ dossier: to.trim() })
      .eq('user_id', userId)
      .eq('dossier', from);
    if (error) return json({ error: error.message }, 500);
    return json({ success: true, renamed: { from, to: to.trim() } });
  }

  if (!body?.id) return json({ error: 'Paramètre id requis.' }, 400);

  const updates: Record<string, string> = {};
  if (typeof body.titre === 'string') updates.titre = body.titre;
  if (typeof body.dossier === 'string') updates.dossier = body.dossier;
  if (typeof body.contenu === 'string') updates.contenu = body.contenu;

  if (!Object.keys(updates).length) return json({ error: 'Aucun champ à mettre à jour.' }, 400);

  const { data, error } = await supabase
    .from('documents')
    .update(updates)
    .eq('id', body.id)
    .eq('user_id', userId)
    .select('id, titre, dossier, updated_at')
    .single();

  if (error) return json({ error: error.message }, error.code === 'PGRST116' ? 404 : 500);
  return json({ document: data });
};

// DELETE /api/documents — supprime un document
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
    .from('documents')
    .delete()
    .eq('id', body.id)
    .eq('user_id', userId);

  if (error) return json({ error: error.message }, 500);
  return json({ success: true });
};

export const ALL: APIRoute = async () => json({ error: 'Méthode non autorisée.' }, 405);
