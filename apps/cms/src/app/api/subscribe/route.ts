import { isValidEmail } from "@/packages/common/src/lib/validation";
import { NextRequest, NextResponse } from "next/server";
import { subscribe } from "../../../dao/subscriptionDao";

export async function POST(request: NextRequest) {
  try {
    const { email, language, ref } = await request.json()

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email' }, 
        { status: 400 }
      )
    }

    const result = await subscribe(email, language, ref);

    return NextResponse.json(
      { 
        message: 'Subscription successful.', 
        result 
      },
      { status: 200 },
    );

  } catch (e) {
    console.error('Error in subscription handler:', e);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
