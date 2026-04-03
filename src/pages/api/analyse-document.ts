import type { APIRoute } from 'astro';

export const prerender = false;

const MISTRAL_CHAT_URL = 'https://api.mistral.ai/v1/chat/completions';
const VISION_MODEL = 'pixtral-12b-2409';
const DEFAULT_MODEL = 'mistral-large-latest';

const CHAT_SYSTEM = `Tu es MARYAN, copilote des élu·es locaux.
L'utilisateur joint un document à sa question. Analyse-le et décris brièvement son contenu en français (3-5 lignes max) : type de document, points clés, informations notables.
Retourne uniquement un JSON valide : { "description": "..." }`;

const CR_SYSTEM = `Tu es MARYAN, copilote des élu·es locaux.
L'utilisateur partage un document de réunion. Extrais les données structurées.
Retourne uniquement un JSON valide :
{
  "title": "intitulé de la réunion ou du document",
  "dateReunion": "date au format YYYY-MM-DD ou chaîne vide si non trouvée",
  "participants": ["nom ou fonction"],
  "content": "résumé des échanges, décisions et points clés en 4-8 lignes",
  "followUp": ["action à suivre 1", "action 2"],
  "tags": ["thème1", "thème2"]
}
Si une information est absente, utilise une chaîne vide ou un tableau vide.`;

export const POST: APIRoute = async ({ request }) => {
  const apiKey =
    (import.meta.env.MISTRAL_API_KEY as string) ||
    (process.env.MISTRAL_API_KEY as string);
  const configuredModel =
    (import.meta.env.MISTRAL_MODEL as string) ||
    (process.env.MISTRAL_MODEL as string) ||
    DEFAULT_MODEL;

  if (!apiKey) return json({ error: 'Configuration manquante.' }, 503);

  const body = await request.json().catch(() => null);
  if (!body) return json({ error: 'Format invalide.' }, 400);

  const { fileType, content, context = 'chat' } = body as {
    fileType: 'image' | 'pdf';
    content: string;
    context?: 'chat' | 'compte_rendu';
  };

  if (!fileType || !content?.trim()) {
    return json({ error: 'fileType et content sont requis.' }, 400);
  }

  const systemPrompt = context === 'compte_rendu' ? CR_SYSTEM : CHAT_SYSTEM;
  const isImage = fileType === 'image';
  const model = isImage ? VISION_MODEL : configuredModel;

  try {
    const userContent = isImage
      ? [
          { type: 'text', text: 'Analyse ce document :' },
          { type: 'image_url', image_url: { url: content } }
        ]
      : `Document à analyser :\n\n${content.slice(0, 8000)}`;

    const upstream = await fetch(MISTRAL_CHAT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userContent }
        ],
        max_tokens: context === 'compte_rendu' ? 700 : 350,
        temperature: 0.1,
        response_format: { type: 'json_object' }
      })
    });

    const data = (await upstream.json().catch(() => ({}))) as Record<string, any>;

    if (!upstream.ok) {
      throw new Error(data?.message || data?.error?.message || 'Erreur API Mistral.');
    }

    const raw = data?.choices?.[0]?.message?.content || '{}';
    let parsed: Record<string, any>;

    try {
      parsed = JSON.parse(raw);
    } catch {
      const match = raw.match(/\{[\s\S]*\}/);
      if (match) {
        try {
          parsed = JSON.parse(match[0]);
        } catch {
          return json({ error: "Réponse inattendue de l'API. Réessayez." }, 500);
        }
      } else {
        return json({ error: "Réponse inattendue de l'API. Réessayez." }, 500);
      }
    }

    return json(parsed);
  } catch (e: any) {
    const status = typeof e?.status === 'number' ? e.status : 500;
    return json({ error: e.message || 'Erreur de traitement du document.' }, status);
  }
};

export const ALL: APIRoute = async () => json({ error: 'Méthode non autorisée.' }, 405);

function json(payload: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store'
    }
  });
}
