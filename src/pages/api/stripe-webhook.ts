import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export const prerender = false;

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || '';
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || '';
const SUPABASE_URL = process.env.PUBLIC_SUPABASE_URL || '';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || '';
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';

export const POST: APIRoute = async ({ request }) => {
  if (!STRIPE_SECRET_KEY || !STRIPE_WEBHOOK_SECRET) {
    console.error('[stripe-webhook] Clés Stripe manquantes');
    return new Response('Configuration manquante', { status: 503 });
  }

  const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });

  const body = await request.text();
  const sig = request.headers.get('stripe-signature') || '';

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, STRIPE_WEBHOOK_SECRET);
  } catch (err: any) {
    console.error('[stripe-webhook] Signature invalide :', err.message);
    return new Response(`Webhook error: ${err.message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const customerEmail = session.customer_details?.email || session.customer_email || null;

    // 1. Mise à jour du plan Supabase
    if (customerEmail && SUPABASE_URL && SUPABASE_SERVICE_KEY) {
      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

      // Récupère l'utilisateur par email
      const { data: users, error: usersError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', customerEmail)
        .limit(1);

      if (usersError) {
        console.error('[stripe-webhook] Erreur lookup profil :', usersError.message);
      } else if (users && users.length > 0) {
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ plan: 'plus' })
          .eq('id', users[0].id);

        if (updateError) {
          console.error('[stripe-webhook] Erreur mise à jour plan :', updateError.message);
        } else {
          console.log('[stripe-webhook] Plan mis à jour → plus pour', customerEmail);
        }
      } else {
        console.warn('[stripe-webhook] Aucun profil trouvé pour', customerEmail);
      }
    }

    // 2. Email de confirmation via Resend
    if (customerEmail && RESEND_API_KEY) {
      const resend = new Resend(RESEND_API_KEY);
      try {
        await resend.emails.send({
          from: 'MARYAN <bonjour@maryanapp.fr>',
          to: customerEmail,
          subject: 'Bienvenue dans MARYAN Plus',
          html: `
            <h1>Votre accès MARYAN Plus est activé.</h1>
            <p>Merci pour votre confiance. Votre compte est maintenant en accès illimité.</p>
            <p>Vous pouvez vous connecter et accéder au copilote sans limite :</p>
            <a href="https://www.maryanapp.fr/copilote">Accéder au copilote →</a>
            <p>Pour toute question : bonjour@maryanapp.fr</p>
            <p>L'équipe MARYAN</p>
          `
        });
        console.log('[stripe-webhook] Email confirmation envoyé à', customerEmail);
      } catch (emailErr) {
        console.error('[stripe-webhook] Erreur envoi email :', emailErr);
      }
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
