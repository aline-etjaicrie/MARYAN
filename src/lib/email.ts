// Wrapper Resend pour tous les emails transactionnels MARYAN
// Graceful degradation if RESEND_API_KEY not set

import { Resend } from 'resend';
import type { MaryanRadarItem } from '../data/radar';

const RESEND_API_KEY = (import.meta.env.RESEND_API_KEY as string) || (process.env.RESEND_API_KEY as string);
const RESEND_AUDIENCE_ID = (import.meta.env.RESEND_AUDIENCE_ID as string) || (process.env.RESEND_AUDIENCE_ID as string);
const FROM_EMAIL = 'MARYAN <bonjour@maryanapp.fr>';
const REPLY_TO = 'aline@etjaicrie.com';

function getResend(): Resend | null {
  if (!RESEND_API_KEY) {
    console.warn('[email] RESEND_API_KEY non configurée — emails désactivés');
    return null;
  }
  return new Resend(RESEND_API_KEY);
}

export function isEmailSendingAvailable(): boolean {
  return !!RESEND_API_KEY;
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

function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
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

export async function sendDiagnosticSummaryEmail(
  email: string,
  diagnosticState: {
    diagnostic_label?: unknown;
    summary?: unknown;
    situation?: unknown;
    priorities?: unknown;
    recommended_slugs?: unknown;
  }
): Promise<void> {
  const resend = getResend();
  if (!resend) return;

  const diagnosticLabel = typeof diagnosticState.diagnostic_label === 'string'
    ? diagnosticState.diagnostic_label
    : 'Votre lecture de mandat';
  const summary = typeof diagnosticState.summary === 'string'
    ? diagnosticState.summary
    : 'MARYAN a préparé une première lecture de votre situation de mandat.';
  const situation = typeof diagnosticState.situation === 'string'
    ? diagnosticState.situation
    : '';
  const priorities = Array.isArray(diagnosticState.priorities)
    ? diagnosticState.priorities
        .map((item) => (typeof item === 'string' ? item.trim() : ''))
        .filter(Boolean)
        .slice(0, 3)
    : [];
  const recommendedSlugs = Array.isArray(diagnosticState.recommended_slugs)
    ? diagnosticState.recommended_slugs
        .map((item) => (typeof item === 'string' ? item.trim() : ''))
        .filter(Boolean)
        .slice(0, 3)
    : [];

  const prioritiesHtml = priorities.length
    ? `<ul>${priorities.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`
    : '';

  const recommendationsHtml = recommendedSlugs.length
    ? `<p><strong>Pour aller plus loin :</strong><br>${recommendedSlugs
        .map(
          (slug) =>
            `<a href="https://maryanapp.fr/ressources/${encodeURIComponent(slug)}">${escapeHtml(slug)}</a>`
        )
        .join('<br>')}</p>`
    : '';

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      replyTo: REPLY_TO,
      subject: 'Votre diagnostic MARYAN',
      html: baseTemplate(`
        <h1>${escapeHtml(diagnosticLabel)}</h1>
        <p>${escapeHtml(summary)}</p>
        ${situation ? `<p>${escapeHtml(situation)}</p>` : ''}
        ${prioritiesHtml ? `<p><strong>Ce qui peut vous aider maintenant :</strong></p>${prioritiesHtml}` : ''}
        ${recommendationsHtml}
        <a href="https://maryanapp.fr/login" class="btn">Retrouver mon espace →</a>
      `)
    });
  } catch (e) {
    console.error('[email] sendDiagnosticSummaryEmail failed:', e);
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

  const broadcastHtml = baseTemplate(`
    <h1>📬 Nouvelle publication sur MARYAN</h1>
    <p><strong>${typeLabel} :</strong> ${data.title}</p>
    ${data.description ? `<p style="color:#555;">${data.description}</p>` : ''}
    <a href="${url}" class="btn">Lire →</a>
    <hr style="border:none;border-top:1px solid #eee;margin:1.5rem 0;">
    <p style="font-size:0.8rem;color:#888;">Vous recevez cet email car vous êtes inscrit·e sur <a href="https://maryanapp.fr">maryanapp.fr</a>.<br>
    Pour vous désabonner des notifications de publication, <a href="https://maryanapp.fr/mon-compte">gérez vos préférences ici</a>.</p>
  `);

  try {
    // 1. Notification interne à Aline (toujours)
    await resend.emails.send({
      from: FROM_EMAIL,
      to: REPLY_TO,
      subject: `[MARYAN Admin] Nouvelle publication : ${data.title}`,
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

    // 2. Broadcast aux abonnés si audience configurée
    if (RESEND_AUDIENCE_ID) {
      // audienceId est déprécié en faveur de segmentId dans Resend v6+
      // mais fonctionne encore — à migrer vers un segment ID quand disponible
      const broadcast = await resend.broadcasts.create({
        audienceId: RESEND_AUDIENCE_ID,
        from: FROM_EMAIL,
        replyTo: REPLY_TO,
        subject: `${typeLabel} : ${data.title}`,
        html: broadcastHtml,
        name: `${data.type}-${data.slug}-${Date.now()}`,
        send: true, // envoi immédiat (pas de draft intermédiaire)
      } as any); // cast needed: audienceId deprecated in SDK types
      if (broadcast.data?.id) {
        console.log('[email] broadcast envoyé aux abonnés:', broadcast.data.id);
      }
    }
  } catch (e) {
    console.error('[email] sendNewsletterNotification failed:', e);
  }
}

// ── Gestion audience Resend ──────────────────────────────────────────────────

/**
 * Ajoute un contact à l'audience Resend (liste abonnés MARYAN).
 * Appelé lors de l'inscription. Requiert RESEND_AUDIENCE_ID.
 */
export async function addContactToAudience(email: string, firstName?: string): Promise<void> {
  const resend = getResend();
  if (!resend) return;
  if (!RESEND_AUDIENCE_ID) {
    console.warn('[email] RESEND_AUDIENCE_ID non configurée — contact non ajouté à la liste');
    return;
  }
  try {
    await resend.contacts.create({
      audienceId: RESEND_AUDIENCE_ID,
      email,
      firstName: firstName || '',
      unsubscribed: false,
    });
    console.log('[email] contact ajouté audience:', email);
  } catch (e: any) {
    // Silencieux si déjà existant (code 422 duplicate)
    if (e?.statusCode !== 422) {
      console.error('[email] addContactToAudience failed:', e);
    }
  }
}

/**
 * Supprime le consentement marketing (désabonnement RGPD).
 * Met le contact comme unsubscribed dans l'audience Resend.
 */
export async function unsubscribeFromAudience(email: string): Promise<void> {
  const resend = getResend();
  if (!resend || !RESEND_AUDIENCE_ID) return;
  try {
    // Resend ne permet pas de rechercher par email directement → on crée avec unsubscribed: true
    await resend.contacts.create({
      audienceId: RESEND_AUDIENCE_ID,
      email,
      unsubscribed: true,
    });
  } catch (e) {
    console.error('[email] unsubscribeFromAudience failed:', e);
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

export async function sendRadarDigestEmail(data: {
  email: string;
  firstName?: string;
  frequency: 'quotidien' | 'hebdomadaire';
  items: MaryanRadarItem[];
}): Promise<void> {
  const resend = getResend();
  if (!resend) return;

  const name = data.firstName || 'élu·e';
  const items = data.items.slice(0, data.frequency === 'hebdomadaire' ? 5 : 3);

  if (!items.length) return;

  const subject = data.frequency === 'hebdomadaire'
    ? 'Radar MARYAN — les évolutions à suivre cette semaine'
    : 'Radar MARYAN — ce qui vous concerne aujourd’hui';

  const headerTitle = data.frequency === 'hebdomadaire'
    ? 'Votre synthèse de la semaine'
    : 'LE RADAR DE MARYAN';

  const headerLead = data.frequency === 'hebdomadaire'
    ? 'Les évolutions à suivre pour garder une lecture claire du mandat.'
    : 'Ce que l’actualité implique pour votre mandat.';

  const renderItem = (item: MaryanRadarItem) => `
    <div style="padding:16px 0;border-top:1px solid #eee;">
      <p style="font-size:0.8rem;color:#6B7280;margin:0 0 0.4rem;">${item.type.toUpperCase()} · ${item.source.publisher}</p>
      <p style="font-size:1rem;font-weight:700;color:#0A192F;margin:0 0 0.65rem;">${item.title}</p>
      <p style="font-size:0.92rem;margin:0 0 0.35rem;"><strong>Ce que dit la source</strong><br>${item.factSummary}</p>
      <p style="font-size:0.92rem;margin:0 0 0.35rem;"><strong>Lecture MARYAN</strong><br>${item.analysis.whyImportant || ''}</p>
      <p style="font-size:0.92rem;margin:0;"><strong>À surveiller</strong><br>${item.analysis.watchpoints || ''}</p>
    </div>
  `;

  const weeklyBlocks = [
    { title: 'À retenir', items: items.slice(0, 2) },
    { title: 'En évolution', items: items.slice(2, 4) },
    { title: 'À garder en tête', items: items.slice(4, 5) }
  ].filter((block) => block.items.length > 0);

  const dailyHtml = items.map(renderItem).join('');
  const weeklyHtml = weeklyBlocks.map((block) => `
    <div style="margin-bottom:1.5rem;">
      <p style="font-size:0.82rem;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:#E63946;margin:0 0 0.5rem;">${block.title}</p>
      ${block.items.map(renderItem).join('')}
    </div>
  `).join('');

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      replyTo: REPLY_TO,
      subject,
      html: baseTemplate(`
        <h1>${headerTitle}</h1>
        <p>Bonjour ${name},</p>
        <p>${headerLead}</p>
        ${data.frequency === 'hebdomadaire' ? weeklyHtml : dailyHtml}
        <a href="https://maryanapp.fr/radar" class="btn">${data.frequency === 'hebdomadaire' ? 'Accéder au Radar complet' : 'Voir tous les signaux'}</a>
        <p style="font-size:0.85rem;color:#888;">MARYAN vous aide à comprendre avant de décider.</p>
      `)
    });
  } catch (e) {
    console.error('[email] sendRadarDigestEmail failed:', e);
  }
}
