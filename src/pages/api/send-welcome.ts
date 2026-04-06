import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { sendWelcomeEmail, addContactToAudience } from '../../lib/email';

export const prerender = false;

const SUPABASE_URL = (import.meta.env.PUBLIC_SUPABASE_URL as string) || (process.env.PUBLIC_SUPABASE_URL as string);
const SUPABASE_SERVICE_KEY = (import.meta.env.SUPABASE_SERVICE_KEY as string) || (process.env.SUPABASE_SERVICE_KEY as string);

export const POST: APIRoute = async ({ request }) => {
  try {
    const authHeader = request.headers.get('Authorization') || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token || !SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
      return new Response(JSON.stringify({ ok: false }), { status: 401, headers: { 'content-type': 'application/json' } });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
    const { data: { user } } = await supabase.auth.getUser(token);
    if (!user?.email) {
      return new Response(JSON.stringify({ ok: false }), { status: 401, headers: { 'content-type': 'application/json' } });
    }

    const { firstName } = await request.json();
    if (firstName !== undefined && typeof firstName !== 'string') {
      return new Response(JSON.stringify({ ok: false }), { status: 400 });
    }
    // Envoyer l'email de bienvenue ET ajouter à l'audience (en parallèle)
    await Promise.allSettled([
      sendWelcomeEmail(user.email, firstName || undefined),
      addContactToAudience(user.email, firstName || undefined),
    ]);
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'content-type': 'application/json' } });
  } catch {
    return new Response(JSON.stringify({ ok: false }), { status: 500 });
  }
};
