import { getLatestMembershipByEmail } from "@/apps/cms/src/dao/membershipDao";
import { isValidEmail } from "@/packages/common/src/lib/validation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get('email')

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email' }, 
        { status: 400 }
      )
    }

    const membership = await getLatestMembershipByEmail(email)

    const isMember = Boolean(membership && membership.expiresAt > new Date())

    return NextResponse.json(
      { 
        isMember,
        expiresAt: membership && membership.expiresAt,
      },
      { status: 200 },
    )

  } catch (e) {
    console.error('Error in membership handler:', e);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
