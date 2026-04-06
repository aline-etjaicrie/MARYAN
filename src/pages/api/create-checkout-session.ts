import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { ensureProfileRecord } from '../../lib/profiles';

export const prerender = false;

const PRICE_ENV_BY_KEY: Record<string, string> = {
  price_INDIVIDUAL_MONTHLY: 'STRIPE_PRICE_INDIVIDUAL_MONTHLY',
  price_INDIVIDUAL_6M: 'STRIPE_PRICE_INDIVIDUAL_6M',
  price_INDIVIDUAL_12M: 'STRIPE_PRICE_INDIVIDUAL_12M',
  price_GROUP_PACK: 'STRIPE_PRICE_GROUP_PACK'
};

function json(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store'
    }
  });
}

function getToken(request: Request): string | null {
  const auth = request.headers.get('Authorization') || '';
  return auth.startsWith('Bearer ') ? auth.slice(7) : null;
}

export const POST: APIRoute = async ({ request }) => {
  const stripeKey = import.meta.env.STRIPE_SECRET_KEY;
  const supabaseUrl = (import.meta.env.PUBLIC_SUPABASE_URL as string) || (process.env.PUBLIC_SUPABASE_URL as string);
  const supabaseServiceKey =
    (import.meta.env.SUPABASE_SERVICE_KEY as string) || (process.env.SUPABASE_SERVICE_KEY as string);
  const siteUrl =
    (import.meta.env.PUBLIC_SITE_URL as string) || (process.env.PUBLIC_SITE_URL as string) || 'http://localhost:4321';
  
  if (!stripeKey) {
    console.error('STRIPE_SECRET_KEY is missing');
    return json({ error: 'Stripe is not configured' }, 503);
  }

  const token = getToken(request);
  if (!token || !supabaseUrl || !supabaseServiceKey) {
    return json({
      error: 'login_required',
      message: 'Connectez-vous pour activer votre abonnement.',
      loginUrl: '/login?next=%2Foffres%23offre-individuelle'
    }, 401);
  }

  const stripe = new Stripe(stripeKey, {
    apiVersion: '2023-10-16',
  });

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser(token);

  if (authError || !user) {
    return json({
      error: 'login_required',
      message: 'Connectez-vous pour activer votre abonnement.',
      loginUrl: '/login?next=%2Foffres%23offre-individuelle'
    }, 401);
  }

  await ensureProfileRecord(supabase, user);

  try {
    const data = await request.json();
    const { priceId } = data;

    if (!priceId) {
      return json({ error: 'Price ID is required' }, 400);
    }

    if (typeof priceId !== 'string' || !PRICE_ENV_BY_KEY[priceId]) {
      return json({ error: 'Price ID non autorisé' }, 400);
    }

    const envKey = PRICE_ENV_BY_KEY[priceId];
    const stripePriceId =
      ((import.meta.env as Record<string, string | undefined>)[envKey] || process.env[envKey] || '').trim();
    if (!stripePriceId) {
      return json({ error: `Prix Stripe manquant pour ${priceId}` }, 503);
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', user.id)
      .single();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: stripePriceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${siteUrl}/mon-compte?checkout=success`,
      cancel_url: `${siteUrl}/offres#offre-individuelle`,
      client_reference_id: user.id,
      customer: profile?.stripe_customer_id || undefined,
      customer_email: profile?.stripe_customer_id ? undefined : user.email || undefined,
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      metadata: {
        user_id: user.id,
        requested_price_key: priceId
      },
      subscription_data: {
        metadata: {
          user_id: user.id,
          requested_price_key: priceId
        }
      }
    });

    return json({ id: session.id, url: session.url });
  } catch (error: any) {
    console.error('Stripe Checkout Error:', error);
    return json({ error: error.message }, 500);
  }
};
