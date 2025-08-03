import { NextRequest, NextResponse } from "next/server";
import { searchPersons } from "@/apps/cms/src/dao/personDao";
import { isAdmin } from "@/apps/cms/src/lib/apiAuth";

/**
 * API froute for searching for persons by name or email. Must be used by an authenticated admin.
 * @param request A search query
 * @returns Matching person rows
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

    const persons = await searchPersons(query)

    return NextResponse.json(
      {
        message: `Search returned ${persons.length} people.`,
        persons,
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
