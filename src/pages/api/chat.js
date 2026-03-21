
import { buildSystemPrompt } from '../../features/copilote-maryan/config';

// MISTRAL API INTEGRATION (AGENTS OR CHAT)
const MISTRAL_URL = 'https://api.mistral.ai/v1/agents/completions';
const MISTRAL_CHAT_URL = 'https://api.mistral.ai/v1/chat/completions';
const DEFAULT_MODEL = 'mistral-large-latest';

export const prerender = false;

export const POST = async ({ request }) => {
  const apiKey = (import.meta.env.MISTRAL_API_KEY) || (process.env.MISTRAL_API_KEY);
  const agentId = (import.meta.env.MISTRAL_AGENT_ID) || (process.env.MISTRAL_AGENT_ID);

  if (!apiKey) {
    return json({ error: 'MISTRAL_API_KEY manquante. Veuillez la configurer sur Vercel.' }, 503);
  }

  let body;
  try {
    body = await request.json();
  } catch (e) {
    return json({ error: 'Format JSON invalide.' }, 400);
  }

  const profile = body?.profile || null;
  const messages = Array.isArray(body?.messages) ? body.messages : [];

  if (!messages.length) {
    return json({ error: 'Aucun message.' }, 400);
  }

  const cleanMessages = messages.map(msg => ({
    role: msg.role === 'assistant' ? 'assistant' : 'user',
    content: msg.content || ''
  }));

  try {
    const isAgent = !!agentId;
    const url = isAgent ? MISTRAL_URL : MISTRAL_CHAT_URL;
    
    const payload = isAgent 
      ? { agent_id: agentId, messages: cleanMessages }
      : { 
          model: DEFAULT_MODEL, 
          messages: [
            { role: 'system', content: buildSystemPrompt(profile) },
            ...cleanMessages
          ]
        };

    const upstream = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    });

    const data = await upstream.json().catch(() => ({}));

    if (!upstream.ok) {
      const apiError = data?.message || data?.error?.message || 'Erreur Mistral AI.';
      return json({ error: `Mistral Error: ${apiError}` }, upstream.status);
    }

    const reply = data?.choices?.[0]?.message?.content || '';

    return json({
      reply: reply || "Mistral n'a pas pu formuler de réponse. Vérifiez votre Agent ID."
    });
  } catch (e) {
    return json({ error: `Erreur interne : ${e.message}` }, 500);
  }
};

export const ALL = async () => json({ error: 'Méthode non autorisée.' }, 405);

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  });
}
