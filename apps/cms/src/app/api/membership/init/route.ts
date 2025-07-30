import { initMembership } from "@/apps/cms/src/dao/membershipDao";
import { createSession } from "@/apps/cms/src/lib/stripe";
import { isValidEmail, isValidUsPhone } from "@/packages/common/src/lib/validation";
import { General } from "@/packages/common/src/types/payload-types";
import { NextRequest, NextResponse } from "next/server";
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })
    const generalGlobals = await payload.findGlobal({ slug: 'general' }) as General 

    const { itemName, email, name, phone, address, entryUrl, language, ref } = await request.json()
    const amount = generalGlobals.membershipPrice

    const cleaned = {
      itemName: clean(itemName),
      email: clean(email),
      name: clean(name),
      phone: clean(phone),
      address: clean(address),
      entryUrl: clean(entryUrl),
    }

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid membership price' }, 
        { status: 500 }
      )
    }

    if (!cleaned.email || !isValidEmail(cleaned.email)) {
      return NextResponse.json(
        { error: 'Invalid email' }, 
        { status: 400 }
      )
    }

    if (!cleaned.name) {
      return NextResponse.json(
        { error: 'Invalid name' }, 
        { status: 400 }
      )
    }

    if (cleaned.phone && !isValidUsPhone(cleaned.phone)) {
      return NextResponse.json(
        { error: 'Invalid phone' }, 
        { status: 400 }
      )
    }

    if (cleaned.phone) cleaned.phone = cleaned.phone.slice(-10)

    const result = await initMembership(
      cleaned.email,
      cleaned.name,
      cleaned.phone,
      cleaned.address,
      language,
      ref,
    )

    if (!result.success) {
      if (result.reason === 'ACTIVE_MEMBERSHIP') {
        return NextResponse.json(
          { error: result.reason },
          { status: 400 }
        )
      }

      console.error('Failed to initialize a membership: ', result);
      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 },
      );
    }

    const session = await createSession({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: cleaned.itemName ?? 'Membership',
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        }
      ],
      email: cleaned.email,
      success_url: `${process.env.BASE_URL}/orderSuccess?sessionId={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BASE_URL}/orderFailed?sessionId={CHECKOUT_SESSION_ID}`,
      language: language,
      metadata: {
        personId: result.personId ?? '',
        email: cleaned.email,
        itemName: cleaned.itemName ?? 'Membership',
        itemType: 'MEMBERSHIP',
        entryUrl: cleaned.entryUrl ?? '',
        ref: ref ?? '',
      },
    })

    return NextResponse.json(
      { paymentUrl: session.url },
      { status: 200 },
    )

  } catch (e) {
    console.error('Error in membership handler:', e);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}

function clean(value: string): string | undefined {
  return value?.trim() === '' ? undefined : value
}
