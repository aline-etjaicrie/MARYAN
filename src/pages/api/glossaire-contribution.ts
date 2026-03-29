// src/pages/api/glossaire-contribution.ts
import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const supabase = createClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const body = await request.json();
  const { mot, pourquoi, alternative, user_id } = body;

  if (!mot || !pourquoi || !user_id) {
    return new Response(JSON.stringify({ error: 'Champs manquants' }), { status: 400 });
  }

  const { error } = await supabase
    .from('glossaire_contributions')
    .insert({ mot, pourquoi, alternative, user_id, statut: 'en_attente' });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
