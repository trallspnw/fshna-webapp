import { initDonation } from "@/apps/cms/src/dao/donationDao";
import { isValidEmail, isValidUsdAmount, isValidUsPhone } from "@/packages/common/src/lib/validation";
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

    // TODO - add stripe url
    return NextResponse.json(
      { 
        message: 'Subscription successful.', 
        result 
      },
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
