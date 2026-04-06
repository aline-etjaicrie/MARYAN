import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

export const prerender = false;

const SUPABASE_URL = (import.meta.env.PUBLIC_SUPABASE_URL as string) || (process.env.PUBLIC_SUPABASE_URL as string);
const SUPABASE_SERVICE_KEY =
  (import.meta.env.SUPABASE_SERVICE_KEY as string) || (process.env.SUPABASE_SERVICE_KEY as string);

const VALID_SLUGS = new Set([
  'style-decision',
  'posture-conflit',
  'travail-equipe',
  'deliberation',
  'prise-de-parole'
]);

function json(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' }
  });
}

export const POST: APIRoute = async ({ request }) => {
  const auth = request.headers.get('Authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return json({ error: 'Non authentifié.' }, 401);

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    return json({ error: 'Configuration serveur manquante.' }, 500);
  }

  let body: { test_slug?: unknown; level?: unknown; score?: unknown } | null = null;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Format JSON invalide.' }, 400);
  }

  const testSlug = typeof body?.test_slug === 'string' ? body.test_slug.trim() : null;
  const level = typeof body?.level === 'string' ? body.level.trim() : null;
  const score = typeof body?.score === 'number' ? Math.round(body.score) : null;

  if (!testSlug || !VALID_SLUGS.has(testSlug)) {
    return json({ error: 'test_slug invalide.' }, 400);
  }
  if (!level) {
    return json({ error: 'level manquant.' }, 400);
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);
  if (authError || !user) return json({ error: 'Token invalide.' }, 401);

  // Supprimer l'entrée existante pour cet utilisateur + ce test
  await supabase
    .from('test_results')
    .delete()
    .eq('user_id', user.id)
    .eq('test_slug', testSlug);

  const { error: insertError } = await supabase
    .from('test_results')
    .insert({ user_id: user.id, test_slug: testSlug, level, score });

  if (insertError) {
    console.error('[save-test-result] insert failed:', insertError);
    return json({ error: 'Impossible de sauvegarder le résultat.' }, 500);
  }

  return json({ ok: true });
};

export const ALL: APIRoute = async () => json({ error: 'Méthode non autorisée.' }, 405);
