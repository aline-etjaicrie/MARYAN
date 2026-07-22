import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

export const prerender = false;

const SUPABASE_URL =
  (import.meta.env.PUBLIC_SUPABASE_URL as string) || (process.env.PUBLIC_SUPABASE_URL as string);
const SUPABASE_SERVICE_KEY =
  (import.meta.env.SUPABASE_SERVICE_KEY as string) || (process.env.SUPABASE_SERVICE_KEY as string);

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

// GET /api/export-data — export complet des données de l'utilisateur (profil,
// sujets de mandat, notes, synthèses, documents) au format JSON téléchargeable.
export const GET: APIRoute = async ({ request }) => {
  const token = getToken(request);
  if (!token) return json({ error: 'Non authentifié.' }, 401);
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) return json({ error: 'Configuration serveur manquante.' }, 500);

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser(token);
  if (authError || !user) return json({ error: 'Token invalide.' }, 401);

  const [profileRes, sujetsRes, notesRes, synthesesRes, documentsRes] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', user.id).maybeSingle(),
    supabase.from('mandat_sujets').select('*').eq('user_id', user.id),
    supabase.from('mandat_notes').select('*').eq('user_id', user.id),
    supabase.from('mandat_syntheses').select('*').eq('user_id', user.id),
    supabase.from('documents').select('*').eq('user_id', user.id)
  ]);

  const firstError = [profileRes.error, sujetsRes.error, notesRes.error, synthesesRes.error, documentsRes.error].find(
    Boolean
  );
  if (firstError) {
    console.error('[export-data] Supabase error:', firstError.message);
    return json({ error: "Impossible d'exporter vos données pour le moment." }, 500);
  }

  const exportPayload = {
    export_genere_le: new Date().toISOString(),
    compte: { id: user.id, email: user.email },
    profil: profileRes.data || null,
    sujets_de_mandat: sujetsRes.data || [],
    notes: notesRes.data || [],
    syntheses: synthesesRes.data || [],
    documents: documentsRes.data || []
  };

  return new Response(JSON.stringify(exportPayload, null, 2), {
    status: 200,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'content-disposition': 'attachment; filename="maryan-mes-donnees.json"',
      'cache-control': 'no-store'
    }
  });
};

export const ALL: APIRoute = async () => json({ error: 'Méthode non autorisée.' }, 405);
