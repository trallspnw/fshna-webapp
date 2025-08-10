import { initDonation } from "@/apps/cms/src/dao/donationDao";
import { createSession } from "@/apps/cms/src/lib/stripe";
import { isValidEmail, isValidUsdAmount, isValidUsPhone } from "@/packages/common/src/lib/validation";
import { NextRequest, NextResponse } from "next/server";

/**
 * API route for making a donation. Stores person information and kicks off a Stripe session.
 * @param request Person contact information and donation amount
 * @returns A Stripe session URL or a failure message
 */
export async function POST(request: NextRequest) {
  try {
    const { amount, itemName, email, name, phone, address, entryUrl, language, ref } = await request.json()

    // Normalize input
    const cleaned = {
      amount: clean(amount),
      itemName: clean(itemName),
      email: clean(email),
      name: clean(name),
      phone: clean(phone),
      address: clean(address),
      entryUrl: clean(entryUrl),
    }

    // Validate input
    if (!cleaned.amount || !isValidUsdAmount(cleaned.amount)) {
      return NextResponse.json(
        { error: 'Invalid amount' }, 
        { status: 400 }
      )
    }

    if (!cleaned.email || !isValidEmail(cleaned.email)) {
      return NextResponse.json(
        { error: 'Invalid email' }, 
        { status: 400 }
      )
    }

    // Phone is not required, but it must be valid if provided
    if (cleaned.phone && !isValidUsPhone(cleaned.phone)) {
      return NextResponse.json(
        { error: 'Invalid phone' }, 
        { status: 400 }
      )
    }

    if (cleaned.phone) cleaned.phone = cleaned.phone.slice(-10)

    const result = await initDonation(
      cleaned.email,
      cleaned.name,
      cleaned.phone,
      cleaned.address,
      language,
      ref,
    )

    if (!result.success) {
      console.error('Failed to initialize a donation: ', result);
      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      );
    }

    // Kick off Stripe session
    const session = await createSession({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: cleaned.itemName ?? 'Donation',
            },
            unit_amount: Math.round(parseFloat(cleaned.amount) * 100), // cents
          },
          quantity: 1,
        }
      ],
      email: cleaned.email,
      success_url: `${process.env.FRONT_END_URL}/orderSuccess?sessionId={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONT_END_URL}/orderFailed?sessionId={CHECKOUT_SESSION_ID}`,
      language: language,
      metadata: {
        personId: result.personId ?? '',
        email: cleaned.email,
        itemName: cleaned.itemName ?? 'Donation',
        itemType: 'DONATION',
        entryUrl: cleaned.entryUrl ?? '',
        ref: ref ?? '',
      },
    });

    return NextResponse.json(
      { paymentUrl: session.url },
      { status: 200 },
    );

  } catch (e) {
    console.error('Error in donation handler:', e);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// Helper for cleaning / normalizing input
function clean(value: string): string | undefined {
  return value?.trim() === '' ? undefined : value
}
