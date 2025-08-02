import { NextRequest, NextResponse } from "next/server";
import { createPayloadRequest } from 'payload'
import configPromise from '@payload-config'
import { searchMembers } from "@/apps/cms/src/dao/membershipDao";

/**
 * API for handling member search. Searches by name and email. Must be used by an authenticated admin
 * @param request A request including a search query
 * @returns The matching membership rows
 */
export async function GET(request: NextRequest) {
  try {
    const payloadRequest = await createPayloadRequest({
      config: configPromise,
      request,
    })

    const user = payloadRequest.user
    if (!user || user.collection !== 'admins') {
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

    const members = await searchMembers(query)

    return NextResponse.json(
      {
        message: `Search returned ${members.length} members.`,
        members,
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
