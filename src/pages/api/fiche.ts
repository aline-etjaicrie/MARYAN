export const prerender = false;

import type { APIRoute } from 'astro';
import { maryanResources } from '../../data/resources';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const slug = url.searchParams.get('slug');

  if (!slug) {
    return new Response(JSON.stringify({ error: 'Missing slug' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const resource = maryanResources.find((r) => r.slug === slug);

  if (!resource) {
    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.replace(/^Bearer\s+/, '');

  if (!token) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL as string;
  const SUPABASE_ANON_KEY = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string;

  let plan: string | undefined;
  try {
    const userRes = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        apikey: SUPABASE_ANON_KEY,
      },
    });

    if (!userRes.ok) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const user = await userRes.json();
    plan = user?.user_metadata?.plan;
  } catch {
    return new Response(JSON.stringify({ error: 'Auth error' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (plan !== 'plus' && plan !== 'admin') {
    return new Response(JSON.stringify({ error: 'Forbidden' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(
    JSON.stringify({
      understand: resource.understand,
      commonTrap: resource.commonTrap,
      actions: resource.actions,
      reflex: resource.reflex,
      sensitiveNote: resource.sensitiveNote ?? null,
      tags: resource.tags,
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};
