import { NextRequest, NextResponse } from "next/server";
import { getMembershipsByRef, getPersonsByRef, getSubscriptionsByRef } from "../../../../dao/campaignDao";
import { isAdmin } from "@/apps/cms/src/lib/apiAuth";

/**
 * API route for getting campaign results. Must be used by an authenticated admin.
 * @param request A request including a ref query
 * @returns The entities created via the campaign
 */
export async function GET(request: NextRequest) {
  try {
    if (!(await isAdmin(request))) {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 },
      )
    }

    const { searchParams } = new URL(request.url)
    const query = searchParams.get('query')?.trim() ?? ''
    if (!query) {
      return NextResponse.json(
        { error: 'Missing query param' }, 
        { status: 400 },
      )
    }

    const persons = await getPersonsByRef(query)
    const memberships = await getMembershipsByRef(query)
    const subscriptions = await getSubscriptionsByRef(query)

    return NextResponse.json(
      {
        message: `Search returned ${persons.length + memberships.length + subscriptions.length} entries.`,
        persons,
        memberships,
        subscriptions,
      },
      { status: 200 },
    )

  } catch (e) {
    console.error('Error in search handler:', e);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
