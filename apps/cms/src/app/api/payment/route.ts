import { NextRequest, NextResponse } from "next/server"
import { getSession } from "../../../lib/stripe"

/**
 * API handler for getting the status of a payment.
 * @param request The ID fo a Stripe session
 * @returns The session data
 */
export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get('sessionId')
  if (!sessionId) return NextResponse.json(
    { error: 'Missing sessionId' },
    { status: 400 }
  )

  const session = await getSession(sessionId)

  return NextResponse.json(
    { sessionData: session },
    { status: 200 },
  )
}