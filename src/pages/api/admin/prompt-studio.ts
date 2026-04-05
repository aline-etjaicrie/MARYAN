import type { APIRoute } from 'astro';
import { isAdminUser } from '../../../lib/admin';
import { getMaryanPromptStudioBootstrap } from '../../../lib/prompt-studio';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const authHeader = request.headers.get('Authorization') || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token || !(await isAdminUser(token))) {
    return json({ error: 'Non autorisé.' }, 403);
  }

  return json(getMaryanPromptStudioBootstrap());
};

function json(payload: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'content-type': 'application/json' }
  });
}

export const ALL: APIRoute = async () =>
  new Response(JSON.stringify({ error: 'Méthode non autorisée.' }), {
    status: 405,
    headers: { 'content-type': 'application/json' }
  });
