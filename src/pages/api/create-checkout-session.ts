// À supprimer si Stripe hosted links est définitif
import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

export const prerender = false;

const SUPABASE_URL =
  (import.meta.env.PUBLIC_SUPABASE_URL as string) || (process.env.PUBLIC_SUPABASE_URL as string);
const SUPABASE_SERVICE_KEY =
  (import.meta.env.SUPABASE_SERVICE_KEY as string) || (process.env.SUPABASE_SERVICE_KEY as string);

function getToken(request: Request): string | null {
  const auth = request.headers.get('Authorization') || '';
  return auth.startsWith('Bearer ') ? auth.slice(7) : null;
}

export const POST: APIRoute = async ({ request }) => {
  const token = getToken(request);
  if (!token) {
    return new Response(JSON.stringify({ error: 'Non authentifié.' }), { status: 401 });
  }

  if (SUPABASE_URL && SUPABASE_SERVICE_KEY) {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) {
      return new Response(JSON.stringify({ error: 'Token invalide.' }), { status: 401 });
    }
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  
  if (!stripeKey) {
    console.error('STRIPE_SECRET_KEY is missing');
    return new Response(JSON.stringify({ error: 'Stripe is not configured' }), { status: 503 });
  }

  const stripe = new Stripe(stripeKey, {
    apiVersion: '2023-10-16',
  });

  try {
    const data = await request.json();
    const { priceId, customerEmail } = data;

    if (!priceId) {
      return new Response(JSON.stringify({ error: 'Price ID is required' }), { status: 400 });
    }

    // Creating the Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId, // Ex: price_12345...
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.PUBLIC_SITE_URL}/mon-compte?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.PUBLIC_SITE_URL}/offres`,
      customer_email: customerEmail || undefined,
      allow_promotion_codes: true,
      billing_address_collection: 'required',
    });

    return new Response(JSON.stringify({ id: session.id, url: session.url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Stripe Checkout Error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
