import { NextRequest, NextResponse } from "next/server";
import { getSubscriptions } from "../../../dao/subscriptionDao";
import { sendEmails } from "../../../lib/email";
import { isAdmin } from "../../../lib/apiAuth";

/**
 * API route for broadcasting an email. Must be used by an authenticated admin.
 * @param request A request including an email slug
 * @returns Result message and code
 */
export async function POST(request: NextRequest) {
  try {
    if (!(await isAdmin(request))) {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 },
      )
    }

    const { emailSlug } = await request.json()
    const subscribers = await getSubscriptions()

    await sendEmails(subscribers, emailSlug, {})

    return NextResponse.json(
      { message: `Broadcast sent to ${subscribers.length} subscribers.` },
      { status: 200 },
    );

  } catch (e) {
    console.error('Error in broadcast handler:', e)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
