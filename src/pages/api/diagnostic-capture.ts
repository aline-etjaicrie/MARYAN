import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    
    // Log pour le suivi (visible dans les logs Vercel)
    console.log('[MARYAN_DIAG]', JSON.stringify({
      submitted_at: body.submitted_at || new Date().toISOString(),
      has_email: body.has_email || false,
      scores: body.scores || {},
      answers: body.answers || {},
    }));

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false }), { status: 200 });
  }
};
