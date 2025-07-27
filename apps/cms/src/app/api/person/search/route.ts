import { NextRequest, NextResponse } from "next/server";
import { createPayloadRequest } from 'payload'
import configPromise from '@payload-config'
import { searchPersons } from "@/apps/cms/src/dao/personDao";

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

    const persons = await searchPersons(query)

    return NextResponse.json(
      {
        message: `Search returned ${persons.length} people.`,
        persons,
      },
      { status: 200 },
    )

  } catch (e) {
    console.error('Error in broadcast handler:', e);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
