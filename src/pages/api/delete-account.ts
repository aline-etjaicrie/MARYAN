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

// DELETE /api/delete-account — suppression RGPD Article 17 (droit à l'effacement)
export const DELETE: APIRoute = async ({ request }) => {
  const token = getToken(request);
  if (!token) return json({ error: 'Non authentifié.' }, 401);

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) return json({ error: 'Configuration serveur manquante.' }, 500);

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);
  if (authError || !user) return json({ error: 'Token invalide.' }, 401);

  const userId = user.id;

  // Suppression des sessions copilote
  const { error: sessionsDeleteError } = await supabase
    .from('copilote_sessions')
    .delete()
    .eq('user_id', userId);

  if (sessionsDeleteError) {
    console.error('[delete-account] erreur suppression sessions');
    // Non bloquant — on continue pour tenter de supprimer le profil et le compte
  }

  // Suppression du profil
  const { error: profileDeleteError } = await supabase
    .from('profiles')
    .delete()
    .eq('id', userId);

  if (profileDeleteError) {
    console.error('[delete-account] erreur suppression profil');
    // Non bloquant — on tente quand même de supprimer le compte auth
  }

  // Suppression du compte auth (nécessite la service key)
  const { error: authDeleteError } = await supabase.auth.admin.deleteUser(userId);

  if (authDeleteError) {
    console.error('[delete-account] erreur suppression compte auth');
    return json({ error: 'Erreur lors de la suppression du compte. Veuillez contacter le support.' }, 500);
  }

  return json({
    success: true,
    message: 'Votre compte et toutes vos données ont été supprimés.'
  });
};

export const ALL: APIRoute = async () => json({ error: 'Méthode non autorisée.' }, 405);
