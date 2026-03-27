export const prerender = false;

import type { APIRoute } from 'astro';

const MISTRAL_CHAT_URL = 'https://api.mistral.ai/v1/chat/completions';
const MISTRAL_OCR_URL = 'https://api.mistral.ai/v1/ocr';

const DOC_TYPE_PROMPTS: Record<string, string> = {
  ordre_du_jour:
    "Tu analyses un ordre du jour de conseil municipal. Identifie les points sensibles ou controversés, les votes qui semblent importants, les délais mentionnés et la durée estimée de séance. Sois concis et pratique.",
  deliberation:
    "Tu analyses une délibération municipale. Identifie précisément ce qui est voté et approuvé, les engagements financiers ou juridiques pris, qui est concerné ou habilité, et les délais ou obligations créées.",
  budget:
    "Tu analyses un document budgétaire municipal. Identifie les chiffres clés (totaux, variations), les postes en forte évolution (hausse ou baisse), les points d'alerte financiers, et ce que cela implique concrètement pour la collectivité.",
  courrier:
    "Tu analyses un courrier reçu par un élu. Identifie le ton de l'expéditeur, la demande réelle (explicite et implicite), le niveau d'urgence, et suggère une posture ou une réponse appropriée.",
  autre:
    "Tu analyses un document officiel reçu par un élu municipal. Fais un résumé général, identifie les points saillants, les obligations éventuelles et ce qui mérite attention.",
};

function buildSystemPrompt(docType: string): string {
  const context = DOC_TYPE_PROMPTS[docType] || DOC_TYPE_PROMPTS.autre;
  return `${context}

Tu es MARYAN, un assistant expert pour élus municipaux français. Réponds UNIQUEMENT en JSON valide avec exactement ces 4 champs (sans markdown, sans balise, juste le JSON brut) :
{
  "resume": "2-3 phrases simples résumant l'essentiel du document",
  "pointsAttention": ["point 1", "point 2", "..."],
  "engagements": "Ce que ce document engage : obligations, délais, risques. 2-3 phrases.",
  "prochainEtape": "La prochaine étape concrète suggérée pour l'élu. 1-2 phrases."
}`;
}

function extractContent(data: Record<string, unknown>): string {
  const content = (data as any)?.choices?.[0]?.message?.content;
  if (typeof content === 'string') return content.trim();
  return '';
}

function json(payload: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ request }) => {
  const apiKey =
    (import.meta.env.MISTRAL_API_KEY as string) ||
    (process.env.MISTRAL_API_KEY as string);

  if (!apiKey) {
    return json({ error: 'MISTRAL_API_KEY manquante.' }, 503);
  }

  let body: { fileData?: string; mimeType?: string; docType?: string } | null = null;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Format JSON invalide.' }, 400);
  }

  const { fileData, mimeType, docType } = body ?? {};

  if (!fileData || !mimeType || !docType) {
    return json({ error: 'Paramètres manquants (fileData, mimeType, docType).' }, 400);
  }

  const systemPrompt = buildSystemPrompt(docType);

  try {
    let rawContent: string;

    if (mimeType === 'application/pdf') {
      // Step 1: OCR extraction
      const ocrRes = await fetch(MISTRAL_OCR_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'mistral-ocr-latest',
          document: {
            type: 'document_url',
            document_url: `data:application/pdf;base64,${fileData}`,
          },
        }),
      });

      if (!ocrRes.ok) {
        const err = await ocrRes.json().catch(() => ({}));
        return json({ error: `Erreur OCR : ${(err as any)?.message || ocrRes.status}` }, 500);
      }

      const ocrData = await ocrRes.json() as any;
      const extractedText: string = Array.isArray(ocrData?.pages)
        ? ocrData.pages.map((p: any) => p.markdown || p.text || '').join('\n\n')
        : '';

      if (!extractedText.trim()) {
        return json({ error: 'Le PDF semble vide ou illisible.' }, 422);
      }

      // Step 2: Analyze extracted text
      const chatRes = await fetch(MISTRAL_CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'mistral-large-latest',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Voici le contenu extrait du document :\n\n${extractedText.slice(0, 8000)}` },
          ],
          max_tokens: 800,
          temperature: 0.2,
          response_format: { type: 'json_object' },
        }),
      });

      const chatData = await chatRes.json() as Record<string, unknown>;
      rawContent = extractContent(chatData);
    } else {
      // Image analysis via pixtral
      const chatRes = await fetch(MISTRAL_CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'pixtral-large-latest',
          messages: [
            { role: 'system', content: systemPrompt },
            {
              role: 'user',
              content: [
                {
                  type: 'image_url',
                  image_url: { url: `data:${mimeType};base64,${fileData}` },
                },
                { type: 'text', text: 'Analyse ce document selon les instructions.' },
              ],
            },
          ],
          max_tokens: 800,
          temperature: 0.2,
          response_format: { type: 'json_object' },
        }),
      });

      const chatData = await chatRes.json() as Record<string, unknown>;
      rawContent = extractContent(chatData);
    }

    let result: { resume?: string; pointsAttention?: string[]; engagements?: string; prochainEtape?: string };
    try {
      result = JSON.parse(rawContent);
    } catch {
      return json({ error: 'Réponse IA non structurée. Réessayez.' }, 500);
    }

    return json({
      resume: result.resume ?? '',
      pointsAttention: Array.isArray(result.pointsAttention) ? result.pointsAttention : [],
      engagements: result.engagements ?? '',
      prochainEtape: result.prochainEtape ?? '',
    });
  } catch (e: any) {
    return json({ error: `Erreur : ${e.message}` }, 500);
  }
};

export const ALL: APIRoute = async () =>
  new Response(JSON.stringify({ error: 'Méthode non autorisée.' }), { status: 405 });
