import type { APIRoute } from 'astro';

export const prerender = false;

const MISTRAL_CHAT_URL = 'https://api.mistral.ai/v1/chat/completions';
const DEFAULT_MODEL = 'mistral-large-latest';

const SYSTEM_PROMPT = `Tu es MARYAN, copilote des élu·es locaux.
Ta mission : générer une introduction protocolaire correcte, fluide et prête à être prononcée à l'oral.

Règles protocolaires :
- L'ordre repose sur la fonction, pas sur la relation personnelle ou l'affect.
- Hiérarchie : État (Président → Premier ministre → Ministre → Préfet → Sous-préfet) → Parlement (Député → Sénateur) → Collectivités (Région → Département → Intercommunalité → Commune → Adjoints) → Autres (associations, partenaires, habitants).
- Si le locuteur est le maire, il ne se cite pas, ou se cite en dernier s'il doit se présenter.
- Si le locuteur est un adjoint, il cite le maire avant lui.
- En cas de doute sur l'ordre exact entre deux fonctions équivalentes, utilise l'ancienneté ou l'ordre alphabétique.
- En cas d'incertitude globale, bascule sur une formule englobante prudente.
- Ne jamais inventer un titre ou une fonction non mentionnée.

Adapte le ton selon la demande :
- sobre : formel, posé, sans fioritures
- chaleureux : humain, direct, ouvert
- solennel : cadré, respectueux, adapté aux commémorations

Retourne UNIQUEMENT un objet JSON valide avec cette structure, sans rien d'autre :
{
  "ordre": "liste des personnes dans l'ordre protocolaire conseillé, une par ligne avec leur fonction",
  "intro": "introduction complète, prête à dire à l'oral, fluide et naturelle, max 8 lignes",
  "variante": "formule englobante sobre et sécurisante pour les cas de doute"
}`;

export const POST: APIRoute = async ({ request }) => {
  const apiKey = (import.meta.env.MISTRAL_API_KEY as string) || (process.env.MISTRAL_API_KEY as string);
  const model =
    (import.meta.env.MISTRAL_MODEL as string) ||
    (process.env.MISTRAL_MODEL as string) ||
    DEFAULT_MODEL;

  if (!apiKey) {
    return json({ error: 'Configuration MISTRAL_API_KEY manquante.' }, 503);
  }

  const body = await request.json().catch(() => null);
  if (!body) return json({ error: 'Format JSON invalide.' }, 400);

  const { speaker, event, attendees, tone = 'sobre' } = body as Record<string, string>;

  if (!speaker?.trim() || !attendees?.trim()) {
    return json({ error: 'Merci de renseigner au minimum "Qui parle" et "Qui est présent".' }, 400);
  }

  const userMessage = [
    `Qui prend la parole : ${speaker.trim()}`,
    `Type d'événement : ${event?.trim() || 'événement officiel'}`,
    `Personnes présentes : ${attendees.trim()}`,
    `Ton souhaité : ${tone}`
  ].join('\n');

  try {
    const upstream = await fetch(MISTRAL_CHAT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userMessage }
        ],
        max_tokens: 700,
        temperature: 0.2,
        response_format: { type: 'json_object' }
      })
    });

    const data = (await upstream.json().catch(() => ({}))) as Record<string, any>;

    if (!upstream.ok) {
      throw new Error(data?.message || data?.error?.message || "Le moteur Mistral n'a pas pu répondre.");
    }

    const raw = data?.choices?.[0]?.message?.content || '{}';
    let parsed: Record<string, string>;

    try {
      parsed = JSON.parse(raw);
    } catch {
      return json({ error: 'La génération a produit un format inattendu. Réessayez.' }, 500);
    }

    return json({
      ordre: (parsed.ordre || '').trim(),
      intro: (parsed.intro || '').trim(),
      variante: (parsed.variante || '').trim()
    });
  } catch (e: any) {
    const status = typeof e?.status === 'number' ? e.status : 500;
    return json({ error: e.message || 'Erreur de génération.' }, status);
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
