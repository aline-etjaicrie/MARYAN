import type { APIRoute } from 'astro';
import {
  buildAgentPrimingMessage,
  buildSystemPrompt,
  inferMaryanSituationMode,
  type MaryanProfile,
  type MaryanSituationMode
} from '../../features/copilote-maryan/config';
import { maryanResources } from '../../data/resources';
import type { MaryanResource } from '../../data/types';

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

  try {
    const isAgentMode = !!agentId;
    const url = isAgentMode ? MISTRAL_AGENTS_URL : MISTRAL_CHAT_URL;
    const overrideSystemPrompt = body?._overrideSystemPrompt || null;

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
              content: buildSystemPrompt(profile, body?.mode || resolvedMode, latestUserMessage)
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
      resources: selectResourcesForMessage(latestUserMessage, maryanResources)
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

function normalizeUseCase(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '_')
    .trim();
}

function selectResourcesForMessage(
  userMessage: string,
  allResources: MaryanResource[]
): SuggestedResource[] {
  const msg = userMessage.toLowerCase();

  console.log('=== DEBUG MATCHING ===');
  console.log('Message:', msg.substring(0, 100));

  // Détection du domaine principal — ordre évalué de haut en bas, risk en priorité absolue
  const isRisk =
    msg.includes('conflit d\'intérêt') || msg.includes('conflit d intérêt') ||
    msg.includes('probité') || msg.includes('vss') ||
    msg.includes('harcèlement') || msg.includes('harcelement') ||
    msg.includes('pénal') || msg.includes('mise en cause') ||
    msg.includes('accusation') || msg.includes('accusé') ||
    msg.includes('signalement') || msg.includes('corruption') ||
    msg.includes('favoritisme') || msg.includes('déontologie');

  const isParticipation =
    msg.includes('habitant') || msg.includes('réunion publique') ||
    msg.includes('concertation') || msg.includes('citoyen') ||
    msg.includes('participation');

  const isAdminTension =
    msg.includes('service') || msg.includes('administration') ||
    msg.includes('drg') || msg.includes('dgs') || msg.includes('drh') ||
    msg.includes('agent') || msg.includes('techni') ||
    msg.includes('bloqu') || msg.includes('fonctionnaire') ||
    msg.includes('direction') || msg.includes('secrétaire général') ||
    msg.includes('dga') || msg.includes('chef de service') ||
    msg.includes('instruction') || msg.includes('refus');

  const isInternalConflict =
    msg.includes('majorité') || msg.includes('adjoint') ||
    msg.includes('collègue') || msg.includes('équipe') ||
    msg.includes('groupe') || msg.includes('tension interne') ||
    msg.includes('maire') || msg.includes('désaccord') ||
    msg.includes('friction') || msg.includes('tensions') ||
    msg.includes('exécutif');

  const isSpeaking =
    msg.includes('parole') || msg.includes('discours') ||
    msg.includes('conseil municipal') || msg.includes('réunion') ||
    msg.includes('prise de parole') || msg.includes('speech') ||
    msg.includes('allocution') || msg.includes('inauguration') ||
    msg.includes('cérémonie') || msg.includes('vœux') ||
    msg.includes('protocole');

  const isBudget =
    msg.includes('budget') || msg.includes('finance') ||
    msg.includes('dépense') || msg.includes('investissement');

  const isProject =
    msg.includes('projet') || msg.includes('dossier') ||
    msg.includes('avance pas') || msg.includes('bloqué') ||
    msg.includes('arbitrage');

  console.log('Domaines détectés:', {
    isRisk, isAdminTension, isInternalConflict,
    isSpeaking, isBudget, isProject, isParticipation
  });

  // Sélection stricte par domaine détecté — ordre de priorité décroissant
  let targetUseCases: string[] = [];

  if (isRisk) {
    targetUseCases = [
      'situation_sensible', 'risque_politique', 'prevention', 'crise',
      'ethique', 'protection', 'conflit_interets', 'prise_illegale',
      'deontologie', 'protection_juridique', 'protection_penale',
      'vss', 'harcelement', 'menaces', 'accusation', 'securite'
    ];
  } else if (isAdminTension && !isParticipation) {
    targetUseCases = ['administration', 'services', 'gouvernance', 'relations_internes', 'blocage'];
  } else if (isInternalConflict) {
    targetUseCases = ['conflit', 'majorite', 'tension_relationnelle', 'executif', 'reunion'];
  } else if (isSpeaking) {
    targetUseCases = ['prise_de_parole', 'communication', 'conseil_municipal', 'discours'];
  } else if (isBudget) {
    targetUseCases = ['budget', 'finances'];
  } else if (isProject) {
    targetUseCases = ['projet', 'blocage', 'pilotage', 'cadrage', 'arbitrage'];
  } else if (isParticipation) {
    targetUseCases = ['participation', 'concertation', 'reunion_publique', 'habitants'];
  }

  console.log('targetUseCases:', targetUseCases);

  // Filtrage strict par useCases normalisés
  if (targetUseCases.length > 0) {
    const normalizedTargets = targetUseCases.map(normalizeUseCase);
    const allMatched = allResources
      .filter(r => r.useCases?.some(uc => normalizedTargets.includes(normalizeUseCase(uc))));
    const matched = allMatched
      .filter(r => r.priority === 'haute')
      .slice(0, 2);

    console.log('Ressources matchées (avant filtre haute):', allMatched.map(r => r.slug));
    console.log('Ressources retournées:', matched.map(r => r.slug));

    if (matched.length > 0) {
      return matched.map(r => ({ title: r.title, slug: r.slug, promise: r.promise }));
    }
  }

  // Fallback : ressources haute priorité sans contrainte de domaine
  const fallback = allResources.filter(r => r.priority === 'haute').slice(0, 2);
  console.log('Ressources retournées (fallback):', fallback.map(r => r.slug));
  return fallback.map(r => ({ title: r.title, slug: r.slug, promise: r.promise }));
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
