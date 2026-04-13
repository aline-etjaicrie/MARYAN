import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

const RESEND_API_KEY =
  (import.meta.env.RESEND_API_KEY as string) || (process.env.RESEND_API_KEY as string);

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { firstname, lastname, email, mandate, citySize, subject, message } = data;

    if (!email || !lastname || !subject) {
      return new Response(JSON.stringify({ error: "Champs manquants" }), { status: 400 });
    }

    const htmlBody = `
      <h2>Nouveau Contact MARYAN</h2>
      <table>
        <tr><td><strong>Nom</strong></td><td>${firstname || ''} ${lastname}</td></tr>
        <tr><td><strong>Email</strong></td><td>${email}</td></tr>
        <tr><td><strong>Mandat</strong></td><td>${mandate || '-'}</td></tr>
        <tr><td><strong>Taille ville</strong></td><td>${citySize || '-'}</td></tr>
        <tr><td><strong>Objet</strong></td><td>${subject}</td></tr>
        <tr><td><strong>Message</strong></td><td>${message || 'Pas de message.'}</td></tr>
        <tr><td><strong>Date</strong></td><td>${new Date().toLocaleString('fr-FR')}</td></tr>
      </table>
    `;

    if (RESEND_API_KEY) {
      const resend = new Resend(RESEND_API_KEY);
      const { error: sendError } = await resend.emails.send({
        from: 'MARYAN Contact <contact@maryan.app>',
        to: 'aline@etjaicrie.com',
        replyTo: email,
        subject: `[MARYAN Contact] ${subject}`,
        html: htmlBody
      });
      if (sendError) {
        console.error("Resend error:", sendError);
        return new Response(JSON.stringify({ error: "Erreur lors de l'envoi de l'email." }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    return new Response(JSON.stringify({ success: true, message: "Demande reçue" }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("API CONTACT ERROR:", error);
    return new Response(JSON.stringify({ error: "Erreur serveur" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
