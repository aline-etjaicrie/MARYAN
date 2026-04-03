import type { APIRoute } from 'astro';
import { sendNewsletterNotification } from '../../lib/email';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  // Simple secret key protection
  const authHeader = request.headers.get('Authorization') || '';
  const secret = (import.meta.env.NOTIFY_SECRET as string) || (process.env.NOTIFY_SECRET as string);

  if (!secret || authHeader !== `Bearer ${secret}`) {
    return new Response(JSON.stringify({ error: 'Non autorisé.' }), { status: 403, headers: { 'content-type': 'application/json' } });
  }

  const { type, title, slug, description } = await request.json();
  if (!type || !title || !slug) {
    return new Response(JSON.stringify({ error: 'Paramètres manquants.' }), { status: 400, headers: { 'content-type': 'application/json' } });
  }

  await sendNewsletterNotification({ type, title, slug, description });
  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'content-type': 'application/json' } });
};
