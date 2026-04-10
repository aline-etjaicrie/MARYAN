import type { APIRoute } from 'astro';
import { createHmac, randomUUID } from 'crypto';
import {
  buildAgentPrimingMessage,
  buildSystemPrompt,
  inferMaryanSituationMode,
  FREE_LIMIT,
  type MaryanProfile,
  type MaryanSituationMode
} from '../../features/copilote-maryan/config';
import { maryanResources } from '../../data/resources';
import type { MaryanResource } from '../../data/types';

function buildResourcesCatalog(resources: MaryanResource[]): string {
  return resources
    .map(r => `- ${r.slug} | ${r.title}`)
    .join('\n');
}

interface CopilotMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface CopilotRequestBody {
  profile?: MaryanProfile | null;
  messages?: CopilotMessage[];
  mode?: MaryanSituationMode | string;
  message?: string;
  _overrideSystemPrompt?: string;
  sessionToken?: string;
}

// SESSION LIMIT (signed HMAC token — stateless, server-enforced)
const SESSION_LIMIT_SECRET =
  (import.meta.env.MARYAN_SESSION_SECRET as string) ||
  (process.env.MARYAN_SESSION_SECRET as string) ||
  'maryan-session-limit-v1';

function encodeSessionToken(count: number, id: string): string {
  const sig = createHmac('sha256', SESSION_LIMIT_SECRET)
    .update(`${count}:${id}`)
    .digest('hex')
    .slice(0, 24);
  return Buffer.from(JSON.stringify({ count, id, sig })).toString('base64');
}

function decodeSessionToken(token: string): { count: number; id: string } | null {
  try {
    const obj = JSON.parse(Buffer.from(token, 'base64').toString()) as Record<string, unknown>;
    if (typeof obj.count !== 'number' || typeof obj.id !== 'string' || typeof obj.sig !== 'string') return null;
    const expected = createHmac('sha256', SESSION_LIMIT_SECRET)
      .update(`${obj.count}:${obj.id}`)
      .digest('hex')
      .slice(0, 24);
    if (expected !== obj.sig) return null;
    return { count: obj.count, id: obj.id };
  } catch {
    return null;
  }
}

// MISTRAL API ENDPOINTS
const MISTRAL_AGENTS_URL = 'https://api.mistral.ai/v1/agents/completions';
const MISTRAL_CHAT_URL = 'https://api.mistral.ai/v1/chat/completions';
const DEFAULT_MODEL = 'mistral-large-latest';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const apiKey = (import.meta.env.MISTRAL_API_KEY as string) || (process.env.MISTRAL_API_KEY as string);
  const agentId = (import.meta.env.MISTRAL_AGENT_ID as string) || (process.env.MISTRAL_AGENT_ID as string);
  const model =
    (import.meta.env.MISTRAL_MODEL as string) ||
    (process.env.MISTRAL_MODEL as string) ||
    DEFAULT_MODEL;

  if (!apiKey) {
    return json({ error: 'Configuration MISTRAL_API_KEY manquante sur Vercel.' }, 503);
  }

  let body: CopilotRequestBody | null;
  try {
    body = (await request.json().catch(() => null)) as CopilotRequestBody | null;
  } catch (e) {
    return json({ error: 'Format JSON invalide.' }, 400);
  }

  const profile = body?.profile || null;
  const messages = Array.isArray(body?.messages) ? body.messages.filter(isCopilotMessage) : [];
  const latestUserMessage =
    typeof body?.message === 'string' && body.message.trim()
      ? body.message.trim()
      : [...messages].reverse().find((message) => message.role === 'user')?.content || '';
  const resolvedMode = inferMaryanSituationMode(latestUserMessage, profile);

  if (!messages.length) {
    return json({ error: 'Aucun message à traiter.' }, 400);
  }

  // Vérification serveur de la limite de session
  const isPlusUser = typeof profile?.plan === 'string' && profile.plan.toLowerCase().includes('plus');
  let newSessionToken: string | null = null;

  if (!isPlusUser) {
    const rawToken = typeof body?.sessionToken === 'string' ? body.sessionToken.trim() : '';
    const session = rawToken ? decodeSessionToken(rawToken) : null;
    const currentCount = session?.count ?? 0;

    if (currentCount >= FREE_LIMIT) {
      return json({ error: 'Limite de messages atteinte.', paywallTriggered: true }, 402);
    }

    newSessionToken = encodeSessionToken(currentCount + 1, session?.id ?? randomUUID());
  }

  try {
    const isAgentMode = !!agentId;
    const url = isAgentMode ? MISTRAL_AGENTS_URL : MISTRAL_CHAT_URL;
    const overrideSystemPrompt = body?._overrideSystemPrompt || null;

    const systemPrompt = (!overrideSystemPrompt && !isAgentMode)
      ? buildSystemPrompt(profile, body?.mode || resolvedMode, latestUserMessage, buildResourcesCatalog(maryanResources))
      : '';

    const baseMessages = overrideSystemPrompt
      ? [{ role: 'system' as const, content: overrideSystemPrompt }, ...messages]
      : isAgentMode
        ? [
            {
              role: 'user' as const,
              content: buildAgentPrimingMessage(profile, body?.mode, latestUserMessage)
            },
            ...messages
          ]
        : [
            {
              role: 'system' as const,
              content: systemPrompt
            },
            ...messages
          ];

    const payload = isAgentMode
      ? {
          agent_id: agentId,
          messages: baseMessages,
          max_tokens: 800,
          temperature: 0.35,
          stream: true
        }
      : {
          model,
          messages: baseMessages,
          max_tokens: 800,
          temperature: 0.35,
          stream: true
        };

    const upstream = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    });

    if (!upstream.ok) {
      const errData = (await upstream.json().catch(() => ({}))) as Record<string, any>;
      const apiError = errData?.message || errData?.error?.message || "Le moteur Mistral n'a pas pu répondre.";
      return json({ error: apiError }, upstream.status);
    }

    const responseHeaders: Record<string, string> = {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'X-Accel-Buffering': 'no'
    };
    if (newSessionToken) {
      responseHeaders['X-Session-Token'] = newSessionToken;
    }

    return new Response(upstream.body, { status: 200, headers: responseHeaders });
  } catch (e: any) {
    return json({ error: `Erreur de connexion : ${e.message}` }, 500);
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

function json(payload: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store'
    }
  });
}
