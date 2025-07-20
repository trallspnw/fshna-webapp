import { initDonation } from "@/apps/cms/src/dao/donationDao";
import { createSession } from "@/apps/cms/src/lib/stripe";
import { isValidEmail, isValidUsdAmount, isValidUsPhone } from "@/packages/common/src/lib/validation";
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from "@/packages/common/src/types/language";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { amount, email, name, phone, address, language, ref } = await request.json()

    const cleaned = {
      amount: clean(amount),
      email: clean(email),
      name: clean(name),
      phone: clean(phone),
      address: clean(address),
    }

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

    const session = await createSession({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Donation',
            },
            unit_amount: Math.round(parseFloat(cleaned.amount) * 100),
          },
          quantity: 1,
        }
      ],
      email: cleaned.email,
      success_url: `${process.env.BASE_URL}/orderResult?result=success&sessionId={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BASE_URL}/orderResult?result=cancel&sessionId={CHECKOUT_SESSION_ID}`,
      locale: language in SUPPORTED_LANGUAGES ? language : DEFAULT_LANGUAGE,
      metadata: {
        personId: result.personId ?? '',
        email: cleaned.email,
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

const clean = (value: string): string | undefined =>
  value?.trim() === '' ? undefined : value
