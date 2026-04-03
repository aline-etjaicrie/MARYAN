// Wrapper Resend pour tous les emails transactionnels MARYAN
// Graceful degradation if RESEND_API_KEY not set

import { Resend } from 'resend';

const RESEND_API_KEY = (import.meta.env.RESEND_API_KEY as string) || (process.env.RESEND_API_KEY as string);
const FROM_EMAIL = 'MARYAN <bonjour@maryanapp.fr>';
const REPLY_TO = 'aline@etjaicrie.com';

function getResend(): Resend | null {
  if (!RESEND_API_KEY) {
    console.warn('[email] RESEND_API_KEY non configurée — emails désactivés');
    return null;
  }
  return new Resend(RESEND_API_KEY);
}

// ── Templates HTML ──────────────────────────────────────────────────────────

function baseTemplate(content: string): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MARYAN</title>
  <style>
    body { font-family: Inter, -apple-system, sans-serif; background: #f4f4f0; margin: 0; padding: 0; }
    .wrap { max-width: 560px; margin: 40px auto; background: white; border-radius: 12px; overflow: hidden; }
    .header { background: #0A192F; padding: 32px 40px; }
    .header a { color: #64FFDA; font-size: 1.4rem; font-weight: 900; letter-spacing: -0.04em; text-decoration: none; }
    .body { padding: 40px; color: #0A192F; line-height: 1.6; }
    .body h1 { font-size: 1.3rem; font-weight: 800; margin: 0 0 1rem; }
    .body p { font-size: 0.95rem; color: #333; margin: 0 0 1rem; }
    .btn { display: inline-block; background: #0A192F; color: white !important; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 700; font-size: 0.9rem; margin: 1rem 0; }
    .footer { padding: 24px 40px; background: #f8f8f6; border-top: 1px solid #eee; font-size: 0.8rem; color: #888; }
    .footer a { color: #888; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="header"><a href="https://maryanapp.fr">MARYAN</a></div>
    <div class="body">${content}</div>
    <div class="footer">
      MARYAN — Votre copilote de mandat<br>
      <a href="https://maryanapp.fr/confidentialite">Politique de confidentialité</a> ·
      <a href="https://maryanapp.fr/mentions-legales">Mentions légales</a>
    </div>
  </div>
</body>
</html>`;
}

// ── Email functions ──────────────────────────────────────────────────────────

export async function sendWelcomeEmail(email: string, firstName?: string): Promise<void> {
  const resend = getResend();
  if (!resend) return;
  const name = firstName || 'élu·e';
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      replyTo: REPLY_TO,
      subject: 'Bienvenue dans MARYAN — votre copilote de mandat',
      html: baseTemplate(`
        <h1>Bienvenue, ${name} 👋</h1>
        <p>Votre compte MARYAN est créé. Vous accédez maintenant à un espace conçu pour les élus·es qui prennent leur mandat au sérieux.</p>
        <p><strong>Par où commencer ?</strong></p>
        <p>1. <strong>Faites votre diagnostic</strong> — 5 minutes pour que MARYAN comprenne votre situation et adapte son aide.</p>
        <p>2. <strong>Ouvrez le copilote</strong> — posez votre première question, aussi concrète que vous voulez.</p>
        <a href="https://maryanapp.fr/diagnostic" class="btn">Faire le diagnostic →</a>
        <p style="font-size:0.85rem;color:#888;">Des questions ? Répondez simplement à cet email.</p>
      `)
    });
  } catch (e) {
    console.error('[email] sendWelcomeEmail failed:', e);
  }
}

export async function sendPaymentConfirmationEmail(email: string, firstName?: string, planLabel?: string): Promise<void> {
  const resend = getResend();
  if (!resend) return;
  const name = firstName || 'élu·e';
  const plan = planLabel || 'MARYAN Plus';
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      replyTo: REPLY_TO,
      subject: `Confirmation — votre abonnement ${plan}`,
      html: baseTemplate(`
        <h1>Votre abonnement est activé ✓</h1>
        <p>Bonjour ${name},</p>
        <p>Votre abonnement <strong>${plan}</strong> est maintenant actif. Vous avez accès à toutes les fonctionnalités MARYAN sans limite.</p>
        <p><strong>Ce qui s'ouvre maintenant :</strong></p>
        <p>✓ Copilote illimité — posez autant de questions que vous voulez<br>
        ✓ Accès complet aux fiches pratiques<br>
        ✓ Historique de toutes vos sessions</p>
        <a href="https://maryanapp.fr/mon-compte" class="btn">Accéder à mon espace →</a>
        <p style="font-size:0.85rem;color:#888;">Pour gérer votre abonnement (factures, résiliation), rendez-vous dans votre espace compte.</p>
      `)
    });
  } catch (e) {
    console.error('[email] sendPaymentConfirmationEmail failed:', e);
  }
}

export async function sendNewsletterNotification(data: {
  type: 'ressource' | 'blog' | 'autre';
  title: string;
  slug: string;
  description?: string;
}): Promise<void> {
  const resend = getResend();
  if (!resend) return;

  const typeLabel = data.type === 'blog' ? 'Article blog' : data.type === 'ressource' ? 'Nouvelle fiche' : 'Publication';
  const url = data.type === 'blog'
    ? `https://maryanapp.fr/blog/${data.slug}`
    : data.type === 'ressource'
    ? `https://maryanapp.fr/ressources/${data.slug}`
    : `https://maryanapp.fr/${data.slug}`;

  try {
    // Notification interne à Aline
    await resend.emails.send({
      from: FROM_EMAIL,
      to: REPLY_TO,
      subject: `[MARYAN] Nouvelle publication : ${data.title}`,
      html: baseTemplate(`
        <h1>Nouvelle publication sur MARYAN</h1>
        <p><strong>Type :</strong> ${typeLabel}</p>
        <p><strong>Titre :</strong> ${data.title}</p>
        ${data.description ? `<p><strong>Description :</strong> ${data.description}</p>` : ''}
        <a href="${url}" class="btn">Voir la publication →</a>
        <hr style="border:none;border-top:1px solid #eee;margin:1.5rem 0;">
        <p style="font-size:0.8rem;color:#888;">Ceci est une notification automatique MARYAN.</p>
      `)
    });
  } catch (e) {
    console.error('[email] sendNewsletterNotification failed:', e);
  }
}

export async function sendContactEmail(data: {
  firstname: string;
  lastname: string;
  email: string;
  mandate: string;
  citySize: string;
  subject: string;
  message: string;
}): Promise<void> {
  const resend = getResend();
  if (!resend) return;
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: REPLY_TO,
      replyTo: data.email,
      subject: `[Contact MARYAN] ${data.subject} — ${data.firstname} ${data.lastname}`,
      html: baseTemplate(`
        <h1>Nouvelle demande de contact</h1>
        <p><strong>Nom :</strong> ${data.firstname} ${data.lastname}</p>
        <p><strong>Email :</strong> <a href="mailto:${data.email}">${data.email}</a></p>
        <p><strong>Mandat :</strong> ${data.mandate}</p>
        <p><strong>Taille collectivité :</strong> ${data.citySize}</p>
        <p><strong>Objet :</strong> ${data.subject}</p>
        <hr style="border:none;border-top:1px solid #eee;margin:1.5rem 0;">
        <p><strong>Message :</strong></p>
        <p style="white-space:pre-wrap;">${data.message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
      `)
    });
    // Confirmation to sender
    await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      replyTo: REPLY_TO,
      subject: 'Votre message a bien été reçu — MARYAN',
      html: baseTemplate(`
        <h1>Message reçu ✓</h1>
        <p>Bonjour ${data.firstname},</p>
        <p>Nous avons bien reçu votre message et reviendrons vers vous dans les plus brefs délais (généralement sous 24-48h).</p>
        <p style="font-size:0.85rem;color:#888;">Récapitulatif de votre demande : <em>${data.subject}</em></p>
      `)
    });
  } catch (e) {
    console.error('[email] sendContactEmail failed:', e);
  }
}
