import { isValidEmail } from "@/packages/common/src/lib/validation";
import { NextRequest, NextResponse } from "next/server";
import { subscribe } from "../../../dao/subscriptionDao";

/**
 * API route for handling new subscriptions.
 * @param request Contact for the subscribing person
 * @returns Result message and code
 */
export async function POST(request: NextRequest) {
  try {
    const { email, language, ref } = await request.json()

    // Validate input
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
