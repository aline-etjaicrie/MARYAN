import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { sendPaymentConfirmationEmail } from '../../lib/email';
import { ensureProfileRecord } from '../../lib/profiles';

export const prerender = false;

const PRICE_ENV_BY_KEY: Record<string, string> = {
  price_INDIVIDUAL_MONTHLY: 'STRIPE_PRICE_INDIVIDUAL_MONTHLY',
  price_INDIVIDUAL_6M: 'STRIPE_PRICE_INDIVIDUAL_6M',
  price_INDIVIDUAL_12M: 'STRIPE_PRICE_INDIVIDUAL_12M',
  price_GROUP_PACK: 'STRIPE_PRICE_GROUP_PACK'
};

function getConfiguredStripePrices(): Record<string, string> {
  const configured: Record<string, string> = {};

  for (const [key, envKey] of Object.entries(PRICE_ENV_BY_KEY)) {
    const value =
      ((import.meta.env as Record<string, string | undefined>)[envKey] || process.env[envKey] || '').trim();
    if (value) configured[value] = key;
  }

  return configured;
}

export const POST: APIRoute = async ({ request }) => {
  const stripeSecretKey = (import.meta.env.STRIPE_SECRET_KEY as string) || (process.env.STRIPE_SECRET_KEY as string);
  const webhookSecret =
    (import.meta.env.STRIPE_WEBHOOK_SECRET as string) || (process.env.STRIPE_WEBHOOK_SECRET as string);
  const supabaseUrl =
    (import.meta.env.PUBLIC_SUPABASE_URL as string) || (process.env.PUBLIC_SUPABASE_URL as string);
  const supabaseServiceKey =
    (import.meta.env.SUPABASE_SERVICE_KEY as string) || (process.env.SUPABASE_SERVICE_KEY as string);

  if (!stripeSecretKey) {
    return new Response('Stripe non configuré', { status: 500 });
  }

  if (!supabaseUrl || !supabaseServiceKey) {
    return new Response('Supabase non configuré', { status: 500 });
  }

  const stripe = new Stripe(stripeSecretKey);
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const configuredPrices = getConfiguredStripePrices();

  const body = await request.text();
  const signature = request.headers.get('stripe-signature') || '';

  let event: Stripe.Event;

  try {
    if (webhookSecret && signature) {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } else {
      event = JSON.parse(body) as Stripe.Event;
    }
  } catch (error) {
    console.error('[webhook] signature invalide:', error);
    return new Response('Webhook signature invalide', { status: 400 });
  }

  function getPlanFromPriceId(priceId: string | null | undefined): 'plus' | 'gratuit' {
    if (!priceId) return 'plus';
    return configuredPrices[priceId] ? 'plus' : 'plus';
  }

  async function findUserByEmail(email: string) {
    let page = 1;
    const perPage = 200;

    while (true) {
      const { data, error } = await supabase.auth.admin.listUsers({ page, perPage });
      if (error) throw error;

      const user = data.users.find((candidate) => candidate.email?.toLowerCase() === email.toLowerCase());
      if (user) return user;
      if (!data.nextPage) return null;
      page = data.nextPage;
    }
  }

  async function resolveUserId(params: {
    explicitUserId?: string | null;
    customerId?: string | null;
    email?: string | null;
  }) {
    if (params.explicitUserId) return params.explicitUserId;

    if (params.customerId) {
      const { data: profileByCustomer } = await supabase
        .from('profiles')
        .select('id')
        .eq('stripe_customer_id', params.customerId)
        .maybeSingle();

      if (profileByCustomer?.id) return profileByCustomer.id;
    }

    if (params.email) {
      const user = await findUserByEmail(params.email);
      return user?.id || null;
    }

    return null;
  }

  async function fetchCustomerEmail(customerId: string | null | undefined) {
    if (!customerId) return null;
    const customer = (await stripe.customers.retrieve(customerId)) as Stripe.Customer | Stripe.DeletedCustomer;
    if (!customer || customer.deleted) return null;
    return customer.email || null;
  }

  async function applyBillingState(params: {
    userId: string;
    plan: 'plus' | 'gratuit' | 'admin';
    email?: string | null;
    customerId?: string | null;
    subscriptionId?: string | null;
    priceId?: string | null;
  }) {
    const { data: authUserData } = await supabase.auth.admin.getUserById(params.userId);
    const authUser = authUserData.user;
    if (!authUser) return;

    await ensureProfileRecord(supabase, authUser);

    const { data: profile } = await supabase
      .from('profiles')
      .select('first_name, plan, stripe_customer_id')
      .eq('id', params.userId)
      .single();

    const updates: Record<string, unknown> = {
      plan: params.plan,
      plan_updated_at: new Date().toISOString()
    };

    if (params.customerId) {
      updates.stripe_customer_id = params.customerId;
    } else if (profile?.stripe_customer_id) {
      updates.stripe_customer_id = profile.stripe_customer_id;
    }

    if (params.plan === 'gratuit') {
      updates.stripe_subscription_id = null;
      updates.stripe_price_id = null;
    } else {
      if (params.subscriptionId !== undefined) updates.stripe_subscription_id = params.subscriptionId;
      if (params.priceId !== undefined) updates.stripe_price_id = params.priceId;
    }

    await supabase.from('profiles').update(updates).eq('id', params.userId);

    const existingMetadata = authUser.user_metadata || {};
    await supabase.auth.admin.updateUserById(params.userId, {
      user_metadata: {
        ...existingMetadata,
        plan: params.plan
      }
    });

    if (params.plan === 'plus' && profile?.plan !== 'plus' && params.email) {
      await sendPaymentConfirmationEmail(params.email, profile?.first_name || undefined, 'MARYAN Plus').catch(
        console.error
      );
    }
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.payment_status !== 'paid') break;

        const customerId = typeof session.customer === 'string' ? session.customer : null;
        const email = session.customer_details?.email || session.customer_email || null;
        const userId = await resolveUserId({
          explicitUserId: session.client_reference_id || session.metadata?.user_id || null,
          customerId,
          email
        });

        if (!userId) {
          console.warn('[webhook] utilisateur introuvable pour checkout.session.completed');
          break;
        }

        await applyBillingState({
          userId,
          plan: 'plus',
          email,
          customerId,
          subscriptionId: typeof session.subscription === 'string' ? session.subscription : null
        });
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = typeof subscription.customer === 'string' ? subscription.customer : null;
        const priceId = subscription.items.data[0]?.price.id || null;
        const email = (await fetchCustomerEmail(customerId)) || null;
        const userId = await resolveUserId({
          explicitUserId: subscription.metadata?.user_id || null,
          customerId,
          email
        });

        if (!userId) {
          console.warn('[webhook] utilisateur introuvable pour subscription update');
          break;
        }

        const plan =
          subscription.status === 'active' || subscription.status === 'trialing'
            ? getPlanFromPriceId(priceId)
            : 'gratuit';

        await applyBillingState({
          userId,
          plan,
          email,
          customerId,
          subscriptionId: subscription.id,
          priceId
        });
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = typeof subscription.customer === 'string' ? subscription.customer : null;
        const email = (await fetchCustomerEmail(customerId)) || null;
        const userId = await resolveUserId({
          explicitUserId: subscription.metadata?.user_id || null,
          customerId,
          email
        });

        if (!userId) {
          console.warn('[webhook] utilisateur introuvable pour subscription.deleted');
          break;
        }

        await applyBillingState({
          userId,
          plan: 'gratuit',
          email,
          customerId,
          subscriptionId: null,
          priceId: null
        });
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        console.warn('[webhook] paiement échoué pour customer:', invoice.customer);
        break;
      }

      default:
        break;
    }
  } catch (error) {
    console.error('[webhook] erreur traitement:', error);
    return new Response('Erreur traitement', { status: 500 });
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'content-type': 'application/json' }
  });
};
