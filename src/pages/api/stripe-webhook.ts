// Webhook Stripe — sync subscription state to Supabase profiles
// IMPORTANT: After registering this endpoint in Stripe Dashboard, add STRIPE_WEBHOOK_SECRET to Vercel env vars.
// See DNS-RESEND.md for full setup instructions.

import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { sendPaymentConfirmationEmail } from '../../lib/email';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const stripeSecretKey = (import.meta.env.STRIPE_SECRET_KEY as string) || (process.env.STRIPE_SECRET_KEY as string);
  const webhookSecret = (import.meta.env.STRIPE_WEBHOOK_SECRET as string) || (process.env.STRIPE_WEBHOOK_SECRET as string);
  const supabaseUrl = (import.meta.env.PUBLIC_SUPABASE_URL as string) || (process.env.PUBLIC_SUPABASE_URL as string);
  const supabaseServiceKey = (import.meta.env.SUPABASE_SERVICE_KEY as string) || (process.env.SUPABASE_SERVICE_KEY as string);

  if (!stripeSecretKey) {
    return new Response('Stripe non configuré', { status: 500 });
  }

  const stripe = new Stripe(stripeSecretKey);
  const body = await request.text();
  const signature = request.headers.get('stripe-signature') || '';

  let event: Stripe.Event;

  try {
    if (webhookSecret && signature) {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } else {
      // Mode développement sans vérification signature
      event = JSON.parse(body) as Stripe.Event;
    }
  } catch (err) {
    console.error('[webhook] signature invalide:', err);
    return new Response('Webhook signature invalide', { status: 400 });
  }

  if (!supabaseUrl || !supabaseServiceKey) {
    return new Response('Supabase non configuré', { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // Map price IDs to plan labels
  const PRICE_TO_PLAN: Record<string, string> = {
    // Test price IDs (à remplacer par les vrais quand disponibles)
    'price_INDIVIDUAL_MONTHLY': 'plus',
    'price_INDIVIDUAL_6M': 'plus',
    'price_INDIVIDUAL_12M': 'plus',
    'price_GROUP_PACK': 'plus',
  };

  async function setPlan(customerId: string, plan: string) {
    // Find user by stripe_customer_id or email
    const customer = await stripe.customers.retrieve(customerId) as Stripe.Customer;
    if (!customer || customer.deleted) return;

    const email = customer.email;
    if (!email) return;

    // Get user by email from auth
    const { data: { users } } = await supabase.auth.admin.listUsers();
    const user = users.find(u => u.email === email);
    if (!user) {
      console.warn('[webhook] utilisateur non trouvé pour email:', email);
      return;
    }

    // Fetch profile for first_name
    const { data: profile } = await supabase
      .from('profiles')
      .select('first_name, plan')
      .eq('id', user.id)
      .single();

    await supabase
      .from('profiles')
      .update({ plan })
      .eq('id', user.id);

    console.log(`[webhook] plan mis à jour: ${email} → ${plan}`);

    // Email de confirmation paiement si upgrade
    if (plan === 'plus' && profile?.plan !== 'plus') {
      await sendPaymentConfirmationEmail(email, profile?.first_name || undefined, 'MARYAN Plus').catch(console.error);
    }
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.payment_status === 'paid' && session.customer) {
          await setPlan(session.customer as string, 'plus');
        }
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const priceId = subscription.items.data[0]?.price.id;
        const plan = PRICE_TO_PLAN[priceId] || 'plus';

        if (subscription.status === 'active' || subscription.status === 'trialing') {
          await setPlan(subscription.customer as string, plan);
        } else if (['canceled', 'unpaid', 'past_due'].includes(subscription.status)) {
          await setPlan(subscription.customer as string, 'gratuit');
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await setPlan(subscription.customer as string, 'gratuit');
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        if (invoice.customer) {
          console.warn('[webhook] paiement échoué pour customer:', invoice.customer);
          // On ne rétrograde pas immédiatement — Stripe retente automatiquement
        }
        break;
      }

      default:
        // Événement non géré — on ignore silencieusement
        break;
    }
  } catch (err) {
    console.error('[webhook] erreur traitement:', err);
    return new Response('Erreur traitement', { status: 500 });
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'content-type': 'application/json' }
  });
};
