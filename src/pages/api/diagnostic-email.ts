import type { APIRoute } from 'astro';
import { isEmailSendingAvailable, sendDiagnosticSummaryEmail } from '../../lib/email';
import { buildDiagnosticState } from '../../lib/user-personalization';

export const prerender = false;

function json(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store'
    }
  });
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export const POST: APIRoute = async ({ request }) => {
  let body: { email?: unknown; diagnosticState?: unknown } | null = null;

  try {
    body = (await request.json()) as { email?: unknown; diagnosticState?: unknown };
  } catch {
    return json({ error: 'Format JSON invalide.' }, 400);
  }

  const email = typeof body?.email === 'string' ? body.email.trim() : '';
  if (!email || !isValidEmail(email)) {
    return json({ error: 'Adresse email invalide.' }, 400);
  }

  const diagnosticState = buildDiagnosticState(body?.diagnosticState);
  if (!diagnosticState?.diagnostic_key) {
    return json({ error: 'Diagnostic incomplet.' }, 400);
  }

  if (!isEmailSendingAvailable()) {
    return json({ error: "L'envoi d'email n'est pas configuré pour le moment." }, 503);
  }

  await sendDiagnosticSummaryEmail(email, diagnosticState);

  return json({ ok: true });
};

export const ALL: APIRoute = async () => json({ error: 'Méthode non autorisée.' }, 405);
