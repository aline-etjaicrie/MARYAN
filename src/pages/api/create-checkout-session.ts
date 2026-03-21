import type { APIRoute } from 'astro';
import Stripe from 'stripe';

export const POST: APIRoute = async ({ request }) => {
  const stripeKey = import.meta.env.STRIPE_SECRET_KEY;
  
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
      success_url: `${import.meta.env.PUBLIC_SITE_URL}/mon-compte?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${import.meta.env.PUBLIC_SITE_URL}/offres`,
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
