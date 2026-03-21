
import { buildSystemPrompt } from '../../features/copilote-maryan/config';

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';
const DEFAULT_MODEL = 'claude-3-5-sonnet-20240620';

export const prerender = false;

export const POST = async ({ request }) => {
  // Try to get API key from both Astro.meta.env and process.env
  const apiKey = (import.meta.env.ANTHROPIC_API_KEY) || (process.env.ANTHROPIC_API_KEY);

  if (!apiKey) {
    console.error('MISSING_API_KEY: ANTHROPIC_API_KEY is not defined in environment variables.');
    return json(
      {
        error:
          'Configuration manquante : La clé API Anthropic n’est pas configurée.'
      },
      503
    );
  }

  let body;
  try {
    body = await request.json();
  } catch (e) {
    return json({ error: 'Format de requête JSON invalide.' }, 400);
  }

  const profile = body?.profile || null;
  const messages = Array.isArray(body?.messages) ? body.messages : [];

  if (!messages.length) {
    return json({ error: 'Aucun message à traiter.' }, 400);
  }

  // Ensure messages are properly formatted for Anthropic
  // They should be { role: 'user' | 'assistant', content: string }
  const cleanMessages = messages.map(msg => ({
    role: msg.role === 'assistant' ? 'assistant' : 'user',
    content: msg.content || ''
  }));

  try {
    const systemPrompt = buildSystemPrompt(profile);
    const model = (import.meta.env.ANTHROPIC_MODEL) || (process.env.ANTHROPIC_MODEL) || DEFAULT_MODEL;

    console.log(`Sending request to Anthropic model: ${model}`);

    const upstream = await fetch(ANTHROPIC_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model,
        max_tokens: 1500,
        temperature: 0.7,
        system: systemPrompt,
        messages: cleanMessages
      })
    });

    const data = await upstream.json().catch(() => ({}));

    if (!upstream.ok) {
      console.error('ANTHROPIC_API_ERROR:', JSON.stringify(data));
      const apiError = data?.error?.message || 'Erreur de communication avec le modèle IA.';
      return json({ error: `Anthropic Error: ${apiError}` }, upstream.status);
    }

    const reply = Array.isArray(data?.content)
      ? data.content
          .filter(item => item.type === 'text')
          .map(item => item.text)
          .join('\n\n')
      : '';

    if (!reply) {
      console.warn('EMPTY_REPLY: Anthropic returned an empty text content.');
    }

    return json({
      reply: reply || 'Je n’ai pas pu formuler de réponse. Pouvez-vous reformuler ?'
    });
  } catch (e) {
    console.error('SERVER_ERROR:', e);
    return json(
      {
        error: `Le copilote a rencontré une erreur technique : ${e.message}`
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
