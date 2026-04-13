import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

export const prerender = false;

const MISTRAL_API_KEY =
  (import.meta.env.MISTRAL_API_KEY as string) || (process.env.MISTRAL_API_KEY as string);
const SUPABASE_URL =
  (import.meta.env.PUBLIC_SUPABASE_URL as string) || (process.env.PUBLIC_SUPABASE_URL as string);
const SUPABASE_SERVICE_KEY =
  (import.meta.env.SUPABASE_SERVICE_KEY as string) || (process.env.SUPABASE_SERVICE_KEY as string);

const MISTRAL_CHAT_URL = 'https://api.mistral.ai/v1/chat/completions';
const VISION_MODEL = 'pixtral-12b-2409';
const TEXT_MODEL = 'mistral-large-latest';

function json(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' }
  });
}

function getToken(req: Request): string | null {
  const auth = req.headers.get('Authorization') || '';
  return auth.startsWith('Bearer ') ? auth.slice(7) : null;
}

async function isSubscribed(token: string): Promise<boolean> {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) return false;
  const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
  const { data: { user } } = await sb.auth.getUser(token);
  if (!user) return false;
  const { data } = await sb
    .from('profiles')
    .select('plan')
    .eq('id', user.id)
    .single();
  const plan = (data?.plan as string | null) || '';
  return plan.toLowerCase().includes('plus');
}

const ANALYSE_PROMPT = `Tu es un assistant de l'élu local français. Analyse ce document et réponds en JSON strict avec les champs suivants :
- resume : résumé exécutif en 3 à 5 phrases, style direct
- pointsAttention : tableau de 3 à 6 points d'attention ou risques identifiés (strings)
- engagements : ce que ce document engage pour l'élu (1 à 3 phrases)
- prochainEtape : la prochaine action concrète recommandée (1 phrase)

Réponds UNIQUEMENT avec le JSON, sans balises markdown ni commentaires.`;

export const POST: APIRoute = async ({ request }) => {
  if (!MISTRAL_API_KEY) return json({ error: 'Configuration Mistral manquante.' }, 503);

  const token = getToken(request);
  if (!token) return json({ error: 'Authentification requise.' }, 401);

  const subscribed = await isSubscribed(token);
  if (!subscribed) return json({ error: 'Service réservé aux abonné·es MARYAN Plus.', paywallTriggered: true }, 403);

  let body: { fileData?: string; mimeType?: string; docType?: string } | null = null;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Format de requête invalide.' }, 400);
  }

  const { fileData, mimeType, docType } = body || {};
  if (!fileData || !mimeType) return json({ error: 'Données manquantes : fileData et mimeType requis.' }, 400);

  const isImage = mimeType.startsWith('image/');
  const isPdf = mimeType === 'application/pdf';

  if (!isImage && !isPdf) {
    return json({ error: 'Format non supporté. Utilisez PDF, JPG ou PNG.' }, 400);
  }

  try {
    let messages: unknown[];

    if (isImage) {
      // Modèle vision pour images
      messages = [
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: { url: `data:${mimeType};base64,${fileData}` }
            },
            { type: 'text', text: ANALYSE_PROMPT }
          ]
        }
      ];
    } else {
      // PDF — extraction texte via Mistral document
      messages = [
        {
          role: 'user',
          content: [
            {
              type: 'document_url',
              document_url: { url: `data:application/pdf;base64,${fileData}` }
            },
            { type: 'text', text: ANALYSE_PROMPT }
          ]
        }
      ];
    }

    const model = isImage ? VISION_MODEL : TEXT_MODEL;
    const upstream = await fetch(MISTRAL_CHAT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MISTRAL_API_KEY}`
      },
      body: JSON.stringify({ model, messages, max_tokens: 1200, temperature: 0.2 })
    });

    if (!upstream.ok) {
      const errData = await upstream.json().catch(() => ({})) as Record<string, any>;
      const msg = errData?.message || errData?.error?.message || 'Erreur Mistral.';
      return json({ error: msg }, upstream.status);
    }

    const data = await upstream.json() as Record<string, any>;
    const raw = (data?.choices?.[0]?.message?.content || '').trim();

    // Parser la réponse JSON de Mistral
    const cleaned = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '').trim();
    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(cleaned) as Record<string, unknown>;
    } catch {
      // Si Mistral n'a pas renvoyé du JSON valide, retourner le texte brut dans resume
      return json({
        resume: raw,
        pointsAttention: [],
        engagements: '',
        prochainEtape: ''
      });
    }

    return json({
      resume: parsed.resume || '',
      pointsAttention: Array.isArray(parsed.pointsAttention) ? parsed.pointsAttention : [],
      engagements: parsed.engagements || '',
      prochainEtape: parsed.prochainEtape || ''
    });
  } catch (e: any) {
    return json({ error: `Erreur de connexion : ${e.message}` }, 500);
  }
};

export const ALL: APIRoute = async () => json({ error: 'Méthode non autorisée.' }, 405);
