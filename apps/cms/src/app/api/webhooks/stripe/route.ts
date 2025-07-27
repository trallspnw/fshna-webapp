import { completeMembership } from '@/apps/cms/src/dao/membershipDao'
import { getPersonById } from '@/apps/cms/src/dao/personDao'
import { sendEmails } from '@/apps/cms/src/lib/email'
import { DEFAULT_LANGUAGE } from '@/packages/common/src/types/language'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { LRUCache } from 'lru-cache'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
})

export const config = {
  api: {
    bodyParser: false,
  },
}

const stripeEventCache = new LRUCache<string, true>({
  max: 1000,
  ttl: 1000 * 60 * 5, // 5 minutes
})

export async function POST(request: NextRequest) {
  const rawBody = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing Stripe signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    console.error('Webhook signature verification failed.', error.message)
    return NextResponse.json({ error: `Webhook Error: ${error.message}` }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    // Use cache for idempotency
    const eventId = event.id
    if (stripeEventCache.has(eventId)) return NextResponse.json({ received: true })
    stripeEventCache.set(eventId, true)

    const session = event.data.object as Stripe.Checkout.Session

    const personId = session.metadata?.personId
    const ref = session.metadata?.ref
    const itemType = session.metadata?.itemType
    const person = personId ? await getPersonById(personId) : undefined

    if (person && itemType == 'MEMBERSHIP') {
      await completeMembership(person.id, ref)
      sendEmails(
        [ person ], 
        'membership-receipt', 
        {
          itemName: session.metadata?.itemName ?? 'Membership',
          amount: new Intl.NumberFormat(person.language ?? DEFAULT_LANGUAGE, {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
          }).format((session.amount_total ?? 0) / 100),
        },
      )
    }

    if (person && itemType == 'DONATION') {
      sendEmails(
        [ person ], 
        'donation-receipt', 
        {
          itemName: session.metadata?.itemName ?? 'Item',
          amount: new Intl.NumberFormat(person.language ?? DEFAULT_LANGUAGE, {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
          }).format((session.amount_total ?? 0) / 100),
        },
      )
    }
  }

  return NextResponse.json({ received: true })
}
