// Endpoint one-time : crée l'audience Resend pour les abonnés MARYAN
// GET /api/admin/setup-audience  (protégé par NOTIFY_SECRET)
// Retourne l'audience ID à ajouter dans les variables d'environnement Vercel

import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const secret = (import.meta.env.NOTIFY_SECRET as string) || (process.env.NOTIFY_SECRET as string);
  const authHeader = request.headers.get('Authorization') || '';

  if (!secret || authHeader !== `Bearer ${secret}`) {
    return new Response(JSON.stringify({ error: 'Non autorisé.' }), {
      status: 403,
      headers: { 'content-type': 'application/json' }
    });
  }

  const apiKey = (import.meta.env.RESEND_API_KEY as string) || (process.env.RESEND_API_KEY as string);
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'RESEND_API_KEY non configurée.' }), {
      status: 500,
      headers: { 'content-type': 'application/json' }
    });
  }

  const existingAudienceId = (import.meta.env.RESEND_AUDIENCE_ID as string) || (process.env.RESEND_AUDIENCE_ID as string);
  if (existingAudienceId) {
    return new Response(JSON.stringify({
      ok: true,
      message: 'Audience déjà configurée.',
      audienceId: existingAudienceId,
    }), { status: 200, headers: { 'content-type': 'application/json' } });
  }

  const resend = new Resend(apiKey);

  try {
    const result = await resend.audiences.create({ name: 'MARYAN — Abonnés' });

    if (!result.data?.id) {
      throw new Error('Pas d\'ID retourné par Resend');
    }

    return new Response(JSON.stringify({
      ok: true,
      audienceId: result.data.id,
      message: `Audience créée ! Ajoutez RESEND_AUDIENCE_ID=${result.data.id} dans vos variables Vercel.`,
      next: `vercel env add RESEND_AUDIENCE_ID production`,
    }), { status: 200, headers: { 'content-type': 'application/json' } });

  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message || 'Erreur création audience.' }), {
      status: 500,
      headers: { 'content-type': 'application/json' }
    });
  }
};
