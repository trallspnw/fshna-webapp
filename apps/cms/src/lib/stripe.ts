import { NextRequest } from 'next/server';
import Stripe from 'stripe';

let stripe: Stripe | null = null

/**
 * Creates a Stripe payment session.
 * @param line_items The line items for the transaction
 * @param email The email address of the purchaser
 * @param success_url The URL the user to be directed to after payment
 * @param cancel_url The URL the user to be directed to on cancel
 * @param language The language the user is using
 * @param metadata Key/value pairs to store in the session
 * @returns 
 */
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

  return  await getStripe().checkout.sessions.create({
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

/**
 * Gets a Stripe session by ID.
 * @param sessionId the ID of the session to get
 * @returns The Stripe session
 */
export async function getSession(sessionId: string) {
  return await getStripe().checkout.sessions.retrieve(sessionId, {
    expand: ['customer', 'payment_intent'],
  });
}

export async function getEventFromWebhookRequest(request: NextRequest) {
  const rawBody = await request.text()
  const signature = request.headers.get('stripe-signature')

  // Validate boddy and signature
  if (!signature) {
    return 'Missing Stripe signature'
  }

  try {
    return getStripe().webhooks.constructEvent(
      rawBody,
      signature,
      process.env!.STRIPE_WEBHOOK_SECRET!,
    )
  } catch (error: any) {
    console.error('Webhook signature verification failed.', error.message)
    return `Webhook Error: ${error.message}`
  }
}

/**
 * Gets the Stripe instance. Creates it if needed. Avoids instantiation at buildtime. 
 * @returns A Stripe
 */
function getStripe(): Stripe {
  if (!stripe) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2025-06-30.basil',
    })
  }
  return stripe
}
