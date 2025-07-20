import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

export async function createSession({
  line_items,
  email,
  success_url,
  cancel_url,
  language,
  metadata = {},
}: {
  line_items: Stripe.Checkout.SessionCreateParams.LineItem[],
  email: string,
  success_url: string,
  cancel_url: string,
  language: string,
  metadata?: Record<string, string>
}) {

  return  await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items,
    mode: 'payment',
    customer_email: email,
    success_url,
    cancel_url,
    locale: language as Stripe.Checkout.SessionCreateParams.Locale,
    metadata,
  });
}

export async function getSession(sessionId: string) {
  return await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['customer', 'payment_intent'],
  });
}
