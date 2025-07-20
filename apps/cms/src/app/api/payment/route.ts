import { NextRequest, NextResponse } from "next/server"
import { getSession } from "../../../lib/stripe"

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