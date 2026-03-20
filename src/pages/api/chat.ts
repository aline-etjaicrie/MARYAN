import type { APIRoute } from 'astro';

import { buildSystemPrompt, type MaryanProfile } from '../../features/copilote-maryan/config';

interface CopilotMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface CopilotRequestBody {
  profile?: MaryanProfile | null;
  messages?: CopilotMessage[];
}

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';
const DEFAULT_MODEL = 'claude-sonnet-4-20250514';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return json(
      {
        error:
          'Le copilote réel n’est pas configuré. Ajoutez ANTHROPIC_API_KEY dans .env en local et dans les variables d’environnement Vercel.'
      },
      503
    );
  }

  const body = (await request.json().catch(() => null)) as CopilotRequestBody | null;
  const profile = body?.profile || null;
  const messages = Array.isArray(body?.messages) ? body.messages.filter(isCopilotMessage) : [];

  if (!messages.length) {
    return json({ error: 'Aucun message à traiter.' }, 400);
  }

  try {
    const upstream = await fetch(ANTHROPIC_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: import.meta.env.ANTHROPIC_MODEL || process.env.ANTHROPIC_MODEL || DEFAULT_MODEL,
        max_tokens: 1000,
        temperature: 0.5,
        system: buildSystemPrompt(profile),
        messages
      })
    });

    const data = await upstream.json().catch(() => ({}));

    if (!upstream.ok) {
      const apiError =
        typeof data?.error?.message === 'string'
          ? data.error.message
          : 'Le modèle n’a pas pu produire de réponse.';

      return json({ error: apiError }, upstream.status);
    }

    const reply = Array.isArray(data?.content)
      ? data.content
          .filter((item: unknown): item is { type: string; text: string } => {
            if (!item || typeof item !== 'object') {
              return false;
            }

            const candidate = item as { type?: unknown; text?: unknown };
            return candidate.type === 'text' && typeof candidate.text === 'string';
          })
          .map((item) => item.text)
          .join('\n\n')
      : '';

    return json({
      reply: reply || 'Je n’ai pas pu générer de réponse exploitable.'
    });
  } catch {
    return json(
      {
        error:
          'Le copilote a rencontré une erreur de connexion. Vérifiez la clé Anthropic et réessayez.'
      },
      500
    );
  }
};

export const ALL: APIRoute = async () => json({ error: 'Méthode non autorisée.' }, 405);

function isCopilotMessage(value: unknown): value is CopilotMessage {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as { role?: unknown; content?: unknown };
  return (
    (candidate.role === 'user' || candidate.role === 'assistant') &&
    typeof candidate.content === 'string' &&
    candidate.content.trim().length > 0
  );
}

function json(payload: Record<string, string>, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store'
    }
  });
}
