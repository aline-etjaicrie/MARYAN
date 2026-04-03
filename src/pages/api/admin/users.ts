import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { isAdminUser } from '../../../lib/admin';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const authHeader = request.headers.get('Authorization') || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token || !(await isAdminUser(token))) {
    return json({ error: 'Non autorisé.' }, 403);
  }

  const supabaseUrl = (import.meta.env.PUBLIC_SUPABASE_URL as string) || process.env.PUBLIC_SUPABASE_URL as string;
  const serviceKey = (import.meta.env.SUPABASE_SERVICE_KEY as string) || process.env.SUPABASE_SERVICE_KEY as string;
  const supabase = createClient(supabaseUrl, serviceKey);

  // Get profiles with usage stats
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('id, first_name, commune, role, diagnostic_key, diagnostic_label, plan, parti_id, parti_label, created_at')
    .order('created_at', { ascending: false })
    .limit(100);

  if (error) return json({ error: error.message }, 500);

  // Get session counts per user
  const { data: sessionCounts } = await supabase
    .from('copilote_sessions')
    .select('user_id')
    .in('user_id', (profiles || []).map(p => p.id));

  const countMap: Record<string, number> = {};
  (sessionCounts || []).forEach(s => {
    countMap[s.user_id] = (countMap[s.user_id] || 0) + 1;
  });

  const enriched = (profiles || []).map(p => ({
    ...p,
    session_count: countMap[p.id] || 0
  }));

  return json({ users: enriched });
};

export const PATCH: APIRoute = async ({ request }) => {
  const authHeader = request.headers.get('Authorization') || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token || !(await isAdminUser(token))) {
    return json({ error: 'Non autorisé.' }, 403);
  }

  const { user_id, plan } = await request.json();
  if (!user_id || !plan || !['gratuit', 'plus', 'admin'].includes(plan)) {
    return json({ error: 'Paramètres invalides.' }, 400);
  }

  const supabaseUrl = (import.meta.env.PUBLIC_SUPABASE_URL as string) || process.env.PUBLIC_SUPABASE_URL as string;
  const serviceKey = (import.meta.env.SUPABASE_SERVICE_KEY as string) || process.env.SUPABASE_SERVICE_KEY as string;
  const supabase = createClient(supabaseUrl, serviceKey);

  const { error } = await supabase.from('profiles').update({ plan }).eq('id', user_id);
  if (error) return json({ error: error.message }, 500);
  return json({ success: true });
};

function json(payload: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'content-type': 'application/json' }
  });
}

export const ALL: APIRoute = async () =>
  new Response(JSON.stringify({ error: 'Méthode non autorisée.' }), { status: 405, headers: { 'content-type': 'application/json' } });
