import type { APIRoute } from 'astro';

export const prerender = false;

function json(payload: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store'
    }
  });
}

export const GET: APIRoute = async () =>
  json(
    {
      ok: false,
      status: 'coming_soon',
      message: 'Le Radar de MARYAN est à venir.'
    },
    503
  );

export const ALL: APIRoute = async () => json({ error: 'Méthode non autorisée.' }, 405);
