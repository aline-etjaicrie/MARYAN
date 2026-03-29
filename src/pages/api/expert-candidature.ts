// src/pages/api/expert-candidature.ts
import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json().catch(() => null);

  if (!body) {
    return new Response(JSON.stringify({ error: 'Format invalide.' }), { status: 400 });
  }

  const { nom, email, domaine, linkedin, message } = body;

  if (!nom?.trim() || !email?.trim() || !domaine?.trim() || !message?.trim()) {
    return new Response(JSON.stringify({ error: 'Champs obligatoires manquants.' }), { status: 400 });
  }

  const supabase = createClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { error } = await supabase
    .from('expert_candidatures')
    .insert({
      nom: nom.trim(),
      email: email.trim(),
      domaine,
      linkedin: linkedin?.trim() || null,
      message: message.trim(),
      statut: 'en_attente',
    });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
