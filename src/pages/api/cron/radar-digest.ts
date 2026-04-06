import type { APIRoute } from 'astro';
import {
  isAuthorizedRadarDigestRequest,
  type RadarDigestFrequency
} from '../../../lib/radar-digest';

export const prerender = false;
const RADAR_DIGEST_ENABLED = false;

function json(payload: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store'
    }
  });
}

function resolveFrequency(rawValue: string | null): RadarDigestFrequency | null {
  if (rawValue === 'quotidien' || rawValue === 'daily') return 'quotidien';
  if (rawValue === 'hebdomadaire' || rawValue === 'weekly') return 'hebdomadaire';
  return null;
}

export const GET: APIRoute = async ({ request, url }) => {
  if (!isAuthorizedRadarDigestRequest(request)) {
    return json({ ok: false, error: 'Non autorisé.' }, 401);
  }

  const frequency = resolveFrequency(url.searchParams.get('frequency'));
  if (!frequency) {
    return json({ ok: false, error: 'Fréquence invalide.' }, 400);
  }

  if (!RADAR_DIGEST_ENABLED) {
    return json({
      ok: true,
      frequency,
      skipped: true,
      reason: 'radar_coming_soon'
    });
  }

  return json({ ok: false, error: 'Envoi impossible.' }, 500);
};

export const ALL: APIRoute = async () => json({ error: 'Méthode non autorisée.' }, 405);
