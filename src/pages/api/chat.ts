import type { APIRoute } from 'astro';
import {
  buildAgentPrimingMessage,
  buildSystemPrompt,
  inferMaryanSituationMode,
  type MaryanProfile,
  type MaryanSituationMode
} from '../../features/copilote-maryan/config';
import { maryanResources } from '../../data/resources';
import type { DiagnosticProfile, MaryanResource } from '../../data/types';

interface CopilotMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface CopilotRequestBody {
  profile?: MaryanProfile | null;
  messages?: CopilotMessage[];
  mode?: MaryanSituationMode | string;
  message?: string;
}

interface SuggestedResource {
  title: string;
  slug: string;
  promise: string;
}

interface CompletionResult {
  reply: string;
  finishReason: string | null;
}

// MISTRAL API ENDPOINTS
const MISTRAL_AGENTS_URL = 'https://api.mistral.ai/v1/agents/completions';
const MISTRAL_CHAT_URL = 'https://api.mistral.ai/v1/chat/completions';
const DEFAULT_MODEL = 'mistral-large-latest';
const CONTINUATION_PROMPT =
  "Continuez uniquement à partir du dernier mot, sans répéter le début. Terminez proprement la section en cours. Si nécessaire, ajoutez seulement un bloc « Bon réflexe » très court.";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const apiKey = (import.meta.env.MISTRAL_API_KEY as string) || (process.env.MISTRAL_API_KEY as string);
  const agentId = (import.meta.env.MISTRAL_AGENT_ID as string) || (process.env.MISTRAL_AGENT_ID as string);
  const model =
    (import.meta.env.MISTRAL_MODEL as string) ||
    (process.env.MISTRAL_MODEL as string) ||
    DEFAULT_MODEL;

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
  const latestUserMessage =
    typeof body?.message === 'string' && body.message.trim()
      ? body.message.trim()
      : [...messages].reverse().find((message) => message.role === 'user')?.content || '';
  const resolvedMode = inferMaryanSituationMode(latestUserMessage, profile);

  if (!messages.length) {
    return json({ error: 'Aucun message à traiter.' }, 400);
  }

  const fichesDisponibles = maryanResources
    .map(r => `- ${r.slug} : ${r.title}`)
    .join('\n');

  const resourcesSection = `## Ressources à suggérer\n\nVoici la liste exhaustive des fiches disponibles dans MARYAN :\n${fichesDisponibles}\n\nRègles strictes :\n- Tu ne peux suggérer QUE des fiches de cette liste\n- Tu ne suggères une fiche que si son titre correspond directement et précisément au sujet de la question posée\n- Maximum 2 fiches par réponse\n- Si aucune fiche ne correspond exactement : ne suggère rien\n- Ne jamais inventer un slug ou un titre qui n'est pas dans la liste`;

  try {
    const isAgentMode = !!agentId;
    const url = isAgentMode ? MISTRAL_AGENTS_URL : MISTRAL_CHAT_URL;
    const baseMessages = isAgentMode
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
            content: buildSystemPrompt(profile, body?.mode || resolvedMode, latestUserMessage) + '\n\n' + resourcesSection
          },
          ...messages
        ];

    const basePayload = isAgentMode
      ? {
          agent_id: agentId,
          messages: baseMessages,
          max_tokens: 460,
          temperature: 0.35
        }
      : {
          model,
          messages: baseMessages,
          max_tokens: 460,
          temperature: 0.35
        };

    const firstPass = await requestCompletion(url, apiKey, basePayload);
    let reply = firstPass.reply || 'Je n’ai pas pu générer de réponse utile pour le moment.';

    if (shouldContinueReply(reply, firstPass.finishReason)) {
      const continuationPayload = isAgentMode
        ? {
            agent_id: agentId,
            messages: [
              ...baseMessages,
              { role: 'assistant' as const, content: reply },
              { role: 'user' as const, content: CONTINUATION_PROMPT }
            ],
            max_tokens: 180,
            temperature: 0.2
          }
        : {
            model,
            messages: [
              ...baseMessages,
              { role: 'assistant' as const, content: reply },
              { role: 'user' as const, content: CONTINUATION_PROMPT }
            ],
            max_tokens: 180,
            temperature: 0.2
          };

      const continuation = await requestCompletion(url, apiKey, continuationPayload);
      reply = mergeReplyParts(reply, continuation.reply);
    }

    return json({
      reply,
      resources: getSuggestedResources(latestUserMessage, profile, resolvedMode),
      detectedMode: resolvedMode
    });
  } catch (e: any) {
    const status = typeof e?.status === 'number' ? e.status : 500;
    return json(
      {
        error: `Erreur de connexion : ${e.message}`
      },
      status
    );
  }
};

export const ALL: APIRoute = async () => json({ error: 'Méthode non autorisée.' }, 405);

async function requestCompletion(
  url: string,
  apiKey: string,
  payload: Record<string, unknown>
): Promise<CompletionResult> {
  const upstream = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(payload)
  });

  const data = (await upstream.json().catch(() => ({}))) as Record<string, any>;

  if (!upstream.ok) {
    const apiError = data?.message || data?.error?.message || 'Le moteur Mistral n’a pas pu répondre.';
    const error = new Error(apiError);
    (error as Error & { status?: number }).status = upstream.status;
    throw error;
  }

  return {
    reply: extractReply(data),
    finishReason: extractFinishReason(data)
  };
}

function isCopilotMessage(value: unknown): value is CopilotMessage {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as { role?: unknown; content?: unknown };
  return (
    (candidate.role === 'user' || candidate.role === 'assistant') &&
    typeof candidate.content === 'string' &&
    candidate.content.trim().length > 0
  );
}

function extractReply(data: Record<string, any>): string {
  const content = data?.choices?.[0]?.message?.content;

  if (typeof content === 'string') {
    return content.trim();
  }

  if (Array.isArray(content)) {
    return content
      .map((item) => {
        if (typeof item === 'string') return item;
        if (item && typeof item.text === 'string') return item.text;
        if (item && typeof item.content === 'string') return item.content;
        return '';
      })
      .join('\n')
      .trim();
  }

  if (content && typeof content.text === 'string') {
    return content.text.trim();
  }

  return '';
}

function extractFinishReason(data: Record<string, any>): string | null {
  const finishReason = data?.choices?.[0]?.finish_reason;
  return typeof finishReason === 'string' ? finishReason : null;
}

function shouldContinueReply(reply: string, finishReason: string | null): boolean {
  const trimmed = reply.trim();
  if (!trimmed) return false;

  const normalized = normalizeText(trimmed);
  if (finishReason && !['stop', 'eos', 'eos_token'].includes(finishReason)) {
    return true;
  }

  if (/(bon reflexe|a retenir|faites maintenant)\s*:?\s*$/i.test(normalized)) {
    return true;
  }

  return /\b(a|a la|a l|au|aux|avec|ce|cet|cette|dans|de|des|du|d|en|et|la|le|les|ou|par|pour|que|qui|sur|un|une)\s*$/i.test(
    normalized
  );
}

function mergeReplyParts(initialReply: string, continuationReply: string): string {
  const first = initialReply.trimEnd();
  const second = continuationReply.trim();

  if (!second) return first;

  const normalizedFirst = normalizeText(first);
  const normalizedSecond = normalizeText(second);
  if (normalizedSecond && normalizedFirst.endsWith(normalizedSecond)) {
    return first;
  }

  const compactJoin = /\b(a|a la|a l|au|aux|avec|ce|cet|cette|dans|de|des|du|d|en|et|la|le|les|ou|par|pour|que|qui|sur|un|une)\s*$/i.test(
    normalizeText(first)
  );
  const separator = compactJoin ? ' ' : second.startsWith('Bon réflexe') || second.startsWith('Bon reflexe') ? '\n\n' : ' ';

  return `${first}${separator}${second}`.trim();
}

// Maps situation modes to likely diagnostic profiles for scoring boost
const MODE_TO_DIAGNOSTIC: Partial<Record<MaryanSituationMode, DiagnosticProfile[]>> = {
  prise_de_reperes: ['mandat_recent'],
  reprise_de_recul: ['surcharge'],
  arbitrage_cadrage: ['arbitrage'],
  lecture_de_tension: ['tension_relationnelle', 'isolement'],
  parole_exposition: ['exposition', 'prise_de_parole'],
  explication_pedagogique: ['besoin_methode', 'gouvernance']
};

function getSuggestedResources(
  latestUserMessage: string,
  profile: MaryanProfile | null,
  resolvedMode: MaryanSituationMode
): SuggestedResource[] {
  const corpus = [
    latestUserMessage,
    profile?.summary || '',
    profile?.themeLabel || '',
    ...(profile?.tags || []),
    resolvedMode.replaceAll('_', ' ')
  ].join(' ');

  const textTokens = new Set(tokenize(corpus));

  return maryanResources
    .map((resource) => {
      const tokenScore = getTokenScore(resource, textTokens);
      const totalScore = tokenScore > 0
        ? tokenScore + getMetaScore(resource, profile, resolvedMode)
        : 0;
      return { resource, score: totalScore };
    })
    .filter(({ score }) => score >= 3)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ resource }) => ({
      title: resource.title,
      slug: resource.slug,
      promise: resource.promise
    }));
}

// Generic tokens that match too broadly and should not count toward score
const GENERIC_TOKENS = new Set([
  'elu', 'elue', 'elus', 'elues', 'mandat', 'commune', 'local', 'politique',
  'votre', 'vous', 'votre', 'pour', 'dans', 'avec', 'sur', 'une', 'les', 'des'
]);

// Token overlap score only — a resource scoring 0 here is excluded entirely
function getTokenScore(resource: MaryanResource, textTokens: Set<string>): number {
  let score = 0;
  const candidates = [
    resource.title,
    resource.promise,
    ...resource.tags,
    ...resource.useCases
  ];
  for (const candidate of candidates) {
    const overlaps = tokenize(candidate).filter(
      (t) => textTokens.has(t) && !GENERIC_TOKENS.has(t)
    );
    if (overlaps.length) {
      score += Math.min(overlaps.length, candidate === resource.title ? 4 : 3);
    }
  }
  return score;
}

// Metadata boosts — only applied on top of a non-zero token score
function getMetaScore(
  resource: MaryanResource,
  profile: MaryanProfile | null,
  resolvedMode: MaryanSituationMode
): number {
  let score = resource.priority === 'haute' ? 1 : 0;
  if (profile?.key && resource.diagnosticProfiles.includes(profile.key as DiagnosticProfile)) {
    score += 3;
  }
  const modeProfiles = MODE_TO_DIAGNOSTIC[resolvedMode] || [];
  if (modeProfiles.some((p) => resource.diagnosticProfiles.includes(p))) {
    score += 1;
  }
  return score;
}

function tokenize(value: string): string[] {
  return normalizeText(value)
    .split(' ')
    .filter((token) => token.length > 2);
}

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9'\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
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
