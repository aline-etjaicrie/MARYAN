import type { APIRoute } from 'astro';
import { buildSystemPrompt, type MaryanProfile } from '../../features/copilote-maryan/config';

interface CopilotMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface CopilotRequestBody {
  profile?: MaryanProfile | null;
  messages?: CopilotMessage[];
  mode?: string;
}

// MISTRAL API ENDPOINTS
const MISTRAL_AGENTS_URL = 'https://api.mistral.ai/v1/agents/completions';
const MISTRAL_CHAT_URL = 'https://api.mistral.ai/v1/chat/completions';
const DEFAULT_MODEL = 'mistral-large-latest';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const apiKey = (import.meta.env.MISTRAL_API_KEY as string) || (process.env.MISTRAL_API_KEY as string);
  const agentId = (import.meta.env.MISTRAL_AGENT_ID as string) || (process.env.MISTRAL_AGENT_ID as string);

  if (!apiKey) {
    return json(
      {
        error: 'Configuration MISTRAL_API_KEY manquante sur Vercel.'
      },
      503
    );
  }

  let body: CopilotRequestBody | null;
  try {
    body = (await request.json().catch(() => null)) as CopilotRequestBody | null;
  } catch (e) {
    return json({ error: 'Format JSON invalide.' }, 400);
  }

  const profile = body?.profile || null;
  const messages = Array.isArray(body?.messages) ? body.messages.filter(isCopilotMessage) : [];

  if (!messages.length) {
    return json({ error: 'Aucun message à traiter.' }, 400);
  }

  try {
    const isAgentMode = !!agentId;
    const url = isAgentMode ? MISTRAL_AGENTS_URL : MISTRAL_CHAT_URL;

    // Build Payload for Mistral
    const payload = isAgentMode 
      ? {
          agent_id: agentId,
          messages: messages
        }
      : {
          model: DEFAULT_MODEL,
          messages: [
            { role: 'system', content: buildSystemPrompt(profile, body?.mode) },
            ...messages
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

    const data = (await upstream.json().catch(() => ({ }))) as any;

    if (!upstream.ok) {
      const apiError = data?.message || data?.error?.message || 'Le moteur Mistral n’a pas pu répondre.';
      return json({ error: apiError }, upstream.status);
    }

    const reply = data?.choices?.[0]?.message?.content || '';

    return json({
      reply: reply || 'Je n’ai pas pu générer de réponse. Vérifiez votre Agent ID.'
    });
  } catch (e: any) {
    return json(
      {
        error: `Erreur de connexion : ${e.message}`
      },
      500
    );
  }
};

export const ALL: APIRoute = async () => json({ error: 'Méthode non autorisée.' }, 405);

function isCopilotMessage(value: unknown): value is CopilotMessage {
  if (!value || typeof value !== 'object') return false;
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
