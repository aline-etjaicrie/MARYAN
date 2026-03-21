
import { buildSystemPrompt } from '../../features/copilote-maryan/config';

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';
const DEFAULT_MODEL = 'claude-3-sonnet-20240229';

export const prerender = false;

export const POST = async ({ request }) => {
  const apiKey = (import.meta.env.ANTHROPIC_API_KEY) || (process.env.ANTHROPIC_API_KEY);

  if (!apiKey) {
    return json(
      {
        error:
          'Le copilote réel n’est pas configuré. Ajoutez ANTHROPIC_API_KEY dans .env en local et dans les variables d’environnement Vercel.'
      },
      503
    );
  }

  const body = (await request.json().catch(() => null));
  const profile = body?.profile || null;
  const messages = Array.isArray(body?.messages) ? body.messages : [];

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
        model: (import.meta.env.ANTHROPIC_MODEL) || (process.env.ANTHROPIC_MODEL) || DEFAULT_MODEL,
        max_tokens: 1000,
        temperature: 0.5,
        system: buildSystemPrompt(profile),
        messages
      })
    });

    const data = await upstream.json().catch(() => ({}));

    if (!upstream.ok) {
      const apiError = data?.error?.message || 'Le modèle n’a pas pu produire de réponse.';
      return json({ error: apiError }, upstream.status);
    }

    const reply = Array.isArray(data?.content)
      ? data.content
          .filter(item => item.type === 'text')
          .map(item => item.text)
          .join('\n\n')
      : '';

    return json({
      reply: reply || 'Je n’ai pas pu générer de réponse exploitable.'
    });
  } catch (e) {
    return json(
      {
        error: 'Le copilote a rencontré une erreur.'
      },
      500
    );
  }
};

export const ALL = async () => json({ error: 'Méthode non autorisée.' }, 405);

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store'
    }
  });
}
