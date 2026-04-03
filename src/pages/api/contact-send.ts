import type { APIRoute } from 'astro';
import { sendContactEmail } from '../../lib/email';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { firstname, lastname, email, mandate, citySize, subject, message } = data;

    // 1. VALIDATION BASIQUE
    if (!email || !lastname || !subject) {
      return new Response(JSON.stringify({ error: "Champs manquants" }), { status: 400 });
    }

    console.log('[contact-send] new submission received');

    // 2. ENVOI EMAIL via Resend (graceful degradation si clé absente)
    await sendContactEmail({
      firstname: firstname || '',
      lastname,
      email,
      mandate: mandate || '',
      citySize: citySize || '',
      subject,
      message: message || ''
    });

    return new Response(JSON.stringify({ success: true, message: "Demande reçue" }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('[contact-send] erreur serveur interne');
    return new Response(JSON.stringify({ error: "Erreur serveur" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
