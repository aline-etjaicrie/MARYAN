import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { firstname, lastname, email, mandate, citySize, subject, message } = data;

    // 1. VALIDATION BASIQUE
    if (!email || !lastname || !subject) {
      return new Response(JSON.stringify({ error: "Champs manquants" }), { status: 400 });
    }

    // 2. CONSTITUTION DU RAPPORT DE CONTACT
    const report = `
      Nouveau Contact MARYAN
      ---
      Nom: ${firstname} ${lastname}
      Email: ${email}
      Mandat: ${mandate}
      Taille Ville: ${citySize}
      Objet: ${subject}
      Message: ${message || "Pas de message."}
      Date: ${new Date().toLocaleString('fr-FR')}
    `;

    console.log("CONTACT SUBMISSION RECEIVED:", report);

    /**
     * NOTE POUR ALINE: 
     * Pour envoyer réellement l'email sur aline@etjaicrie.com, il faudra ajouter une clé API 
     * (Resend, SendGrid ou Mailgun) dans les variables d'environnement Vercel.
     * Pour l'instant, on simule le succès pour que l'UX soit fluide.
     */

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
