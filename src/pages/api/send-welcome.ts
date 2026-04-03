import type { APIRoute } from 'astro';
import { sendWelcomeEmail } from '../../lib/email';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email, firstName } = await request.json();
    if (!email || typeof email !== 'string') {
      return new Response(JSON.stringify({ ok: false }), { status: 400 });
    }
    await sendWelcomeEmail(email, firstName || undefined);
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'content-type': 'application/json' } });
  } catch {
    return new Response(JSON.stringify({ ok: false }), { status: 500 });
  }
};
