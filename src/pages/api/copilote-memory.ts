import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

export const prerender = false;

const SUPABASE_URL = (import.meta.env.PUBLIC_SUPABASE_URL as string) || (process.env.PUBLIC_SUPABASE_URL as string);
const SUPABASE_SERVICE_KEY =
  (import.meta.env.SUPABASE_SERVICE_KEY as string) || (process.env.SUPABASE_SERVICE_KEY as string);
const MISTRAL_API_KEY = (import.meta.env.MISTRAL_API_KEY as string) || (process.env.MISTRAL_API_KEY as string);
const MISTRAL_CHAT_URL = 'https://api.mistral.ai/v1/chat/completions';
const MEMORY_LIMIT = 10;

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

function json(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' }
  });
}

async function extractTopics(messages: ChatMessage[]): Promise<{ topic: string; context: string }[]> {
  if (!MISTRAL_API_KEY) return [];

  const conversation = messages
    .slice(-12) // derniers 12 messages pour ne pas dépasser le context
    .map((m) => `${m.role === 'user' ? 'Élu·e' : 'MARYAN'}: ${m.content}`)
    .join('\n');

  const prompt = `Résume en 1 à 3 topics courts (5 mots max chacun) les sujets principaux abordés dans cette conversation d'élu local. Retourne UNIQUEMENT un tableau JSON valide, sans markdown ni explication : [{"topic": "...", "context": "résumé en 1 phrase"}]`;

  try {
    const res = await fetch(MISTRAL_CHAT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${MISTRAL_API_KEY}`
      },
      body: JSON.stringify({
        model: 'mistral-small-latest',
        messages: [
          { role: 'user', content: `${prompt}\n\nConversation :\n${conversation}` }
        ],
        max_tokens: 200,
        temperature: 0.2
      })
    });

    if (!res.ok) return [];

    const data = (await res.json()) as Record<string, unknown>;
    const raw = (data?.choices as any)?.[0]?.message?.content || '';
    const match = raw.match(/\[[\s\S]*\]/);
    if (!match) return [];

    const parsed = JSON.parse(match[0]) as unknown[];
    return parsed
      .filter(
        (item): item is { topic: string; context: string } =>
          typeof (item as any)?.topic === 'string' && typeof (item as any)?.context === 'string'
      )
      .slice(0, 3);
  } catch {
    return [];
  }
}

export const POST: APIRoute = async ({ request }) => {
  const auth = request.headers.get('Authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return json({ error: 'Non authentifié.' }, 401);

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    return json({ error: 'Configuration serveur manquante.' }, 500);
  }

  let body: { session_id?: unknown } | null = null;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Format JSON invalide.' }, 400);
  }

  const sessionId = typeof body?.session_id === 'string' ? body.session_id.trim() : null;
  if (!sessionId) return json({ error: 'session_id manquant.' }, 400);

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);
  if (authError || !user) return json({ error: 'Token invalide.' }, 401);

  // Récupérer les messages de la session
  const { data: session } = await supabase
    .from('copilote_sessions')
    .select('messages')
    .eq('id', sessionId)
    .eq('user_id', user.id)
    .single();

  if (!session) return json({ error: 'Session introuvable.' }, 404);

  const messages: ChatMessage[] = Array.isArray(session.messages)
    ? (session.messages as unknown[]).filter(
        (m): m is ChatMessage =>
          typeof (m as any)?.role === 'string' && typeof (m as any)?.content === 'string'
      )
    : [];

  if (messages.length < 4) {
    // Pas assez de contenu pour extraire des topics utiles
    return json({ ok: true, skipped: true });
  }

  const topics = await extractTopics(messages);
  if (!topics.length) return json({ ok: true, topics: [] });

  // Insérer les nouveaux topics
  const inserts = topics.map((t) => ({
    user_id: user.id,
    topic: t.topic,
    context: t.context
  }));

  const { error: insertError } = await supabase.from('copilote_memory').insert(inserts);
  if (insertError) {
    console.error('[copilote-memory] insert failed:', insertError);
    return json({ error: 'Impossible de sauvegarder la mémoire.' }, 500);
  }

  // Garder seulement les 10 entrées les plus récentes par utilisateur
  const { data: allMemory } = await supabase
    .from('copilote_memory')
    .select('id, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (allMemory && allMemory.length > MEMORY_LIMIT) {
    const toDelete = allMemory.slice(MEMORY_LIMIT).map((m) => m.id);
    await supabase.from('copilote_memory').delete().in('id', toDelete);
  }

  return json({ ok: true, topics });
};

export const ALL: APIRoute = async () => json({ error: 'Méthode non autorisée.' }, 405);
