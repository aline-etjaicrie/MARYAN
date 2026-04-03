import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { isAdminUser } from '../../../lib/admin';

export const prerender = false;

function json(payload: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'content-type': 'application/json' }
  });
}

// GET: list all contributions (admin view)
export const GET: APIRoute = async ({ request }) => {
  const authHeader = request.headers.get('Authorization') || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token || !(await isAdminUser(token))) return json({ error: 'Non autorisé.' }, 403);

  const supabase = createClient(
    (import.meta.env.PUBLIC_SUPABASE_URL as string) || process.env.PUBLIC_SUPABASE_URL as string,
    (import.meta.env.SUPABASE_SERVICE_KEY as string) || process.env.SUPABASE_SERVICE_KEY as string
  );

  const { data, error } = await supabase
    .from('glossaire_contributions')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) return json({ error: error.message }, 500);
  return json({ contributions: data || [] });
};

// PATCH: validate or reject a contribution
export const PATCH: APIRoute = async ({ request }) => {
  const authHeader = request.headers.get('Authorization') || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token || !(await isAdminUser(token))) return json({ error: 'Non autorisé.' }, 403);

  const { id, statut } = await request.json();
  if (!id || !['valide', 'rejete', 'en_attente'].includes(statut)) {
    return json({ error: 'Paramètres invalides.' }, 400);
  }

  const supabase = createClient(
    (import.meta.env.PUBLIC_SUPABASE_URL as string) || process.env.PUBLIC_SUPABASE_URL as string,
    (import.meta.env.SUPABASE_SERVICE_KEY as string) || process.env.SUPABASE_SERVICE_KEY as string
  );

  const { error } = await supabase.from('glossaire_contributions').update({ statut }).eq('id', id);
  if (error) return json({ error: error.message }, 500);
  return json({ success: true });
};

export const ALL: APIRoute = async () =>
  new Response(JSON.stringify({ error: 'Méthode non autorisée.' }), { status: 405, headers: { 'content-type': 'application/json' } });
