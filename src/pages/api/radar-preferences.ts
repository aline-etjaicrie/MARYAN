import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { ensureProfileRecord } from '../../lib/profiles';

export const prerender = false;

const SUPABASE_URL = (import.meta.env.PUBLIC_SUPABASE_URL as string) || (process.env.PUBLIC_SUPABASE_URL as string);
const SUPABASE_SERVICE_KEY = (import.meta.env.SUPABASE_SERVICE_KEY as string) || (process.env.SUPABASE_SERVICE_KEY as string);

type RadarFrequency = 'quotidien' | 'hebdomadaire' | 'aucun';

function json(payload: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store'
    }
  });
}

function isRadarFrequency(value: unknown): value is RadarFrequency {
  return value === 'quotidien' || value === 'hebdomadaire' || value === 'aucun';
}

async function getAuthenticatedUser(request: Request) {
  const authHeader = request.headers.get('Authorization') || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token || !SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    return { error: json({ error: 'Non authentifié.' }, 401) };
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    return { error: json({ error: 'Token invalide.' }, 401) };
  }

  return { supabase, user };
}

export const GET: APIRoute = async ({ request }) => {
  const auth = await getAuthenticatedUser(request);
  if (auth.error) return auth.error;

  const { supabase, user } = auth;

  try {
    await ensureProfileRecord(supabase, user);

    const { data, error } = await supabase
      .from('profiles')
      .select('radar_email_frequency, radar_email_updated_at')
      .eq('id', user.id)
      .single();

    if (error) throw error;

    return json({
      ok: true,
      frequency: isRadarFrequency(data?.radar_email_frequency) ? data.radar_email_frequency : 'aucun',
      updatedAt: data?.radar_email_updated_at || null
    });
  } catch (error) {
    console.error('[radar-preferences] GET failed:', error);
    return json({ ok: false, error: 'Lecture impossible.' }, 500);
  }
};

export const PATCH: APIRoute = async ({ request }) => {
  const auth = await getAuthenticatedUser(request);
  if (auth.error) return auth.error;

  const { supabase, user } = auth;

  let body: { frequency?: unknown } | null = null;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Format JSON invalide.' }, 400);
  }

  if (!isRadarFrequency(body?.frequency)) {
    return json({ error: 'Fréquence invalide.' }, 400);
  }

  try {
    await ensureProfileRecord(supabase, user);

    const { error } = await supabase
      .from('profiles')
      .update({
        radar_email_frequency: body.frequency,
        radar_email_updated_at: new Date().toISOString()
      })
      .eq('id', user.id);

    if (error) throw error;

    return json({
      ok: true,
      frequency: body.frequency
    });
  } catch (error) {
    console.error('[radar-preferences] PATCH failed:', error);
    return json({ ok: false, error: 'Mise à jour impossible.' }, 500);
  }
};

export const ALL: APIRoute = async () => json({ error: 'Méthode non autorisée.' }, 405);
