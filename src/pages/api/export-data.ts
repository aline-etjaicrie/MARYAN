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

// GET /api/export-data — export RGPD Article 20 (portabilité des données)
export const GET: APIRoute = async ({ request }) => {
  const token = getToken(request);
  if (!token) return json({ error: 'Non authentifié.' }, 401);

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) return json({ error: 'Configuration serveur manquante.' }, 500);

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);
  if (authError || !user) return json({ error: 'Token invalide.' }, 401);

  const userId = user.id;

  // Récupération du profil
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('id, first_name, commune, role, diagnostic_key, diagnostic_label, plan, parti_id, parti_label, created_at')
    .eq('id', userId)
    .single();

  if (profileError && profileError.code !== 'PGRST116') {
    console.error('[export-data] erreur récupération profil');
    return json({ error: 'Erreur lors de la récupération du profil.' }, 500);
  }

  // Récupération des sessions copilote
  const { data: sessionsData, error: sessionsError } = await supabase
    .from('copilote_sessions')
    .select('id, session_type, titre, messages, diagnostic_key, created_at, updated_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: true });

  if (sessionsError) {
    console.error('[export-data] erreur récupération sessions');
    return json({ error: 'Erreur lors de la récupération des sessions.' }, 500);
  }

  const exportPayload = {
    exported_at: new Date().toISOString(),
    rgpd_note: "Export de vos données personnelles conformément à l'article 20 du RGPD.",
    account: {
      email: user.email,
      created_at: user.created_at
    },
    profile: profileData || null,
    copilote_sessions: sessionsData || []
  };

  const exportJson = JSON.stringify(exportPayload, null, 2);

  return new Response(exportJson, {
    status: 200,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'content-disposition': 'attachment; filename="maryan-mes-donnees.json"'
    }
  });
};

export const ALL: APIRoute = async () => json({ error: 'Méthode non autorisée.' }, 405);
