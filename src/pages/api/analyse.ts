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
// pixtral-12b-2409 a été retiré par Mistral le 2/12/2025 ; mistral-large-latest
// gère à la fois la vision et la compréhension de documents (document_url),
// ce qui permet d'utiliser un seul modèle même quand image(s) et PDF sont mélangés.
const MODEL = 'mistral-large-latest';
const MAX_DOCUMENTS = 2;

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
  const p = plan.toLowerCase();
  return p.includes('plus') || p === 'admin';
}

function buildAnalysePrompt(documentCount: number): string {
  const intro =
    documentCount > 1
      ? `Tu es un assistant de l'élu local français. Analyse ces ${documentCount} documents ensemble, comme un seul dossier cohérent (mets en évidence les liens, écarts ou contradictions entre eux si pertinent), et réponds en JSON strict avec les champs suivants :`
      : `Tu es un assistant de l'élu local français. Analyse ce document et réponds en JSON strict avec les champs suivants :`;

  return `${intro}
- resume : résumé exécutif en 3 à 5 phrases, style direct
- pointsAttention : tableau de 3 à 6 points d'attention ou risques identifiés (strings)
- engagements : ce que ce${documentCount > 1 ? 's documents engagent' : ' document engage'} pour l'élu (1 à 3 phrases)
- prochainEtape : la prochaine action concrète recommandée (1 phrase)

Réponds UNIQUEMENT avec le JSON, sans balises markdown ni commentaires.`;
}

export const POST: APIRoute = async ({ request }) => {
  if (!MISTRAL_API_KEY) return json({ error: 'Configuration Mistral manquante.' }, 503);

  const token = getToken(request);
  if (!token) return json({ error: 'Authentification requise.' }, 401);

  const subscribed = await isSubscribed(token);
  if (!subscribed) return json({ error: 'Service réservé aux abonné·es MARYAN Plus.', paywallTriggered: true }, 403);

  let body: {
    fileData?: string;
    mimeType?: string;
    docType?: string;
    documents?: Array<{ fileData?: string; mimeType?: string }>;
  } | null = null;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Format de requête invalide.' }, 400);
  }

  // Compat : accepte soit { documents: [...] } (jusqu'à 2), soit l'ancien
  // format à un seul fichier { fileData, mimeType }.
  const rawDocuments = Array.isArray(body?.documents) && body.documents.length
    ? body.documents
    : body?.fileData && body?.mimeType
      ? [{ fileData: body.fileData, mimeType: body.mimeType }]
      : [];

  if (!rawDocuments.length) {
    return json({ error: 'Données manquantes : au moins un document est requis.' }, 400);
  }
  if (rawDocuments.length > MAX_DOCUMENTS) {
    return json({ error: `Vous pouvez joindre au maximum ${MAX_DOCUMENTS} documents.` }, 400);
  }

  const documents: Array<{ fileData: string; mimeType: string }> = [];
  for (const doc of rawDocuments) {
    if (!doc?.fileData || !doc?.mimeType) {
      return json({ error: 'Données manquantes : fileData et mimeType requis pour chaque document.' }, 400);
    }
    const isImage = doc.mimeType.startsWith('image/');
    const isPdf = doc.mimeType === 'application/pdf';
    if (!isImage && !isPdf) {
      return json({ error: 'Format non supporté. Utilisez PDF, JPG ou PNG.' }, 400);
    }
    documents.push({ fileData: doc.fileData, mimeType: doc.mimeType });
  }

  try {
    const documentBlocks = documents.map((doc) =>
      doc.mimeType.startsWith('image/')
        ? { type: 'image_url', image_url: `data:${doc.mimeType};base64,${doc.fileData}` }
        : { type: 'document_url', document_url: `data:application/pdf;base64,${doc.fileData}` }
    );

    const messages = [
      {
        role: 'user',
        content: [...documentBlocks, { type: 'text', text: buildAnalysePrompt(documents.length) }]
      }
    ];

    const upstream = await fetch(MISTRAL_CHAT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MISTRAL_API_KEY}`
      },
      body: JSON.stringify({ model: MODEL, messages, max_tokens: 1200, temperature: 0.2 })
    });

    if (!upstream.ok) {
      const rawBody = await upstream.text();
      let errData: Record<string, any> = {};
      try { errData = JSON.parse(rawBody); } catch { /* body not JSON */ }

      const detail = Array.isArray(errData?.detail)
        ? errData.detail.map((d: any) => d?.msg || JSON.stringify(d)).join(' ; ')
        : errData?.detail;

      const msg =
        errData?.message ||
        errData?.error?.message ||
        detail ||
        (rawBody ? rawBody.slice(0, 300) : `Erreur Mistral (HTTP ${upstream.status}).`);

      console.error('[analyse] Mistral upstream error:', upstream.status, rawBody.slice(0, 1000));
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
