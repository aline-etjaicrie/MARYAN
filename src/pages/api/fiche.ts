export const prerender = false;

import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
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

  const SUPABASE_URL =
    (import.meta.env.PUBLIC_SUPABASE_URL as string) ||
    (process.env.PUBLIC_SUPABASE_URL as string);
  const SUPABASE_SERVICE_KEY =
    (import.meta.env.SUPABASE_SERVICE_KEY as string) ||
    (process.env.SUPABASE_SERVICE_KEY as string);

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    return new Response(JSON.stringify({ error: 'Server auth unavailable' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let plan: string | undefined;
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('plan')
      .eq('id', user.id)
      .single();

    plan = profile?.plan;
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
